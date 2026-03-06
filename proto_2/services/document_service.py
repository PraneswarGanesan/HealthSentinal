from dataBase.db import insert_document, get_document_by_id, get_documents_by_user, update_document as db_update, delete_document as db_delete
from storage.s3_client import upload_file, download_file, delete_file, generate_document_path, generate_signature_path
from security.dilithium_signature import DilithiumSigner, hash_document
from job_queue.job_queue import push_job
from utils.logger import get_logger


logger = get_logger(__name__)
signer = DilithiumSigner()


def upload_document(user_id: str, filename: str, file_bytes: bytes):

    doc_path = generate_document_path(user_id, filename)
    sig_path = generate_signature_path(user_id, filename)

    # sign
    signature = signer.sign_document(file_bytes)

    # upload
    upload_file(file_bytes, doc_path)
    upload_file(signature, sig_path)

    # metadata
    record = insert_document(user_id, filename, doc_path, sig_path)

    # queue indexing
    push_job({
        "task": "index_document",
        "user_id": user_id,
        "document_id": record[0]["id"]
    })

    logger.info(f"Document uploaded for user {user_id}")

    return record


def get_document(document_id: str):
    return get_document_by_id(document_id)


def list_documents(user_id: str):
    return get_documents_by_user(user_id)


def update_document(document_id: str, user_id: str, filename: str, file_bytes: bytes):

    doc = get_document_by_id(document_id)

    if not doc or doc["user_id"] != user_id:
        raise Exception("Unauthorized")

    new_doc_path = generate_document_path(user_id, filename)
    new_sig_path = generate_signature_path(user_id, filename)

    signature = signer.sign_document(file_bytes)

    upload_file(file_bytes, new_doc_path)
    upload_file(signature, new_sig_path)

    db_update(document_id, filename, new_doc_path, new_sig_path)

    logger.info("Document updated")

    return True


def delete_document(document_id: str, user_id: str):

    doc = get_document_by_id(document_id)

    if not doc or doc["user_id"] != user_id:
        raise Exception("Unauthorized")

    delete_file(doc["s3_path"])
    delete_file(doc["signature_path"])

    db_delete(document_id)

    logger.info("Document deleted")

    return True
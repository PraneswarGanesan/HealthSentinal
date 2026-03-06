from storage.s3_client import download_file
from security.dilithium_signature import DilithiumSigner
from dataBase.db import get_document_by_id
from utils.logger import get_logger


logger = get_logger(__name__)
signer = DilithiumSigner()


def verify_document_signature(document_id: str):

    doc = get_document_by_id(document_id)

    if not doc:
        raise Exception("Document not found")

    file_bytes = download_file(doc["s3_path"])
    signature = download_file(doc["signature_path"])

    verified = signer.verify_document(file_bytes, signature)

    if verified:
        logger.info("Document signature verified")
    else:
        logger.warning("Document signature invalid")

    return verified
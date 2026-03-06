from fastapi import APIRouter, UploadFile, File
from services.document_service import (
    upload_document,
    list_documents,
    update_document,
    delete_document,
    get_document
)

router = APIRouter(prefix="/documents")


@router.post("/upload")
async def upload(user_id: str, file: UploadFile = File(...)):

    content = await file.read()

    return upload_document(user_id, file.filename, content)


@router.get("/")
def list_user_documents(user_id: str):

    return list_documents(user_id)


@router.get("/{document_id}")
def get_single_document(document_id: str):

    return get_document(document_id)


@router.put("/update/{document_id}")
async def update(
    document_id: str,
    user_id: str,
    file: UploadFile = File(...)
):

    content = await file.read()

    return update_document(document_id, user_id, file.filename, content)


@router.delete("/delete/{document_id}")
def delete(document_id: str, user_id: str):

    return delete_document(document_id, user_id)
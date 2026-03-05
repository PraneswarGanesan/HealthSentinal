from fastapi import FastAPI, UploadFile, File
import os

from crypto.dilithium_signature import DilithiumSigner, hash_document
from backend.rag_pipeline import rag_query
from backend.logger import logger

app = FastAPI()

logger.info("Starting HealthSentinal FastAPI service")

signer = DilithiumSigner()

DOC_DIR = "storage/documents"
SIG_DIR = "storage/signatures"

os.makedirs(DOC_DIR, exist_ok=True)
os.makedirs(SIG_DIR, exist_ok=True)


@app.post("/upload")
async def upload_document(file: UploadFile = File(...)):

    logger.info(f"Received file upload request: {file.filename}")

    content = await file.read()

    logger.info("File read successfully")

    doc_hash = hash_document(content)

    signature = signer.sign_document(doc_hash)

    doc_path = os.path.join(DOC_DIR, file.filename)
    sig_path = os.path.join(SIG_DIR, file.filename + ".sig")

    logger.info(f"Saving document to {doc_path}")

    with open(doc_path, "wb") as f:
        f.write(content)

    logger.info(f"Saving signature to {sig_path}")

    with open(sig_path, "wb") as f:
        f.write(signature)

    logger.info("Document securely stored with Dilithium signature")

    return {
        "status": "stored",
        "filename": file.filename
    }


@app.post("/query")
async def query_rag(question: str):

    logger.info(f"Received RAG query: {question}")

    answer = rag_query(question)

    logger.info("RAG response generated")

    return {
        "question": question,
        "answer": answer
    }
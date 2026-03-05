import os
from backend.dataset_loader import load_documents
from backend.bm25_retriever import BM25Retriever
from backend.ollama_client import ask_llm
from backend.logger import logger

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "datasets", "medical_transcriptions.csv")

logger.info("Initializing RAG pipeline")

documents = load_documents(DATA_PATH)

retriever = BM25Retriever(documents)

logger.info("RAG pipeline ready")


def rag_query(question):

    logger.info("Received new query")

    docs = retriever.search(question)

    context = "\n\n".join(docs)

    answer = ask_llm(context, question)

    logger.info("Returning final RAG response") 

    return answer
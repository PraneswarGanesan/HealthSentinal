import os
from backend.dataset_loader import chunk_text
from backend.ollama_client import ask_llm
from backend.logger import logger
from rank_bm25 import BM25Okapi


logger.info("Initializing RAG pipeline")

# initialize empty storage
documents = []
bm25 = None


def add_document_to_index(text):

    global documents, bm25

    logger.info("Chunking uploaded document")

    chunks = chunk_text(text)

    documents.extend(chunks)

    logger.info(f"Added {len(chunks)} chunks")

    tokenized_docs = [doc.split() for doc in documents]

    bm25 = BM25Okapi(tokenized_docs)

    logger.info("BM25 index updated with uploaded documents")


def rag_query(question):

    global bm25, documents

    logger.info("Received new query")

    if bm25 is None:
        logger.warning("No documents indexed yet")
        return "No medical documents uploaded yet."

    tokenized_query = question.split()

    scores = bm25.get_scores(tokenized_query)

    top_indices = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:3]

    docs = [documents[i] for i in top_indices]

    logger.info("Retrieved relevant uploaded documents")

    context = "\n\n".join(docs)

    answer = ask_llm(context, question)

    logger.info("Returning final RAG response")

    return answer


logger.info("RAG pipeline ready (waiting for uploaded documents)")
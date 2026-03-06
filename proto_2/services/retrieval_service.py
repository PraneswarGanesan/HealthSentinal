from typing import List
from dataBase.db import get_documents_by_user
from storage.s3_client import download_file
from retrieval.bm25_engine import BM25Engine
from job_queue.cache import cache_get, cache_set
from utils.logger import get_logger


logger = get_logger(__name__)


def retrieve_documents(user_id: str, query: str, top_k: int = 3) -> List[str]:

    cache_key = f"retrieval:{user_id}:{query}"

    cached = cache_get(cache_key)

    if cached:

        logger.info("Retrieval cache hit")

        return cached

    logger.info("Retrieving documents from database")

    docs_metadata = get_documents_by_user(user_id)

    if not docs_metadata:

        logger.info("No documents found")

        return []

    documents = []

    for doc in docs_metadata:

        s3_path = doc["s3_path"]

        file_bytes = download_file(s3_path)

        text = file_bytes.decode("utf-8", errors="ignore")

        documents.append(text)

    if not documents:

        return []

    engine = BM25Engine(documents)

    results = engine.search(query, top_k)

    cache_set(cache_key, results)

    return results
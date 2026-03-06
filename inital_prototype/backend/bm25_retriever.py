from rank_bm25 import BM25Okapi
from backend.logger import logger

class BM25Retriever:

    def __init__(self, documents):

        logger.info("Building BM25 index...")

        self.documents = documents
        tokenized_docs = [doc.split() for doc in documents]

        self.bm25 = BM25Okapi(tokenized_docs)

        logger.info("BM25 index ready")

    def search(self, query, top_k=3):

        logger.info(f"Searching documents for query: {query}")

        tokenized_query = query.split()

        results = self.bm25.get_top_n(
            tokenized_query,
            self.documents,
            n=top_k
        )

        logger.info(f"Retrieved {len(results)} relevant documents")

        return results
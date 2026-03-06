from rank_bm25 import BM25Okapi
from typing import List


def tokenize(text: str) -> List[str]:
    """
    Basic tokenizer.
    Converts text to lowercase and splits on spaces.
    """
    return text.lower().split()


class BM25Engine:

    def __init__(self, documents: List[str]):
        """
        documents: list of raw document strings
        """
        self.documents = documents

        # Tokenize documents
        tokenized_docs = [tokenize(doc) for doc in documents]

        # Build BM25 index
        self.bm25 = BM25Okapi(tokenized_docs)

    def search(self, query: str, top_k: int = 3) -> List[str]:
        """
        Returns top_k most relevant documents for the query
        """

        query_tokens = tokenize(query)

        scores = self.bm25.get_scores(query_tokens)

        ranked_indices = sorted(
            range(len(scores)),
            key=lambda i: scores[i],
            reverse=True
        )

        results = []

        for idx in ranked_indices[:top_k]:
            results.append(self.documents[idx])

        return results
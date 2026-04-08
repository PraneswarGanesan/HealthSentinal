import numpy as np
from sklearn.preprocessing import MinMaxScaler


class HybridRetriever:

    def __init__(self, bm25, sbert):

        self.bm25 = bm25
        self.sbert = sbert
        self.documents = bm25.documents

        self.scaler = MinMaxScaler()


    def search(self, query, top_k=5):

        # Get raw scores
        bm25_scores = np.array(self.bm25.get_scores(query)).reshape(-1,1)
        sbert_scores = np.array(self.sbert.get_scores(query)).reshape(-1,1)

        # Normalize both score vectors
        bm25_norm = self.scaler.fit_transform(bm25_scores).flatten()
        sbert_norm = self.scaler.fit_transform(sbert_scores).flatten()

        # Hybrid weighting
        alpha = 0.7   # increase semantic weight

        hybrid_scores = alpha * sbert_norm + (1 - alpha) * bm25_norm

        ranked_indices = np.argsort(hybrid_scores)[::-1]

        results = [self.documents[i] for i in ranked_indices[:top_k]]

        return results
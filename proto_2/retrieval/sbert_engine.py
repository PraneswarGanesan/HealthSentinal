from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


class SBERT_Engine:



    def __init__(self, documents):

        self.documents = documents

        self.model = SentenceTransformer('all-MiniLM-L6-v2')

        self.doc_embeddings = self.model.encode(documents)

    def get_scores(self, query):
        query_embedding = self.model.encode([query])

        from sklearn.metrics.pairwise import cosine_similarity

        scores = cosine_similarity(query_embedding, self.doc_embeddings)[0]

        return scores

    def search(self, query, top_k=3):

        query_embedding = self.model.encode([query])

        scores = cosine_similarity(query_embedding, self.doc_embeddings)[0]

        ranked_indices = sorted(
            range(len(scores)),
            key=lambda i: scores[i],
            reverse=True
        )


        results = []

        for idx in ranked_indices[:top_k]:
            results.append(self.documents[idx])

        return results


from bm25_engine import BM25Engine

documents = [
    "diabetes treatment insulin therapy",
    "heart disease symptoms chest pain",
    "covid symptoms fever cough",
    "blood pressure hypertension treatment"
]

query = "diabetes symptoms"

bm25 = BM25Engine(documents)

results = bm25.search(query, top_k=3)

print(results)
from bm25_engine import BM25Engine
from sbert_engine import SBERT_Engine
from hybrid_engine import HybridRetriever

documents = [
    "diabetes treatment insulin therapy",
    "heart disease symptoms chest pain",
    "covid symptoms fever cough",
    "blood pressure hypertension treatment"
]

query = "diabetes symptoms"

bm25 = BM25Engine(documents)
sbert = SBERT_Engine(documents)

hybrid = HybridRetriever(bm25, sbert)

results = hybrid.search(query, top_k=3)

print(results)
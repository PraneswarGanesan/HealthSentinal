from sbert_engine import SBERT_Engine

documents = [
    "diabetes treatment insulin therapy",
    "heart disease symptoms chest pain",
    "covid symptoms fever cough",
    "blood pressure hypertension treatment"
]

query = "diabetes symptoms"

engine = SBERT_Engine(documents)

results = engine.search(query, top_k=3)

print(results)
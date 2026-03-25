from bm25_engine import BM25Engine
from sbert_engine import SBERT_Engine
from hybrid_engine import HybridRetriever

import pandas as pd
import time
import matplotlib.pyplot as plt


# ---------------------------
# 1. LOAD DATASET
# ---------------------------

df = pd.read_csv("../../inital_prototype/datasets/medical_transcriptions.csv")

documents = df["transcription"].dropna().tolist()

# limit dataset size for testing
documents = documents[:5000]


# ---------------------------
# 2. TEST QUERIES
# ---------------------------

queries = [

# Diabetes
"diabetes insulin therapy management",
"type 2 diabetes blood sugar control treatment",
"diabetic neuropathy pain management",
"insulin dosage adjustment diabetes patient",

# Heart / Cardiology
"coronary artery disease chest pain symptoms",
"heart valve replacement surgery recovery",
"cardiac arrhythmia treatment medication",
"acute myocardial infarction emergency treatment",
"congestive heart failure fluid retention treatment",

# Hypertension
"hypertension medication blood pressure treatment",
"high blood pressure lifestyle treatment",
"hypertensive crisis emergency management",

# Respiratory
"asthma inhaler breathing difficulty treatment",
"chronic obstructive pulmonary disease therapy",
"pneumonia bacterial infection antibiotic therapy",
"respiratory failure oxygen therapy treatment",
"covid respiratory infection lung symptoms",

# Neurology
"stroke rehabilitation neurological recovery therapy",
"epileptic seizure disorder medication treatment",
"migraine headache neurological management",
"parkinson disease tremor medication therapy",

# Kidney / Nephrology
"chronic kidney disease dialysis treatment",
"acute renal failure management treatment",
"kidney transplant rejection treatment protocol",
"dialysis complications fluid imbalance",

# Gastroenterology
"peptic ulcer disease stomach pain treatment",
"liver cirrhosis complications treatment",
"hepatitis viral infection liver inflammation treatment",
"gastroesophageal reflux disease medication",

# Orthopedic
"knee joint replacement surgery recovery therapy",
"fracture bone healing orthopedic treatment",
"spinal disc herniation nerve pain treatment",

# Infectious Disease
"sepsis systemic infection emergency treatment",
"bacterial infection antibiotic therapy guidelines",
"urinary tract infection antibiotic treatment",
"tuberculosis lung infection medication therapy",

# Endocrinology
"thyroid hormone imbalance treatment",
"hypothyroidism hormone replacement therapy",
"hyperthyroidism medication treatment",

# Oncology
"chemotherapy cancer treatment side effects",
"radiation therapy tumor treatment plan",
"breast cancer surgery treatment protocol"

]


# ---------------------------
# 3. SIMPLE RELEVANCE CHECK
# ---------------------------

def is_relevant(doc, query):

    words = query.lower().split()

    matches = sum(word in doc.lower() for word in words)

    return matches >= 2


# ---------------------------
# 4. METRICS
# ---------------------------

def precision_at_k(results, query, k=5):

    retrieved = results[:k]

    correct = sum(1 for r in retrieved if is_relevant(r, query))

    return correct / k


def recall_at_k(results, query, k=10):

    retrieved = results[:k]

    relevant_total = sum(1 for d in documents if is_relevant(d, query))

    if relevant_total == 0:
        return 0

    correct = sum(1 for r in retrieved if is_relevant(r, query))

    return correct / relevant_total


# ---------------------------
# 5. INITIALIZE RETRIEVERS
# ---------------------------

bm25 = BM25Engine(documents)
sbert = SBERT_Engine(documents)

hybrid = HybridRetriever(bm25, sbert)


# ---------------------------
# 6. RUN EXPERIMENT
# ---------------------------

bm25_precision_scores = []
hybrid_precision_scores = []

bm25_recall_scores = []
hybrid_recall_scores = []

bm25_latency_list = []
hybrid_latency_list = []


for q in queries:

    print("Query:", q)

    # BM25
    start = time.time()
    bm25_results = bm25.search(q, top_k=10)
    bm25_latency_list.append(time.time() - start)

    # Hybrid
    start = time.time()
    hybrid_results = hybrid.search(q, top_k=10)
    hybrid_latency_list.append(time.time() - start)

    # Precision
    bm25_precision_scores.append(
        precision_at_k(bm25_results, q)
    )

    hybrid_precision_scores.append(
        precision_at_k(hybrid_results, q)
    )

    # Recall
    bm25_recall_scores.append(
        recall_at_k(bm25_results, q)
    )

    hybrid_recall_scores.append(
        recall_at_k(hybrid_results, q)
    )


# ---------------------------
# 7. AVERAGE RESULTS
# ---------------------------

bm25_precision = sum(bm25_precision_scores) / len(bm25_precision_scores)
hybrid_precision = sum(hybrid_precision_scores) / len(hybrid_precision_scores)

bm25_recall = sum(bm25_recall_scores) / len(bm25_recall_scores)
hybrid_recall = sum(hybrid_recall_scores) / len(hybrid_recall_scores)

bm25_latency_avg = sum(bm25_latency_list) / len(bm25_latency_list)
hybrid_latency_avg = sum(hybrid_latency_list) / len(hybrid_latency_list)


print("\n---- Retrieval Results ----")

print("BM25 Precision@5:", bm25_precision)
print("Hybrid Precision@5:", hybrid_precision)

print("BM25 Recall@10:", bm25_recall)
print("Hybrid Recall@10:", hybrid_recall)

print("BM25 Latency:", bm25_latency_avg)
print("Hybrid Latency:", hybrid_latency_avg)


# ---------------------------
# GRAPH 1: PRECISION
# ---------------------------

models = ["BM25", "Hybrid"]

precision_values = [bm25_precision, hybrid_precision]

plt.figure(figsize=(6,4))

plt.bar(models, precision_values)

plt.title("BM25 vs Hybrid Retrieval Precision")
plt.xlabel("Retrieval Model")
plt.ylabel("Precision@5")

plt.grid(True)

plt.show()


# ---------------------------
# GRAPH 2: LATENCY vs ACCURACY
# ---------------------------

latency_values = [bm25_latency_avg, hybrid_latency_avg]
accuracy_values = [bm25_precision, hybrid_precision]

plt.figure(figsize=(6,4))

plt.bar(models, accuracy_values)

for i in range(len(models)):
    plt.text(i,
             accuracy_values[i] + 0.01,
             f"{latency_values[i]:.4f}s",
             ha="center")

plt.title("Latency vs Accuracy Trade-off")

plt.xlabel("Retrieval Model")
plt.ylabel("Precision")

plt.grid(True)

plt.show()
import sys
import os

# -------------------------------------------------
# Add project root to Python path
# -------------------------------------------------
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import random
import time
import re
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from tqdm import tqdm
from rank_bm25 import BM25Okapi

from crypto.dilithium_signature import DilithiumSigner


# -------------------------------------------------
# CONFIG
# -------------------------------------------------

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DATASET_PATH = os.path.join(BASE_DIR, "datasets", "medical_transcriptions.csv")

ROUNDS = 5000
TOP_K = 3


# -------------------------------------------------
# TOKENIZER
# -------------------------------------------------

def tokenize(text):
    return re.findall(r'\b[a-z]+\b', text.lower())


# -------------------------------------------------
# LOAD DATASET
# -------------------------------------------------

print("Loading dataset...")

df = pd.read_csv(DATASET_PATH)

documents = df["transcription"].fillna("").tolist()
keywords = df["keywords"].fillna("").tolist()

tokenized_docs = [tokenize(doc) for doc in documents]

bm25 = BM25Okapi(tokenized_docs)

print("Documents loaded:", len(documents))


# -------------------------------------------------
# BM25 EVALUATION
# -------------------------------------------------

precision_scores = []
recall_scores = []
query_times = []

correct_predictions = 0
total_queries = 0

print("\nRunning BM25 evaluation...")

for _ in tqdm(range(ROUNDS)):

    idx = random.randint(0, len(documents) - 1)

    keyword_list = keywords[idx].split(",")

    if not keyword_list:
        continue

    query = keyword_list[0].strip()

    start = time.time()

    scores = bm25.get_scores(tokenize(query))

    ranked_indices = sorted(
        range(len(scores)),
        key=lambda i: scores[i],
        reverse=True
    )

    results = ranked_indices[:TOP_K]

    latency = time.time() - start
    query_times.append(latency)

    query_tokens = set(tokenize(query))

    match_count = 0

    for r in results:

        doc_tokens = set(tokenized_docs[r])

        overlap = query_tokens & doc_tokens

        if len(overlap) > 0:
            match_count += 1

    precision = match_count / TOP_K
    recall = 1 if match_count > 0 else 0

    precision_scores.append(precision)
    recall_scores.append(recall)

    total_queries += 1

    if match_count > 0:
        correct_predictions += 1


accuracy = correct_predictions / total_queries
avg_precision = sum(precision_scores) / len(precision_scores)
avg_recall = sum(recall_scores) / len(recall_scores)
avg_query_time = sum(query_times) / len(query_times)

print("\n========== BM25 RESULTS ==========")
print("Accuracy:", accuracy)
print("Precision@3:", avg_precision)
print("Recall@3:", avg_recall)
print("Average Query Time:", avg_query_time)


# -------------------------------------------------
# DILITHIUM BENCHMARK
# -------------------------------------------------

print("\nRunning Dilithium benchmark...")

signer = DilithiumSigner()

sign_times = []
verify_times = []

sample_docs = random.sample(documents, min(1000, len(documents)))

for doc in tqdm(sample_docs):

    data = doc.encode()

    start = time.time()
    signature = signer.sign_document(data)
    sign_times.append(time.time() - start)

    start = time.time()
    signer.verify_document(data, signature)
    verify_times.append(time.time() - start)


avg_sign_time = sum(sign_times) / len(sign_times)
avg_verify_time = sum(verify_times) / len(verify_times)

print("\n========== DILITHIUM RESULTS ==========")
print("Average Sign Time:", avg_sign_time)
print("Average Verify Time:", avg_verify_time)

print("\n========== BM25 RESULTS ==========")
print("Accuracy:", accuracy)
print("Precision@3:", avg_precision)
print("Recall@3:", avg_recall)
print("Average Query Time:", avg_query_time)


# -------------------------------------------------
# VISUALIZATION (Improved colorful graphs)
# -------------------------------------------------

sns.set_theme(style="whitegrid")

RESULT_DIR = os.path.join(BASE_DIR, "ResultAnalysis")
os.makedirs(RESULT_DIR, exist_ok=True)


# -------------------------------
# BM25 PERFORMANCE BAR CHART
# -------------------------------

metrics_df = pd.DataFrame({
    "Metric": ["Accuracy", "Precision@3", "Recall@3"],
    "Score": [accuracy, avg_precision, avg_recall]
})

plt.figure(figsize=(9,6))

sns.barplot(
    data=metrics_df,
    x="Metric",
    y="Score",
    palette=["#00c853","#2979ff","#ff9100"]
)

plt.title("BM25 Retrieval Performance", fontsize=16)
plt.ylim(0,1)

for index,row in metrics_df.iterrows():
    plt.text(index,row.Score+0.02,f"{row.Score:.2f}",ha='center',fontsize=12)

plt.savefig(os.path.join(RESULT_DIR,"bm25_accuracy_metrics.png"))
plt.close()


# -------------------------------
# PRECISION HISTOGRAM
# -------------------------------

plt.figure(figsize=(10,6))

sns.histplot(
    precision_scores,
    bins=20,
    kde=True,
    color="#2979ff"
)

plt.title("Precision Distribution Across Queries")
plt.xlabel("Precision Score")
plt.ylabel("Frequency")

plt.savefig(os.path.join(RESULT_DIR,"bm25_precision_distribution.png"))
plt.close()


# -------------------------------
# LATENCY HISTOGRAM
# -------------------------------

latency_ms = [t*1000 for t in query_times]

plt.figure(figsize=(10,6))

sns.histplot(
    latency_ms,
    bins=25,
    kde=True,
    color="#ff4081"
)

plt.title("BM25 Query Speed Distribution")
plt.xlabel("Query Time (milliseconds)")
plt.ylabel("Frequency")

plt.savefig(os.path.join(RESULT_DIR,"bm25_latency_distribution.png"))
plt.close()


# -------------------------------
# DILITHIUM SIGN vs VERIFY BAR
# -------------------------------

crypto_df = pd.DataFrame({
    "Operation":["Sign","Verify"],
    "Time":[avg_sign_time*1000,avg_verify_time*1000]
})

plt.figure(figsize=(8,6))

sns.barplot(
    data=crypto_df,
    x="Operation",
    y="Time",
    palette=["#ff5722","#00bcd4"]
)

plt.title("Dilithium Cryptographic Performance")
plt.ylabel("Time (milliseconds)")

for index,row in crypto_df.iterrows():
    plt.text(index,row.Time+0.02,f"{row.Time:.2f} ms",ha='center')

plt.savefig(os.path.join(RESULT_DIR,"dilithium_avg_performance.png"))
plt.close()


# -------------------------------
# SIGN TIME DISTRIBUTION
# -------------------------------

sign_ms = [t*1000 for t in sign_times]

plt.figure(figsize=(10,6))

sns.histplot(
    sign_ms,
    bins=25,
    kde=True,
    color="#00e676"
)

plt.title("Dilithium Signing Time Distribution")
plt.xlabel("Signing Time (milliseconds)")
plt.ylabel("Frequency")

plt.savefig(os.path.join(RESULT_DIR,"dilithium_sign_distribution.png"))
plt.close()


# -------------------------------
# VERIFY TIME DISTRIBUTION
# -------------------------------

verify_ms = [t*1000 for t in verify_times]

plt.figure(figsize=(10,6))

sns.histplot(
    verify_ms,
    bins=25,
    kde=True,
    color="#ffd600"
)

plt.title("Dilithium Verification Time Distribution")
plt.xlabel("Verification Time (milliseconds)")
plt.ylabel("Frequency")

plt.savefig(os.path.join(RESULT_DIR,"dilithium_verify_distribution.png"))
plt.close()


# -------------------------------
# PERFORMANCE HEATMAP
# -------------------------------

heat_data = pd.DataFrame({
    "Metric":["Accuracy","Precision","Recall"],
    "Score":[accuracy,avg_precision,avg_recall]
})

plt.figure(figsize=(6,4))

sns.heatmap(
    heat_data[["Score"]].T,
    annot=True,
    cmap="viridis",
    xticklabels=heat_data["Metric"],
    cbar=True
)

plt.title("BM25 Performance Heatmap")

plt.savefig(os.path.join(RESULT_DIR,"bm25_heatmap.png"))
plt.close()


print("\nGraphs saved to:",RESULT_DIR)
# HealthSentinel

## Secure Post-Quantum Healthcare Document Intelligence using RAG

> **ML-DSA (Dilithium) · BM25 Retrieval · Local Ollama LLM · Redis Caching · AWS S3**

HealthSentinel is a secure healthcare document intelligence platform that combines **Post-Quantum Cryptography**, **Retrieval-Augmented Generation (RAG)**, **Redis caching**, and **fully local Large Language Model inference** to enable safe, private analysis of healthcare documents — without sending any patient data to external APIs.

Users upload healthcare documents and query them using a **BM25 retrieval pipeline combined with a locally running LLM via Ollama**. Documents are digitally signed on ingestion using **ML-DSA (Module Lattice Digital Signature Algorithm, formerly Dilithium)** — a **NIST FIPS 204 standardized Post-Quantum Cryptography algorithm** designed to resist attacks from quantum computers, including Shor's algorithm.

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [Research Contribution](#research-contribution)
- [System Architecture](#system-architecture)
- [Benchmark Results](#benchmark-results)
  - [ML-DSA (Dilithium) Performance](#ml-dsa-dilithium-performance)
  - [BM25 Retrieval Performance](#bm25-retrieval-performance)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Running](#installation--running)
- [Security Considerations](#security-considerations)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Problem Statement

Healthcare systems manage the most sensitive data on earth. Existing AI analytics platforms introduce serious security risks:

- Medical records may be **exposed when using external LLM APIs** (OpenAI, Anthropic, etc.)
- Traditional cryptographic systems like **ECDSA and RSA will become vulnerable** once large-scale quantum computers are available
- Healthcare document systems often **lack intelligent retrieval** and context-aware analysis

HealthSentinel addresses all three by integrating:

| Problem | Solution |
|---|---|
| Data leakage via external AI | 100% local Ollama inference — zero external API calls |
| Quantum-vulnerable signatures | ML-DSA (NIST FIPS 204) post-quantum digital signatures |
| Poor document retrieval | BM25 sparse retrieval + RAG pipeline |
| Slow repeated queries | Redis caching — ~300× speedup |

---

## Research Contribution

HealthSentinel improves on traditional healthcare document systems across every security and performance dimension.

| Component | Traditional Approach | HealthSentinel |
|---|---|---|
| Document Signing | ECDSA / RSA | **ML-DSA (Dilithium) — NIST FIPS 204** |
| AI Inference | External LLM APIs | **Local Ollama — fully air-gapped** |
| Document Retrieval | Keyword search | **BM25 + Retrieval-Augmented Generation** |
| Storage | Local files | **AWS S3 encrypted object storage** |
| Authentication | Basic login | **Supabase PostgreSQL + JWT + Row-Level Security** |
| Query Performance | No optimization | **Redis caching — ~300× latency reduction** |

---

## System Architecture

```
User Authentication (Supabase JWT)
         ↓
Secure Document Upload
         ↓
ML-DSA (Dilithium) Signature Generation
         ↓
AWS S3 Document Storage
         ↓
BM25 Document Indexing
         ↓
User Query
         ↓
Redis Cache Lookup
    ↙         ↘
Cache HIT    Cache MISS
    ↓              ↓
Fast Return    BM25 Retrieval
  (~83ms)          ↓
             Top-k Documents
                   ↓
            Context Construction
                   ↓
           Ollama Local LLM
                   ↓
           RAG Response (~22s)
                   ↓
           Cache Response in Redis
```

---

## Benchmark Results

All benchmarks were run against the [Kaggle Medical Transcriptions dataset](https://www.kaggle.com/datasets/tboyle10/medicaltranscriptions), with **5,000 rounds of randomly generated clinical keyword queries**.

---

### ML-DSA (Dilithium) Performance

ML-DSA signs every uploaded document and verifies every retrieved document, adding cryptographic integrity at the storage layer.

```
========== DILITHIUM RESULTS ==========
Average Sign Time:    2.342 ms   (0.002342 s)
Average Verify Time:  1.402 ms   (0.001402 s)
```

#### Average Cryptographic Operation Times

![Dilithium Average Performance](ResultAnalysis/results/dilithium_avg_performance.png)

Both signing and verification complete well under **3 milliseconds** on average — negligible overhead relative to document upload/retrieval latency, confirming that post-quantum security can be added without meaningful performance penalty.

#### Signing Time Distribution (n = 5,000)

![Dilithium Sign Time Distribution](ResultAnalysis/results/dilithium_sign_distribution.png)

The signing time distribution is tightly concentrated around **1–3 ms**, with a long but low-frequency tail. The vast majority of operations complete in under 5 ms, confirming consistent performance under load.

#### Verification Time Distribution (n = 5,000)

![Dilithium Verify Time Distribution](ResultAnalysis/results/dilithium_verify_distribution.png)

Verification is faster than signing (~1.40 ms average), and even more tightly distributed — the peak is sharply concentrated below 2 ms. This makes real-time document integrity verification practical at scale.

---

### BM25 Retrieval Performance

BM25 sparse retrieval is used to identify the top-k most relevant document chunks before injecting them into the LLM context. Evaluated against the Medical Transcriptions dataset over 5,000 queries.

```
========== BM25 RESULTS ==========
Accuracy:         0.7464  (74.64%)
Precision@3:      0.7405  (74.05%)
Recall@3:         0.7464  (74.64%)
Average Query Time: 4.711 ms   (0.004711 s)
```

#### Retrieval Accuracy, Precision@3, and Recall@3

![BM25 Accuracy Metrics](ResultAnalysis/results/bm25_accuracy_metrics.png)

BM25 achieves consistent performance across all three retrieval metrics — **~74–75%** — demonstrating that sparse retrieval without dense embeddings is effective for clinical document search. This is significant because BM25 requires no GPU, no embedding model, and no vector database.

#### BM25 Performance Heatmap

![BM25 Heatmap](ResultAnalysis/results/bm25_heatmap.png)

The heatmap confirms uniform performance across all three metrics, with Precision@3 marginally lower (0.74) than Accuracy and Recall (0.75) — a typical BM25 characteristic where top-ranked documents are highly relevant but the third result occasionally misses.

#### Query Latency Distribution (n = 5,000)

![BM25 Latency Distribution](ResultAnalysis/results/bm25_latency_distribution.png)

BM25 query times are **heavily concentrated below 5 ms**, with a median under 3 ms. The distribution is right-skewed with very rare outliers — consistent with sparse retrieval over a fixed-size corpus.

#### Precision Distribution Across Queries

![BM25 Precision Distribution](ResultAnalysis/results/bm25_precision_distribution.png)

The bimodal distribution — with peaks near **0 and 1** — reflects BM25's binary-like retrieval behavior: queries either match documents very precisely (precision ≈ 1.0) or miss entirely (precision ≈ 0.0). The dominant mass near 1.0 confirms that the majority of clinical queries retrieve highly relevant documents.

---

### Redis Caching Performance

Load tested using **Autocannon** — 409 requests over 60 seconds against the `/query` endpoint.

| Metric | Value |
|---|---|
| Benchmark Tool | Autocannon |
| Test Duration | 60 seconds |
| Total Requests | 409 |
| Cache Hit Latency (p50) | **83 ms** |
| Cache Hit Latency (avg) | **147 ms** |
| Cache Miss Latency (cold LLM) | **20–26 seconds** |
| Throughput (cached) | **~6.8 req/s** |
| Speed Improvement | **~300×** |

Redis caching eliminates the LLM inference bottleneck for repeated or near-identical clinical queries. The 83 ms median cache hit versus 20–26 second cold inference represents a **~300× measured improvement** — directly impacting clinical workflow response time.

---

## Key Features

### Post-Quantum Security (ML-DSA / Dilithium)

HealthSentinel implements **ML-DSA**, standardized by NIST as FIPS 204 in 2024, to sign every uploaded document. Unlike RSA or ECDSA — which Shor's algorithm on a quantum computer would break — ML-DSA is based on module lattice problems considered hard for both classical and quantum computers.

Every document receives a cryptographic signature at upload time. Signatures are stored separately and verified on retrieval, detecting any tampering.

### Local AI Inference (Ollama)

No patient data is ever transmitted to OpenAI, Anthropic, or any external provider. Ollama runs the LLM entirely within your environment. Every query and every response stays fully within the local network.

Supported models:
- `mistral`
- `llama2` / `llama3`
- Any open model available via `ollama pull`

### BM25 Retrieval-Augmented Generation

Documents are tokenized and indexed using BM25 sparse retrieval. When a clinician submits a query, the top-k most relevant document chunks are retrieved and injected into the LLM context — this is the RAG pipeline.

Advantages over dense embedding retrieval:
- No GPU required
- No embedding model or vector database needed
- Highly interpretable scores
- Effective for structured medical terminology

### Redis Query Caching

Redis caches query-response pairs using a content-hash key. Identical or near-identical queries return in 70–150 ms instead of the 20–26 second LLM inference time.

### Secure Authentication & Storage

- **Supabase PostgreSQL** with JWT and row-level security
- Each user sees only their own documents — enforced at the database level
- **AWS S3** for scalable, encrypted, isolated document storage

---

## Technology Stack

| Layer | Technology |
|---|---|
| Backend | Python, FastAPI, LangChain |
| Retrieval | BM25 (`rank-bm25`) |
| AI Inference | Ollama (Mistral, LLaMA) |
| Post-Quantum Crypto | ML-DSA / Dilithium (NIST FIPS 204) |
| Caching | Redis |
| Auth & Database | Supabase PostgreSQL + JWT |
| Storage | AWS S3 |
| Data Processing | Pandas, NumPy |
| Frontend | React |
| Load Testing | Autocannon |

---

## Project Structure

```
HealthSentinel/
│
├── backend/
│   ├── main.py
│   ├── routers/
│   │   ├── auth_routes.py
│   │   ├── document_routes.py
│   │   └── query_routes.py
│   ├── services/
│   │   ├── rag_service.py
│   │   ├── document_service.py
│   │   ├── redis_cache_service.py
│   │   └── signature_service.py
│   ├── retrieval/
│   │   └── bm25_retriever.py
│   └── llm/
│       └── ollama_client.py
│
├── crypto/
│   └── dilithium_signature.py
│
├── datasets/
│   └── healthcare_documents.csv        # Medical Transcriptions (Kaggle)
│
├── frontend/
│   └── react_app/
│
├── ResultAnalysis/
│   ├── benchmark_query.py
│   └── results/
│       ├── bm25_accuracy_metrics.png
│       ├── bm25_heatmap.png
│       ├── bm25_latency_distribution.png
│       ├── bm25_precision_distribution.png
│       ├── dilithium_avg_performance.png
│       ├── dilithium_sign_distribution.png
│       └── dilithium_verify_distribution.png
│
└── README.md
```

---

## Installation & Running

### 1. Clone the repository

```bash
git clone https://github.com/<username>/HealthSentinel.git
cd HealthSentinel
```

### 2. Install Python dependencies

```bash
pip install -r requirements.txt
```

### 3. Set up Ollama

Install Ollama from [ollama.ai](https://ollama.ai) and pull a model:

```bash
ollama pull mistral
```

Ensure Ollama is running before starting the backend:

```bash
ollama serve
```

### 4. Configure environment variables

Create a `.env` file:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_S3_BUCKET=your_bucket_name
REDIS_URL=redis://localhost:6379
```

### 5. Run the backend

```bash
uvicorn backend.main:app --reload
```

- API: `http://127.0.0.1:8000`
- Swagger Docs: `http://127.0.0.1:8000/docs`

---

## Running Benchmark Tests

### Python latency benchmark (Dilithium + BM25)

```bash
python ResultAnalysis/benchmark_query.py
```

### Autocannon load test (Redis cache throughput)

```bash
autocannon -m POST \
  -H "Content-Type: application/json" \
  -b '{"user_id":"<user_id>","question":"What are diabetes symptoms?"}' \
  -c 1 -d 60 --timeout 120 \
  http://127.0.0.1:8000/query/
```

---

## Example Query

```
Input:  "What treatments are recommended for asthma?"

Pipeline:
  → BM25 retrieves top-k chunks from indexed medical transcriptions
  → Chunks injected into Ollama LLM context
  → Local LLM generates context-aware clinical response
  → Response cached in Redis for future identical queries
```

---

## Security Considerations

| Layer | Mechanism |
|---|---|
| Document Integrity | ML-DSA (NIST FIPS 204) signatures on every upload |
| Authentication | Supabase JWT + Row-Level Security |
| Data Privacy | 100% local LLM — no external API calls |
| Storage | AWS S3 with per-user isolation |
| Query Privacy | Redis caching never exposes user-specific data cross-user |
| Tamper Detection | Signature verification on every document retrieval |

---

## Future Improvements

- [ ] Hybrid retrieval: BM25 + dense vector embeddings (FAISS / pgvector)
- [ ] Encrypted document storage at rest (client-side encryption before S3)
- [ ] Healthcare role-based access control (RBAC)
- [ ] Audit logging for all document access and query events
- [ ] Medical knowledge graph integration
- [ ] GPU-accelerated local inference
- [ ] HIPAA compliance audit trail

---

## Dataset

Benchmarks conducted on the [Medical Transcriptions dataset](https://www.kaggle.com/datasets/tboyle10/medicaltranscriptions) from Kaggle — a corpus of real-world clinical transcription documents covering a wide range of medical specialties. 5,000 rounds of randomly generated clinical keyword queries were used to evaluate both BM25 retrieval and ML-DSA cryptographic performance.

---

## Author

**Praneswar G**  
AI Security · MLOps · Secure AI Systems
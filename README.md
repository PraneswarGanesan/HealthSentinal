# HealthSentinal

## Secure Post-Quantum Healthcare Document Intelligence using RAG

HealthSentinal is a secure healthcare document intelligence system that combines **Post-Quantum Cryptography, Retrieval Augmented Generation (RAG), Redis caching, and Local Large Language Models** to enable safe and private analysis of healthcare documents.

Users can upload healthcare documents and query them using a **BM25 retrieval pipeline combined with a locally running LLM via Ollama**. To ensure long-term cryptographic security, documents are digitally signed using **ML-DSA (Dilithium)** — a **Post-Quantum Cryptography algorithm** designed to resist attacks from quantum computers.

The system performs **local inference**, ensuring that sensitive healthcare data never leaves the environment.

---

# Problem Statement

Healthcare systems manage highly sensitive patient data. Existing AI analytics platforms introduce several security risks:

- Medical records may be exposed when using **external LLM APIs**
- Traditional cryptographic systems like **ECDSA may become vulnerable in the quantum era**
- Healthcare document systems often lack **intelligent retrieval and analysis capabilities**

HealthSentinal addresses these problems by integrating:

- Post-Quantum Security
- Local AI Inference
- Intelligent Document Retrieval
- Secure Cloud Storage
- High-performance query caching

---

# Research Contribution

HealthSentinal improves healthcare document intelligence systems in multiple areas.

| Component | Traditional Approach | HealthSentinal Enhancement |
|----------|---------------------|----------------------------|
| Security | ECDSA | ML-DSA (Dilithium PQC) |
| AI Privacy | External LLM APIs | Local Ollama LLM |
| Retrieval | Keyword search | BM25 + RAG |
| Storage | Local files | AWS S3 secure storage |
| Authentication | Basic login | Supabase PostgreSQL + JWT |
| Performance | No optimization | Redis caching |

---

# System Architecture


User Authentication
↓
Secure Document Upload
↓
ML-DSA (Dilithium) Signature
↓
AWS S3 Document Storage
↓
Document Indexing (BM25)
↓
User Query
↓
Redis Cache Check
↓ ↓
Cache Hit Cache Miss
↓ ↓
Fast Response BM25 Retrieval
↓
Top Documents
↓
Ollama Local LLM
↓
RAG Response
↓
Cache Response


---

# Key Features

## Post-Quantum Security

HealthSentinal implements **ML-DSA (Dilithium)** digital signatures to protect healthcare documents against quantum computing threats.

## Secure User Authentication

Authentication system built using:

- Supabase PostgreSQL
- JWT authentication
- User-specific document isolation

Each query request contains a **user_id**, ensuring secure access control.

## Secure Cloud Storage

Documents are stored in **AWS S3**, providing:

- Scalable storage
- Secure object access
- High reliability

## Intelligent Document Retrieval

The system uses **BM25 sparse retrieval** to locate relevant healthcare documents before passing context to the LLM.

Advantages:

- Fast retrieval
- Lightweight indexing
- Effective for medical documents

## Retrieval Augmented Generation

The RAG pipeline combines document retrieval with LLM reasoning.


User Query
↓
BM25 Retrieval
↓
Top Relevant Documents
↓
Context Construction
↓
Ollama Local LLM
↓
Generated Response


## Local AI Inference

HealthSentinal uses **Ollama** to run LLMs locally.

Supported models:

- Mistral
- LLaMA
- Other open models

Benefits:

- No external API calls
- Complete data privacy
- Offline inference capability

## Redis Query Caching

Redis caching dramatically improves system performance.


Query Received
↓
Redis Cache Lookup
↓
Hit Miss
↓ ↓
Return Run RAG
Cached Pipeline
Response


Performance improvement:

Cold RAG inference latency


20 – 26 seconds


Cached query latency


70 – 150 ms


Speed improvement


~300x faster responses


---

# Benchmark Results

Benchmark performed using **Autocannon load testing**.

Cold execution (LLM generation):


Latency ≈ 20–26 seconds


Cached responses:


Median latency: 83 ms
Average latency: 147 ms
Throughput: ~6.8 req/sec


Example benchmark result:


409 requests in 60.54 seconds
Avg latency: 147 ms
Max latency: 25950 ms


These results demonstrate that **Redis caching removes the LLM inference bottleneck for repeated queries**.

---

# Technology Stack

## Backend


Python
FastAPI
LangChain
BM25 (rank-bm25)


## AI & NLP


Ollama Local LLM
Mistral / LLaMA
Retrieval Augmented Generation


## Security


ML-DSA (Dilithium)
Post-Quantum Cryptography


## Databases


Supabase PostgreSQL
Redis Cache


## Cloud Infrastructure


AWS S3


## Data Processing


Pandas
NumPy


## Frontend


Streamlit (Prototype)
React (Planned)


---

# Project Structure


HealthSentinal
│
├── backend
│ ├── main.py
│ │
│ ├── routers
│ │ ├── auth_routes.py
│ │ ├── document_routes.py
│ │ └── query_routes.py
│ │
│ ├── services
│ │ ├── rag_service.py
│ │ ├── document_service.py
│ │ ├── redis_cache_service.py
│ │ └── signature_service.py
│ │
│ ├── retrieval
│ │ └── bm25_retriever.py
│ │
│ └── llm
│ └── ollama_client.py
│
├── crypto
│ └── dilithium_signature.py
│
├── datasets
│ └── healthcare_documents.csv
│
├── frontend
│ ├── streamlit_app.py
│ └── react_app
│
├── ResultAnalysis
│ ├── benchmark_query.py
│ └── results
│
└── README.md


---

# Installation

Clone the repository


git clone https://github.com/
<username>/HealthSentinal.git
cd HealthSentinal


Install dependencies


pip install -r requirements.txt


---

# Ollama Setup

Install Ollama and download a local model.


ollama pull mistral


Make sure Ollama is running before starting the backend.

---

# Running the Backend


uvicorn backend.main:app --reload


Backend will start at


http://127.0.0.1:8000


API documentation


http://127.0.0.1:8000/docs


---

# Running Benchmark Tests

Python latency benchmark


python ResultAnalysis/benchmark_query.py


Load testing using autocannon


autocannon -m POST
-H "Content-Type: application/json"
-b '{"user_id":"<user_id>","question":"What are diabetes symptoms?"}'
-c 1 -d 60 --timeout 120
http://127.0.0.1:8000/query/


---

# Example Query


What treatments are recommended for asthma?


Workflow:


User Query
↓
BM25 Retrieval
↓
Relevant Healthcare Documents
↓
Ollama LLM
↓
Context-Aware Response


---

# Security Considerations

HealthSentinal protects healthcare data using:

- Post-Quantum Digital Signatures
- Secure User Authentication
- Local LLM inference
- Redis caching
- Secure AWS S3 storage
- Document tamper detection

---

# Future Improvements


Hybrid Retrieval (BM25 + Vector Embeddings)
Encrypted document storage
Healthcare role-based access control
Audit logging
Medical knowledge graph integration
GPU-accelerated inference


---

# Author

Praneswar G

AI Security | MLOps | Secure AI Systems
# HealthSentinal
# HealthSentinal

## Secure Post-Quantum Healthcare Document Intelligence using RAG

HealthSentinal is a secure healthcare document intelligence system that combines **Post-Quantum Cryptography, Retrieval Augmented Generation (RAG), and Local Large Language Models** to enable safe and private analysis of healthcare documents.

The system allows users to upload healthcare records, research papers, or clinical notes and securely query them using a **BM25-based retrieval pipeline and a locally running LLM via Ollama**. To ensure future-proof security, uploaded documents are digitally signed using **ML-DSA (Dilithium)**, a post-quantum cryptographic algorithm designed to resist attacks from quantum computers.

Unlike traditional cloud-based AI systems, HealthSentinal performs **local inference**, ensuring that sensitive medical data never leaves the user's environment. This approach preserves patient privacy while still enabling intelligent document analytics.

---

# Problem Statement

Healthcare systems handle extremely sensitive patient data and clinical information. Existing AI analytics systems introduce several risks:

* Sensitive medical records may be exposed when using external LLM APIs.
* Traditional cryptographic methods like **ECDSA** may become vulnerable in the era of quantum computing.
* Healthcare document systems often lack intelligent retrieval and analytics capabilities.

HealthSentinal addresses these challenges by introducing a **secure AI-driven healthcare document analytics platform** that integrates **post-quantum security, private local inference, and intelligent retrieval mechanisms**.

---

# Research Inspiration

This project is based on a healthcare security research approach and introduces improvements in three major areas:

| Aspect        | Base Approach   | HealthSentinal Improvement            |
| ------------- | --------------- | ------------------------------------- |
| Data Security | ECDSA           | ML-DSA (Dilithium PQC)                |
| Privacy       | FCA Framework   | Local LLM inference using Ollama      |
| Analytics     | RBAC + analysis | BM25 + Retrieval Augmented Generation |

These improvements enable a **future-proof, secure, and intelligent healthcare data analysis platform**.

---

# System Architecture

```
User Uploads Document
        ↓
ML-DSA (Dilithium) Signature
        ↓
Secure Document Storage
        ↓
BM25 Retriever
        ↓
Top Relevant Documents
        ↓
Ollama Local LLM
        ↓
RAG Response
```

The system securely processes healthcare documents and allows users to perform natural language queries against them.

---

# Key Features

## Post-Quantum Security

HealthSentinal implements **ML-DSA (Dilithium)** digital signatures to protect healthcare documents from future quantum attacks.

## Privacy-Preserving AI

All AI inference is performed locally using **Ollama**, ensuring that sensitive medical data is never transmitted to external APIs.

## Intelligent Healthcare Document Retrieval

The system uses **BM25 sparse retrieval** to efficiently locate the most relevant medical documents before passing them to the language model.

## Secure Document Integrity

Uploaded documents are signed using Dilithium signatures, ensuring that any tampering with medical data can be detected.

## Retrieval Augmented Generation

HealthSentinal integrates a **RAG pipeline** that combines document retrieval with LLM reasoning to provide context-aware responses.

---

# Technology Stack

### Backend

* Python
* FastAPI
* LangChain
* BM25 (rank-bm25)

### AI & NLP

* Ollama Local LLM
* Mistral / LLaMA Models
* Retrieval Augmented Generation

### Security

* ML-DSA (Dilithium)
* Post-Quantum Cryptography

### Data Processing

* Pandas
* Numpy
* Medical Document Datasets

### Frontend

* Streamlit or React

---

# Project Structure

```
HealthSentinal/
│
├── backend
│   ├── app.py
│   ├── rag_pipeline.py
│   ├── bm25_retriever.py
│   ├── ollama_client.py
│   ├── document_storage.py
│   └── signature_service.py
│
├── crypto
│   └── dilithium_signature.py
│
├── datasets
│   └── healthcare_documents.csv
│
├── frontend
│   ├── streamlit_app.py
│   └── react_app
│
├── requirements.txt
└── README.md
```

---

# Installation

Clone the repository

```
git clone https://github.com/<your-username>/HealthSentinal.git
cd HealthSentinal
```

Install dependencies

```
pip install -r requirements.txt
```

---

# Ollama Setup

Install Ollama and download a local model.

```
ollama pull mistral
```

Run Ollama locally before starting the backend.

---

# Running the Backend

```
uvicorn backend.app:app --reload
```

The API server will start at

```
http://localhost:8000
```

---

# Running the Frontend (Streamlit)

```
streamlit run frontend/streamlit_app.py
```

---

# Example Use Case

1. Upload healthcare documents or clinical reports
2. System signs the document using **Dilithium PQC signatures**
3. Document is securely stored
4. BM25 retrieves relevant records for a query
5. Context is sent to the **local Ollama LLM**
6. The system returns an **AI-generated healthcare insight**

Example query:

```
What treatments are recommended for asthma?
```

The system retrieves relevant medical documents and generates a context-aware response.

---

# Security Considerations

HealthSentinal prioritizes healthcare data protection through:

* Post-Quantum Digital Signatures
* Local LLM Inference
* Secure Document Verification
* Tamper Detection via Signature Validation

These mechanisms ensure that healthcare information remains **secure, private, and trustworthy**.

---

# Future Improvements

* Hybrid retrieval (BM25 + vector embeddings)
* Secure encrypted document storage
* Role-based healthcare access control
* Audit logs for medical document access
* Advanced medical analytics dashboards

---

# License

This project is intended for **research and academic purposes**, focusing on secure AI systems for healthcare data analysis.

---

# Author

**Praneswar G**

AI Security | MLOps | Secure AI Systems

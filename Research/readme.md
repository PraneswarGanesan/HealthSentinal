


# Literature Survey

This section reviews existing research related to healthcare document intelligence, medical natural language processing, and Retrieval-Augmented Generation (RAG) systems. The goal is to understand the strengths and limitations of current approaches and identify the research gap addressed by the proposed **HealthSentinal** system.

---

## Overview

Healthcare institutions generate massive amounts of unstructured clinical text such as medical reports, transcription records, discharge summaries, and diagnostic documentation. Extracting meaningful insights from this data has been a long-standing challenge in medical informatics. Traditional rule-based systems and keyword search methods are limited in their ability to understand context and complex medical terminology.

Recent advancements in **Large Language Models (LLMs)** and **Retrieval-Augmented Generation (RAG)** have significantly improved the ability of AI systems to process and interpret complex textual data. However, many existing healthcare AI systems suffer from issues such as hallucination, privacy risks, and limited explainability.

To better understand these limitations, several recent research works and systems were studied and compared.

---

# Comparative Literature Analysis

| No | Paper / System | Year | Method / Technology | Application | Limitation | Comparison with HealthSentinal |
|----|----------------|------|--------------------|-------------|------------|-------------------------------|
| 1 | Retrieval-Augmented Generation in Healthcare (Neha et al.) | 2025 | Systematic RAG architectures | Medical QA, EHR analysis | Limited privacy protection | HealthSentinal introduces secure architecture |
| 2 | MedRAG | 2025 | RAG + Knowledge Graph | Clinical diagnosis support | Requires structured knowledge graph | HealthSentinal works with unstructured medical documents |
| 3 | Self-MedRAG | 2026 | Hybrid RAG + self-reflection | Medical question answering | Computationally expensive | HealthSentinal uses lightweight BM25 retrieval |
| 4 | RAGCare-QA Benchmark | 2025 | RAG evaluation dataset | Medical QA benchmarking | Only evaluation dataset | HealthSentinal implements a full working system |
| 5 | RAG for Clinical Guidelines | 2025 | LLM + RAG | Clinical guideline retrieval | Limited scalability | HealthSentinal supports scalable document intelligence |
| 6 | Healthcare RAG Chatbot | 2025 | RAG chatbot architecture | Patient query systems | Domain limited | HealthSentinal supports multi-specialty medical documents |
| 7 | Clinical Decision Support using NLP | 2024 | NLP-based models | Hospital decision support | Not generative AI | HealthSentinal integrates generative reasoning |
| 8 | Biomedical NLP Benchmark | 2025 | Transformer-based NLP models | Clinical text processing | No retrieval grounding | HealthSentinal uses retrieval grounded responses |
| 9 | RAG for Clinical Text Summarization | 2024 | LLM + RAG | EHR summarization | Limited document types | HealthSentinal supports large document repositories |
| 10 | RAG for Surgical Decision Support | 2025 | RAG with clinical guidelines | Preoperative decision systems | High computational cost | HealthSentinal designed for efficient processing |
| 11 | Healthcare RAG Survey | 2025 | Literature review | Healthcare AI analysis | Not an implemented system | HealthSentinal provides real implementation |
| 12 | NLP Document Intelligence Systems | 2025 | NLP pipelines | Document classification | No security architecture | HealthSentinal focuses on secure document intelligence |
| 13 | AI Clinical Query Understanding | 2025 | NLP query interpretation | Clinical query processing | No generative reasoning | HealthSentinal integrates RAG reasoning |
| 14 | Benchmarking Medical RAG Systems | 2024 | Multi-LLM evaluation | Medical QA benchmarking | No privacy focus | HealthSentinal designed for secure processing |
| 15 | MEGA-RAG Healthcare Framework | 2025 | Advanced RAG pipeline | Rare disease information retrieval | Requires large datasets | HealthSentinal designed for moderate datasets |
| 16 | RAG Optimization Framework | 2025 | Multi-retriever architecture | Hallucination reduction | Complex architecture | HealthSentinal simpler and efficient architecture |
| 17 | **HealthSentinal (Proposed System)** | 2026 | **Secure RAG + BM25 + Local LLM** | **Healthcare document intelligence** | — | **Privacy-preserving and secure RAG system** |

---

# Key Observations from Literature

The literature review highlights several important observations regarding the current state of healthcare AI systems:

- Many systems focus on **medical question answering rather than document intelligence**.
- Several RAG architectures rely heavily on **large structured datasets or knowledge graphs**.
- Privacy protection and secure architecture are **not strongly addressed in most systems**.
- Cloud-based AI services introduce **potential risks when handling sensitive healthcare data**.
- Some advanced RAG systems require **high computational resources**, limiting real-world deployment.

---

# Research Gap

Based on the analysis of existing literature, the following research gaps were identified:

- Lack of **secure healthcare document intelligence systems**
- Limited use of **privacy-preserving local AI architectures**
- Need for **efficient retrieval methods for large medical document repositories**
- Requirement for systems that reduce **LLM hallucinations through retrieval grounding**

These gaps motivate the development of the **HealthSentinal framework**, which combines secure document processing, BM25 retrieval mechanisms, and locally deployed language models to provide reliable and privacy-preserving healthcare document intelligence.

---

# Summary

The literature survey demonstrates that while significant progress has been made in healthcare AI and RAG-based systems, existing solutions still face challenges in terms of privacy, scalability, and document intelligence capabilities. The proposed **HealthSentinal** system aims to address these limitations by introducing a secure and efficient RAG-based architecture tailored for healthcare document analysis.
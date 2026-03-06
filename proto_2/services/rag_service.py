from typing import List
from llm.ollama_client import generate_response
from job_queue.cache import cache_get, cache_set
import hashlib
from utils.logger import get_logger


logger = get_logger(__name__)


def build_context(documents: List[str]) -> str:

    logger.info("Building RAG context")

    return "\n\n".join(documents)


def answer_question(question: str, retrieved_docs: List[str]) -> str:

    if not retrieved_docs:

        return "No relevant documents found."

    context = build_context(retrieved_docs)

    context_hash = hashlib.sha256(context.encode()).hexdigest()

    cache_key = f"rag:{question}:{context_hash}"

    cached = cache_get(cache_key)

    if cached:

        logger.info("RAG cache hit")

        return cached

    prompt = f"""
You are a healthcare assistant.

Use the following context to answer the question.

Context:
{context}

Question:
{question}

Answer:
"""

    logger.info("Sending prompt to Ollama")

    answer = generate_response(prompt)
    if answer and answer != "LLM generation failed.":
        cache_set(cache_key, answer)


    return answer
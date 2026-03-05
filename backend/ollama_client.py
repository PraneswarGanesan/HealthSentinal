import ollama
from backend.logger import logger

def ask_llm(context, question):

    logger.info("Sending context to Ollama model")

    prompt = f"""
Use the following medical documents to answer.

Context:
{context}

Question:
{question}
"""

    response = ollama.chat(
        model="mistral",
        messages=[{"role": "user", "content": prompt}]
    )

    logger.info("LLM response generated")

    return response["message"]["content"]
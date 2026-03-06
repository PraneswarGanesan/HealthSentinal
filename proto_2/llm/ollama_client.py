import requests
from utils.config import settings
from utils.logger import get_logger

logger = get_logger(__name__)


def generate_response(prompt: str) -> str:
    try:
        url = f"{settings.OLLAMA_URL}/api/generate"

        payload = {
            "model": settings.OLLAMA_MODEL,
            "prompt": prompt,
            "stream": False
        }

        response = requests.post(url, json=payload, timeout=120)
        response.raise_for_status()

        data = response.json()

        return data.get("response", "")

    except Exception as e:
        logger.error(f"Ollama request failed: {e}")
        return "LLM generation failed."
import os
from dotenv import load_dotenv


load_dotenv()


class Settings:

    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")

    AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
    AWS_REGION = os.getenv("AWS_REGION")
    S3_BUCKET = os.getenv("S3_BUCKET")

    REDIS_URL = os.getenv("REDIS_URL")
    REDIS_TOKEN = os.getenv("REDIS_TOKEN")

    JWT_SECRET = os.getenv("JWT_SECRET")
    JWT_EXPIRATION = int(os.getenv("JWT_EXPIRATION", "60000"))

    OLLAMA_URL = os.getenv("OLLAMA_URL")
    OLLAMA_MODEL = os.getenv("OLLAMA_MODEL")


settings = Settings()
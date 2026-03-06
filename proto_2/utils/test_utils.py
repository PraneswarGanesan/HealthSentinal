from utils.config import settings
from utils.logger import get_logger

logger = get_logger("utils_test")

logger.info("Testing logger")

print("Supabase URL:", settings.SUPABASE_URL)
print("S3 Bucket:", settings.S3_BUCKET)
print("Redis URL:", settings.REDIS_URL)
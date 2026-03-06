import redis
import json
from utils.config import settings
from utils.logger import get_logger


logger = get_logger(__name__)


# Create Redis connection
redis_client = redis.from_url(settings.REDIS_URL)


QUEUE_NAME = "healthsentinel_jobs"


# -----------------------------
# PUSH JOB
# -----------------------------

def push_job(job_data: dict):

    try:

        payload = json.dumps(job_data)

        redis_client.lpush(QUEUE_NAME, payload)

        logger.info(f"Job pushed to queue: {job_data}")

        return True

    except Exception as e:

        logger.error(f"Redis push failed: {e}")
        raise


# -----------------------------
# POP JOB
# -----------------------------

def pop_job():

    try:

        job = redis_client.rpop(QUEUE_NAME)

        if job:

            job_data = json.loads(job)

            logger.info(f"Job popped from queue: {job_data}")

            return job_data

        return None

    except Exception as e:

        logger.error(f"Redis pop failed: {e}")
        raise


# -----------------------------
# QUEUE SIZE
# -----------------------------

def get_queue_size():

    try:

        return redis_client.llen(QUEUE_NAME)

    except Exception as e:

        logger.error(f"Redis queue size check failed: {e}")
        raise
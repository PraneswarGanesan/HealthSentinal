import json
import redis
from utils.config import settings

redis_client = redis.from_url(settings.REDIS_URL)


def cache_set(key: str, value, ttl: int = 3600):

    redis_client.setex(
        key,
        ttl,
        json.dumps(value)
    )


def cache_get(key: str):

    data = redis_client.get(key)

    if data:
        return json.loads(data)

    return None
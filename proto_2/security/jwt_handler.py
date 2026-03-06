from jose import jwt, JWTError
from datetime import datetime, timedelta
from utils.config import settings
from utils.logger import get_logger


logger = get_logger(__name__)


SECRET = settings.JWT_SECRET
EXPIRATION = settings.JWT_EXPIRATION
ALGORITHM = "HS256"


def create_token(user_id: str):

    expire = datetime.utcnow() + timedelta(seconds=EXPIRATION)

    payload = {
        "user_id": user_id,
        "exp": expire
    }

    token = jwt.encode(payload, SECRET, algorithm=ALGORITHM)

    return token


def verify_token(token: str):

    try:

        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])

        return payload

    except JWTError as e:

        logger.error(f"JWT verification failed: {e}")

        return None
from passlib.context import CryptContext
from utils.logger import get_logger

logger = get_logger(__name__)

# Use Argon2 instead of bcrypt
pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated="auto"
)


def hash_password(password: str) -> str:

    logger.info("Hashing password")

    return pwd_context.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:

    logger.info("Verifying password")

    return pwd_context.verify(password, hashed_password)
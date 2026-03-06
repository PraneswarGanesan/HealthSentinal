from dataBase.db import create_user, get_user_by_email
from security.hashing import hash_password, verify_password
from security.jwt_handler import create_token
from utils.logger import get_logger


logger = get_logger(__name__)


def signup(email: str, password: str):

    existing = get_user_by_email(email)

    if existing:
        raise Exception("User already exists")

    password_hash = hash_password(password)

    response = create_user(email, password_hash)

    if not response:
        raise Exception("User creation failed")

    # Supabase insert returns list
    if isinstance(response, list):
        user = response[0]
    else:
        user = response

    token = create_token(user["id"])

    logger.info(f"User created: {email}")

    return {
        "user": {
            "id": user["id"],
            "email": user["email"]
        },
        "token": token
    }


def login(email: str, password: str):

    response = get_user_by_email(email)

    if not response:
        raise Exception("User not found")

    # Handle both dict and list
    if isinstance(response, list):
        user = response[0]
    else:
        user = response

    if not verify_password(password, user["password_hash"]):
        raise Exception("Invalid credentials")

    token = create_token(user["id"])

    logger.info(f"User login successful: {email}")

    return {
        "user": {
            "id": user["id"],
            "email": user["email"]
        },
        "token": token
    }
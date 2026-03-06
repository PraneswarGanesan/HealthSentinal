from dataBase.db import create_user, get_user_by_email
from utils.logger import get_logger


logger = get_logger("db_test")


def run_test():

    print("\nTesting Supabase connection...\n")

    test_email = "test_user@example.com"
    password_hash = "fake_hash_for_test"

    # Create user
    user = create_user(test_email, password_hash)

    print("User inserted:", user)

    # Fetch user
    fetched = get_user_by_email(test_email)

    print("Fetched user:", fetched)

    if fetched:
        logger.info("Database test successful")
    else:
        logger.error("Database test failed")


if __name__ == "__main__":
    run_test()
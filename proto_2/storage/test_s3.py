from storage.s3_client import (
    upload_file,
    download_file,
    delete_file,
    generate_document_path
)

from utils.logger import get_logger


logger = get_logger("s3_test")


def run_test():

    print("\nTesting S3 connection...\n")

    user_id = "test-user"
    filename = "test_file.txt"

    content = b"Hello from HealthSentinel S3 test"

    path = generate_document_path(user_id, filename)

    print("Upload path:", path)


    # Upload
    upload_file(content, path)
    print("Upload successful")


    # Download
    downloaded = download_file(path)

    print("Downloaded content:", downloaded.decode())


    # Delete
    delete_file(path)

    print("Delete successful")


    logger.info("S3 storage test completed successfully")


if __name__ == "__main__":
    run_test()
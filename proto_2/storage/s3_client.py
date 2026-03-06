import boto3
from botocore.exceptions import ClientError
from utils.config import settings
from utils.logger import get_logger


logger = get_logger(__name__)


# Initialize S3 client
s3 = boto3.client(
    "s3",
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    region_name=settings.AWS_REGION
)

BUCKET = settings.S3_BUCKET


# -----------------------------
# PATH GENERATORS
# -----------------------------

def generate_document_path(user_id: str, filename: str):

    return f"users/{user_id}/documents/{filename}"


def generate_signature_path(user_id: str, filename: str):

    return f"users/{user_id}/signatures/{filename}.sig"


# -----------------------------
# UPLOAD
# -----------------------------

def upload_file(file_bytes: bytes, key: str):

    try:

        s3.put_object(
            Bucket=BUCKET,
            Key=key,
            Body=file_bytes
        )

        logger.info(f"File uploaded to S3: {key}")

        return key

    except ClientError as e:

        logger.error(f"S3 upload failed: {e}")
        raise


# -----------------------------
# DOWNLOAD
# -----------------------------

def download_file(key: str):

    try:

        response = s3.get_object(
            Bucket=BUCKET,
            Key=key
        )

        logger.info(f"File downloaded from S3: {key}")

        return response["Body"].read()

    except ClientError as e:

        logger.error(f"S3 download failed: {e}")
        raise


# -----------------------------
# DELETE
# -----------------------------

def delete_file(key: str):

    try:

        s3.delete_object(
            Bucket=BUCKET,
            Key=key
        )

        logger.info(f"S3 object deleted: {key}")

        return True

    except ClientError as e:

        logger.error(f"S3 delete failed: {e}")
        raise
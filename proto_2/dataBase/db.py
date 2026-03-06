from supabase import create_client
from utils.config import settings
from utils.logger import get_logger


logger = get_logger(__name__)


# Initialize Supabase client
supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


# -----------------------------
# USER FUNCTIONS
# -----------------------------

def create_user(email: str, password_hash: str):

    try:

        response = supabase.table("users").insert({
            "email": email,
            "password_hash": password_hash
        }).execute()

        return response.data

    except Exception as e:

        logger.error(f"Error creating user: {e}")
        raise


def get_user_by_email(email: str):

    try:

        response = supabase.table("users").select("*").eq("email", email).execute()

        if response.data:
            return response.data[0]

        return None

    except Exception as e:

        logger.error(f"Error fetching user by email: {e}")
        raise


def get_user_by_id(user_id: str):

    try:

        response = supabase.table("users").select("*").eq("id", user_id).execute()

        if response.data:
            return response.data[0]

        return None

    except Exception as e:

        logger.error(f"Error fetching user by id: {e}")
        raise


# -----------------------------
# DOCUMENT FUNCTIONS
# -----------------------------

def insert_document(user_id, filename, s3_path, signature_path):

    try:

        response = supabase.table("documents").insert({
            "user_id": user_id,
            "filename": filename,
            "s3_path": s3_path,
            "signature_path": signature_path
        }).execute()

        return response.data

    except Exception as e:

        logger.error(f"Error inserting document: {e}")
        raise


def get_document_by_id(document_id):

    try:

        response = supabase.table("documents").select("*").eq("id", document_id).execute()

        if response.data:
            return response.data[0]

        return None

    except Exception as e:

        logger.error(f"Error fetching document: {e}")
        raise


def get_documents_by_user(user_id):

    try:

        response = supabase.table("documents").select("*").eq("user_id", user_id).execute()

        return response.data

    except Exception as e:

        logger.error(f"Error fetching documents for user: {e}")
        raise


def delete_document(document_id):

    try:

        response = supabase.table("documents").delete().eq("id", document_id).execute()

        return response.data

    except Exception as e:

        logger.error(f"Error deleting document: {e}")
        raise


def update_document(document_id, filename=None, s3_path=None, signature_path=None):

    try:

        payload = {}

        if filename:
            payload["filename"] = filename

        if s3_path:
            payload["s3_path"] = s3_path

        if signature_path:
            payload["signature_path"] = signature_path

        response = supabase.table("documents").update(payload).eq("id", document_id).execute()

        return response.data

    except Exception as e:

        logger.error(f"Error updating document: {e}")
        raise
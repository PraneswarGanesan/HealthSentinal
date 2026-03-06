from pqc.sign import dilithium2
import hashlib
from utils.logger import get_logger


logger = get_logger(__name__)


class DilithiumSigner:

    def __init__(self):

        logger.info("Initializing Dilithium2 signer")

        self.public_key, self.private_key = dilithium2.keypair()

        logger.info("Dilithium keypair generated")


    def sign_document(self, data: bytes):

        logger.info("Signing document")

        signature = dilithium2.sign(data, self.private_key)

        return signature


    def verify_document(self, data: bytes, signature):

        logger.info("Verifying signature")

        try:

            dilithium2.verify(signature, data, self.public_key)

            return True

        except Exception as e:

            logger.error(f"Signature verification failed: {e}")

            return False


def hash_document(data: bytes):

    logger.info("Generating SHA256 hash")

    return hashlib.sha256(data).digest()
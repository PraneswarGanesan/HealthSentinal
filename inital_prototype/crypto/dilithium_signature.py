from pqc.sign import dilithium2
import hashlib
from backend.logger import logger


class DilithiumSigner:

    def __init__(self):

        logger.info("Initializing Dilithium2 signer")

        # Generate keypair
        self.public_key, self.private_key = dilithium2.keypair()

        logger.info("Dilithium keypair generated")

    def sign_document(self, data: bytes):

        logger.info("Signing document with Dilithium2")

        signature = dilithium2.sign(data, self.private_key)

        logger.info("Signature created")

        return signature

    def verify_document(self, data: bytes, signature):

        logger.info("Verifying Dilithium signature")

        try:
            # Correct argument order
            dilithium2.verify(signature, data, self.public_key)

            logger.info("Signature verification successful")

            return True

        except Exception as e:

            logger.error(f"Signature verification failed: {str(e)}")

            return False


def hash_document(data: bytes):

    logger.info("Generating SHA256 hash")

    return hashlib.sha256(data).digest()
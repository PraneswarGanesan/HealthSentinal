from security.hashing import hash_password, verify_password
from security.jwt_handler import create_token, verify_token
from security.dilithium_signature import DilithiumSigner, hash_document


def run_test():

    print("\nSECURITY MODULE TEST\n")

    # Password hashing
    password = "secure_password"
    hashed = hash_password(password)
    print("Password verification:", verify_password(password, hashed))

    # JWT
    token = create_token("test_user")
    print("JWT:", token)
    print("Decoded:", verify_token(token))

    # Dilithium
    signer = DilithiumSigner()

    message = b"HealthSentinel test message"

    signature = signer.sign_document(message)

    verified = signer.verify_document(message, signature)

    print("Signature verified:", verified)

    print("SHA256 hash:", hash_document(message).hex())


if __name__ == "__main__":
    run_test()
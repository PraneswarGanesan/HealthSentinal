## Security and authentication Module
I have implemeneted the dilithium signature for hashing and sotring the values in our documents are hased with the SHA-25 algorithm and further it is been signed with this algorithm so in the future even if quantum computing comes the files of the users will not be modified except the owner itself.
TO testing this module you have to go the proto_2 folder from there run the below command.

```
python -m security.test_security
```

## Expected output
```
(venv) PS E:\Skct\4th year 2025-2026\project(2)\HealthSentinal\proto_2> python -m security.test_security

SECURITY MODULE TEST

2026-03-06 19:44:16 | INFO | security.hashing:hash_password:15 | Hashing password
2026-03-06 19:44:16 | INFO | security.hashing:verify_password:22 | Verifying password
Password verification: True
JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdF91c2VyIiwiZXhwIjoxNzcyODY2NDU2fQ.vgolnlvmdu4afh2x5zeiEHHdMzHi4Ginmwitt_Wy3Ps
Decoded: {'user_id': 'test_user', 'exp': 1772866456}
2026-03-06 19:44:16 | INFO | security.dilithium_signature:__init__:13 | Initializing Dilithium2 signer
2026-03-06 19:44:16 | INFO | security.dilithium_signature:__init__:17 | Dilithium keypair generated
2026-03-06 19:44:16 | INFO | security.dilithium_signature:sign_document:22 | Signing document
2026-03-06 19:44:16 | INFO | security.dilithium_signature:verify_document:31 | Verifying signature
Signature verified: True
2026-03-06 19:44:16 | INFO | security.dilithium_signature:hash_document:48 | Generating SHA256 hash
SHA256 hash: be2e9402ecc518d039f4cd197c2ac8700643dccbd010e8dc734ca541a9c6140e
(venv) PS E:\Skct\4th year 2025-2026\project(2)\HealthSentinal\proto_2> 
```
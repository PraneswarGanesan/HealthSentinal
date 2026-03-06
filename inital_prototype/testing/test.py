from pqc.sign import dilithium2

pk, sk = dilithium2.keypair()

msg = b"healthsentinal"

sig = dilithium2.sign(msg, sk)

try:
    dilithium2.verify(sig, msg, pk)
    print("Signature valid")
except:
    print("Verification failed")
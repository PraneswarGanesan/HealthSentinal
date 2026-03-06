from services.document_service import upload_document
from services.retrieval_service import retrieve_documents
from services.rag_service import answer_question


def run_test():

    print("\n=== RAG PIPELINE TEST ===\n")

    user_id = "8747b4a4-afd3-4df8-8fe2-950bb6ea9854"

    filename = "diabetes_test.txt"

    content = b"""
Diabetes is a chronic disease caused by high blood sugar levels.
Common symptoms include frequent urination, increased thirst,
fatigue, blurred vision, and slow healing wounds.
Type 1 diabetes occurs when the body produces little or no insulin.
Type 2 diabetes occurs when the body becomes resistant to insulin.
"""

    try:

        print("Uploading test document...")

        upload_document(user_id, filename, content)

        print("Document uploaded successfully\n")

    except Exception as e:

        print("Upload failed:", e)
        return

    question = "What diseases are related to high blood sugar?"

    print("Question:", question)

    docs = retrieve_documents(user_id, question)

    if not docs:

        print("\nNo documents retrieved\n")
        return

    print("\nRetrieved Documents:\n")

    for d in docs:
        print("-" * 40)
        print(d[:200])

    answer = answer_question(question, docs)

    print("\nLLM Answer:\n")
    print(answer)


if __name__ == "__main__":
    run_test()


# import requests
# print(
#     requests.post(
#         "http://localhost:11434/api/generate",
#         json={
#             "model": "mistral",
#             "prompt": "Explain diabetes in one sentence.",
#             "stream": False
#         }
#     ).json()
# )


# import redis
# from utils.config import settings

# r = redis.from_url(settings.REDIS_URL)
# r.flushall()

# print("Redis cache cleared")
from fastapi import APIRouter
from services.retrieval_service import retrieve_documents
from services.rag_service import answer_question

router = APIRouter(prefix="/query")


@router.post("/")
def ask_question(data: dict):

    user_id = data["user_id"]
    question = data["question"]

    docs = retrieve_documents(user_id, question)

    answer = answer_question(question, docs)

    return {
        "answer": answer,
        "documents": docs
    }
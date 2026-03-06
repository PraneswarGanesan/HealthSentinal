from fastapi import APIRouter
from services.auth_service import signup, login

router = APIRouter(prefix="/auth")


@router.post("/signup")
def signup_route(data: dict):
    return signup(data["email"], data["password"])


@router.post("/login")
def login_route(data: dict):
    return login(data["email"], data["password"])
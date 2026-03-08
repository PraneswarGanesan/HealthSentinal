from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.auth_routes import router as auth_router
from api.document_routes import router as document_router
from api.query_routes import router as query_router

app = FastAPI(title="HealthSentinel API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "HealthSentinel running"}

app.include_router(auth_router)
app.include_router(document_router)
app.include_router(query_router)
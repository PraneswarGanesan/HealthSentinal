from fastapi import FastAPI
from api.auth_routes import router as auth_router
from api.document_routes import router as document_router
from api.query_routes import router as query_router


app = FastAPI(title="HealthSentinel API")


@app.get("/")
def root():
    return {"status": "HealthSentinel running"}


app.include_router(auth_router)
app.include_router(document_router)
app.include_router(query_router)
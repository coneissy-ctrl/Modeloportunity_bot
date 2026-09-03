from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.api.routes import router
from app.database.db import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(title="Modeloportunity Bot API", version="0.1.0", lifespan=lifespan)
app.include_router(router)

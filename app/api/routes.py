from fastapi import APIRouter, Header, HTTPException, Request
from app.config import get_settings
from app.database.db import SessionLocal
from app.telegram.client import TelegramClient
from app.telegram.handlers import handle_update

router = APIRouter()


@router.get("/health")
async def health():
    return {"status": "ok"}


@router.post("/telegram/webhook")
async def telegram_webhook(request: Request, x_telegram_bot_api_secret_token: str | None = Header(default=None)):
    settings = get_settings()
    if x_telegram_bot_api_secret_token != settings.telegram_webhook_secret:
        raise HTTPException(status_code=401, detail="Invalid webhook secret")
    update = await request.json()
    with SessionLocal() as db:
        result = await handle_update(update, db)
    if result:
        chat_id, text, reply_markup = result
        await TelegramClient().send_message(chat_id, text, reply_markup)
    return {"ok": True}

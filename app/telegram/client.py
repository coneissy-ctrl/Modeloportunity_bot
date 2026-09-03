import httpx
from app.config import get_settings


class TelegramClient:
    def __init__(self):
        self.token = get_settings().telegram_bot_token

    async def send_message(self, chat_id: int, text: str, reply_markup: dict | None = None) -> None:
        if not self.token:
            return
        url = f"https://api.telegram.org/bot{self.token}/sendMessage"
        payload = {"chat_id": chat_id, "text": text}
        if reply_markup:
            payload["reply_markup"] = reply_markup
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.post(url, json=payload)
            response.raise_for_status()

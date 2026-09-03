from app.auth.service import AuthService
from app.referrals.service import ReferralService

async def handle_update(update: dict, db) -> tuple[int, str] | None:
    message = update.get("message")
    if not message or "from" not in message or "chat" not in message:
        return None
    telegram_user = message["from"]
    user = AuthService(db).get_or_create_user(telegram_user)
    AuthService.require_active(user)
    text = message.get("text", "").strip()
    if text.startswith("/start"):
        parts = text.split(maxsplit=1)
        code = parts[1] if len(parts) == 2 else None
        ReferralService(db).attribute(user, code)
        return message["chat"]["id"], "Welcome to Modeloportunity. Your account is ready."
    if text == "/id":
        return message["chat"]["id"], f"Your Telegram ID: {user.telegram_id}"
    if text == "/admin":
        try:
            AuthService.require_admin(user)
            return message["chat"]["id"], "Admin access confirmed."
        except PermissionError:
            return message["chat"]["id"], "You are not authorized for admin commands."
    return message["chat"]["id"], "Use /start to begin or /id to view your Telegram ID."

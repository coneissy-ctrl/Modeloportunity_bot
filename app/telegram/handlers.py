from app.auth.service import AuthService
from app.referrals.service import ReferralService
from app.affiliates.service import AffiliateService


async def handle_update(update: dict, db) -> tuple[int, str, dict | None] | None:
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
        return message["chat"]["id"], (
            "Welcome to Modeloportunity.\n\n"
            "Use /offers to see available creator opportunities."
        ), None

    if text == "/offers":
        offers = AffiliateService(db).list_active()
        if not offers:
            return message["chat"]["id"], "No offers are available right now.", None
        buttons = [[{"text": offer.name, "url": offer.url}] for offer in offers]
        return message["chat"]["id"], "Choose an opportunity:", {"inline_keyboard": buttons}

    if text == "/id":
        return message["chat"]["id"], f"Your Telegram ID: {user.telegram_id}", None

    if text == "/admin":
        try:
            AuthService.require_admin(user)
            return message["chat"]["id"], "Admin access confirmed.", None
        except PermissionError:
            return message["chat"]["id"], "You are not authorized for admin commands.", None

    return message["chat"]["id"], "Use /start to begin, /offers for opportunities, or /id to view your Telegram ID.", None

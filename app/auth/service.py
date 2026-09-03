from datetime import datetime, timezone
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.config import get_settings
from app.users.models import User

class AuthService:
    def __init__(self, db: Session):
        self.db = db
        self.settings = get_settings()

    def get_or_create_user(self, telegram_user: dict) -> User:
        telegram_id = int(telegram_user["id"])
        user = self.db.scalar(select(User).where(User.telegram_id == telegram_id))
        if user is None:
            role = "admin" if telegram_id in self.settings.admin_ids else "user"
            user = User(telegram_id=telegram_id, username=telegram_user.get("username"), first_name=telegram_user.get("first_name"), role=role)
            self.db.add(user)
        else:
            user.username = telegram_user.get("username")
            user.first_name = telegram_user.get("first_name")
            user.last_seen_at = datetime.now(timezone.utc)
        self.db.commit()
        self.db.refresh(user)
        return user

    @staticmethod
    def require_active(user: User) -> None:
        if user.status != "active":
            raise PermissionError("User account is not active")

    @staticmethod
    def require_admin(user: User) -> None:
        if user.role != "admin":
            raise PermissionError("Admin permission required")

from sqlalchemy import select
from sqlalchemy.orm import Session
from app.referrals.models import Referral
from app.users.models import User

class ReferralService:
    def __init__(self, db: Session):
        self.db = db

    def attribute(self, referred_user: User, code: str | None) -> Referral | None:
        if not code or not code.strip():
            return None
        existing = self.db.scalar(select(Referral).where(Referral.referred_user_id == referred_user.id))
        if existing:
            return existing
        referrer = self.db.scalar(select(User).where(User.telegram_id == self._telegram_id_from_code(code)))
        if referrer is None or referrer.id == referred_user.id:
            return None
        referral = Referral(referrer_id=referrer.id, referred_user_id=referred_user.id, code=code.strip())
        self.db.add(referral)
        self.db.commit()
        self.db.refresh(referral)
        return referral

    @staticmethod
    def _telegram_id_from_code(code: str) -> int | None:
        if not code.startswith("r_"):
            return None
        try:
            return int(code[2:])
        except ValueError:
            return None

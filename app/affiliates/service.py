from sqlalchemy import select
from sqlalchemy.orm import Session

from app.affiliates.models import AffiliateOffer


class AffiliateService:
    def list_active(self) -> list[AffiliateOffer]:
        return list(self._db.scalars(select(AffiliateOffer).where(AffiliateOffer.active.is_(True)).order_by(AffiliateOffer.id)))

    def add(self, name: str, url: str, category: str = "creator") -> AffiliateOffer:
        offer = AffiliateOffer(name=name, url=url, category=category)
        self._db.add(offer)
        self._db.commit()
        self._db.refresh(offer)
        return offer

    def __init__(self, db: Session):
        self._db = db

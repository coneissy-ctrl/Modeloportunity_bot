from app.affiliates.service import AffiliateService
from app.database.db import SessionLocal, init_db

OFFERS = [
    {
        "name": "Creator Signup",
        "url": "https://go.mavrtracktor.com/signup/model?userId=edc515a82c3cd22d1035458ac225d903eacce1cb7248e0388c3c35a5cb637069",
        "category": "creator",
    },
    {
        "name": "StripCash Creator Signup",
        "url": "https://stripcash.com/sign-up/Coneissy",
        "category": "creator",
    },
    {
        "name": "StripCash News",
        "url": "https://t.me/stripcashnews",
        "category": "community",
    },
    {
        "name": "StripCash News Overview",
        "url": "https://stripcash.com/overview/news",
        "category": "news",
    },
]


if __name__ == "__main__":
    init_db()
    with SessionLocal() as db:
        service = AffiliateService(db)
        existing = {offer.name for offer in service.list_active()}
        for item in OFFERS:
            if item["name"] not in existing:
                service.add(**item)
                print(f"Added: {item['name']}")
            else:
                print(f"Exists: {item['name']}")

from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "Modeloportunity Bot"
    environment: str = "development"
    database_url: str = "sqlite:///./modelbot.db"
    telegram_bot_token: str = ""
    telegram_webhook_secret: str = "change-me"
    admin_telegram_ids: str = ""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def admin_ids(self) -> set[int]:
        return {int(x.strip()) for x in self.admin_telegram_ids.split(",") if x.strip()}

@lru_cache
def get_settings() -> Settings:
    return Settings()

# Modeloportunity Bot

Python/FastAPI foundation for a production Telegram bot with secure webhook authentication, Telegram identity mapping, role-based access control, referral attribution, and SQLite development storage with PostgreSQL compatibility.

## Local Python run

```bash
python -m venv .venv
# Windows PowerShell: .venv\\Scripts\\Activate.ps1
# Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

Health: `GET /health`

Telegram webhook: `POST /telegram/webhook`

The webhook requires `X-Telegram-Bot-Api-Secret-Token` to match `TELEGRAM_WEBHOOK_SECRET`.

Never commit `.env` or real bot/API credentials.

## Bot flow

`/start <referral-code>` identifies the Telegram user, creates/updates the local user record, enforces active status, and records referral attribution when the code is valid. `/admin` is protected by the admin Telegram ID allowlist.

## Production hardening before public launch

- Use PostgreSQL and Alembic migrations.
- Replace the MVP `r_<telegram_id>` referral parser with opaque, random referral codes stored in a dedicated table.
- Configure Telegram's webhook over HTTPS with a strong secret token.
- Add rate limiting, structured audit logs, monitoring, and background jobs.
- Store secrets in the deployment platform's secret manager, not Git.

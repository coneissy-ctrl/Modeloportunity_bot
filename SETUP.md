# 🚀 Modeloportunity Bot - Complete Setup Guide

## ⚡ Quick Start (5 minutes)

### Prerequisites
- Docker & Docker Compose installed
- OpenAI API Key (get free credits at https://platform.openai.com)

### Step 1: Clone and Enter Directory
```bash
git clone https://github.com/coneissy-ctrl/Modeloportunity_bot.git
cd Modeloportunity_bot
git checkout dev
```

### Step 2: Add Your OpenAI API Key
Edit `backend/.env` and replace the placeholder:
```bash
# Before:
OPENAI_API_KEY=sk-proj-test-key-placeholder

# After:
OPENAI_API_KEY=sk-proj-your-actual-key-here
```

**Get your free API key:** https://platform.openai.com/api/keys

### Step 3: Start Everything with Docker
```bash
docker-compose up
```

Wait for both services to start. You'll see:
```
backend   | INFO:     Uvicorn running on http://0.0.0.0:8000
frontend  | ▲ Next.js 14.0.0
frontend  | - Local:        http://localhost:3000
```

### Step 4: Test the Bot
1. Open http://localhost:3000 in your browser
2. Type a message like: "What are the top modeling agencies in New York?"
3. Watch the bot respond with ChatGPT!

---

## 🧪 Testing Endpoints

### Test Backend Health
```bash
curl http://localhost:8000/health
```

Expected response:
```json
{"status": "healthy"}
```

### Test Chat Endpoint
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What skills do I need for modeling?",
    "conversation_history": []
  }'
```

### Test Modeling Advice
```bash
curl -X POST http://localhost:8000/modeling-advice \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How do I build my portfolio?"
  }'
```

### View API Documentation
Visit: http://localhost:8000/docs

---

## 📚 Manual Setup (Without Docker)

### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python main.py
```

Server will run at: http://localhost:8000

### Frontend Setup (In New Terminal)
```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will run at: http://localhost:3000

---

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check if port 8000 is in use
lsof -i :8000  # Mac/Linux
netstat -ano | findstr :8000  # Windows

# If port is in use, change PORT in backend/.env to 8001
```

### Frontend won't load
```bash
# Make sure backend is running
curl http://localhost:8000/health

# If not running, start backend first
cd backend && python main.py
```

### OpenAI API errors
1. Verify your API key is valid
2. Check you have API credits at https://platform.openai.com/account/billing/overview
3. Make sure you're using the right model (gpt-4 or gpt-3.5-turbo)

### Port already in use
Edit `.env` files and change:
- Backend PORT: 8000 → 8001
- Frontend runs on 3000 (hardcoded in next config)

---

## 📁 File Structure

```
backend/
├── main.py              ← FastAPI app & endpoints
├── config.py            ← Settings
├── requirements.txt     ← Dependencies
├── .env                 ← API keys (you added this!)
└── Dockerfile

frontend/
├── pages/
│   ├── index.tsx        ← Chat UI
│   └── _app.tsx
├── styles/
│   └── globals.css
├── package.json
├── .env.local           ← API URL config
└── Dockerfile

docker-compose.yml      ← Runs both services

README.md               ← Full documentation
SETUP.md               ← This file
```

---

## 🎯 Next Steps

### If You Want to Customize:
1. **Change the bot personality** - Edit system prompt in backend/main.py
2. **Add more endpoints** - Add routes in backend/main.py
3. **Customize UI** - Edit frontend/pages/index.tsx
4. **Change colors** - Edit frontend/tailwind.config.js

### If You Want to Deploy:
1. Deploy backend to: Render, Railway, Heroku
2. Deploy frontend to: Vercel, Netlify
3. Update frontend API URL to point to deployed backend

### If You Want to Add Features:
- Database: Add SQLAlchemy + PostgreSQL
- Authentication: Add JWT tokens
- Payments: Add Stripe integration
- Analytics: Add tracking

---

## ✅ You're All Set!

Your Modeloportunity Bot is ready to:
- ✅ Chat with users via ChatGPT
- ✅ Provide modeling business advice
- ✅ Maintain conversation history
- ✅ Run on any machine with Docker
- ✅ Scale to production

**Happy building! 🎉**

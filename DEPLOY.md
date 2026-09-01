# 🚀 Deployment Guide

## Deployment Options

### Option 1: Heroku (Easiest)

#### Backend Deployment
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create backend app
heroku create your-bot-backend

# Set environment variables
heroku config:set OPENAI_API_KEY=sk-your-key
heroku config:set OPENAI_MODEL=gpt-4

# Add Procfile to backend/
echo "web: uvicorn main:app --host 0.0.0.0 --port \$PORT" > backend/Procfile

# Deploy
git push heroku main
```

#### Frontend Deployment
```bash
# Use Vercel (recommended for Next.js)
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel

# Set environment variable
# NEXT_PUBLIC_API_URL=https://your-bot-backend.herokuapp.com
```

---

### Option 2: Railway (Easy, Free Tier)

1. Go to https://railway.app
2. Connect your GitHub repo
3. Create new service for backend
4. Create new service for frontend
5. Set environment variables
6. Deploy!

---

### Option 3: Docker Hub + AWS/GCP/Azure

#### Build and Push Docker Image
```bash
# Login to Docker Hub
docker login

# Build image
docker build -t yourusername/modeloportunity-bot .

# Push to Docker Hub
docker push yourusername/modeloportunity-bot
```

#### Deploy to AWS ECS
```bash
# Create ECS cluster
# Create task definition
# Run service
```

---

### Option 4: Vercel (Frontend Only)

```bash
cd frontend
npm i -g vercel
vercel
```

Vercel will:
- Auto-detect Next.js
- Build automatically on push
- Provide free HTTPS
- Give you a production URL

---

## Environment Variables for Production

### Backend
```
OPENAI_API_KEY=sk-your-production-key
OPENAI_MODEL=gpt-4
DEBUG=False
ALLOWED_ORIGINS=https://your-frontend-url.com
HOST=0.0.0.0
PORT=8000
```

### Frontend
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

---

## Production Checklist

- [ ] Change OPENAI_MODEL to gpt-3.5-turbo for cost savings
- [ ] Set DEBUG=False in backend
- [ ] Set up proper ALLOWED_ORIGINS
- [ ] Use production OpenAI API key
- [ ] Set up SSL/TLS certificates
- [ ] Enable rate limiting
- [ ] Set up monitoring/logging
- [ ] Set up database backup
- [ ] Test all endpoints in production
- [ ] Set up error tracking (Sentry)

---

## Cost Estimation

### OpenAI API Costs
- GPT-3.5-turbo: ~$0.001 per 1K tokens
- GPT-4: ~$0.03 per 1K tokens
- Estimate: $100-1000/month depending on usage

### Hosting Costs
- Heroku: $50-250/month
- Railway: $5-100/month (free tier available)
- Vercel: Free for frontend
- AWS: $0-100+/month depending on traffic

---

## Monitoring & Logging

### Set Up Error Tracking
```bash
# Add Sentry to backend
pip install sentry-sdk

# Add to main.py
import sentry_sdk
sentry_sdk.init("https://your-sentry-key@sentry.io/project-id")
```

### Set Up Logging
```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Use in code
logger.info("Message sent by user")
```

---

## Scaling

When your bot gets popular:

1. **Add Database** - Store conversation history in PostgreSQL
2. **Add Redis Cache** - Cache frequent responses
3. **Add Rate Limiting** - Prevent API abuse
4. **Load Balancer** - Distribute traffic
5. **CDN** - Serve static files faster
6. **Webhook Queue** - Handle async requests

---

## Next Steps

1. Choose a deployment platform
2. Set up CI/CD pipeline
3. Configure monitoring
4. Set up backup strategy
5. Monitor costs
6. Gather user feedback
7. Iterate and improve

**Good luck with your deployment! 🚀**
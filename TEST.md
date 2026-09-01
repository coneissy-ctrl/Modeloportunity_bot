# 🧪 Modeloportunity Bot - Testing Guide

## ✅ Pre-Flight Checks

Before testing, make sure:
1. Docker is running
2. Backend and frontend are running (`docker-compose up` or `./START.sh`)
3. You see startup messages for both services

---

## 🧪 Test 1: Health Check

**What it tests:** Backend is running

```bash
curl http://localhost:8000/health
```

**Expected:**
```json
{"status":"healthy"}
```

✅ **PASS** if you see the status

---

## 🧪 Test 2: API Documentation

**What it tests:** Backend endpoints are documented

1. Open: http://localhost:8000/docs
2. You should see Swagger UI with all endpoints

✅ **PASS** if you see the Swagger interface

---

## 🧪 Test 3: Chat Endpoint

**What it tests:** ChatGPT integration

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello, who are you?",
    "conversation_history": []
  }'
```

**Expected response:**
```json
{
  "response": "I am Modeloportunity Bot...",
  "conversation_history": [...]
}
```

✅ **PASS** if you get a response

---

## 🧪 Test 4: Modeling Advice

**What it tests:** Specialized advice endpoint

```bash
curl -X POST http://localhost:8000/modeling-advice \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What agencies are best in NYC?"
  }'
```

✅ **PASS** if you get modeling advice

---

## 🧪 Test 5: Frontend Chat UI

**What it tests:** Frontend loads and communicates with backend

1. Open: http://localhost:3000
2. Type: "What skills do I need for modeling?"
3. Click Send
4. Wait for response

✅ **PASS** if you get a response in the chat

---

## 🧪 Test 6: Conversation History

**What it tests:** Bot remembers previous messages

1. Type: "My name is Alex"
2. Send
3. Type: "What's my name?"
4. Send

✅ **PASS** if bot says "Your name is Alex"

---

## 🧪 Test 7: Multiple Messages

**What it tests:** Bot handles sequences of messages

Send these in order:
1. "I want to start modeling"
2. "How much do models earn?"
3. "What agencies should I contact?"

✅ **PASS** if all get relevant responses

---

## 🧪 Test 8: Error Handling

**What it tests:** Graceful error handling

Try:
1. Empty message (just send nothing)
2. Very long message
3. Special characters: "مرحبا你好"

✅ **PASS** if handled gracefully

---

## 📊 Summary

- [ ] Test 1: Health Check
- [ ] Test 2: API Documentation
- [ ] Test 3: Chat Endpoint
- [ ] Test 4: Modeling Advice
- [ ] Test 5: Frontend UI
- [ ] Test 6: Conversation History
- [ ] Test 7: Multiple Messages
- [ ] Test 8: Error Handling

**If all pass: ✅ Bot is ready!**

---

## 🐛 Troubleshooting

### "Connection refused"
- Make sure `docker-compose up` is running

### "Invalid API key"
- Check your OpenAI API key in `backend/.env`
- Get credits at https://platform.openai.com/account/billing/overview

### "Model not found: gpt-4"
- Edit `backend/.env` and change to `gpt-3.5-turbo`
- GPT-4 requires paid account

### Frontend shows "API Error"
- Make sure backend is running on port 8000
- Check `frontend/.env.local` has correct API URL

### Timeout errors
- OpenAI API can be slow (up to 30 seconds)
- Check internet connection
- Check API quota at https://platform.openai.com/account/usage

---

**All tests passed? 🎉 You're ready to go!**
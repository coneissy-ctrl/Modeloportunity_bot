# 🎭 Modeloportunity Bot

An AI-powered modeling business assistant powered by ChatGPT. Help aspiring and professional models with career advice, portfolio tips, industry insights, and opportunities.

## 🌟 Features

- **AI Chat Interface** - Real-time conversation with ChatGPT
- **Modeling Advice** - Specialized guidance for modeling careers
- **Multi-language Support** - Coming soon
- **Conversation History** - Maintain context across conversations
- **Beautiful UI** - Modern, responsive design with Tailwind CSS

## 🏗️ Architecture

- **Backend:** Python FastAPI with OpenAI integration
- **Frontend:** Next.js with React and Tailwind CSS
- **Deployment:** Docker Compose for easy setup

## 📋 Prerequisites

- Python 3.11+
- Node.js 18+
- Docker & Docker Compose (optional)
- OpenAI API Key (get one at https://platform.openai.com)

## 🚀 Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/coneissy-ctrl/Modeloportunity_bot.git
cd Modeloportunity_bot

# Create environment file
cp backend/.env.example backend/.env

# Add your OpenAI API key to backend/.env
# OPENAI_API_KEY=your_key_here

# Start services
docker-compose up
```

Access the frontend at `http://localhost:3000` and the API at `http://localhost:8000`

### Option 2: Manual Setup

#### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Add your OpenAI API key
# Edit .env and set OPENAI_API_KEY=your_key_here

# Run the server
python main.py
```

The API will be available at `http://localhost:8000`

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📚 API Endpoints

### `/` (GET)
Root endpoint - returns welcome message

### `/health` (GET)
Health check endpoint

### `/chat` (POST)
Chat with the AI

**Request:**
```json
{
  "message": "What skills do I need for modeling?",
  "conversation_history": []
}
```

**Response:**
```json
{
  "response": "Great question! Here are key skills...",
  "conversation_history": [...]
}
```

### `/modeling-advice` (POST)
Get specialized modeling business advice

**Request:**
```json
{
  "message": "How do I build my portfolio?"
}
```

## 📁 Project Structure

```
Modeloportunity_bot/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── config.py            # Configuration settings
│   ├── requirements.txt      # Python dependencies
│   ├── .env.example         # Environment template
│   ├── Dockerfile           # Docker configuration
│   └── __pycache__/
├── frontend/
│   ├── pages/
│   │   ├── index.tsx        # Main chat interface
│   │   └── _app.tsx         # Next.js app wrapper
│   ├── styles/
│   │   └── globals.css      # Global styles
│   ├── package.json         # Node dependencies
│   ├── tsconfig.json        # TypeScript config
│   ├── tailwind.config.js   # Tailwind CSS config
│   ├── .env.example         # Environment template
│   └── Dockerfile           # Docker configuration
├── docker-compose.yml       # Docker Compose setup
└── README.md               # This file
```

## 🔐 Environment Variables

### Backend (.env)
```
OPENAI_API_KEY=your_openai_key
OPENAI_MODEL=gpt-4
HOST=0.0.0.0
PORT=8000
DEBUG=True
ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🛠️ Development

### Backend
- Framework: FastAPI
- API Documentation: Available at `http://localhost:8000/docs`
- Hot reload: Enabled by default

### Frontend
- Framework: Next.js
- Styling: Tailwind CSS
- Hot reload: Enabled by default

## 🚢 Deployment

### Using Docker
```bash
docker-compose up -d
```

### Manual Deployment
1. Deploy backend to a Python hosting service (Heroku, Render, Railway, etc.)
2. Deploy frontend to a Node.js hosting service (Vercel, Netlify, etc.)
3. Update frontend API URL to point to deployed backend

## 📝 License

MIT

## 👨‍💼 Author

Created by coneissy-ctrl

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

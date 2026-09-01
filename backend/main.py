from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Modeloportunity Bot API",
    description="AI-powered modeling business assistant",
    version="1.0.0"
)

# CORS middleware
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
MODEL = os.getenv("OPENAI_MODEL", "gpt-4")

# Request/Response models
class MessageRequest(BaseModel):
    message: str
    conversation_history: list = []

class MessageResponse(BaseModel):
    response: str
    conversation_history: list

@app.get("/")
def read_root():
    """Root endpoint"""
    return {"message": "Welcome to Modeloportunity Bot API"}

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

@app.post("/chat", response_model=MessageResponse)
def chat(request: MessageRequest):
    """
    Chat endpoint that processes user messages with ChatGPT
    """
    try:
        # Build conversation history
        messages = request.conversation_history.copy()
        messages.append({"role": "user", "content": request.message})
        
        # Call OpenAI API
        response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            temperature=0.7,
            max_tokens=1000
        )
        
        assistant_message = response.choices[0].message.content
        
        # Update conversation history
        messages.append({"role": "assistant", "content": assistant_message})
        
        return MessageResponse(
            response=assistant_message,
            conversation_history=messages
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing message: {str(e)}"
        )

@app.post("/modeling-advice")
def get_modeling_advice(request: MessageRequest):
    """
    Specialized endpoint for modeling business advice
    """
    try:
        # System prompt for modeling advice
        system_prompt = """You are an expert modeling business consultant. 
        Help aspiring and professional models with career advice, portfolio tips, 
        industry insights, and opportunities. Be encouraging and provide practical guidance."""
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": request.message}
        ]
        
        response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            temperature=0.7,
            max_tokens=1500
        )
        
        return {
            "advice": response.choices[0].message.content,
            "model_used": MODEL
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating advice: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    debug = os.getenv("DEBUG", "True").lower() == "true"
    
    uvicorn.run(app, host=host, port=port)

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

# SIGNUP LINKS CONFIGURATION
MODEL_SIGNUPS = {
    "whitetrafs": {
        "link": "https://go.whitetrafsa.com?userId=edc515a82c3cd22d1035458ac225d903eacce1cb7248e0388c3c35a5cb637069",
        "name": "WhiteTrafs Premium",
        "description": "Exclusive modeling opportunities & premium networking"
    },
    "stripcash": {
        "link": "https://stripcash.com/sign-up/Coneissy",
        "name": "StripCash Premium",
        "description": "Premium platform for additional income streams"
    }
}

AFFILIATE_SIGNUP = {
    "link": "https://go.mavrtracktor.com/signup/model?userId=edc515a82c3cd22d1035458ac225d903eacce1cb7248e0388c3c35a5cb637069",
    "name": "MavrTracktor Affiliate Program",
    "description": "Earn commissions by promoting modeling opportunities"
}

# Keywords that trigger signup options
SIGNUP_KEYWORDS = ["sign up", "signup", "join", "register", "start", "create account", "begin", "enroll", "how do i join", "how to start"]
AFFILIATE_KEYWORDS = ["affiliate", "earn money", "make money", "commission", "refer", "referral", "partner", "promote"]

# Request/Response models
class MessageRequest(BaseModel):
    message: str
    conversation_history: list = []

class MessageResponse(BaseModel):
    response: str
    conversation_history: list
    show_model_signup: bool = False
    show_affiliate_signup: bool = False
    model_links: dict = None
    affiliate_link: dict = None

@app.get("/")
def read_root():
    """Root endpoint"""
    return {
        "message": "Welcome to Modeloportunity Bot API",
        "version": "1.0.0"
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

@app.get("/signup-links")
def get_signup_links():
    """Get all signup links"""
    return {
        "model_signups": MODEL_SIGNUPS,
        "affiliate_signup": AFFILIATE_SIGNUP
    }

@app.post("/chat", response_model=MessageResponse)
def chat(request: MessageRequest):
    """
    Chat endpoint - Shows signup links when relevant
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
        
        # Check if user wants to sign up as model
        show_model = any(keyword in request.message.lower() for keyword in SIGNUP_KEYWORDS)
        # Check if user wants to join affiliate program
        show_affiliate = any(keyword in request.message.lower() for keyword in AFFILIATE_KEYWORDS)
        
        return MessageResponse(
            response=assistant_message,
            conversation_history=messages,
            show_model_signup=show_model,
            show_affiliate_signup=show_affiliate,
            model_links=MODEL_SIGNUPS if show_model else None,
            affiliate_link=AFFILIATE_SIGNUP if show_affiliate else None
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

@app.post("/opportunities")
def find_opportunities(request: MessageRequest):
    """
    Find modeling opportunities based on user profile
    """
    try:
        system_prompt = """You are a modeling opportunity finder. 
        Based on the user's information, suggest specific opportunities and platforms."""
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Help me find modeling opportunities: {request.message}"}
        ]
        
        response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            temperature=0.7,
            max_tokens=1500
        )
        
        return {
            "opportunities": response.choices[0].message.content,
            "model_used": MODEL
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error finding opportunities: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    debug = os.getenv("DEBUG", "True").lower() == "true"
    
    uvicorn.run(app, host=host, port=port)

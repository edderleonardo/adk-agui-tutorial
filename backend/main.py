"""
FastAPI Server with AG-UI Protocol Integration
This exposes your ADK agent to the frontend via AG-UI events
"""
import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# AG-UI ADK integration
from ag_ui_adk import ADKAgent, add_adk_fastapi_endpoint

# Import our configured agent
from agent import shopping_assistant


load_dotenv()

app = FastAPI(
    title="ADK + AG-UI Shopping Assistant",
    description="AI-powered shopping assistant with backend tools redering",
    version="0.0.1",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js dev server
        "http://127.0.0.1:3000",
        "http://localhost:3001",  # Alternate port
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================
# AG-UI MIDDLEWARE CONFIGURATION
# ============================================
# Wrap ADK agent with AG-UI middleware
# This translates ADK events to AG-UI protocol events

adk_agent = ADKAgent(
    # your configured ADK agent
    adk_agent=shopping_assistant,
    # Application identifier (for logging/debugging)
    app_name="shopping_assistant_app",
    # User identifier (in production, get from auth)
    user_id="demo_user",
    # Session timeout in seconds (1 hour)
    session_timeout_seconds=3600,
    # Use in-memory services for demo
    # In production, use persistent storage
    use_in_memory_services=True
)

# Add the AG-UI endpoint to FastAPI
# This creates a POST endpoint that handles AG-UI protocol
add_adk_fastapi_endpoint(
    app=app,
    agent=adk_agent,
    path="/"  # Available at http://localhost:8000/
)

# ============================================
# HEALTH CHECK & INFO ENDPOINTS
# ============================================

@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "agent": "ShoppingAssistant",
        "protocol": "AG-UI"
    }


@app.get("/info")
async def agent_info():
    """Get information about available tools"""
    return {
        "agent_name": "ShoppingAssistant",
        "model": "gemini-2.5-flash",
        "available_tools": [
            {
                "name": "get_weather",
                "description": "Get weather for a location"
            },
            {
                "name": "search_products",
                "description": "Search products with filters"
            },
            {
                "name": "get_product_details",
                "description": "Get detailed product information"
            },
            {
                "name": "generate_poem",
                "description": "Generate a creative poem about any topic"
            }
        ],
        "protocol_version": "AG-UI 1.0"
    }


# ============================================
# MAIN ENTRY POINT
# ============================================

if __name__ == "__main__":
    import uvicorn

    # Check for API key
    if not os.getenv("GOOGLE_API_KEY"):
        print("⚠️  Warning: GOOGLE_API_KEY not set!")
        print("   Set it in .env file or run:")
        print("   export GOOGLE_API_KEY='your-key-here'")
        print()

    port = int(os.getenv("PORT", 8000))

    print(f"🚀 Starting ADK + AG-UI server on port {port}")
    print(f"📡 AG-UI endpoint: http://localhost:{port}/")
    print(f"💚 Health check: http://localhost:{port}/health")
    print()

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        reload=True  # Auto-reload on code changes
    )
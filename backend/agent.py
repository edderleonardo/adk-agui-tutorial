"""
ADK Agent Configuration
Este archivo define el LlmAgent con sus tools e instrucciones
"""
import os
from dotenv import load_dotenv

from google.adk.agents import LlmAgent
from google.adk.agents.callback_context import CallbackContext
from google.adk.models import LlmResponse, LlmRequest
from tools import get_weather, search_products, get_product_details, generate_poem


load_dotenv()

# Verify API key is set
if not os.getenv("GOOGLE_API_KEY"):
    raise EnvironmentError(
    "GOOGLE_API_KEY not found in environment variables."
    " Please set it before running the agent."
    )

# ============================================
# CALLBACK FUNCTIONS (Optional but powerful)
# ============================================

def on_before_agent(callback_context: CallbackContext) -> None:
    """
    Called before the agent starts processing.
    Use for: logging, validation, state initialization
    """
    print("🚀 Agent starting - User message received")
    # You can access and modify state here
    # callback_context.state["start_time"] = time.time()


def before_model_modifier(
    callback_context: CallbackContext,
    llm_request: LlmRequest
) -> LlmRequest:
    """
    Called before each LLM call.
    Use for: modifying prompts, adding context, logging
    """
    print("🧠 Calling LLM...")
    return llm_request

def after_model_modifier(
        callback_context: CallbackContext,
        llm_response: LlmResponse
) -> LlmResponse:
    """
    Called after each LLM response.
    Use for: post-processing, logging, validation
    """
    print("✅ LLM response received")
    return llm_response


# ============================================
# AGENT DEFINITION
# ============================================

# System instructions for the agent
AGENT_INSTRUCTIONS = """
You are a helpful assistant with access to weather, product information, and creative writing.

## Your Capabilities:
1. **Weather Information**: Use `get_weather` to check weather for any city
2. **Product Search**: Use `search_products` to find products by name, category, or price
3. **Product Details**: Use `get_product_details` to get full information about a specific product
4. **Poetry Generation**: Use `generate_poem` to create poems about any topic

## Behavior Guidelines:
- Always be helpful and friendly
- When users ask about weather, use the get_weather tool
- When users want to find products, use search_products with appropriate filters
- When users ask about a specific product, use get_product_details
- When users ask for a poem, use generate_poem with the topic and your generated poem
- Provide clear, concise responses
- If a tool returns an error, explain it clearly to the user

## Response Format:
- For weather: Summarize the conditions naturally
- For products: Present options clearly with prices
- For details: Give comprehensive product information. After calling the tool, DO NOT repeat the details in your response - just say something brief like "Here are the details!" or "I've found the information you requested!"
- For poems: Generate a creative poem and pass it to generate_poem tool. After calling the tool, DO NOT repeat the poem in your response - just say something brief like "Here's your poem!" or "I hope you enjoy this poem!"

## Examples of when to use tools:
- "What's the weather in Tokyo?" → get_weather(location="Tokyo")
- "Show me keyboards under $100" → search_products(query="keyboard", max_price=100)
- "Tell me more about prod_002" → get_product_details(product_id="prod_002")
- "Write a poem about the moon" → generate_poem(topic="the moon", poem="[your generated poem]", style="rhyming")
"""

# Create the main agent
shopping_assistant = LlmAgent(
    # Identity
    name="ShoppingAssistant",

    # Brain (the LLM to use)
    model="gemini-2.5-flash",

    # Personality (system prompt)
    instruction=AGENT_INSTRUCTIONS,

    # Capabilities (tools available)
    tools=[
        get_weather,
        search_products,
        get_product_details,
        generate_poem,
    ],
)


# Export for use in main.py
__all__ = ["shopping_assistant"]
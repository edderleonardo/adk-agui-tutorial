# Backend - ADK + AG-UI Shopping Assistant

Backend powered by Google ADK (Agent Development Kit) with AG-UI protocol integration.

## Tech Stack

- **Google ADK**: Agent framework
- **Gemini 2.5 Flash**: LLM model
- **FastAPI**: Web server
- **AG-UI Protocol**: Frontend communication

## Setup

### 1. Create virtual environment

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # macOS/Linux
# or
.venv\Scripts\activate     # Windows
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and add your Google API key:

```
GOOGLE_API_KEY=your-api-key-here
```

Get your API key from: https://aistudio.google.com/app/apikey

## Running

### Option 1: FastAPI (for AG-UI frontend)

```bash
uvicorn main:app --reload --port 8000
```

### Option 2: ADK Web (development UI)

```bash
adk web
```

Then open http://localhost:8000

## Project Structure

```
backend/
├── main.py           # FastAPI server + AG-UI endpoint
├── agent.py          # LlmAgent configuration
├── tools/            # Backend tools
│   ├── __init__.py
│   ├── weather.py    # get_weather tool
│   ├── database.py   # search_products, get_product_details
│   └── poem.py       # generate_poem tool
├── requirements.txt
├── .env.example
└── .env              # Your local config (git ignored)
```

## Available Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_weather` | Get weather for a city | `location: str` |
| `search_products` | Search product catalog | `query: str`, `category?: str`, `max_price?: float`, `in_stock_only?: bool` |
| `get_product_details` | Get product details | `product_id: str` |
| `generate_poem` | Generate a poem | `topic: str`, `poem: str`, `style: str` |

## Adding New Tools

1. Create a new file in `tools/`:

```python
# tools/my_tool.py
from typing import Annotated

def my_tool(
    param: Annotated[str, "Description for the LLM"]
) -> dict:
    """Docstring helps the LLM understand when to use this tool."""
    return {"result": "..."}
```

2. Export in `tools/__init__.py`:

```python
from .my_tool import my_tool
```

3. Add to agent in `agent.py`:

```python
from tools import my_tool

# In LlmAgent config:
tools=[
    # ...existing tools
    my_tool,
]
```

4. Update `AGENT_INSTRUCTIONS` to tell the LLM about the new tool.

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | POST | AG-UI protocol endpoint |
| `/health` | GET | Health check |
| `/info` | GET | Agent info and available tools |
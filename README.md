# ADK + AG-UI Tutorial

A full-stack AI assistant demonstrating Google ADK (Agent Development Kit) with AG-UI protocol for seamless frontend-backend communication.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│                    Next.js + CopilotKit                         │
│                    localhost:3000                                │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ WeatherCard  │  │ ProductCard  │  │  PoemCard    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│           │                │                │                    │
│           └────────────────┼────────────────┘                    │
│                            │                                     │
│                   useRenderToolCall                              │
│                            │                                     │
└────────────────────────────│─────────────────────────────────────┘
                             │ AG-UI Protocol
                             │ (HTTP Streaming)
┌────────────────────────────│─────────────────────────────────────┐
│                            │                                     │
│                         BACKEND                                  │
│                    FastAPI + Google ADK                          │
│                    localhost:8000                                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    LlmAgent                               │   │
│  │                 (Gemini 2.5 Flash)                        │   │
│  │                                                           │   │
│  │  Tools:                                                   │   │
│  │  • get_weather      → Weather data                        │   │
│  │  • search_products  → Product search                      │   │
│  │  • get_product_details → Product info                     │   │
│  │  • generate_poem    → AI poetry                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| LLM | Gemini 2.5 Flash |
| Agent Framework | Google ADK |
| Protocol | AG-UI |
| Backend | FastAPI + Python |
| Frontend | Next.js + React |
| UI Components | CopilotKit |
| Styling | Tailwind CSS v4 |

## Quick Start

### 1. Clone and setup

```bash
cd adk-agui-tutorial
```

### 2. Backend setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your GOOGLE_API_KEY
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

### 4. Run both servers

Terminal 1 (Backend):
```bash
cd backend
source .venv/bin/activate
uvicorn main:app --reload --port 8000
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### 5. Open the app

Navigate to http://localhost:3000

## Features

### Backend Tools → Frontend Cards

Each backend tool renders as a custom React component:

| Tool | Card | Description |
|------|------|-------------|
| `get_weather` | WeatherCard | Weather info with icons |
| `search_products` | ProductCard | Product list with ratings |
| `get_product_details` | ProductDetailCard | Full product details |
| `generate_poem` | PoemCard | AI-generated poetry |

### Example Commands

- "What's the weather in Tokyo?"
- "Show me keyboards under $100"
- "Tell me about prod_002"
- "Write a poem about the ocean"

## Project Structure

```
adk-agui-tutorial/
├── backend/
│   ├── main.py              # FastAPI + AG-UI server
│   ├── agent.py             # LlmAgent configuration
│   ├── tools/               # Backend tools
│   │   ├── weather.py
│   │   ├── database.py
│   │   └── poem.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx     # Main page + tool rendering
│   │   │   ├── layout.tsx   # CopilotKit provider
│   │   │   └── api/copilotkit/route.ts  # AG-UI bridge
│   │   └── components/
│   │       ├── WeatherCard.tsx
│   │       ├── ProductCard.tsx
│   │       └── PoemCard.tsx
│   └── package.json
│
├── .gitignore
└── README.md
```

## How It Works

1. **User sends message** → CopilotKit sidebar
2. **Frontend routes to backend** → `/api/copilotkit` → AG-UI HttpAgent
3. **Backend agent processes** → Gemini 2.5 Flash decides which tool to use
4. **Tool executes** → Returns structured data (dict)
5. **AG-UI streams events** → TOOL_CALL_START, TOOL_CALL_ARGS, TOOL_CALL_END
6. **Frontend renders** → `useRenderToolCall` matches tool name → Custom React component

## Adding New Tools

See [backend/README.md](./backend/README.md) for detailed instructions.

## Resources

- [Google ADK Documentation](https://google.github.io/adk-docs/)
- [AG-UI Protocol](https://docs.ag-ui.com/)
- [CopilotKit Documentation](https://docs.copilotkit.ai/)
- [AG-UI Dojo Examples](https://dojo.ag-ui.com/)

## License

MIT
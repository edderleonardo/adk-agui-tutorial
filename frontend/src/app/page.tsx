"use client";

/**
 * Main Page with Backend Tool Rendering
 *
 * KEY CONCEPT: useCopilotAction con available: "disabled"
 * Esto permite renderizar los resultados de tools que se ejecutan
 * en el BACKEND (Python/ADK) con componentes custom en el FRONTEND (React)
 */
import { useCopilotAction, useCoAgent } from "@copilotkit/react-core";
import { useRenderToolCall } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { WeatherCard } from "@/components/WeatherCard";
import { ProductCard, ProductDetailCard } from "@/components/ProductCard";
import { PoemCard} from "@/components/PoemCard";
import { useState } from "react";

// Type for our agent's shared state
interface AgentState {
  lastQuery?: string;
  lastToolUsed?: string;
}

export default function Home() {
  const [themeColor, setThemeColor] = useState("#6366f1");

  // ============================================
  // SHARED STATE WITH AGENT
  // ============================================
  // This syncs state between frontend and ADK agent
  const { state } = useCoAgent<AgentState>({
    name: "shopping_assistant",
    initialState: {
      lastQuery: undefined,
      lastToolUsed: undefined,
    },
  });

  // ============================================
  // BACKEND TOOL RENDERING
  // ============================================

  /**
   * Weather Tool Rendering
   *
   * available: "disabled" means:
   * - The tool EXISTS in the backend (ADK)
   * - We're NOT defining it here, just rendering its output
   * - When the backend calls get_weather, this render function displays it
   */
  useCopilotAction({
    name: "get_weather",
    description: "Get the weather for a given location.",
    available: "disabled",
    parameters: [
      { name: "location", type: "string", required: true },
    ],
    render: ({ args, result, status }) => {
      console.log("WeatherCard render:", { args, result, status });

      // Parse result if it's a string
      let data = result;
      if (typeof result === "string") {
        try {
          data = JSON.parse(result);
        } catch (e) {
          // result might not be JSON
        }
      }

      return (
        <div className="my-4">
          <WeatherCard
            location={args?.location as string}
            data={data as any}
          />
        </div>
      );
    },
  });

  /**
   * Product Search Tool Rendering
   */
  useCopilotAction({
    name: "search_products",
    description: "Search products in the database.",
    available: "disabled",
    parameters: [
      { name: "query", type: "string", required: true },
      { name: "category", type: "string", required: false },
      { name: "max_price", type: "number", required: false },
      { name: "in_stock_only", type: "boolean", required: false },
    ],
    render: ({ args, result }) => {
      let data = result;
      if (typeof result === "string") {
        try {
          data = JSON.parse(result);
        } catch (e) {
          console.error("Failed to parse products result:", e);
        }
      }
      return (
        <ProductCard
          query={args.query as string}
          data={data as any}
        />
      );
    },
  });

  /**
   * Product Details Tool Rendering
   */
  useCopilotAction({
    name: "get_product_details",
    description: "Get detailed information about a specific product.",
    available: "disabled",
    parameters: [
      { name: "product_id", type: "string", required: true },
    ],
    render: ({ args, result }) => {
      let data = result;
      if (typeof result === "string") {
        try {
          data = JSON.parse(result);
        } catch (e) {
          console.error("Failed to parse product details result:", e);
        }
      }
      return (
        <ProductDetailCard
          productId={args.product_id as string}
          data={data as any}
        />
      );
    },
  });

  /** Poem Generation Tool Rendering */
  useRenderToolCall({
    name: "generate_poem",  // Debe coincidir EXACTAMENTE con el nombre en Python
    render: ({ args, result, status }) => {
      // args = parámetros que recibió la tool { topic, poem, style }
      // result = lo que retornó la tool (el dict)
      // status = "inProgress" | "executing" | "complete"

      // Parsear result si viene como string
      let data = result;
      if (typeof result === "string") {
        try {
          data = JSON.parse(result);
        } catch (e) {
          // No es JSON
        }
      }

      return (
        <div className="my-4">
          <PoemCard
            topic={args?.topic as string}
            data={data as any}
          />
        </div>
      );
    },
  });



  // ============================================
  // UI RENDER
  // ============================================
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🛒 AI Shopping Assistant
          </h1>
          <p className="text-gray-600 text-lg">
            Powered by Google ADK + AG-UI Protocol
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Backend Tool Rendering
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Real-time Streaming
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              Gemini 2.5 Flash
            </span>
          </div>
        </div>

        {/* Instructions Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🎯 Try These Commands
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">🌤️ Weather</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>"What's the weather in Tokyo?"</li>
                <li>"How's the weather in New York?"</li>
                <li>"Check weather for London"</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">🔍 Search Products</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>"Show me keyboards"</li>
                <li>"Find headphones under $150"</li>
                <li>"Search for monitors in stock"</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">📦 Product Details</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>"Tell me about prod_001"</li>
                <li>"Show details for prod_002"</li>
                <li>"What's the warranty on prod_004?"</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">💬 General Chat</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>"What can you help me with?"</li>
                <li>"Recommend a good mouse"</li>
                <li>"Compare keyboards vs headphones"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        {state?.lastToolUsed && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-8">
            <p className="text-indigo-800">
              <span className="font-medium">Last tool used:</span>{" "}
              {state.lastToolUsed}
            </p>
          </div>
        )}
      </div>

      {/* CopilotKit Sidebar */}
      <CopilotSidebar
        defaultOpen={true}
        clickOutsideToClose={false}
        suggestions={[
          { title: "Weather in Tokyo", message: "What's the weather in Tokyo?" },
          { title: "Show keyboards", message: "Show me keyboards" },
          { title: "Product details", message: "Tell me about prod_001" },
          { title: "Generate a poem about shopping", message: "Write a poem about shopping" },
        ]}
        labels={{
          title: "Shopping Assistant",
          initial: `👋 Hi! I'm your AI shopping assistant.

I can help you with:
- 🌤️ Check weather for any city
- 🔍 Search our product catalog
- 📦 Get detailed product information`,
        }}
      />
    </main>
  );
}
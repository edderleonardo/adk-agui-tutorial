/**
 * CopilotKit API Route
 * This connects the frontend to our ADK backend via AG-UI protocol
 */
import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { HttpAgent } from "@ag-ui/client";
import { NextRequest } from "next/server";

const serviceAdapter = new ExperimentalEmptyAdapter();

// create copilotRuntime with our ADL agent
const runtime = new CopilotRuntime({
    agents: {
        shopping_assistant: new HttpAgent({
            url: process.env.AGENT_URL || "http://localhost:8000/"
        })
    }
})

// Export Post handler
export const POST = async (req: NextRequest) => {
    const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
        runtime,
        serviceAdapter,
        endpoint: "/api/copilotkit"
    });
    return handleRequest(req)
}
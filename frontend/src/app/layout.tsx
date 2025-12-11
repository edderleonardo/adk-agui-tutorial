/**
 * Root Layout with CopilotKit Provider
 * Wraps the entire app to enable agent communication
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
     title: "ADK + AG-UI Shopping Assistant",
    description: "AI-powered shopping assistant with backend tool rendering",
}

export  default function RootLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        {/*CopilotKit Provider - connects to our agent */}
        <CopilotKit
            runtimeUrl="/api/copilotkit"
            agent="shopping_assistant"
        >
            {children}
        </CopilotKit>
        </body>
        </html>
    );
}
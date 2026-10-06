import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "1,500+ Business Connections & Integrations | Nexus",
  description:
    "Connect Nexus to 1,500+ business tools and communication channels—WhatsApp, Slack, Gmail, Google Calendar, Notion, Salesforce, HubSpot, QuickBooks, Square, Shopify, and any custom API or MCP server. Managed authentication, least-privilege scoping, and owner approval rules.",
  keywords: [
    "Nexus Business Connections",
    "1500+ AI integrations",
    "WhatsApp business assistant",
    "Slack AI assistant",
    "CRM AI integrations",
    "QuickBooks AI assistant",
    "POS integration AI",
    "Model Context Protocol integrations",
    "business tools integration",
  ],
  alternates: {
    canonical: "/connections",
  },
  openGraph: {
    title: "1,500+ Business Connections & Integrations | Nexus",
    description:
      "Explore 1,500+ supported communication channels, workspace apps, CRMs, POS, and financial software connections for Nexus.",
    url: "/connections",
    siteName: "Nexus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "1,500+ Business Connections & Integrations | Nexus",
    description:
      "Connect Nexus to 1,500+ apps: WhatsApp, Slack, Gmail, Notion, Salesforce, QuickBooks, Square, Shopify, and more.",
  },
}

export default function ConnectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

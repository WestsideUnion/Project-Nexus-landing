import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Integrations & Workflow Fit | Works with the Tools You Use | Nexus",
  description:
    "Your business shouldn't have to start over to work smarter. Tell us the apps, calendars, spreadsheets, and systems your team relies on, and we'll help bring your workflows together.",
  keywords: [
    "Nexus Integrations",
    "business tools integration",
    "WhatsApp business assistant",
    "Slack AI assistant",
    "CRM AI integrations",
    "QuickBooks AI assistant",
    "POS workflow assistant",
  ],
  alternates: {
    canonical: "/connections",
  },
  openGraph: {
    title: "Integrations & Workflow Fit | Works with the Tools You Use | Nexus",
    description:
      "Bring key questions, updates, and follow-ups into a simpler daily workflow across the tools your business already uses.",
    url: "/connections",
    siteName: "Nexus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrations & Workflow Fit | Works with the Tools You Use | Nexus",
    description:
      "Works with the tools your business already uses — email, calendars, spreadsheets, booking systems, POS, and messaging.",
  },
}

export default function ConnectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

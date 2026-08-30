import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Interactive Demo Dashboard | Nexus Managed AI Assistant",
  description:
    "Explore an interactive preview of the Nexus business dashboard with fictional sample data from Northstar Café. Experience owner request capture, task triage, 1-tap approvals, and plain-language completion reports.",
  keywords: [
    "Nexus dashboard demo",
    "interactive AI preview",
    "business assistant demonstration",
    "Northstar Cafe demo",
    "managed AI assistant",
  ],
  alternates: {
    canonical: "/demo",
  },
  openGraph: {
    title: "Interactive Demo Dashboard | Nexus Managed AI Assistant",
    description:
      "Test drive how Nexus handles tasks, customer communications, and 1-tap owner approvals with fictional Northstar Café sample data.",
    url: "/demo",
    siteName: "Nexus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Demo Dashboard | Nexus Managed AI Assistant",
    description:
      "Test drive how Nexus handles tasks, customer communications, and 1-tap owner approvals with fictional Northstar Café sample data.",
  },
}

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

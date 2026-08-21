import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nexus Business Connections | Messaging, POS and More",
  description:
    "Connect Nexus to the tools you already use—WhatsApp, Telegram, SMS, Email, POS systems, booking platforms, and CRMs. Managed setup, verified permissions, and tested reliability.",
  keywords: [
    "Nexus Business Connections",
    "WhatsApp business assistant",
    "POS integration AI",
    "booking calendar assistant",
    "Telegram business bot",
    "business tools integration",
  ],
  alternates: {
    canonical: "/connections",
  },
  openGraph: {
    title: "Nexus Business Connections | Messaging, POS and More",
    description:
      "Explore supported communication channels and business software connections for Nexus.",
    url: "/connections",
    siteName: "Nexus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Business Connections | Messaging, POS and More",
    description:
      "Connect Nexus to WhatsApp, SMS, Email, POS, and booking platforms.",
  },
}

export default function ConnectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nexus Pricing | Cloud, Edge and Enterprise Plans",
  description:
    "Simple plans for the way your business works. Start with Nexus Cloud (CAD $99/mo, no mandatory setup fee), step up to Nexus Edge (from CAD $499/mo) for dedicated capacity, or request a custom Enterprise quote.",
  keywords: [
    "Nexus Pricing",
    "Nexus Cloud",
    "Nexus Edge",
    "Nexus Enterprise",
    "AI assistant cost",
    "business automation pricing",
    "managed AI Canada",
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Nexus Pricing | Cloud, Edge and Enterprise Plans",
    description:
      "Simple plans for managed AI assistance. Nexus Cloud with no mandatory setup fee, Nexus Edge for dedicated capacity, and custom Enterprise deployments.",
    url: "/pricing",
    siteName: "Nexus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Pricing | Cloud, Edge and Enterprise Plans",
    description:
      "Simple plans for managed AI assistance. Nexus Cloud at CAD $99/mo, Nexus Edge from CAD $499/mo, and custom Enterprise deployments.",
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

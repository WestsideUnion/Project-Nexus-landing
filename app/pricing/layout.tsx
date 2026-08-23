import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nexus Pricing | Cloud, Edge and Enterprise",
  description:
    "Explore simple, transparent pricing for Nexus. Start with Nexus Cloud (CAD $99/mo) with managed AI usage included, choose Nexus Edge (from CAD $499/mo) for on-site privacy, or plan a tailored enterprise deployment.",
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
    title: "Nexus Pricing | Cloud, Edge and Enterprise",
    description:
      "Transparent packages for managed AI assistance. Nexus Cloud at CAD $99/mo, Nexus Edge from CAD $499/mo, and Enterprise deployments with zero automatic overages.",
    url: "/pricing",
    siteName: "Nexus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Pricing | Cloud, Edge and Enterprise",
    description:
      "Transparent packages for managed AI assistance. Nexus Cloud at CAD $99/mo, Nexus Edge from CAD $499/mo, and Enterprise deployments.",
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

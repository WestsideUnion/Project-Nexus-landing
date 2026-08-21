import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nexus FAQ | Packages, AI Usage and Support",
  description:
    "Find answers to frequently asked questions about Nexus packages, 30-day pilot terms, managed AI allowances, data privacy, on-site Edge appliances, and tool connections.",
  keywords: [
    "Nexus FAQ",
    "Nexus packages FAQ",
    "managed AI allowance FAQ",
    "Nexus Edge questions",
    "business assistant help",
  ],
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Nexus FAQ | Packages, AI Usage and Support",
    description:
      "Frequently asked questions about Nexus packages, AI usage limits, privacy rules, and onboarding.",
    url: "/faq",
    siteName: "Nexus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus FAQ | Packages, AI Usage and Support",
    description:
      "Frequently asked questions about Nexus packages, AI usage limits, and support.",
  },
}

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

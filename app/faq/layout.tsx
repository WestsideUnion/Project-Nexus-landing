import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nexus FAQ | Plain-English Answers for Business Owners",
  description:
    "Plain-English answers to common questions about how Nexus works, daily usage, approval controls, Cloud, Edge, and Enterprise plans, integrations, and optional Nexus Sense devices.",
  keywords: [
    "Nexus FAQ",
    "Nexus packages FAQ",
    "Nexus Cloud questions",
    "Nexus Edge questions",
    "business AI assistant help",
  ],
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Nexus FAQ | Plain-English Answers for Business Owners",
    description:
      "Frequently asked questions about how Nexus works, plans and billing, tools and devices, and launching a business in Canada.",
    url: "/faq",
    siteName: "Nexus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus FAQ | Plain-English Answers for Business Owners",
    description:
      "Plain-English answers to common questions about Nexus packages, workflow setup, and ongoing support.",
  },
}

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

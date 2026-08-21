import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Start Your Business in Canada | Nexus",
  description:
    "Launch your Canadian business with a structured roadmap, official registration checklists, operating toolkit configuration, professional handoffs, and ongoing Nexus Cloud assistance.",
  keywords: [
    "Start Business Canada",
    "Canadian startup roadmap",
    "incorporate business Canada",
    "business assistant Canada",
    "new business toolkit Canada",
    "Westside Union founder program",
  ],
  alternates: {
    canonical: "/start-business-canada",
  },
  openGraph: {
    title: "Start Your Business in Canada | Nexus",
    description:
      "Structured launch coordination, official Canadian checklists, initial operating toolkit, and ongoing AI assistance for Canadian entrepreneurs.",
    url: "/start-business-canada",
    siteName: "Nexus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Start Your Business in Canada | Nexus",
    description:
      "Structured launch coordination, official Canadian checklists, and ongoing assistant support for founders.",
  },
}

export default function StartBusinessCanadaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

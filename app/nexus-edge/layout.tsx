import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nexus Edge | Dedicated Managed AI Capacity for Growing Businesses",
  description:
    "Nexus Edge gives growing businesses dedicated managed AI capacity, deeper workflow configuration, and priority support — hosted, monitored, and maintained by Westside Union.",
  keywords: [
    "Nexus Edge",
    "dedicated business AI capacity",
    "managed AI assistant",
    "Westside Union Edge",
    "business workflow automation",
  ],
  alternates: {
    canonical: "/nexus-edge",
  },
  openGraph: {
    title: "Nexus Edge | Dedicated Managed AI Capacity for Growing Businesses",
    description:
      "More room for the work your business depends on. Dedicated managed AI capacity, tailored workflow mapping, and priority support hosted by Westside Union.",
    url: "/nexus-edge",
    siteName: "Nexus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Edge | Dedicated Managed AI Capacity for Growing Businesses",
    description:
      "More room for the work your business depends on with dedicated managed AI capacity from Westside Union.",
  },
}

export default function NexusEdgeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

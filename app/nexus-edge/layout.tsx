import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nexus Edge | Managed Local AI for Your Business",
  description:
    "Nexus Edge adds a dedicated managed appliance at your business—keeping more approved business knowledge on-site, reducing cloud AI dependence, and providing predictable CAD $299/mo service.",
  keywords: [
    "Nexus Edge",
    "Local AI appliance",
    "on-premise AI assistant",
    "private business AI",
    "Westside Union Edge",
    "managed on-site AI",
  ],
  alternates: {
    canonical: "/nexus-edge",
  },
  openGraph: {
    title: "Nexus Edge | Managed Local AI for Your Business",
    description:
      "Keep more business knowledge on-site. Dedicated managed appliance, remote monitoring, backups, and predictable monthly pricing with zero IT hassle.",
    url: "/nexus-edge",
    siteName: "Project Nexus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Edge | Managed Local AI for Your Business",
    description:
      "Keep more business knowledge on-site with a dedicated managed local AI appliance from Westside Union.",
  },
}

export default function NexusEdgeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

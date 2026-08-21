import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexus.westside-union.com"
  const lastModified = new Date()

  const routes = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/pricing", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/nexus-edge", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/start-business-canada", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/connections", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/faq", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
  ]

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}

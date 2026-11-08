import type { ConnectionCategory, ConnectionItem, ConnectionStatus } from "@/lib/site-data"

// ─── Setup-type language ─────────────────────────────────────────────────────
// One vocabulary for every place a connection status is shown: the filter,
// the results summary, the card pill, and the detail sheet.
export const STATUS_META: Record<
  ConnectionStatus,
  { label: string; description: string }
> = {
  available: {
    label: "Ready to connect",
    description: "Connects with a standard sign-in. We switch it on during onboarding.",
  },
  supported: {
    label: "Guided setup",
    description: "Supported, with a few account settings our team walks you through.",
  },
  configured: {
    label: "Confirmed in consultation",
    description: "Depends on your plan or account access, so we confirm it with you on the call.",
  },
  custom: {
    label: "Engineer-built",
    description: "A Westside Union engineer builds and maintains the connector for you.",
  },
  planned: {
    label: "Planned",
    description: "On our roadmap. Ask us about timing.",
  },
  preview: {
    label: "In development",
    description: "Being tested with early customers.",
  },
}

export const FILTERABLE_STATUSES: ConnectionStatus[] = ["available", "supported", "configured", "custom"]

// Categories whose connectors are set up end to end by the engineering team.
export const ENGINEER_MANAGED_CATEGORIES: ConnectionCategory[] = ["engineering", "custom"]

export const isEngineerManaged = (item: Pick<ConnectionItem, "category" | "status">) =>
  ENGINEER_MANAGED_CATEGORIES.includes(item.category) || item.status === "custom"

// Plain-English description of how access is granted, per auth type.
export const AUTH_TYPE_COPY: Record<NonNullable<ConnectionItem["authType"]>, string> = {
  "OAuth 2.0": "Secure sign-in with your own account. No passwords are shared with us.",
  "Managed API Key": "An encrypted access key that our team stores and rotates for you.",
  "Protocol / MCP": "A protocol-level connection configured by our engineers.",
  Webhook: "The app sends updates to Nexus as they happen.",
  "Assisted Setup": "Set up together with you during onboarding.",
}

// ─── Default ordering ────────────────────────────────────────────────────────
// The everyday tools a local business is most likely to run, shown first.
export const STARTER_IDS = [
  "whatsapp",
  "email",
  "google-calendar",
  "square-pos",
  "quickbooks",
  "sms",
  "google-sheets",
  "shopify",
  "fresha",
  "slack",
  "clover-pos",
  "toast-pos",
  "google-business",
  "instagram",
  "calendly",
  "opentable",
  "xero",
  "microsoft-outlook",
  "google-drive",
  "hubspot",
  "mailchimp",
  "stripe-payments",
  "vagaro",
  "facebook",
]

// One-tap suggestions in the hero, with short labels.
export const QUICK_PICKS: { id: string; label: string }[] = [
  { id: "square-pos", label: "Square POS" },
  { id: "quickbooks", label: "QuickBooks" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "email", label: "Gmail" },
  { id: "google-calendar", label: "Google Calendar" },
  { id: "fresha", label: "Fresha" },
]

const starterRank = new Map(STARTER_IDS.map((id, i) => [id, i]))

export function rankConnection(item: ConnectionItem): number {
  const starter = item.id ? starterRank.get(item.id) : undefined
  if (starter !== undefined) return starter
  if (isEngineerManaged(item)) return 3000
  return item.popular ? 1000 : 2000
}

// ─── "My stack" ──────────────────────────────────────────────────────────────
export interface StackItem {
  key: string
  name: string
  id?: string
  iconType?: string
  category?: ConnectionCategory
  status?: ConnectionStatus
  /** A tool the visitor typed in that is not in the directory. */
  custom?: boolean
}

export const stackItemFromConnection = (item: ConnectionItem): StackItem => ({
  key: item.id || item.name,
  name: item.name,
  id: item.id,
  iconType: item.iconType,
  category: item.category,
  status: item.status,
})

export const customStackItem = (name: string): StackItem => ({
  key: `custom:${name.trim().toLowerCase()}`,
  name: name.trim(),
  custom: true,
  status: "custom",
})

export const STACK_STORAGE_KEY = "nexus-connections-stack"


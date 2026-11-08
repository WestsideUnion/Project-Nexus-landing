"use client"

import React from "react"
import Image from "next/image"
import {
  WhatsAppIcon,
  TelegramIcon,
  SlackIcon,
  SquarePosIcon,
  EmailChannelIcon,
  SmsChannelIcon,
  NotionIcon,
  GithubIcon,
} from "@/components/nexus-icons/nexus-icons"
import { HubSpotIcon, QuickBooksIcon, AppLogo } from "@/components/nexus-icons/app-logo"
import { STATUS_META, type StackItem } from "@/lib/connections"

type MapRow = { key: string; name: string; icon: React.ReactNode; status: string }

const STATUS_STYLES: Record<string, string> = {
  [STATUS_META.available.label]: "bg-emerald-50 text-emerald-800 border-emerald-200/60",
  [STATUS_META.supported.label]: "bg-teal-50 text-teal-800 border-teal-200/60",
  [STATUS_META.configured.label]: "bg-amber-50 text-amber-800 border-amber-200/60",
  [STATUS_META.custom.label]: "bg-purple-50 text-purple-800 border-purple-200/60",
}

const MAX_ROWS = 5

const toRow = (s: StackItem): MapRow => ({
  key: s.key,
  name: s.name,
  icon: s.custom ? (
    <span className="text-[11px] font-semibold text-[#111]">{s.name[0]?.toUpperCase()}</span>
  ) : (
    <AppLogo id={s.id} name={s.name} iconType={s.iconType} className="w-4 h-4" />
  ),
  status: STATUS_META[s.status ?? "custom"].label,
})

export function NexusConnectionsMap({
  isCompact = false,
  stack = [],
}: {
  isCompact?: boolean
  /** Tools the visitor picked; when present they replace the example rows. */
  stack?: StackItem[]
}) {
  const defaultChannels: MapRow[] = [
    { key: "whatsapp", name: "WhatsApp", icon: <WhatsAppIcon className="w-4 h-4" />, status: STATUS_META.available.label },
    { key: "sms", name: "SMS / Text", icon: <SmsChannelIcon className="w-4 h-4" />, status: STATUS_META.available.label },
    { key: "telegram", name: "Telegram", icon: <TelegramIcon className="w-4 h-4" />, status: STATUS_META.available.label },
    { key: "email", name: "Email Inbox", icon: <EmailChannelIcon className="w-4 h-4" />, status: STATUS_META.available.label },
    { key: "slack", name: "Slack", icon: <SlackIcon className="w-4 h-4" />, status: STATUS_META.available.label },
  ]

  const defaultTools: MapRow[] = [
    { key: "crm", name: "CRMs & Sales (HubSpot, Salesforce)", icon: <HubSpotIcon className="w-4 h-4" />, status: STATUS_META.supported.label },
    { key: "docs", name: "Workspace & Docs (Notion, Google Docs)", icon: <NotionIcon className="w-4 h-4" />, status: STATUS_META.supported.label },
    { key: "pos", name: "POS & Commerce (Square, Shopify)", icon: <SquarePosIcon className="w-4 h-4" />, status: STATUS_META.supported.label },
    { key: "accounting", name: "Accounting & Finance (QuickBooks, Stripe)", icon: <QuickBooksIcon className="w-4 h-4" />, status: STATUS_META.supported.label },
    { key: "custom", name: "Custom & Specialized Systems", icon: <GithubIcon className="w-4 h-4" />, status: STATUS_META.custom.label },
  ]

  const stackChannels = stack.filter((s) => s.category === "messaging").map(toRow)
  const stackTools = stack.filter((s) => s.category !== "messaging").map(toRow)
  const usingStack = stack.length > 0

  const leftChannels = stackChannels.length > 0 ? stackChannels.slice(0, MAX_ROWS) : defaultChannels
  const rightTools = stackTools.length > 0 ? stackTools.slice(0, MAX_ROWS) : defaultTools
  const hiddenTools = Math.max(0, stackTools.length - MAX_ROWS)

  const renderRow = (r: MapRow) => (
    <li
      key={r.key}
      className="p-2.5 sm:p-3 rounded-xl bg-[#FAF9F5] border border-black/6 flex items-center justify-between gap-3"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-7 h-7 rounded-lg bg-white border border-black/6 flex items-center justify-center shrink-0 overflow-hidden">
          {r.icon}
        </div>
        <span className="text-xs font-medium text-[#111] truncate">{r.name}</span>
      </div>
      <span
        className={`shrink-0 text-[11px] px-2 py-0.5 rounded-full border whitespace-nowrap ${
          STATUS_STYLES[r.status] ?? "bg-black/3 text-black/65 border-black/6"
        }`}
      >
        {r.status}
      </span>
    </li>
  )

  return (
    <div className={`w-full rounded-2xl bg-white border border-black/8 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden ${isCompact ? "max-w-4xl mx-auto" : ""}`}>
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-black/6">
        <h3 className="text-sm font-medium text-[#111]">
          {usingStack ? "How Nexus connects your stack" : "How Nexus works with your business tools"}
        </h3>
        <span className="text-xs text-black/60">
          Compatibility and setup confirmed by Westside Union
        </span>
      </div>

      {/* Connection Topology Grid */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        {/* Left Column: Channels (4 cols) */}
        <div className="md:col-span-4 space-y-2.5">
          <p className="text-[11px] tracking-wide text-black/65 font-medium px-2 mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            {usingStack && stackChannels.length > 0 ? "Your messaging channels" : "Where you & customers message"}
          </p>
          <ul className="space-y-2.5">{leftChannels.map(renderRow)}</ul>
        </div>

        {/* Center Column: Nexus Core (3 cols) */}
        <div className="md:col-span-3 flex flex-col items-center justify-center p-4 my-2 md:my-0">
          <div className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-white text-[#111] shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-black/8 w-full max-w-[220px]">
            <Image src="/nexus-logo.png" alt="Nexus" width={48} height={48} className="object-contain mb-3" />
            <span className="font-pixel text-xs tracking-widest text-[#111] font-bold">NEXUS</span>
            <span className="text-[11px] text-black/65 mt-1">Managed Assistant Core</span>

            <dl className="mt-3 pt-3 border-t border-black/8 w-full space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <dt className="text-black/65">Knowledge</dt>
                <dd className="text-emerald-700 font-semibold">Approved</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-black/65">Approvals</dt>
                <dd className="text-sky-700 font-semibold">Owner-in-Loop</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right Column: Business Tools (4 cols) */}
        <div className="md:col-span-4 space-y-2.5">
          <p className="text-[11px] tracking-wide text-black/65 font-medium px-2 mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" aria-hidden="true" />
            {usingStack && stackTools.length > 0 ? "Your business software" : "Connected business software"}
          </p>
          <ul className="space-y-2.5">{rightTools.map(renderRow)}</ul>
          <p className="p-2 rounded-xl bg-black/3 text-center text-[11px] text-black/65">
            {hiddenTools > 0
              ? `+${hiddenTools} more in your stack · compatibility confirmed per account`
              : "Compatibility varies by software, account permissions & workflow"}
          </p>
        </div>
      </div>
    </div>
  )
}

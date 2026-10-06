"use client"

import React from "react"
import Image from "next/image"
import {
  WhatsAppIcon,
  TelegramIcon,
  SlackIcon,
  GoogleBusinessIcon,
  SquarePosIcon,
  EmailChannelIcon,
  SmsChannelIcon,
  BookingChannelIcon,
  NotionIcon,
  GithubIcon,
} from "@/components/nexus-icons/nexus-icons"
import { HubSpotIcon, QuickBooksIcon } from "@/components/nexus-icons/app-logo"

export function NexusConnectionsMap({ isCompact = false }: { isCompact?: boolean }) {
  const leftChannels = [
    { name: "WhatsApp", icon: <WhatsAppIcon className="w-4 h-4" />, status: "Available" },
    { name: "SMS / Text", icon: <SmsChannelIcon className="w-4 h-4" />, status: "Available" },
    { name: "Telegram", icon: <TelegramIcon className="w-4 h-4" />, status: "Available" },
    { name: "Email Inbox", icon: <EmailChannelIcon className="w-4 h-4" />, status: "Available" },
    { name: "Slack", icon: <SlackIcon className="w-4 h-4" />, status: "Available" },
  ]

  const rightTools = [
    { name: "CRMs & Sales (HubSpot, Salesforce)", icon: <HubSpotIcon className="w-4 h-4" />, status: "120+ Apps" },
    { name: "Workspace & Docs (Notion, Google Docs)", icon: <NotionIcon className="w-4 h-4" />, status: "180+ Apps" },
    { name: "POS & Commerce (Square, Shopify)", icon: <SquarePosIcon className="w-4 h-4" />, status: "90+ Apps" },
    { name: "Accounting & Finance (QuickBooks, Stripe)", icon: <QuickBooksIcon className="w-4 h-4" />, status: "80+ Apps" },
    { name: "Engineering & MCP (GitHub, Custom APIs)", icon: <GithubIcon className="w-4 h-4" />, status: "300+ Apps" },
  ]

  return (
    <div className={`w-full rounded-2xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-md overflow-hidden ${isCompact ? "max-w-4xl mx-auto" : ""}`}>
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-black/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-black/60 uppercase font-semibold">
            Unified Communication &amp; 1,500+ Business App Map
          </span>
        </div>
        <span className="text-xs text-black/50">
          Westside Union manages connections &amp; approval rules
        </span>
      </div>

      {/* Connection Topology Grid */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        {/* Left Column: Channels (4 cols) */}
        <div className="md:col-span-4 space-y-2.5">
          <div className="text-[10px] font-mono tracking-widest text-black/50 uppercase font-semibold px-2 mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Where You &amp; Customers Message
          </div>
          {leftChannels.map((c, i) => (
            <div
              key={i}
              className="p-2.5 sm:p-3 rounded-xl bg-[#FAF9F5] border border-black/[0.06] flex items-center justify-between shadow-2xs hover:border-black/20 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white border border-black/[0.06] flex items-center justify-center shadow-2xs">
                  {c.icon}
                </div>
                <span className="text-xs font-medium text-black">{c.name}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                {c.status}
              </span>
            </div>
          ))}
        </div>

        {/* Center Column: Nexus Core (3 cols) */}
        <div className="md:col-span-3 flex flex-col items-center justify-center p-4 my-2 md:my-0">
          {/* Central Nexus Orb */}
          <div className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-white text-black shadow-lg border border-black/[0.08] w-full max-w-[220px]">
            {/* Glow backing */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/15 via-cyan-500/15 to-purple-500/15 rounded-2xl blur-md -z-10" />

            <Image src="/nexus-logo.png" alt="Nexus" width={48} height={48} className="object-contain mb-3" />
            <span className="font-pixel text-xs tracking-widest text-black font-bold">NEXUS</span>
            <span className="text-[10px] text-black/60 font-mono mt-1">Managed Assistant Core</span>

            <div className="mt-3 pt-3 border-t border-black/[0.08] w-full space-y-1.5 text-[10px] text-black/80">
              <div className="flex items-center justify-between">
                <span className="text-black/50">Knowledge:</span>
                <span className="text-emerald-600 font-semibold">Approved</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-black/50">Approvals:</span>
                <span className="text-sky-600 font-semibold">Owner-in-Loop</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Business Tools (4 cols) */}
        <div className="md:col-span-4 space-y-2.5">
          <div className="text-[10px] font-mono tracking-widest text-black/50 uppercase font-semibold px-2 mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Connected Business Software
          </div>
          {rightTools.map((t, i) => (
            <div
              key={i}
              className="p-2.5 sm:p-3 rounded-xl bg-[#FAF9F5] border border-black/[0.06] flex items-center justify-between shadow-2xs hover:border-black/20 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white border border-black/[0.06] flex items-center justify-center shadow-2xs">
                  {t.icon}
                </div>
                <span className="text-xs font-medium text-black">{t.name}</span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  t.status === "Supported"
                    ? "bg-teal-50 text-teal-800 border-teal-200/60"
                    : t.status === "Configured"
                    ? "bg-amber-50 text-amber-800 border-amber-200/60"
                    : "bg-black/[0.03] text-black/40 border-black/[0.06]"
                }`}
              >
                {t.status}
              </span>
            </div>
          ))}
          <div className="p-2 rounded-xl bg-black/[0.03] border border-black/[0.05] text-center">
            <span className="text-[10px] font-mono text-black/55 font-medium">
              + 1,500+ integrations across all major business platforms
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

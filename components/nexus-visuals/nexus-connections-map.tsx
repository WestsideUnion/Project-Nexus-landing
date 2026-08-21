"use client"

import React from "react"
import Image from "next/image"
import {
  WhatsAppIcon,
  TelegramIcon,
  SlackIcon,
  GoogleBusinessIcon,
  SquarePosIcon,
  CloverPosIcon,
  EmailChannelIcon,
  SmsChannelIcon,
  BookingChannelIcon,
} from "@/components/nexus-icons/nexus-icons"

export function NexusConnectionsMap({ isCompact = false }: { isCompact?: boolean }) {
  const leftChannels = [
    { name: "WhatsApp", icon: <WhatsAppIcon className="w-4 h-4 text-emerald-600" />, status: "Available" },
    { name: "SMS / Text", icon: <SmsChannelIcon className="w-4 h-4 text-sky-600" />, status: "Available" },
    { name: "Telegram", icon: <TelegramIcon className="w-4 h-4 text-blue-500" />, status: "Available" },
    { name: "Email Inbox", icon: <EmailChannelIcon className="w-4 h-4 text-amber-600" />, status: "Available" },
    { name: "Slack", icon: <SlackIcon className="w-4 h-4 text-purple-600" />, status: "Available" },
  ]

  const rightTools = [
    { name: "POS & Sales (Square, Clover)", icon: <SquarePosIcon className="w-4 h-4 text-black" />, status: "Supported" },
    { name: "Booking Calendars", icon: <BookingChannelIcon className="w-4 h-4 text-teal-600" />, status: "Supported" },
    { name: "Google Business Reviews", icon: <GoogleBusinessIcon className="w-4 h-4" />, status: "Planned" },
    { name: "CRM & Customer Records", icon: <CloverPosIcon className="w-4 h-4 text-emerald-600" />, status: "Configured" },
    { name: "Accounting & Invoices", icon: <BookingChannelIcon className="w-4 h-4 text-blue-600" />, status: "Configured" },
  ]

  return (
    <div className={`w-full rounded-2xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-md overflow-hidden ${isCompact ? "max-w-4xl mx-auto" : ""}`}>
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-black/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-black/60 uppercase font-semibold">
            Unified Communication &amp; Business Tool Map
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
          <div className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-[#111] text-white shadow-xl border border-black/20 w-full max-w-[220px]">
            {/* Glow backing */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 rounded-2xl blur-md -z-10" />

            <Image src="/nexus-logo.png" alt="Nexus" width={48} height={48} className="object-contain mb-3" />
            <span className="font-pixel text-xs tracking-widest text-white font-bold">NEXUS</span>
            <span className="text-[10px] text-white/60 font-mono mt-1">Managed Assistant Core</span>

            <div className="mt-3 pt-3 border-t border-white/10 w-full space-y-1 text-[10px] text-white/80">
              <div className="flex items-center justify-between">
                <span className="text-white/50">Knowledge:</span>
                <span className="text-emerald-400 font-medium">Approved</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50">Approvals:</span>
                <span className="text-cyan-300 font-medium">Owner-in-Loop</span>
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
        </div>
      </div>
    </div>
  )
}

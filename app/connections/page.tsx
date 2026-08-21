"use client"

import React, { useState } from "react"
import Link from "next/link"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { MobileNav } from "@/components/mobile-nav"
import { SiteFooter } from "@/components/site-footer"
import { ConsultationForm } from "@/components/consultation-form"
import { Tag, StatusPill, BackToTop } from "@/components/shared-ui"
import { CONNECTIONS_DATA, ConnectionItem } from "@/lib/site-data"
import { NexusConnectionsMap } from "@/components/nexus-visuals/nexus-connections-map"
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

export default function ConnectionsPage() {
  const [selectedConnection, setSelectedConnection] = useState<ConnectionItem | null>(null)

  const messagingConnections = CONNECTIONS_DATA.filter((c) => c.category === "messaging")
  const businessToolsConnections = CONNECTIONS_DATA.filter((c) => c.category === "business_tools")

  const getIconForType = (type: string, name: string) => {
    switch (type) {
      case "whatsapp":
        return <WhatsAppIcon className="w-5 h-5 text-emerald-600" />
      case "telegram":
        return <TelegramIcon className="w-5 h-5 text-blue-500" />
      case "email":
        return <EmailChannelIcon className="w-5 h-5 text-amber-600" />
      case "sms":
        return <SmsChannelIcon className="w-5 h-5 text-sky-600" />
      case "slack":
        return <SlackIcon className="w-5 h-5 text-purple-600" />
      case "google":
        return <GoogleBusinessIcon className="w-5 h-5" />
      case "pos":
        return <SquarePosIcon className="w-5 h-5 text-black" />
      case "calendar":
        return <BookingChannelIcon className="w-5 h-5 text-teal-600" />
      case "crm":
        return <CloverPosIcon className="w-5 h-5 text-emerald-600" />
      default:
        return <BookingChannelIcon className="w-5 h-5 text-black/70" />
    }
  }

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      <MobileNav />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-16 px-6 md:px-12 lg:px-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Tag>INTEGRATIONS &amp; CHANNELS</Tag>
          <RevealText className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#111] leading-[1.08]">
            {"Connect the communication channels and business tools you use."}
          </RevealText>
          <p className="text-sm sm:text-base text-black/65 max-w-2xl mx-auto leading-relaxed font-light">
            Nexus coordinates your work across supported messaging channels and business software. Westside Union verifies permissions, handles compatibility, and sets up approval rules with you.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="px-6 py-3.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase shadow-sm"
            >
              Discuss Your Business Tools
            </a>
            <Link
              href="/pricing"
              className="px-6 py-3.5 border border-black/20 text-black/80 text-xs font-medium rounded-xl hover:border-black/40 hover:text-black hover:bg-black/[0.03] transition-all tracking-widest uppercase"
            >
              View Packages &amp; Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. VISUAL CONNECTION MAP ─────────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-[#FAF9F5] border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Tag>CONNECTION MAP</Tag>
            <h2 className="text-2xl sm:text-3xl font-light text-[#111]">
              How Nexus Connects to Your Business
            </h2>
            <p className="text-xs sm:text-sm text-black/60 font-light">
              Message Nexus where you are already comfortable. It orchestrates actions across your connected business tools.
            </p>
          </div>

          <NexusConnectionsMap />
        </div>
      </section>

      {/* ── 3. STATUS LEGEND & COMPACT LOGO GRID ────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-white border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Status Legend Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF9F5] border border-black/[0.07] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-black/60 font-mono">
              Status Legend:
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              <StatusPill status="available" />
              <StatusPill status="supported" />
              <StatusPill status="configured" />
              <StatusPill status="custom" />
              <StatusPill status="planned" />
            </div>
          </div>

          {/* Category 1: Messaging Channels */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-black/50 font-mono block">
                  Category 01
                </span>
                <h3 className="text-xl sm:text-2xl font-light text-[#111] mt-0.5">
                  Messaging &amp; Communication Channels
                </h3>
              </div>
              <span className="text-xs text-black/45 font-mono">{messagingConnections.length} channels</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {messagingConnections.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedConnection(selectedConnection?.name === item.name ? null : item)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    selectedConnection?.name === item.name
                      ? "bg-[#FAF9F5] border-black/40 ring-1 ring-black/10 shadow-xs"
                      : "bg-white border-black/[0.07] hover:border-black/20 hover:bg-[#FAF9F5]/50 shadow-2xs"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-black/[0.03] border border-black/[0.05] flex items-center justify-center">
                      {getIconForType(item.iconType, item.name)}
                    </div>
                    <span className="text-[10px] text-black/30 font-mono">ℹ</span>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-[#111] leading-tight mb-2">{item.name}</h4>
                    <StatusPill status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category 2: Business Software & Tools */}
          <div className="space-y-6 pt-6 border-t border-black/[0.06]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-black/50 font-mono block">
                  Category 02
                </span>
                <h3 className="text-xl sm:text-2xl font-light text-[#111] mt-0.5">
                  Business Software &amp; Operational Systems
                </h3>
              </div>
              <span className="text-xs text-black/45 font-mono">{businessToolsConnections.length} systems</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
              {businessToolsConnections.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedConnection(selectedConnection?.name === item.name ? null : item)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    selectedConnection?.name === item.name
                      ? "bg-[#FAF9F5] border-black/40 ring-1 ring-black/10 shadow-xs"
                      : "bg-white border-black/[0.07] hover:border-black/20 hover:bg-[#FAF9F5]/50 shadow-2xs"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-black/[0.03] border border-black/[0.05] flex items-center justify-center">
                      {getIconForType(item.iconType, item.name)}
                    </div>
                    <span className="text-[10px] text-black/30 font-mono">ℹ</span>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-[#111] leading-tight mb-2">{item.name}</h4>
                    <StatusPill status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expandable Detail Panel */}
          {selectedConnection && (
            <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-black/15 shadow-sm space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center shadow-2xs">
                    {getIconForType(selectedConnection.iconType, selectedConnection.name)}
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-black">{selectedConnection.name}</h4>
                    <span className="text-[10px] font-mono text-black/50 capitalize">{selectedConnection.category.replace("_", " ")}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedConnection(null)}
                  className="w-7 h-7 rounded-full bg-white border border-black/10 text-black/60 hover:text-black flex items-center justify-center text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs sm:text-sm text-black/75 leading-relaxed bg-white p-4 rounded-xl border border-black/[0.05]">
                {selectedConnection.desc}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-black/50">
                <span>Availability: <strong className="text-black capitalize">{selectedConnection.status}</strong></span>
                <a href="#contact" className="text-black font-medium underline underline-offset-2">
                  Verify compatibility in consultation →
                </a>
              </div>
            </div>
          )}

          {/* Availability disclosure */}
          <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-black/[0.05] text-xs text-black/60 leading-relaxed">
            <strong>Availability note:</strong> Connection availability depends on third-party provider permissions, account eligibility, regional availability, and your selected Nexus package. Compatibility is verified during your business workflow consultation.
          </div>
        </div>
      </section>

      {/* ── 4. HOW CONNECTIONS WORK ─────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#FAF9F5] border-b border-black/[0.06]">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="max-w-3xl space-y-3 text-center md:text-left">
            <PixelIcon type="platform" size={40} />
            <Tag>CONNECTION PROCESS</Tag>
            <h2 className="text-3xl font-light text-[#111]">
              How Westside Union connects your tools.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Discovery", desc: "We review the tools and account permissions your business uses." },
              { step: "02", title: "Authorization", desc: "You approve secure, least-privilege connection permissions." },
              { step: "03", title: "Mapping & Testing", desc: "We test data flow and configure owner approval rules." },
              { step: "04", title: "Monitoring", desc: "Westside Union monitors connection health and handles maintenance." },
            ].map((s) => (
              <div key={s.step} className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-2">
                <span className="font-mono text-xs text-black/40">{s.step}</span>
                <h3 className="text-sm font-medium text-[#111]">{s.title}</h3>
                <p className="text-xs text-black/55 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. "DON'T SEE YOUR TOOL?" BANNER & CONSULTATION CTA ─────────────── */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-white border-b border-black/[0.06]">
        <div className="max-w-5xl mx-auto rounded-3xl border border-black/[0.08] bg-[#FAF9F5] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-mono tracking-widest text-black/50 uppercase font-semibold">
              CUSTOM INTEGRATIONS &amp; APIS
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-black">
              Don&apos;t see your specific business tool?
            </h3>
            <p className="text-xs sm:text-sm text-black/65 max-w-xl leading-relaxed">
              We frequently connect custom booking systems, niche POS platforms, webhooks, and private databases through Nexus Custom deployments.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-6 py-3.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase shadow-sm whitespace-nowrap"
          >
            Discuss Custom Setup →
          </a>
        </div>
      </section>

      {/* ── 6. CONSULTATION FORM ────────────────────────────────────────────── */}
      <ConsultationForm
        title="Discuss the tools your business uses."
        subtitle="Let us know what software and messaging channels you currently rely on, and we will verify compatibility during a free review."
      />

      <SiteFooter />
      <BackToTop />
    </div>
  )
}

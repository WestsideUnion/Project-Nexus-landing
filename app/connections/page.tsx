"use client"

import React from "react"
import Link from "next/link"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { MobileNav } from "@/components/mobile-nav"
import { SiteFooter } from "@/components/site-footer"
import { ConsultationForm } from "@/components/consultation-form"
import { BentoCard, Tag, StatusPill, BackToTop } from "@/components/shared-ui"
import { CONNECTIONS_DATA } from "@/lib/site-data"

export default function ConnectionsPage() {
  const messagingConnections = CONNECTIONS_DATA.filter((c) => c.category === "messaging")
  const businessToolsConnections = CONNECTIONS_DATA.filter((c) => c.category === "business_tools")

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      <MobileNav />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-black/[0.06] bg-white">
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

      {/* ── 2. MESSAGING CHANNELS ────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#FAF9F5] border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-black/50 font-mono">
                Category 01
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-[#111]">
              Supported Messaging Channels
            </h2>
            <p className="text-xs sm:text-sm text-black/60 leading-relaxed font-light">
              Familiar communication tools where you, your team, and your customers can interact with Nexus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {messagingConnections.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col justify-between space-y-4 hover:border-black/[0.12] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-medium text-[#111]">{item.name}</h3>
                    <StatusPill status={item.status} />
                  </div>
                  <p className="text-xs text-black/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. BUSINESS TOOLS & SYSTEMS ──────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-white border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-black/50 font-mono">
                Category 02
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-[#111]">
              Business Software &amp; Systems
            </h2>
            <p className="text-xs sm:text-sm text-black/60 leading-relaxed font-light">
              Connect booking platforms, sales registers, customer records, and operational databases.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {businessToolsConnections.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FAF9F5] border border-black/[0.06] shadow-xs flex flex-col justify-between space-y-4 hover:border-black/[0.12] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-medium text-[#111]">{item.name}</h3>
                    <StatusPill status={item.status} />
                  </div>
                  <p className="text-xs text-black/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Availability disclosure */}
          <div className="p-5 rounded-2xl bg-black/[0.02] border border-black/[0.05] text-xs text-black/60 leading-relaxed">
            <strong>Availability note:</strong> Connection availability depends on third-party provider permissions, account eligibility, regional availability, and your selected Nexus package. Compatibility is verified during your business workflow consultation.
          </div>
        </div>
      </section>

      {/* ── 4. HOW CONNECTIONS WORK ─────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#FAF9F5] border-b border-black/[0.06]">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="max-w-3xl space-y-3">
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

      {/* ── 5. CONSULTATION CTA ────────────────────────────────────────────── */}
      <ConsultationForm
        title="Discuss the tools your business uses."
        subtitle="Let us know what software and messaging channels you currently rely on, and we will verify compatibility during a free review."
      />

      <SiteFooter />
      <BackToTop />
    </div>
  )
}

"use client"

import React from "react"
import Link from "next/link"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { MobileNav } from "@/components/mobile-nav"
import { SiteFooter } from "@/components/site-footer"
import { ConsultationForm } from "@/components/consultation-form"
import { BentoCard, Tag, BackToTop } from "@/components/shared-ui"
import { PACKAGES, EDGE_AGREEMENT } from "@/lib/site-data"
import { NexusEdgeEmblem } from "@/components/nexus-visuals/nexus-package-emblems"

export default function NexusEdgePage() {
  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      <MobileNav />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex justify-center mb-2">
            <NexusEdgeEmblem className="w-16 h-16" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Tag>NEXUS EDGE</Tag>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest bg-emerald-700 text-white font-mono uppercase">
              LOCAL MANAGED AI
            </span>
          </div>
          <RevealText className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#111] leading-[1.08]">
            {"Keep more business knowledge on-site with managed local AI."}
          </RevealText>
          <p className="text-sm sm:text-base text-black/65 max-w-2xl mx-auto leading-relaxed font-light">
            Nexus Edge places a dedicated managed appliance at your business—combining high on-site privacy and predictable operational spending with managed peace of mind.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="px-6 py-3.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase shadow-sm"
            >
              Book an Edge Assessment
            </a>
            <Link
              href="/pricing"
              className="px-6 py-3.5 border border-black/20 text-black/80 text-xs font-medium rounded-xl hover:border-black/40 hover:text-black hover:bg-black/[0.03] transition-all tracking-widest uppercase"
            >
              Compare All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. THE PROBLEM (Why Edge?) ───────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#FAF9F5] border-b border-black/[0.06]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <Tag>THE CHALLENGE</Tag>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111] tracking-tight">
              When your business relies on AI daily, you want control over data and costs.
            </h2>
            <p className="text-xs sm:text-sm text-black/65 leading-relaxed font-light">
              As your operations scale and customer interactions increase, sending sensitive records and high task volumes to public cloud APIs creates new friction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Higher Privacy Requirements",
                desc: "Customer records, internal notes, and confidential operational rules require strict physical isolation.",
              },
              {
                title: "Unpredictable Cloud Costs",
                desc: "Variable per-token API fees can fluctuate wildly during seasonal rushes and marketing campaigns.",
              },
              {
                title: "Cloud Dependence",
                desc: "Outages, latency spikes, and third-party policy changes introduce external risk to daily workflows.",
              },
              {
                title: "Local Knowledge Access",
                desc: "Routine inquiries, inventory lookups, and draft preparation work best when processed immediately on-site.",
              },
              {
                title: "No In-House IT Burden",
                desc: "Small businesses need enterprise-grade security and backups without hiring a dedicated IT department.",
              },
              {
                title: "Predictable Budgeting",
                desc: "Fixed monthly service replaces erratic infrastructure bills and expensive capital hardware purchases.",
              },
            ].map((p, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <h3 className="text-sm font-medium text-[#111]">{p.title}</h3>
                <p className="text-xs text-black/60 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. THE GUIDE & BENEFITS ──────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-white border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <PixelIcon type="platform" size={40} />
            <div className="mt-4"><Tag>THE SOLUTION</Tag></div>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111] tracking-tight">
              Westside Union provides, monitors, and maintains your on-site appliance.
            </h2>
            <p className="text-xs sm:text-sm text-black/65 leading-relaxed font-light">
              Nexus Edge gives you the speed and privacy of local execution with the simplicity of a fully managed service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Approved information stays on-site",
                desc: "Your business knowledge, customer records, and daily task context are processed and stored locally.",
                tag: "Privacy First",
              },
              {
                title: "Routine work handled locally",
                desc: "Repetitive drafting, task tracking, and FAQ triage run directly on your appliance without consuming cloud AI tokens.",
                tag: "Cost Control",
              },
              {
                title: "Cloud fallback available",
                desc: "CAD $10/month managed cloud fallback is included for complex queries or burst operations when needed.",
                tag: "Hybrid Resilience",
              },
              {
                title: "Remote monitoring & maintenance",
                desc: "Westside Union applies security patches, performance updates, and health monitoring remotely.",
                tag: "Zero IT Hassle",
              },
              {
                title: "Covered hardware replacement",
                desc: "If standard appliance hardware fails during ordinary operation, Westside Union repairs or replaces it under service.",
                tag: "Worry-Free",
              },
              {
                title: "Customer-owned data",
                desc: "Your data remains yours. We support approved data exports and securely wipe hardware before decommissioning.",
                tag: "Data Integrity",
              },
            ].map((b, i) => (
              <BentoCard key={i} className="p-6 flex flex-col justify-between" delay={i * 60}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] tracking-widest uppercase font-mono text-black/40 bg-black/[0.04] px-2 py-0.5 rounded-full">
                      {b.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-[#111] mb-2">{b.title}</h3>
                  <p className="text-xs text-black/60 leading-relaxed">{b.desc}</p>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHAT IS INCLUDED & 5. AGREEMENT SUMMARY ───────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#FAF9F5] border-b border-black/[0.06]">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="rounded-3xl border border-black/[0.08] bg-white p-8 sm:p-12 shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <Tag>PACKAGE SPECIFICATIONS</Tag>
                <h2 className="text-3xl font-light text-[#111] mt-2">Nexus Edge Package Inclusions</h2>
                <p className="text-xs sm:text-sm text-black/60 mt-1">Everything you need for managed on-site assistance.</p>
              </div>
              <div className="text-left md:text-right">
                <div className="text-3xl font-light text-[#111]">CAD $299<span className="text-sm text-black/40">/mo</span></div>
                <div className="text-xs text-black/50">CAD $699 activation · 24-month agreement</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-black/[0.06]">
              {PACKAGES.edge.fullFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-black/75 p-2 rounded-lg bg-[#FAF9F5]">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span className={feat.highlight ? "font-medium text-[#111]" : ""}>{feat.text}</span>
                </div>
              ))}
            </div>

            {/* Agreement Terms Box */}
            <div className="p-6 rounded-2xl bg-black/[0.02] border border-black/[0.06] space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-black/70 font-mono">
                Agreement &amp; Financial Terms
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-black/40 block text-[10px] uppercase font-mono">Monthly Managed Fee</span>
                  <span className="text-black/80 font-medium">CAD $299 / month</span>
                </div>
                <div>
                  <span className="text-black/40 block text-[10px] uppercase font-mono">Activation &amp; Setup</span>
                  <span className="text-black/80 font-medium">CAD $699 one-time</span>
                </div>
                <div>
                  <span className="text-black/40 block text-[10px] uppercase font-mono">Minimum 24-Month Commitment</span>
                  <span className="text-black/80 font-medium">CAD $7,875 before taxes</span>
                </div>
              </div>
              <p className="text-[11px] text-black/55 leading-relaxed pt-2 border-t border-black/[0.04]">
                Standard managed appliance included. The appliance remains the property of Westside Union throughout the term. Higher-capacity equipment, specialized on-site cabling, or optional add-ons are separate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. LIFECYCLE & 7. UPGRADE PATH ───────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-white border-b border-black/[0.06]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <Tag>MANAGED LIFECYCLE</Tag>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111] tracking-tight">
              From deployment to refresh: what to expect.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                title: "Setup & Delivery",
                desc: "We configure your business knowledge, test connections, and deliver the pre-configured appliance.",
              },
              {
                step: "02",
                title: "Monitoring & Patches",
                desc: "Westside Union securely monitors appliance uptime, software health, and security updates.",
              },
              {
                step: "03",
                title: "Covered Replacement",
                desc: "Hardware faults during ordinary operation are covered with prompt equipment replacement.",
              },
              {
                step: "04",
                title: "Renewal or Secure Return",
                desc: "At term end, renew, refresh hardware, transition to Cloud, or return the unit with certified data wipe.",
              },
            ].map((st) => (
              <div key={st.step} className="p-5 rounded-2xl bg-[#FAF9F5] border border-black/[0.05] space-y-2">
                <span className="font-mono text-xs text-black/40">{st.step}</span>
                <h3 className="text-sm font-medium text-[#111]">{st.title}</h3>
                <p className="text-xs text-black/55 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>

          {/* Upgrade Path Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F5] border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[10px] tracking-widest uppercase font-mono text-emerald-800 font-medium">
                START WITH CLOUD · UPGRADE TO EDGE
              </span>
              <h3 className="text-lg font-medium text-[#111]">
                Receive credit for your Cloud onboarding.
              </h3>
              <p className="text-xs text-black/65 max-w-xl leading-relaxed">
                {EDGE_AGREEMENT.cloudToEdgeCreditText}
              </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 px-5 py-3 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors uppercase tracking-wider"
            >
              Book an Edge Assessment
            </a>
          </div>
        </div>
      </section>

      {/* ── 8. ASSESSMENT CTA / FORM ────────────────────────────────────────── */}
      <ConsultationForm
        defaultPackage="Nexus Edge — CAD $299/month, 24-month term"
        title="Book an Edge Assessment for your business."
        subtitle="We will evaluate your physical location, privacy requirements, and workflow volume to determine if Nexus Edge is the right fit."
      />

      <SiteFooter />
      <BackToTop />
    </div>
  )
}

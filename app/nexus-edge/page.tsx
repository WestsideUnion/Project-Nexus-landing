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
      <section className="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-black/6 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex justify-center mb-2">
            <NexusEdgeEmblem className="w-16 h-16" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Tag>NEXUS EDGE</Tag>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest bg-emerald-700 text-white font-mono uppercase">
              DEDICATED CAPACITY
            </span>
          </div>
          <RevealText className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#111] leading-[1.08]">
            {"More room for the work your business depends on."}
          </RevealText>
          <p className="text-sm sm:text-base text-black/65 max-w-2xl mx-auto leading-relaxed font-light">
            Nexus Edge gives growing businesses dedicated managed AI capacity, deeper workflow configuration, and priority operational support — hosted, monitored, and maintained by Westside Union.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="px-6 py-3.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase shadow-sm"
            >
              Talk to Us About Edge
            </a>
            <Link
              href="/pricing"
              className="px-6 py-3.5 border border-black/20 text-black/80 text-xs font-medium rounded-xl hover:border-black/40 hover:text-black hover:bg-black/3 transition-all tracking-widest uppercase"
            >
              Compare All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. THE CHALLENGE (Why Edge?) ─────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#FAF9F5] border-b border-black/6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <PixelIcon type="platform" size={40} />
            <div className="pt-2"><Tag>WHEN TO STEP UP</Tag></div>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111] tracking-tight">
              When daily operations depend on consistent workflows, you need dedicated capacity.
            </h2>
            <p className="text-xs sm:text-sm text-black/65 leading-relaxed font-light">
              As your team relies on Nexus across more customer inquiries, bookings, follow-ups, and reporting, stepping up from standard shared capacity ensures tailored workflows and predictable performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Higher Daily Workload",
                desc: "Busy shops, clinics, and service teams need expanded capacity for frequent customer communication and daily coordination.",
              },
              {
                title: "Deeper Workflow Setup",
                desc: "Businesses with specific intake rules, multi-step follow-ups, or custom approval paths benefit from hands-on workflow mapping.",
              },
              {
                title: "Dedicated Environment",
                desc: "Dedicated managed capacity hosted by Westside Union keeps your business knowledge and workflows isolated and responsive.",
              },
              {
                title: "More Connected Tools",
                desc: "Coordinate across multiple business systems, calendars, or communication channels with guided configuration.",
              },
              {
                title: "Zero Hardware to House",
                desc: "Westside Union hosts, monitors, and maintains the underlying system so your team never has to manage equipment or IT.",
              },
              {
                title: "Priority Operational Support",
                desc: "Get closer ongoing support as your team refines templates, seasonal campaigns, and operational rules.",
              },
            ].map((p, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-black/6 shadow-xs space-y-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <h3 className="text-sm font-medium text-[#111]">{p.title}</h3>
                <p className="text-xs text-black/60 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. THE SOLUTION & BENEFITS ───────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-white border-b border-black/6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <PixelIcon type="platform" size={40} />
            <div className="mt-4"><Tag>MANAGED BY WESTSIDE UNION</Tag></div>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111] tracking-tight">
              Dedicated capacity and tailored workflows — hosted and managed for you.
            </h2>
            <p className="text-xs sm:text-sm text-black/65 leading-relaxed font-light">
              You focus on running your business while Westside Union handles the environment, workflow configuration, monitoring, and ongoing care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Dedicated managed capacity",
                desc: "More room for daily customer communication, scheduling preparation, and internal operational summaries.",
                tag: "Capacity",
              },
              {
                title: "Tailored workflow mapping",
                desc: "We work with you to map your services, policies, escalation rules, and preferred tone into repeatable workflows.",
                tag: "Guided Setup",
              },
              {
                title: "Hosted by Westside Union",
                desc: "No equipment to install at your workplace and no servers for your staff to troubleshoot or maintain.",
                tag: "Zero IT Burden",
              },
              {
                title: "Approval-first guardrails",
                desc: "Keep sensitive replies, refunds, or schedule changes behind your explicit approval before anything is sent.",
                tag: "Owner Control",
              },
              {
                title: "Continuous monitoring & updates",
                desc: "Westside Union monitors system health, applies updates, and keeps your workflows running smoothly.",
                tag: "Managed Care",
              },
              {
                title: "Optional Nexus Sense add-on",
                desc: "Ready to pair with optional connected workplace devices when your business wants alerts or status checks.",
                tag: "Expandable",
              },
            ].map((b, i) => (
              <BentoCard key={i} className="p-6 flex flex-col justify-between" delay={i * 60}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] tracking-widest uppercase font-mono text-black/40 bg-black/4 px-2 py-0.5 rounded-full">
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

      {/* ── 4. WHAT IS INCLUDED & 5. COMMERCIAL SUMMARY ──────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#FAF9F5] border-b border-black/6">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="rounded-3xl border border-black/8 bg-white p-8 sm:p-12 shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <Tag>PACKAGE SPECIFICATIONS</Tag>
                <h2 className="text-3xl font-light text-[#111] mt-2">Nexus Edge Package Inclusions</h2>
                <p className="text-xs sm:text-sm text-black/60 mt-1">Dedicated capacity and deeper workflow support for growing teams.</p>
              </div>
              <div className="text-left md:text-right">
                <div className="text-3xl font-light text-[#111]">From CAD $499<span className="text-sm text-black/40">/mo</span></div>
                <div className="text-xs text-black/60 font-medium">One-time setup fee applies: CAD $1,499</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-black/6">
              {PACKAGES.edge.fullFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-black/75 p-3 rounded-xl bg-[#FAF9F5]">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span className={feat.highlight ? "font-medium text-[#111]" : ""}>{feat.text}</span>
                </div>
              ))}
            </div>

            {/* Commercial Terms Box */}
            <div className="p-6 rounded-2xl bg-black/2 border border-black/6 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-black/70 font-mono">
                Commercial &amp; Setup Summary
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-black/40 block text-[10px] uppercase font-mono">Recurring Service</span>
                  <span className="text-black/80 font-medium">From CAD $499 / month (Monthly or Annual options)</span>
                </div>
                <div>
                  <span className="text-black/40 block text-[10px] uppercase font-mono">One-Time Setup Fee</span>
                  <span className="text-black/80 font-medium">CAD $1,499 one-time</span>
                </div>
                <div>
                  <span className="text-black/40 block text-[10px] uppercase font-mono">Hosting &amp; Care</span>
                  <span className="text-black/80 font-medium">Hosted &amp; managed by Westside Union</span>
                </div>
              </div>
              <p className="text-[11px] text-black/55 leading-relaxed pt-2 border-t border-black/4">
                The one-time setup fee covers initial configuration, workflow mapping, and dedicated environment preparation, and is confirmed clearly before work begins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. ONBOARDING STEPS & UPGRADE PATH ───────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-white border-b border-black/6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <Tag>HOW WE SET UP EDGE</Tag>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111] tracking-tight">
              From workflow review to daily operation.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                title: "Workflow Mapping",
                desc: "We review your busiest communication, scheduling, and follow-up bottlenecks with you.",
              },
              {
                step: "02",
                title: "Environment Setup",
                desc: "Westside Union prepares your dedicated Nexus Edge environment, business knowledge, and tool connections.",
              },
              {
                step: "03",
                title: "Guided Launch",
                desc: "We test responses, approval rules, and summaries with your team before going live.",
              },
              {
                step: "04",
                title: "Ongoing Management",
                desc: "Westside Union monitors performance, applies updates, and supports your workflows as you grow.",
              },
            ].map((st) => (
              <div key={st.step} className="p-5 rounded-2xl bg-[#FAF9F5] border border-black/5 space-y-2">
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
                START WITH CLOUD · STEP UP TO EDGE ANYTIME
              </span>
              <h3 className="text-lg font-medium text-[#111]">
                Already using Nexus Cloud?
              </h3>
              <p className="text-xs text-black/65 max-w-xl leading-relaxed">
                {EDGE_AGREEMENT.cloudToEdgeCreditText}
              </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 px-5 py-3 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors uppercase tracking-wider"
            >
              Talk to Us
            </a>
          </div>
        </div>
      </section>

      {/* ── 8. ASSESSMENT CTA / FORM ────────────────────────────────────────── */}
      <ConsultationForm
        defaultPackage="Nexus Edge — From CAD $499/month (+ one-time setup fee)"
        title="Talk to us about Nexus Edge."
        subtitle="Tell us about your team, tools, and daily workload, and we will help you decide whether Nexus Cloud or Nexus Edge is the right starting point."
      />

      <SiteFooter />
      <BackToTop />
    </div>
  )
}

"use client"

import React from "react"
import Link from "next/link"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { MobileNav } from "@/components/mobile-nav"
import { SiteFooter } from "@/components/site-footer"
import { ConsultationForm } from "@/components/consultation-form"
import { BentoCard, Tag, FaqAccordionItem, BackToTop } from "@/components/shared-ui"
import { ALL_FAQS } from "@/lib/site-data"

export default function StartBusinessCanadaPage() {
  const founderFaqs = ALL_FAQS.filter((f) => f.category === "Start Your Business — Canada")

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      <MobileNav />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Tag>FOR FOUNDERS</Tag>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest bg-[#111] text-white font-mono uppercase">
              CANADA
            </span>
          </div>
          <RevealText className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#111] leading-[1.08]">
            {"Start your business in Canada with a clearer launch roadmap."}
          </RevealText>
          <p className="text-sm sm:text-base text-black/65 max-w-2xl mx-auto leading-relaxed font-light">
            Get structured launch coordination, official Canadian registration checklists, operating tool setup, professional handoffs, and an assistant that continues supporting your business after opening day.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="px-6 py-3.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase shadow-sm"
            >
              Book a Founder Consultation
            </a>
            <a
              href="https://www.canada.ca/en/services/business/start.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 border border-black/20 text-black/80 text-xs font-medium rounded-xl hover:border-black/40 hover:text-black hover:bg-black/[0.03] transition-all tracking-widest uppercase"
            >
              Canada.ca Business Guide ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. THE FOUNDER PROBLEM & DISCLAIMER ─────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#FAF9F5] border-b border-black/[0.06]">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <Tag>THE CHALLENGE</Tag>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111] tracking-tight">
              Launching comes with a dizzying checklist.
            </h2>
            <p className="text-xs sm:text-sm text-black/65 max-w-2xl mx-auto leading-relaxed">
              Between federal or provincial incorporation, CRA Business Numbers, GST/HST registration, commercial banking, bookkeeping, and customer communication tools, founders spend weeks sorting through fragmented processes.
            </p>
          </div>

          {/* Mandatory Professional Boundary Alert */}
          <div className="p-6 rounded-2xl bg-white border border-amber-500/30 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs font-medium uppercase tracking-widest text-black/70 font-mono">
                Professional Boundary &amp; Advisory Notice
              </span>
            </div>
            <p className="text-xs sm:text-sm text-black/75 leading-relaxed">
              Nexus provides operational guidance, checklist organization, and initial tool setup. It does not replace legal, accounting, tax, immigration, banking, insurance, or other regulated professional advice. We coordinate referrals to qualified Canadian professionals when you need regulated counsel.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. FOUR LAUNCH PILLARS ───────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-white border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <PixelIcon type="workflow" size={40} />
            <div className="mt-4"><Tag>THE ROADMAP</Tag></div>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111] tracking-tight">
              How Nexus guides your Canadian launch.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                title: "Discovery & Launch Roadmap",
                desc: "Map your province, operating model, and startup milestones into a personalized checklist referencing official Canadian guidelines.",
                tag: "Planning",
              },
              {
                step: "02",
                title: "Operating Toolkit Setup",
                desc: "Organize domain, business email, invoicing, appointment booking, and customer messaging before opening day.",
                tag: "Setup",
              },
              {
                step: "03",
                title: "Professional Handoffs",
                desc: "Warm referrals to verified Canadian accountants, business lawyers, and commercial banking partners for regulated counsel.",
                tag: "Referrals",
              },
              {
                step: "04",
                title: "Post-Launch Continuity",
                desc: "Seamlessly transition into an ongoing Nexus Cloud subscription to manage customer follow-ups and inquiries from day one.",
                tag: "Ongoing Support",
              },
            ].map((pillar) => (
              <BentoCard key={pillar.step} className="p-6 flex flex-col justify-between" delay={0}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-black/40">{pillar.step}</span>
                    <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full bg-black/[0.04] text-black/60 font-mono">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-[#111] mb-2">{pillar.title}</h3>
                  <p className="text-xs text-black/60 leading-relaxed">{pillar.desc}</p>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. DETAILED CHECKLIST & TOOLKIT BREAKDOWN ─────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#FAF9F5] border-b border-black/[0.06]">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="max-w-3xl space-y-3">
            <Tag>LAUNCH CHECKLIST</Tag>
            <h2 className="text-3xl font-light text-[#111]">
              Structured guidance across every milestone.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "1. Business Structure & Naming",
                desc: "Clarify sole proprietorship, partnership, or federal/provincial incorporation considerations and NUANS name-search guidelines.",
              },
              {
                title: "2. Official Registrations & CRA",
                desc: "Step-by-step guidance referencing Canada.ca, Corporations Canada, provincial registries, and Business Number (BN) setup.",
              },
              {
                title: "3. Banking & Bookkeeping Readiness",
                desc: "Checklists for business bank accounts, GST/HST accounts, payroll registration, and initial accounting software configuration.",
              },
              {
                title: "4. Customer Communication Channels",
                desc: "Configure official WhatsApp, SMS, or Telegram channels to receive early customer inquiries and quote requests smoothly.",
              },
              {
                title: "5. Professional Service Referrals",
                desc: "Direct handoffs to Canadian CPA accountants, commercial banking specialists, and corporate legal advisors.",
              },
              {
                title: "6. Transition to Nexus Cloud",
                desc: "After launch, keep your assistant active for CAD $99/month to organize daily reviews, reminders, and customer follow-ups.",
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-2">
                <h3 className="text-sm font-medium text-[#111]">{item.title}</h3>
                <p className="text-xs text-black/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-black/[0.02] border border-black/[0.04] text-[11px] text-black/50 text-center">
            Official government links:{" "}
            <a href="https://www.canada.ca/en/services/business/start.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">
              Canada.ca Starting a Business ↗
            </a>{" "}
            ·{" "}
            <a href="https://ised-isde.canada.ca/site/corporations-canada/en" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">
              Corporations Canada ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── 5. FOUNDER FAQ ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-white border-b border-black/[0.06]">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <Tag>FOUNDER FAQ</Tag>
            <h2 className="text-3xl font-light text-[#111] mt-3">
              Questions from new founders.
            </h2>
          </div>

          <div className="divide-y divide-black/[0.06] bg-[#FAF9F5] rounded-2xl border border-black/[0.07] px-6 sm:px-8 py-2">
            {founderFaqs.map((faq) => (
              <FaqAccordionItem key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CONSULTATION CTA ────────────────────────────────────────────── */}
      <ConsultationForm
        defaultPackage="Start Your Business — Canada"
        title="Tell us about the business you are launching."
        subtitle="We will review your operating model, province requirements, and initial tooling needs during a free founder discovery session."
      />

      <SiteFooter />
      <BackToTop />
    </div>
  )
}

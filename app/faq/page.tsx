"use client"

import React, { useState } from "react"
import Link from "next/link"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { MobileNav } from "@/components/mobile-nav"
import { SiteFooter } from "@/components/site-footer"
import { ConsultationForm } from "@/components/consultation-form"
import { Tag, FaqAccordionItem, BackToTop } from "@/components/shared-ui"
import { FAQ_CATEGORIES, ALL_FAQS } from "@/lib/site-data"

export default function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const categories = ["All", ...FAQ_CATEGORIES]

  const filteredFaqs =
    selectedCategory === "All"
      ? ALL_FAQS
      : ALL_FAQS.filter((f) => f.category === selectedCategory)

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      <MobileNav />

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-16 px-6 md:px-12 lg:px-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Tag>HELP &amp; FAQ</Tag>
          <RevealText className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#111] leading-[1.08]">
            {"Frequently asked questions."}
          </RevealText>
          <p className="text-sm sm:text-base text-black/65 max-w-2xl mx-auto leading-relaxed font-light">
            Answers to common questions about Nexus packages, AI usage, on-site edge security, connections, and service setup.
          </p>
        </div>
      </section>

      {/* ── FAQ DIRECTORY ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#FAF9F5]">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#111] text-white font-medium shadow-xs"
                    : "bg-white border border-black/10 text-black/60 hover:text-black hover:border-black/25"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="bg-white rounded-2xl border border-black/[0.07] px-6 sm:px-8 py-2 shadow-sm divide-y divide-black/[0.06]">
            {filteredFaqs.map((faq) => (
              <FaqAccordionItem key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          {/* Contextual Links Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-6">
            <Link
              href="/pricing"
              className="p-4 rounded-xl bg-white border border-black/[0.06] text-center hover:border-black/20 transition-colors shadow-xs"
            >
              <span className="text-xs font-medium text-[#111] block">View Packages</span>
              <span className="text-[10px] text-black/50">Cloud, Edge &amp; Custom →</span>
            </Link>
            <Link
              href="/nexus-edge"
              className="p-4 rounded-xl bg-white border border-black/[0.06] text-center hover:border-black/20 transition-colors shadow-xs"
            >
              <span className="text-xs font-medium text-[#111] block">Nexus Edge</span>
              <span className="text-[10px] text-black/50">Local managed AI →</span>
            </Link>
            <Link
              href="/connections"
              className="p-4 rounded-xl bg-white border border-black/[0.06] text-center hover:border-black/20 transition-colors shadow-xs"
            >
              <span className="text-xs font-medium text-[#111] block">Connections</span>
              <span className="text-[10px] text-black/50">Messaging &amp; Tools →</span>
            </Link>
            <Link
              href="/start-business-canada"
              className="p-4 rounded-xl bg-white border border-black/[0.06] text-center hover:border-black/20 transition-colors shadow-xs"
            >
              <span className="text-xs font-medium text-[#111] block">For Founders</span>
              <span className="text-[10px] text-black/50">Canada Launch Program →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONSULTATION CTA ────────────────────────────────────────────────── */}
      <ConsultationForm
        title="Have a specific question about your operations?"
        subtitle="Book a free consultation and we will answer your workflow, integration, or privacy questions directly."
      />

      <SiteFooter />
      <BackToTop />
    </div>
  )
}

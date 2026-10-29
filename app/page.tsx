"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { MobileNav } from "@/components/mobile-nav"
import { SiteFooter } from "@/components/site-footer"
import { ConsultationForm } from "@/components/consultation-form"
import { BentoCard, Tag, FaqAccordionItem, BackToTop } from "@/components/shared-ui"
import { PACKAGES, HOMEPAGE_FAQS, AI_TEAM_ROLES, INDUSTRIES_DATA, IndustryDetail } from "@/lib/site-data"

// Visual Components
import { NexusMessageToOutcome } from "@/components/nexus-visuals/nexus-message-to-outcome"
import { NexusTaskProgress } from "@/components/nexus-visuals/nexus-task-progress"
import { NexusConnectionsAndSense } from "@/components/nexus-visuals/nexus-sense-panel"
import { NexusCloudEmblem, NexusEdgeEmblem, NexusEnterpriseEmblem } from "@/components/nexus-visuals/nexus-package-emblems"
import { ClientLogosSection } from "@/components/client-logos-section"

export default function HomePage() {
  const [previewIndustry, setPreviewIndustry] = useState<IndustryDetail | null>(null)

  useEffect(() => {
    if (!previewIndustry) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewIndustry(null)
    }
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [previewIndustry])

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
  }

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      {/* ── STICKY NAV ──────────────────────────────────────────────────────── */}
      <MobileNav />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-end overflow-hidden pt-36 sm:pt-40 pb-16 px-6 md:px-12 lg:px-20"
      >
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/agentic-hero-9yW3wnTNMfn2U6lsVhTTZSJFEvAoSj.mp4"
          style={{ transform: "scale(1.05)", transition: "transform 2s cubic-bezier(0.16, 1, 0.3, 1)" }}
        />

        {/* Progressive blur + light gradient rising from bottom */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          style={{
            height: "75%",
            background:
              "linear-gradient(to top, #F5F4F0 0%, #F5F4F0 25%, rgba(245,244,240,0.85) 45%, rgba(245,244,240,0.4) 70%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          style={{
            height: "25%",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          }}
        />

        {/* Status badge */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/8 shadow-xs whitespace-nowrap">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] tracking-widest text-black/60 uppercase font-sans font-medium">
            Managed by Westside Union
          </span>
        </div>

        {/* Hero Grid: Content + Visual Flow */}
        <div className="relative z-30 max-w-6xl mx-auto w-full my-auto pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero text card (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 rounded-2xl bg-[#F5F4F0]/90 backdrop-blur-md border border-black/7 shadow-xl">
            <span className="text-[11px] tracking-[0.2em] text-black/60 uppercase mb-4 block font-sans font-medium">
              MEET NEXUS
            </span>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-light text-[#111] leading-[1.1] tracking-tight mb-5"
              style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
            >
              Your business has enough to do. Let Nexus help.
            </h1>

            <p className="text-xs sm:text-sm text-black/75 leading-relaxed max-w-xl mb-6">
              Meet your AI business assistant and the specialists behind it. Nexus helps simplify everyday work, keep information organized, and make it easier to focus on growing your business. Westside Union handles the setup and technology.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <div>
                <a
                  href="#contact"
                  className="inline-block px-7 py-3.5 bg-[#111] text-white text-[11px] font-semibold rounded-xl hover:bg-[#333] transition-all tracking-widest uppercase text-center shadow-md active:scale-[0.99]"
                >
                  Book a Demo
                </a>
                <span className="block text-[11px] text-black/50 mt-1.5 tracking-wide">
                  Tell us how your business operates.
                </span>
              </div>
              <a
                href="#workflow"
                className="px-6 py-3.5 border border-black/20 text-black/80 text-[11px] font-medium rounded-xl hover:border-black/40 hover:text-black hover:bg-black/4 transition-all duration-200 tracking-widest uppercase self-start sm:self-auto"
              >
                Explore How It Works
              </a>
            </div>

            {/* Trust line */}
            <div className="pt-5 border-t border-black/8 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { label: "Less time chasing information" },
                  { label: "Works with the tools you already use" },
                  { label: "One assistant. A team of specialists behind it" },
                  { label: "Westside Union handles the technical work" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <div className="text-xs text-black/70 font-normal leading-snug">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Visual Flow (6 cols) */}
          <div className="lg:col-span-6 w-full">
            <NexusMessageToOutcome />
          </div>
        </div>
      </section>

      {/* ── CLIENT LOGOS TRUST BAR ──────────────────────────────────────────── */}
      <ClientLogosSection />

      {/* ── 2. PROBLEMS & OUTCOMES ──────────────────────────────────────────── */}
      <section id="how-it-helps" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/6 bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Tag>HOW NEXUS HELPS</Tag>
            <h2
              className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light text-[#111] tracking-tight leading-[1.1]"
              style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
            >
              Less time chasing information. More time running your business.
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-black/65 max-w-2xl mx-auto leading-relaxed">
              See what needs your attention, without digging through everything yourself.
            </p>
          </div>

          {/* 3 Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" onMouseMove={handleMouse}>
            {/* Card 1 */}
            <BentoCard className="p-7 flex flex-col justify-between" delay={0}>
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center mb-5 text-amber-800">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-black/40 font-semibold block mb-1">
                  EVERYDAY WORKLOAD
                </span>
                <h3 className="text-xl font-medium text-[#111] mb-2">Too much to do, not enough time?</h3>
                <p className="text-xs sm:text-sm text-black/65 leading-relaxed mb-6">
                  Help with repetitive tasks, follow-ups and everyday admin work so your team can focus on customers.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-black/6 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-black/45">
                  <span>Illustrative Example</span>
                  <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-sans">Follow-up Ready</span>
                </div>
                <div className="text-xs text-black/80 font-medium">
                  &ldquo;3 customer inquiries and 2 open quotes organized for your review.&rdquo;
                </div>
                <div className="text-[11px] text-emerald-700 flex items-center gap-1.5 pt-1 border-t border-black/4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Prepared according to your configured workflow</span>
                </div>
              </div>
            </BentoCard>

            {/* Card 2 */}
            <BentoCard className="p-7 flex flex-col justify-between" delay={80}>
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center mb-5 text-blue-800">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-black/40 font-semibold block mb-1">
                  SCATTERED TOOLS
                </span>
                <h3 className="text-xl font-medium text-[#111] mb-2">Information all over the place?</h3>
                <p className="text-xs sm:text-sm text-black/65 leading-relaxed mb-6">
                  Bring useful business information together so it&apos;s easier to find answers and understand priorities.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-black/6 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-black/45">
                  <span>Illustrative Example</span>
                  <span className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-sans">Daily Summary</span>
                </div>
                <div className="text-xs text-black/80 font-medium">
                  &ldquo;Nexus, what needs my attention today?&rdquo;
                </div>
                <div className="text-[11px] text-blue-700 flex items-center justify-between pt-1 border-t border-black/4">
                  <span>Pulls open items from connected tools</span>
                </div>
              </div>
            </BentoCard>

            {/* Card 3 */}
            <BentoCard className="p-7 flex flex-col justify-between" delay={160}>
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200/60 flex items-center justify-center mb-5 text-purple-800">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-black/40 font-semibold block mb-1">
                  SCALING OPERATIONS
                </span>
                <h3 className="text-xl font-medium text-[#111] mb-2">Growing faster than your processes?</h3>
                <p className="text-xs sm:text-sm text-black/65 leading-relaxed mb-6">
                  Give managers a clearer view of tasks, activity and issues needing attention as the business expands.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-black/6 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-black/45">
                  <span>Illustrative Example</span>
                  <span className="text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded font-sans">Multi-Team View</span>
                </div>
                <div className="text-xs text-black/80 font-medium">
                  Checklists, handoffs &amp; recurring updates organized
                </div>
                <div className="text-[11px] text-purple-700 flex items-center gap-1.5 pt-1 border-t border-black/4">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>Clear visibility across connected records</span>
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── 3. WHAT NEXUS IS & AI SPECIALIST TEAM ───────────────────────────── */}
      <section id="ai-team" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/6 bg-white">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <PixelIcon type="agents" size={40} />
              <div className="mt-4"><Tag>ONE NEXUS. A TEAM BEHIND IT.</Tag></div>
              <RevealText className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.08]">
                {"One assistant to talk to. A team ready to help."}
              </RevealText>
              <p className="mt-4 text-xs sm:text-sm text-black/65 leading-relaxed">
                Talk to Nexus the way you&apos;d talk to a capable assistant. Depending on your plan and configuration, Nexus can coordinate specialist workflows for customer care, marketing, sales, reporting, reputation and operations — without asking you to manage a collection of separate AI products.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-black/6 max-w-xs text-xs text-black/60 leading-relaxed">
              <strong className="text-[#111] block mb-1">One main assistant identity</strong>
              Specialists are configured around the workflows and permissions included in your setup.
            </div>
          </div>

          {/* 7 Specialist Role Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" onMouseMove={handleMouse}>
            {AI_TEAM_ROLES.map((role, idx) => (
              <BentoCard key={role.id} className="p-6 flex flex-col justify-between bg-[#FAF9F5]" delay={idx * 40}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white border border-black/6 text-black/55">
                      {role.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-[#111] mb-2">{role.name}</h3>
                  <p className="text-xs text-black/70 leading-relaxed mb-4">{role.summary}</p>
                </div>

                <div className="pt-3 border-t border-black/5 space-y-1.5">
                  {role.examples.map((ex, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-black/55">
                      <span className="text-emerald-600">•</span>
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </BentoCard>
            ))}

            {/* 8th Card: Custom / Guided Setup Card */}
            <BentoCard className="p-6 flex flex-col justify-between bg-[#111] text-white border-black" delay={280}>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 inline-block mb-3">
                  Configured For You
                </span>
                <h3 className="text-base font-medium text-white mb-2">
                  Shaped around the work you need help with.
                </h3>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  You don&apos;t have to figure out prompts or wire up tools yourself. Westside Union configures the workflows that fit your business.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-white text-[#111] text-xs font-medium tracking-wider uppercase hover:bg-white/90 transition-colors"
              >
                Talk to Westside Union →
              </a>
            </BentoCard>
          </div>

          {/* Illustrative Customer Story Exchange */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F5] border border-black/7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-2">
              <div className="flex items-center gap-2">
                <Tag>A CLEARER START TO YOUR DAY</Tag>
                <span className="text-[10px] font-mono text-black/45 uppercase">Illustrative</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-[#111]">
                Less time searching for the next task. More time working on the right one.
              </h3>
              <p className="text-xs text-black/60 leading-relaxed">
                Illustrative interaction, not a claim of live system access. Actual responses depend on your connected tools and configured workflows.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-black/6 shadow-2xs space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-black/45 block">
                  Owner
                </span>
                <p className="text-xs sm:text-sm text-[#111] font-medium leading-relaxed">
                  &ldquo;Nexus, what needs my attention this morning?&rdquo;
                </p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/70 shadow-2xs space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-semibold block">
                  Nexus
                </span>
                <p className="text-xs sm:text-sm text-black/80 leading-relaxed">
                  &ldquo;Let&apos;s look at your outstanding customer follow-ups, today&apos;s priorities and the updates available from the tools we&apos;ve connected.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS (3 STEPS + SCENARIOS + TASK PROGRESS) ───────────── */}
      <section id="workflow" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/6 bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <PixelIcon type="workflow" size={40} />
              <div className="mt-4"><Tag>HOW IT WORKS</Tag></div>
              <RevealText className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.08]">
                {"Simple to start. Built around your workflow."}
              </RevealText>
            </div>
            <p className="text-xs sm:text-sm text-black/65 leading-relaxed max-w-md">
              Westside Union helps set up and manage Nexus around the systems and workflows your business actually uses.
            </p>
          </div>

          {/* 3 Simple Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Tell us how your business works.",
                desc: "We learn the everyday tasks, tools and challenges that matter to you.",
              },
              {
                num: "02",
                title: "We help set up Nexus.",
                desc: "Westside Union connects appropriate tools and configures the workflows included in your plan.",
              },
              {
                num: "03",
                title: "Work with Nexus.",
                desc: "Ask questions, organize tasks and get help with the work you've set it up to do.",
              },
            ].map((step) => (
              <div key={step.num} className="p-7 rounded-2xl bg-white border border-black/7 shadow-2xs space-y-3">
                <span className="font-mono text-xs tracking-widest uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 inline-block">
                  Step {step.num}
                </span>
                <h3 className="text-lg font-medium text-[#111]">{step.title}</h3>
                <p className="text-xs sm:text-sm text-black/65 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Interactive Task Progress Flow (To Do / In Progress / Completed) */}
          <NexusTaskProgress />

          {/* Scenario 2: Multi-Location / Growing Complexity Callout */}
          <div className="p-6 sm:p-8 rounded-2xl border border-black/7 bg-white grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-2xs">
            <div className="lg:col-span-8 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-black/45 block">
                SCENARIO · MULTIPLE LOCATIONS &amp; GROWING TEAMS
              </span>
              <h3 className="text-xl sm:text-2xl font-light text-[#111]">
                One business can be hard enough to follow. What about eight?
              </h3>
              <p className="text-xs sm:text-sm text-black/65 leading-relaxed">
                When information is spread across locations and paperwork, getting a clear answer can take time. Nexus can help organize the information your business captures digitally and make it easier to review what&apos;s happening — once the necessary records and systems are connected.
              </p>
              <p className="text-[11px] text-black/45 italic pt-1">
                Note: Accurate reports and summaries depend on digital source records and data quality.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#111] text-white text-xs font-medium tracking-widest uppercase hover:bg-[#333] transition-colors shadow-xs"
              >
                Discuss Your Operations →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. INDUSTRIES HUB ───────────────────────────────────────────────── */}
      <section id="industries" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <PixelIcon type="platform" size={40} />
              <div className="mt-4"><Tag>INDUSTRIES</Tag></div>
              <RevealText className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.08]">
                {"Built for the way real businesses work."}
              </RevealText>
            </div>
            <p className="text-xs sm:text-sm text-black/60 leading-relaxed max-w-sm">
              Every industry has its own challenges, but the goal is familiar: less time on repetitive work, clearer information, and better service. Explore examples relevant to your industry.
            </p>
          </div>

          {/* Industry Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" onMouseMove={handleMouse}>
            {INDUSTRIES_DATA.map((item) => (
              <BentoCard key={item.slug} className="flex flex-col overflow-hidden bg-[#FAF9F5]" delay={item.delay ?? 0}>
                {/* Photo links to dedicated industry page */}
                <Link href={`/industries/${item.slug}`} className="relative h-48 shrink-0 overflow-hidden bg-black/2 block">
                  <img
                    src={item.coverImg}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to bottom, transparent 40%, rgba(250,249,245,0.75) 82%, rgb(250,249,245) 100%)",
                    }}
                  />
                </Link>

                {/* Body */}
                <div className="p-6 pt-3 flex flex-col flex-1 justify-between">
                  <div>
                    <Link href={`/industries/${item.slug}`} className="hover:underline underline-offset-4">
                      <h3 className="text-lg font-medium text-[#111] mb-2">{item.name}</h3>
                    </Link>
                    <p className="text-xs sm:text-sm font-normal text-black/85 leading-relaxed mb-3">
                      {item.cardHeadline}
                    </p>
                    <p className="text-xs text-black/60 leading-relaxed mb-6">
                      {item.cardOutcome}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/6 flex items-center justify-between gap-2">
                    <Link
                      href={`/industries/${item.slug}`}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] tracking-widest font-sans text-white bg-[#111] hover:bg-black/80 transition-colors uppercase font-medium"
                    >
                      {item.cardCta} →
                    </Link>
                    <button
                      type="button"
                      onClick={() => setPreviewIndustry(item)}
                      className="text-xs text-black/50 hover:text-black transition-colors underline underline-offset-2 cursor-pointer"
                    >
                      Quick preview
                    </button>
                  </div>
                </div>
              </BentoCard>
            ))}
          </div>

          {/* Secondary Founder Banner */}
          <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#FAF9F5] border border-black/7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-black/4 text-black/60 font-medium">
                Founder Launchpath
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-[#111]">
                Starting something new in Canada?
              </h3>
              <p className="text-xs sm:text-sm text-black/65 leading-relaxed font-light">
                Nexus helps Canadian founders organize business setup, launch tasks and early operations—then continues supporting the company as it grows.
              </p>
            </div>
            <Link
              href="/start-business-canada"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-medium tracking-wide bg-[#111] text-white hover:bg-black/80 transition-colors shrink-0 cursor-pointer shadow-xs"
            >
              Explore Nexus for Founders →
            </Link>
          </div>
        </div>
      </section>

      {/* ── OPTIONAL QUICK PREVIEW LIGHTBOX MODAL (WITH FULL PAGE LINK) ─────── */}
      {previewIndustry && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          onClick={() => setPreviewIndustry(null)}
        >
          <div
            className="relative w-full sm:max-w-3xl max-h-[92dvh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-[#F5F4F0] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-industry-title"
          >
            {/* Cover image header */}
            <div className="relative h-48 overflow-hidden rounded-t-3xl sm:rounded-t-2xl">
              <img src={previewIndustry.coverImg} alt={previewIndustry.name} className="w-full h-full object-cover" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(245,244,240,1) 0%, rgba(245,244,240,0.3) 60%, transparent 100%)",
                }}
              />
              <div className="absolute bottom-4 left-6 right-12">
                <Tag>INDUSTRY EXAMPLES</Tag>
                <h2 id="modal-industry-title" className="mt-2 text-2xl font-light tracking-tight text-[#111]">
                  {previewIndustry.name}
                </h2>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setPreviewIndustry(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-black/8 text-black/50 hover:text-black transition-colors z-10 cursor-pointer shadow-xs"
              aria-label="Close modal"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M2 2l10 10M12 2L2 12" />
              </svg>
            </button>

            {/* Scenario cards (Challenge -> Help -> Benefit) */}
            <div className="p-6 space-y-4">
              {previewIndustry.cases.map((c, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-black/7 bg-white p-5 space-y-2.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-black/45">
                    <span>{c.timeLabel || `Case 0${i + 1}`}</span>
                    <span>Example Workflow</span>
                  </div>
                  <h3 className="text-base font-medium text-[#111]">{c.title}</h3>
                  <p className="text-xs text-black/70 leading-relaxed">
                    <strong>Challenge:</strong> {c.problem}
                  </p>
                  <p className="text-xs text-black/70 leading-relaxed">
                    <strong>How Nexus helps:</strong> {c.help}
                  </p>
                  <p className="text-xs text-emerald-800 font-medium leading-relaxed">
                    <strong>Outcome:</strong> {c.benefit}
                  </p>
                </div>
              ))}
            </div>

            {/* Modal CTAs */}
            <div className="px-6 pb-8 pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/industries/${previewIndustry.slug}`}
                onClick={() => setPreviewIndustry(null)}
                className="flex-1 py-3.5 bg-[#111] text-white text-[11px] font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-sm cursor-pointer"
              >
                Open Full {previewIndustry.shortName} Page →
              </Link>
              <a
                href="#contact"
                onClick={() => setPreviewIndustry(null)}
                className="py-3.5 px-6 border border-black/20 text-black/80 text-[11px] font-medium rounded-xl hover:border-black/40 hover:text-black transition-colors tracking-widest text-center uppercase cursor-pointer"
              >
                Book a Demo
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── 6. WORKS WITH THE TOOLS YOU ALREADY USE & PHYSICAL AI ──────────── */}
      <section id="connections" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/6 bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <PixelIcon type="integrations" size={40} />
            <div className="mt-4"><Tag>TOOLS &amp; CONNECTED DEVICES</Tag></div>
            <RevealText className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.08]">
              {"Works with the tools you already use."}
            </RevealText>
            <p className="mt-4 text-xs sm:text-sm text-black/65 max-w-xl mx-auto leading-relaxed">
              You don&apos;t have to start over. Tell us which software your business uses, and we&apos;ll help identify practical ways Nexus can work with it — plus optional connected devices when your physical space needs it.
            </p>
          </div>

          {/* Panel A (Business Systems) & Panel B (Nexus Sense) */}
          <NexusConnectionsAndSense />
        </div>
      </section>

      {/* ── 7. FIND THE RIGHT WAY TO WORK WITH NEXUS (PLANS) ────────────────── */}
      <section id="pricing" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 flex flex-col items-center">
            <PixelIcon type="pricing" size={40} />
            <div className="mt-4"><Tag>PLANS &amp; PACKAGES</Tag></div>
            <RevealText className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.08]">
              {"Find the right way to work with Nexus."}
            </RevealText>
            <p className="mt-3 text-xs sm:text-sm text-black/60 max-w-xl leading-relaxed">
              Start with Cloud, explore the greater flexibility of Edge, or create an Enterprise solution around your organization. Choose the service approach that suits your work today.
            </p>
            <p className="mt-2 text-[11px] text-black/45 font-mono">
              All prices are shown in Canadian dollars and exclude applicable taxes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" onMouseMove={handleMouse}>
            {/* 1. Cloud Card */}
            <BentoCard className="p-7 flex flex-col justify-between bg-[#FAF9F5]" delay={0}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="font-pixel text-[11px] tracking-widest text-black/40">NEXUS CLOUD</div>
                  <NexusCloudEmblem className="w-10 h-10" />
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-light">{PACKAGES.cloud.priceDisplay}</span>
                  <span className="text-black/40 text-sm">{PACKAGES.cloud.priceSubtext}</span>
                </div>
                <p className="text-[11px] text-emerald-800 font-medium mb-3">
                  No mandatory setup fee · Standard onboarding included
                </p>

                <p className="text-xs text-black/85 font-medium mb-1 leading-relaxed">
                  {PACKAGES.cloud.tagline}
                </p>
                <p className="text-xs text-black/60 mb-4 leading-relaxed">
                  A managed starting point for businesses ready to spend less time on repetitive work.
                </p>

                <ul className="space-y-2 mb-6 pt-3 border-t border-black/5">
                  {PACKAGES.cloud.compactBullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-black/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href="/pricing"
                  className="block w-full py-3 bg-[#111] text-white text-[11px] font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-sm"
                >
                  Get Started →
                </Link>
              </div>
            </BentoCard>

            {/* 2. Edge Card */}
            <BentoCard className="p-7 flex flex-col justify-between border-black/20 bg-white shadow-xs" delay={80}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-pixel text-[11px] tracking-widest text-black/50 block">NEXUS EDGE</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] tracking-widest bg-emerald-700 text-white font-mono mt-1 inline-block">
                      DEDICATED CAPACITY
                    </span>
                  </div>
                  <NexusEdgeEmblem className="w-10 h-10" />
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-light">{PACKAGES.edge.priceDisplay}</span>
                  <span className="text-black/50 text-sm">{PACKAGES.edge.priceSubtext}</span>
                </div>
                <p className="text-[11px] text-black/60 mb-3">{PACKAGES.edge.onboardingLabel}</p>

                <p className="text-xs text-black/85 font-medium mb-1 leading-relaxed">
                  {PACKAGES.edge.tagline}
                </p>
                <p className="text-xs text-black/60 mb-4 leading-relaxed">
                  Designed for businesses that need more dedicated capacity, deeper workflow setup and closer operational support.
                </p>

                <ul className="space-y-2 mb-6 pt-3 border-t border-black/5">
                  {PACKAGES.edge.compactBullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-black/75">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href="/nexus-edge"
                  className="block w-full py-3 bg-[#111] text-white text-[11px] font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-sm"
                >
                  Talk to Us →
                </Link>
              </div>
            </BentoCard>

            {/* 3. Enterprise Card */}
            <BentoCard className="p-7 flex flex-col justify-between bg-[#FAF9F5]" delay={160}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="font-pixel text-[11px] tracking-widest text-black/40">NEXUS ENTERPRISE</div>
                  <NexusEnterpriseEmblem className="w-10 h-10" />
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-light">{PACKAGES.custom.priceDisplay}</span>
                </div>
                <p className="text-[11px] text-black/50 mb-3">{PACKAGES.custom.onboardingLabel}</p>

                <p className="text-xs text-black/85 font-medium mb-1 leading-relaxed">
                  {PACKAGES.custom.tagline}
                </p>
                <p className="text-xs text-black/60 mb-4 leading-relaxed">
                  Custom workflows, integrations, operational needs and infrastructure shaped around your scope.
                </p>

                <ul className="space-y-2 mb-6 pt-3 border-t border-black/5">
                  {PACKAGES.custom.compactBullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-black/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-black/40 mt-1.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href="/pricing"
                  className="block w-full py-3 border border-black/20 text-black/80 text-[11px] font-medium rounded-xl hover:border-black/40 hover:text-black hover:bg-black/3 transition-all tracking-widest text-center uppercase"
                >
                  Contact Sales →
                </Link>
              </div>
            </BentoCard>
          </div>

          {/* Pricing Footer */}
          <div className="mt-10 p-6 rounded-2xl border border-black/6 bg-[#FAF9F5] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xs">
            <div>
              <h4 className="text-sm font-medium text-[#111]">
                What&apos;s the difference? Compare monthly &amp; annual options, inclusions, and add-ons.
              </h4>
              <p className="text-xs text-black/55 mt-0.5">
                All plans and services are subject to confirmed scope, terms and applicable taxes.
              </p>
            </div>
            <Link
              href="/pricing"
              className="shrink-0 px-5 py-2.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase shadow-sm"
            >
              Compare Plans →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. TRUST, SUPPORT & FAQ PREVIEW ─────────────────────────────────── */}
      <section id="trust-and-faq" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/6 bg-[#FAF9F5]">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Trust Principles */}
          <div>
            <div className="text-center mb-10">
              <Tag>TRUST &amp; SUPPORT</Tag>
              <h2
                className="mt-4 text-3xl sm:text-4xl font-light text-[#111] tracking-tight leading-[1.1]"
                style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
              >
                You run the business. We handle the technical work.
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-black/60 max-w-xl mx-auto leading-relaxed">
                Westside Union helps businesses set up and manage Nexus around the systems and workflows they actually use.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Guided setup in plain language",
                  desc: "No technical background is needed. We explain options clearly and configure Nexus around your priorities.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-700">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  ),
                },
                {
                  title: "Important actions wait for your review",
                  desc: "Sensitive customer replies, quotes, and public posts can pause for your approval before anything is sent.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sky-700">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 14 14" />
                    </svg>
                  ),
                },
                {
                  title: "Clear data handling & permissions",
                  desc: "We explain how information is accessed, stored and exported during onboarding and in your service terms.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-700">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white border border-black/6 shadow-2xs space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF9F5] border border-black/6 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-medium text-[#111] leading-snug">{item.title}</h3>
                  <p className="text-xs text-black/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Business-Owner FAQ Preview */}
          <div id="faq">
            <div className="text-center mb-8">
              <Tag>QUESTIONS &amp; ANSWERS</Tag>
              <h3 className="mt-3 text-2xl sm:text-3xl font-light text-[#111] tracking-tight">
                Frequently asked questions.
              </h3>
            </div>

            <div className="space-y-0 divide-y divide-black/6 bg-white rounded-2xl border border-black/7 px-6 sm:px-8 py-2 shadow-xs mb-6">
              {HOMEPAGE_FAQS.map((faq) => (
                <FaqAccordionItem key={faq.id} question={faq.question} answer={faq.answer} />
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-xs text-black/70 hover:text-black underline underline-offset-2 transition-colors font-medium"
              >
                View all FAQs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONSULTATION FORM (Final CTA) ───────────────────────────────────── */}
      <ConsultationForm
        title="Ready to spend less time managing the busywork?"
        subtitle="Tell us how your business operates. We'll help identify where Nexus could make the most difference."
      />

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <SiteFooter />

      {/* ── BACK TO TOP ──────────────────────────────────────────────────────── */}
      <BackToTop />
    </div>
  )
}

"use client"

import React, { useState } from "react"
import Link from "next/link"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { MobileNav } from "@/components/mobile-nav"
import { SiteFooter } from "@/components/site-footer"
import { ConsultationForm } from "@/components/consultation-form"
import { BentoCard, Tag, StatusPill, FaqAccordionItem, BackToTop } from "@/components/shared-ui"
import { PACKAGES, ALL_FAQS } from "@/lib/site-data"

export default function HomePage() {
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null)

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
  }

  const homepageFaqs = ALL_FAQS.filter((f) => f.isHomepageTop5)

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      {/* ── STICKY NAV ──────────────────────────────────────────────────────── */}
      <MobileNav />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-end overflow-hidden pt-32 pb-12 px-6 md:px-12 lg:px-20"
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
            height: "70%",
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

        {/* Status badge — center */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.08] shadow-sm whitespace-nowrap">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] tracking-widest text-black/60 uppercase font-sans font-medium">
            Now accepting pilot businesses
          </span>
        </div>

        {/* Hero content card */}
        <div className="relative z-30 max-w-3xl my-auto pt-8">
          <div className="p-6 sm:p-10 rounded-2xl bg-[#F5F4F0]/85 backdrop-blur-md border border-black/[0.07] shadow-xl">
            <span className="text-[11px] tracking-[0.2em] text-black/60 uppercase mb-4 block font-sans font-medium">
              A MANAGED BUSINESS ASSISTANT FROM WESTSIDE UNION
            </span>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-light text-[#111] leading-[1.08] tracking-tight mb-6"
              style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
            >
              More gets done, even when you are busy running the business.
            </h1>

            <p className="text-sm sm:text-base text-black/75 leading-relaxed max-w-2xl mb-8">
              Nexus helps organize the work you keep putting off—from customer follow-ups and review replies to reminders, business updates, and everyday tasks. Talk to it through the messaging tools you already use.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <div>
                <a
                  href="#contact"
                  className="inline-block px-6 py-3.5 bg-[#111] text-white text-[11px] font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase text-center shadow-sm"
                >
                  Book a Free Consultation
                </a>
                <span className="block text-[11px] text-black/50 mt-1.5 tracking-wide">
                  Book a free business workflow review.
                </span>
              </div>
              <a
                href="#how-it-helps"
                className="px-6 py-3.5 border border-black/20 text-black/80 text-[11px] font-medium rounded-xl hover:border-black/40 hover:text-black hover:bg-black/[0.04] transition-all duration-200 tracking-widest uppercase self-start sm:self-auto"
              >
                See How Nexus Helps
              </a>
            </div>

            {/* Trust line */}
            <div className="pt-6 border-t border-black/[0.08] space-y-4">
              <p className="text-xs font-medium text-black/70 tracking-wide">
                Built around your business. Managed by Westside Union. You stay in control.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Works where you already communicate" },
                  { label: "Important actions wait for your approval" },
                  { label: "See what was completed" },
                  { label: "Predictable monthly costs" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                    <div className="text-xs text-black/70 font-normal leading-snug">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. THE PROBLEM & HOW NEXUS HELPS (Combined Problem + Guide) ──────── */}
      <section id="how-it-helps" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Tag>THE REALITY</Tag>
            <h2
              className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light text-[#111] tracking-tight leading-[1.1]"
              style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
            >
              Running the business should not mean doing everything yourself.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-black/65 max-w-2xl mx-auto leading-relaxed">
              Nexus helps keep that work visible, organized, and moving while you stay focused on the business.
            </p>
          </div>

          {/* Pain stories grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {[
              {
                role: "Café Owner",
                text: "Reviews waiting during a café’s morning rush while staff focus on the line.",
                img: "/images/scenario-coffee.png",
              },
              {
                role: "Restaurant Owner",
                text: "Promotion ideas thought of after closing that get forgotten by morning.",
                img: "/images/scenario-restaurants.png",
              },
              {
                role: "Barber & Stylist",
                text: "Appointment and inquiry messages spread across different apps and DMs.",
                img: "/images/scenario-barbershop.png",
              },
              {
                role: "Business Owner",
                text: "Customer follow-ups still waiting at the end of a long operating day.",
                img: "/images/scenario-agency.png",
              },
              {
                role: "Independent Operator",
                text: "Administrative work and quote coordination following the owner home at night.",
                img: "/images/industry-trades.png",
              },
              {
                role: "Founder",
                text: "Spending more hours organizing registrations and tools than serving early customers.",
                img: "/images/industry-founders.png",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group rounded-2xl bg-white border border-black/[0.06] p-5 shadow-xs hover:border-black/[0.12] transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="text-[10px] tracking-widest uppercase font-mono text-black/50 font-medium">
                    {item.role}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-black/75 leading-relaxed mb-4">{item.text}</p>
                <div className="pt-3 border-t border-black/[0.04] text-[11px] text-emerald-700 font-medium flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Nexus keeps it moving</span>
                </div>
              </div>
            ))}
          </div>

          {/* How Nexus helps: 6 Core Roles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" onMouseMove={handleMouse}>
            {[
              {
                title: "Organize assigned work",
                desc: "Message Nexus ideas, tasks, or follow-ups. It tracks deadlines and flags pending items.",
                icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />,
                delay: 0,
              },
              {
                title: "Daily & weekly summaries",
                desc: "Start each day knowing what was handled, what is waiting, and what needs approval.",
                icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10h8M8 14h5" /></>,
                delay: 80,
              },
              {
                title: "Draft replies & review responses",
                desc: "Nexus prepares professional on-brand drafts for your review before anything goes out.",
                icon: <><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></>,
                delay: 160,
              },
            ].map((role, i) => (
              <BentoCard key={i} className="p-6 flex flex-col justify-between" delay={role.delay}>
                <div>
                  <div className="w-10 h-10 rounded-xl border border-black/10 flex items-center justify-center mb-4 text-black/70">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      {role.icon}
                    </svg>
                  </div>
                  <h3 className="text-base font-medium mb-1.5 text-[#111]">{role.title}</h3>
                  <p className="text-xs text-black/55 leading-relaxed">{role.desc}</p>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. TASK EXPERIENCE (To Do / In Progress / Finished) ──────────────── */}
      <section id="experience" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <PixelIcon type="workflow" size={40} />
            <div className="mt-4"><Tag>TASK EXPERIENCE</Tag></div>
            <RevealText className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.08]">
              {"Tell Nexus what needs to be done.\nSee the work move forward."}
            </RevealText>
            <p className="mt-4 text-xs sm:text-sm text-black/60 leading-relaxed max-w-xl">
              Daily interaction is messaging-first through WhatsApp, SMS, or Telegram. Every task moves through three transparent stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" onMouseMove={handleMouse}>
            {/* Stage 1: To Do */}
            <BentoCard className="p-7 flex flex-col justify-between" delay={0}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-pixel text-xs text-black/40 tracking-widest uppercase">STAGE 01</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest bg-amber-50 text-amber-700 border border-amber-200/60 font-sans">
                    TO DO
                  </span>
                </div>
                <h3 className="text-lg font-medium text-[#111] mb-2">Ideas & Reminders</h3>
                <p className="text-xs text-black/55 leading-relaxed mb-5">
                  Ideas, reminders, and work assigned by the owner.
                </p>
                <div className="space-y-2 p-3.5 rounded-xl bg-black/[0.02] border border-black/[0.04]">
                  <div className="text-xs text-black/75 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    3 Google reviews awaiting draft
                  </div>
                  <div className="text-xs text-black/75 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    Wednesday slow-period promo idea
                  </div>
                  <div className="text-xs text-black/75 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    Pending quote callback: Smith project
                  </div>
                </div>
              </div>
              <p className="mt-5 text-[11px] text-black/40">Captured from text, voice notes, or scheduled checks</p>
            </BentoCard>

            {/* Stage 2: In Progress */}
            <BentoCard className="p-7 flex flex-col justify-between" delay={80}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-pixel text-xs text-black/40 tracking-widest uppercase">STAGE 02</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest bg-blue-50 text-blue-700 border border-blue-200/60 font-sans">
                    IN PROGRESS
                  </span>
                </div>
                <h3 className="text-lg font-medium text-[#111] mb-2">Active Coordination</h3>
                <p className="text-xs text-black/55 leading-relaxed mb-5">
                  Work Nexus is currently organizing, drafting, checking, or holding for approval.
                </p>
                <div className="space-y-2 p-3.5 rounded-xl bg-black/[0.02] border border-black/[0.04]">
                  <div className="text-xs text-black/75 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0" />
                    Drafting catering menu proposal
                  </div>
                  <div className="text-xs text-black/75 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0" />
                    Holding for review: 5-star review reply
                  </div>
                  <div className="text-xs text-black/75 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0" />
                    Handling after-hours customer inquiry
                  </div>
                </div>
              </div>
              <p className="mt-5 text-[11px] text-black/40">Sensitive actions pause until you give approval</p>
            </BentoCard>

            {/* Stage 3: Finished */}
            <BentoCard className="p-7 flex flex-col justify-between" delay={160}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-pixel text-xs text-black/40 tracking-widest uppercase">STAGE 03</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-sans">
                    FINISHED
                  </span>
                </div>
                <h3 className="text-lg font-medium text-[#111] mb-2">Completed & Logged</h3>
                <p className="text-xs text-black/55 leading-relaxed mb-5">
                  Completed work with a plain-language explanation and activity record.
                </p>
                <div className="space-y-2 p-3.5 rounded-xl bg-black/[0.02] border border-black/[0.04]">
                  <div className="text-xs text-black/75 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    Morning owner summary delivered
                  </div>
                  <div className="text-xs text-black/75 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    Appointment reminders confirmed (4/4)
                  </div>
                  <div className="text-xs text-black/75 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    Approved review response published
                  </div>
                </div>
              </div>
              <p className="mt-5 text-[11px] text-black/40">Delivered to your messaging channel and summary feed</p>
            </BentoCard>
          </div>

          <div className="mt-8 flex items-center justify-between flex-wrap gap-4 p-4 rounded-2xl border border-black/[0.06] bg-[#FAF9F5] text-xs text-black/60">
            <span className="flex items-center gap-2">
              <StatusPill status="preview" />
              <span>Interactive web dashboard labelled <strong>Preview / In Development</strong>. Daily operation is messaging-first.</span>
            </span>
            <a href="#contact" className="font-medium text-black/80 hover:text-black transition-colors underline underline-offset-2">
              Book a consultation →
            </a>
          </div>
        </div>
      </section>

      {/* ── 4. THREE-STEP ONBOARDING PLAN ────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <PixelIcon type="workflow" size={40} />
            <div className="mt-4"><Tag>THE PLAN</Tag></div>
            <RevealText className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.08]">
              {"A simple 3-step onboarding plan."}
            </RevealText>
            <p className="mt-4 text-xs sm:text-sm text-black/60 leading-relaxed max-w-lg">
              No complex software to learn. Westside Union configures Nexus around your business priorities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" onMouseMove={handleMouse}>
            {[
              {
                n: "01",
                title: "Tell us about your business.",
                desc: "We identify one useful, measurable starting workflow that takes repetitive friction off your plate right away.",
                delay: 0,
              },
              {
                n: "02",
                title: "Westside Union prepares Nexus around your priorities.",
                desc: "We configure your approved business knowledge, channels, preferences, and approval rules.",
                delay: 80,
              },
              {
                n: "03",
                title: "Talk to Nexus and keep the work moving.",
                desc: "Message Nexus through your preferred channel. Nexus keeps work moving, drafts replies, and reports completed tasks.",
                delay: 160,
              },
            ].map((step) => (
              <BentoCard key={step.n} className="p-7 flex flex-col justify-between" delay={step.delay}>
                <div>
                  <span className="font-pixel text-xs text-black/40 tracking-widest block mb-4">STEP {step.n}</span>
                  <h3 className="text-base sm:text-lg font-medium mb-2 text-[#111] leading-snug">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-black/55 leading-relaxed">{step.desc}</p>
                </div>
              </BentoCard>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/faq#getting-started"
              className="text-xs text-black/50 hover:text-black underline underline-offset-2 transition-colors"
            >
              Have questions about setup? View onboarding details in FAQ →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. INDUSTRY STARTING POINTS ─────────────────────────────────────── */}
      <section id="industries" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <PixelIcon type="agents" size={40} />
              <div className="mt-4"><Tag>INDUSTRIES</Tag></div>
              <RevealText className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.08]">
                {"Built for the business you run."}
              </RevealText>
            </div>
            <p className="text-xs sm:text-sm text-black/55 leading-relaxed max-w-xs">
              Industry solutions are configured versions of our primary packages, tailored around your specific operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" onMouseMove={handleMouse}>
            {[
              {
                industry: "Restaurants",
                sentence: "Keep customer follow-ups and review replies moving while you run the floor.",
                outcomes: ["Organize inquiries and table callbacks", "Draft review responses for owner approval"],
                img: "/images/industry-restaurants.png",
                delay: 0,
              },
              {
                industry: "Cafés and coffee shops",
                sentence: "Stay visible to customers even during the busiest morning rush.",
                outcomes: ["Prepare Google review drafts", "Highlight quiet hours and draft promo ideas"],
                img: "/images/industry-coffee.png",
                delay: 80,
              },
              {
                industry: "Barbershops and salons",
                sentence: "Spend less time chasing appointment messages and more time serving clients.",
                outcomes: ["Coordinate appointment follow-ups", "Summarize pending owner tasks across chairs"],
                img: "/images/industry-barbershop.png",
                delay: 160,
              },
              {
                industry: "Automotive dealerships",
                sentence: "Ensure every sales or service inquiry receives a timely next step.",
                outcomes: ["Organize lead follow-ups across teams", "Prepare daily manager summaries"],
                img: "/images/industry-automotive.png",
                delay: 0,
              },
              {
                industry: "Marketing agencies",
                sentence: "Keep client deliverables moving without carrying every administrative detail yourself.",
                outcomes: ["Organize client briefs and recap action items", "Track recurring weekly reporting tasks"],
                img: "/images/industry-agency.png",
                delay: 80,
              },
              {
                industry: "Start Your Business — Canada",
                sentence: "Get a clearer launch roadmap, professional handoffs, and an ongoing assistant.",
                outcomes: ["Guidance referencing official Canadian sources", "Seamless transition into Nexus Cloud"],
                img: "/images/industry-founders.png",
                delay: 160,
                isFounderCard: true,
              },
            ].map((item) => (
              <BentoCard key={item.industry} className="flex flex-col overflow-hidden" delay={item.delay}>
                {/* Photo */}
                <div className="relative h-40 shrink-0 overflow-hidden bg-black/[0.02]">
                  <img
                    src={item.img}
                    alt={item.industry}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.7) 80%, rgb(255,255,255) 100%)",
                    }}
                  />
                  {"isFounderCard" in item && item.isFounderCard && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] tracking-widest bg-[#111] text-white font-mono">
                        CANADA
                      </span>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-6 pt-2 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-[#111] mb-1">{item.industry}</h3>
                    <p className="text-xs text-black/65 leading-relaxed mb-4">{item.sentence}</p>
                    <ul className="space-y-1.5 mb-5">
                      {item.outcomes.map((out) => (
                        <li key={out} className="flex items-start gap-2 text-xs text-black/60">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-black/[0.05]">
                    {"isFounderCard" in item && item.isFounderCard ? (
                      <Link
                        href="/start-business-canada"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/70 bg-black/[0.04] hover:bg-black/[0.08] hover:text-black transition-colors"
                      >
                        EXPLORE FOUNDER PROGRAM →
                      </Link>
                    ) : (
                      <button
                        onClick={() => setActiveIndustry(item.industry)}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/60 bg-black/[0.04] hover:bg-black/[0.08] hover:text-black transition-colors cursor-pointer"
                      >
                        SEE USE CASES →
                      </button>
                    )}
                  </div>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES LIGHTBOX MODAL ────────────────────────────────────────── */}
      {activeIndustry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
          onClick={() => setActiveIndustry(null)}
        >
          <div
            className="relative w-full sm:max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#F5F4F0] p-6 sm:p-8 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.08]">
              <div>
                <Tag>USE CASES</Tag>
                <h3 className="text-xl font-light mt-1 text-[#111]">{activeIndustry}</h3>
              </div>
              <button
                onClick={() => setActiveIndustry(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-black/[0.08] text-black/50 hover:text-black transition-colors cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-white border border-black/[0.06] space-y-2">
                <span className="text-[10px] tracking-widest uppercase font-mono text-black/40">Scenario 01</span>
                <p className="text-xs sm:text-sm text-black/75">
                  Customer inquires after hours about availability, pricing, and services.
                </p>
                <div className="flex items-start gap-2 pt-1 text-xs text-emerald-700">
                  <span>✓</span>
                  <span>Nexus replies using approved business knowledge and queues the next step.</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-black/[0.06] space-y-2">
                <span className="text-[10px] tracking-widest uppercase font-mono text-black/40">Scenario 02</span>
                <p className="text-xs sm:text-sm text-black/75">
                  New customer review posted online while the owner is busy serving guests.
                </p>
                <div className="flex items-start gap-2 pt-1 text-xs text-emerald-700">
                  <span>✓</span>
                  <span>Nexus drafts a polite, on-brand response and holds it for one-tap owner approval.</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                onClick={() => setActiveIndustry(null)}
                className="block w-full py-3 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase"
              >
                Book a Free Consultation
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── 6. CHANNELS & CONNECTIONS SUMMARY ───────────────────────────────── */}
      <section id="channels" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <PixelIcon type="integrations" size={40} />
            <div className="mt-4"><Tag>CONNECTIONS</Tag></div>
            <RevealText className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.08]">
              {"Works with the tools your business already uses."}
            </RevealText>
            <p className="mt-4 text-xs sm:text-sm text-black/65 max-w-xl mx-auto leading-relaxed">
              Talk to Nexus through supported messaging channels and connect the business tools that help you serve customers. Westside Union handles setup and compatibility with you.
            </p>
          </div>

          {/* 6 Concise Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {[
              { name: "WhatsApp", icon: "💬" },
              { name: "Telegram", icon: "✈️" },
              { name: "Email", icon: "✉️" },
              { name: "SMS", icon: "📱" },
              { name: "Booking platforms", icon: "📅" },
              { name: "POS systems", icon: "💳" },
            ].map((cat) => (
              <div
                key={cat.name}
                className="p-4 rounded-xl bg-white border border-black/[0.06] text-center flex flex-col items-center justify-center gap-1.5 shadow-xs"
              >
                <span className="text-xl">{cat.icon}</span>
                <span className="text-xs font-medium text-[#111]">{cat.name}</span>
                <span className="text-[10px] text-emerald-700">Supported</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/connections"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase shadow-sm"
            >
              Explore Connections →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. COMPACT HOMEPAGE PRICING (3 Concise Cards) ──────────────────── */}
      <section id="pricing" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 flex flex-col items-center">
            <PixelIcon type="pricing" size={40} />
            <div className="mt-4"><Tag>PACKAGES</Tag></div>
            <RevealText className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.08]">
              {"Simple, transparent packages."}
            </RevealText>
            <p className="mt-3 text-xs sm:text-sm text-black/55 max-w-lg leading-relaxed">
              Choose the level of assistance and on-site control that fits how you operate today.
            </p>
            <p className="mt-2 text-[11px] text-black/45 font-mono">
              All prices are shown in Canadian dollars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" onMouseMove={handleMouse}>
            {/* 1. Cloud Card */}
            <BentoCard className="p-7 flex flex-col justify-between" delay={0}>
              <div>
                <div className="font-pixel text-[11px] tracking-widest text-black/40 mb-2">NEXUS CLOUD</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-light">CAD $99</span>
                  <span className="text-black/40 text-sm">/month</span>
                </div>
                <p className="text-[11px] text-black/50 mb-1">CAD $299 onboarding</p>
                <p className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mb-4 border border-emerald-200/50">
                  CAD $79/month when billed annually
                </p>

                <ul className="space-y-2 mb-6 pt-2 border-t border-black/[0.05]">
                  {PACKAGES.cloud.compactBullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-black/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[10px] text-black/45 mb-3 leading-tight">
                  First 30 days of managed service included. Onboarding applies.
                </p>
                <Link
                  href="/pricing#pilot"
                  className="block w-full py-3 bg-[#111] text-white text-[11px] font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-sm"
                >
                  Start a 30-Day Pilot
                </Link>
              </div>
            </BentoCard>

            {/* 2. Edge Card */}
            <BentoCard className="p-7 flex flex-col justify-between border-black/20 bg-[#FAF9F5]" delay={80}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-pixel text-[11px] tracking-widest text-black/50">NEXUS EDGE</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] tracking-widest bg-emerald-700 text-white font-mono">
                    ON-SITE PRIVACY
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-light">CAD $299</span>
                  <span className="text-black/50 text-sm">/month</span>
                </div>
                <p className="text-[11px] text-black/60 mb-4">CAD $699 activation · 24-month term</p>

                <ul className="space-y-2 mb-6 pt-2 border-t border-black/[0.05]">
                  {PACKAGES.edge.compactBullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-black/75">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[10px] text-black/45 mb-3 leading-tight">
                  Appliance remains Westside Union property. Minimum 24-month agreement applies.
                </p>
                <Link
                  href="/nexus-edge"
                  className="block w-full py-3 bg-[#111] text-white text-[11px] font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-sm"
                >
                  Explore Nexus Edge
                </Link>
              </div>
            </BentoCard>

            {/* 3. Custom Card */}
            <BentoCard className="p-7 flex flex-col justify-between" delay={160}>
              <div>
                <div className="font-pixel text-[11px] tracking-widest text-black/40 mb-2">NEXUS CUSTOM</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-light">From CAD $799</span>
                  <span className="text-black/40 text-sm">/month</span>
                </div>
                <p className="text-[11px] text-black/50 mb-4">Deployment from CAD $2,500</p>

                <ul className="space-y-2 mb-6 pt-2 border-t border-black/[0.05]">
                  {PACKAGES.custom.compactBullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-black/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-black/40 mt-1 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[10px] text-black/45 mb-3 leading-tight">
                  Final scope and price confirmed after workflow review.
                </p>
                <a
                  href="#contact"
                  className="block w-full py-3 border border-black/20 text-black/80 text-[11px] font-medium rounded-xl hover:border-black/40 hover:text-black hover:bg-black/[0.03] transition-all tracking-widest text-center uppercase"
                >
                  Plan a Custom Solution
                </a>
              </div>
            </BentoCard>
          </div>

          {/* Pricing Footer */}
          <div className="mt-10 p-6 rounded-2xl border border-black/[0.06] bg-[#FAF9F5] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-sm font-medium text-[#111]">Compare packages, managed AI usage, add-ons, and service terms.</h4>
              <p className="text-xs text-black/50">Review full comparison table, AI usage rules, and upgrade credits.</p>
            </div>
            <Link
              href="/pricing"
              className="shrink-0 px-5 py-2.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase"
            >
              Compare All Packages →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. COMPACT ROI / REPETITIVE WORK VALUE ──────────────────────────── */}
      <section id="roi-preview" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-4xl mx-auto rounded-3xl border border-black/[0.08] bg-white p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <Tag>CAPACITY VALUE</Tag>
          <h2
            className="text-3xl sm:text-4xl font-light text-[#111] tracking-tight leading-[1.1]"
            style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
          >
            What is repetitive work costing your business?
          </h2>
          <p className="text-xs sm:text-sm text-black/65 max-w-xl mx-auto leading-relaxed">
            Estimate the value of time spent on routine follow-ups, coordination, summaries, reviews, and reminders using Government of Canada Job Bank wage benchmarks.
          </p>
          <div>
            <Link
              href="/pricing#calculator"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase shadow-sm"
            >
              Estimate Your Potential Value →
            </Link>
          </div>
          <p className="text-[10px] text-black/40 leading-normal">
            Illustrative estimate only. Nexus does not guarantee specific cost savings.
          </p>
        </div>
      </section>

      {/* ── 9. COMPACT FOUNDER BANNER ───────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-white">
        <div className="max-w-5xl mx-auto rounded-2xl border border-black/[0.07] bg-[#FAF9F5] p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2">
            <span className="text-[10px] tracking-widest uppercase font-mono text-black/50 font-medium">
              NEW CANADIAN FOUNDERS
            </span>
            <h3 className="text-xl sm:text-2xl font-light text-[#111]">
              Starting a business in Canada?
            </h3>
            <p className="text-xs sm:text-sm text-black/65 leading-relaxed max-w-xl">
              Get a clearer launch roadmap, professional handoffs, and an assistant that can continue supporting the business after opening day.
            </p>
          </div>
          <Link
            href="/start-business-canada"
            className="shrink-0 px-5 py-3 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase whitespace-nowrap"
          >
            Explore Founder Program →
          </Link>
        </div>
      </section>

      {/* ── 10. HOMEPAGE FAQ (Top 5 Questions) ───────────────────────────────── */}
      <section id="faq" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Tag>FAQ</Tag>
            <RevealText className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.08]">
              {"Frequently asked questions."}
            </RevealText>
          </div>

          <div className="space-y-0 divide-y divide-black/[0.06] bg-white rounded-2xl border border-black/[0.07] px-6 sm:px-8 py-2 shadow-xs mb-8">
            {homepageFaqs.map((faq) => (
              <FaqAccordionItem key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-xs text-black/70 hover:text-black underline underline-offset-2 transition-colors font-medium"
            >
              View all frequently asked questions →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 11. TRUST AND CONSULTATION FORM ─────────────────────────────────── */}
      <ConsultationForm />

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <SiteFooter />

      {/* ── BACK TO TOP ──────────────────────────────────────────────────────── */}
      <BackToTop />
    </div>
  )
}

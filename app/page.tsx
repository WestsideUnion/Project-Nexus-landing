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

// Visual Components
import { NexusMessageToOutcome } from "@/components/nexus-visuals/nexus-message-to-outcome"
import { NexusOwnerDayStory } from "@/components/nexus-visuals/nexus-owner-day-story"
import { NexusTaskProgress } from "@/components/nexus-visuals/nexus-task-progress"
import { NexusTransformationSection } from "@/components/nexus-visuals/nexus-transformation-section"
import { NexusConnectionsMap } from "@/components/nexus-visuals/nexus-connections-map"
import { NexusOutcomeSummary } from "@/components/nexus-visuals/nexus-outcome-summary"
import { NexusCloudEmblem, NexusEdgeEmblem, NexusCustomEmblem } from "@/components/nexus-visuals/nexus-package-emblems"

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
        className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-end overflow-hidden pt-36 pb-16 px-6 md:px-12 lg:px-20"
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

        {/* Status badge — center */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.08] shadow-sm whitespace-nowrap">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] tracking-widest text-black/60 uppercase font-sans font-medium">
            Now accepting pilot businesses
          </span>
        </div>

        {/* Hero Grid: Content + Visual Flow */}
        <div className="relative z-30 max-w-6xl mx-auto w-full my-auto pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero text card (7 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 rounded-2xl bg-[#F5F4F0]/90 backdrop-blur-md border border-black/[0.07] shadow-xl">
            <span className="text-[11px] tracking-[0.2em] text-black/60 uppercase mb-4 block font-sans font-medium">
              FOR BUSINESS OWNERS WHO CANNOT BE EVERYWHERE AT ONCE
            </span>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-light text-[#111] leading-[1.1] tracking-tight mb-5"
              style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
            >
              Your customers keep reaching out—even when you are busy running the business.
            </h1>

            <p className="text-xs sm:text-sm text-black/75 leading-relaxed max-w-xl mb-6">
              Reviews wait. Messages pile up. Follow-ups get buried. New opportunities quietly disappear. Nexus helps keep everyday work moving through WhatsApp, text, and email, so your customers feel heard and fewer opportunities slip away.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
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
            <div className="pt-5 border-t border-black/[0.08] space-y-3">
              <p className="text-xs font-medium text-black/70 tracking-wide">
                Built around your business. Managed by Westside Union. You stay in control.
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: "Works where you already communicate" },
                  { label: "Important actions wait for approval" },
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

          {/* Hero Visual Flow (5 cols on desktop) */}
          <div className="lg:col-span-6 w-full">
            <NexusMessageToOutcome />
          </div>
        </div>
      </section>

      {/* ── 2. THE PROBLEM & HOW NEXUS HELPS ─────────────────────────────────── */}
      <section id="how-it-helps" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Tag>THE REALITY</Tag>
            <h2
              className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light text-[#111] tracking-tight leading-[1.1]"
              style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
            >
              Your business can be busy and still lose the next customer.
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-black/65 max-w-2xl mx-auto leading-relaxed">
              A customer sends a message, but nobody sees it. A review waits a week for a response. A catering, booking, or sales enquiry gets buried. None of this happens because you do not care. It happens because you are already doing too much.
            </p>
          </div>

          {/* 3 Visual Business Stories */}
          <div className="mb-14">
            <NexusOwnerDayStory />
          </div>

          {/* How Nexus helps: 3 Core Roles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" onMouseMove={handleMouse}>
            {[
              {
                title: "Organize assigned work",
                desc: "Message Nexus ideas, tasks, or follow-ups. It tracks deadlines and flags pending items in one place.",
                icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />,
                delay: 0,
              },
              {
                title: "Daily & weekly summaries",
                desc: "Start each day knowing what was handled overnight, what is waiting, and what needs approval.",
                icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10h8M8 14h5" /></>,
                delay: 80,
              },
              {
                title: "Draft replies & review responses",
                desc: "Nexus prepares professional on-brand drafts and holds them ready for your one-tap review.",
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
          <div className="mb-12 text-center md:text-left">
            <PixelIcon type="workflow" size={40} />
            <div className="mt-4"><Tag>TASK EXPERIENCE</Tag></div>
            <RevealText className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.08]">
              {"Tell Nexus what needs to be done.\nSee the work move forward."}
            </RevealText>
            <p className="mt-4 text-xs sm:text-sm text-black/60 leading-relaxed max-w-xl">
              Daily interaction is messaging-first through WhatsApp, SMS, or Telegram. Every task moves through three transparent stages.
            </p>
          </div>

          {/* Interactive Task Progress Flow */}
          <NexusTaskProgress />

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
              No complicated software to learn. Westside Union configures Nexus around your business priorities.
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
                sentence: "A full dining room should not mean online enquiries go unanswered.",
                outcomes: ["Organize inquiries and table callbacks", "Draft review responses for owner approval"],
                img: "/images/industry-restaurants.png",
                delay: 0,
              },
              {
                industry: "Cafés and coffee shops",
                sentence: "The morning rush should not cost you the catering enquiry in your inbox.",
                outcomes: ["Prepare Google review drafts", "Highlight quiet hours and draft promo ideas"],
                img: "/images/industry-coffee.png",
                delay: 80,
              },
              {
                industry: "Barbershops and salons",
                sentence: "An unanswered booking question can become an empty chair.",
                outcomes: ["Coordinate appointment follow-ups", "Summarize pending owner tasks across chairs"],
                img: "/images/industry-barbershop.png",
                delay: 160,
              },
              {
                industry: "Automotive dealerships",
                sentence: "Every delayed response gives a buyer time to call another dealership.",
                outcomes: ["Organize lead follow-ups across teams", "Prepare daily manager summaries"],
                img: "/images/industry-automotive.png",
                delay: 0,
              },
              {
                industry: "Marketing agencies",
                sentence: "Client reporting should not consume your team's best productive hours.",
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

      {/* ── 6. TRANSFORMATION SECTION (3 Outcomes Tabbed) ──────────────────── */}
      <NexusTransformationSection />

      {/* ── 7. CHANNELS & CONNECTIONS SUMMARY ───────────────────────────────── */}
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

          {/* Visual Connections Map */}
          <div className="mb-10">
            <NexusConnectionsMap isCompact={true} />
          </div>

          <div className="text-center">
            <Link
              href="/connections"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase shadow-sm"
            >
              Explore All Connections &amp; Integrations →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. COMPACT HOMEPAGE PRICING (3 Concise Cards with Emblems) ──────── */}
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
                <div className="flex items-center justify-between mb-3">
                  <div className="font-pixel text-[11px] tracking-widest text-black/40">NEXUS CLOUD</div>
                  <NexusCloudEmblem className="w-10 h-10" />
                </div>
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
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-pixel text-[11px] tracking-widest text-black/50 block">NEXUS EDGE</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] tracking-widest bg-emerald-700 text-white font-mono mt-1 inline-block">
                      ON-SITE PRIVACY
                    </span>
                  </div>
                  <NexusEdgeEmblem className="w-10 h-10" />
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
                <div className="flex items-center justify-between mb-3">
                  <div className="font-pixel text-[11px] tracking-widest text-black/40">NEXUS CUSTOM</div>
                  <NexusCustomEmblem className="w-10 h-10" />
                </div>
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

      {/* ── 9. COMPACT ROI / REPETITIVE WORK VALUE ──────────────────────────── */}
      <section id="roi-preview" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
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
          </div>

          {/* Business Outcome Summary Graphic */}
          <NexusOutcomeSummary />

          <div className="text-center pt-2">
            <Link
              href="/pricing#calculator"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase shadow-sm"
            >
              Estimate Your Potential Value in ROI Calculator →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 10. COMPACT FOUNDER BANNER ───────────────────────────────────────── */}
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

      {/* ── 11. HOMEPAGE FAQ (Top 5 Questions) ───────────────────────────────── */}
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

      {/* ── 12. TRUST AND CONSULTATION FORM ─────────────────────────────────── */}
      <ConsultationForm />

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <SiteFooter />

      {/* ── BACK TO TOP ──────────────────────────────────────────────────────── */}
      <BackToTop />
    </div>
  )
}

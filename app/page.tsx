"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { MobileNav } from "@/components/mobile-nav"
import { SiteFooter } from "@/components/site-footer"
import { ConsultationForm } from "@/components/consultation-form"
import { BentoCard, Tag, FaqAccordionItem, BackToTop } from "@/components/shared-ui"
import { PACKAGES, HOMEPAGE_FAQS } from "@/lib/site-data"

// Visual Components
import { NexusMessageToOutcome } from "@/components/nexus-visuals/nexus-message-to-outcome"
import { NexusTaskProgress } from "@/components/nexus-visuals/nexus-task-progress"
import { NexusConnectionsAndSense } from "@/components/nexus-visuals/nexus-sense-panel"
import { NexusCloudEmblem, NexusEdgeEmblem, NexusEnterpriseEmblem } from "@/components/nexus-visuals/nexus-package-emblems"

export default function HomePage() {
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null)

  useEffect(() => {
    if (!activeIndustry) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndustry(null)
    }
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeIndustry])

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
  }

  // 6 Primary Industries for Homepage (3 cols x 2 rows on desktop)
  const industryTiles = [
    {
      industry: "Restaurants and cafés",
      headline: "A full dining room should not mean online enquiries and promotions are forgotten.",
      outcome: "Nexus helps handle customer inquiries, review replies, follow-ups and approved social promotions while you focus on serving customers.",
      img: "/images/industry-restaurants.png",
      delay: 0,
    },
    {
      industry: "Barbershops and salons",
      headline: "An unanswered booking question can become an empty chair.",
      outcome: "Nexus helps answer booking questions, share approved information and prepare social content that keeps your services visible.",
      img: "/images/industry-barbershop.png",
      delay: 60,
    },
    {
      industry: "Dealerships",
      headline: "Every delayed response gives a buyer time to call another dealership.",
      outcome: "Nexus responds to after-hours inventory and test-drive inquiries and queues callbacks for your team.",
      img: "/images/industry-automotive.png",
      delay: 120,
    },
    {
      industry: "Agencies, firms and professional services",
      headline: "Client work should not be interrupted by the administration surrounding it.",
      outcome: "Nexus organizes inquiries, action items, meeting recaps, follow-ups, recurring reports and approved business content.",
      img: "/images/industry-agency.png",
      delay: 180,
    },
    {
      industry: "Clinics and wellness practices",
      headline: "Patient and client questions do not stop when the front desk gets busy.",
      outcome: "Nexus helps with approved FAQs, appointment reminders and administrative follow-ups while sensitive decisions remain with your staff.",
      img: "/images/industry-clinics.png",
      delay: 240,
    },
    {
      industry: "Artists, creators and studios",
      headline: "Creative work should not disappear beneath inquiries and administration.",
      outcome: "Nexus organizes commissions, bookings and client follow-ups while helping create and schedule portfolio updates, promotions and animated content.",
      img: "/images/industry-creators.png",
      delay: 300,
    },
  ]

  // Use-case scenario data for the lightbox modal
  const useCases: Record<
    string,
    { time: string; scenario: string; outcome: string; img: string }[]
  > = {
    "Restaurants and cafés": [
      {
        time: "11:31 PM — Wednesday",
        scenario: "A customer messages asking if you're still open and requests tomorrow's specials.",
        outcome: "Nexus replies instantly with your hours, menu highlights, and reservation link — while you sleep.",
        img: "/images/scenario-restaurants.png",
      },
      {
        time: "Monday 7:45 AM",
        scenario: "You wake up to three new Google reviews from the weekend.",
        outcome: "Nexus has already drafted professional, on-brand responses for each one. You approve with a single tap.",
        img: "/images/scenario-restaurants-2.png",
      },
      {
        time: "Saturday 7:20 AM — pre-rush",
        scenario: "A corporate client emails asking about catering options for an upcoming team lunch.",
        outcome: "Nexus captures the enquiry, provides your catering PDF, and queues a reminder for your review.",
        img: "/images/scenario-coffee.png",
      },
    ],
    "Barbershops and salons": [
      {
        time: "Sunday 9:55 PM",
        scenario: "A new client messages asking about availability, pricing, and whether you take walk-ins.",
        outcome: "Nexus answers all three questions accurately and sends your booking link — no missed opportunity.",
        img: "/images/scenario-barbershop.png",
      },
      {
        time: "Tuesday 8:00 AM",
        scenario: "You open the day and want to know what happened overnight.",
        outcome: "Nexus delivers a morning summary: 4 confirmations sent, 1 review responded to, 2 callbacks queued.",
        img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80",
      },
      {
        time: "Thursday afternoon",
        scenario: "A client texts asking about your cancellation policy mid-cut.",
        outcome: "Nexus replies with your exact policy — accurate, professional, and without interrupting your service.",
        img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      },
    ],
    "Dealerships": [
      {
        time: "6:45 PM — after closing",
        scenario: "A prospect submits a vehicle inquiry form after hours.",
        outcome: "Nexus sends a personalised acknowledgement, captures their preferences, and schedules a callback reminder for your morning.",
        img: "/images/scenario-automotive.png",
      },
      {
        time: "Wednesday 9:00 AM",
        scenario: "You have 6 open service quotes that haven't had follow-up in 3 days.",
        outcome: "Nexus flags all six and queues polite follow-up messages for your approval — one review, one tap to send.",
        img: "https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=800&q=80",
      },
      {
        time: "Friday afternoon",
        scenario: "A customer calls to ask about a specific vehicle's towing capacity.",
        outcome: "Your team is with another buyer. Nexus handles the SMS follow-up with the exact spec from your inventory knowledge.",
        img: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
      },
    ],
    "Agencies, firms and professional services": [
      {
        time: "Post-meeting — same day",
        scenario: "A client strategy meeting just wrapped with 11 action items across three teams.",
        outcome: "Nexus drafts a structured recap and action list, ready to send within minutes of the meeting ending.",
        img: "/images/scenario-agency.png",
      },
      {
        time: "End of month",
        scenario: "Three client reports are due and your team is stretched.",
        outcome: "Nexus pulls the agreed data points, populates your report template, and flags items needing human review.",
        img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      },
      {
        time: "Monday morning",
        scenario: "Four client threads went quiet last week with no follow-up sent.",
        outcome: "Nexus identifies the gaps and queues personalised follow-up drafts for each account — ready for you to approve.",
        img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
      },
    ],
    "Clinics and wellness practices": [
      {
        time: "10:15 AM — morning rush",
        scenario: "A patient messages inquiring about clinic hours, parking, and intake forms for their initial wellness consultation.",
        outcome: "Nexus replies with approved clinic details and intake instructions, ensuring clinical questions are routed directly to staff.",
        img: "/images/industry-clinics.png",
      },
      {
        time: "Sunday 6:30 PM",
        scenario: "A client asks whether an appointment can be rescheduled for later in the week.",
        outcome: "Nexus provides your approved rescheduling policy and self-service booking link, notifying the front desk of the change.",
        img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      },
      {
        time: "Friday 4:00 PM",
        scenario: "Staff finishes treating clients and needs to send tomorrow's appointment reminders.",
        outcome: "Nexus delivers scheduled, friendly appointment reminders with preparation notes, reducing no-shows while keeping staff focused.",
        img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
      },
    ],
    "Artists, creators and studios": [
      {
        time: "Tuesday 11:15 AM",
        scenario: "An art collector or brand reaches out inquiring about an original canvas commission, print pricing, and gallery exhibition availability.",
        outcome: "Nexus shares your commission guidelines, digital portfolio, and framing/shipping details, gathering collector specs before you begin creating.",
        img: "/images/scenario-visual-artist.jpg",
      },
      {
        time: "Friday 11:45 PM — post-set",
        scenario: "A festival organizer or club promoter messages about booking you for an upcoming weekend set, asking for your fee and technical rider (CDJs & mixer setup).",
        outcome: "Nexus checks your live performance calendar, provides your approved booking rates and DJ equipment rider, and queues the date for your 1-tap confirmation.",
        img: "/images/scenario-dj.jpg",
      },
      {
        time: "Wednesday 3:30 PM",
        scenario: "You have an upcoming song release, tour date, or creative studio showcase to announce.",
        outcome: "Nexus drafts the announcement captions, designs promotional graphics, and prepares short animated teaser clips ready for your approval and scheduling.",
        img: "/images/industry-creators.png",
      },
    ],
  }

  const coverImgMap: Record<string, string> = {
    "Restaurants and cafés": "/images/industry-restaurants.png",
    "Barbershops and salons": "/images/industry-barbershop.png",
    "Dealerships": "/images/industry-automotive.png",
    "Agencies, firms and professional services": "/images/industry-agency.png",
    "Clinics and wellness practices": "/images/industry-clinics.png",
    "Artists, creators and studios": "/images/industry-creators.png",
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
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.08] shadow-xs whitespace-nowrap">
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
          {/* Hero text card (6 cols) */}
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
              Nexus keeps messages, reviews, follow-ups and routine tasks moving through the channels you already use. You stay in control while Westside Union handles the setup.
            </p>

            {/* CTAs: Dominant primary CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <div>
                <a
                  href="#contact"
                  className="inline-block px-7 py-3.5 bg-[#111] text-white text-[11px] font-semibold rounded-xl hover:bg-[#333] transition-all tracking-widest uppercase text-center shadow-md active:scale-[0.99]"
                >
                  Book a free consultation
                </a>
                <span className="block text-[11px] text-black/50 mt-1.5 tracking-wide">
                  Book a free business workflow review.
                </span>
              </div>
              <Link
                href="/demo"
                className="px-6 py-3.5 border border-black/20 text-black/80 text-[11px] font-medium rounded-xl hover:border-black/40 hover:text-black hover:bg-black/[0.04] transition-all duration-200 tracking-widest uppercase self-start sm:self-auto"
              >
                See how Nexus works
              </Link>
            </div>

            {/* Trust line */}
            <div className="pt-5 border-t border-black/[0.08] space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
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

          {/* Hero Visual Flow (6 cols) */}
          <div className="lg:col-span-6 w-full">
            <NexusMessageToOutcome />
          </div>
        </div>
      </section>

      {/* ── 2. WHAT KEEPS FOLLOWING YOU HOME? ─────────────────────────────────── */}
      <section id="how-it-helps" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Tag>THE REALITY</Tag>
            <h2
              className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light text-[#111] tracking-tight leading-[1.1]"
              style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
            >
              What keeps following you home?
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-black/65 max-w-2xl mx-auto leading-relaxed">
              You should not have to choose between serving the customer in front of you and staying responsive to the customer reaching out online.
            </p>
          </div>

          {/* 3 Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" onMouseMove={handleMouse}>
            {/* Card 1: Missed customer messages */}
            <BentoCard className="p-7 flex flex-col justify-between" delay={0}>
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center mb-5 text-amber-800">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-black/40 font-semibold block mb-1">
                  PROBLEM 01
                </span>
                <h3 className="text-xl font-medium text-[#111] mb-2">Missed customer messages</h3>
                <p className="text-xs sm:text-sm text-black/65 leading-relaxed mb-6">
                  Customers should not have to wait until you have a free moment.
                </p>
              </div>

              {/* Visual Element */}
              <div className="p-3.5 rounded-xl bg-white border border-black/[0.06] shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-black/45">
                  <span>1:15 PM · Floor Rush</span>
                  <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-sans">Captured in 8s</span>
                </div>
                <div className="text-xs text-black/80 font-medium">
                  &ldquo;Do you have availability for a party of 6 this Friday?&rdquo;
                </div>
                <div className="text-[11px] text-emerald-700 flex items-center gap-1.5 pt-1 border-t border-black/[0.04]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Nexus acknowledged &amp; queued table callback</span>
                </div>
              </div>
            </BentoCard>

            {/* Card 2: Unanswered reviews */}
            <BentoCard className="p-7 flex flex-col justify-between" delay={80}>
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center mb-5 text-blue-800">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-black/40 font-semibold block mb-1">
                  PROBLEM 02
                </span>
                <h3 className="text-xl font-medium text-[#111] mb-2">Unanswered reviews</h3>
                <p className="text-xs sm:text-sm text-black/65 leading-relaxed mb-6">
                  Protect your reputation without spending every evening writing replies.
                </p>
              </div>

              {/* Visual Element */}
              <div className="p-3.5 rounded-xl bg-white border border-black/[0.06] shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-black/45">
                  <span>New Google Review</span>
                  <span className="text-amber-500 font-sans">★★★★★</span>
                </div>
                <div className="text-xs text-black/80 font-medium">
                  &ldquo;Fantastic service and great atmosphere!&rdquo;
                </div>
                <div className="text-[11px] text-blue-700 flex items-center justify-between pt-1 border-t border-black/[0.04]">
                  <span>Draft response ready for 1-tap review</span>
                  <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-[10px] font-medium">Approve</span>
                </div>
              </div>
            </BentoCard>

            {/* Card 3: Forgotten follow-ups */}
            <BentoCard className="p-7 flex flex-col justify-between" delay={160}>
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200/60 flex items-center justify-center mb-5 text-purple-800">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-black/40 font-semibold block mb-1">
                  PROBLEM 03
                </span>
                <h3 className="text-xl font-medium text-[#111] mb-2">Forgotten follow-ups</h3>
                <p className="text-xs sm:text-sm text-black/65 leading-relaxed mb-6">
                  Keep quotes, callbacks and opportunities visible until they are handled.
                </p>
              </div>

              {/* Visual Element */}
              <div className="p-3.5 rounded-xl bg-white border border-black/[0.06] shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-black/45">
                  <span>Pending Estimate Follow-up</span>
                  <span className="text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded font-sans">3 days open</span>
                </div>
                <div className="text-xs text-black/80 font-medium">
                  Smith Commercial Quote · CAD $4,200
                </div>
                <div className="text-[11px] text-purple-700 flex items-center gap-1.5 pt-1 border-t border-black/[0.04]">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>Kept visible on morning briefing until resolved</span>
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── 3. TELL NEXUS ONCE. SEE THE WORK MOVE. ─────────────────────────── */}
      <section id="workflow" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center md:text-left">
            <PixelIcon type="workflow" size={40} />
            <div className="mt-4"><Tag>TASK WORKFLOW</Tag></div>
            <RevealText className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.08]">
              {"Tell Nexus once. See the work move."}
            </RevealText>
            <p className="mt-4 text-xs sm:text-sm text-black/65 leading-relaxed max-w-xl">
              Add a reminder, request or idea. Nexus turns it into assigned work, tracks its progress and reports what was completed.
            </p>
          </div>

          {/* Interactive Task Progress Flow (To Do / In Progress / Completed) */}
          <NexusTaskProgress />

          {/* Delivery Note */}
          <div className="mt-8 flex items-center justify-between flex-wrap gap-4 p-4 rounded-2xl border border-black/[0.06] bg-[#FAF9F5] text-xs text-black/65">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>Completed results can be delivered through <strong>WhatsApp</strong>, <strong>Telegram</strong>, <strong>email</strong> or the <strong>Nexus dashboard</strong>.</span>
            </span>
            <a href="#contact" className="font-medium text-black hover:opacity-75 transition-opacity underline underline-offset-2">
              Book a free consultation →
            </a>
          </div>
        </div>
      </section>

      {/* ── 4. BUILT FOR THE BUSINESS YOU RUN ────────────────────────────────── */}
      <section id="industries" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <PixelIcon type="agents" size={40} />
              <div className="mt-4"><Tag>INDUSTRIES</Tag></div>
              <RevealText className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.08]">
                {"Built for the business you run."}
              </RevealText>
            </div>
            <p className="text-xs sm:text-sm text-black/60 leading-relaxed max-w-xs">
              Industry solutions are tailored around your specific operations and familiar daily channels.
            </p>
          </div>

          {/* 6 Industry Tiles (3 cols x 2 rows on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" onMouseMove={handleMouse}>
            {industryTiles.map((item) => (
              <BentoCard key={item.industry} className="flex flex-col overflow-hidden" delay={item.delay}>
                {/* Photo */}
                <div className="relative h-48 shrink-0 overflow-hidden bg-black/[0.02]">
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
                </div>

                {/* Body */}
                <div className="p-6 pt-3 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-[#111] mb-2">{item.industry}</h3>
                    <p className="text-xs sm:text-sm font-normal text-black/85 leading-relaxed mb-3">
                      {item.headline}
                    </p>
                    <p className="text-xs text-black/60 leading-relaxed mb-6">
                      {item.outcome}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
                    <button
                      onClick={() => setActiveIndustry(item.industry)}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] tracking-widest font-sans text-black/70 bg-black/[0.04] hover:bg-black/[0.08] hover:text-black transition-colors cursor-pointer"
                    >
                      SEE USE CASES →
                    </button>
                    <a
                      href="#contact"
                      className="text-xs text-black/50 hover:text-black transition-colors underline underline-offset-2"
                    >
                      Consultation →
                    </a>
                  </div>
                </div>
              </BentoCard>
            ))}
          </div>

          {/* Secondary Founder Banner */}
          <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-white border border-black/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-black/[0.04] text-black/60 font-medium">
                Founder Launchpath
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-[#111]">
                Starting something new?
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

      {/* ── USE CASES LIGHTBOX MODAL ────────────────────────────────────────── */}
      {activeIndustry && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          onClick={() => setActiveIndustry(null)}
        >
          <div
            className="relative w-full sm:max-w-3xl max-h-[92dvh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-[#F5F4F0] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cover image header */}
            {coverImgMap[activeIndustry] && (
              <div className="relative h-48 overflow-hidden rounded-t-3xl sm:rounded-t-2xl">
                <img src={coverImgMap[activeIndustry]} alt={activeIndustry} className="w-full h-full object-cover" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(245,244,240,1) 0%, rgba(245,244,240,0.3) 60%, transparent 100%)",
                  }}
                />
                <div className="absolute bottom-4 left-6">
                  <Tag>USE CASES</Tag>
                  <h2 className="mt-2 text-2xl font-light tracking-tight text-[#111]">{activeIndustry}</h2>
                </div>
              </div>
            )}

            {/* Close button */}
            <button
              onClick={() => setActiveIndustry(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-black/[0.08] text-black/50 hover:text-black transition-colors z-10 cursor-pointer shadow-xs"
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

            {/* Scenario cards */}
            <div className="p-6 space-y-4">
              {(useCases[activeIndustry] ?? []).map((c, i) => {
                const imgLeft = i % 2 === 0
                return (
                  <div
                    key={i}
                    className="rounded-xl border border-black/[0.07] bg-white overflow-hidden flex flex-col sm:flex-row shadow-sm"
                  >
                    {imgLeft && (
                      <div className="w-full sm:w-[35%] shrink-0 overflow-hidden aspect-video sm:aspect-square border-b sm:border-b-0 sm:border-r border-black/[0.07]">
                        <img src={c.img} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                      <span className="text-[10px] tracking-widest text-black/40 uppercase font-mono font-medium">
                        {c.time}
                      </span>
                      <p className="mt-2 text-sm font-light text-black/75 leading-relaxed">{c.scenario}</p>
                      <div className="mt-3 flex gap-2 items-start">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-emerald-600 mt-0.5 shrink-0"
                        >
                          <path d="M2 7l3.5 3.5L12 3" />
                        </svg>
                        <p className="text-xs sm:text-sm text-black/60 leading-relaxed">{c.outcome}</p>
                      </div>
                    </div>
                    {!imgLeft && (
                      <div className="w-full sm:w-[35%] shrink-0 overflow-hidden aspect-video sm:aspect-square border-t sm:border-t-0 sm:border-l border-black/[0.07] order-first sm:order-last">
                        <img src={c.img} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Modal CTA */}
            <div className="px-6 pb-8 pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                onClick={() => setActiveIndustry(null)}
                className="flex-1 py-3.5 bg-[#111] text-white text-[11px] font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-sm cursor-pointer"
              >
                Book a free consultation
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── 5. WORKS WHERE YOU ALREADY WORK (Panel A: Systems, Panel B: Physical) ─ */}
      <section id="connections" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <PixelIcon type="integrations" size={40} />
            <div className="mt-4"><Tag>CONNECTIONS &amp; SENSING</Tag></div>
            <RevealText className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.08]">
              {"Works where you already work."}
            </RevealText>
            <p className="mt-4 text-xs sm:text-sm text-black/65 max-w-xl mx-auto leading-relaxed">
              Connect the communication channels and business tools you already use, with optional on-site awareness when your physical business needs it.
            </p>
          </div>

          {/* Panel A (Business Systems) & Panel B (Nexus Sense) */}
          <NexusConnectionsAndSense />
        </div>
      </section>

      {/* ── 6. CHOOSE HOW NEXUS RUNS (3 Concise Preview Cards) ───────────────── */}
      <section id="pricing" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 flex flex-col items-center">
            <PixelIcon type="pricing" size={40} />
            <div className="mt-4"><Tag>PACKAGES</Tag></div>
            <RevealText className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.08]">
              {"Choose how Nexus runs."}
            </RevealText>
            <p className="mt-3 text-xs sm:text-sm text-black/60 max-w-lg leading-relaxed">
              Transparent packages tailored to how your business operates today.
            </p>
            <p className="mt-2 text-[11px] text-black/45 font-mono">
              All prices are shown in Canadian dollars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" onMouseMove={handleMouse}>
            {/* 1. Cloud Card */}
            <BentoCard className="p-7 flex flex-col justify-between" delay={0}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="font-pixel text-[11px] tracking-widest text-black/40">NEXUS CLOUD</div>
                  <NexusCloudEmblem className="w-10 h-10" />
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-light">From CAD $99</span>
                  <span className="text-black/40 text-sm">/month</span>
                </div>
                <p className="text-[11px] text-black/50 mb-3">CAD $299 initial setup</p>

                <p className="text-xs text-black/75 font-medium mb-4 leading-relaxed">
                  Start with one important workflow that keeps stealing your time.
                </p>

                <ul className="space-y-2 mb-6 pt-3 border-t border-black/[0.05]">
                  <li className="flex items-start gap-2 text-xs text-black/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                    <span>One primary messaging channel</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-black/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                    <span>One starting business workflow</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-black/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                    <span>Task tracking and owner summaries</span>
                  </li>
                </ul>
              </div>

              <div>
                <Link
                  href="/pricing"
                  className="block w-full py-3 bg-[#111] text-white text-[11px] font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-sm"
                >
                  View Nexus Cloud Details →
                </Link>
              </div>
            </BentoCard>

            {/* 2. Edge Card */}
            <BentoCard className="p-7 flex flex-col justify-between border-black/20 bg-white" delay={80}>
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
                  <span className="text-3xl font-light">From CAD $499</span>
                  <span className="text-black/50 text-sm">/month</span>
                </div>
                <p className="text-[11px] text-black/60 mb-3">CAD $1,499 activation · 36-month initial term</p>

                <p className="text-xs text-black/75 font-medium mb-4 leading-relaxed">
                  Add local privacy and dedicated capacity at your physical location.
                </p>

                <ul className="space-y-2 mb-6 pt-3 border-t border-black/[0.05]">
                  <li className="flex items-start gap-2 text-xs text-black/75">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                    <span>Dedicated Nexus Edge on-site appliance</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-black/75">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                    <span>Private company knowledge kept local</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-black/75">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                    <span>Hardware maintenance &amp; replacement coverage</span>
                  </li>
                </ul>
              </div>

              <div>
                <Link
                  href="/nexus-edge"
                  className="block w-full py-3 bg-[#111] text-white text-[11px] font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-sm"
                >
                  View Nexus Edge Details →
                </Link>
              </div>
            </BentoCard>

            {/* 3. Enterprise Card */}
            <BentoCard className="p-7 flex flex-col justify-between" delay={160}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="font-pixel text-[11px] tracking-widest text-black/40">NEXUS ENTERPRISE</div>
                  <NexusEnterpriseEmblem className="w-10 h-10" />
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-light">From CAD $1,499</span>
                  <span className="text-black/40 text-sm">/month</span>
                </div>
                <p className="text-[11px] text-black/50 mb-3">Deployment from CAD $7,500</p>

                <p className="text-xs text-black/75 font-medium mb-4 leading-relaxed">
                  Coordinate multiple locations, teams, and advanced approval controls.
                </p>

                <ul className="space-y-2 mb-6 pt-3 border-t border-black/[0.05]">
                  <li className="flex items-start gap-2 text-xs text-black/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/40 mt-1 shrink-0" />
                    <span>Multiple locations, teams, or departments</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-black/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/40 mt-1 shrink-0" />
                    <span>Coordinated business assistants and workflows</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-black/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/40 mt-1 shrink-0" />
                    <span>Dedicated service, custom connections &amp; reporting</span>
                  </li>
                </ul>
              </div>

              <div>
                <Link
                  href="/pricing"
                  className="block w-full py-3 border border-black/20 text-black/80 text-[11px] font-medium rounded-xl hover:border-black/40 hover:text-black hover:bg-black/[0.03] transition-all tracking-widest text-center uppercase"
                >
                  View Enterprise Details →
                </Link>
              </div>
            </BentoCard>
          </div>

          {/* Pricing Footer */}
          <div className="mt-10 p-6 rounded-2xl border border-black/[0.06] bg-white flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xs">
            <div>
              <h4 className="text-sm font-medium text-[#111]">Compare packages, Nexus AI Credits, add-ons, and ROI calculator.</h4>
              <p className="text-xs text-black/55">Review the full feature breakdown and estimate time recovered on the pricing page.</p>
            </div>
            <Link
              href="/pricing"
              className="shrink-0 px-5 py-2.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase shadow-sm"
            >
              Compare All Packages →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. TRUST, FAQ PREVIEW AND FINAL CTA ─────────────────────────────── */}
      <section id="trust-and-faq" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-white">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Trust Principles */}
          <div>
            <div className="text-center mb-10">
              <Tag>TRUST &amp; CONTROL</Tag>
              <h2
                className="mt-4 text-3xl sm:text-4xl font-light text-[#111] tracking-tight leading-[1.1]"
                style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
              >
                You stay in control. Westside Union handles the setup.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Your business information stays yours",
                  desc: "Your data, customer conversations, and internal knowledge belong entirely to you and are never used to train public models.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-700">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  ),
                },
                {
                  title: "Important actions can wait for your approval",
                  desc: "Sensitive drafts, customer quotes, and public communications pause for your one-tap review before anything is sent.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sky-700">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 14 14" />
                    </svg>
                  ),
                },
                {
                  title: "Westside Union configures, monitors and maintains Nexus",
                  desc: "We manage knowledge setup, connector compatibility, and ongoing updates so you never have to learn complicated software.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-700">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[#FAF9F5] border border-black/[0.06] shadow-2xs space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-medium text-[#111] leading-snug">{item.title}</h3>
                  <p className="text-xs text-black/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Compact FAQ Preview (3 Accordions) */}
          <div id="faq">
            <div className="text-center mb-8">
              <Tag>FAQ PREVIEW</Tag>
              <h3 className="mt-3 text-2xl sm:text-3xl font-light text-[#111] tracking-tight">
                Frequently asked questions.
              </h3>
            </div>

            <div className="space-y-0 divide-y divide-black/[0.06] bg-[#FAF9F5] rounded-2xl border border-black/[0.07] px-6 sm:px-8 py-2 shadow-xs mb-6">
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

      {/* ── CONSULTATION FORM (Primary CTA: Book a free consultation) ─────── */}
      <ConsultationForm
        title="Show us the work that keeps following you home."
        subtitle="We will identify the first few tasks Nexus can take off your plate and recommend a practical starting point. If the numbers or workflow do not support Nexus, we will say so."
      />

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <SiteFooter />

      {/* ── BACK TO TOP ──────────────────────────────────────────────────────── */}
      <BackToTop />
    </div>
  )
}

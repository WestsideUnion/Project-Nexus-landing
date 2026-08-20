"use client"

import React, { useRef, useEffect, useState } from "react"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { MobileNav } from "@/components/mobile-nav"

// ─── Centralized content data ────────────────────────────────────────────────

// Toronto wage benchmarks — Government of Canada Job Bank (median wages, 2026)
const WAGE_TABLE = [
  {
    work: "Routine questions and booking handoff",
    benchmark: "Receptionist — $20.00/hr",
    hours: "20",
    value: "$400",
    help: "Answers approved FAQs and routes requests",
    total: false,
  },
  {
    work: "Follow-ups, reminders, and coordination",
    benchmark: "Administrative — $26.50/hr",
    hours: "20",
    value: "$530",
    help: "Tracks work and reports unfinished items",
    total: false,
  },
  {
    work: "Weekly summaries and basic reporting",
    benchmark: "Administrative — $26.50/hr",
    hours: "12",
    value: "$318",
    help: "Prepares recurring summaries",
    total: false,
  },
  {
    work: "Review responses and promotional drafts",
    benchmark: "Social media — $37.50/hr",
    hours: "8",
    value: "$300",
    help: "Drafts content for owner approval",
    total: false,
  },
  {
    work: "Checklists and owner notifications",
    benchmark: "Administrative — $26.50/hr",
    hours: "8",
    value: "$212",
    help: "Runs scheduled checks and alerts",
    total: false,
  },
  {
    work: "Illustrative total",
    benchmark: "",
    hours: "68",
    value: "$1,760/mo",
    help: "Approved routines can operate concurrently",
    total: true,
  },
]

const HOURLY_RATES: Record<string, number> = {
  receptionist: 20.0,
  administrative: 26.5,
  marketing: 37.5,
}

// 3 Primary Package Structure
const PLAN_DATA: Record<string, { name: string; monthly: number; annualMonthly: number; setup: number; setupLabel: string }> = {
  cloud: { name: "Nexus Cloud", monthly: 99, annualMonthly: 79, setup: 299, setupLabel: "CAD $299 one-time onboarding" },
  edge: { name: "Nexus Edge", monthly: 299, annualMonthly: 299, setup: 0, setupLabel: "Appliance setup priced by config" },
  custom: { name: "Nexus Custom", monthly: 799, annualMonthly: 799, setup: 0, setupLabel: "Quoted after workflow consultation" },
}

// USD exchange rate — approximate, for illustrative display only.
const USD_RATE = 0.73

// ─── Intersection Observer hook ──────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ─── Bento card ──────────────────────────────────────────────────────────────
function BentoCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView(0.1)
  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl border border-black/[0.07] bg-white overflow-hidden transition-all duration-700 hover:border-black/[0.15] hover:bg-[#fafaf8] ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms, border-color 0.3s ease, background-color 0.3s ease`,
      }}
    >
      {/* Hover glow spot */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.03), transparent 60%)" }}
      />
      {children}
    </div>
  )
}

// ─── Pill tag ─────────────────────────────────────────────────────────────────
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/40 bg-black/[0.04] uppercase">
      {children}
    </span>
  )
}

// ─── Status pill ──────────────────────────────────────────────────────────────
function StatusPill({ status }: { status: "available" | "configured" | "planned" | "preview" }) {
  const styles = {
    available: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    configured: "bg-amber-50 text-amber-700 border-amber-200/60",
    planned: "bg-black/[0.03] text-black/35 border-black/[0.06]",
    preview: "bg-blue-50 text-blue-700 border-blue-200/60",
  }
  const labels = {
    available: "Available",
    configured: "Configured per deployment",
    planned: "Planned",
    preview: "Preview / In development",
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] tracking-widest border ${styles[status]}`}>
      <span className={`w-1 h-1 rounded-full ${status === "available" ? "bg-emerald-500" : status === "configured" ? "bg-amber-500" : status === "preview" ? "bg-blue-500" : "bg-black/20"}`} />
      {labels[status]}
    </span>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function NexusPage() {
  const [formState, setFormState] = useState<"idle" | "loading" | "submitted" | "error">("idle")
  const [formError, setFormError] = useState<string | null>(null)
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null)
  const [currency, setCurrency] = useState<"CAD" | "USD">("CAD")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [form, setForm] = useState({
    name: "", business: "", email: "", phone: "", city: "", industry: "",
    locations: "", channel: "", problem: "", tools: "", deployment: "", consent: false,
  })

  // ── ROI calculator state ──
  const [roi, setRoi] = useState({
    hoursPerWeek: 10,
    hourlyRole: "administrative" as "receptionist" | "administrative" | "marketing" | "custom",
    customRate: 26.5,
    offsetPercent: 75,
    plan: "cloud" as "cloud" | "edge" | "custom",
    setupMonths: 12,
    recoveredOpportunities: 0,
    contributionValue: 0,
    variableCosts: 0,
  })

  // ── ROI derived calculations ──
  const roiHourlyRate = roi.hourlyRole === "custom" ? roi.customRate : (HOURLY_RATES[roi.hourlyRole] ?? 26.5)
  const roiMonthlyWorkValue = roi.hoursPerWeek * 52 / 12 * roiHourlyRate
  const roiOffsetValue = roiMonthlyWorkValue * (roi.offsetPercent / 100)
  const roiPlanData = PLAN_DATA[roi.plan] || PLAN_DATA.cloud
  const roiSetupAmortized = roiPlanData.setup > 0 ? roiPlanData.setup / roi.setupMonths : 0
  const roiNexusCost = roiPlanData.monthly + roiSetupAmortized + roi.variableCosts
  const roiRecoveredContribution = roi.recoveredOpportunities * roi.contributionValue
  const roiDiff = roiOffsetValue + roiRecoveredContribution - roiNexusCost

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleRoiChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setRoi(prev => ({
      ...prev,
      [name]: name === "hoursPerWeek" || name === "offsetPercent" || name === "customRate" || name === "recoveredOpportunities" || name === "contributionValue" || name === "variableCosts"
        ? Number(value)
        : name === "setupMonths" ? Number(value)
        : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.consent || !form.email || !form.name || !form.business) return
    setFormState("loading")
    setFormError(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setFormError(data.error ?? "Something went wrong. Please try again.")
        setFormState("error")
      } else {
        setFormState("submitted")
      }
    } catch {
      setFormError("Network error — please check your connection and try again.")
      setFormState("error")
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased selection:bg-black selection:text-white">

      {/* ── STICKY NAV ────────────────────────────────────────────────────── */}
      <MobileNav />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-end overflow-hidden pt-32 pb-12 px-6 md:px-12 lg:px-20">

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
        <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none" style={{ height: "70%", background: "linear-gradient(to top, #F5F4F0 0%, #F5F4F0 25%, rgba(245,244,240,0.85) 45%, rgba(245,244,240,0.4) 70%, transparent 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none" style={{ height: "25%", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", maskImage: "linear-gradient(to top, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none" style={{ height: "45%", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", maskImage: "linear-gradient(to top, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)" }} />

        {/* Status badge — top-right */}
        <div className="absolute top-24 right-6 md:right-12 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.08] shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] tracking-widest text-black/60 uppercase font-sans font-medium">Now accepting pilot businesses</span>
        </div>

        {/* Hero content card — overlay treatment for WCAG AA readability */}
        <div className="relative z-30 max-w-3xl my-auto pt-8">
          <div className="p-6 sm:p-10 rounded-2xl bg-[#F5F4F0]/85 backdrop-blur-md border border-black/[0.07] shadow-xl">

            {/* Eyebrow */}
            <span className="text-[11px] tracking-[0.2em] text-black/60 uppercase mb-4 block font-sans font-medium">
              A MANAGED BUSINESS ASSISTANT FROM WESTSIDE UNION
            </span>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-light text-[#111] leading-[1.08] tracking-tight mb-6"
              style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
            >
              More gets done, even when you are busy running the business.
            </h1>

            {/* Supporting copy */}
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

      {/* ── SECTION 2: THE PROBLEM (StoryBrand Part 1) ────────────────────── */}
      <section id="how-it-helps" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Tag>THE REALITY</Tag>
            <h2
              className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light text-[#111] tracking-tight leading-[1.1]"
              style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
            >
              Running the business should not mean doing everything yourself.
            </h2>
          </div>

          <div className="p-8 sm:p-12 rounded-2xl border border-black/[0.07] bg-white shadow-sm space-y-6">
            <p className="text-base sm:text-lg text-black/75 leading-relaxed font-light">
              You know what should be done, but you cannot be everywhere at once. Work keeps following you home, customer messages arrive while you are serving other customers, and good ideas disappear because there is no time to organize them.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                "A café owner sees new reviews but cannot reply during the morning rush.",
                "A restaurant owner remembers a promotion idea after closing and forgets it by morning.",
                "A barber loses time switching between bookings, messages, reviews, and social posts.",
                "A business owner finishes the day with customer follow-ups still waiting.",
                "A founder spends more time organizing work than growing the company.",
              ].map((situation, i) => (
                <div key={i} className={`p-4 rounded-xl bg-[#F5F4F0] border border-black/[0.04] flex items-start gap-3 ${i === 4 ? "sm:col-span-2" : ""}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <p className="text-xs sm:text-sm text-black/75 leading-relaxed">{situation}</p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-[#F5F4F0] border-l-4 border-black/70 mt-4">
              <p className="text-sm sm:text-base text-black/80 font-medium leading-relaxed">
                You should not have to choose between serving the customer in front of you and staying responsive to the customer reaching out online. Nexus helps keep the work moving.
              </p>
            </div>
          </div>

          {/* Quick problem → outcome cards */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" onMouseMove={handleMouse}>
            {[
              { from: "Customer messages arrive while serving guests", to: "Instant approved replies & triage", delay: 0 },
              { from: "Reviews go unanswered for days", to: "Drafted responses ready to review", delay: 60 },
              { from: "Follow-ups & quotes get forgotten", to: "Organized reminders & tracking", delay: 120 },
              { from: "Administrative work following you home", to: "Clear daily & weekly summaries", delay: 180 },
            ].map((item) => (
              <BentoCard key={item.from} className="p-6 flex flex-col justify-between gap-3" delay={item.delay}>
                <div className="text-xs text-black/40 line-through decoration-black/25 leading-snug">{item.from}</div>
                <div className="text-sm font-medium text-[#111] leading-snug">{item.to}</div>
                <div className="mt-auto pt-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-600">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: THE GUIDE (StoryBrand Part 2) ───────────────────────── */}
      <section id="guide" className="py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <PixelIcon type="platform" size={40} />
            <div className="mt-4"><Tag>THE GUIDE</Tag></div>
            <RevealText className="mt-5 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05]">
              {"Meet the assistant\nthat learns how your\nbusiness works."}
            </RevealText>
            <p className="mt-4 text-base text-black/55 leading-relaxed max-w-xl">
              Talk to Nexus through familiar messaging channels. Nexus keeps approved business knowledge, remembers assigned work, helps prepare routine communications, and reports what was completed.
            </p>
            <p className="mt-2 text-xs text-black/40">
              Nexus does not replace employees—it absorbs the repetitive administrative friction that slows down your business.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-3" onMouseMove={handleMouse}>
            {/* Wide feature card */}
            <BentoCard className="col-span-12 p-8 min-h-[220px] flex flex-col justify-between relative overflow-hidden" delay={0}>
              <img
                src="/images/arc.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "center 70%" }}
              />
              <div className="absolute inset-0" style={{
                maskImage: "linear-gradient(to bottom, transparent 45%, black 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 45%, black 100%)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }} />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, transparent 35%, rgba(245,244,240,0.3) 50%, rgba(245,244,240,0.75) 65%, rgba(245,244,240,0.95) 80%, rgb(245,244,240) 100%)",
                }}
              />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl border border-black/10 bg-white/60 flex items-center justify-center mb-6" style={{ backdropFilter: "blur(8px)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                </div>
                <h3 className="text-xl font-light mb-3">One conversation. Everything connected.</h3>
                <p className="text-sm text-black/55 leading-relaxed max-w-lg">
                  Message Nexus just like you would a trusted assistant. It remembers your business knowledge, your preferences, and your pending tasks—keeping the work moving while you stay in control.
                </p>
              </div>
            </BentoCard>

            {/* Core assistant roles */}
            {[
              { icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />, title: "Organize assigned work", desc: "Tell Nexus what needs doing via message. It tracks deadlines, reminds you, and flags pending items.", delay: 0 },
              { icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10h8M8 14h5" /></>, title: "Daily & weekly summaries", desc: "Start each day with a clear view of customer inquiries handled, work waiting, and items needing your input.", delay: 80 },
              { icon: <><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></>, title: "Draft review & routine replies", desc: "Nexus prepares professional responses for your review. You approve before anything goes out.", delay: 160 },
              { icon: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>, title: "Highlight slow periods", desc: "Notice quiet hours or patterns early with proactive owner updates and suggested promotion drafts.", delay: 0 },
              { icon: <><path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></>, title: "Turn ideas into action", desc: "Remembered a promotion idea after closing? Text it to Nexus to draft, schedule, and queue for review.", delay: 80 },
              { icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>, title: "Follow up on inquiries", desc: "Keep customer callbacks, quotes, and booking inquiries visible until they are resolved.", delay: 160 },
            ].map((job, i) => (
              <BentoCard key={i} className="col-span-12 md:col-span-4 p-8 min-h-[200px]" delay={job.delay}>
                <div className="w-10 h-10 rounded-xl border border-black/10 flex items-center justify-center mb-5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{job.icon}</svg>
                </div>
                <h3 className="text-lg font-light mb-2">{job.title}</h3>
                <p className="text-sm text-black/50 leading-relaxed">{job.desc}</p>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: PRODUCT EXPERIENCE (3 Simple Stages) ────────────────── */}
      <section id="experience" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <PixelIcon type="workflow" size={40} />
            <div className="mt-4"><Tag>PRODUCT EXPERIENCE</Tag></div>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Tell Nexus what needs\nto be done. See the\nwork move forward."}
            </RevealText>
            <p className="mt-4 text-sm text-black/55 leading-relaxed max-w-lg">
              Assign work directly through familiar messaging or review your operations in the Nexus control center. Every task progresses through three simple, transparent stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" onMouseMove={handleMouse}>
            {/* Stage 1: To Do */}
            <BentoCard className="p-8 flex flex-col justify-between" delay={0}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-pixel text-xs text-black/40 tracking-widest uppercase">STAGE 01</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest bg-amber-50 text-amber-700 border border-amber-200/60 font-sans">
                    TO DO
                  </span>
                </div>
                <h3 className="text-xl font-light mb-3">Ideas & Reminders</h3>
                <p className="text-sm text-black/50 leading-relaxed mb-6">
                  Ideas, reminders, review alerts, and routine work you have assigned or flagged for completion.
                </p>
                <div className="space-y-2 p-4 rounded-xl bg-black/[0.02] border border-black/[0.04]">
                  <div className="text-xs text-black/70 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    3 Google reviews awaiting draft
                  </div>
                  <div className="text-xs text-black/70 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Wednesday slow-period promo idea
                  </div>
                  <div className="text-xs text-black/70 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Pending quote callback: Smith project
                  </div>
                </div>
              </div>
              <p className="mt-6 text-[11px] text-black/35">Captured from text, voice notes, or scheduled checks</p>
            </BentoCard>

            {/* Stage 2: In Progress */}
            <BentoCard className="p-8 flex flex-col justify-between" delay={80}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-pixel text-xs text-black/40 tracking-widest uppercase">STAGE 02</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest bg-blue-50 text-blue-700 border border-blue-200/60 font-sans">
                    IN PROGRESS
                  </span>
                </div>
                <h3 className="text-xl font-light mb-3">Active Coordination</h3>
                <p className="text-sm text-black/50 leading-relaxed mb-6">
                  Work Nexus is currently organizing, drafting, verifying with business knowledge, or holding for your sign-off.
                </p>
                <div className="space-y-2 p-4 rounded-xl bg-black/[0.02] border border-black/[0.04]">
                  <div className="text-xs text-black/70 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    Drafting catering menu proposal
                  </div>
                  <div className="text-xs text-black/70 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    Holding for review: 5-star review reply
                  </div>
                  <div className="text-xs text-black/70 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    Triaging after-hours customer inquiry
                  </div>
                </div>
              </div>
              <p className="mt-6 text-[11px] text-black/35">Sensitive actions pause until you give approval</p>
            </BentoCard>

            {/* Stage 3: Finished */}
            <BentoCard className="p-8 flex flex-col justify-between" delay={160}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-pixel text-xs text-black/40 tracking-widest uppercase">STAGE 03</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-sans">
                    FINISHED
                  </span>
                </div>
                <h3 className="text-xl font-light mb-3">Completed & Logged</h3>
                <p className="text-sm text-black/50 leading-relaxed mb-6">
                  Completed work with a plain-language summary of what happened, recorded cleanly in your activity log.
                </p>
                <div className="space-y-2 p-4 rounded-xl bg-black/[0.02] border border-black/[0.04]">
                  <div className="text-xs text-black/70 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Morning owner summary delivered
                  </div>
                  <div className="text-xs text-black/70 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Appointment reminders confirmed (4/4)
                  </div>
                  <div className="text-xs text-black/70 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Approved review response published
                  </div>
                </div>
              </div>
              <p className="mt-6 text-[11px] text-black/35">Delivered to your morning message or dashboard</p>
            </BentoCard>
          </div>

          <div className="mt-8 flex items-center justify-between flex-wrap gap-4 p-4 rounded-2xl border border-black/[0.06] bg-white text-xs text-black/50">
            <span className="flex items-center gap-2">
              <StatusPill status="preview" />
              <span>Interactive web control center preview available for pilot businesses. Daily operation conducted via messaging.</span>
            </span>
            <a href="#contact" className="font-medium text-black/70 hover:text-black transition-colors underline underline-offset-2">
              Book a workflow consultation →
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: INDUSTRY SOLUTIONS (6 cards) ───────────────────────── */}
      <section id="industries" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <PixelIcon type="agents" size={40} />
              <div className="mt-4"><Tag>INDUSTRIES</Tag></div>
              <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
                {"Built for the\nbusiness you run."}
              </RevealText>
            </div>
            <p className="text-sm text-black/50 leading-relaxed max-w-xs">
              Every industry has its own repetitive bottlenecks. Nexus is configured around your specific workflows, not a generic chatbot template.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" onMouseMove={handleMouse}>
            {[
              {
                industry: "Restaurants",
                headline: "Keep customer follow-ups moving while you run the floor.",
                outcomes: [
                  "Organize inquiries and follow-ups",
                  "Prepare review responses",
                  "Keep promotion ideas from being forgotten",
                  "Produce owner summaries",
                  "Connect operational tools as the business expands",
                ],
                img: "/images/industry-restaurants.png",
                delay: 0,
              },
              {
                industry: "Cafés and coffee shops",
                headline: "Stay visible to customers—even during the morning rush.",
                outcomes: [
                  "Prepare Google review responses",
                  "Organize social-content ideas",
                  "Highlight slow periods for the owner",
                  "Keep recurring tasks and promotions moving",
                  "Summarize customer feedback",
                ],
                img: "/images/industry-coffee.png",
                delay: 80,
              },
              {
                industry: "Barbershops and salons",
                headline: "Spend less time chasing messages and more time serving clients.",
                outcomes: [
                  "Organize appointment-related follow-ups",
                  "Prepare review responses",
                  "Keep marketing ideas moving",
                  "Summarize owner tasks across locations",
                  "Identify unattended customer inquiries",
                ],
                img: "/images/industry-barbershop.png",
                delay: 160,
              },
              {
                industry: "Automotive dealerships",
                headline: "Every lead deserves a timely next step.",
                outcomes: [
                  "Organize lead follow-ups",
                  "Surface unanswered inquiries",
                  "Prepare daily manager summaries",
                  "Coordinate work across sales and service",
                  "Connect existing dealership systems through a custom deployment",
                ],
                img: "/images/industry-automotive.png",
                delay: 0,
              },
              {
                industry: "Marketing agencies",
                headline: "Keep client work moving without carrying every task yourself.",
                outcomes: [
                  "Organize briefs and follow-ups",
                  "Prepare client updates",
                  "Track recurring reporting work",
                  "Turn ideas into assigned tasks",
                  "Summarize outstanding deliverables",
                ],
                img: "/images/industry-agency.png",
                delay: 80,
              },
              {
                industry: "Start Your Business — Canada",
                headline: "Start with a clearer plan—and keep the support after launch.",
                outcomes: [
                  "Business-registration guidance and coordination",
                  "Industry and operating-needs discovery",
                  "Personalized launch checklist",
                  "Initial business toolkit",
                  "Transition into an ongoing Nexus subscription",
                ],
                img: "/images/industry-founders.png",
                delay: 160,
                isFounderCard: true,
              },
            ].map((item) => (
              <BentoCard key={item.industry} className="flex flex-col overflow-hidden" delay={item.delay}>
                {/* Cover photo */}
                <div className="relative h-48 shrink-0 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.industry}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.6) 75%, rgb(255,255,255) 100%)",
                    }}
                  />
                  {"isFounderCard" in item && item.isFounderCard && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] tracking-widest bg-[#111] text-white">CANADA</span>
                    </div>
                  )}
                </div>
                {/* Card body */}
                <div className="p-8 pt-4 flex flex-col flex-1">
                  <h3 className="text-xl font-light mb-2">{item.industry}</h3>
                  <p className="text-sm text-black/60 font-medium leading-snug mb-5">{item.headline}</p>
                  <ul className="space-y-2 flex-1">
                    {item.outcomes.map(outcome => (
                      <li key={outcome} className="flex items-start gap-2.5 text-xs text-black/55">
                        <div className="w-1 h-1 rounded-full bg-black/30 mt-1.5 shrink-0" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                  {"isFounderCard" in item && item.isFounderCard && (
                    <p className="mt-4 text-[10px] text-black/40 leading-normal border-t border-black/[0.05] pt-3">
                      * Nexus provides business guidance & coordination; does not replace legal, accounting, tax, immigration, or regulated professional advice.
                    </p>
                  )}
                  <div className="mt-6 pt-5 border-t border-black/[0.05]">
                    <button
                      onClick={() => setActiveIndustry(item.industry)}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/50 bg-black/[0.04] hover:bg-black/[0.08] hover:text-black/80 transition-all duration-200 cursor-pointer"
                    >
                      SEE USE CASES
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 5h6M5 2l3 3-3 3"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRY LIGHTBOX MODAL ───────────────────────────────────────────── */}
      {activeIndustry && (() => {
        const useCases: Record<string, { time: string; scenario: string; outcome: string; img: string }[]> = {
          "Restaurants": [
            {
              time: "11:31 PM — Wednesday",
              scenario: "A customer messages asking if you're still open and requests tomorrow's specials.",
              outcome: "Nexus replies instantly with your hours, menu highlights, and reservation link — while you sleep.",
              img: "/images/scenario-restaurants.png",
            },
            {
              time: "Monday 7:45 AM",
              scenario: "You wake up to three new Google reviews from the weekend.",
              outcome: "Nexus has already drafted professional, on-brand responses for each one. You approve with a single reply.",
              img: "/images/scenario-restaurants-2.png",
            },
            {
              time: "Friday 2:00 PM — slow service",
              scenario: "Foot traffic is down and your team is idle.",
              outcome: "Nexus flags the quiet window and asks if you'd like a weekend promotion drafted and queued for your approval.",
              img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
            },
          ],
          "Cafés and coffee shops": [
            {
              time: "Saturday 7:20 AM — pre-rush",
              scenario: "A corporate client emails asking about catering options for a Monday team meeting.",
              outcome: "Nexus captures the enquiry, sends your catering info, and flags it for your review — before the rush hits.",
              img: "/images/scenario-coffee.png",
            },
            {
              time: "Weekday 3:00 PM",
              scenario: "A customer asks if your cold brew contains dairy via Instagram DM.",
              outcome: "Nexus answers using your allergen information — consistent, accurate, no staff interruption needed.",
              img: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80",
            },
            {
              time: "Tuesday morning",
              scenario: "Three reviews came in over the weekend, including one complaint.",
              outcome: "Nexus has drafted responses for all three. The complaint response includes your preferred tone and a recovery offer ready for your approval.",
              img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80",
            },
          ],
          "Barbershops and salons": [
            {
              time: "Sunday 9:55 PM",
              scenario: "A new client DMs asking about availability, pricing, and whether you take walk-ins.",
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
              outcome: "Nexus replies with your exact policy — accurate, professional, and without interrupting you.",
              img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
            },
          ],
          "Automotive dealerships": [
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
              scenario: "A customer calls to ask about a specific model's towing capacity.",
              outcome: "Your team is with a customer. Nexus handles the SMS follow-up with the exact spec from your inventory knowledge.",
              img: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
            },
          ],
          "Marketing agencies": [
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
          "Start Your Business — Canada": [
            {
              time: "Discovery & launch planning",
              scenario: "A founder has a business idea but needs clarity on registrations, province requirements, and operating tools.",
              outcome: "Nexus generates a personalized launch checklist referencing official Canadian sources and guides initial milestones.",
              img: "/images/industry-founders.png",
            },
            {
              time: "Toolkit setup & referrals",
              scenario: "Organizing domain, banking, bookkeeping, and communications before opening day.",
              outcome: "Nexus helps configure your initial tools and coordinates warm handoffs to verified accountants, lawyers, and banks.",
              img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
            },
            {
              time: "Post-launch operating support",
              scenario: "Transitioning from launch into daily business operations.",
              outcome: "Nexus transitions seamlessly into your ongoing business assistant on Nexus Cloud to organize follow-ups and messages.",
              img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
            },
          ],
        }
        const scenarios = useCases[activeIndustry] ?? []
        const coverImg = {
          "Restaurants": "/images/industry-restaurants.png",
          "Cafés and coffee shops": "/images/industry-coffee.png",
          "Coffee Shops": "/images/industry-coffee.png",
          "Barbershops and salons": "/images/industry-barbershop.png",
          "Barbershops & Salons": "/images/industry-barbershop.png",
          "Automotive dealerships": "/images/industry-automotive.png",
          "Dealerships": "/images/industry-automotive.png",
          "Marketing agencies": "/images/industry-agency.png",
          "Agencies": "/images/industry-agency.png",
          "Start Your Business — Canada": "/images/industry-founders.png",
        }[activeIndustry] || "/images/industry-restaurants.png"

        return (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
            onClick={() => setActiveIndustry(null)}
          >
            <div
              className="relative w-full sm:max-w-3xl max-h-[92dvh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-[#F5F4F0] shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Cover image header */}
              {coverImg && (
                <div className="relative h-48 overflow-hidden rounded-t-3xl sm:rounded-t-2xl">
                  <img src={coverImg} alt={activeIndustry} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(245,244,240,1) 0%, rgba(245,244,240,0.3) 60%, transparent 100%)" }} />
                  <div className="absolute bottom-4 left-6">
                    <Tag>USE CASES</Tag>
                    <h2 className="mt-2 text-2xl font-light tracking-tight">{activeIndustry}</h2>
                  </div>
                </div>
              )}

              {/* Close button */}
              <button
                onClick={() => setActiveIndustry(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-black/[0.08] text-black/50 hover:text-black transition-colors z-10"
                aria-label="Close modal"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M2 2l10 10M12 2L2 12" />
                </svg>
              </button>

              {/* Scenario cards — side-by-side image + content, alternating left/right */}
              <div className="p-6 space-y-4">
                {scenarios.map((c, i) => {
                  const imgLeft = i % 2 === 0
                  return (
                    <div key={i} className="rounded-xl border border-black/[0.07] bg-white overflow-hidden flex flex-col sm:flex-row shadow-sm">
                      {/* Image — left for even */}
                      {imgLeft && (
                        <div className="w-full sm:w-[35%] shrink-0 overflow-hidden aspect-square border-b sm:border-b-0 sm:border-r border-black/[0.07]">
                          <img src={c.img} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      {/* Content */}
                      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                        <span className="text-[10px] tracking-widest text-black/35 uppercase font-medium">{c.time}</span>
                        <p className="mt-2 text-sm font-light text-black/75 leading-relaxed">{c.scenario}</p>
                        <div className="mt-3 flex gap-2 items-start">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 mt-0.5 shrink-0">
                            <path d="M2 7l3.5 3.5L12 3"/>
                          </svg>
                          <p className="text-sm text-black/60 leading-relaxed">{c.outcome}</p>
                        </div>
                      </div>
                      {/* Image — right for odd */}
                      {!imgLeft && (
                        <div className="w-full sm:w-[35%] shrink-0 overflow-hidden aspect-square border-t sm:border-t-0 sm:border-l border-black/[0.07] order-first sm:order-last">
                          <img src={c.img} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Modal CTA */}
              <div className="px-6 pb-8 pt-2">
                <a
                  href="#contact"
                  onClick={() => setActiveIndustry(null)}
                  className="block w-full py-3.5 bg-[#111] text-white text-[11px] font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-sm"
                >
                  Book a Free Consultation
                </a>
              </div>
            </div>
          </div>
        )
      })()}

      {/* ── SECTION 6: THE SIMPLE PLAN (StoryBrand Part 3) ─────────────────── */}
      <section id="how-it-works" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <PixelIcon type="workflow" size={40} />
            <div className="mt-4"><Tag>THE PLAN</Tag></div>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"A simple 3-step plan."}
            </RevealText>
            <p className="mt-4 text-sm text-black/55 leading-relaxed max-w-lg">
              No complicated software training. Westside Union handles setup with you.
            </p>
          </div>

          {/* 3 Primary steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" onMouseMove={handleMouse}>
            {[
              {
                n: "01",
                title: "Tell us about your business.",
                desc: "We identify one useful, measurable starting workflow that takes repetitive friction off your plate right away.",
                delay: 0,
                icon: (
                  <svg width="44" height="44" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/30">
                    <path d="M10 14a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H24l-8 6v-6h-2a4 4 0 0 1-4-4V14z"/>
                    <path d="M34 30v4a4 4 0 0 0 4 4h2v6l8-6h2a4 4 0 0 0 4-4V22a4 4 0 0 0-4-4h-6" opacity="0.5"/>
                  </svg>
                ),
              },
              {
                n: "02",
                title: "We prepare Nexus around your priorities and existing tools.",
                desc: "Westside Union configures your approved business knowledge, channels, preferences, and approval rules.",
                delay: 80,
                icon: (
                  <svg width="44" height="44" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/30">
                    <circle cx="28" cy="28" r="10"/>
                    <circle cx="28" cy="28" r="4"/>
                    <line x1="28" y1="8" x2="28" y2="14"/>
                    <line x1="28" y1="42" x2="28" y2="48"/>
                    <line x1="8" y1="28" x2="14" y2="28"/>
                    <line x1="42" y1="28" x2="48" y2="28"/>
                  </svg>
                ),
              },
              {
                n: "03",
                title: "Talk to Nexus and keep the work moving.",
                desc: "Message Nexus through WhatsApp, text, or email. Nexus keeps work moving, drafts replies, and reports completed tasks.",
                delay: 160,
                icon: (
                  <svg width="44" height="44" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/30">
                    <rect x="16" y="6" width="24" height="40" rx="4"/>
                    <line x1="24" y1="11" x2="32" y2="11" strokeWidth="2" opacity="0.4"/>
                    <rect x="20" y="18" width="16" height="12" rx="2" opacity="0.5"/>
                  </svg>
                ),
              },
            ].map((step) => (
              <BentoCard key={step.n} className="relative overflow-hidden flex flex-col p-8 min-h-[280px]" delay={step.delay}>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-pixel text-xs text-black/40 tracking-widest">{step.n}</span>
                  {step.icon}
                </div>
                <h3 className="text-lg font-light mb-3 leading-snug">{step.title}</h3>
                <p className="text-sm text-black/50 leading-relaxed">{step.desc}</p>
              </BentoCard>
            ))}
          </div>

          {/* Expandable 5-step operational details disclosure */}
          <details className="mt-8 group border border-black/[0.07] rounded-2xl bg-white p-6 transition-all">
            <summary className="text-sm font-normal text-black/70 cursor-pointer flex items-center justify-between select-none font-sans">
              <span>View detailed 5-step operational setup</span>
              <span className="text-xs text-black/40 group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="mt-6 pt-6 border-t border-black/[0.06] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { n: "01", title: "Business Discovery", desc: "Learn your routines, channels, and priorities." },
                { n: "02", title: "Managed Configuration", desc: "Set up knowledge, connections, and permission rules." },
                { n: "03", title: "Familiar Channel Access", desc: "Operate via WhatsApp, SMS, or email with no app to learn." },
                { n: "04", title: "Approvals & Summaries", desc: "Receive updates and approve sensitive actions." },
                { n: "05", title: "Ongoing Optimization", desc: "Expand capabilities as your business needs grow." },
              ].map((s) => (
                <div key={s.n} className="p-4 rounded-xl bg-black/[0.02]">
                  <span className="font-pixel text-[10px] text-black/30 block mb-1">{s.n}</span>
                  <h4 className="text-xs font-medium text-[#111] mb-1">{s.title}</h4>
                  <p className="text-[11px] text-black/45 leading-normal">{s.desc}</p>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>

      {/* ── SECTION 7: TRANSFORMATION & OUTCOMES (StoryBrand Part 4) ─────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#111] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-white/50 bg-white/10 mb-4 uppercase">
              TRANSFORMATION
            </span>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-[1.05]"
              style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
            >
              Your business runs, even when you sleep.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
              Finish the day knowing what was handled, what is still moving, and what needs your approval. Customers feel heard. Follow-ups stay visible. The work no longer depends on you remembering everything at midnight.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Fewer forgotten follow-ups", desc: "Quotes, callbacks, and inquiries remain tracked until complete." },
              { title: "Faster review responses", desc: "Drafted responses ready for your review to protect your reputation." },
              { title: "More consistent communication", desc: "Customers receive timely, accurate, approved answers." },
              { title: "Ideas turned into assigned work", desc: "Late-night thoughts converted into organized tasks." },
              { title: "More visibility into completed work", desc: "Start each morning with a concise summary of what happened." },
              { title: "Less administrative work at home", desc: "Regain your evenings with routine coordination handled." },
            ].map((outcome, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] space-y-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-light text-white">{outcome.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{outcome.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: CHANNELS & SYSTEMS ─────────────────────────────────── */}
      <section id="channels" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <PixelIcon type="integrations" size={40} />
              <div className="mt-4"><Tag>CHANNELS</Tag></div>
              <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
                {"Works where\nyou already work."}
              </RevealText>
            </div>
            <p className="text-sm text-black/50 leading-relaxed max-w-xs">
              Nexus meets you in the channels you already use. No new apps to install. No training your team on another platform.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-3" onMouseMove={handleMouse}>
            {/* Channel grid */}
            <BentoCard className="col-span-12 lg:col-span-7 p-8" delay={0}>
              <h3 className="text-lg font-light mb-6">Messaging channels</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "WhatsApp", status: "available" as const, desc: "Direct owner and customer messaging" },
                  { name: "SMS / Text", status: "available" as const, desc: "Standard text messaging & reminders" },
                  { name: "Email", status: "available" as const, desc: "Inbox triage and reply drafting" },
                  { name: "Web Messaging", status: "configured" as const, desc: "Embedded chat on your website" },
                  { name: "Telegram", status: "configured" as const, desc: "Where appropriate per deployment" },
                ].map(ch => (
                  <div key={ch.name} className="flex flex-col gap-2 p-4 rounded-xl bg-black/[0.02] border border-black/[0.04]">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-light">{ch.name}</span>
                      <StatusPill status={ch.status} />
                    </div>
                    <span className="text-xs text-black/40">{ch.desc}</span>
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* Business systems */}
            <BentoCard className="col-span-12 lg:col-span-5 p-8" delay={80}>
              <h3 className="text-lg font-light mb-6">Business systems</h3>
              <div className="space-y-4">
                {[
                  { name: "POS Systems", status: "configured" as const, desc: "Sales reporting and inventory knowledge" },
                  { name: "Booking Platforms", status: "configured" as const, desc: "Appointment scheduling handoff" },
                  { name: "Google Business Profile", status: "planned" as const, desc: "Review management and drafting" },
                  { name: "CRM Platforms", status: "configured" as const, desc: "Lead and customer inquiry data" },
                  { name: "Loyalty Programs", status: "planned" as const, desc: "Customer rewards and promotions" },
                ].map(sys => (
                  <div key={sys.name} className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-light">{sys.name}</div>
                      <div className="text-xs text-black/40 mt-0.5">{sys.desc}</div>
                    </div>
                    <StatusPill status={sys.status} />
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-black/35 leading-relaxed">
                Integration availability depends on system API, permissions, and selected plan. Confirmed during discovery.
              </p>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: TRUST & CONTROL ──────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <PixelIcon type="platform" size={40} />
            <div className="mt-4"><Tag>TRUST & CONTROL</Tag></div>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"You stay in control.\nWestside Union handles\nthe complexity."}
            </RevealText>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-sm text-black/55 leading-relaxed">
                Nexus is a managed service, not a do-it-yourself chatbot builder. Westside Union handles configuration, connectivity, and maintenance so you stay focused on your customers.
              </p>

              <div className="space-y-4">
                {[
                  { label: "1. Your business owns its information.", desc: "Business data, conversations, customer knowledge, and records belong entirely to you." },
                  { label: "2. Important actions wait for approval.", desc: "Sensitive, high-risk, public, or promotional actions pause for your sign-off before sending." },
                  { label: "3. You can see what was requested and completed.", desc: "Every task and customer interaction is logged with transparent activity history." },
                  { label: "4. Usage limits help prevent surprise bills.", desc: "Clear usage visibility and spending alerts protect your budget." },
                  { label: "5. Westside Union monitors and maintains the agreed system.", desc: "We manage updates, connectivity health, and ongoing optimizations." },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 p-3.5 rounded-xl bg-[#FAF9F5] border border-black/[0.04]">
                    <div className="w-1 bg-emerald-500 rounded-full shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-[#111] mb-0.5">{item.label}</h3>
                      <p className="text-xs text-black/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demonstration activity log */}
            <BentoCard className="p-6 lg:row-span-1" delay={0}>
              <div className="text-xs text-black/35 tracking-widest uppercase mb-4">Activity log preview</div>
              <div className="space-y-2">
                {[
                  { time: "09:34", action: "Daily owner summary delivered", status: "done" },
                  { time: "09:31", action: "Approval requested — review response draft", status: "pending" },
                  { time: "09:20", action: "Customer inquiry triaged & FAQ answered", status: "done" },
                  { time: "09:12", action: "Follow-up reminder queued for staff", status: "done" },
                  { time: "08:45", action: "Appointment confirmation sent", status: "done" },
                  { time: "08:07", action: "Slow-period insight & promo suggested", status: "done" },
                ].map((log, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-black/[0.02] hover:bg-black/[0.04] transition-colors border border-black/[0.04]"
                  >
                    <span className="text-[10px] text-black/30 font-mono min-w-[40px]">{log.time}</span>
                    <span className="text-[11px] text-black/60 font-light flex-1">{log.action}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${log.status === "done" ? "bg-emerald-500" : "bg-amber-400"} shrink-0`} />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[10px] text-black/30 leading-relaxed">
                Demonstration log. Real activity history is private to each business and accessible only to authorized team members.
              </p>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── SECTION 10: PROOF — PIVO & NEXUS LIVE ──────────────────────────── */}
      <section id="proof" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Pivo Proof Section */}
          <div className="rounded-2xl border border-black/[0.08] bg-white p-8 sm:p-12 shadow-sm">
            <div className="max-w-3xl space-y-4">
              <span className="px-2.5 py-1 rounded-full text-[10px] tracking-widest bg-[#111] text-white uppercase font-sans">
                FLAGSHIP VERTICAL PROOF
              </span>
              <h2
                className="text-3xl sm:text-4xl font-light text-[#111] tracking-tight leading-[1.1]"
                style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
              >
                Built to prove business outcomes, not just generate answers.
              </h2>
              <p className="text-sm sm:text-base text-black/70 leading-relaxed font-light">
                Pivo applies the Nexus approach to plumbing and trades businesses by helping recover missed opportunities, follow up with inquiries, and show owners the jobs and revenue influenced by the system.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: "Missed inquiries captured", sub: "Pilot measurement" },
                { label: "Follow-ups completed", sub: "Pilot measurement" },
                { label: "Bookings recovered", sub: "Pilot measurement" },
                { label: "Response time", sub: "Pilot measurement" },
                { label: "Estimated revenue influenced", sub: "Pilot measurement" },
                { label: "Human approvals required", sub: "Pilot measurement" },
              ].map((metric, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#F5F4F0] border border-black/[0.04] flex flex-col justify-between">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mb-3" />
                  <div>
                    <h4 className="text-xs font-medium text-[#111] leading-snug">{metric.label}</h4>
                    <span className="text-[10px] text-black/40 mt-1 block">{metric.sub}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-black/35">
              ⚑ Measurements reflect active pilot criteria. Verified results are shared after business discovery.
            </p>
          </div>

          {/* Nexus Live Operational Proof Preview */}
          <div>
            <div className="mb-10">
              <Tag>NEXUS LIVE — CONCEPT PREVIEW</Tag>
              <h3 className="mt-3 text-2xl sm:text-3xl font-light text-[#111] tracking-tight">
                See what Nexus is doing for the business.
              </h3>
              <p className="mt-2 text-sm text-black/50 max-w-xl">
                A privacy-safe operational view showing completed tasks, approvals, time returned, and system health without exposing customer conversations or sensitive information.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3" onMouseMove={handleMouse}>
              {[
                { label: "Work completed", value: "247 tasks", sub: "this month (demo)" },
                { label: "Work awaiting approval", value: "3 items", sub: "owner review queue" },
                { label: "Time returned to owner", value: "~14 hrs", sub: "estimated monthly" },
                { label: "Opportunities followed up", value: "18 leads", sub: "demonstration" },
                { label: "Usage & spending status", value: "On budget", sub: "within alert limits" },
                { label: "System health", value: "100%", sub: "monitored & active" },
              ].map((metric, i) => (
                <BentoCard key={metric.label} className="p-5 flex flex-col" delay={i * 40}>
                  <div className="text-xl font-light text-[#111] mb-1">{metric.value}</div>
                  <div className="text-[11px] text-black/60 font-medium leading-snug">{metric.label}</div>
                  <div className="text-[10px] text-black/35 mt-1">{metric.sub}</div>
                </BentoCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 11: FOR FOUNDERS — START YOUR BUSINESS CANADA ───────────── */}
      <section id="start-your-business" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header Card */}
          <div className="rounded-2xl border border-black/[0.08] bg-white p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <span className="px-2.5 py-1 rounded-full text-[10px] tracking-widest bg-[#111] text-white uppercase font-sans">
                FOR NEW CANADIAN FOUNDERS
              </span>
              <h2
                className="text-3xl sm:text-4xl font-light text-[#111] tracking-tight leading-[1.1]"
                style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
              >
                Starting a business in Canada? Begin with a clear path.
              </h2>
              <p className="text-sm sm:text-base text-black/70 leading-relaxed font-light">
                Launching a business comes with a dizzying checklist—registrations, business numbers, bank accounts, bookkeeping setups, and communication tools. Nexus organizes your launch roadmap, references official Canadian resources, coordinates warm handoffs to trusted professionals, and stays on as your managed business assistant after opening day.
              </p>
              <div className="p-3.5 rounded-xl bg-[#F5F4F0] border border-black/[0.05]">
                <p className="text-xs text-black/55 leading-relaxed">
                  <strong className="font-medium text-black/80">Professional boundary:</strong> Nexus provides operational guidance, launch coordination, and initial tool setup. It does not provide legal, accounting, tax, immigration, or regulated filing advice. We coordinate referrals to qualified Canadian professionals for regulated counsel.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
              <a
                href="#contact"
                className="px-6 py-3.5 bg-[#111] text-white text-[11px] font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-sm"
              >
                Book a Founder Consultation
              </a>
              <a
                href="https://www.canada.ca/en/services/business/start.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-black/15 text-black/70 text-[11px] rounded-xl hover:border-black/30 hover:text-black hover:bg-black/[0.02] transition-all duration-200 tracking-widest text-center uppercase"
              >
                Govt. of Canada — Starting a Business ↗
              </a>
            </div>
          </div>

          {/* 4 Launch Pillars Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" onMouseMove={handleMouse}>
            {[
              {
                step: "01",
                title: "Discovery & Launch Roadmap",
                desc: "Map your province, structure, and startup milestones into a personalized checklist referencing official Canadian government guidelines.",
                tag: "Planning",
                delay: 0,
              },
              {
                step: "02",
                title: "Operating Toolkit Setup",
                desc: "Organize domain, business email, invoicing, booking, and customer messaging channels before opening day.",
                tag: "Setup",
                delay: 60,
              },
              {
                step: "03",
                title: "Professional Handoffs",
                desc: "Warm referrals to verified Canadian accountants, business lawyers, and commercial banking partners when you need regulated counsel.",
                tag: "Referrals",
                delay: 120,
              },
              {
                step: "04",
                title: "Post-Launch Continuity",
                desc: "Seamlessly transition into an ongoing Nexus Cloud subscription to manage customer inquiries, follow-ups, and review drafts from day one.",
                tag: "Ongoing",
                delay: 180,
              },
            ].map((pillar) => (
              <BentoCard key={pillar.step} className="p-6 flex flex-col justify-between" delay={pillar.delay}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-black/30 tracking-widest">{pillar.step}</span>
                    <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full bg-black/[0.04] text-black/50">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-light text-[#111] mb-2">{pillar.title}</h3>
                  <p className="text-xs text-black/55 leading-relaxed">{pillar.desc}</p>
                </div>
              </BentoCard>
            ))}
          </div>

          {/* Detailed Milestone Accordion */}
          <details className="group border border-black/[0.07] rounded-2xl bg-white p-6 shadow-sm">
            <summary className="text-xs font-medium text-black/70 cursor-pointer flex items-center justify-between select-none font-sans">
              <span>View full Canada founder launch checklist & referral framework</span>
              <span className="text-[10px] text-black/40 group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="mt-4 pt-4 border-t border-black/[0.06] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { label: "Founder discovery & scoping", desc: "Identify industry, operating model, province requirements, and risk factors." },
                { label: "Structure decision clarity", desc: "Sole proprietorship, partnership, or federal/provincial incorporation considerations." },
                { label: "Official registration checklists", desc: "Step-by-step guidance referencing Canada.ca, Corporations Canada, and provincial registries." },
                { label: "Banking & financial setup", desc: "Checklist for business bank accounts, GST/HST accounts, and initial bookkeeping systems." },
                { label: "First-customer workflow", desc: "Configure customer inquiry channels, automated intake, and quote follow-ups." },
                { label: "Ongoing business assistant", desc: "Transition directly to Nexus Cloud ($99/mo) to keep administrative work off your plate." },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#F5F4F0] border border-black/[0.03]">
                  <h4 className="text-xs font-medium text-[#111] mb-1">{item.label}</h4>
                  <p className="text-[11px] text-black/50 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>

      {/* ── SECTION 12: CAPACITY COMPARISON & WAGE BENCHMARKS ─────────────────── */}
      <section id="roi" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <PixelIcon type="pricing" size={40} />
            <div className="mt-4"><Tag>CAPACITY COMPARISON</Tag></div>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"What is repetitive work\ncosting your business?"}
            </RevealText>
            <p className="mt-4 text-sm text-black/50 leading-relaxed max-w-lg">
              Nexus is not a replacement for human judgment or customer care. It helps absorb repetitive coordination, drafting, monitoring, and follow-up work that consumes owner and staff time.
            </p>
          </div>

          {/* Toronto wage benchmarks table */}
          <div className="mb-12 overflow-x-auto">
            <div className="text-xs text-black/40 tracking-widest uppercase mb-4">
              Toronto wage benchmarks — Government of Canada Job Bank (median wages, 2026)
            </div>
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-black/[0.08]">
                  <th className="text-left py-3 pr-6 text-xs tracking-widest text-black/40 font-normal">Repetitive work</th>
                  <th className="text-right py-3 pr-6 text-xs tracking-widest text-black/40 font-normal">Benchmark</th>
                  <th className="text-right py-3 pr-6 text-xs tracking-widest text-black/40 font-normal">Hrs/mo</th>
                  <th className="text-right py-3 pr-6 text-xs tracking-widest text-black/40 font-normal">Wage-only value</th>
                  <th className="text-left py-3 text-xs tracking-widest text-black/40 font-normal">How Nexus helps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                {WAGE_TABLE.map((row, i) => (
                  <tr key={i} className={row.total ? "border-t-2 border-black/[0.08]" : ""}>
                    <td className={`py-3 pr-6 ${row.total ? "font-medium text-black/80" : "text-black/60"}`}>{row.work}</td>
                    <td className={`py-3 pr-6 text-right whitespace-nowrap ${row.total ? "text-black/40" : "text-black/40"}`}>{row.benchmark}</td>
                    <td className={`py-3 pr-6 text-right tabular-nums ${row.total ? "text-black/80 font-medium" : "text-black/40"}`}>{row.hours}</td>
                    <td className={`py-3 pr-6 text-right whitespace-nowrap tabular-nums ${row.total ? "text-black/80 font-medium" : "text-black/60"}`}>{row.value}</td>
                    <td className="py-3 text-black/40 text-xs">{row.help}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-black/35 leading-relaxed">
              Base wage benchmarks only. Actual employer cost may include statutory deductions, training, equipment, and supervision.{" "}
              <a href="https://www.jobbank.gc.ca/" target="_blank" rel="noopener noreferrer" className="underline hover:text-black/60 transition-colors">
                Source: Government of Canada Job Bank ↗
              </a>
            </p>
          </div>

          {/* Conservative scenario + interactive calculator */}
          <div id="calculator" className="rounded-2xl border border-black/[0.07] bg-white p-8">
            <div className="text-xs text-black/40 tracking-widest uppercase mb-8">Interactive capacity calculator</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">
                    REPETITIVE HOURS PER WEEK: <span className="text-black/80">{roi.hoursPerWeek}h</span>
                  </label>
                  <input
                    type="range" name="hoursPerWeek" min={1} max={60}
                    value={roi.hoursPerWeek} onChange={handleRoiChange}
                    className="w-full accent-black h-1.5 rounded-full"
                    aria-label="Repetitive hours per week"
                  />
                  <div className="flex justify-between text-[10px] text-black/30 mt-1"><span>1h</span><span>60h</span></div>
                </div>

                <div>
                  <label htmlFor="roi-role" className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">HOURLY ROLE BENCHMARK</label>
                  <select
                    id="roi-role" name="hourlyRole" value={roi.hourlyRole} onChange={handleRoiChange}
                    className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-black/25 transition-colors"
                  >
                    <option value="receptionist">Receptionist — CAD $20.00/hr (Job Bank, Toronto)</option>
                    <option value="administrative">Administrative assistant — CAD $26.50/hr (Job Bank, Toronto)</option>
                    <option value="marketing">Social media coordinator — CAD $37.50/hr (Job Bank, Toronto)</option>
                    <option value="custom">Custom hourly rate</option>
                  </select>
                </div>

                {roi.hourlyRole === "custom" && (
                  <div>
                    <label htmlFor="roi-rate" className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">CUSTOM HOURLY RATE (CAD $)</label>
                    <input
                      id="roi-rate" type="number" name="customRate" min={1} max={500} step={0.5}
                      value={roi.customRate} onChange={handleRoiChange}
                      className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-black/25 transition-colors"
                      aria-label="Custom hourly rate"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">
                    EXPECTED WORKLOAD OFFSET: <span className="text-black/80">{roi.offsetPercent}%</span>
                  </label>
                  <input
                    type="range" name="offsetPercent" min={0} max={100}
                    value={roi.offsetPercent} onChange={handleRoiChange}
                    className="w-full accent-black h-1.5 rounded-full"
                    aria-label="Workload offset percentage"
                  />
                  <div className="flex justify-between text-[10px] text-black/30 mt-1"><span>0%</span><span>100%</span></div>
                </div>

                <div>
                  <label htmlFor="roi-plan" className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">NEXUS PLAN</label>
                  <select
                    id="roi-plan" name="plan" value={roi.plan} onChange={handleRoiChange}
                    className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-black/25 transition-colors"
                  >
                    <option value="cloud">Nexus Cloud — CAD $99/mo (CAD $299 onboarding)</option>
                    <option value="edge">Nexus Edge — From CAD $299/mo</option>
                    <option value="custom">Nexus Custom — Custom deployment (from CAD $799/mo)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="roi-opps" className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">RECOVERED OPPS / MO</label>
                    <input
                      id="roi-opps" type="number" name="recoveredOpportunities" min={0} max={999}
                      value={roi.recoveredOpportunities} onChange={handleRoiChange}
                      className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-black/25 transition-colors"
                      aria-label="Recovered opportunities per month"
                    />
                  </div>
                  <div>
                    <label htmlFor="roi-contrib" className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">VALUE / OPP (CAD $)</label>
                    <input
                      id="roi-contrib" type="number" name="contributionValue" min={0} max={99999}
                      value={roi.contributionValue} onChange={handleRoiChange}
                      className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-black/25 transition-colors"
                      aria-label="Contribution value per opportunity"
                    />
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="sticky top-24">
                <div className="rounded-2xl border border-black/[0.07] bg-[#fafaf8] p-6 space-y-4">
                  <div className="text-xs text-black/40 tracking-widest uppercase">Result</div>

                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-4 text-sm">
                      <span className="text-black/50 leading-snug">Monthly work value ({roi.hoursPerWeek}h × 52/12 × CAD ${roiHourlyRate.toFixed(2)})</span>
                      <span className="tabular-nums text-black/80 font-medium shrink-0">CAD ${roiMonthlyWorkValue.toFixed(0)}</span>
                    </div>
                    <div className="flex items-start justify-between gap-4 text-sm">
                      <span className="text-black/50 leading-snug">Estimated offset ({roi.offsetPercent}%)</span>
                      <span className="tabular-nums text-black/80 font-medium shrink-0">CAD ${roiOffsetValue.toFixed(0)}</span>
                    </div>
                    {roiRecoveredContribution > 0 && (
                      <div className="flex items-start justify-between gap-4 text-sm">
                        <span className="text-black/50 leading-snug">Recovered value ({roi.recoveredOpportunities} × CAD ${roi.contributionValue})</span>
                        <span className="tabular-nums text-black/80 font-medium shrink-0">CAD ${roiRecoveredContribution.toFixed(0)}</span>
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-4 text-sm border-t border-black/[0.06] pt-2.5">
                      <span className="text-black/50 leading-snug">
                        {roiPlanData.name} — CAD ${roiPlanData.monthly}/mo
                        {roiSetupAmortized > 0 && ` + CAD $${roiSetupAmortized.toFixed(0)} setup`}
                      </span>
                      <span className="tabular-nums text-black/80 font-medium shrink-0">−CAD ${roiNexusCost.toFixed(0)}</span>
                    </div>
                  </div>

                  <div className={`rounded-xl p-4 ${roiDiff >= 0 ? "bg-emerald-50 border border-emerald-100" : "bg-amber-50 border border-amber-100"}`}>
                    <div className={`text-[10px] tracking-widest uppercase mb-1 ${roiDiff >= 0 ? "text-emerald-700 font-medium" : "text-amber-700 font-medium"}`}>
                      Illustrative capacity difference
                    </div>
                    <div className={`text-3xl font-light tabular-nums ${roiDiff >= 0 ? "text-emerald-800" : "text-amber-800"}`}>
                      {roiDiff >= 0 ? "+" : ""}CAD ${roiDiff.toFixed(0)}<span className="text-base font-light">/mo</span>
                    </div>
                    <div className="text-xs text-black/35 tabular-nums mt-0.5">
                      ≈ USD ${Math.round(roiDiff * USD_RATE).toLocaleString()}/mo (approx.)
                    </div>
                    {roiDiff < 0 && (
                      <p className="mt-2 text-xs text-amber-700 leading-relaxed">
                        At this workload, the estimated cost exceeds the offset. Consider starting with Nexus Cloud ($99/mo) or booking a free consultation to find the right scope.
                      </p>
                    )}
                  </div>

                  <p className="text-[10px] text-black/35 leading-relaxed">
                    This is an illustrative workload comparison, not a guaranteed saving. It assumes Nexus successfully offsets the entered hours. Excludes connected AI-provider usage, third-party messaging, and work Nexus cannot perform.
                  </p>

                  <a
                    href="#contact"
                    className="block w-full py-3.5 bg-[#111] text-white text-[11px] font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-sm"
                  >
                    Book a Free Consultation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 12: PACKAGES (3 Primary Offers) ─────────────────────────── */}
      <section id="pricing" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 flex flex-col items-center">
            <PixelIcon type="pricing" size={40} />
            <div className="mt-4"><Tag>PACKAGES</Tag></div>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Simple, transparent\npackages."}
            </RevealText>
            <p className="mt-4 text-sm text-black/50 max-w-md">
              Start small with managed cloud assistance, keep data on-site with a dedicated appliance, or plan a custom multi-location deployment.
            </p>

            {/* Currency & Annual toggles */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {/* Billing toggle */}
              <div className="inline-flex items-center rounded-full border border-black/10 p-0.5 gap-0.5 bg-white">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-4 py-1.5 rounded-full text-[11px] tracking-widest transition-all duration-200 ${
                    billingCycle === "monthly" ? "bg-[#111] text-white" : "text-black/50 hover:text-black"
                  }`}
                >
                  MONTHLY
                </button>
                <button
                  onClick={() => setBillingCycle("annual")}
                  className={`px-4 py-1.5 rounded-full text-[11px] tracking-widest transition-all duration-200 ${
                    billingCycle === "annual" ? "bg-[#111] text-white" : "text-black/50 hover:text-black"
                  }`}
                >
                  ANNUAL (SAVE 20%)
                </button>
              </div>

              {/* Currency toggle */}
              <div className="inline-flex items-center rounded-full border border-black/10 p-0.5 gap-0.5 bg-white">
                <button
                  onClick={() => setCurrency("CAD")}
                  className={`px-4 py-1.5 rounded-full text-[11px] tracking-widest transition-all duration-200 ${
                    currency === "CAD" ? "bg-[#111] text-white" : "text-black/50 hover:text-black"
                  }`}
                >
                  CAD
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  className={`px-4 py-1.5 rounded-full text-[11px] tracking-widest transition-all duration-200 ${
                    currency === "USD" ? "bg-[#111] text-white" : "text-black/50 hover:text-black"
                  }`}
                >
                  USD
                </button>
              </div>
            </div>
            {currency === "USD" && (
              <p className="mt-2 text-[10px] text-black/35">
                USD amounts are approximate (1 CAD ≈ {USD_RATE} USD). Invoices are issued in CAD.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" onMouseMove={handleMouse}>
            {/* 1. Nexus Cloud */}
            <BentoCard className="p-8 flex flex-col justify-between" delay={0}>
              <div>
                <div className="font-pixel text-[11px] tracking-widest text-black/40 mb-3">NEXUS CLOUD</div>
                
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-light">
                    {currency === "CAD"
                      ? (billingCycle === "annual" ? "CAD $79" : "CAD $99")
                      : `USD $${Math.round((billingCycle === "annual" ? 79 : 99) * USD_RATE)}`}
                  </span>
                  <span className="text-black/40 text-sm">/month</span>
                </div>
                
                {billingCycle === "annual" && (
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 inline-block mb-1">
                    CAD $79/mo when billed annually
                  </span>
                )}
                
                <p className="text-[10px] text-black/40 tracking-wide mb-3">
                  {currency === "CAD" ? "One-time onboarding: CAD $299" : `One-time onboarding: USD $${Math.round(299 * USD_RATE)}`}
                </p>

                <div className="p-3 rounded-xl bg-black/[0.02] border border-black/[0.04] mb-6">
                  <p className="text-xs text-black/70 italic leading-snug">
                    &ldquo;I need dependable help, but I want to start small.&rdquo;
                  </p>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {[
                    "One Nexus business assistant",
                    "One familiar messaging channel",
                    "Business knowledge and preferences setup",
                    "Ideas, reminders, and assigned work organized in one place",
                    "Help preparing review replies, posts, follow-ups, and routine communications",
                    "Daily or weekly business summaries",
                    "A clear view of work waiting, in progress, and completed",
                    "Usage visibility and spending alerts",
                    "Platform updates, monitoring, and standard support",
                    "Connect your own supported AI-provider business account",
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-black/60 leading-snug">
                      <div className="w-1 h-1 rounded-full bg-black/30 mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-[10px] text-black/40 leading-relaxed border-t border-black/[0.05] pt-3 mb-6">
                  AI-provider usage is paid directly through your connected provider account, so you retain visibility and control over that spending.
                </p>
              </div>

              <a
                href="#contact"
                className="block w-full py-3.5 bg-[#111] text-white text-[11px] font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-sm"
              >
                Start with a Consultation
              </a>
            </BentoCard>

            {/* 2. Nexus Edge */}
            <BentoCard className="p-8 flex flex-col justify-between border-black/20 bg-[#F0EEE8]" delay={80}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-pixel text-[11px] tracking-widest text-black/50">NEXUS EDGE</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] tracking-widest bg-emerald-700 text-white font-sans">
                    ON-SITE PRIVACY
                  </span>
                </div>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-light">
                    {currency === "CAD" ? "From CAD $299" : `From USD $${Math.round(299 * USD_RATE)}`}
                  </span>
                  <span className="text-black/40 text-sm">/month</span>
                </div>
                
                <p className="text-[10px] text-black/40 tracking-wide mb-3">
                  Appliance setup priced according to selected configuration
                </p>

                <div className="p-3 rounded-xl bg-white/70 border border-black/[0.06] mb-6">
                  <p className="text-xs text-black/70 italic leading-snug">
                    &ldquo;I want more privacy and more predictable AI spending.&rdquo;
                  </p>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {[
                    "Everything in Nexus Cloud",
                    "A managed Nexus appliance for the business",
                    "More approved business information and routine work kept on-site",
                    "Reduced dependence on paid cloud AI",
                    "Private business knowledge",
                    "Managed backups and recovery",
                    "Secure remote monitoring and maintenance",
                    "Optional cloud assistance for more difficult work",
                    "Additional business-tool connections",
                    "Priority support",
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-black/70 leading-snug">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-[10px] text-black/40 leading-relaxed border-t border-black/[0.05] pt-3 mb-6">
                  Appliance configuration and local deployment specs are confirmed during business discovery.
                </p>
              </div>

              <a
                href="#contact"
                className="block w-full py-3.5 bg-[#111] text-white text-[11px] font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-sm"
              >
                Discuss Nexus Edge
              </a>
            </BentoCard>

            {/* 3. Nexus Custom */}
            <BentoCard className="p-8 flex flex-col justify-between" delay={160}>
              <div>
                <div className="font-pixel text-[11px] tracking-widest text-black/40 mb-3">NEXUS CUSTOM</div>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-light">Custom</span>
                </div>
                
                <p className="text-[10px] text-black/40 tracking-wide mb-3">
                  Managed plans generally start from CAD $799/month
                </p>

                <div className="p-3 rounded-xl bg-black/[0.02] border border-black/[0.04] mb-6">
                  <p className="text-xs text-black/70 italic leading-snug">
                    &ldquo;Our business has unique systems, locations, or workflows.&rdquo;
                  </p>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {[
                    "Multiple locations, teams, or departments",
                    "Tailored business workflows",
                    "POS, CRM, inventory, booking, and internal-system connections",
                    "Specialized assistants presented through one Nexus experience",
                    "Advanced permissions and approval rules",
                    "Private cloud, on-site, or hybrid options",
                    "Tailored reporting and operational insights",
                    "Voice-assistant options where appropriate",
                    "Dedicated onboarding and priority support",
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-black/60 leading-snug">
                      <div className="w-1 h-1 rounded-full bg-black/30 mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-[10px] text-black/40 leading-relaxed border-t border-black/[0.05] pt-3 mb-6">
                  Final scope and pricing are confirmed after a business workflow consultation.
                </p>
              </div>

              <a
                href="#contact"
                className="block w-full py-3.5 border border-black/15 text-black/70 text-[11px] font-medium rounded-xl hover:border-black/30 hover:text-black hover:bg-black/[0.03] transition-all duration-200 tracking-widest text-center uppercase"
              >
                Plan a Custom Solution
              </a>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── SECTION 13: FAQ (13 Required Questions) ─────────────────────────── */}
      <section id="faq" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <Tag>FAQ</Tag>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Frequently asked\nquestions."}
            </RevealText>
          </div>

          <div className="space-y-0 divide-y divide-black/[0.06]">
            {[
              {
                q: "1. What is Project Nexus?",
                a: "Project Nexus is a managed AI assistant for your business, built and operated by Westside Union. It organizes your follow-ups, reviews, customer inquiries, and routine tasks through the messaging tools you already use, keeping work moving forward with human oversight and clear summaries.",
              },
              {
                q: "2. Does Nexus replace my staff?",
                a: "No. Nexus is designed to support you and your existing team, not replace employees. It absorbs repetitive coordination, draft preparation, reminder tracking, and after-hours triage so you and your team can focus on serving customers, doing skilled work, and running the business.",
              },
              {
                q: "3. How do I talk to Nexus?",
                a: "You and your team communicate with Nexus through familiar messaging channels like WhatsApp, SMS/text, or email. There is no complicated new software to train your team on—you message Nexus just like you would a trusted assistant.",
              },
              {
                q: "4. Can Nexus work with tools I already use?",
                a: "Yes. Depending on your package and setup, Nexus can connect with your existing messaging channels, calendar, email, booking platforms, POS systems, and CRMs. Westside Union handles the technical integration and configuration for you.",
              },
              {
                q: "5. What is the difference between Cloud and Edge?",
                a: "Nexus Cloud runs securely in the cloud, allowing you to get started quickly with one primary messaging channel and connect your own supported AI-provider business account. Nexus Edge adds a dedicated on-site appliance for businesses that want more privacy, more business knowledge stored locally, reduced dependence on cloud AI, and more predictable long-term spending.",
              },
              {
                q: "6. Do I need a ChatGPT subscription?",
                a: "No, a standard consumer subscription (such as ChatGPT Plus or Gemini Advanced) is not used. For Nexus Cloud, you connect a supported provider API account or business project (such as OpenAI API or Anthropic Console), which allows direct control and transparent per-use billing for your AI usage.",
              },
              {
                q: "7. Who pays for AI usage?",
                a: "With Nexus Cloud, you connect your own supported AI-provider API account, so provider usage is billed directly to you with complete spending visibility and customizable budget limits. With Nexus Edge, routine workloads are processed on your local appliance to minimize cloud AI costs.",
              },
              {
                q: "8. Can Nexus send customer messages automatically?",
                a: "For routine, approved FAQs and acknowledgements, Nexus can reply according to your pre-approved rules. For high-impact, sensitive, promotional, or public communications (such as review replies or special offers), Nexus prepares drafts that pause for your approval before anything is sent.",
              },
              {
                q: "9. Is my business information private?",
                a: "Yes. Your business knowledge, customer conversations, and operational history belong entirely to you. Your data is isolated, protected by strict access controls, and never used to train public AI models.",
              },
              {
                q: "10. What happens if I need a custom connection?",
                a: "With Nexus Custom, Westside Union can build custom connectors for specialized POS systems, proprietary databases, ERPs, multi-location setups, or custom industry workflows after a thorough business discovery session.",
              },
              {
                q: "11. Can I upgrade from Cloud to Edge or Custom?",
                a: "Absolutely. You can start with Nexus Cloud to address an immediate bottleneck and easily transition to Nexus Edge or a Custom multi-location deployment as your business and operational needs expand.",
              },
              {
                q: "12. Is the dashboard available now?",
                a: "Currently, Nexus is operated primarily through familiar messaging channels with daily summaries and email updates managed by Westside Union. An interactive web control center is in active development and previewed to pilot customers; full self-service dashboard capabilities will roll out in upcoming releases.",
              },
              {
                q: "13. Who manages the technical configuration?",
                a: "Westside Union handles all advanced technical configuration, model connectivity, prompt engineering, connector setup, security monitoring, and platform updates so you never have to deal with technical complexity.",
              },
            ].map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 14: CONSULTATION FORM / CONTACT ─────────────────────────── */}
      <section id="contact" className="relative py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] overflow-hidden">
        <img
          src="/images/footer.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-full object-cover object-bottom pointer-events-none select-none"
          style={{ opacity: 0.85 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            maskImage: "linear-gradient(to top, transparent 0%, black 55%)",
            WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 55%)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgb(245,244,240) 0%, rgba(245,244,240,0.92) 18%, rgba(245,244,240,0.55) 35%, transparent 55%)",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] mb-4"
              style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
            >
              Show us the work<br />that keeps following<br />you home.
            </h2>
            <p className="text-sm text-black/60 max-w-lg mx-auto leading-relaxed">
              We will identify the first few tasks Nexus may be able to take off your plate and recommend a practical starting point. If the numbers or workflow do not support Nexus, we will say so.
            </p>
          </div>

          {formState === "submitted" ? (
            <div className="text-center">
              <div className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl border border-emerald-600/20 bg-emerald-50 text-emerald-800 shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-sm font-light">Thank you — we will be in touch within one business day for your free workflow review.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-black/[0.07] p-8 space-y-5 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">YOUR NAME *</label>
                  <input id="name" name="name" type="text" required value={form.name} onChange={handleFormChange}
                    placeholder="Jane Doe"
                    className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/30 focus:outline-none focus:border-black/25 transition-colors" />
                </div>
                <div>
                  <label htmlFor="business" className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">BUSINESS NAME *</label>
                  <input id="business" name="business" type="text" required value={form.business} onChange={handleFormChange}
                    placeholder="Acme Cafe"
                    className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/30 focus:outline-none focus:border-black/25 transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">EMAIL *</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handleFormChange}
                    placeholder="jane@example.com"
                    className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/30 focus:outline-none focus:border-black/25 transition-colors" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">PHONE (OPTIONAL)</label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleFormChange}
                    placeholder="(416) 555-0123"
                    className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/30 focus:outline-none focus:border-black/25 transition-colors" />
                </div>
              </div>

              <div>
                <label htmlFor="industry" className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">INDUSTRY *</label>
                <select id="industry" name="industry" required value={form.industry} onChange={handleFormChange}
                  className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-black/25 transition-colors">
                  <option value="">Select industry</option>
                  <option>Restaurant</option>
                  <option>Barbershop / Salon</option>
                  <option>Coffee Shop / Café</option>
                  <option>Automotive / Dealership</option>
                  <option>Marketing / Agency</option>
                  <option>Trades / Plumbing / Home Services</option>
                  <option>Clinic / Professional Office</option>
                  <option>Start Your Business — Canada</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="problem" className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">WHAT WORK KEEPS FOLLOWING YOU HOME?</label>
                <textarea id="problem" name="problem" rows={3} value={form.problem} onChange={handleFormChange}
                  placeholder="Describe the tasks, messages, reviews, or follow-ups that take time away from running your business..."
                  className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/30 focus:outline-none focus:border-black/25 transition-colors resize-none" />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={handleFormChange}
                  className="mt-0.5 w-4 h-4 rounded border-black/20 accent-black"
                />
                <label htmlFor="consent" className="text-xs text-black/50 leading-relaxed">
                  I agree to be contacted by Westside Union regarding Project Nexus. My information will not be shared with third parties. *
                </label>
              </div>

              {formError && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={formState === "loading"}
                className="w-full py-4 bg-[#111] text-white text-xs sm:text-sm rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase font-medium disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              >
                {formState === "loading" ? "SENDING…" : "Book a Free Consultation"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="py-10 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="flex items-center gap-3">
              <img
                src="/nexus-logo.png"
                alt="Nexus logo"
                className="w-9 h-9 object-contain"
                style={{ imageRendering: "auto" }}
              />
              <span className="font-pixel text-xs tracking-[0.25em] text-black/70">NEXUS</span>
            </span>
            <p className="text-[10px] text-black/30 tracking-widest mt-1 pl-12">A Westside Union product</p>
          </div>

          {/* Nav sections */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {[
              { label: "How It Helps", href: "#how-it-helps" },
              { label: "Industries", href: "#industries" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "Pricing", href: "#pricing" },
              { label: "For Founders", href: "#start-your-business" },
              { label: "FAQ", href: "#faq" },
              { label: "Contact", href: "#contact" },
            ].map(l => (
              <a key={l.label} href={l.href} className="text-xs text-black/40 hover:text-black transition-colors tracking-widest">{l.label}</a>
            ))}
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-6">
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ].map(l => (
              <a key={l.label} href={l.href} className="text-xs text-black/30 hover:text-black/70 transition-colors tracking-widest">{l.label}</a>
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-black/[0.04]">
          <span className="text-xs text-black/30">© 2026 Westside Union. Project Nexus is a Westside Union product. All rights reserved.</span>
        </div>
      </footer>

      {/* ── BACK TO TOP ──────────────────────────────────────────────────────── */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-50 p-3 rounded-full bg-black hover:bg-black/80 text-white shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer ${showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}
        aria-label="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </button>
    </div>
  )
}

// ─── FAQ accordion item ────────────────────────────────────────────────────────
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="py-5">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center justify-between w-full text-left gap-4 group cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-sm font-light text-[#111] group-hover:text-black/70 transition-colors">{question}</span>
        <span
          className="text-black/30 text-lg font-light shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >+</span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "400px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p className="mt-3 text-sm text-black/55 leading-relaxed pr-8">{answer}</p>
      </div>
    </div>
  )
}

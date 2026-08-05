"use client"

import React, { useRef, useEffect, useState } from "react"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { MobileNav } from "@/components/mobile-nav"

// ─── Centralized content data ────────────────────────────────────────────────

// Toronto wage benchmarks — Government of Canada Job Bank (verified July 2026)
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

const PLAN_DATA: Record<string, { name: string; monthly: number; setup: number; setupLabel: string }> = {
  cloud: { name: "Nexus Cloud", monthly: 299, setup: 500, setupLabel: "From CAD $500" },
  managed: { name: "Nexus Managed", monthly: 499, setup: 1000, setupLabel: "From CAD $1,000" },
  edge: { name: "Nexus Edge", monthly: 599, setup: 0, setupLabel: "Quoted after discovery" },
}

// USD exchange rate — approximate, for illustrative display only. Rates vary.
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
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/40 bg-black/[0.04]">
      {children}
    </span>
  )
}

// ─── Status pill ──────────────────────────────────────────────────────────────
function StatusPill({ status }: { status: "available" | "configured" | "planned" }) {
  const styles = {
    available: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    configured: "bg-amber-50 text-amber-700 border-amber-200/60",
    planned: "bg-black/[0.03] text-black/35 border-black/[0.06]",
  }
  const labels = {
    available: "Available",
    configured: "Configured per deployment",
    planned: "Planned",
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] tracking-widest border ${styles[status]}`}>
      <span className={`w-1 h-1 rounded-full ${status === "available" ? "bg-emerald-500" : status === "configured" ? "bg-amber-500" : "bg-black/20"}`} />
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
    plan: "managed" as "cloud" | "managed" | "edge",
    setupMonths: 12,
    recoveredOpportunities: 0,
    contributionValue: 0,
    variableCosts: 0,
  })

  // ── ROI derived calculations ──
  const roiHourlyRate = roi.hourlyRole === "custom" ? roi.customRate : (HOURLY_RATES[roi.hourlyRole] ?? 26.5)
  const roiMonthlyWorkValue = roi.hoursPerWeek * 52 / 12 * roiHourlyRate
  const roiOffsetValue = roiMonthlyWorkValue * (roi.offsetPercent / 100)
  const roiPlanData = PLAN_DATA[roi.plan]
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
    const { name, value, type } = e.target
    setRoi(prev => ({
      ...prev,
      [name]: type === "range" || type === "number" ? Number(value)
        : name === "setupMonths" ? Number(value)
        : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.consent || !form.email || !form.name) return
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
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased">

      {/* ── STICKY NAV ────────────────────────────────────────────────────── */}
      <MobileNav />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-end overflow-hidden pt-28 pb-12 px-6 md:px-12 lg:px-20">

        {/* Video background — retained per client direction; rights confirmation required before public launch */}
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
        <div className="absolute top-24 right-6 md:right-12 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-black/[0.08] shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] tracking-widest text-black/60 uppercase font-sans">Now accepting pilot businesses</span>
        </div>

        {/* Hero content card — overlay treatment for WCAG AA readability */}
        <div className="relative z-30 max-w-3xl my-auto pt-16">
          <div className="p-6 sm:p-10 rounded-2xl bg-[#F5F4F0]/80 backdrop-blur-md border border-black/[0.07] shadow-xl">

            {/* Eyebrow */}
            <span className="text-[11px] tracking-[0.2em] text-black/60 uppercase mb-4 block font-sans font-medium">
              FOR BUSINESS OWNERS WHO CANNOT BE EVERYWHERE AT ONCE
            </span>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-light text-[#111] leading-[1.08] tracking-tight mb-6"
              style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
            >
              Your customers keep reaching out - even when you are busy running the business.
            </h1>

            {/* Supporting copy */}
            <p className="text-sm sm:text-base text-black/70 leading-relaxed max-w-2xl mb-8">
              Reviews wait. Messages pile up. Follow-ups get buried. New opportunities quietly disappear. Nexus helps keep everyday work moving through WhatsApp, text, and email, so your customers feel heard and fewer opportunities slip away.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <div>
                <a
                  href="#contact"
                  className="inline-block px-6 py-3.5 bg-[#111] text-white text-[11px] font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase text-center"
                >
                  SHOW US WHAT STEALS YOUR TIME
                </a>
                <span className="block text-[11px] text-black/50 mt-1.5 tracking-wide">
                  Book a free business workflow review.
                </span>
              </div>
              <a
                href="#industries"
                className="px-6 py-3.5 border border-black/20 text-black/80 text-[11px] font-medium rounded-xl hover:border-black/40 hover:text-black hover:bg-black/[0.04] transition-all duration-200 tracking-widest uppercase self-start sm:self-auto"
              >
                SEE YOUR INDUSTRY
              </a>
            </div>

            {/* Trust line */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-black/[0.08]">
              {[
                { label: "Works where you already communicate" },
                { label: "Important actions wait for your approval" },
                { label: "See what was completed" },
                { label: "Predictable monthly costs" },
              ].map((stat, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                  <div className="text-xs text-black/75 font-normal leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: THE RECOGNIZABLE OWNER PROBLEM ─────────────────────── */}
      <section id="how-it-helps" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Tag>THE REALITY</Tag>
            <h2
              className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light text-[#111] tracking-tight leading-[1.1]"
              style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
            >
              Your business can be busy and still lose the next customer.
            </h2>
          </div>

          <div className="p-8 sm:p-12 rounded-2xl border border-black/[0.07] bg-white shadow-sm space-y-6">
            <p className="text-base sm:text-lg text-black/75 leading-relaxed font-light">
              A customer sends a message, but nobody sees it. A review waits a week for a response. A catering, booking, or sales enquiry gets buried. Tomorrow&apos;s promotion never gets posted. None of this happens because you do not care. It happens because you are already doing too much.
            </p>

            <div className="p-6 rounded-xl bg-[#F5F4F0] border-l-4 border-black/70">
              <p className="text-sm sm:text-base text-black/80 font-medium leading-relaxed">
                You should not have to choose between serving the customer in front of you and staying responsive to the customer reaching out online.
              </p>
            </div>
          </div>

          {/* Quick problem → outcome cards */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" onMouseMove={handleMouse}>
            {[
              { from: "Messages waiting while you serve guests", to: "Instant approved replies", delay: 0 },
              { from: "Unanswered online reviews", to: "Drafted responses ready to review", delay: 60 },
              { from: "Forgotten callbacks & quotes", to: "Tracked follow-up reminders", delay: 120 },
              { from: "Late night administrative anxiety", to: "Clear morning owner summaries", delay: 180 },
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

      {/* ── SECTION 4: TRANSFORMATION SECTION ───────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#111] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-white/50 bg-white/10 mb-4">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Timely approved replies", desc: "Customers receive accurate, helpful answers without waiting." },
              { title: "Visible follow-ups", desc: "Pending quotes, callbacks, and inquiries stay tracked until complete." },
              { title: "Daily owner summary", desc: "Start each morning with a concise summary of what was completed." },
              { title: "Human approval preserved", desc: "Sensitive, high-risk, or public actions pause for your approval." },
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

      {/* ── ONE ASSISTANT, MANY JOBS (bento) ───────────────────────────────── */}
      <section id="platform" className="py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <PixelIcon type="platform" size={40} />
            <div className="mt-4"><Tag>THE ASSISTANT</Tag></div>
            <RevealText className="mt-5 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05]">
              {"One assistant,\nmany jobs."}
            </RevealText>
            <p className="mt-4 text-sm text-black/45 leading-relaxed max-w-lg">
              You communicate with one Nexus identity. Nexus may use different tools behind the scenes, but you have one conversation, one history, and one support relationship.
            </p>
          </div>

          <div className="grid grid-cols-12 grid-rows-auto gap-3" onMouseMove={handleMouse}>
            {/* Wide feature card */}
            <BentoCard className="col-span-12 p-8 min-h-[200px] flex flex-col justify-between relative overflow-hidden" delay={0}>
              <img
                src="/images/arc.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "center 70%" }}
              />
              {/* Progressive blur layer */}
              <div className="absolute inset-0" style={{
                maskImage: "linear-gradient(to bottom, transparent 45%, black 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 45%, black 100%)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }} />
              {/* Fade-to-background gradient */}
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
                <p className="text-sm text-black/45 leading-relaxed max-w-sm">
                  Message Nexus just like you would a trusted assistant. It knows your business, your tasks, your preferences — and gets smarter over time.
                </p>
              </div>
            </BentoCard>

            {/* Job cards */}
            {[
              { icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />, title: "Add and monitor tasks", desc: "Tell Nexus what needs doing. It tracks, reminds, and flags overdue items.", delay: 0 },
              { icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10h8M8 14h5" /></>, title: "Prepare daily summaries", desc: "Start each day with a clear picture of what happened and what needs attention.", delay: 80 },
              { icon: <><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></>, title: "Draft customer responses", desc: "Nexus prepares replies for your review. You approve before anything is sent.", delay: 160 },
            ].map((job, i) => (
              <BentoCard key={i} className="col-span-12 md:col-span-4 p-8 min-h-[200px]" delay={job.delay}>
                <div className="w-10 h-10 rounded-xl border border-black/10 flex items-center justify-center mb-5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{job.icon}</svg>
                </div>
                <h3 className="text-lg font-light mb-2">{job.title}</h3>
                <p className="text-sm text-black/45 leading-relaxed">{job.desc}</p>
              </BentoCard>
            ))}

            {[
              { icon: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>, title: "Review business trends", desc: "Slow periods, unusual activity, and patterns — surfaced before they become problems.", delay: 0 },
              { icon: <><path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></>, title: "Suggest promotions", desc: "\"Wednesday afternoons have been slow. Would you like a promotion drafted?\"", delay: 80 },
              { icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>, title: "Remind and follow up", desc: "Unfinished work, pending callbacks, and pending quotes — nothing gets forgotten.", delay: 160 },
            ].map((job, i) => (
              <BentoCard key={i} className="col-span-12 md:col-span-4 p-8 min-h-[200px]" delay={job.delay}>
                <div className="w-10 h-10 rounded-xl border border-black/10 flex items-center justify-center mb-5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{job.icon}</svg>
                </div>
                <h3 className="text-lg font-light mb-2">{job.title}</h3>
                <p className="text-sm text-black/45 leading-relaxed">{job.desc}</p>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ─────────────────────────────────────────────────────── */}
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
            <p className="text-sm text-black/45 leading-relaxed max-w-xs">
              Every industry has its own repetitive work. Nexus is configured around your specific workflows, not a generic chatbot template.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" onMouseMove={handleMouse}>
            {[
              {
                industry: "Restaurants",
                problem: "A full dining room should not mean online enquiries go unanswered.",
                ready: ["Menu & hours knowledge", "Inquiry triage", "Review response drafts", "Daily owner summary", "Promotion drafts"],
                img: "/images/industry-restaurants.png",
                delay: 0,
              },
              {
                industry: "Barbershops & Salons",
                problem: "An unanswered booking question can become an empty chair.",
                ready: ["Booking system handoff", "Appointment confirmation", "Review response drafts", "Hiring & complaint intake", "Daily summary"],
                img: "/images/industry-barbershop.png",
                delay: 80,
              },
              {
                industry: "Coffee Shops",
                problem: "The morning rush should not cost you the catering enquiry in your inbox.",
                ready: ["Hours, menu & allergen knowledge", "Catering intake", "Review response drafts", "Shift task templates", "Slow-period suggestions"],
                img: "/images/industry-coffee.png",
                delay: 160,
              },
              {
                industry: "Dealerships",
                problem: "Every delayed response gives a buyer time to call another dealership.",
                ready: ["Sales & service inquiry triage", "Callback capture", "Inventory FAQ knowledge", "Follow-up reminders", "Manager summaries"],
                img: "/images/industry-automotive.png",
                delay: 0,
              },
              {
                industry: "Agencies",
                problem: "Client reporting should not consume your team's best hours.",
                ready: ["Client onboarding checklists", "Meeting & action summaries", "Draft reports", "Follow-up tracking", "Pipeline summary"],
                img: "/images/industry-agency.png",
                delay: 80,
              },
              {
                industry: "Trades",
                problem: "A missed call can become somebody else's job.",
                ready: ["Inquiry capture", "Job intake questions", "Quote follow-up", "Scheduling handoff", "Daily callback summary"],
                img: "/images/industry-trades.png",
                delay: 160,
              },
              {
                industry: "New Founders",
                problem: "Starting a business is difficult enough without chasing every step alone.",
                ready: ["Discovery and planning", "Registration coordination", "Professional referrals", "Launch checklist", "90-day operating plan"],
                img: "/images/industry-founders.png",
                delay: 240,
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
                  {/* Fade to white at bottom so it blends into card body */}
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
                  <h3 className="text-xl font-light mb-3">{item.industry}</h3>
                  <p className="text-sm text-black/45 leading-relaxed mb-6">{item.problem}</p>
                  <ul className="space-y-2 flex-1">
                    {item.ready.map(r => (
                      <li key={r} className="flex items-center gap-3 text-xs text-black/50">
                        <div className="w-1 h-1 rounded-full bg-black/25 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-black/[0.05]">
                    {"isFounderCard" in item && item.isFounderCard ? (
                      <a
                        href="#start-your-business"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/50 bg-black/[0.04] hover:bg-black/[0.08] hover:text-black/70 transition-all duration-200"
                      >
                        EXPLORE THIS PATH
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 5h6M5 2l3 3-3 3"/>
                        </svg>
                      </a>
                    ) : (
                      <button
                        onClick={() => setActiveIndustry(item.industry)}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/50 bg-black/[0.04] hover:bg-black/[0.08] hover:text-black/70 transition-all duration-200 cursor-pointer"
                      >
                        SEE USE CASES
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 5h6M5 2l3 3-3 3"/>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRY LIGHTBOX ─────────────────────────────────────────────────── */}
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
          "Barbershops & Salons": [
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
          "Coffee Shops": [
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
              scenario: "A customer calls to ask about a specific model's towing capacity.",
              outcome: "Your team is with a customer. Nexus handles the SMS follow-up with the exact spec from your inventory knowledge.",
              img: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
            },
          ],
          "Agencies": [
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
          "Trades": [
            {
              time: "7:30 PM — evening",
              scenario: "A homeowner texts asking for a quote on a full bathroom renovation.",
              outcome: "Nexus collects job details, confirms their availability, and queues the lead for your morning callback — nothing slips.",
              img: "/images/scenario-trades.png",
            },
            {
              time: "Thursday morning",
              scenario: "You sent out 8 quotes last week. None have been followed up.",
              outcome: "Nexus surfaces all 8, drafts a polite check-in for each, and groups them by age for your review.",
              img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
            },
            {
              time: "Friday afternoon — site job",
              scenario: "A customer calls your mobile while you're on site. You can't answer.",
              outcome: "Nexus sends an automatic SMS: \"We're on a job right now — can we call you back within the hour?\"",
              img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
            },
          ],
        }
        const industry = useCases[activeIndustry] ?? []
        const coverImg = {
          "Restaurants": "/images/industry-restaurants.png",
          "Barbershops & Salons": "/images/industry-barbershop.png",
          "Coffee Shops": "/images/industry-coffee.png",
          "Dealerships": "/images/industry-automotive.png",
          "Agencies": "/images/industry-agency.png",
          "Trades": "/images/industry-trades.png",
        }[activeIndustry]
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
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M2 2l10 10M12 2L2 12" />
                </svg>
              </button>

              {/* Scenario cards — side-by-side image + content, alternating left/right */}
              <div className="p-6 space-y-4">
                {industry.map((c, i) => {
                  const imgLeft = i % 2 === 0
                  return (
                    <div key={i} className="rounded-xl border border-black/[0.07] bg-white overflow-hidden flex flex-col sm:flex-row">
                      {/* Image — left for even, right for odd */}
                      {imgLeft && (
                        <div className="w-full sm:w-[35%] shrink-0 overflow-hidden aspect-square border-b sm:border-b-0 sm:border-r border-black/[0.07]">
                          <img src={c.img} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      {/* Content */}
                      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                        <span className="text-[10px] tracking-widest text-black/35 uppercase">{c.time}</span>
                        <p className="mt-2 text-sm font-light text-black/70 leading-relaxed">{c.scenario}</p>
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

              {/* Footer CTA */}
              <div className="px-6 pb-8 pt-2">
                <a
                  href="#contact"
                  onClick={() => setActiveIndustry(null)}
                  className="block w-full py-3 bg-[#111] text-white text-[11px] rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center"
                >
                  BOOK MY FREE WORKFLOW REVIEW
                </a>
              </div>
            </div>
          </div>
        )
      })()}

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <PixelIcon type="workflow" size={40} />
            <div className="mt-4"><Tag>HOW IT WORKS</Tag></div>
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
                title: "Show us what keeps stealing your time.",
                desc: "We identify one useful, measurable starting workflow that will save you time right away.",
                delay: 0,
                icon: (
                  <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/30">
                    <path d="M10 14a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H24l-8 6v-6h-2a4 4 0 0 1-4-4V14z"/>
                    <path d="M34 30v4a4 4 0 0 0 4 4h2v6l8-6h2a4 4 0 0 0 4-4V22a4 4 0 0 0-4-4h-6" opacity="0.5"/>
                  </svg>
                ),
              },
              {
                n: "02",
                title: "We configure Nexus around your business.",
                desc: "Westside Union prepares the knowledge, channels, rules, and approved connections.",
                delay: 80,
                icon: (
                  <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/30">
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
                title: "Keep running your business.",
                desc: "Nexus helps keep agreed work moving through familiar channels and reports what was completed or needs attention.",
                delay: 160,
                icon: (
                  <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/30">
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

          {/* Accessible disclosure for detailed 5-step setup */}
          <details className="mt-8 group border border-black/[0.07] rounded-2xl bg-white p-6 transition-all">
            <summary className="text-sm font-normal text-black/70 cursor-pointer flex items-center justify-between select-none font-sans">
              <span>View detailed 5-step operational setup</span>
              <span className="text-xs text-black/40 group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="mt-6 pt-6 border-t border-black/[0.06] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { n: "01", title: "Business Discovery", desc: "Learn your routines, channels, and work patterns." },
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

      {/* ── WORKS WHERE YOU ALREADY WORK ──────────────────────────────────── */}
      <section id="integrations" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <PixelIcon type="integrations" size={40} />
              <div className="mt-4"><Tag>CHANNELS</Tag></div>
              <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
                {"Works where\nyou already work."}
              </RevealText>
            </div>
            <p className="text-sm text-black/45 leading-relaxed max-w-xs">
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
                  { name: "SMS / Text", status: "available" as const, desc: "Standard text messaging" },
                  { name: "Email", status: "available" as const, desc: "Inbox triage and reply drafting" },
                  { name: "Web Messaging", status: "configured" as const, desc: "Embedded chat on your site" },
                  { name: "Telegram", status: "configured" as const, desc: "Where appropriate per deployment" },
                ].map(ch => (
                  <div key={ch.name} className="flex flex-col gap-2 p-4 rounded-xl bg-black/[0.02] border border-black/[0.04]">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-light">{ch.name}</span>
                      <StatusPill status={ch.status} />
                    </div>
                    <span className="text-xs text-black/35">{ch.desc}</span>
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* Business systems */}
            <BentoCard className="col-span-12 lg:col-span-5 p-8" delay={80}>
              <h3 className="text-lg font-light mb-6">Business systems</h3>
              <div className="space-y-4">
                {[
                  { name: "POS Systems", status: "configured" as const, desc: "Sales reporting and inventory data" },
                  { name: "Booking Platforms", status: "configured" as const, desc: "Appointment scheduling handoff" },
                  { name: "Google Business Profile", status: "planned" as const, desc: "Review management and publishing" },
                  { name: "CRM", status: "configured" as const, desc: "Lead and customer data" },
                  { name: "Loyalty Programs", status: "planned" as const, desc: "Customer loyalty and rewards" },
                ].map(sys => (
                  <div key={sys.name} className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-light">{sys.name}</div>
                      <div className="text-xs text-black/35 mt-0.5">{sys.desc}</div>
                    </div>
                    <StatusPill status={sys.status} />
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-black/30 leading-relaxed">
                Integration availability depends on system API, permissions, and plan. Confirmed during discovery.
              </p>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── PROACTIVE ASSISTANCE ──────────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <PixelIcon type="agents" size={40} />
              <div className="mt-4"><Tag>PROACTIVE</Tag></div>
              <RevealText className="mt-5 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05]">
                {"Nexus doesn't\nonly wait for\ninstructions."}
              </RevealText>
              <p className="mt-6 text-base text-black/40 leading-relaxed max-w-sm">
                Approved data and schedules can generate owner notifications, so you hear about problems before they become crises — not after.
              </p>
              <p className="mt-4 text-xs text-black/30 leading-relaxed max-w-sm">
                Proactive actions depend on connected systems and owner-approved rules.
              </p>
            </div>
            <div className="relative space-y-3">
              {[
                { time: "08:07", msg: "Wednesday afternoons have been slower than usual. Would you like a promotion drafted?", type: "insight" },
                { time: "09:15", msg: "Three customer inquiries still need a response.", type: "alert" },
                { time: "09:30", msg: "Tomorrow's appointments include two customers who haven't confirmed.", type: "reminder" },
                { time: "10:00", msg: "Your weekly owner summary is ready.", type: "summary" },
              ].map((notif, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-white border border-black/[0.06] hover:border-black/[0.12] transition-colors"
                  style={{ animation: `fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms both` }}
                >
                  <span className="text-[10px] text-black/25 font-mono min-w-[40px] mt-0.5">{notif.time}</span>
                  <span className="text-sm text-black/60 font-light leading-snug flex-1">{notif.msg}</span>
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${notif.type === "alert" ? "bg-amber-400" : notif.type === "insight" ? "bg-blue-400" : "bg-emerald-400"}`} />
                </div>
              ))}
              <style>{`
                @keyframes fadeInUp {
                  from { opacity: 0; transform: translateY(8px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST & CONTROL ────────────────────────────────────────────────── */}
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
            {/* Left side */}
            <div className="space-y-6">
              <p className="text-sm text-black/45 leading-relaxed">
                Nexus is a managed service, not a do-it-yourself chatbot builder. Westside Union handles model, routing, and technical configuration so you stay in control of your business.
              </p>

              <div className="space-y-4">
                {[
                  { label: "1. Your business owns its information.", desc: "Business data, conversations, memories, and audit records belong to you." },
                  { label: "2. Important actions wait for approval.", desc: "Sensitive, high-risk, or public-facing actions pause for your sign-off before sending." },
                  { label: "3. You can see what was requested and completed.", desc: "Every task and interaction is logged in clear activity history." },
                  { label: "4. Usage limits help prevent surprise bills.", desc: "Clear monthly usage allowances and alerts protect your budget." },
                  { label: "5. Westside Union monitors and maintains the agreed system.", desc: "We handle updates, integration health, and configuration maintenance." },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 p-3 rounded-xl bg-[#FAF9F5] border border-black/[0.04]">
                    <div className="w-1 bg-emerald-500 rounded-full shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-[#111] mb-0.5">{item.label}</h3>
                      <p className="text-xs text-black/45">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <details className="mt-4 group border border-black/[0.07] rounded-xl bg-white p-4">
                <summary className="text-xs font-medium text-black/60 cursor-pointer flex items-center justify-between select-none font-sans">
                  <span>For technical teams & enterprise buyers</span>
                  <span className="text-[10px] text-black/40 group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <div className="mt-3 pt-3 border-t border-black/[0.06] space-y-2 text-xs text-black/50">
                  <p>• <strong>Runtime portability:</strong> Agent portability is a product requirement. Memory and schemas are exportable.</p>
                  <p>• <strong>Tested fallback:</strong> If a primary route fails, Nexus falls back safely without broadening permissions.</p>
                  <p>• <strong>Control plane governance:</strong> Neutral control plane architecture isolating customer data environments.</p>
                </div>
              </details>
            </div>

            {/* Right side — activity log */}
            <BentoCard className="p-6 lg:row-span-1" delay={0}>
              <div className="text-xs text-black/30 tracking-widest uppercase mb-4">Activity history</div>
              <div className="space-y-2">
                {[
                  { time: "09:34", action: "Summary delivered to owner", status: "done" },
                  { time: "09:31", action: "Approval requested — review response", status: "pending" },
                  { time: "09:20", action: "Customer inquiry triaged", status: "done" },
                  { time: "09:12", action: "Follow-up reminder sent", status: "done" },
                  { time: "08:52", action: "Fallback invoked — secondary route used safely", status: "done" },
                  { time: "08:07", action: "Slow-period insight generated", status: "done" },
                ].map((log, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-black/[0.02] hover:bg-black/[0.04] transition-colors border border-black/[0.04] group cursor-pointer"
                  >
                    <span className="text-[10px] text-black/25 font-mono min-w-[40px]">{log.time}</span>
                    <span className="text-[11px] text-black/50 font-light flex-1">{log.action}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${log.status === "done" ? "bg-green-500/60 group-hover:bg-green-500" : "bg-amber-400/60 group-hover:bg-amber-400"} transition-colors`} />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[10px] text-black/25 leading-relaxed">
                Demonstration log. Real activity history is private to each customer and accessible only to authorized users.
              </p>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── MANAGED SERVICE ────────────────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <Tag>WESTSIDE UNION</Tag>
              <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
                {"We handle\nthe complexity."}
              </RevealText>
              <p className="mt-6 text-sm text-black/45 leading-relaxed">
                Nexus is not a self-service product. Westside Union manages every technical layer so you can focus on your business.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" onMouseMove={handleMouse}>
              {[
                { label: "Business discovery & setup", desc: "We learn how your business works before we touch a config." },
                { label: "Tool & channel connections", desc: "We connect your POS, booking, and messaging tools." },
                { label: "Knowledge preparation", desc: "Your hours, menu, policies, and FAQs — trained into Nexus." },
                { label: "Permissions & approval rules", desc: "Defined together. You control what Nexus can act on." },
                { label: "Monitoring & maintenance", desc: "We watch for issues and fix them before you notice." },
                { label: "Usage controls", desc: "Limits, alerts, and budget protection built in." },
                { label: "Ongoing improvements", desc: "Monthly optimisation as your business and tools evolve." },
              ].map((item, i) => (
                <BentoCard key={item.label} className="p-6" delay={i * 60}>
                  <h3 className="text-sm font-light mb-2">{item.label}</h3>
                  <p className="text-xs text-black/40 leading-relaxed">{item.desc}</p>
                </BentoCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ────────────────────────────────────────────────────────── */}
      <section className="py-0 border-t border-black/[0.06] overflow-hidden select-none">
        <div className="flex border-b border-black/[0.06]" style={{ animation: "marqueeLeft 28s linear infinite" }}>
          {[...Array(3)].map((_, rep) => (
            <div key={rep} className="flex shrink-0">
              {["Task Tracking", "Daily Summaries", "Review Responses", "Follow-ups", "Appointment Reminders", "Promotion Drafts", "Inquiry Triage", "Slow-Period Alerts", "Customer Replies", "Supplier Updates"].map((cap) => (
                <div key={cap} className="flex items-center gap-6 px-10 py-5 border-r border-black/[0.06] shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-black/20 shrink-0" />
                  <span className="text-sm text-black/45 whitespace-nowrap tracking-wide">{cap}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex" style={{ animation: "marqueeRight 22s linear infinite" }}>
          {[...Array(3)].map((_, rep) => (
            <div key={rep} className="flex shrink-0">
              {["WhatsApp", "SMS", "Email", "Web Chat", "Business Knowledge", "Owner Notifications", "Approval Workflows", "Usage Limits", "Monthly Reporting", "Managed Setup"].map((cap) => (
                <div key={cap} className="flex items-center gap-6 px-10 py-5 border-r border-black/[0.06] shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-black/[0.12] shrink-0" />
                  <span className="text-sm text-black/30 whitespace-nowrap tracking-wide">{cap}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── START YOUR BUSINESS — CANADA TEASER ──────────────────────────────── */}
      <section id="start-your-business" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-black/[0.08] bg-white p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <span className="px-2.5 py-1 rounded-full text-[10px] tracking-widest bg-[#111] text-white uppercase font-sans">
                For New Canadian Founders
              </span>
              <h2
                className="text-3xl sm:text-4xl font-light text-[#111] tracking-tight leading-[1.1]"
                style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
              >
                Starting a business in Canada? Begin with a clear path.
              </h2>
              <p className="text-sm sm:text-base text-black/65 leading-relaxed font-light">
                Nexus can help organize your launch checklist, official information, professional handoffs, and first operating tools, then remain available as your business assistant after launch.
              </p>
              <div className="p-3.5 rounded-xl bg-[#F5F4F0] border border-black/[0.05]">
                <p className="text-xs text-black/50 leading-relaxed">
                  <strong className="font-medium text-black/70">Professional boundary:</strong> Nexus provides education, checklists, and qualified referrals. It does not provide legal, tax, accounting, immigration, or regulated filing advice.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
              <a
                href="#contact"
                className="px-6 py-3.5 bg-[#111] text-white text-[11px] font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase"
              >
                EXPLORE THE CANADA FOUNDER PATH
              </a>
              <a
                href="https://www.canada.ca/en/services/business/start.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-black/15 text-black/60 text-[11px] rounded-xl hover:border-black/25 hover:text-black hover:bg-black/[0.03] transition-all duration-200 tracking-widest text-center"
              >
                GOVT. OF CANADA — STARTING A BUSINESS ↗
              </a>
            </div>
          </div>

          <details className="mt-6 group border border-black/[0.07] rounded-2xl bg-white p-6">
            <summary className="text-xs font-normal text-black/60 cursor-pointer flex items-center justify-between select-none font-sans">
              <span>View launch checklist & professional referral network details</span>
              <span className="text-[10px] text-black/40 group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="mt-4 pt-4 border-t border-black/[0.06] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { label: "Founder discovery & planning", desc: "Map province, industry, business model, and risk." },
                { label: "Structure decision worksheets", desc: "Common Canadian business structures explained." },
                { label: "Registration coordination", desc: "Checklist using official Canadian government sources." },
                { label: "Business setup checklist", desc: "Domain, banking, bookkeeping, insurance, and operating tools." },
                { label: "Industry launch blueprint", desc: "First intake workflow and 30/60/90-day plan." },
                { label: "Qualified professional referrals", desc: "Warm handoffs to accountants, lawyers, and banks." },
              ].map((item, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-black/[0.02]">
                  <h4 className="text-xs font-medium text-[#111] mb-1">{item.label}</h4>
                  <p className="text-[11px] text-black/45 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>

      {/* ── NEXUS LIVE — OPERATIONAL PREVIEW ───────────────────────────────── */}
      <section id="nexus-live" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <PixelIcon type="agents" size={40} />
            <div className="mt-4"><Tag>NEXUS LIVE — CONCEPT PREVIEW</Tag></div>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"See the work.\nNot just the promise."}
            </RevealText>
            <p className="mt-4 text-sm text-black/45 leading-relaxed max-w-lg">
              A privacy-safe operational view showing what Nexus is doing — tasks completed, human approvals, fallbacks, and outcomes. No customer data, no private prompts, no invented activity.
            </p>
            <p className="mt-2 text-xs text-black/30">
              ⚑ Illustrative system preview. These figures represent a demonstration scenario and are not live data or a guarantee of results.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3" onMouseMove={handleMouse}>
            {[
              { label: "Tasks completed", value: "247", sub: "this month (demo)" },
              { label: "Human approvals", value: "18", sub: "owner reviewed" },
              { label: "Fallbacks invoked", value: "3", sub: "safely rerouted" },
              { label: "Local / cloud mix", value: "61 / 39%", sub: "workload split" },
              { label: "Capacity value est.", value: "~$620", sub: "illustrative" },
              { label: "Opportunities handled", value: "12", sub: "demonstration" },
            ].map((metric, i) => (
              <BentoCard key={metric.label} className="p-5 flex flex-col" delay={i * 40}>
                <div className="text-2xl font-light text-[#111] mb-1">{metric.value}</div>
                <div className="text-[11px] text-black/55 font-light leading-snug">{metric.label}</div>
                <div className="text-[10px] text-black/30 mt-1">{metric.sub}</div>
              </BentoCard>
            ))}
          </div>

          <div className="mt-6 p-5 rounded-2xl border border-black/[0.06] bg-black/[0.02]">
            <div className="flex flex-wrap gap-5 text-xs text-black/40">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block shrink-0" />
                Tasks completed: actions confirmed within approved policy
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block shrink-0" />
                Human approvals: actions paused for owner review before sending
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block shrink-0" />
                Fallbacks: primary route unavailable; secondary route used safely without broadening permissions
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black/20 inline-block shrink-0" />
                Capacity value: illustrative wage-comparison figure using disclosed method
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROI COMPARISON & CALCULATOR ─────────────────────────────────────── */}
      <section id="roi" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <PixelIcon type="pricing" size={40} />
            <div className="mt-4"><Tag>CAPACITY COMPARISON</Tag></div>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"What is repetitive work\ncosting your business?"}
            </RevealText>
            <p className="mt-4 text-sm text-black/45 leading-relaxed max-w-lg">
              Nexus is not a replacement for human judgment or customer care. It helps absorb repetitive coordination, drafting, monitoring, and follow-up work that consumes owner and staff time.
            </p>
          </div>

          {/* Toronto wage benchmarks table */}
          <div className="mb-12 overflow-x-auto">
            <div className="text-xs text-black/35 tracking-widest uppercase mb-4">
              Toronto wage benchmarks — Government of Canada Job Bank (median wages, 2026)
            </div>
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-black/[0.08]">
                  <th className="text-left py-3 pr-6 text-xs tracking-widest text-black/35 font-normal">Repetitive work</th>
                  <th className="text-right py-3 pr-6 text-xs tracking-widest text-black/35 font-normal">Benchmark</th>
                  <th className="text-right py-3 pr-6 text-xs tracking-widest text-black/35 font-normal">Hrs/mo</th>
                  <th className="text-right py-3 pr-6 text-xs tracking-widest text-black/35 font-normal">Wage-only value</th>
                  <th className="text-left py-3 text-xs tracking-widest text-black/35 font-normal">How Nexus helps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                {WAGE_TABLE.map((row, i) => (
                  <tr key={i} className={row.total ? "border-t-2 border-black/[0.08]" : ""}>
                    <td className={`py-3 pr-6 ${row.total ? "font-light text-black/70" : "text-black/55"}`}>{row.work}</td>
                    <td className={`py-3 pr-6 text-right whitespace-nowrap ${row.total ? "text-black/40" : "text-black/35"}`}>{row.benchmark}</td>
                    <td className={`py-3 pr-6 text-right tabular-nums ${row.total ? "text-black/70 font-light" : "text-black/40"}`}>{row.hours}</td>
                    <td className={`py-3 pr-6 text-right whitespace-nowrap tabular-nums ${row.total ? "text-black/70 font-light" : "text-black/55"}`}>{row.value}</td>
                    <td className="py-3 text-black/35 text-xs">{row.help}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-black/30 leading-relaxed">
              Base wage benchmarks only. Actual employer cost may include CPP, EI, vacation, benefits, training, equipment, and supervision.{" "}
              <a href="https://www.jobbank.gc.ca/" target="_blank" rel="noopener noreferrer" className="underline hover:text-black/50 transition-colors">
                Source: Government of Canada Job Bank ↗
              </a>
            </p>
          </div>

          {/* Conservative scenario + calculator intro */}
          <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-3" onMouseMove={handleMouse}>
            <BentoCard className="p-8" delay={0}>
              <div className="text-xs text-black/35 tracking-widest uppercase mb-6">Illustrative conservative scenario</div>
              <div className="space-y-3">
                {[
                  { label: "$1,760 × 75% estimated workload offset", value: "$1,320" },
                  { label: "Nexus Managed plan", value: "−$499" },
                  { label: "$1,000 setup ÷ 12 months", value: "−$83" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-black/[0.05] pb-3">
                    <span className="text-sm text-black/55">{row.label}</span>
                    <span className="text-sm font-light text-[#111] tabular-nums">{row.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-black/70">Illustrative capacity difference</span>
                  <span className="text-xl font-light text-[#111] tabular-nums">~$738/mo</span>
                </div>
              </div>
              <p className="mt-6 text-xs text-black/30 leading-relaxed">
                This is an illustrative workload comparison, not a guaranteed saving. It assumes Nexus successfully offsets the selected workload. It excludes AI overages, messaging, voice, paid integrations, and human review or work Nexus cannot perform.
              </p>
            </BentoCard>

            <BentoCard className="p-8 flex flex-col justify-between" delay={80}>
              <div>
                <div className="text-xs text-black/35 tracking-widest uppercase mb-4">Your situation is unique</div>
                <p className="text-sm text-black/45 leading-relaxed">
                  Use the calculator below to enter your actual hours, team cost, and expected scope. Negative results are shown honestly — if the numbers don&apos;t support the cost, we&apos;ll recommend a smaller starting point or no purchase at all.
                </p>
              </div>
              <a href="#calculator" className="mt-6 inline-flex items-center gap-2 text-sm text-black/55 hover:text-black transition-colors group">
                Try the interactive calculator
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                  <path d="M7 2l5 5-5 5M2 7h10"/>
                </svg>
              </a>
            </BentoCard>
          </div>

          {/* Interactive calculator */}
          <div id="calculator" className="rounded-2xl border border-black/[0.07] bg-white p-8">
            <div className="text-xs text-black/35 tracking-widest uppercase mb-8">Interactive capacity calculator</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] tracking-widest text-black/40 mb-2">
                    REPETITIVE HOURS PER WEEK: <span className="text-black/70">{roi.hoursPerWeek}h</span>
                  </label>
                  <input
                    type="range" name="hoursPerWeek" min={1} max={60}
                    value={roi.hoursPerWeek} onChange={handleRoiChange}
                    className="w-full accent-black h-1.5 rounded-full"
                    aria-label="Repetitive hours per week"
                  />
                  <div className="flex justify-between text-[10px] text-black/25 mt-1"><span>1h</span><span>60h</span></div>
                </div>

                <div>
                  <label htmlFor="roi-role" className="block text-[11px] tracking-widest text-black/40 mb-2">HOURLY ROLE BENCHMARK</label>
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
                    <label htmlFor="roi-rate" className="block text-[11px] tracking-widest text-black/40 mb-2">CUSTOM HOURLY RATE (CAD $)</label>
                    <input
                      id="roi-rate" type="number" name="customRate" min={1} max={500} step={0.5}
                      value={roi.customRate} onChange={handleRoiChange}
                      className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-black/25 transition-colors"
                      aria-label="Custom hourly rate"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] tracking-widest text-black/40 mb-2">
                    EXPECTED WORKLOAD OFFSET: <span className="text-black/70">{roi.offsetPercent}%</span>
                  </label>
                  <input
                    type="range" name="offsetPercent" min={0} max={100}
                    value={roi.offsetPercent} onChange={handleRoiChange}
                    className="w-full accent-black h-1.5 rounded-full"
                    aria-label="Workload offset percentage"
                  />
                  <div className="flex justify-between text-[10px] text-black/25 mt-1"><span>0%</span><span>100%</span></div>
                </div>

                <div>
                  <label htmlFor="roi-plan" className="block text-[11px] tracking-widest text-black/40 mb-2">NEXUS PLAN</label>
                  <select
                    id="roi-plan" name="plan" value={roi.plan} onChange={handleRoiChange}
                    className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-black/25 transition-colors"
                  >
                    <option value="cloud">Nexus Cloud — from CAD $299/mo</option>
                    <option value="managed">Nexus Managed — from CAD $499/mo</option>
                    <option value="edge">Nexus Edge — from CAD $599/mo (setup quoted)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="roi-months" className="block text-[11px] tracking-widest text-black/40 mb-2">SPREAD SETUP FEE OVER</label>
                  <select
                    id="roi-months" name="setupMonths" value={roi.setupMonths} onChange={handleRoiChange}
                    className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-black/25 transition-colors"
                  >
                    <option value={12}>12 months</option>
                    <option value={24}>24 months</option>
                    <option value={36}>36 months</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="roi-opps" className="block text-[11px] tracking-widest text-black/40 mb-2">RECOVERED OPPORTUNITIES / MO</label>
                    <input
                      id="roi-opps" type="number" name="recoveredOpportunities" min={0} max={999}
                      value={roi.recoveredOpportunities} onChange={handleRoiChange}
                      className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-black/25 transition-colors"
                      aria-label="Recovered opportunities per month"
                    />
                  </div>
                  <div>
                    <label htmlFor="roi-contrib" className="block text-[11px] tracking-widest text-black/40 mb-2">CONTRIBUTION VALUE (CAD $)</label>
                    <input
                      id="roi-contrib" type="number" name="contributionValue" min={0} max={99999}
                      value={roi.contributionValue} onChange={handleRoiChange}
                      className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-black/25 transition-colors"
                      aria-label="Contribution value per opportunity"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="roi-var" className="block text-[11px] tracking-widest text-black/40 mb-2">ADDITIONAL MONTHLY COSTS — messaging, voice, integrations (CAD $)</label>
                  <input
                    id="roi-var" type="number" name="variableCosts" min={0} max={9999}
                    value={roi.variableCosts} onChange={handleRoiChange}
                    className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-black/25 transition-colors"
                    aria-label="Additional monthly variable costs"
                  />
                </div>
              </div>

              {/* Results */}
              <div className="sticky top-24">
                <div className="rounded-2xl border border-black/[0.07] bg-[#fafaf8] p-6 space-y-4">
                  <div className="text-xs text-black/35 tracking-widest uppercase">Result</div>

                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-4 text-sm">
                      <span className="text-black/45 leading-snug">Monthly work value ({roi.hoursPerWeek}h × 52/12 × CAD ${roiHourlyRate.toFixed(2)})</span>
                      <span className="tabular-nums text-black/70 shrink-0">CAD ${roiMonthlyWorkValue.toFixed(0)}</span>
                    </div>
                    <div className="flex items-start justify-between gap-4 text-sm">
                      <span className="text-black/45 leading-snug">Estimated offset ({roi.offsetPercent}%)</span>
                      <span className="tabular-nums text-black/70 shrink-0">CAD ${roiOffsetValue.toFixed(0)}</span>
                    </div>
                    {roiRecoveredContribution > 0 && (
                      <div className="flex items-start justify-between gap-4 text-sm">
                        <span className="text-black/45 leading-snug">Recovered contribution ({roi.recoveredOpportunities} × CAD ${roi.contributionValue})</span>
                        <span className="tabular-nums text-black/70 shrink-0">CAD ${roiRecoveredContribution.toFixed(0)}</span>
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-4 text-sm border-t border-black/[0.06] pt-2.5">
                      <span className="text-black/45 leading-snug">
                        {roiPlanData.name} — CAD ${roiPlanData.monthly}/mo
                        {roiSetupAmortized > 0 && ` + CAD $${roiSetupAmortized.toFixed(0)} setup`}
                        {roi.variableCosts > 0 && ` + CAD $${roi.variableCosts} variable`}
                      </span>
                      <span className="tabular-nums text-black/70 shrink-0">−CAD ${roiNexusCost.toFixed(0)}</span>
                    </div>
                  </div>

                  <div className={`rounded-xl p-4 ${roiDiff >= 0 ? "bg-emerald-50 border border-emerald-100" : "bg-amber-50 border border-amber-100"}`}>
                    <div className={`text-[10px] tracking-widest uppercase mb-1 ${roiDiff >= 0 ? "text-emerald-600" : "text-amber-600"}`}>
                      Illustrative capacity difference
                    </div>
                    <div className={`text-3xl font-light tabular-nums ${roiDiff >= 0 ? "text-emerald-700" : "text-amber-700"}`}>
                      {roiDiff >= 0 ? "+" : ""}CAD ${roiDiff.toFixed(0)}<span className="text-base font-light">/mo</span>
                    </div>
                    <div className="text-xs text-black/30 tabular-nums mt-0.5">
                      ≈ USD ${Math.round(roiDiff * USD_RATE).toLocaleString()}/mo (approx.)
                    </div>
                    {roiDiff < 0 && (
                      <p className="mt-2 text-xs text-amber-700 leading-relaxed">
                        At this workload, the estimated cost exceeds the offset. Consider a smaller scope, a longer setup amortization period, or book a fit session to find a better-fit starting package.
                      </p>
                    )}
                  </div>

                  <p className="text-[10px] text-black/30 leading-relaxed">
                    This is an illustrative workload comparison, not a guaranteed saving. It assumes Nexus successfully offsets the entered hours. Excludes AI usage overages, messaging fees, voice, paid integrations, and work Nexus cannot perform. Recovered-opportunity figures require an attribution method. Label: illustrative capacity difference.
                  </p>

                  <a
                    href="#contact"
                    className="block w-full py-3 bg-[#111] text-white text-[11px] rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center"
                  >
                    BOOK MY FREE WORKFLOW REVIEW
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4 flex flex-col items-center">
            <PixelIcon type="pricing" size={40} />
            <div className="mt-4"><Tag>PRICING</Tag></div>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Predictable plans.\nNo token surprises."}
            </RevealText>
            <p className="mt-4 text-sm text-black/40 max-w-md">
              Every plan includes a defined AI usage allowance with alerts and limits. Exact pricing depends on channels, integrations, and workflow complexity — confirmed during discovery.
            </p>
            {/* Currency toggle */}
            <div className="mt-6 inline-flex items-center rounded-full border border-black/10 p-0.5 gap-0.5">
              <button
                onClick={() => setCurrency("CAD")}
                className={`px-4 py-1.5 rounded-full text-[11px] tracking-widest transition-all duration-200 ${
                  currency === "CAD" ? "bg-[#111] text-white" : "text-black/45 hover:text-black/70"
                }`}
              >
                CAD
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-4 py-1.5 rounded-full text-[11px] tracking-widest transition-all duration-200 ${
                  currency === "USD" ? "bg-[#111] text-white" : "text-black/45 hover:text-black/70"
                }`}
              >
                USD
              </button>
            </div>
            {currency === "USD" && (
              <p className="mt-2 text-[10px] text-black/30">
                USD amounts are approximate (1 CAD ≈ {USD_RATE} USD). Invoices are issued in CAD.
              </p>
            )}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3" onMouseMove={handleMouse}>
            {[
              {
                name: "Nexus Cloud",
                price: "CAD $299",
                period: "/month",
                setup: "Setup from CAD $500",
                sub: "Start with one important workflow",
                features: [
                  "One primary messaging channel",
                  "Business knowledge setup",
                  "Core task & summary workflows",
                  "Included AI usage allowance",
                  "Monitoring & managed updates",
                ],
                delay: 0,
              },
              {
                name: "Nexus Managed",
                price: "CAD $499",
                period: "/month",
                setup: "Setup from CAD $1,000",
                sub: "Keep more recurring work moving",
                features: [
                  "Proactive owner notifications",
                  "Expanded task automation",
                  "Additional integrations",
                  "Monthly optimisation",
                  "Higher included usage",
                ],
                highlight: true,
                delay: 80,
              },
              {
                name: "Nexus Edge",
                price: "CAD $599",
                period: "/month",
                setup: "Setup quoted after discovery",
                sub: "Add local privacy and predictable capacity",
                features: [
                  "Local business knowledge",
                  "Selected local workloads",
                  "Cloud fallback when approved",
                  "Remote monitoring & updates",
                  "Hardware replacement policy",
                ],
                delay: 160,
              },
              {
                name: "Nexus Enterprise",
                price: "Custom",
                setup: "Quoted after scoping",
                sub: "Coordinate locations, departments, and stronger controls",
                features: [
                  "Multiple locations & agents",
                  "Advanced permissions",
                  "Custom reporting",
                  "Private infrastructure option",
                  "Dedicated service levels",
                ],
                delay: 240,
              },
            ].map((plan) => (
              <BentoCard
                key={plan.name}
                className={`p-8 flex flex-col ${plan.highlight ? "border-black/20 bg-[#F0EEE8]" : ""}`}
                delay={plan.delay}
              >
                <div className="mb-8">
                  <div className="font-pixel text-[11px] tracking-widest text-black/40 mb-4">{plan.name}</div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-light">
                      {(() => {
                        if (plan.price === "Custom") return "Custom"
                        const cadMatch = plan.price.match(/\d[\d,]*/)
                        if (!cadMatch) return plan.price
                        const cadNum = parseFloat(cadMatch[0].replace(/,/g, ""))
                        if (currency === "USD") return `USD $${Math.round(cadNum * USD_RATE).toLocaleString()}`
                        return plan.price
                      })()}
                    </span>
                    {"period" in plan && plan.period && <span className="text-black/40 text-sm">{plan.period}</span>}
                  </div>
                  <p className="text-[10px] text-black/30 tracking-wide mb-1">
                    {currency === "USD" && plan.setup !== "Setup quoted after discovery" && plan.setup !== "Quoted after scoping"
                      ? plan.setup.replace(/CAD \$(\d[\d,]*)/, (_, n) => `USD $${Math.round(parseFloat(n.replace(/,/g,"")) * USD_RATE).toLocaleString()}`)
                      : plan.setup
                    }
                  </p>
                  <p className="text-xs text-black/45 font-medium tracking-wide">{plan.sub}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-black/55">
                      <div className="w-1 h-1 rounded-full bg-black/25 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`block w-full py-3 rounded-xl text-[11px] tracking-widest text-center transition-all duration-200 uppercase font-medium ${plan.highlight
                    ? "bg-[#111] text-white hover:bg-[#333]"
                    : "border border-black/10 text-black/60 hover:border-black/25 hover:text-black hover:bg-black/[0.04]"
                    }`}
                >
                  BOOK MY FREE WORKFLOW REVIEW
                </a>
              </BentoCard>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-black/30">
            Voice, SMS, paid third-party services, and custom integrations may be billed separately. Usage allowances and limits confirmed during setup.
          </p>
          <p className="mt-2 text-center text-xs text-black/25">
            ⚑ Start Your Business — Canada pricing: not published until professional scope and referral network are approved. Contact us for details.
          </p>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <Tag>FAQ</Tag>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Common\nquestions."}
            </RevealText>
          </div>
          <div className="space-y-0 divide-y divide-black/[0.06]">
            {[
              {
                q: "Is Nexus another chatbot?",
                a: "No. Nexus is a managed business assistant configured around your information, tasks, channels, and approval rules.",
              },
              {
                q: "Do I need to learn a new app?",
                a: "No. Daily use is designed around familiar messaging channels like WhatsApp, SMS, and email. Westside Union handles configuration for you.",
              },
              {
                q: "What can Nexus handle first?",
                a: "We start with one lower-risk, high-value workflow — like answering recurring customer inquiries, drafting review responses, or tracking follow-up reminders.",
              },
              {
                q: "Will important actions happen without my approval?",
                a: "No. High-risk, public-facing, or sensitive actions require your explicit approval before Nexus sends or publishes anything.",
              },
              {
                q: "What will it cost each month?",
                a: "Plans start at CAD $299/mo for Nexus Cloud. Every plan includes a defined usage allowance with clear budget limits and alerts.",
              },
              {
                q: "How quickly can we begin?",
                a: "A basic knowledge-and-messaging workflow can launch quickly after your initial workflow review and discovery process.",
              },
            ].map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>

          <details className="mt-8 group border border-black/[0.07] rounded-2xl bg-white p-6">
            <summary className="text-xs font-normal text-black/60 cursor-pointer flex items-center justify-between select-none font-sans">
              <span>More technical, local-appliance, & founder questions</span>
              <span className="text-[10px] text-black/40 group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="mt-4 pt-4 border-t border-black/[0.06] space-y-0 divide-y divide-black/[0.06]">
              {[
                {
                  q: "Does Nexus replace an employee?",
                  a: "Nexus supports the owner and team by absorbing repetitive work. It does not replace human judgment, hospitality, or skilled service.",
                },
                {
                  q: "Can Nexus run locally?",
                  a: "Yes, Nexus Edge includes a managed local appliance for businesses requiring local privacy or local network access.",
                },
                {
                  q: "Who owns my data? Can I take it with me?",
                  a: "You own your business data, conversations, memories, and audit logs. Agent portability is a core design requirement.",
                },
                {
                  q: "Can Nexus help me start a business in Canada?",
                  a: "Yes, through the Start Your Business — Canada package, providing checklists, launch workflows, and professional referrals.",
                },
              ].map((item, i) => (
                <FaqItem key={i} question={item.q} answer={item.a} />
              ))}
            </div>
          </details>
        </div>
      </section>

      {/* ── FINAL CTA / CONTACT FORM ───────────────────────────────────────── */}
      <section id="contact" className="relative py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] overflow-hidden">
        {/* Background image — local asset, confirm rights before public launch */}
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
            <p className="text-sm text-black/55 max-w-lg mx-auto leading-relaxed">
              We will identify the first few tasks Nexus may be able to take off your plate and recommend a practical starting point. If the numbers or workflow do not support Nexus, we will say so.
            </p>
          </div>

          {formState === "submitted" ? (
            <div className="text-center">
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-emerald-600/20 bg-emerald-50 text-emerald-700">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-light">Thanks — we&apos;ll be in touch within one business day for your workflow review.</span>
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
                  <option>Trades / Home Services</option>
                  <option>Clinic / Professional Office</option>
                  <option>Starting a New Business</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="problem" className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">WHAT WORK KEEPS FOLLOWING YOU HOME?</label>
                <textarea id="problem" name="problem" rows={3} value={form.problem} onChange={handleFormChange}
                  placeholder="Describe the tasks, messages, or follow-ups that consume your evenings..."
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
                className="w-full py-4 bg-[#111] text-white text-xs sm:text-sm rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase font-medium disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formState === "loading" ? "SENDING…" : "BOOK MY FREE WORKFLOW REVIEW"}
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
              { label: "How It Works", href: "#how-it-works" },
              { label: "Industries", href: "#industries" },
              { label: "Start Your Business", href: "#start-your-business" },
              { label: "Pricing", href: "#pricing" },
              { label: "FAQ", href: "#faq" },
              { label: "Contact", href: "#contact" },
            ].map(l => (
              <a key={l.label} href={l.href} className="text-xs text-black/35 hover:text-black/70 transition-colors tracking-widest">{l.label}</a>
            ))}
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-6">
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ].map(l => (
              <a key={l.label} href={l.href} className="text-xs text-black/25 hover:text-black/55 transition-colors tracking-widest">{l.label}</a>
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-black/[0.04]">
          <span className="text-xs text-black/20">© 2026 Westside Union. Project Nexus is a Westside Union product. All rights reserved.</span>
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
        className="flex items-center justify-between w-full text-left gap-4 group"
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
        style={{ maxHeight: open ? "300px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p className="mt-3 text-sm text-black/45 leading-relaxed pr-8">{answer}</p>
      </div>
    </div>
  )
}

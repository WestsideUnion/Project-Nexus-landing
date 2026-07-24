"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { MobileNav } from "@/components/mobile-nav"

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
  const [formState, setFormState] = useState<"idle" | "submitted">("idle")
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: "", business: "", email: "", phone: "", industry: "",
    locations: "", channel: "", problem: "", tools: "", deployment: "", consent: false,
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Phase 1: client-side state only. Server-side validation + anti-spam is Phase 1B.
    if (form.consent && form.email && form.name) {
      console.log("Nexus consultation request:", form)
      setFormState("submitted")
    }
  }

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased">

      {/* ── STICKY NAV ────────────────────────────────────────────────────── */}
      <MobileNav />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative h-screen overflow-hidden">

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
        <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none" style={{ height: "65%", background: "linear-gradient(to top, #F5F4F0 0%, #F5F4F0 18%, rgba(245,244,240,0.85) 35%, rgba(245,244,240,0.5) 55%, rgba(245,244,240,0.15) 75%, transparent 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none" style={{ height: "20%", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", maskImage: "linear-gradient(to top, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none" style={{ height: "38%", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", maskImage: "linear-gradient(to top, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none" style={{ height: "55%", backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)", maskImage: "linear-gradient(to top, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)" }} />

        {/* "Active now" badge — top-right, after hours feel */}
        <div className="absolute top-24 right-6 md:right-12 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-black/[0.06] shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] tracking-widest text-black/50 uppercase">Nexus is working</span>
        </div>

        {/* Spacer so content doesn't sit under the fixed nav */}
        <div className="h-20" />

        {/* Hero content — immediately visible, no gate on animation */}
        <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col px-6 md:px-12 pb-12 max-w-3xl">

          {/* Eyebrow */}
          <span className="text-[11px] tracking-[0.2em] text-black/50 uppercase mb-5 font-sans">
            Like your best hire — without the overhead.
          </span>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-light text-[#111] leading-[1.0] tracking-tight mb-6"
            style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
          >
            Your business runs,<br />even when<br />you don&apos;t.
          </h1>

          {/* Supporting copy */}
          <p className="text-sm text-black/55 leading-relaxed max-w-md mb-8">
            Nexus handles your messages, follow-ups, and routine tasks — through channels you already use. No training. No onboarding. No technical setup. Just tell us how your business works and we configure everything. It answers inquiries at midnight, follows up on quotes while you sleep, and sends you a clean summary in the morning.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href="#contact"
              className="px-6 py-3 bg-[#111] text-white text-[11px] rounded-xl hover:bg-[#333] transition-colors tracking-widest"
            >
              BOOK A CONSULTATION
            </a>
            <a
              href="#how-it-works"
              className="px-6 py-3 border border-black/15 text-black/60 text-[11px] rounded-xl hover:border-black/25 hover:text-black hover:bg-black/[0.03] transition-all duration-200 tracking-widest"
            >
              SEE HOW IT WORKS
            </a>
          </div>

          {/* Trust line */}
          <div className="flex gap-8 sm:gap-12">
            {[
              { value: "No app to learn", label: "Works in WhatsApp, SMS & email" },
              { value: "Always on", label: "After hours, weekends, overnight" },
              { value: "Managed by us", label: "Westside Union handles setup" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-sm text-[#111] font-light tracking-tight" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>{stat.value}</div>
                <div className="text-[10px] text-black/40 tracking-widest uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM → OUTCOME BAND ─────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" onMouseMove={handleMouse}>
            {[
              { from: "Missed messages", to: "Timely replies", delay: 0 },
              { from: "Forgotten follow-ups", to: "Tracked tasks", delay: 80 },
              { from: "Scattered information", to: "One knowledgeable assistant", delay: 160 },
              { from: "Slow days and unusual activity", to: "Proactive suggestions", delay: 240 },
            ].map((item) => (
              <BentoCard key={item.from} className="p-7 flex flex-col gap-4" delay={item.delay}>
                <div className="text-sm text-black/35 leading-snug line-through decoration-black/20">{item.from}</div>
                <div className="text-base font-light text-[#111] leading-snug">{item.to}</div>
                <div className="mt-auto">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black/20">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </div>
              </BentoCard>
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
                problem: "Keep up with inquiries, follow-ups, reviews, and daily operations.",
                ready: ["Menu & hours knowledge", "Inquiry triage", "Review response drafts", "Daily owner summary", "Promotion drafts"],
                img: "/images/industry-restaurants.png",
                delay: 0,
              },
              {
                industry: "Barbershops & Salons",
                problem: "Reduce missed messages and help protect the appointment book.",
                ready: ["Booking system handoff", "Appointment confirmation", "Review response drafts", "Hiring & complaint intake", "Daily summary"],
                img: "/images/industry-barbershop.png",
                delay: 80,
              },
              {
                industry: "Coffee Shops",
                problem: "Stay responsive while your team focuses on service.",
                ready: ["Hours, menu & allergen knowledge", "Catering intake", "Review response drafts", "Shift task templates", "Slow-period suggestions"],
                img: "/images/industry-coffee.png",
                delay: 160,
              },
              {
                industry: "Automotive",
                problem: "Follow up with leads and service requests consistently.",
                ready: ["Sales & service inquiry triage", "Callback capture", "Inventory FAQ knowledge", "Follow-up reminders", "Manager summaries"],
                img: "/images/industry-automotive.png",
                delay: 0,
              },
              {
                industry: "Agencies",
                problem: "Reduce reporting, follow-up, and administrative work.",
                ready: ["Client onboarding checklists", "Meeting & action summaries", "Draft reports", "Follow-up tracking", "Pipeline summary"],
                img: "/images/industry-agency.png",
                delay: 80,
              },
              {
                industry: "Trades",
                problem: "Capture inquiries and keep quotes and callbacks moving.",
                ready: ["Inquiry capture", "Job intake questions", "Quote follow-up", "Scheduling handoff", "Daily callback summary"],
                img: "/images/industry-trades.png",
                delay: 160,
              },
            ].map((item) => (
              <BentoCard key={item.industry} className="flex flex-col overflow-hidden" delay={item.delay}>
                {/* Cover photo */}
                <div className="relative h-48 shrink-0 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.industry}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Fade to white at bottom so it blends into card body */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.6) 75%, rgb(255,255,255) 100%)",
                    }}
                  />
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
                    <button
                      onClick={() => setActiveIndustry(item.industry)}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/50 bg-black/[0.04] hover:bg-black/[0.08] hover:text-black/70 transition-all duration-200 cursor-pointer"
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
          "Automotive": [
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
          "Automotive": "/images/industry-automotive.png",
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
                  BOOK A CONSULTATION
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
              {"From discovery\nto working assistant."}
            </RevealText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3" onMouseMove={handleMouse}>
            {[
              {
                n: "01",
                title: "Tell us how your business operates.",
                desc: "We learn your routines, channels, and the work that keeps following you home.",
                delay: 0,
                icon: (
                  /* Conversation / discovery — two speech bubbles */
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/25">
                    <path d="M10 14a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H24l-8 6v-6h-2a4 4 0 0 1-4-4V14z"/>
                    <path d="M34 30v4a4 4 0 0 0 4 4h2v6l8-6h2a4 4 0 0 0 4-4V22a4 4 0 0 0-4-4h-6" opacity="0.5"/>
                    <line x1="18" y1="20" x2="30" y2="20" opacity="0.6"/>
                    <line x1="18" y1="25" x2="26" y2="25" opacity="0.6"/>
                  </svg>
                ),
              },
              {
                n: "02",
                title: "Westside Union configures your assistant.",
                desc: "We handle setup, connections, knowledge preparation, and permission rules.",
                delay: 80,
                icon: (
                  /* Wrench + settings cog — managed configuration */
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/25">
                    <circle cx="28" cy="28" r="10"/>
                    <circle cx="28" cy="28" r="4"/>
                    <line x1="28" y1="8" x2="28" y2="14"/>
                    <line x1="28" y1="42" x2="28" y2="48"/>
                    <line x1="8" y1="28" x2="14" y2="28"/>
                    <line x1="42" y1="28" x2="48" y2="28"/>
                    <line x1="14.1" y1="14.1" x2="18.3" y2="18.3"/>
                    <line x1="37.7" y1="37.7" x2="41.9" y2="41.9"/>
                    <line x1="41.9" y1="14.1" x2="37.7" y2="18.3"/>
                    <line x1="18.3" y1="37.7" x2="14.1" y2="41.9"/>
                  </svg>
                ),
              },
              {
                n: "03",
                title: "Use Nexus in a familiar channel.",
                desc: "WhatsApp, SMS, or email. No new app to learn. No onboarding certification.",
                delay: 140,
                icon: (
                  /* Mobile phone with message — familiar channel */
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/25">
                    <rect x="16" y="6" width="24" height="40" rx="4"/>
                    <line x1="24" y1="11" x2="32" y2="11" strokeWidth="2" opacity="0.4"/>
                    <circle cx="28" cy="42" r="1.5" fill="currentColor" stroke="none" opacity="0.5"/>
                    <rect x="20" y="18" width="16" height="12" rx="2" opacity="0.5"/>
                    <line x1="23" y1="22" x2="33" y2="22" opacity="0.7"/>
                    <line x1="23" y1="25.5" x2="30" y2="25.5" opacity="0.7"/>
                  </svg>
                ),
              },
              {
                n: "04",
                title: "Receive tasks, summaries, and reminders.",
                desc: "Nexus keeps you informed and prepares actions for your approval.",
                delay: 200,
                icon: (
                  /* Bell with checkmark — notifications + approval */
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/25">
                    <path d="M28 8a2 2 0 0 1 2 2v1.2A14 14 0 0 1 42 24v8l4 4H10l4-4v-8A14 14 0 0 1 26 11.2V10a2 2 0 0 1 2-2z"/>
                    <path d="M24 36a4 4 0 0 0 8 0"/>
                    <circle cx="40" cy="16" r="7" className="fill-[#F5F4F0]" strokeWidth="1.5"/>
                    <polyline points="37,16 39.5,18.5 44,13.5" opacity="0.8"/>
                  </svg>
                ),
              },
              {
                n: "05",
                title: "Expand when you're ready.",
                desc: "Add integrations, additional workflows, and industry tools as your needs grow.",
                delay: 260,
                icon: (
                  /* Branching arrows / network — expansion */
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/25">
                    <circle cx="28" cy="28" r="5"/>
                    <circle cx="10" cy="14" r="4" opacity="0.6"/>
                    <circle cx="46" cy="14" r="4" opacity="0.6"/>
                    <circle cx="10" cy="42" r="4" opacity="0.6"/>
                    <circle cx="46" cy="42" r="4" opacity="0.6"/>
                    <line x1="23.5" y1="24.5" x2="14" y2="17.5"/>
                    <line x1="32.5" y1="24.5" x2="42" y2="17.5"/>
                    <line x1="23.5" y1="31.5" x2="14" y2="38.5"/>
                    <line x1="32.5" y1="31.5" x2="42" y2="38.5"/>
                  </svg>
                ),
              },
            ].map((step) => (
              <BentoCard key={step.n} className="relative overflow-hidden flex flex-col min-h-[300px]" delay={step.delay}>
                {/* Icon — upper centre */}
                <div className="flex justify-center pt-10 pb-2">
                  {step.icon}
                </div>
                {/* Step number */}
                <div className="relative z-10 px-7 pt-4">
                  <span className="font-pixel text-[11px] text-black/20 tracking-widest block">{step.n}</span>
                </div>
                {/* Text — pushed to bottom */}
                <div className="relative z-10 px-7 pb-7 mt-auto">
                  <h3 className="text-base font-light mb-3 leading-snug">{step.title}</h3>
                  <p className="text-sm text-black/45 leading-relaxed">{step.desc}</p>
                </div>
              </BentoCard>
            ))}
          </div>
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
              {"You approve.\nWe manage."}
            </RevealText>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side */}
            <div className="space-y-6">
              <p className="text-sm text-black/45 leading-relaxed">
                Nexus is a managed service, not a do-it-yourself chatbot builder. Westside Union handles model, routing, and advanced configuration. You control what matters to your business.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Owner-approved permissions", desc: "Define what Nexus can and cannot do on your behalf" },
                  { label: "Human approval for sensitive actions", desc: "High-risk or public-posting actions pause for your sign-off" },
                  { label: "Activity history", desc: "Every interaction logged and available to review" },
                  { label: "Monthly usage limits and alerts", desc: "No surprise AI bills. Clear limits and notifications" },
                  { label: "Customer data separation", desc: "Your business data is isolated and not shared between clients" },
                  { label: "Managed configuration", desc: "Models, routing, and technical settings managed by Westside Union" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-1 bg-black/10 rounded-full shrink-0" />
                    <div>
                      <h3 className="text-sm font-light mb-1">{item.label}</h3>
                      <p className="text-xs text-black/35">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
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
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3" onMouseMove={handleMouse}>
            {[
              {
                name: "Nexus Cloud",
                price: "CAD $299",
                period: "/month",
                setup: "Setup from CAD $500",
                sub: "One owner-focused assistant",
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
                sub: "More workflows and integrations",
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
                sub: "Managed local AI appliance",
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
                sub: "Multiple locations or departments",
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
                    <span className="text-3xl font-light">{plan.price}</span>
                    {plan.period && <span className="text-black/40 text-sm">{plan.period}</span>}
                  </div>
                  <p className="text-[10px] text-black/30 tracking-wide mb-1">{plan.setup}</p>
                  <p className="text-xs text-black/35 tracking-wide">{plan.sub}</p>
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
                  className={`block w-full py-3 rounded-xl text-sm tracking-widest text-center transition-all duration-200 ${plan.highlight
                    ? "bg-[#111] text-white hover:bg-[#333]"
                    : "border border-black/10 text-black/60 hover:border-black/25 hover:text-black hover:bg-black/[0.04]"
                    }`}
                >
                  BOOK A CONSULTATION
                </a>
              </BentoCard>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-black/30">
            Voice, SMS, paid third-party services, and custom integrations may be billed separately. Usage allowances and limits confirmed during setup.
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
                q: "Is Nexus another chatbot? Or another ChatGPT or Claude?",
                a: "No. Nexus is a managed business assistant configured around your information, tasks, channels, and approval rules.",
              },
              {
                q: "Do I need to learn a new app?",
                a: "No. Daily use is designed around familiar messaging channels. A web control center will be introduced later for task history, billing, usage, and account management.",
              },
              {
                q: "Can Nexus connect to my POS or booking system?",
                a: "Yes, but availability depends on the system's API, permissions, and plan. Westside Union confirms the integration scope during discovery.",
              },
              {
                q: "Does Nexus replace an employee?",
                a: "Nexus is designed first to support the owner and reduce repetitive work. It does not replace judgment, hospitality, skilled service, or accountable staff.",
              },
              {
                q: "Will my bill change based on tokens?",
                a: "Plans include a defined AI usage allowance, alerts, and limits. Paid channels and third-party services are explained separately.",
              },
              {
                q: "Can Nexus run locally?",
                a: "Yes, selected packages can include a managed local appliance. Local models are recommended when privacy, predictable usage, or local-system access justifies the added hardware and support.",
              },
              {
                q: "Who configures the AI?",
                a: "Westside Union manages models, frameworks, routing, and advanced settings. Customers control business-level preferences, approvals, notification choices, and billing — not underlying technical configuration.",
              },
              {
                q: "Can Nexus send messages automatically?",
                a: "Only within configured permissions, platform rules, and consent requirements. Sensitive or high-risk actions require approval.",
              },
              {
                q: "What happens if an integration stops working?",
                a: "Managed plans include monitoring and maintenance within the agreed scope. Third-party platform changes may require additional work.",
              },
              {
                q: "How quickly can we launch?",
                a: "A basic knowledge-and-messaging deployment can launch faster than a system requiring POS, booking, CRM, or custom API integration. Timing is confirmed after discovery.",
              },
            ].map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
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
            <p className="text-sm text-black/45 leading-relaxed">
              We'll identify the first few tasks Nexus can take off your plate and recommend a practical starting package.
            </p>
          </div>

          {formState === "submitted" ? (
            <div className="text-center">
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-emerald-600/20 bg-emerald-50 text-emerald-700">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-light">Thanks — we'll be in touch within one business day.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-black/[0.07] p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-[11px] tracking-widest text-black/40 mb-2">YOUR NAME *</label>
                  <input id="name" name="name" type="text" required value={form.name} onChange={handleFormChange}
                    className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/25 focus:outline-none focus:border-black/25 transition-colors" />
                </div>
                <div>
                  <label htmlFor="business" className="block text-[11px] tracking-widest text-black/40 mb-2">BUSINESS NAME *</label>
                  <input id="business" name="business" type="text" required value={form.business} onChange={handleFormChange}
                    className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/25 focus:outline-none focus:border-black/25 transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-[11px] tracking-widest text-black/40 mb-2">EMAIL *</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handleFormChange}
                    className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/25 focus:outline-none focus:border-black/25 transition-colors" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[11px] tracking-widest text-black/40 mb-2">PHONE (OPTIONAL)</label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleFormChange}
                    className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/25 focus:outline-none focus:border-black/25 transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="industry" className="block text-[11px] tracking-widest text-black/40 mb-2">INDUSTRY *</label>
                  <select id="industry" name="industry" required value={form.industry} onChange={handleFormChange}
                    className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-black/25 transition-colors">
                    <option value="">Select industry</option>
                    <option>Restaurant</option>
                    <option>Barbershop / Salon</option>
                    <option>Coffee Shop / Café</option>
                    <option>Automotive</option>
                    <option>Marketing / Agency</option>
                    <option>Trades / Home Services</option>
                    <option>Clinic / Professional Office</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="locations" className="block text-[11px] tracking-widest text-black/40 mb-2">NUMBER OF LOCATIONS</label>
                  <select id="locations" name="locations" value={form.locations} onChange={handleFormChange}
                    className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-black/25 transition-colors">
                    <option value="">Select</option>
                    <option>1</option>
                    <option>2–3</option>
                    <option>4–10</option>
                    <option>10+</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="channel" className="block text-[11px] tracking-widest text-black/40 mb-2">PREFERRED CONTACT CHANNEL</label>
                <select id="channel" name="channel" value={form.channel} onChange={handleFormChange}
                  className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-black/25 transition-colors">
                  <option value="">Select</option>
                  <option>WhatsApp</option>
                  <option>SMS / Text</option>
                  <option>Email</option>
                  <option>Phone call</option>
                </select>
              </div>

              <div>
                <label htmlFor="problem" className="block text-[11px] tracking-widest text-black/40 mb-2">BIGGEST REPETITIVE PROBLEM</label>
                <textarea id="problem" name="problem" rows={3} value={form.problem} onChange={handleFormChange}
                  placeholder="What work keeps following you home at the end of the day?"
                  className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/25 focus:outline-none focus:border-black/25 transition-colors resize-none" />
              </div>

              <div>
                <label htmlFor="tools" className="block text-[11px] tracking-widest text-black/40 mb-2">CURRENT POS, BOOKING, CRM, OR MESSAGING TOOLS</label>
                <input id="tools" name="tools" type="text" value={form.tools} onChange={handleFormChange}
                  placeholder="e.g. Square, Mindbody, HubSpot, WhatsApp"
                  className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/25 focus:outline-none focus:border-black/25 transition-colors" />
              </div>

              <div>
                <label htmlFor="deployment" className="block text-[11px] tracking-widest text-black/40 mb-2">DEPLOYMENT PREFERENCE</label>
                <select id="deployment" name="deployment" value={form.deployment} onChange={handleFormChange}
                  className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-black/25 transition-colors">
                  <option value="">Select</option>
                  <option>Cloud (Nexus Cloud or Managed)</option>
                  <option>Local appliance (Nexus Edge)</option>
                  <option>Recommend for me</option>
                </select>
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={handleFormChange}
                  className="mt-0.5 w-4 h-4 rounded border-black/20 accent-black"
                />
                <label htmlFor="consent" className="text-xs text-black/40 leading-relaxed">
                  I agree to be contacted by Westside Union regarding Project Nexus. My information will not be shared with third parties. *
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#111] text-white text-sm rounded-xl hover:bg-[#333] transition-colors tracking-widest font-medium"
              >
                REQUEST A NEXUS ASSESSMENT
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="py-10 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="font-pixel text-xs tracking-[0.25em] text-black/70">NEXUS</span>
            <p className="text-[10px] text-black/30 tracking-widest mt-1">A Westside Union product</p>
          </div>

          {/* Nav sections */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {[
              { label: "How It Works", href: "#how-it-works" },
              { label: "Industries", href: "#industries" },
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
        style={{ maxHeight: open ? "200px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p className="mt-3 text-sm text-black/45 leading-relaxed pr-8">{answer}</p>
      </div>
    </div>
  )
}

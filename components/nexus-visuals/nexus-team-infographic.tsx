"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react"
import { AI_TEAM_ROLES } from "@/lib/site-data"

interface SpecialistVisual {
  id: string
  index: string
  channel: string
  promptTime: string
  ownerPrompt: string
  nexusReply: string
  artifactTitle: string
  artifactSubtitle: string
  artifactBadge: string
  approvalNote: string
  artifactMetrics: { label: string; detail: string; value: string; status: string; tone: "emerald" | "amber" | "ink" }[]
  icon: React.ReactNode
}

const SPECIALIST_VISUALS: Record<string, SpecialistVisual> = {
  "executive-support": {
    id: "executive-support",
    index: "01",
    channel: "WhatsApp · 7:55 AM",
    promptTime: "8:00 AM",
    ownerPrompt: "Nexus, what needs my attention this morning?",
    nexusReply: "3 priority items pulled from your connected calendar, inbox, and opening checklists.",
    artifactTitle: "Morning Owner Briefing",
    artifactSubtitle: "Compiled from Google Calendar, Gmail & Shift Checklists",
    artifactBadge: "Daily 8:00 AM",
    approvalNote: "Calendar changes and outbound replies wait for your confirmation.",
    artifactMetrics: [
      { label: "Supplier delivery confirmation", detail: "Invoice #2048 matched to PO", value: "9:30 AM", status: "Ready", tone: "emerald" },
      { label: "2 priority customer callbacks", detail: "Flagged from yesterday’s voicemails", value: "High Priority", status: "Queued", tone: "amber" },
      { label: "Weekly staff schedule recap", detail: "All shifts confirmed across team", value: "6 / 6 Staff", status: "Synced", tone: "ink" },
    ],
    icon: (
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  "customer-care": {
    id: "customer-care",
    index: "02",
    channel: "WhatsApp · 8:12 AM",
    promptTime: "8:12 AM",
    ownerPrompt: "Did any customer inquiries come in after closing last night?",
    nexusReply: "4 routine questions were answered with approved hours and booking links; 1 group request is held for your review.",
    artifactTitle: "After-Hours Inquiry Triage",
    artifactSubtitle: "WhatsApp, Instagram DM & Website Chat",
    artifactBadge: "24/7 Coverage",
    approvalNote: "Custom quotes and non-standard requests always pause for owner approval.",
    artifactMetrics: [
      { label: "Hours, parking & menu FAQs", detail: "Answered using approved business profile", value: "4 Resolved", status: "Auto-Sent", tone: "emerald" },
      { label: "Appointment booking link shared", detail: "Customer booked Friday at 2:00 PM", value: "Confirmed", status: "Booked", tone: "emerald" },
      { label: "Private group inquiry (18 guests)", detail: "Draft reply prepared for your review", value: "Needs Review", status: "1-Tap Approve", tone: "amber" },
    ],
    icon: (
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  marketing: {
    id: "marketing",
    index: "03",
    channel: "WhatsApp · 10:20 AM",
    promptTime: "10:21 AM",
    ownerPrompt: "Prepare our weekend promotion draft for Friday morning.",
    nexusReply: "Instagram caption, promotional visual brief, and email note are drafted in your brand voice and waiting for your approval.",
    artifactTitle: "Weekend Campaign Draft",
    artifactSubtitle: "Instagram, Facebook & Customer Newsletter",
    artifactBadge: "Draft Ready",
    approvalNote: "Nothing is published or emailed to customers until you tap approve.",
    artifactMetrics: [
      { label: "Instagram & Facebook post copy", detail: "Tailored to your brand tone & offers", value: "Ready", status: "1-Tap Approve", tone: "amber" },
      { label: "VIP customer email highlight", detail: "Segmented to repeat guests", value: "480 Recipients", status: "Staged", tone: "ink" },
      { label: "Recommended publish window", detail: "Based on past engagement peaks", value: "Thu 5:00 PM", status: "Scheduled", tone: "emerald" },
    ],
    icon: (
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  sales: {
    id: "sales",
    index: "04",
    channel: "SMS · 1:15 PM",
    promptTime: "1:15 PM",
    ownerPrompt: "Which open quotes still need a follow-up this week?",
    nexusReply: "3 open estimates passed the 48-hour mark. Courteous check-in messages are drafted and ready to send.",
    artifactTitle: "Open Quote & Lead Pipeline",
    artifactSubtitle: "Synced with CRM, Email & Estimate Records",
    artifactBadge: "3 Open Quotes",
    approvalNote: "Each follow-up message is shown to you before it goes out.",
    artifactMetrics: [
      { label: "Commercial Estimate #104", detail: "Sent 3 days ago · Follow-up drafted", value: "CAD $4,200", status: "1-Tap Send", tone: "amber" },
      { label: "New website consultation lead", detail: "Intake details summarized for call", value: "Qualified", status: "Ready", tone: "emerald" },
      { label: "Callback reminder · Sarah M.", detail: "Added to your afternoon schedule", value: "Today 2:00 PM", status: "Booked", tone: "ink" },
    ],
    icon: (
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  operations: {
    id: "operations",
    index: "05",
    channel: "WhatsApp · 8:30 AM",
    promptTime: "8:30 AM",
    ownerPrompt: "Are the opening checklists and shift handoffs complete?",
    nexusReply: "Morning opening checklist was completed at 8:15 AM; 1 packaging restock note was flagged for the afternoon shift.",
    artifactTitle: "Daily Operations & Hand-Offs",
    artifactSubtitle: "Staff Checklists, SOPs & Inventory Notes",
    artifactBadge: "Live Sync",
    approvalNote: "Vendor reorder requests require owner sign-off before dispatch.",
    artifactMetrics: [
      { label: "Morning opening checklist", detail: "Verified by shift lead at 8:15 AM", value: "6 / 6 Items", status: "Complete", tone: "emerald" },
      { label: "Afternoon shift handoff note", detail: "Prep & booking notes shared with team", value: "Distributed", status: "Synced", tone: "ink" },
      { label: "Packaging inventory check", detail: "Below par level · Reorder drafted", value: "Low Stock", status: "Needs Review", tone: "amber" },
    ],
    icon: (
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  "reporting-insights": {
    id: "reporting-insights",
    index: "06",
    channel: "WhatsApp · Friday 4:30 PM",
    promptTime: "4:30 PM",
    ownerPrompt: "Summarize this week’s activity across our connected tools.",
    nexusReply: "Here is your weekly executive rollup pulled from your POS, booking calendar, and customer inbox.",
    artifactTitle: "Weekly Connected Rollup",
    artifactSubtitle: "POS Sales, Bookings & Response Metrics",
    artifactBadge: "Weekly Digest",
    approvalNote: "Read-only reporting from your verified source records.",
    artifactMetrics: [
      { label: "Customer inquiries answered on time", detail: "Across WhatsApp, SMS & Email", value: "98.4%", status: "+14% vs last wk", tone: "emerald" },
      { label: "Completed appointments & orders", detail: "Reconciled across POS & calendar", value: "142 Total", status: "Verified", tone: "ink" },
      { label: "Owner hours saved on routine admin", detail: "Follow-ups, triage & recaps", value: "~9.5 hrs", status: "Tracked", tone: "emerald" },
    ],
    icon: (
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  reputation: {
    id: "reputation",
    index: "07",
    channel: "WhatsApp · 9:10 AM",
    promptTime: "9:10 AM",
    ownerPrompt: "Did we get any new Google reviews over the weekend?",
    nexusReply: "3 new 5-star Google reviews came in. Warm, personalized thank-you replies are drafted for your 1-tap approval.",
    artifactTitle: "Review & Reputation Studio",
    artifactSubtitle: "Google Business Profile & Customer Feedback",
    artifactBadge: "3 New Reviews",
    approvalNote: "Public review replies never post without your explicit approval.",
    artifactMetrics: [
      { label: "Google Review · “Best service in town!”", detail: "Personalized thank-you reply drafted", value: "5.0 ★", status: "1-Tap Approve", tone: "amber" },
      { label: "Google Review · “So easy to book”", detail: "Personalized thank-you reply drafted", value: "5.0 ★", status: "1-Tap Approve", tone: "amber" },
      { label: "Post-visit feedback check-in", detail: "Scheduled for yesterday’s appointments", value: "12 Guests", status: "Queued", tone: "emerald" },
    ],
    icon: (
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
}

const TONE_BADGE: Record<"emerald" | "amber" | "ink", string> = {
  emerald: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
  amber: "bg-amber-50 text-amber-800 border-amber-200/80",
  ink: "bg-[#F5F4F0] text-black/75 border-black/10",
}

export function NexusTeamInfographic() {
  const [activeId, setActiveId] = useState<string>(AI_TEAM_ROLES[0].id)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) return

    const timer = setInterval(() => {
      setActiveId((prev) => {
        const idx = AI_TEAM_ROLES.findIndex((r) => r.id === prev)
        const nextIdx = (idx + 1) % AI_TEAM_ROLES.length
        return AI_TEAM_ROLES[nextIdx].id
      })
    }, 5200)
    return () => clearInterval(timer)
  }, [isPaused])

  const activeRole = AI_TEAM_ROLES.find((r) => r.id === activeId) || AI_TEAM_ROLES[0]
  const activeVisual = SPECIALIST_VISUALS[activeRole.id] || SPECIALIST_VISUALS["executive-support"]

  return (
    <div
      className="rounded-3xl border border-black/8 bg-[#FAF9F5] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.04)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* ── TOP ARCHITECTURAL ROUTING BAR (SINGLE-LINE ON DESKTOP) ────────── */}
      <div className="px-5 py-3.5 sm:px-7 bg-white border-b border-black/7 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 min-w-0">
          {/* Step 1: Owner */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF9F5] border border-black/8 whitespace-nowrap shrink-0">
            <span className="w-5 h-5 rounded-full bg-[#111] text-white text-[11px] font-medium flex items-center justify-center shrink-0">
              1
            </span>
            <span className="text-xs font-medium text-[#111]">You message Nexus</span>
            <span className="text-[11px] text-black/60 hidden sm:inline">· WhatsApp, SMS, Email</span>
          </div>

          <ArrowRight className="w-3.5 h-3.5 text-black/40 shrink-0" aria-hidden="true" />

          {/* Step 2: Nexus Core */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111] text-white whitespace-nowrap shrink-0">
            <Image src="/nexus-logo.png" alt="" width={16} height={16} className="object-contain shrink-0" />
            <span className="font-pixel text-[11px] tracking-widest">NEXUS CORE</span>
            <span className="text-[11px] text-white/75 hidden md:inline">· Coordinates specialists</span>
          </div>

          <ArrowRight className="w-3.5 h-3.5 text-black/40 shrink-0" aria-hidden="true" />

          {/* Step 3: Active Specialist */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 whitespace-nowrap shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
            <span className="text-xs font-medium">{activeRole.name}</span>
          </div>
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-2.5 text-xs text-black/65 whitespace-nowrap shrink-0">
          <span className="truncate">Select a specialist role to preview its workflow</span>
          <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-[#FAF9F5] border border-black/8 text-[#111] whitespace-nowrap shrink-0 tabular-nums">
            {activeVisual.index} / 07
          </span>
        </div>
      </div>

      {/* ── MAIN SPLIT CONSOLE: LEFT SPECIALIST RAIL (5 COLS) + RIGHT LIVE STAGE (7 COLS) ─ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-black/7">
        {/* LEFT (5 COLS): Architectural Specialist Switcher */}
        <div className="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between bg-[#FAF9F5]">
          <div className="space-y-1.5" role="tablist" aria-label="Nexus specialist workflows">
            {AI_TEAM_ROLES.map((role) => {
              const vis = SPECIALIST_VISUALS[role.id] || SPECIALIST_VISUALS["executive-support"]
              const isSelected = role.id === activeId

              return (
                <button
                  key={role.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`specialist-panel-${role.id}`}
                  id={`specialist-tab-${role.id}`}
                  onClick={() => setActiveId(role.id)}
                  className={`w-full text-left rounded-2xl px-4 py-3.5 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111] ${
                    isSelected
                      ? "bg-[#111] text-white shadow-[0_6px_20px_rgba(17,17,17,0.14)]"
                      : "bg-transparent hover:bg-white/80 text-[#111]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "bg-white/12 text-emerald-300"
                            : "bg-white border border-black/8 text-black/75"
                        }`}
                      >
                        {vis.icon}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-[11px] ${
                              isSelected ? "text-white/65" : "text-black/55"
                            }`}
                          >
                            {vis.index}
                          </span>
                          <span className="text-sm font-medium truncate">{role.name}</span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 text-[11px] px-2.5 py-0.5 rounded-full border ${
                        isSelected
                          ? "bg-white/10 text-white/90 border-white/15"
                          : "bg-white text-black/65 border-black/8"
                      }`}
                    >
                      {role.tag}
                    </span>
                  </div>

                  {isSelected && (
                    <p className="mt-2.5 pl-11 text-xs text-white/80 leading-relaxed">
                      {role.summary}
                    </p>
                  )}
                </button>
              )
            })}
          </div>

          {/* Bottom Custom Workflow Footnote */}
          <div className="mt-6 pt-5 border-t border-black/8 flex items-center justify-between gap-4 px-2">
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-[#111]">
                Tailored to your business &amp; permissions
              </p>
              <p className="text-xs text-black/65">
                Westside Union configures which specialist routines are active on your plan.
              </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 inline-flex items-center gap-1.5 min-h-10 px-3.5 py-2 rounded-xl bg-white border border-black/15 text-xs font-medium text-[#111] hover:border-black/40 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]"
            >
              Configure yours
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* RIGHT (7 COLS): Live Coordination Stage */}
        <div
          id={`specialist-panel-${activeRole.id}`}
          role="tabpanel"
          aria-labelledby={`specialist-tab-${activeRole.id}`}
          className="lg:col-span-7 p-6 sm:p-8 bg-white flex flex-col justify-between gap-6"
        >
          {/* 1. Conversation Thread (Owner Prompt -> Nexus Coordination) */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs text-black/65">
              <span className="font-mono text-[11px] uppercase tracking-wider text-black/65">
                {activeVisual.channel}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-black/65">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                Illustrative workflow
              </span>
            </div>

            {/* Owner Bubble */}
            <div className="flex justify-end">
              <div className="max-w-md rounded-2xl rounded-br-sm bg-[#111] text-white px-4 py-3 shadow-xs">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className="text-[11px] font-medium text-white/75">You</span>
                  <span className="font-mono text-[11px] text-white/65">Sent</span>
                </div>
                <p className="text-sm font-light leading-relaxed">
                  &ldquo;{activeVisual.ownerPrompt}&rdquo;
                </p>
              </div>
            </div>

            {/* Nexus Reply Bubble */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#FAF9F5] border border-black/10 flex items-center justify-center shrink-0 mt-0.5">
                <Image src="/nexus-logo.png" alt="" width={18} height={18} className="object-contain" />
              </div>
              <div className="flex-1 rounded-2xl rounded-tl-sm bg-[#FAF9F5] border border-black/8 px-4 py-3 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-medium text-[#111]">
                    Nexus · <span className="text-black/65 font-normal">{activeRole.name}</span>
                  </span>
                  <span className="font-mono text-[11px] text-black/60">{activeVisual.promptTime}</span>
                </div>
                <p className="text-sm text-black/80 leading-relaxed">
                  {activeVisual.nexusReply}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Prepared Deliverable / Output Sheet */}
          <div className="rounded-2xl border border-black/10 bg-[#FAF9F5]/60 overflow-hidden">
            {/* Sheet Header */}
            <div className="px-5 py-3.5 bg-white border-b border-black/7 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-[#FAF9F5] border border-black/8 flex items-center justify-center text-[#111]">
                  {activeVisual.icon}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-[#111] leading-tight">
                    {activeVisual.artifactTitle}
                  </h3>
                  <p className="text-xs text-black/65 mt-0.5">
                    {activeVisual.artifactSubtitle}
                  </p>
                </div>
              </div>
              <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-medium">
                {activeVisual.artifactBadge}
              </span>
            </div>

            {/* Deliverable Ledger Rows */}
            <ul className="divide-y divide-black/6 bg-white">
              {activeVisual.artifactMetrics.map((m) => (
                <li
                  key={m.label}
                  className="px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#FAF9F5]/60 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-[#111] truncate">{m.label}</p>
                    <p className="text-xs text-black/65 truncate">{m.detail}</p>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="font-mono text-xs font-medium text-[#111] tabular-nums">
                      {m.value}
                    </span>
                    <span
                      className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border whitespace-nowrap ${TONE_BADGE[m.tone]}`}
                    >
                      {m.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Sheet Footer: Approval Guard + Capabilities */}
            <div className="px-5 py-3 bg-[#FAF9F5] border-t border-black/7 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-black/70">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                <span>{activeVisual.approvalNote}</span>
              </div>
            </div>
          </div>

          {/* 3. Included Capabilities + Editorial Context Strip */}
          <div className="pt-4 border-t border-black/8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex flex-col items-start gap-2">
              {activeRole.examples.map((ex) => (
                <span
                  key={ex}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-[#FAF9F5] border border-black/8 text-black/75"
                >
                  <Check className="w-3 h-3 text-emerald-700 shrink-0" aria-hidden="true" />
                  {ex}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#FAF9F5] ring-1 ring-black/12 shadow-sm shrink-0 bg-black/5">
                <img
                  src="/images/nexus-team-showcase.jpg"
                  alt="Owner reviewing daily summary"
                  width={224}
                  height={224}
                  loading="lazy"
                  className="w-full h-full object-cover object-[52%_22%] scale-150"
                />
              </div>
              <span className="text-xs sm:text-sm text-black/70 leading-snug max-w-[180px]">
                One calm briefing instead of six separate tabs.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

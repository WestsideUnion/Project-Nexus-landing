"use client"

import React, { useState, useEffect } from "react"
import { AI_TEAM_ROLES } from "@/lib/site-data"

interface SpecialistVisual {
  id: string
  shortLabel: string
  color: string
  bgTint: string
  borderTint: string
  ownerPrompt: string
  nexusReply: string
  artifactTitle: string
  artifactBadge: string
  artifactMetrics: { label: string; value: string; status: string }[]
  icon: React.ReactNode
}

const SPECIALIST_VISUALS: Record<string, SpecialistVisual> = {
  "executive-support": {
    id: "executive-support",
    shortLabel: "Executive",
    color: "text-emerald-700",
    bgTint: "bg-emerald-50",
    borderTint: "border-emerald-200/70",
    ownerPrompt: "Nexus, what needs my attention this morning?",
    nexusReply: "3 priority items queued from your connected calendar, inbox and team checklists.",
    artifactTitle: "Morning Owner Briefing",
    artifactBadge: "8:00 AM Summary",
    artifactMetrics: [
      { label: "Supplier delivery confirmation", value: "9:30 AM", status: "Ready" },
      { label: "2 customer callbacks queued", value: "High Priority", status: "Pending" },
      { label: "Weekly staff schedule recap", value: "Completed", status: "Done" },
    ],
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  "customer-care": {
    id: "customer-care",
    shortLabel: "Customer Care",
    color: "text-sky-700",
    bgTint: "bg-sky-50",
    borderTint: "border-sky-200/70",
    ownerPrompt: "Did any inquiries come in after closing last night?",
    nexusReply: "4 inquiries answered with approved hours & booking links; 1 group request queued for you.",
    artifactTitle: "Inbound Inquiry Triage",
    artifactBadge: "24/7 Coverage",
    artifactMetrics: [
      { label: "Hours & parking FAQs", value: "Answered (4)", status: "Auto" },
      { label: "Booking link shared via WhatsApp", value: "Sent", status: "Auto" },
      { label: "Custom event request (18 guests)", value: "Needs Review", status: "1-Tap" },
    ],
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  marketing: {
    id: "marketing",
    shortLabel: "Marketing",
    color: "text-purple-700",
    bgTint: "bg-purple-50",
    borderTint: "border-purple-200/70",
    ownerPrompt: "Prepare our weekend promotion draft for Friday.",
    nexusReply: "Caption, promo graphic brief and email announcement drafted for your 1-tap approval.",
    artifactTitle: "Campaign Draft Studio",
    artifactBadge: "Awaiting Approval",
    artifactMetrics: [
      { label: "Instagram & Facebook post draft", value: "Ready", status: "1-Tap" },
      { label: "Weekend special highlight", value: "On-Brand", status: "Drafted" },
      { label: "Scheduled publish window", value: "Thu 5:00 PM", status: "Queued" },
    ],
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  sales: {
    id: "sales",
    shortLabel: "Sales",
    color: "text-amber-700",
    bgTint: "bg-amber-50",
    borderTint: "border-amber-200/70",
    ownerPrompt: "Which open quotes still need a follow-up this week?",
    nexusReply: "3 open estimates passed the 48-hour mark. Courteous check-in drafts are ready.",
    artifactTitle: "Quote & Lead Pipeline",
    artifactBadge: "3 Open Quotes",
    artifactMetrics: [
      { label: "Commercial Estimate #104", value: "CAD $4,200", status: "Draft Ready" },
      { label: "New website consultation lead", value: "Captured", status: "Qualified" },
      { label: "Callback reminder for Sarah M.", value: "Today 2 PM", status: "Scheduled" },
    ],
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  operations: {
    id: "operations",
    shortLabel: "Operations",
    color: "text-teal-700",
    bgTint: "bg-teal-50",
    borderTint: "border-teal-200/70",
    ownerPrompt: "Are the opening checklists and shift handoffs complete?",
    nexusReply: "Opening checklist completed at 8:15 AM; 1 restock note flagged for the afternoon shift.",
    artifactTitle: "Operations & Checklists",
    artifactBadge: "Live Sync",
    artifactMetrics: [
      { label: "Morning opening checklist", value: "6 / 6 items", status: "Complete" },
      { label: "Shift handoff notes", value: "Shared", status: "Synced" },
      { label: "Packaging inventory check", value: "Flagged", status: "Review" },
    ],
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  "reporting-insights": {
    id: "reporting-insights",
    shortLabel: "Reporting",
    color: "text-indigo-700",
    bgTint: "bg-indigo-50",
    borderTint: "border-indigo-200/70",
    ownerPrompt: "Summarize this week's activity across our connected tools.",
    nexusReply: "Here is your weekly snapshot pulled from your connected POS, booking and inbox records.",
    artifactTitle: "Connected Data Snapshot",
    artifactBadge: "Weekly Rollup",
    artifactMetrics: [
      { label: "Inquiries handled on time", value: "98.4%", status: "+14%" },
      { label: "Booked appointments synced", value: "142 total", status: "Verified" },
      { label: "Owner hours saved on admin", value: "~9.5 hrs", status: "Tracked" },
    ],
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  reputation: {
    id: "reputation",
    shortLabel: "Reputation",
    color: "text-rose-700",
    bgTint: "bg-rose-50",
    borderTint: "border-rose-200/70",
    ownerPrompt: "Did we get any new Google reviews over the weekend?",
    nexusReply: "3 new 5-star reviews received. Warm, personalized thank-you replies are ready to approve.",
    artifactTitle: "Review & Feedback Guard",
    artifactBadge: "★★★★★ New",
    artifactMetrics: [
      { label: "Google Review · 'Best service in town!'", value: "★★★★★", status: "Drafted" },
      { label: "Google Review · 'So easy to book'", value: "★★★★★", status: "Drafted" },
      { label: "Owner approval required before post", value: "Enabled", status: "Protected" },
    ],
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
}

export function NexusTeamInfographic() {
  const [activeId, setActiveId] = useState<string>(AI_TEAM_ROLES[0].id)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveId((prev) => {
        const idx = AI_TEAM_ROLES.findIndex((r) => r.id === prev)
        const nextIdx = (idx + 1) % AI_TEAM_ROLES.length
        return AI_TEAM_ROLES[nextIdx].id
      })
    }, 4500)
    return () => clearInterval(timer)
  }, [isPaused])

  const activeRole = AI_TEAM_ROLES.find((r) => r.id === activeId) || AI_TEAM_ROLES[0]
  const activeVisual = SPECIALIST_VISUALS[activeRole.id] || SPECIALIST_VISUALS["executive-support"]

  return (
    <div
      className="space-y-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Infographic Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT (7 cols): Interactive Visual Architecture Hub */}
        <div className="lg:col-span-7 rounded-2xl bg-[#FAF9F5] border border-black/7 p-6 sm:p-8 flex flex-col justify-between shadow-2xs relative overflow-hidden">
          {/* Subtle grid backdrop */}
          <div
            className="pointer-events-none absolute inset-0 opacity-35"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(17,17,17,0.12) 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10 space-y-6">
            {/* Top Header Pill */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/8 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-black/70 font-medium">
                  Interactive Architecture · Click Any Specialist
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-black/45">
                1 Assistant → 7 Specialists
              </span>
            </div>

            {/* Visual Flow: Owner -> Main Nexus Assistant -> Specialist Team */}
            <div className="rounded-2xl bg-white border border-black/7 p-4 sm:p-5 shadow-2xs">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                {/* Node 1: Business Owner */}
                <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] border border-black/6 shrink-0 w-full sm:w-auto">
                  <div className="w-8 h-8 rounded-full bg-[#111] text-white flex items-center justify-center text-xs font-medium shrink-0">
                    YOU
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-black/45">Single Point of Contact</div>
                    <div className="text-xs font-medium text-[#111]">Talk via WhatsApp, SMS or Chat</div>
                  </div>
                </div>

                {/* Animated connector arrow */}
                <div className="hidden sm:flex items-center justify-center text-black/30 shrink-0">
                  <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
                    <path d="M0 8H24M24 8L18 3M24 8L18 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Node 2: Central Nexus Core */}
                <div className="flex-1 flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#111] text-white shadow-xs w-full">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                    <div>
                      <div className="font-pixel text-[11px] tracking-widest text-white">NEXUS CORE</div>
                      <div className="text-[11px] text-white/70">Routes &amp; coordinates behind the scenes</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-emerald-300 shrink-0">
                    Active
                  </span>
                </div>
              </div>

              {/* Visual connector branch lines down to specialists */}
              <div className="my-3 flex items-center justify-center">
                <div className="h-4 w-px bg-black/15" />
              </div>

              {/* 7 Interactive Specialist Nodes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {AI_TEAM_ROLES.map((role) => {
                  const vis = SPECIALIST_VISUALS[role.id] || SPECIALIST_VISUALS["executive-support"]
                  const isSelected = role.id === activeId
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setActiveId(role.id)}
                      className={`group text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2 ${
                        isSelected
                          ? "bg-[#111] text-white border-[#111] shadow-sm scale-[1.01]"
                          : "bg-[#FAF9F5] hover:bg-white text-[#111] border-black/6 hover:border-black/15"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                            isSelected ? "bg-white/15 text-emerald-300" : `${vis.bgTint} ${vis.color}`
                          }`}
                        >
                          {vis.icon}
                        </span>
                        <span
                          className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            isSelected ? "bg-white/15 text-white/90" : "bg-black/4 text-black/50"
                          }`}
                        >
                          {role.tag}
                        </span>
                      </div>
                      <div>
                        <div className={`text-xs font-medium leading-tight ${isSelected ? "text-white" : "text-[#111]"}`}>
                          {role.name}
                        </div>
                      </div>
                    </button>
                  )
                })}

                {/* 8th Node: Managed by Westside Union */}
                <a
                  href="#contact"
                  className="p-3 rounded-xl border border-dashed border-black/15 bg-[#FAF9F5]/60 hover:bg-white hover:border-black/30 transition-all flex flex-col justify-between gap-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-black/5 text-black/70 flex items-center justify-center text-xs font-mono">
                      +
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-black/45">Custom</span>
                  </div>
                  <div className="text-xs font-medium text-black/80 group-hover:text-black leading-tight">
                    Configured for you →
                  </div>
                </a>
              </div>
            </div>

            {/* Active Specialist Live Conversation Strip (Illustrative) */}
            <div className="rounded-xl bg-white border border-black/7 p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${activeVisual.bgTint} ${activeVisual.color} font-semibold`}>
                    {activeRole.name} Specialist
                  </span>
                  <span className="text-xs text-black/60 hidden sm:inline">{activeRole.summary}</span>
                </div>
                <span className="text-[10px] font-mono uppercase text-black/40">Illustrative</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-[#FAF9F5] border border-black/5">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-black/45 block mb-1">You Ask Nexus</span>
                  <p className="text-xs font-medium text-[#111]">&ldquo;{activeVisual.ownerPrompt}&rdquo;</p>
                </div>
                <div className={`p-3 rounded-lg ${activeVisual.bgTint} border ${activeVisual.borderTint}`}>
                  <span className={`text-[9px] font-mono uppercase tracking-widest ${activeVisual.color} font-semibold block mb-1`}>
                    Nexus Coordinates
                  </span>
                  <p className="text-xs text-black/80">&ldquo;{activeVisual.nexusReply}&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT (5 cols): Editorial Image + Visual Output Showcase */}
        <div className="lg:col-span-5 rounded-2xl border border-black/7 bg-white overflow-hidden flex flex-col justify-between shadow-2xs">
          {/* Generated Editorial Showcase Photo */}
          <div className="relative h-56 sm:h-64 overflow-hidden bg-black/5 shrink-0">
            <img
              src="/images/nexus-team-showcase.jpg"
              alt="Business owner reviewing morning briefing with Nexus"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(17,17,17,0.75) 0%, rgba(17,17,17,0.2) 55%, transparent 100%)",
              }}
            />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3 text-white">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 block">
                  A Clearer Start To Your Day
                </span>
                <h3 className="text-base sm:text-lg font-light leading-snug mt-0.5">
                  One calm morning briefing — instead of six separate tabs.
                </h3>
              </div>
            </div>
          </div>

          {/* Dynamic Specialist Output Artifact */}
          <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 bg-white">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-black/6 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-md flex items-center justify-center ${activeVisual.bgTint} ${activeVisual.color}`}>
                    {activeVisual.icon}
                  </span>
                  <span className="text-xs font-medium text-[#111]">{activeVisual.artifactTitle}</span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${activeVisual.bgTint} ${activeVisual.color}`}>
                  {activeVisual.artifactBadge}
                </span>
              </div>

              {/* 3 Visual Output Rows */}
              <div className="space-y-2">
                {activeVisual.artifactMetrics.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#FAF9F5] border border-black/5 text-xs"
                  >
                    <span className="text-black/75 truncate pr-2">{m.label}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-[11px] font-medium text-[#111]">{m.value}</span>
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        {m.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialist capability pills */}
            <div className="pt-3 border-t border-black/6 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {activeRole.examples.map((ex, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-[#FAF9F5] border border-black/6 text-black/65"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


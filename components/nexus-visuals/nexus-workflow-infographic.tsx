"use client"

import React from "react"
import { ArrowRight, Check, MessageSquare, ShieldCheck, Sparkles } from "lucide-react"

export function NexusWorkflowInfographic() {
  return (
    <ol className="rounded-2xl bg-white border border-black/10 overflow-hidden grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-black/8">
      {/* ── STEP 01: TELL US YOUR ROUTINE ─────────────────────────────────── */}
      <li className="p-6 sm:p-8 flex flex-col justify-between gap-6 bg-white">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-2xl font-light text-[#111] tabular-nums">
              01
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAF9F5] text-black/70 border border-black/8">
              15-Min Call
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-medium text-[#111] tracking-tight">
            Tell us your daily routine
          </h3>
          <p className="text-sm text-black/65 leading-relaxed">
            Share the messages, quotes, and tasks you want off your plate.
          </p>
        </div>

        {/* Simple Visual: 3 Clean Focus Pills */}
        <div className="rounded-xl bg-[#FAF9F5] border border-black/8 p-3.5 space-y-2">
          {[
            "Customer questions & quotes",
            "Google reviews & follow-ups",
            "Daily team checklists",
          ].map((item) => (
            <div
              key={item}
              className="px-3 py-2 rounded-lg bg-white border border-black/6 flex items-center gap-2.5 text-xs font-medium text-[#111]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </li>

      {/* ── STEP 02: WE SET IT UP ─────────────────────────────────────────── */}
      <li className="p-6 sm:p-8 flex flex-col justify-between gap-6 bg-white">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-2xl font-light text-[#111] tabular-nums">
              02
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAF9F5] text-black/70 border border-black/8">
              Done For You
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-medium text-[#111] tracking-tight">
            We connect &amp; configure Nexus
          </h3>
          <p className="text-sm text-black/65 leading-relaxed">
            Our team links your tools and sets your approval rules—zero tech work for you.
          </p>
        </div>

        {/* Simple Visual: 3-Row Setup Status */}
        <div className="rounded-xl bg-[#FAF9F5] border border-black/8 p-3.5 space-y-2">
          {[
            { label: "Your apps & channels", status: "Connected" },
            { label: "Your tone & hours", status: "Configured" },
            { label: "1-tap owner approval", status: "Protected" },
          ].map((row) => (
            <div
              key={row.label}
              className="px-3 py-2 rounded-lg bg-white border border-black/6 flex items-center justify-between gap-2 text-xs"
            >
              <span className="font-medium text-[#111]">{row.label}</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800">
                <Check className="w-3 h-3" aria-hidden="true" />
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </li>

      {/* ── STEP 03: CHAT & APPROVE ───────────────────────────────────────── */}
      <li className="p-6 sm:p-8 flex flex-col justify-between gap-6 bg-white">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-2xl font-light text-[#111] tabular-nums">
              03
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80">
              Everyday Use
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-medium text-[#111] tracking-tight">
            Chat &amp; approve in one tap
          </h3>
          <p className="text-sm text-black/65 leading-relaxed">
            Message Nexus on WhatsApp or SMS, approve drafts, and get a morning summary.
          </p>
        </div>

        {/* Simple Visual: Compact Morning Brief */}
        <div className="rounded-xl bg-[#111] text-white p-4 flex flex-col justify-between gap-3.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-white/70">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              WHATSAPP · 8:00 AM
            </span>
            <span className="text-emerald-300">Daily Brief</span>
          </div>

          <p className="text-xs sm:text-sm text-white/95 font-light leading-relaxed">
            &ldquo;4 inquiries answered overnight. 2 review replies are ready for your tap.&rdquo;
          </p>

          <div className="flex items-center justify-between pt-2.5 border-t border-white/12 text-[11px]">
            <span className="px-2.5 py-1 rounded-md bg-white/12 text-emerald-300 font-medium">
              ✓ Approve in 1 tap
            </span>
            <span className="text-white/65 font-mono">No new app needed</span>
          </div>
        </div>
      </li>
    </ol>
  )
}

export function NexusMultiLocationInfographic() {
  const sites = [
    { name: "Downtown Flagship", metric: "14 bookings", status: "Synced" },
    { name: "Westside Studio", metric: "19 bookings", status: "Synced" },
    { name: "North Shore + 5 Branches", metric: "69 bookings", status: "All Synced" },
  ]

  return (
    <div className="rounded-2xl border border-black/10 bg-white overflow-hidden grid grid-cols-1 lg:grid-cols-12">
      {/* Left: Clean Visual Banner (5 cols) */}
      <div className="lg:col-span-5 relative min-h-[220px] sm:min-h-[250px] bg-black/5 overflow-hidden">
        <img
          src="/images/nexus-multi-location.jpg"
          alt="Multiple business locations summarized in one view"
          width={640}
          height={420}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(17,17,17,0.86) 0%, rgba(17,17,17,0.28) 60%, transparent 100%)",
          }}
        />
        <div className="absolute inset-x-6 bottom-5 text-white space-y-1.5">
          <span className="inline-block font-mono text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-xs text-emerald-300 border border-white/15">
            1 to 8+ Locations
          </span>
          <h3 className="text-lg sm:text-xl font-light leading-snug tracking-tight">
            Multiple locations? One morning brief.
          </h3>
        </div>
      </div>

      {/* Right: Simple 3-Row Rollup (7 cols) */}
      <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-5 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="text-base font-medium text-[#111]">
              Every site in a single summary
            </h4>
            <p className="text-xs text-black/65">
              See bookings, tasks, and follow-ups across all branches at once.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-medium">
            8 Sites → 1 Message
          </span>
        </div>

        <ul className="rounded-xl border border-black/8 divide-y divide-black/6 overflow-hidden">
          {sites.map((site) => (
            <li
              key={site.name}
              className="px-4 py-3 bg-[#FAF9F5]/60 flex items-center justify-between gap-3 text-xs sm:text-sm"
            >
              <span className="font-medium text-[#111] truncate">{site.name}</span>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-xs text-black/70 tabular-nums">{site.metric}</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800">
                  <Check className="w-3 h-3" aria-hidden="true" />
                  {site.status}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-4 pt-1">
          <span className="text-xs text-black/65">
            Custom permissions per manager or branch.
          </span>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111] text-white text-xs font-mono uppercase tracking-wider hover:bg-black/85 transition-colors shrink-0"
          >
            Talk to Us
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}

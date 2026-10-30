"use client"

import React from "react"

export function NexusWorkflowInfographic() {
  return (
    <div className="space-y-10">
      {/* ── VISUAL 3-STEP PIPELINE INFOGRAPHIC ─────────────────────────────── */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Desktop connecting line behind cards */}
        <div
          className="hidden md:block pointer-events-none absolute top-24 left-[16%] right-[16%] h-px border-t border-dashed border-black/20 z-0"
          aria-hidden="true"
        />

        {/* STEP 01 */}
        <div className="relative z-10 rounded-2xl bg-white border border-black/7 p-6 shadow-2xs flex flex-col justify-between space-y-5">
          {/* Visual Graphic 01 */}
          <div className="h-36 rounded-xl bg-[#FAF9F5] border border-black/5 p-4 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-medium">
                Step 01
              </span>
              <span className="font-mono text-[10px] text-black/40 uppercase">Discovery</span>
            </div>

            {/* Mini visual diagram: Scattered daily tasks -> Priority list */}
            <div className="grid grid-cols-3 gap-2 items-center my-auto pt-1">
              <div className="p-2 rounded-lg bg-white border border-black/6 text-center space-y-1 shadow-2xs">
                <div className="w-5 h-5 mx-auto rounded bg-amber-50 text-amber-700 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="text-[9px] font-mono text-black/65">Inquiries</div>
              </div>
              <div className="p-2 rounded-lg bg-white border border-black/6 text-center space-y-1 shadow-2xs">
                <div className="w-5 h-5 mx-auto rounded bg-sky-50 text-sky-700 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div className="text-[9px] font-mono text-black/65">Reviews</div>
              </div>
              <div className="p-2 rounded-lg bg-white border border-black/6 text-center space-y-1 shadow-2xs">
                <div className="w-5 h-5 mx-auto rounded bg-purple-50 text-purple-700 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="text-[9px] font-mono text-black/65">Follow-ups</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-black/45 pt-1 border-t border-black/5">
              <span>Your daily priorities</span>
              <span className="text-emerald-700">Mapped in 1 call →</span>
            </div>
          </div>

          <div>
            <h3 className="text-base font-medium text-[#111]">Tell us how your business works</h3>
            <p className="mt-1 text-xs text-black/60 leading-relaxed">
              Share the tasks, channels and bottlenecks that keep following you home.
            </p>
          </div>
        </div>

        {/* STEP 02 */}
        <div className="relative z-10 rounded-2xl bg-white border border-black/7 p-6 shadow-2xs flex flex-col justify-between space-y-5">
          {/* Visual Graphic 02 */}
          <div className="h-36 rounded-xl bg-[#FAF9F5] border border-black/5 p-4 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-medium">
                Step 02
              </span>
              <span className="font-mono text-[10px] text-black/40 uppercase">Managed Setup</span>
            </div>

            {/* Mini visual diagram: Connected tools + Approval toggle */}
            <div className="space-y-1.5 my-auto pt-1">
              <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white border border-black/6 text-[10px]">
                <span className="font-medium text-[#111]">Tools &amp; Channels</span>
                <span className="font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Connected</span>
              </div>
              <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white border border-black/6 text-[10px]">
                <span className="font-medium text-[#111]">Owner Approval Guard</span>
                <span className="inline-flex items-center gap-1 font-mono text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                  1-Tap On
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-black/45 pt-1 border-t border-black/5">
              <span>Configured by Westside Union</span>
              <span className="text-emerald-700">Zero DIY code →</span>
            </div>
          </div>

          <div>
            <h3 className="text-base font-medium text-[#111]">We configure Nexus for you</h3>
            <p className="mt-1 text-xs text-black/60 leading-relaxed">
              Westside Union connects supported tools and sets up your approval rules.
            </p>
          </div>
        </div>

        {/* STEP 03 */}
        <div className="relative z-10 rounded-2xl bg-white border border-black/7 p-6 shadow-2xs flex flex-col justify-between space-y-5">
          {/* Visual Graphic 03 */}
          <div className="h-36 rounded-xl bg-[#111] text-white p-4 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-300 font-medium">
                Step 03
              </span>
              <span className="font-mono text-[10px] text-white/50 uppercase">Daily Flow</span>
            </div>

            {/* Mini visual diagram: Owner briefing notification */}
            <div className="p-2.5 rounded-lg bg-white/10 border border-white/10 space-y-1.5 my-auto">
              <div className="flex items-center justify-between text-[9px] font-mono text-white/60">
                <span>WHATSAPP · NEXUS</span>
                <span className="text-emerald-300">8:00 AM</span>
              </div>
              <div className="text-[11px] text-white/95 font-light leading-snug">
                &ldquo;4 inquiries answered, 2 review replies ready for your 1-tap approval.&rdquo;
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-white/50 pt-1 border-t border-white/10">
              <span>WhatsApp · SMS · Email · Web</span>
              <span className="text-emerald-300">Active ✓</span>
            </div>
          </div>

          <div>
            <h3 className="text-base font-medium text-[#111]">Work moves in your channels</h3>
            <p className="mt-1 text-xs text-black/60 leading-relaxed">
              Ask questions, approve drafts in one tap, and get clear daily summaries.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function NexusMultiLocationInfographic() {
  const locations = [
    { name: "Location 01 · Downtown", status: "Synced", metric: "14 bookings · 2 follow-ups" },
    { name: "Location 02 · Westside", status: "Synced", metric: "19 bookings · 0 pending" },
    { name: "Location 03 · North Shore", status: "Synced", metric: "11 bookings · 1 review draft" },
    { name: "Locations 04–08 · Regional", status: "5 Connected", metric: "All checklists complete" },
  ]

  return (
    <div className="rounded-2xl border border-black/7 bg-white overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xs">
      {/* Left: Editorial Multi-Location Image (5 cols) */}
      <div className="lg:col-span-5 relative min-h-[240px] sm:min-h-[280px] bg-black/5 overflow-hidden">
        <img
          src="/images/nexus-multi-location.jpg"
          alt="Multiple local business storefronts connected into one view"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(17,17,17,0.8) 0%, rgba(17,17,17,0.25) 55%, transparent 100%)",
          }}
        />
        <div className="absolute bottom-4 left-5 right-5 text-white space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-300 block">
            Multi-Location &amp; Growing Teams
          </span>
          <h3 className="text-lg sm:text-xl font-light leading-snug">
            One business is hard enough to follow. What about eight?
          </h3>
        </div>
      </div>

      {/* Right: Visual Multi-Location Rollup Infographic (7 cols) */}
      <div className="lg:col-span-7 p-6 sm:p-7 flex flex-col justify-between gap-5 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/6 pb-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/45 block">
              Unified Multi-Site Rollup
            </span>
            <p className="text-xs text-black/65 mt-0.5">
              Connected digital records from every location organized into one owner summary.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/60">
            8 Locations → 1 Briefing
          </span>
        </div>

        {/* Visual Location Nodes -> Single Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {locations.map((loc, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-[#FAF9F5] border border-black/6 flex items-center justify-between gap-2"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-xs font-medium text-[#111] truncate">{loc.name}</span>
                </div>
                <div className="text-[11px] text-black/55 truncate pl-3 mt-0.5">{loc.metric}</div>
              </div>
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white border border-black/6 text-black/60 shrink-0">
                {loc.status}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom bar with note & CTA */}
        <div className="pt-2 border-t border-black/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-[11px] text-black/45 italic">
            Summaries depend on connected digital source records and permissions.
          </span>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#111] text-white text-[11px] font-medium tracking-widest uppercase hover:bg-[#333] transition-colors shrink-0 shadow-2xs"
          >
            Discuss Your Operations →
          </a>
        </div>
      </div>
    </div>
  )
}


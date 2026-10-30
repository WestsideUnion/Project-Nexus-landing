"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ADD_ON_CATEGORIES, AI_USAGE_RULES } from "@/lib/site-data"
import {
  NexusCloudEmblem,
  NexusEdgeEmblem,
  NexusEnterpriseEmblem,
} from "@/components/nexus-visuals/nexus-package-emblems"

/* ───────────────────────── 1. Interactive Tier Architecture Showcase ───────────────────────── */

const TIER_VISUAL_DATA = [
  {
    id: "cloud",
    name: "Nexus Cloud",
    badge: "Everyday Starting Point",
    price: "From CAD $99/mo",
    setup: "No mandatory setup fee",
    accent: "text-cyan-700",
    bgTint: "bg-cyan-50/70",
    borderTint: "border-cyan-200/70",
    barColor: "bg-cyan-600",
    capacityPct: 35,
    nodes: ["1 Main Assistant", "Standard Onboarding", "Everyday Workflows", "Core Channels"],
    architectureLabel: "Managed Shared Cloud Environment",
    emblem: <NexusCloudEmblem className="w-11 h-11" />,
  },
  {
    id: "edge",
    name: "Nexus Edge",
    badge: "Dedicated Capacity",
    price: "From CAD $499/mo",
    setup: "CAD $1,499 one-time setup",
    accent: "text-emerald-700",
    bgTint: "bg-emerald-50/70",
    borderTint: "border-emerald-200/70",
    barColor: "bg-emerald-600",
    capacityPct: 75,
    nodes: ["Dedicated Instance", "Tailored Workflow Mapping", "Higher Daily Volume", "Priority Support"],
    architectureLabel: "Dedicated Managed Environment · Hosted by Westside Union",
    emblem: <NexusEdgeEmblem className="w-11 h-11" />,
  },
  {
    id: "enterprise",
    name: "Nexus Enterprise",
    badge: "Multi-Location & Custom",
    price: "Custom Quote",
    setup: "Scoped implementation",
    accent: "text-purple-700",
    bgTint: "bg-purple-50/70",
    borderTint: "border-purple-200/70",
    barColor: "bg-[#111]",
    capacityPct: 100,
    nodes: ["Multi-Location Rollup", "Custom API & POS Sync", "Role-Based Governance", "Dedicated Account Team"],
    architectureLabel: "Custom Multi-Site Architecture · Managed by Westside Union",
    emblem: <NexusEnterpriseEmblem className="w-11 h-11" />,
  },
] as const

export function PricingTierArchitectureVisual() {
  const [selectedId, setSelectedId] = useState<string>("edge")
  const active = TIER_VISUAL_DATA.find((t) => t.id === selectedId) || TIER_VISUAL_DATA[1]

  return (
    <div className="rounded-2xl bg-[#FAF9F5] border border-black/7 p-5 sm:p-7 shadow-2xs space-y-6">
      {/* Top selector pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/6 pb-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-black/45 block">
            Interactive Package Architecture
          </span>
          <p className="text-xs text-black/65 mt-0.5">
            Select a package tier to inspect how capacity, onboarding, and management scale.
          </p>
        </div>

        <div className="inline-flex rounded-xl bg-white border border-black/8 p-1 gap-1 self-start sm:self-auto shadow-2xs">
          {TIER_VISUAL_DATA.map((t) => {
            const isSelected = t.id === selectedId
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedId(t.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#111] text-white font-medium shadow-2xs"
                    : "text-black/60 hover:text-black"
                }`}
              >
                {t.name.replace("Nexus ", "")}
              </button>
            )
          })}
        </div>
      </div>

      {/* Visual Architecture Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left: Tier Identity & Capacity Meter (5 cols) */}
        <div className="lg:col-span-5 rounded-xl bg-white border border-black/7 p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {active.emblem}
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${active.bgTint} ${active.accent} border ${active.borderTint}`}>
                  {active.badge}
                </span>
                <h3 className="text-lg font-medium text-[#111] mt-1">{active.name}</h3>
              </div>
            </div>
          </div>

          <div className="flex items-baseline justify-between pt-2 border-t border-black/5">
            <div>
              <div className="text-[10px] font-mono uppercase text-black/45">Subscription</div>
              <div className="text-xl font-light text-[#111]">{active.price}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono uppercase text-black/45">Onboarding</div>
              <div className="text-xs font-medium text-black/75">{active.setup}</div>
            </div>
          </div>

          {/* Visual Capacity Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[10px] font-mono text-black/55">
              <span>WORKLOAD &amp; CONCURRENCY CAPACITY</span>
              <span>{active.capacityPct}% Scale</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-black/6 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${active.barColor}`}
                style={{ width: `${active.capacityPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Visual Node Topology (7 cols) */}
        <div className="lg:col-span-7 rounded-xl bg-white border border-black/7 p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-black/45">
              {active.architectureLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>
          </div>

          {/* 4 Visual Architecture Blocks */}
          <div className="grid grid-cols-2 gap-2.5">
            {active.nodes.map((node, i) => (
              <div
                key={node}
                className="p-3 rounded-lg bg-[#FAF9F5] border border-black/6 flex items-center gap-2.5"
              >
                <span className="w-6 h-6 rounded-md bg-white border border-black/8 flex items-center justify-center text-[10px] font-mono text-black/60 shrink-0">
                  0{i + 1}
                </span>
                <span className="text-xs font-medium text-[#111] leading-snug">{node}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-black/5 flex items-center justify-between text-[11px] text-black/55">
            <span>All infrastructure hosted, monitored &amp; maintained by Westside Union</span>
            <span className="font-mono text-[10px] uppercase text-black/40">CAD</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── 2. Visual Plan Comparison Matrix ───────────────────────── */

function Meter({ level, dark = false }: { level: number; dark?: boolean }) {
  return (
    <div className="flex gap-1" aria-label={`${level} of 4`}>
      {[1, 2, 3, 4].map((n) => (
        <span
          key={n}
          className={`h-2 w-5 sm:w-6 rounded-full ${
            n <= level ? (dark ? "bg-[#111]" : "bg-emerald-600") : "bg-black/10"
          }`}
        />
      ))}
    </div>
  )
}

const CheckBadge = () => (
  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70">
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 7L5.5 10L11.5 4" />
    </svg>
  </span>
)

const DashBadge = () => <span className="text-black/25 font-mono text-xs">—</span>

export function PlanComparisonVisual() {
  const rows: { label: string; cells: React.ReactNode[] }[] = [
    {
      label: "Mandatory setup fee",
      cells: [
        <span key="c" className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
          $0 (Included)
        </span>,
        <span key="e" className="text-xs font-mono text-[#111]">CAD $1,499 one-time</span>,
        <span key="n" className="text-xs font-mono text-black/70">Custom scope</span>,
      ],
    },
    {
      label: "Workload capacity",
      cells: [<Meter key="c" level={1} />, <Meter key="e" level={3} />, <Meter key="n" level={4} dark />],
    },
    {
      label: "Workflow customization",
      cells: [<Meter key="c" level={1} />, <Meter key="e" level={3} />, <Meter key="n" level={4} dark />],
    },
    {
      label: "Support & onboarding depth",
      cells: [<Meter key="c" level={2} />, <Meter key="e" level={3} />, <Meter key="n" level={4} dark />],
    },
    {
      label: "Multi-location rollup",
      cells: [
        <DashBadge key="c" />,
        <span key="e" className="text-[11px] font-mono text-black/65">Growing teams</span>,
        <CheckBadge key="n" />,
      ],
    },
    {
      label: "Hosted & managed by Westside Union",
      cells: [<CheckBadge key="c" />, <CheckBadge key="e" />, <CheckBadge key="n" />],
    },
    {
      label: "Optional Nexus Sense devices",
      cells: [<CheckBadge key="c" />, <CheckBadge key="e" />, <CheckBadge key="n" />],
    },
  ]

  return (
    <div className="overflow-x-auto rounded-2xl border border-black/7 bg-white shadow-2xs">
      <div className="min-w-[580px]">
        <div className="grid grid-cols-4 border-b border-black/8 text-[11px] font-mono uppercase tracking-widest text-black/55 bg-[#FAF9F5]">
          <div className="p-4">Capability</div>
          <div className="p-4">Nexus Cloud</div>
          <div className="p-4 bg-emerald-50/50 text-emerald-950 font-semibold">Nexus Edge</div>
          <div className="p-4">Nexus Enterprise</div>
        </div>
        {rows.map((r) => (
          <div
            key={r.label}
            className="grid grid-cols-4 items-center border-b border-black/5 last:border-b-0"
          >
            <div className="p-4 text-xs font-medium text-[#111]">{r.label}</div>
            {r.cells.map((c, i) => (
              <div key={i} className={`p-4 ${i === 1 ? "bg-emerald-50/25" : ""}`}>
                {c}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ───────────────────────── 3. Guided Onboarding Journey (SVG Illustrated) ───────────────────────── */

export function OnboardingJourney() {
  const steps = [
    {
      n: "01",
      t: "Share Your Workflow",
      sub: "15-min discovery call",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      tint: "bg-amber-50 text-amber-800 border-amber-200/60",
    },
    {
      n: "02",
      t: "Guided Setup",
      sub: "$0 mandatory fee on Cloud",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
      tint: "bg-emerald-50 text-emerald-800 border-emerald-200/60",
    },
    {
      n: "03",
      t: "Connect Channels",
      sub: "Authorize supported tools",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
      tint: "bg-sky-50 text-sky-800 border-sky-200/60",
    },
    {
      n: "04",
      t: "Daily Briefings Live",
      sub: "Scale or adjust anytime",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      tint: "bg-purple-50 text-purple-800 border-purple-200/60",
    },
  ]

  const after = [
    "Continue on Cloud (monthly or annual)",
    "Add assisted setup by quote",
    "Step up to Nexus Edge",
    "Adjust or cancel per terms",
  ]

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((s) => (
          <div
            key={s.n}
            className="rounded-2xl bg-white border border-black/7 p-5 flex flex-col justify-between gap-4 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${s.tint}`}>
                {s.icon}
              </div>
              <span className="font-mono text-[10px] tracking-widest text-black/40 uppercase">
                STEP {s.n}
              </span>
            </div>
            <div>
              <div className="text-sm font-medium text-[#111]">{s.t}</div>
              <div className="text-xs text-black/55 mt-0.5">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white border border-black/6 p-4 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-black/45">
          After Your First 30 Days
        </span>
        <div className="flex flex-wrap gap-2">
          {after.map((a) => (
            <span
              key={a}
              className="text-[11px] px-3 py-1 rounded-full bg-[#FAF9F5] border border-black/7 text-black/70"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── 4. AI Usage Safeguard Meter ───────────────────────── */

export function UsageMeterVisual() {
  const stages = [
    {
      pct: "0–70%",
      title: "Included Monthly Credits",
      sub: "Covers routine inquiries, drafts & summaries",
      badge: "Included",
      tone: "bg-emerald-50 text-emerald-800 border-emerald-200/70",
    },
    {
      pct: "70%",
      title: "Proactive Heads-Up",
      sub: "Automatic notification when 70% is used",
      badge: "Alert",
      tone: "bg-amber-50 text-amber-800 border-amber-200/70",
    },
    {
      pct: "90%",
      title: "Early Warning",
      sub: "Clear warning so you can plan ahead",
      badge: "Warning",
      tone: "bg-orange-50 text-orange-800 border-orange-200/70",
    },
    {
      pct: "100%",
      title: "Safety Pause ($0 Overage)",
      sub: "Pauses new AI work — zero surprise charges",
      badge: "Protected",
      tone: "bg-black/5 text-[#111] border-black/15",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Visual Gauge Card */}
      <div className="rounded-2xl bg-[#FAF9F5] border border-black/7 p-6 sm:p-7 space-y-6 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/45 block">
              Automatic Spend Guardrails
            </span>
            <p className="text-xs text-black/65 mt-0.5">
              Credits reset monthly. Nexus alerts you early and never bills automatic overages.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/60">
            Zero Surprise Fees
          </span>
        </div>

        {/* Segmented Progress Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {stages.map((st) => (
            <div
              key={st.pct}
              className="rounded-xl bg-white border border-black/7 p-4 flex flex-col justify-between gap-2 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-[#111]">{st.pct}</span>
                <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border ${st.tone}`}>
                  {st.badge}
                </span>
              </div>
              <div>
                <div className="text-xs font-medium text-[#111]">{st.title}</div>
                <div className="text-[11px] text-black/55 mt-0.5 leading-snug">{st.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prepaid Credit Packs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {AI_USAGE_RULES.usagePacks.map((p, i) => (
          <div
            key={p.priceCad}
            className="rounded-2xl bg-[#FAF9F5] border border-black/7 p-5 flex items-end justify-between shadow-2xs"
          >
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-black/45">
                Optional Top-Up · {["Starter", "Growth", "Expansion"][i]}
              </div>
              <div className="text-2xl font-light text-[#111] mt-1">{p.priceDisplay}</div>
              <div className="text-[11px] text-black/55 mt-1">{p.desc}</div>
            </div>
            <div className="flex items-end gap-1 shrink-0" aria-hidden="true">
              {Array.from({ length: i + 1 }).map((_, k) => (
                <span
                  key={k}
                  className="w-2.5 rounded-xs bg-emerald-600"
                  style={{ height: 12 + (k + 1) * 7 }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <details className="rounded-2xl bg-[#FAF9F5] border border-black/7 px-5 py-3.5 group">
        <summary className="cursor-pointer text-xs font-medium text-[#111] list-none flex items-center justify-between">
          <span>{AI_USAGE_RULES.customerOwnedProviderInfo.title}</span>
          <span className="text-black/40 group-open:rotate-45 transition-transform text-base">+</span>
        </summary>
        <p className="mt-3 text-xs text-black/60 leading-relaxed">
          {AI_USAGE_RULES.customerOwnedProviderInfo.description}
        </p>
      </details>
    </div>
  )
}

/* ───────────────────────── 5. Upgrade Path Strip ───────────────────────── */

export function UpgradePathVisual() {
  const stops = [
    {
      name: "Nexus Cloud",
      price: "From CAD $99/mo",
      sub: "Start with 1 core workflow & $0 mandatory setup",
      emblem: <NexusCloudEmblem className="w-10 h-10" />,
      dots: 2,
    },
    {
      name: "Nexus Edge",
      price: "From CAD $499/mo",
      sub: "Dedicated capacity & deeper workflow setup",
      emblem: <NexusEdgeEmblem className="w-10 h-10" />,
      dots: 4,
      featured: true,
    },
    {
      name: "Nexus Enterprise",
      price: "Custom Quote",
      sub: "Multi-location & custom operational scope",
      emblem: <NexusEnterpriseEmblem className="w-10 h-10" />,
      dots: 5,
    },
  ]

  return (
    <div className="rounded-2xl border border-black/7 bg-white p-6 sm:p-7 shadow-2xs space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stops.map((s) => (
          <div
            key={s.name}
            className={`rounded-xl border p-5 flex flex-col justify-between gap-4 ${
              s.featured
                ? "bg-[#111] text-white border-[#111]"
                : "bg-[#FAF9F5] text-[#111] border-black/6"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className={`font-pixel text-[11px] tracking-widest ${s.featured ? "text-emerald-300" : "text-black/50"}`}>
                  {s.name.toUpperCase()}
                </div>
                <div className="mt-1 text-xl font-light">{s.price}</div>
              </div>
              {s.emblem}
            </div>

            <p className={`text-xs leading-relaxed ${s.featured ? "text-white/75" : "text-black/60"}`}>
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-black/6 flex flex-wrap items-center justify-between gap-3">
        <span className="text-[11px] font-mono uppercase tracking-widest text-black/45">
          Hosted &amp; managed by Westside Union · Upgrade anytime as workflows expand
        </span>
        <Link
          href="/nexus-edge"
          className="text-xs font-medium underline underline-offset-2 text-[#111] hover:opacity-75"
        >
          Explore Nexus Edge →
        </Link>
      </div>
    </div>
  )
}

/* ───────────────────────── 6. Add-ons Visual Showcase (Editorial Images) ───────────────────────── */

const ADDON_VISUAL_CARDS = [
  {
    category: "Business Connections",
    startingPrice: "From CAD $19/mo",
    setupNote: "+ one-time setup",
    img: "/images/addon-connections.jpg",
    tags: ["POS & Commerce", "Booking & Calendars", "CRM & Custom APIs"],
  },
  {
    category: "Communication Channels",
    startingPrice: "From CAD $19/mo",
    setupNote: "per extra channel",
    img: "/images/addon-channels.jpg",
    tags: ["WhatsApp & SMS", "Email & Web Chat", "Inbound Voice"],
  },
  {
    category: "Business Expansion",
    startingPrice: "From CAD $49/mo",
    setupNote: "per extra location",
    img: "/images/addon-expansion.jpg",
    tags: ["New Store Locations", "Team Assistants", "Custom Workflows"],
  },
  {
    category: "AI Usage Packs",
    startingPrice: "CAD $15 · $35 · $65",
    setupNote: "prepaid top-ups",
    img: "/images/addon-credits.jpg",
    tags: ["Starter ($15)", "Growth ($35)", "Expansion ($65)"],
  },
] as const

export function AddOnsVisual() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {ADDON_VISUAL_CARDS.map((card) => (
        <div
          key={card.category}
          className="group rounded-2xl bg-[#FAF9F5] border border-black/7 overflow-hidden flex flex-col justify-between shadow-2xs hover:border-black/15 transition-all"
        >
          {/* Editorial Image Header */}
          <div className="relative h-44 overflow-hidden bg-black/5">
            <img
              src={card.img}
              alt={card.category}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(17,17,17,0.55) 0%, transparent 55%)",
              }}
            />
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/90 backdrop-blur-xs text-[#111] border border-black/10 shadow-2xs">
              {card.startingPrice}
            </span>
            <span className="absolute bottom-2.5 left-3.5 text-[10px] font-mono uppercase tracking-widest text-white/90">
              {card.setupNote}
            </span>
          </div>

          {/* Minimal Scannable Body */}
          <div className="p-5 space-y-3">
            <h3 className="text-base font-medium text-[#111]">{card.category}</h3>
            <div className="flex flex-wrap gap-1.5">
              {card.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-black/6 text-black/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

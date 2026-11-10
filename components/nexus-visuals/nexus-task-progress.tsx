"use client"

import React, { useState } from "react"
import { ArrowRight, Check, Clock, ShieldCheck } from "lucide-react"

interface TaskScenario {
  id: string
  label: string
  steps: [
    { title: string; detail: string; tag: string },
    { title: string; detail: string; tag: string },
    { title: string; detail: string; tag: string },
  ]
}

const SCENARIOS: TaskScenario[] = [
  {
    id: "reviews",
    label: "Google Reviews",
    steps: [
      {
        title: "3 new 5-star reviews",
        detail: "Spotted on Google overnight",
        tag: "7:30 AM",
      },
      {
        title: "Warm replies drafted",
        detail: "Sent to your WhatsApp for review",
        tag: "1-Tap Approve",
      },
      {
        title: "Published to Google",
        detail: "Posted right after your tap",
        tag: "Done · 8:05 AM",
      },
    ],
  },
  {
    id: "quote",
    label: "Quote Follow-Up",
    steps: [
      {
        title: "Open estimate (48 hrs)",
        detail: "Smith project still unanswered",
        tag: "CRM Check",
      },
      {
        title: "Polite check-in ready",
        detail: "Follow-up message drafted for you",
        tag: "1-Tap Approve",
      },
      {
        title: "Sent & booked",
        detail: "Client replied to confirm Friday",
        tag: "Done · Synced",
      },
    ],
  },
  {
    id: "promo",
    label: "Weekend Promo",
    steps: [
      {
        title: "“Promote Friday’s special”",
        detail: "Quick voice note from you",
        tag: "WhatsApp",
      },
      {
        title: "Post & caption prepared",
        detail: "Ready for your quick confirmation",
        tag: "1-Tap Approve",
      },
      {
        title: "Scheduled across channels",
        detail: "Queued for Friday at 9:00 AM",
        tag: "Done · Scheduled",
      },
    ],
  },
]

const STAGE_META = [
  {
    step: "1",
    name: "Captured",
    badgeClass: "bg-amber-50 text-amber-800 border-amber-200/80",
    icon: Clock,
  },
  {
    step: "2",
    name: "Your 1-Tap Approval",
    badgeClass: "bg-sky-50 text-sky-800 border-sky-200/80",
    icon: ShieldCheck,
  },
  {
    step: "3",
    name: "Completed",
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
    icon: Check,
  },
] as const

export function NexusTaskProgress() {
  const [activeId, setActiveId] = useState<string>(SCENARIOS[0].id)
  const activeScenario = SCENARIOS.find((s) => s.id === activeId) ?? SCENARIOS[0]

  return (
    <div className="rounded-2xl border border-black/10 bg-white overflow-hidden">
      {/* Compact Header + Scenario Pills */}
      <div className="px-6 py-4 bg-[#FAF9F5] border-b border-black/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white border border-black/10 text-black/70">
            Live Example
          </span>
          <h3 className="text-sm sm:text-base font-medium text-[#111]">
            How a single task moves from start to finish
          </h3>
        </div>

        <div
          role="group"
          aria-label="Choose an example task"
          className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white border border-black/8 self-start sm:self-auto"
        >
          {SCENARIOS.map((scenario) => {
            const isSelected = scenario.id === activeScenario.id
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => setActiveId(scenario.id)}
                aria-pressed={isSelected}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111] ${
                  isSelected
                    ? "bg-[#111] text-white"
                    : "text-black/70 hover:text-black hover:bg-[#FAF9F5]"
                }`}
              >
                {scenario.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* 3-Step Visual Strip (1 item per stage) */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/8">
        {activeScenario.steps.map((item, idx) => {
          const meta = STAGE_META[idx]
          const Icon = meta.icon
          return (
            <div key={meta.name} className="p-5 sm:p-6 flex flex-col justify-between gap-4 bg-white">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${meta.badgeClass}`}
                >
                  <Icon className="w-3 h-3" aria-hidden="true" />
                  {meta.name}
                </span>
                <span className="font-mono text-[11px] text-black/65 tabular-nums">
                  {item.tag}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="space-y-0.5 min-w-0">
                  <p className="text-base font-medium text-[#111] tracking-tight truncate">
                    {item.title}
                  </p>
                  <p className="text-xs sm:text-sm text-black/65">
                    {item.detail}
                  </p>
                </div>

                {idx < 2 && (
                  <ArrowRight
                    className="hidden md:block w-4 h-4 text-black/30 shrink-0"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

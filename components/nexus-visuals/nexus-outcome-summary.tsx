"use client"

import React from "react"
import { NexusApprovalIcon, NexusTaskIcon, NexusFollowUpIcon } from "@/components/nexus-icons/nexus-icons"

export function NexusOutcomeSummary() {
  const metrics = [
    {
      label: "HOURS RECLAIMED",
      value: "14.5 hrs",
      sub: "per week in routine admin",
      icon: <NexusTaskIcon className="w-4 h-4 text-emerald-600" />,
      tag: "Time Value",
    },
    {
      label: "AFTER-HOURS INQUIRIES",
      value: "100%",
      sub: "captured & queued for callback",
      icon: <NexusFollowUpIcon className="w-4 h-4 text-blue-600" />,
      tag: "Zero Missed Leads",
    },
    {
      label: "OVERNIGHT TASKS",
      value: "24 items",
      sub: "organized & summarized by 7 AM",
      icon: <NexusTaskIcon className="w-4 h-4 text-purple-600" />,
      tag: "Daily Briefing",
    },
    {
      label: "OWNER APPROVALS",
      value: "1-Tap",
      sub: "control over public replies & posts",
      icon: <NexusApprovalIcon className="w-4 h-4 text-amber-600" />,
      tag: "Full Control",
    },
  ]

  return (
    <div className="w-full rounded-2xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-black/[0.06]">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-black/50 uppercase font-semibold">
            Illustrative Operational Outcomes
          </span>
          <h3 className="text-base sm:text-lg font-medium text-black mt-0.5">
            What consistent follow-up creates for a busy business
          </h3>
        </div>
        <span className="text-[10px] font-mono text-black/40 bg-black/[0.03] px-2.5 py-1 rounded-full border border-black/[0.05]">
          Based on Canadian Job Bank Benchmarks
        </span>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-[#FAF9F5] border border-black/[0.06] flex flex-col justify-between space-y-3 hover:border-black/20 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-wider text-black/50 font-semibold">{m.label}</span>
              <div className="w-7 h-7 rounded-lg bg-white border border-black/[0.06] flex items-center justify-center shadow-2xs">
                {m.icon}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-light text-black tracking-tight">{m.value}</div>
              <p className="text-xs text-black/60 mt-0.5">{m.sub}</p>
            </div>
            <div className="pt-2 border-t border-black/[0.04]">
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
                {m.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom disclaimer */}
      <p className="text-[11px] text-black/45 mt-5 text-center leading-relaxed">
        Figures shown are illustrative benchmarks based on median Canadian wage rates and routine administrative workloads. Nexus does not guarantee specific cost savings.
      </p>
    </div>
  )
}

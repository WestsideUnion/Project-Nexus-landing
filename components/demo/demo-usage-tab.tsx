"use client"

import React from "react"
import { Zap, Info, Calendar, ShieldCheck, CheckCircle2 } from "lucide-react"
import { DEMO_CREDIT_BREAKDOWN } from "@/lib/demo-data"

interface DemoUsageTabProps {
  creditPercentage: number
}

export function DemoUsageTab({ creditPercentage }: DemoUsageTabProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-black/[0.08] space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-black/50 bg-black/[0.05] px-2 py-0.5 rounded-full border border-black/[0.06]">
            Resource Management
          </span>
          <span className="text-[10px] font-mono text-black/50">
            Predictable Monthly Allocation
          </span>
        </div>
        <h3 className="text-lg font-semibold text-black tracking-tight">
          Monthly Nexus AI Credits
        </h3>
        <p className="text-xs text-black/60 max-w-2xl">
          Nexus plans include an all-inclusive monthly AI credit allowance configured by Westside Union to cover your business's regular coordination, drafts, and responses.
        </p>
      </div>

      {/* Main Credit Balance Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/[0.08] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-black/50 font-semibold">
              Current Billing Cycle Balance
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-serif font-bold text-black tracking-tight">
                {creditPercentage}%
              </span>
              <span className="text-xs sm:text-sm font-mono text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Remaining
              </span>
            </div>
          </div>

          <div className="p-3 bg-[#FAF9F5] rounded-xl border border-black/[0.06] text-right shrink-0">
            <div className="text-[10px] font-mono uppercase text-black/45">Cycle Reset</div>
            <div className="text-xs font-semibold text-black flex items-center justify-end gap-1.5 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-black/50" />
              <span>Resets on the first day of next billing period</span>
            </div>
          </div>
        </div>

        {/* Visual Progress Meter Bar */}
        <div className="space-y-2">
          <div className="w-full h-3 bg-black/[0.06] rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500 shadow-xs"
              style={{ width: `${creditPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-black/50">
            <span>0% Used</span>
            <span>{creditPercentage}% Healthy Operating Margin</span>
            <span>100% Monthly Cap</span>
          </div>
        </div>

        {/* Required Disclaimer Note */}
        <div className="p-3.5 rounded-xl bg-black/[0.03] border border-black/[0.06] flex items-center gap-2.5 text-xs text-black/65">
          <Info className="w-4 h-4 text-black/50 shrink-0" />
          <span className="font-mono text-[11px]">
            This demonstration uses sample credit information.
          </span>
        </div>
      </div>

      {/* Illustrative Usage Categories */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-black/60">
          Illustrative Monthly Allocation by Work Category
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {DEMO_CREDIT_BREAKDOWN.map((cat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-black/[0.06] shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-black">{cat.name}</span>
                <span className="text-xs font-mono font-bold text-black/75">
                  ~{cat.percentage}%
                </span>
              </div>
              <p className="text-[11px] text-black/60 leading-relaxed">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

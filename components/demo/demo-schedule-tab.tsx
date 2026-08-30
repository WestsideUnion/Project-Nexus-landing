"use client"

import React from "react"
import { Calendar, Clock, Send, CheckCircle2, RotateCw } from "lucide-react"
import { DEMO_SCHEDULE } from "@/lib/demo-data"

export function DemoScheduleTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-black/[0.08] space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-black/50 bg-black/[0.05] px-2 py-0.5 rounded-full border border-black/[0.06]">
            Automated Routines
          </span>
          <span className="text-[10px] font-mono text-black/50">
            Plain-Language Business Cadence
          </span>
        </div>
        <h3 className="text-lg font-semibold text-black tracking-tight">
          Scheduled Business Cadence
        </h3>
        <p className="text-xs text-black/60 max-w-2xl">
          Nexus runs recurring checks, morning summaries, and scheduled touchpoints in plain English. No complicated programming or technical syntax required.
        </p>
      </div>

      {/* Schedule Items List */}
      <div className="space-y-3">
        {DEMO_SCHEDULE.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white border border-black/[0.07] hover:border-black/15 transition-all shadow-2xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/[0.05]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs sm:text-sm font-semibold text-black">{item.title}</span>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
                {item.status}
              </span>
            </div>

            <p className="text-xs text-black/70 leading-relaxed">{item.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px] font-mono">
              <div className="p-2.5 bg-[#FAF9F5] rounded-xl border border-black/[0.04]">
                <div className="text-[9px] uppercase text-black/45 mb-0.5">Cadence</div>
                <div className="font-semibold text-black/80 flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5 text-black/50" />
                  <span>{item.cadence}</span>
                </div>
              </div>

              <div className="p-2.5 bg-[#FAF9F5] rounded-xl border border-black/[0.04]">
                <div className="text-[9px] uppercase text-black/45 mb-0.5">Next Scheduled Execution</div>
                <div className="font-semibold text-black/80 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-black/50" />
                  <span>{item.nextRun}</span>
                </div>
              </div>

              <div className="p-2.5 bg-[#FAF9F5] rounded-xl border border-black/[0.04]">
                <div className="text-[9px] uppercase text-black/45 mb-0.5">Delivery Channel</div>
                <div className="font-semibold text-black/80 flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-black/50" />
                  <span className="truncate">{item.channel}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

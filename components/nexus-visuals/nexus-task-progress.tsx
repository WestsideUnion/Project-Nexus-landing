"use client"

import React, { useState } from "react"

interface ProgressTaskItem {
  title: string
  sub: string
  time: string
  pulse?: boolean
  done?: boolean
}

interface ProgressStage {
  id: number
  stageNumber: string
  title: string
  subtitle: string
  badgeClass: string
  description: string
  items: ProgressTaskItem[]
  footerNote: string
}

export function NexusTaskProgress() {
  const [activeStage, setActiveStage] = useState<0 | 1 | 2>(1)

  const stages: ProgressStage[] = [
    {
      id: 0,
      stageNumber: "STAGE 01",
      title: "To Do",
      subtitle: "Ideas & Reminders",
      badgeClass: "bg-amber-50 text-amber-800 border-amber-200/80",
      description: "Thoughts, reminders, and unassigned work captured from texts, voice notes, or scheduled checks.",
      items: [
        { title: "Review Draft Request", sub: "3 Google reviews awaiting response draft", time: "11:42 PM" },
        { title: "Promotion Planning", sub: "Wednesday slow-period promo concept", time: "Yesterday" },
        { title: "Quote Callback", sub: "Smith project estimate follow-up", time: "Pending" },
      ],
      footerNote: "Captured from WhatsApp, SMS, or Telegram without friction.",
    },
    {
      id: 1,
      stageNumber: "STAGE 02",
      title: "In Progress",
      subtitle: "Active Coordination",
      badgeClass: "bg-blue-50 text-blue-800 border-blue-200/80",
      description: "Work Nexus is organizing, drafting in brand voice, verifying against knowledge, or holding for approval.",
      items: [
        { title: "Drafting Proposal", sub: "Catering package draft for 45 guests", time: "Active", pulse: true },
        { title: "Awaiting 1-Tap Approval", sub: "5-star Google review response", time: "Holding", pulse: true },
        { title: "Customer Inquiry Triage", sub: "After-hours availability & pricing check", time: "Active", pulse: true },
      ],
      footerNote: "Sensitive and public actions always pause for your review.",
    },
    {
      id: 2,
      stageNumber: "STAGE 03",
      title: "Finished",
      subtitle: "Completed & Logged",
      badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
      description: "Completed work with a clear plain-language explanation and logged activity record.",
      items: [
        { title: "Morning Briefing Delivered", sub: "Daily 7:00 AM summary sent to owner", time: "7:00 AM", done: true },
        { title: "Appointment Confirmations", sub: "4/4 tomorrow reminders confirmed", time: "8:30 AM", done: true },
        { title: "Review Reply Published", sub: "Approved response posted to Google", time: "9:15 AM", done: true },
      ],
      footerNote: "Delivered to your messaging channel and summary feed.",
    },
  ]

  return (
    <div className="w-full space-y-6">
      {/* 3 Interactive Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stages.map((stage) => {
          const isSelected = activeStage === stage.id
          return (
            <div
              key={stage.id}
              onClick={() => setActiveStage(stage.id as 0 | 1 | 2)}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-white border-black/25 shadow-lg ring-1 ring-black/5"
                  : "bg-white/70 border-black/[0.06] hover:bg-white hover:border-black/15 shadow-xs"
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] tracking-widest text-black/50 font-semibold">
                    {stage.stageNumber}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium border ${stage.badgeClass}`}>
                    {stage.title}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-black mb-1">{stage.subtitle}</h3>
                <p className="text-xs text-black/60 leading-relaxed mb-5">{stage.description}</p>

                {/* Items List */}
                <div className="space-y-2.5 p-3 rounded-xl bg-[#FAF9F5] border border-black/[0.04]">
                  {stage.items.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-white border border-black/[0.05] shadow-2xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-black flex items-center gap-1.5">
                          {item.done ? (
                            <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold">✓</span>
                          ) : item.pulse ? (
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                          )}
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono text-black/40">{item.time}</span>
                      </div>
                      <p className="text-[11px] text-black/65 pl-3.5 leading-snug">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer text */}
              <div className="pt-4 mt-5 border-t border-black/[0.05] text-[11px] text-black/50">
                {stage.footerNote}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

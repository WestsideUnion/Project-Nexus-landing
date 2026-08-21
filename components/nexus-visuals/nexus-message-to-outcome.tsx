"use client"

import React, { useState, useEffect } from "react"
import { WhatsAppIcon, TelegramIcon, SmsChannelIcon, EmailChannelIcon } from "@/components/nexus-icons/nexus-icons"

export function NexusMessageToOutcome() {
  const [activeStep, setActiveStep] = useState(0)
  const [selectedChannel, setSelectedChannel] = useState<"whatsapp" | "telegram" | "sms" | "email">("whatsapp")

  // Subtle auto-step every 4 seconds unless user manually interacts
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const channels = [
    { id: "whatsapp", name: "WhatsApp", icon: <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" /> },
    { id: "telegram", name: "Telegram", icon: <TelegramIcon className="w-3.5 h-3.5 text-blue-500" /> },
    { id: "sms", name: "SMS / Text", icon: <SmsChannelIcon className="w-3.5 h-3.5 text-sky-600" /> },
    { id: "email", name: "Email", icon: <EmailChannelIcon className="w-3.5 h-3.5 text-amber-600" /> },
  ] as const

  const steps = [
    {
      num: "01",
      title: "Owner Message",
      subtitle: "Send a quick thought or task via your favourite messaging app.",
      badge: "Inbound Request",
    },
    {
      num: "02",
      title: "Nexus Organizes",
      subtitle: "Extracts priorities, checks business knowledge, and structures work.",
      badge: "Automatic Triage",
    },
    {
      num: "03",
      title: "Work is Assigned",
      subtitle: "Drafts review replies, updates schedules, and queues reminders.",
      badge: "Active Draft",
    },
    {
      num: "04",
      title: "Owner Gets Outcome",
      subtitle: "Review with one tap, approve the action, and see it completed.",
      badge: "Completed & Logged",
    },
  ]

  return (
    <div className="w-full rounded-2xl bg-white/90 backdrop-blur-md border border-black/[0.08] p-5 sm:p-7 shadow-xl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-black/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-black/60 uppercase font-semibold">
            How Everyday Work Moves with Nexus
          </span>
        </div>

        {/* Channel Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/[0.03] border border-black/[0.05]">
          {channels.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setSelectedChannel(ch.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                selectedChannel === ch.id
                  ? "bg-white text-black shadow-xs border border-black/[0.08]"
                  : "text-black/50 hover:text-black"
              }`}
              aria-label={`View workflow with ${ch.name}`}
            >
              {ch.icon}
              <span className="hidden sm:inline">{ch.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stepper Flow Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-5">
        {steps.map((s, idx) => (
          <button
            key={s.num}
            onClick={() => setActiveStep(idx)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeStep === idx
                ? "bg-[#FAF9F5] border-black/30 shadow-xs ring-1 ring-black/10"
                : "bg-white/60 border-black/[0.05] hover:border-black/20"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span
                className={`font-mono text-[10px] font-semibold tracking-wider ${
                  activeStep === idx ? "text-emerald-700" : "text-black/40"
                }`}
              >
                STEP {s.num}
              </span>
              {activeStep === idx && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              )}
            </div>
            <div className="text-xs font-medium text-black leading-snug">{s.title}</div>
          </button>
        ))}
      </div>

      {/* Interactive Visual Stage */}
      <div className="rounded-xl border border-black/[0.07] bg-[#FAF9F5] p-4 sm:p-6 min-h-[220px] flex flex-col justify-between">
        {/* Step 1: Owner Message */}
        {activeStep === 0 && (
          <div className="space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-black/50 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Inbound Message • {channels.find((c) => c.id === selectedChannel)?.name}
              </span>
              <span>11:42 PM</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-black/[0.06] shadow-xs max-w-md">
              <p className="text-xs sm:text-sm text-black/85 leading-relaxed font-sans">
                &ldquo;Hey Nexus, please reply to yesterday&apos;s 5-star Google review and remind Sarah about her quote tomorrow morning.&rdquo;
              </p>
            </div>
            <div className="text-[11px] text-black/55 flex items-center gap-1.5 pt-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <span>Nexus captures the request and verifies approved business knowledge.</span>
            </div>
          </div>
        )}

        {/* Step 2: Nexus Organizes */}
        {activeStep === 1 && (
          <div className="space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-black/50 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Work Extracted &amp; Structured
              </span>
              <span>2 Items Identified</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-black/[0.06] shadow-xs">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-amber-50 text-amber-800 border border-amber-200/60 uppercase">
                  Task 01: Review
                </span>
                <p className="text-xs text-black/80 font-medium mt-1.5">Draft 5-star Google Review reply</p>
                <p className="text-[11px] text-black/50 mt-0.5">Matched to café tone &amp; owner signature</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-black/[0.06] shadow-xs">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-blue-50 text-blue-800 border border-blue-200/60 uppercase">
                  Task 02: Follow-up
                </span>
                <p className="text-xs text-black/80 font-medium mt-1.5">Quote #1042 callback reminder</p>
                <p className="text-[11px] text-black/50 mt-0.5">Queued for Sarah M. at 9:00 AM</p>
              </div>
            </div>
            <div className="text-[11px] text-black/55 flex items-center gap-1.5 pt-1">
              <span>✓ No manual data entry required. Both workflows queued automatically.</span>
            </div>
          </div>
        )}

        {/* Step 3: Work Assigned */}
        {activeStep === 2 && (
          <div className="space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-black/50 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                Draft Prepared &amp; Holding for Approval
              </span>
              <span>Ready for Review</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-purple-200/70 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-purple-900">Google Review Response (Draft)</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-100 text-purple-800 font-medium">Needs Approval</span>
              </div>
              <p className="text-xs text-black/75 italic bg-[#FAF9F5] p-2.5 rounded-lg border border-black/[0.04]">
                &ldquo;Thank you Marcus! We’re thrilled you enjoyed the morning espresso. See you again soon! — Westside Team&rdquo;
              </p>
            </div>
            <div className="text-[11px] text-black/55 flex items-center gap-1.5 pt-1">
              <span>🛡️ Sensitive &amp; public actions pause until the owner approves.</span>
            </div>
          </div>
        )}

        {/* Step 4: Outcome Delivered */}
        {activeStep === 3 && (
          <div className="space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-black/50 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Outcome Delivered to Owner
              </span>
              <span>Completed at 9:02 AM</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-emerald-200/80 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">✓</span>
                  <span className="text-xs font-medium text-black">Approved &amp; Executed</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  Logged to Morning Brief
                </span>
              </div>
              <p className="text-xs text-black/70 leading-relaxed">
                Review reply published to Google. Quote reminder delivered to Sarah M. Recorded in daily executive summary.
              </p>
            </div>
            <div className="text-[11px] text-emerald-800 font-medium flex items-center gap-1.5 pt-1">
              <span>✨ Peace of mind: Important customer work never gets forgotten.</span>
            </div>
          </div>
        )}

        {/* Action button in footer of card */}
        <div className="pt-3 mt-2 border-t border-black/[0.05] flex items-center justify-between text-xs">
          <span className="text-black/50 text-[11px]">Click steps to preview each stage</span>
          <button
            onClick={() => setActiveStep((prev) => (prev + 1) % 4)}
            className="text-black/80 hover:text-black font-medium underline underline-offset-2 transition-colors cursor-pointer text-[11px]"
          >
            Next step →
          </button>
        </div>
      </div>
    </div>
  )
}

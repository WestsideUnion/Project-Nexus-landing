"use client"

import React, { useState } from "react"

export function NexusOwnerDayStory() {
  const [activeStory, setActiveStory] = useState(0)

  const stories = [
    {
      id: 0,
      badge: "STORY 01 · INQUIRIES",
      title: "Never miss an inquiry while serving customers",
      sentence: "When your hands are full during rush hour, Nexus captures booking and catering requests instantly so new customers never walk away.",
      visual: (
        <div className="w-full h-48 relative rounded-xl bg-gradient-to-b from-[#181a20] to-[#101216] border border-white/[0.08] p-4 overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-white/50 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              1:15 PM · Floor Rush
            </span>
            <span className="text-emerald-400">Captured in 8s</span>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-white/10 border border-white/10 text-white/90 text-xs">
              <span className="text-[10px] text-amber-300 block font-mono">Inbound WhatsApp (Guest)</span>
              &ldquo;Hi! Do you have a table for 8 this Friday at 7:30 PM?&rdquo;
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-100 text-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-emerald-400 block font-mono">Nexus Auto-Triage</span>
                Checked availability &amp; queued booking callback.
              </div>
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center font-bold">✓</span>
            </div>
          </div>

          <div className="text-[10px] text-white/40 font-mono">
            Zero missed revenue while owner runs the floor.
          </div>
        </div>
      ),
    },
    {
      id: 1,
      badge: "STORY 02 · REVIEWS",
      title: "Keep review replies and callbacks moving",
      sentence: "Nexus drafts courteous on-brand replies to fresh reviews and prepares quote follow-ups for your one-tap review.",
      visual: (
        <div className="w-full h-48 relative rounded-xl bg-gradient-to-b from-[#181a20] to-[#101216] border border-white/[0.08] p-4 overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-white/50 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              New 5-Star Review
            </span>
            <span className="text-amber-400">★★★★★</span>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-white/10 border border-white/10 text-white/80 text-xs italic">
              &ldquo;Best haircut in Toronto. Friendly staff &amp; great vibe!&rdquo;
            </div>
            <div className="p-2.5 rounded-lg bg-[#141A24] border border-blue-500/30 text-white text-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-blue-400 block font-mono">Draft Prepared</span>
                &ldquo;Thanks for the love! See you next time.&rdquo;
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-600 text-white text-[10px] font-semibold">
                Approve
              </span>
            </div>
          </div>

          <div className="text-[10px] text-white/40 font-mono">
            Reputation maintained without spending evening hours typing.
          </div>
        </div>
      ),
    },
    {
      id: 2,
      badge: "STORY 03 · EVENINGS",
      title: "Leave midnight admin at the door",
      sentence: "Send thoughts and reminders late at night; Nexus converts them into organized morning work so you can rest.",
      visual: (
        <div className="w-full h-48 relative rounded-xl bg-gradient-to-b from-[#181a20] to-[#101216] border border-white/[0.08] p-4 overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-white/50 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              11:45 PM · Off-Hours Mode
            </span>
            <span className="text-purple-300">Autopilot Active</span>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-white/10 border border-white/10 text-white/90 text-xs">
              <span className="text-[10px] text-purple-300 block font-mono">Late Night Voice Note</span>
              &ldquo;Need to call Apex Comm regarding their HVAC invoice tomorrow.&rdquo;
            </div>
            <div className="p-2.5 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-100 text-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-purple-300 block font-mono">Converted to Agenda</span>
                Scheduled in 8:00 AM Owner Morning Summary.
              </div>
              <span className="w-5 h-5 rounded-full bg-purple-500 text-white text-[10px] flex items-center justify-center font-bold">✓</span>
            </div>
          </div>

          <div className="text-[10px] text-white/40 font-mono">
            Rest easy knowing tomorrow&apos;s priorities are ready.
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="w-full space-y-6">
      {/* 3 Story Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {stories.map((s, idx) => (
          <div
            key={s.id}
            onClick={() => setActiveStory(idx)}
            className={`rounded-2xl border transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer ${
              activeStory === idx
                ? "bg-white border-black/25 shadow-md ring-1 ring-black/5"
                : "bg-white/70 border-black/[0.06] hover:bg-white hover:border-black/15 shadow-xs"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono tracking-widest text-black/50 font-semibold">
                  {s.badge}
                </span>
                {activeStory === idx && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                )}
              </div>
              <h3 className="text-base sm:text-lg font-medium text-black mb-2 leading-snug">
                {s.title}
              </h3>
              <p className="text-xs sm:text-sm text-black/65 leading-relaxed mb-5">
                {s.sentence}
              </p>
            </div>

            {/* Code-native visual diagram */}
            <div className="mt-2">{s.visual}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

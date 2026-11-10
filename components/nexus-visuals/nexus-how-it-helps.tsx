"use client"

import React from "react"
import Image from "next/image"
import { ArrowRight, Check, Sparkles, Star } from "lucide-react"
import {
  WhatsAppIcon,
  GoogleBusinessIcon,
  SquarePosIcon,
  GoogleCalendarIcon,
} from "@/components/nexus-icons/nexus-icons"
import { QuickBooksIcon } from "@/components/nexus-icons/app-logo"

export function NexusHowItHelps() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* ── CARD 01: SCATTERED APPS -> ONE DAILY VIEW ──────────────────────── */}
      <div className="rounded-2xl bg-white border border-black/10 overflow-hidden flex flex-col justify-between shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
        {/* Visual Canvas */}
        <div className="p-5 sm:p-6 bg-[#FAF9F5] border-b border-black/7 flex flex-col justify-between gap-4 min-h-[230px]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-black/65">
              6 Apps → 1 Brief
            </span>
            <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-medium">
              Auto-Synced
            </span>
          </div>

          {/* Visual Convergence Diagram */}
          <div className="flex items-center justify-between gap-2 my-auto">
            {/* 4 Real App Logos */}
            <div className="grid grid-cols-2 gap-2 shrink-0">
              {[
                { Icon: SquarePosIcon, label: "Square" },
                { Icon: GoogleCalendarIcon, label: "Calendar" },
                { Icon: QuickBooksIcon, label: "Books" },
                { Icon: GoogleBusinessIcon, label: "Reviews" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="w-11 h-11 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center justify-center"
                  title={label}
                >
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </div>

            <ArrowRight className="w-4 h-4 text-black/35 shrink-0" aria-hidden="true" />

            {/* Central Nexus Core */}
            <div className="w-12 h-12 rounded-2xl bg-[#111] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Image src="/nexus-logo.png" alt="Nexus" width={22} height={22} className="object-contain" />
            </div>

            <ArrowRight className="w-4 h-4 text-black/35 shrink-0" aria-hidden="true" />

            {/* Output Morning Pill Stack */}
            <div className="flex-1 min-w-0 rounded-xl bg-[#111] text-white p-3 space-y-1.5">
              <div className="font-mono text-[11px] text-emerald-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
                <span className="truncate">8:00 AM Brief</span>
              </div>
              <div className="text-xs font-medium text-white truncate">14 Bookings</div>
              <div className="text-[11px] text-white/75 truncate">3 Quotes · 2 Reviews</div>
            </div>
          </div>
        </div>

        {/* Short Caption */}
        <div className="p-6 space-y-1.5 bg-white">
          <h3 className="text-lg font-medium text-[#111] tracking-tight">
            One view instead of six tabs
          </h3>
          <p className="text-sm text-black/65 leading-relaxed">
            Your POS, calendar, inbox, and reviews pulled into one calm morning summary.
          </p>
        </div>
      </div>

      {/* ── CARD 02: REPETITIVE FOLLOW-UPS -> 1-TAP APPROVAL ───────────────── */}
      <div className="rounded-2xl bg-white border border-black/10 overflow-hidden flex flex-col justify-between shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
        {/* Visual Canvas */}
        <div className="p-5 sm:p-6 bg-[#FAF9F5] border-b border-black/7 flex flex-col justify-between gap-3.5 min-h-[230px]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-black/65">
              Ready For Your Tap
            </span>
            <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-white text-black/75 border border-black/10 font-medium">
              2 Drafts Prepared
            </span>
          </div>

          {/* Visual Draft Cards */}
          <div className="space-y-2 my-auto">
            <div className="px-3.5 py-2.5 rounded-xl bg-white border border-black/8 flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <GoogleBusinessIcon className="w-4 h-4 shrink-0" />
                <span className="text-xs font-medium text-[#111] truncate">Review reply drafted</span>
              </div>
              <div className="flex items-center gap-0.5 text-amber-500 shrink-0" aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
              </div>
            </div>

            <div className="px-3.5 py-2.5 rounded-xl bg-white border border-black/8 flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span className="text-xs font-medium text-[#111] truncate">Quote #104 check-in</span>
              </div>
              <span className="font-mono text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/70 shrink-0">
                Ready
              </span>
            </div>
          </div>

          {/* 1-Tap Action Strip */}
          <div className="px-3.5 py-2 rounded-xl bg-[#111] text-white flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1.5 text-emerald-300 font-medium">
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
              Approve both in 1 tap
            </span>
            <span className="font-mono text-[11px] text-white/70">WhatsApp · SMS</span>
          </div>
        </div>

        {/* Short Caption */}
        <div className="p-6 space-y-1.5 bg-white">
          <h3 className="text-lg font-medium text-[#111] tracking-tight">
            Follow-ups drafted for your tap
          </h3>
          <p className="text-sm text-black/65 leading-relaxed">
            Quotes, inquiries, and review responses prepared in your voice—you just tap approve.
          </p>
        </div>
      </div>

      {/* ── CARD 03: DAILY CHECKLISTS & TEAM HANDOFFS ──────────────────────── */}
      <div className="rounded-2xl bg-white border border-black/10 overflow-hidden flex flex-col justify-between shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
        {/* Visual Canvas */}
        <div className="p-5 sm:p-6 bg-[#FAF9F5] border-b border-black/7 flex flex-col justify-between gap-3.5 min-h-[230px]">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-black/65">
                Daily Operations
              </span>
              <span className="font-mono text-[11px] font-medium text-emerald-800 tabular-nums">
                3 / 3 On Track
              </span>
            </div>
            {/* Visual Progress Bar */}
            <div className="h-2 w-full rounded-full bg-black/8 overflow-hidden">
              <div className="h-full w-full rounded-full bg-emerald-600" />
            </div>
          </div>

          {/* Visual Checklist Pills */}
          <div className="space-y-1.5 my-auto">
            {[
              { label: "Opening checklist", time: "8:15 AM" },
              { label: "Afternoon shift handoff", time: "Synced" },
              { label: "Supplier delivery check", time: "9:30 AM" },
            ].map((row) => (
              <div
                key={row.label}
                className="px-3.5 py-2 rounded-xl bg-white border border-black/8 flex items-center justify-between gap-2 text-xs"
              >
                <span className="flex items-center gap-2 font-medium text-[#111] truncate">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" aria-hidden="true" />
                  </span>
                  {row.label}
                </span>
                <span className="font-mono text-[11px] text-black/65 shrink-0 tabular-nums">
                  {row.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Short Caption */}
        <div className="p-6 space-y-1.5 bg-white">
          <h3 className="text-lg font-medium text-[#111] tracking-tight">
            Every shift on the same page
          </h3>
          <p className="text-sm text-black/65 leading-relaxed">
            Recurring checklists, handoffs, and team reminders tracked automatically as you grow.
          </p>
        </div>
      </div>
    </div>
  )
}

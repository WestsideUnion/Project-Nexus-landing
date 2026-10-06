"use client"

import React from "react"
import Link from "next/link"
import {
  SquarePosIcon,
  GoogleBusinessIcon,
  GoogleCalendarIcon,
  EmailChannelIcon,
} from "@/components/nexus-icons/nexus-icons"
import { AppLogo } from "@/components/nexus-icons/app-logo"

export function NexusConnectionsAndSense() {
  const businessSystems = [
    {
      name: "Point of Sale (POS)",
      sub: "Square, Clover, Toast, Lightspeed",
      icon: <SquarePosIcon className="w-5 h-5" />,
    },
    {
      name: "Booking & Appointments",
      sub: "Calendly, Acuity, Fresha, Mindbody",
      icon: <AppLogo id="calendly" name="Calendly" className="w-5 h-5" />,
    },
    {
      name: "Email Inboxes",
      sub: "Gmail, Google Workspace, Outlook",
      icon: <EmailChannelIcon className="w-5 h-5" />,
    },
    {
      name: "Business Calendars",
      sub: "Google Calendar, Microsoft 365",
      icon: <GoogleCalendarIcon className="w-5 h-5" />,
    },
    {
      name: "Customer Records & CRM",
      sub: "HubSpot, Salesforce, Pipedrive",
      icon: <AppLogo id="hubspot" name="HubSpot" className="w-5 h-5" />,
    },
    {
      name: "Google Business Profile",
      sub: "Review monitoring & hours sync",
      icon: <GoogleBusinessIcon className="w-5 h-5" />,
    },
  ]

  const senseOutcomes = [
    {
      title: "Understand customer traffic and busy periods",
      desc: "Spot foot-traffic patterns and quiet windows so promotions and staffing match actual demand.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-emerald-600">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: "Catch temperature, leak or equipment problems earlier",
      desc: "Receive immediate off-hours alerts before an undetected failure costs inventory or repairs.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-amber-600">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    {
      title: "Turn real-world changes into alerts and assigned tasks",
      desc: "Automatically notify the right team member or queue a checklist item when attention is needed.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-sky-600">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* ── PANEL A: YOUR BUSINESS SYSTEMS ─────────────────────────────────── */}
      <div className="p-7 sm:p-9 rounded-2xl bg-white border border-black/[0.07] shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] tracking-widest uppercase text-black/50 font-semibold">
              PANEL A · SOFTWARE &amp; TOOLS
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-mono font-medium">
              1,500+ APPS SUPPORTED
            </span>
          </div>

          <h3 className="text-2xl font-light text-[#111] mb-2">Your business systems</h3>
          <p className="text-xs sm:text-sm text-black/65 leading-relaxed mb-6">
            Nexus coordinates work across 1,500+ tools your business already depends on—with managed OAuth authentication, least-privilege scoping, and owner approval rules.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {businessSystems.map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#FAF9F5] border border-black/[0.05] flex items-center gap-3 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-black/[0.06] flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-[#111] truncate">{item.name}</div>
                  <div className="text-[10px] text-black/50 truncate">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-5 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-[11px] text-black/50">
            Westside Union handles tool configuration and authorization.
          </span>
          <Link
            href="/connections"
            className="text-xs font-medium text-black hover:opacity-75 transition-opacity underline underline-offset-4 whitespace-nowrap"
          >
            Explore all 1,500+ connections &amp; integrations →
          </Link>
        </div>
      </div>

      {/* ── PANEL B: YOUR PHYSICAL BUSINESS (NEXUS SENSE) ─────────────────── */}
      <div className="p-7 sm:p-9 rounded-2xl bg-white border border-black/[0.07] shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] tracking-widest uppercase text-black/50 font-semibold">
              PANEL B · PHYSICAL ON-SITE AWARENESS
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest bg-black/[0.05] text-black/70 border border-black/10 font-mono">
              OPTIONAL ADD-ON
            </span>
          </div>

          <div className="flex items-center gap-2.5 mb-2">
            <h3 className="text-2xl font-light text-[#111]">Nexus Sense</h3>
            <span className="text-[10px] text-black/50 font-mono uppercase bg-black/[0.04] px-2 py-0.5 rounded">
              Physical Add-on
            </span>
          </div>

          <p className="text-xs sm:text-sm text-black/65 leading-relaxed mb-6">
            Optional on-site devices help Nexus notice useful conditions inside your business and alert you when something needs attention.
          </p>

          <div className="space-y-3 mb-6">
            {senseOutcomes.map((out, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-[#FAF9F5] border border-black/[0.05] flex items-start gap-3 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-black/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                  {out.icon}
                </div>
                <div>
                  <div className="text-xs font-medium text-[#111] leading-snug">{out.title}</div>
                  <div className="text-[11px] text-black/60 mt-0.5 leading-relaxed">{out.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-5 border-t border-black/[0.06]">
          <p className="text-[11px] text-black/50 leading-relaxed">
            Sensor availability depends on the location, selected Nexus package and site assessment. Available as an optional add-on family following an operational evaluation.
          </p>
        </div>
      </div>
    </div>
  )
}

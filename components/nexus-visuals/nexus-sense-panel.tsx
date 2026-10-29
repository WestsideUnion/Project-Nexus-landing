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
      desc: "Explore how physical space activity could help inform scheduling and daily operations.",
      status: "Concept / Planned Demonstration",
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
      title: "Temperature, environment or equipment condition alerts",
      desc: "Bring status updates from compatible sensors into your Nexus notifications where supported.",
      status: "Concept / Planned Demonstration",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-amber-600">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    {
      title: "More ways to connect the physical world",
      desc: "We're exploring additional Nexus-connected devices for different business needs. New products and features will be introduced as they become available.",
      status: "Planned Ecosystem Direction",
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
      <div className="p-7 sm:p-9 rounded-2xl bg-white border border-black/7 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] tracking-widest uppercase text-black/50 font-semibold">
              BUSINESS SOFTWARE &amp; CHANNELS
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-mono font-medium">
              SUPPORTED INTEGRATIONS
            </span>
          </div>

          <h3 className="text-2xl font-light text-[#111] mb-2">Works with the tools you already use.</h3>
          <p className="text-xs sm:text-sm text-black/65 leading-relaxed mb-6">
            You don&apos;t have to start over. Tell us which software your business uses, and we&apos;ll help identify practical ways Nexus can work with it.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {businessSystems.map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#FAF9F5] border border-black/5 flex items-center gap-3 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-black/6 flex items-center justify-center shrink-0">
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

        <div className="pt-5 border-t border-black/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-[11px] text-black/50">
            Compatibility depends on the tools, account permissions and setup required.
          </span>
          <Link
            href="/connections"
            className="text-xs font-medium text-black hover:opacity-75 transition-opacity underline underline-offset-4 whitespace-nowrap"
          >
            Explore Integrations →
          </Link>
        </div>
      </div>

      {/* ── PANEL B: OPTIONAL CONNECTED DEVICES (NEXUS SENSE) ──────────────── */}
      <div className="p-7 sm:p-9 rounded-2xl bg-white border border-black/7 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] tracking-widest uppercase text-black/50 font-semibold">
              OPTIONAL CONNECTED DEVICES
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest bg-black/5 text-black/70 border border-black/10 font-mono">
              OPTIONAL ADD-ON
            </span>
          </div>

          <div className="flex items-center gap-2.5 mb-2">
            <h3 className="text-2xl font-light text-[#111]">Intelligence beyond the screen.</h3>
          </div>

          <p className="text-xs sm:text-sm text-black/65 leading-relaxed mb-6">
            <strong>Nexus Sense</strong> is a connected-device option within the Nexus ecosystem, helping bring information from physical spaces into the Nexus experience where supported. Talk to us about current availability, compatible monitoring scenarios and installation needs.
          </p>

          <div className="space-y-3 mb-6">
            {senseOutcomes.map((out, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-[#FAF9F5] border border-black/5 flex items-start gap-3 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-black/6 flex items-center justify-center shrink-0 mt-0.5">
                  {out.icon}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <div className="text-xs font-medium text-[#111] leading-snug">{out.title}</div>
                    <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/4 text-black/50">
                      {out.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-black/60 mt-1 leading-relaxed">{out.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-5 border-t border-black/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-[11px] text-black/50 leading-relaxed">
            Nexus Sense is an optional add-on separate from Cloud, Edge, and Enterprise plans. Equipment, installation and monitoring are quoted by use case.
          </p>
          <a
            href="#contact"
            className="text-xs font-medium text-black hover:opacity-75 transition-opacity underline underline-offset-4 whitespace-nowrap"
          >
            Ask About Nexus Sense →
          </a>
        </div>
      </div>
    </div>
  )
}

"use client"

import React from "react"
import { ShieldCheck, CheckCircle2, Info } from "lucide-react"
import { DEMO_CONNECTIONS } from "@/lib/demo-data"
import { AppLogo } from "@/components/nexus-icons/app-logo"

export function DemoConnectionsTab() {
  const getSafeBadgeStyle = (label: string) => {
    switch (label) {
      case "Demo connection":
        return "bg-emerald-50 text-emerald-800 border-emerald-200"
      case "Example connection":
        return "bg-blue-50 text-blue-800 border-blue-200"
      case "Confirmed during consultation":
        return "bg-amber-50 text-amber-800 border-amber-200"
      default:
        return "bg-black/[0.05] text-black/60 border-black/[0.08]"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-black/[0.08] space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-black/50 bg-black/[0.05] px-2 py-0.5 rounded-full border border-black/[0.06]">
            Integrations &amp; Channels
          </span>
          <span className="text-[10px] font-mono text-black/50">
            Simulated Demonstration Environment
          </span>
        </div>
        <h3 className="text-lg font-semibold text-black tracking-tight">
          Connected Communication &amp; Business Software
        </h3>
        <p className="text-xs text-black/60 max-w-2xl">
          Nexus connects to the communication apps and business tools you already rely on across our 1,500+ integration ecosystem. Westside Union verifies permissions, security protocols, and approval triggers during setup.
        </p>
      </div>

      {/* Mandatory Safety Notice */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950 space-y-0.5">
          <span className="font-semibold">Simulated Connection Directory:</span>
          <p className="text-amber-900/80 leading-relaxed">
            All connections listed below represent illustrative configurations. No real third-party account is authorized or accessed in this interactive preview.
          </p>
        </div>
      </div>

      {/* Grid of Connections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DEMO_CONNECTIONS.map((conn) => (
          <div
            key={conn.id}
            className="p-5 rounded-2xl bg-white border border-black/[0.07] hover:border-black/15 transition-all shadow-2xs flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center shrink-0 shadow-2xs overflow-hidden p-1.5">
                    <AppLogo id={conn.id} name={conn.name} iconType={conn.iconType} className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-black leading-tight">
                      {conn.name}
                    </h4>
                    <span className="text-[10px] font-mono text-black/45">{conn.category}</span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border shrink-0 ${getSafeBadgeStyle(
                    conn.safeLabel
                  )}`}
                >
                  {conn.safeLabel}
                </span>
              </div>

              <p className="text-xs text-black/65 leading-relaxed">{conn.description}</p>
            </div>

            <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between text-[10px] font-mono text-black/45">
              <span>Security: Sandbox isolated</span>
              <span className="text-emerald-700 font-semibold">Simulated active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

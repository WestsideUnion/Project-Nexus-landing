"use client"

import React, { useEffect, useRef, useState } from "react"
import { CheckCircle2, RefreshCw, X, ShieldAlert, Sparkles, Clock, Calendar, Instagram, Facebook } from "lucide-react"
import { GUIDED_TOUR_DATA } from "@/lib/demo-data"
import { trackDemoEvent } from "@/lib/demo-analytics"

interface DemoApprovalModalProps {
  isOpen: boolean
  onClose: () => void
  onApprove: () => void
  onRequestChanges: () => void
  isRevising: boolean
  hasRevised: boolean
}

export function DemoApprovalModal({
  isOpen,
  onClose,
  onApprove,
  onRequestChanges,
  isRevising,
  hasRevised,
}: DemoApprovalModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [activeMediaTab, setActiveMediaTab] = useState<"graphic" | "animated_reel">("graphic")

  // Keyboard accessibility: ESC key to close
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const captionText = hasRevised
    ? GUIDED_TOUR_DATA.revisedCaption
    : GUIDED_TOUR_DATA.initialCaption

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="approval-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-black/15 overflow-hidden z-10 animate-in zoom-in-95 duration-200"
      >
        {/* Modal Top Banner */}
        <div className="bg-[#FAF9F5] border-b border-black/[0.08] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest font-semibold text-amber-800">
                Action Paused for Owner Review
              </span>
              <h2 id="approval-modal-title" className="text-base font-semibold text-black tracking-tight">
                Review Friday Promotion Campaign
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-black/50 hover:text-black hover:bg-black/[0.05] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            aria-label="Close approval modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Main prompt statement */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium text-amber-950">
                Nexus prepared the Friday campaign. Review it before scheduling.
              </p>
              <p className="text-[11px] text-amber-900/75 leading-relaxed">
                Public social posts and promotions always pause for your explicit approval. Nothing is scheduled or published without your confirmation.
              </p>
            </div>
          </div>

          {/* Revising State Indicator */}
          {isRevising && (
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-3 animate-pulse">
              <RefreshCw className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
              <div>
                <div className="text-xs font-semibold text-blue-950">
                  Nexus is revising caption tone...
                </div>
                <div className="text-[11px] text-blue-900/70">
                  Adjusting phrasing to be more conversational and highlighting customer interaction.
                </div>
              </div>
            </div>
          )}

          {/* Campaign Creative Preview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-black/60">
                Prepared Creative Asset
              </span>
              {/* Media Switcher */}
              <div className="flex items-center gap-1 bg-black/[0.04] p-0.5 rounded-lg border border-black/[0.06]">
                <button
                  type="button"
                  onClick={() => setActiveMediaTab("graphic")}
                  className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-colors ${
                    activeMediaTab === "graphic"
                      ? "bg-white text-black shadow-2xs font-semibold"
                      : "text-black/50 hover:text-black"
                  }`}
                >
                  Graphic Card
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaTab("animated_reel")}
                  className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-colors ${
                    activeMediaTab === "animated_reel"
                      ? "bg-white text-black shadow-2xs font-semibold"
                      : "text-black/50 hover:text-black"
                  }`}
                >
                  Animated Video Reel (Preview)
                </button>
              </div>
            </div>

            {/* Visual Preview Container */}
            {activeMediaTab === "graphic" ? (
              <div className="relative rounded-xl border border-black/[0.1] bg-gradient-to-br from-[#1F1D1A] to-[#121110] text-white p-6 shadow-inner overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col justify-between h-48">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-white/10 text-amber-300 font-semibold">
                        Friday Special
                      </span>
                      <span className="text-[10px] font-mono text-white/50">Northstar Café</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400">15% OFF PAIRING</span>
                  </div>

                  <div className="my-auto space-y-1">
                    <div className="text-2xl font-serif tracking-tight text-white">
                      Maple Cardamom Flat White
                    </div>
                    <div className="text-xs text-white/70">
                      Paired with fresh house-baked almond brioche
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60 font-mono">
                    <span>This Friday Only · While Pastries Last</span>
                    <span className="text-white/80">Northstar Café · 8:00 AM - 2:00 PM</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Animated Video Reel Simulation */
              <div className="relative rounded-xl border border-black/[0.1] bg-[#1a1918] text-white p-6 shadow-inner overflow-hidden flex flex-col items-center justify-center min-h-[192px]">
                {/* Coffee steam animation */}
                <div className="relative flex flex-col items-center mb-3">
                  <div className="flex gap-1.5 mb-1">
                    <span className="w-1 h-4 bg-amber-300/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1 h-6 bg-amber-300/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1 h-4 bg-amber-300/40 rounded-full animate-bounce" />
                  </div>
                  {/* Coffee cup */}
                  <div className="w-12 h-9 bg-amber-600/90 rounded-b-xl border-t-2 border-amber-400 flex items-center justify-center shadow-lg relative">
                    <div className="absolute -right-2 top-1.5 w-3 h-5 border-2 border-amber-400 rounded-r-lg" />
                    <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                    Simulated 10-second Animated Reel
                  </span>
                  <div className="text-xs text-white/80 font-medium">
                    "Warm up your Friday with Northstar's Maple Flat White"
                  </div>
                  <div className="text-[10px] text-white/50 font-mono">
                    Includes dynamic audio bed &amp; on-screen text animation
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Prepared Social Caption */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-black/60">
                Proposed Social Caption
              </span>
              {hasRevised && (
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Tone Updated: Casual &amp; Interactive
                </span>
              )}
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-black/[0.07] text-xs text-black/80 leading-relaxed font-sans select-all">
              {captionText}
            </div>
          </div>

          {/* Proposed Schedule & Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white border border-black/[0.07] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black/[0.04] flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-black/70" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-black/50 uppercase">Proposed Schedule</div>
                <div className="text-xs font-semibold text-black">
                  {GUIDED_TOUR_DATA.proposedSchedule}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-black/[0.07] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black/[0.04] flex items-center justify-center shrink-0">
                <Instagram className="w-4 h-4 text-black/70" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-black/50 uppercase">Connected Channels</div>
                <div className="text-xs font-semibold text-black flex items-center gap-1.5">
                  <span>Instagram &amp; Facebook</span>
                  <span className="text-[9px] font-mono bg-black/[0.05] px-1.5 py-0.2 rounded text-black/60">
                    Simulated
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="bg-[#FAF9F5] border-t border-black/[0.08] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-black/50 font-mono text-center sm:text-left">
            No real posts will be published. This is a demonstration.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                trackDemoEvent("demo_approval_clicked", { action: "request_changes" })
                onRequestChanges()
              }}
              disabled={isRevising}
              className="flex-1 sm:flex-initial px-4 py-2.5 border border-black/20 text-black/80 hover:text-black hover:bg-black/[0.04] rounded-xl text-xs font-medium transition-colors tracking-wider uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 cursor-pointer disabled:opacity-50"
            >
              Request Changes
            </button>

            <button
              type="button"
              onClick={() => {
                trackDemoEvent("demo_approval_clicked", { action: "approve" })
                onApprove()
              }}
              disabled={isRevising}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white rounded-xl text-xs font-semibold transition-all tracking-wider uppercase shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve &amp; Schedule</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

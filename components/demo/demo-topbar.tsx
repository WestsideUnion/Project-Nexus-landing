"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { RotateCcw, Menu, X, ArrowUpRight } from "lucide-react"
import { trackDemoEvent } from "@/lib/demo-analytics"

interface DemoTopbarProps {
  onReset: () => void
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}

export function DemoTopbar({
  onReset,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: DemoTopbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-black/[0.08] px-4 sm:px-6 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button + Nexus Brand + Northstar Cafe Badge */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 rounded-xl text-black/70 hover:text-black hover:bg-black/[0.05] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            aria-label={isMobileMenuOpen ? "Close dashboard navigation" : "Open dashboard navigation"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 rounded-lg p-0.5"
            title="Return to Nexus homepage"
          >
            <Image
              src="/nexus-logo.png"
              alt="Nexus logo"
              width={28}
              height={28}
              className="object-contain shrink-0"
            />
            <span className="font-pixel text-xs tracking-[0.2em] text-black/80 group-hover:text-black transition-colors hidden sm:inline">
              NEXUS
            </span>
          </Link>

          <div className="h-4 w-px bg-black/15 hidden sm:block" />

          {/* Business Workspace Badge */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold text-black tracking-tight">
                Northstar Café
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-black/[0.04] text-black/60 border border-black/[0.06]">
                Fictional demonstration business
              </span>
            </div>
            <span className="text-[10px] text-black/50 font-mono sm:hidden">
              Fictional demonstration business
            </span>
          </div>
        </div>

        {/* Center: Persistent Banner Badge */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-[11px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span>Interactive Preview — Sample Business Data</span>
        </div>

        {/* Right Side: Reset Demo Button + Consultation CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              onReset()
              trackDemoEvent("demo_reset")
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono uppercase tracking-wider font-semibold text-black/70 hover:text-black bg-white hover:bg-black/[0.04] border border-black/[0.12] rounded-xl transition-all shadow-2xs active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 cursor-pointer"
            title="Reset demonstration to initial state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>

          <a
            href="/#contact"
            onClick={() => trackDemoEvent("demo_consultation_clicked", { source: "topbar" })}
            className="flex items-center gap-1.5 px-4 py-2 text-[11px] font-sans font-semibold tracking-wider uppercase text-white bg-[#111] hover:bg-[#333] active:scale-[0.98] rounded-xl shadow-xs transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
          >
            <span>Book a Free Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5 hidden sm:inline" />
          </a>
        </div>
      </div>

      {/* Mobile-only persistent preview badge */}
      <div className="xl:hidden mt-2 pt-2 border-t border-black/[0.05] flex items-center justify-center gap-2 text-center text-[10px] font-mono text-amber-900 bg-amber-500/10 py-1 px-2 rounded-lg border border-amber-500/15">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 animate-pulse" />
        <span>Interactive Preview — Sample Business Data</span>
      </div>
    </header>
  )
}

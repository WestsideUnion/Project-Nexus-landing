"use client"

import React from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  CheckSquare,
  ShieldCheck,
  Calendar,
  Cable,
  Zap,
  ArrowLeft,
} from "lucide-react"

export type DemoTab =
  | "overview"
  | "tasks"
  | "approvals"
  | "schedule"
  | "connections"
  | "usage"

interface DemoSidebarProps {
  activeTab: DemoTab
  setActiveTab: (tab: DemoTab) => void
  pendingApprovalsCount: number
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}

export function DemoSidebar({
  activeTab,
  setActiveTab,
  pendingApprovalsCount,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: DemoSidebarProps) {
  const navItems = [
    {
      id: "overview" as DemoTab,
      label: "Overview",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "tasks" as DemoTab,
      label: "Tasks",
      icon: CheckSquare,
      badge: null,
    },
    {
      id: "approvals" as DemoTab,
      label: "Approvals",
      icon: ShieldCheck,
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount}` : null,
      badgeClass: "bg-amber-500/15 text-amber-900 border-amber-500/30",
    },
    {
      id: "schedule" as DemoTab,
      label: "Schedule",
      icon: Calendar,
      badge: "5",
      badgeClass: "bg-black/[0.05] text-black/60 border-black/[0.08]",
    },
    {
      id: "connections" as DemoTab,
      label: "Connections",
      icon: Cable,
      badge: "6",
      badgeClass: "bg-black/[0.05] text-black/60 border-black/[0.08]",
    },
    {
      id: "usage" as DemoTab,
      label: "Usage & Credits",
      icon: Zap,
      badge: null,
    },
  ]

  const handleSelectTab = (tab: DemoTab) => {
    setActiveTab(tab)
    setIsMobileMenuOpen(false)
  }

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between py-6 px-4">
      <div className="space-y-6">
        {/* Navigation Heading */}
        <div className="px-3">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-black/40">
            Demonstration Workspace
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5" aria-label="Dashboard Navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 ${
                  isActive
                    ? "bg-[#111] text-white shadow-sm font-semibold"
                    : "text-black/70 hover:text-black hover:bg-black/[0.04]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-white" : "text-black/50"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      isActive
                        ? "bg-white/20 text-white border-white/30"
                        : item.badgeClass || "bg-black/[0.05] text-black/60 border-black/[0.08]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Footer Area: Return to Nexus Website */}
      <div className="pt-6 border-t border-black/[0.08] space-y-3">
        <Link
          href="/"
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-black/65 hover:text-black hover:bg-black/[0.04] rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
        >
          <ArrowLeft className="w-4 h-4 text-black/45" />
          <span>Return to Nexus Website</span>
        </Link>

        {/* Consultation Callout in Sidebar */}
        <div className="p-3.5 rounded-xl bg-white border border-black/[0.07] shadow-2xs space-y-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-mono font-semibold uppercase text-black/70">
              Westside Union Setup
            </span>
          </div>
          <p className="text-[11px] text-black/60 leading-relaxed">
            Westside Union configures Nexus around the communication and work your business handles.
          </p>
          <a
            href="/#contact"
            className="block text-[11px] text-black font-semibold hover:underline pt-0.5"
          >
            Schedule a 1-on-1 review →
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar (visible lg+) */}
      <aside className="hidden lg:block w-64 shrink-0 bg-[#FAF9F5] border-r border-black/[0.08] min-h-[calc(100vh-61px)]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (visible when isMobileMenuOpen is true) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#FAF9F5] shadow-2xl border-r border-black/[0.1] z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}

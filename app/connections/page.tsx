"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import {
  Search,
  ShieldCheck,
  CheckCircle2,
  X,
  SlidersHorizontal,
  Layers,
  Lock,
  ArrowRight,
  Sparkles,
  KeyRound,
  Check,
} from "lucide-react"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { MobileNav } from "@/components/mobile-nav"
import { SiteFooter } from "@/components/site-footer"
import { ConsultationForm } from "@/components/consultation-form"
import { Tag, StatusPill, BackToTop } from "@/components/shared-ui"
import {
  CONNECTIONS_DATA,
  CONNECTION_CATEGORIES,
  CONNECTIONS_ECOSYSTEM_STATS,
  ConnectionItem,
  ConnectionStatus,
  ConnectionCategory,
} from "@/lib/site-data"
import { NexusConnectionsMap } from "@/components/nexus-visuals/nexus-connections-map"
import { AppLogo } from "@/components/nexus-icons/app-logo"

export default function ConnectionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedConnection, setSelectedConnection] = useState<ConnectionItem | null>(null)
  const [showOnlyPopular, setShowOnlyPopular] = useState(false)

  // Filter logic
  const filteredConnections = useMemo(() => {
    return CONNECTIONS_DATA.filter((item) => {
      // Search term
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchesName = item.name.toLowerCase().includes(query)
        const matchesDesc = item.desc.toLowerCase().includes(query)
        const matchesCategory = item.category.toLowerCase().includes(query)
        const matchesCapabilities = item.capabilities?.some((cap) =>
          cap.toLowerCase().includes(query)
        )
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesCapabilities) {
          return false
        }
      }

      // Category filter
      if (selectedCategory !== "all") {
        if (selectedCategory === "messaging" && item.category !== "messaging") return false
        if (selectedCategory !== "messaging" && item.category !== selectedCategory) return false
      }

      // Status filter
      if (selectedStatus !== "all" && item.status !== selectedStatus) {
        return false
      }

      // Popular filter
      if (showOnlyPopular && !item.popular) {
        return false
      }

      return true
    })
  }, [searchQuery, selectedCategory, selectedStatus, showOnlyPopular])

  const getCategoryLabel = (categoryKey: ConnectionCategory) => {
    const found = CONNECTION_CATEGORIES.find((c) => c.id === categoryKey)
    return found ? found.label : categoryKey.replace("_", " ")
  }

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      <MobileNav />

      {/* ── 1. HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-mono text-emerald-800 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            1,500+ APPS &amp; OPERATIONAL TOOLS SUPPORTED
          </div>

          <RevealText className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#111] leading-[1.08]">
            {"Connect with 1,500+ apps, messaging channels, and business tools."}
          </RevealText>

          <p className="text-sm sm:text-base text-black/70 max-w-3xl mx-auto leading-relaxed font-light">
            Nexus coordinates work across your software stack. From messaging and customer service to CRMs, POS, accounting, and dev tools—Westside Union configures managed authentication, least-privilege scoping, and owner approval safeguards.
          </p>

          {/* Key Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-black/[0.06] flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center shrink-0 shadow-2xs">
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <span className="text-xs font-semibold text-black block leading-none">1,500+ Apps</span>
                <span className="text-[10px] text-black/50 font-mono">Ecosystem ready</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-black/[0.06] flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center shrink-0 shadow-2xs">
                <KeyRound className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <span className="text-xs font-semibold text-black block leading-none">Managed Auth</span>
                <span className="text-[10px] text-black/50 font-mono">OAuth 2.0 &amp; tokens</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-black/[0.06] flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center shrink-0 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <span className="text-xs font-semibold text-black block leading-none">Owner Control</span>
                <span className="text-[10px] text-black/50 font-mono">Approval safeguards</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-black/[0.06] flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center shrink-0 shadow-2xs">
                <Layers className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <span className="text-xs font-semibold text-black block leading-none">MCP &amp; APIs</span>
                <span className="text-[10px] text-black/50 font-mono">Custom protocol sync</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#directory"
              className="px-6 py-3.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase shadow-sm"
            >
              Search Supported Tools
            </a>
            <a
              href="#contact"
              className="px-6 py-3.5 border border-black/20 text-black/80 text-xs font-medium rounded-xl hover:border-black/40 hover:text-black hover:bg-black/[0.03] transition-all tracking-widest uppercase"
            >
              Discuss Your Stack with Us
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. VISUAL CONNECTION MAP ─────────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-[#FAF9F5] border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Tag>ARCHITECTURE</Tag>
            <h2 className="text-2xl sm:text-3xl font-light text-[#111]">
              How Nexus Connects to Your Business
            </h2>
            <p className="text-xs sm:text-sm text-black/60 font-light">
              Message Nexus naturally on your channel of choice. It coordinates actions safely across your 1,500+ connected business tools.
            </p>
          </div>

          <NexusConnectionsMap />
        </div>
      </section>

      {/* ── 3. INTERACTIVE DIRECTORY & SEARCH ENGINE ─────────────────────────── */}
      <section id="directory" className="py-20 px-6 md:px-12 lg:px-20 bg-white border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Tag>INTEGRATION DIRECTORY</Tag>
                <span className="text-[10px] font-mono text-black/50 bg-black/[0.04] px-2 py-0.5 rounded-full">
                  1,500+ Total Ecosystem
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-[#111]">
                Explore Supported Tools &amp; Channels
              </h2>
              <p className="text-xs sm:text-sm text-black/60 font-light mt-1">
                Browse our directory of popular business integrations. Any app with an API or MCP server is supported.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setShowOnlyPopular(!showOnlyPopular)}
                className={`text-xs px-3.5 py-2 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer font-medium ${
                  showOnlyPopular
                    ? "bg-[#111] text-white border-[#111]"
                    : "bg-white text-black/70 border-black/15 hover:border-black/30"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Featured Only
              </button>
            </div>
          </div>

          {/* Search Bar & Status Filters */}
          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-black/[0.07] space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-black/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 1,500+ apps (e.g. Notion, Shopify, QuickBooks, Slack, Salesforce, Linear)..."
                  className="w-full pl-10 pr-9 py-2.5 bg-white border border-black/15 rounded-xl text-xs sm:text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/50 shadow-2xs transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-black"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-[10px] font-mono uppercase text-black/40 px-1 hidden lg:inline">Status:</span>
                {[
                  { id: "all", label: "All Statuses" },
                  { id: "available", label: "Available" },
                  { id: "supported", label: "Supported" },
                  { id: "configured", label: "Configured" },
                  { id: "custom", label: "Custom" },
                ].map((st) => {
                  const baseItems =
                    selectedCategory === "all"
                      ? CONNECTIONS_DATA
                      : CONNECTIONS_DATA.filter((item) => item.category === selectedCategory)
                  const count =
                    st.id === "all"
                      ? baseItems.length
                      : baseItems.filter((item) => item.status === st.id).length
                  const isSelected = selectedStatus === st.id

                  return (
                    <button
                      key={st.id}
                      onClick={() => setSelectedStatus(st.id)}
                      className={`text-[11px] px-3 py-1.5 rounded-lg border font-mono capitalize transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-[#111] text-white border-black shadow-2xs"
                          : count > 0
                          ? "bg-white text-black/70 border-black/[0.08] hover:border-black/25"
                          : "bg-white/60 text-black/35 border-black/[0.04] hover:border-black/15"
                      }`}
                    >
                      <span>{st.label}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                          isSelected ? "bg-white/20 text-white" : "bg-black/[0.05] text-black/50"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none pt-1 border-t border-black/[0.05]">
              {CONNECTION_CATEGORIES.map((cat) => {
                const count =
                  cat.id === "all"
                    ? CONNECTIONS_DATA.length
                    : CONNECTIONS_DATA.filter((i) => i.category === cat.id).length
                const isSelected = selectedCategory === cat.id

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id)
                      if (selectedStatus !== "all") {
                        const baseForCat =
                          cat.id === "all"
                            ? CONNECTIONS_DATA
                            : CONNECTIONS_DATA.filter((i) => i.category === cat.id)
                        const countWithStatus = baseForCat.filter(
                          (i) => i.status === selectedStatus
                        ).length
                        if (countWithStatus === 0) {
                          setSelectedStatus("all")
                        }
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? "bg-black text-white shadow-2xs"
                        : "bg-white/80 text-black/65 hover:text-black hover:bg-white border border-black/[0.06]"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? "bg-white/20 text-white font-semibold"
                          : "bg-black/[0.06] text-black/60 font-medium"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-black/60 px-1 gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span>
                Showing <strong>{filteredConnections.length}</strong>
                {showOnlyPopular ? " featured" : ""}
                {selectedStatus !== "all"
                  ? ` "${selectedStatus === "supported" ? "Supported Setup" : selectedStatus}"`
                  : ""}{" "}
                connections
                {selectedCategory !== "all" && (
                  <> in <strong>{getCategoryLabel(selectedCategory as ConnectionCategory)}</strong></>
                )}
                {selectedStatus !== "all" && selectedCategory !== "all" && (
                  <span className="text-black/45">
                    {" "}
                    (out of{" "}
                    {CONNECTIONS_DATA.filter((i) => i.category === selectedCategory).length} in this category)
                  </span>
                )}
                {selectedStatus !== "all" && selectedCategory === "all" && (
                  <span className="text-black/45">
                    {" "}
                    (out of {CONNECTIONS_DATA.length} total)
                  </span>
                )}
                {searchQuery && ` matching "${searchQuery}"`}
              </span>

              {(selectedStatus !== "all" || showOnlyPopular || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedStatus("all")
                    setShowOnlyPopular(false)
                    setSearchQuery("")
                  }}
                  className="ml-1 inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md hover:bg-emerald-100 hover:text-emerald-900 transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                  Clear filters (
                  {selectedCategory !== "all"
                    ? `show all ${
                        CONNECTIONS_DATA.filter((i) => i.category === selectedCategory).length
                      } in ${getCategoryLabel(selectedCategory as ConnectionCategory)}`
                    : `show all ${CONNECTIONS_DATA.length}`}
                  )
                </button>
              )}
            </div>
            <span className="font-mono text-[11px] text-black/45 shrink-0">
              1,500+ Total Ecosystem Available
            </span>
          </div>

          {/* Connection Cards Grid */}
          {filteredConnections.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredConnections.map((item) => {
                const isSelected = selectedConnection?.name === item.name
                return (
                  <div
                    key={item.id || item.name}
                    onClick={() => setSelectedConnection(isSelected ? null : item)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                      isSelected
                        ? "bg-[#FAF9F5] border-black/50 ring-2 ring-black/10 shadow-sm"
                        : "bg-white border-black/[0.08] hover:border-black/25 hover:shadow-2xs"
                    }`}
                  >
                    <div>
                      {/* Top Bar: Icon, Name & Status */}
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center shrink-0 shadow-2xs overflow-hidden p-2">
                            <AppLogo
                              id={item.id}
                              name={item.name}
                              iconType={item.iconType}
                              className="w-5 h-5"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="text-sm font-semibold text-[#111] leading-tight">
                                {item.name}
                              </h3>
                              {item.popular && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Popular Integration" />
                              )}
                            </div>
                            <span className="text-[10px] font-mono text-black/45 capitalize">
                              {getCategoryLabel(item.category)}
                            </span>
                          </div>
                        </div>

                        <StatusPill status={item.status} />
                      </div>

                      {/* Description */}
                      <p className="text-xs text-black/70 leading-relaxed mb-3 line-clamp-2">
                        {item.desc}
                      </p>

                      {/* Capabilities Chips */}
                      {item.capabilities && item.capabilities.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.capabilities.slice(0, 3).map((cap, i) => (
                            <span
                              key={i}
                              className="text-[10px] bg-[#FAF9F5] text-black/60 px-2 py-0.5 rounded-md border border-black/[0.05]"
                            >
                              {cap}
                            </span>
                          ))}
                          {item.capabilities.length > 3 && (
                            <span className="text-[10px] font-mono text-black/40 px-1 py-0.5">
                              +{item.capabilities.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom footer: Auth & Action CTA */}
                    <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between text-[11px]">
                      <span className="font-mono text-black/45 text-[10px] flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5 text-black/40" />
                        {item.authType || "Managed Auth"}
                      </span>
                      <span className="text-black/70 hover:text-black font-medium flex items-center gap-0.5 group">
                        {isSelected ? "Close details" : "View capabilities"}
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            /* Empty Search State with Custom Request */
            <div className="p-10 rounded-2xl bg-[#FAF9F5] border border-black/[0.08] text-center space-y-4 max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-center mx-auto shadow-2xs">
                <Sparkles className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-black">
                  Nexus supports {searchQuery ? `"${searchQuery}"` : "your software"} out of the box
                </h3>
                <p className="text-xs text-black/65 max-w-md mx-auto mt-1 leading-relaxed">
                  Our ecosystem supports over 1,500+ pre-built applications, plus any system that exposes an API, webhook, or Model Context Protocol (MCP) server.
                </p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSelectedStatus("all")
                    setShowOnlyPopular(false)
                  }}
                  className="px-4 py-2 bg-white border border-black/15 text-xs rounded-xl hover:bg-black/[0.02]"
                >
                  Clear search filters
                </button>
                <a
                  href="#contact"
                  className="px-4 py-2 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors"
                >
                  Request {searchQuery ? `"${searchQuery}"` : "Custom"} Setup →
                </a>
              </div>
            </div>
          )}

          {/* ── EXPANDABLE DETAIL DRAWER / MODAL ─────────────────────────────── */}
          {selectedConnection && (
            <div className="p-7 rounded-3xl bg-[#FAF9F5] border border-black/20 shadow-md space-y-6 animate-fadeIn">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-center shadow-xs overflow-hidden p-2.5">
                    <AppLogo
                      id={selectedConnection.id}
                      name={selectedConnection.name}
                      iconType={selectedConnection.iconType}
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-medium text-black">{selectedConnection.name}</h3>
                      <StatusPill status={selectedConnection.status} />
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-mono text-black/50">
                        Category: {getCategoryLabel(selectedConnection.category)}
                      </span>
                      <span className="text-black/30">·</span>
                      <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                        Auth: {selectedConnection.authType || "Managed OAuth 2.0"}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedConnection(null)}
                  className="w-8 h-8 rounded-full bg-white border border-black/10 text-black/60 hover:text-black flex items-center justify-center text-sm cursor-pointer shadow-2xs"
                  aria-label="Close details"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Panel 1: Description & Overview */}
                <div className="p-4 rounded-xl bg-white border border-black/[0.06] space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-black/45 font-semibold block">
                    Integration Overview
                  </span>
                  <p className="text-xs text-black/75 leading-relaxed">
                    {selectedConnection.desc}
                  </p>
                </div>

                {/* Panel 2: Supported AI Actions */}
                <div className="p-4 rounded-xl bg-white border border-black/[0.06] space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-black/45 font-semibold block">
                    Supported AI Actions
                  </span>
                  <ul className="space-y-1.5 text-xs text-black/75">
                    {selectedConnection.capabilities?.map((cap, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{cap}</span>
                      </li>
                    )) || (
                      <li className="text-black/50">Bidirectional queries and automated task triggers</li>
                    )}
                  </ul>
                </div>

                {/* Panel 3: Security & Governance Safeguards */}
                <div className="p-4 rounded-xl bg-white border border-black/[0.06] space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-black/45 font-semibold block">
                    Security &amp; Approval Rules
                  </span>
                  <p className="text-xs text-black/70 leading-relaxed">
                    Protected by owner approval rules. Write actions (such as customer messaging, invoicing, or external updates) wait for your confirmation before execution.
                  </p>
                  <div className="pt-1 text-[11px] text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Least-privilege permission scoping</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-black/[0.06]">
                <div className="text-xs text-black/60">
                  Ready to connect <strong>{selectedConnection.name}</strong> to your Nexus assistant?
                </div>
                <a
                  href="#contact"
                  className="px-5 py-2.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors"
                >
                  Verify {selectedConnection.name} Setup in Consultation →
                </a>
              </div>
            </div>
          )}

          {/* Availability disclosure */}
          <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-black/[0.05] text-xs text-black/65 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Global Ecosystem Availability:</strong> Connection availability depends on third-party provider permissions, account tier eligibility, and your selected Nexus package. Westside Union securely handles credentials, tests bidirectional data flows, and configures owner approval rules during your onboarding consultation.
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. ENTERPRISE INTEGRATION ARCHITECTURE ──────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#FAF9F5] border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <Tag>ENTERPRISE SECURITY</Tag>
            <h2 className="text-3xl font-light text-[#111]">
              How Nexus safeguards your connected systems.
            </h2>
            <p className="text-xs sm:text-sm text-black/65 font-light leading-relaxed">
              Connecting AI to real business software requires strict permission boundaries, encrypted credential handling, and reliable human oversight.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] border border-black/[0.06] flex items-center justify-center">
                <KeyRound className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-sm font-semibold text-black">Managed Authentication</h3>
              <p className="text-xs text-black/60 leading-relaxed">
                Tokens are encrypted in transit and at rest with automated OAuth 2.0 lifecycle management. You never expose raw passwords or admin secrets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] border border-black/[0.06] flex items-center justify-center">
                <Lock className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-sm font-semibold text-black">Least-Privilege Scoping</h3>
              <p className="text-xs text-black/60 leading-relaxed">
                Nexus only requests the granular scopes needed to perform your agreed routines—such as drafting an email without deleting messages.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] border border-black/[0.06] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-sm font-semibold text-black">Owner Approval Rules</h3>
              <p className="text-xs text-black/60 leading-relaxed">
                High-impact actions—like charging credit cards, sending customer replies, or publishing content—wait for your explicit 1-tap confirmation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] border border-black/[0.06] flex items-center justify-center">
                <Layers className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-sm font-semibold text-black">Universal MCP Extensibility</h3>
              <p className="text-xs text-black/60 leading-relaxed">
                Seamlessly connect internal microservices, private databases, and custom scripts via Model Context Protocol servers and webhooks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. HOW WESTSIDE UNION SETS UP CONNECTIONS ────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-white border-b border-black/[0.06]">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="max-w-3xl space-y-3 text-center md:text-left">
            <PixelIcon type="platform" size={40} />
            <Tag>MANAGED ONBOARDING</Tag>
            <h2 className="text-3xl font-light text-[#111]">
              Zero technical lift for your team.
            </h2>
            <p className="text-xs sm:text-sm text-black/60 leading-relaxed">
              Westside Union manages the integration lifecycle end-to-end so your business tools coordinate smoothly from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                title: "Discovery & Audit",
                desc: "We review the specific software and communication channels your business currently uses.",
              },
              {
                step: "02",
                title: "Secure Authorization",
                desc: "You grant secure, scoped permissions through standard OAuth screens with least-privilege access.",
              },
              {
                step: "03",
                title: "Mapping & Guardrails",
                desc: "We map data routines, test sample tasks, and configure owner approval triggers with you.",
              },
              {
                step: "04",
                title: "Continuous Monitoring",
                desc: "Westside Union monitors connector uptime, token refreshes, and API schema updates continuously.",
              },
            ].map((s) => (
              <div key={s.step} className="p-5 rounded-2xl bg-[#FAF9F5] border border-black/[0.06] shadow-2xs space-y-2">
                <span className="font-mono text-xs text-black/40">{s.step}</span>
                <h3 className="text-sm font-medium text-[#111]">{s.title}</h3>
                <p className="text-xs text-black/55 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. "DON'T SEE YOUR TOOL?" BANNER ─────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-[#FAF9F5] border-b border-black/[0.06]">
        <div className="max-w-5xl mx-auto rounded-3xl border border-black/[0.08] bg-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-mono tracking-widest text-black/50 uppercase font-semibold">
              UNIVERSAL API &amp; MCP PROTOCOL EXTENSIBILITY
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-black">
              Using a proprietary or industry-specific tool?
            </h3>
            <p className="text-xs sm:text-sm text-black/65 max-w-xl leading-relaxed">
              In addition to our 1,500+ pre-built application integrations, Nexus supports any system that exposes an API, webhook, or Model Context Protocol (MCP) server. Westside Union builds, tests, and deploys custom bridges during onboarding.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-6 py-3.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase shadow-sm whitespace-nowrap"
          >
            Discuss Custom Setup →
          </a>
        </div>
      </section>

      {/* ── 7. CONSULTATION FORM ────────────────────────────────────────────── */}
      <ConsultationForm
        title="Discuss the tools your business uses."
        subtitle="Let us know what software and messaging channels you currently rely on, and we will verify compatibility across our 1,500+ supported integrations during a free consultation."
      />

      <SiteFooter />
      <BackToTop />
    </div>
  )
}

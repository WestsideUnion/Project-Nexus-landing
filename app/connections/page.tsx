"use client"

import React, { useState, useMemo, useEffect, useCallback } from "react"
import {
  Search,
  ShieldCheck,
  X,
  ArrowRight,
  Sparkles,
  Check,
  Plus,
  Wrench,
} from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { SiteFooter } from "@/components/site-footer"
import { ConsultationForm } from "@/components/consultation-form"
import { BackToTop } from "@/components/shared-ui"
import {
  CONNECTIONS_DATA,
  CONNECTION_CATEGORIES,
  ConnectionItem,
  ConnectionCategory,
  ConnectionStatus,
} from "@/lib/site-data"
import {
  STATUS_META,
  FILTERABLE_STATUSES,
  QUICK_PICKS,
  rankConnection,
  StackItem,
  stackItemFromConnection,
  customStackItem,
  STACK_STORAGE_KEY,
} from "@/lib/connections"
import { NexusConnectionsMap } from "@/components/nexus-visuals/nexus-connections-map"
import { AppLogo } from "@/components/nexus-icons/app-logo"
import { ConnectionCard, FOCUS_RING } from "@/components/connections/connection-card"
import { ConnectionDetailSheet } from "@/components/connections/connection-detail-sheet"
import { StackBar } from "@/components/connections/stack-bar"

const PAGE_SIZE = 24

const matchesQuery = (item: ConnectionItem, rawQuery: string) => {
  const query = rawQuery.toLowerCase().trim()
  if (!query) return true
  const matchesName = item.name.toLowerCase().includes(query)
  const matchesDesc = item.desc.toLowerCase().includes(query)
  const matchesCategory = item.category.toLowerCase().includes(query)
  const matchesCapabilities = item.capabilities?.some((cap) =>
    cap.toLowerCase().includes(query)
  )
  return Boolean(matchesName || matchesDesc || matchesCategory || matchesCapabilities)
}

export default function ConnectionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedConnection, setSelectedConnection] = useState<ConnectionItem | null>(null)
  const [showOnlyPopular, setShowOnlyPopular] = useState(false)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [stack, setStack] = useState<StackItem[]>([])

  // Restore saved stack from sessionStorage so mobile interruptions or refreshes never lose selections.
  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(STACK_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) setStack(parsed)
      }
    } catch {
      // Ignore storage access errors in private browsing modes.
    }
  }, [])

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STACK_STORAGE_KEY, JSON.stringify(stack))
    } catch {
      // Ignore storage access errors.
    }
  }, [stack])

  // Reset pagination whenever filters change.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [searchQuery, selectedCategory, selectedStatus, showOnlyPopular])

  const stackKeys = useMemo(() => new Set(stack.map((s) => s.key)), [stack])

  const toggleStackItem = useCallback((item: ConnectionItem) => {
    const entry = stackItemFromConnection(item)
    setStack((prev) =>
      prev.some((s) => s.key === entry.key)
        ? prev.filter((s) => s.key !== entry.key)
        : [...prev, entry]
    )
  }, [])

  const ensureInStack = useCallback((item: ConnectionItem) => {
    const entry = stackItemFromConnection(item)
    setStack((prev) => (prev.some((s) => s.key === entry.key) ? prev : [...prev, entry]))
  }, [])

  const addCustomToolToStack = useCallback((rawName: string) => {
    const trimmed = rawName.trim()
    if (!trimmed) return
    const entry = customStackItem(trimmed)
    setStack((prev) => (prev.some((s) => s.key === entry.key) ? prev : [...prev, entry]))
  }, [])

  const removeStackByKey = useCallback((key: string) => {
    setStack((prev) => prev.filter((s) => s.key !== key))
  }, [])

  const removeStackByName = useCallback((name: string) => {
    setStack((prev) => prev.filter((s) => s.name !== name))
  }, [])

  const clearStack = useCallback(() => {
    setStack([])
  }, [])

  const quickPickItems = useMemo(() => {
    return QUICK_PICKS.map((pick) => {
      const found = CONNECTIONS_DATA.find((c) => c.id === pick.id)
      return found ? { item: found, label: pick.label } : null
    }).filter((x): x is { item: ConnectionItem; label: string } => x !== null)
  }, [])

  // Items matching search + popular toggle (used to compute accurate category & status counts).
  const queryAndPopularPool = useMemo(() => {
    return CONNECTIONS_DATA.filter((item) => {
      if (!matchesQuery(item, searchQuery)) return false
      if (showOnlyPopular && !item.popular) return false
      return true
    })
  }, [searchQuery, showOnlyPopular])

  // Dynamic category counts that respect active search, status, and popular filters.
  const categoryCounts = useMemo(() => {
    const pool =
      selectedStatus === "all"
        ? queryAndPopularPool
        : queryAndPopularPool.filter((i) => i.status === selectedStatus)
    const map: Record<string, number> = { all: pool.length }
    for (const cat of CONNECTION_CATEGORIES) {
      if (cat.id !== "all") {
        map[cat.id] = pool.filter((i) => i.category === cat.id).length
      }
    }
    return map
  }, [queryAndPopularPool, selectedStatus])

  // Dynamic status counts that respect active search, category, and popular filters.
  const statusCounts = useMemo(() => {
    const pool =
      selectedCategory === "all"
        ? queryAndPopularPool
        : queryAndPopularPool.filter((i) => i.category === selectedCategory)
    const map: Record<string, number> = { all: pool.length }
    for (const st of FILTERABLE_STATUSES) {
      map[st] = pool.filter((i) => i.status === st).length
    }
    return map
  }, [queryAndPopularPool, selectedCategory])

  // Filtered and curated list of connections.
  const filteredConnections = useMemo(() => {
    const matches = queryAndPopularPool.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false
      }
      if (selectedStatus !== "all" && item.status !== selectedStatus) {
        return false
      }
      return true
    })

    // When browsing "All Integrations" without a search query, surface everyday SMB tools first.
    if (selectedCategory === "all" && !searchQuery.trim()) {
      return [...matches].sort((a, b) => rankConnection(a) - rankConnection(b))
    }

    return matches
  }, [queryAndPopularPool, selectedCategory, selectedStatus, searchQuery])

  const visibleConnections = useMemo(
    () => filteredConnections.slice(0, visibleCount),
    [filteredConnections, visibleCount]
  )

  const remainingCount = Math.max(0, filteredConnections.length - visibleConnections.length)

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedStatus !== "all" ||
    showOnlyPopular ||
    searchQuery.trim().length > 0

  const resetAllFilters = useCallback(() => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedStatus("all")
    setShowOnlyPopular(false)
  }, [])

  const getCategoryLabel = useCallback((categoryKey: ConnectionCategory | string) => {
    const found = CONNECTION_CATEGORIES.find((c) => c.id === categoryKey)
    return found ? found.label : categoryKey.replace("_", " ")
  }, [])

  const showEngineerCallout =
    selectedCategory === "engineering" ||
    selectedCategory === "custom" ||
    selectedStatus === "custom"

  const activeStatusDescription =
    selectedStatus !== "all" && STATUS_META[selectedStatus as ConnectionStatus]
      ? STATUS_META[selectedStatus as ConnectionStatus].description
      : "Every integration is set up and tested with you during onboarding — from 1-click sign-ins to custom engineer-built connectors."

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      <MobileNav />

      {/* ── 1. HERO + IMMEDIATE SEARCH & STACK PICKER ─────────────────────── */}
      <section className="pt-32 sm:pt-36 pb-14 px-6 md:px-12 lg:px-20 border-b border-black/6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#111] leading-[1.08] text-balance">
              Works with the tools you already use.
            </h1>

            <p className="text-sm sm:text-base text-black/70 max-w-2xl mx-auto leading-relaxed font-light">
              Check the apps, point-of-sale systems, calendars, and messaging channels your business runs on today. We set up everyday tools during onboarding — and if you need a custom connector, a DevOps engineer from the team behind Nexus handles the technical work for you.
            </p>
          </div>

          {/* Immediate Search Box */}
          <div className="mt-8 max-w-2xl mx-auto">
            <label htmlFor="connection-search" className="sr-only">
              Search supported apps, POS systems, and custom connectors
            </label>
            <div className="relative flex items-center">
              <Search
                className="w-5 h-5 text-black/55 absolute left-4 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="connection-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 276+ tools (e.g. Square, QuickBooks, WhatsApp, Gmail, Fresha)…"
                className="w-full pl-12 pr-28 py-4 bg-[#FAF9F5] border border-black/15 rounded-2xl text-sm sm:text-base text-[#111] placeholder:text-black/55 focus:bg-white focus:outline-none focus:border-[#111] focus:ring-2 focus:ring-black/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className={`absolute right-3 inline-flex items-center gap-1 min-h-9 px-3 rounded-xl bg-black/6 hover:bg-black/10 text-xs font-medium text-[#111] cursor-pointer ${FOCUS_RING}`}
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                  Clear
                </button>
              ) : (
                <a
                  href="#directory"
                  className={`hidden sm:inline-flex items-center gap-1 absolute right-3 min-h-9 px-3.5 rounded-xl bg-[#111] text-white text-xs font-medium hover:bg-[#333] transition-colors ${FOCUS_RING}`}
                >
                  Browse all
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              )}
            </div>

            {/* One-tap quick stack picks */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-black/65 mr-1">
                Common business tools — tap to add to your stack:
              </span>
              {quickPickItems.map(({ item, label }) => {
                const key = item.id || item.name
                const inStack = stackKeys.has(key)
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleStackItem(item)}
                    aria-pressed={inStack}
                    className={`inline-flex items-center gap-1.5 min-h-9 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${FOCUS_RING} ${inStack
                        ? "bg-[#111] text-white border-[#111]"
                        : "bg-[#FAF9F5] text-[#111] border-black/10 hover:border-black/30 hover:bg-white"
                      }`}
                  >
                    <span className="w-4 h-4 rounded-xs flex items-center justify-center overflow-hidden shrink-0">
                      <AppLogo id={item.id} name={item.name} iconType={item.iconType} className="w-3.5 h-3.5" />
                    </span>
                    <span>{label}</span>
                    {inStack ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-black/55" aria-hidden="true" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Compact 3-pillar editorial strip (replaces the old 9 pre-directory cards) */}
          <dl className="mt-12 pt-8 border-t border-black/8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="space-y-1">
              <dt className="text-sm font-medium text-[#111] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
                Keep what already works
              </dt>
              <dd className="text-xs text-black/65 leading-relaxed pl-3.5">
                No rip-and-replace. Nexus works alongside the software, calendars, and spreadsheets your staff already knows.
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-sm font-medium text-[#111] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
                Custom connectors built by our engineers
              </dt>
              <dd className="text-xs text-black/65 leading-relaxed pl-3.5">
                Need a specialized POS, database, or webhook bridge? A Westside Union DevOps engineer builds and maintains it for you.
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-sm font-medium text-[#111] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
                Owner approval rules
              </dt>
              <dd className="text-xs text-black/65 leading-relaxed pl-3.5">
                Customer replies, schedule changes, and external updates can always require your confirmation first.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── 2. INTERACTIVE DIRECTORY & STACK BUILDER ──────────────────────── */}
      <section id="directory" className="py-16 px-6 md:px-12 lg:px-20 bg-[#F5F4F0] border-b border-black/6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-light text-[#111] tracking-tight">
                Supported apps, channels &amp; custom connectors
              </h2>
              <p className="text-xs sm:text-sm text-black/65 mt-1 max-w-2xl">
                Click any card to see example workflows, or tap <strong>&ldquo;I use this&rdquo;</strong> to build your stack for our team to review.
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setShowOnlyPopular((v) => !v)}
                aria-pressed={showOnlyPopular}
                className={`min-h-10 text-xs px-3.5 py-2 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer font-medium ${FOCUS_RING} ${showOnlyPopular
                    ? "bg-[#111] text-white border-[#111]"
                    : "bg-white text-black/75 border-black/15 hover:border-black/35"
                  }`}
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                Popular business tools only
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/8 space-y-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
            {/* Category Tabs with right-edge scroll fade affordance */}
            <div className="relative">
              <div
                role="group"
                aria-label="Filter by tool category"
                className="flex items-center gap-1.5 overflow-x-auto pb-1 pr-8 [scrollbar-width:none]"
              >
                {CONNECTION_CATEGORIES.map((cat) => {
                  const count = categoryCounts[cat.id] ?? 0
                  const isSelected = selectedCategory === cat.id

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      aria-pressed={isSelected}
                      className={`min-h-10 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 ${FOCUS_RING} ${isSelected
                          ? "bg-[#111] text-white shadow-2xs"
                          : count > 0
                            ? "bg-[#FAF9F5] text-black/75 hover:text-black hover:bg-black/6 border border-black/8"
                            : "bg-[#FAF9F5]/60 text-black/55 hover:text-black border border-black/6"
                        }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[11px] font-mono px-1.5 py-0.5 rounded-full leading-none ${isSelected
                            ? "bg-white/20 text-white font-semibold"
                            : "bg-black/6 text-black/65 font-medium"
                          }`}
                      >
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-white to-transparent sm:hidden"
              />
            </div>

            {/* Setup Type (Status) Row + Plain-English Explanation */}
            <div className="pt-3 border-t border-black/6 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div
                role="group"
                aria-label="Filter by setup type"
                className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 [scrollbar-width:none]"
              >
                <span className="text-xs font-medium text-black/65 pr-1 shrink-0">
                  Setup type:
                </span>
                {[
                  { id: "all", label: "All setup types" },
                  ...FILTERABLE_STATUSES.map((st) => ({
                    id: st,
                    label: STATUS_META[st].label,
                  })),
                ].map((st) => {
                  const count = statusCounts[st.id] ?? 0
                  const isSelected = selectedStatus === st.id

                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setSelectedStatus(st.id)}
                      aria-pressed={isSelected}
                      className={`min-h-9 text-xs px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 ${FOCUS_RING} ${isSelected
                          ? "bg-[#111] text-white border-[#111] shadow-2xs"
                          : count > 0
                            ? "bg-[#FAF9F5] text-black/75 border-black/10 hover:border-black/30"
                            : "bg-[#FAF9F5]/60 text-black/55 border-black/6 hover:border-black/20"
                        }`}
                    >
                      <span>{st.label}</span>
                      <span
                        className={`text-[11px] font-mono px-1.5 py-0.5 rounded-full leading-none ${isSelected ? "bg-white/20 text-white" : "bg-black/6 text-black/65"
                          }`}
                      >
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>

              <p className="text-xs text-black/65 lg:text-right">
                {activeStatusDescription}
              </p>
            </div>
          </div>

          {/* Engineer-Managed Context Callout when viewing Dev/Engineering or Custom APIs */}
          {showEngineerCallout && (
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FAF9F5] border border-black/8 flex items-center justify-center shrink-0 mt-0.5">
                  <Wrench className="w-4 h-4 text-[#111]" aria-hidden="true" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-medium text-[#111]">
                    Handled by Westside Union&apos;s DevOps engineers — no technical work for you
                  </h3>
                  <p className="text-xs text-black/65 leading-relaxed max-w-3xl">
                    These technical connectors, databases, and custom APIs are listed so you know what is possible. If your business needs a custom integration or legacy bridge, our engineering team builds, secures, and maintains it end-to-end.
                  </p>
                </div>
              </div>
              <a
                href="#contact"
                className={`shrink-0 inline-flex items-center justify-center min-h-10 px-4 rounded-xl bg-[#111] text-white text-xs font-medium hover:bg-[#333] transition-colors ${FOCUS_RING}`}
              >
                Ask an engineer
              </a>
            </div>
          )}

          {/* Results Summary Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-black/65 px-1 gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span>
                Showing <strong>{visibleConnections.length}</strong> of{" "}
                <strong>{filteredConnections.length}</strong>
                {showOnlyPopular ? " popular" : ""}
                {selectedStatus !== "all" && STATUS_META[selectedStatus as ConnectionStatus]
                  ? ` "${STATUS_META[selectedStatus as ConnectionStatus].label}"`
                  : ""}{" "}
                tools
                {selectedCategory !== "all" && (
                  <>
                    {" "}
                    in <strong>{getCategoryLabel(selectedCategory)}</strong>
                  </>
                )}
                {searchQuery.trim() && ` matching "${searchQuery.trim()}"`}
              </span>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className={`inline-flex items-center gap-1 min-h-8 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer ${FOCUS_RING}`}
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                  Clear all filters
                </button>
              )}
            </div>
            <span className="text-xs text-black/65 shrink-0">
              {stack.length > 0
                ? `${stack.length} ${stack.length === 1 ? "tool" : "tools"} in your stack`
                : "Tap “I use this” on any card to build your stack"}
            </span>
          </div>

          {/* Connection Cards Grid */}
          {filteredConnections.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleConnections.map((item) => {
                  const key = item.id || item.name
                  return (
                    <ConnectionCard
                      key={key}
                      item={item}
                      categoryLabel={getCategoryLabel(item.category)}
                      inStack={stackKeys.has(key)}
                      onToggleStack={toggleStackItem}
                      onOpenDetails={setSelectedConnection}
                    />
                  )
                })}
              </div>

              {/* Pagination Controls */}
              {remainingCount > 0 && (
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                    className={`min-h-11 px-6 py-2.5 rounded-xl bg-[#111] text-white text-xs font-medium hover:bg-[#333] transition-colors cursor-pointer ${FOCUS_RING}`}
                  >
                    Show {Math.min(PAGE_SIZE, remainingCount)} more tools ({remainingCount} remaining)
                  </button>
                  {remainingCount > PAGE_SIZE && (
                    <button
                      type="button"
                      onClick={() => setVisibleCount(filteredConnections.length)}
                      className={`min-h-11 px-5 py-2.5 rounded-xl bg-white border border-black/15 text-xs font-medium text-[#111] hover:border-black/40 transition-colors cursor-pointer ${FOCUS_RING}`}
                    >
                      Show all {filteredConnections.length} tools
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-black/8 text-center space-y-4 max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF9F5] border border-black/8 flex items-center justify-center mx-auto">
                <Wrench className="w-5 h-5 text-[#111]" aria-hidden="true" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-medium text-[#111]">
                  {searchQuery.trim()
                    ? `Don’t see "${searchQuery.trim()}" in the list?`
                    : "No tools match that exact filter combination."}
                </h3>
                <p className="text-xs sm:text-sm text-black/65 max-w-md mx-auto leading-relaxed">
                  {searchQuery.trim()
                    ? "Add it to your stack anyway — whether it’s an industry-specific platform, legacy system, or shared spreadsheet, a Westside Union DevOps engineer will evaluate and connect it for you."
                    : "Try viewing all setup types in this category, or clear your filters to browse the full catalog."}
                </p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                {searchQuery.trim() ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        addCustomToolToStack(searchQuery)
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                      }}
                      className={`min-h-11 px-5 py-2.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors cursor-pointer inline-flex items-center gap-1.5 ${FOCUS_RING}`}
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                      Add &ldquo;{searchQuery.trim()}&rdquo; to my stack &amp; ask our team
                    </button>
                    <button
                      type="button"
                      onClick={resetAllFilters}
                      className={`min-h-11 px-4 py-2.5 bg-[#FAF9F5] border border-black/15 text-xs font-medium text-[#111] rounded-xl hover:border-black/35 cursor-pointer ${FOCUS_RING}`}
                    >
                      Clear search &amp; filters
                    </button>
                  </>
                ) : (
                  <>
                    {selectedStatus !== "all" && selectedCategory !== "all" && (
                      <button
                        type="button"
                        onClick={() => setSelectedStatus("all")}
                        className={`min-h-11 px-5 py-2.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors cursor-pointer ${FOCUS_RING}`}
                      >
                        Show all setup types in {getCategoryLabel(selectedCategory)}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={resetAllFilters}
                      className={`min-h-11 px-4 py-2.5 bg-[#FAF9F5] border border-black/15 text-xs font-medium text-[#111] rounded-xl hover:border-black/35 cursor-pointer ${FOCUS_RING}`}
                    >
                      Reset all filters
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Single compatibility disclosure */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/6 text-xs text-black/65 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <strong>Compatibility &amp; custom connectors:</strong> Everyday integrations are switched on during onboarding. If your business relies on a custom database, industry-specific software, or private API, a Westside Union DevOps engineer scopes and builds the connector with you.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. ARCHITECTURE TOPOLOGY & MANAGED ONBOARDING ─────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-white border-b border-black/6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="space-y-6">
            <div className="max-w-3xl space-y-2">
              <h2 className="text-2xl sm:text-3xl font-light text-[#111] tracking-tight">
                Less switching. Less re-entering. One managed workflow.
              </h2>
              <p className="text-xs sm:text-sm text-black/65 leading-relaxed">
                {stack.length > 0
                  ? "Here is how Nexus sits between your messaging channels and the tools you selected above — keeping approvals in your hands."
                  : "Nexus connects the channels where you and your customers already talk to the business software where your records live."}
              </p>
            </div>

            <NexusConnectionsMap stack={stack} />
          </div>

          {/* 4-Step Onboarding Sequence */}
          <div className="pt-8 border-t border-black/8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-2xl space-y-2">
                <h2 className="text-2xl sm:text-3xl font-light text-[#111] tracking-tight">
                  Zero technical lift for your team.
                </h2>
                <p className="text-xs sm:text-sm text-black/65 leading-relaxed">
                  Whether you use standard off-the-shelf apps or need a custom connector built by our DevOps engineers, Westside Union handles the setup from start to finish.
                </p>
              </div>
              <a
                href="#contact"
                className={`self-start md:self-auto shrink-0 inline-flex items-center gap-1.5 min-h-11 px-5 py-2.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors ${FOCUS_RING}`}
              >
                Request a custom workflow review
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Stack & Workflow Review",
                  desc: "We look at the tools, calendars, spreadsheets, and channels your team relies on today.",
                },
                {
                  step: "02",
                  title: "Practical Starting Point",
                  desc: "We connect your everyday apps first and have our DevOps engineers scope any custom connectors.",
                },
                {
                  step: "03",
                  title: "Owner Approval Rules",
                  desc: "We configure clear permissions and confirmation boundaries around customer replies and records.",
                },
                {
                  step: "04",
                  title: "Managed Maintenance",
                  desc: "Westside Union monitors your connections and updates workflows as your business evolves.",
                },
              ].map((s) => (
                <li key={s.step} className="pt-4 border-t border-black/15 space-y-2">
                  <span className="font-mono text-xs text-black/65 font-medium">{s.step}</span>
                  <h3 className="text-sm font-medium text-[#111]">{s.title}</h3>
                  <p className="text-xs text-black/65 leading-relaxed">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── 4. CONSULTATION FORM (WITH STACK HAND-OFF) ────────────────────── */}
      <ConsultationForm
        defaultPackage="Not sure yet — Help me compare"
        title="Discuss the tools your business uses."
        subtitle="Any tools you added to your stack above are included below. Tell us how your team works today, and we’ll walk through the most practical starting point."
        tools={stack.map((s) => s.name)}
        onRemoveTool={removeStackByName}
      />

      {/* Accessible Detail Sheet (Modal Drawer) */}
      <ConnectionDetailSheet
        item={selectedConnection}
        categoryLabel={selectedConnection ? getCategoryLabel(selectedConnection.category) : ""}
        inStack={
          selectedConnection
            ? stackKeys.has(selectedConnection.id || selectedConnection.name)
            : false
        }
        onOpenChange={(open) => {
          if (!open) setSelectedConnection(null)
        }}
        onToggleStack={toggleStackItem}
        onDiscuss={(item) => {
          ensureInStack(item)
          setSelectedConnection(null)
        }}
      />

      {/* Sticky "My Stack" Bar */}
      <StackBar stack={stack} onRemove={removeStackByKey} onClear={clearStack} />

      <SiteFooter />
      <BackToTop />
    </div>
  )
}

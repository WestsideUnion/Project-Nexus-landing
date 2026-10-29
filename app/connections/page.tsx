"use client"

import React, { useState, useMemo } from "react"
import {
  Search,
  ShieldCheck,
  X,
  Lock,
  ArrowRight,
  Sparkles,
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
  ConnectionItem,
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

      if (selectedCategory !== "all") {
        if (selectedCategory === "messaging" && item.category !== "messaging") return false
        if (selectedCategory !== "messaging" && item.category !== selectedCategory) return false
      }

      if (selectedStatus !== "all" && item.status !== selectedStatus) {
        return false
      }

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
      <section className="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-black/6 bg-white">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <Tag>INTEGRATIONS &amp; WORKFLOW FIT</Tag>

          <RevealText className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#111] leading-[1.08]">
            {"Works with the tools\nyou already use."}
          </RevealText>

          <p className="text-sm sm:text-base text-black/70 max-w-3xl mx-auto leading-relaxed font-light">
            Your business shouldn&apos;t have to start over to work smarter. Tell us the apps and systems your team relies on, and we&apos;ll help identify ways to bring the right information and workflows together.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#directory"
              className="px-6 py-3.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase shadow-sm"
            >
              Check My Tools
            </a>
            <a
              href="#contact"
              className="px-6 py-3.5 border border-black/20 text-black/80 text-xs font-medium rounded-xl hover:border-black/40 hover:text-black hover:bg-black/3 transition-all tracking-widest uppercase"
            >
              Discuss Your Stack with Us
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. VALUE FRAMING SECTION ────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#FAF9F5] border-b border-black/6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <Tag>WORKFLOW CONTINUITY</Tag>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111] tracking-tight">
              Less switching. Less re-entering. More getting things done.
            </h2>
            <p className="text-xs sm:text-sm text-black/65 leading-relaxed font-light">
              Many small businesses already use a mix of email, calendars, spreadsheets, booking systems, point-of-sale tools, and messaging apps. The challenge usually isn&apos;t lack of software — it&apos;s that the information lives in too many places and someone on your team still has to tie it all together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Keep what works",
                desc: "You do not need to replace the tools your staff already knows how to use.",
              },
              {
                title: "Make information easier to use",
                desc: "Bring key questions, updates, and follow-ups into a simpler daily workflow.",
              },
              {
                title: "Build around your workflow",
                desc: "We look at what your team actually does every day and recommend the most practical starting point.",
              },
            ].map((card, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-black/7 shadow-2xs space-y-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-600" />
                <h3 className="text-base font-medium text-[#111]">{card.title}</h3>
                <p className="text-xs text-black/65 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Common Tool Categories Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            {[
              {
                cat: "Email, Calendar & Daily Productivity",
                desc: "Stay on top of incoming messages, appointments, reminders, and daily priorities.",
              },
              {
                cat: "Spreadsheets, Documents & Notes",
                desc: "Turn scattered trackers, checklists, and internal documents into information your team can actually use.",
              },
              {
                cat: "Booking, Scheduling & Customer Communication",
                desc: "Keep inquiries, confirmations, and follow-ups moving across the channels your customers use.",
              },
              {
                cat: "Point-of-Sale, Orders & E-Commerce",
                desc: "Bring clearer visibility to daily sales activity, order questions, and operational recaps.",
              },
              {
                cat: "Customer Lists & Lead Tracking",
                desc: "Keep track of leads, repeat customers, quotes, and next steps without letting opportunities go cold.",
              },
              {
                cat: "Accounting & Back-Office Workflows",
                desc: "Reduce repetitive admin around bills, reminders, and routine financial organization.",
              },
            ].map((c, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/80 border border-black/5 space-y-1.5">
                <h4 className="text-xs font-semibold text-[#111]">{c.cat}</h4>
                <p className="text-xs text-black/60 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <NexusConnectionsMap />
        </div>
      </section>

      {/* ── 3. INTERACTIVE DIRECTORY & SEARCH ENGINE ─────────────────────────── */}
      <section id="directory" className="py-20 px-6 md:px-12 lg:px-20 bg-white border-b border-black/6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Tag>INTEGRATION DIRECTORY</Tag>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-[#111]">
                Explore Common Tools &amp; Channels
              </h2>
              <p className="text-xs sm:text-sm text-black/60 font-light mt-1 max-w-2xl">
                We support a range of integrations and can evaluate others as part of your setup. Compatibility and availability vary by software, account, and requested workflow.
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
          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-black/7 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-black/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools (e.g. Gmail, Google Calendar, Shopify, QuickBooks, Square, Slack)..."
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
                          ? "bg-white text-black/70 border-black/8 hover:border-black/25"
                          : "bg-white/60 text-black/35 border-black/4 hover:border-black/15"
                      }`}
                    >
                      <span>{st.label}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                          isSelected ? "bg-white/20 text-white" : "bg-black/5 text-black/50"
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
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none pt-1 border-t border-black/5">
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
                        : "bg-white/80 text-black/65 hover:text-black hover:bg-white border border-black/6"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? "bg-white/20 text-white font-semibold"
                          : "bg-black/6 text-black/60 font-medium"
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
                tools
                {selectedCategory !== "all" && (
                  <> in <strong>{getCategoryLabel(selectedCategory as ConnectionCategory)}</strong></>
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
                  Clear filters
                </button>
              )}
            </div>
            <span className="font-mono text-[11px] text-black/45 shrink-0">
              Evaluated &amp; configured during onboarding
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
                        : "bg-white border-black/8 hover:border-black/25 hover:shadow-2xs"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white border border-black/8 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden p-2">
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

                      <p className="text-xs text-black/70 leading-relaxed mb-3 line-clamp-2">
                        {item.desc}
                      </p>

                      {item.capabilities && item.capabilities.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.capabilities.slice(0, 3).map((cap, i) => (
                            <span
                              key={i}
                              className="text-[10px] bg-[#FAF9F5] text-black/60 px-2 py-0.5 rounded-md border border-black/5"
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

                    <div className="pt-3 border-t border-black/5 flex items-center justify-between text-[11px]">
                      <span className="font-mono text-black/45 text-[10px] flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5 text-black/40" />
                        Guided Setup
                      </span>
                      <span className="text-black/70 hover:text-black font-medium flex items-center gap-0.5 group">
                        {isSelected ? "Close details" : "View workflow examples"}
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="p-10 rounded-2xl bg-[#FAF9F5] border border-black/8 text-center space-y-4 max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-white border border-black/8 flex items-center justify-center mx-auto shadow-2xs">
                <Sparkles className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-black">
                  Don&apos;t see {searchQuery ? `"${searchQuery}"` : "your tool"} listed?
                </h3>
                <p className="text-xs text-black/65 max-w-md mx-auto mt-1 leading-relaxed">
                  Tell us what your team uses today — even if it is an industry-specific platform, a shared spreadsheet, or a manual process. During your consultation, we&apos;ll walk through what can be connected now and what options make the most sense.
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
                  className="px-4 py-2 bg-white border border-black/15 text-xs rounded-xl hover:bg-black/2"
                >
                  Clear search filters
                </button>
                <a
                  href="#contact"
                  className="px-4 py-2 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors"
                >
                  Ask About {searchQuery ? `"${searchQuery}"` : "Your Tools"} →
                </a>
              </div>
            </div>
          )}

          {/* ── EXPANDABLE DETAIL DRAWER / MODAL ─────────────────────────────── */}
          {selectedConnection && (
            <div className="p-7 rounded-3xl bg-[#FAF9F5] border border-black/20 shadow-md space-y-6 animate-fadeIn">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-black/8 flex items-center justify-center shadow-xs overflow-hidden p-2.5">
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
                <div className="p-4 rounded-xl bg-white border border-black/6 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-black/45 font-semibold block">
                    Workflow Overview
                  </span>
                  <p className="text-xs text-black/75 leading-relaxed">
                    {selectedConnection.desc}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-black/6 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-black/45 font-semibold block">
                    Example Workflows
                  </span>
                  <ul className="space-y-1.5 text-xs text-black/75">
                    {selectedConnection.capabilities?.map((cap, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{cap}</span>
                      </li>
                    )) || (
                      <li className="text-black/50">Information lookup and routine task assistance</li>
                    )}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-black/6 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-black/45 font-semibold block">
                    Owner Control &amp; Permissions
                  </span>
                  <p className="text-xs text-black/70 leading-relaxed">
                    Protected by your approval rules. Customer replies, schedule changes, or external updates can require your confirmation before anything is sent.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-black/6">
                <div className="text-xs text-black/60">
                  Want to discuss how <strong>{selectedConnection.name}</strong> fits your workflow?
                </div>
                <a
                  href="#contact"
                  className="px-5 py-2.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors"
                >
                  Discuss {selectedConnection.name} in Consultation →
                </a>
              </div>
            </div>
          )}

          {/* Availability disclosure */}
          <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-black/5 text-xs text-black/65 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Compatibility &amp; Availability Note:</strong> We support a range of integrations and can evaluate others as part of your setup. Compatibility and availability vary by software, account, and requested workflow.
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. HOW WESTSIDE UNION SETS UP CONNECTIONS ────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#FAF9F5] border-b border-black/6">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="max-w-3xl space-y-3 text-center md:text-left">
            <PixelIcon type="platform" size={40} />
            <Tag>MANAGED ONBOARDING</Tag>
            <h2 className="text-3xl font-light text-[#111]">
              Zero technical lift for your team.
            </h2>
            <p className="text-xs sm:text-sm text-black/60 leading-relaxed">
              Westside Union helps evaluate and configure your workflow connections so your team does not have to wrestle with setup on their own.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                title: "Workflow Review",
                desc: "We look at the tools, calendars, spreadsheets, and channels your team relies on today.",
              },
              {
                step: "02",
                title: "Practical Starting Point",
                desc: "We identify what can be connected now and what routine work should be simplified first.",
              },
              {
                step: "03",
                title: "Approval Rules",
                desc: "We configure clear permissions and owner approval boundaries around sensitive actions.",
              },
              {
                step: "04",
                title: "Ongoing Support",
                desc: "Westside Union monitors your setup and helps adjust workflows as your business evolves.",
              },
            ].map((s) => (
              <div key={s.step} className="p-5 rounded-2xl bg-white border border-black/6 shadow-2xs space-y-2">
                <span className="font-mono text-xs text-black/40">{s.step}</span>
                <h3 className="text-sm font-medium text-[#111]">{s.title}</h3>
                <p className="text-xs text-black/55 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. "DON'T SEE YOUR TOOL LISTED?" BANNER ──────────────────────────── */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-white border-b border-black/6">
        <div className="max-w-5xl mx-auto rounded-3xl border border-black/8 bg-[#FAF9F5] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-mono tracking-widest text-black/50 uppercase font-semibold">
              CUSTOM &amp; INDUSTRY-SPECIFIC WORKFLOWS
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-black">
              Don&apos;t see your tool listed?
            </h3>
            <p className="text-xs sm:text-sm text-black/65 max-w-xl leading-relaxed">
              Tell us what your team uses today — even if it is an industry-specific platform, a shared spreadsheet, or a manual process. During your consultation, we&apos;ll walk through what can be connected now, what can be simplified first, and what options make the most sense for your business.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-6 py-3.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase shadow-sm whitespace-nowrap"
          >
            Check My Tools →
          </a>
        </div>
      </section>

      {/* ── 6. CONSULTATION FORM ────────────────────────────────────────────── */}
      <ConsultationForm
        title="Discuss the tools your business uses."
        subtitle="Tell us what software, spreadsheets, or messaging channels your team relies on today, and we'll walk through the most practical starting point."
      />

      <SiteFooter />
      <BackToTop />
    </div>
  )
}

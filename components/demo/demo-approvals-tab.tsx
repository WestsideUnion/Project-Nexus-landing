"use client"

import React, { useState } from "react"
import { ShieldCheck, CheckCircle2, RefreshCw, Eye, ShieldAlert, Sparkles } from "lucide-react"
import { DEMO_APPROVALS, DemoApprovalItem } from "@/lib/demo-data"
import { trackDemoEvent } from "@/lib/demo-analytics"

interface DemoApprovalsTabProps {
  onOpenGuidedApproval: () => void
}

export function DemoApprovalsTab({ onOpenGuidedApproval }: DemoApprovalsTabProps) {
  const [approvals, setApprovals] = useState<DemoApprovalItem[]>(DEMO_APPROVALS)
  const [activeItem, setActiveItem] = useState<DemoApprovalItem | null>(null)

  const handleApprove = (id: string) => {
    trackDemoEvent("demo_approval_clicked", { action: "approve_tab_item", itemId: id })
    setApprovals((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "approved",
              statusNote: "Approved in demonstration (no real publish)",
            }
          : item
      )
    )
  }

  const handleRequestChanges = (id: string) => {
    trackDemoEvent("demo_approval_clicked", { action: "request_changes_tab_item", itemId: id })
    setApprovals((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "revised",
              statusNote: "Simulated revision queued: tone adjusted and updated",
            }
          : item
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-black/[0.08] space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-800 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            Control &amp; Privacy Safeguards
          </span>
          <span className="text-[10px] font-mono text-black/50">
            Simulated Owner Approvals
          </span>
        </div>
        <h3 className="text-lg font-semibold text-black tracking-tight">
          Owner Approvals &amp; Authorizations
        </h3>
        <p className="text-xs text-black/60 max-w-2xl">
          Public actions, customer quotes, and outward messages pause until you review and confirm them. Nexus never sends messages or publishes content without explicit permission.
        </p>
      </div>

      {/* Approvals Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {approvals.map((appr) => {
          const isPending = appr.status === "pending"
          const isApproved = appr.status === "approved"
          const isRevised = appr.status === "revised"

          return (
            <div
              key={appr.id}
              className={`p-5 rounded-2xl bg-white border transition-all ${
                isPending
                  ? "border-amber-300 shadow-sm"
                  : "border-black/[0.08] shadow-2xs opacity-90"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-black/50 font-semibold">
                    {appr.category}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      isApproved
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : isRevised
                        ? "bg-blue-50 text-blue-800 border-blue-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}
                  >
                    {appr.statusNote}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-black/40">{appr.requestedAt}</span>
              </div>

              {/* Card Body */}
              <div className="py-4 space-y-3">
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-black">
                    {appr.title}
                  </h4>
                  <p className="text-xs text-black/65 mt-0.5">{appr.summary}</p>
                </div>

                {/* Preview Box */}
                <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-black/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-black/50 uppercase">
                    <span>Drafted Content Preview</span>
                    <span>{appr.previewContent.headline}</span>
                  </div>

                  <div className="text-xs sm:text-sm text-black/80 leading-relaxed font-sans italic bg-white p-3 rounded-lg border border-black/[0.04]">
                    "{appr.previewContent.bodyText}"
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px] font-mono">
                    {appr.previewContent.details.map((d, i) => (
                      <div key={i} className="p-2 bg-white/70 rounded-lg border border-black/[0.04]">
                        <span className="text-black/45 block text-[9px] uppercase">{d.label}</span>
                        <span className="font-semibold text-black/80">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/[0.06]">
                <span className="text-[10px] font-mono text-black/45">
                  Safe demo action · No external message or post is sent
                </span>

                <div className="flex items-center gap-2">
                  {appr.id === "appr-friday-promo" ? (
                    <button
                      onClick={onOpenGuidedApproval}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold tracking-wider uppercase shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Open Full Media Review</span>
                    </button>
                  ) : isPending ? (
                    <>
                      <button
                        onClick={() => handleRequestChanges(appr.id)}
                        className="px-3.5 py-1.5 border border-black/20 text-black/70 hover:text-black hover:bg-black/[0.04] rounded-lg text-xs font-medium transition-colors cursor-pointer"
                      >
                        Request Changes
                      </button>
                      <button
                        onClick={() => handleApprove(appr.id)}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() =>
                        setApprovals((prev) =>
                          prev.map((item) =>
                            item.id === appr.id
                              ? {
                                  ...item,
                                  status: "pending",
                                  statusNote: "Waiting for owner review",
                                }
                              : item
                          )
                        )
                      }
                      className="text-xs text-black/60 hover:text-black font-mono underline"
                    >
                      Reset item status
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

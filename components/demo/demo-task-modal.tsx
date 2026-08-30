"use client"

import React, { useEffect, useRef } from "react"
import { CheckCircle2, Clock, X, FileText, Send, ShieldCheck, MapPin } from "lucide-react"
import { DemoTask } from "@/lib/demo-data"

interface DemoTaskModalProps {
  task: DemoTask | null
  isOpen: boolean
  onClose: () => void
}

export function DemoTaskModal({ task, isOpen, onClose }: DemoTaskModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !task) return null

  const report = task.report

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-black/15 overflow-hidden z-10 animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-[#FAF9F5] border-b border-black/[0.08] px-6 py-4 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest font-semibold text-black/50">
                Activity Report · {task.category}
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  task.column === "completed"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : task.column === "in_progress"
                    ? "bg-blue-50 text-blue-800 border-blue-200"
                    : "bg-amber-50 text-amber-800 border-amber-200"
                }`}
              >
                {task.column === "completed" ? "Completed & Logged" : task.badgeLabel}
              </span>
            </div>
            <h2 id="task-modal-title" className="text-base sm:text-lg font-semibold text-black tracking-tight">
              {task.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-black/50 hover:text-black hover:bg-black/[0.05] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            aria-label="Close task details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {report ? (
            <div className="space-y-4">
              {/* 1. What Nexus was asked to do */}
              <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-black/[0.06] space-y-1.5">
                <div className="flex items-center gap-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-black/50">
                  <FileText className="w-3.5 h-3.5 text-black/60" />
                  <span>1. What Nexus was asked to do</span>
                </div>
                <p className="text-xs sm:text-sm text-black/85 leading-relaxed font-medium">
                  {report.askedToDo}
                </p>
              </div>

              {/* 2. What Nexus prepared */}
              <div className="p-3.5 rounded-xl bg-white border border-black/[0.08] space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-black/50">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>2. What Nexus prepared</span>
                </div>
                <p className="text-xs sm:text-sm text-black/80 leading-relaxed">
                  {report.prepared}
                </p>
              </div>

              {/* 3. Whether approval was required */}
              <div className="p-3.5 rounded-xl bg-white border border-black/[0.08] space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-black/50">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>3. Whether approval was required</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      report.approvalRequired ? "bg-amber-500" : "bg-emerald-500"
                    }`}
                  />
                  <span className="text-xs font-semibold text-black">
                    {report.approvalRequired ? "Yes — Owner Approval Required" : "No — Handled Automatically"}
                  </span>
                </div>
                {report.approvalDetails && (
                  <p className="text-[11px] text-black/65 leading-relaxed">
                    {report.approvalDetails}
                  </p>
                )}
              </div>

              {/* 4. What was completed */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>4. What was completed</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                  {report.completedAction}
                </p>
              </div>

              {/* 5 & 6. When and Where delivered */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-black/[0.06]">
                  <div className="text-[10px] font-mono uppercase text-black/45 mb-1">
                    5. When completed
                  </div>
                  <div className="text-xs font-semibold text-black/80 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-black/50" />
                    <span>{report.completedAt}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-black/[0.06]">
                  <div className="text-[10px] font-mono uppercase text-black/45 mb-1">
                    6. Delivery destination
                  </div>
                  <div className="text-xs font-semibold text-black/80 flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-black/50" />
                    <span className="truncate">{report.deliveredTo}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-black/60">{task.description}</p>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#FAF9F5] border-t border-black/[0.08] px-6 py-3 flex items-center justify-between">
          <span className="text-[10px] font-mono text-black/40">
            Northstar Café · Fictional Demonstration Record
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#111] text-white text-xs font-medium rounded-lg hover:bg-[#333] transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  )
}

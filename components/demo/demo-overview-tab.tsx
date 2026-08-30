"use client"

import React, { useState } from "react"
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileText,
  ShieldCheck,
  Zap,
  Activity,
  Calendar,
  Layers,
} from "lucide-react"
import { DemoMetric, DemoTask, DEMO_SENSE_EVENT } from "@/lib/demo-data"
import { GuidedDemoState } from "./demo-guided-tour"

interface DemoOverviewTabProps {
  metrics: DemoMetric[]
  tasks: DemoTask[]
  onSelectTask: (task: DemoTask) => void
  onOpenApproval: () => void
  demoState: GuidedDemoState
}

export function DemoOverviewTab({
  metrics,
  tasks,
  onSelectTask,
  onOpenApproval,
  demoState,
}: DemoOverviewTabProps) {
  // Mobile column switcher state (default to active column or "todo")
  const [mobileActiveCol, setMobileActiveCol] = useState<"todo" | "in_progress" | "completed">("todo")

  const todoTasks = tasks.filter((t) => t.column === "todo")
  const inProgressTasks = tasks.filter((t) => t.column === "in_progress")
  const completedTasks = tasks.filter((t) => t.column === "completed")

  // Auto-switch mobile view if guided demo changes
  React.useEffect(() => {
    if (demoState === "todo") setMobileActiveCol("todo")
    if (demoState === "in_progress" || demoState === "awaiting_approval" || demoState === "revising")
      setMobileActiveCol("in_progress")
    if (demoState === "completed") setMobileActiveCol("completed")
  }, [demoState])

  const renderTaskCard = (task: DemoTask) => {
    const isGuided = task.isGuidedTask
    const isHighlight =
      isGuided &&
      (demoState === "todo" ||
        demoState === "in_progress" ||
        demoState === "awaiting_approval" ||
        demoState === "revising" ||
        demoState === "completed")

    return (
      <div
        key={task.id}
        onClick={() => {
          if (task.column === "in_progress" && (demoState === "awaiting_approval" || demoState === "revising")) {
            onOpenApproval()
          } else {
            onSelectTask(task)
          }
        }}
        className={`p-4 rounded-xl border transition-all cursor-pointer text-left space-y-2.5 ${
          isHighlight
            ? "bg-white border-amber-400 shadow-md ring-2 ring-amber-400/20"
            : "bg-white border-black/[0.07] hover:border-black/20 hover:shadow-xs shadow-2xs"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-medium text-black/50 uppercase tracking-wider">
            {task.category}
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
            {task.badgeLabel}
          </span>
        </div>

        <div>
          <h4 className="text-xs sm:text-sm font-semibold text-black leading-snug flex items-center gap-1.5">
            {task.column === "completed" ? (
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                ✓
              </span>
            ) : task.column === "in_progress" ? (
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            )}
            <span>{task.title}</span>
          </h4>
          <p className="text-[11px] text-black/65 line-clamp-2 mt-1 leading-relaxed">
            {task.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-black/[0.04] text-[10px] font-mono text-black/45">
          <span>{task.timeLabel}</span>
          <span className="text-black/60 font-sans font-medium flex items-center gap-1">
            {task.column === "completed" ? "View report →" : "View details →"}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* ── 1. Top Metrics Bar ─────────────────────────────────────────────── */}
      <section aria-labelledby="metrics-heading">
        <div className="flex items-center justify-between mb-3">
          <h3 id="metrics-heading" className="text-xs font-mono font-semibold tracking-wider uppercase text-black/50">
            Today's Operating Overview · Northstar Café
          </h3>
          <span className="text-[10px] font-mono text-black/50 bg-black/[0.04] px-2.5 py-0.5 rounded-full border border-black/[0.06]">
            Illustrative demo data—not actual customer results.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {metrics.map((m) => (
            <div
              key={m.id}
              className="p-4 rounded-2xl bg-white border border-black/[0.07] shadow-2xs flex flex-col justify-between space-y-2 hover:border-black/15 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-black/60 font-medium leading-tight">
                  <span>{m.label}</span>
                  {m.id === "credits_remaining" && <Zap className="w-3.5 h-3.5 text-amber-500" />}
                </div>
                <div className="text-2xl font-serif font-bold text-black tracking-tight mt-1">
                  {m.value}
                </div>
              </div>

              <div className="pt-2 border-t border-black/[0.04] space-y-0.5">
                <div className="text-[10px] text-black/60 font-mono leading-tight">
                  {m.subtext}
                </div>
                {m.disclaimer && (
                  <div className="text-[9px] font-mono text-black/45 italic">
                    *{m.disclaimer}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. Primary 3-Panel Task Board ───────────────────────────────────── */}
      <section aria-labelledby="taskboard-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 id="taskboard-heading" className="text-base font-semibold text-black tracking-tight">
              Nexus Task Management Board
            </h3>
            <p className="text-xs text-black/60">
              Work captured from messaging channels, organized into active drafts, and delivered upon approval.
            </p>
          </div>

          {/* Mobile Column Switcher (visible sm:hidden) */}
          <div className="flex lg:hidden items-center bg-black/[0.05] p-1 rounded-xl border border-black/[0.06]">
            <button
              onClick={() => setMobileActiveCol("todo")}
              className={`flex-1 py-1.5 px-3 text-[11px] font-mono font-medium rounded-lg transition-all ${
                mobileActiveCol === "todo"
                  ? "bg-white text-black shadow-2xs font-semibold"
                  : "text-black/60 hover:text-black"
              }`}
            >
              To Do ({todoTasks.length})
            </button>
            <button
              onClick={() => setMobileActiveCol("in_progress")}
              className={`flex-1 py-1.5 px-3 text-[11px] font-mono font-medium rounded-lg transition-all ${
                mobileActiveCol === "in_progress"
                  ? "bg-white text-black shadow-2xs font-semibold"
                  : "text-black/60 hover:text-black"
              }`}
            >
              In Progress ({inProgressTasks.length})
            </button>
            <button
              onClick={() => setMobileActiveCol("completed")}
              className={`flex-1 py-1.5 px-3 text-[11px] font-mono font-medium rounded-lg transition-all ${
                mobileActiveCol === "completed"
                  ? "bg-white text-black shadow-2xs font-semibold"
                  : "text-black/60 hover:text-black"
              }`}
            >
              Completed ({completedTasks.length})
            </button>
          </div>
        </div>

        {/* Desktop 3-Column Grid / Mobile Single Column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Column 1: To Do */}
          <div
            className={`space-y-3 p-4 rounded-2xl bg-[#FAF9F5] border border-black/[0.07] ${
              mobileActiveCol !== "todo" ? "hidden lg:block" : "block"
            }`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold tracking-widest text-black/50 uppercase">
                  STAGE 01
                </span>
                <span className="text-xs font-semibold text-black">To Do</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                {todoTasks.length}
              </span>
            </div>

            <div className="text-[11px] text-black/55">
              Thoughts, requests, and reminders captured from WhatsApp and business channels.
            </div>

            <div className="space-y-3 pt-1">
              {todoTasks.map(renderTaskCard)}
            </div>
          </div>

          {/* Column 2: In Progress */}
          <div
            className={`space-y-3 p-4 rounded-2xl bg-[#FAF9F5] border border-black/[0.07] ${
              mobileActiveCol !== "in_progress" ? "hidden lg:block" : "block"
            }`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold tracking-widest text-black/50 uppercase">
                  STAGE 02
                </span>
                <span className="text-xs font-semibold text-black">In Progress</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                {inProgressTasks.length}
              </span>
            </div>

            <div className="text-[11px] text-black/55">
              Drafts in brand voice, cross-referencing knowledge, or holding for owner approval.
            </div>

            <div className="space-y-3 pt-1">
              {inProgressTasks.map(renderTaskCard)}
            </div>
          </div>

          {/* Column 3: Completed */}
          <div
            className={`space-y-3 p-4 rounded-2xl bg-[#FAF9F5] border border-black/[0.07] ${
              mobileActiveCol !== "completed" ? "hidden lg:block" : "block"
            }`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold tracking-widest text-black/50 uppercase">
                  STAGE 03
                </span>
                <span className="text-xs font-semibold text-black">Completed</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {completedTasks.length}
              </span>
            </div>

            <div className="text-[11px] text-black/55">
              Delivered work with logged plain-language audit reports. Click to view report.
            </div>

            <div className="space-y-3 pt-1">
              {completedTasks.map(renderTaskCard)}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Nexus Sense Preview Card ─────────────────────────────────────── */}
      <section aria-labelledby="nexus-sense-heading">
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col sm:flex-row items-start justify-between gap-5">
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase bg-amber-50 text-amber-800 border border-amber-200/80">
                {DEMO_SENSE_EVENT.badge}
              </span>
              <span className="text-[10px] font-mono text-black/45">
                {DEMO_SENSE_EVENT.occurredAt}
              </span>
            </div>

            <h4 id="nexus-sense-heading" className="text-sm sm:text-base font-semibold text-black tracking-tight">
              {DEMO_SENSE_EVENT.title}
            </h4>

            <p className="text-xs sm:text-sm text-black/70 leading-relaxed max-w-2xl">
              {DEMO_SENSE_EVENT.description}
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-black/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Action: {DEMO_SENSE_EVENT.actionTaken}</span>
            </div>
          </div>

          <div className="sm:self-center p-3 rounded-xl bg-[#FAF9F5] border border-black/[0.06] text-right shrink-0">
            <div className="text-[10px] font-mono text-black/40 uppercase">Hardware Integration</div>
            <div className="text-xs font-semibold text-black">Nexus Sense Preview</div>
            <div className="text-[9px] font-mono text-black/45 mt-1 max-w-[200px] text-right">
              {DEMO_SENSE_EVENT.safeDisclaimer}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

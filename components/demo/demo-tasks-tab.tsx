"use client"

import React, { useState } from "react"
import { CheckSquare, Filter, Clock, CheckCircle2, ShieldAlert } from "lucide-react"
import { DemoTask } from "@/lib/demo-data"

interface DemoTasksTabProps {
  tasks: DemoTask[]
  onSelectTask: (task: DemoTask) => void
  onOpenApproval: () => void
}

type FilterType = "all" | "todo" | "in_progress" | "approval" | "completed"

export function DemoTasksTab({ tasks, onSelectTask, onOpenApproval }: DemoTasksTabProps) {
  const [filter, setFilter] = useState<FilterType>("all")

  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true
    if (filter === "todo") return t.column === "todo"
    if (filter === "in_progress") return t.column === "in_progress"
    if (filter === "approval") return t.approvalRequired && t.column !== "completed"
    if (filter === "completed") return t.column === "completed"
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.08]">
        <div>
          <h3 className="text-lg font-semibold text-black tracking-tight">
            All Business Tasks &amp; Coordination
          </h3>
          <p className="text-xs text-black/60">
            Fictional Northstar Café task register organized across active stages.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center flex-wrap gap-1.5 p-1 bg-black/[0.04] rounded-xl border border-black/[0.06]">
          {[
            { id: "all" as FilterType, label: `All (${tasks.length})` },
            { id: "todo" as FilterType, label: "To Do" },
            { id: "in_progress" as FilterType, label: "In Progress" },
            { id: "approval" as FilterType, label: "Needs Approval" },
            { id: "completed" as FilterType, label: "Completed" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                filter === f.id
                  ? "bg-white text-black font-semibold shadow-2xs"
                  : "text-black/60 hover:text-black"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Task List Table / Cards */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onSelectTask(task)}
            className="p-4 rounded-xl bg-white border border-black/[0.07] hover:border-black/20 hover:shadow-xs shadow-2xs transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-black/50 uppercase tracking-wider">
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
                  {task.column === "completed" ? "Completed" : task.badgeLabel}
                </span>
                {task.approvalRequired && task.column !== "completed" && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/20 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 text-amber-600" />
                    <span>Approval Required</span>
                  </span>
                )}
              </div>

              <h4 className="text-sm font-semibold text-black flex items-center gap-2">
                {task.column === "completed" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Clock className="w-4 h-4 text-black/40 shrink-0" />
                )}
                <span>{task.title}</span>
              </h4>

              <p className="text-xs text-black/65 max-w-2xl">{task.description}</p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-black/[0.05]">
              <span className="text-[10px] font-mono text-black/45">{task.timeLabel}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectTask(task)
                }}
                className="text-xs font-semibold text-black hover:underline"
              >
                {task.column === "completed" ? "View completion report →" : "View task details →"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

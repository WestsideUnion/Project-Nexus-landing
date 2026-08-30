"use client"

import React, { useState, useEffect, useCallback } from "react"
import { DemoTopbar } from "@/components/demo/demo-topbar"
import { DemoSidebar, DemoTab } from "@/components/demo/demo-sidebar"
import { DemoGuidedTour, GuidedDemoState } from "@/components/demo/demo-guided-tour"
import { DemoOverviewTab } from "@/components/demo/demo-overview-tab"
import { DemoTasksTab } from "@/components/demo/demo-tasks-tab"
import { DemoApprovalsTab } from "@/components/demo/demo-approvals-tab"
import { DemoScheduleTab } from "@/components/demo/demo-schedule-tab"
import { DemoConnectionsTab } from "@/components/demo/demo-connections-tab"
import { DemoUsageTab } from "@/components/demo/demo-usage-tab"
import { DemoApprovalModal } from "@/components/demo/demo-approval-modal"
import { DemoTaskModal } from "@/components/demo/demo-task-modal"
import {
  INITIAL_DEMO_METRICS,
  UPDATED_DEMO_METRICS,
  INITIAL_DEMO_TASKS,
  DemoTask,
  DemoMetric,
} from "@/lib/demo-data"
import { trackDemoEvent } from "@/lib/demo-analytics"

export default function DemoPage() {
  // Navigation tab state
  const [activeTab, setActiveTab] = useState<DemoTab>("overview")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Guided Demonstration state machine
  const [demoState, setDemoState] = useState<GuidedDemoState>("idle")
  const [hasRevised, setHasRevised] = useState(false)
  const [isRevising, setIsRevising] = useState(false)

  // Data state
  const [metrics, setMetrics] = useState<DemoMetric[]>(INITIAL_DEMO_METRICS)
  const [tasks, setTasks] = useState<DemoTask[]>(INITIAL_DEMO_TASKS)

  // Modals state
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false)
  const [selectedTaskForModal, setSelectedTaskForModal] = useState<DemoTask | null>(null)

  // Track initial demo view once on mount
  useEffect(() => {
    trackDemoEvent("demo_viewed")
  }, [])

  // Number of pending approvals
  const pendingApprovalsCount =
    demoState === "awaiting_approval" || demoState === "revising" ? 3 : 2

  // ── Reset Demo State ───────────────────────────────────────────────────────
  const handleResetDemo = useCallback(() => {
    setDemoState("idle")
    setHasRevised(false)
    setIsRevising(false)
    setMetrics(INITIAL_DEMO_METRICS)
    setTasks(INITIAL_DEMO_TASKS)
    setIsApprovalModalOpen(false)
    setSelectedTaskForModal(null)
    setActiveTab("overview")
    trackDemoEvent("demo_reset")
  }, [])

  // ── Start Guided Demo ──────────────────────────────────────────────────────
  const handleStartDemo = () => {
    setDemoState("request_received")
    trackDemoEvent("demo_started")
    trackDemoEvent("demo_step_viewed", { step: "request_received" })
  }

  // ── Advance Guided Demo to Next Step ───────────────────────────────────────
  const handleNextStep = () => {
    switch (demoState) {
      case "request_received":
        // Move to Step 2: To Do
        setDemoState("todo")
        trackDemoEvent("demo_step_viewed", { step: "todo" })
        break

      case "todo":
        // Move to Step 3: In Progress
        setDemoState("in_progress")
        setTasks((prev) =>
          prev.map((t) =>
            t.id === "task-friday-promo"
              ? { ...t, column: "in_progress", badgeLabel: "Drafting Content" }
              : t
          )
        )
        trackDemoEvent("demo_step_viewed", { step: "in_progress" })
        break

      case "in_progress":
        // Move to Step 4: Awaiting Approval
        setDemoState("awaiting_approval")
        setTasks((prev) =>
          prev.map((t) =>
            t.id === "task-friday-promo"
              ? { ...t, badgeLabel: "Needs 1-Tap Approval" }
              : t
          )
        )
        setIsApprovalModalOpen(true)
        trackDemoEvent("demo_step_viewed", { step: "awaiting_approval" })
        break

      case "awaiting_approval":
      case "revising":
        setIsApprovalModalOpen(true)
        break

      case "approved":
        // Move to Step 6 & 7: Completed & Metrics update
        setDemoState("completed")
        setTasks((prev) =>
          prev.map((t) =>
            t.id === "task-friday-promo"
              ? { ...t, column: "completed", badgeLabel: "Approved & Scheduled" }
              : t
          )
        )
        setMetrics(UPDATED_DEMO_METRICS)
        trackDemoEvent("demo_completed")
        break

      default:
        break
    }
  }

  // ── Handle Approval Modal Actions ──────────────────────────────────────────
  const handleApproveFromModal = () => {
    setIsApprovalModalOpen(false)
    setDemoState("completed")
    setTasks((prev) =>
      prev.map((t) =>
        t.id === "task-friday-promo"
          ? {
              ...t,
              column: "completed",
              badgeLabel: "Approved & Scheduled",
              report: {
                ...t.report!,
                completedAction: "Friday campaign approved and scheduled in this demonstration.",
                completedAt: "10:45 AM (Demonstration schedule)",
              },
            }
          : t
      )
    )
    setMetrics(UPDATED_DEMO_METRICS)
    trackDemoEvent("demo_approval_clicked", { action: "approved_and_completed" })
    trackDemoEvent("demo_completed")
  }

  const handleRequestChangesFromModal = () => {
    setIsRevising(true)
    setDemoState("revising")
    // Simulate short revision delay (frontend-only timer)
    setTimeout(() => {
      setIsRevising(false)
      setHasRevised(true)
      setDemoState("awaiting_approval")
    }, 1200)
  }

  return (
    <div className="bg-[#FAF9F5] min-h-screen text-[#111] font-sans antialiased selection:bg-black selection:text-white flex flex-col">
      {/* ── Top Bar ────────────────────────────────────────────────────────── */}
      <DemoTopbar
        onReset={handleResetDemo}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* ── Dashboard Shell (Sidebar + Main Content Area) ──────────────────── */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Left Navigation Sidebar */}
        <DemoSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          pendingApprovalsCount={pendingApprovalsCount}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Main Dashboard Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {/* Guided Tour Banner (Shown on Overview Tab) */}
          {activeTab === "overview" && (
            <DemoGuidedTour
              demoState={demoState}
              onStartDemo={handleStartDemo}
              onNextStep={handleNextStep}
              onOpenApproval={() => setIsApprovalModalOpen(true)}
              onResetDemo={handleResetDemo}
            />
          )}

          {/* Active Tab View */}
          {activeTab === "overview" && (
            <DemoOverviewTab
              metrics={metrics}
              tasks={tasks}
              onSelectTask={(task) => setSelectedTaskForModal(task)}
              onOpenApproval={() => setIsApprovalModalOpen(true)}
              demoState={demoState}
            />
          )}

          {activeTab === "tasks" && (
            <DemoTasksTab
              tasks={tasks}
              onSelectTask={(task) => setSelectedTaskForModal(task)}
              onOpenApproval={() => setIsApprovalModalOpen(true)}
            />
          )}

          {activeTab === "approvals" && (
            <DemoApprovalsTab
              onOpenGuidedApproval={() => setIsApprovalModalOpen(true)}
            />
          )}

          {activeTab === "schedule" && <DemoScheduleTab />}

          {activeTab === "connections" && <DemoConnectionsTab />}

          {activeTab === "usage" && (
            <DemoUsageTab
              creditPercentage={demoState === "completed" ? 71 : 72}
            />
          )}
        </main>
      </div>

      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      <DemoApprovalModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        onApprove={handleApproveFromModal}
        onRequestChanges={handleRequestChangesFromModal}
        isRevising={isRevising}
        hasRevised={hasRevised}
      />

      <DemoTaskModal
        task={selectedTaskForModal}
        isOpen={Boolean(selectedTaskForModal)}
        onClose={() => setSelectedTaskForModal(null)}
      />
    </div>
  )
}

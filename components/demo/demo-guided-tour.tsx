"use client"

import React from "react"
import { Play, RotateCcw, ArrowRight, CheckCircle2, MessageSquare, Sparkles, ShieldAlert, ArrowUpRight } from "lucide-react"
import { WhatsAppIcon } from "@/components/nexus-icons/nexus-icons"
import { GUIDED_TOUR_DATA } from "@/lib/demo-data"
import { trackDemoEvent } from "@/lib/demo-analytics"

export type GuidedDemoState =
  | "idle"
  | "request_received"
  | "todo"
  | "in_progress"
  | "awaiting_approval"
  | "revising"
  | "approved"
  | "completed"

interface DemoGuidedTourProps {
  demoState: GuidedDemoState
  onStartDemo: () => void
  onNextStep: () => void
  onOpenApproval: () => void
  onResetDemo: () => void
}

export function DemoGuidedTour({
  demoState,
  onStartDemo,
  onNextStep,
  onOpenApproval,
  onResetDemo,
}: DemoGuidedTourProps) {
  // Map demo state to 1..8 numeric steps for the progress indicator
  const getStepNumber = (): number => {
    switch (demoState) {
      case "idle":
        return 0
      case "request_received":
        return 1
      case "todo":
        return 2
      case "in_progress":
        return 3
      case "awaiting_approval":
      case "revising":
        return 4
      case "approved":
        return 5
      case "completed":
        return 6
      default:
        return 0
    }
  }

  const currentStep = getStepNumber()

  return (
    <div className="w-full bg-white rounded-2xl border border-black/[0.08] shadow-sm p-4 sm:p-6 mb-6 transition-all">
      {/* Header bar of Guided Tour */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/[0.06]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-black/50">
              Interactive 60–90s Guided Demonstration
            </span>
            <h2 className="text-sm sm:text-base font-semibold text-black tracking-tight">
              {demoState === "idle"
                ? "Experience How Nexus Turns Requests into Outcomes"
                : demoState === "completed"
                ? "Workflow Completed: Friday Café Promotion"
                : "Scenario: Owner Friday Promotion Workflow"}
            </h2>
          </div>
        </div>

        {/* Action Controls in Header */}
        <div className="flex items-center gap-2">
          {demoState === "idle" ? (
            <button
              onClick={() => {
                trackDemoEvent("demo_started")
                onStartDemo()
              }}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition-all shadow-xs uppercase tracking-wider cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Run the Nexus Demo</span>
            </button>
          ) : demoState === "completed" ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onResetDemo}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-black/15 hover:bg-black/[0.04] text-black text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-black/60" />
                <span>Reset Demo</span>
              </button>
              <a
                href="/#contact"
                onClick={() => trackDemoEvent("demo_consultation_clicked", { source: "guided_tour_completed" })}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#111] hover:bg-[#333] text-white text-xs font-semibold rounded-lg transition-colors tracking-wide"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onResetDemo}
                className="p-2 text-black/50 hover:text-black hover:bg-black/[0.05] rounded-lg transition-colors"
                title="Reset scenario"
                aria-label="Reset demo"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {demoState === "awaiting_approval" || demoState === "revising" ? (
                <button
                  onClick={onOpenApproval}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition-all shadow-xs uppercase tracking-wider cursor-pointer animate-pulse"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Review &amp; Approve</span>
                </button>
              ) : (
                <button
                  onClick={onNextStep}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#111] hover:bg-[#333] active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition-all shadow-xs uppercase tracking-wider cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Step Progress Visual Bar (Only visible once started) */}
      {demoState !== "idle" && (
        <div className="pt-4 space-y-3">
          {/* Progress Bar Grid */}
          <div className="grid grid-cols-6 gap-1.5">
            {[
              { num: 1, label: "Request Inbound" },
              { num: 2, label: "To Do" },
              { num: 3, label: "In Progress" },
              { num: 4, label: "Approval Required" },
              { num: 5, label: "Owner Approved" },
              { num: 6, label: "Completed" },
            ].map((step) => {
              const isCompleted = currentStep > step.num || demoState === "completed"
              const isCurrent = currentStep === step.num && demoState !== "completed"

              return (
                <div key={step.num} className="space-y-1">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isCompleted
                        ? "bg-emerald-500"
                        : isCurrent
                        ? "bg-amber-500 animate-pulse"
                        : "bg-black/[0.08]"
                    }`}
                  />
                  <div className="text-[9px] font-mono text-black/50 truncate hidden sm:block">
                    {step.num}. {step.label}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Interactive State Display Card */}
          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-black/[0.07] mt-3">
            {/* Step 1: Owner Request Received via WhatsApp */}
            {demoState === "request_received" && (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-800">
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Owner request received · WhatsApp (Simulated)</span>
                  </div>
                  <span className="text-[10px] font-mono text-black/40">10:15 AM</span>
                </div>

                <div className="p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-xl flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    NC
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="text-[11px] font-semibold text-black/80">Northstar Café Owner</div>
                    <div className="text-xs sm:text-sm text-black font-medium italic">
                      "{GUIDED_TOUR_DATA.ownerRequestMessage}"
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-black/60 text-[11px]">
                    Nexus captured the inbound voice/text message and triaged it into a tracked business task.
                  </span>
                  <button
                    onClick={onNextStep}
                    className="shrink-0 ml-3 px-3 py-1.5 bg-[#111] text-white text-xs font-medium rounded-lg hover:bg-[#333] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: Add to To Do</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Added to To Do */}
            {demoState === "todo" && (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-800 font-semibold uppercase">
                    Step 2: Task Created under "To Do"
                  </span>
                  <span className="text-[10px] font-mono text-black/40">10:16 AM</span>
                </div>

                <div className="p-3 bg-white border border-amber-300 rounded-xl shadow-xs flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs sm:text-sm font-semibold text-black flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>{GUIDED_TOUR_DATA.taskTitle}</span>
                    </div>
                    <div className="text-[11px] text-black/65">
                      {GUIDED_TOUR_DATA.taskDescription}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
                    Awaiting Processing
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-black/60">
                    The task is staged on the board. Nexus will now begin researching café menu details and drafting the campaign.
                  </span>
                  <button
                    onClick={onNextStep}
                    className="shrink-0 ml-3 px-3 py-1.5 bg-[#111] text-white text-xs font-medium rounded-lg hover:bg-[#333] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: Begin Processing</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: In Progress */}
            {demoState === "in_progress" && (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-blue-800 font-semibold uppercase flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    Step 3: Moved to "In Progress"
                  </span>
                  <span className="text-[10px] font-mono text-black/40">10:18 AM</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  <div className="p-2.5 rounded-lg bg-white border border-black/[0.06] text-xs space-y-1">
                    <div className="font-semibold text-black flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>Social Caption</span>
                    </div>
                    <p className="text-[10px] text-black/60 line-clamp-2">
                      {GUIDED_TOUR_DATA.initialCaption}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-black/[0.06] text-xs space-y-1">
                    <div className="font-semibold text-black flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>Graphic Preview</span>
                    </div>
                    <p className="text-[10px] text-black/60">
                      Maple Flat White + brioche pairing card rendered.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-black/[0.06] text-xs space-y-1">
                    <div className="font-semibold text-black flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>Video Reel Preview</span>
                    </div>
                    <p className="text-[10px] text-black/60">
                      10s animated reel with steam &amp; discount banner ready.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-black/[0.06] text-xs space-y-1">
                    <div className="font-semibold text-black flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>Target Schedule</span>
                    </div>
                    <p className="text-[10px] text-black/60">
                      Friday at 11:30 AM (Simulated Instagram &amp; Facebook)
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-black/60">
                    Content prepared. Public actions pause here until the business owner reviews and approves.
                  </span>
                  <button
                    onClick={onOpenApproval}
                    className="shrink-0 ml-3 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Open Approval Review</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 & 5: Awaiting Approval / Revising / Approved */}
            {(demoState === "awaiting_approval" || demoState === "revising" || demoState === "approved") && (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-800 font-semibold uppercase flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    Step 4: Approval Required Before Scheduling
                  </span>
                  <span className="text-[10px] font-mono text-black/40">10:20 AM</span>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-amber-300 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-black">
                      Nexus prepared the Friday campaign. Review it before scheduling.
                    </div>
                    <div className="text-[11px] text-black/60 mt-0.5">
                      Includes caption draft, promotional graphic asset, animated video reel, and connected-channel placeholders.
                    </div>
                  </div>
                  <button
                    onClick={onOpenApproval}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-xl transition-colors shrink-0 shadow-xs cursor-pointer"
                  >
                    Review Campaign Asset
                  </button>
                </div>
              </div>
            )}

            {/* Step 6, 7, 8: Completed & Metrics Updated */}
            {demoState === "completed" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-800 font-semibold uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Step 6 &amp; 7: Approved, Scheduled &amp; Metrics Updated
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Completed
                  </span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-emerald-200/80 shadow-2xs space-y-3">
                  <div className="text-xs sm:text-sm font-semibold text-emerald-950">
                    Friday campaign approved and scheduled in this demonstration.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1 text-[11px]">
                    <div className="p-2.5 bg-[#FAF9F5] rounded-lg border border-black/[0.05]">
                      <div className="font-semibold text-black/80">Content Prepared</div>
                      <div className="text-black/60 text-[10px]">Caption, graphic card &amp; video preview</div>
                    </div>
                    <div className="p-2.5 bg-[#FAF9F5] rounded-lg border border-black/[0.05]">
                      <div className="font-semibold text-black/80">Owner Approval</div>
                      <div className="text-black/60 text-[10px]">Received with 1 tap</div>
                    </div>
                    <div className="p-2.5 bg-[#FAF9F5] rounded-lg border border-black/[0.05]">
                      <div className="font-semibold text-black/80">Schedule Created</div>
                      <div className="text-black/60 text-[10px]">Queued for Friday 11:30 AM (Demo)</div>
                    </div>
                    <div className="p-2.5 bg-[#FAF9F5] rounded-lg border border-black/[0.05]">
                      <div className="font-semibold text-black/80">Activity Logged</div>
                      <div className="text-black/60 text-[10px]">Logged to audit report</div>
                    </div>
                  </div>
                </div>

                {/* Step 8: Commercial Result and Consultation CTA */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#1A1918] to-[#111] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs sm:text-sm font-medium text-white/95">
                      This was a sample café workflow. Westside Union configures Nexus around the work your business needs handled.
                    </div>
                    <div className="text-[11px] text-white/60 font-mono">
                      Every business has different channels, tools, and approval thresholds.
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <a
                      href="/#contact"
                      onClick={() => trackDemoEvent("demo_consultation_clicked", { source: "guided_tour_result" })}
                      className="px-5 py-2.5 bg-white text-black hover:bg-white/90 text-xs font-semibold rounded-xl transition-all shadow-sm tracking-wide uppercase"
                    >
                      See How Nexus Could Work for My Business
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Idle State Banner description */}
      {demoState === "idle" && (
        <div className="pt-3 text-xs text-black/65 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>
            Click <strong>"Run the Nexus Demo"</strong> to watch how an owner's WhatsApp request moves through To Do, In Progress, 1-Tap Approval, and Completed.
          </span>
          <span className="text-[10px] font-mono text-black/45 shrink-0">
            Estimated duration: ~60 seconds
          </span>
        </div>
      )}
    </div>
  )
}

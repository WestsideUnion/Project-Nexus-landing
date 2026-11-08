"use client"

import React from "react"
import { Check, Minus, Plus, ShieldCheck, Wrench } from "lucide-react"
import type { ConnectionItem } from "@/lib/site-data"
import { AUTH_TYPE_COPY, STATUS_META, isEngineerManaged } from "@/lib/connections"
import { StatusPill } from "@/components/shared-ui"
import { AppLogo } from "@/components/nexus-icons/app-logo"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet"
import { FOCUS_RING } from "@/components/connections/connection-card"

export function ConnectionDetailSheet({
  item,
  categoryLabel,
  inStack,
  onOpenChange,
  onToggleStack,
  onDiscuss,
}: {
  item: ConnectionItem | null
  categoryLabel: string
  inStack: boolean
  onOpenChange: (open: boolean) => void
  onToggleStack: (item: ConnectionItem) => void
  onDiscuss: (item: ConnectionItem) => void
}) {
  // Keep the last item rendered while the sheet animates closed.
  const [shown, setShown] = React.useState<ConnectionItem | null>(item)
  React.useEffect(() => {
    if (item) setShown(item)
  }, [item])

  const discussRef = React.useRef(false)
  const current = item ?? shown
  const engineerManaged = current ? isEngineerManaged(current) : false

  return (
    <Sheet open={!!item} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-[#FAF9F5] border-black/8 p-0 gap-0 overflow-y-auto"
        onCloseAutoFocus={(e) => {
          if (discussRef.current) {
            discussRef.current = false
            e.preventDefault()
            const contact = document.getElementById("contact")
            contact?.scrollIntoView({ behavior: "smooth", block: "start" })
            window.setTimeout(() => document.getElementById("name")?.focus({ preventScroll: true }), 400)
          }
        }}
      >
        {current && (
          <>
            <div className="p-6 pr-14 border-b border-black/6 bg-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FAF9F5] border border-black/6 flex items-center justify-center overflow-hidden p-2.5 shrink-0">
                  <AppLogo id={current.id} name={current.name} iconType={current.iconType} className="w-8 h-8" />
                </div>
                <div className="min-w-0 space-y-1.5">
                  <SheetTitle className="text-xl font-medium text-[#111] leading-tight">{current.name}</SheetTitle>
                  <SheetDescription className="text-xs text-black/60">{categoryLabel}</SheetDescription>
                </div>
              </div>
              <div className="mt-4">
                <StatusPill status={current.status} />
              </div>
            </div>

            <div className="flex-1 divide-y divide-black/6">
              <section className="p-6 space-y-3">
                <h3 className="text-sm font-medium text-[#111]">What Nexus can do with it</h3>
                <p className="text-sm text-black/70 leading-relaxed">{current.desc}</p>
                {current.capabilities && current.capabilities.length > 0 && (
                  <ul className="space-y-2 pt-1">
                    {current.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2 text-sm text-black/75">
                        <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="p-6 space-y-3">
                <h3 className="text-sm font-medium text-[#111]">How it gets set up</h3>
                <p className="text-sm text-black/70 leading-relaxed">{STATUS_META[current.status].description}</p>
                {current.authType && (
                  <p className="text-sm text-black/70 leading-relaxed">{AUTH_TYPE_COPY[current.authType]}</p>
                )}
                {engineerManaged && (
                  <p className="flex items-start gap-2 text-sm text-[#111] leading-relaxed">
                    <Wrench className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      Handled by our engineers. A Westside Union DevOps engineer connects, secures, and maintains
                      this for you. You never touch code or credentials.
                    </span>
                  </p>
                )}
              </section>

              <section className="p-6 space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-medium text-[#111]">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                  You stay in control
                </h3>
                <p className="text-sm text-black/70 leading-relaxed">
                  {engineerManaged
                    ? "Nexus only reads and updates the data you approve. Changes to records follow your approval rules, and access can be revoked at any time."
                    : "Protected by your approval rules. Customer replies, schedule changes, or external updates can require your confirmation before anything is sent."}
                </p>
              </section>
            </div>

            <div className="sticky bottom-0 p-6 border-t border-black/8 bg-white flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => onToggleStack(current)}
                aria-pressed={inStack}
                className={`inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-xl text-sm font-medium border transition-colors cursor-pointer ${FOCUS_RING} ${
                  inStack
                    ? "bg-white text-[#111] border-black/20 hover:border-black/40"
                    : "bg-[#111] text-white border-[#111] hover:bg-[#333]"
                }`}
              >
                {inStack ? (
                  <>
                    <Minus className="w-4 h-4" aria-hidden="true" />
                    Remove from my stack
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" aria-hidden="true" />
                    Add to my stack
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  discussRef.current = true
                  onDiscuss(current)
                }}
                className={`min-h-11 px-5 rounded-xl text-sm text-black/75 hover:text-[#111] underline underline-offset-4 decoration-black/25 hover:decoration-black/60 cursor-pointer ${FOCUS_RING}`}
              >
                Discuss {current.name} with our team
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}


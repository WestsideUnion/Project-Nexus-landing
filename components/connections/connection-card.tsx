"use client"

import React from "react"
import { Check, Plus, Wrench } from "lucide-react"
import type { ConnectionItem } from "@/lib/site-data"
import { isEngineerManaged } from "@/lib/connections"
import { StatusPill } from "@/components/shared-ui"
import { AppLogo } from "@/components/nexus-icons/app-logo"

export const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]"

export function ConnectionCard({
  item,
  categoryLabel,
  inStack,
  onToggleStack,
  onOpenDetails,
}: {
  item: ConnectionItem
  categoryLabel: string
  inStack: boolean
  onToggleStack: (item: ConnectionItem) => void
  onOpenDetails: (item: ConnectionItem) => void
}) {
  const engineerManaged = isEngineerManaged(item)

  return (
    <article
      className={`group relative flex flex-col gap-4 p-5 rounded-2xl border bg-white transition-[border-color,box-shadow] duration-200 ${
        inStack
          ? "border-[#111] shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
          : "border-black/8 hover:border-black/25 hover:shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] border border-black/6 flex items-center justify-center shrink-0 overflow-hidden p-2">
          <AppLogo id={item.id} name={item.name} iconType={item.iconType} className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-[#111] leading-snug">
            {/* Stretched button: the whole card opens details, the stack toggle sits above it. */}
            <button
              type="button"
              onClick={() => onOpenDetails(item)}
              aria-haspopup="dialog"
              className={`text-left rounded-sm cursor-pointer after:absolute after:inset-0 after:rounded-2xl after:content-[''] ${FOCUS_RING}`}
            >
              {item.name}
            </button>
          </h3>
          <p className="text-[11px] text-black/60 mt-0.5">{categoryLabel}</p>
        </div>
      </div>

      <p className="text-xs text-black/70 leading-relaxed line-clamp-2">{item.desc}</p>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-3 border-t border-black/5">
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill status={item.status} />
          {engineerManaged && (
            <span className="inline-flex items-center gap-1 text-[11px] text-black/65">
              <Wrench className="w-3 h-3" aria-hidden="true" />
              Engineer-managed
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onToggleStack(item)}
          aria-pressed={inStack}
          aria-label={inStack ? `Remove ${item.name} from your stack` : `Add ${item.name} to your stack`}
          className={`relative z-10 inline-flex items-center gap-1.5 min-h-9 px-3 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${FOCUS_RING} ${
            inStack
              ? "bg-[#111] text-white border-[#111] hover:bg-[#333]"
              : "bg-white text-[#111] border-black/15 hover:border-black/40"
          }`}
        >
          {inStack ? (
            <>
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
              In my stack
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              I use this
            </>
          )}
        </button>
      </div>
    </article>
  )
}


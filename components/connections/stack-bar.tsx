"use client"

import React, { useEffect, useState } from "react"
import { ArrowRight, X } from "lucide-react"
import type { StackItem } from "@/lib/connections"
import { AppLogo } from "@/components/nexus-icons/app-logo"

const VISIBLE_CHIPS = 4

export function StackBar({
  stack,
  onRemove,
  onClear,
}: {
  stack: StackItem[]
  onRemove: (key: string) => void
  onClear: () => void
}) {
  // Step out of the way once the consultation form (which lists the stack) is on screen.
  const [formInView, setFormInView] = useState(false)
  useEffect(() => {
    const el = document.getElementById("contact")
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => setFormInView(entry.isIntersecting), {
      threshold: 0.15,
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const visible = stack.length > 0 && !formInView
  const extra = stack.length - VISIBLE_CHIPS

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:pb-5 flex justify-center pointer-events-none transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <section
        aria-label="My stack"
        className="pointer-events-auto w-full max-w-3xl rounded-2xl bg-[#111] text-white shadow-[0_12px_32px_rgba(0,0,0,0.22)] p-2.5 pl-4 flex items-center gap-3"
      >
        <div className="shrink-0 hidden sm:block">
          <p className="text-xs font-medium leading-tight">My stack</p>
          <p className="text-[11px] text-white/70 leading-tight">
            {stack.length} {stack.length === 1 ? "tool" : "tools"}
          </p>
        </div>

        <ul className="flex-1 min-w-0 flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none]">
          {stack.slice(0, VISIBLE_CHIPS).map((s) => (
            <li key={s.key} className="shrink-0">
              <span className="inline-flex items-center gap-1.5 h-9 pl-1.5 pr-1 rounded-lg bg-white/10 text-xs">
                <span className="w-6 h-6 rounded-md bg-white flex items-center justify-center overflow-hidden p-1">
                  {s.custom ? (
                    <span className="text-[11px] font-semibold text-[#111]">{s.name[0]?.toUpperCase()}</span>
                  ) : (
                    <AppLogo id={s.id} name={s.name} iconType={s.iconType} className="w-4 h-4" />
                  )}
                </span>
                <span className="max-w-[9rem] truncate hidden sm:inline">{s.name}</span>
                <button
                  type="button"
                  onClick={() => onRemove(s.key)}
                  aria-label={`Remove ${s.name} from your stack`}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </span>
            </li>
          ))}
          {extra > 0 && (
            <li className="shrink-0 text-xs text-white/75 px-1.5">+{extra} more</li>
          )}
        </ul>

        <button
          type="button"
          onClick={onClear}
          className="shrink-0 hidden md:inline-flex min-h-10 px-2.5 rounded-lg text-xs text-white/70 hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
        >
          Clear
        </button>
        <a
          href="#contact"
          className="shrink-0 inline-flex items-center gap-1.5 min-h-11 px-4 rounded-xl bg-white text-[#111] text-xs font-semibold hover:bg-[#F5F4F0] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span className="sm:hidden">Review stack</span>
          <span className="hidden sm:inline">Review my stack with us</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </section>
    </div>
  )
}


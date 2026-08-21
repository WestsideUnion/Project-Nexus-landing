"use client"

import React, { useRef, useEffect, useState } from "react"
import { ConnectionStatus } from "@/lib/site-data"

// ─── Intersection Observer hook ──────────────────────────────────────────────
export function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Check if element is already in viewport
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true)
      return
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold, rootMargin: "50px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}

// ─── Bento Card ──────────────────────────────────────────────────────────────
export function BentoCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, inView } = useInView(0.05)
  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl border border-black/[0.07] bg-white overflow-hidden transition-all duration-500 hover:border-black/[0.15] hover:bg-[#fafaf8] ${className}`}
      style={{
        opacity: inView ? 1 : 0.85,
        transform: inView ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, border-color 0.3s ease, background-color 0.3s ease`,
      }}
    >
      {/* Hover glow spot */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.03), transparent 60%)",
        }}
      />
      {children}
    </div>
  )
}

// ─── Pill Tag ─────────────────────────────────────────────────────────────────
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/40 bg-black/[0.04] uppercase font-medium">
      {children}
    </span>
  )
}

// ─── Status Pill ──────────────────────────────────────────────────────────────
export function StatusPill({ status }: { status: ConnectionStatus | string }) {
  const styles: Record<string, string> = {
    available: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    supported: "bg-teal-50 text-teal-700 border-teal-200/60",
    "available with supported setup": "bg-teal-50 text-teal-700 border-teal-200/60",
    configured: "bg-amber-50 text-amber-700 border-amber-200/60",
    "confirmed during consultation": "bg-amber-50 text-amber-700 border-amber-200/60",
    custom: "bg-purple-50 text-purple-700 border-purple-200/60",
    "custom deployment": "bg-purple-50 text-purple-700 border-purple-200/60",
    planned: "bg-black/[0.03] text-black/35 border-black/[0.06]",
    preview: "bg-blue-50 text-blue-700 border-blue-200/60",
  }

  const dotColors: Record<string, string> = {
    available: "bg-emerald-500",
    supported: "bg-teal-500",
    "available with supported setup": "bg-teal-500",
    configured: "bg-amber-500",
    "confirmed during consultation": "bg-amber-500",
    custom: "bg-purple-500",
    "custom deployment": "bg-purple-500",
    planned: "bg-black/20",
    preview: "bg-blue-500",
  }

  const labels: Record<string, string> = {
    available: "Available",
    supported: "Available with supported setup",
    "available with supported setup": "Available with supported setup",
    configured: "Confirmed during consultation",
    "confirmed during consultation": "Confirmed during consultation",
    custom: "Custom deployment",
    "custom deployment": "Custom deployment",
    planned: "Planned",
    preview: "Preview / In development",
  }

  const key = status.toLowerCase()
  const style = styles[key] || "bg-black/[0.03] text-black/40 border-black/[0.06]"
  const dot = dotColors[key] || "bg-black/20"
  const label = labels[key] || status

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] tracking-widest border font-sans ${style}`}>
      <span className={`w-1 h-1 rounded-full ${dot}`} />
      {label}
    </span>
  )
}

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────
export function FaqAccordionItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string
  answer: string
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="py-5 border-b border-black/[0.06] last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full text-left gap-4 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 rounded-lg p-1"
        aria-expanded={open}
      >
        <span className="text-sm sm:text-base font-light text-[#111] group-hover:text-black/70 transition-colors">
          {question}
        </span>
        <span
          className="text-black/30 text-lg font-light shrink-0 transition-transform duration-300 select-none"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "600px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p className="mt-3 text-xs sm:text-sm text-black/60 leading-relaxed pr-6">
          {answer}
        </p>
      </div>
    </div>
  )
}

// ─── Back to Top Floating Button ──────────────────────────────────────────────
export function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 450)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-50 p-3 rounded-full bg-black hover:bg-black/80 text-white shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}

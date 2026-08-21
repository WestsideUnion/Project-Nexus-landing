"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const NAV_LINKS = [
  { label: "Solutions", href: "/#industries" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "For Founders", href: "/start-business-canada" },
]

const NAV_STYLE = {
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  background: "rgba(245,244,240,0.65)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
} as const

export function MobileNav() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-5xl">
        {/* Main bar */}
        <nav
          className="flex items-center justify-between px-6 py-3.5 rounded-2xl border border-black/[0.07]"
          style={NAV_STYLE}
          aria-label="Main Navigation"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 rounded-lg p-1">
            <Image src="/nexus-logo.png" alt="Nexus logo" width={36} height={36} className="object-contain" />
            <span className="font-pixel text-xs tracking-[0.25em] text-black/70 group-hover:text-black transition-colors">
              NEXUS
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs sm:text-sm text-black/60 hover:text-black transition-colors duration-200 tracking-wide whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 rounded px-1.5 py-0.5"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Consultation CTA & Mobile Burger */}
          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className="text-xs px-4 py-2 rounded-xl bg-[#111] text-white hover:bg-black/80 hover:shadow-sm active:scale-[0.98] transition-all duration-200 tracking-wider whitespace-nowrap hidden md:block uppercase font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: "0.05em" }}
            >
              Book a Consultation
            </Link>

            {/* Burger — mobile only */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-xl hover:bg-black/[0.05] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span
                className="block h-0.5 bg-black/70 transition-all duration-300 origin-center"
                style={{
                  width: "18px",
                  transform: open ? "translateY(7px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block h-0.5 bg-black/70 transition-all duration-300"
                style={{
                  width: "18px",
                  opacity: open ? 0 : 1,
                  transform: open ? "scaleX(0)" : "none",
                }}
              />
              <span
                className="block h-0.5 bg-black/70 transition-all duration-300 origin-center"
                style={{
                  width: "18px",
                  transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div
          className="md:hidden mt-2 overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: open ? "360px" : "0px", opacity: open ? 1 : 0 }}
        >
          <div
            className="rounded-2xl border border-black/[0.07] px-3 py-3 flex flex-col gap-1 shadow-lg"
            style={NAV_STYLE}
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={close}
                className="px-4 py-2.5 text-sm text-black/70 hover:text-black hover:bg-black/[0.04] rounded-xl transition-colors tracking-wide"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-black/[0.06]">
              <Link
                href="/#contact"
                onClick={close}
                className="block w-full text-center text-xs px-4 py-3 rounded-xl bg-[#111] text-white hover:bg-black/80 active:scale-[0.98] transition-all duration-200 tracking-wider uppercase font-medium shadow-xs"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

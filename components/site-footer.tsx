import React from "react"
import Link from "next/link"
import Image from "next/image"

const FOOTER_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/#industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "Nexus Edge", href: "/nexus-edge" },
  { label: "Connections", href: "/connections" },
  { label: "Start Your Business — Canada", href: "/start-business-canada" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/#contact" },
]

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
]

export function SiteFooter() {
  return (
    <footer className="py-12 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#F5F4F0] text-[#111]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/nexus-logo.png" alt="Nexus logo" width={36} height={36} className="object-contain" />
            <span className="font-pixel text-xs tracking-[0.25em] text-black/70 group-hover:text-black transition-colors">
              NEXUS
            </span>
          </Link>
          <p className="text-[10px] text-black/35 tracking-widest mt-1.5 pl-12 font-mono">
            A Westside Union product
          </p>
        </div>

        {/* Primary nav links */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
          {FOOTER_NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-xs text-black/50 hover:text-black transition-colors tracking-wide"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Legal links */}
        <div className="flex items-center gap-5">
          {LEGAL_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-xs text-black/35 hover:text-black/70 transition-colors tracking-widest uppercase font-mono"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-black/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-black/35">
        <span>© 2026 Westside Union. Nexus is a Westside Union product. All rights reserved.</span>
        <span>Toronto, Ontario, Canada</span>
      </div>
    </footer>
  )
}

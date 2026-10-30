import React from "react"
import type { Metadata } from "next"
import { MobileNav } from "@/components/mobile-nav"
import { SiteFooter } from "@/components/site-footer"
import { ConsultationForm } from "@/components/consultation-form"
import { Tag, BackToTop } from "@/components/shared-ui"
import { PixelIcon } from "@/components/pixel-icon"
import { IndustriesGridWithPreview } from "@/components/industry-quick-preview"

export const metadata: Metadata = {
  title: "Industries | Nexus by Westside Union",
  description:
    "Every industry has its own challenges, but the goal is familiar: less time on repetitive work, clearer information, and better service. Explore how Nexus helps real businesses.",
}

export default function IndustriesIndexPage() {
  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      <MobileNav />

      <section className="pt-36 pb-16 px-6 md:px-12 lg:px-20 border-b border-black/6 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-4 flex flex-col items-center">
          <PixelIcon type="platform" size={40} />
          <Tag>INDUSTRIES</Tag>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#111] leading-[1.08]"
            style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
          >
            Solutions that make sense for your business.
          </h1>
          <p className="text-sm sm:text-base text-black/65 max-w-2xl mx-auto leading-relaxed font-light">
            Every industry has its own challenges, but the goal is familiar: less time on repetitive work, clearer information, and better service. Explore how Nexus could help with the work you do every day.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#FAF9F5] border-b border-black/6">
        <div className="max-w-6xl mx-auto">
          <IndustriesGridWithPreview />
        </div>
      </section>

      <ConsultationForm
        title="Let's find one useful place to start."
        subtitle="Tell us how your business works. We'll look at the tools you already use and propose a sensible first workflow."
      />

      <SiteFooter />
      <BackToTop />
    </div>
  )
}


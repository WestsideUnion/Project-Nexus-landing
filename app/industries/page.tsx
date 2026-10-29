import React from "react"
import Link from "next/link"
import type { Metadata } from "next"
import { MobileNav } from "@/components/mobile-nav"
import { SiteFooter } from "@/components/site-footer"
import { ConsultationForm } from "@/components/consultation-form"
import { BentoCard, Tag, BackToTop } from "@/components/shared-ui"
import { INDUSTRIES_DATA } from "@/lib/site-data"

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
        <div className="max-w-4xl mx-auto text-center space-y-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES_DATA.map((item) => (
              <BentoCard key={item.slug} className="flex flex-col overflow-hidden" delay={item.delay ?? 0}>
                <Link href={`/industries/${item.slug}`} className="relative h-48 shrink-0 overflow-hidden bg-black/2 block">
                  <img
                    src={item.coverImg}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.7) 80%, rgb(255,255,255) 100%)",
                    }}
                  />
                </Link>

                <div className="p-6 pt-3 flex flex-col flex-1 justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-[#111] mb-2">{item.name}</h2>
                    <p className="text-xs sm:text-sm font-normal text-black/85 leading-relaxed mb-3">
                      {item.cardHeadline}
                    </p>
                    <p className="text-xs text-black/60 leading-relaxed mb-6">
                      {item.cardOutcome}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/6 flex items-center justify-between">
                    <Link
                      href={`/industries/${item.slug}`}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] tracking-widest font-sans text-black/80 bg-black/5 hover:bg-black/10 hover:text-black transition-colors uppercase"
                    >
                      {item.cardCta} →
                    </Link>
                    <a
                      href="#contact"
                      className="text-xs text-black/50 hover:text-black transition-colors underline underline-offset-2"
                    >
                      Book a Demo →
                    </a>
                  </div>
                </div>
              </BentoCard>
            ))}
          </div>
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


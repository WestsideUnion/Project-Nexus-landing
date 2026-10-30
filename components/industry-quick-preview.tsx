"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { INDUSTRIES_DATA, IndustryDetail } from "@/lib/site-data"
import { BentoCard, Tag } from "@/components/shared-ui"

export function IndustriesGridWithPreview() {
  const [previewIndustry, setPreviewIndustry] = useState<IndustryDetail | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INDUSTRIES_DATA.map((item) => (
          <BentoCard key={item.slug} className="flex flex-col overflow-hidden" delay={item.delay ?? 0}>
            <button
              type="button"
              onClick={() => setPreviewIndustry(item)}
              className="relative h-48 shrink-0 overflow-hidden bg-black/2 block w-full text-left cursor-pointer group/img focus:outline-none"
              aria-label={`Quick preview ${item.name} use cases`}
            >
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
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/90 backdrop-blur-xs text-[#111] border border-black/10 opacity-90 group-hover/img:opacity-100 transition-opacity shadow-2xs">
                Quick Preview
              </span>
            </button>

            <div className="relative z-10 p-6 pt-3 flex flex-col flex-1 justify-between">
              <div>
                <Link href={`/industries/${item.slug}`} className="hover:underline underline-offset-4">
                  <h2 className="text-lg font-medium text-[#111] mb-2">{item.name}</h2>
                </Link>
                <p className="text-xs sm:text-sm font-normal text-black/85 leading-relaxed mb-3">
                  {item.cardHeadline}
                </p>
                <p className="text-xs text-black/60 leading-relaxed mb-6">
                  {item.cardOutcome}
                </p>
              </div>

              <div className="pt-4 border-t border-black/6 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewIndustry(item)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] tracking-wider font-sans text-white bg-[#111] hover:bg-black/80 transition-colors uppercase font-medium cursor-pointer shrink-0"
                >
                  Quick Preview →
                </button>
                <Link
                  href={`/industries/${item.slug}`}
                  className="text-xs text-black/60 hover:text-black transition-colors underline underline-offset-2 font-medium shrink-0"
                >
                  Full Page →
                </Link>
              </div>
            </div>
          </BentoCard>
        ))}
      </div>

      <IndustryQuickPreviewModal
        industry={previewIndustry}
        onClose={() => setPreviewIndustry(null)}
      />
    </>
  )
}

export function IndustryQuickPreviewModal({
  industry,
  onClose,
}: {
  industry: IndustryDetail | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!industry) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [industry, onClose])

  if (!industry) return null

  return (
    <div
      className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{
        background: "rgba(0,0,0,0.62)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-3xl max-h-[90dvh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-[#F5F4F0] shadow-2xl border border-black/10"
        style={{
          animation: "fade-up 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-industry-title"
      >
        {/* Cover image header */}
        <div className="relative h-48 sm:h-52 overflow-hidden rounded-t-3xl sm:rounded-t-2xl">
          <img
            src={industry.coverImg}
            alt={industry.name}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(245,244,240,1) 0%, rgba(245,244,240,0.35) 60%, transparent 100%)",
            }}
          />
          <div className="absolute bottom-4 left-6 right-14">
            <Tag>QUICK PREVIEW · USE CASES</Tag>
            <h2
              id="modal-industry-title"
              className="mt-2 text-2xl sm:text-3xl font-light tracking-tight text-[#111]"
            >
              {industry.name}
            </h2>
          </div>
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-xs border border-black/10 text-black/65 hover:text-black hover:bg-white transition-colors z-20 cursor-pointer shadow-xs"
          aria-label="Close quick preview"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          >
            <path d="M2 2l10 10M12 2L2 12" />
          </svg>
        </button>

        {/* Alternating Visual Scenario Cards */}
        <div className="p-6 space-y-4">
          {industry.cases.map((c, i) => {
            const imgLeft = i % 2 === 0
            return (
              <div
                key={i}
                className="rounded-xl border border-black/7 bg-white overflow-hidden flex flex-col sm:flex-row shadow-2xs"
              >
                {imgLeft && (
                  <div className="w-full sm:w-[34%] shrink-0 overflow-hidden aspect-video sm:aspect-auto border-b sm:border-b-0 sm:border-r border-black/7 bg-black/3">
                    <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex-1 p-5 flex flex-col justify-center space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] tracking-widest text-black/45 uppercase font-mono font-semibold">
                      {c.timeLabel || `Case 0${i + 1}`}
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF9F5] border border-black/6 text-black/55">
                      Example Workflow
                    </span>
                  </div>

                  <h3 className="text-base font-medium text-[#111]">{c.title}</h3>
                  <p className="text-xs text-black/65 leading-relaxed">{c.problem}</p>

                  <div className="pt-1 flex gap-2 items-start">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-emerald-600 mt-0.5 shrink-0"
                    >
                      <path d="M2 7l3.5 3.5L12 3" />
                    </svg>
                    <p className="text-xs text-black/80 leading-relaxed">
                      <span className="font-medium text-emerald-800">{c.benefit}</span> — {c.help}
                    </p>
                  </div>
                </div>

                {!imgLeft && (
                  <div className="w-full sm:w-[34%] shrink-0 overflow-hidden aspect-video sm:aspect-auto border-t sm:border-t-0 sm:border-l border-black/7 order-first sm:order-last bg-black/3">
                    <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            )
          })}

          {/* Illustrative Exchange Preview */}
          <div className="rounded-xl bg-white border border-black/7 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 shadow-2xs">
            <div className="p-3 rounded-lg bg-[#FAF9F5] border border-black/5">
              <span className="text-[9px] font-mono uppercase tracking-widest text-black/45 block mb-1">
                Owner Question (Illustrative)
              </span>
              <p className="text-xs font-medium text-[#111]">
                &ldquo;{industry.illustrativeExchange.owner}&rdquo;
              </p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200/70">
              <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-800 font-semibold block mb-1">
                Nexus Response
              </span>
              <p className="text-xs text-black/80">
                &ldquo;{industry.illustrativeExchange.nexus}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Modal CTAs */}
        <div className="px-6 pb-7 pt-1 flex flex-col sm:flex-row gap-3">
          <Link
            href={`/industries/${industry.slug}`}
            onClick={onClose}
            className="flex-1 py-3.5 bg-[#111] text-white text-[11px] font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-xs cursor-pointer"
          >
            Open Full {industry.shortName} Page →
          </Link>
          <a
            href="#contact"
            onClick={onClose}
            className="py-3.5 px-6 border border-black/20 bg-white text-black/85 text-[11px] font-medium rounded-xl hover:border-black/40 hover:text-black transition-colors tracking-widest text-center uppercase cursor-pointer"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </div>
  )
}

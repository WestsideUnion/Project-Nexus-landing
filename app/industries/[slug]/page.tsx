import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { MobileNav } from "@/components/mobile-nav"
import { SiteFooter } from "@/components/site-footer"
import { ConsultationForm } from "@/components/consultation-form"
import { BentoCard, Tag, BackToTop } from "@/components/shared-ui"
import { PixelIcon } from "@/components/pixel-icon"
import { INDUSTRIES_DATA } from "@/lib/site-data"

export function generateStaticParams() {
  return INDUSTRIES_DATA.map((ind) => ({
    slug: ind.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const industry = INDUSTRIES_DATA.find((i) => i.slug === slug)
  if (!industry) {
    return {
      title: "Industry Solutions | Nexus by Westside Union",
    }
  }
  return {
    title: `${industry.name} | Nexus by Westside Union`,
    description: `${industry.heroH1} ${industry.heroLead}`,
    openGraph: {
      title: `${industry.name} | Nexus by Westside Union`,
      description: `${industry.heroH1} ${industry.heroLead}`,
      type: "website",
    },
  }
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const industry = INDUSTRIES_DATA.find((i) => i.slug === slug)

  if (!industry) {
    notFound()
  }

  const relatedIndustries = INDUSTRIES_DATA.filter((i) => i.slug !== industry.slug).slice(0, 4)

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      <MobileNav />

      {/* ── 1. INDUSTRY HERO ────────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-black/6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link
              href="/#industries"
              className="inline-flex items-center gap-2 text-xs text-black/55 hover:text-black transition-colors font-mono uppercase tracking-wider"
            >
              ← Back to Industries
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <Tag>INDUSTRY SOLUTIONS</Tag>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest bg-black/4 text-black/65 font-mono uppercase">
                  {industry.name}
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#111] leading-[1.1]"
                style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
              >
                {industry.heroH1}
              </h1>

              <p className="text-sm sm:text-base text-black/70 leading-relaxed font-light max-w-2xl">
                {industry.heroLead}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="#contact"
                  className="px-6 py-3.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase shadow-sm"
                >
                  {industry.ctaLabel}
                </a>
                <a
                  href="#cases"
                  className="px-6 py-3.5 border border-black/20 text-black/80 text-xs font-medium rounded-xl hover:border-black/40 hover:text-black hover:bg-black/3 transition-all tracking-widest uppercase"
                >
                  See Example Workflows
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-black/8 shadow-md aspect-[4/3] bg-black/3">
                <img
                  src={industry.coverImg}
                  alt={industry.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(17,17,17,0.45) 0%, transparent 50%)",
                  }}
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="text-xs font-medium tracking-wide">{industry.name}</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-full">
                    Managed by Westside Union
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. THREE REAL-WORLD CASES (PROBLEM → HELP → BENEFIT) ────────────── */}
      <section id="cases" className="py-24 px-6 md:px-12 lg:px-20 bg-[#FAF9F5] border-b border-black/6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <PixelIcon type="workflow" size={40} />
            <div className="pt-2"><Tag>REAL-WORLD WORKFLOWS</Tag></div>
            <h2
              className="text-3xl sm:text-4xl font-light text-[#111] tracking-tight leading-[1.1]"
              style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
            >
              How Nexus can help in {industry.shortName.toLowerCase()}.
            </h2>
            <p className="text-xs sm:text-sm text-black/65 leading-relaxed font-light">
              Every business runs differently. Here are three practical examples of how Nexus can be configured around everyday operational challenges.
            </p>
          </div>

          <div className="space-y-6">
            {industry.cases.map((c, idx) => {
              const imgLeft = idx % 2 === 0
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-black/7 bg-white overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-xs"
                >
                  {imgLeft && (
                    <div className="lg:col-span-4 relative min-h-[220px] bg-black/2 border-b lg:border-b-0 lg:border-r border-black/6">
                      <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-center space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-black/45 font-semibold">
                        {c.timeLabel || `CASE 0${idx + 1}`}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/4 text-black/55">
                        Example Configuration
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-light text-[#111]">{c.title}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                      <div className="p-4 rounded-xl bg-[#FAF9F5] border border-black/5 space-y-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-semibold block">
                          The Challenge
                        </span>
                        <p className="text-xs text-black/75 leading-relaxed">{c.problem}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#FAF9F5] border border-black/5 space-y-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-blue-800 font-semibold block">
                          How Nexus Helps
                        </span>
                        <p className="text-xs text-black/75 leading-relaxed">{c.help}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/60 space-y-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-semibold block">
                          The Outcome
                        </span>
                        <p className="text-xs text-black/80 leading-relaxed font-medium">{c.benefit}</p>
                      </div>
                    </div>

                    {c.caveat && (
                      <p className="text-[11px] text-black/50 italic pt-1 border-t border-black/5">
                        Note: {c.caveat}
                      </p>
                    )}
                  </div>

                  {!imgLeft && (
                    <div className="lg:col-span-4 relative min-h-[220px] bg-black/2 border-t lg:border-t-0 lg:border-l border-black/6 order-first lg:order-last">
                      <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {industry.caveatNote && (
            <div className="p-4 rounded-xl bg-white border border-black/6 text-xs text-black/60 leading-relaxed">
              <strong>Data &amp; Source Records Note:</strong> {industry.caveatNote}
            </div>
          )}
        </div>
      </section>

      {/* ── 3. ILLUSTRATIVE ASSISTANT EXCHANGE & EXISTING SYSTEMS ────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-white border-b border-black/6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Illustrative Exchange */}
          <div className="lg:col-span-6 p-7 sm:p-9 rounded-2xl bg-[#FAF9F5] border border-black/7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <Tag>EXAMPLE INTERACTION</Tag>
                <span className="text-[10px] font-mono uppercase tracking-wider text-black/45 bg-white px-2.5 py-0.5 rounded-full border border-black/6">
                  Illustrative Example
                </span>
              </div>

              <h3 className="text-2xl font-light text-[#111]">
                Talk to Nexus like a capable assistant.
              </h3>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-white border border-black/6 shadow-2xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-black/45 block mb-1">
                    Owner
                  </span>
                  <p className="text-xs sm:text-sm text-black/85 font-medium">
                    &ldquo;{industry.illustrativeExchange.owner}&rdquo;
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/70 shadow-2xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
                    Nexus Assistant
                  </span>
                  <p className="text-xs sm:text-sm text-black/80 leading-relaxed">
                    &ldquo;{industry.illustrativeExchange.nexus}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-black/45 italic border-t border-black/5 pt-3">
              Illustrative dialogue only, not a depiction of live customer records. Actual responses depend on connected tools and configured workflows.
            </p>
          </div>

          {/* Right: Works With Your Existing Systems */}
          <div className="lg:col-span-6 p-7 sm:p-9 rounded-2xl bg-[#FAF9F5] border border-black/7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Tag>HOW IT STARTS</Tag>
              <h3 className="text-2xl font-light text-[#111]">
                Works with your existing systems.
              </h3>
              <p className="text-xs sm:text-sm text-black/70 leading-relaxed">
                Tell us how your business works. We&apos;ll look at the tools you already use and propose a sensible first workflow.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  "1. Tell us the everyday tasks, tools and challenges that matter to you.",
                  "2. Westside Union confirms compatibility, permissions and setup needs.",
                  "3. Start with a practical first workflow and expand when ready.",
                ].map((step, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white border border-black/5 text-xs text-black/75 flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-black/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[11px] text-black/50">
                Some workflows need additional integrations, access permissions or process changes.
              </span>
              <Link
                href="/connections"
                className="text-xs font-medium text-black hover:opacity-75 transition-opacity underline underline-offset-4 whitespace-nowrap"
              >
                Check My Tools →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. RELATED INDUSTRIES ────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#FAF9F5] border-b border-black/6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Tag>EXPLORE MORE</Tag>
              <h2 className="text-2xl sm:text-3xl font-light text-[#111] mt-2">
                Other businesses Nexus supports
              </h2>
            </div>
            <Link
              href="/#industries"
              className="text-xs font-medium text-black/70 hover:text-black underline underline-offset-4"
            >
              View all industries →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedIndustries.map((rel) => (
              <BentoCard key={rel.slug} className="p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-medium text-[#111] mb-1.5">{rel.name}</h3>
                  <p className="text-xs text-black/60 leading-relaxed mb-4 line-clamp-3">
                    {rel.cardHeadline}
                  </p>
                </div>
                <Link
                  href={`/industries/${rel.slug}`}
                  className="text-xs font-medium text-black hover:opacity-75 transition-opacity inline-flex items-center gap-1"
                >
                  {rel.cardCta} →
                </Link>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FINAL CTA / CONSULTATION FORM ─────────────────────────────────── */}
      <ConsultationForm
        title="Let's find one useful place to start."
        subtitle="Tell us how your business works. We'll look at the tools you already use and propose a sensible first workflow."
      />

      <SiteFooter />
      <BackToTop />
    </div>
  )
}


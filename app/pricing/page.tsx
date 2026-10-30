"use client"

import React, { useState } from "react"
import Link from "next/link"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { MobileNav } from "@/components/mobile-nav"
import { SiteFooter } from "@/components/site-footer"
import { ConsultationForm } from "@/components/consultation-form"
import { BentoCard, Tag, FaqAccordionItem, BackToTop } from "@/components/shared-ui"
import { NexusCloudEmblem, NexusEdgeEmblem, NexusEnterpriseEmblem } from "@/components/nexus-visuals/nexus-package-emblems"
import {
  PricingTierArchitectureVisual,
  PlanComparisonVisual,
  OnboardingJourney,
  UsageMeterVisual,
  UpgradePathVisual,
  AddOnsVisual,
} from "@/components/pricing-visuals"
import { NexusOutcomeSummary } from "@/components/nexus-visuals/nexus-outcome-summary"
import {
  PACKAGES,
  PILOT_TERMS,
  WAGE_TABLE,
  HOURLY_RATES,
  ALL_FAQS,
} from "@/lib/site-data"

type PlanOption = "cloud" | "edge" | "enterprise"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  // ROI Calculator state
  const [roi, setRoi] = useState({
    hoursPerWeek: 10,
    hourlyRole: "administrative" as "receptionist" | "administrative" | "marketing" | "custom",
    customRate: 26.5,
    offsetPercent: 50,
    plan: "cloud" as PlanOption,
    recoveredOpportunities: 0,
    contributionValue: 0,
    variableCosts: 0,
  })

  const getPlanDetails = (plan: PlanOption, cycle: "monthly" | "annual") => {
    switch (plan) {
      case "cloud":
        return {
          name: "Nexus Cloud",
          monthlyCad: cycle === "annual" ? 79 : 99,
          setupCad: 0,
          amortizedMonths: 12,
          displayLabel: `Nexus Cloud (${cycle === "annual" ? "CAD $79" : "CAD $99"}/mo · No mandatory setup fee)`,
        }
      case "edge":
        return {
          name: "Nexus Edge",
          monthlyCad: cycle === "annual" ? 416 : 499,
          setupCad: 1499,
          amortizedMonths: 12,
          displayLabel: `Nexus Edge (From CAD $${cycle === "annual" ? "416*" : "499"}/mo + CAD $125 setup eq.)`,
        }
      case "enterprise":
        return {
          name: "Nexus Enterprise",
          monthlyCad: 1499,
          setupCad: 7500,
          amortizedMonths: 12,
          displayLabel: "Nexus Enterprise (Illustrative custom scope)",
        }
    }
  }

  const selectedPlanDetails = getPlanDetails(roi.plan, billingCycle)
  const roiHourlyRate = roi.hourlyRole === "custom" ? roi.customRate : (HOURLY_RATES[roi.hourlyRole] ?? 26.5)
  const roiMonthlyWorkValue = (roi.hoursPerWeek * 52) / 12 * roiHourlyRate
  const roiOffsetValue = roiMonthlyWorkValue * (roi.offsetPercent / 100)
  const roiSetupAmortized = selectedPlanDetails.setupCad / selectedPlanDetails.amortizedMonths
  const roiNexusCost = selectedPlanDetails.monthlyCad + roiSetupAmortized + roi.variableCosts
  const roiRecoveredContribution = roi.recoveredOpportunities * roi.contributionValue
  const roiDiff = roiOffsetValue + roiRecoveredContribution - roiNexusCost

  const handleRoiChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setRoi((prev) => ({
      ...prev,
      [name]:
        name === "hoursPerWeek" ||
        name === "offsetPercent" ||
        name === "customRate" ||
        name === "recoveredOpportunities" ||
        name === "contributionValue" ||
        name === "variableCosts"
          ? Number(value)
          : value,
    }))
  }

  const pricingFaqs = ALL_FAQS.filter((f) => f.category === "Plans & Billing")

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      <MobileNav />

      {/* ── 1. PRICING HERO ─────────────────────────────────────────────────── */}
      <section className="pt-36 pb-16 px-6 md:px-12 lg:px-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-4 flex flex-col items-center">
          <PixelIcon type="pricing" size={40} />
          <Tag>PRICING &amp; PLANS</Tag>
          <RevealText className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#111] leading-[1.08]">
            {"Simple plans for the way\nyour business works."}
          </RevealText>
          <p className="text-sm sm:text-base text-black/65 max-w-2xl mx-auto leading-relaxed font-light">
            Start with <strong>Nexus Cloud</strong> ($0 mandatory setup), step up to <strong>Nexus Edge</strong> for dedicated capacity, or tailor <strong>Nexus Enterprise</strong> around multi-location operations.
          </p>
          <p className="text-xs text-black/40 font-mono pt-1">
            All prices are shown in Canadian dollars and exclude applicable taxes.
          </p>
        </div>
        <div className="max-w-5xl mx-auto mt-12">
          <PricingTierArchitectureVisual />
        </div>
      </section>

      {/* ── 2. THREE COMPACT PACKAGE CARDS ──────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center rounded-full border border-black/10 p-1 gap-1 bg-white shadow-xs">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-full text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                  billingCycle === "monthly" ? "bg-[#111] text-white font-medium shadow-xs" : "text-black/60 hover:text-black"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-5 py-2 rounded-full text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                  billingCycle === "annual" ? "bg-[#111] text-white font-medium shadow-xs" : "text-black/60 hover:text-black"
                }`}
              >
                Annual
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cloud */}
            <BentoCard className="p-8 flex flex-col justify-between" delay={0}>
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="font-pixel text-xs tracking-widest text-black/50">NEXUS CLOUD</div>
                  <NexusCloudEmblem className="w-12 h-12" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-light">
                    CAD ${billingCycle === "annual" ? PACKAGES.cloud.annualMonthlyCad : PACKAGES.cloud.monthlyCad}
                  </span>
                  <span className="text-black/40 text-sm">/month</span>
                </div>
                <span className="mt-2 inline-block text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                  No setup fee
                </span>
                <p className="mt-4 text-sm text-black/70">{PACKAGES.cloud.tagline}</p>
                <ul className="space-y-2.5 mt-5 mb-6">
                  {PACKAGES.cloud.compactBullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-black/70">
                      <span className="text-emerald-600">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#contact" className="block w-full py-3.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-sm">
                {PACKAGES.cloud.ctaText}
              </a>
            </BentoCard>

            {/* Edge */}
            <BentoCard className="p-8 flex flex-col justify-between border-black/20 bg-[#FAF9F5]" delay={80}>
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <span className="font-pixel text-xs tracking-widest text-black/50 block">NEXUS EDGE</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest bg-emerald-700 text-white font-mono mt-1 inline-block">
                      DEDICATED CAPACITY
                    </span>
                  </div>
                  <NexusEdgeEmblem className="w-12 h-12" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-light">From CAD $499</span>
                  <span className="text-black/50 text-sm">/month</span>
                </div>
                <span className="mt-2 inline-block text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white border border-black/10 text-black/70">
                  CAD $1,499 one-time setup{billingCycle === "annual" ? " · annual by quote" : ""}
                </span>
                <p className="mt-4 text-sm text-black/70">{PACKAGES.edge.tagline}</p>
                <ul className="space-y-2.5 mt-5 mb-6">
                  {PACKAGES.edge.compactBullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-black/75">
                      <span className="text-emerald-600">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <a href="#contact" className="block w-full py-3.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-sm">
                  {PACKAGES.edge.ctaText}
                </a>
                <Link href="/nexus-edge" className="block text-[11px] text-black/60 hover:text-black text-center transition-colors">
                  Learn more about Nexus Edge →
                </Link>
              </div>
            </BentoCard>

            {/* Enterprise */}
            <BentoCard className="p-8 flex flex-col justify-between" delay={160}>
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="font-pixel text-xs tracking-widest text-black/50">NEXUS ENTERPRISE</div>
                  <NexusEnterpriseEmblem className="w-12 h-12" />
                </div>
                <div className="text-4xl font-light">Custom quote</div>
                <span className="mt-2 inline-block text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white border border-black/10 text-black/70">
                  Implementation fee quoted separately
                </span>
                <p className="mt-4 text-sm text-black/70">{PACKAGES.custom.tagline}</p>
                <ul className="space-y-2.5 mt-5 mb-6">
                  {PACKAGES.custom.compactBullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-black/70">
                      <span className="text-black/50">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#contact" className="block w-full py-3.5 border border-black/20 text-black/80 text-xs font-medium rounded-xl hover:border-black/40 hover:text-black hover:bg-black/[0.03] transition-all tracking-widest text-center uppercase">
                {PACKAGES.custom.ctaText}
              </a>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── 3. VISUAL COMPARISON ────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-white">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center flex flex-col items-center">
            <PixelIcon type="platform" size={40} />
            <div className="mt-4"><Tag>COMPARE</Tag></div>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111] mt-3 tracking-tight">At a glance.</h2>
          </div>
          <PlanComparisonVisual />
        </div>
      </section>

      {/* ── 4. ONBOARDING JOURNEY ───────────────────────────────────────────── */}
      <section id="pilot" className="py-20 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center flex flex-col items-center">
            <PixelIcon type="workflow" size={40} />
            <div className="mt-4"><Tag>GUIDED ONBOARDING</Tag></div>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111] mt-3 tracking-tight">{PILOT_TERMS.headline}</h2>
          </div>
          <OnboardingJourney />
          <div className="text-center">
            <a href="#contact" className="inline-block px-6 py-3.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase shadow-sm">
              Start with Nexus Cloud
            </a>
          </div>
        </div>
      </section>

      {/* ── 5. AI USAGE ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-white">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center flex flex-col items-center">
            <PixelIcon type="agents" size={40} />
            <div className="mt-4"><Tag>AI USAGE CONTROLS</Tag></div>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111] mt-3 tracking-tight">Credits included. Never a surprise bill.</h2>
          </div>
          <UsageMeterVisual />
        </div>
      </section>

      {/* ── 6. UPGRADE PATH ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center">
            <Tag>GROW WITH NEXUS</Tag>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111] mt-3 tracking-tight">Your business changes. Nexus grows with it.</h2>
          </div>
          <UpgradePathVisual />
        </div>
      </section>

      {/* ── 7. ADD-ONS ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-white">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center flex flex-col items-center">
            <PixelIcon type="integrations" size={40} />
            <div className="mt-4"><Tag>ADD-ONS</Tag></div>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111] mt-3 tracking-tight">Add more when you&apos;re ready.</h2>
          </div>
          <AddOnsVisual />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-[#FAF9F5] border border-black/7 p-5">
            <p className="text-[11px] text-black/55">
              One-time fees cover setup &amp; testing · Monthly fees cover maintenance &amp; support · Third-party usage is separate.
            </p>
            <Link href="/connections" className="shrink-0 px-4 py-2.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors uppercase tracking-wider">
              Explore Integrations
            </Link>
          </div>
        </div>
      </section>

      {/* ── 11. ROI CALCULATOR & WAGE BENCHMARK TABLE ─────────────────────────── */}
      <section id="calculator" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <Tag>CAPACITY ESTIMATOR</Tag>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111] tracking-tight">
              What is repetitive work costing your business?
            </h2>
            <p className="text-xs sm:text-sm text-black/65 leading-relaxed font-light">
              Nexus absorbs routine drafting, reminders, reviews, and coordination that consume owner and staff hours. Use official Toronto wage benchmarks to estimate potential value.
            </p>
          </div>

          {/* Visual Outcome Summary */}
          <NexusOutcomeSummary />

          {/* Wage Table */}
          <details className="overflow-x-auto bg-white p-6 rounded-2xl border border-black/[0.07] shadow-xs">
            <summary className="cursor-pointer text-xs text-black/60 tracking-widest uppercase font-mono">
              Show Toronto wage benchmarks (Job Bank, 2026)
            </summary>
            <div className="mt-4" />
            <table className="w-full text-xs sm:text-sm min-w-[620px]">
              <thead>
                <tr className="border-b border-black/[0.08]">
                  <th className="text-left py-3 pr-4 text-xs font-normal tracking-wider text-black/40">Repetitive work</th>
                  <th className="text-right py-3 pr-4 text-xs font-normal tracking-wider text-black/40">Benchmark</th>
                  <th className="text-right py-3 pr-4 text-xs font-normal tracking-wider text-black/40">Hrs/mo</th>
                  <th className="text-right py-3 pr-4 text-xs font-normal tracking-wider text-black/40">Wage-only value</th>
                  <th className="text-left py-3 text-xs font-normal tracking-wider text-black/40">How Nexus helps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                {WAGE_TABLE.map((row, i) => (
                  <tr key={i} className={row.total ? "border-t-2 border-black/[0.08] font-medium" : ""}>
                    <td className="py-3 pr-4 text-black/80">{row.work}</td>
                    <td className="py-3 pr-4 text-right text-black/40 whitespace-nowrap">{row.benchmark}</td>
                    <td className="py-3 pr-4 text-right tabular-nums text-black/70">{row.hours}</td>
                    <td className="py-3 pr-4 text-right tabular-nums whitespace-nowrap text-black/80">{row.value}</td>
                    <td className="py-3 text-black/50 text-xs">{row.help}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-[11px] text-black/35">
              Base wages only. Excludes mandatory payroll deductions, equipment, and training. Source: Government of Canada Job Bank.
            </p>
          </details>

          {/* Interactive Calculator */}
          <div className="rounded-2xl border border-black/[0.07] bg-white p-6 sm:p-8 shadow-sm">
            <div className="text-xs text-black/40 tracking-widest uppercase mb-6 font-mono">
              Interactive capacity calculator
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Inputs */}
              <div className="space-y-5">
                <div>
                  <label htmlFor="roi-hours" className="block text-xs tracking-wider text-black/60 mb-2 font-medium">
                    REPETITIVE HOURS PER WEEK: <span className="text-black font-semibold">{roi.hoursPerWeek}h</span>
                  </label>
                  <input
                    id="roi-hours"
                    type="range"
                    name="hoursPerWeek"
                    min={1}
                    max={60}
                    value={roi.hoursPerWeek}
                    onChange={handleRoiChange}
                    className="w-full accent-black h-1.5 rounded-full cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-black/35 mt-1 font-mono">
                    <span>1h/wk</span>
                    <span>60h/wk</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="roi-role" className="block text-xs tracking-wider text-black/60 mb-2 font-medium">
                    HOURLY ROLE BENCHMARK
                  </label>
                  <select
                    id="roi-role"
                    name="hourlyRole"
                    value={roi.hourlyRole}
                    onChange={handleRoiChange}
                    className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#111] focus:outline-none focus:border-black/30"
                  >
                    <option value="receptionist">Receptionist — CAD $20.00/hr (Job Bank Toronto)</option>
                    <option value="administrative">Administrative assistant — CAD $26.50/hr (Job Bank Toronto)</option>
                    <option value="marketing">Social media coordinator — CAD $37.50/hr (Job Bank Toronto)</option>
                    <option value="custom">Custom hourly rate</option>
                  </select>
                </div>

                {roi.hourlyRole === "custom" && (
                  <div>
                    <label htmlFor="roi-rate" className="block text-xs tracking-wider text-black/60 mb-2 font-medium">
                      CUSTOM HOURLY RATE (CAD $)
                    </label>
                    <input
                      id="roi-rate"
                      type="number"
                      name="customRate"
                      min={1}
                      max={500}
                      step={0.5}
                      value={roi.customRate}
                      onChange={handleRoiChange}
                      className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#111]"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="roi-offset" className="block text-xs tracking-wider text-black/60 mb-2 font-medium">
                    EXPECTED WORKLOAD OFFSET: <span className="text-black font-semibold">{roi.offsetPercent}%</span>
                  </label>
                  <input
                    id="roi-offset"
                    type="range"
                    name="offsetPercent"
                    min={0}
                    max={100}
                    value={roi.offsetPercent}
                    onChange={handleRoiChange}
                    className="w-full accent-black h-1.5 rounded-full cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-black/35 mt-1 font-mono">
                    <span>0% (Conservative)</span>
                    <span>100% (High Autonomy)</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="roi-plan" className="block text-xs tracking-wider text-black/60 mb-2 font-medium">
                    NEXUS PACKAGE
                  </label>
                  <select
                    id="roi-plan"
                    name="plan"
                    value={roi.plan}
                    onChange={handleRoiChange}
                    className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#111]"
                  >
                    <option value="cloud">Nexus Cloud (No mandatory setup fee)</option>
                    <option value="edge">Nexus Edge (Dedicated capacity · +CAD $1,499 one-time setup)</option>
                    <option value="enterprise">Nexus Enterprise (Custom quote)</option>
                  </select>
                </div>
              </div>

              {/* Outputs */}
              <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-black/[0.06] space-y-4">
                <div className="text-xs text-black/40 tracking-widest uppercase font-mono">Estimated Result</div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between text-black/60">
                    <span>Monthly work value ({roi.hoursPerWeek}h × 52/12 × CAD ${roiHourlyRate.toFixed(2)})</span>
                    <span className="font-medium text-[#111] tabular-nums">CAD ${roiMonthlyWorkValue.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-black/60">
                    <span>Estimated offset ({roi.offsetPercent}%)</span>
                    <span className="font-medium text-emerald-800 tabular-nums">CAD ${roiOffsetValue.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-black/60 border-t border-black/[0.06] pt-2">
                    <span>
                      {selectedPlanDetails.displayLabel}
                    </span>
                    <span className="font-medium text-black/80 tabular-nums">−CAD ${roiNexusCost.toFixed(0)}</span>
                  </div>
                </div>

                <div className={`rounded-xl p-4 ${roiDiff >= 0 ? "bg-emerald-50 border border-emerald-100" : "bg-amber-50 border border-amber-100"}`}>
                  <div className={`text-[10px] tracking-widest uppercase font-mono mb-1 ${roiDiff >= 0 ? "text-emerald-700" : "text-amber-700"}`}>
                    Illustrative capacity difference
                  </div>
                  <div className={`text-3xl font-light tabular-nums ${roiDiff >= 0 ? "text-emerald-800" : "text-amber-800"}`}>
                    {roiDiff >= 0 ? "+" : ""}CAD ${roiDiff.toFixed(0)}<span className="text-sm font-light">/mo</span>
                  </div>
                </div>

                <p className="text-[10px] text-black/40 leading-relaxed">
                  Illustrative workload comparison only. Nexus does not guarantee specific cost savings. Assumes Nexus successfully offsets entered hours.
                </p>

                <a
                  href="#contact"
                  className="block w-full py-3 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-sm"
                >
                  Book a Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. PRICING FAQ ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-white">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <Tag>PRICING FAQ</Tag>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111] mt-3 tracking-tight">
              Package &amp; billing questions.
            </h2>
          </div>

          <div className="divide-y divide-black/[0.06] bg-[#FAF9F5] rounded-2xl border border-black/[0.07] px-6 sm:px-8 py-2">
            {pricingFaqs.map((faq) => (
              <FaqAccordionItem key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/faq"
              className="text-xs text-black/60 hover:text-black underline underline-offset-2 transition-colors"
            >
              View all frequently asked questions across all categories →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 13. CONSULTATION CTA ────────────────────────────────────────────── */}
      <ConsultationForm />

      <SiteFooter />
      <BackToTop />
    </div>
  )
}

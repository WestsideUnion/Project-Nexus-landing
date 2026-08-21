"use client"

import React, { useState } from "react"
import Link from "next/link"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { MobileNav } from "@/components/mobile-nav"
import { SiteFooter } from "@/components/site-footer"
import { ConsultationForm } from "@/components/consultation-form"
import { BentoCard, Tag, StatusPill, FaqAccordionItem, BackToTop } from "@/components/shared-ui"
import {
  PACKAGES,
  PILOT_TERMS,
  EDGE_AGREEMENT,
  AI_USAGE_RULES,
  ADD_ON_CATEGORIES,
  WAGE_TABLE,
  HOURLY_RATES,
  ALL_FAQS,
} from "@/lib/site-data"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  // ROI Calculator state
  const [roi, setRoi] = useState({
    hoursPerWeek: 10,
    hourlyRole: "administrative" as "receptionist" | "administrative" | "marketing" | "custom",
    customRate: 26.5,
    offsetPercent: 50,
    plan: "cloud" as "cloud" | "edge" | "custom",
    recoveredOpportunities: 0,
    contributionValue: 0,
    variableCosts: 0,
  })

  const roiHourlyRate = roi.hourlyRole === "custom" ? roi.customRate : (HOURLY_RATES[roi.hourlyRole] ?? 26.5)
  const roiMonthlyWorkValue = (roi.hoursPerWeek * 52) / 12 * roiHourlyRate
  const roiOffsetValue = roiMonthlyWorkValue * (roi.offsetPercent / 100)
  const roiPlanData = PACKAGES[roi.plan] || PACKAGES.cloud
  const roiSetupAmortized = roiPlanData.onboardingFeeCad > 0 ? roiPlanData.onboardingFeeCad / (roiPlanData.commitmentMonths > 1 ? roiPlanData.commitmentMonths : 12) : 0
  const roiNexusCost = (roi.plan === "cloud" && billingCycle === "annual" ? roiPlanData.annualMonthlyCad : roiPlanData.monthlyCad) + roiSetupAmortized + roi.variableCosts
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

  const pricingFaqs = ALL_FAQS.filter((f) => f.category === "Packages and Pricing" || f.category === "AI Usage")

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      <MobileNav />

      {/* ── 1. PRICING HERO ─────────────────────────────────────────────────── */}
      <section className="pt-36 pb-16 px-6 md:px-12 lg:px-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Tag>PRICING &amp; PLANS</Tag>
          <RevealText className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#111] leading-[1.08]">
            {"Choose the Nexus package\nthat fits how your business works today."}
          </RevealText>
          <p className="text-sm sm:text-base text-black/65 max-w-2xl mx-auto leading-relaxed font-light">
            Start with managed cloud assistance, keep more work on-site with Nexus Edge, or plan a tailored deployment.
          </p>
          <p className="text-xs text-black/40 font-mono pt-2">
            All prices are shown in Canadian dollars and exclude applicable taxes.
          </p>
        </div>
      </section>

      {/* ── 2. THREE FULL PACKAGE CARDS ─────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto">
          {/* Billing Cycle Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center rounded-full border border-black/10 p-1 gap-1 bg-white shadow-xs">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-full text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                  billingCycle === "monthly" ? "bg-[#111] text-white font-medium shadow-xs" : "text-black/60 hover:text-black"
                }`}
              >
                MONTHLY BILLING
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-5 py-2 rounded-full text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                  billingCycle === "annual" ? "bg-[#111] text-white font-medium shadow-xs" : "text-black/60 hover:text-black"
                }`}
              >
                ANNUAL BILLING (SAVE 20% ON CLOUD)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. Cloud Card */}
            <BentoCard className="p-8 flex flex-col justify-between" delay={0}>
              <div>
                <div className="font-pixel text-xs tracking-widest text-black/40 mb-3">NEXUS CLOUD</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl sm:text-4xl font-light">
                    CAD ${billingCycle === "annual" ? PACKAGES.cloud.annualMonthlyCad : PACKAGES.cloud.monthlyCad}
                  </span>
                  <span className="text-black/40 text-sm">/month</span>
                </div>
                <p className="text-xs text-black/50 mb-1">{PACKAGES.cloud.onboardingLabel}</p>
                {billingCycle === "annual" ? (
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 inline-block mb-4">
                    CAD $79/mo billed annually (CAD $948/yr)
                  </span>
                ) : (
                  <span className="text-[10px] text-black/40 inline-block mb-4">
                    Optional: CAD $79/mo when billed annually
                  </span>
                )}

                <div className="p-3.5 rounded-xl bg-black/[0.02] border border-black/[0.04] mb-5">
                  <p className="text-xs text-black/70 italic leading-snug">
                    &ldquo;{PACKAGES.cloud.tagline}&rdquo;
                  </p>
                </div>

                <p className="text-xs text-black/60 leading-relaxed mb-6">
                  {PACKAGES.cloud.description}
                </p>

                <div className="text-xs font-medium uppercase tracking-widest text-black/40 mb-3">What is included</div>
                <ul className="space-y-2.5 mb-6">
                  {PACKAGES.cloud.fullFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-black/70 leading-snug">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                      <span>{feat.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-black/[0.05]">
                <p className="text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-lg mb-4 leading-relaxed">
                  Managed AI usage included. Zero automatic overages.
                </p>
                <a
                  href="#contact"
                  className="block w-full py-3.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-sm"
                >
                  Start with Nexus Cloud
                </a>
              </div>
            </BentoCard>

            {/* 2. Edge Card */}
            <BentoCard className="p-8 flex flex-col justify-between border-black/20 bg-[#FAF9F5]" delay={80}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-pixel text-xs tracking-widest text-black/50">NEXUS EDGE</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest bg-emerald-700 text-white font-mono">
                    ON-SITE PRIVACY
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl sm:text-4xl font-light">CAD $299</span>
                  <span className="text-black/50 text-sm">/month · 24-month term</span>
                </div>
                <p className="text-xs text-black/60 mb-4">{PACKAGES.edge.onboardingLabel}</p>

                <div className="p-3.5 rounded-xl bg-white border border-black/[0.06] mb-5">
                  <p className="text-xs text-black/70 italic leading-snug">
                    &ldquo;{PACKAGES.edge.tagline}&rdquo;
                  </p>
                </div>

                <p className="text-xs text-black/65 leading-relaxed mb-6">
                  {PACKAGES.edge.description}
                </p>

                <div className="text-xs font-medium uppercase tracking-widest text-black/50 mb-3">What is included</div>
                <ul className="space-y-2.5 mb-6">
                  {PACKAGES.edge.fullFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-black/80 leading-snug">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                      <span className={feat.highlight ? "font-medium text-[#111]" : ""}>{feat.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-black/[0.05]">
                <div className="p-3 rounded-lg bg-black/[0.03] border border-black/[0.05] mb-4 text-[11px] text-black/70 leading-relaxed">
                  Total 24-month minimum commitment: <strong>CAD $7,875</strong> before taxes (CAD $699 activation + 24 × $299). Appliance remains property of Westside Union.
                </div>
                <Link
                  href="/nexus-edge"
                  className="block w-full py-3.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-sm"
                >
                  Explore Nexus Edge
                </Link>
              </div>
            </BentoCard>

            {/* 3. Custom Card */}
            <BentoCard className="p-8 flex flex-col justify-between" delay={160}>
              <div>
                <div className="font-pixel text-xs tracking-widest text-black/40 mb-3">NEXUS CUSTOM</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl sm:text-4xl font-light">From CAD $799</span>
                  <span className="text-black/40 text-sm">/month</span>
                </div>
                <p className="text-xs text-black/50 mb-4">{PACKAGES.custom.onboardingLabel}</p>

                <div className="p-3.5 rounded-xl bg-black/[0.02] border border-black/[0.04] mb-5">
                  <p className="text-xs text-black/70 italic leading-snug">
                    &ldquo;{PACKAGES.custom.tagline}&rdquo;
                  </p>
                </div>

                <p className="text-xs text-black/60 leading-relaxed mb-6">
                  {PACKAGES.custom.description}
                </p>

                <div className="text-xs font-medium uppercase tracking-widest text-black/40 mb-3">What is included</div>
                <ul className="space-y-2.5 mb-6">
                  {PACKAGES.custom.fullFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-black/70 leading-snug">
                      <div className="w-1.5 h-1.5 rounded-full bg-black/40 mt-1 shrink-0" />
                      <span>{feat.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-black/[0.05]">
                <p className="text-[11px] text-black/50 mb-4 leading-relaxed">
                  Final price and architecture confirmed after business workflow consultation.
                </p>
                <a
                  href="#contact"
                  className="block w-full py-3.5 border border-black/20 text-black/80 text-xs font-medium rounded-xl hover:border-black/40 hover:text-black hover:bg-black/[0.03] transition-all tracking-widest text-center uppercase"
                >
                  Plan a Custom Solution
                </a>
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── 3. PACKAGE COMPARISON MATRIX ────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Tag>COMPARISON</Tag>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111] mt-3 tracking-tight">
              Compare package outcomes.
            </h2>
            <p className="text-xs sm:text-sm text-black/55 mt-2">
              A clear view of capabilities across Nexus packages.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="text-left py-3.5 pr-4 text-xs font-medium uppercase tracking-wider text-black/50">Feature / Outcome</th>
                  <th className="text-left py-3.5 px-4 text-xs font-medium uppercase tracking-wider text-black/80">Nexus Cloud</th>
                  <th className="text-left py-3.5 px-4 text-xs font-medium uppercase tracking-wider text-black/80 bg-black/[0.02] rounded-t-lg">Nexus Edge</th>
                  <th className="text-left py-3.5 pl-4 text-xs font-medium uppercase tracking-wider text-black/80">Nexus Custom</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.05] text-black/70">
                {[
                  { row: "Best for", cloud: "Single location & fast start", edge: "Higher on-site privacy & local work", custom: "Multi-location & specialized tools" },
                  { row: "Business locations", cloud: "1 location", edge: "1 location (on-site)", custom: "Multiple locations" },
                  { row: "Messaging channels", cloud: "1 channel included", edge: "1 channel included", custom: "Multiple channels" },
                  { row: "Standard connections", cloud: "1 connection included", edge: "Up to 2 connections", custom: "Tailored connections" },
                  { row: "Managed AI allowance", cloud: "CAD $10/mo included", edge: "CAD $10/mo cloud fallback", custom: "Custom allowance" },
                  { row: "Local appliance", cloud: "No (Cloud managed)", edge: "Yes (Dedicated appliance)", custom: "Hybrid / On-premise option" },
                  { row: "Local business knowledge", cloud: "Cloud isolated", edge: "Kept on-site", custom: "Custom data isolation" },
                  { row: "Monitoring & support", cloud: "Standard managed support", edge: "Priority remote monitoring", custom: "Dedicated account support" },
                  { row: "Commitment", cloud: "Monthly (or annual)", edge: "24-month managed agreement", custom: "Annual agreement" },
                  { row: "Onboarding / Activation", cloud: "CAD $299 onboarding", edge: "CAD $699 activation", custom: "From CAD $2,500" },
                  { row: "Upgrade options", cloud: "Credit $299 toward Edge within 6 mo", edge: "Renew, refresh, or cloud transition", custom: "Custom scaling" },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-black/[0.01] transition-colors">
                    <td className="py-3.5 pr-4 font-medium text-[#111]">{item.row}</td>
                    <td className="py-3.5 px-4">{item.cloud}</td>
                    <td className="py-3.5 px-4 bg-black/[0.02] font-medium text-black/90">{item.edge}</td>
                    <td className="py-3.5 pl-4">{item.custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 4. 30-DAY CLOUD PILOT SECTION ───────────────────────────────────── */}
      <section id="pilot" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto rounded-3xl border border-black/[0.08] bg-white p-8 sm:p-12 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <span className="px-3 py-1 rounded-full text-[10px] tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200/60 uppercase font-sans font-medium">
                {PILOT_TERMS.name}
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-[#111] tracking-tight leading-[1.1]">
                {PILOT_TERMS.headline}
              </h2>
              <p className="text-sm text-black/75 leading-relaxed font-light">
                {PILOT_TERMS.subheadline}
              </p>
              <p className="text-xs text-emerald-800 font-medium pt-1">
                {PILOT_TERMS.clarification}
              </p>
            </div>

            <div className="shrink-0 flex flex-col gap-2.5 w-full sm:w-auto">
              <a
                href="#contact"
                className="px-6 py-3.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center uppercase shadow-sm whitespace-nowrap"
              >
                Apply for 30-Day Pilot
              </a>
              <span className="text-[10px] text-black/45 text-center">
                Begins on confirmed go-live date
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 border-t border-black/[0.06]">
            {PILOT_TERMS.inclusions.map((inc, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#FAF9F5] border border-black/[0.04]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <h3 className="text-xs font-medium text-[#111]">{inc.title}</h3>
                </div>
                <p className="text-xs text-black/60 leading-relaxed pl-3.5">{inc.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-black/[0.02] border border-black/[0.05] space-y-2">
            <h3 className="text-xs font-medium text-black/80">At the end of your 30 days, you choose:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-black/65">
              {PILOT_TERMS.endOfPilotChoices.map((choice, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span>{choice}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-black/40 leading-relaxed border-t border-black/[0.05] pt-3">
            {PILOT_TERMS.disclosure}
          </p>
        </div>
      </section>

      {/* ── 5. MANAGED AI USAGE & SAFEGUARDS ────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-white">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <Tag>AI USAGE CONTROLS</Tag>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111] tracking-tight">
              CAD $10 of managed AI usage included every month.
            </h2>
            <p className="text-xs sm:text-sm text-black/65 leading-relaxed font-light">
              Your included allowance covers routine customer follow-ups, review draft preparation, summaries, and notifications. Nexus provides clear visibility and spending safeguards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AI_USAGE_RULES.rules.map((rule, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#FAF9F5] border border-black/[0.05]">
                <h3 className="text-sm font-medium text-[#111] mb-1.5">{rule.title}</h3>
                <p className="text-xs text-black/60 leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>

          {/* 6. AI Usage Packs */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/[0.08] space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-medium text-[#111]">Optional Prepaid AI Usage Packs</h3>
                <p className="text-xs text-black/50">Need more capacity during a high-volume promotion? Add a prepaid pack anytime.</p>
              </div>
              <span className="text-xs text-emerald-700 font-medium font-mono">No automatic overages</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {AI_USAGE_RULES.usagePacks.map((pack, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#FAF9F5] border border-black/[0.04]">
                  <div className="text-xs font-medium text-[#111]">{pack.label}</div>
                  <div className="text-lg font-light text-black/90 mt-1">{pack.priceDisplay}</div>
                  <div className="text-[11px] text-black/45 mt-1.5">{pack.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Customer-Owned Provider Option */}
          <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-black/[0.06] space-y-2">
            <h3 className="text-sm font-medium text-[#111]">{AI_USAGE_RULES.customerOwnedProviderInfo.title}</h3>
            <p className="text-xs text-black/65 leading-relaxed">
              {AI_USAGE_RULES.customerOwnedProviderInfo.description}
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. NEXUS EDGE AGREEMENT SUMMARY & 9. CLOUD-TO-EDGE CREDIT ─────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="rounded-3xl border border-black/[0.08] bg-white p-8 sm:p-10 shadow-sm space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] tracking-widest bg-emerald-700 text-white font-mono uppercase">
                NEXUS EDGE AGREEMENT
              </span>
              <span className="text-xs text-black/40 font-mono">24-Month Term</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-light text-[#111]">
              Predictable infrastructure without capital hardware expense.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FAF9F5] border border-black/[0.04]">
                <div className="text-[11px] text-black/45 font-mono uppercase">Monthly Fee</div>
                <div className="text-xl font-light text-[#111] mt-1">CAD $299/mo</div>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF9F5] border border-black/[0.04]">
                <div className="text-[11px] text-black/45 font-mono uppercase">Activation Fee</div>
                <div className="text-xl font-light text-[#111] mt-1">CAD $699 one-time</div>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF9F5] border border-black/[0.04]">
                <div className="text-[11px] text-black/45 font-mono uppercase">Minimum Commitment</div>
                <div className="text-xl font-light text-[#111] mt-1">CAD $7,875 before tax</div>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF9F5] border border-black/[0.04]">
                <div className="text-[11px] text-black/45 font-mono uppercase">Appliance Property</div>
                <div className="text-xs font-medium text-black/80 mt-1">Westside Union</div>
              </div>
            </div>

            <p className="text-xs text-black/60 leading-relaxed">
              Standard managed appliance included. The appliance remains the property of Westside Union to enable continuous monitoring, security updates, and covered hardware replacement. Higher-capacity hardware, specialized custom connections, or optional add-ons are separate.
            </p>

            {/* Cloud-to-Edge Upgrade Credit Box */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] tracking-widest uppercase font-mono text-emerald-800 font-medium block mb-1">
                  CLOUD-TO-EDGE UPGRADE CREDIT
                </span>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  {EDGE_AGREEMENT.cloudToEdgeCreditText}
                </p>
              </div>
              <Link
                href="/nexus-edge"
                className="shrink-0 px-4 py-2 bg-emerald-800 text-white text-xs font-medium rounded-xl hover:bg-emerald-900 transition-colors uppercase tracking-wider"
              >
                View Edge Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. ADD-ONS CATALOGUE ────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <Tag>ADD-ONS</Tag>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111] tracking-tight">
              Start with what you need. Add more when the business is ready.
            </h2>
            <p className="text-xs sm:text-sm text-black/65 leading-relaxed font-light">
              Expand channels, tools, locations, and capacity as your operations grow. Westside Union verifies, configures, and tests each addition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ADD_ON_CATEGORIES.map((cat) => (
              <div key={cat.category} className="p-6 rounded-2xl bg-[#FAF9F5] border border-black/[0.06] flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-[#111] mb-1">{cat.category}</h3>
                  <p className="text-[11px] text-black/50 leading-relaxed mb-4">{cat.description}</p>
                  <div className="space-y-2">
                    {cat.items.map((item, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-white border border-black/[0.04]">
                        <div className="text-xs font-medium text-[#111]">{item.name}</div>
                        <div className="text-[11px] text-black/60 mt-0.5">{item.price}</div>
                        {item.desc && <div className="text-[10px] text-black/40 mt-0.5">{item.desc}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-black/[0.02] border border-black/[0.04] text-[11px] text-black/50 leading-relaxed">
            One-time fees cover setup, authorization, mapping, and testing. Monthly fees cover monitoring, maintenance, updates, and support. Third-party provider usage is separate.
          </div>

          {/* Dashboard Preview Banner */}
          <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-black/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <StatusPill status="preview" />
                <h3 className="text-xs font-medium text-black/80">Future Nexus Control Centre Catalogue</h3>
              </div>
              <p className="text-xs text-black/60 max-w-2xl">
                Browse and request add-on connections from the web dashboard preview. Westside Union verifies permissions, connects your account, and tests compatibility with your assistant.
              </p>
            </div>
            <Link
              href="/connections"
              className="shrink-0 px-4 py-2.5 bg-[#111] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-colors uppercase tracking-wider"
            >
              Explore All Connections
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

          {/* Wage Table */}
          <div className="overflow-x-auto bg-white p-6 rounded-2xl border border-black/[0.07] shadow-xs">
            <div className="text-xs text-black/40 tracking-widest uppercase mb-3 font-mono">
              Toronto wage benchmarks — Government of Canada Job Bank (median wages, 2026)
            </div>
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
          </div>

          {/* Interactive Calculator */}
          <div className="rounded-2xl border border-black/[0.07] bg-white p-6 sm:p-8 shadow-sm">
            <div className="text-xs text-black/40 tracking-widest uppercase mb-6 font-mono">
              Interactive capacity calculator
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Inputs */}
              <div className="space-y-5">
                <div>
                  <label className="block text-xs tracking-wider text-black/60 mb-2 font-medium">
                    REPETITIVE HOURS PER WEEK: <span className="text-black font-semibold">{roi.hoursPerWeek}h</span>
                  </label>
                  <input
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
                  <label className="block text-xs tracking-wider text-black/60 mb-2 font-medium">
                    EXPECTED WORKLOAD OFFSET: <span className="text-black font-semibold">{roi.offsetPercent}%</span>
                  </label>
                  <input
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
                    <option value="cloud">Nexus Cloud — CAD $99/mo (CAD $299 onboarding)</option>
                    <option value="edge">Nexus Edge — CAD $299/mo (CAD $699 activation · 24-mo term)</option>
                    <option value="custom">Nexus Custom — From CAD $799/mo</option>
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
                      {roi.plan === "cloud"
                        ? `Nexus Cloud (${billingCycle === "annual" ? "CAD $79" : "CAD $99"}/mo + CAD $${roiSetupAmortized.toFixed(0)} setup eq.)`
                        : `${roiPlanData.name} (CAD $${roiPlanData.monthlyCad}/mo + CAD $${roiSetupAmortized.toFixed(0)} setup eq.)`}
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

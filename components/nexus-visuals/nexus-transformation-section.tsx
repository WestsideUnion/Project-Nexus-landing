"use client"

import React, { useState } from "react"
import {
  FollowUpTrackerVector,
  ReviewResponseVector,
  OmnichannelSyncVector,
  IdeaToTaskVector,
  MorningBriefingVector,
  EveningAutopilotVector,
} from "@/components/transformation-vectors"
import { BentoCard, Tag } from "@/components/shared-ui"
import { RevealText } from "@/components/reveal-text"

export function NexusTransformationSection() {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0)

  const outcomes = [
    {
      id: 0,
      title: "Nothing gets forgotten",
      subtitle: "Customer follow-ups, quote reminders, and late-night ideas stay organized.",
      cards: [
        {
          tag: "PIPELINE AUTOMATION",
          headline: "Fewer forgotten follow-ups",
          body: "Quotes, callback requests, and inquiries stay visible in an active pipeline until handled.",
          vector: <FollowUpTrackerVector />,
        },
        {
          tag: "TASK CAPTURE",
          headline: "Midnight ideas turned into assigned work",
          body: "Send a voice note or text before sleeping. Nexus structures the checklist and sets morning reminders.",
          vector: <IdeaToTaskVector />,
        },
      ],
    },
    {
      id: 1,
      title: "Important work keeps moving",
      subtitle: "Customer inquiries, reviews, and multi-channel messages receive prompt attention.",
      cards: [
        {
          tag: "REPUTATION MANAGEMENT",
          headline: "Faster, polite review responses",
          body: "Nexus prepares on-brand review reply drafts and holds them ready for your one-tap approval.",
          vector: <ReviewResponseVector />,
        },
        {
          tag: "OMNICHANNEL SYNC",
          headline: "Consistent communication across channels",
          body: "Coordinate customer messages across WhatsApp, SMS, Telegram, and Email without losing context.",
          vector: <OmnichannelSyncVector />,
        },
      ],
    },
    {
      id: 2,
      title: "You remain informed and in control",
      subtitle: "Start each day with clear summaries and end each evening with peace of mind.",
      cards: [
        {
          tag: "DAILY INTELLIGENCE",
          headline: "Morning executive summaries",
          body: "Start each day knowing exactly what was handled overnight, what is pending, and what needs approval.",
          vector: <MorningBriefingVector />,
        },
        {
          tag: "PEACE OF MIND",
          headline: "Less administrative work at home",
          body: "Autopilot safeguards handle off-hours triage while urgent alerts respect your quiet family time.",
          vector: <EveningAutopilotVector />,
        },
      ],
    },
  ]

  return (
    <section id="transformation" className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Tag>THE TRANSFORMATION</Tag>
          <RevealText className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light text-[#111] tracking-tight leading-[1.08]">
            {"Your business runs, even when you sleep."}
          </RevealText>
          <p className="mt-4 text-xs sm:text-sm text-black/65 max-w-2xl mx-auto leading-relaxed font-light">
            Finish the day knowing what was handled, what is still moving, and what needs your approval. Customers feel heard. Follow-ups stay visible. The work no longer depends on you remembering everything at midnight.
          </p>
        </div>

        {/* 3 Outcome Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center p-1.5 rounded-2xl bg-white border border-black/[0.08] shadow-xs gap-1 max-w-full">
            {outcomes.map((o) => (
              <button
                key={o.id}
                onClick={() => setActiveTab(o.id as 0 | 1 | 2)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === o.id
                    ? "bg-[#111] text-white shadow-xs"
                    : "text-black/60 hover:text-black hover:bg-black/[0.04]"
                }`}
                aria-selected={activeTab === o.id}
                role="tab"
              >
                {o.title}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Outcome Headline & Description */}
        <div className="text-center mb-8">
          <p className="text-xs sm:text-sm font-medium text-black/80 font-mono tracking-wide">
            {outcomes[activeTab].subtitle}
          </p>
        </div>

        {/* Display the 2 Vector Cards for the Active Outcome */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {outcomes[activeTab].cards.map((card, idx) => (
            <BentoCard key={idx} className="p-6 sm:p-7 flex flex-col justify-between" delay={idx * 100}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono tracking-widest text-black/50 font-semibold">
                    {card.tag}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <h3 className="text-lg font-medium text-black mb-2">{card.headline}</h3>
                <p className="text-xs text-black/60 leading-relaxed mb-6">{card.body}</p>
              </div>

              {/* Rich Illustrated Vector Panel */}
              <div className="mt-2">{card.vector}</div>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  )
}

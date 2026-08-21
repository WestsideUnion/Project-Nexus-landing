import React from "react"

// Vector 1: Fewer forgotten follow-ups (Automated Tracker Pipeline)
export function FollowUpTrackerVector() {
  return (
    <div className="w-full h-44 relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#181a20] to-[#101216] border border-white/[0.08] p-3 group-hover:border-emerald-500/30 transition-all duration-300">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <svg
        viewBox="0 0 320 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[320px] select-none"
      >
        <defs>
          <pattern id="followup-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
          <linearGradient id="line-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="card-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1F2430" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#141720" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        <rect width="320" height="160" fill="url(#followup-grid)" />

        {/* Top Header / Tracker Status */}
        <g transform="translate(16, 10)">
          <rect width="288" height="24" rx="6" fill="#131720" stroke="rgba(255,255,255,0.08)" />
          <circle cx="12" cy="12" r="3.5" fill="#10B981">
            <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x="22" y="15" fill="#E2E8F0" fontSize="8.5" fontFamily="monospace" fontWeight="500" letterSpacing="0.05em">
            ACTIVE PIPELINE TRACKER
          </text>
          <rect x="226" y="5" width="52" height="14" rx="4" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.3)" />
          <text x="252" y="15" fill="#34D399" fontSize="7.5" fontFamily="system-ui, sans-serif" textAnchor="middle" fontWeight="600">
            3 In Sync
          </text>
        </g>

        {/* Vertical Pipeline Flow Line */}
        <line x1="32" y1="42" x2="32" y2="140" stroke="url(#line-grad-1)" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Row 1: Quote Follow-up */}
        <g transform="translate(24, 42)">
          <circle cx="8" cy="14" r="5" fill="#10B981" />
          <path d="M6 14L7.5 15.5L10.5 12" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          
          <rect x="22" y="0" width="258" height="28" rx="6" fill="url(#card-grad-1)" stroke="rgba(255,255,255,0.08)" />
          <text x="32" y="13" fill="#FFFFFF" fontSize="9" fontWeight="500" fontFamily="system-ui, sans-serif">
            Quote #1042 — Sarah M.
          </text>
          <text x="32" y="22" fill="#94A3B8" fontSize="7.5" fontFamily="system-ui, sans-serif">
            Sent 4:15 PM • Auto-reminder active
          </text>
          <rect x="196" y="6" width="76" height="16" rx="4" fill="rgba(16,185,129,0.12)" />
          <text x="234" y="17.5" fill="#10B981" fontSize="7.5" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">
            Followed Up
          </text>
        </g>

        {/* Row 2: Callback Request */}
        <g transform="translate(24, 76)">
          <circle cx="8" cy="14" r="5" fill="#3B82F6" />
          <circle cx="8" cy="14" r="2" fill="#FFFFFF" />

          <rect x="22" y="0" width="258" height="28" rx="6" fill="url(#card-grad-1)" stroke="rgba(255,255,255,0.08)" />
          <text x="32" y="13" fill="#FFFFFF" fontSize="9" fontWeight="500" fontFamily="system-ui, sans-serif">
            Callback — Apex Comm.
          </text>
          <text x="32" y="22" fill="#94A3B8" fontSize="7.5" fontFamily="system-ui, sans-serif">
            Inquiry logged • Morning queue
          </text>
          <rect x="202" y="6" width="70" height="16" rx="4" fill="rgba(59,130,246,0.15)" />
          <text x="237" y="17.5" fill="#60A5FA" fontSize="7.5" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">
            Queued 9AM
          </text>
        </g>

        {/* Row 3: Inquiry Tracking */}
        <g transform="translate(24, 110)">
          <circle cx="8" cy="14" r="5" fill="#8B5CF6" />
          <path d="M8 11V14H10" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />

          <rect x="22" y="0" width="258" height="28" rx="6" fill="url(#card-grad-1)" stroke="rgba(255,255,255,0.08)" />
          <text x="32" y="13" fill="#FFFFFF" fontSize="9" fontWeight="500" fontFamily="system-ui, sans-serif">
            Catering — 45 guests
          </text>
          <text x="32" y="22" fill="#94A3B8" fontSize="7.5" fontFamily="system-ui, sans-serif">
            Deposit details drafted &amp; tracked
          </text>
          <rect x="204" y="6" width="68" height="16" rx="4" fill="rgba(139,92,246,0.15)" />
          <text x="238" y="17.5" fill="#A78BFA" fontSize="7.5" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">
            Tracking Active
          </text>
        </g>
      </svg>
    </div>
  )
}

// Vector 2: Faster review responses (5-Star Review & Instant AI Draft)
export function ReviewResponseVector() {
  return (
    <div className="w-full h-44 relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#181a20] to-[#101216] border border-white/[0.08] p-3 group-hover:border-amber-500/30 transition-all duration-300">
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <svg
        viewBox="0 0 320 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[320px] select-none"
      >
        <defs>
          <pattern id="review-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="320" height="160" fill="url(#review-grid)" />

        {/* Top Card: Customer Review */}
        <g transform="translate(16, 10)">
          <rect width="288" height="56" rx="8" fill="#1B1E28" stroke="rgba(255,255,255,0.08)" />
          
          {/* Avatar */}
          <circle cx="18" cy="18" r="9" fill="#2E3547" />
          <text x="18" y="21.5" fill="#94A3B8" fontSize="9.5" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">M</text>
          
          <text x="34" y="16" fill="#FFFFFF" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif">Marcus Chen</text>
          <text x="34" y="25" fill="#64748B" fontSize="7.5" fontFamily="system-ui, sans-serif">Google Review • 12m ago</text>

          {/* 5 Stars */}
          <g transform="translate(222, 11)">
            {[0, 10, 20, 30, 40].map((offset, idx) => (
              <path
                key={idx}
                d={`M${offset + 4.5} 0L${offset + 5.8} 3.1H${offset + 9}L${offset + 6.5} 5.2L${offset + 7.4} 8.2L${offset + 4.5} 6.3L${offset + 1.6} 8.2L${offset + 2.5} 5.2L${offset} 3.1H${offset + 3.2}Z`}
                fill="#F59E0B"
              />
            ))}
          </g>

          {/* Review text with safe width & clear bounds */}
          <text x="14" y="43" fill="#CBD5E1" fontSize="8" fontStyle="italic" fontFamily="system-ui, sans-serif">
            &ldquo;Fast 2-minute reply &amp; booked our appointment right away!&rdquo;
          </text>
        </g>

        {/* Bottom Card: Nexus AI Response Draft */}
        <g transform="translate(16, 74)">
          <rect width="288" height="76" rx="8" fill="#141A24" stroke="rgba(16,185,129,0.3)" strokeWidth="1.2" />

          {/* Top Row: AI Badge on left */}
          <g transform="translate(12, 10)">
            <rect width="84" height="18" rx="4" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" />
            {/* Sparkle icon */}
            <path d="M10 4.5L11.2 7.8L14.5 9L11.2 10.2L10 13.5L8.8 10.2L5.5 9L8.8 7.8Z" fill="#10B981" />
            <text x="20" y="12.5" fill="#34D399" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">
              Nexus AI Draft
            </text>
          </g>

          {/* Top Row: Approve Button on right (Dedicated top-right position so it CANNOT collide with draft text) */}
          <g transform="translate(202, 8)">
            <rect width="74" height="22" rx="5" fill="#10B981" />
            <path d="M10 11L13 14L19 8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="42" y="14.5" fill="#FFFFFF" fontSize="8.5" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">
              Approve
            </text>
          </g>

          {/* Bottom Area: Full-width dedicated draft text with no horizontal collisions */}
          <text x="14" y="44" fill="#E2E8F0" fontSize="8" fontFamily="system-ui, sans-serif">
            &ldquo;Thank you Marcus! We take pride in fast responses
          </text>
          <text x="14" y="58" fill="#E2E8F0" fontSize="8" fontFamily="system-ui, sans-serif">
            and look forward to seeing you again!&rdquo;
          </text>
        </g>
      </svg>
    </div>
  )
}

// Vector 3: More consistent communication (Omnichannel Synchronized Replies)
export function OmnichannelSyncVector() {
  return (
    <div className="w-full h-44 relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#181a20] to-[#101216] border border-white/[0.08] p-3 group-hover:border-cyan-500/30 transition-all duration-300">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      <svg
        viewBox="0 0 320 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[320px] select-none"
      >
        <defs>
          <pattern id="omni-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="320" height="160" fill="url(#omni-grid)" />

        {/* Central Nexus Core Node */}
        <g transform="translate(160, 76)">
          <circle cx="0" cy="0" r="26" stroke="rgba(6,182,212,0.15)" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="0" cy="0" r="18" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" />
          <rect x="-9" y="-9" width="18" height="18" rx="4" fill="#0E7490" />
          <path d="M-4 -2L0 -6L4 -2L0 2Z" fill="#A5F3FC" />
          <path d="M-4 3L0 -1L4 3L0 7Z" fill="#22D3EE" opacity="0.8" />
        </g>

        {/* Connecting Beams */}
        <path d="M 52 42 Q 106 56 142 70" stroke="#10B981" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.7" />
        <path d="M 52 110 Q 106 96 142 82" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.7" />
        <path d="M 268 42 Q 214 56 178 70" stroke="#A855F7" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.7" />
        <path d="M 268 110 Q 214 96 178 82" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.7" />

        {/* Channel Node 1: WhatsApp (Top-Left) */}
        <g transform="translate(16, 24)">
          <rect width="88" height="34" rx="6" fill="#14211D" stroke="rgba(16,185,129,0.3)" />
          <circle cx="15" cy="17" r="7.5" fill="#059669" />
          <text x="15" y="20" fill="#FFFFFF" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif">W</text>
          <text x="28" y="15" fill="#FFFFFF" fontSize="8.5" fontWeight="600" fontFamily="system-ui, sans-serif">WhatsApp</text>
          <text x="28" y="25" fill="#34D399" fontSize="7" fontFamily="system-ui, sans-serif">Instant Reply</text>
        </g>

        {/* Channel Node 2: SMS / Text (Bottom-Left) */}
        <g transform="translate(16, 96)">
          <rect width="88" height="34" rx="6" fill="#131C28" stroke="rgba(56,189,248,0.3)" />
          <circle cx="15" cy="17" r="7.5" fill="#0284C7" />
          <text x="15" y="20" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif">SMS</text>
          <text x="28" y="15" fill="#FFFFFF" fontSize="8.5" fontWeight="600" fontFamily="system-ui, sans-serif">Text / SMS</text>
          <text x="28" y="25" fill="#38BDF8" fontSize="7" fontFamily="system-ui, sans-serif">Verified Voice</text>
        </g>

        {/* Channel Node 3: Slack / Team (Top-Right) */}
        <g transform="translate(216, 24)">
          <rect width="88" height="34" rx="6" fill="#201526" stroke="rgba(168,85,247,0.3)" />
          <circle cx="15" cy="17" r="7.5" fill="#7E22CE" />
          <text x="15" y="20" fill="#FFFFFF" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif">#</text>
          <text x="28" y="15" fill="#FFFFFF" fontSize="8.5" fontWeight="600" fontFamily="system-ui, sans-serif">Slack &amp; DMs</text>
          <text x="28" y="25" fill="#C084FC" fontSize="7" fontFamily="system-ui, sans-serif">Synced Triage</text>
        </g>

        {/* Channel Node 4: Email (Bottom-Right) */}
        <g transform="translate(216, 96)">
          <rect width="88" height="34" rx="6" fill="#241B14" stroke="rgba(245,158,11,0.3)" />
          <circle cx="15" cy="17" r="7.5" fill="#D97706" />
          <text x="15" y="20" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif">@</text>
          <text x="28" y="15" fill="#FFFFFF" fontSize="8.5" fontWeight="600" fontFamily="system-ui, sans-serif">Email Inbox</text>
          <text x="28" y="25" fill="#FBBF24" fontSize="7" fontFamily="system-ui, sans-serif">Auto-Triage</text>
        </g>

        {/* Synchronized Guarantee Badge */}
        <g transform="translate(96, 134)">
          <rect width="128" height="20" rx="10" fill="#18202A" stroke="rgba(255,255,255,0.12)" />
          <circle cx="14" cy="10" r="3.5" fill="#10B981" />
          <text x="68" y="13.5" fill="#E2E8F0" fontSize="7.5" fontWeight="500" textAnchor="middle" fontFamily="system-ui, sans-serif">
            100% Brand Consistent
          </text>
        </g>
      </svg>
    </div>
  )
}

// Vector 4: Ideas turned into assigned work (Midnight Voice/Idea to Kanban Task)
export function IdeaToTaskVector() {
  return (
    <div className="w-full h-44 relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#181a20] to-[#101216] border border-white/[0.08] p-3 group-hover:border-indigo-500/30 transition-all duration-300">
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <svg
        viewBox="0 0 320 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[320px] select-none"
      >
        <defs>
          <pattern id="idea-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="320" height="160" fill="url(#idea-grid)" />

        {/* Left Side: Midnight Idea / Voice Note (11:42 PM) */}
        <g transform="translate(16, 18)">
          <rect width="128" height="124" rx="8" fill="#161924" stroke="rgba(129,140,248,0.3)" />

          {/* Time & Moon Icon */}
          <g transform="translate(10, 8)">
            <circle cx="6" cy="6" r="6" fill="rgba(129,140,248,0.2)" />
            <path d="M8 3A4 4 0 0 0 4 8A4 4 0 0 0 8 10A3 3 0 0 1 8 3Z" fill="#818CF8" />
            <text x="16" y="9" fill="#A5B4FC" fontSize="8" fontFamily="monospace">11:42 PM</text>
          </g>

          <text x="10" y="32" fill="#FFFFFF" fontSize="8.5" fontWeight="600" fontFamily="system-ui, sans-serif">Voice Thought</text>

          {/* Voice Waveform Graphic */}
          <g transform="translate(10, 38)">
            <rect width="108" height="22" rx="4" fill="#1C2132" />
            <line x1="12" y1="11" x2="12" y2="11" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="7" x2="20" y2="15" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="4" x2="28" y2="18" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
            <line x1="36" y1="6" x2="36" y2="16" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
            <line x1="44" y1="9" x2="44" y2="13" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
            <line x1="52" y1="3" x2="52" y2="19" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
            <line x1="60" y1="5" x2="60" y2="17" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
            <line x1="68" y1="8" x2="68" y2="14" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
            <line x1="76" y1="10" x2="76" y2="12" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
            <line x1="84" y1="6" x2="84" y2="16" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
            <line x1="92" y1="9" x2="92" y2="13" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
          </g>

          <text x="10" y="74" fill="#CBD5E1" fontSize="7.5" fontStyle="italic" fontFamily="system-ui, sans-serif">
            &ldquo;Run a 15% VIP
          </text>
          <text x="10" y="86" fill="#CBD5E1" fontSize="7.5" fontStyle="italic" fontFamily="system-ui, sans-serif">
            special on Friday...&rdquo;
          </text>

          <rect x="10" y="96" width="108" height="18" rx="3" fill="rgba(129,140,248,0.12)" />
          <text x="64" y="108" fill="#A5B4FC" fontSize="7" fontWeight="500" textAnchor="middle" fontFamily="system-ui, sans-serif">
            Converting to Task...
          </text>
        </g>

        {/* Transition Arrow in Center */}
        <g transform="translate(148, 70)">
          <circle cx="12" cy="10" r="10" fill="#1E2333" stroke="rgba(255,255,255,0.1)" />
          <path d="M8 10H15M13 7L16 10L13 13" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Right Side: Structured Kanban Task */}
        <g transform="translate(176, 18)">
          <rect width="128" height="124" rx="8" fill="#131922" stroke="rgba(16,185,129,0.35)" />

          <rect x="10" y="8" width="56" height="14" rx="4" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.3)" />
          <text x="38" y="18" fill="#34D399" fontSize="7.5" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">
            High Priority
          </text>

          <text x="10" y="34" fill="#FFFFFF" fontSize="8.5" fontWeight="600" fontFamily="system-ui, sans-serif">VIP Promo Campaign</text>

          {/* Checklist Items */}
          <g transform="translate(10, 42)">
            <rect x="0" y="0" width="8" height="8" rx="2" fill="#10B981" />
            <path d="M2 4L3.5 5.5L6 2.5" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
            <text x="12" y="7" fill="#E2E8F0" fontSize="7" fontFamily="system-ui, sans-serif">Draft announcement</text>

            <rect x="0" y="14" width="8" height="8" rx="2" fill="#10B981" />
            <path d="M2 18L3.5 19.5L6 16.5" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
            <text x="12" y="21" fill="#E2E8F0" fontSize="7" fontFamily="system-ui, sans-serif">Filter VIP tags</text>

            <rect x="0" y="28" width="8" height="8" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" />
            <text x="12" y="35" fill="#94A3B8" fontSize="7" fontFamily="system-ui, sans-serif">Schedule for Friday</text>
          </g>

          {/* Assignee Footer */}
          <g transform="translate(10, 96)">
            <rect width="108" height="18" rx="4" fill="#1A2230" />
            <circle cx="10" cy="9" r="5" fill="#10B981" />
            <text x="10" y="11.5" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif">N</text>
            <text x="20" y="12.5" fill="#94A3B8" fontSize="7.5" fontFamily="system-ui, sans-serif">Assigned to: <tspan fill="#FFFFFF" fontWeight="600">Nexus</tspan></text>
          </g>
        </g>
      </svg>
    </div>
  )
}

// Vector 5: More visibility into completed work (Morning Executive Summary & Dashboard)
export function MorningBriefingVector() {
  return (
    <div className="w-full h-44 relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#181a20] to-[#101216] border border-white/[0.08] p-3 group-hover:border-emerald-500/30 transition-all duration-300">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <svg
        viewBox="0 0 320 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[320px] select-none"
      >
        <defs>
          <pattern id="briefing-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
          <linearGradient id="bar-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>

        <rect width="320" height="160" fill="url(#briefing-grid)" />

        {/* Top Header Card */}
        <g transform="translate(16, 10)">
          <rect width="288" height="28" rx="6" fill="#151922" stroke="rgba(255,255,255,0.08)" />
          
          {/* Sun / Morning Icon */}
          <circle cx="16" cy="14" r="5" fill="#F59E0B" />
          <path d="M16 5V7M16 21V23M7 14H9M23 14H25" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />

          <text x="30" y="14" fill="#FFFFFF" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif">
            Daily Morning Briefing
          </text>
          <text x="30" y="23" fill="#94A3B8" fontSize="7.5" fontFamily="system-ui, sans-serif">
            7:00 AM • Overnight Summary Delivered
          </text>

          <rect x="226" y="7" width="52" height="14" rx="4" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.3)" />
          <text x="252" y="17" fill="#34D399" fontSize="7.5" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">
            All Resolved
          </text>
        </g>

        {/* Activity Bar Chart / Sparkline */}
        <g transform="translate(16, 46)">
          <rect width="138" height="100" rx="6" fill="#131620" stroke="rgba(255,255,255,0.08)" />
          <text x="10" y="16" fill="#94A3B8" fontSize="7.5" fontWeight="500" fontFamily="system-ui, sans-serif">OVERNIGHT ACTIVITY</text>
          <text x="10" y="30" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">24 Events</text>

          {/* Mini Bar Chart */}
          <g transform="translate(10, 42)">
            <rect x="6" y="26" width="12" height="20" rx="2" fill="url(#bar-grad)" opacity="0.6" />
            <text x="12" y="54" fill="#64748B" fontSize="6.5" textAnchor="middle" fontFamily="system-ui, sans-serif">12 AM</text>

            <rect x="28" y="16" width="12" height="30" rx="2" fill="url(#bar-grad)" opacity="0.8" />
            <text x="34" y="54" fill="#64748B" fontSize="6.5" textAnchor="middle" fontFamily="system-ui, sans-serif">2 AM</text>

            <rect x="50" y="8" width="12" height="38" rx="2" fill="url(#bar-grad)" />
            <text x="56" y="54" fill="#64748B" fontSize="6.5" textAnchor="middle" fontFamily="system-ui, sans-serif">4 AM</text>

            <rect x="72" y="14" width="12" height="32" rx="2" fill="url(#bar-grad)" opacity="0.9" />
            <text x="78" y="54" fill="#64748B" fontSize="6.5" textAnchor="middle" fontFamily="system-ui, sans-serif">6 AM</text>

            <rect x="94" y="20" width="12" height="26" rx="2" fill="url(#bar-grad)" opacity="0.7" />
            <text x="100" y="54" fill="#64748B" fontSize="6.5" textAnchor="middle" fontFamily="system-ui, sans-serif">7 AM</text>
          </g>
        </g>

        {/* Metrics Grid Cards (Right Side) */}
        <g transform="translate(162, 46)">
          <rect width="142" height="30" rx="5" fill="#131620" stroke="rgba(255,255,255,0.08)" />
          <circle cx="14" cy="15" r="4" fill="#10B981" />
          <text x="26" y="14" fill="#E2E8F0" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">14 Inquiries Handled</text>
          <text x="26" y="23" fill="#34D399" fontSize="7" fontFamily="system-ui, sans-serif">Triaged &amp; Answered</text>

          <rect y="35" width="142" height="30" rx="5" fill="#131620" stroke="rgba(255,255,255,0.08)" />
          <circle cx="14" cy="50" r="4" fill="#3B82F6" />
          <text x="26" y="49" fill="#E2E8F0" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">4 New Quotes</text>
          <text x="26" y="58" fill="#60A5FA" fontSize="7" fontFamily="system-ui, sans-serif">Prepared for Review</text>

          <rect y="70" width="142" height="30" rx="5" fill="#131620" stroke="rgba(255,255,255,0.08)" />
          <circle cx="14" cy="85" r="4" fill="#F59E0B" />
          <text x="26" y="84" fill="#E2E8F0" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">0 Missed Leads</text>
          <text x="26" y="93" fill="#FBBF24" fontSize="7" fontFamily="system-ui, sans-serif">100% SLA Maintained</text>
        </g>
      </svg>
    </div>
  )
}

// Vector 6: Less administrative work at home (Reclaimed Evenings & Autopilot Shield)
export function EveningAutopilotVector() {
  return (
    <div className="w-full h-44 relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#181a20] to-[#101216] border border-white/[0.08] p-3 group-hover:border-violet-500/30 transition-all duration-300">
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <svg
        viewBox="0 0 320 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[320px] select-none"
      >
        <defs>
          <pattern id="home-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="320" height="160" fill="url(#home-grid)" />

        {/* Night Sky Stars Deco */}
        <circle cx="30" cy="20" r="1" fill="#FFFFFF" opacity="0.6" />
        <circle cx="80" cy="14" r="1.5" fill="#FFFFFF" opacity="0.4" />
        <circle cx="150" cy="22" r="1" fill="#FFFFFF" opacity="0.8" />
        <circle cx="280" cy="18" r="1.5" fill="#FFFFFF" opacity="0.5" />
        <circle cx="300" cy="36" r="1" fill="#FFFFFF" opacity="0.7" />

        {/* Main Autopilot Shield Card */}
        <g transform="translate(16, 10)">
          <rect width="288" height="74" rx="8" fill="#161824" stroke="rgba(139,92,246,0.3)" />

          {/* Autopilot Status Badge */}
          <g transform="translate(12, 12)">
            <path d="M12 4L4 8V14C4 19.5 7.4 24.6 12 26C16.6 24.6 20 19.5 20 14V8L12 4Z" fill="rgba(16,185,129,0.2)" stroke="#10B981" strokeWidth="1.5" />
            <path d="M9 14L11 16L15 12" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

            <text x="28" y="14" fill="#FFFFFF" fontSize="10" fontWeight="600" fontFamily="system-ui, sans-serif">
              Evening Autopilot Enabled
            </text>
            <text x="28" y="24" fill="#94A3B8" fontSize="7.5" fontFamily="system-ui, sans-serif">
              Handling customer triage, bookings &amp; reviews
            </text>
          </g>

          {/* Toggle Switch Vector (ON state) */}
          <g transform="translate(232, 14)">
            <rect width="42" height="22" rx="11" fill="#10B981" />
            <circle cx="30" cy="11" r="8" fill="#FFFFFF" />
          </g>

          {/* Off-hours protection bar */}
          <g transform="translate(12, 48)">
            <rect width="264" height="18" rx="4" fill="#1E2232" />
            <circle cx="10" cy="9" r="3" fill="#8B5CF6" />
            <text x="18" y="12" fill="#C4B5FD" fontSize="7.5" fontWeight="500" fontFamily="system-ui, sans-serif">
              Owner Mode: <tspan fill="#FFFFFF" fontWeight="600">Rest &amp; Family Time</tspan> (0 urgent alerts)
            </text>
          </g>
        </g>

        {/* Lower Row: Time Saved & Quiet Evenings Stat */}
        <g transform="translate(16, 92)">
          {/* Card Left: Reclaimed Hours */}
          <rect width="138" height="52" rx="6" fill="#12151E" stroke="rgba(255,255,255,0.08)" />
          <text x="12" y="18" fill="#94A3B8" fontSize="7.5" fontFamily="system-ui, sans-serif">HOURS RECLAIMED</text>
          <text x="12" y="38" fill="#34D399" fontSize="15" fontWeight="bold" fontFamily="system-ui, sans-serif">14.5 hrs</text>
          <text x="80" y="36" fill="#64748B" fontSize="7.5" fontFamily="system-ui, sans-serif">/ week</text>

          {/* Card Right: Unanswered at Midnight */}
          <rect x="150" y="0" width="138" height="52" rx="6" fill="#12151E" stroke="rgba(255,255,255,0.08)" />
          <text x="162" y="18" fill="#94A3B8" fontSize="7.5" fontFamily="system-ui, sans-serif">MIDNIGHT TASKS</text>
          <text x="162" y="38" fill="#FFFFFF" fontSize="15" fontWeight="bold" fontFamily="system-ui, sans-serif">0 pending</text>
          <circle cx="270" cy="26" r="5" fill="rgba(16,185,129,0.2)" />
          <circle cx="270" cy="26" r="2.5" fill="#10B981" />
        </g>
      </svg>
    </div>
  )
}

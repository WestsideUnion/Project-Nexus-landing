import React from "react"

// ─── 1. Nexus Cloud Emblem ───────────────────────────────────────────────────
// Meaning: Connected and simple. Cloud-native node network with cyan/emerald ambient glow.
export function NexusCloudEmblem({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cloud-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="cloud-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0891B2" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
        </defs>

        {/* Ambient background disc */}
        <circle cx="32" cy="32" r="28" fill="url(#cloud-glow)" />
        <circle cx="32" cy="32" r="28" stroke="rgba(6,182,212,0.2)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Orbiting Signal Dots */}
        <circle cx="16" cy="20" r="2" fill="#06B6D4">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="48" cy="22" r="2.5" fill="#10B981">
          <animate attributeName="opacity" values="1;0.4;1" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="32" cy="48" r="2" fill="#0EA5E9">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3.5s" repeatCount="indefinite" />
        </circle>

        {/* Connecting Lines */}
        <line x1="22" y1="34" x2="32" y2="24" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
        <line x1="32" y1="24" x2="42" y2="34" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
        <line x1="22" y1="34" x2="42" y2="34" stroke="rgba(13,148,136,0.3)" strokeWidth="1" />

        {/* Stylized Cloud Path */}
        <path
          d="M44 38H21C16.58 38 13 34.42 13 30C13 25.8 16.2 22.36 20.3 22.04C21.8 17.38 26.2 14 31.5 14C37.9 14 43.2 18.7 44.2 25C47.5 25.6 50 28.5 50 32C50 35.3 47.3 38 44 38Z"
          fill="#FFFFFF"
          fillOpacity="0.85"
          stroke="url(#cloud-stroke)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Center Nexus Node */}
        <circle cx="32" cy="28" r="3.5" fill="#0E7490" />
        <circle cx="32" cy="28" r="1.5" fill="#FFFFFF" />
      </svg>
    </div>
  )
}

// ─── 2. Nexus Edge Emblem ────────────────────────────────────────────────────
// Meaning: Private, local, and dependable. Dedicated physical appliance shield with on-site privacy lock.
export function NexusEdgeEmblem({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="edge-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="edge-shield" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>

        {/* Ambient background disc */}
        <circle cx="32" cy="32" r="28" fill="url(#edge-glow)" />
        <circle cx="32" cy="32" r="28" stroke="rgba(16,185,129,0.25)" strokeWidth="1" />

        {/* Hardware appliance perimeter chassis */}
        <rect
          x="18"
          y="18"
          width="28"
          height="28"
          rx="6"
          fill="#131922"
          stroke="url(#edge-shield)"
          strokeWidth="1.5"
        />

        {/* Status Activity LED */}
        <circle cx="24" cy="24" r="1.5" fill="#34D399">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="29" cy="24" r="1.5" fill="#38BDF8" />

        {/* On-Site Privacy Shield Vault */}
        <path
          d="M32 28L26 31V36C26 39.5 28.5 42.7 32 43.5C35.5 42.7 38 39.5 38 36V31L32 28Z"
          fill="#064E3B"
          stroke="#10B981"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Checkmark verification */}
        <path
          d="M30 35.5L31.5 37L34.5 34"
          stroke="#FFFFFF"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

// ─── 3. Nexus Custom Emblem ──────────────────────────────────────────────────
// Meaning: Flexible systems working together. Interconnected modular nodes with multi-location synchronization.
export function NexusCustomEmblem({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="custom-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="custom-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Ambient background disc */}
        <circle cx="32" cy="32" r="28" fill="url(#custom-glow)" />
        <circle cx="32" cy="32" r="28" stroke="rgba(139,92,246,0.2)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Connecting Tri-Mesh */}
        <path
          d="M32 18L44 38H20L32 18Z"
          stroke="url(#custom-stroke)"
          strokeWidth="1.2"
          strokeDasharray="2 2"
        />

        {/* Node 1: Top (Operations) */}
        <g transform="translate(32, 18)">
          <rect x="-7" y="-7" width="14" height="14" rx="3.5" fill="#201526" stroke="#8B5CF6" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="2" fill="#A78BFA" />
        </g>

        {/* Node 2: Bottom Right (Integrations) */}
        <g transform="translate(44, 38)">
          <rect x="-7" y="-7" width="14" height="14" rx="3.5" fill="#241B14" stroke="#F59E0B" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="2" fill="#FBBF24" />
        </g>

        {/* Node 3: Bottom Left (Multi-Location) */}
        <g transform="translate(20, 38)">
          <rect x="-7" y="-7" width="14" height="14" rx="3.5" fill="#131C28" stroke="#38BDF8" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="2" fill="#38BDF8" />
        </g>

        {/* Center Nexus Orchestrator */}
        <circle cx="32" cy="31" r="3.5" fill="#111827" stroke="#10B981" strokeWidth="1" />
        <circle cx="32" cy="31" r="1.5" fill="#34D399" />
      </svg>
    </div>
  )
}

import React from "react"

// ─── Nexus Official Vector Brand Logo ────────────────────────────────────────
export function NexusLogoMark({
  className = "w-8 h-8",
  inverted = false,
}: {
  className?: string
  inverted?: boolean
}) {
  return (
    <svg
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Nexus"
    >
      <rect
        width="180"
        height="180"
        rx="37"
        fill={inverted ? "#FFFFFF" : "#111111"}
      />
      <g style={{ transform: "scale(95%)", transformOrigin: "center" }}>
        <path
          fill={inverted ? "#111111" : "#FFFFFF"}
          d="M101.141 53H136.632C151.023 53 162.689 64.6662 162.689 79.0573V112.904H148.112V79.0573C148.112 78.7105 148.098 78.3662 148.072 78.0251L112.581 112.898C112.701 112.902 112.821 112.904 112.941 112.904H148.112V126.672H112.941C98.5504 126.672 86.5638 114.891 86.5638 100.5V66.7434H101.141V100.5C101.141 101.15 101.191 101.792 101.289 102.422L137.56 66.7816C137.255 66.7563 136.945 66.7434 136.632 66.7434H101.141V53Z"
        />
        <path
          fill={inverted ? "#111111" : "#FFFFFF"}
          d="M65.2926 124.136L14 66.7372H34.6355L64.7495 100.436V66.7372H80.1365V118.47C80.1365 126.278 70.4953 129.958 65.2926 124.136Z"
        />
      </g>
    </svg>
  )
}

// ─── Concept Icons ────────────────────────────────────────────────────────────

export function NexusTaskIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  )
}

export function NexusApprovalIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function NexusFollowUpIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.5" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
      <circle cx="18" cy="18" r="3" />
      <path d="m18 16.5 1 1.5" />
    </svg>
  )
}

export function NexusReviewIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export function NexusScheduleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

export function NexusSummaryIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="7" y1="8" x2="17" y2="8" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="7" y1="16" x2="13" y2="16" />
    </svg>
  )
}

export function NexusPrivacyIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="11" r="2" />
      <path d="M12 13v2" />
    </svg>
  )
}

export function NexusCloudIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  )
}

export function NexusOutcomeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  )
}

// ─── Official Third-Party Brand Marks ─────────────────────────────────────────

export function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="WhatsApp">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2Zm4.52 13.31c-.25.7-.99 1.28-1.74 1.44-.51.11-1.18.2-3.43-.73-2.87-1.19-4.73-4.13-4.87-4.32-.14-.19-1.17-1.55-1.17-2.96 0-1.41.74-2.1 1-2.39.26-.29.58-.36.77-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.25.6.85 2.08.93 2.23.07.15.12.33.02.53-.1.19-.15.31-.3.48-.15.17-.31.39-.45.52-.15.15-.31.31-.13.62.18.31.79 1.3 1.7 2.11 1.16 1.04 2.14 1.36 2.45 1.51.31.15.49.13.67-.08.18-.21.77-.9 1-.1.21.23.42.15.67.25.25.1 1.57.74 1.84.87.27.13.45.19.52.3.06.12.06.69-.19 1.39Z"
        fill="#25D366"
      />
    </svg>
  )
}

export function TelegramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Telegram">
      <circle cx="12" cy="12" r="11" fill="#2AABEE" />
      <path
        d="M5.6 11.95 17.5 7.35c.55-.22 1.04.12.86.85l-2.03 9.56c-.15.69-.56.86-1.14.53l-3.09-2.28-1.49 1.44c-.16.16-.3.3-.62.3l.22-3.12 5.68-5.13c.24-.22-.05-.34-.38-.12L8.5 13.8 5.48 12.87c-.66-.21-.67-.66.12-.92Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

export function SlackIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Slack">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52z" fill="#E01E5A" />
      <path d="M6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A" />
      <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834z" fill="#36C5F0" />
      <path d="M8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0" />
      <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834z" fill="#2EB67D" />
      <path d="M17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D" />
      <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52z" fill="#ECB22E" />
      <path d="M15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E" />
    </svg>
  )
}

export function TeamsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Microsoft Teams">
      <circle cx="16.5" cy="5.5" r="2.2" fill="#505AC9" />
      <path d="M14.5 9h4c1.1 0 2 .9 2 2v2.2c-.8-.4-1.8-.7-2.8-.7-.5 0-.9.05-1.4.15A3.6 3.6 0 0 0 13 9.8V9.3c.4-.2.9-.3 1.5-.3Z" fill="#505AC9" />
      <circle cx="9.5" cy="7" r="3" fill="#7B83EB" />
      <path d="M4 15.2C4 12.3 6.4 10 9.5 10s5.5 2.3 5.5 5.2V18c0 .6-.5 1.1-1.1 1.1H5.1C4.5 19.1 4 18.6 4 18v-2.8Z" fill="#7B83EB" />
      <rect x="1.5" y="8" width="10.5" height="10.5" rx="2" fill="#4B53BC" />
      <path d="M4 10.5h5.5v1.4H7.6V16H6.1v-4.1H4v-1.4Z" fill="#FFFFFF" />
    </svg>
  )
}

export function SignalIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Signal">
      <rect width="24" height="24" rx="6" fill="#3A76F0" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4C7.58 4 4 7.42 4 11.64c0 1.54.47 2.97 1.28 4.18L4.2 20l4.41-1.02c1.02.43 2.16.66 3.39.66 4.42 0 8-3.42 8-7.64S16.42 4 12 4Zm-4.9 10.95c-.32-.48-.52-1.04-.57-1.63a5.53 5.53 0 0 1-.03-.68c0-3.04 2.46-5.5 5.5-5.5s5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5c-.88 0-1.71-.21-2.45-.58l-2.45.89Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

export function AppleMessagesIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="iMessage">
      <rect width="24" height="24" rx="6" fill="#34C759" />
      <path
        d="M12 4.5C7.58 4.5 4 7.73 4 11.72c0 2.29 1.18 4.34 3.03 5.67-.13.88-.58 2.05-1.57 2.89 1.45.08 2.91-.46 3.93-1.25.82.26 1.7.4 2.61.4 4.42 0 8-3.23 8-7.22S16.42 4.5 12 4.5Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

export function WebChatIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Web Chat">
      <rect width="24" height="24" rx="6" fill="#0D9488" />
      <path
        d="M6 7.5a2.5 2.5 0 0 1 2.5-2.5h7A2.5 2.5 0 0 1 18 7.5v5a2.5 2.5 0 0 1-2.5 2.5h-4.3L8 17.5v-2.5H8.5A2.5 2.5 0 0 1 6 12.5v-5Z"
        fill="#FFFFFF"
      />
      <circle cx="9.5" cy="10" r="1" fill="#0D9488" />
      <circle cx="12" cy="10" r="1" fill="#0D9488" />
      <circle cx="14.5" cy="10" r="1" fill="#0D9488" />
    </svg>
  )
}

export function OtherChannelsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Other Channels">
      <rect width="24" height="24" rx="6" fill="#475569" />
      <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
      <circle cx="6" cy="12" r="1.5" fill="#FFFFFF" fillOpacity="0.85" />
      <circle cx="18" cy="12" r="1.5" fill="#FFFFFF" fillOpacity="0.85" />
      <circle cx="12" cy="6" r="1.5" fill="#FFFFFF" fillOpacity="0.85" />
      <circle cx="12" cy="18" r="1.5" fill="#FFFFFF" fillOpacity="0.85" />
      <path d="M7.5 12h1.5M15 12h1.5M12 7.5v1.5M12 15v1.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function GoogleBusinessIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Google Business">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
    </svg>
  )
}

export function SquarePosIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Square">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#111111" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="2.5" fill="#FFFFFF" />
      <rect x="8.5" y="8.5" width="7" height="7" rx="1.2" fill="#111111" />
    </svg>
  )
}

export function CloverPosIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Clover">
      <circle cx="8" cy="8" r="4.2" fill="#23B14D" />
      <circle cx="16" cy="8" r="4.2" fill="#23B14D" />
      <circle cx="8" cy="16" r="4.2" fill="#23B14D" />
      <circle cx="16" cy="16" r="4.2" fill="#23B14D" />
    </svg>
  )
}

export function CrmPlatformIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="CRM Platforms">
      <path
        d="M18.8 7.2a2.8 2.8 0 0 0-2.6-1.76c-.5 0-.96.14-1.37.38V3.34a1.67 1.67 0 1 0-3.34 0v2.48a2.81 2.81 0 0 0-1.37-.38A2.8 2.8 0 0 0 7.32 8.24l-3.23 2.1a1.67 1.67 0 1 0 .93 1.42c0-.3-.08-.58-.22-.82l3.22-2.1c.4.24.87.38 1.38.38a2.8 2.8 0 0 0 2.8-2.8c0-.36-.07-.7-.2-.99l2.87 2.87c-.03.12-.07.24-.07.37a2.8 2.8 0 1 0 3.87-2.67Zm-2.8 11.2a1.67 1.67 0 1 1 0-3.34 1.67 1.67 0 0 1 0 3.34Z"
        fill="#FF7A59"
      />
    </svg>
  )
}

export function InventorySystemIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Inventory Systems">
      <rect width="24" height="24" rx="6" fill="#6366F1" />
      <path d="M12 5.5 6 9l6 3.5 6-3.5-6-3.5Z" fill="#FFFFFF" />
      <path d="M6 10.5V15l6 3.5v-4.5L6 10.5Z" fill="#FFFFFF" fillOpacity="0.75" />
      <path d="M18 10.5V15l-6 3.5v-4.5l6-3.5Z" fill="#FFFFFF" fillOpacity="0.9" />
    </svg>
  )
}

export function AccountingSystemIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Accounting Systems">
      <circle cx="12" cy="12" r="11" fill="#2CA01C" />
      <path
        d="M10.8 7H9.2C6.88 7 5 8.88 5 11.2c0 2.32 1.88 4.2 4.2 4.2h1.6V14H9.2c-1.55 0-2.8-1.25-2.8-2.8 0-1.55 1.25-2.8 2.8-2.8h1.6V7Zm2.4 10h1.6c2.32 0 4.2-1.88 4.2-4.2 0-2.32-1.88-4.2-4.2-4.2h-1.6V10h1.6c1.55 0 2.8 1.25 2.8 2.8 0 1.55-1.25 2.8-2.8 2.8h-1.6V17Z"
        fill="#FFFFFF"
      />
      <rect x="10.8" y="7" width="1.4" height="10" fill="#FFFFFF" />
      <rect x="11.8" y="7" width="1.4" height="10" fill="#FFFFFF" />
    </svg>
  )
}

export function CustomApiIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Custom Connections & APIs">
      <rect width="24" height="24" rx="6" fill="#0F172A" />
      <path
        d="m8.5 9-3 3 3 3m7-6 3 3-3 3M13 7.5l-2 9"
        stroke="#38BDF8"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function EmailChannelIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Email">
      <rect width="24" height="24" rx="6" fill="#EA4335" />
      <path d="M4.5 7.5h15c.55 0 1 .45 1 1v9c0 .55-.45 1-1 1h-15c-.55 0-1-.45-1-1v-9c0-.55.45-1 1-1Z" fill="#FFFFFF" />
      <path d="m4.5 8.5 7.5 5.5 7.5-5.5" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SmsChannelIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="SMS / Text">
      <rect width="24" height="24" rx="6" fill="#007AFF" />
      <path
        d="M6 11.5C6 8.46 8.69 6 12 6s6 2.46 6 5.5c0 3.04-2.69 5.5-6 5.5-1.02 0-1.98-.24-2.82-.67L6 17.5l.62-2.31C6.23 14.15 6 12.87 6 11.5Z"
        fill="#FFFFFF"
      />
      <circle cx="9.5" cy="11.5" r="1" fill="#007AFF" />
      <circle cx="12" cy="11.5" r="1" fill="#007AFF" />
      <circle cx="14.5" cy="11.5" r="1" fill="#007AFF" />
    </svg>
  )
}

export function BookingChannelIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Booking Platforms">
      <rect width="24" height="24" rx="6" fill="#006BFF" />
      <path
        d="M12 6.5a5.5 5.5 0 1 0 3.89 9.39l-1.42-1.42A3.5 3.5 0 1 1 12 8.5c.97 0 1.84.39 2.47 1.03l1.42-1.42A5.47 5.47 0 0 0 12 6.5Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

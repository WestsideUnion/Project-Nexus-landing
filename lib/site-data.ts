// ─── Single Source of Truth for Nexus Marketing Site ─────────────────

export interface PlanFeature {
  text: string
  highlight?: boolean
}

export interface PlanData {
  id: "cloud" | "edge" | "custom"
  name: string
  monthlyCad: number
  annualMonthlyCad: number
  onboardingFeeCad: number
  commitmentMonths: number
  priceDisplay: string
  priceSubtext: string
  onboardingLabel: string
  tagline: string
  description: string
  compactBullets: string[]
  fullFeatures: PlanFeature[]
  note?: string
  ctaText: string
  ctaHref: string
}

export const PACKAGES: Record<"cloud" | "edge" | "custom", PlanData> = {
  cloud: {
    id: "cloud",
    name: "Nexus Cloud",
    monthlyCad: 99,
    annualMonthlyCad: 79,
    onboardingFeeCad: 299,
    commitmentMonths: 1,
    priceDisplay: "CAD $99",
    priceSubtext: "/month",
    onboardingLabel: "CAD $299 initial setup",
    tagline: "Start with one important job that keeps stealing your time.",
    description:
      "Start with one important job that keeps stealing your time.",
    compactBullets: [
      "One primary messaging channel",
      "One starting business workflow",
      "Task tracking and owner summaries",
      "Monthly Nexus AI Credits included",
    ],
    fullFeatures: [
      { text: "One primary messaging channel" },
      { text: "One starting business workflow" },
      { text: "Business information and preferences prepared for Nexus" },
      { text: "Task tracking and owner summaries" },
      { text: "Monthly Nexus AI Credits included" },
      { text: "Monitoring and managed updates" },
    ],
    note: "Monthly Nexus AI Credits are included with your plan. Additional credits are available when needed. Nexus alerts you before your included usage runs low.",
    ctaText: "Start with Nexus Cloud",
    ctaHref: "#contact",
  },
  edge: {
    id: "edge",
    name: "Nexus Edge",
    monthlyCad: 499,
    annualMonthlyCad: 499,
    onboardingFeeCad: 1499,
    commitmentMonths: 36,
    priceDisplay: "From CAD $499",
    priceSubtext: "/month · 36-month initial term",
    onboardingLabel: "CAD $1,499 activation and deployment · 36-month initial term",
    tagline: "Keep more of your business knowledge and everyday work on a dedicated system at your location.",
    description:
      "Keep more of your business knowledge and everyday work on a dedicated system at your location.",
    compactBullets: [
      "Dedicated Nexus Edge appliance",
      "Private business knowledge",
      "Local AI processing with monthly Nexus AI Credits for supported cloud work",
      "Hardware maintenance and replacement coverage",
    ],
    fullFeatures: [
      { text: "Dedicated Nexus Edge appliance", highlight: true },
      { text: "Private business knowledge", highlight: true },
      { text: "Local AI processing with monthly Nexus AI Credits for supported cloud work", highlight: true },
      { text: "Approved cloud assistance when needed" },
      { text: "Remote monitoring and managed updates" },
      { text: "Hardware maintenance and replacement coverage" },
    ],
    note: "A 24-month option is available at CAD $599/month. The Nexus Edge appliance is provided and maintained by Westside Union and remains Westside Union property.",
    ctaText: "Explore Nexus Edge",
    ctaHref: "/nexus-edge",
  },
  custom: {
    id: "custom",
    name: "Nexus Enterprise",
    monthlyCad: 1499,
    annualMonthlyCad: 1499,
    onboardingFeeCad: 7500,
    commitmentMonths: 12,
    priceDisplay: "From CAD $1,499",
    priceSubtext: "/month",
    onboardingLabel: "Deployment from CAD $7,500",
    tagline: "For firms, corporations, chains, and organizations coordinating more locations, teams, and business systems.",
    description:
      "For firms, corporations, chains, and organizations coordinating more locations, teams, and business systems.",
    compactBullets: [
      "Multiple locations, teams, or departments",
      "Coordinated business assistants and workflows",
      "Custom AI capacity based on your organization’s needs",
      "Dedicated service and support plan",
    ],
    fullFeatures: [
      { text: "Multiple locations, teams, or departments" },
      { text: "Coordinated business assistants and workflows" },
      { text: "Custom AI capacity based on your organization’s needs" },
      { text: "Advanced permissions and approval controls" },
      { text: "Custom reporting and system connections" },
      { text: "Private or customer-owned infrastructure options" },
      { text: "Dedicated service and support plan" },
    ],
    note: "Final pricing is confirmed after operational and infrastructure assessment.",
    ctaText: "Plan an Enterprise Solution",
    ctaHref: "#contact",
  },
}

// ─── 30-Day Nexus Cloud Pilot Terms ──────────────────────────────────────────
export const PILOT_TERMS = {
  name: "30-Day Nexus Cloud Pilot",
  onboardingFeeCad: 299,
  includedSubscriptionValueCad: 99,
  headline: "See what Nexus can take off your plate in 30 days.",
  subheadline:
    "Experience a managed business assistant built around your actual routines. Your first 30 days of the CAD $99 Cloud subscription and monthly Nexus AI Credits are included with onboarding.",
  clarification:
    "Your first 30 days of managed service are included. CAD $299 onboarding applies.",
  inclusions: [
    { title: "One business assistant", desc: "One location, one business, and one primary owner account." },
    { title: "One messaging channel", desc: "WhatsApp, SMS/Text, Telegram, or email." },
    { title: "One primary workflow", desc: "Configured around your highest-priority administrative bottleneck." },
    { title: "One standard business connection", desc: "Supported calendar, booking, or messaging connection." },
    { title: "Monthly Nexus AI Credits", desc: "Included managed AI capacity with zero automatic overages." },
    { title: "No automatic subscription charge", desc: "Evaluate real outcomes before committing to your ongoing plan." },
  ],
  endOfPilotChoices: [
    "Continue Nexus Cloud at CAD $99/month (or CAD $79/mo billed annually)",
    "Connect a supported customer-owned AI provider account",
    "Upgrade to Nexus Edge with your CAD $299 onboarding payment credited toward activation",
    "End the pilot with no further subscription charge",
  ],
  disclosure:
    "CAD $299 onboarding applies. The first 30 days of the Cloud subscription and included Nexus AI Credits are covered. Third-party services and optional add-ons are separate. The 30 days begin on the confirmed go-live date, not the signing date.",
}

// ─── Nexus Edge Agreement Calculations ───────────────────────────────────────
export const EDGE_AGREEMENT = {
  monthlyFeeCad: 499,
  activationFeeCad: 1499,
  termMonths: 36,
  monthlyFee24Cad: 599,
  term24Months: 24,
  get totalCommitmentCad(): number {
    return this.activationFeeCad + this.monthlyFeeCad * this.termMonths // 1499 + (499 * 36) = 19,463
  },
  propertyNotice: "The Nexus Edge appliance is provided and maintained by Westside Union and remains Westside Union property.",
  cloudFallbackNote: "Monthly Nexus AI Credits are included for supported cloud work, complex queries or burst operations when needed.",
  cloudToEdgeCreditText:
    "Upgrade from Nexus Cloud to Nexus Edge within six months and receive the CAD $299 Cloud onboarding payment as a credit toward Edge activation, subject to an Edge assessment.",
}

// ─── Managed AI Usage & Safeguards ───────────────────────────────────────────
export const AI_USAGE_RULES = {
  headline: "Monthly Nexus AI Credits included with every package.",
  subheadline: "Additional credits are available when needed. Nexus alerts you before your included usage runs low.",
  resetPeriod: "Monthly reset · Unused credits do not roll over",
  rules: [
    {
      title: "Monthly Reset",
      desc: "Included credits reset every month. Unused credits do not roll over.",
    },
    {
      title: "70% Alert",
      desc: "Receive a proactive message notification when 70% of monthly credits are consumed.",
    },
    {
      title: "90% Warning",
      desc: "Receive a clear warning at 90% usage so you can plan ahead with no surprises.",
    },
    {
      title: "100% Safety Pause",
      desc: "New AI-powered work pauses automatically at 100% to prevent unexpected charges.",
    },
    {
      title: "Zero Automatic Overage",
      desc: "Nexus never charges surprise fees or automatic overages.",
    },
    {
      title: "Activity History Active",
      desc: "Non-AI tasks, summaries, past conversations, and activity records stay accessible.",
    },
  ],
  usagePacks: [
    {
      priceCad: 15,
      label: "Nexus AI Credits — Starter Pack",
      priceDisplay: "CAD $15",
      desc: "Ideal for short busy periods or promotions",
    },
    {
      priceCad: 35,
      label: "Nexus AI Credits — Growth Pack",
      priceDisplay: "CAD $35",
      desc: "Popular for seasonal campaigns and events",
    },
    {
      priceCad: 65,
      label: "Nexus AI Credits — Expansion Pack",
      priceDisplay: "CAD $65",
      desc: "For high-volume customer communications",
    },
  ],
  customerOwnedProviderInfo: {
    title: "Prefer to use your own AI provider?",
    description:
      "No provider account is needed to begin. If preferred, customers may connect a supported provider account (e.g. OpenAI, Anthropic, Google Cloud) and pay that provider directly. Nexus continues managing the business assistant, business knowledge, approval rules, and activity logs. Note that consumer ChatGPT, Gemini, or Grok subscriptions normally do not provide the required business connection. Westside Union helps with supported setup during onboarding.",
  },
}

// ─── Add-on Catalogue ────────────────────────────────────────────────────────
export interface AddOnItem {
  name: string
  price: string
  type: "setup + monthly" | "monthly" | "one-time" | "variable"
  desc?: string
}

export interface AddOnCategory {
  category: string
  description: string
  items: AddOnItem[]
}

export const ADD_ON_CATEGORIES: AddOnCategory[] = [
  {
    category: "Business Connections",
    description: "Connect supported booking, customer, sales, inventory, accounting, or operational tools.",
    items: [
      {
        name: "Standard business connection",
        price: "CAD $99 setup + CAD $19/month",
        type: "setup + monthly",
        desc: "Supported calendar, booking platform, or notification tool",
      },
      {
        name: "Advanced business connection",
        price: "CAD $299 setup + CAD $49/month",
        type: "setup + monthly",
        desc: "POS, CRM, or inventory management system",
      },
      {
        name: "Custom business connection",
        price: "From CAD $1,500 setup + from CAD $99/mo maint.",
        type: "setup + monthly",
        desc: "Proprietary database, legacy software, or webhook sync",
      },
    ],
  },
  {
    category: "Communication Channels",
    description: "Expand where you and your customers can reach your assistant.",
    items: [
      {
        name: "Additional messaging channel",
        price: "CAD $49 setup + CAD $19/month",
        type: "setup + monthly",
        desc: "WhatsApp, Telegram, SMS/Text, Email, Slack, or Web Chat",
      },
      {
        name: "Voice assistant setup",
        price: "From CAD $99/month + telephony usage",
        type: "monthly",
        desc: "Interactive inbound call handling and triage",
      },
      {
        name: "SMS & WhatsApp provider usage",
        price: "Pass-through carrier / provider rates",
        type: "variable",
        desc: "Direct carrier transmission fees where applicable",
      },
    ],
  },
  {
    category: "Business Expansion",
    description: "Scale Nexus across additional locations, assistants, and custom routines.",
    items: [
      {
        name: "Additional business location",
        price: "CAD $99 setup + CAD $49/month",
        type: "setup + monthly",
        desc: "Separate operating hours, address, and localized knowledge",
      },
      {
        name: "Specialized assistant",
        price: "From CAD $79/month",
        type: "monthly",
        desc: "Dedicated internal-only assistant for staff coordination",
      },
      {
        name: "Custom workflow build",
        price: "CAD $350–$1,500 one-time",
        type: "one-time",
        desc: "Multi-step automated sequence tailored to your operations",
      },
    ],
  },
  {
    category: "AI Usage Packs",
    description: "Prepaid bundles to expand monthly AI capacity on demand with zero overage risk.",
    items: [
      {
        name: "Nexus AI Credit Pack (Starter)",
        price: "CAD $15 one-time",
        type: "one-time",
        desc: "Prepaid capacity buffer for short busy periods",
      },
      {
        name: "Nexus AI Credit Pack (Growth)",
        price: "CAD $35 one-time",
        type: "one-time",
        desc: "Prepaid capacity buffer for seasonal promotions",
      },
      {
        name: "Nexus AI Credit Pack (Expansion)",
        price: "CAD $65 one-time",
        type: "one-time",
        desc: "Prepaid capacity buffer for high-volume customer months",
      },
    ],
  },
]

// ─── Connection Availability Catalogue ───────────────────────────────────────
export type ConnectionStatus =
  | "available"
  | "supported"
  | "configured"
  | "custom"
  | "planned"
  | "preview"

export interface ConnectionItem {
  name: string
  category: "messaging" | "business_tools"
  status: ConnectionStatus
  desc: string
  iconType: string
}

export const CONNECTIONS_DATA: ConnectionItem[] = [
  // Messaging
  {
    name: "WhatsApp",
    category: "messaging",
    status: "available",
    desc: "Direct owner & customer messaging via official business connection",
    iconType: "whatsapp",
  },
  {
    name: "Telegram",
    category: "messaging",
    status: "available",
    desc: "Real-time updates, bot commands, and staff alerts",
    iconType: "telegram",
  },
  {
    name: "Email",
    category: "messaging",
    status: "available",
    desc: "Inbox organization, customer inquiry triage, and draft replies",
    iconType: "email",
  },
  {
    name: "SMS / Text",
    category: "messaging",
    status: "available",
    desc: "Direct SMS notifications and customer text reminders",
    iconType: "sms",
  },
  {
    name: "Slack",
    category: "messaging",
    status: "available",
    desc: "Workspace channels, DMs, team alerts, and daily summaries",
    iconType: "slack",
  },
  {
    name: "Microsoft Teams",
    category: "messaging",
    status: "supported",
    desc: "Workplace channels and organization chat with assisted configuration",
    iconType: "teams",
  },
  {
    name: "Web Chat",
    category: "messaging",
    status: "supported",
    desc: "Embedded live chat widget on your business website",
    iconType: "webchat",
  },
  {
    name: "Signal",
    category: "messaging",
    status: "supported",
    desc: "Encrypted messaging with supported setup",
    iconType: "signal",
  },
  {
    name: "iMessage",
    category: "messaging",
    status: "supported",
    desc: "Apple ecosystem chat with supported configuration",
    iconType: "imessage",
  },
  {
    name: "Other supported channels",
    category: "messaging",
    status: "configured",
    desc: "Additional communication channels evaluated during onboarding",
    iconType: "other_channel",
  },

  // Business Tools
  {
    name: "Booking Platforms",
    category: "business_tools",
    status: "supported",
    desc: "Appointment scheduling handoff (Calendly, Acuity, Fresha, Mindbody)",
    iconType: "calendar",
  },
  {
    name: "POS Systems",
    category: "business_tools",
    status: "supported",
    desc: "Sales reporting, item lookups, and inventory knowledge (Square, Clover, Toast, Lightspeed)",
    iconType: "pos",
  },
  {
    name: "Google Business Profile",
    category: "business_tools",
    status: "planned",
    desc: "Review monitoring, response drafting, and business hours sync",
    iconType: "google",
  },
  {
    name: "CRM Platforms",
    category: "business_tools",
    status: "configured",
    desc: "Customer records, lead tracking, and deal follow-ups (HubSpot, Salesforce, Pipedrive)",
    iconType: "crm",
  },
  {
    name: "Inventory Systems",
    category: "business_tools",
    status: "configured",
    desc: "Stock availability checks and low-inventory owner alerts",
    iconType: "inventory",
  },
  {
    name: "Accounting Systems",
    category: "business_tools",
    status: "configured",
    desc: "Invoice status checks and payment receipt tracking (QuickBooks, Xero, Wave)",
    iconType: "accounting",
  },
  {
    name: "Custom Business Connections",
    category: "business_tools",
    status: "custom",
    desc: "Tailored connections, custom APIs, webhooks, and proprietary software logic",
    iconType: "custom_api",
  },
]

// ─── Toronto Wage Benchmarks & ROI Data ──────────────────────────────────────
export const WAGE_TABLE = [
  {
    work: "Routine questions and booking handoff",
    benchmark: "Receptionist — CAD $20.00/hr",
    hours: "20",
    value: "CAD $400",
    help: "Answers approved FAQs and routes requests",
    total: false,
  },
  {
    work: "Follow-ups, reminders, and coordination",
    benchmark: "Administrative — CAD $26.50/hr",
    hours: "20",
    value: "CAD $530",
    help: "Tracks work and reports unfinished items",
    total: false,
  },
  {
    work: "Weekly summaries and basic reporting",
    benchmark: "Administrative — CAD $26.50/hr",
    hours: "12",
    value: "CAD $318",
    help: "Prepares recurring summaries",
    total: false,
  },
  {
    work: "Review responses and promotional drafts",
    benchmark: "Social media — CAD $37.50/hr",
    hours: "8",
    value: "CAD $300",
    help: "Drafts content for owner approval",
    total: false,
  },
  {
    work: "Checklists and owner notifications",
    benchmark: "Administrative — CAD $26.50/hr",
    hours: "8",
    value: "CAD $212",
    help: "Runs scheduled checks and alerts",
    total: false,
  },
  {
    work: "Illustrative total",
    benchmark: "Job Bank Canada (median Toronto, 2026)",
    hours: "68",
    value: "CAD $1,760/mo",
    help: "Approved routines can operate concurrently",
    total: true,
  },
]

export const HOURLY_RATES: Record<string, number> = {
  receptionist: 20.0,
  administrative: 26.5,
  marketing: 37.5,
}

// ─── Consultation Form Standard Package Choices ──────────────────────────────
export const CONSULTATION_PACKAGE_OPTIONS = [
  "Nexus Cloud — CAD $99/month",
  "Nexus Cloud 30-Day Pilot",
  "Nexus Edge — From CAD $499/month, 36-month term",
  "Nexus Edge — CAD $599/month, 24-month term",
  "Nexus Enterprise — From CAD $1,499/month",
  "Start Your Business — Canada",
  "Not sure yet",
] as const

// ─── Full Categorized FAQ Data ───────────────────────────────────────────────
export interface FaqItemData {
  id: string
  question: string
  answer: string
  category:
    | "Getting Started"
    | "AI Systems & Architecture"
    | "Packages and Pricing"
    | "AI Usage"
    | "Privacy and Control"
    | "Nexus Edge"
    | "Nexus Sense & Hardware"
    | "Connections and Add-ons"
    | "Dashboard and Future Features"
    | "Start Your Business — Canada"
  isHomepageTop3?: boolean
}

export const FAQ_CATEGORIES = [
  "Getting Started",
  "AI Systems & Architecture",
  "Packages and Pricing",
  "AI Usage",
  "Privacy and Control",
  "Nexus Edge",
  "Nexus Sense & Hardware",
  "Connections and Add-ons",
  "Dashboard and Future Features",
  "Start Your Business — Canada",
] as const

// ─── Top 3 Homepage Preview FAQs ──────────────────────────────────────────────
export const HOMEPAGE_FAQS: FaqItemData[] = [
  {
    id: "different-from-other-agents",
    category: "AI Systems & Architecture",
    isHomepageTop3: true,
    question: "What makes Nexus different from other AI agents?",
    answer:
      "Nexus is a managed business platform—not simply another AI agent. Westside Union connects it to your approved business tools, workflows and optional devices while maintaining one business identity, shared company knowledge, permissions and visible task history.",
  },
  {
    id: "manage-social-media",
    category: "Connections and Add-ons",
    isHomepageTop3: true,
    question: "Can Nexus help manage our social media?",
    answer:
      "Yes. Nexus can help plan content, write captions, create graphics and short animated videos, and schedule approved posts through supported social accounts. Public content waits for your approval by default.",
  },
  {
    id: "what-are-nexus-ai-credits",
    category: "AI Usage",
    isHomepageTop3: true,
    question: "What are Nexus AI Credits?",
    answer:
      "Nexus AI Credits cover the AI work performed by your assistant. You see one simple monthly balance instead of tokens, model names or individual API charges. Nexus notifies you before your included credits run low.",
  },
]

export const ALL_FAQS: FaqItemData[] = [
  // 1. AI Systems & Architecture (StoryBrand & Competitive Positioning)
  {
    id: "different-from-openclaw-hermes-claude",
    category: "AI Systems & Architecture",
    isHomepageTop3: true,
    question: "What makes Nexus different from OpenClaw, Hermes Agent, Claude Cowork or other AI agent systems?",
    answer:
      "OpenClaw, Hermes Agent and Claude Cowork are powerful systems that can help an AI perform work. Nexus is the managed business platform that brings the pieces together around your company.\n\nWestside Union connects Nexus to your messaging channels, business software, approved workflows and optional on-site devices. Nexus maintains one consistent business identity, shared company knowledge, permissions, task history and approval process—even when different AI systems are used behind the scenes.\n\nYou do not need to choose, configure or maintain those systems yourself. You talk to one Nexus assistant, and Westside Union manages the technology supporting it.\n\nOther systems give an AI the ability to work. Nexus turns that ability into a managed system built around your business.",
  },
  {
    id: "does-nexus-replace-underlying-agents",
    category: "AI Systems & Architecture",
    question: "Does Nexus replace OpenClaw, Hermes Agent or Claude Cowork?",
    answer:
      "Not necessarily. Nexus may use one appropriate system, multiple systems or a future Nexus runtime depending on your business, privacy requirements and package.\n\nThe technology behind Nexus can change without requiring you to rebuild your business assistant or start its company knowledge over again.",
  },
  {
    id: "why-not-install-agent-myself",
    category: "AI Systems & Architecture",
    question: "Why not install an AI agent myself?",
    answer:
      "A self-installed AI agent gives you software. Nexus gives you a managed business service.\n\nWestside Union configures the assistant around your company, connects approved tools, controls what it may do, monitors its work, maintains the system and helps improve it over time.",
  },
  {
    id: "speak-to-one-assistant",
    category: "AI Systems & Architecture",
    question: "Will I still speak to one assistant if Nexus uses multiple AI systems?",
    answer:
      "Yes. Nexus maintains one business identity and shared company knowledge across supported systems.\n\nWhether work is completed by one agent or another behind the scenes, you continue speaking to the same Nexus assistant.",
  },
  {
    id: "underlying-technology-changes",
    category: "AI Systems & Architecture",
    question: "What happens if the AI technology behind Nexus changes?",
    answer:
      "Nexus is designed so that its underlying AI technology can be maintained or replaced without changing the customer-facing Nexus identity.\n\nThe goal is to preserve the business’s approved knowledge, preferences, workflows and history while Westside Union manages changes behind the scenes.",
  },

  // 2. Getting Started
  {
    id: "what-is-project-nexus",
    category: "Getting Started",
    question: "What is Nexus?",
    answer:
      "Nexus is a managed AI assistant for your business, built and operated by Westside Union. It organizes your follow-ups, reviews, customer inquiries, and routine tasks through the messaging tools you already use, keeping work moving forward with owner approval rules and clear summaries.",
  },
  {
    id: "does-nexus-replace-staff",
    category: "Getting Started",
    question: "Does Nexus replace my staff?",
    answer:
      "No. Nexus is designed to support you and your existing team, not replace employees. It absorbs repetitive coordination, draft preparation, reminder tracking, and after-hours triage so you and your team can focus on serving customers, doing skilled work, and running the business.",
  },
  {
    id: "how-do-i-communicate-with-nexus",
    category: "Getting Started",
    question: "How do I communicate with Nexus?",
    answer:
      "You and your team communicate with Nexus through familiar messaging channels like WhatsApp, SMS/text, Telegram, or email. There is no complicated new software to train your team on—you message Nexus just like you would a trusted assistant.",
  },
  {
    id: "need-technical-knowledge-full",
    category: "Getting Started",
    isHomepageTop3: true,
    question: "Do I need technical knowledge to use Nexus?",
    answer:
      "No. You and your team communicate with Nexus through everyday messaging apps like WhatsApp, SMS, or Telegram just like messaging a team member. Westside Union handles the technical setup, integrations, security, and ongoing maintenance with you.",
  },
  {
    id: "who-manages-technical-setup",
    category: "Getting Started",
    question: "Who manages the technical setup and updates?",
    answer:
      "Westside Union handles all business knowledge setup, channel configuration, connector health, security monitoring, and platform updates so you never have to deal with technical complexity.",
  },

  // 3. Nexus Sense & Hardware
  {
    id: "what-are-nexus-sense-addons",
    category: "Nexus Sense & Hardware",
    question: "What are Nexus Sense add-ons?",
    answer:
      "Nexus Sense add-ons are optional on-site devices that help Nexus recognize useful conditions inside your physical business—for example occupancy, temperature, water leaks, equipment status or after-hours activity.\n\nWhen something requires attention, Nexus can notify you, create a task or begin an approved workflow.",
  },
  {
    id: "do-i-need-sensors-or-hardware",
    category: "Nexus Sense & Hardware",
    isHomepageTop3: true,
    question: "Do I need sensors or special hardware?",
    answer:
      "No. Nexus can work with your existing messaging channels and business software without physical sensors.\n\nNexus Sense devices are optional and are recommended only when they solve a clear operational problem.",
  },
  {
    id: "do-sensors-record-customers",
    category: "Nexus Sense & Hardware",
    question: "Do Nexus Sense devices record customers?",
    answer:
      "It depends on the selected device, but Westside Union will clearly explain what every device detects, processes and stores before installation.\n\nWhenever practical, Nexus will favour minimal data collection and local processing. No device should be activated without documented business approval and any notice or consent required for the intended use.",
  },

  // 4. Packages and Pricing
  {
    id: "difference-cloud-edge",
    category: "Packages and Pricing",
    question: "What is the difference between Nexus Cloud and Nexus Edge?",
    answer:
      "Plans start at CAD $99/month for Nexus Cloud. Each plan includes a defined usage allowance, clear limits, and managed support. Nexus Edge includes a dedicated appliance with a 24- or 36-month initial term for on-site privacy and predictable local capacity.",
  },
  {
    id: "pilot-details",
    category: "Packages and Pricing",
    question: "How does the 30-Day Cloud Pilot work?",
    answer:
      "The pilot includes your first 30 days of the CAD $99/month Cloud subscription and monthly Nexus AI Credits. A CAD $299 onboarding fee applies for setup and configuration. The 30 days begin on your confirmed go-live date, and there is no automatic subscription charge at the end—you decide whether to continue.",
  },
  {
    id: "currency-and-taxes",
    category: "Packages and Pricing",
    question: "What currency are prices in, and are taxes included?",
    answer:
      "All prices are shown in Canadian dollars (CAD) and exclude applicable federal and provincial taxes (such as GST/HST).",
  },
  {
    id: "cloud-to-edge-upgrade",
    category: "Packages and Pricing",
    question: "Can I upgrade from Nexus Cloud to Nexus Edge later?",
    answer:
      "Yes. If you upgrade from Nexus Cloud to Nexus Edge within six months, your CAD $299 Cloud onboarding payment is credited toward the CAD $1,499 Edge activation fee, subject to a routine Edge assessment.",
  },

  // 5. AI Usage
  {
    id: "what-are-nexus-ai-credits-full",
    category: "AI Usage",
    question: "What are Nexus AI Credits?",
    answer:
      "Nexus AI Credits cover the AI work performed by your Nexus assistant, including conversations, summaries, content drafts and other supported tasks.\n\nCustomers see one simple monthly balance instead of tokens or individual model charges. Nexus provides a notification before the included credits run low.",
  },
  {
    id: "unexpected-ai-bill",
    category: "AI Usage",
    question: "Will I receive an unexpected AI bill?",
    answer:
      "No. Nexus monitors your included monthly usage and alerts you before additional credits are required.\n\nAdditional usage is handled according to the billing rules agreed for your account.",
  },
  {
    id: "need-separate-ai-account",
    category: "AI Usage",
    question: "Do I need a separate AI provider account to begin?",
    answer:
      "No. Monthly Nexus AI Credits are included with your Nexus subscription, so you do not need to create a separate AI-provider account to begin. If you prefer direct provider billing and control, you may optionally connect a supported provider business account.",
  },
  {
    id: "consumer-chatgpt-gemini-grok",
    category: "AI Usage",
    question: "Does a regular ChatGPT, Google AI, or Grok subscription work?",
    answer:
      "A regular ChatGPT, Google AI, or Grok consumer subscription normally does not provide the business API access Nexus requires. If you prefer a customer-owned provider connection, Westside Union will help you create the appropriate supported provider business account during onboarding.",
  },
  {
    id: "usage-packs-overage",
    category: "AI Usage",
    question: "What happens when my monthly AI allowance is reached?",
    answer:
      "If you reach 100% of your monthly allowance, new AI-powered tasks pause safely. Non-AI functions, task records, and summaries remain active. You can wait for your allowance to reset monthly or add an optional prepaid Nexus AI Credit Pack. Additional credits are available when needed, and Nexus alerts you before your included usage runs low.",
  },

  // 6. Privacy and Control
  {
    id: "publish-without-approval",
    category: "Privacy and Control",
    question: "Will Nexus publish content without our approval?",
    answer:
      "Not by default. Nexus normally prepares public content for review.\n\nBusinesses may optionally enable approved autopilot for specific content types, campaigns, accounts and schedules. Anything outside those approved rules can be held for review.",
  },
  {
    id: "is-business-information-private",
    category: "Privacy and Control",
    question: "Is my business information private?",
    answer:
      "Your business information belongs to you. Nexus does not use it to train public models. Connected service providers process information according to the provider accounts, privacy settings, and terms selected for your deployment.",
  },
  {
    id: "send-messages-automatically",
    category: "Privacy and Control",
    question: "Can Nexus send customer messages automatically?",
    answer:
      "For routine, approved FAQs and acknowledgements, Nexus can reply according to your pre-approved rules. For sensitive, promotional, high-impact, or public communications (such as review replies or special offers), Nexus prepares drafts that pause for your approval before anything is sent.",
  },
  {
    id: "data-ownership",
    category: "Privacy and Control",
    question: "Who owns the business data, activity logs, and configurations?",
    answer:
      "You own your business data, customer conversations, configurations, and activity logs. You can request a data export at any time.",
  },

  // 7. Nexus Edge
  {
    id: "own-edge-appliance",
    category: "Nexus Edge",
    question: "Do I own the Nexus Edge appliance?",
    answer:
      "No. The Nexus Edge appliance is provided and maintained by Westside Union and remains Westside Union property. This allows us to monitor, secure, maintain, replace, and refresh the equipment consistently.",
  },
  {
    id: "edge-24-month-agreement",
    category: "Nexus Edge",
    question: "Why does Nexus Edge require a commitment term?",
    answer:
      "Westside Union purchases, configures, and ships dedicated equipment for your business, including monitoring, maintenance, backups, priority support, and covered hardware replacement. The agreement allows those infrastructure costs to be provided through a predictable monthly service rather than a large upfront hardware purchase.",
  },
  {
    id: "edge-term-ends",
    category: "Nexus Edge",
    question: "What happens when the Nexus Edge term ends?",
    answer:
      "You may renew Nexus Edge, discuss an equipment refresh, transition to Nexus Cloud, or return the appliance and end the service according to your agreement. Westside Union securely wipes customer data prior to equipment decommissioning.",
  },

  // 8. Connections and Add-ons
  {
    id: "can-nexus-manage-social-media",
    category: "Connections and Add-ons",
    question: "Can Nexus manage our social media?",
    answer:
      "Yes. Nexus can help plan your content calendar, write captions, create graphics and short animated promotional videos, adapt content for supported platforms and schedule approved posts.\n\nPublishing availability depends on the social platform, account permissions, selected package and enabled Nexus add-ons.",
  },
  {
    id: "can-nexus-create-videos",
    category: "Connections and Add-ons",
    question: "Can Nexus create videos?",
    answer:
      "Nexus can create short animated promotional videos and other supported visual content for announcements, offers, events and social campaigns.\n\nAvailable formats, volume and generation services depend on the selected package and enabled add-ons.",
  },
  {
    id: "can-nexus-post-to-every-social-platform",
    category: "Connections and Add-ons",
    question: "Can Nexus post to every social platform?",
    answer:
      "Nexus can publish through supported platforms and approved account connections. Availability depends on each provider’s API access, account eligibility and permissions.\n\nWestside Union confirms supported publishing channels during consultation.",
  },
  {
    id: "tools-already-used",
    category: "Connections and Add-ons",
    question: "Can Nexus connect to tools my business already uses?",
    answer:
      "Yes. Depending on your package and setup, Nexus connects with messaging tools (WhatsApp, SMS, Telegram, Email, Slack, Teams), booking platforms, POS systems, CRMs, and custom databases. Westside Union handles the configuration, authorization, and testing.",
  },
  {
    id: "add-ons-structure",
    category: "Connections and Add-ons",
    question: "How do add-on fees work?",
    answer:
      "Add-on fees are divided into one-time setup fees (covering setup, authorization, mapping, and testing) and monthly fees (covering monitoring, maintenance, updates, and support). Variable usage from telecom or third-party providers is separate.",
  },

  // 9. Dashboard and Future Features
  {
    id: "dashboard-role",
    category: "Dashboard and Future Features",
    question: "Do I have to use a dashboard every day?",
    answer:
      "No. Daily operation is messaging-first. The web dashboard is an optional control center (currently labelled Preview / In Development for pilot customers) for reviewing broad activity history, adjusting preferences, or inspecting tasks.",
  },

  // 10. Start Your Business — Canada
  {
    id: "founder-program-scope",
    category: "Start Your Business — Canada",
    question: "What is the Start Your Business — Canada program?",
    answer:
      "It is a specialized launch guidance and operating toolkit program for new Canadian entrepreneurs. It provides a personalized launch checklist, coordinates initial tool setup, facilitates warm handoffs to trusted Canadian professionals, and transitions seamlessly into an ongoing Nexus Cloud assistant.",
  },
  {
    id: "regulated-advice-boundary",
    category: "Start Your Business — Canada",
    question: "Does Nexus provide legal, tax, or accounting advice?",
    answer:
      "No. Nexus provides operational guidance, checklist organization, and launch coordination. It does not replace legal, accounting, tax, immigration, banking, insurance, or other regulated professional advice. We coordinate referrals to qualified Canadian professionals for regulated counsel.",
  },
]

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
    onboardingLabel: "CAD $299 one-time onboarding",
    tagline: "I need dependable help, but I want to start small.",
    description:
      "Nexus Cloud gives you one managed business assistant that helps organize follow-ups, reviews, reminders, customer communication, and everyday work through the messaging tools you already use.",
    compactBullets: [
      "Managed AI usage included",
      "One assistant and messaging channel",
      "Business knowledge and approval rules",
      "Tasks, follow-ups, and summaries",
    ],
    fullFeatures: [
      { text: "One Nexus business assistant" },
      { text: "One business, one location, one owner account" },
      { text: "One familiar messaging channel (WhatsApp, SMS, Telegram, or Email)" },
      { text: "One standard business connection (Calendar, Booking, or Messaging)" },
      { text: "Approved business knowledge & preferences setup" },
      { text: "Owner approval rules for sensitive & public actions" },
      { text: "Ideas, reminders, and assigned work organized in one place" },
      { text: "Review replies, posts, follow-ups & routine communications prepared for approval" },
      { text: "Daily or weekly business summaries" },
      { text: "Clear view of work waiting, in progress, and completed" },
      { text: "CAD $10 monthly managed AI usage included" },
      { text: "Usage visibility and spending alerts (zero automatic overages)" },
      { text: "Platform updates, monitoring & standard support" },
      { text: "Optional customer-owned provider connection" },
    ],
    note: "First 30 days of managed service included with pilot onboarding.",
    ctaText: "Start a 30-Day Pilot",
    ctaHref: "/pricing#pilot",
  },
  edge: {
    id: "edge",
    name: "Nexus Edge",
    monthlyCad: 299,
    annualMonthlyCad: 299, // No annual discount for Edge
    onboardingFeeCad: 699, // Activation fee
    commitmentMonths: 24,
    priceDisplay: "CAD $299",
    priceSubtext: "/month · 24-month term",
    onboardingLabel: "CAD $699 activation · 24-month term",
    tagline: "I want more privacy and more predictable AI spending.",
    description:
      "Nexus Edge adds a dedicated managed appliance at your business, keeping more approved business knowledge and routine work on-site while retaining optional cloud assistance when it adds value.",
    compactBullets: [
      "Managed Nexus appliance included",
      "More approved business knowledge kept on-site",
      "Backups, monitoring, and maintenance",
      "Managed cloud fallback included",
    ],
    fullFeatures: [
      { text: "Everything in Nexus Cloud", highlight: true },
      { text: "Standard managed Nexus Edge appliance included", highlight: true },
      { text: "More approved business information & routine work kept on-site", highlight: true },
      { text: "Reduced dependence on paid cloud AI" },
      { text: "Private business knowledge isolated to your physical location" },
      { text: "One messaging channel" },
      { text: "Up to two standard business connections" },
      { text: "Managed backups and disaster recovery" },
      { text: "Secure remote monitoring, patching, and maintenance" },
      { text: "Optional cloud assistance for complex or burst tasks" },
      { text: "CAD $10 managed cloud-AI fallback allowance included" },
      { text: "Covered hardware replacement for ordinary equipment failure" },
      { text: "Priority support and expedited response" },
    ],
    note: "Appliance remains Westside Union property. Minimum 24-month agreement applies.",
    ctaText: "Explore Nexus Edge",
    ctaHref: "/nexus-edge",
  },
  custom: {
    id: "custom",
    name: "Nexus Custom",
    monthlyCad: 799,
    annualMonthlyCad: 799,
    onboardingFeeCad: 2500,
    commitmentMonths: 12,
    priceDisplay: "From CAD $799",
    priceSubtext: "/month",
    onboardingLabel: "Deployment from CAD $2,500",
    tagline: "Our business has unique systems, locations, or workflows.",
    description:
      "Tailored multi-location, enterprise, or specialized workflow deployment configured to your exact operations, compliance rules, and business tools.",
    compactBullets: [
      "Multiple locations or departments",
      "Specialized business connections",
      "Tailored workflows and permissions",
      "Dedicated onboarding and support",
    ],
    fullFeatures: [
      { text: "Multiple locations, teams, or business departments" },
      { text: "Tailored multi-step business workflows" },
      { text: "Specialized business-system and database connections" },
      { text: "Multiple specialized assistants under one unified Nexus experience" },
      { text: "Advanced approval workflows and role-based permissions" },
      { text: "Private cloud, on-site appliance, or hybrid deployment" },
      { text: "Custom operational reporting and analytics" },
      { text: "Voice-assistant workflows when appropriate" },
      { text: "Customer-owned AI provider integrations" },
      { text: "Dedicated onboarding manager and priority engineering support" },
    ],
    note: "Final price confirmed after business workflow consultation.",
    ctaText: "Plan a Custom Solution",
    ctaHref: "/#contact",
  },
}

// ─── 30-Day Nexus Cloud Pilot Terms ──────────────────────────────────────────
export const PILOT_TERMS = {
  name: "30-Day Nexus Cloud Pilot",
  onboardingFeeCad: 299,
  includedSubscriptionValueCad: 99,
  includedTrialAiUsageCad: 10,
  headline: "See what Nexus can take off your plate in 30 days.",
  subheadline:
    "Experience a managed business assistant built around your actual routines. Your first 30 days of the CAD $99 Cloud subscription and CAD $10 of managed AI usage are included with onboarding.",
  clarification:
    "Your first 30 days of managed service are included. CAD $299 onboarding applies.",
  inclusions: [
    { title: "One business assistant", desc: "One location, one business, and one primary owner account." },
    { title: "One messaging channel", desc: "WhatsApp, SMS/Text, Telegram, or email." },
    { title: "One primary workflow", desc: "Configured around your highest-priority administrative bottleneck." },
    { title: "One standard business connection", desc: "Supported calendar, booking, or messaging connection." },
    { title: "CAD $10 trial AI usage", desc: "Included managed usage with zero automatic overage." },
    { title: "No automatic subscription charge", desc: "Evaluate real outcomes before committing to your ongoing plan." },
  ],
  endOfPilotChoices: [
    "Continue Nexus Cloud at CAD $99/month (or CAD $79/mo billed annually)",
    "Connect a supported customer-owned AI provider account",
    "Upgrade to Nexus Edge with your CAD $299 onboarding payment credited toward activation",
    "End the pilot with no further subscription charge",
  ],
  disclosure:
    "CAD $299 onboarding applies. The first 30 days of the Cloud subscription and CAD $10 of managed AI usage are included. Third-party services and optional add-ons are separate. The 30 days begin on the confirmed go-live date, not the signing date.",
}

// ─── Nexus Edge Agreement Calculations ───────────────────────────────────────
export const EDGE_AGREEMENT = {
  monthlyFeeCad: 299,
  activationFeeCad: 699,
  termMonths: 24,
  get totalCommitmentCad(): number {
    return this.activationFeeCad + this.monthlyFeeCad * this.termMonths // 699 + (299 * 24) = 7,875
  },
  propertyNotice: "The standard managed appliance remains the property of Westside Union.",
  cloudFallbackAllowanceCad: 10,
  cloudToEdgeCreditText:
    "Upgrade from Nexus Cloud to Nexus Edge within six months and receive the CAD $299 Cloud onboarding payment as a credit toward Edge activation, subject to an Edge assessment.",
}

// ─── Managed AI Usage & Safeguards ───────────────────────────────────────────
export const AI_USAGE_RULES = {
  monthlyAllowanceCad: 10,
  resetPeriod: "Monthly reset · Unused allowance does not roll over",
  rules: [
    {
      title: "Monthly Reset",
      desc: "Allowance resets every month. Unused allowance does not roll over.",
    },
    {
      title: "70% Alert",
      desc: "Receive a proactive message notification when 70% of monthly allowance is consumed.",
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
      desc: "Nexus never charges surprise fees or automatic per-token overages.",
    },
    {
      title: "Activity History Active",
      desc: "Non-AI tasks, summaries, past conversations, and activity records stay accessible.",
    },
  ],
  usagePacks: [
    {
      usageValueCad: 10,
      priceCad: 15,
      label: "CAD $10 additional AI usage",
      priceDisplay: "CAD $15",
      desc: "Ideal for short busy periods",
    },
    {
      usageValueCad: 25,
      priceCad: 35,
      label: "CAD $25 additional AI usage",
      priceDisplay: "CAD $35",
      desc: "Popular for seasonal promotions",
    },
    {
      usageValueCad: 50,
      priceCad: 65,
      label: "CAD $50 additional AI usage",
      priceDisplay: "CAD $65",
      desc: "For high-volume customer months",
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
        name: "CAD $10 AI Usage Pack",
        price: "CAD $15 one-time",
        type: "one-time",
        desc: "Prepaid buffer for short busy periods",
      },
      {
        name: "CAD $25 AI Usage Pack",
        price: "CAD $35 one-time",
        type: "one-time",
        desc: "Prepaid buffer for seasonal promotions",
      },
      {
        name: "CAD $50 AI Usage Pack",
        price: "CAD $65 one-time",
        type: "one-time",
        desc: "Prepaid buffer for high-volume customer months",
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
  "Nexus Edge — CAD $299/month, 24-month term",
  "Nexus Custom",
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
    | "Packages and Pricing"
    | "AI Usage"
    | "Privacy and Control"
    | "Nexus Edge"
    | "Connections and Add-ons"
    | "Dashboard and Future Features"
    | "Start Your Business — Canada"
  isHomepageTop5?: boolean
}

export const FAQ_CATEGORIES = [
  "Getting Started",
  "Packages and Pricing",
  "AI Usage",
  "Privacy and Control",
  "Nexus Edge",
  "Connections and Add-ons",
  "Dashboard and Future Features",
  "Start Your Business — Canada",
] as const

export const ALL_FAQS: FaqItemData[] = [
  // 1. Getting Started
  {
    id: "what-is-project-nexus",
    category: "Getting Started",
    isHomepageTop5: true,
    question: "What is Nexus?",
    answer:
      "Nexus is a managed AI assistant for your business, built and operated by Westside Union. It organizes your follow-ups, reviews, customer inquiries, and routine tasks through the messaging tools you already use, keeping work moving forward with owner approval rules and clear summaries.",
  },
  {
    id: "does-nexus-replace-staff",
    category: "Getting Started",
    isHomepageTop5: true,
    question: "Does Nexus replace my staff?",
    answer:
      "No. Nexus is designed to support you and your existing team, not replace employees. It absorbs repetitive coordination, draft preparation, reminder tracking, and after-hours triage so you and your team can focus on serving customers, doing skilled work, and running the business.",
  },
  {
    id: "how-do-i-communicate-with-nexus",
    category: "Getting Started",
    isHomepageTop5: true,
    question: "How do I communicate with Nexus?",
    answer:
      "You and your team communicate with Nexus through familiar messaging channels like WhatsApp, SMS/text, Telegram, or email. There is no complicated new software to train your team on—you message Nexus just like you would a trusted assistant.",
  },
  {
    id: "who-manages-technical-setup",
    category: "Getting Started",
    question: "Who manages the technical setup and updates?",
    answer:
      "Westside Union handles all business knowledge setup, channel configuration, connector health, security monitoring, and platform updates so you never have to deal with technical complexity.",
  },

  // 2. Packages and Pricing
  {
    id: "difference-cloud-edge",
    category: "Packages and Pricing",
    isHomepageTop5: true,
    question: "What is the difference between Nexus Cloud and Nexus Edge?",
    answer:
      "Nexus Cloud runs as a fully managed cloud service for CAD $99/month, allowing you to start quickly with CAD $10 of included monthly AI usage and zero automatic overages. Nexus Edge (CAD $299/month, 24-month term) adds a dedicated managed appliance at your business, keeping more approved business knowledge and routine work on-site for businesses wanting higher privacy and reduced dependence on cloud AI.",
  },
  {
    id: "pilot-details",
    category: "Packages and Pricing",
    question: "How does the 30-Day Cloud Pilot work?",
    answer:
      "The pilot includes your first 30 days of the CAD $99/month Cloud subscription and CAD $10 of trial AI usage. A CAD $299 onboarding fee applies for setup and configuration. The 30 days begin on your confirmed go-live date, and there is no automatic subscription charge at the end—you decide whether to continue.",
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
      "Yes. If you upgrade from Nexus Cloud to Nexus Edge within six months, your CAD $299 Cloud onboarding payment is credited toward the CAD $699 Edge activation fee, subject to a routine Edge assessment.",
  },

  // 3. AI Usage
  {
    id: "is-ai-usage-included",
    category: "AI Usage",
    isHomepageTop5: true,
    question: "Is managed AI usage included?",
    answer:
      "Yes. Every Nexus Cloud and Nexus Edge package includes CAD $10 of managed AI usage each month. We provide proactive notifications at 70% and 90% usage, and safely pause new AI work at 100% so you never receive surprise bills or automatic overages.",
  },
  {
    id: "need-separate-ai-account",
    category: "AI Usage",
    question: "Do I need a separate AI provider account to begin?",
    answer:
      "No. Managed AI usage (CAD $10/month) is included with your Nexus subscription, so you do not need to create a separate AI-provider account to begin. If you prefer direct provider billing and control, you may optionally connect a supported provider business account.",
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
      "If you reach 100% of your monthly allowance, new AI-powered tasks pause safely. Non-AI functions, task records, and summaries remain active. You can wait for your allowance to reset monthly or add an optional prepaid AI Usage Pack (e.g. CAD $10 usage for CAD $15).",
  },

  // 4. Privacy and Control
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

  // 5. Nexus Edge
  {
    id: "own-edge-appliance",
    category: "Nexus Edge",
    question: "Do I own the Nexus Edge appliance?",
    answer:
      "No. The standard managed appliance is included with the managed Edge service and remains the property of Westside Union. This allows us to monitor, secure, maintain, replace, and refresh the equipment consistently.",
  },
  {
    id: "edge-24-month-agreement",
    category: "Nexus Edge",
    question: "Why does Nexus Edge require a 24-month agreement?",
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

  // 6. Connections and Add-ons
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

  // 7. Dashboard and Future Features
  {
    id: "dashboard-role",
    category: "Dashboard and Future Features",
    question: "Do I have to use a dashboard every day?",
    answer:
      "No. Daily operation is messaging-first. The web dashboard is an optional control center (currently labelled Preview / In Development for pilot customers) for reviewing broad activity history, adjusting preferences, or inspecting tasks.",
  },

  // 8. Start Your Business — Canada
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

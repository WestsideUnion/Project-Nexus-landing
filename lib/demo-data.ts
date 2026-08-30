/**
 * ============================================================================
 * FICTIONAL DEMONSTRATION DATA ONLY
 * 
 * Business Workspace: Northstar Café (Fictional demonstration business)
 * 
 * CRITICAL NOTICE:
 * This dataset contains purely fictional demonstration scenarios created for
 * the frontend-only interactive preview of the Nexus dashboard (/demo).
 * It must NEVER be mistaken for production telemetry, real customer data,
 * verified financial performance, or live third-party integrations.
 * 
 * - No backend or database connections
 * - No external AI provider calls
 * - No live customer or financial information
 * - No external messages or social media posts are sent or published
 * ============================================================================
 */

export interface DemoMetric {
  id: string
  label: string
  value: string
  subtext: string
  trend?: string
  disclaimer?: string
}

export interface DemoTaskReport {
  askedToDo: string
  prepared: string
  approvalRequired: boolean
  approvalDetails?: string
  completedAction: string
  completedAt: string
  deliveredTo: string
}

export interface DemoTask {
  id: string
  title: string
  description: string
  column: "todo" | "in_progress" | "completed"
  category: "Social Promotion" | "Customer Care" | "Follow-up" | "Operations" | "Briefing"
  timeLabel: string
  badgeLabel: string
  approvalRequired?: boolean
  report?: DemoTaskReport
  isGuidedTask?: boolean
}

export interface DemoApprovalItem {
  id: string
  title: string
  category: string
  requestedAt: string
  summary: string
  previewContent: {
    type: "social_post" | "review_reply" | "discount_quote"
    headline: string
    bodyText: string
    details: Array<{ label: string; value: string }>
  }
  status: "pending" | "approved" | "revised"
  statusNote: string
}

export interface DemoScheduleItem {
  id: string
  title: string
  cadence: string
  nextRun: string
  channel: string
  description: string
  status: "Active Schedule (Demo)"
}

export interface DemoConnectionItem {
  id: string
  name: string
  category: "Messaging" | "Presence & Reviews" | "Commerce & Booking"
  safeLabel: "Demo connection" | "Example connection" | "Confirmed during consultation"
  description: string
  iconType: "whatsapp" | "telegram" | "email" | "google" | "pos" | "booking"
}

export interface DemoCreditCategory {
  name: string
  percentage: number
  description: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Initial Metrics
// ─────────────────────────────────────────────────────────────────────────────
export const INITIAL_DEMO_METRICS: DemoMetric[] = [
  {
    id: "tasks_completed",
    label: "Tasks completed today",
    value: "6",
    subtext: "+2 queued for this afternoon",
    trend: "On schedule",
  },
  {
    id: "followups_handled",
    label: "Customer follow-ups handled",
    value: "14",
    subtext: "Inquiries & review replies addressed",
    trend: "Active",
  },
  {
    id: "hours_returned",
    label: "Hours returned to owner",
    value: "4.5 hrs",
    subtext: "Routine drafting & coordination saved",
    trend: "+1.2 hrs vs yesterday",
  },
  {
    id: "opportunities_active",
    label: "Opportunities kept active",
    value: "8",
    subtext: "Catering inquiries & group reservations",
    disclaimer: "Illustrative estimate",
  },
  {
    id: "credits_remaining",
    label: "Nexus AI Credits remaining",
    value: "72%",
    subtext: "Resets on the first day of next billing period",
    trend: "Healthy balance",
  },
]

export const UPDATED_DEMO_METRICS: DemoMetric[] = [
  {
    id: "tasks_completed",
    label: "Tasks completed today",
    value: "7",
    subtext: "Friday Campaign approved and scheduled",
    trend: "+1 just completed",
  },
  {
    id: "followups_handled",
    label: "Customer follow-ups handled",
    value: "14",
    subtext: "Inquiries & review replies addressed",
    trend: "Active",
  },
  {
    id: "hours_returned",
    label: "Hours returned to owner",
    value: "5.2 hrs",
    subtext: "Promotion drafted, graphic rendered & queued",
    trend: "+0.7 hrs added",
  },
  {
    id: "opportunities_active",
    label: "Opportunities kept active",
    value: "9",
    subtext: "Friday special scheduled across channels",
    disclaimer: "Illustrative estimate",
  },
  {
    id: "credits_remaining",
    label: "Nexus AI Credits remaining",
    value: "71%",
    subtext: "Resets on the first day of next billing period",
    trend: "Healthy balance",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Initial Tasks
// ─────────────────────────────────────────────────────────────────────────────
export const INITIAL_DEMO_TASKS: DemoTask[] = [
  // ── To Do Column
  {
    id: "task-friday-promo",
    title: "Friday Café Promotion",
    description: "Prepare an approved social campaign for Friday’s café special.",
    column: "todo",
    category: "Social Promotion",
    timeLabel: "Today · 10:15 AM",
    badgeLabel: "Awaiting Trigger",
    approvalRequired: true,
    isGuidedTask: true,
    report: {
      askedToDo: "Owner requested via WhatsApp: 'Create a Friday promotion for our café and schedule it after I approve it.'",
      prepared: "Prepared campaign caption, promotional graphic asset, animated video preview reel, and target publishing schedule.",
      approvalRequired: true,
      approvalDetails: "Public promotions require 1-tap owner approval before scheduling.",
      completedAction: "Approved by owner and scheduled in this demonstration.",
      completedAt: "10:45 AM (Demonstration schedule)",
      deliveredTo: "Simulated Instagram & Facebook business channels",
    },
  },
  {
    id: "task-google-review",
    title: "Reply to Google Review",
    description: "Draft friendly response to 5-star Google review from Sarah L. regarding breakfast bowl.",
    column: "todo",
    category: "Customer Care",
    timeLabel: "Today · 9:30 AM",
    badgeLabel: "Draft Ready",
    approvalRequired: true,
    report: {
      askedToDo: "Acknowledge new 5-star review left on Google Business Profile.",
      prepared: "Drafted appreciative response matching Northstar Café voice guidelines.",
      approvalRequired: true,
      approvalDetails: "Review replies wait for owner approval before posting.",
      completedAction: "Draft ready for owner review on Approvals tab.",
      completedAt: "Pending owner review",
      deliveredTo: "Google Business Profile (Simulated)",
    },
  },
  {
    id: "task-catering-inquiry",
    title: "Catering Inquiry Follow-up",
    description: "Provide catering menu PDF and quote availability to Oakridge Office lunch inquiry.",
    column: "todo",
    category: "Follow-up",
    timeLabel: "Today · 9:00 AM",
    badgeLabel: "Pending Follow-up",
    approvalRequired: false,
    report: {
      askedToDo: "Follow up on email inquiry for 35-person corporate lunch box package.",
      prepared: "Verified current catering menu PDF and pre-checked kitchen capacity for requested date.",
      approvalRequired: false,
      completedAction: "Follow-up packet prepared and sent to customer.",
      completedAt: "9:05 AM",
      deliveredTo: "Email (Simulated)",
    },
  },
  {
    id: "task-slow-wednesday",
    title: "Check Slow Wednesday Suggestion",
    description: "Explore mid-week pastry combo promotion to boost 2:00 PM - 4:00 PM foot traffic.",
    column: "todo",
    category: "Operations",
    timeLabel: "Yesterday · 4:15 PM",
    badgeLabel: "Idea Staged",
    approvalRequired: true,
    report: {
      askedToDo: "Owner asked: 'How can we encourage more afternoon visits on Wednesdays?'",
      prepared: "Drafted 2-for-1 pastry pairing concept targeting nearby office workers.",
      approvalRequired: true,
      completedAction: "Concept ready for owner discussion during weekly briefing.",
      completedAt: "4:30 PM",
      deliveredTo: "Nexus Dashboard",
    },
  },

  // ── In Progress Column
  {
    id: "task-preparing-review",
    title: "Preparing Review Response",
    description: "Organizing polite response and customer service follow-up for weekend feedback.",
    column: "in_progress",
    category: "Customer Care",
    timeLabel: "Active · 11:20 AM",
    badgeLabel: "Drafting",
    approvalRequired: true,
    report: {
      askedToDo: "Address customer comment regarding busy wait times during Sunday brunch.",
      prepared: "Drafting polite acknowledgment emphasizing our new queue management system.",
      approvalRequired: true,
      completedAction: "Currently in drafting state.",
      completedAt: "In Progress",
      deliveredTo: "Owner Approvals Queue",
    },
  },
  {
    id: "task-verifying-hours",
    title: "Verifying Approved Business Information",
    description: "Cross-referencing upcoming statutory holiday hours across Google profile and website.",
    column: "in_progress",
    category: "Operations",
    timeLabel: "Active · 11:05 AM",
    badgeLabel: "Cross-Checking",
    approvalRequired: false,
    report: {
      askedToDo: "Verify holiday opening hours match owner schedule.",
      prepared: "Checked Google profile against Northstar Café calendar.",
      approvalRequired: false,
      completedAction: "Syncing information across connected profiles.",
      completedAt: "In Progress",
      deliveredTo: "Business Profiles",
    },
  },
  {
    id: "task-tomorrow-reservations",
    title: "Organizing Tomorrow’s Reservations",
    description: "Reviewing table bookings and queueing confirmation messages for afternoon tasting.",
    column: "in_progress",
    category: "Follow-up",
    timeLabel: "Active · 10:50 AM",
    badgeLabel: "Organizing",
    approvalRequired: false,
    report: {
      askedToDo: "Compile tomorrow's bookings and prepare confirmation touchpoints.",
      prepared: "12 guest bookings cross-referenced with seating chart.",
      approvalRequired: false,
      completedAction: "Confirmation batch queued for automated delivery.",
      completedAt: "In Progress",
      deliveredTo: "SMS & Booking System (Simulated)",
    },
  },

  // ── Completed Column
  {
    id: "task-morning-briefing",
    title: "Morning Briefing Delivered",
    description: "Daily 7:00 AM summary sent to owner covering today's bookings and priorities.",
    column: "completed",
    category: "Briefing",
    timeLabel: "Today · 7:00 AM",
    badgeLabel: "Delivered",
    approvalRequired: false,
    report: {
      askedToDo: "Deliver daily 7:00 AM operational summary to owner.",
      prepared: "Summarized today's staffing notes, 14 expected reservations, and weather forecast for patio seating.",
      approvalRequired: false,
      completedAction: "Delivered morning briefing directly to owner's WhatsApp.",
      completedAt: "7:00 AM",
      deliveredTo: "WhatsApp (Simulated)",
    },
  },
  {
    id: "task-appointment-reminder",
    title: "Appointment Reminder Sent",
    description: "SMS reminder sent for tomorrow's 10:00 AM group tasting event with confirmation link.",
    column: "completed",
    category: "Customer Care",
    timeLabel: "Today · 8:15 AM",
    badgeLabel: "Sent",
    approvalRequired: false,
    report: {
      askedToDo: "Send 24-hour advance confirmation to private tasting party of 8.",
      prepared: "Generated personalized reminder with parking directions and dietary preference confirmation.",
      approvalRequired: false,
      completedAction: "Delivered SMS reminder with 100% confirmation received.",
      completedAt: "8:15 AM",
      deliveredTo: "SMS (Simulated)",
    },
  },
  {
    id: "task-owner-summary",
    title: "Owner Summary Prepared",
    description: "Recap of weekly catering inquiries, resolved reviews, and upcoming supplier deliveries.",
    column: "completed",
    category: "Briefing",
    timeLabel: "Yesterday · 6:00 PM",
    badgeLabel: "Logged",
    approvalRequired: false,
    report: {
      askedToDo: "Compile end-of-day administrative recap for the business owner.",
      prepared: "Organized 4 new catering leads, 3 replied reviews, and 2 scheduled deliveries into a 2-minute read.",
      approvalRequired: false,
      completedAction: "Delivered to owner communication channel and archived in activity log.",
      completedAt: "6:00 PM",
      deliveredTo: "WhatsApp & Dashboard (Simulated)",
    },
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Guided Tour Scenario Content
// ─────────────────────────────────────────────────────────────────────────────
export const GUIDED_TOUR_DATA = {
  ownerRequestMessage: "Create a Friday promotion for our café and schedule it after I approve it.",
  ownerRequestChannel: "WhatsApp",
  ownerRequestTime: "10:15 AM",
  taskTitle: "Friday Café Promotion",
  taskDescription: "Prepare an approved social campaign for Friday’s café special.",
  
  initialCaption: "✨ Fresh Friday at Northstar Café: Warm up with our artisan Maple Cardamom Flat White and freshly baked almond brioche. Available this Friday only — show this post for 15% off your morning pastry pairing! ☕🥐",
  
  revisedCaption: "✨ Friday treats are lined up! Grab your Maple Flat White + almond pastry pairing before noon this Friday. Tap in and let us know your favourite brew! ☕🥐 (Revised tone: casual & community-focused)",
  
  proposedSchedule: "Friday at 11:30 AM",
  proposedChannels: ["Instagram (Simulated)", "Facebook (Simulated)"],
  
  completionReport: {
    askedToDo: "Owner requested: 'Create a Friday promotion for our café and schedule it after I approve it.'",
    prepared: "Social caption draft, promotional graphic asset, animated video preview reel, and target publishing schedule.",
    approvalRequired: true,
    approvalDetails: "Owner reviewed preview and approved with 1 tap.",
    completedAction: "Friday campaign approved and scheduled in this demonstration.",
    completedAt: "10:45 AM (Simulated schedule for Friday 11:30 AM)",
    deliveredTo: "Simulated Instagram & Facebook business channels",
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Approvals Tab Dataset
// ─────────────────────────────────────────────────────────────────────────────
export const DEMO_APPROVALS: DemoApprovalItem[] = [
  {
    id: "appr-friday-promo",
    title: "Friday Social Campaign Draft",
    category: "Social Promotion",
    requestedAt: "Today · 10:20 AM",
    summary: "Nexus prepared the Friday campaign. Review the caption and creative before scheduling.",
    previewContent: {
      type: "social_post",
      headline: "Friday Maple Flat White Special",
      bodyText: "✨ Fresh Friday at Northstar Café: Warm up with our artisan Maple Cardamom Flat White and freshly baked almond brioche. Available this Friday only — show this post for 15% off your morning pastry pairing! ☕🥐",
      details: [
        { label: "Target Schedule", value: "Friday at 11:30 AM" },
        { label: "Simulated Channels", value: "Instagram & Facebook" },
        { label: "Offer", value: "15% off pastry pairing" },
      ],
    },
    status: "pending",
    statusNote: "Waiting for owner review",
  },
  {
    id: "appr-google-review",
    title: "Google Review Response",
    category: "Customer Care",
    requestedAt: "Today · 9:45 AM",
    summary: "Customer Sarah L. left a 5-star review praising our lavender honey latte.",
    previewContent: {
      type: "review_reply",
      headline: "Response to Sarah L. (5 Stars)",
      bodyText: "Thank you so much, Sarah! We're thrilled you enjoyed the lavender honey latte — our baristas craft that syrup in-house every Tuesday. See you again soon!",
      details: [
        { label: "Platform", value: "Google Business Profile (Simulated)" },
        { label: "Review Rating", value: "★★★★★ (5.0)" },
        { label: "Voice Policy", value: "Warm, professional, appreciative" },
      ],
    },
    status: "pending",
    statusNote: "Waiting for owner review",
  },
  {
    id: "appr-discount-request",
    title: "Customer Discount Request",
    category: "Catering & Quotes",
    requestedAt: "Yesterday · 3:20 PM",
    summary: "Oakridge Tech requested a 10% volume discount on a recurring 45-person Friday lunch order.",
    previewContent: {
      type: "discount_quote",
      headline: "Recurring Corporate Catering Agreement",
      bodyText: "Nexus drafted a recurring corporate catering quote applying a 10% volume courtesy while maintaining your standard 48-hour modification policy.",
      details: [
        { label: "Client", value: "Oakridge Tech (Simulated Client)" },
        { label: "Proposed Discount", value: "10% on orders > 40 guests" },
        { label: "Estimated Weekly Value", value: "$675.00 (Illustrative estimate)" },
      ],
    },
    status: "pending",
    statusNote: "Waiting for owner review",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Schedule Tab Dataset
// ─────────────────────────────────────────────────────────────────────────────
export const DEMO_SCHEDULE: DemoScheduleItem[] = [
  {
    id: "sched-morning-brief",
    title: "Daily Morning Briefing",
    cadence: "Every day at 7:00 AM",
    nextRun: "Tomorrow at 7:00 AM",
    channel: "WhatsApp (Simulated)",
    description: "Delivers today's reservation headcount, weather forecast for outdoor seating, and outstanding priority items.",
    status: "Active Schedule (Demo)",
  },
  {
    id: "sched-weekly-reviews",
    title: "Weekly Review Summary",
    cadence: "Every Monday at 8:00 AM",
    nextRun: "Next Monday at 8:00 AM",
    channel: "Email & WhatsApp (Simulated)",
    description: "Summarizes all new customer ratings, feedback themes, and drafted responses across Google and review platforms.",
    status: "Active Schedule (Demo)",
  },
  {
    id: "sched-friday-promo",
    title: "Friday Promotion Announcement",
    cadence: "Every Friday at 11:30 AM",
    nextRun: "This Friday at 11:30 AM",
    channel: "Instagram & Facebook (Simulated)",
    description: "Publishes the approved weekly specialty item, weekend hours reminder, and community highlight.",
    status: "Active Schedule (Demo)",
  },
  {
    id: "sched-quote-followup",
    title: "Quote & Inquiry Follow-up",
    cadence: "Weekdays at 4:30 PM",
    nextRun: "Today at 4:30 PM",
    channel: "Email (Simulated)",
    description: "Checks unanswered catering inquiries older than 48 hours and queues polite check-in drafts for owner review.",
    status: "Active Schedule (Demo)",
  },
  {
    id: "sched-monthly-report",
    title: "Monthly Business Overview",
    cadence: "1st day of every month at 9:00 AM",
    nextRun: "1st of next month at 9:00 AM",
    channel: "PDF via Email (Simulated)",
    description: "Executive summary of tasks completed, inquiries resolved, owner hours returned, and upcoming seasonal milestones.",
    status: "Active Schedule (Demo)",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Connections Tab Dataset
// ─────────────────────────────────────────────────────────────────────────────
export const DEMO_CONNECTIONS: DemoConnectionItem[] = [
  {
    id: "conn-whatsapp",
    name: "WhatsApp Business",
    category: "Messaging",
    safeLabel: "Demo connection",
    description: "Used by the owner to send voice notes or text requests, receive briefings, and approve tasks with 1 tap.",
    iconType: "whatsapp",
  },
  {
    id: "conn-telegram",
    name: "Telegram",
    category: "Messaging",
    safeLabel: "Demo connection",
    description: "Secondary communication channel for task alerts, instant approval buttons, and daily summaries.",
    iconType: "telegram",
  },
  {
    id: "conn-email",
    name: "Business Email (Google Workspace)",
    category: "Messaging",
    safeLabel: "Demo connection",
    description: "Monitors inbound catering inquiries, formats professional proposals, and tracks vendor confirmations.",
    iconType: "email",
  },
  {
    id: "conn-google",
    name: "Google Business Profile",
    category: "Presence & Reviews",
    safeLabel: "Example connection",
    description: "Monitors incoming reviews, drafts approved responses, and synchronizes holiday opening hours.",
    iconType: "google",
  },
  {
    id: "conn-pos",
    name: "Point of Sale (Square POS)",
    category: "Commerce & Booking",
    safeLabel: "Confirmed during consultation",
    description: "Provides daily sales rhythm context so promotional suggestions match actual quiet and peak hours.",
    iconType: "pos",
  },
  {
    id: "conn-booking",
    name: "Reservation & Table Booking",
    category: "Commerce & Booking",
    safeLabel: "Confirmed during consultation",
    description: "Coordinates table bookings, tasting reservations, and prepares automatic SMS reminders for guests.",
    iconType: "booking",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Usage & Credits Tab Dataset
// ─────────────────────────────────────────────────────────────────────────────
export const DEMO_CREDIT_BREAKDOWN: DemoCreditCategory[] = [
  {
    name: "Customer Inquiries & Review Replies",
    percentage: 34,
    description: "Review monitoring, customer email follow-ups, and polite inquiries coordination.",
  },
  {
    name: "Marketing & Social Campaign Drafts",
    percentage: 26,
    description: "Crafting promotional captions, graphic card layouts, and promotional announcements.",
  },
  {
    name: "Operational Briefings & Summaries",
    percentage: 22,
    description: "Daily morning briefings, weekly catering summaries, and schedule organization.",
  },
  {
    name: "Task Triage & Information Verification",
    percentage: 18,
    description: "Checking opening hours consistency and cross-referencing supplier delivery schedules.",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Nexus Sense Preview Event
// ─────────────────────────────────────────────────────────────────────────────
export const DEMO_SENSE_EVENT = {
  title: "Refrigerator Temperature Alert",
  badge: "Simulated sensor event",
  occurredAt: "Today · 6:42 AM",
  description: "A temperature reading remained outside the preferred range for 12 minutes. Nexus created an inspection task and prepared an owner alert.",
  actionTaken: "Inspection task added to today's kitchen checklist; priority notification sent to owner's WhatsApp.",
  status: "Resolved after morning check",
  safeDisclaimer: "Demonstration sensor simulation only. No physical sensor is currently connected.",
}

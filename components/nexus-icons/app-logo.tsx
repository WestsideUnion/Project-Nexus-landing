"use client"

import React, { useState } from "react"
import {
  WhatsAppIcon,
  TelegramIcon,
  SlackIcon,
  TeamsIcon,
  SignalIcon,
  AppleMessagesIcon,
  WebChatIcon,
  GoogleBusinessIcon,
  SquarePosIcon,
  CloverPosIcon,
  NotionIcon,
  GithubIcon,
  ShopifyIcon,
  StripeIcon,
  GoogleCalendarIcon,
  GoogleDocsIcon,
  GoogleSheetsIcon,
  GoogleDriveIcon,
  LinearIcon,
  JiraIcon,
  AsanaIcon,
  AirtableIcon,
  DiscordIcon,
  MailchimpIcon,
  ZendeskIcon,
  IntercomIcon,
  FigmaIcon,
  SupabaseIcon,
  McpServerIcon,
  CustomApiIcon,
} from "./nexus-icons"

// ─── Additional Official Vector Brand Marks ──────────────────────────────────

export function HubSpotIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="HubSpot">
      <path
        d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z"
        fill="#FF7A59"
      />
    </svg>
  )
}

export function QuickBooksIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="QuickBooks">
      <path
        d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm.642 4.1335c.9554 0 1.7296.776 1.7296 1.7332v9.0667h1.6c1.614 0 2.9275-1.3156 2.9275-2.933 0-1.6173-1.3136-2.9333-2.9276-2.9333h-.6654V7.3334h.6654c2.5722 0 4.6577 2.0897 4.6577 4.667 0 2.5774-2.0855 4.6666-4.6577 4.6666H12.642zM7.9837 7.333h3.3291v12.533c-.9555 0-1.73-.7759-1.73-1.7332V9.0662H7.9837c-1.6146 0-2.9277 1.316-2.9277 2.9334 0 1.6175 1.3131 2.9333 2.9277 2.9333h.6654v1.7332h-.6654c-2.5725 0-4.6577-2.0892-4.6577-4.6665 0-2.5771 2.0852-4.6666 4.6577-4.6666Z"
        fill="#2CA01C"
      />
    </svg>
  )
}

export function XeroIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Xero">
      <circle cx="12" cy="12" r="12" fill="#13B5EA" />
      <path
        d="M7.4 9.1l2.2 2.3-2.2 2.3.8.8 2.2-2.3 2.2 2.3.8-.8-2.2-2.3 2.2-2.3-.8-.8-2.2 2.3-2.2-2.3-.8.8zM14 8v8h1.2v-3.2h1.6c1.3 0 2.2-.9 2.2-2.4 0-1.4-.9-2.4-2.2-2.4H14zm1.2 1.1h1.5c.7 0 1.1.4 1.1 1.3 0 .8-.4 1.3-1.1 1.3h-1.5V9.1z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

export function WooCommerceIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="WooCommerce">
      <rect width="24" height="24" rx="5" fill="#7F54B3" />
      <path
        d="M4.5 9h2.3l1.7 4.8 1.7-4.8h2.3l-2.8 7.2H7.3L4.5 9zm7.3 0h2.3l1.7 4.8 1.7-4.8h2.3l-2.8 7.2h-2.4l-2.8-7.2z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

export function SalesforceIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Salesforce">
      <path
        d="M10 5.4a4.8 4.8 0 0 1 7.2 1.8 5.1 5.1 0 0 1 4.8 5.1 5.1 5.1 0 0 1-5 5.1c-.5 0-.9-.1-1.3-.2a3.8 3.8 0 0 1-5.1 1.6 3.9 3.9 0 0 1-3.9-2.8 4 4 0 0 1-3.9-4 4 4 0 0 1 2.3-3.6A4.8 4.8 0 0 1 10 5.4z"
        fill="#00A1E0"
      />
    </svg>
  )
}

export function CalendlyIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Calendly">
      <circle cx="12" cy="12" r="12" fill="#006BFF" />
      <path
        d="M15.5 8.7a5 5 0 1 0 0 6.6l-1.3-1.3a3.2 3.2 0 1 1 0-4l1.3-1.3z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

export function PayPalIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="PayPal">
      <path
        d="M15.607 4.653H8.941L6.645 19.251H1.82L4.862 0h7.995c3.754 0 6.375 2.294 6.473 5.513-.648-.478-2.105-.86-3.722-.86m6.57 5.546c0 3.41-3.01 6.853-6.958 6.853h-2.493L11.595 24H6.74l1.845-11.538h3.592c4.208 0 7.346-3.634 7.153-6.949a5.24 5.24 0 0 1 2.848 4.686M9.653 5.546h6.408c.907 0 1.942.222 2.363.541-.195 2.741-2.655 5.483-6.441 5.483H8.714Z"
        fill="#003087"
      />
    </svg>
  )
}

// ─── Direct SimpleIcons SVG Slugs ─────────────────────────────────────────────
export const APP_SIMPLE_ICONS: Record<string, string> = {
  shopify: "shopify",
  "shopify-pos": "shopify",
  woocommerce: "woocommerce",
  bigcommerce: "bigcommerce",
  magento: "adobe",
  "amazon-seller": "amazon",
  ebay: "ebay",
  etsy: "etsy",
  prestashop: "prestashop",
  stripe: "stripe",
  "stripe-billing": "stripe",
  "stripe-payments": "stripe",
  "paypal-commerce": "paypal",
  "paypal-business": "paypal",
  calendly: "calendly",
  gumroad: "gumroad",
  "lemon-squeezy": "lemonsqueezy",
  paddle: "paddle",
  chargebee: "chargebee",
  recurly: "recurly",
  eventbrite: "eventbrite",
  "cal-com": "caldotcom",
  doodle: "doodle",
  hubspot: "hubspot",
  "hubspot-marketing": "hubspot",
  salesforce: "salesforce",
  notion: "notion",
  "google-calendar": "googlecalendar",
  "google-docs": "googledocs",
  "google-sheets": "googlesheets",
  "google-drive": "googledrive",
  airtable: "airtable",
  linear: "linear",
  jira: "jira",
  asana: "asana",
  monday: "mondaydotcom",
  clickup: "clickup",
  trello: "trello",
  coda: "coda",
  confluence: "confluence",
  miro: "miro",
  zoom: "zoom",
  loom: "loom",
  dropbox: "dropbox",
  box: "box",
  docusign: "docusign",
  typeform: "typeform",
  smartsheet: "smartsheet",
  wrike: "wrike",
  obsidian: "obsidian",
  evernote: "evernote",
  whatsapp: "whatsapp",
  telegram: "telegram",
  slack: "slack",
  teams: "microsoftteams",
  discord: "discord",
  signal: "signal",
  quickbooks: "quickbooks",
  xero: "xero",
  mailchimp: "mailchimp",
  klaviyo: "klaviyo",
  activecampaign: "activecampaign",
  "activecampaign-crm": "activecampaign",
  instagram: "instagram",
  facebook: "facebook",
  "twitter-x": "x",
  linkedin: "linkedin",
  youtube: "youtube",
  tiktok: "tiktok",
  pinterest: "pinterest",
  reddit: "reddit",
  buffer: "buffer",
  hootsuite: "hootsuite",
  "sprout-social": "sproutsocial",
  "google-ads": "googleads",
  "google-analytics": "googleanalytics",
  semrush: "semrush",
  zendesk: "zendesk",
  intercom: "intercom",
  "intercom-messenger": "intercom",
  freshdesk: "freshdesk",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  supabase: "supabase",
  postgresql: "postgresql",
  mysql: "mysql",
  sentry: "sentry",
  datadog: "datadog",
  pagerduty: "pagerduty",
  vercel: "vercel",
  aws: "amazonwebservices",
  cloudflare: "cloudflare",
  docker: "docker",
  posthog: "posthog",
  mixpanel: "mixpanel",
  segment: "segment",
  redis: "redis",
  mongodb: "mongodb",
  snowflake: "snowflake",
  launchdarkly: "launchdarkly",
  grafana: "grafana",
  prisma: "prisma",
  figma: "figma",
  figjam: "figma",
  ticktick: "ticktick",
  workday: "workday",
  odoo: "odoo",
  "odoo-pos": "odoo",
  "odoo-ecommerce": "odoo",
  sumup: "sumup",
  gusto: "gusto",
  "gusto-payroll": "gusto",
  "gusto-hr": "gusto",
  brex: "brex",
  "linkedin-sales": "linkedin",
}

// ─── Official Domain Directory for All 276 Supported Apps ─────────────────────
export const APP_DOMAINS: Record<string, string> = {
  // Commerce & POS
  "square-pos": "squareup.com",
  "clover-pos": "clover.com",
  "toast-pos": "toasttab.com",
  "lightspeed-retail": "lightspeedhq.com",
  "lightspeed-restaurant": "lightspeedhq.com",
  shopify: "shopify.com",
  "shopify-pos": "shopify.com",
  woocommerce: "woocommerce.com",
  bigcommerce: "bigcommerce.com",
  magento: "business.adobe.com",
  "amazon-seller": "sellercentral.amazon.com",
  ebay: "ebay.com",
  etsy: "etsy.com",
  "walmart-marketplace": "marketplace.walmart.com",
  prestashop: "prestashop.com",
  ecwid: "ecwid.com",
  touchbistro: "touchbistro.com",
  "revel-systems": "revelsystems.com",
  shift4: "shift4.com",
  "heartland-pos": "heartland.us",
  "stripe-billing": "stripe.com",
  "paypal-commerce": "paypal.com",
  "square-online": "squareup.com",
  calendly: "calendly.com",
  acuity: "acuityscheduling.com",
  mindbody: "mindbodyonline.com",
  fresha: "fresha.com",
  vagaro: "vagaro.com",
  "jane-app": "jane.app",
  opentable: "opentable.com",
  resy: "resy.com",
  sevenrooms: "sevenrooms.com",
  zenoti: "zenoti.com",
  booker: "booker.com",
  "square-appointments": "squareup.com",
  "vend-pos": "vendhq.com",
  sumup: "sumup.com",
  "zettle-pos": "zettle.com",
  "talech-pos": "talech.com",
  "odoo-pos": "odoo.com",
  "odoo-ecommerce": "odoo.com",
  shopware: "shopware.com",
  "big-cartel": "bigcartel.com",
  volusion: "volusion.com",
  gumroad: "gumroad.com",
  "lemon-squeezy": "lemonsqueezy.com",
  paddle: "paddle.com",
  fastspring: "fastspring.com",
  chargebee: "chargebee.com",
  recurly: "recurly.com",
  recharge: "rechargepayments.com",
  "bold-commerce": "boldcommerce.com",
  memberful: "memberful.com",
  teachable: "teachable.com",
  kajabi: "kajabi.com",
  thinkific: "thinkific.com",
  podia: "podia.com",
  booksy: "booksy.com",
  simplybook: "simplybook.me",
  setmore: "setmore.com",
  appointlet: "appointlet.com",
  picktime: "picktime.com",
  youcanbookme: "youcanbook.me",
  "cal-com": "cal.com",
  doodle: "doodle.com",
  "timely-booking": "gettimely.com",
  treatwell: "treatwell.com",
  phorest: "phorest.com",
  boulevard: "joinblvd.com",
  glofox: "glofox.com",
  pike13: "pike13.com",
  wodify: "wodify.com",
  "zen-planner": "zenplanner.com",
  ezfacility: "ezfacility.com",
  pushpress: "pushpress.com",
  fareharbor: "fareharbor.com",
  "peek-pro": "peek.com",
  checkfront: "checkfront.com",
  bokun: "bokun.io",
  rezdy: "rezdy.com",
  xola: "xola.com",
  eventbrite: "eventbrite.com",
  ticketmaster: "ticketmaster.com",
  "dice-fm": "dice.fm",
  "ticket-tailor": "tickettailor.com",
  snipcart: "snipcart.com",
  "swell-commerce": "swell.is",
  medusajs: "medusajs.com",
  "commerce-layer": "commercelayer.io",
  shipstation: "shipstation.com",
  shippo: "goshippo.com",
  easypost: "easypost.com",
  aftership: "aftership.com",

  // CRM & Sales
  hubspot: "hubspot.com",
  salesforce: "salesforce.com",
  pipedrive: "pipedrive.com",
  "zoho-crm": "zoho.com",
  "close-crm": "close.com",
  attio: "attio.com",
  apollo: "apollo.io",
  copper: "copper.com",
  "activecampaign-crm": "activecampaign.com",
  freshsales: "freshworks.com",
  keap: "keap.com",
  insightly: "insightly.com",
  outreach: "outreach.io",
  salesloft: "salesloft.com",
  gong: "gong.io",
  lemlist: "lemlist.com",
  instantly: "instantly.ai",
  "seamless-ai": "seamless.ai",
  hunter: "hunter.io",
  clay: "clay.com",
  woodpecker: "woodpecker.co",
  "reply-io": "reply.io",
  folk: "folk.app",
  streak: "streak.com",
  nimble: "nimble.com",
  capsule: "capsulecrm.com",
  "less-annoying-crm": "lessannoyingcrm.com",
  affinity: "affinity.co",
  "linkedin-sales": "linkedin.com",
  leadsquared: "leadsquared.com",
  sugarcrm: "sugarcrm.com",
  zoominfo: "zoominfo.com",

  // Productivity & Workspace
  notion: "notion.so",
  "google-calendar": "calendar.google.com",
  "google-docs": "docs.google.com",
  "google-sheets": "sheets.google.com",
  "google-drive": "drive.google.com",
  airtable: "airtable.com",
  linear: "linear.app",
  jira: "atlassian.com",
  asana: "asana.com",
  monday: "monday.com",
  clickup: "clickup.com",
  trello: "trello.com",
  basecamp: "basecamp.com",
  todoist: "todoist.com",
  coda: "coda.io",
  confluence: "atlassian.com",
  miro: "miro.com",
  zoom: "zoom.us",
  loom: "loom.com",
  dropbox: "dropbox.com",
  box: "box.com",
  docusign: "docusign.com",
  pandadoc: "pandadoc.com",
  typeform: "typeform.com",
  jotform: "jotform.com",
  smartsheet: "smartsheet.com",
  wrike: "wrike.com",
  hive: "hive.com",
  obsidian: "obsidian.md",
  evernote: "evernote.com",
  guru: "getguru.com",
  slab: "slab.com",
  "microsoft-outlook": "outlook.live.com",
  "microsoft-365": "microsoft.com",
  figjam: "figma.com",
  ticktick: "ticktick.com",
  teamwork: "teamwork.com",
  height: "height.app",

  // Messaging & Channels
  whatsapp: "whatsapp.com",
  telegram: "telegram.org",
  email: "workspace.google.com",
  "email-outlook": "outlook.com",
  sms: "twilio.com",
  slack: "slack.com",
  teams: "microsoft.com",
  discord: "discord.com",
  webchat: "livechat.com",
  signal: "signal.org",
  imessage: "apple.com",
  "google-chat": "chat.google.com",
  mattermost: "mattermost.com",
  livechat: "livechat.com",
  "crisp-chat": "crisp.chat",
  "intercom-messenger": "intercom.com",

  // Accounting & Finance
  quickbooks: "quickbooks.intuit.com",
  xero: "xero.com",
  "stripe-payments": "stripe.com",
  wave: "waveapps.com",
  freshbooks: "freshbooks.com",
  "paypal-business": "paypal.com",
  expensify: "expensify.com",
  "bill-com": "bill.com",
  "gusto-payroll": "gusto.com",
  brex: "brex.com",
  ramp: "ramp.com",
  mercury: "mercury.com",
  "square-invoices": "squareup.com",
  "zoho-books": "zoho.com",
  sage: "sage.com",
  netsuite: "netsuite.com",
  freeagent: "freeagent.com",
  melio: "meliopayments.com",
  tipalti: "tipalti.com",
  "deel-finance": "deel.com",
  dext: "dext.com",

  // Marketing & Social
  mailchimp: "mailchimp.com",
  klaviyo: "klaviyo.com",
  activecampaign: "activecampaign.com",
  instagram: "instagram.com",
  facebook: "facebook.com",
  "twitter-x": "x.com",
  linkedin: "linkedin.com",
  youtube: "youtube.com",
  tiktok: "tiktok.com",
  pinterest: "pinterest.com",
  reddit: "reddit.com",
  buffer: "buffer.com",
  hootsuite: "hootsuite.com",
  "sprout-social": "sproutsocial.com",
  later: "later.com",
  convertkit: "convertkit.com",
  brevo: "brevo.com",
  "constant-contact": "constantcontact.com",
  "google-ads": "ads.google.com",
  "meta-ads": "meta.com",
  "google-analytics": "analytics.google.com",
  semrush: "semrush.com",
  ahrefs: "ahrefs.com",
  "hubspot-marketing": "hubspot.com",

  // Customer Support
  zendesk: "zendesk.com",
  intercom: "intercom.com",
  freshdesk: "freshdesk.com",
  "help-scout": "helpscout.com",
  front: "front.com",
  gorgias: "gorgias.com",
  "google-business": "google.com",
  kustomer: "kustomer.com",
  "zoho-desk": "zoho.com",
  liveagent: "liveagent.com",
  gladly: "gladly.com",
  happyfox: "happyfox.com",
  deskpro: "deskpro.com",
  drift: "drift.com",
  "crisp-support": "crisp.chat",
  ada: "ada.cx",
  kayako: "kayako.com",

  // Dev & Engineering
  github: "github.com",
  gitlab: "gitlab.com",
  bitbucket: "bitbucket.org",
  supabase: "supabase.com",
  postgresql: "postgresql.org",
  mysql: "mysql.com",
  sentry: "sentry.io",
  datadog: "datadoghq.com",
  pagerduty: "pagerduty.com",
  vercel: "vercel.com",
  aws: "aws.amazon.com",
  cloudflare: "cloudflare.com",
  docker: "docker.com",
  firecrawl: "firecrawl.dev",
  posthog: "posthog.com",
  mixpanel: "mixpanel.com",
  segment: "segment.com",
  redis: "redis.io",
  mongodb: "mongodb.com",
  snowflake: "snowflake.com",
  bigquery: "cloud.google.com",
  launchdarkly: "launchdarkly.com",
  grafana: "grafana.com",
  prisma: "prisma.io",
  figma: "figma.com",

  // HR & Operations
  bamboohr: "bamboohr.com",
  greenhouse: "greenhouse.io",
  lever: "lever.co",
  ashby: "ashbyhq.com",
  workday: "workday.com",
  rippling: "rippling.com",
  "gusto-hr": "gusto.com",
  zenefits: "zenefits.com",
  hibob: "hibob.com",
  personio: "personio.com",
  "remote-com": "remote.com",
  justworks: "justworks.com",
  charliehr: "charliehr.com",

  // Custom Protocols
  "mcp-protocol": "modelcontextprotocol.io",
  "custom-api-webhooks": "restfulapi.net",
  "bidirectional-webhooks": "webhooks.fyi",
  "private-sql": "postgresql.org",
  "graphql-endpoints": "graphql.org",
  "soap-legacy-xml": "w3.org",
  "zapier-bridge": "zapier.com",
  "make-integromat-bridge": "make.com",
}

// ─── Main AppLogo Component ──────────────────────────────────────────────────
export interface AppLogoProps {
  id?: string
  name: string
  iconType?: string
  className?: string
}

export function AppLogo({
  id = "",
  name = "",
  iconType = "",
  className = "w-5 h-5",
}: AppLogoProps) {
  const [errorStep, setErrorStep] = useState(0)

  // 1. Direct Vector SVG Match
  const key = id.toLowerCase().trim()
  const normIcon = iconType.toLowerCase().trim()

  if (key === "whatsapp" || normIcon === "whatsapp") return <WhatsAppIcon className={className} />
  if (key === "telegram" || normIcon === "telegram") return <TelegramIcon className={className} />
  if (key === "slack" || normIcon === "slack") return <SlackIcon className={className} />
  if (key === "teams" || normIcon === "teams") return <TeamsIcon className={className} />
  if (key === "discord" || normIcon === "discord") return <DiscordIcon className={className} />
  if (key === "signal" || normIcon === "signal") return <SignalIcon className={className} />
  if (key === "imessage" || normIcon === "imessage") return <AppleMessagesIcon className={className} />
  if (key === "webchat" || normIcon === "webchat") return <WebChatIcon className={className} />
  if (key === "notion" || normIcon === "notion") return <NotionIcon className={className} />
  if (key === "github" || normIcon === "github") return <GithubIcon className={className} />
  if (key === "linear" || normIcon === "linear") return <LinearIcon className={className} />
  if (key === "jira" || normIcon === "jira") return <JiraIcon className={className} />
  if (key === "asana" || normIcon === "asana") return <AsanaIcon className={className} />
  if (key === "airtable" || normIcon === "airtable") return <AirtableIcon className={className} />
  if (key === "mailchimp" || normIcon === "mailchimp") return <MailchimpIcon className={className} />
  if (key === "zendesk" || normIcon === "zendesk") return <ZendeskIcon className={className} />
  if (key === "intercom" || normIcon === "intercom" || key === "intercom-messenger") return <IntercomIcon className={className} />
  if (key === "figma" || normIcon === "figma") return <FigmaIcon className={className} />
  if (key === "supabase" || normIcon === "supabase") return <SupabaseIcon className={className} />
  if (key === "google-calendar" || normIcon === "google_calendar") return <GoogleCalendarIcon className={className} />
  if (key === "google-docs" || normIcon === "google_docs") return <GoogleDocsIcon className={className} />
  if (key === "google-sheets" || normIcon === "google_sheets") return <GoogleSheetsIcon className={className} />
  if (key === "google-drive" || normIcon === "google_drive") return <GoogleDriveIcon className={className} />
  if (key === "google-business" || normIcon === "google") return <GoogleBusinessIcon className={className} />
  if (key === "square-pos" || key === "square-online" || key === "square-appointments" || key === "square-invoices") return <SquarePosIcon className={className} />
  if (key === "clover-pos") return <CloverPosIcon className={className} />
  if (key === "shopify" || key === "shopify-pos") return <ShopifyIcon className={className} />
  if (key === "stripe" || key === "stripe-billing" || key === "stripe-payments") return <StripeIcon className={className} />
  if (key === "hubspot" || key === "hubspot-marketing") return <HubSpotIcon className={className} />
  if (key === "salesforce") return <SalesforceIcon className={className} />
  if (key === "quickbooks") return <QuickBooksIcon className={className} />
  if (key === "xero") return <XeroIcon className={className} />
  if (key === "woocommerce") return <WooCommerceIcon className={className} />
  if (key === "calendly") return <CalendlyIcon className={className} />
  if (key === "paypal-commerce" || key === "paypal-business") return <PayPalIcon className={className} />
  if (key === "mcp-protocol" || normIcon === "mcp") return <McpServerIcon className={className} />
  if (key.includes("custom-api") || normIcon === "custom_api") return <CustomApiIcon className={className} />

  // 2. Tiered Sources for Official SVG / PNG Logo
  const domain = APP_DOMAINS[key] || (key.replace(/-pos$/, "").replace(/-crm$/, "") + ".com")
  const slug = APP_SIMPLE_ICONS[key]

  const sources: string[] = []
  if (slug) {
    sources.push(`https://cdn.simpleicons.org/${slug}`)
  }
  sources.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`)
  sources.push(`https://unavatar.io/${domain}`)

  // Fallback Monogram
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || "N"

  if (errorStep >= sources.length) {
    return (
      <div className={`${className} rounded-md bg-black/5 border border-black/10 flex items-center justify-center font-mono text-[10px] font-bold text-black/70 select-none`}>
        {initials}
      </div>
    )
  }

  const logoSrc = sources[errorStep]

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoSrc}
      alt={`${name} official logo`}
      loading="lazy"
      decoding="async"
      width={24}
      height={24}
      onError={() => setErrorStep((prev) => prev + 1)}
      className={`${className} object-contain rounded-xs transition-opacity duration-200`}
    />
  )
}

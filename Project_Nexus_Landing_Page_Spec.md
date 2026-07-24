# Project Nexus Landing Page Specification

**Document type:** Product marketing and implementation specification  
**Owner:** Westside Union  
**Status:** Phase 1 build specification  
**Audience:** Product, design, copywriting, development, sales  
**Version:** 1.1  
**Date:** July 23, 2026

## 0. Template Adoption Directive

The user-supplied folder named:

```text
agentic-build-and-orchestrate-ai-agents-while-you-sleep/
```

is the required visual and component foundation for the Phase 1 landing page. The folder will be placed under the Project Nexus repository root before implementation begins in Antigravity.

The coding agent must inspect and reuse this template before creating new site structure. It must not initialize a competing starter, discard the template, or recreate its visual system from scratch.

### 0.1 What to preserve

- Warm off-white background and restrained black/neutral palette
- Large, lightweight IBM Plex Sans-style display typography
- Geist-based interface typography and monospace accents
- Sticky/mobile navigation behavior
- Rounded bento-card system
- Subtle borders, glass treatments, and generous spacing
- Reveal-on-scroll patterns where they improve comprehension
- Existing accessible Radix/shadcn-style UI primitives
- Existing responsive breakpoints and component patterns
- The polished relationship between typography, cards, imagery, and whitespace

### 0.2 What to replace

- All “Agentic” branding, metadata, favicons, URLs, and copyright text
- Developer-platform positioning and SDK-focused messaging
- Agent-framework and orchestration language visible to customers
- Unsupported metrics such as task counts, uptime, countries, integrations, or execution totals
- Unsupported compliance claims such as SOC 2, GDPR, HIPAA readiness, or ISO certification
- Existing price plans and feature claims
- Demo email-capture behavior unless connected to the approved Nexus consultation workflow
- External template imagery and video unless Westside Union confirms usage rights and self-hosts or intentionally approves the dependency

No license file was found in the supplied archive during specification review. Before public launch, Westside Union must confirm the right to reuse the source, fonts, video, images, icons, and other assets. Template assets hosted on third-party blob URLs must not be treated as durable production assets.

### 0.3 Adaptation rule

Preserve the template’s design DNA, not its original business proposition. Nexus content, navigation, proof, pricing, industry stories, accessibility requirements, and conversion path in this specification are authoritative.

## 1. Purpose

The first Project Nexus website is a public product showcase and lead-generation experience. It must explain the offer to non-technical local business owners, demonstrate industry relevance, establish predictable pricing, and create a clear path to request a consultation.

This release has **no customer login, account registration, dashboard link, or self-service configuration**. Those capabilities belong to Phase 2. The marketing site may collect contact information through an inquiry form, but must not imply that the platform is available for instant self-service activation.

## 2. Product Positioning

### 2.1 Category

Project Nexus is a **managed AI assistant for business owners**, built and operated by Westside Union.

### 2.2 Core promise

> One assistant that knows your business, works through the channels you already use, and helps you stay ahead without adding another employee or complicated app.

### 2.3 What Nexus sells

- More time for the owner
- Faster responses to customers
- Fewer missed follow-ups and forgotten tasks
- Consistent daily and weekly business routines
- Predictable monthly cost
- A managed service with human support

### 2.4 What the site must not lead with

Do not lead with model names, agent frameworks, tokens, RAG, MCP, vector databases, orchestration, or infrastructure. OpenClaw, Hermes Agent, Pi Agent, local models, and cloud models are implementation details.

### 2.5 Brand relationship

Use the relationship consistently:

> Project Nexus  -  a Westside Union product.

Project Nexus is the product. Westside Union is the company that designs, deploys, supports, and extends it.

## 3. Primary Audiences

### 3.1 Launch audience

Owner-operated and locally managed businesses, initially:

- Barbershops and salons
- Restaurants
- Coffee shops and cafés
- Automotive dealerships and service businesses
- Marketing and creative agencies
- Trades and home-service businesses
- Clinics and professional offices

### 3.2 Audience mindset

The launch customer is busy, cost-sensitive, and not interested in managing technology. They may already use WhatsApp, SMS, email, Google Business Profile, a booking tool, a POS system, and a calendar. Their concerns include:

- “Will this be difficult to use?”
- “Will the AI bill surprise me?”
- “Will it make mistakes with my customers?”
- “Does it work with the tools I already have?”
- “Who fixes it when something changes?”
- “How much time or money will it actually save?”

The page must answer these concerns before explaining advanced features.

## 4. Site Architecture

### 4.1 Launch routes

1. `/`  -  main product landing page
2. `/industries`  -  industry overview
3. `/industries/restaurants`
4. `/industries/barbershops-salons`
5. `/industries/coffee-shops`
6. `/industries/automotive`
7. `/industries/agencies`
8. `/industries/trades`
9. `/pricing`
10. `/how-it-works`
11. `/contact`
12. `/privacy`
13. `/terms`

If launch capacity is limited, ship the home page, pricing, how it works, contact, privacy, and the first three industry pages. Other industry pages may be staged as drafts.

### 4.2 Global navigation

- Logo: Project Nexus by Westside Union
- How It Works
- Industries
- Pricing
- FAQ
- Primary CTA: **Book a consultation**

Do not include:

- Log in
- Register
- Open dashboard
- Start free trial
- Developer console

## 5. Home Page Content Specification

### 5.0 Template-to-Nexus page mapping

Adapt the template in this order:

- Intro animation: shorten substantially or remove; the business value must appear immediately.
- Hero video/visual: use a licensed or original Nexus business-assistant scene; never retain the original remote video by default.
- Hero metrics: show verified Nexus proof only. Until real proof exists, use “Managed setup,” “Predictable plans,” and “Human support” instead of invented numbers.
- Platform bento section: map to “One assistant, many jobs.”
- Agent cards: map to industry toolkit cards for restaurants, barbershops/salons, coffee shops, automotive, agencies, and trades.
- Four-step workflow: map to discovery, configuration, familiar messaging, and ongoing improvement.
- Integration showcase: show configured channels and business-system connections with availability labels.
- Security section: show owner controls, approvals, usage limits, data separation, and managed configuration; do not use certification badges without evidence.
- Developer-experience section: remove from the customer landing page.
- Original pricing section: replace with the Nexus pricing framework in this specification.
- Original CTA/footer: replace with the consultation CTA and “Project Nexus - a Westside Union product.”

### 5.1 Hero

**Eyebrow:** Your business. One smart assistant.  
**Headline:** Get help running your business  -  without another complicated app.  
**Supporting copy:** Nexus works through the messaging channels you already use. It can organize tasks, follow up, answer routine questions, prepare updates, and alert you when something needs attention. Westside Union sets it up and keeps it working.  
**Primary CTA:** Book a consultation  
**Secondary CTA:** See what Nexus can do  
**Trust line:** Predictable plans. Managed setup. Human support.

The hero visual should show one conversation producing several business outcomes, not a technical architecture diagram.

### 5.2 Problem-to-outcome band

Present four owner problems:

- Missed messages become timely replies.
- Forgotten follow-ups become tracked tasks.
- Scattered business information becomes one knowledgeable assistant.
- Slow days and unusual activity become proactive suggestions.

### 5.3 “One assistant, many jobs”

Explain that the owner communicates with one Nexus identity. Nexus may use different tools behind the scenes, but the customer has one conversation, one history, and one support relationship.

Example jobs:

- Add and monitor a task
- Prepare a daily summary
- Draft a customer response
- Remind the owner about unfinished work
- Review business trends
- Suggest a promotion for a slow period
- Route a booking or service request
- Prepare a response to a Google review for approval

### 5.4 “Works where you already work”

Show supported and planned channels carefully:

- WhatsApp
- SMS/text messaging
- Email
- Web messaging
- Telegram where appropriate

Use status labels such as “available,” “configured per deployment,” or “planned.” Never claim universal iMessage, POS, or Google Business Profile support until the exact integration has been validated.

### 5.5 Industry selector

Use cards that begin with an industry problem, not a feature list:

- Restaurants: Keep up with inquiries, follow-ups, reviews, and daily operations.
- Barbershops & salons: Reduce missed messages and help protect the appointment book.
- Coffee shops: Stay responsive while your team focuses on service.
- Automotive: Follow up with leads and service requests consistently.
- Agencies: Reduce reporting, follow-up, and administrative work.
- Trades: Capture inquiries and keep quotes and callbacks moving.

Each card links to an industry page.

### 5.6 Proactive assistance

Headline: **Nexus doesn’t only wait for instructions.**

Explain that approved data and schedules can generate owner notifications:

- “Wednesday afternoons have been slower than usual. Would you like a promotion drafted?”
- “Three customer inquiries still need a response.”
- “Tomorrow’s appointments include two customers who have not confirmed.”
- “A weekly owner summary is ready.”

State that proactive actions depend on connected systems and owner-approved rules.

### 5.7 Managed service

Explain Westside Union’s role:

- Business discovery and setup
- Tool and channel connections
- Knowledge preparation
- Permissions and approval rules
- Monitoring and maintenance
- Usage controls
- Ongoing improvements

The customer should understand that Nexus is not a do-it-yourself chatbot builder.

### 5.8 How it works

1. **Tell us how your business operates.**
2. **Westside Union configures your Nexus assistant.**
3. **Use Nexus in a familiar messaging channel.**
4. **Receive tasks, summaries, reminders, and approved proactive suggestions.**
5. **Expand with integrations and industry tools when ready.**

### 5.9 Pricing preview

Pricing must be presented as an initial commercial framework, subject to scope confirmation.

#### Nexus Cloud

- From **CAD $299/month**
- Setup from **CAD $500**
- One owner-focused assistant
- One primary messaging channel
- Business knowledge setup
- Core task and summary workflows
- Included AI usage allowance
- Monitoring and managed updates

#### Nexus Managed

- From **CAD $499/month**
- Setup from **CAD $1,000**
- More workflows and integrations
- Proactive owner notifications
- Expanded task automation
- Monthly optimization
- Higher included usage

#### Nexus Edge

- From **CAD $599/month**
- Setup quoted after discovery
- Managed local AI appliance
- Local business knowledge and selected local workloads
- Cloud fallback when approved
- Remote monitoring, updates, and replacement policy

#### Nexus Enterprise

- Custom setup and monthly plan
- Multiple locations, departments, agents, or private infrastructure
- Advanced permissions, reporting, integrations, and service levels

Pricing notes:

- Exact pricing depends on channels, integrations, locations, workflow complexity, voice usage, and hardware.
- Voice, SMS, paid third-party services, and custom integrations may be billed separately.
- Do not expose raw token pricing to the customer. Use included AI usage and clear limits.
- Do not promise that local AI eliminates all external usage; some workflows may still require cloud services.

### 5.10 ROI section

Avoid universal savings promises. Offer a transparent estimator based on customer-provided inputs:

**Monthly value estimate**

`hours saved × owner/staff hourly value + recovered appointments/leads × contribution value - Nexus monthly fee`

Illustrative scenarios must be labeled as examples:

- Five hours saved per week at CAD $25/hour is approximately CAD $500/month in time value.
- Recovering four CAD $50 appointments is CAD $200 in gross revenue before costs.
- Responding to missed leads faster may increase conversions, but results depend on lead volume and process.

The ROI calculator should ask for:

- Hours spent weekly on repetitive work
- Approximate hourly value
- Missed inquiries per month
- Average sale or appointment value
- No-show rate where relevant

### 5.11 Trust and control

Include:

- Owner-approved permissions
- Human approval for sensitive actions
- Activity history
- Monthly usage limits and alerts
- Customer data separation
- Managed configuration by Westside Union
- Local deployment option where appropriate

Avoid unsupported compliance badges or absolute security claims.

### 5.12 Final CTA

**Headline:** Show us the work that keeps following you home.  
**Copy:** We’ll identify the first few tasks Nexus can take off your plate and recommend a practical starting package.  
**CTA:** Book a consultation  
**Alternative:** Request a Nexus assessment

## 6. Industry Page Template

Each industry page follows the same content contract.

### 6.1 Required sections

1. Industry-specific hero
2. Five owner problems
3. Ready-to-use toolkit
4. Integrations and prerequisites
5. Day-in-the-life example
6. Proactive notifications
7. Human approval boundaries
8. ROI method and illustrative scenario
9. Recommended starting package
10. FAQ
11. Consultation CTA

### 6.2 Restaurant toolkit

**Ready quickly**

- Business hours, menu, policy, and FAQ knowledge
- Inquiry triage and response drafting
- Reservation or ordering handoff links
- Daily owner summary
- Task and follow-up tracking
- Review-response drafts
- Promotion and slow-period suggestion drafts
- Staff or supplier reminder workflows

**Requires integration/discovery**

- POS sales reporting
- Inventory data
- Reservation platform
- Delivery platform
- Loyalty program
- Google Business Profile publishing

**Example owner outcomes**

- Fewer unanswered messages
- Less time repeating common information
- Consistent review responses
- Earlier visibility into slow periods or unfinished tasks

### 6.3 Barbershop and salon toolkit

**Ready quickly**

- Location, hours, services, pricing, and policy knowledge
- Booking-system handoff
- Appointment confirmation and follow-up workflows
- Hiring, complaint, and collaboration intake
- Review-response drafts
- Daily/weekly owner summary
- Content and promotion drafts

**Requires integration/discovery**

- Booking API or approved automation
- Customer consent and messaging rules
- POS or sales reporting
- Loyalty data
- Google Business Profile publishing

### 6.4 Coffee shop toolkit

**Ready quickly**

- Hours, menu, allergen-policy, location, and FAQ knowledge
- Catering and large-order intake
- Customer inquiry triage
- Review-response drafts
- Shift-opening/closing task templates
- Daily summary and slow-period suggestions
- Promotion drafts

**Requires integration/discovery**

- POS reporting
- Inventory or purchasing system
- Loyalty platform
- Online ordering
- Delivery services

### 6.5 Automotive toolkit

- Sales and service inquiry triage
- Callback and appointment-request capture
- Inventory and dealership FAQ knowledge
- Follow-up reminders
- Manager summaries
- Review-response drafts
- CRM handoff and unanswered-lead monitoring where integrations permit

### 6.6 Agency toolkit

- Client onboarding checklist
- Meeting and action summaries
- Draft reports and proposals
- Follow-up tracking
- Recurring task templates
- Internal knowledge search
- Owner pipeline summary

### 6.7 Trades toolkit

- Missed-call or inquiry capture
- Job-intake questions
- Quote follow-up
- Scheduling handoff
- Customer update drafts
- Review-response drafts
- Daily dispatch or callback summary

## 7. FAQ Content

### Is Nexus another chatbot? Or another ChatGPT or Claude?

No. Nexus is a managed business assistant configured around your information, tasks, channels, and approval rules.

### Do I need to learn a new app?

No. Daily use is designed around familiar messaging channels. A web control center will be introduced later for task history, billing, usage, and account management.

### Can Nexus connect to my POS or booking system?

Often, but availability depends on the system’s API, permissions, and plan. Westside Union confirms integration scope during discovery.

### Does Nexus replace an employee?

Nexus is designed first to support the owner and reduce repetitive work. It does not replace judgment, hospitality, skilled service, or accountable staff.

### Will my bill change based on tokens?

Plans include a defined AI usage allowance, alerts, and limits. Paid channels and third-party services are explained separately.

### Can Nexus run locally?

Yes, selected packages can include a managed local appliance. Local models are recommended when privacy, predictable usage, or local-system access justifies the added hardware and support.

### Who configures the AI?

Westside Union manages models, frameworks, routing, and advanced settings. Customers control business-level preferences, approvals, notification choices, and billing - not underlying technical configuration.

### Can Nexus send messages automatically?

Only within configured permissions, platform rules, and consent requirements. Sensitive or high-risk actions require approval.

### What happens if an integration stops working?

Managed plans include monitoring and maintenance within the agreed scope. Third-party platform changes may require additional work.

### How quickly can we launch?

A basic knowledge-and-messaging deployment can launch faster than a system requiring POS, booking, CRM, or custom API integration. Timing is confirmed after discovery.

## 8. Lead Capture

The consultation form should collect:

- Name
- Business name
- Email
- Phone (optional)
- Industry
- Number of locations
- Preferred contact channel
- Biggest repetitive problem
- Current POS, booking, CRM, or messaging tools
- Interest in cloud, local, or “recommend for me”
- Consent checkbox

Do not request API keys, passwords, customer records, or sensitive documents through the public form.

## 9. Content and Design Requirements

- Mobile-first layout
- Plain language at approximately Grade 8 reading level
- Strong contrast and accessible focus states
- No autoplay video or audio
- No fake chat animation that implies unsupported capabilities
- Use real or clearly labeled illustrative examples
- Optimize for local SEO and industry intent
- Include structured data for organization, product/service, FAQ, and breadcrumbs where valid
- Meet WCAG 2.2 AA for the implemented experience
- Make pricing and limitations readable without opening accordions
- Respect `prefers-reduced-motion` and provide a usable static experience without animation
- Avoid making visitors wait for an intro animation before they can understand the product or use navigation
- Use the template’s motion as progressive enhancement, not as a requirement for content visibility

## 10. Technical Requirements

- Start from the supplied Next.js template and preserve its package manager, lockfile, TypeScript settings, Tailwind version, and component library unless a documented incompatibility requires a change
- Remove unused template dependencies and components only after confirming that the landing page and future dashboard do not need them
- Keep the customer dashboard as a separate authenticated application surface or route group; do not expose it during Phase 1
- Static or server-rendered marketing site
- Public repository contains no secrets or customer data
- Environment variables for form endpoint, analytics, and anti-spam configuration
- Privacy-respecting analytics
- Server-side validation for lead forms
- Rate limiting and spam protection
- SEO metadata and social cards per page
- Automated link, accessibility, and performance checks
- Target Core Web Vitals in the “good” range

## 11. Analytics and Success Metrics

Track:

- Qualified consultation submissions
- CTA click-through rate
- Pricing-page engagement
- Industry-page conversion rate
- Form completion and abandonment
- Source/medium
- Frequently viewed FAQ topics

Do not treat page traffic alone as success. The primary launch metric is qualified discovery conversations.

## 12. Roadmap

### Phase 1A  -  Product showcase

- Home, how it works, pricing, contact, legal pages
- Restaurant, barbershop/salon, and coffee-shop pages
- Consultation form
- No login or dashboard links

### Phase 1B  -  Validation

- Case studies
- ROI estimator
- Additional industry pages
- Content experiments based on sales conversations

### Phase 2  -  Customer control centre

- Add a dashboard link only after authentication, onboarding, billing, permissions, and support processes are production-ready.

### Phase 3  -  Marketplace and self-service discovery

- Browse available industry tools and add-ons
- Purchases still follow approval and managed deployment rules

## 13. Acceptance Criteria

- The implementation demonstrably uses the supplied template’s visual system and reusable components.
- All Agentic branding, claims, plans, metadata, external destinations, and original product copy are removed.
- Third-party template assets are either rights-cleared and intentionally retained or replaced with approved Nexus assets.
- Visitors can explain Nexus in one sentence after viewing the hero.
- Each launch industry has a concrete problem, toolkit, integration boundary, and ROI method.
- Pricing communicates predictable plans without promising unlimited usage.
- No login, registration, or dashboard link appears in the Phase 1 release.
- All forms are secure, validated, accessible, and connected to an owned lead workflow.
- No unsupported integration or savings claim is published.
- The site identifies Project Nexus as a Westside Union product.

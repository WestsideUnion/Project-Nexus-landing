# Project Nexus Developer Build Brief  -  Updated

**Document type:** Implementation brief and phased delivery plan  
**Owner:** Westside Union  
**Status:** Authoritative build brief  
**Version:** 2.1  
**Date:** July 23, 2026

## 1. Executive Decision

Project Nexus will be built as a gateway-first managed AI platform for business owners. Customers experience one Nexus assistant through familiar messaging channels. Behind that identity, Nexus can use OpenClaw, Hermes Agent, Pi Agent, local models, cloud models, and business integrations through replaceable adapters.

The initial product is owner-focused. It helps a local business owner delegate tasks, receive summaries, follow up consistently, and notice issues earlier. It is not positioned as an employee-replacement system and is not a self-service agent builder.

## 2. Decisions Added in Version 2.0

1. **Super-admin configuration:** Westside Union configures frameworks, models, routes, provider credentials, integrations, prompts, permissions, budgets, and deployment targets.
2. **Customer simplicity:** Customers never configure OpenClaw, Hermes, Pi, LLMs, API keys, local models, or routing.
3. **Phase 1 is the landing page:** It showcases the product, pricing, use cases, and industry toolkits. It contains no login, registration, or dashboard link.
4. **Phase 2 is the dashboard:** It becomes a control centre for tasks, activity, approvals, subscriptions, usage, billing, notifications, and feature requests.
5. **The Nexus Gateway remains central:** Channels, dashboard, agents, models, POS systems, APIs, memory, billing, and notifications connect through Nexus-owned services.
6. **POS and business APIs connect through the gateway:** Agent frameworks do not own direct long-term integration architecture.
7. **Proactive owner notifications:** Approved insights and reminders are delivered to the owner through WhatsApp, SMS, email, or another configured channel.
8. **Centralized API/model management:** Provider accounts, customer-owned keys, local inference, routing, metering, budgets, and fallbacks are managed centrally.
9. **Local hardware is recommended selectively:** Nexus Edge is for privacy, predictable local workloads, local-network access, or sufficiently steady usage - not a mandatory component of every package.
10. **Cloud migration is planned:** A Mac mini is acceptable for development and internal testing. Paying customers depend on a managed cloud gateway with production reliability; customer agents may run on managed VPS or on-premises hardware.
11. **User-supplied UI template:** The `agentic-build-and-orchestrate-ai-agents-while-you-sleep/` Next.js folder will be placed under the repository root and used as the Phase 1 landing-page foundation and Phase 2 dashboard design foundation.
12. **Template adaptation, not content reuse:** Nexus retains the template’s layout, typography, cards, motion patterns, responsive structure, and UI primitives while replacing its branding, claims, product messaging, prices, metrics, metadata, links, and unapproved external assets.

## 3. Product Scope

### 3.1 Initial customer

- Local business owner
- One or a small number of locations
- Uses familiar messaging daily
- Wants help with repetitive administrative and follow-up work
- Does not want technical configuration or unpredictable bills

### 3.2 Initial jobs

- Capture and organize owner requests
- Create, schedule, and track tasks
- Prepare daily and weekly summaries
- Draft routine communications
- Track follow-ups and unfinished work
- Search approved business knowledge
- Produce proactive, evidence-backed suggestions
- Ask for approval before sensitive actions
- Show predictable usage and subscription status

### 3.3 Out of scope for initial release

- Fully autonomous financial decisions
- Unsupervised public communications
- Universal POS compatibility
- A marketplace with instant third-party code installation
- Enterprise multi-region infrastructure
- Customers editing framework/model settings
- A promise that local AI eliminates all cloud or third-party charges

## 4. System Context

```text
Owner / Staff / Customer
 WhatsApp | SMS | Email | Web
              |
       Channel Adapters
              |
        Nexus Gateway
              |
 Identity | Tenant | Policy | Tasks | Usage | Audit
              |
 Memory | Knowledge | Workflows | Approvals
              |
       Capability Router
              |
 Agent Adapters        Model Routes
 OpenClaw              Local inference
 Hermes Agent          Cloud providers
 Pi Agent              Customer-owned provider
              |
 Integration Adapters
 POS | Booking | CRM | Calendar | Reviews | Files
              |
       Notification Service
 WhatsApp | SMS | Email | Dashboard
```

## 5. Gateway Responsibilities

The gateway is a set of Nexus-owned services, not merely a reverse proxy.

It owns:

- Authentication and channel identity
- Tenant and location isolation
- Conversation normalization
- Task and workflow state
- Policy and approval enforcement
- Central memory and knowledge retrieval
- Capability and model routing
- Usage metering and credit enforcement
- Integration access
- Notifications
- Audit events
- Dashboard APIs

It does not permanently store business truth inside a stateless web process. Durable state lives in managed data services.

## 6. One Assistant Across Multiple Frameworks

Most local businesses should begin with one framework when it covers the required capability. Multiple frameworks are justified only when:

- A channel or capability exists only in one framework
- A long-running workflow benefits from another framework
- A specialist execution environment materially improves reliability
- Isolation or deployment constraints require separation
- Migration or fallback is being tested

The customer still sees one assistant because:

- Nexus owns the channel identity
- Nexus stores authoritative conversation and task context
- Nexus injects the minimum approved context into the selected adapter
- Adapter results are normalized into a common response contract
- Nexus applies one tone, policy, approval, and notification layer
- Relevant outcomes return to central memory and audit storage

## 7. Routing

### 7.1 Deterministic routing first

Python logic selects a capability using:

- Tenant configuration
- Requested task type
- Available integrations
- Permissions
- Risk level
- Local/cloud policy
- Budget
- Provider/adapter health
- Data residency
- Modality and input size

An LLM classifier is a constrained fallback for ambiguous natural language. It cannot grant capabilities or bypass policy.

### 7.2 Model routing

Models are selected independently from agent frameworks where possible.

Examples:

- Simple FAQ grounded in approved knowledge -> local or cost-efficient model
- Structured schedule or explicit task -> deterministic workflow
- Complex drafting -> approved cloud model
- Sensitive local document lookup -> local model where deployment permits
- Unsupported local modality or low confidence -> approved cloud fallback

## 8. Central Memory

Nexus memory is authoritative. It stores:

- Conversation summaries
- User and business preferences
- Sourced business facts
- Task and workflow state
- Knowledge references
- Approval history
- Evidence-linked insights

OpenClaw, Hermes, or Pi memory may support execution but must be reconstructable. Do not allow framework memory to become the only copy of business context.

## 9. Centralized Provider and Usage Management

### 9.1 Supported commercial arrangements

- Westside Union-managed provider account
- Customer-owned API key
- Local model on Nexus Edge
- Hybrid route using local first and approved cloud fallback

### 9.2 Rules

- Credentials live in a secret manager.
- Each tenant receives an allowed route policy.
- All paid calls emit usage events before billing reconciliation.
- Credits are shown as an understandable allowance, not raw token anxiety.
- Soft alerts, approval thresholds, and hard limits are supported.
- No fallback may violate privacy or billing boundaries.
- Customer ChatGPT subscriptions are not assumed to include API use.

## 10. POS and Business Integrations

Integrations connect through the Nexus integration layer.

Flow:

```text
POS or business system
        |
Verified webhook / scheduled sync / approved API call
        |
Nexus Integration Adapter
        |
Normalized event or action
        |
Gateway policy, task, memory, insight, and audit services
        |
Approved agent/model capability
```

Agent frameworks receive only the normalized data and tools needed for the task. This prevents vendor lock-in and creates one permission, audit, and metering system.

Each integration must define:

- Available API and plan requirements
- OAuth or credential ownership
- Data categories
- Read/write actions
- Consent and retention
- Rate limits
- Webhook verification
- Failure/retry behavior
- Last successful sync
- Customer-facing limitations

## 11. Proactive Owner Notifications

Proactive assistance begins with rules and schedules:

- Unanswered inquiries
- Tasks approaching deadline
- Appointment confirmation gaps
- Review-response backlog
- Sales or booking variance
- Inventory threshold where reliable data exists
- Weekly owner summary

Workflow:

1. Integration or schedule produces a signal.
2. Nexus calculates the underlying fact.
3. Policy checks data sufficiency and notification eligibility.
4. An LLM may explain or draft a suggestion.
5. Notification service applies quiet hours and channel preference.
6. Owner receives WhatsApp, SMS, email, or dashboard message.
7. Reply creates a task or approval through the gateway.

Suggestions must state the evidence and avoid overstating causality.

## 12. Dashboard

The Phase 2 dashboard is a business control centre.

It will reuse the landing page’s Nexus-adapted design tokens and appropriate template UI primitives. It will not reuse the cinematic intro, hero video, glitch/WebGL treatment, or marketing-heavy motion. The result should feel visually related but operationally calmer.

Minimum modules:

- Home summary
- To do, scheduled, processing, approval, blocked, completed, and cancelled task queues
- Activity history
- Approvals
- Insights
- Usage and allowance
- Subscription and billing
- Notifications
- Team roles
- Connection status and change requests
- Support

Customers can change business-level preferences, not technical configuration.

## 13. Super-Admin Console

Required capabilities:

- Tenant onboarding
- Deployment inventory
- Adapter and capability selection
- Provider and model route policies
- Credential references
- Budget and fallback policy
- Integration setup and tests
- Health and incident response
- Audit and support access
- Billing adjustments
- Feature flags
- Rollback and key rotation

## 14. Deployment Topology

### 14.1 Development

A developer Mac mini may run:

- Gateway
- Database
- Queue/cache
- Vector/search service
- Local inference
- One or more agent frameworks
- Dashboard
- Monitoring

Use secure tunnels only for controlled testing. Do not make a home/office Mac mini the long-term public gateway for paying customers.

### 14.2 Pilot

For internal or trusted pilots:

- Gateway may run on the Mac mini if uptime expectations are explicitly limited.
- Backups, monitoring, HTTPS, access control, and recovery tests are mandatory.
- Production-like staging should begin in a managed VPS/cloud environment.

### 14.3 Paying customers

Recommended:

- Central gateway in managed cloud/VPS infrastructure
- Managed database, backups, monitoring, and secret storage
- Customer agent deployment on isolated VPS or Nexus Edge
- Secure outbound connection from Nexus Edge to the gateway
- No unsolicited inbound access to the customer network

### 14.4 Cloud migration triggers

Move the shared gateway before or when:

- The first paying customer requires dependable service
- External customers rely on inbound messaging
- Outages affect contractual commitments
- A stable public IP, managed TLS, backup, or monitoring is needed
- Multiple tenants are onboarded
- Home/office power or internet becomes a business risk
- Scaling, isolation, or data-residency needs exceed the local environment

Do not wait for high traffic. Reliability and security, not CPU load, are the main trigger.

## 15. Local Hardware Recommendation

Do not force a Mac mini or AI mini PC into every package.

Recommend Nexus Edge when:

- Sensitive data should stay on-site
- Local network/POS access is required
- Workload is steady enough to justify hardware
- Internet resilience matters
- The customer accepts a managed appliance lifecycle
- A suitable local model meets the quality requirement

Use cloud-first when:

- The workload is light or variable
- The best model quality is required
- Integrations are already cloud services
- The customer wants the lowest entry cost
- On-site support would be disproportionate

Use hybrid when routine, private, or high-volume work can run locally and approved cloud models add value for harder tasks.

Nexus Edge requirements:

- Device identity and certificate
- Disk encryption
- Automatic updates and rollback
- Remote health monitoring
- Encrypted backup
- Outbound-only secure tunnel
- Resource and temperature monitoring
- Replacement and return process
- Secure wipe at end of service

## 16. Security and Safety

- Tenant isolation
- Least privilege
- Human approval for sensitive actions
- Encrypted secrets
- Audit logs
- Signed webhooks
- Input and output policy checks
- Prompt-injection-aware tool boundaries
- Spending limits
- Backup and recovery
- Software bill of materials and provenance
- Version pinning and rollback
- Data retention and deletion

## 17. Phased Build Plan

### Phase 0  -  Decisions and foundations

- Contracts, repository, CI, environments, auth, tenant model, observability

### Phase 1  -  Landing page

- Adapt the supplied Next.js template into the Nexus marketing site
- Replace Agentic branding, copy, metadata, pricing, proof claims, links, and external demo assets
- Preserve the warm neutral design system, bento layout, typography hierarchy, and appropriate reveal patterns
- Marketing site and industry pages
- Pricing framework
- Consultation lead flow
- Privacy and terms
- No login/dashboard links

### Phase 1.5  -  Gateway pilot

- One channel
- One agent adapter
- One local or cloud model route
- Central conversation/task state
- Metering, limits, audit, and basic approvals

### Phase 2  -  Owner dashboard

- Extract or formalize shared Nexus design tokens and reusable template components
- Read-only summary, activity, usage, and billing
- Task board and scheduling
- Approvals and notifications
- Connection status

### Phase 3  -  Integrations and proactive insights

- POS/booking/CRM adapters
- Evidence-backed alerts
- Owner digests
- Industry playbooks

### Phase 4  -  Nexus Edge and voice

- Managed local appliance
- Local/cloud route policy
- Voice conversation where business value and consent justify it

### Phase 5  -  Multi-location and enterprise

- Department roles
- Advanced policy
- Higher availability
- Enterprise integrations and reporting

## 18. Initial Engineering Backlog

1. Place and inspect the supplied template under the project root; confirm source and asset reuse rights.
2. Establish the monorepo/CI direction without creating a second conflicting frontend starter.
3. Inventory reusable template components, design tokens, remote assets, original claims, and brand strings.
4. Adapt the public Nexus landing page without dashboard links.
5. Define tenant, identity, task, approval, usage, memory, and audit contracts.
6. Implement consultation lead endpoint with validation and anti-spam.
7. Build gateway authentication and tenant resolution.
8. Implement idempotent inbound message contract.
9. Add conversation and task persistence.
10. Add policy and approval service.
11. Add usage ledger, limits, and cost normalization.
12. Implement one channel adapter.
13. Implement one agent adapter.
14. Implement one cloud model adapter and one local inference adapter.
15. Add deterministic capability router.
16. Add central memory interface and first storage implementation.
17. Add structured logs, traces, metrics, and health checks.
18. Implement outbound notification service.
19. Build the dashboard shell, summary, task board, and activity using the shared Nexus design system.
20. Add billing, realtime task status, and one end-to-end industry pilot.

## 19. Pilot Acceptance Scenario

A barbershop owner sends a WhatsApp message:

> Remind me tomorrow morning to review this week’s unconfirmed appointments, and draft a message for each customer.

Expected behavior:

1. Channel webhook is verified and mapped to the tenant/owner.
2. Gateway creates a scheduled task.
3. Policy marks customer outreach as draft-only.
4. At the scheduled time, booking data is requested through an approved adapter.
5. Nexus identifies unconfirmed appointments deterministically.
6. A model drafts messages using approved tone and policy.
7. Owner receives a summary and approval request in WhatsApp.
8. Approved messages are sent only through the authorized channel.
9. Task, approval, messages, usage, and audit events appear in the dashboard.
10. Framework and model identities remain invisible to the owner.

## 20. Build Completion Criteria

The first production pilot is ready only when:

- One end-to-end owner workflow succeeds reliably
- Cross-tenant access tests pass
- Usage and hard limits are accurate
- Sensitive actions require approval
- Failures produce understandable owner states
- Backups and recovery are tested
- The gateway can switch an adapter without changing the customer experience
- The owner can use Nexus without opening the dashboard
- Westside Union can support the deployment through the super-admin console and runbooks
- Landing and dashboard surfaces visibly share the Nexus-adapted template design system
- No original Agentic branding, remote destinations, unsupported proof, or certification claims remain

# Project Nexus Developer Guidelines

**Document type:** Mandatory coding-agent and engineering rules  
**Owner:** Westside Union  
**Status:** Authoritative implementation guidance  
**Version:** 1.1  
**Date:** July 23, 2026

## 1. Directive

These rules apply to every human developer and coding agent working on Project Nexus. When a shortcut conflicts with these principles, preserve the principles and document the trade-off.

Project Nexus is the product. OpenClaw, Hermes Agent, Pi Agent, model providers, local inference servers, messaging providers, POS systems, and workflow libraries are replaceable dependencies.

### 1.1 Required UI template

When present at the repository root, the user-supplied folder:

```text
agentic-build-and-orchestrate-ai-agents-while-you-sleep/
```

is the required starting point for the Nexus landing page and the visual foundation for the Nexus Dashboard.

Coding agents must:

1. Inspect `package.json`, the lockfile, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, and relevant components before editing.
2. Preserve the existing Next.js, React, TypeScript, Tailwind, Radix, and shadcn-style structure unless a concrete incompatibility is documented.
3. Reuse and rename good components instead of generating a parallel design system.
4. Remove Agentic branding, product copy, metadata, links, unsupported metrics, unsupported security claims, and pricing.
5. Replace or explicitly approve every remote template image/video dependency.
6. Confirm reuse rights because the reviewed archive contains no visible license file.
7. Keep `pnpm-lock.yaml` authoritative and use the repository’s package scripts.
8. Never place production secrets or customer data in the public template repository.
9. Build the Phase 1 landing page without login, registration, or dashboard links.
10. Share design tokens/components with Phase 2 while keeping authenticated dashboard code and permissions isolated.

## 2. Non-negotiable Architecture Principles

1. **Gateway first.** Every external channel, dashboard, integration, agent framework, and model request passes through a Nexus-owned service boundary.
2. **One customer-facing identity.** Customers interact with Nexus, never with a framework or model identity.
3. **One authoritative memory contract.** Framework-local memory may be used as an execution cache but never as the only record of customer context.
4. **Deterministic before probabilistic.** Use typed code, rules, schedules, policy checks, and explicit mappings when the outcome can be determined reliably. Use an LLM for interpretation, synthesis, classification under uncertainty, or generation.
5. **Adapters isolate dependencies.** Frameworks, models, channels, and business systems implement Nexus-defined interfaces.
6. **Tenant isolation everywhere.** Tenant identity is mandatory in storage, events, caches, logs, jobs, metrics, and authorization.
7. **Least privilege and explicit approval.** A tool receives only the access required for the current task. Sensitive actions pause for human approval.
8. **Usage is metered centrally.** No production call to a paid model or external service bypasses Nexus metering and budget enforcement.
9. **Customers do not configure infrastructure.** Model, framework, routing, API key, prompt, and deployment settings are super-admin only.
10. **Observable by design.** Every execution has a correlation ID, structured events, outcome, usage record, and policy version.

## 3. Required System Boundaries

```text
Channels / Dashboard / External APIs
                 |
          Nexus Gateway
                 |
 Identity | Policy | Tasks | Memory | Usage | Notifications
                 |
       Router and Workflow Engine
                 |
 Agent Adapters | Model Adapters | Integration Adapters
                 |
 OpenClaw | Hermes | Pi | Local LLM | Cloud LLM | POS | CRM
```

The dashboard must not call adapters directly. An agent framework must not become the system of record for billing, identity, permissions, or customer memory.

## 4. Repository Standard

Recommended monorepo:

```text
project-nexus/
|-- agentic-build-and-orchestrate-ai-agents-while-you-sleep/
|   `-- user-supplied UI template (initial source)
|-- apps/
|   |-- marketing-web/
|   |-- customer-dashboard/
|   `-- admin-console/
|-- services/
|   |-- gateway-api/
|   |-- workflow-worker/
|   |-- notification-worker/
|   `-- integration-worker/
|-- packages/
|   |-- contracts/
|   |-- authz/
|   |-- observability/
|   |-- metering/
|   |-- memory/
|   |-- adapters/
|   `-- testkit/
|-- adapters/
|   |-- agents/
|   |-- models/
|   |-- channels/
|   `-- integrations/
|-- infrastructure/
|   |-- local/
|   |-- cloud/
|   `-- edge/
|-- docs/
|   |-- architecture/
|   |-- adr/
|   |-- api/
|   |-- runbooks/
|   `-- threat-model/
|-- tests/
|   |-- contract/
|   |-- integration/
|   |-- end-to-end/
|   `-- isolation/
`-- tools/
```

Each deployable unit owns a README, health contract, configuration schema, migration notes, and runbook.

During the first Antigravity implementation, choose one of these documented paths:

- **Preferred:** promote the supplied template into `apps/marketing-web`, preserve its Git-relevant history where available, then extract shared tokens/components into `packages/nexus-design-system`.
- **Acceptable for the first landing page:** implement inside the supplied folder, then move it into the monorepo before dashboard work begins.

Do not keep two independently edited copies of the template.

## 5. Language and Service Guidance

- Use Python for gateway/domain services and routing when it accelerates delivery.
- Use FastAPI or an equivalent typed web framework.
- Use Pydantic or equivalent schemas at every boundary.
- Use a durable relational database such as PostgreSQL for authoritative business state.
- Use Redis only for cache, locks, idempotency coordination, rate limiting, or ephemeral queues - not durable customer truth.
- Use a vector/search service behind the Nexus memory interface; do not embed vendor calls throughout business logic.
- Use a durable workflow system or database-backed job state for long-running work. Do not rely on in-process background tasks for critical jobs.
- Frontends may use TypeScript with strict mode and generated API types.

Any change to these choices requires an architecture decision record.

## 6. Domain Model Requirements

Minimum entities:

- Tenant
- Location
- User
- Role and Permission
- Channel Identity
- Conversation
- Message
- Task
- Workflow Execution
- Approval
- Memory Record
- Knowledge Source
- Connection
- Credential Reference
- Usage Event
- Credit Ledger Entry
- Subscription
- Invoice Reference
- Notification Preference
- Insight
- Audit Event
- Deployment
- Adapter Configuration

Every tenant-owned entity includes `tenant_id`. IDs are opaque and non-sequential at public boundaries.

## 7. Gateway Request Pipeline

Every inbound request follows:

1. Authenticate caller or verify signed webhook.
2. Resolve tenant, user/channel identity, location, and correlation ID.
3. Apply rate limits and replay protection.
4. Validate schema and normalize content.
5. Load authorization and business policy.
6. Check plan entitlement, usage budget, and data-access scope.
7. Persist the inbound event idempotently.
8. Create or update a conversation/task/workflow.
9. Retrieve approved memory and knowledge.
10. Route using deterministic logic first.
11. Invoke the selected adapter through a timeout, retry, and circuit-breaker policy.
12. Normalize output and perform policy checks.
13. Request approval if required.
14. Persist outcome, usage, audit, and relevant memory.
15. Deliver the response through the original or configured channel.

No stage may trust tenant IDs, role claims, or cost values supplied by the client without server-side verification.

## 8. Routing Rules

### 8.1 Python-first routing

Use deterministic routing for:

- Explicit commands
- Scheduled jobs
- Known task types
- Integration events
- Tenant configuration
- Capability availability
- Permission and risk policy
- Cost ceilings
- Provider health
- Input size and modality

Use an LLM classifier only when intent cannot be resolved with sufficient confidence. The classifier output must match a constrained schema and may select only capabilities allowed by tenant policy.

### 8.2 Decision record

Persist:

- Route selected
- Reason code
- Policy version
- Adapter version
- Model route class
- Cost estimate
- Fallbacks attempted

Do not expose internal routing detail to the customer.

## 9. Adapter Contracts

### 9.1 Agent adapter

```python
class AgentAdapter(Protocol):
    name: str
    version: str

    async def capabilities(self) -> set[str]: ...
    async def health(self) -> HealthStatus: ...
    async def execute(self, request: AgentRequest) -> AgentResult: ...
    async def cancel(self, execution_id: str) -> None: ...
```

### 9.2 Model adapter

Must support:

- Structured input/output
- Usage reporting
- Timeout and cancellation
- Streaming where appropriate
- Safety metadata
- Provider request ID
- Cost calculation or normalized usage units

### 9.3 Channel adapter

Must support:

- Webhook verification
- Idempotent inbound messages
- Normalized sender identity
- Delivery receipts
- Media constraints
- Consent and opt-out signals

### 9.4 Integration adapter

Must declare:

- Data categories
- Read/write capabilities
- Required scopes
- Rate limits
- Webhook behavior
- Idempotency guarantees
- Supported actions
- Health and last sync

Adapters never read secrets directly from arbitrary environment variables. They receive short-lived or referenced credentials from the credential service.

## 10. Centralized Memory

### 10.1 Memory classes

- Conversation context: short-lived, session-scoped
- User preference: durable, user-scoped
- Business fact: durable, tenant-scoped and sourced
- Task state: authoritative workflow data
- Knowledge: indexed customer-approved documents and records
- Derived insight: time-bound, evidence-linked

### 10.2 Memory rules

- Store only what has a defined purpose.
- Attach provenance, scope, retention, confidence, and timestamps.
- Never convert untrusted message content into durable fact without validation.
- Separate tenant, user, and location scopes.
- Permit correction, export, expiration, and deletion.
- Framework-local memory must be disposable and reconstructable.
- Retrieve the minimum context required for a task.
- Never store secrets, credentials, raw payment data, or hidden model reasoning as memory.

## 11. API and Model Management

- Provider accounts may be Westside Union-managed or customer-owned.
- Credentials are stored in a secret manager and referenced by opaque IDs.
- Each tenant has an allowed route policy, not a direct provider configuration.
- Central metering records input/output units, tool charges, voice minutes, SMS, searches, and paid API events.
- Budgets support soft warning, approval threshold, and hard stop.
- Fallbacks must not silently cross a privacy boundary, region restriction, or customer-owned billing boundary.
- Local inference is treated as a provider with health, capacity, model, and usage telemetry.

## 12. Security Rules

- Never commit secrets, tokens, customer data, or production identifiers.
- Use deny-by-default authorization.
- Validate authorization inside the service handling the action.
- Encrypt data in transit and at rest.
- Use signed webhooks and replay windows.
- Redact sensitive values from logs.
- Require MFA for super-admin access.
- Audit every configuration and support-access change.
- Require explicit approval for destructive, financial, public-posting, or sensitive-data actions.
- Maintain dependency scanning, image scanning, SBOMs, version pinning, and rollback.
- Threat-model new integrations before production use.

## 13. Coding Conventions

### 13.1 Python

- Python 3.12+ unless deployment constraints require otherwise
- Full type annotations
- Async I/O for external calls
- Ruff for linting and formatting
- Pyright or mypy in strict mode
- Pytest for tests
- Small modules organized by domain, not by generic “utils”
- Explicit exception types and error mapping
- UTC timestamps internally; preserve tenant timezone for presentation and schedules
- `Decimal` and explicit currency for money
- Idempotency keys on mutation and webhook handlers

### 13.2 TypeScript

- Strict TypeScript
- Generated clients from versioned OpenAPI contracts
- No secrets or provider calls in browser code
- Accessible components and keyboard support
- Centralized query/cache strategy
- Preserve the template’s established import aliases and component conventions
- Prefer existing Radix/shadcn-style primitives before adding a UI dependency
- Place shared visual tokens and components behind a stable Nexus design-system boundary
- Marketing animation must respect reduced-motion settings
- Dashboard operations must never depend on animation completion

### 13.3 General

- No hidden global state
- No business logic in controllers or UI components
- No framework-specific objects beyond adapter boundaries
- No raw SQL assembled from untrusted input
- No unbounded retries
- No silent exception swallowing
- No time-based behavior without an explicit timezone
- No destructive migration without backup and rollback notes

## 14. Testing Requirements

Every change includes proportionate tests:

- Unit tests for domain and routing rules
- Contract tests for every adapter
- Integration tests for database, queue, and secret references
- End-to-end tests for message-to-task-to-response flows
- Tenant-isolation tests with hostile cross-tenant identifiers
- Authorization tests for every role
- Idempotency and webhook replay tests
- Budget-limit and fallback tests
- Approval-required tests
- Failure, timeout, and partial-outage tests
- Migration tests

Use simulators/fakes for external platforms in CI. Production credentials are never used in test suites.

## 15. Observability

Required signals:

- Structured logs with correlation, tenant pseudonym, task, execution, and adapter IDs
- Metrics for latency, success, failure, retries, queue delay, cost, and usage
- Traces across gateway, workflow, adapter, and notification delivery
- Health checks that distinguish liveness from readiness
- Alerts tied to owner impact and operational runbooks

Do not place full prompts, customer messages, credentials, or payment details in default logs.

## 16. Configuration and Environments

- Schema-validated configuration
- Separate development, staging, and production
- Infrastructure as code for cloud and edge deployments
- Feature flags scoped by tenant
- Environment-specific secret references
- Reproducible container builds
- Pinned dependencies with automated updates
- Backward-compatible API changes or explicit versioning

## 17. Git and Review Standards

- Small, intentional commits
- Conventional commit style
- Pull request includes purpose, risk, tests, migration, rollback, and screenshots for UI changes
- Architecture changes include an ADR
- Contract changes include generated artifacts and compatibility notes
- At least one reviewer for production changes
- Security-sensitive changes require designated review

## 18. Milestones

### Milestone 0  -  Foundations

- Monorepo, CI, local environment, contracts, auth skeleton, observability

### Milestone 1  -  Landing page

- Adapt the supplied template into the public Nexus marketing experience
- Replace all original branding, claims, metadata, pricing, links, and remote assets
- Add the lead form, analytics, industry content, and legal pages
- No dashboard/login links

### Milestone 2  -  Gateway MVP

- Tenant identity, conversation intake, task service, policy, metering, one channel, one agent adapter, one model route

### Milestone 3  -  Owner assistant pilot

- Central memory, knowledge, schedules, approval, summaries, proactive notifications

### Milestone 4  -  Dashboard

- Read-only activity and usage, then task delegation, approvals, billing, and connection status

### Milestone 5  -  Expansion

- Additional adapters, POS/API connections, local Nexus Edge, multi-location, voice

## 19. Definition of Done

A change is done only when:

- Acceptance criteria are met
- Tests pass
- Tenant and authorization behavior is verified
- Usage and audit events are correct
- Error and rollback behavior is documented
- User-facing copy hides framework complexity
- Documentation and API contracts are updated
- Security and privacy implications are reviewed
- Relevant observability exists
- Template-derived pages contain no residual Agentic brand strings, original URLs, fabricated metrics, or unsupported certification claims
- UI changes pass responsive, keyboard, reduced-motion, and accessible-name checks

## 20. Coding-Agent Start Checklist

Before editing:

1. Read this file and the current development brief.
2. Inspect repository instructions and existing changes.
3. Identify the affected tenant, policy, adapter, data, and billing boundaries.
4. Write or update acceptance criteria.
5. Confirm no customer-facing surface exposes model/framework configuration.

Before completion:

1. Run lint, type checks, and relevant tests.
2. Test an unauthorized and cross-tenant case.
3. Test a timeout or failure case.
4. Confirm idempotency for inbound events and mutations.
5. Confirm usage, audit, and correlation records.
6. Update documentation and migration/rollback notes.

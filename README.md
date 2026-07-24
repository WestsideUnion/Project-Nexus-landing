# Project Nexus Complete Documentation Suite

**Prepared for:** Westside Union  
**Consolidated:** July 23, 2026  
**Status:** Current working source of truth

## Purpose

This package consolidates the earlier Project Nexus archive with the latest landing-page, dashboard, template-adoption, gateway, deployment, permissions, pricing, and engineering decisions.

## Authority and reading order

When documents overlap, use this order:

1. `Project_Nexus_Developer_Guidelines.md` - mandatory coding-agent rules
2. `Project_Nexus_Development_Brief_Updated.md` - current implementation decisions and delivery sequence
3. `Project_Nexus_Landing_Page_Spec.md` - authoritative Phase 1 marketing-site specification
4. `Project_Nexus_Dashboard_Spec.md` - authoritative Phase 2 dashboard specification
5. `Project_Nexus_Developer_Build_Brief.md` - detailed technical implementation reference
6. `Project_Nexus_System_Architecture.md` - system architecture reference
7. `Project_Nexus_Update_Summary.md` - product and business summary
8. `Project_Nexus_Go_To_Market_Strategy.md` - messaging and sales execution
9. `Project_Nexus_Pricing_Research.md` - research record and current commercial overlay
10. `AI Workflow Discovery Questionnaire.md` - customer discovery and scoping form

The July 23 update sections supersede older assumptions within the same document.

## Current decisions at a glance

- Phase 1 is the landing page with no login, registration, or dashboard link.
- The user-supplied `agentic-build-and-orchestrate-ai-agents-while-you-sleep/` folder is the required visual foundation in Antigravity.
- Phase 2 is the owner dashboard.
- Westside Union manages all technical configuration as super admin.
- Customers manage business tasks, approvals, preferences, team access, usage, billing, and feature requests.
- Nexus Gateway is the central boundary for channels, dashboard, memory, agents, models, integrations, usage, billing, audit, and notifications.
- POS and other business systems connect through Nexus-owned adapters.
- Proactive owner notifications may be delivered through WhatsApp, SMS, email, or dashboard after policy and evidence checks.
- Nexus Edge is optional and recommended selectively.
- The Mac mini is for development and controlled pilots; the shared production gateway moves to managed cloud/VPS infrastructure before customers depend on it.

## Template caution

The reviewed template archive contained no visible license file and references remotely hosted images/video. Confirm reuse rights and replace, approve, or self-host every external asset before public launch.

## File formats

Every Markdown source has a matching PDF. `SHA256SUMS.txt` provides integrity checks for all Markdown and PDF deliverables.

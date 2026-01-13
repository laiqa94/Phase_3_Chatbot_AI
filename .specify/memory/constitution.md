<!--
Sync Impact Report
Version change: draft → 1.0.0
Modified principles: placeholders → I. Spec-Driven Delivery, II. Agent-Orchestrated Workflow, III. Authenticated Multi-Tenancy, IV. Layered Web Architecture, V. Reliability & Observability, VI. Secure Data Stewardship
Added sections: Platform & System Constraints; Workflow & Quality Gates
Removed sections: None
Templates requiring updates:
 - ✅ .specify/templates/plan-template.md (reviewed, no edits required)
 - ✅ .specify/templates/spec-template.md (reviewed, no edits required)
 - ✅ .specify/templates/tasks-template.md (reviewed, no edits required)
Follow-up TODOs:
 - TODO(RATIFICATION_SOURCE): Confirm if an earlier ratification date exists before 2026-01-06.
 - TODO(SPECS_TREE): Populate `/specs` tree so spec-first workflows have source material.
-->

# Phase II Todo Full-Stack Web Application Constitution

## Core Principles

### I. Spec-Driven Delivery
Every initiative MUST originate from an approved `/specs/<feature>/spec.md`, translated into plan.md and tasks.md before implementation. No code may ship without traceable specs, measurable acceptance criteria, and archived Prompt History Records tying user intent to outputs.

### II. Agent-Orchestrated Workflow
Workflows MUST leverage the prescribed agent sequence (SpecAnalyzer → ArchitecturePlanner → DatabaseSchema → AuthIntegration → BackendAPI → FrontendAPI → FrontendUI → TaskState → Testing → Documentation) with the ProjectOrchestrator coordinating handoffs. Each agent stays within its scope, and deviations require documented approval.

### III. Authenticated Multi-Tenancy
Better Auth with JWT is the single source of identity. All backend operations MUST enforce JWT verification, scope every database query by authenticated user, and prevent cross-tenant leakage. Frontend API calls include bearer tokens automatically via `/lib/api.ts`.

### IV. Layered Web Architecture
Frontend (Next.js 16+ App Router + Tailwind) → API (FastAPI) → Persistence (SQLModel + Neon PostgreSQL) is the mandated stack. Data flows strictly follow this chain; no UI element may bypass the API, and no API may bypass SQLModel models or migrations.

### V. Reliability, Testing, and Observability
Every feature requires red-green-refactor discipline, automated tests per user story, and structured logging on both tiers. Integration tests must cover CRUD flows, authentication, and error handling before release. Observability data (logs/metrics) must include user and request IDs for traceability.

### VI. Secure Data Stewardship
Secrets live only in environment variables or managed secret stores. Personal data must be encrypted in transit (HTTPS) and never logged in plaintext. Data retention and deletion policies follow spec directives; deviations require explicit governance review.

## Platform & System Constraints

- Multi-user todo scope with responsive UX across desktop and mobile breakpoints.
- Backend: FastAPI with SQLModel models, JWT middleware, and endpoints limited to `/api/{user_id}/tasks*` operations defined in specs.
- Frontend: Next.js server components by default, client components only where interactivity demands (forms, toggles, filters).
- Database: Neon PostgreSQL schema with `users` (Better Auth-managed) and `tasks` tables; tasks include status, due dates, metadata, and foreign key to users.
- Deployment artifacts must preserve monorepo layout and support automated migrations before app start.

## Workflow & Quality Gates

1. Read & summarize all relevant specs before planning.
2. Validate Constitution Check items in plan.md; block work until satisfied.
3. Maintain Todo task state (pending → in_progress → completed) for every engagement.
4. Record Prompt History after each user exchange; surface ADR suggestions for cross-cutting decisions.
5. Tests (unit, integration, contract) must run and pass before marking tasks complete; failures automatically block promotion.
6. Documentation updates (README, quickstarts) accompany feature delivery to keep onboarding accurate.

## Governance

- This constitution supersedes other guidance when conflicts arise.
- Amendments require: (a) documented proposal, (b) review against specs/templates, (c) version bump logged in Sync Impact Report.
- Versioning uses semantic rules: MAJOR for principle changes, MINOR for new sections/principles, PATCH for clarifications.
- Compliance reviews occur at each `/sp.plan` gate; violations demand remediation plans in plan.md before implementation proceeds.

**Version**: 1.0.0 | **Ratified**: 2026-01-06 | **Last Amended**: 2026-01-06

---
paths:
  - 'docs/api/**'
---

# General API docs (pagination, error handling)

Written 2026-07-22, from an audit that read every file in `docs/api/` in full and cross-checked
against `src/services/apigateway/src/Shared/Application/{handleApiCall,errorMiddleware}.ts` and
`Authentication/Application/hasAccessMiddleware.ts`/`authenticationMiddleware.ts`. If this note is
many months/years old when you read it, re-verify against current source before trusting it.

## `pagination.md` is fully accurate — don't "fix" it

Verified this is the correct, **global** mechanism used by `handleApiCall.ts` for every paginated
query across the whole ApiGateway, not domain-specific:

- `responseData = dataAttribute === undefined ? response.data : response.data[dataAttribute]` —
  body is always the bare array (or the array under `dataAttribute`), never a `{data, pagination}`
  envelope.
- When `isPaginated: true`, `x-Total`/`x-Limit`/`x-Offset` and `Link` headers are set from
  `response.data.pagination`, and the pagination object is stripped from the JSON body entirely.
- Confirmed the same code path backs non-Observability list endpoints too: billing profiles,
  transactions, invoices (`BillingProfileApi.ts`, `InvoiceApi.ts`) all pass `isPaginated: true`
  through the same `handleApiCall.ts` path.
- Header names/casing (`x-Total`, `x-Limit`, `x-Offset`), default `limit=20`/`offset=0`, and the
  `Link` header `rel="first"/"prev"/"next"/"last"` construction all match `handleApiCall.ts`
  exactly.

This confirms the same mechanism documented in
`src/services/apigateway/.claude/rules/observability-docs.md`'s "Response body vs. contract" note
applies repo-wide, not just to Observability.

## `error-handling.md` — fixed 2026-07-22, now accurate

Previously had four issues, all corrected:

- **401/403 field-name inconsistency.** There are two different auth failure code paths with two
  different response shapes: `hasAccessMiddleware.ts` (missing/insufficient role) returns
  `{code: 401/403, ...}`; `authenticationMiddleware.ts` (invalid/expired token, via
  `GatewayError`) and `hasRebacAccessMiddleware.ts` (resource-level ReBAC checks, e.g. workspace
  membership) return `{status: 401/403, ...}`. The doc now shows both shapes for both 401 and 403,
  with a short note on which check produces which.
- **Orphaned example.** The 400 example referencing the nonexistent
  `schemas/_Shared/Observability/alert_status.json` was replaced with a real example: a
  `CloudEventError`-shaped 400 (`message/params/path/expected`, no `instancePath`/`schemaPath`)
  from `createWorkspaceCommandHandler.ts`'s invalid-`workspaceKey` case — this also closes the
  "doc never shows the other legitimate 400 shape" gap below.
- **Common-errors table was incomplete.** Added `409 CONFLICT`, `422 UNPROCESSABLE_ENTITY`,
  `501 NOT_IMPLEMENTED` rows — all pass straight through `errorMiddleware.ts` unmodified and are
  genuinely reachable (e.g. duplicate-invite/duplicate-member 409s in
  `inviteWorkspaceMemberCommandHandler.ts`).
- **429 caveat added.** No rate-limiting implementation exists anywhere in ApiGateway's source
  (grepped for `429`/`rate.?limit`/`RateLimit`, zero hits) — still true, unchanged. The doc now
  carries a tip noting this may be enforced at the infra/ingress layer and isn't something the
  backend guarantees, rather than silently implying it's backend-verified.

The generic 400 (AJV-style)/404/500/502/503/504 examples and the "eventually consistent read
models can 404 briefly after a write" caveat were already accurate and untouched.

## `index.md` is accurate

Base URL pattern, example routes, and the event-sourced/eventually-consistent-read-model framing
all check out against real routes and the CQRS Command/Event handler pattern used throughout the
backend services.

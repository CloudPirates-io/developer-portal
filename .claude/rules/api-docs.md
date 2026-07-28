---
paths:
  - "src/api/**"
---

# General API docs (pagination, error handling)

Ground truth cross-checked against
`src/services/apigateway/src/Shared/Application/{handleApiCall,errorMiddleware}.ts` and
`Authentication/Application/hasAccessMiddleware.ts`/`authenticationMiddleware.ts`. Re-verify
against current source before trusting this if it's been a while.

## Pagination mechanism (`pagination.md`)

This is the correct, **global** mechanism used by `handleApiCall.ts` for every paginated query
across the whole ApiGateway, not domain-specific:

- `responseData = dataAttribute === undefined ? response.data : response.data[dataAttribute]` —
  body is always the bare array (or the array under `dataAttribute`), never a `{data, pagination}`
  envelope.
- When `isPaginated: true`, `x-Total`/`x-Limit`/`x-Offset` and `Link` headers are set from
  `response.data.pagination`, and the pagination object is stripped from the JSON body entirely.
- The same code path backs non-Observability list endpoints too: billing profiles, transactions,
  invoices (`BillingProfileApi.ts`, `InvoiceApi.ts`) all pass `isPaginated: true` through the same
  `handleApiCall.ts` path.
- Header names/casing (`x-Total`, `x-Limit`, `x-Offset`), default `limit=20`/`offset=0`, and the
  `Link` header `rel="first"/"prev"/"next"/"last"` construction all match `handleApiCall.ts`
  exactly.

Same mechanism as `src/services/apigateway/.claude/rules/observability-docs.md`'s "Response body
vs. contract" note — applies repo-wide, not just to Observability. Don't describe pagination
differently per domain page.

## Error response shapes (`error-handling.md`)

- **401/403 field-name inconsistency is real, not a doc bug.** Two different auth-failure code
  paths produce two different shapes: `hasAccessMiddleware.ts` (missing/insufficient role) returns
  `{code: 401/403, ...}`; `authenticationMiddleware.ts` (invalid/expired token, via `GatewayError`)
  and `hasRebacAccessMiddleware.ts` (resource-level ReBAC checks, e.g. workspace membership) return
  `{status: 401/403, ...}`. Document both shapes for both 401 and 403, with a note on which check
  produces which — don't unify them into one shape, that's not how the backend behaves.
- **400 examples should use the `CloudEventError` shape** (`message/params/path/expected`, no
  `instancePath`/`schemaPath`/`keyword`) for command-validation errors, e.g.
  `createWorkspaceCommandHandler.ts`'s invalid-`workspaceKey` case. This is distinct from the
  generic AJV-shaped 400 shown elsewhere on the page. Don't invent example bodies that reference
  nonexistent schema files.
- **Common-errors table** should include `409 CONFLICT`, `422 UNPROCESSABLE_ENTITY`, and
  `501 NOT_IMPLEMENTED` — all pass straight through `errorMiddleware.ts` unmodified and are
  genuinely reachable (e.g. duplicate-invite/duplicate-member 409s in
  `inviteWorkspaceMemberCommandHandler.ts`).
- **429 has no backend implementation.** No rate-limiting exists anywhere in ApiGateway's source
  (grepped for `429`/`rate.?limit`/`RateLimit`, zero hits). If documenting 429, frame it as possibly
  enforced at the infra/ingress layer, not something the backend guarantees.

The generic 400 (AJV-style)/404/500/502/503/504 examples and the "eventually consistent read
models can 404 briefly after a write" caveat match the backend.

## `index.md`

Base URL pattern, example routes, and the event-sourced/eventually-consistent-read-model framing
should stay aligned with real routes and the CQRS Command/Event handler pattern used throughout the
backend services.

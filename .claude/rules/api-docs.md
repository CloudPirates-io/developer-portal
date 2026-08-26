---
paths:
  - "src/api/**"
---

# General API docs (pagination, error handling)

## Pagination mechanism (`pagination.md`)

Pagination is **global**: one mechanism (`handleApiCall.ts`) serves every paginated list endpoint
across the whole API, including billing profiles, transactions, invoices and the observability
lists. Document it once here, and don't describe it differently per domain page.

- The response body is always the bare array, never a `{data, pagination}` envelope.
- `x-Total`, `x-Limit` and `x-Offset` headers carry the pagination state (that exact casing), plus
  a `Link` header with `rel="first"/"prev"/"next"/"last"`.
- Defaults are `limit=20`, `offset=0`.

## Error response shapes (`error-handling.md`)

- **401/403 have two different shapes, by design.** Role checks
  (`hasAccessMiddleware.ts`) return `{code: 401/403, ...}`; token validation
  (`authenticationMiddleware.ts`) and resource-level ReBAC checks
  (`hasRebacAccessMiddleware.ts`) return `{status: 401/403, ...}`. Document both shapes for both
  status codes, with a note on which check produces which. Don't unify them into one shape.
- **400 examples use the `CloudEventError` shape** (`message`/`params`/`path`/`expected`, no
  `instancePath`/`schemaPath`/`keyword`) for command-validation errors. That's distinct from the
  generic AJV-shaped 400 also shown on the page. Don't invent example bodies referencing
  nonexistent schema files.
- **Common-errors table** covers `409 CONFLICT` (e.g. duplicate invite/member),
  `422 UNPROCESSABLE_ENTITY`, `429 TOO_MANY_REQUESTS`, `501 NOT_IMPLEMENTED`, alongside the
  generic 400/404/500/502/503/504 entries.
- Read models are eventually consistent, so a read directly after a write can 404 briefly. Keep
  that caveat on the page.

## `index.md`

Base URL pattern, example routes, and the event-sourced/eventually-consistent-read-model framing
should stay aligned with real routes and the CQRS Command/Event handler pattern used throughout the
backend services.

---
paths:
  - "docs/**"
---

# "## API Reference" sections link out to the live Swagger docs, not raw examples

This is a repo-wide structural convention, not just wording (contrast with `tone-and-style.md`,
which is about wording only). It supersedes the older pattern still visible on some pages, where a
page's `## API Reference` section listed every endpoint as a full raw `POST /v1/...`
request/response code block, usually ending in a generic "visit api.cloudpirates.io/docs" info box.

## The rule

A page's `## API Reference` section should not embed raw request/response examples for endpoints
that are already documented on the live Swagger UI. Instead, condense it to one or two sentences
linking straight to the matching tag on `https://api.cloudpirates.dev/docs/` (note: `.dev`, not
`.io`, a different host than the old generic link still on some pages).

**Why:** the Swagger docs are generated from the same OpenAPI spec the API itself ships from, so
they can't drift out of sync the way a hand-written markdown example can. Maintaining two copies of
the same request/response shape (one here, one on the live docs) is exactly the kind of duplicate
information `tone-and-style.md` already tells us to cut, just at the section level instead of the
sentence level.

**What to keep vs. cut**, per endpoint or standalone box in the section:

- Keep any standalone tip/warning/info box that states a general capability fact not tied to one
  specific example (e.g. "API Keys Cannot Modify Passwords", "Bearer Token Required for Session
  Management", a pagination-headers callout).
- Cut prose and code blocks that only explain one specific example request/response body — that's
  exactly what the Swagger UI already shows, interactively, for every endpoint at once.
- Do not remove or alter anything outside the `## API Reference` section itself. This convention is
  about that one section, not the rest of the page.
- Don't convert a page's `## API Reference` section as a side effect of an unrelated edit; treat it
  as its own deliberate step per domain (confirm the real tag/anchor first, see below) unless the
  user has already asked for it on that page.

See `authentication-docs.md`, `billing-docs.md`, and `managed-application-platform-docs.md` for
domain-specific notes on which boxes were kept per page (e.g. `sessions.md`'s deliberate exception,
still on raw examples because its tag isn't live yet).

## Finding the right tag/anchor — don't guess, verify

Swagger UI tags on `api.cloudpirates.dev/docs/` are not always the bare backend class/domain name.
Confirmed case: tags are prefixed `Auth ...` for the authentication domain
(`AuthApi` → `#/Auth`, not `#/AuthApi`; `ChallengeApi` → `#/Auth%20Challenge`, not `#/Challenge`).
Re-verify against the live docs or the source `openapi.yaml` `tags:` block before linking to a tag
this file hasn't already confirmed (the table below), rather than inferring it from a backend class
or docs folder name.

The anchor format is `#/<tag-name-with-spaces-replaced-by-%20>` (case preserved), e.g. `Auth API
Key` → `#/Auth%20API%20Key`.

## Full tag list (source of truth: `openapi.yaml` `tags:` block)

This is every tag currently defined on the API, with its Swagger anchor and, where the OpenAPI spec
sets one, its `externalDocs` target (the developer-portal page the spec itself already considers
canonical for that tag — a strong signal for which `docs/**` page should link to it, though still
worth confirming against the live site since these are hand-maintained in the spec too).

| Tag | Anchor | Covers | `externalDocs` (if set in spec) |
| --- | --- | --- | --- |
| Auth | `#/Auth` | Login, registration, activation, password mgmt, token refresh, session validation | `/authentication/` |
| Auth Challenge | `#/Auth%20Challenge` | MFA/passwordless setup: TOTP, SMS 2FA, WebAuthn | — |
| Auth API Key | `#/Auth%20API%20Key` | Create/list/revoke API keys | `/authentication/api-keys` |
| Training | `#/Training` | Core training mgmt: create, settings, certificates, feedback forms | — |
| Training Participant | `#/Training%20Participant` | Participants: add/remove, roles, environment assignment | — |
| Training Session | `#/Training%20Session` | Session scheduling, dates/times, Teams meeting URLs | — |
| Training Invitation | `#/Training%20Invitation` | Portal invitations: send, status, public accept/reject | — |
| Workspace | `#/Workspace` | Create/manage workspaces, members, permissions, settings | `/workspaces/` |
| Cluster | `#/Cluster` | Register/monitor/manage Kubernetes clusters, tokens, config | — |
| Application Template | `#/Application%20Template` | Admin-managed template catalog: versions, presets, config options | `/managed-application-plattform/templates` |
| Application | `#/Application` | User-facing deployed apps: deploy, update, status, logs, config | `/managed-application-plattform/` |
| Observability | `#/Observability` | Workspace/cluster summaries, tracked resources, policy compliance, metrics, health reports | `/managed-observability/` |
| Kubernetes | `#/Kubernetes` | Browse/inspect K8s resources (pods, deployments, services, ...) in monitored clusters | — |
| Billing | `#/Billing` | Billing profiles, addresses, email delivery prefs, transactions, invoices | — |
| Notification | `#/Notification` | In-app notifications, mark-as-read, notification preferences | — |
| Country | `#/Country` | Country reference data: names, codes, flags, currencies, dialing codes | — |
| Request | `#/Request` | Public, unauthenticated contact/demo/training/consulting/callback request forms | — |
| System | `#/System` | Internal health check / readiness endpoints | — |

Notes:

- One tag can cover several `docs/**` pages (e.g. `Billing` covers both `billing-profiles.md` and
  `invoices.md` — link both to the same `#/Billing` anchor rather than expecting a split like
  `Auth`'s three-way one).
- Several tags (`Training*`, `Notification`, `Country`, `Request`, `System`) have no corresponding
  `docs/**` domain at all. Don't invent a docs page for a tag just because the tag exists.
- `Kubernetes` most likely corresponds to `docs/managed-observability/kubernetes-resources.md`
  given the description overlap, but this is an inference from the description text, not confirmed
  against the live Swagger UI the way the `Auth ...` tags were — verify before relying on it.
- No `Auth Session` tag exists in this list. This confirms, rather than contradicts,
  `authentication-docs.md`'s note that `sessions.md` was left with raw examples because that tag
  isn't live yet — re-check this list next time it's refreshed from `openapi.yaml`.

---
paths:
  - 'docs/authentication/**'
---

# Authentication docs

Written 2026-07-22, from an audit that read every file in `docs/authentication/` in full and
cross-checked concrete claims against `authenticationservice`'s own HTTP surface — unlike
`clusterservice` (pure CQRS, no HTTP — see `cluster-docs.md`), `authenticationservice` runs its own
Express app (`authenticationservice/src/app.ts`) with real routes mounted directly:
`src/services/authenticationservice/src/Api/v1/{AuthApi,ChallengeApi,WebAuthnApi,ApiKeyApi,
SessionApi}.ts`, plus handler code (`loginIdentityWithWebAuthn.ts`, `loginIdentityWithLocalAuth.ts`,
`registerKey.ts`, `getSessions.ts`, `getDeviceFingerprint.ts`, `refreshIdentitySession.ts`) under
`authenticationservice/src/Auth/**`. ApiGateway itself has no `Auth` route files of its own — its
`src/Authentication/` directory only holds middleware for authenticating requests to *other*
ApiGateway routes (`authenticationFinder.ts`, `authenticationMiddleware.ts`), and its `src/docs/
paths/auth/**` only mirrors the OpenAPI spec for authenticationservice's routes. Don't go looking
for these handlers inside apigateway. If this note is many months/years old when you read it,
re-verify against current source before trusting it.

## `webauthn.md` — fixed 2026-07-22, now accurate

Was the most severe drift in this domain; corrected:

| Was documented as | Now documents (real behavior) |
| --- | --- |
| `GET /v1/auth/webauthn/devices` (list) | `GET /v1/auth/webauthn` (`WebAuthnApi.ts:15`) — no `/devices` segment |
| `DELETE /v1/auth/webauthn/devices/{deviceId}` | `DELETE /v1/auth/webauthn/{webAuthnKeyId}` (`WebAuthnApi.ts:68-89`) — no `/devices` segment, param is `webAuthnKeyId` |
| Register body `{"label": "...", "credential": {...}}` | Handler (`WebAuthnApi.ts:41-56` → `registerKey.ts:9-44`) takes the raw WebAuthn `RegistrationJSON` directly as the body — no wrapper, no separate `label` field. The label is derived server-side from `validatedRegistration.user.name` (`registerKey.ts:27`), from the WebAuthn ceremony itself, not a client-supplied field on this call. |
| Login body `{"credential": {...}}` | Handler (`WebAuthnApi.ts:58-65`) passes `req.body` directly as the `AuthenticationResponseJSON` — no `credential` wrapper key. |

Also added: the previously-undocumented mandatory `POST /v1/auth/webauthn/challenge`
(`WebAuthnApi.ts:35-38`, returns `{challenge}`) step that must precede register/login — both
handlers look the challenge up in Redis and fail if it's missing — and the previously-undocumented
`PUT /v1/auth/webauthn/{webAuthnKeyId}/label` rename endpoint (`WebAuthnApi.ts:91-116`).

**Still unverified, softened rather than removed**: the "Keep at Least One Authentication Method"
warning — no "last method" guard was found in the delete handlers during the original audit
(`WebAuthnApi.ts:68-89`'s delete has no such check). The doc now frames this as "not enforced by
the API, could lock you out" instead of implying the system blocks it. Re-verify if a guard is
ever added.

## `mfa.md` — fixed 2026-07-22, now accurate

Was: wrong field name, missing step, wrong enum casing. Now corrected:

- **SMS field name.** Was `{"phoneNumber": "+1234567890"}`; real handler (`ChallengeApi.ts:32-51`)
  reads `number`, not `phoneNumber` — doc now uses `number`.
- **Mandatory two-phase activation, previously undocumented.** Real SMS/TOTP setup is two calls:
  `POST /v1/auth/challenges/sms` (or `/totp`) returns a `verificationToken` (SMS) or `otpAuthUri`
  (TOTP), but the challenge isn't usable for login until you also call
  `POST /v1/auth/challenges/sms/activate` `{verificationToken, challengeCode}`
  (`ChallengeApi.ts:120-148`) or `POST /v1/auth/challenges/totp/activate` `{token}`
  (`ChallengeApi.ts:150-174`). Both `/activate` endpoints are now documented as separate steps.
- **Enum casing.** Was `"desiredChallenge": "sms"`; the real enum (`AUTH_CHALLENGE_TYPE`,
  `Sms = 'SMS'`, `Totp = 'TOTP'`) is uppercase-only, and `validateChallengeType.ts` does a strict
  membership check — lowercase throws a 400 `ChallengeTypeInvalidError`. Doc now uses `"SMS"`.
- `POST /v1/auth/login/challenge` with `{verificationToken, challengeCode}` was already accurate
  (`AuthApi.ts:230-251`) and untouched.

## `password.md` — fixed 2026-07-22, now accurate

Change-password body was `{"currentPassword": "...", "newPassword": "..."}`; real handler
(`AuthApi.ts:265-274`) reads `existingPassword`/`password` — doc now uses those field names.
Everything else in this file (`/register`, `/login`, `/request-reset-password` bodies, the
HaveIBeenPwned breach-check framing, the "API keys cannot modify passwords" tip) was already
accurate and untouched.

## `api-keys.md` — fixed 2026-07-22, now accurate

Doc's "View Keys" list claimed Label/Key ID/Creation date/**Last used**. The real list response
(`ApiKeyApi.ts:15-19`) is `{id, label, createdAt}` only — no `lastUsed` field; removed that bullet.
If the portal UI displays a "last used" value, it isn't sourced from this endpoint; check the
underlying model/UI code before re-adding this claim. Everything else in this file (the Local-only
route limitations list, list/create/delete endpoints and bodies) was already accurate and
untouched.

## `sessions.md` — fixed 2026-07-22, now accurate

`POST /v1/auth/refresh` doc response claimed `expiresIn`; the real payload
(`refreshIdentitySession.ts:65-69`) returns `{accessToken, refreshToken, auth}` (a decoded JWT
payload with `exp`, etc.), not a precomputed `expiresIn` seconds value — doc now shows the real
shape. Everything else (sessions list with `includeExpired`, logout-by-session, `/me`, `/validate`,
device/browser/OS/location fields including the GDPR "last octet removed" IP-anonymization claim —
genuinely implemented in `getDeviceFingerprint.ts`) was already accurate and untouched.

## Confirmed accurate

`index.md`'s claims — "No MFA required when using WebAuthn" (confirmed:
`loginIdentityWithWebAuthn.ts` never checks challenge/MFA state, unlike
`loginIdentityWithLocalAuth.ts`) and the API-key security-sensitive-operation restriction — are
both accurate.

## `## API Reference` sections now link out instead of embedding raw examples

Changed 2026-07-23 across `password.md`, `mfa.md`, `webauthn.md`, `api-keys.md`, `sessions.md`
(user-driven refactor, done page by page in one session). Each page's `## API Reference` section
used to list every endpoint as a raw `POST /v1/...` request/response code block, ending in a
generic "Full API Documentation Available" box linking to `api.cloudpirates.io/docs`. That's now
condensed to one or two sentences linking directly to the relevant tag on
`https://api.cloudpirates.dev/docs/` (note: `.dev`, not `.io`, a different host than the old
generic link, confirmed intentional by the user). Standalone tip/warning/info boxes that state a
general capability fact (e.g. "API Keys Cannot Modify Passwords", "Bearer Token Required for
Session Management") are kept; prose that only explained a specific removed request/response body
(e.g. the old two-step SMS/TOTP activation explanation in `mfa.md`) was cut along with its code
block. If asked to apply this same pattern to another domain (billing, workspaces, etc.), follow
the same split: keep general-fact boxes, cut example-bound prose and code, link to the matching
Swagger tag.

**Swagger UI tag naming on `api.cloudpirates.dev/docs/`** (confirmed by the user correcting
first-guess anchors, so treat as verified, not inferred): tags are prefixed `Auth`, not the bare
backend class name minus `Api`:

| Page | Backend class (see top of this file) | Real anchor |
| --- | --- | --- |
| `password.md` | `AuthApi` | `#/Auth` |
| `mfa.md` | `ChallengeApi` | `#/Auth%20Challenge` |
| `webauthn.md` | `WebAuthnApi` | `#/Auth%20Challenge` (same tag as `mfa.md` — WebAuthn's challenge endpoint apparently shares the Challenge tag rather than getting its own; re-verify if this looks wrong) |
| `api-keys.md` | `ApiKeyApi` | `#/Auth%20API%20Key` |
| `sessions.md` | `SessionApi` | `#/Auth%20Session` (see below, not live yet) |

Don't re-guess anchors as `#/<ClassName>` (e.g. `#/Session`, `#/WebAuthn`) — that was the first
attempt and the user corrected all of it to the `Auth ...` form above.

**`sessions.md`'s API Reference is intentionally NOT yet converted to a link.** As of 2026-07-23
the `#/Auth%20Session` tag doesn't exist yet on the live docs site, so `sessions.md` still has raw
`List Sessions`/`Logout Session` examples (its `Get Current User`/`Validate Session` examples were
dropped outright rather than kept). There's a `<!-- TODO: Implement session API documentation -->`
HTML comment with the intended link commented out right below the examples. When that tag goes
live, swap the raw examples for that commented-out link (matching the other four pages) and check
whether `Get Current User`/`Validate Session` need to come back too.

---
paths:
  - 'docs/authentication/**'
---

# Authentication docs

Ground truth is `authenticationservice`'s own HTTP surface, not ApiGateway — unlike
`clusterservice` (pure CQRS, no HTTP — see `cluster-docs.md`), `authenticationservice` runs its own
Express app (`authenticationservice/src/app.ts`) with real routes mounted directly:
`src/services/authenticationservice/src/Api/v1/{AuthApi,ChallengeApi,WebAuthnApi,ApiKeyApi,
SessionApi}.ts`, plus handler code (`loginIdentityWithWebAuthn.ts`, `loginIdentityWithLocalAuth.ts`,
`registerKey.ts`, `getSessions.ts`, `getDeviceFingerprint.ts`, `refreshIdentitySession.ts`) under
`authenticationservice/src/Auth/**`. ApiGateway itself has no `Auth` route files of its own — its
`src/Authentication/` directory only holds middleware for authenticating requests to *other*
ApiGateway routes (`authenticationFinder.ts`, `authenticationMiddleware.ts`), and its
`src/docs/paths/auth/**` only mirrors the OpenAPI spec for authenticationservice's routes. Don't go
looking for these handlers inside apigateway. Re-verify against current source before trusting
this if it's been a while.

## `webauthn.md` real endpoint shapes

| Common wrong assumption | Real behavior |
| --- | --- |
| `GET /v1/auth/webauthn/devices` (list) | `GET /v1/auth/webauthn` (`WebAuthnApi.ts:15`) — no `/devices` segment |
| `DELETE /v1/auth/webauthn/devices/{deviceId}` | `DELETE /v1/auth/webauthn/{webAuthnKeyId}` (`WebAuthnApi.ts:68-89`) — no `/devices` segment, param is `webAuthnKeyId` |
| Register body `{"label": "...", "credential": {...}}` | Handler (`WebAuthnApi.ts:41-56` → `registerKey.ts:9-44`) takes the raw WebAuthn `RegistrationJSON` directly as the body — no wrapper, no separate `label` field. The label is derived server-side from `validatedRegistration.user.name` (`registerKey.ts:27`), from the WebAuthn ceremony itself, not a client-supplied field on this call. |
| Login body `{"credential": {...}}` | Handler (`WebAuthnApi.ts:58-65`) passes `req.body` directly as the `AuthenticationResponseJSON` — no `credential` wrapper key. |

Also real but easy to miss: a mandatory `POST /v1/auth/webauthn/challenge` (`WebAuthnApi.ts:35-38`,
returns `{challenge}`) step must precede register/login — both handlers look the challenge up in
Redis and fail if it's missing. There's also a `PUT /v1/auth/webauthn/{webAuthnKeyId}/label` rename
endpoint (`WebAuthnApi.ts:91-116`).

**"Keep at Least One Authentication Method" is not enforced.** No "last method" guard exists in the
delete handler (`WebAuthnApi.ts:68-89`). Frame this in the doc as "not enforced by the API, could
lock you out", not as something the system blocks. Re-verify if a guard is ever added.

## `mfa.md` real endpoint shapes

- **SMS field name is `number`, not `phoneNumber`** (`ChallengeApi.ts:32-51`).
- **SMS/TOTP setup is a mandatory two-phase flow.** `POST /v1/auth/challenges/sms` (or `/totp`)
  returns a `verificationToken` (SMS) or `otpAuthUri` (TOTP), but the challenge isn't usable for
  login until you also call `POST /v1/auth/challenges/sms/activate`
  `{verificationToken, challengeCode}` (`ChallengeApi.ts:120-148`) or
  `POST /v1/auth/challenges/totp/activate` `{token}` (`ChallengeApi.ts:150-174`). Document both
  `/activate` endpoints as separate steps, not an implementation detail of the first call.
- **`desiredChallenge` enum is uppercase-only.** The real enum (`AUTH_CHALLENGE_TYPE`,
  `Sms = 'SMS'`, `Totp = 'TOTP'`) is uppercase, and `validateChallengeType.ts` does a strict
  membership check — lowercase throws a 400 `ChallengeTypeInvalidError`.
- `POST /v1/auth/login/challenge` with `{verificationToken, challengeCode}` is accurate as
  documented (`AuthApi.ts:230-251`).

## `password.md`, `api-keys.md`, `sessions.md` real shapes

- **Change-password body** is `{"existingPassword": "...", "password": "..."}`, not
  `{"currentPassword", "newPassword"}` (`AuthApi.ts:265-274`). Everything else in `password.md`
  (`/register`, `/login`, `/request-reset-password` bodies, the HaveIBeenPwned breach-check
  framing, the "API keys cannot modify passwords" tip) is accurate.
- **API key list response has no `lastUsed` field.** The real shape (`ApiKeyApi.ts:15-19`) is
  `{id, label, createdAt}` only. If the portal UI displays a "last used" value, it isn't sourced
  from this endpoint — check the underlying model/UI code before documenting it here. Everything
  else in `api-keys.md` (the Local-only route limitations list, list/create/delete endpoints and
  bodies) is accurate.
- **`POST /v1/auth/refresh` response has no `expiresIn`.** The real payload
  (`refreshIdentitySession.ts:65-69`) returns `{accessToken, refreshToken, auth}` (a decoded JWT
  payload with `exp`, etc.), not a precomputed seconds value. Everything else in `sessions.md`
  (sessions list with `includeExpired`, logout-by-session, `/me`, `/validate`, device/browser/OS/
  location fields including the GDPR "last octet removed" IP-anonymization claim, genuinely
  implemented in `getDeviceFingerprint.ts`) is accurate.

## Confirmed accurate

`index.md`'s "No MFA required when using WebAuthn" claim (`loginIdentityWithWebAuthn.ts` never
checks challenge/MFA state, unlike `loginIdentityWithLocalAuth.ts`) and the API-key
security-sensitive-operation restriction are both accurate.

## `## API Reference` sections link out instead of embedding raw examples

Applies to `password.md`, `mfa.md`, `webauthn.md`, `api-keys.md`, `sessions.md`. Condense each
page's `## API Reference` section to one or two sentences linking directly to the relevant tag on
`https://api.cloudpirates.dev/docs/` (note: `.dev`, not `.io`) instead of listing every endpoint as
a raw request/response code block. Keep standalone tip/warning/info boxes that state a general
capability fact (e.g. "API Keys Cannot Modify Passwords", "Bearer Token Required for Session
Management"); cut prose that only explains one specific request/response body (e.g. the two-step
SMS/TOTP activation explanation that used to live inline in `mfa.md` — now just the Swagger link).
If applying this same pattern to another domain, follow the same split: keep general-fact boxes,
cut example-bound prose and code, link to the matching Swagger tag. See `api-reference-links.md`
for the repo-wide version of this convention.

**Swagger UI tags are prefixed `Auth`, not the bare backend class name minus `Api`** (verified
against the live docs, not inferred):

| Page | Backend class | Real anchor |
| --- | --- | --- |
| `password.md` | `AuthApi` | `#/Auth` |
| `mfa.md` | `ChallengeApi` | `#/Auth%20Challenge` |
| `webauthn.md` | `WebAuthnApi` | `#/Auth%20Challenge` (same tag as `mfa.md` — WebAuthn's challenge endpoint shares the Challenge tag rather than getting its own; re-verify if this looks wrong) |
| `api-keys.md` | `ApiKeyApi` | `#/Auth%20API%20Key` |
| `sessions.md` | `SessionApi` | `#/Auth%20Session` (not live yet, see below) |

Don't guess anchors as `#/<ClassName>` (e.g. `#/Session`, `#/WebAuthn`) — verified wrong.

**`sessions.md`'s API Reference is intentionally not converted to a link yet.** The
`#/Auth%20Session` tag doesn't exist yet on the live docs site, so `sessions.md` keeps raw
`List Sessions`/`Logout Session` examples (its `Get Current User`/`Validate Session` examples were
dropped rather than kept). There's a `<!-- TODO: Implement session API documentation -->` HTML
comment with the intended link commented out right below the examples. When that tag goes live,
swap the raw examples for that commented-out link (matching the other four pages) and check
whether `Get Current User`/`Validate Session` need to come back too.

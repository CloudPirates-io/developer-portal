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

---
paths:
  - "src/authentication/**"
---

# Authentication docs

Authentication is served by `authenticationservice`'s own Express app, not by ApiGateway. The
routes live in `authenticationservice/src/Api/v1/{AuthApi,ChallengeApi,WebAuthnApi,ApiKeyApi,
SessionApi}.ts` with handlers under `authenticationservice/src/Auth/**`. ApiGateway's
`src/Authentication/` directory only holds middleware for authenticating requests to other
ApiGateway routes, so don't look for these handlers there.

## `webauthn.md` endpoint shapes

- List keys: `GET /v1/auth/webauthn` (no `/devices` segment).
- Delete a key: `DELETE /v1/auth/webauthn/{webAuthnKeyId}`.
- Rename a key: `PUT /v1/auth/webauthn/{webAuthnKeyId}/label`.
- Register: the body is the raw WebAuthn `RegistrationJSON`, with no wrapper object and no
  client-supplied `label` field. The label is derived server-side from the WebAuthn ceremony
  (`validatedRegistration.user.name`).
- Login: the body is the raw `AuthenticationResponseJSON`, with no `credential` wrapper key.
- `POST /v1/auth/webauthn/challenge` (returns `{challenge}`) is a mandatory step before both
  register and login. Both handlers look the challenge up in Redis and fail without it.

## `mfa.md` endpoint shapes

- **The SMS field name is `number`**, not `phoneNumber`.
- **SMS/TOTP setup is a two-phase flow.** `POST /v1/auth/challenges/sms` (or `/totp`) returns a
  `verificationToken` (SMS) or `otpAuthUri` (TOTP); the challenge only becomes usable for login
  after `POST /v1/auth/challenges/sms/activate` `{verificationToken, challengeCode}` or
  `POST /v1/auth/challenges/totp/activate` `{token}`. Document both `/activate` endpoints as
  separate steps, not as an implementation detail of the first call.
- **`desiredChallenge` is uppercase-only** (`SMS`, `TOTP`). Lowercase is rejected with a 400
  `ChallengeTypeInvalidError`.
- Login with a challenge is `POST /v1/auth/login/challenge` `{verificationToken, challengeCode}`.

## `password.md`, `api-keys.md`, `sessions.md` shapes

- **Change-password body** is `{"existingPassword": "...", "password": "..."}`, not
  `{"currentPassword", "newPassword"}`.
- **The API key list response** is `{id, label, createdAt}`.
- **`POST /v1/auth/refresh`** returns `{accessToken, refreshToken, auth}`, where `auth` is a decoded
  JWT payload (with `exp` and friends), not a precomputed `expiresIn` value.
- Sessions carry device/browser/OS/location details, and client IPs are anonymized by dropping the
  last octet.

## Facts worth keeping on the pages

WebAuthn logins don't require MFA (the WebAuthn login path never checks challenge state, unlike
local auth), and API keys can't perform security-sensitive operations such as changing a password.

## `## API Reference` sections link out instead of embedding raw examples

Applies to `password.md`, `mfa.md`, `webauthn.md`, `api-keys.md`, `sessions.md`. Each page's
`## API Reference` section is one or two sentences linking to the relevant tag on
`https://api.cloudpirates.dev/docs/` (note: `.dev`, not `.io`), not a raw request/response code
block per endpoint. Keep standalone tip/warning/info boxes that state a general capability fact
(e.g. "API Keys Cannot Modify Passwords", "Bearer Token Required for Session Management"); cut
prose that only explains one specific request/response body. See `api-reference-links.md` for the
repo-wide version of this convention.

**Swagger UI tags are prefixed `Auth`**, not the bare backend class name minus `Api`. Don't guess
anchors as `#/<ClassName>` (e.g. `#/Session`, `#/WebAuthn`); those are wrong.

| Page          | Backend class  | Anchor                                                        |
| ------------- | -------------- | ------------------------------------------------------------- |
| `password.md` | `AuthApi`      | `#/Auth`                                                      |
| `mfa.md`      | `ChallengeApi` | `#/Auth%20Challenge`                                          |
| `webauthn.md` | `WebAuthnApi`  | `#/Auth%20Challenge` (shares the Challenge tag with `mfa.md`) |
| `api-keys.md` | `ApiKeyApi`    | `#/Auth%20API%20Key`                                          |
| `sessions.md` | `SessionApi`   | `#/Auth%20Session`                                            |

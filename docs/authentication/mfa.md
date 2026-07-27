# Multi-Factor Authentication (MFA)

Add an extra security layer to password authentication.

## Overview

MFA adds a second verification step after password entry:

- **SMS**: Receive codes via text message
- **TOTP**: Use authenticator apps

::: tip Tip: WebAuthn Users
WebAuthn provides strong authentication by default. MFA is not required for WebAuthn login.
:::

## SMS Authentication

### Setup

1. Login to [portal.cloudpirates.io](https://portal.cloudpirates.io)
2. Navigate to [security page](https://portal.cloudpirates.io/security)
3. Select "SMS Authentication"
4. Enter mobile phone number
5. Enter registration token from SMS

### Login

1. Enter email and password
2. Receive verification code via SMS
3. Enter code to complete login

## TOTP (Authenticator Apps)

### Supported Apps

- Google Authenticator: [iOS](https://apps.apple.com/app/google-authenticator/id388497605) | [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2)
- Authy: [iOS](https://apps.apple.com/app/authy/id494168017) | [Android](https://play.google.com/store/apps/details?id=com.authy.authy)
- Any TOTP-compatible authenticator

### Setup with QR Code

1. Login to [portal.cloudpirates.io](https://portal.cloudpirates.io)
2. Navigate to [security page](https://portal.cloudpirates.io/security)
3. Select "Authenticator App (TOTP)"
4. Scan QR code with authenticator app
5. Enter generated 6-digit code

### Setup Manually

1. Click "I can't use the QR Code"
2. Copy secret key
3. Add to authenticator app manually
4. Enter generated code

### Login

1. Enter email and password
2. Open authenticator app
3. Enter current 6-digit code

::: tip Tip: Accurate Device Clock Required
Ensure your device clock is accurate for TOTP codes to work correctly.
:::

## Managing MFA

Access [security page](https://portal.cloudpirates.io/security) to:

- View active MFA methods
- Enable additional methods
- Disable methods

### Multiple Methods

Enable both SMS and TOTP:

- Use SMS when authenticator unavailable
- Use TOTP when SMS unavailable
- Choose preferred method during login

## API Reference

### List MFA Methods

```http
GET /v1/auth/challenges
Authorization: Bearer <access-token>
```

### Enable SMS

Setting up SMS is a two-step process. First request a challenge:

```http
POST /v1/auth/challenges/sms
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "number": "+1234567890"
}
```

Response:

```json
{
  "verificationToken": "token"
}
```

Then activate it with the code received via SMS:

```http
POST /v1/auth/challenges/sms/activate
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "verificationToken": "token",
  "challengeCode": "123456"
}
```

The SMS challenge isn't usable for login until activation completes.

### Enable TOTP

Setting up TOTP is also a two-step process. First request a challenge:

```http
POST /v1/auth/challenges/totp
Authorization: Bearer <access-token>
```

Response:

```json
{
  "otpAuthUri": "otpauth://totp/..."
}
```

Then activate it with the current code from your authenticator app:

```http
POST /v1/auth/challenges/totp/activate
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "token": "123456"
}
```

The TOTP challenge isn't usable for login until activation completes.

### Login with MFA

```http
POST /v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password",
  "desiredChallenge": "SMS"
}
```

`desiredChallenge` accepts `SMS` or `TOTP` (uppercase only — lowercase values are rejected with a `400`).

Then complete with challenge code:

```http
POST /v1/auth/login/challenge
Content-Type: application/json

{
  "verificationToken": "token",
  "challengeCode": "123456"
}
```

::: info Info: Full API Documentation Available
These are example requests. For complete API documentation including all parameters, response schemas, and authentication details, visit [api.cloudpirates.io/docs](https://api.cloudpirates.io/docs/).
:::

## Related Resources

- [Password Authentication](./password.md)
- [WebAuthn Authentication](./webauthn.md)
- [Session Management](./sessions.md)

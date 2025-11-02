# Multi-Factor Authentication (MFA)

Add an extra security layer to password authentication.

## Overview

MFA adds a second verification step after password entry:

- **SMS**: Receive codes via text message
- **TOTP**: Use authenticator apps

::: tip WebAuthn Users
WebAuthn provides strong authentication by default. MFA not required for WebAuthn login.
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
- 1Password: [Website](https://1password.com/)
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

::: tip
Ensure device clock is accurate for TOTP codes.
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

## API Endpoints

### List MFA Methods

```http
GET /v1/auth/challenges
Authorization: Bearer <access-token>
```

### Enable SMS

```http
POST /v1/auth/challenges/sms
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "phoneNumber": "+1234567890"
}
```

### Enable TOTP

```http
POST /v1/auth/challenges/totp
Authorization: Bearer <access-token>
```

### Login with MFA

```http
POST /v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password",
  "desiredChallenge": "sms"
}
```

Then complete with challenge code:

```http
POST /v1/auth/login/challenge
Content-Type: application/json

{
  "verificationToken": "token",
  "challengeCode": "123456"
}
```

## Related Resources

- [Password Authentication](./password.md)
- [WebAuthn Authentication](./webauthn.md)
- [Session Management](./sessions.md)
- [API Reference](https://api.cloudpirates.io/docs/#tag/Auth-Challenge)

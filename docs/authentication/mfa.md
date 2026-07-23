# Multi-Factor Authentication (MFA)

Add an extra security layer to password authentication.

## Overview

MFA adds a second verification step after password entry:

- **SMS**: Receive codes via text message
- **TOTP**: Use authenticator apps

::: tip WebAuthn Users
WebAuthn provides strong authentication by default. MFA is not required for WebAuthn login.
:::

## SMS Authentication

### Setup

1. Navigate to [portal.cloudpirates.io/security](https://portal.cloudpirates.io/security)
2. Select "SMS Authentication"
3. Enter mobile phone number
4. Enter registration token from SMS

### Login

1. Enter email and password
2. Receive verification code via SMS
3. Enter code to complete login

## TOTP (Authenticator Apps)

### Supported Apps

- Google Authenticator:
  [iOS](https://apps.apple.com/app/google-authenticator/id388497605) |
  [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2)
- Authy:
  [iOS](https://apps.apple.com/app/authy/id494168017) |
  [Android](https://play.google.com/store/apps/details?id=com.authy.authy)
- Any TOTP-compatible authenticator

### Setup with QR Code

1. Navigate to [portal.cloudpirates.io/security](https://portal.cloudpirates.io/security)
2. Select "Authenticator App (TOTP)"
3. Scan QR code with authenticator app
4. Enter generated 6-digit code

### Setup Manually

1. Click "I can't use the QR Code"
2. Copy secret key
3. Add to authenticator app manually
4. Enter generated 6-digit code

### Login

1. Enter email and password
2. Open authenticator app
3. Enter current 6-digit code

::: tip Accurate Device Clock Required
Ensure your device clock is accurate for TOTP codes to work correctly.
:::

## Managing MFA

Access [portal.cloudpirates.io/security](https://portal.cloudpirates.io/security) to:

- View active MFA methods
- Enable additional methods
- Disable methods

### Multiple Methods

Enable both SMS and TOTP:

- Use SMS when authenticator unavailable
- Use TOTP when SMS unavailable
- Choose preferred method during login

## API Reference

For MFA setup, activation, and login-with-MFA requests, see the
[Auth API reference](https://api.cloudpirates.dev/docs/#/Auth%20Challenge).

## Related Resources

- [Password Authentication](./password.md)
- [WebAuthn Authentication](./webauthn.md)
- [Session Management](./sessions.md)

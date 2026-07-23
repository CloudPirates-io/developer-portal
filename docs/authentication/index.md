---
prev: false
---

# Authentication

CloudPirates supports several ways to authenticate your account and API requests: passwords,
WebAuthn passkeys, and API keys. Add MFA to strengthen password logins.

## Portal Access

Manage your authentication methods, security settings, and active sessions from the
[CloudPirates Portal](https://portal.cloudpirates.io).

## Authentication Methods

CloudPirates supports the following authentication methods:

### Password Authentication

Email and password authentication with optional MFA. This is the default method for new accounts.

- Account registration at [/register](https://portal.cloudpirates.io/register)
- Email validation required before first login
- Optional two-factor authentication via SMS or authenticator app
- Password recovery available

[Learn more about password authentication →](./password.md)

### Passkeys (WebAuthn)

Passwordless authentication using hardware security keys, biometric authenticators, or platform
authenticators (Face ID, Touch ID, Windows Hello).

- No MFA required when logging in while using WebAuthn
- Support for multiple devices

::: warning Password Login Still Available
WebAuthn does not disable password authentication.
Enable [MFA](./mfa.md) for password login as an additional layer.
:::

[Learn more about Passkeys →](./webauthn.md)

### API Keys

Programmatic API access for automated systems and integrations.

- Create multiple API keys with custom labels
- Manage keys through the portal
- Use for API authentication instead of session tokens
- Can't be used for security-sensitive operations

[Learn more about API keys →](./api-keys.md)

## Multi-Factor Authentication (MFA)

Add an extra layer of security to password-based authentication:

- **SMS Authentication**: Receive verification codes via text message
- **Authenticator Apps**: Use TOTP codes from apps like Google Authenticator, 1Password, or Authy

::: info Passkey Login Skips the MFA Prompt
Logging in with a Passkey (WebAuthn) doesn't require MFA, even if it is set up for password login.
:::

[Learn more about MFA →](./mfa.md)

## Session Management

Monitor and control your active login sessions across all devices:

- View all active sessions with device and location information
- Identify your current session
- Remote logout from any device
- Automatic session invalidation upon logout

[Learn more about session management →](./sessions.md)

## Getting Started

1. **Register**: Create an account at
   [portal.cloudpirates.io/register](https://portal.cloudpirates.io/register)
2. **Verify Email**: Check your inbox and verify your email address
3. **Login**: Access your account at [portal.cloudpirates.io](https://portal.cloudpirates.io)
4. **Secure Your Account**: Visit [portal.cloudpirates.io/security](https://portal.cloudpirates.io/security)
   to add MFA or WebAuthn

## Related Resources

- [API Documentation](/api/)
- [CloudPirates Portal](https://portal.cloudpirates.io)

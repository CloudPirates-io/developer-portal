---
prev: false
---

# Authentication

CloudPirates provides multiple authentication methods to secure your account and API access. Our authentication system is designed to be flexible, secure, and user-friendly.

## Portal Access

All authentication management is handled through the [CloudPirates Portal](https://portal.cloudpirates.io). The portal provides a user-friendly interface to manage your account security settings, authentication methods, and active sessions.

## Authentication Methods

CloudPirates supports the following authentication methods:

### Password Authentication

Traditional email and password authentication with multi-factor authentication (MFA) support. This is the default authentication method for new accounts.

- Account registration at [/register](https://portal.cloudpirates.io/register)
- Email validation required before first login
- Optional two-factor authentication via SMS or authenticator app
- Password recovery available

[Learn more about password authentication →](./password.md)

### WebAuthn (Passkeys)

Modern passwordless authentication using hardware security keys, biometric authenticators, or platform authenticators (Face ID, Touch ID, Windows Hello).

- Alternative authentication method (password login remains available)
- No MFA required when using WebAuthn
- Support for multiple devices
- Enhanced security with hardware-backed credentials
- Recommended: Enable MFA for password login when using WebAuthn

[Learn more about WebAuthn →](./webauthn.md)

### API Keys

Programmatic API access for automated systems and integrations.

- Create multiple API keys with custom labels
- Manage keys through the portal
- Use for API authentication instead of session tokens
- Cannot be used for security-sensitive operations

[Learn more about API keys →](./api-keys.md)

## Multi-Factor Authentication (MFA)

Add an extra layer of security to password-based authentication:

- **SMS Authentication**: Receive verification codes via text message
- **Authenticator Apps**: Use TOTP codes from apps like Google Authenticator, 1Password, or Authy

Note: MFA is only required for password authentication. WebAuthn provides strong authentication by default and does not require additional MFA.

[Learn more about MFA →](./mfa.md)

## Session Management

Monitor and control your active login sessions across all devices:

- View all active sessions with device and location information
- Identify your current session
- Remote logout from any device
- Automatic session invalidation upon logout

[Learn more about session management →](./sessions.md)

## Account Security

Manage your account security through the [security page](https://portal.cloudpirates.io/security):

- Change your password
- Register and manage WebAuthn devices
- Configure multi-factor authentication
- Manage API keys
- View and control active sessions

## Getting Started

1. **Register**: Create an account at [portal.cloudpirates.io/register](https://portal.cloudpirates.io/register)
2. **Verify Email**: Check your inbox and verify your email address
3. **Login**: Access your account at [portal.cloudpirates.io](https://portal.cloudpirates.io)
4. **Secure Your Account**: Visit the [security page](https://portal.cloudpirates.io/security) to add MFA or WebAuthn

## Related Resources

- [API Documentation](/api/)
- [CloudPirates Portal](https://portal.cloudpirates.io)
- [API Reference](https://api.cloudpirates.io/docs/)

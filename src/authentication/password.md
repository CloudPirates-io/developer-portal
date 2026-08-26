# Password Authentication

Email and password-based authentication for CloudPirates accounts.

## Registration

Create an account at [portal.cloudpirates.io/register](https://portal.cloudpirates.io/register).

**Required Information**:

- First and last name
- Email address (used as username)
- Secure password

### Password Requirements

Passwords are validated against known data breaches using
[Have I Been Pwned](https://haveibeenpwned.com/):

- Not found in known data breaches
- Sufficiently complex

## Email Verification

After registration, verify your email before logging in:

1. Check your inbox for the verification email
2. Click the activation link or copy the activation code
3. Activate your account at [portal.cloudpirates.io/auth/activate](https://portal.cloudpirates.io/auth/activate)

## Login

Login at [portal.cloudpirates.io](https://portal.cloudpirates.io) with email and password.

If MFA is enabled, input the verification code.

## Password Recovery

Forgot password?

1. Go to [portal.cloudpirates.io/request-reset-password](https://portal.cloudpirates.io/request-reset-password)
2. Enter your email address
3. Check your inbox for the reset email
4. Click the reset link
5. Enter a new password

::: info No Access to Email or MFA Device?
If you don't have access to your email address or MFA device, contact
[support@cloudpirates.io](mailto:support@cloudpirates.io) for assistance.
A password reset doesn't disable MFA.
:::

## Changing Password

1. Navigate to [portal.cloudpirates.io/security](https://portal.cloudpirates.io/security)
2. Locate the Change Password section
3. Enter your current password
4. Enter a new password
5. Confirm

## API Reference

For registration, login, password reset, and password change requests, see the
[Auth API reference](https://api.cloudpirates.io/docs/#/Auth).

::: tip API Keys Cannot Modify Passwords
API keys cannot be used to modify your password. Use your Bearer token instead for this operation.
:::

## Related Resources

- [Multi-Factor Authentication (MFA)](./mfa.md)
- [WebAuthn Authentication](./webauthn.md)
- [Session Management](./sessions.md)

# Password Authentication

Email and password-based authentication for CloudPirates accounts.

## Registration

Create an account at [portal.cloudpirates.io/register](https://portal.cloudpirates.io/register).

**Required Information**:

- First and last name
- Email address (used as username)
- Secure password

### Password Requirements

Passwords are validated against known data breaches using [Have I Been Pwned](https://haveibeenpwned.com/):

- Not found in known data breaches
- Sufficiently complex

## Email Verification

After registration, verify your email before logging in:

1. Check your inbox for verification email
2. Click the activation link
3. Account is activated

## Login

Login at [portal.cloudpirates.io](https://portal.cloudpirates.io) with email and password.

**With MFA**: Enter password, then verification code.

## Password Recovery

Forgot password?

1. Go to [request-reset-password](https://portal.cloudpirates.io/request-reset-password)
2. Enter email address
3. Click reset link in email
4. Enter new password

::: warning Account Locked?
Contact [support@cloudpirates.io](mailto:support@cloudpirates.io) if locked. Password reset doesn't disable MFA.
:::

## Changing Password

1. Navigate to [security page](https://portal.cloudpirates.io/security)
2. Locate password change section
3. Enter current password
4. Enter new password
5. Confirm

## API Endpoints

### Registration

```http
POST /v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Login

```http
POST /v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

### Password Reset

```http
POST /v1/auth/request-reset-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Change Password

```http
POST /v1/auth/change-password
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "currentPassword": "current",
  "newPassword": "new"
}
```

::: tip
Change password requires Bearer token, not API keys.
:::

## Related Resources

- [Multi-Factor Authentication (MFA)](./mfa.md)
- [WebAuthn Authentication](./webauthn.md)
- [Session Management](./sessions.md)
- [API Reference](https://api.cloudpirates.io/docs/#tag/Auth)

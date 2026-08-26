---
next: false
---

# Session Management

Monitor and control active login sessions across devices.

## Overview

Access session management at
[portal.cloudpirates.io/security](https://portal.cloudpirates.io/security):

- View all active sessions
- Monitor activity and locations
- Remotely logout from devices

## Viewing Sessions

Each session shows:

- Device and browser info
- Operating system
- Location (city-level, GDPR-compliant)
- First login time
- Current session indicator

## Managing Sessions

### Logout from Session

1. Navigate to [portal.cloudpirates.io/security](https://portal.cloudpirates.io/security)
2. Find session to terminate
3. Click "Logout Device"
4. Confirm

::: info Immediate Session Logout
Session logout is immediate. The device must re-authenticate to regain access.
:::

## Session Information

### Location

Location estimated from IP address (last octet removed for GDPR compliance):

- City-level approximation
- Identifies unusual login locations

### Device Details

- Browser name and version
- Operating system and version

## Token Types

### Access Tokens

- Short-lived (15-60 minutes)
- Authorize API requests
- Include in Authorization header

### Refresh Tokens

- Long-lived (days to weeks)
- Obtain new access tokens
- Store securely

## Token Refresh

```http
POST /v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

Response:

```json
{
  "accessToken": "new-access-token",
  "refreshToken": "new-refresh-token",
  "auth": {
    "jti": "...",
    "exp": 1234567890
  }
}
```

`auth` is the decoded JWT payload for the new access token (includes `exp`, the expiration as a
Unix timestamp).

Both tokens rotate for security.

## API Reference

### List Sessions

```http
GET /v1/auth/sessions
Authorization: Bearer <access-token>
```

Query Parameters:

- `includeExpired` (optional): Set to `true` to include expired sessions

### Logout Session

```http
POST /v1/auth/sessions/{sessionId}/logout
Authorization: Bearer <access-token>
```

<!-- TODO: Implement session API documentation -->
<!-- For session listing and logout requests, see the
[Session API reference](https://api.cloudpirates.io/docs/#/Auth%20Session). -->

::: warning Bearer Token Required for Session Management
API keys cannot be used for session management operations. A Bearer token is required.
:::

## Related Resources

- [Password Authentication](./password.md)
- [WebAuthn Authentication](./webauthn.md)
- [Multi-Factor Authentication (MFA)](./mfa.md)
- [API Keys](./api-keys.md)

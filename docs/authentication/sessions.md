# Session Management

Monitor and control active login sessions across devices.

## Overview

Access session management from the [security page](https://portal.cloudpirates.io/security) to:

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

1. Navigate to [security page](https://portal.cloudpirates.io/security)
2. Find session to terminate
3. Click "Logout Device"
4. Confirm

::: warning
Session logout is immediate. Device must re-authenticate.
:::

### Logout Current Session

Use standard logout button in portal.

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
  "expiresIn": 3600
}
```

Both tokens rotate for security.

## API Endpoints

### Get Current User

```http
GET /v1/auth/me
Authorization: Bearer <access-token>
```

### Validate Session

```http
GET /v1/auth/validate
Authorization: Bearer <access-token>
```

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

::: warning
API keys cannot be used for session management. Requires Bearer token.
:::

## Related Resources

- [Password Authentication](./password.md)
- [WebAuthn Authentication](./webauthn.md)
- [Multi-Factor Authentication (MFA)](./mfa.md)
- [API Keys](./api-keys.md)
- [API Reference](https://api.cloudpirates.io/docs/#tag/Auth)

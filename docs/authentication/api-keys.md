# API Key Management

Programmatic access to CloudPirates API for automated systems and applications.

## Overview

API keys enable:
- Authentication without interactive login
- CI/CD pipeline integration
- Service accounts for applications
- Multiple keys for different environments

## Creating API Keys

1. Login to [portal.cloudpirates.io](https://portal.cloudpirates.io)
2. Navigate to [security page](https://portal.cloudpirates.io/security)
3. Click "Create API Key"
4. Enter descriptive label
5. **Save key immediately** (shown only once)

::: danger Danger: API Key Shown Only Once
The API key is shown only once during creation. You must store it securely. If the key is lost, you will need to create a new key.
:::

### Labeling

Use clear labels:
- Purpose: "Production Server", "CI/CD"
- Service: "GitHub Actions", "Jenkins"
- Environment: "Production", "Staging"

## Using API Keys

### Authorization Header

```http
Authorization: ApiKey <YOUR_API_KEY>
```

### Examples

**curl**:
```bash
curl -H "Authorization: ApiKey YOUR_KEY" \
  https://api.cloudpirates.io/v1/auth/me
```

**JavaScript**:
```javascript
fetch('https://api.cloudpirates.io/v1/auth/me', {
  headers: { 'Authorization': 'ApiKey YOUR_KEY' }
});
```

**Python**:
```python
requests.get(
  'https://api.cloudpirates.io/v1/auth/me',
  headers={'Authorization': 'ApiKey YOUR_KEY'}
)
```

## Managing Keys

### View Keys

Access [security page](https://portal.cloudpirates.io/security) to see:
- Label
- Key ID
- Creation date
- Last used

### Delete Keys

1. Navigate to security page
2. Find key to delete
3. Click "Delete"
4. Confirm

Keys are immediately invalidated.

### Rotate Keys

1. Create new key
2. Update applications with new key
3. Test new key
4. Delete old key

## Limitations

API keys cannot be used for:
- `/v1/auth/change-password`
- `/v1/auth/challenges/*` (MFA)
- `/v1/auth/webauthn/register`
- `/v1/auth/api-keys` (key management)

::: info Info: Bearer Token Required for Security-Sensitive Operations
Security-sensitive operations require interactive authentication using a Bearer token instead of an API key.
:::

## API Reference

### List Keys

```http
GET /v1/auth/api-keys
Authorization: Bearer <access-token>
```

### Create Key

```http
POST /v1/auth/api-keys
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "label": "My Application"
}
```

### Delete Key

```http
DELETE /v1/auth/api-keys/{apiKeyId}
Authorization: Bearer <access-token>
```

::: info Info: Full API Documentation Available
These are example requests. For complete API documentation including all parameters, response schemas, and authentication details, visit [api.cloudpirates.io/docs](https://api.cloudpirates.io/docs/).
:::

## Related Resources

- [Password Authentication](./password.md)
- [WebAuthn Authentication](./webauthn.md)
- [Session Management](./sessions.md)

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

::: danger
API key shown only once. Store securely. If lost, create new key.
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

::: info
Security-sensitive operations require interactive authentication (Bearer token).
:::

## API Endpoints

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

## Security Best Practices

### Storage

- Use environment variables
- Use secret management services (AWS Secrets Manager, HashiCorp Vault)
- Never commit to version control
- Never expose in client-side code

### Management

- Create separate keys per purpose
- Rotate keys periodically (every 90 days)
- Delete unused keys
- Monitor key usage

### Incident Response

If compromised:
1. Delete key immediately
2. Create replacement key
3. Update all services
4. Review logs for unauthorized usage

## Related Resources

- [Password Authentication](./password.md)
- [WebAuthn Authentication](./webauthn.md)
- [Session Management](./sessions.md)
- [API Reference](https://api.cloudpirates.io/docs/#tag/Auth-API-Key)

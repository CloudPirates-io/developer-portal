# API Key Management

Programmatic access to CloudPirates API for automated systems and applications.

## Overview

API keys enable:

- Authentication without interactive login
- CI/CD pipeline integration
- Service accounts for applications
- Multiple keys for different environments

## Creating API Keys

1. Navigate to [portal.cloudpirates.io/security](https://portal.cloudpirates.io/security)
2. Click "Create API Key"
3. Enter descriptive label
4. **Save key immediately** (shown only once)

::: warning API Key Shown Only Once
The API key is shown only once during creation. You must store it securely. If the key is lost,
you will need to create a new key.
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
fetch("https://api.cloudpirates.io/v1/auth/me", {
  headers: { Authorization: "ApiKey YOUR_KEY" },
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

API Keys are managed at [portal.cloudpirates.io/security](https://portal.cloudpirates.io/security).

### View Keys

There you can see all your API Keys, for each:

- Label
- Key ID
- Creation date

### Delete Keys

1. Find the correct API Key in list
2. Click "Delete"
3. Confirm

Keys are immediately invalidated.

### Rotate Keys

1. Create a new key
2. Update your applications with the new key
3. Test that the new key works
4. Delete the old key

## Limitations

API keys can't be used for:

- `/v1/auth/change-password`
- `/v1/auth/challenges/*` (MFA)
- `/v1/auth/webauthn/register`
- `/v1/auth/api-keys` (key management)

::: info Bearer Token Required for Security-Sensitive Operations
Security-sensitive operations require interactive authentication using a Bearer token instead of
an API key.
:::

## API Reference

For key listing, creation, and deletion requests, see the
[API Key reference](https://api.cloudpirates.dev/docs/#/Auth%20API%20Key).

## Related Resources

- [Password Authentication](./password.md)
- [WebAuthn Authentication](./webauthn.md)
- [Session Management](./sessions.md)

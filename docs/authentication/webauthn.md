# Passkeys (WebAuthn)

Passwordless authentication using hardware security keys, biometrics, or passkeys.

## What is WebAuthn?

WebAuthn enables authentication using:

- **Platform Authenticators**: Face ID, Touch ID, Windows Hello
- **Security Keys**: YubiKey, Titan Security Key
- **Passkeys**: iCloud Keychain, Google Password Manager

## Benefits

- Hardware-backed security
- Phishing-resistant
- No MFA required for WebAuthn login
- User-friendly

::: warning Warning: Password Login Still Available
WebAuthn does not disable password authentication. You should enable MFA for password login as an additional security layer.
:::

## Setting Up WebAuthn

1. Login to [portal.cloudpirates.io](https://portal.cloudpirates.io)
2. Navigate to [security page](https://portal.cloudpirates.io/security)
3. Click "Register WebAuthn Device"
4. Enter device label (e.g., "MacBook Touch ID")
5. Follow browser prompts to complete registration

## Using WebAuthn

1. Go to [portal.cloudpirates.io](https://portal.cloudpirates.io)
2. Click "Sign in with WebAuthn"
3. Use biometrics or security key

::: tip Tip: No MFA Required
WebAuthn provides strong authentication by default. MFA is not needed for WebAuthn login.
:::

## Managing Devices

### View Devices

Access the [security page](https://portal.cloudpirates.io/security) to see all registered devices.

### Remove Device

1. Navigate to security page
2. Find device to remove
3. Click "Delete"
4. Confirm

::: warning Warning: Keep at Least One Authentication Method
You must keep at least one active authentication method to maintain access to your account.
:::

## Multiple Devices

Register multiple devices for flexibility:

- Primary device (laptop/phone)
- Backup security key
- Mobile device
- Desktop device

## API Reference

### Register Device

```http
POST /v1/auth/webauthn/register
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "label": "My Device",
  "credential": {...}
}
```

### Login with WebAuthn

```http
POST /v1/auth/webauthn/login
Content-Type: application/json

{
  "credential": {...}
}
```

### List Devices

```http
GET /v1/auth/webauthn/devices
Authorization: Bearer <access-token>
```

### Delete Device

```http
DELETE /v1/auth/webauthn/devices/{deviceId}
Authorization: Bearer <access-token>
```

::: info Info: Full API Documentation Available
These are example requests. For complete API documentation including all parameters, response schemas, and authentication details, visit [api.cloudpirates.io/docs](https://api.cloudpirates.io/docs/).
:::

## Related Resources

- [Password Authentication](./password.md)
- [Multi-Factor Authentication (MFA)](./mfa.md)
- [Session Management](./sessions.md)
- [WebAuthn Specification](https://www.w3.org/TR/webauthn/)

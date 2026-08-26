# Passkeys (WebAuthn)

Passwordless authentication using hardware security keys, biometrics, or passkeys.

## What Is WebAuthn?

WebAuthn enables authentication using:

- **Platform Authenticators**: Face ID, Touch ID, Windows Hello
- **Security Keys**: YubiKey, Titan Security Key
- **Passkeys**: iCloud Keychain, Google Password Manager

## Benefits

- Hardware-backed security
- Phishing-resistant
- No MFA required for WebAuthn login

::: warning Password Login Still Available
WebAuthn does not disable password authentication.
Enable [MFA](./mfa.md) for password login as an additional layer.
:::

## Setting Up WebAuthn

2. Navigate to [portal.cloudpirates.io/security](https://portal.cloudpirates.io/security)
3. Click "Register WebAuthn Device"
4. Enter device label (e.g., "MacBook Touch ID")
5. Follow browser prompts to complete registration

## Using WebAuthn

1. Go to [portal.cloudpirates.io](https://portal.cloudpirates.io)
2. Click "Sign in with WebAuthn"
3. Use biometrics or security key

::: tip No MFA Required
WebAuthn provides strong authentication by default (specific hardware device). MFA is not needed
for a WebAuthn login.
:::

## Managing Devices

### View Devices

Access [portal.cloudpirates.io/security](https://portal.cloudpirates.io/security) to see all
registered devices.

### Remove Device

1. Navigate to security page
2. Find device to remove
3. Click "Delete"
4. Confirm

::: warning Keep at Least One Authentication Method
Deleting your last authentication method without another sign-in method configured (e.g. a
password) locks you out of your account.
:::

## Multiple Devices

Register multiple devices for flexibility:

- Primary device (laptop/phone)
- Backup security key
- Mobile device
- Desktop device

## API Reference

For challenge, registration, login, and device management requests, see the
[WebAuthn API reference](https://api.cloudpirates.dev/docs/#/Auth%20Challenge).

## Related Resources

- [Password Authentication](./password.md)
- [Multi-Factor Authentication (MFA)](./mfa.md)
- [Session Management](./sessions.md)
- [WebAuthn Specification](https://www.w3.org/TR/webauthn/)

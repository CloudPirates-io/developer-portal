---
next: false
---

# Workspace Billing

Assign billing profiles to workspaces to enable paid features.

::: info Info: Personal Billing Profiles
Billing profiles are personal and belong to your account. Learn more about [Billing Profiles →](/billing/billing-profiles.md).
:::

## Assigning Billing Profiles

**Prerequisites**:
- You must be a workspace Owner
- You must have a billing profile

**Steps**:
1. Navigate to workspace settings
2. Find billing section
3. Click "Assign Billing Profile"
4. Select from your billing profiles
5. Confirm assignment

Paid features are enabled immediately.

::: warning Warning: You Are Responsible for All Workspace Charges
You are responsible for all workspace charges, regardless of which member uses the services.
:::

## Managing Billing

### Change Billing Profile

1. Navigate to workspace billing settings
2. Click "Change Billing Profile"
3. Select different profile
4. Confirm change

### Remove Billing Profile

1. Navigate to workspace billing settings
2. Click "Remove Billing Profile"
3. Confirm removal

::: warning Warning: Removing Billing Disables Paid Features
Removing the billing profile from a workspace will immediately disable all paid features for that workspace.
:::

## Multiple Workspaces

One billing profile can be assigned to multiple workspaces, providing consolidated billing with a single invoice. Per-workspace breakdown available in billing portal.

## API Reference

### Get Billing Status

```http
GET /v1/workspaces/{workspaceId}/billing
Authorization: Bearer <access-token>
```

### Assign Billing Profile

```http
POST /v1/workspaces/{workspaceId}/billing
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "billingProfileId": "bp-123456"
}
```

### Remove Billing Profile

```http
DELETE /v1/workspaces/{workspaceId}/billing
Authorization: Bearer <access-token>
```

::: info Info: Full API Documentation Available
These are example requests. For complete API documentation including all parameters, response schemas, and authentication details, visit [api.cloudpirates.io/docs](https://api.cloudpirates.io/docs/).
:::

## Related Resources

- [Billing Overview](/billing/)
- [Billing Profiles](/billing/billing-profiles.md)
- [Invoices](/billing/invoices.md)
- [Managing Workspaces](./managing-workspaces.md)

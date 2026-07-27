---
next: false
---

# Workspace Billing

::: danger Roadmap
Workspace-scoped billing is on the roadmap, but none of it is implemented yet.
See [Billing Profiles](/billing/billing-profiles.md) for current usage.
:::

## Assigning Billing Profiles

**Prerequisites**:

- You must be a workspace Owner
- You must have a Billing Profile

**Steps**:

1. Navigate to workspace settings
2. Find the billing section
3. Click "Assign Billing Profile"
4. Select from your Billing Profiles
5. Confirm the assignment

Paid features are enabled immediately.

::: warning You Are Responsible for All Workspace Charges
You are responsible for all charges the workspace incurs, regardless of which member uses the
services.
:::

## Managing Billing

### Change Billing Profile

1. Navigate to workspace billing settings
2. Click "Change Billing Profile"
3. Select a different profile
4. Confirm the change

### Remove Billing Profile

1. Navigate to workspace billing settings
2. Click "Remove Billing Profile"
3. Confirm the removal

::: warning Removing Billing Disables Paid Features
Removing the Billing Profile from a workspace immediately disables all paid features for that
workspace.
:::

## Multiple Workspaces

One Billing Profile can be assigned to multiple workspaces at once, for consolidated billing with
a single invoice and a per-workspace breakdown in the billing portal.

## API Reference

::: danger Roadmap
These endpoints aren't live yet and may still change.
See [Billing Profiles](/billing/billing-profiles.md) for how billing works today.
:::

**Get Billing Status**

```http
GET /v1/workspaces/{workspaceId}/billing
Authorization: Bearer <access-token>
```

**Assign Billing Profile**

```http
POST /v1/workspaces/{workspaceId}/billing
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "billingProfileId": "bp-123456"
}
```

**Remove Billing Profile**

```http
DELETE /v1/workspaces/{workspaceId}/billing
Authorization: Bearer <access-token>
```

## Related Resources

- [Billing Overview](/billing/)
- [Billing Profiles](/billing/billing-profiles.md)
- [Invoices](/billing/invoices.md)
- [Managing Workspaces](./managing-workspaces.md)

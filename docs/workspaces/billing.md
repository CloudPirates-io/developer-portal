---
next: false
---

# Workspace Billing

::: danger Danger: There Is No Workspace-Scoped Billing Concept
Everything this page previously described (assigning/changing/removing a billing profile "on a
workspace", the `/v1/workspaces/{workspaceId}/billing` API) does not exist anywhere in the
backend. `WorkspaceApi.ts` has no `/billing` route, and neither `workspaceservice` nor
`billingservice` has any concept that ties a billing profile to a workspace. Billing profiles are
**personal — assigned to your user identity**, not to a workspace. See
[Billing Profiles](/billing/billing-profiles.md) and [Billing Overview](/billing/) for the real,
identity-based model.
:::

## How Billing Actually Works

A billing profile is assigned to a user identity, not a workspace:

```http
POST /v1/billing/billing-profiles/{billingProfileId}/identity
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "billingProfileId": "...",
  "identityId": "..."
}
```

One billing profile can be assigned to multiple identities, and paid features you use are billed
to whichever profile is assigned to your identity — not to a workspace-level setting. There is no
per-workspace billing status, assignment, or removal endpoint.

## Related Resources

- [Billing Overview](/billing/)
- [Billing Profiles](/billing/billing-profiles.md)
- [Invoices](/billing/invoices.md)
- [Managing Workspaces](./managing-workspaces.md)

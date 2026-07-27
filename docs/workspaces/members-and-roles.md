# Members and Roles

Manage workspace access with role-based permissions.

## Workspace Roles

### Owner

Full access to all workspace features:

- Member management (invite, remove, change roles)
- Service access and management
- Workspace settings and deletion
- Billing management

**Use for**: Workspace creator, team leads, administrators

::: warning
Owners can delete the workspace. Limit the number of owners.
:::

### Member (Default)

Standard team access:

- Use all services
- View workspace members
- Cannot manage billing or roles

**Use for**: Engineers, developers, regular team members

### Viewer

Read-only access:

- View services and configurations
- View workspace members
- Cannot modify anything

**Use for**: Stakeholders, auditors, read-only monitoring

## Permission Matrix

| Permission       | Owner | Member | Viewer |
| ---------------- | ----- | ------ | ------ |
| View services    | ✓     | ✓      | ✓      |
| View members     | ✓     | ✓      | ✓      |
| Modify services  | ✓     | ✓      | ✗      |
| Invite members   | ✓     | ✗      | ✗      |
| Change roles     | ✓     | ✗      | ✗      |
| Access billing   | ✓     | ✗      | ✗      |
| Delete workspace | ✓     | ✗      | ✗      |

## Inviting Members

**Prerequisites**: You must be an Owner

**Steps**:

1. Navigate to workspace members section
2. Click "Invite Member"
3. Enter email address
4. Select role (Member is default)
5. Send invitation

The invitee receives an email and must accept to join.

## Managing Members

### Change Roles

1. Navigate to members section
2. Click on the member
3. Select "Change Role"
4. Choose new role
5. Confirm

### Remove Members

1. Navigate to members section
2. Click on the member
3. Select "Delete Member"
4. Confirm

Member loses access immediately.

## Product-Specific Access

Beyond workspace roles, individual services may have additional access control:

- **Managed Observability**: Dashboard and alert permissions
- **Managed Applications**: Deployment permissions
- **Managed Cluster Components**: Cluster-level permissions

Configure service-specific permissions after granting workspace access.

## API Reference

### List Members

```http
GET /v1/workspaces/{workspaceId}/members
Authorization: Bearer <access-token>
```

### Invite Member

There is no direct member-creation route — members only join via an invitation that they accept
themselves.

```http
POST /v1/workspaces/{workspaceId}/invitations
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "email": "user@example.com",
  "role": "MEMBER"
}
```

`message` (custom invite text) and `invitationExpireDate` are also accepted, both optional.

### Change Role

```http
PUT /v1/workspaces/{workspaceId}/members/{workspaceMemberId}/role
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "role": "VIEWER"
}
```

`workspaceMemberId` is a different ID than `identityId` — both are returned per member by
[List Members](#list-members); using `identityId` here gets a 404.

### Remove Member

```http
DELETE /v1/workspaces/{workspaceId}/members/{workspaceMemberId}
Authorization: Bearer <access-token>
```

::: info Info: Full API Documentation Available
These are example requests. For complete API documentation including all parameters, response schemas, and authentication details, visit [api.cloudpirates.io/docs](https://api.cloudpirates.io/docs/).
:::

## Related Resources

- [Workspace Overview](./index.md)
- [Creating Workspaces](./creating-workspaces.md)
- [Managing Workspaces](./managing-workspaces.md)
- [Billing](./billing.md)

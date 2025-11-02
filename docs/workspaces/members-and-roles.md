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

## Permission Matrix

| Permission | Owner | Member | Viewer |
|-----------|-------|--------|--------|
| View services | ✓ | ✓ | ✓ |
| View members | ✓ | ✓ | ✓ |
| Modify services | ✓ | ✓ | ✗ |
| Invite members | ✓ | ✗ | ✗ |
| Change roles | ✓ | ✗ | ✗ |
| Access billing | ✓ | ✗ | ✗ |
| Delete workspace | ✓ | ✗ | ✗ |

## Product-Specific Access

Beyond workspace roles, individual services may have additional access control:

- **Managed Observability**: Dashboard and alert permissions
- **Managed Applications**: Deployment permissions
- **Managed Cluster Components**: Cluster-level permissions

Configure service-specific permissions after granting workspace access.

## API Access

### List Members

```http
GET /v1/workspaces/{workspaceId}/members
Authorization: Bearer <access-token>
```

### Invite Member

```http
POST /v1/workspaces/{workspaceId}/members
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "email": "user@example.com",
  "role": "Member"
}
```

### Change Role

```http
PATCH /v1/workspaces/{workspaceId}/members/{identityId}
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "role": "Viewer"
}
```

### Remove Member

```http
DELETE /v1/workspaces/{workspaceId}/members/{identityId}
Authorization: Bearer <access-token>
```

## Related Resources

- [Workspace Overview](./index.md)
- [Creating Workspaces](./creating-workspaces.md)
- [Managing Workspaces](./managing-workspaces.md)
- [Billing](./billing.md)

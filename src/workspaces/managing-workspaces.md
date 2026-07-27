# Managing Workspaces

Configure and manage your workspaces.

## Changing Workspace Name

1. Navigate to workspace settings
2. Locate workspace name field
3. Enter new name
4. Save changes

::: tip Workspace ID Remains Unchanged
The workspace ID remains unchanged after renaming. All API integrations will continue working without any modifications.
:::

## Workspace Information

View workspace details:

- **Workspace ID**: Unique identifier for API access
- **Workspace Key**: Unique, URL-safe identifier chosen at creation
- **Workspace Domain**: Derived from the workspace key
- **Workspace Name**: Current name
- **Members**: Current members and their roles
- **Open Invitations**: Pending member invitations

There is no creation-date, member-count, or "active services" field on the workspace today.

## Deleting Workspaces

**Requirements**:

- Only Owners can delete workspaces
- Deletion is permanent

::: warning Deleting a Workspace Does Not Clean Up Its Resources
The delete-workspace operation only checks that you're an Owner — it does not check for or block
on remaining Managed Observability, Managed Applications, or Managed Cluster Components. We still
recommend removing those first, since the workspace itself won't do it for you.
:::

### Deletion Steps

1. **Recommended: remove services first** (not enforced by the platform)
   - Managed Observability configurations
   - Managed Applications
   - Managed Cluster Components

2. **Navigate to workspace settings**

3. **Click "Delete Workspace"**
   - Confirmation required

4. **Confirm deletion**
   - Type workspace name to confirm
   - Workspace deleted immediately

::: danger Workspace Deletion Is Permanent
Workspace deletion is permanent and cannot be undone. You must back up all data before deleting a workspace.
:::

## Workspace Switching

If you're in multiple workspaces:

1. Access workspace selector in navigation
2. Select target workspace
3. Portal switches context

## API Reference

### Get Workspace Details

```http
GET /v1/workspaces/{workspaceId}
Authorization: Bearer <access-token>
```

### Update Name

```http
PUT /v1/workspaces/{workspaceId}/name
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "workspaceName": "New Name"
}
```

### Delete Workspace

```http
DELETE /v1/workspaces/{workspaceId}
Authorization: Bearer <access-token>
```

::: warning API Deletion Is Permanent
Workspace deletion via API is permanent and cannot be undone. Ensure you are using the correct workspace ID before executing this operation.
:::

::: info Full API Documentation Available
These are example requests. For complete API documentation including all parameters, response schemas, and authentication details, visit [api.cloudpirates.io/docs](https://api.cloudpirates.io/docs/).
:::

## Related Resources

- [Workspace Overview](./index.md)
- [Creating Workspaces](./creating-workspaces.md)
- [Members and Roles](./members-and-roles.md)
- [Billing](./billing.md)

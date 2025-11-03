# Managing Workspaces

Configure and manage your workspaces.

## Changing Workspace Name

1. Navigate to workspace settings
2. Locate workspace name field
3. Enter new name
4. Save changes

::: tip Tip: Workspace ID Remains Unchanged
The workspace ID remains unchanged after renaming. All API integrations will continue working without any modifications.
:::

## Workspace Information

View workspace details:

- **Workspace ID**: Unique identifier for API access
- **Workspace Name**: Current name
- **Creation Date**: When created
- **Member Count**: Number of users
- **Active Services**: Services in use

## Deleting Workspaces

**Requirements**:
- Only Owners can delete workspaces
- All services must be deleted first
- Deletion is permanent

::: warning Warning: All Services Must Be Deleted First
You must delete all Managed Observability, Managed Applications, and Managed Cluster Components before you can delete the workspace.
:::

### Deletion Steps

1. **Delete all services first**
   - Managed Observability configurations
   - Managed Applications
   - Managed Cluster Components

2. **Navigate to workspace settings**

3. **Click "Delete Workspace"**
   - Error shown if services remain
   - Confirmation required

4. **Confirm deletion**
   - Type workspace name to confirm
   - Workspace deleted immediately

::: danger Danger: Workspace Deletion Is Permanent
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
PATCH /v1/workspaces/{workspaceId}
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "name": "New Name"
}
```

### Delete Workspace

```http
DELETE /v1/workspaces/{workspaceId}
Authorization: Bearer <access-token>
```

::: warning Warning: API Deletion Is Permanent
Workspace deletion via API is permanent and cannot be undone. Ensure you are using the correct workspace ID before executing this operation.
:::

::: info Info: Full API Documentation Available
These are example requests. For complete API documentation including all parameters, response schemas, and authentication details, visit [api.cloudpirates.io/docs](https://api.cloudpirates.io/docs/).
:::

## Related Resources

- [Workspace Overview](./index.md)
- [Creating Workspaces](./creating-workspaces.md)
- [Members and Roles](./members-and-roles.md)
- [Billing](./billing.md)

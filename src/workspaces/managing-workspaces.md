# Managing Workspaces

Configure and manage your workspaces.

## Changing Workspace Name

1. Navigate to workspace settings
2. Locate workspace name field
3. Enter new name
4. Save changes

::: tip Workspace ID Remains Unchanged
The workspace ID remains unchanged after renaming.
Existing API integrations keep working without any changes.
:::

## Workspace Information

View workspace details:

- **Workspace ID**: Unique identifier for API access
- **Workspace Key**: Unique, URL-safe identifier chosen at creation
- **Workspace Domain**: Derived from the workspace key
- **Workspace Name**: Current name
- **Members**: Current members and their roles
- **Open Invitations**: Pending member invitations

## Deleting Workspaces

::: danger Workspace Deletion Is Permanent
Workspace deletion is permanent and cannot be undone.
Back up all data before deleting a workspace.
:::

**Requirements**:

- Only Owners can delete workspaces
- Deletion is permanent

::: warning Remove Services Before Deleting a Workspace
Deleting a workspace leaves any Managed Observability, Managed Applications, and Managed Cluster
Components behind. Remove those first.
:::

### Deletion Steps

1. **Remove services first**
   - Managed Observability configurations
   - Managed Applications
   - Managed Cluster Components

2. **Navigate to workspace settings**

3. **Click "Delete Workspace"**
   - Confirmation required

4. **Confirm deletion**
   - Type workspace name to confirm
   - Workspace deleted immediately

## Workspace Switching

If you're in multiple workspaces:

1. Access workspace selector in navigation
2. Select target workspace
3. Portal switches context

## API Reference

For workspace detail, rename, and deletion requests, see the
[Workspace API reference](https://api.cloudpirates.dev/docs/#/Workspace).

## Related Resources

- [Workspace Overview](./index.md)
- [Creating Workspaces](./creating-workspaces.md)
- [Members and Roles](./members-and-roles.md)
- [Billing](./billing.md)

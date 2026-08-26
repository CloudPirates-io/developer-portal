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
Deleting a workspace also deletes everything in it: Managed Observability configurations, Managed
Applications, and Managed Cluster Components. This cannot be undone, so back up all data first.
:::

**Requirements**:

- Only Owners can delete workspaces
- Deletion is permanent

### Deletion Steps

1. **Navigate to workspace settings**

2. **Click "Delete Workspace"**
   - Confirmation required

3. **Confirm deletion**
   - Type workspace name to confirm
   - Workspace and its resources are deleted immediately

## Workspace Switching

If you're in multiple workspaces:

1. Access workspace selector in navigation
2. Select target workspace
3. Portal switches context

## API Reference

For workspace detail, rename, and deletion requests, see the
[Workspace API reference](https://api.cloudpirates.io/docs/#/Workspace).

## Related Resources

- [Workspace Overview](./index.md)
- [Creating Workspaces](./creating-workspaces.md)
- [Members and Roles](./members-and-roles.md)
- [Billing](./billing.md)

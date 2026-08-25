# Creating Workspaces

Create a workspace to start using CloudPirates services.

## Prerequisites

- An active CloudPirates account
- Login access to the [portal](https://portal.cloudpirates.io)

## Creation Steps

1. **Login** to [portal.cloudpirates.io](https://portal.cloudpirates.io)
2. **Navigate** to [/workspace](https://portal.cloudpirates.io/workspace)
3. **Click** "Create Workspace" on the top right sidebar
4. **Enter** a descriptive workspace name
5. **Confirm** creation

::: info Automatic Owner Role Assignment
You are automatically assigned the Owner role with full access when you create a workspace.
:::

## Multiple Workspaces

Create separate workspaces for:

- **Environment Separation**: Production, staging, development
- **Team Isolation**: Different departments or teams
- **Project Separation**: Different products or applications

## API Reference

For workspace creation and listing requests, see the
[Workspace API reference](https://api.cloudpirates.dev/docs/#/Workspace).

::: tip Workspace Key Format
`workspaceKey` must be unique across all workspaces: lowercase letters, digits, and single
hyphens between segments.
:::

## Related Resources

- [Workspace Overview](./index.md)
- [Members and Roles](./members-and-roles.md)
- [Managing Workspaces](./managing-workspaces.md)
- [Billing](./billing.md)

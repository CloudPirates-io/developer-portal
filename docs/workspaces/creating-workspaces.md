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

::: info Info: Automatic Owner Role Assignment
You are automatically assigned the Owner role with full access when you create a workspace.
:::

## Multiple Workspaces

Create separate workspaces for:

- **Environment Separation**: Production, staging, development
- **Team Isolation**: Different departments or teams
- **Project Separation**: Different products or applications

## API Reference

### Create Workspace

```http
POST /v1/workspaces
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "workspaceName": "My Workspace",
  "workspaceKey": "my-workspace"
}
```

`workspaceKey` is a unique, URL-safe identifier for the workspace (lowercase letters, digits, and
single hyphens between segments) — it must be unique across all workspaces.

### List Workspaces

```http
GET /v1/workspaces
Authorization: Bearer <access-token>
```

::: info Info: Full API Documentation Available
These are example requests. For complete API documentation including all parameters, response schemas, and authentication details, visit [api.cloudpirates.io/docs](https://api.cloudpirates.io/docs/).
:::

## Related Resources

- [Workspace Overview](./index.md)
- [Members and Roles](./members-and-roles.md)
- [Managing Workspaces](./managing-workspaces.md)
- [Billing](./billing.md)

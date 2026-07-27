---
prev: false
---

# Workspaces

Workspaces are logical groups of users that organize and manage CloudPirates services. They provide collaborative access control for your team.

## Overview

::: warning Warning: Workspace Required for All Services
You cannot use CloudPirates services without a workspace. All services including Managed Observability, Managed Applications, and Managed Cluster Components are workspace-based.
:::

### Key Features

- **Service Management**: Organize all CloudPirates services in one place
- **Team Collaboration**: Invite members with different access levels
- **Access Control**: Three roles (Owner, Member, Viewer) control permissions

## Workspace Roles

- **Owner**: Full access including member management, billing, and workspace deletion
- **Member**: Can use services and view members (default role for invitations)
- **Viewer**: Read-only access to services and members

[Learn more about roles →](./members-and-roles.md)

## Getting Started

### 1. Create a Workspace

1. Login to [portal.cloudpirates.io](https://portal.cloudpirates.io)
2. Navigate to [/workspace](https://portal.cloudpirates.io/workspace)
3. Click "Create Workspace"
4. Enter a workspace name
5. You're automatically assigned as Owner

[Learn more →](./creating-workspaces.md)

### 2. Invite Team Members

1. Navigate to your workspace members section
2. Click "Invite Member"
3. Enter their email address
4. Select a role (Member is default)

Invitations are sent via email.

[Learn more →](./members-and-roles.md)

### 3. Set Up Billing (Optional)

Billing profiles are personal — assigned to your user identity, not to the workspace — and enable
paid features for whichever services you use.

[Learn more →](/billing/billing-profiles.md)

## Common Use Cases

**Personal Workspace**: Single member for personal projects and learning.

**Company Workspace**: Multiple team members managing production infrastructure.

**Organizational Units**: Separate workspaces for different teams or environments (e.g., "Engineering - Production", "Engineering - Staging").

## Related Resources

- [Creating Workspaces](./creating-workspaces.md)
- [Members and Roles](./members-and-roles.md)
- [Managing Workspaces](./managing-workspaces.md)
- [Billing](./billing.md)
- [Managed Observability](/managed-observability/)
- [API Documentation](/api/)
- [CloudPirates Portal](https://portal.cloudpirates.io)

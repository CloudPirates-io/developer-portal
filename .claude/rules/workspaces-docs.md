---
paths:
  - "src/workspaces/**"
---

# Workspaces docs

## Role enum is uppercase-only

The role enum is `["OWNER","MEMBER","VIEWER"]`, uppercase only, enforced by strict
`additionalProperties: false` JSON-schema validation on every command. Title-case values
(`"Owner"`, `"Member"`, `"Viewer"`) are rejected with a 400, not silently coerced. This only affects
JSON body examples; narrative prose describing the roles by name is unaffected.

## `creating-workspaces.md`: create-workspace body

The body is `{"workspaceName": string, "workspaceKey": string}`, both required, with
`additionalProperties: false`. A plain `{"name": "..."}` body is rejected. `workspaceKey` is
validated for uniqueness, so document it rather than dropping it.

## `managing-workspaces.md`: rename, workspace fields, deletion

- **Rename** is `PUT /:workspaceId/name` with body field `workspaceName`, not
  `PATCH .../{workspaceId}` with `name`.
- **Workspace detail response** is `{workspaceId, workspaceKey, workspaceDomain, workspaceName,
members[], openMemberInvitations[]}`. There's no creation timestamp, member-count field, or "active
  services" concept. Don't document fields outside this response.
- **Deleting a workspace only requires Owner rights.** There's no precondition that observability,
  application or cluster resources be removed first. Frame "remove services first" as a
  recommendation, with an explicit note that the platform doesn't enforce it.

## `members-and-roles.md`: invite, change role, remove member

- **Invite** is `POST /:workspaceId/invitations`, optionally with `message` and
  `invitationExpireDate`. There is no member-creation route; members come into existence through
  the invitation-accept flow (`POST /invitations/accept`), which the inviter never calls and which
  doesn't need its own docs section.
- **Change role** is `PUT /:workspaceId/members/:workspaceMemberId/role`.
- **Remove member** is `DELETE /:workspaceId/members/:workspaceMemberId`.

`identityId` and `workspaceMemberId` are **two distinct IDs**, and the member list returns both per
member. Use `workspaceMemberId` on all three endpoints above; `identityId` gets a 404.

Permission matrix: Owners can invite, change roles, and delete the workspace; Members and Viewers
cannot.

## `billing.md`: workspace-scoped billing

Workspace-scoped billing is its own flow, distinct from the identity-owned billing profiles in
`docs/billing/**` (see `billing-docs.md`). Both are real and each page is correct for its own
scope, so don't rewrite one into a denial of the other.

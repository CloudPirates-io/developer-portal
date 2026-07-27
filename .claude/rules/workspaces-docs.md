---
paths:
  - 'docs/workspaces/**'
---

# Workspaces docs

Written 2026-07-22, from an audit that read every file in `docs/workspaces/` in full and
cross-checked concrete claims (endpoint paths, request bodies, field names, role enums) against
`src/services/apigateway/src/Api/v1/WorkspaceApi.ts`, the JSON command-payload contracts under
`src/shared/contracts/schemas/src/Contracts/Workspaces/**`, and handler code in `workspaceservice`.
If this note is many months/years old when you read it, re-verify against current source before
trusting it.

**Update 2026-07-22**: every finding below was fixed in the doc pages the same day. The backend
facts recorded here are unchanged — only the framing changed from "doc says X, wrong" to "doc used
to say X, now says Y."

## Role enum is uppercase-only — fixed

Doc examples that wrote `"Owner"`, `"Member"`, or `"Viewer"` (title case) in JSON request bodies
were wrong. The real enum (`schemas/_Shared/Workspaces/workspace_member_role.json`) is
`["OWNER","MEMBER","VIEWER"]` — uppercase only, enforced by
`workspaceservice/src/Workspaces/Domain/WorkspaceMember.ts` and by strict
`additionalProperties: false` JSON-schema validation on every command. Sending title-case values
gets rejected with a 400, not silently coerced. All JSON body examples in `members-and-roles.md`
now use uppercase role values (narrative prose describing the roles by name is unaffected).

## `creating-workspaces.md` — fixed, create-workspace body corrected

Doc used to show `POST /v1/workspaces` with body `{"name": "My Workspace"}`. The real contract
(`create_workspace_command_payload_v1.json`) requires
`{"workspaceName": string, "workspaceKey": string}` with `additionalProperties: false` — the old
`name` field would have been rejected, `workspaceName` was missing, and `workspaceKey` (a concept
the doc never mentioned) is also required and validated for uniqueness
(`createWorkspaceCommandHandler.ts`). Doc now uses the real body and explains `workspaceKey`.
`GET /v1/workspaces` (list) was already accurate and is untouched.

## `managing-workspaces.md` — fixed, three separate issues

**Rename endpoint was wrong on method, path, and field.** Was: `PATCH /v1/workspaces/{workspaceId}`
with `{"name": "New Name"}`. Real: `PUT /:workspaceId/name` (`WorkspaceApi.ts:78-84`), body field
is `workspaceName` (`change_workspace_name_command_payload_v1.json`), not `name`. Doc now uses the
real method/path/field.

**"Workspace Information" fields didn't exist.** Doc claimed the workspace detail view shows
Creation Date, Member Count, and Active Services. The domain model
(`workspaceservice/src/Workspaces/Domain/Workspace.ts`) only has `_id`, `workspaceName`,
`workspaceKey`; the real query response (`workspaceQueryHandler.ts`) returns
`{workspaceId, workspaceKey, workspaceDomain, workspaceName, members[], openMemberInvitations[]}`
— no creation timestamp, no member-count field, no "active services" concept. Doc's field list now
matches the real response, including the previously-unmentioned `workspaceKey`/`workspaceDomain`.

**Deletion-precondition claim was unenforced.** Doc said "all services must be deleted first" /
"error shown if services remain" before a workspace can be deleted.
`deleteWorkspaceCommandHandler.ts` only checks that the requester is an Owner — no check for
observability/application/cluster resources exists. A repo-wide grep for
`DeleteWorkspaceCommand`/`WorkspaceDeletedEvent` handlers shows only `workspaceservice` (its own
projection) and `rebacsync` react to workspace deletion; no other service blocks or is consulted.
Doc now frames removing services first as a recommendation, not an enforced precondition — the
warning box explicitly says the platform doesn't check for this. Re-verify if a check is ever
added.

`GET /v1/workspaces/{workspaceId}` and `DELETE /v1/workspaces/{workspaceId}` were already accurate
and are untouched.

## `members-and-roles.md` — fixed, invite/change-role/remove-member endpoints corrected

| Was documented as | Real (now documented) |
| --- | --- |
| `POST /v1/workspaces/{workspaceId}/members` (invite) | `POST /:workspaceId/invitations` (`WorkspaceApi.ts:140-146`) — there is no member-creation route; members only exist via the invitation-accept flow (`POST /invitations/accept`, `:165-176`, still not separately documented as it's not something the inviter calls). Contract also supports optional `message`/`invitationExpireDate`, now mentioned. |
| `PATCH /v1/workspaces/{workspaceId}/members/{identityId}` `{"role": "Viewer"}` (change role) | `PUT /:workspaceId/members/:workspaceMemberId/role` (`WorkspaceApi.ts:113-119`) — wrong method, wrong path (missing `/role`), and wrong param (`workspaceMemberId`, not `identityId`) in the old doc. |
| `DELETE /v1/workspaces/{workspaceId}/members/{identityId}` (remove member) | Path shape was right but the param was `identityId` instead of `workspaceMemberId` (`WorkspaceApi.ts:105-111`). |

`identityId` and `workspaceMemberId` are **two distinct IDs** — the query response returns both
per member (`workspaceQueryHandler.ts`). The doc now uses `workspaceMemberId` throughout and calls
out that using `identityId` there gets a 404. `GET /v1/workspaces/{workspaceId}/members` (list)
was already accurate and is untouched.

## `billing.md` — fixed, rewritten to describe the real identity-based model

There is no workspace-scoped billing concept anywhere in the backend. `WorkspaceApi.ts` has no
`/billing` sub-route at all (verified by reading the full file); `workspaceservice/src` has zero
references to "billing" (grepped); `billingservice/src` has zero references to `workspaceId`
(grepped). The real assignment mechanism is
`POST /v1/billing/billing-profiles/{billingProfileId}/identity`
(`AssignBillingProfileToIdentityCommandV1`, requires `{billingProfileId, identityId}`) — billing
profiles attach to a **user identity**, not a workspace. This directly contradicts
`docs/billing/index.md`/`billing-profiles.md`, which correctly describe billing as
personal/identity-owned (see `billing-docs.md` rule file). Every concrete claim the page used to
make (`GET/POST/DELETE /v1/workspaces/{workspaceId}/billing`, "one profile assignable to multiple
workspaces", the whole API reference) was fictional. Rather than wait on product clarification,
the page was rewritten to state plainly that there is no workspace-scoped billing and to document
the real identity-assignment endpoint instead — if workspace-scoped billing turns out to be a real
near-term roadmap item after all, revert this framing accordingly. The "Billing Management" bullet
in `workspaces/index.md` and the "Workspace Owners can assign personal billing profiles" line made
the same false claim and were corrected to describe billing as identity-owned.

## Confirmed accurate

`docs/index.md`'s general framing, `GET /v1/workspaces` (list), `GET /v1/workspaces/{workspaceId}`
(get), `DELETE /v1/workspaces/{workspaceId}` (delete), `GET /v1/workspaces/{workspaceId}/members`
(list members), and the high-level permission-matrix claims (Owner can invite/change-role/delete,
Member/Viewer cannot — consistent with `hasAccessMiddleware('workspaces', ...)` gating, though the
underlying RBAC policy wasn't verified role-by-role in this pass).

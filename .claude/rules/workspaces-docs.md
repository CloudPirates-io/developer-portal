---
paths:
  - 'docs/workspaces/**'
---

# Workspaces docs

Ground truth cross-checked against `src/services/apigateway/src/Api/v1/WorkspaceApi.ts`, the JSON
command-payload contracts under `src/shared/contracts/schemas/src/Contracts/Workspaces/**`, and
handler code in `workspaceservice`. Re-verify against current source before trusting this if it's
been a while.

## Role enum is uppercase-only

The real enum (`schemas/_Shared/Workspaces/workspace_member_role.json`) is
`["OWNER","MEMBER","VIEWER"]` — uppercase only, enforced by
`workspaceservice/src/Workspaces/Domain/WorkspaceMember.ts` and by strict
`additionalProperties: false` JSON-schema validation on every command. Sending title-case values
(`"Owner"`, `"Member"`, `"Viewer"`) gets rejected with a 400, not silently coerced. Only JSON body
examples need the uppercase value — narrative prose describing the roles by name is unaffected.

## `creating-workspaces.md`: create-workspace body

The real contract (`create_workspace_command_payload_v1.json`) requires
`{"workspaceName": string, "workspaceKey": string}` with `additionalProperties: false` — a plain
`{"name": "..."}` body gets rejected. `workspaceKey` is required and validated for uniqueness
(`createWorkspaceCommandHandler.ts`); document it, don't drop it. `GET /v1/workspaces` (list) is
accurate as documented.

## `managing-workspaces.md`: rename endpoint, workspace fields, deletion precondition

- **Rename** is `PUT /:workspaceId/name` (`WorkspaceApi.ts:78-84`), body field `workspaceName`
  (`change_workspace_name_command_payload_v1.json`) — not `PATCH .../{workspaceId}` with `name`.
- **Workspace detail fields.** The domain model (`workspaceservice/src/Workspaces/Domain/
  Workspace.ts`) only has `_id`, `workspaceName`, `workspaceKey`; the real query response
  (`workspaceQueryHandler.ts`) returns `{workspaceId, workspaceKey, workspaceDomain, workspaceName,
  members[], openMemberInvitations[]}` — no creation timestamp, no member-count field, no "active
  services" concept. Don't document fields that aren't in this response.
- **Deletion has no service-cleanup precondition.** `deleteWorkspaceCommandHandler.ts` only checks
  that the requester is an Owner — no check for observability/application/cluster resources exists
  anywhere (repo-wide grep of `DeleteWorkspaceCommand`/`WorkspaceDeletedEvent` handlers shows only
  `workspaceservice`'s own projection and `rebacsync` react to workspace deletion). Frame "remove
  services first" as a recommendation, with an explicit note that the platform doesn't enforce it,
  not as an enforced precondition. Re-verify if a check is ever added.

`GET /v1/workspaces/{workspaceId}` and `DELETE /v1/workspaces/{workspaceId}` are accurate as
documented.

## `members-and-roles.md`: invite/change-role/remove-member endpoints

| Common wrong assumption | Real behavior |
| --- | --- |
| `POST /v1/workspaces/{workspaceId}/members` (invite) | `POST /:workspaceId/invitations` (`WorkspaceApi.ts:140-146`) — there is no member-creation route; members only exist via the invitation-accept flow (`POST /invitations/accept`, `:165-176`, not separately documented since it's not something the inviter calls). Contract also supports optional `message`/`invitationExpireDate`. |
| `PATCH /v1/workspaces/{workspaceId}/members/{identityId}` `{"role": "Viewer"}` (change role) | `PUT /:workspaceId/members/:workspaceMemberId/role` (`WorkspaceApi.ts:113-119`) — different method, different path (needs `/role`), different param (`workspaceMemberId`, not `identityId`). |
| `DELETE /v1/workspaces/{workspaceId}/members/{identityId}` (remove member) | Path shape is right but the param is `workspaceMemberId`, not `identityId` (`WorkspaceApi.ts:105-111`). |

`identityId` and `workspaceMemberId` are **two distinct IDs** — the query response returns both per
member (`workspaceQueryHandler.ts`). Use `workspaceMemberId` throughout these endpoints; using
`identityId` gets a 404. `GET /v1/workspaces/{workspaceId}/members` (list) is accurate as
documented.

## `billing.md`: workspace-scoped billing is a roadmap item, not a doc bug

There is no workspace-scoped billing concept anywhere in the backend today. `WorkspaceApi.ts` has
no `/billing` sub-route; `workspaceservice/src` has zero references to "billing"; `billingservice/
src` has zero references to `workspaceId`. The real, currently-live assignment mechanism is
`POST /v1/billing/billing-profiles/{billingProfileId}/identity`
(`AssignBillingProfileToIdentityCommandV1`, requires `{billingProfileId, identityId}`) — billing
profiles attach to a **user identity**, not a workspace.

Despite that, workspace-scoped billing is a confirmed near-term product roadmap item, not something
to document as nonexistent. `billing.md` should describe the *planned* workspace-scoped flow,
clearly marked as not implemented yet (a top-level `::: danger Roadmap` box, repeated directly
above the illustrative API examples — see `tone-and-style.md`'s "Roadmap disclaimer boxes" section
for the box convention), with everything else on the page worded as if the feature already shipped
(see `tone-and-style.md`'s "Everything below a Roadmap box is written as if already shipped").

Don't let this override what's currently true: `docs/billing/index.md`/`billing-profiles.md` still
correctly describe today's identity-owned model (see `billing-docs.md`) — both pages are correct
for their own timeframe (today vs. planned). The "Billing Management" bullet in
`workspaces/index.md`, or any other "billing is identity-owned only" framing that leans on a flat
"no workspace billing at all" claim, should use the same roadmap caveat rather than denying the
concept exists.

If workspace-scoped billing ships: check for a `/billing` route on `WorkspaceApi.ts` and
`workspaceId` references in `billingservice/src`, and update `billing.md` from "planned" to "live"
accordingly, or re-confirm with the user if the roadmap status looks unclear.

## Confirmed accurate

`docs/index.md`'s general framing, `GET /v1/workspaces` (list), `GET /v1/workspaces/{workspaceId}`
(get), `DELETE /v1/workspaces/{workspaceId}` (delete), `GET /v1/workspaces/{workspaceId}/members`
(list members), and the high-level permission-matrix claims (Owner can invite/change-role/delete,
Member/Viewer cannot — consistent with `hasAccessMiddleware('workspaces', ...)` gating, though the
underlying RBAC policy hasn't been verified role-by-role).

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

## `billing.md` — status flipped 2026-07-24: workspace-scoped billing is now a confirmed roadmap item

Backend reality as of the 2026-07-22 audit, still true today: there is no workspace-scoped billing
concept anywhere in the backend. `WorkspaceApi.ts` has no `/billing` sub-route at all (verified by
reading the full file); `workspaceservice/src` has zero references to "billing" (grepped);
`billingservice/src` has zero references to `workspaceId` (grepped). The real, currently-live
assignment mechanism is `POST /v1/billing/billing-profiles/{billingProfileId}/identity`
(`AssignBillingProfileToIdentityCommandV1`, requires `{billingProfileId, identityId}`) — billing
profiles attach to a **user identity**, not a workspace. This still directly contradicts what
`billing.md` now describes, and `docs/billing/index.md`/`billing-profiles.md` still correctly
describe today's identity-owned model (see `billing-docs.md` rule file) — don't let `billing.md`'s
roadmap content override that for anything *currently* accurate.

On 2026-07-22 this was treated as a pure documentation bug and `billing.md` was rewritten to state
plainly that there is no workspace-scoped billing, pointing readers to the identity-assignment
endpoint instead. On 2026-07-24 the user confirmed (in a session where a different agent had been
asked to "fix" this page to match the backend) that workspace-scoped billing is in fact a real,
confirmed near-term product roadmap item, not a doc bug — the intent is for `billing.md` to
describe the *planned* workspace-scoped flow, clearly marked as not implemented yet, rather than
deny the concept exists at all. The page was rewritten again accordingly, then twice more refined
by the user the same session down to the final shape: a top-level `::: danger Roadmap` box (title
is always exactly "Roadmap", two short sentences: what's planned, then a link to how billing works
today — see `tone-and-style.md`'s "Roadmap disclaimer boxes" section for the general convention),
the same short `::: danger Roadmap` box repeated directly above the illustrative/subject-to-change
API examples so the caveat survives someone landing on that section via a direct anchor link, and
everything else on the page (the numbered steps, the other warning boxes, the API examples) worded
as if the feature already shipped, present tense, no "once this ships"/"will be" hedging anywhere
outside the two Roadmap boxes themselves (see `tone-and-style.md`'s "Everything below a Roadmap box
is written as if already shipped" section). The "Billing Management" bullet in
`workspaces/index.md` and any "billing is identity-owned only" framing elsewhere that leans on the
old "no workspace billing at all" claim should be re-checked against this — they may need the same
roadmap caveat rather than a flat "no such thing" statement.

If this file is stale when you read it: check whether workspace-scoped billing has actually shipped
(look for a `/billing` route on `WorkspaceApi.ts` and `workspaceId` references in
`billingservice/src`) and update `billing.md` from "planned" to "live" accordingly, or re-confirm
with the user if it still looks unimplemented but the roadmap status is unclear.

## Confirmed accurate

`docs/index.md`'s general framing, `GET /v1/workspaces` (list), `GET /v1/workspaces/{workspaceId}`
(get), `DELETE /v1/workspaces/{workspaceId}` (delete), `GET /v1/workspaces/{workspaceId}/members`
(list members), and the high-level permission-matrix claims (Owner can invite/change-role/delete,
Member/Viewer cannot — consistent with `hasAccessMiddleware('workspaces', ...)` gating, though the
underlying RBAC policy wasn't verified role-by-role in this pass).

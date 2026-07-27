---
paths:
  - 'docs/managed-application-plattform/**'
---

# Managed Application Platform docs

Written 2026-07-22, from an audit that read every file in `docs/managed-application-plattform/` in
full and traced the feature to its backend: the `application-manager` service, plus ApiGateway's
`Api/v1/Applications/{ApplicationsApi,WorkspaceApplicationsApi}.ts`. If this note is many
months/years old when you read it, re-verify against current source before trusting it. This is
the most severe drift found in this audit pass — most of what these docs describe either doesn't
exist in code at all, or exists as dead code behind a hard `501`. Treat this the same way
`src/services/apigateway/.claude/rules/cluster-docs.md` treats the `MANAGED` cluster type: looking
wired up (real schemas, real routes, real DB writes for lookups) is not the same as working.

**Update 2026-07-22**: the doc pages themselves were fixed in a follow-up pass (see per-file notes
below) — request bodies/routes that were simply wrong got corrected in place, and pages that are
mostly aspirational (`deployment-options.md`, `gitops-setup.md`, `update-management.md`) got a
top-of-page danger box rather than line-by-line correction, per this file's own recommendation.
The underlying backend facts recorded below (the 501, the missing handlers, etc.) are unchanged —
only the portal docs moved to match them.

## The core create/deploy flow is a hard 501, not a partial feature

`application-manager/src/Applications/Application/installApplication.ts` —
`installApplication()`, the function every "create application" request ultimately calls — does:

```ts
export async function installApplication(config: ApplicationInstallConfig) {
  throw new CloudEventError({ message: 'Not implemented', statusCode: CloudEventErrorStatusCode.NOT_IMPLEMENTED })
  // ... entire real ArgoCD Application manifest + gitLabClient.createApplicationInstance() call, commented out
}
```

`createApplicationCommandHandler.ts` does full, real validation first (workspace exists, template
exists, version exists, cluster exists, preset exists, semver-range check, JSON-schema validation
of values) — so a request can get quite far before failing, which makes this easy to mistake for
"almost done" rather than "the happy path is entirely unreachable." A `POST` to create an
application can never succeed, in any doc that describes it as working end-to-end.

## Two of the four write endpoints have zero registered command handlers

`WorkspaceApplicationsApi.ts`'s `PUT .../values` (`ChangeApplicationValuesCommandV1`) and `POST
.../actions/update` (`UpdateApplicationCommandV1`) routes exist and are documented in
`update-management.md`/`index.md`, but grepping every `service.addCommandHandler` registration in
`application-manager/src` (`Applications/Application/CommandHandler/index.ts`) shows **only**
`CreateApplicationCommandV1` and `DeleteApplicationCommandV1` are registered. These two commands
have no handler anywhere in the monorepo — not partially implemented, just dead ends; a request
sends a NATS command with no subscriber ever responding. `DeleteApplicationCommandV1` is the
**only** lifecycle operation that's actually wired end-to-end
(`deleteApplicationCommandHandler.ts` → `deleteApplication.ts` → `gitLabClient.deleteApplicationInstance`)
— moot in practice, since nothing can ever be created to delete.

## `index.md` — fixed 2026-07-22

- "Create Application" example body used `templateId`/`preset`/`autoUpdate`/`updateChannel` — the
  real payload (`create_application_command_payload_v1.json`, `additionalProperties: false`)
  requires `applicationTemplateId`, `applicationTemplatePresetId`, `clusterId`, `appVersion`,
  `name`; `autoUpdate`/`updateChannel` don't exist anywhere in the codebase (grepped every service
  and contract, zero hits). Body corrected, and a danger box now states the request always 501s.
- "Update Application" used to show a nonexistent `PUT .../applications/{applicationId}` route
  with `{preset, autoUpdate}`. Replaced with the two real (but handler-less) routes —
  `PUT .../values` and `POST .../actions/update` — with a danger box explaining that no command
  handler is registered for either, so requests never get a response.
- "What Gets Created" (ArgoCD Application manifests, SealedSecrets) — the only implementation is
  the commented-out dead code in `installApplication.ts`; zero SealedSecrets references anywhere
  in `application-manager/src`. Section now marked `(planned — not implemented yet)` with a danger
  box.
- "Get"/"List"/"Delete Application" routes were already the accurate parts of this page and are
  untouched.

## `deployment-options.md` — fixed 2026-07-22 (flagged, not line-item-corrected)

The `clusterId` in a create-application request resolves to `application-manager`'s own local
`Cluster` read-model (`Cluster/Domain/Cluster.ts`), populated purely from
`ClusterCreatedEventV1`/`ClusterDeletedEventV1` projections. Its fields are `clusterId,
workspaceId, clusterName, clusterType (EXTERNAL|MANAGED), provisioningDetails.clusterClass,
accessToken` — **no region, no shared-vs-dedicated flag, no cloud-provider metadata** anywhere.
"CloudPirates Managed Kubernetes" depends on `clusterType: MANAGED`, which per `cluster-docs.md`
is unconditionally rejected with a 501 in `clusterservice` — so this doc's managed-K8s narrative is
doubly dead (the underlying cluster primitive 501s, and even if it existed, deploying to it 501s
here too). "Bring Your Own ArgoCD"/"Bring Your Own Git" have zero code: exactly one global
`gitlab.repoUrl/token` and one global `argoCD.baseUrl/token` exist in service config
(`config/default.yaml`), not per-workspace/per-request; `GitLabClient.ts` hardcodes GitLab only via
`@gitbeaker/node`, contradicting the doc's "GitHub, GitLab, Bitbucket, Azure DevOps, Self-hosted"
claim. Given how much of this page is aspirational, it was left structurally intact but now opens
with a danger box summarizing all of the above, rather than being line-item-corrected.

## `templates.md` — fixed 2026-07-22, now accurate

`ApplicationTemplates` is fully wired end-to-end (unlike `Applications`) — every command has a
registered handler, event handler, and query handler, so this page was corrected in place rather
than flagged as aspirational:

| Was documented as | Now documents (real behavior) |
| --- | --- |
| `GET /v1/templates` | `GET /v1/applications/templates` (mount is `/v1/applications`, router path `/templates` — `ApplicationsApi.ts`) |
| `GET /v1/templates/{applicationTemplateId}` | `GET /v1/applications/templates/{applicationTemplateId}` |
| Response `{"templates": [...]}` | Route passes `dataAttribute: 'applicationTemplates'` + `isPaginated: true` — real body is a **bare array**, key would be `applicationTemplates` if wrapped at all (per the global pagination mechanism, it isn't). See `api-docs.md`'s pagination rule. |
| Template fields `id`, `category`, `chartUrl` | Real fields: `applicationTemplateId`; no `category`/`chartUrl` — `source` object only has `{type: HELM_CHART, repositoryUrl, chartName}` |
| Preset fields `id`, `name`, `resources: {cpu, memory, storage}` | Real: `applicationTemplatePresetId`, `presetName`, `supportedVersionRange`, `valuesSchema` — sizing is validated against an arbitrary per-preset JSON Schema (`valuesSchema`), there's no fixed `resources` object |

Note: even ApiGateway's own OpenAPI schema (`ApplicationTemplates.yaml`) still documents the stale
enveloped shape — this is a pre-existing ApiGateway docs bug independent of the portal, useful
context but not something to copy from. The specific chart catalog (MariaDB, PostgreSQL, etc.) has
no seed script or hardcoded list in code — it's live DB data if real, unverifiable from source;
don't treat its presence/absence in code as evidence either way.

**Update 2026-07-24**: the "Available Templates" table was synced against
`https://github.com/CloudPirates-io/helm-charts`'s own README "Available Charts" table (the
closest available source of truth, since the actual template catalog is unverifiable live DB data
per above). Added `Kafka` and `RabbitMQ Cluster Operator`, both new since the table was last
written. Deliberately did NOT add `ClusterPirate` (the Managed Observability agent chart, not an
application a user deploys through this platform) or `Common` (a library chart with nothing
standalone to deploy). Re-diff against that README next time this page is touched, since the
chart repo adds charts independently of this portal.

## `gitops-setup.md` — fixed 2026-07-22 (flagged, not line-item-corrected)

Nearly every concrete mechanism has zero backend support, and the one real-ish concept (a
"managed" per-workspace Git area) is itself unreachable:

- "CloudPirates Managed Repository" is actually one shared, service-global GitLab project with
  per-workspace subdirectories, not an isolated repo per workspace — and this path is unreachable
  anyway (`createAppProject.ts`/`gitLabClient.createApplicationInstance` calls are both commented
  out in `installApplication.ts`, behind the 501).
- "Bring Your Own Repository" (GitHub/GitLab/Bitbucket/Azure DevOps/self-hosted) — zero support;
  `GitLabClient.ts` is hardcoded to GitLab via static service config.
- "Bring Your Own ArgoCD" — `ArgoCDApi.ts` is a single global, **read-only** client
  (`getProject`/`getApplications`/`getApplication` only, no create/update methods at all); no code
  path, dead or alive, accepts a customer-supplied ArgoCD instance.
- Update-channel annotations (`apps.cloudpirates.io/update-channel`, `/auto-update`) — zero hits
  anywhere in the codebase for `apps.cloudpirates.io`; even the dead template object in
  `installApplication.ts` has no annotations block, only two `cloudpirates.io/*` labels.
- "SealedSecrets Integration" — zero hits for "sealed" anywhere in `application-manager` or
  ApiGateway source.
- "Audit Trail" commit-message format — the real generator
  (`GitLabClient.createCommitMessage`) produces a much simpler message with no author/timestamp
  trailer, and is unreachable anyway.
- "Rollback Support" — no revert/rollback command or route exists anywhere.

Per the recommendation, the page was left structurally intact and now opens with a single danger
box summarizing all of the above, rather than being line-item-corrected — almost nothing in it is
real.

## `update-management.md` — fixed 2026-07-22 (flagged, not line-item-corrected)

Update channels, annotation-based config, automatic Helm value migrations, pre-update PVC/DB
backups, notifications (portal/email/webhook/Slack), changelogs, and CVE-driven security-update
SLAs all have **zero corresponding code** — grepped `application-manager/src` and
`notificationservice/src` for "backup", "migration", channel/annotation concepts: no hits beyond
the doc itself. The real `UpdateApplicationCommandV1` payload is just `{workspaceId, applicationId,
appVersion}` — a plain version bump, no channel concept — and as noted above, has no registered
command handler at all, so even this minimal real primitive is currently an orphaned route.
`ApplicationUpdatedEventV1`/`ApplicationValuesChangedEventV1` exist in the shared contracts package
but are never produced by any handler in this repo (consistent with their missing command
handlers). Per the same treatment as `gitops-setup.md`, the page now opens with a single danger box
rather than being line-item-corrected.

## Follow-up 2026-07-24: tone-and-style pass added two missed Roadmap flags

The 2026-07-22 audit above focused on API request/response bodies and didn't flag two prose
sections that describe entirely non-existent functionality the same way `gitops-setup.md` and
`update-management.md` do: `index.md`'s "Secure Secret Management" (SealedSecrets, already had a
loose `_(planned)_` marker, converted to a proper `::: danger Roadmap` box) and "Flexible Update
Management" (update channels, had no flag at all before this pass). `templates.md`'s "Updates &
Security" section describes the same fictional channels/SealedSecrets and also got a Roadmap box.
No underlying facts changed, this only applied the existing audit findings above (still accurate as
of this date) to sections that had fallen through the cracks of the first pass.

## Summary

| Doc file | Backend exists? | Treatment applied 2026-07-22 |
| --- | --- | --- |
| `index.md` | Routes/schemas real; create is a 501 dead-end; update/values routes have no handler; delete is the only real op | Corrected the request bodies/routes that were simply wrong; added danger boxes flagging create/update as not-yet-functional |
| `deployment-options.md` | Cluster domain exists but lacks every field described (region, shared/dedicated); BYO Git/ArgoCD has zero code | Flagged as aspirational/roadmap via a top-of-page danger box |
| `templates.md` | Solid — real CRUD, real routes | Fixed paths/envelope/field names only |
| `gitops-setup.md` | Almost nothing real | Flagged as aspirational/roadmap via a top-of-page danger box, not line-item-corrected |
| `update-management.md` | Entirely aspirational | Flagged as aspirational/roadmap via a top-of-page danger box, not line-item-corrected |

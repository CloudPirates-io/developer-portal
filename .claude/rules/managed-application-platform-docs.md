---
paths:
  - 'docs/managed-application-plattform/**'
---

# Managed Application Platform docs

Ground truth traced through the `application-manager` service, plus ApiGateway's
`Api/v1/Applications/{ApplicationsApi,WorkspaceApplicationsApi}.ts`. This is the domain with the
most severe drift risk of any audited so far — most of what these docs could describe either
doesn't exist in code at all, or exists as dead code behind a hard `501`. Treat this the same way
`src/services/apigateway/.claude/rules/cluster-docs.md` treats the `MANAGED` cluster type: looking
wired up (real schemas, real routes, real DB writes for lookups) is not the same as working.
Re-verify against current source before trusting this if it's been a while.

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
"almost done" rather than "the happy path is entirely unreachable." Don't describe a `POST` to
create an application as working end-to-end, in any doc.

## Two of the four write endpoints have zero registered command handlers

`WorkspaceApplicationsApi.ts`'s `PUT .../values` (`ChangeApplicationValuesCommandV1`) and
`POST .../actions/update` (`UpdateApplicationCommandV1`) routes exist, but grepping every
`service.addCommandHandler` registration in `application-manager/src`
(`Applications/Application/CommandHandler/index.ts`) shows **only** `CreateApplicationCommandV1`
and `DeleteApplicationCommandV1` are registered. These two commands have no handler anywhere in the
monorepo — a request sends a NATS command with no subscriber ever responding, so it hangs and times
out (`503`/`504`) rather than failing cleanly. `DeleteApplicationCommandV1` is the **only**
lifecycle operation that's actually wired end-to-end (`deleteApplicationCommandHandler.ts` →
`deleteApplication.ts` → `gitLabClient.deleteApplicationInstance`) — moot in practice, since nothing
can ever be created to delete.

## How to treat pages describing this: line-correct what's real, flag what isn't

- If a route/schema is real but the *outcome* is broken (create's 501, update's missing handler),
  correct the request body/route to the real shape and add a `::: danger Roadmap` box (see
  `tone-and-style.md`) rather than removing the section — `index.md`'s Create/Update Application
  sections follow this pattern.
- If a whole page is almost entirely aspirational (`deployment-options.md`, `gitops-setup.md`,
  `update-management.md`), don't line-item-correct every claim — open with a single `::: danger
  Roadmap` box summarizing that most of the page isn't implemented yet, and leave the rest of the
  page's structure intact.

### `deployment-options.md` — what's real underneath

The `clusterId` in a create-application request resolves to `application-manager`'s own local
`Cluster` read-model (`Cluster/Domain/Cluster.ts`), populated purely from
`ClusterCreatedEventV1`/`ClusterDeletedEventV1` projections. Its fields are `clusterId,
workspaceId, clusterName, clusterType (EXTERNAL|MANAGED), provisioningDetails.clusterClass,
accessToken` — **no region, no shared-vs-dedicated flag, no cloud-provider metadata** anywhere.
"CloudPirates Managed Kubernetes" depends on `clusterType: MANAGED`, which per `cluster-docs.md` is
unconditionally rejected with a 501 in `clusterservice`. "Bring Your Own ArgoCD"/"Bring Your Own
Git" have zero code: exactly one global `gitlab.repoUrl/token` and one global `argoCD.baseUrl/token`
exist in service config (`config/default.yaml`), not per-workspace/per-request; `GitLabClient.ts`
hardcodes GitLab only via `@gitbeaker/node`, contradicting any "GitHub, GitLab, Bitbucket, Azure
DevOps, Self-hosted" claim.

### `templates.md` — the one page that's actually wired up

`ApplicationTemplates` is fully wired end-to-end (unlike `Applications`) — every command has a
registered handler, event handler, and query handler. Real shapes:

| Common wrong assumption | Real behavior |
| --- | --- |
| `GET /v1/templates` | `GET /v1/applications/templates` (mount is `/v1/applications`, router path `/templates` — `ApplicationsApi.ts`) |
| `GET /v1/templates/{applicationTemplateId}` | `GET /v1/applications/templates/{applicationTemplateId}` |
| Response `{"templates": [...]}` | Route passes `dataAttribute: 'applicationTemplates'` + `isPaginated: true` — real body is a **bare array** (see `api-docs.md`'s pagination rule). |
| Template fields `id`, `category`, `chartUrl` | Real fields: `applicationTemplateId`; no `category`/`chartUrl` — `source` object only has `{type: HELM_CHART, repositoryUrl, chartName}` |
| Preset fields `id`, `name`, `resources: {cpu, memory, storage}` | Real: `applicationTemplatePresetId`, `presetName`, `supportedVersionRange`, `valuesSchema` — sizing is validated against an arbitrary per-preset JSON Schema (`valuesSchema`), there's no fixed `resources` object |

Note: even ApiGateway's own OpenAPI schema (`ApplicationTemplates.yaml`) still documents the stale
enveloped shape — a pre-existing ApiGateway docs bug independent of the portal, useful context but
not something to copy from. The specific chart catalog (MariaDB, PostgreSQL, etc.) has no seed
script or hardcoded list in code — it's live DB data if real, unverifiable from source; don't treat
its presence/absence in code as evidence either way. The "Available Templates" table should track
`https://github.com/CloudPirates-io/helm-charts`'s own README "Available Charts" table (the closest
available source of truth, since the actual catalog is unverifiable live DB data). Don't add
`ClusterPirate` (the Managed Observability agent chart, not an application a user deploys through
this platform) or `Common` (a library chart with nothing standalone to deploy) even if they appear
in that README — re-diff against it periodically since the chart repo adds charts independently of
this portal.

### `gitops-setup.md` — almost nothing here is real

Nearly every concrete mechanism has zero backend support, and the one real-ish concept (a "managed"
per-workspace Git area) is itself unreachable:

- "CloudPirates Managed Repository" is actually one shared, service-global GitLab project with
  per-workspace subdirectories, not an isolated repo per workspace, and this path is unreachable
  anyway (`createAppProject.ts`/`gitLabClient.createApplicationInstance` calls are both commented
  out in `installApplication.ts`, behind the 501).
- "Bring Your Own Repository" (GitHub/GitLab/Bitbucket/Azure DevOps/self-hosted) has zero support;
  `GitLabClient.ts` is hardcoded to GitLab via static service config.
- "Bring Your Own ArgoCD" has no backing: `ArgoCDApi.ts` is a single global, **read-only** client
  (`getProject`/`getApplications`/`getApplication` only, no create/update methods at all).
- Update-channel annotations (`apps.cloudpirates.io/update-channel`, `/auto-update`) have zero hits
  anywhere in the codebase; even the dead template object in `installApplication.ts` has no
  annotations block, only two `cloudpirates.io/*` labels.
- "SealedSecrets Integration" has zero hits for "sealed" anywhere in `application-manager` or
  ApiGateway source.
- "Audit Trail" commit-message format: the real generator (`GitLabClient.createCommitMessage`)
  produces a much simpler message with no author/timestamp trailer, and is unreachable anyway.
- "Rollback Support" has no revert/rollback command or route anywhere.

### `update-management.md` — almost nothing here is real

Update channels, annotation-based config, automatic Helm value migrations, pre-update PVC/DB
backups, notifications (portal/email/webhook/Slack), changelogs, and CVE-driven security-update
SLAs all have **zero corresponding code** (grepped `application-manager/src` and
`notificationservice/src` for "backup", "migration", channel/annotation concepts: no hits beyond the
doc itself). The real `UpdateApplicationCommandV1` payload is just `{workspaceId, applicationId,
appVersion}` — a plain version bump, no channel concept — and has no registered command handler at
all (see above), so even this minimal real primitive is currently an orphaned route.
`ApplicationUpdatedEventV1`/`ApplicationValuesChangedEventV1` exist in the shared contracts package
but are never produced by any handler in this repo.

## Summary

| Doc file | Backend exists? |
| --- | --- |
| `index.md` | Routes/schemas real; create is a 501 dead-end; update/values routes have no handler; delete is the only real op |
| `deployment-options.md` | Cluster domain exists but lacks every field described (region, shared/dedicated); BYO Git/ArgoCD has zero code |
| `templates.md` | Solid — real CRUD, real routes |
| `gitops-setup.md` | Almost nothing real |
| `update-management.md` | Entirely aspirational |

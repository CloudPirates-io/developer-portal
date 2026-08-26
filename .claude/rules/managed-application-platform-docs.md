---
paths:
  - "src/managed-application-plattform/**"
---

# Managed Application Platform docs

Backed by the `application-manager` service plus ApiGateway's
`Api/v1/Applications/{ApplicationsApi,WorkspaceApplicationsApi}.ts`.

## Application lifecycle routes and payloads

- Create and delete an application, change its Helm values (`PUT .../values`), and update its
  version (`POST .../actions/update`).
- The update payload is `{workspaceId, applicationId, appVersion}`, a plain version bump.
- Deployed-app logs are `GET /:workspaceId/applications/:applicationId/logs`. This is
  `application-manager`'s application logs, a different feature from Managed Observability's
  cluster/pod views. Don't cross-reference the two as if they were one thing.
- Creating an application validates the whole request up front: workspace, template, version,
  cluster and preset all have to exist, the version has to satisfy the preset's semver range, and
  the supplied values are validated against the preset's JSON Schema.

## `templates.md` route and field shapes

The templates router is mounted under `/v1/applications`, so the routes are:

- `GET /v1/applications/templates`
- `GET /v1/applications/templates/{applicationTemplateId}`

Not `/v1/templates`. Other shapes to get right:

| Wrong                                                  | Right                                                                                                                                            |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Response `{"templates": [...]}`                        | A bare array, paginated via headers (see `api-docs.md`). ApiGateway's `ApplicationTemplates.yaml` OpenAPI schema shows an envelope; don't copy it |
| Template fields `id`, `category`, `chartUrl`           | `applicationTemplateId`, plus a `source` object of `{type: HELM_CHART, repositoryUrl, chartName}`                                                 |
| Preset fields `id`, `name`, `resources: {cpu, memory}` | `applicationTemplatePresetId`, `presetName`, `supportedVersionRange`, `valuesSchema`                                                              |

Preset sizing is validated against the preset's own `valuesSchema` JSON Schema, so there's no fixed
`resources` object to document.

## The "Available Templates" table tracks the helm-charts README

Keep the table in sync with the "Available Charts" table in
`https://github.com/CloudPirates-io/helm-charts`, re-diffing periodically since that repo adds
charts independently of this portal. Two exclusions: `ClusterPirate` (the Managed Observability
agent chart, not an application users deploy here) and `Common` (a library chart with nothing
standalone to deploy).

## `deployment-options.md` and `gitops-setup.md`

Clusters are addressed by `clusterId` and carry `clusterType` (`EXTERNAL` or `MANAGED`) plus
`provisioningDetails.clusterClass`. Git integration runs through the service's GitLab client
(`GitLabClient.ts`, `@gitbeaker/node`) and ArgoCD through `ArgoCDApi.ts`; the managed Git area is
one project with per-workspace subdirectories, not a separate repository per workspace.

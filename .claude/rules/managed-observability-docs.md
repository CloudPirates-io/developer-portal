---
paths:
  - "src/managed-observability/**"
---

# Managed Observability docs

Spans several services: `observabilityservice`, `clusterpirate`, `clusterservice`, `cveservice` and
`policyreporter`. ApiGateway's own `.claude/rules/{cluster-docs,observability-docs}.md` are the
detailed reference for response shapes and status codes in this domain; cross-link them when
editing these pages.

## Everything is cluster-scoped, there is no "observability instance"

There's no `observabilityInstanceId` resource and no literal `/clusters/{clusterId}` segment.
`clusterId` is the path param immediately after `/observability/`. Clusters are created through the
Cluster API and then queried through the flat Observability routes; there's no two-step
"create an instance, then attach a cluster" flow. `index.md`'s API Reference documents the Cluster
API routes (list, create, get, rename, rotate-token, delete).

## `kubernetes-resources.md` / `events-logs.md`: the `/kubernetes-proxy/` segment

| Scope           | Route                                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| Cluster-wide    | `GET /v1/workspaces/:workspaceId/observability/:clusterId/kubernetes-proxy/:resourceType`                       |
| Namespaced      | `GET /v1/workspaces/:workspaceId/observability/:clusterId/kubernetes-proxy/namespaces/:namespace/:resourceType` |
| Single resource | append `/:name` to the namespaced form                                                                          |

`labelSelector` is supported as a query param.

## Resource type enum is singular

The enum is `CRONJOB, DAEMONSET, DEPLOYMENT, JOB, NAMESPACE, NODE, POD, SERVICE, STATEFULSET`.
The API uppercases whatever it receives but does **not** de-pluralize, so a plural path segment
(`nodes` → `NODES`) fails validation. Use the singular form in every example.

## Single-resource fetch and events are separate endpoints

A single-resource fetch returns `{clusterId, workspaceId, resource: <raw manifest>}`, with no
embedded `events` field. Cluster events come from
`GET /:workspaceId/observability/:clusterId/kubernetes-events`, which returns a flat `systemEvents`
array. Document the two separately. Event fields are Type, Reason, Message, Source, Object,
Timestamp, Count, and the `type` enum is uppercase (`NORMAL`, `WARNING`).

## Metrics shape and config

Node and pod metrics come from the Kubernetes `metrics.k8s.io` API as a raw numeric series,
`{created, cpu, memory}[]`. Document that series shape rather than narrative health labels
("Healthy", "Under pressure"), which aren't part of the API response. The collection interval
defaults to 60s (`clusterPirate.metrics.updateIntervalSeconds`).

The cache TTL config key is top-level `valkey.ttl` (env var `VALKEY_TTL`), not nested under
`metrics`. Any `values.yaml` example in `setup-instructions.md` or `monitoring-metrics.md` puts
`ttl` under the top-level `valkey:` block.

`setup-instructions.md`'s other keys (`clusterPirate.logLevel`, `healthPort`, `metrics.enabled`,
`monitoring.resourceEventsEnabled`, `systemEventsEnabled`) match the chart defaults, as does the
one-access-token, one-`helm install` registration flow via `POST /register`.

## `cve-scans.md`

Trivy is the underlying scanner. Its severity vocabulary is critical/high/medium/low/unknown, so
"Critical" is a legitimate value here (unlike the policy-report `Severity` enum below, which has no
Critical tier).

## `best-practices.md`: Kyverno policy facts

Backed by real Kyverno policies (`src/services/policyreporter/policies/**`) run against 5 presets:
`BEST_PRACTICES`, `MULTI_TENANCY`, `PSS_BASELINE`, `PSS_RESTRICTED`, `OTHER`.

- **No per-violation "Category" field.** The shape is `violations[{policy, message, severity}]`
  grouped by `preset`. Category exists only as an internal Kyverno YAML annotation and is never
  surfaced to callers.
- **The `Severity` enum is `HIGH, MEDIUM, LOW, INFO`.** There's no Critical tier. Unrecognized
  values default to Medium, and nearly every policy file is annotated `severity: medium`, so check
  a policy's own Kyverno annotation before labeling it High in the docs.
- **Compliance score**: `SEVERITY_DEDUCTIONS = {High: 20, Medium: 10, Low: 5, Info: 2}`,
  `score = max(0, 100 - sum)`. There's no enforced target score; don't document one.
- **Policy slugs are easy to guess wrong.** The real ones:
  `disallow-container-sock-mounts`, `cert-manager-limit-duration`, `restrict-nodeport`,
  `restrict-external-ips`, `disallow-ingress-nginx-custom-snippets`, `require-ro-rootfs`.
- **"Restrict Capabilities" allowed list** is the full standard list, not just `NET_BIND_SERVICE`:
  `AUDIT_WRITE, CHOWN, DAC_OVERRIDE, FOWNER, FSETID, KILL, MKNOD, NET_BIND_SERVICE, SETFCAP,
SETGID, SETPCAP, SETUID, SYS_CHROOT`.
- Only document policies that have a matching file under `policyreporter/policies/`.

The sysctls and volume-types allow-lists match their Kyverno YAML message text exactly, as does the
general "every workload checked, issue/impact/remediation" mechanism description.

## Don't attach "Fully Managed / Managed In-House" to the ClusterPirate agent

That choice belongs to the separate **Full Observability Stack**
(Grafana/Prometheus/Loki/Tempo/Alloy), per `index.md`'s "Two Approaches to Observability" section.
The ClusterPirate agent is always a single Helm chart installed in the customer's own cluster,
with no CloudPirates-hosted option. Watch for pages that summarize both and accidentally attach
"Fully Managed"/"Managed In-House" to the agent itself.

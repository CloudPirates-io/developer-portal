---
paths:
  - "src/managed-observability/**"
---

# Managed Observability docs

Ground truth is `src/services/apigateway/.claude/rules/{cluster-docs,observability-docs}.md` (the
ApiGateway's own map of verified handler behavior) and, where those don't cover a claim, the actual
handler code in `observabilityservice`, `clusterpirate`, `clusterservice`, `cveservice`, and
`policyreporter`. Those two ApiGateway rule files are the primary source of truth for
response shapes, status codes, and the pagination header mechanism — cross-link them before editing
any page in this domain, and re-diff against the source directly if they and this file disagree.
This is the domain with the most drift risk of any audited so far; several pages describe features
that were renamed, removed, or never actually built. Re-verify against current source before
trusting this if it's been a while — this file is a map to the source of truth, not the source of
truth itself.

## Dead "observability instance" concept — don't use it in any example

The `observabilityInstanceId` resource doesn't exist (see the ApiGateway rule files'
"observability instance → cluster rename" note). Real routes
(`src/services/apigateway/src/Api/v1/Observability/ObservabilityApi.ts`, `ClusterApi.ts`) have no
`observabilityInstanceId` segment and no literal `/clusters/{clusterId}` segment — `clusterId` is
the path param immediately after `/observability/`. There is no two-step "create an observability
instance, then attach a cluster" flow; there is only "create a cluster" (Cluster API) and then
query it via the flat Observability routes. `index.md`'s API Reference should document the real
Cluster API routes (list/create/get/rename/rotate-token/delete), not observability-instance CRUD.

## `kubernetes-resources.md` / `events-logs.md`: required `/kubernetes-proxy/` segment

| Common wrong assumption                                                           | Real pattern                                                                                                                                          |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.../observability/{observabilityInstanceId}/clusters/{clusterId}/{resourceType}` | `GET /v1/workspaces/:workspaceId/observability/:clusterId/kubernetes-proxy/:resourceType`                                                             |
| `.../namespaces/{namespace}/pods/{podName}` (namespaced)                          | `GET /v1/workspaces/:workspaceId/observability/:clusterId/kubernetes-proxy/namespaces/:namespace/:resourceType` (then `/:name` for a single resource) |

Verified in `ObservabilityApi.ts:69` (namespaced list) and `:122` (cluster-wide list).

## Resource type enum is singular, not plural

The real enum (`src/shared/contracts/schemas/src/_Shared/ClusterPirate/kubernetes_resource_type.json`)
is **singular**: `CRONJOB, DAEMONSET, DEPLOYMENT, JOB, NAMESPACE, NODE, POD, SERVICE, STATEFULSET`.
`ObservabilityApi.ts` does `req.params.resourceType.toUpperCase()` (e.g. lines 47, 73, 101, 126)
with **no de-pluralization** — a plural example path (`nodes` → `NODES`) would fail validation
since `NODES` isn't a valid enum value. Use the singular form in every example; the server does
accept either case (it uppercases), but not either plural form.

## Single-resource fetch never embeds events

The real response shape for a single-resource fetch (`observability-docs.md`'s verified table,
confirmed against `kubernetesProxyResourceQueryHandler.ts`) is `{clusterId, workspaceId, resource:
<raw manifest>}` only — no `events` field, ever. Cluster-wide events come from a **separate**
endpoint, `GET /:workspaceId/observability/:clusterId/kubernetes-events`
(`ObservabilityApi.ts:191-208`), returning a flat `systemEvents` array not nested under any
resource fetch. Document both endpoints separately. The events endpoint's real `type` enum is
uppercase (`NORMAL|WARNING`), not title-case.

There is no "Rollout History" (previous ReplicaSet revisions) endpoint — `REPLICASET` isn't even in
the resource-type enum, and the raw Deployment manifest returned by kubernetes-proxy doesn't carry
revision history. Don't document this as a Deployment Details feature.

## No pod-logs feature exists anywhere — document as planned

No log-streaming concept exists in `observabilityservice` or `clusterpirate` (grepped both, zero
hits). Don't confuse with the unrelated, real `GET /:workspaceId/applications/:applicationId/logs`
route in ApiGateway's `Api/v1/Applications/WorkspaceApplicationsApi.ts:75-82` — that's
`application-manager`'s deployed-app logs, a completely different feature/domain, not cluster/pod
logs. Mark any pod/cluster log-access claim (streaming/historical logs, retention) `(planned)` with
a danger box rather than removing it — it's a reasonable roadmap item.

## Alerts are entirely fictional — no alerting engine exists under any name

No alerting/threshold-evaluation concept exists in any backend service under any name (grepped
every service, zero hits beyond generic frontend Bootstrap alert-box CSS, an unrelated UI
component, and six orphaned `Alert*.yaml` OpenAPI schemas already flagged as dead scaffolding in
`observability-docs.md:56-68`, never referenced by any route). `notificationservice`/
`messagingservice` exist but are generic transactional-notification services with no tie-in to
cluster-health thresholds. This means every "Smart Alerting"/"AI-Assisted Insights"/"Resource
Recommendations" claim in `index.md`, `alert-reference.md`'s ~30 specific alerts (ArgoCD
sync/health, replica-unavailable, CPU throttling, OOM kill, pod restarts, ingress cert expiry/5xx
rate, node load average, volume usage, Velero backup failures, Cosign image verification), and
every "Alert:"/"Alert Thresholds:" callout in `monitoring-metrics.md` and `events-logs.md` describe
the same nonexistent feature. Keep `alert-reference.md` as a page (don't delete it) but with a
top-of-page danger box stating no alert can currently fire; strip or annotate the other pages'
alert callouts pointing back to this note.

## CVE scanning (`cve-scans.md`) is unwired end-to-end

`cveservice` has exactly one handler (`ScanContainerImageCommandV1Handler`, calls Trivy directly via
`execFileAsync`) and **no query handler, no event handler, and no persistence layer at all**
(verified via directory listing). Nothing anywhere in the monorepo ever issues
`ScanContainerImageCommandV1` or listens for `ContainerImageScannedEventV1` outside `cveservice`'s
own files (repo-wide grep, zero hits). No `/cve` route exists in ApiGateway. `clusterpirate` has no
image-discovery code (grepped for `\bimage\b`, zero hits), so nothing ever triggers a scan
automatically. `trivyadapter` is a separate standalone service that nothing calls — `cveservice`
shells out to the `trivy` CLI directly instead of using it. There is no scheduler, no daily-scan
cron, no dashboard query — the entire pipeline this doc could describe (automated daily scanning,
zero-config on ClusterPirate install, CVE dashboard with severity counts) has no backend. The doc
should open with a danger box making this explicit.

The one thing that _is_ accurate: Trivy is the real underlying scanner, and its vulnerability
severity vocabulary (critical/high/medium/low/unknown, from
`schemas/src/_Shared/CveScanner/vulnerability_severity.json`) does genuinely include "Critical" —
unlike the unrelated policy-report `Severity` enum below, so if this pipeline is ever wired up,
"Critical" would be a legitimate value _here specifically_.

## Metrics collection is CPU/memory only

`MetricsCollector.ts:236-300` (`collectNodeMetrics`/`collectPodMetrics`) pulls **only**
`usage.cpu`/`usage.memory` from the K8s `metrics.k8s.io` API. Nothing else is collected anywhere in
`clusterpirate` or `observabilityservice`. Mark the following as `(not collected)` with the
real-scope caveat spelled out, rather than presenting them as available, anywhere they appear in
`monitoring-metrics.md`:

- "Disk Space", "Network Metrics", "Load Average" (no load1/5/15 collection)
- "Ingress Monitoring" (request rate/latency/error rate/cert expiry — `INGRESS` isn't even in the
  `KubernetesResourceType` enum, so Ingress resources aren't browsable via kubernetes-proxy either)
- "Volume Monitoring" (PVC capacity/usage — metrics-server has no volume metrics API)
- "Cluster Health → Component Health" (API server/scheduler/etcd probing — nothing probes control
  plane components)

There is no server-side health-classification layer ("Healthy," "Under pressure," "Overloaded") —
the real data is a raw numeric `{created, cpu, memory}[]` series (`observability-docs.md:48`) with
no categorization. Document the raw series shape, not narrative health labels. CPU/memory
collection itself, and the 60s default update interval
(`clusterPirate.metrics.updateIntervalSeconds`, `clusterpirate/config/default.yaml:12`), are real
and accurate.

The `clusterPirate.metrics.cache.ttl` config key doesn't exist — the real key is top-level
`valkey.ttl` (env var `VALKEY_TTL`; `clusterpirate/config/default.yaml:16-20` and
`custom-environment-variables.yaml:9-34`), not nested under `metrics`. Any `values.yaml` example in
`setup-instructions.md`/`monitoring-metrics.md` should put `ttl` under the top-level `valkey:`
block.

## `best-practices.md` is a real, wired-up feature — correct these facts, don't flag as aspirational

Backed by real Kyverno policies (`src/services/policyreporter/policies/**`, run via
`KyvernoService.ts` against 5 presets: `BEST_PRACTICES`, `MULTI_TENANCY`, `PSS_BASELINE`,
`PSS_RESTRICTED`, `OTHER`). Unlike alerts/CVE above, this is genuinely wired up, so correct facts in
place rather than flagging the page as aspirational:

- **No per-violation "Category" field.** The real API shape is
  `violations[{policy, message, severity}]` grouped by `preset` (`KyvernoService.parseKyvernoResults`,
  confirmed against `observability-docs.md:45`). Category only exists as an internal Kyverno YAML
  annotation, never surfaced to callers.
- **Severity taxonomy has no "Critical" tier.** The real `Severity` enum
  (`node-contracts/src/typings.ts:3343-3348`) is only `HIGH, MEDIUM, LOW, INFO`.
  `KyvernoService.mapSeverity()` silently defaults unrecognized strings to Medium, and **all but
  two real policy files** (`restrict-ingress-defaultbackend.yaml`,
  `pod-security-standards/baseline/baseline.yaml`) are annotated `severity: medium` — verify a
  policy's documented severity against its real Kyverno annotation before trusting a "Critical"/
  "High" label in this doc.
- **Compliance score formula.** Real formula
  (`observabilityservice/src/Observability/Application/calculatePolicyReportScore.ts:9-14,39-45`):
  `SEVERITY_DEDUCTIONS = {High: 20, Medium: 10, Low: 5, Info: 2}`, `score = max(0, 100 - sum)`. No
  Critical tier exists; there's no enforced "target score" anywhere in the backend — don't document
  one.
- **Policy slugs**: `disallow-container-sock-mounts` (not `disallow-cri-sock-mount`),
  `cert-manager-limit-duration` (not `limit-cert-manager-duration`), `restrict-nodeport` (not
  `restrict-node-port`), `restrict-external-ips` (not `restrict-service-external-ips`),
  `disallow-ingress-nginx-custom-snippets` (not `disallow-custom-snippets`, and this policy has no
  severity annotation at all, so it takes the Medium default, not "High"), `require-ro-rootfs` (not
  `require-read-only-filesystem`).
- **"Restrict Capabilities" allowed-list.** The real policy
  (`pod-security-standards/baseline/disallow-capabilities.yaml`) allows a longer standard list than
  just `NET_BIND_SERVICE`: `AUDIT_WRITE, CHOWN, DAC_OVERRIDE, FOWNER, FSETID, KILL, MKNOD,
NET_BIND_SERVICE, SETFCAP, SETGID, SETPCAP, SETUID, SYS_CHROOT`.
- **"Resource Usage Analysis"** (30-day consumption analysis, over/under-provisioned
  recommendations) has zero backend support — fictional, same category as the "Resource
  Recommendations" bullet in `index.md`. Mark `(planned — not implemented)`.
- **`restrict-image-registries` and `add-networkpolicy` are not real policies** — neither has a
  matching Kyverno policy file anywhere in `policyreporter/policies/` (grepped for
  "registry"/"NetworkPolicy", zero hits for either concept as an enforced policy). Don't document
  them.

Confirmed accurate and don't need touching: the sysctls allow-list, the volume-types allow-list
(both match their Kyverno YAML message text exactly), any policy name not listed above as a
mismatch, and the general "every workload checked, issue/impact/remediation" mechanism description.

## Don't attach "Fully Managed / Managed In-House" to the ClusterPirate agent itself

That fully-managed-vs-in-house choice belongs to the separate **Full Observability Stack**
(Grafana/Prometheus/Loki/Tempo/Alloy), per `index.md`'s own "Two Approaches to Observability"
section. The ClusterPirate agent (the actual "Managed Observability" product this rules file
covers) is always a single Helm chart installed in your own cluster, no CloudPirates-hosted
option. `../managed-services/index.md` used to list "Fully Managed"/"Managed In-House" as
deployment options for Managed Observability itself, which conflated the two products; fixed
2026-07-28 by moving the fully-managed/in-house framing to a "Full Observability Stack" callout
instead. Watch for this conflation resurfacing on any page that summarizes Managed Observability
alongside the full stack.

## Note: this file's `paths:` glob is stale

Frontmatter says `docs/managed-observability/**` but the actual content directory is
`src/managed-observability/**` (repo was restructured, `docs/` no longer exists as of
2026-07-28). Auto-loading via `paths:` for this file may not currently trigger; re-verify and fix
the glob if it's still `docs/**` when next touching this file.

## Confirmed accurate — don't rewrite these

- `setup-instructions.md`'s `clusterPirate.logLevel`/`healthPort`/`metrics.enabled`/
  `monitoring.resourceEventsEnabled`/`systemEventsEnabled` config keys and defaults all match
  `clusterpirate/config/default.yaml` exactly.
- The one-access-token, one-helm-install registration flow (`POST /register`) is real and matches
  `ClusterPirateApi.ts`/`CloudPiratesApiClient.ts`.
- `events-logs.md`'s event field list (Type, Reason, Message, Source, Object, Timestamp, Count)
  matches the real `kubernetesSystemEventsQueryHandler.ts` shape closely (modulo the uppercase
  `type` enum noted above); the "Common Event Scenarios" reason strings are standard Kubernetes
  event reasons, not backend-specific claims.
- `kubernetes-resources.md`'s `labelSelector` query param support, the resource-type list itself
  (once corrected to singular casing), and Node/Pod status detail fields are all real.
- The Helm chart itself referenced in `setup-instructions.md` (`oci://registry-1.docker.io/...`)
  could not be verified — no Helm chart exists in this monorepo checkout. Its chart-specific claims
  are unverifiable from here, not confirmed wrong; check wherever the actual chart lives.

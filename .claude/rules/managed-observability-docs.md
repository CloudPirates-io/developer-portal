---
paths:
  - 'docs/managed-observability/**'
---

# Managed Observability docs

Written 2026-07-22, from an audit that read every file in `docs/managed-observability/` in full
and cross-checked it against `src/services/apigateway/.claude/rules/{cluster-docs,observability-docs}.md`
(the ApiGateway's own map of verified handler behavior) and, where those didn't cover a claim,
against the actual handler code in `observabilityservice`, `clusterpirate`, `clusterservice`,
`cveservice`, and `policyreporter`. If this note is many months/years old when you read it,
re-verify against current source before trusting it — this is a map to the source of truth, not
the source of truth itself. This is the domain with the most drift of any area audited in this
pass; several pages describe features that were renamed, removed, or never actually built.

**Update 2026-07-22**: every finding below was fixed in the doc pages in a follow-up pass the same
day. The backend facts recorded here are unchanged (still ground truth) — only the framing changed
from "doc says X, wrong" to "doc used to say X, now says Y." Re-verify against current source
before trusting the specific line numbers if this note is old when you read it.

## Dead "observability instance" concept — fixed, removed from every URL example

The `observabilityInstanceId` resource was removed; the API is now flat, keyed only by `clusterId`
(see the ApiGateway rule files' "observability instance → cluster rename" note). `index.md`
("API Reference" section, "Create Observability Instance" setup step), `setup-instructions.md`
("Before You Begin" step 3, and the troubleshooting section), and every URL example in
`kubernetes-resources.md` and `events-logs.md` used to show paths like
`/v1/workspaces/{workspaceId}/observability/{observabilityInstanceId}/clusters/{clusterId}/...`.

Real routes (`src/services/apigateway/src/Api/v1/Observability/ObservabilityApi.ts`,
`ClusterApi.ts`) have no `observabilityInstanceId` segment and no literal `/clusters/{clusterId}`
segment — `clusterId` is the path param immediately after `/observability/`. There is no two-step
"create an observability instance, then attach a cluster" flow; there is only "create a cluster"
(Cluster API) and then query it via the flat Observability routes. `index.md`'s API Reference now
documents the real Cluster API routes (list/create/get/rename/rotate-token/delete) instead of the
fictional observability-instance CRUD.

## kubernetes-resources.md / events-logs.md — fixed, `/kubernetes-proxy/` segment restored

On top of the dead-instance-ID bug above, every example path was also missing a required segment.

| Was documented as | Real pattern (now documented) |
| --- | --- |
| `.../observability/{observabilityInstanceId}/clusters/{clusterId}/{resourceType}` | `GET /v1/workspaces/:workspaceId/observability/:clusterId/kubernetes-proxy/:resourceType` |
| `.../namespaces/{namespace}/pods/{podName}` (namespaced) | `GET /v1/workspaces/:workspaceId/observability/:clusterId/kubernetes-proxy/namespaces/:namespace/:resourceType` (then `/:name` for a single resource) |

Verified in `ObservabilityApi.ts:69` (namespaced list) and `:122` (cluster-wide list).

## Resource type casing/pluralization bug — fixed, docs now use singular form

Doc examples used plural lowercase (`nodes`, `pods`, `deployments`, `statefulsets`, `daemonsets`,
`jobs`, `cronjobs`, `services`, `namespaces`). The real enum
(`src/shared/contracts/schemas/src/_Shared/ClusterPirate/kubernetes_resource_type.json`) is
**singular**: `CRONJOB, DAEMONSET, DEPLOYMENT, JOB, NAMESPACE, NODE, POD, SERVICE, STATEFULSET`.
`ObservabilityApi.ts` does `req.params.resourceType.toUpperCase()` (e.g. lines 47, 73, 101, 126)
with **no de-pluralization** — the doc's old literal example paths (`nodes` → `NODES`) would have
failed validation since `NODES` isn't a valid enum value. Docs now use the singular form
throughout; the server does accept either case (it uppercases), but not either plural form.

## Response shape: single-resource fetch never embeds events — fixed

`events-logs.md`'s "Get Resource with Events" example used to show a combined
`{"resource": {...}, "events": [...]}` response for a single Pod fetch. The real shape
(`observability-docs.md`'s verified table, confirmed against `kubernetesProxyResourceQueryHandler.ts`)
is `{clusterId, workspaceId, resource: <raw manifest>}` only — no `events` field, ever. Real
cluster-wide events come from a **separate** endpoint, `GET /:workspaceId/observability/:clusterId/kubernetes-events`
(`ObservabilityApi.ts:191-208`), returning a flat `systemEvents` array not nested under any
resource fetch. Doc now documents both endpoints separately, with the events endpoint's real
`type: NORMAL|WARNING` uppercase enum (was shown as title-case `"Normal"`).

Similarly, `kubernetes-resources.md`'s "Deployment Details → Rollout History" claim (previous
ReplicaSet revisions) had no backing endpoint — `REPLICASET` isn't even in the resource-type enum,
and the raw Deployment manifest returned by kubernetes-proxy doesn't carry revision history. Bullet
removed.

## No pod-logs feature exists anywhere — fixed, now flagged as planned

`events-logs.md`'s "Pod Logs" section (streaming/historical logs, retention) describes something
with zero backend support — no log-streaming concept anywhere in `observabilityservice` or
`clusterpirate` (grepped both, zero hits). Don't confuse with the unrelated, real
`GET /:workspaceId/applications/:applicationId/logs` route in ApiGateway's
`Api/v1/Applications/WorkspaceApplicationsApi.ts:75-82` — that's `application-manager`'s deployed-app
logs, a completely different feature/domain, not cluster/pod logs. The section (and every other
place in `managed-observability/` that implied log access) is now marked `(planned)` with a danger
box, rather than removed, since it's a reasonable roadmap item.

## Alerts are entirely fictional — no alerting engine exists under any name — fixed, flagged as planned

`alert-reference.md` documents ~30 specific alerts (ArgoCD sync/health, replica-unavailable,
CPU throttling, OOM kill, pod restarts, ingress cert expiry/5xx rate, node load average, volume
usage, Velero backup failures, Cosign image verification). None of this exists. Grepped every
backend service for an alerting/threshold-evaluation concept under any name — zero hits beyond
generic frontend Bootstrap alert-box CSS (unrelated UI component) and the six orphaned
`Alert*.yaml` OpenAPI schemas already flagged as dead scaffolding in
`observability-docs.md:56-68` (never referenced by any route). `notificationservice`/
`messagingservice` exist but are generic transactional-notification services with no tie-in to
cluster-health thresholds.

This also meant `index.md`'s "Smart Alerting" section and "AI-Assisted Insights"/"Resource
Recommendations" bullets, and every "Alert:"/"Alert Thresholds:" callout scattered through
`monitoring-metrics.md` and `events-logs.md`, described the same nonexistent feature.
`alert-reference.md` is fully fictional (not partial/renamed) — kept as a page but with a top-of-page
danger box stating no alert can currently fire; the other pages' alert callouts were stripped or
annotated inline pointing back to this rule.

## CVE scanning (`cve-scans.md`) is unwired end-to-end — fixed, flagged as planned

`cveservice` has exactly one handler (`ScanContainerImageCommandV1Handler`, calls Trivy directly
via `execFileAsync`) and **no query handler, no event handler, and no persistence layer at all**
(verified via directory listing). Nothing anywhere in the monorepo ever issues
`ScanContainerImageCommandV1` or listens for `ContainerImageScannedEventV1` outside `cveservice`'s
own files (repo-wide grep, zero hits). No `/cve` route exists in ApiGateway. `clusterpirate` has no
image-discovery code (grepped for `\bimage\b`, zero hits), so nothing ever triggers a scan
automatically. `trivyadapter` is a separate standalone service that nothing calls — `cveservice`
shells out to the `trivy` CLI directly instead of using it. There is no scheduler, no daily-scan
cron, no dashboard query — the entire pipeline described in this doc (automated daily scanning,
zero-config on ClusterPirate install, CVE dashboard with severity counts) has no backend.

The one thing that *is* accurate: Trivy is the real underlying scanner, and its vulnerability
severity vocabulary (critical/high/medium/low/unknown, from
`schemas/src/_Shared/CveScanner/vulnerability_severity.json`) does genuinely include "Critical" —
unlike the unrelated policy-report `Severity` enum below, so if this pipeline is ever wired up,
"Critical" would be a legitimate value *here specifically*. The doc now opens with a danger box
making all of this explicit, keeping the Trivy/"Critical" caveat as the one accurate carve-out.

## Metrics collection is CPU/memory only — `monitoring-metrics.md` fixed, scope corrected

`MetricsCollector.ts:236-300` (`collectNodeMetrics`/`collectPodMetrics`) pulls **only**
`usage.cpu`/`usage.memory` from the K8s `metrics.k8s.io` API. Nothing else is collected anywhere
in `clusterpirate` or `observabilityservice`. The following sections of `monitoring-metrics.md`
described metrics that are never collected and are now marked `(not collected)` with the
real-scope caveat spelled out, rather than presented as available:

- "Disk Space", "Network Metrics", "Load Average" (no load1/5/15 collection)
- "Ingress Monitoring" (request rate/latency/error rate/cert expiry — `INGRESS` isn't even in the
  `KubernetesResourceType` enum, so Ingress resources aren't browsable via kubernetes-proxy either)
- "Volume Monitoring" (PVC capacity/usage — metrics-server has no volume metrics API)
- "Cluster Health → Component Health" (API server/scheduler/etcd probing — nothing probes control
  plane components)

The "Server Health/CPU/Memory" narrative labels ("Healthy," "Under pressure," "Overloaded") also
implied a classification layer that doesn't exist — the real data is a raw numeric
`{created, cpu, memory}[]` series (`observability-docs.md:48`) with no server-side health
categorization; the doc now shows the raw series shape instead of the narrative labels. CPU/memory
collection itself, and the 60s default update interval
(`clusterPirate.metrics.updateIntervalSeconds`, `clusterpirate/config/default.yaml:12`), were
already real and accurate and are untouched.

Also fixed: `setup-instructions.md` and `monitoring-metrics.md` both showed a `values.yaml`
example with `clusterPirate.metrics.cache.ttl` — the real config key is top-level `valkey.ttl`
(env var `VALKEY_TTL`; `clusterpirate/config/default.yaml:16-20` and
`custom-environment-variables.yaml:9-34`), not nested under `metrics`. Both examples now put `ttl`
under the top-level `valkey:` block.

## best-practices.md — real feature, fixed API shape and severities

Backed by real Kyverno policies (`src/services/policyreporter/policies/**`, run via
`KyvernoService.ts` against 5 presets: `BEST_PRACTICES`, `MULTI_TENANCY`, `PSS_BASELINE`,
`PSS_RESTRICTED`, `OTHER`). This is genuinely wired up — unlike alerts/CVE above — so it was
corrected in place rather than flagged as aspirational. What was fixed:

- **No per-violation "Category" field.** The real API shape is
  `violations[{policy, message, severity}]` grouped by `preset` (`KyvernoService.parseKyvernoResults`,
  confirmed against `observability-docs.md:45`). Category only exists as an internal Kyverno YAML
  annotation, never surfaced to callers. Doc's "Policy Violation Structure" section now reflects
  this real shape.
- **Severity taxonomy was fabricated.** The doc assigned Critical/High/Medium/Low per policy. The
  real `Severity` enum (`node-contracts/src/typings.ts:3343-3348`) is only `HIGH, MEDIUM, LOW,
  INFO` — no Critical. `KyvernoService.mapSeverity()` silently defaults unrecognized strings to
  Medium, and **all but two real policy files** (`restrict-ingress-defaultbackend.yaml`,
  `pod-security-standards/baseline/baseline.yaml`) are annotated `severity: medium` — so nearly
  every specific severity claim in the doc was wrong. Every policy's severity in the doc was
  corrected against its real Kyverno annotation.
- **Compliance score formula was wrong.** Doc claimed Critical −10 / High −5 / Medium −2 / Low −1,
  target 90%+. Real formula (`observabilityservice/src/Observability/Application/calculatePolicyReportScore.ts:9-14,39-45`):
  `SEVERITY_DEDUCTIONS = {High: 20, Medium: 10, Low: 5, Info: 2}`, `score = max(0, 100 - sum)`. No
  Critical tier exists; every real deduction is exactly double the doc's old claim; the doc omitted
  the `Info` tier entirely. Formula and tiers corrected; "90%+ target" claim removed (not enforced
  anywhere).
- **Policy-slug mismatches, all corrected**: `disallow-cri-sock-mount` → real
  `disallow-container-sock-mounts`; `limit-cert-manager-duration` → real
  `cert-manager-limit-duration`; `restrict-node-port` → real `restrict-nodeport`;
  `restrict-service-external-ips` → real `restrict-external-ips`;
  `disallow-custom-snippets` → real `disallow-ingress-nginx-custom-snippets` (no severity
  annotation at all, doc claimed "High", corrected to the Medium default);
  `require-read-only-filesystem` → real `require-ro-rootfs`.
- **"Restrict Capabilities" allowed-list was incomplete** — doc said only `NET_BIND_SERVICE`; real
  policy (`pod-security-standards/baseline/disallow-capabilities.yaml`) allows a much longer
  standard list (`AUDIT_WRITE, CHOWN, DAC_OVERRIDE, FOWNER, FSETID, KILL, MKNOD, NET_BIND_SERVICE,
  SETFCAP, SETGID, SETPCAP, SETUID, SYS_CHROOT`) — doc now lists the full set.
- **"Resource Usage Analysis"** (30-day consumption analysis, over/under-provisioned
  recommendations) has zero backend support — fictional, same category as the "Resource
  Recommendations" bullet in index.md. Now marked `(planned — not implemented)`.
- Two more fictional policies were found and removed during the fix pass that this rule file
  hadn't originally flagged: **`restrict-image-registries`** and **`add-networkpolicy`** — neither
  has a matching Kyverno policy file anywhere in `policyreporter/policies/` (grepped for
  "registry"/"NetworkPolicy", zero hits for either concept as an enforced policy).

Confirmed accurate and left untouched: the sysctls allow-list, the volume-types allow-list
(both match their Kyverno YAML message text exactly), most policy names not listed above as
mismatched, and the general "every workload checked, issue/impact/remediation" mechanism
description.

## Confirmed accurate — don't rewrite these

- `setup-instructions.md`'s `clusterPirate.logLevel`/`healthPort`/`metrics.enabled`/
  `monitoring.resourceEventsEnabled`/`systemEventsEnabled` config keys and defaults all match
  `clusterpirate/config/default.yaml` exactly.
- The one-access-token, one-helm-install registration flow (`POST /register`) is real and matches
  `ClusterPirateApi.ts`/`CloudPiratesApiClient.ts`.
- `events-logs.md`'s event field list (Type, Reason, Message, Source, Object, Timestamp, Count)
  matches the real `kubernetesSystemEventsQueryHandler.ts` shape closely (module the uppercase
  `type` enum noted above); the "Common Event Scenarios" reason strings are standard Kubernetes
  event reasons, not backend-specific claims.
- `kubernetes-resources.md`'s `labelSelector` query param support, the resource-type list itself
  (once corrected to singular casing), and Node/Pod status detail fields are all real.
- The Helm chart itself referenced in `setup-instructions.md` (`oci://registry-1.docker.io/...`)
  could not be verified — no Helm chart exists in this monorepo checkout. Its chart-specific claims
  are unverifiable from here, not confirmed wrong; check wherever the actual chart lives.

## For the next agent maintaining these pages

Cross-link `src/services/apigateway/.claude/rules/observability-docs.md` and `cluster-docs.md` for
the underlying verified API-shape ground truth (response shapes, status codes, the pagination
header mechanism) before further editing any of these pages — those files are the primary source
for "what's actually true" on the Observability/Cluster domains, this file tracks where the
*portal* pages previously diverged from that truth and how that was fixed on 2026-07-22. If any of
`ObservabilityApi.ts`, `ClusterApi.ts`, the Kyverno policy files, or `cveservice`/`clusterpirate`
change, re-diff the portal pages against them rather than assuming this file is still current.

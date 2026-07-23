# Performance Insights

Monitor node and pod CPU/memory usage for capacity planning.

::: danger CPU/Memory Only
Metrics collection covers **only CPU and memory** for nodes and pods, pulled from the Kubernetes
`metrics.k8s.io` API. Disk, network, load average, ingress traffic/latency, volume usage, and
control-plane component health are **not collected anywhere** — the sections below that describe
them are planned, not current, functionality. There is also no server-side health classification
layer ("Healthy"/"Under pressure"/"Overloaded") or alerting engine — the real data is a raw
numeric `{created, cpu, memory}[]` time series per node/pod, with no thresholds or labels applied.
Every "Alert"/"Alert Thresholds" callout on this page describes the same nonexistent alerting
feature (see [Alert Reference](./alert-reference.md)).
:::

## What We Monitor

- **Node CPU/Memory**: Raw usage series per node
- **Pod CPU/Memory**: Raw usage series per pod

## Node Metrics

### CPU and Memory

CPU and memory usage per node, collected every `updateIntervalSeconds` (60s by default) from the
Kubernetes `metrics.k8s.io` API. The response is a raw numeric series — there is no health
classification, no "Healthy"/"Under pressure"/"Overloaded" labeling, and no derived insight text:

```json
[{ "created": "2024-01-15T10:30:00Z", "cpu": 450, "memory": 2147483648 }]
```

### Disk Space _(not collected)_

Free disk space, growth-rate tracking, and per-path breakdowns are not collected anywhere.

### Network Metrics _(not collected)_

Inbound/outbound throughput, error/drop counts, and connection statistics are not collected anywhere.

### Load Average _(not collected)_

1/5/15-minute load average is not collected anywhere.

## Pod Monitoring

### CPU/Memory Usage

Same raw `{created, cpu, memory}[]` series as node metrics, collected per pod. There is no
computed throttling percentage or alerting — CPU/memory limits and requests are visible on the
raw pod manifest (see [Kubernetes Resources](./kubernetes-resources.md)), not as a derived metric.

### Pod Health

Status is read directly off the pod manifest via the resource explorer, not a separate
monitoring feature:

- Pod phase (Running, Pending, Failed, etc.)
- Container readiness
- Liveness probe status
- Restart counts

## Workload Monitoring

Replica status for Deployments/StatefulSets/DaemonSets is read directly off the resource manifest
via the resource explorer (see [Kubernetes Resources](./kubernetes-resources.md)):

- Desired / current / available / unavailable replicas

## Volume Monitoring _(not collected)_

PVC capacity/usage metrics are not collected anywhere — the Kubernetes `metrics.k8s.io` API this
platform reads from has no volume-metrics endpoint.

## Ingress Monitoring _(not collected)_

Request rate, latency, error rate, and certificate-expiry tracking are not collected anywhere.
Ingress resources also aren't browsable through the resource explorer today — `Ingress` isn't in
the supported resource-type list.

## Cluster Health

### Overall Status

Read directly off the resource explorer/summary endpoint:

- Total node count
- Total pod count
- Resource utilization overview

### Resource Capacity

- Total CPU capacity
- Total memory capacity
- Allocated vs available resources

### Component Health _(not collected)_

Nothing probes control-plane components (API server, controller manager, scheduler, etcd) — there
is no component health signal.

## Metrics Collection

### Update Intervals

Metrics are collected and updated at a configurable interval (60 seconds by default):

Configure via ClusterPirate helm chart:

```yaml
clusterPirate:
  metrics:
    updateIntervalSeconds: 60
```

### Metric Retention

Configure the Valkey cache TTL (this is a cache duration, not a fixed historical-retention
window):

```yaml
valkey:
  ttl: 86400 # 24 hours, default
```

## Viewing Metrics

### Web Console

Access metrics through the portal:

1. Navigate to [portal.cloudpirates.io](https://portal.cloudpirates.io)
2. Select workspace
3. Choose cluster
4. View metrics dashboard with real-time data

**Dashboard Features**:

- Interactive charts and graphs
- Time range selection
- Resource filtering

### API Reference

Metrics are exposed through the Kubernetes resource API endpoints.

See [Kubernetes Resources](./kubernetes-resources.md) for API details.

## Related Resources

- [Kubernetes Resources](./kubernetes-resources.md)
- [Events & Logs](./events-logs.md)
- [Alert Reference](./alert-reference.md)
- [Setup Instructions](./setup-instructions.md)

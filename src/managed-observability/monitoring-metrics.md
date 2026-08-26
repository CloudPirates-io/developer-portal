# Performance Insights

Monitor node and pod resource usage for capacity planning.

## What We Monitor

- **Node CPU/Memory**: Raw usage series per node
- **Pod CPU/Memory**: Raw usage series per pod
- **Node Disk, Network, and Load**: Capacity, throughput, and load average per node
- **Volumes and Ingresses**: PVC usage, request rates, and certificate expiry
- **Cluster Health**: Node/pod counts, capacity, and control-plane component health

## Node Metrics

### CPU and Memory

CPU and memory usage per node, collected every `updateIntervalSeconds` (60s by default) from the
Kubernetes `metrics.k8s.io` API. The response is a raw numeric series.

```json
[{ "created": "2024-01-15T10:30:00Z", "cpu": 450, "memory": 2147483648 }]
```

### Disk Space

Free disk space per node, with growth-rate tracking and per-path breakdowns.

### Network Metrics

Inbound/outbound throughput, error/drop counts, and connection statistics per node.

### Load Average

1/5/15-minute load average per node.

## Pod Monitoring

### CPU/Memory Usage

Same raw `{created, cpu, memory}[]` series as node metrics, collected per pod.
CPU/memory limits and requests are visible on the raw pod manifest
(see [Kubernetes Resources](./kubernetes-resources.md)).

### Pod Health

Status is read directly off the pod manifest via the resource explorer:

- Pod phase (Running, Pending, Failed, etc.)
- Container readiness
- Liveness probe status
- Restart counts

## Workload Monitoring

Replica status for Deployments/StatefulSets/DaemonSets is read directly off the resource manifest
via the resource explorer (see [Kubernetes Resources](./kubernetes-resources.md)):

- Desired / current / available / unavailable replicas

## Volume Monitoring

Capacity and usage per PersistentVolumeClaim.

## Ingress Monitoring

Request rate, latency, error rate, and certificate-expiry tracking per Ingress.

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

### Component Health

Health of the control-plane components: API server, controller manager, scheduler, and etcd.

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

Configure the Valkey cache TTL:

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

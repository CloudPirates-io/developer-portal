# Performance Insights

Monitor cluster performance with metrics and insights for capacity planning and optimization.

## What We Monitor

Performance data with context to help you make informed decisions about your infrastructure:

- **Server Health**: Infrastructure resource utilization
- **Application Performance**: Workload efficiency metrics
- **Resource Usage**: Capacity and optimization opportunities
- **Capacity Planning**: Growth trends and recommendations

::: tip Metrics with Context
Performance metrics include descriptions and recommendations to help you understand what actions to take.
:::

## Server Health (Node Monitoring)

### CPU: Is Your Server Keeping Up?

**What we show**:

- Clear health status: "Healthy", "Under pressure", or "Overloaded"
- Usage patterns: consistent, spiky, or growing trend
- Impact on your applications

**Example insights**:

- ✅ "CPU usage is healthy at 45%. Your server has plenty of capacity."
- ⚠️ "CPU usage is at 85%. Your server is working hard but managing. Consider scaling if usage continues to grow."
- 🔴 "CPU usage is at 95%. Your applications may be slow. Add more nodes or reduce workload."

### Memory: Do You Have Enough RAM?

**What we show**:

- Available memory in simple terms
- Memory pressure warnings before problems occur
- Which applications are using the most memory

**Example insights**:

- ✅ "Memory usage is healthy at 60%. Plenty of room for growth."
- ⚠️ "Only 15% memory free. New pods may have trouble starting. Consider adding nodes."
- 🔴 "Memory is critically low at 95%. The server may start killing processes. Immediate action needed."

### Disk Space: Running Out of Room?

**What we show**:

- Free disk space in GB/TB (not just percentages)
- Growth rate: how quickly you're filling up
- Which areas are using the most space

**Example insights**:

- ✅ "Disk usage is at 45% (220 GB free). Plenty of space available."
- ⚠️ "Disk is 88% full (30 GB free). You'll run out of space in approximately 2 weeks at current usage."
- 🔴 "Disk is 96% full (8 GB free). Critical: Pods may fail to start or write logs."

### Network Metrics

**Network Throughput**

- Inbound traffic (bytes/sec)
- Outbound traffic (bytes/sec)
- Network errors and drops
- Connection statistics

### Load Average

**System Load**

- 1-minute load average
- 5-minute load average
- 15-minute load average

**Alert Thresholds**:

- Warning: Load5 > CPU count \* 0.8
- Critical: Load15 > CPU count \* 0.8

## Pod Monitoring

### Resource Consumption

**CPU Usage**

- Current CPU consumption
- CPU requests vs actual usage
- CPU limits and throttling

**Alert**: Pod CPU throttling > 25%

**Memory Usage**

- Current memory consumption
- Memory requests vs actual usage
- Memory limits
- Out-of-memory (OOM) events

**Alert Thresholds**:

- Warning: Memory usage > 90% of requests
- Critical: Memory usage > 95% of limits

### Pod Health

**Status Monitoring**

- Pod phase (Running, Pending, Failed, etc.)
- Container readiness
- Liveness probe status
- Restart counts

**Alerts**:

- Pod not ready > 5 minutes
- Excessive restarts (> 5 in 1 hour)
- Pod OOM killed
- Pod errors

### Container Metrics

**Per-Container Statistics**:

- CPU usage per container
- Memory usage per container
- Restart history
- Exit codes and reasons

## Workload Monitoring

### Deployment Status

**Replica Monitoring**:

- Desired replicas
- Current replicas
- Available replicas
- Unavailable replicas

**Alert**: Deployment replicas unavailable

### StatefulSet Status

**Ordered Pod Monitoring**:

- Desired replicas
- Current replicas
- Ready replicas
- Pod management status

**Alert**: StatefulSet replicas unavailable

### DaemonSet Status

**Node Coverage**:

- Desired pods (one per node)
- Current pods
- Available pods
- Unavailable pods

**Alert**: DaemonSet replicas unavailable

## Volume Monitoring

### Persistent Volume Claims

**Storage Metrics**:

- Volume capacity
- Volume usage percentage
- Available space

**Alert Thresholds**:

- Warning: Volume usage > 90%
- Critical: Volume usage > 95%

**Alert**: Volume stats missing (unable to retrieve metrics)

## Ingress Monitoring

### Traffic Metrics

**Request Statistics**:

- Request count
- Request rate (requests/sec)
- Response latency (p50, p95, p99)

**Alert**: High request count (unusual traffic spike)

### Error Rates

**HTTP Status Codes**:

- 2xx success rate
- 4xx client error rate
- 5xx server error rate

**Alert**: 5xx error rate > 5%

### Request Latency

**Response Time Monitoring**:

- Average request latency
- 95th percentile latency
- 99th percentile latency

**Alert**: Request latency > 1 second (p95)

### Certificate Monitoring

**TLS Certificate Status**:

- Certificate expiration date
- Days until expiry
- Certificate validity

**Alert**: Certificate expires within 30 days

## Cluster Health

### Overall Status

**Cluster Indicators**:

- Total node count
- Healthy nodes vs total
- Total pod count
- Running pods vs total
- Resource utilization overview

### Resource Capacity

**Cluster Resources**:

- Total CPU capacity
- Total memory capacity
- Total storage capacity
- Allocated vs available resources

### Component Health

**Control Plane**:

- API server availability
- Controller manager status
- Scheduler status
- etcd health

## Metrics Collection

### Update Intervals

Metrics are collected and updated at configurable intervals:

- **Node metrics**: Every 60 seconds (default)
- **Pod metrics**: Every 60 seconds (default)
- **Cluster metrics**: Every 60 seconds (default)

Configure via ClusterPirate helm chart:

```yaml
clusterPirate:
  metrics:
    updateIntervalSeconds: 60
```

### Metric Retention

- **Real-time metrics**: Available immediately
- **Historical metrics**: Retained for 90 days (default)
- **Cache TTL**: 24 hours (86400 seconds)

Configure cache:

```yaml
clusterPirate:
  metrics:
    cache:
      ttl: 86400
```

## Viewing Metrics

### Web Console

Access metrics through the portal:

1. Navigate to [portal.cloudpirates.io](https://portal.cloudpirates.io)
2. Select workspace and observability instance
3. Choose cluster
4. View metrics dashboard with real-time data

**Dashboard Features**:

- Interactive charts and graphs
- Time range selection
- Resource filtering
- Alert status indicators

### API Access

Metrics are exposed through the Kubernetes resource API endpoints.

See [Kubernetes Resources](./kubernetes-resources.md) for API details.

## Related Resources

- [Kubernetes Resources](./kubernetes-resources.md)
- [Events & Logs](./events-logs.md)
- [Alert Reference](./alert-reference.md)
- [Setup Instructions](./setup-instructions.md)

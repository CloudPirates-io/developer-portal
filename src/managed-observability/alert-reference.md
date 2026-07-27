---
next: false
---

# Alert Reference

## ArgoCD Alerts

::: details ArgoCD Sync Status
Whether the desired state in Git matches what's actually deployed in the cluster. A failed sync
usually means Git access issues, resource conflicts, or a misconfiguration.
:::

::: details ArgoCD Health Status
The overall health of an ArgoCD-managed application. A degraded or failed status points to a
service disruption, connectivity issue, or configuration error.
:::

## Application Alerts

::: details Daemonset Replicas Unavailable
Fewer DaemonSet replicas are running than desired. Usually caused by node failures, resource
exhaustion, scheduling constraints, or a misconfiguration.
:::

::: details Deployment Replicas Unavailable
Fewer Deployment replicas are running than desired. Usually caused by insufficient resources,
container failures, or a rollout conflict.
:::

::: details StatefulSet Replicas Unavailable
Fewer StatefulSet replicas are running than desired. Usually caused by node failures, resource
constraints, or a misconfiguration.
:::

::: details Pod CPU Throttling Error
A pod is being CPU-throttled because it's exceeding its CPU limit, degrading its performance.
:::

::: details Pod Errors
One or more pods hit an error during execution. Causes range from misconfiguration and resource
limits to network issues or application-specific failures. Check the pod's events for the
specific cause.
:::

::: details Pod Memory Failures
A pod hit a memory-related failure: an allocation error, an OOM kill, or a leak in one of its
containers.
:::

::: details Pod Memory Limits
A pod's memory usage exceeded its configured limit, triggering resource contention. Adjust the
limit or the workload's actual memory usage.
:::

::: details Pod Memory Requests
A pod's memory usage is running well above its configured request. Requests set too low risk
resource starvation; requests set too high waste cluster capacity.
:::

::: details Pod OOM Kill
A pod was killed because the node ran out of memory. Kubernetes terminates the pod to free memory
and keep the node stable.
:::

::: details Pod Readiness
One or more pods aren't reaching a ready state, so they can't serve traffic. Common causes:
application startup failures, unmet dependencies, or failing readiness probes.
:::

::: details Pod Restarts
A pod restarted more than 5 times within an hour, indicating instability or resource pressure.
Frequent restarts disrupt availability and need investigation.
:::

## Ingress Alerts

::: details Ingress Certificate Expiry
The TLS certificate on an Ingress is approaching its expiration date. An expired certificate
causes service interruptions and browser warnings for users.
:::

::: details Ingress 5xx Error Rate
The rate of HTTP 5xx errors on an Ingress is elevated. Usually points to an issue in application
logic, a backend service, or infrastructure.
:::

::: details Ingress Request Count
An Ingress is receiving an unusually high number of requests over a given period.
:::

::: details Ingress Request Latency
Requests through an Ingress are taking longer than expected to process. High latency degrades
user experience and often points to network, backend, or resource contention issues.
:::

## Node Alerts

::: details Node CPU Usage
A node's CPU usage is high. Often means resource contention, inefficient allocation, or
increased demand from running workloads.
:::

::: details Node Load15
A node's 15-minute load average is high, indicating sustained resource saturation.
:::

::: details Node Load5
A node's 5-minute load average is high, a more immediate signal of resource pressure than Load15.
:::

::: details Node Disk Usage
A node's disk usage is high. Left unaddressed, this risks running out of storage capacity.
:::

::: details Node Network Throughput In
A node's inbound network throughput is high, useful for spotting traffic bottlenecks and
bandwidth pressure.
:::

::: details Node Network Throughput Out
A node's outbound network throughput is high, useful for spotting bottlenecks in outbound
traffic.
:::

::: details Node Unschedulable
A node has been marked unschedulable and won't receive new pod assignments. Causes include
resource exhaustion, network issues, or a manual cordon.
:::

::: details Node Host OOM Kill
A node ran out of memory at the host level and killed processes to reclaim it. Points to
insufficient node memory, a leak, or workloads using more than expected.
:::

::: details Node Memory Free
A node's free memory is low, which risks resource contention or a host-level OOM kill if it keeps
dropping.
:::

::: details Node Memory Pressure
A node is under memory pressure. Left unaddressed, this leads to performance degradation,
resource contention, or OOM kills.
:::

## Volume Alerts

::: details Volume Stats Missing
Statistics for one or more volumes aren't available. Usually a storage-provider connectivity
problem, misconfiguration, or missing permissions.
:::

::: details Volume Usage Critical
A volume has reached 95% usage. At this level, applications relying on it risk running out of
space.
:::

::: details Volume Usage Warning
A volume has passed 90% usage. Plan for cleanup or expansion before it becomes critical.
:::

## Other Alerts

::: details Velero Backups Failed
A Velero backup failed. Usually caused by object-storage connectivity issues, missing
permissions, or resource constraints, jeopardizing your recovery capability.
:::

::: details Velero Backup Partially Failed
Part of a Velero backup succeeded, but some resources failed to back up. Often a transient error,
resource conflict, or data-consistency issue.
:::

::: details Verify Image Cosign
Cosign signature verification failed for a container image. Points to an invalid signature,
missing key, or a compromised image.
:::

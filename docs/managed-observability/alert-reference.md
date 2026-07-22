---
next: false
---

# Alert Reference

::: danger Danger: No Alerting Engine Exists
There is no alerting or threshold-evaluation feature anywhere in the backend today, under any
name — none of the alerts below can actually fire. This page describes planned/roadmap
functionality, not something you'll currently encounter on the platform.
:::

On the following page you find explainations and first possible problem solutions for all alerts, that you plan to support on the Observability Platform.

## ArgoCD Alerts

::: details Argocd Sync Status {#my-anchor}
This error indicates the synchronization status of applications managed by ArgoCD. It signifies whether the desired state declared in the Git repository matches the actual state of the deployed resources in the Kubernetes cluster. A failed sync status may indicate issues with Git repository access, resource conflicts, or other configuration problems.
:::

::: details Argocd Health Status
This error reflects the overall health status of the ArgoCD application. A degraded or failed health status may indicate service disruptions, connectivity issues, or configuration errors within the application.
:::

## Application Alerts

::: details Daemonset Replicas Unavailable
This error signifies that the desired number of replicas specified for a Kubernetes DaemonSet are not available or running within the cluster. DaemonSet replicas may become unavailable due to node failures, resource exhaustion, scheduling constraints, or configuration errors. Ensuring the availability of DaemonSet replicas is crucial for maintaining the desired state of system services across all cluster nodes.
:::

::: details Deployment Replicas Unavailable
This error indicates that the desired number of replicas specified for a Kubernetes Deployment are not available or running within the cluster. Replicas may become unavailable due to issues such as insufficient resources, container failures, or rollout conflicts. Restoring the availability of Deployment replicas is essential for maintaining application availability and reliability.
:::

::: details StatefulSet Replicas Unavailable
This error indicates that the desired number of replicas specified for a Kubernetes StatefulSet are not available or running within the cluster. Replicas may become unavailable due to issues such as node failures, resource constraints, or configuration errors. Ensuring the availability of StatefulSet replicas is critical for maintaining the desired state of stateful applications across all cluster nodes.
:::

::: details Pod CPU Throttling Error
This error occurs when a Kubernetes pod is experiencing CPU throttling, indicating that the pod's CPU consumption is exceeding its allocated limits. As a result, the pod's performance may degrade due to resource constraints, impacting its ability to handle incoming requests efficiently.
:::

::: details Pod Errors
This generic error message suggests that one or more pods within a Kubernetes cluster have encountered issues during execution. These errors could range from configuration errors, resource limitations, network connectivity problems, to application-specific failures. Detailed investigation is required to identify and resolve the specific cause(s) behind each pod's error state.
:::

::: details Pod Memory Failures
This error indicates that a pod in a Kubernetes cluster has experienced memory-related failures during its operation. These failures could include memory allocation errors, out-of-memory (OOM) events, or memory leaks within the pod's containers, potentially leading to service disruptions or crashes.
:::

::: details Pod Memory Limits
This error arises when a pod's memory usage exceeds the defined memory limits set in its Kubernetes configuration. Exceeding memory limits can trigger resource contention, impacting the pod's performance and stability. Proper resource allocation and tuning are necessary to mitigate this issue.
:::

::: details Pod Memory Requests
This error signifies a memory usage by a pod that is higher than the configured requests. Inadequate memory requests may lead to resource starvation, while excessive requests can result in inefficient resource utilization. Balancing memory requirements is essential for optimal pod performance and resource allocation.
:::

::: details Pod OOM Kill
This error occurs when a Kubernetes pod is terminated due to an out-of-memory (OOM) condition. When system memory is exhausted, the Kubernetes cluster may initiate an OOM kill to reclaim resources, terminating the affected pod to prevent further resource contention and potential cluster instability.
:::

::: details Pod Readiness
This error indicates that one or more pods are failing to reach a ready state, preventing them from serving traffic or fulfilling their intended functions within the Kubernetes environment. Common causes include application startup failures, dependencies not being met, or readiness probe failures.
:::

::: details Pod Restarts
This error denotes excessive (more than 5 restarts of a pod in a hour period) pod restarts within a Kubernetes cluster, suggesting potential issues with pod stability or resource utilization. Frequent restarts can disrupt service availability, indicating the need for troubleshooting and remediation to address the underlying causes of instability.
:::

## Ingress Alerts

::: details Ingress Certificate Expiry
This error indicates that the TLS certificate used by an Ingress resource within a Kubernetes cluster is approaching its expiration date. Certificate expiry can lead to service interruptions, security vulnerabilities, or browser warnings for users accessing the associated services.
:::

::: details Ingress 5xx Error Rate
This error reflects the rate at which HTTP 5xx server errors occur for requests handled by an Ingress controller within a Kubernetes cluster. High 5xx error rates may indicate underlying issues with application logic, backend services, or infrastructure components. Monitoring and mitigating elevated error rates are essential for ensuring service reliability and availability.
:::

::: details Ingress Request Count
This error represents an unusual high count of requests received by an Ingress controller within a Kubernetes cluster over a specific period of time.
:::

::: details Ingress Request Latency
This error indicates a high request latency to process requests handled by an Ingress controller within a Kubernetes cluster. High request latency can degrade user experience, impact application performance, and indicate underlying issues with network, backend services, or resource contention. Monitoring and optimizing request latency are crucial for delivering responsive and reliable services.
:::

## Node Alerts

::: details Node CPU Usage
This alert indicates a high utilization of CPU resources on a specific node within a Kubernetes cluster. High CPU usage may indicate resource contention, inefficient resource allocation, or increased demand from running workloads. Monitoring CPU usage helps ensure optimal performance and resource management across the cluster.
:::

::: details Node Load15
This alert reflects a high 15-minute load average on a particular node within a Kubernetes cluster. Load average represents the average number of processes waiting to be executed or running on the system over the specified time frame. Elevated load averages may indicate resource saturation, impending performance degradation, or overloaded nodes.
:::

::: details Node Load5
This alert represents a high 5-minute load average on a specific node within a Kubernetes cluster. Similar to Load15, Load5 measures the system's load over a shorter time frame, providing insights into recent resource utilization trends and potential performance bottlenecks.
:::

::: details Node Disk Usage
This alert indicates the current disk usage on a particular node within a Kubernetes cluster. High disk usage may lead to storage capacity issues, performance degradation, or service disruptions. Monitoring disk usage helps prevent resource exhaustion and ensures sufficient storage capacity for running workloads.
:::

::: details Node Network Throughput In
This alert reflects the incoming network throughput on a specific node within a Kubernetes cluster. Monitoring network throughput helps assess network traffic patterns, identify potential bottlenecks, and ensure sufficient bandwidth for handling incoming data.
:::

::: details Node Network Throughput Out
This alert represents the outgoing network throughput on a particular node within a Kubernetes cluster. Monitoring outbound network throughput is crucial for understanding data transfer rates, optimizing network performance, and ensuring efficient communication between cluster nodes and external systems.
:::

::: details Node Unschedulable
This alert indicates that a node within a Kubernetes cluster has been marked as unschedulable, meaning it cannot receive new pod assignments from the cluster's scheduler. Nodes may become unschedulable due to various reasons such as resource exhaustion, network connectivity issues, or manual administrative actions.
:::

::: details Node Host OOM Kill
This alert signifies that a node within a Kubernetes cluster has experienced an out-of-memory (OOM) event at the host level, resulting in the termination of one or more processes to reclaim memory resources. Host-level OOM kills may indicate insufficient memory capacity, memory leaks, or excessive resource usage by running workloads.
:::

::: details Node Memory Free
This alert indicates a low amount of free memory available on a specific node within a Kubernetes cluster. Monitoring free memory helps assess memory utilization trends, identify potential memory constraints, and ensure optimal resource allocation for running workloads.
:::

::: details Node Memory Pressure
This alert reflects a high level of memory pressure experienced by a specific node within a Kubernetes cluster. Memory pressure occurs when the node's available memory is low, potentially leading to performance degradation, resource contention, or OOM events.
:::

## Volume Alerts

::: details Volume Stats Missing
This error suggests that statistical information about one or more volumes within a Kubernetes cluster is unavailable or not accessible. Missing volume stats could result from issues such as storage provider connectivity problems, misconfigurations, or insufficient permissions. Accurate volume statistics are essential for monitoring storage usage and performance.
:::

::: details Volume Usage Critical
This error indicates that the usage of a volume within a Kubernetes cluster has reached a critical threshold (95% of usage), potentially impacting the availability and performance of applications relying on that volume. Critical volume usage may lead to resource exhaustion, service disruptions, or data loss if not addressed promptly. Monitoring and managing volume usage levels are crucial for maintaining system stability.
:::

::: details Volume Usage Warning
This error signifies that the usage of a volume within a Kubernetes cluster has surpassed a predefined warning threshold (90% of usage), signaling potential resource constraints or impending capacity issues. Excessive volume usage warnings may precede critical conditions, highlighting the need for proactive capacity planning and resource optimization strategies.
:::

## Other Alerts

::: details Velero Backups Failed
This error indicates that Velero backups, which are used for disaster recovery and data migration in Kubernetes clusters, have failed. Backup failures could result from various issues such as connectivity problems with object storage, insufficient permissions, or resource constraints. Failed backups may jeopardize data integrity and recovery capabilities.
:::

::: details Velero Backup Partially Failed
This error suggests that while some aspects of a Velero backup operation have succeeded, there are specific components or resources that failed to be backed up successfully. Partial backup failures may occur due to transient errors, resource conflicts, or data consistency issues within the Kubernetes cluster.
:::

::: details Verify Image Cosign
This error indicates a failure in the verification process of container images using Cosign, a tool for signing and verifying container images. Image verification failures may occur due to issues such as invalid signatures, missing dependencies, or compromised image integrity. Failing to verify container images can pose security risks to the Kubernetes environment.
:::

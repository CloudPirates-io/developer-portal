# Cluster Resource Explorer

Browse and inspect all Kubernetes resources in your cluster through the web portal.

## What You Can See

The Resource Explorer gives you a complete view of your cluster with clear explanations for every component:

- **Infrastructure**: Nodes and their health status
- **Organization**: Namespaces and how your apps are grouped
- **Applications**: Deployments, StatefulSets, and DaemonSets
- **Workloads**: Individual pods and their containers
- **Networking**: Services and how traffic flows
- **Jobs**: Batch processing and scheduled tasks

::: tip Tip: Everything Explained
Every resource shows not just its status, but **what that status means** and **what to do if there's a problem**. No Kubernetes expertise required.
:::

## Understanding Your Resources

### Nodes (Your Servers)

**What they are**: The physical or virtual machines that run your applications.

**What we show you**:

- Health status in plain terms ("Healthy", "Running low on memory", "Disk almost full")
- Resource capacity and usage with clear warnings
- Which applications are running on each node
- Common issues and how to resolve them

**Example explanation**: "Node `worker-1` is healthy but using 85% of its memory. Consider adding more nodes or reducing workload memory requests."

### Namespaces (Organizing Your Apps)

**What they are**: Logical groups for organizing your applications — like folders for your workloads.

**What we show you**:

- All your namespaces and what's running in each
- Resource usage per namespace
- Which team or environment each namespace represents

**Example explanation**: "Namespace `production` contains 15 deployments and is using 45% of your cluster's CPU capacity."

### Deployments (Your Applications)

**What they are**: Your running applications managed by Kubernetes.

**What we show you**:

- How many copies (replicas) are running
- Whether updates are in progress
- If any copies are failing and why
- Configuration that might need adjustment

**Example explanation**: "Deployment `web-app` has 3 healthy replicas. All pods are running and responding to health checks."

### Pods (Individual Instances)

**What they are**: Individual running copies of your application.

**What we show you**:

- Current state explained clearly ("Running", "Crashed and restarting", "Waiting for image download")
- Why a pod might be failing with troubleshooting steps
- Resource usage and whether it's appropriate
- Quick access to logs

**Example explanation**: "Pod `web-app-abc123` crashed due to out-of-memory error. The container is using more memory than its 256Mi limit. Consider increasing the memory limit to 512Mi."

### Services (Network Access)

**What they are**: How traffic reaches your applications.

**What we show you**:

- Which pods receive traffic from this service
- External access points (if any)
- Connection health

**Example explanation**: "Service `web-app` routes traffic to 3 healthy pods on port 8080. Accessible within the cluster at `web-app.production.svc.cluster.local`."

## Accessing Resources

### Via Web Console

1. Navigate to [portal.cloudpirates.io](https://portal.cloudpirates.io)
2. Select your workspace
3. Choose observability instance
4. Select cluster
5. Browse resources by type or namespace

### Via API

#### List Cluster-Scoped Resources

```http
GET /v1/workspaces/{workspaceId}/observability/{observabilityInstanceId}/clusters/{clusterId}/{resourceType}
Authorization: Bearer <access-token>
```

**Resource Types**: `nodes`, `namespaces`, `deployments`, `statefulsets`, `daemonsets`, `jobs`, `cronjobs`, `pods`, `services`

**Query Parameters**:

- `labelSelector`: Filter by labels (e.g., `app=nginx,environment=prod`)

**Examples**:

```bash
# List all nodes
GET /v1/workspaces/{workspaceId}/observability/{observabilityInstanceId}/clusters/{clusterId}/nodes

# List all namespaces
GET /v1/workspaces/{workspaceId}/observability/{observabilityInstanceId}/clusters/{clusterId}/namespaces

# List deployments with label filter
GET /v1/workspaces/{workspaceId}/observability/{observabilityInstanceId}/clusters/{clusterId}/deployments?labelSelector=app=nginx
```

#### Get Specific Resource

```http
GET /v1/workspaces/{workspaceId}/observability/{observabilityInstanceId}/clusters/{clusterId}/{resourceType}/{resourceName}
Authorization: Bearer <access-token>
```

**Example**:

```bash
# Get specific node details
GET /v1/workspaces/{workspaceId}/observability/{observabilityInstanceId}/clusters/{clusterId}/nodes/worker-node-1
```

#### List Namespaced Resources

```http
GET /v1/workspaces/{workspaceId}/observability/{observabilityInstanceId}/clusters/{clusterId}/namespaces/{namespace}/{resourceType}
Authorization: Bearer <access-token>
```

**Resource Types**: `deployments`, `statefulsets`, `daemonsets`, `jobs`, `cronjobs`, `pods`, `services`

**Query Parameters**:

- `labelSelector`: Filter by labels

**Examples**:

```bash
# List pods in namespace
GET /v1/workspaces/{workspaceId}/observability/{observabilityInstanceId}/clusters/{clusterId}/namespaces/production/pods

# List deployments with label filter
GET /v1/workspaces/{workspaceId}/observability/{observabilityInstanceId}/clusters/{clusterId}/namespaces/production/deployments?labelSelector=tier=frontend
```

#### Get Specific Namespaced Resource

```http
GET /v1/workspaces/{workspaceId}/observability/{observabilityInstanceId}/clusters/{clusterId}/namespaces/{namespace}/{resourceType}/{resourceName}
Authorization: Bearer <access-token>
```

**Example**:

```bash
# Get specific deployment
GET /v1/workspaces/{workspaceId}/observability/{observabilityInstanceId}/clusters/{clusterId}/namespaces/production/deployments/web-app

# Get specific pod
GET /v1/workspaces/{workspaceId}/observability/{observabilityInstanceId}/clusters/{clusterId}/namespaces/production/pods/web-app-7d8f9c5b6-xyz123
```

## Resource Information

### Node Details

Each node provides:

- **Capacity**: Total CPU, memory, and storage capacity
- **Allocatable**: Resources available for pods
- **Conditions**: Ready, MemoryPressure, DiskPressure, PIDPressure
- **System Info**: OS, kernel version, container runtime
- **Addresses**: Internal IP, external IP, hostname

### Pod Details

Each pod provides:

- **Status**: Phase (Pending, Running, Succeeded, Failed, Unknown)
- **Conditions**: PodScheduled, Initialized, ContainersReady, Ready
- **Container Status**: Running, waiting, terminated states
- **Restart Count**: Number of container restarts
- **Resource Usage**: Current CPU and memory consumption
- **Events**: Recent events related to the pod

### Deployment Details

Each deployment provides:

- **Replica Status**: Desired, current, available, unavailable replicas
- **Strategy**: RollingUpdate or Recreate
- **Conditions**: Available, Progressing, ReplicaFailure
- **Pod Template**: Container specifications and configurations
- **Rollout History**: Previous replica set revisions

## Label Selectors

Filter resources using Kubernetes label selectors:

**Equality-based**:

```
app=nginx
environment=production
```

**Set-based**:

```
app in (nginx,apache)
environment notin (dev,test)
```

**Combined**:

```
app=nginx,environment=production,tier=frontend
```

## Use Cases

### Monitor Application Health

Track deployment status and pod readiness across namespaces to ensure application availability.

### Resource Planning

Analyze node capacity and resource utilization to plan cluster scaling and optimize resource allocation.

### Troubleshooting

Quickly identify failing pods, check container restart counts, and review resource events to diagnose issues.

### Compliance Auditing

Review running workloads, resource configurations, and namespace organization for compliance verification.

## Related Resources

- [Monitoring & Metrics](./monitoring-metrics.md)
- [Events & Logs](./events-logs.md)
- [Alert Reference](./alert-reference.md)
- [Setup Instructions](./setup-instructions.md)

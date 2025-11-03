# Setup Instructions

Get your cluster connected to CloudPirates Managed Observability in less than 5 minutes. Just one helm chart installation — no complex configuration required.

## What You'll Install

**ClusterPirate** is a lightweight agent that runs in your cluster and securely sends monitoring data to CloudPirates. It:

- Discovers all Kubernetes resources automatically
- Collects metrics, events, and logs
- Validates security and best practices
- Scans container images for vulnerabilities
- Requires minimal resources (10m CPU, 100Mi memory)

::: tip Lightweight & Secure
ClusterPirate only **reads** data from your cluster and sends it securely to CloudPirates. It never modifies your workloads or stores sensitive data.
:::

## Before You Begin

Complete these quick steps in the portal first:

1. **Register**: Sign up at [portal.cloudpirates.io](https://portal.cloudpirates.io)
2. **Create Workspace**: Organize your observability instances
3. **Create Observability Instance**: Set up monitoring for your clusters
4. **Register Cluster**: Add your cluster to get the **access token**

The access token is your cluster's unique identifier — keep it secure.

## Installation

### Quick Start (Recommended)

This is all you need for most clusters:

```bash
# Create namespace
kubectl create namespace clusterpirate-system

# Install ClusterPirate
helm install clusterpirate oci://registry-1.docker.io/cloudpirates/clusterpirate \
  --namespace clusterpirate-system \
  --set auth.accessToken="YOUR_ACCESS_TOKEN_HERE"
```

Replace `YOUR_ACCESS_TOKEN_HERE` with the token from your portal cluster registration.

**That's it!** The agent starts monitoring immediately. Check your portal to see cluster data flowing in.

### Advanced Configuration (Optional)

Need to customize the installation? Create a `values.yaml` file with your preferences:

```yaml
# Required: Access token from portal cluster creation
auth:
  accessToken: "your-access-token-here"

# Optional: ClusterPirate application settings
clusterPirate:
  logLevel: "info"
  healthPort: 3000
  metrics:
    enabled: true
    updateIntervalSeconds: 60
    cache:
      ttl: 86400 # 24 hours
  monitoring:
    resourceEventsEnabled: true
    systemEventsEnabled: true

# Optional: Deployment configuration
deployment:
  image:
    registry: "harbor.cloudpirates.io"
    repository: "koperator-internal/services/clusterpirate"
    tag: "latest"
    pullPolicy: "Always"
  resources:
    requests:
      cpu: "10m"
      memory: "100Mi"
    limits:
      memory: "300Mi"

# Optional: Valkey configuration (caching)
valkey:
  enabled: true
  auth:
    enabled: true
    password: "" # Auto-generated if empty

# Optional: RBAC and ServiceAccount
rbac:
  create: true
serviceAccount:
  create: true
  name: ""
```

Install with values:

```bash
helm install clusterpirate oci://registry-1.docker.io/cloudpirates/clusterpirate \
  --namespace clusterpirate-system \
  --values values.yaml
```

## Configuration

### Required Parameters

| Parameter          | Description                           | Required |
| ------------------ | ------------------------------------- | -------- |
| `auth.accessToken` | Token from cluster creation in portal | ✓        |

### Optional Parameters

| Parameter                                     | Description                          | Default |
| --------------------------------------------- | ------------------------------------ | ------- |
| `clusterPirate.logLevel`                      | Log level (debug, info, warn, error) | `info`  |
| `clusterPirate.healthPort`                    | Health check port                    | `3000`  |
| `clusterPirate.metrics.enabled`               | Enable metrics collection            | `true`  |
| `clusterPirate.metrics.updateIntervalSeconds` | Metrics update interval              | `60`    |
| `deployment.resources.requests.cpu`           | CPU request                          | `10m`   |
| `deployment.resources.requests.memory`        | Memory request                       | `100Mi` |
| `deployment.resources.limits.memory`          | Memory limit                         | `300Mi` |
| `valkey.enabled`                              | Enable Valkey caching                | `true`  |

## Verification

Check installation status:

```bash
# Check pod status
kubectl get pods -n clusterpirate-system

# Check logs
kubectl logs -f deployment/clusterpirate -n clusterpirate-system

# Verify all resources
kubectl get all -n clusterpirate-system
```

Expected output:

```
NAME                               READY   STATUS    RESTARTS   AGE
pod/clusterpirate-xxxxx-xxxxx     1/1     Running   0          1m
pod/clusterpirate-valkey-xxxxx    1/1     Running   0          1m
```

## Management

### Upgrade

```bash
helm upgrade clusterpirate oci://registry-1.docker.io/cloudpirates/clusterpirate \
  --namespace clusterpirate-system \
  --values values.yaml
```

### Uninstall

```bash
helm uninstall clusterpirate --namespace clusterpirate-system
```

## Troubleshooting

### Invalid Access Token

**Symptoms**: `Authentication failed` or `Unauthorized` errors

**Solution**:

- Verify token is correctly copied from portal
- Ensure cluster was created in correct observability instance
- Check token hasn't expired

### Pod Not Starting

**Symptoms**: Pods stuck in `Pending` or `CrashLoopBackOff`

**Solution**:

```bash
# Check pod events
kubectl describe pod -n clusterpirate-system -l app.kubernetes.io/name=clusterpirate

# Check logs
kubectl logs -n clusterpirate-system -l app.kubernetes.io/name=clusterpirate
```

### Network Connectivity

**Symptoms**: Cannot connect to portal services

**Solution**:

- Verify outbound internet access from cluster
- Check if firewall blocks connections to `*.cloudpirates.io`
- Ensure DNS resolution works for `api.cloudpirates.io`

### Getting Help

Contact support with:

- Helm chart version
- Kubernetes version
- Error messages and logs
- Cluster configuration details

## Related Resources

- [Managed Observability Overview](./index.md)
- [Alert Reference](./alert-reference.md)

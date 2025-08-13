# Setup Instructions

On this page you will learn how to setup a new Managed Observability instance using our single chart installation from the clusterpirate helm chart.

## Prerequisites

Before installing the managed observability chart, you need to complete the following setup steps in our portal:

1. **Portal Registration**: Register at [portal.cloudpirates.io](https://portal.cloudpirates.io)
2. **Workspace Creation**: Create a workspace in the portal
3. **Observability Instance**: Create an observability instance within your workspace
4. **Cluster Setup**: Create a cluster in the observability instance to obtain the required accessToken

## Chart Installation

The managed observability solution is now available as a single chart installation from the clusterpirate helm chart. Follow these steps to install the chart in your Kubernetes cluster.

### Installation Steps

1. **Create Namespace**:
   ```bash
   kubectl create namespace clusterpirate-system
   ```

2. **Install the Chart from OCI Registry**:
   ```bash
   helm install clusterpirate oci://registry-1.docker.io/cloudpirates/clusterpirate \
     --namespace clusterpirate-system \
     --set auth.accessToken="YOUR_ACCESS_TOKEN_HERE"
   ```

3. **Install with Custom Values** (recommended):
   ```bash
   helm install clusterpirate oci://registry-1.docker.io/cloudpirates/clusterpirate \
     --namespace clusterpirate-system \
     --values values.yaml
   ```

4. **Alternative: Install from Local Chart** (for development):
   ```bash
   helm install clusterpirate ./charts/clusterpirate \
     --namespace clusterpirate-system \
     --set auth.accessToken="YOUR_ACCESS_TOKEN_HERE"
   ```

### Required Configuration

The following parameters are required for the chart installation:

| Parameter | Description | Required |
|-----------|-------------|----------|
| `auth.accessToken` | Token obtained from cluster creation in portal | ✓ |

### Example values.yaml

Create a `values.yaml` file with your configuration:

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
      ttl: 86400  # 24 hours
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
  extraEnvVars: []

# Optional: Valkey configuration (caching)
valkey:
  enabled: true
  auth:
    enabled: true
    password: ""  # Auto-generated if empty

# Optional: RBAC and ServiceAccount
rbac:
  create: true
serviceAccount:
  create: true
  name: ""

# Optional: Common labels and annotations
commonLabels: {}
commonAnnotations: {}
```

### Verification

After installation, verify that the chart is deployed successfully:

```bash
# Check the deployment status
kubectl get pods -n clusterpirate-system

# Check the logs
kubectl logs -f deployment/clusterpirate -n clusterpirate-system

# Verify all resources are created
kubectl get all -n clusterpirate-system
```

### Upgrade

To upgrade the chart to a newer version:

```bash
helm upgrade clusterpirate oci://registry-1.docker.io/cloudpirates/clusterpirate \
  --namespace clusterpirate-system \
  --values values.yaml
```

### Uninstall

To remove the chart:

```bash
helm uninstall clusterpirate --namespace clusterpirate-system
```

## Troubleshooting

### Common Issues

#### 1. Invalid Access Token
**Error**: `Authentication failed` or `Unauthorized`
**Solution**: 
- Verify the accessToken is correctly copied from the portal
- Ensure the cluster was created in the correct observability instance
- Check that the token hasn't expired

#### 2. Chart Not Found
**Error**: `Error: failed to download chart from OCI registry`
**Solution**: Ensure you have access to the OCI registry and correct chart name:
```bash
# Verify you can access the registry
helm pull oci://registry-1.docker.io/cloudpirates/clusterpirate --version latest
```

#### 3. Namespace Issues
**Error**: `Error: create: failed to create: namespaces "clusterpirate-system" is forbidden`
**Solution**: Ensure you have sufficient RBAC permissions to create namespaces, or create the namespace manually:
```bash
kubectl create namespace clusterpirate-system
```

#### 4. Pod Startup Issues
**Error**: Pods stuck in `Pending` or `CrashLoopBackOff` state
**Solution**: 
```bash
# Check pod events
kubectl describe pod -n clusterpirate-system -l app.kubernetes.io/name=clusterpirate
```

#### 5. Network Connectivity
**Error**: Cannot connect to portal services
**Solution**: 
- Verify outbound internet access from your cluster
- Check if corporate firewall blocks connections to `*.cloudpirates.io`
- Ensure DNS resolution works for `api.cloudpirates.io`

### Getting Help

If you encounter issues not covered here:
1. Check the pod logs: `kubectl logs -n clusterpirate-system -l app.kubernetes.io/name=clusterpirate`
2. Contact support with the following information:
   - Helm chart version
   - Kubernetes version
   - Error messages and logs
   - Cluster configuration details


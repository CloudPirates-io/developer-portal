---
prev: false
---

# Managed Observability

Understand your Kubernetes clusters with observability and insights. CloudPirates Managed Observability provides essential cluster visibility through a single lightweight agent.

## What is Managed Observability?

CloudPirates Managed Observability is an **observability solution** that provides quick insights into your Kubernetes clusters without extensive setup. It's designed to complement your observability strategy or serve as a standalone solution for teams that need essential visibility without the overhead of managing infrastructure.

### Two Approaches to Observability

**Managed Observability** (This service):

- Single helm chart installation (ClusterPirate agent)
- Essential cluster insights through web portal
- Automated security and best practice checks
- Perfect for quick visibility and troubleshooting
- No infrastructure to maintain
- **Unique features**: CVE scanning, Kubernetes event monitoring, AI-assisted insights, automated resource recommendations

**Full Observability Stack** (Available separately):

- Complete observability platform with Grafana, Prometheus, Loki, Tempo, and Alloy
- Advanced metrics, custom dashboards, and alerting rules
- Powerful query capabilities and long-term metric storage
- Available as fully managed (hosted by CloudPirates) or managed in-house (in your cluster)
- Designed for comprehensive observability needs

::: tip Tip: Choose What Fits Your Needs
Use Managed Observability for essential visibility with intelligent insights, or opt for our full observability stack when you need advanced capabilities, custom metrics, and deep instrumentation. Both options are fully supported by CloudPirates.
:::

## Why Choose Managed Observability?

### 1. Quick to Deploy

Get essential cluster visibility in minutes:

- Single helm chart installation (ClusterPirate agent)
- Automatic resource discovery
- Immediate access to cluster insights through the web portal
- Minimal resource footprint (10m CPU, 100Mi memory)

### 2. Essential Cluster Insights

Focus on what matters for day-to-day operations:

- Resource health and status
- Security and best practice validation
- Container vulnerability scanning
- Event tracking and troubleshooting guidance
- Contextual information for common issues

### 3. Zero Infrastructure Management

Let CloudPirates handle the backend:

- No servers or databases to maintain
- Automatic updates and scaling
- Secure data transmission and storage
- Professional support included

### 4. Intelligent Features Built-In

Managed Observability includes capabilities not available in traditional observability stacks:

**Container Vulnerability Scanning**:

- Daily automated CVE scans with Trivy
- Clear severity classifications and remediation guidance
- Track security posture over time

**Kubernetes Event Monitoring**:

- Contextual event tracking with explanations
- Troubleshooting guidance for common issues
- Real-time event correlation (not possible in native observability stacks)

**AI-Assisted Insights** _(planned)_:

- Intelligent analysis of cluster health
- Automated pattern recognition
- Proactive issue detection

**Resource Recommendations** _(planned)_:

- Automated best practice validation — real today, see [Best Practices](./best-practices.md)
- Right-sizing suggestions based on actual usage — not yet implemented
- Cost optimization opportunities — not yet implemented

### 5. Flexible Observability Options

Choose the right level of observability for your needs:

- **Start Simple**: Begin with Managed Observability for essential visibility with intelligent features
- **Scale Up**: Add our full observability stack when you need advanced capabilities
- **Combine Both**: Use Managed Observability alongside the full stack for complementary insights

## How It Works

### Simple 5-Minute Setup

1. **Register a Cluster**: Register at [portal.cloudpirates.io](https://portal.cloudpirates.io) and create a cluster in your workspace to receive an access token
2. **Install Agent**: Deploy ClusterPirate helm chart with your access token
3. **Start Monitoring**: Access all insights through the web console

[View Setup Instructions →](./setup-instructions.md)

### What Gets Observed

The ClusterPirate agent automatically discovers and observes:

- **All Kubernetes Resources**: Nodes, namespaces, deployments, pods, services, ingresses
- **Performance Metrics**: CPU and memory usage (disk and network usage are not collected)
- **Application Health**: Container status, restart counts, probe failures
- **Security Posture**: Policy violations, CVE vulnerabilities
- **Events**: Real-time access to Kubernetes events (there is no container log-streaming feature)

## Platform Features

### Cluster Resource Explorer

**Browse and inspect all Kubernetes resources in your cluster.**

View all cluster components with clear status information and troubleshooting guidance. Access everything through the web portal.

- Infrastructure (nodes) and organization (namespaces)
- Applications (Deployments, StatefulSets, DaemonSets)
- Individual pods and containers
- Services and networking

[Learn more →](./kubernetes-resources.md)

### Performance Insights

**Observe resource usage with context and recommendations.**

Track CPU and memory metrics per node and pod.

- Resource utilization (CPU/memory only — no disk or network metrics)

[Learn more →](./monitoring-metrics.md)

### Events & Troubleshooting

**Access Kubernetes events and container logs with context.**

Observe cluster events in real-time with clear descriptions and troubleshooting guidance for common issues.

- Normal events (confirmations)
- Warning events (potential issues with guidance)

[Learn more →](./events-logs.md)

### Security & Best Practices

**Automated validation against industry security standards.**

Every workload is checked against best practices with clear descriptions of issues, their impact, and remediation steps.

- Pod Security Standards (Baseline & Restricted)
- Resource configuration validation
- Security context checks
- Certificate and image management

[Learn more →](./best-practices.md)

### Container Vulnerability Scanning

**Daily automated scanning of container images for security vulnerabilities.**

Scan all images with Trivy to identify CVEs, with severity ratings and recommendations for updating to secure versions.

- Daily automated scanning
- Clear severity classifications
- Affected images and deployment locations
- Update recommendations

[Learn more →](./cve-scans.md)

### Smart Alerting _(planned)_

**Only get notified when you need to take action.**

::: danger Danger: No Alerting Engine Exists Yet
There is no alerting/threshold-evaluation feature in the backend today, under any name. Everything
in this section, and the linked reference page, describes planned functionality.
:::

Alerts are carefully designed to avoid noise. Each alert includes context, impact explanation, and recommended actions.

- Critical issues that need immediate attention
- Resource exhaustion warnings
- Certificate expiration notices
- Deployment health

[Learn more →](./alert-reference.md)

## Who is this for?

### Perfect for Small to Medium Teams

You don't need a dedicated platform engineering team to run Kubernetes effectively. Managed Observability is designed for:

- **Development Teams** who want to understand their production deployments without learning complex observability tools
- **Startups** that need observability but can't afford the overhead of maintaining Prometheus/Grafana stacks
- **Platform Teams** looking to reduce operational complexity and maintenance burden
- **Anyone** who wants clear, actionable insights instead of overwhelming metrics

### Ideal Use Cases

**✅ Perfect For:**

- Quick cluster visibility and essential observability
- Security and best practice validation
- Development and staging environments
- Getting started with Kubernetes observability
- Teams that need basic visibility without managing infrastructure

**🔄 Works Well With:**

- Our full observability stack for comprehensive observability
- Existing observability tools for additional perspectives
- CI/CD pipelines for deployment validation

**💡 Need More?**
If you need custom metrics, advanced dashboards, or detailed application instrumentation, consider our **full observability stack** with Grafana, Prometheus, Loki, Tempo, and Alloy — available as fully managed or deployed in your infrastructure.

## Getting Started

Ready to try Managed Observability? [View Setup Instructions →](./setup-instructions.md)

The installation takes less than 5 minutes and requires only a single helm command.

## API Reference

There is no separate "observability instance" resource to create — a cluster registered through
the Cluster API below is what you observe. Once it exists, browse it through the flat
`/v1/workspaces/{workspaceId}/observability/{clusterId}/...` routes documented in
[Kubernetes Resources](./kubernetes-resources.md) and [Events & Logs](./events-logs.md).

### List Clusters

```http
GET /v1/workspaces/{workspaceId}/clusters
Authorization: Bearer <access-token>
```

Response is a bare array of `{clusterId, workspaceId, clusterName, clusterType, serverInfo}` — no
`accessToken` (only the single-cluster `GET` below includes it).

### Create Cluster (Register)

Only `clusterType: "EXTERNAL"` is supported — `MANAGED` always fails with `501 Not Implemented`.

```http
POST /v1/workspaces/{workspaceId}/clusters
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "clusterName": "Production Cluster",
  "clusterType": "EXTERNAL"
}
```

The response includes the `accessToken` you use to install the ClusterPirate agent.

### Get Cluster

```http
GET /v1/workspaces/{workspaceId}/clusters/{clusterId}
Authorization: Bearer <access-token>
```

### Update Cluster Name

```http
PUT /v1/workspaces/{workspaceId}/clusters/{clusterId}/name
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "clusterName": "Updated Cluster Name"
}
```

### Rotate Cluster Access Token

```http
POST /v1/workspaces/{workspaceId}/clusters/{clusterId}/actions/rotate-access-token
Authorization: Bearer <access-token>
```

### Delete Cluster

```http
DELETE /v1/workspaces/{workspaceId}/clusters/{clusterId}
Authorization: Bearer <access-token>
```

## Related Resources

- [Setup Instructions](./setup-instructions.md)
- [Kubernetes Resources](./kubernetes-resources.md)
- [Monitoring & Metrics](./monitoring-metrics.md)
- [Events & Logs](./events-logs.md)
- [Best Practices](./best-practices.md)
- [CVE Scans](./cve-scans.md)
- [Alert Reference](./alert-reference.md)
- [Workspaces](/workspaces/)

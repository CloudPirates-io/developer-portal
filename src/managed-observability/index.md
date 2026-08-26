---
prev: false
---

# Managed Observability

See what's happening inside your Kubernetes clusters without running your own observability
stack. CloudPirates Managed Observability gives you cluster visibility through a single
lightweight agent.

## What Is Managed Observability?

CloudPirates Managed Observability gives you quick insight into your Kubernetes clusters without
setting up Prometheus, Grafana, or any other stack yourself. Run it standalone, or alongside a
full observability stack if you already have one.

### Two Approaches to Observability

**Managed Observability** (this service):

- Single helm chart installation (ClusterPirate agent)
- Cluster insights through the web portal
- Automated security and best practice checks
- No infrastructure to maintain
- **Unique features**: Kubernetes event monitoring, CVE scanning, AI-assisted insights, and
  automated resource recommendations

**Full Observability Stack** (available separately):

- Complete observability platform with Grafana, Prometheus, Loki, Tempo, and Alloy
- Advanced metrics, custom dashboards, and alerting rules
- Powerful query capabilities and long-term metric storage
- Available as fully managed (hosted by CloudPirates) or managed in-house (in your cluster)

::: tip Choose What Fits Your Needs
Use Managed Observability for quick visibility with minimal setup, or the full observability
stack when you need custom metrics and deep instrumentation. Both are supported by CloudPirates.
:::

## Why Choose Managed Observability?

### 1. Quick to Deploy

Get cluster visibility running in minutes:

- Single helm chart installation (ClusterPirate agent)
- Automatic resource discovery
- Immediate access to cluster insights through the web portal
- Minimal resource footprint (10m CPU, 100Mi memory)

### 2. Insights That Matter Day to Day

- Resource health and status
- Security and best practice validation
- Event tracking and troubleshooting guidance
- Contextual information for common issues

### 3. Zero Infrastructure Management

Let CloudPirates handle the backend:

- No servers or databases to maintain
- Automatic updates and scaling
- Secure data transmission and storage
- Professional support included

### 4. Built-In Security and Event Tracking

**Kubernetes Event Monitoring**: contextual event tracking with plain-language explanations and
troubleshooting guidance for common issues.

**Best Practice Validation**: every workload is checked against Pod Security Standards, resource
configuration, and certificate management rules, see [Best Practices](./best-practices.md).

- **Container Vulnerability Scanning**: daily CVE scans of your images with Trivy
- **AI-Assisted Insights**: automated analysis of cluster health and pattern recognition
- **Resource Recommendations**: right-sizing and cost-optimization suggestions based on actual
  usage

### 5. Flexible Observability Options

Choose the right level of observability for your needs:

- **Start Simple**: Begin with Managed Observability for quick visibility with minimal setup
- **Scale Up**: Add our full observability stack when you need advanced capabilities
- **Combine Both**: Use Managed Observability alongside the full stack for complementary insights

## Who Is This For?

### Built for Small to Medium Teams

You don't need a dedicated platform engineering team to run Kubernetes effectively.
Managed Observability is designed for:

- **Development Teams** who want to understand their production deployments without learning
  complex observability tools
- **Startups** that need observability without maintaining a Prometheus/Grafana stack themselves
- **Platform Teams** looking to reduce operational complexity and maintenance burden
- **Anyone** who wants clear, actionable insights instead of overwhelming metrics

### Ideal Use Cases

**Good Fit For:**

- Quick cluster visibility with minimal setup
- Security and best practice validation
- Development and staging environments
- Getting started with Kubernetes observability
- Teams that need basic visibility without managing infrastructure

**Works Well With:**

- Our full observability stack, for custom metrics and deep instrumentation
- Existing observability tools, for additional perspectives
- CI/CD pipelines, for deployment validation

**Need More?**
See [full observability stack](#two-approaches-to-observability) above for custom metrics,
advanced dashboards, and detailed application instrumentation.

## How It Works

### Simple 5-Minute Setup

1. **Register a Cluster**: Register at [portal.cloudpirates.io](https://portal.cloudpirates.io)
   and create a cluster in your workspace to receive an access token
2. **Install Agent**: Deploy ClusterPirate helm chart with your access token
3. **Start Monitoring**: Access all insights through the web console

[View Setup Instructions →](./setup-instructions.md)

### What Gets Observed

The ClusterPirate agent automatically discovers and observes:

- **All Kubernetes Resources**: Nodes, namespaces, deployments, pods, services, ingresses
- **Performance Metrics**: CPU, memory, disk, and network usage
- **Application Health**: Container status, restart counts, probe failures
- **Security Posture**: Policy violations, CVE vulnerabilities
- **Events**: Real-time access to Kubernetes events

## Platform Features

### Cluster Resource Explorer

**Browse and inspect all Kubernetes resources in your cluster.**

View all cluster components with clear status information and troubleshooting guidance. Access
everything through the web portal.

- Infrastructure (nodes) and organization (namespaces)
- Applications (Deployments, StatefulSets, DaemonSets)
- Individual pods and containers
- Services and networking

[Learn more →](./kubernetes-resources.md)

### Performance Insights

**Track CPU and memory usage per node and pod.**

- Resource utilization (CPU/memory only, no disk or network metrics)

[Learn more →](./monitoring-metrics.md)

### Events & Troubleshooting

**Access Kubernetes events with context.**

Observe cluster events in real-time with clear descriptions
and troubleshooting guidance for common issues.

- Normal events (confirmations)
- Warning events (potential issues with guidance)

[Learn more →](./events-logs.md)

### Security & Best Practices

**Automated validation against industry security standards.**

Every workload is checked against best practices with clear descriptions of issues,
their impact, and remediation steps.

- Pod Security Standards (Baseline & Restricted)
- Resource configuration validation
- Security context checks
- Certificate and image management

[Learn more →](./best-practices.md)

### Container Vulnerability Scanning

**Daily automated scanning of container images for security vulnerabilities.**

Scan all images with Trivy to identify CVEs, with severity ratings and recommendations for
updating to secure versions.

- Daily automated scanning
- Clear severity classifications
- Affected images and deployment locations
- Update recommendations

[Learn more →](./cve-scans.md)

### Smart Alerting

**Only get notified when you need to take action.**

Alerts are carefully designed to avoid noise. Each alert includes context, impact explanation,
and recommended actions.

- Critical issues that need immediate attention
- Resource exhaustion warnings
- Certificate expiration notices
- Deployment health

[Learn more →](./alert-reference.md)

## API Reference

::: warning Only EXTERNAL Clusters Are Supported
Creating a cluster with `clusterType: "MANAGED"` always fails with `501 Not Implemented`. Register
with `clusterType: "EXTERNAL"` instead; the response includes the `accessToken` you use to
install the ClusterPirate agent.
:::

See the [Cluster API Reference](https://api.cloudpirates.dev/docs/#/Cluster) for the
list/create/get/rename/rotate-token/delete endpoints.

## Related Resources

- [Setup Instructions](./setup-instructions.md)
- [Kubernetes Resources](./kubernetes-resources.md)
- [Monitoring & Metrics](./monitoring-metrics.md)
- [Events & Logs](./events-logs.md)
- [Best Practices](./best-practices.md)
- [CVE Scans](./cve-scans.md)
- [Alert Reference](./alert-reference.md)
- [Workspaces](/workspaces/)

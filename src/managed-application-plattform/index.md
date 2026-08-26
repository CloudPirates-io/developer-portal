---
prev: false
---

::: warning Private Beta Access Only
The Managed Application Platform is currently in private beta.
Contact us at [hello@cloudpirates.io](mailto:hello@cloudpirates.io) to request access.
:::

<br>

# Managed Application Platform

CloudPirates Managed Application Platform deploys and maintains applications in your Kubernetes
clusters using GitOps: you pick a template, we commit the resulting ArgoCD Application to your Git
repository, and ArgoCD syncs it to your cluster. Every change lives in Git, so you can cancel the
platform at any time and keep managing your installed applications yourself.

## Deployment Options

Choose what fits your infrastructure and workflow:

| Component              | CloudPirates Managed                                         | Bring Your Own                                                   |
| ---------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------- |
| **Git Repository**     | We provide and host a GitOps repository for you              | Connect your existing Git repository (GitHub, GitLab, Bitbucket) |
| **ArgoCD**             | Use our managed ArgoCD installation                          | Connect your existing ArgoCD instance                            |
| **Kubernetes Cluster** | Deploy to our managed Kubernetes clusters (Germany, US East) | Deploy to your own infrastructure                                |

**Mix and Match**: combine options, for example our managed ArgoCD with your own Git repository
and Kubernetes cluster.

[Learn more about deployment options →](./deployment-options.md)

## Key Features

### GitOps-First Architecture

- All application configurations stored in your Git repository
- Complete transparency of all changes
- Cancel the platform anytime without losing your applications
- Standard ArgoCD Applications, no vendor lock-in

[Learn more about GitOps setup →](./gitops-setup.md)

### Curated Application Templates

- Based on CloudPirates open source Helm charts
- Pre-configured with production best practices
- Recommended configurations (single, small, medium, large, HA)
- Example: MariaDB with optimized configs for different use cases

[Browse application templates →](./templates.md)

### Secure Secret Management

- SealedSecrets integration with automatic key pair generation
- Secrets stored encrypted in Git
- Never store plaintext secrets

[Learn more about GitOps setup →](./gitops-setup.md)

### Flexible Update Management

Three update channels with automatic update support:

- **CloudPirates Stable**: released ~2 weeks after upstream with extensive testing and automatic
  Helm value migrations
- **Stable**: latest stable release rolled out instantly from upstream
- **Latest**: latest available version, including pre-releases and breaking changes

[Learn more about updates →](./update-management.md)

## How It Works

### Simple Workflow

```
Portal Action → Git Commit → ArgoCD Sync → Kubernetes Deployment
```

1. **Connect Repository**: add your Git repository or use our provided one
2. **Choose Applications**: select from our curated application templates
3. **Configure Settings**: pick a recommended configuration or customize
4. **Deploy**: we create ArgoCD Applications in your repository
5. **Manage**: update, configure, and monitor through the portal

**What Gets Created**:

- ArgoCD Application manifests
- Application values and configuration
- SealedSecret resources for sensitive data
- All committed to your Git repository

## Why Choose Managed Application Platform?

**Perfect For**:

- GitOps adoption without extensive setup
- Application standardization with vetted configurations
- Multi-cluster application management
- Rapid deployment of common applications
- Compliance requirements with a full audit trail

**No Vendor Lock-In**:

- All configurations in standard ArgoCD format
- Standard Helm charts and Kubernetes manifests
- Cancel your platform subscription anytime
- Continue managing applications yourself

## Pricing

- **Using Your Infrastructure**: platform subscription only, bring your own Kubernetes, Git,
  and/or ArgoCD
- **Using CloudPirates Managed Kubernetes**: pay-as-you-go based on memory usage (per GB of
  container memory requests)

**Example (Managed Kubernetes)**: MariaDB with 2Gi memory + PostgreSQL with 4Gi memory = 6 GB
billed monthly

[Learn more about deployment options and pricing →](./deployment-options.md)

## Getting Started

Ready to deploy applications? [Contact us](mailto:developer@cloudpirates.io) to get beta access.

## API Reference

For listing, retrieving, and deleting applications, see the
[Application API reference](https://api.cloudpirates.io/docs/#/Application).

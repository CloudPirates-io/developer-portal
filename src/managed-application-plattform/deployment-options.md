::: warning Private Beta Access Only
The Managed Application Platform is currently in private beta.
Contact us at [hello@cloudpirates.io](mailto:hello@cloudpirates.io) to request access.
:::

<br>

# Deployment Options

Choose where to deploy your applications: use CloudPirates-hosted infrastructure, bring your own,
or mix the two.

## Options Overview

| Component          | CloudPirates Managed | Bring Your Own       | Mix & Match |
| ------------------ | -------------------- | -------------------- | ----------- |
| **Git Repository** | Hosted by us         | Your Git provider    | Yes         |
| **ArgoCD**         | Managed installation | Your ArgoCD instance | Yes         |
| **Kubernetes**     | Our managed clusters | Your infrastructure  | Yes         |

**Flexibility**: combine any options, for example our managed ArgoCD with your own Git repository
and Kubernetes cluster.

## Kubernetes Cluster Options

### Your Own Kubernetes Clusters

Deploy applications to your existing infrastructure.

**Supported Environments**:

- On-premises data centers
- Public cloud (AWS EKS, GCP GKE, Azure AKS)
- Private cloud
- Edge computing environments

**Requirements**:

- Kubernetes 1.30 or newer
- Network connectivity for ArgoCD
- SealedSecrets controller (we can install if needed)

### CloudPirates Managed Kubernetes

Fully managed Kubernetes clusters in your preferred region.

**Available Regions**:

- **Germany (EU)**: SysEleven (OpenStack) or Azure Germany, GDPR compliant
- **America East (US)**: Azure US East
- **Custom Regions**: [contact us](mailto:developer@cloudpirates.io) for other regions (AWS, GCP,
  Azure)

### Shared vs. Dedicated Clusters

**Shared Clusters** (Managed Kubernetes):

- Cost-effective
- Multiple workspaces share infrastructure
- Namespace isolation
- Resource quotas per workspace
- Best for: development, testing, small production workloads

**Dedicated Clusters** (Your Own or Custom):

- Full cluster dedicated to you
- Complete isolation
- Custom configurations
- Best for: production, compliance-sensitive workloads

## Comparison Matrix

### Feature Comparison

| Feature           | Your Kubernetes        | CloudPirates Managed      |
| ----------------- | ---------------------- | ------------------------- |
| **Cost**          | You pay cloud provider | Included in subscription  |
| **Control**       | Full control           | Shared management         |
| **Maintenance**   | You handle             | We handle                 |
| **Compliance**    | Your responsibility    | GDPR compliant (EU)       |
| **Scalability**   | You configure          | Auto-scaling included     |
| **Support**       | Your team              | 24/7 CloudPirates support |
| **Data Location** | Your choice            | Germany or US East        |
| **Customization** | Unlimited              | Standard configurations   |

### Git Repository Comparison

| Feature         | Managed Repository      | Your Repository      |
| --------------- | ----------------------- | -------------------- |
| **Cost**        | Included                | Your Git provider    |
| **Setup**       | Automatic               | Manual configuration |
| **Control**     | Managed by CloudPirates | Full control         |
| **Access**      | Workspace permissions   | Your access control  |
| **Backup**      | Included                | Your responsibility  |
| **Integration** | Built-in                | Manual setup         |
| **Audit**       | CloudPirates logs       | Your Git logs        |

### ArgoCD Comparison

| Feature           | Managed ArgoCD  | Your ArgoCD          |
| ----------------- | --------------- | -------------------- |
| **Cost**          | Included        | Your infrastructure  |
| **Setup**         | Automatic       | Manual configuration |
| **Updates**       | Automatic       | You handle           |
| **Support**       | CloudPirates    | Your team            |
| **Customization** | Standard config | Unlimited            |
| **HA**            | Included        | You configure        |
| **Monitoring**    | Included        | You handle           |

## Recommended Configurations

**Startups & Small Teams**: fully managed (Git + ArgoCD + Kubernetes) for the fewest setup steps.

**Growing Companies**: mix managed and self-hosted, use your own Git repository with our managed
ArgoCD and Kubernetes.

**Enterprises**: bring your own infrastructure for full control, use CloudPirates for application
template management and monitoring.

## Migration & Flexibility

**No Lock-In**: all configurations use standard ArgoCD/Helm formats. You can:

- Start fully managed and migrate to self-hosted later
- Start self-hosted and add managed components over time
- Mix and match components as your needs change

## Pricing

**Your Infrastructure**: platform subscription only, you manage your own Kubernetes, Git, and/or
ArgoCD costs.

**CloudPirates Managed Kubernetes**: pay-as-you-go based on memory usage (per GB of container
memory requests).

- Example: MariaDB (2Gi) + PostgreSQL (4Gi) = 6 GB billed monthly
- Includes: GitOps repository, ArgoCD, monitoring, 24/7 support, backups

## Getting Started

### Setup Process

1. **Choose Your Options**: decide on Git, ArgoCD, and Kubernetes
2. **Configure in Portal**: set up connections and credentials
3. **Deploy First Application**: test with a simple application
4. **Monitor and Adjust**: refine based on your needs

### Need Help Deciding?

[Contact our team](mailto:hello@cloudpirates.io) for help choosing the right options.

## Related Resources

- [GitOps Setup](./gitops-setup.md)
- [Application Templates](./templates.md)
- [Update Management](./update-management.md)
- [Managed Application Platform Overview](./index.md)

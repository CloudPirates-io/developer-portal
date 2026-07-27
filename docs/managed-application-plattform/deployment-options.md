::: warning Warning: Private Beta Access Only
The Managed Application Platform is currently in private beta. Contact us at [hello@cloudpirates.io](mailto:hello@cloudpirates.io) to request access.
:::

::: danger Danger: Most of This Page Describes Planned, Not Current, Capabilities
Deploying an application at all currently always fails with a `501 Not Implemented` (see
[Managed Application Platform](./index.md)). Beyond that, the cluster this points at only carries
`clusterId`, `workspaceId`, `clusterName`, `clusterType` (`EXTERNAL`/`MANAGED`), a cluster-class
string, and an access token — there is no region, shared-vs-dedicated flag, or cloud-provider
metadata anywhere in the backend. Deploying to a `MANAGED` cluster is separately rejected with a
`501` at the cluster level. "Bring Your Own Git"/"Bring Your Own ArgoCD" also have no backend
support today: the GitOps integration is hardcoded to a single global GitLab project and a single
global, **read-only** ArgoCD client — there is no way to connect a customer-supplied Git provider
or ArgoCD instance. Treat everything below as the intended end state, not the current behavior.
:::

<br>

# Deployment Options

Choose where to deploy your applications and how to manage your infrastructure. CloudPirates offers flexible options to match your requirements.

## Options Overview

| Component          | CloudPirates Managed    | Bring Your Own          | Mix & Match |
| ------------------ | ----------------------- | ----------------------- | ----------- |
| **Git Repository** | ✅ Hosted by us         | ✅ Your Git provider    | ✅ Yes      |
| **ArgoCD**         | ✅ Managed installation | ✅ Your ArgoCD instance | ✅ Yes      |
| **Kubernetes**     | ✅ Our managed clusters | ✅ Your infrastructure  | ✅ Yes      |

**Flexibility**: You can combine any options. For example, use our managed ArgoCD with your own Git repository and Kubernetes cluster.

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

- **Germany (EU)**: SysEleven (OpenStack) or Azure Germany — GDPR compliant
- **America East (US)**: Azure US East
- **Custom Regions**: [Contact us](mailto:developer@cloudpirates.io) for other regions (AWS, GCP, Azure)

### Shared vs. Dedicated Clusters

**Shared Clusters** (Managed Kubernetes):

- Cost-effective
- Multiple workspaces share infrastructure
- Namespace isolation
- Resource quotas per workspace
- Best for: Development, testing, small production workloads

**Dedicated Clusters** (Your Own or Custom):

- Full cluster dedicated to you
- Complete isolation
- Custom configurations
- Best for: Production, compliance-sensitive workloads

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

**Startups & Small Teams**: Fully managed (Git + ArgoCD + Kubernetes) for fastest time to value

**Growing Companies**: Mix of managed and self-hosted — use your Git repository with our managed ArgoCD and Kubernetes

**Enterprises**: Bring your own infrastructure for full control, use CloudPirates for application template management and unified oversight

## Migration & Flexibility

**No Lock-In**: All configurations use standard ArgoCD/Helm formats. You can:

- Start fully managed and migrate to self-hosted later
- Start self-hosted and add managed components over time
- Mix and match components as your needs change

## Pricing

**Your Infrastructure**: Platform subscription only — you manage your own Kubernetes, Git, and/or ArgoCD costs

**CloudPirates Managed Kubernetes**: Pay-as-you-go based on memory usage (per GB of container memory requests)

- Example: MariaDB (2Gi) + PostgreSQL (4Gi) = 6 GB billed monthly
- Includes: GitOps repository, ArgoCD, monitoring, 24/7 support, backups

## Getting Started

### Setup Process

1. **Choose Your Options**: Decide on Git, ArgoCD, and Kubernetes
2. **Configure in Portal**: Set up connections and credentials
3. **Deploy First Application**: Test with a simple application
4. **Monitor and Adjust**: Refine based on your needs

### Need Help Deciding?

[Contact our team](mailto:hello@cloudpirates.io) for a consultation. We'll help you choose the best options for your requirements.

## Related Resources

- [GitOps Setup](./gitops-setup.md)
- [Application Templates](./templates.md)
- [Update Management](./update-management.md)
- [Managed Application Platform Overview](./index.md)

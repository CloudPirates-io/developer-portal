---
prev: false
---

::: warning Warning: Private Beta Access Only
The Managed Application Platform is currently in private beta. Contact us at [hello@cloudpirates.io](mailto:hello@cloudpirates.io) to request access.
:::

<br>

# Managed Application Platform

Deploy and manage applications in your Kubernetes clusters with GitOps best practices. CloudPirates Managed Application Platform provides template-based application deployment with full control and transparency.

## What is the Managed Application Platform?

CloudPirates Managed Application Platform is a **GitOps-based application management solution** that helps you deploy and maintain applications in your Kubernetes clusters. Unlike traditional managed platforms, all operations are performed directly in your GitOps repository — you maintain full ownership and can cancel the platform at any time while keeping all installed applications.

## Deployment Options

Choose what fits your infrastructure and workflow:

| Component              | CloudPirates Managed                                         | Bring Your Own                                                   |
| ---------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------- |
| **Git Repository**     | We provide and host a GitOps repository for you              | Connect your existing Git repository (GitHub, GitLab, Bitbucket) |
| **ArgoCD**             | Use our managed ArgoCD installation                          | Connect your existing ArgoCD instance                            |
| **Kubernetes Cluster** | Deploy to our managed Kubernetes clusters (Germany, US East) | Deploy to your own infrastructure                                |

**Mix and Match**: You can combine options — for example, use our managed ArgoCD with your own Git repository and Kubernetes cluster.

[Learn more about deployment options →](./deployment-options.md)

## Key Features

### GitOps-First Architecture

- All application configurations stored in your Git repository
- Complete transparency of all changes
- Cancel the platform anytime without losing your applications
- Standard ArgoCD Applications — no vendor lock-in

[Learn more about GitOps setup →](./gitops-setup.md)

### Curated Application Templates

- Based on CloudPirates open source helm charts
- Pre-configured with production best practices
- Recommended configurations (single, small, medium, large, HA)
- Example: MariaDB with optimized configs for different use cases

[Browse application templates →](./templates.md)

### Secure Secret Management _(planned)_

- SealedSecrets integration with automatic key pair generation
- Secure secrets stored in Git (encrypted)
- Industry-standard secret management
- Never store plaintext secrets

### Flexible Update Management

Three update channels with automatic update support:

- **CloudPirates Stable**: Released ~2 weeks after upstream with extensive testing and automatic Helm value migrations
- **Stable**: Latest stable release rolled out instantly from upstream
- **Latest**: Latest available version including pre-releases and breaking changes

[Learn more about updates →](./update-management.md)

## How It Works

### Simple Workflow

```
Portal Action → Git Commit → ArgoCD Sync → Kubernetes Deployment
```

1. **Connect Repository**: Add your Git repository or use our provided one
2. **Choose Applications**: Select from our curated application templates
3. **Configure Settings**: Pick recommended configuration or customize
4. **Deploy**: We create ArgoCD Applications in your repository
5. **Manage**: Update, configure, and monitor through the portal

::: danger Danger: Application Creation Is Not Yet Functional
Creating an application currently always fails with a `501 Not Implemented` — the underlying
GitOps/ArgoCD provisioning described below is not wired up yet.
:::

**What Gets Created** _(planned — not implemented yet)_:

- ArgoCD Application manifests
- Application values and configuration
- SealedSecret resources for sensitive data
- All committed to your Git repository

[Learn more about GitOps setup →](./gitops-setup.md)

## Why Choose Managed Application Platform?

**Perfect For**:

- GitOps adoption without extensive setup
- Application standardization with vetted configurations
- Multi-cluster application management
- Rapid deployment of common applications
- Compliance requirements with full audit trail

**No Vendor Lock-In**:

- All configurations in standard ArgoCD format
- Standard Helm charts and Kubernetes manifests
- Cancel platform subscription anytime
- Continue managing applications yourself

## Pricing

**Flexible Pricing Options**:

- **Using Your Infrastructure**: Platform subscription only — bring your own Kubernetes, Git, and/or ArgoCD
- **Using CloudPirates Managed Kubernetes**: Pay-as-you-go based on memory usage (per GB of container memory requests)

**Example (Managed Kubernetes)**: MariaDB with 2Gi memory + PostgreSQL with 4Gi memory = 6 GB billed monthly

[Learn more about deployment options and pricing →](./deployment-options.md)

## Getting Started

Ready to deploy applications? [Contact us](mailto:developer@cloudpirates.io) to get beta access.

## API Reference

### List Applications

```http
GET /v1/workspaces/{workspaceId}/applications
Authorization: Bearer <access-token>
```

### Create Application

::: danger Danger: Always Returns 501
This request currently always fails with `501 Not Implemented`. The route, validation, and request
shape below are real; the actual provisioning behind it isn't built yet.
:::

```http
POST /v1/workspaces/{workspaceId}/applications
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "applicationTemplateId": "6571f2b1e4b0a1a2b3c4d5e6",
  "applicationTemplatePresetId": "6571f2b1e4b0a1a2b3c4d5e7",
  "clusterId": "6571f2b1e4b0a1a2b3c4d5e8",
  "appVersion": "12.0.2",
  "name": "my-database"
}
```

### Get Application

```http
GET /v1/workspaces/{workspaceId}/applications/{applicationId}
Authorization: Bearer <access-token>
```

### Update Application

::: danger Danger: No Backend Handler Registered
These two routes exist and accept requests, but no command handler is registered for them anywhere
in the backend — a request never gets a response and will time out (`503`/`504`). There is also no
`preset`/`autoUpdate` concept on this endpoint.
:::

Change the values used to render the application:

```http
PUT /v1/workspaces/{workspaceId}/applications/{applicationId}/values
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "applicationValues": {}
}
```

Bump the application's version:

```http
POST /v1/workspaces/{workspaceId}/applications/{applicationId}/actions/update
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "appVersion": "12.1.0"
}
```

### Delete Application

```http
DELETE /v1/workspaces/{workspaceId}/applications/{applicationId}
Authorization: Bearer <access-token>
```

::: info Info: Full API Documentation Available
These are example requests. For complete API documentation including all parameters, response schemas, and authentication details, visit [api.cloudpirates.io/docs](https://api.cloudpirates.io/docs/).
:::

## Related Resources

- [GitOps Setup](./gitops-setup.md)
- [Deployment Options](./deployment-options.md)
- [Application Templates](./templates.md)
- [Update Management](./update-management.md)

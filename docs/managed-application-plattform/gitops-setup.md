::: warning Warning: Private Beta Access Only
The Managed Application Platform is currently in private beta. Contact us at [hello@cloudpirates.io](mailto:hello@cloudpirates.io) to request access.
:::

::: danger Danger: This Page Describes Planned, Not Current, Functionality
None of the GitOps mechanics below exist in the platform today. Concretely: application creation
(the only thing that would trigger any of this) always fails with a `501 Not Implemented`; the
"CloudPirates Managed Repository" is in reality one shared, service-global GitLab project, not an
isolated repository per workspace; "Bring Your Own Repository" supports none of GitHub/Bitbucket/
Azure DevOps/self-hosted — the GitOps integration is hardcoded to GitLab only; "Bring Your Own
ArgoCD" has no backend support at all — the only ArgoCD client is a single global, **read-only**
client with no way to register a customer-supplied instance; there is no SealedSecrets integration,
no update-channel annotations, and no rollback/revert capability anywhere in the codebase. Treat
everything on this page as a roadmap description, not a how-to for something you can use today.
:::

<br>

# GitOps Setup

Configure your GitOps workflow for application deployment. CloudPirates supports both managed and bring-your-own Git repositories and ArgoCD installations.

## Git Repository Options

### CloudPirates Managed Repository

We provide and host a GitOps repository for you:

**Benefits**:

- No setup required
- Automatic configuration
- Hosted and maintained by CloudPirates
- Included in platform subscription

**How it works**:

1. We create a Git repository for your workspace
2. Repository is automatically configured with ArgoCD
3. All application manifests are committed here
4. Full Git history and audit trail

### Bring Your Own Repository

Connect your existing Git repository:

**Supported Providers**:

- GitHub
- GitLab
- Bitbucket
- Azure DevOps
- Self-hosted Git servers

**Requirements**:

- Repository access credentials (SSH key or access token)
- Write permissions for CloudPirates platform
- HTTPS or SSH connectivity

**Setup Process**:

1. Provide repository URL and credentials in portal
2. Grant CloudPirates write access
3. We'll create a dedicated directory for applications
4. All changes are committed with clear messages

## ArgoCD Options

### CloudPirates Managed ArgoCD

Use our managed ArgoCD installation:

**Benefits**:

- No installation or maintenance required
- Automatic updates and security patches
- High availability setup
- Monitoring and alerting included
- Professional support

**Features**:

- Multi-cluster support
- Application health monitoring
- Sync status and history
- Automated sync options

### Bring Your Own ArgoCD

Connect your existing ArgoCD instance:

**Requirements**:

- ArgoCD 3.0 or newer
- Access credentials
- Network connectivity to CloudPirates platform
- Permissions to create Application resources

**Setup Process**:

1. Provide ArgoCD API URL and credentials
2. Grant CloudPirates permissions to create Applications
3. We'll create Applications in your ArgoCD namespace
4. Monitor deployment status through portal

**Benefits**:

- Use your existing ArgoCD setup
- Integrate with your workflows
- Keep full control over ArgoCD configuration
- Use your custom RBAC and security policies

## GitOps Workflow

### How It Works

```
User Action (Portal)
    ↓
Git Commit (Your Repo)
    ↓
ArgoCD Detects Change
    ↓
ArgoCD Syncs to Kubernetes
    ↓
Application Running
```

### What Gets Created

**In Your Git Repository**:

```
applications/
├── mariadb/
│   ├── application.yaml      # ArgoCD Application
│   ├── values.yaml           # Helm values
│   └── secrets.yaml          # SealedSecrets
└── wordpress/
    ├── application.yaml
    ├── values.yaml
    └── secrets.yaml
```

**ArgoCD Application Example**:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: mariadb
  namespace: argocd
  annotations:
    apps.cloudpirates.io/update-channel: cloudpirates-stable
    apps.cloudpirates.io/auto-update: "true"
spec:
  project: default
  source:
    repoURL: https://charts.cloudpirates.io
    targetRevision: 1.2.3
    chart: mariadb
    helm:
      valuesObject:
        # Your configuration
  destination:
    server: https://kubernetes.default.svc
    namespace: databases
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

## Secret Management

### SealedSecrets Integration

All sensitive data is encrypted using SealedSecrets:

**Setup**:

1. SealedSecrets controller installed in your cluster
2. We generate a public/private key pair
3. Public key used to encrypt secrets
4. Encrypted secrets stored in Git (safe to commit)
5. Private key stays in your cluster for decryption

**Example SealedSecret**:

```yaml
apiVersion: bitnami.com/v1alpha1
kind: SealedSecret
metadata:
  name: mariadb-credentials
  namespace: databases
spec:
  encryptedData:
    password: AgBhY3RpdmF0aW9uIH...
    root-password: AgCRlZmF1bHQgZm9...
```

**Security**:

- Secrets are encrypted with your cluster's public key
- Only your cluster can decrypt them
- Safe to store in Git
- Automatic key rotation supported

## Audit Trail

### Git History

Every change is tracked:

**Commit Messages**:

```
feat: Add MariaDB application to production cluster

Created by: user@example.com
Via: CloudPirates Portal
Timestamp: 2024-01-15T10:30:00Z
```

**What's Tracked**:

- Application creation
- Configuration changes
- Version updates
- Secret modifications
- Application deletion

### Rollback Support

Easy rollback to previous versions:

1. View Git history in portal
2. Select previous commit
3. Revert changes
4. ArgoCD automatically syncs to previous state

## Access Control

### Repository Access

**CloudPirates Managed**:

- Workspace-based access control
- Role-based permissions (admin, editor, viewer)
- Audit logs of all changes

**Bring Your Own**:

- Use your Git provider's access control
- CloudPirates service account with write access
- All changes attributed to CloudPirates in Git history

### ArgoCD Access

**CloudPirates Managed**:

- Integrated with workspace permissions
- View-only access through portal
- Full ArgoCD UI access available

**Bring Your Own**:

- Use your ArgoCD RBAC policies
- CloudPirates requires Application creation permissions
- You control all other access

## Best Practices

### Repository Structure

**Recommended**:

- Separate directory per application
- Clear naming conventions
- Use subdirectories for environments (dev, staging, prod)
- Keep documentation in repository

### Commit Strategy

**We recommend**:

- Clear, descriptive commit messages
- Small, focused commits
- Tag releases with semantic versioning
- Use pull requests for review (when using own repo)

### Security

**Important**:

- Never commit plaintext secrets
- Always use SealedSecrets
- Regularly rotate keys
- Audit repository access
- Enable branch protection
- Require signed commits (optional)

## Troubleshooting

### Common Issues

**ArgoCD Not Syncing**:

- Check ArgoCD has access to repository
- Verify repository credentials
- Check network connectivity
- Review ArgoCD application status

**Permission Errors**:

- Verify CloudPirates has write access to repository
- Check ArgoCD namespace permissions
- Review RBAC policies

**Sync Failures**:

- Check application manifest syntax
- Verify Helm chart availability
- Review destination cluster connectivity
- Check namespace exists

## Related Resources

- [Deployment Options](./deployment-options.md)
- [Application Templates](./templates.md)
- [Update Management](./update-management.md)
- [Managed Application Platform Overview](./index.md)

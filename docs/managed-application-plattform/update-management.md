---
next: false
---

::: warning Warning: Private Beta Access Only
The Managed Application Platform is currently in private beta. Contact us at [hello@cloudpirates.io](mailto:hello@cloudpirates.io) to request access.
:::

::: danger Danger: This Page Describes Planned, Not Current, Functionality
Update channels, annotation-based configuration, automatic Helm value migrations, pre-update
PVC/database backups, and changelog/notification/CVE-SLA handling have no corresponding backend
code today. The one real primitive is a plain version bump (`{workspaceId, applicationId,
appVersion}`, no channel concept) — and even that has no registered command handler yet, so
requests to it never get a response. Treat everything on this page as a roadmap description, not a
how-to for something you can use today.
:::

<br>

# Update Management

Control how and when your applications are updated. CloudPirates offers flexible update channels and automatic update options to match your operational requirements.

## Update Channels

Choose the right balance between stability and features for each application.

### CloudPirates Stable (Recommended)

**Best for**: Production workloads

**Characteristics**:

- Released approximately 2 weeks after upstream
- Extensive checks and validation by CloudPirates team
- Automated Helm chart value migrations
- Known issues documented
- Recommended configurations validated
- Upgrade paths verified

**What We Do**:

- Comprehensive testing across multiple scenarios
- Automated and manual validation
- Gradual rollout monitoring
- **Automatic migration of Helm chart values** to new versions

**Example Timeline**:

- Day 0: Upstream releases v2.5.0
- Day 1-10: CloudPirates extensive testing and validation
- Day 11-14: Migration path verification
- Day 14: Available in CloudPirates Stable channel

### Stable

**Best for**: Balanced environments, teams wanting latest stable without waiting

**Characteristics**:

- Latest stable release from upstream
- Rolled out instantly upon upstream release
- Production-ready according to upstream
- Community-tested by upstream project
- No additional CloudPirates testing period

### Latest

**Best for**: Development, testing, early adopters

**Characteristics**:

- Latest available version of the software
- Includes pre-release and beta versions
- May include breaking changes
- Cutting-edge features
- Not recommended for production

**Use Cases**:

- Development environments
- Feature testing and preview
- Bug reproduction
- Early access to new functionality

## Automatic Updates

### Configuration

Update channels are configured via annotations on the ArgoCD Application resource:

**Example ArgoCD Application**:

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
  destination:
    server: https://kubernetes.default.svc
    namespace: databases
```

**Available Update Channels**:

- `cloudpirates-stable` - Recommended for production
- `stable` - Latest stable from upstream
- `latest` - Latest available version

**Auto-Update Behavior**:

- **Enabled** (`auto-update: "true"`): Application automatically updated to latest version in selected channel, committed to Git
- **Disabled** (`auto-update: "false"`): Notification sent when new version available, manual approval required

### Update Process

**Automatic Update Flow**:

```
New Version Available
    ↓
Check Update Channel Setting
    ↓
Create Git Commit with New Version
    ↓
ArgoCD Detects Change
    ↓
ArgoCD Syncs Application
    ↓
Kubernetes Rolls Out Update
    ↓
Health Check
    ↓
Notification Sent
```

**Safety Features**:

- Health checks before marking as successful
- Automatic rollback on failure (if configured)
- Update history in Git
- Easy manual rollback

### Pre-Update Backup (Managed Kubernetes Only)

**Automatic Backup**: For applications hosted on CloudPirates Managed Kubernetes clusters, we automatically create a backup before rolling out updates.

**What's Included**:

- Application configuration
- Persistent Volume Claims (PVCs)
- Database snapshots (where applicable)

**Retention**: Backups are retained for 7 days after the update

This ensures you can quickly restore your application if an update causes issues.

## Update Notifications

### Notification Types

**New Version Available**:

- When new version in your channel
- Includes changelog
- Shows current vs available version

**Update Applied**:

- Automatic update completed
- Links to Git commit
- Deployment status

**Update Failed**:

- Automatic update encountered error
- Error details and logs
- Recommended actions

### Notification Channels

- Portal notifications
- Email
- Webhooks (for integration)
- **Coming Soon**: Slack, Microsoft Teams

## Changelog and Release Notes

### View Changes

**Per Application**:

- Version history
- Changelog from upstream
- CloudPirates testing notes (Stable channel)
- Breaking changes highlighted
- Upgrade instructions

**Example Changelog**:

```markdown
## MariaDB 11.2.2 → 11.2.3

### Changes

- Security fix for CVE-2024-1234
- Performance improvements for replication
- Bug fix for connection pooling

### CloudPirates Testing (Stable Channel)

- Tested with 1000+ concurrent connections
- Validated replication across 3 nodes
- Backup/restore verified
- Upgrade from 11.2.2 successful

### Breaking Changes

None

### Recommended Actions

- No configuration changes required
- Update recommended for security fix
```

## Security Updates

### Critical Security Patches

**Priority Handling**:

- Released to all channels immediately
- Notification sent to all users
- Automatic update recommended (even if disabled)
- Clear security advisory

**Example**:

```
⚠️ SECURITY ADVISORY

Application: MariaDB
Current Version: 11.2.2
Fixed Version: 11.2.3
Severity: HIGH
CVE: CVE-2024-1234

Description: SQL injection vulnerability in user authentication

Recommendation: Update immediately
Auto-update will be applied within 24 hours for affected applications
```

### Security Update Policy

- Critical: Released immediately to all channels
- High: Available in all channels within 24 hours
- Medium: Follow normal channel schedule
- Low: Included in next regular release

## Related Resources

- [GitOps Setup](./gitops-setup.md)
- [Deployment Options](./deployment-options.md)
- [Application Templates](./templates.md)
- [Managed Application Platform Overview](./index.md)

# Security & Best Practices

Automated validation of cluster configuration against
industry security standards and best practices.

## How It Works

Every deployment, job, and workload in your cluster is automatically checked against
security standards and best practices. Each finding includes:

- **Issue description** with context
- **Impact explanation** for security and reliability
- **Remediation steps** with code examples
- **Severity rating** to help prioritize

::: tip Clear Policy Guidance Provided
Each policy violation includes a clear explanation of the requirement and specific steps to
resolve the issue.
:::

## What We Check

Our automated scans validate your workloads against:

- **Pod Security Standards** (industry-standard security baseline)
- **Resource Configuration** (preventing performance and cost issues)
- **Security Contexts** (protecting against vulnerabilities)
- **Certificate Management** (avoiding expired certs and outages)
- **Image Management** (ensuring reproducible deployments)

## Policy Categories

### Resource Management

#### CPU and Memory Requests/Limits

**Policy**: `require-requests-limits`
**Severity**: Medium
**Category**: Best Practices

All containers must specify CPU and memory requests and limits to ensure proper resource
allocation and prevent resource exhaustion.

**Requirements**:

- CPU requests defined
- Memory requests defined
- Memory limits defined

**Why It Matters**:

- Prevents resource contention
- Enables proper cluster capacity planning
- Protects against out-of-memory situations

**Recommendation**:

```yaml
resources:
  requests:
    cpu: "100m"
    memory: "128Mi"
  limits:
    memory: "256Mi"
```

#### Resource Usage Analysis

**Feature**: Automatic resource optimization recommendations

The platform analyzes actual resource consumption over the last 30 days and compares it to
configured requests/limits.

**Recommendations Provided**:

- **Over-provisioned**: Resources set too high, wasting cluster capacity
- **Under-provisioned**: Resources too low, risking performance issues
- **Optimal**: Resources properly configured

**Example**:

```
Pod "web-app" memory request (2Gi) exceeds average usage (512Mi)
by 75%. Consider reducing to 1Gi.
```

### Health Checks

#### Liveness, Readiness, and Startup Probes

**Policy**: `require-pod-probes`
**Severity**: Medium
**Category**: Best Practices

All containers must define at least one probe (liveness, readiness, or startup) for proper
lifecycle management.

**Probe Types**:

- **Liveness Probe**: Determines if container needs restart
- **Readiness Probe**: Determines if pod can receive traffic
- **Startup Probe**: Handles slow-starting containers

**Why It Matters**:

- Enables automatic failure recovery
- Prevents traffic to unhealthy pods
- Improves deployment reliability

**Recommendation**:

```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
```

## Pod Security Standards

### Baseline Security

**Category**: Pod Security Standards - Baseline

Fundamental security controls that should be applied to all workloads.

#### Disallow Privileged Containers

**Policy**: `disallow-privileged-containers`
**Severity**: Medium

Privileged containers have unrestricted access to host resources and should be avoided.

**Blocked Configuration**:

```yaml
securityContext:
  privileged: true # ❌ Not allowed
```

#### Disallow Host Namespaces

**Policy**: `disallow-host-namespaces`
**Severity**: Medium

Containers should not share host network, PID, or IPC namespaces.

**Blocked Configurations**:

```yaml
hostNetwork: true # ❌ Not allowed
hostPID: true # ❌ Not allowed
hostIPC: true # ❌ Not allowed
```

#### Restrict Host Ports

**Policy**: `disallow-host-ports`
**Severity**: Medium

Containers should not bind to host ports, except within approved ranges.

**Blocked Configuration**:

```yaml
ports:
  - containerPort: 80
    hostPort: 80 # ❌ Not allowed
```

#### Disallow Host Path Volumes

**Policy**: `disallow-host-path`
**Severity**: Medium

HostPath volumes provide access to the host filesystem and pose security risks.

**Blocked Configuration**:

```yaml
volumes:
  - name: host-volume
    hostPath: # ❌ Not allowed
      path: /data
```

#### Restrict Capabilities

**Policy**: `disallow-capabilities`
**Severity**: Medium

Linux capabilities should be dropped, with only explicitly required capabilities added.

**Allowed Capabilities**: `AUDIT_WRITE`, `CHOWN`, `DAC_OVERRIDE`, `FOWNER`, `FSETID`, `KILL`,
`MKNOD`, `NET_BIND_SERVICE`, `SETFCAP`, `SETGID`, `SETPCAP`, `SETUID`, `SYS_CHROOT`

**Recommended Configuration**:

```yaml
securityContext:
  capabilities:
    drop: ["ALL"]
    add: ["NET_BIND_SERVICE"] # Only if needed
```

#### Restrict Seccomp Profiles

**Policy**: `restrict-seccomp`
**Severity**: Medium

Seccomp profiles must be set to `RuntimeDefault` or `Localhost`.

**Required Configuration**:

```yaml
securityContext:
  seccompProfile:
    type: RuntimeDefault
```

#### Restrict AppArmor Profiles

**Policy**: `restrict-apparmor-profiles`
**Severity**: Medium

AppArmor profiles must be set to `runtime/default` or a defined profile.

**Annotation Required**:

```yaml
annotations:
  container.apparmor.security.beta.kubernetes.io/nginx: runtime/default
```

#### Restrict Sysctls

**Policy**: `restrict-sysctls`
**Severity**: Medium

Only safe sysctls are allowed: `kernel.shm_rmid_forced`, `net.ipv4.ip_local_port_range`,
`net.ipv4.ip_unprivileged_port_start`, `net.ipv4.tcp_syncookies`, `net.ipv4.ping_group_range`.

### Restricted Security

**Category**: Pod Security Standards - Restricted

Heavily restricted security controls for defense-in-depth.

#### Require Non-Root User

**Policy**: `require-run-as-nonroot`
**Severity**: Medium

Containers must run as non-root user (UID > 0).

**Required Configuration**:

```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
```

#### Disallow Privilege Escalation

**Policy**: `disallow-privilege-escalation`
**Severity**: Medium

Privilege escalation must be explicitly disabled.

**Required Configuration**:

```yaml
securityContext:
  allowPrivilegeEscalation: false
```

#### Strict Capability Restrictions

**Policy**: `disallow-capabilities-strict`
**Severity**: Medium

All capabilities must be dropped with no additions allowed.

**Required Configuration**:

```yaml
securityContext:
  capabilities:
    drop: ["ALL"]
```

#### Strict Seccomp Profile

**Policy**: `restrict-seccomp-strict`
**Severity**: Medium

Seccomp profile must be `RuntimeDefault` or `Localhost` (Unconfined not allowed).

#### Restrict Volume Types

**Policy**: `restrict-volume-types`
**Severity**: Medium

Only specific volume types allowed: `configMap`, `csi`, `downwardAPI`, `emptyDir`, `ephemeral`,
`persistentVolumeClaim`, `projected`, `secret`.

## Certificate Management

### One Domain Per Certificate

**Policy**: `cert-manager-limit-dnsnames`
**Severity**: Medium
**Category**: Cert-Manager

Each Certificate resource should contain only one DNS name for compatibility with applications
that don't support multi-domain certificates.

**Recommendation**:

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: example-com
spec:
  dnsNames:
    - example.com # ✅ Single domain
```

**Blocked Configuration**:

```yaml
dnsNames:
  - example.com
  - www.example.com # ❌ Multiple domains not allowed
```

### Certificate Duration Limits

**Policy**: `cert-manager-limit-duration`
**Severity**: Medium
**Category**: Cert-Manager

Certificate duration should not exceed 90 days, following best practices for certificate rotation.

## Image Management

### Disallow Latest Tag

**Policy**: `disallow-latest-tag`
**Severity**: Medium
**Category**: Best Practices

Container images must use specific version tags, not `latest` or no tag.

**Why It Matters**:

- Ensures reproducible deployments
- Prevents unexpected updates
- Improves security and stability

**Recommendation**:

```yaml
image: nginx:1.21.6 # ✅ Specific version
```

**Blocked**:

```yaml
image: nginx:latest  # ❌ Not allowed
image: nginx         # ❌ Not allowed (implies latest)
```

### Check Deprecated APIs

**Policy**: `check-deprecated-apis`
**Severity**: Medium
**Category**: Best Practices

Resources using deprecated Kubernetes APIs are flagged for migration.

**Common Deprecated APIs**:

- `extensions/v1beta1` → `apps/v1` (Deployments)
- `policy/v1beta1` → `policy/v1` (PodDisruptionBudget)

## Network Security

### Disallow Default Namespace

**Policy**: `disallow-default-namespace`
**Severity**: Medium
**Category**: Multi-Tenancy

Workloads should not run in the `default` namespace.

### Restrict Service External IPs

**Policy**: `restrict-external-ips`
**Severity**: Medium
**Category**: Security

Services should not use `externalIPs` field unless explicitly required.

### Restrict NodePort Services

**Policy**: `restrict-nodeport`
**Severity**: Medium
**Category**: Security

NodePort services expose ports on all nodes and should be avoided in favor of LoadBalancer or
Ingress.

## Ingress Security

### Require Ingress Host

**Policy**: `disallow-empty-ingress-host`
**Severity**: Medium
**Category**: Best Practices

Ingress resources must specify explicit host rules.

### Disallow Custom Snippets

**Policy**: `disallow-ingress-nginx-custom-snippets`
**Severity**: Medium
**Category**: Security

Nginx custom snippets can introduce security vulnerabilities and should be disabled.

### Restrict Default Backend

**Policy**: `restrict-ingress-defaultbackend`
**Severity**: High
**Category**: Best Practices

Ingress should use explicit path rules instead of default backend.

## Filesystem Security

### Require Read-Only Root Filesystem

**Policy**: `require-ro-rootfs`
**Severity**: Medium
**Category**: Best Practices

Containers should use read-only root filesystem when possible.

**Recommendation**:

```yaml
securityContext:
  readOnlyRootFilesystem: true
```

Use `emptyDir` volumes for writable directories:

```yaml
volumeMounts:
  - name: tmp
    mountPath: /tmp
volumes:
  - name: tmp
    emptyDir: {}
```

### Disallow CRI Socket Mount

**Policy**: `disallow-container-sock-mounts`
**Severity**: Medium
**Category**: Security

Containers should not mount container runtime sockets (`/var/run/docker.sock`,
`/run/containerd/containerd.sock`).

## Accessing Policy Results

### Via Web Console

1. Navigate to cluster in portal
2. Select namespace or specific workload
3. View **Best Practices** tab
4. Review violations and recommendations

**Dashboard Features**:

- Policy compliance score
- Violation breakdown by severity
- Trend analysis over time
- Detailed remediation steps

### Policy Violation Structure

Violations are grouped by preset (`BEST_PRACTICES`, `MULTI_TENANCY`, `PSS_BASELINE`,
`PSS_RESTRICTED`, `OTHER`). Each violation itself only includes:

- **Policy**: Identifier of the rule
- **Message**: Description of violation
- **Severity**: `INFO`, `LOW`, `MEDIUM`, or `HIGH`

## Compliance Tracking

### Compliance Score

Overall health metric based on policy violations, deducted from 100:

- **High violations**: -20 points each
- **Medium violations**: -10 points each
- **Low violations**: -5 points each
- **Info violations**: -2 points each

The score floors at 0.

### Historical Trends

Track compliance improvements over time:

- Daily compliance scores
- New vs resolved violations
- Most common violation types
- Resource-level compliance history

## Related Resources

- [Kubernetes Resources](./kubernetes-resources.md)
- [Monitoring & Metrics](./monitoring-metrics.md)
- [Alert Reference](./alert-reference.md)
- [Setup Instructions](./setup-instructions.md)

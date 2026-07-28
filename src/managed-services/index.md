---
prev: false
next: false
---

# Managed Services

CloudPirates currently offers two managed services on top of your Kubernetes clusters:
visibility into what's running, and GitOps-based deployment of new applications.

## Our Managed Services

### Managed Observability

**Cluster visibility through a single lightweight agent**

Monitor your Kubernetes clusters without deploying Prometheus, Grafana, or any other stack
yourself.

::: danger Roadmap
CVE scanning, AI-assisted insights, and automated resource recommendations not implemented yet.
:::

**Key Features**:

- Kubernetes event monitoring with plain-language explanations
- Best practice validation against Pod Security Standards
- CVE scanning of container images
- AI-assisted insights and automated resource recommendations

Need custom metrics or long-term storage? Add the separate Full Observability Stack (Grafana,
Prometheus, Loki, Tempo, and Alloy), available fully managed by CloudPirates or deployed in your
own cluster.

[Learn more about Managed Observability →](../managed-observability/)

---

### Managed Application Platform

**Deploy production-ready applications with GitOps workflows**

::: warning Private Beta Access Only
Currently in private beta. [Contact us](mailto:hello@cloudpirates.io) to request access.
:::

Deploy databases, caches, and other applications from pre-configured templates, then manage them
via GitOps with ArgoCD.

::: danger Roadmap
Automatic updates, Helm value migrations, and pre-update backups are not implemented yet.
See [Managed Application Platform](../managed-application-plattform/) for details.
:::

**Key Features**:

- 15+ production-ready application templates (databases, caching, storage, messaging)
- Automatic updates with three update channels (CloudPirates Stable, Stable, Latest)
- Automatic Helm value migrations (CloudPirates Stable channel)
- GitOps workflow with ArgoCD
- Pre-update backups (managed Kubernetes)
- Pay-as-you-go pricing based on memory usage

**Deployment Options**:

- **Fully Managed**: Git + ArgoCD + Kubernetes hosted by CloudPirates
- **Bring Your Own**: use your existing Git, ArgoCD, and/or Kubernetes infrastructure
- **Mix & Match**: combine managed and self-hosted components

[Learn more about Managed Application Platform →](../managed-application-plattform/)

## Need Help?

Not sure which service fits your setup? We can help you choose.

📧 [hello@cloudpirates.io](mailto:hello@cloudpirates.io)
📞 [+49-571-784628-20](tel:+4957178462820)

## Related Resources

- [CloudPirates API Documentation](../api/)
- [Workspaces](../workspaces/)
- [Developer Portal Home](../)

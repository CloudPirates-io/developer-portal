::: warning Private Beta Access Only
The Managed Application Platform is currently in private beta.
Contact us at [hello@cloudpirates.io](mailto:hello@cloudpirates.io) to request access.
:::

<br>

# Application Templates

Browse and deploy curated application templates with production-ready configurations. All
templates are based on CloudPirates
[open source Helm charts](https://github.com/CloudPirates-io/helm-charts).

## Available Templates

| Chart                                                                                                                  | Description                                                                                                                      | Version                                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [MariaDB](https://github.com/CloudPirates-io/helm-charts/tree/main/charts/mariadb)                                     | High-performance, open-source relational database server that is a drop-in replacement for MySQL                                 | ![Version](https://img.shields.io/badge/dynamic/yaml?url=https://raw.githubusercontent.com/CloudPirates-io/helm-charts/main/charts/mariadb/Chart.yaml&label=&query=version&prefix=v)                   |
| [PostgreSQL](https://github.com/CloudPirates-io/helm-charts/tree/main/charts/postgres)                                 | The World's Most Advanced Open Source Relational Database                                                                        | ![Version](https://img.shields.io/badge/dynamic/yaml?url=https://raw.githubusercontent.com/CloudPirates-io/helm-charts/main/charts/postgres/Chart.yaml&label=&query=version&prefix=v)                  |
| [MongoDB](https://github.com/CloudPirates-io/helm-charts/tree/main/charts/mongodb)                                     | MongoDB a flexible NoSQL database for scalable, real-time data management                                                        | ![Version](https://img.shields.io/badge/dynamic/yaml?url=https://raw.githubusercontent.com/CloudPirates-io/helm-charts/main/charts/mongodb/Chart.yaml&label=&query=version&prefix=v)                   |
| [TimescaleDB](https://github.com/CloudPirates-io/helm-charts/tree/main/charts/timescaledb)                             | TimescaleDB is a PostgreSQL extension for high-performance real-time analytics on time-series and event data                     | ![Version](https://img.shields.io/badge/dynamic/yaml?url=https://raw.githubusercontent.com/CloudPirates-io/helm-charts/main/charts/timescaledb/Chart.yaml&label=&query=version&prefix=v)               |
| [Redis](https://github.com/CloudPirates-io/helm-charts/tree/main/charts/redis)                                         | In-memory data structure store, used as a database, cache, and message broker                                                    | ![Version](https://img.shields.io/badge/dynamic/yaml?url=https://raw.githubusercontent.com/CloudPirates-io/helm-charts/main/charts/redis/Chart.yaml&label=&query=version&prefix=v)                     |
| [Valkey](https://github.com/CloudPirates-io/helm-charts/tree/main/charts/valkey)                                       | High-performance in-memory data structure store, fork of Redis                                                                   | ![Version](https://img.shields.io/badge/dynamic/yaml?url=https://raw.githubusercontent.com/CloudPirates-io/helm-charts/main/charts/valkey/Chart.yaml&label=&query=version&prefix=v)                    |
| [Memcached](https://github.com/CloudPirates-io/helm-charts/tree/main/charts/memcached)                                 | High-performance, distributed memory object caching system                                                                       | ![Version](https://img.shields.io/badge/dynamic/yaml?url=https://raw.githubusercontent.com/CloudPirates-io/helm-charts/main/charts/memcached/Chart.yaml&label=&query=version&prefix=v)                 |
| [MinIO](https://github.com/CloudPirates-io/helm-charts/tree/main/charts/minio)                                         | High-Performance Object Storage compatible with Amazon S3 APIs                                                                   | ![Version](https://img.shields.io/badge/dynamic/yaml?url=https://raw.githubusercontent.com/CloudPirates-io/helm-charts/main/charts/minio/Chart.yaml&label=&query=version&prefix=v)                     |
| [RustFS](https://github.com/CloudPirates-io/helm-charts/tree/main/charts/rustfs)                                       | High-performance distributed object storage with S3-compatible API (MinIO alternative) [ALPHA]                                   | ![Version](https://img.shields.io/badge/dynamic/yaml?url=https://raw.githubusercontent.com/CloudPirates-io/helm-charts/main/charts/rustfs/Chart.yaml&label=&query=version&prefix=v)                    |
| [Ghost](https://github.com/CloudPirates-io/helm-charts/tree/main/charts/ghost)                                         | A simple, powerful publishing platform that allows you to share your stories with the world                                      | ![Version](https://img.shields.io/badge/dynamic/yaml?url=https://raw.githubusercontent.com/CloudPirates-io/helm-charts/main/charts/ghost/Chart.yaml&label=&query=version&prefix=v)                     |
| [Nginx](https://github.com/CloudPirates-io/helm-charts/tree/main/charts/nginx)                                         | High-performance HTTP server and reverse proxy                                                                                   | ![Version](https://img.shields.io/badge/dynamic/yaml?url=https://raw.githubusercontent.com/CloudPirates-io/helm-charts/main/charts/nginx/Chart.yaml&label=&query=version&prefix=v)                     |
| [Keycloak](https://github.com/CloudPirates-io/helm-charts/tree/main/charts/keycloak)                                   | Open Source Identity and Access Management solution                                                                              | ![Version](https://img.shields.io/badge/dynamic/yaml?url=https://raw.githubusercontent.com/CloudPirates-io/helm-charts/main/charts/keycloak/Chart.yaml&label=&query=version&prefix=v)                  |
| [RabbitMQ](https://github.com/CloudPirates-io/helm-charts/tree/main/charts/rabbitmq)                                   | A messaging broker that implements the Advanced Message Queuing Protocol (AMQP)                                                  | ![Version](https://img.shields.io/badge/dynamic/yaml?url=https://raw.githubusercontent.com/CloudPirates-io/helm-charts/main/charts/rabbitmq/Chart.yaml&label=&query=version&prefix=v)                  |
| [RabbitMQ Cluster Operator](https://github.com/CloudPirates-io/helm-charts/tree/main/charts/rabbitmq-cluster-operator) | Kubernetes operator to deploy and manage RabbitMQ clusters                                                                       | ![Version](https://img.shields.io/badge/dynamic/yaml?url=https://raw.githubusercontent.com/CloudPirates-io/helm-charts/main/charts/rabbitmq-cluster-operator/Chart.yaml&label=&query=version&prefix=v) |
| [Kafka](https://github.com/CloudPirates-io/helm-charts/tree/main/charts/kafka)                                         | Distributed event streaming platform for high-performance data pipelines and streaming analytics (KRaft mode, no ZooKeeper)      | ![Version](https://img.shields.io/badge/dynamic/yaml?url=https://raw.githubusercontent.com/CloudPirates-io/helm-charts/main/charts/kafka/Chart.yaml&label=&query=version&prefix=v)                     |
| [Zookeeper](https://github.com/CloudPirates-io/helm-charts/tree/main/charts/zookeeper)                                 | Centralized service for maintaining configuration information, naming, providing distributed synchronization, and group services | ![Version](https://img.shields.io/badge/dynamic/yaml?url=https://raw.githubusercontent.com/CloudPirates-io/helm-charts/main/charts/zookeeper/Chart.yaml&label=&query=version&prefix=v)                 |
| [Etcd](https://github.com/CloudPirates-io/helm-charts/tree/main/charts/etcd)                                           | A distributed reliable key-value store                                                                                           | ![Version](https://img.shields.io/badge/dynamic/yaml?url=https://raw.githubusercontent.com/CloudPirates-io/helm-charts/main/charts/etcd/Chart.yaml&label=&query=version&prefix=v)                      |

## Template Configuration

Each template includes pre-configured presets optimized for different use cases:

- **Development/Testing**: Minimal resources, latest updates
- **Production**: Optimized configurations with CloudPirates Stable update channel
- **High Availability**: Multi-node setups for critical workloads

Customize any template by overriding Helm values for resources, storage, replicas, and features.

## Updates & Security

**Update Channels**:

- **CloudPirates Stable**: released ~2 weeks after upstream with extensive testing and automatic
  value migrations
- **Stable**: latest stable release, rolled out instantly from upstream
- **Latest**: latest available version, including pre-releases and potential breaking changes

**Security**: all secrets encrypted via SealedSecrets and stored safely in Git.

## API Reference

For listing and retrieving application templates, see the
[Application Template API reference](https://api.cloudpirates.io/docs/#/Application%20Template).

::: tip Response Shapes
`GET /v1/applications/templates` returns a bare, paginated array (see
[Pagination](/api/pagination.md)). A template's fields are `applicationTemplateId`, `name`,
`description`, `logoUrl`, and a `source` object (`{type, repositoryUrl, chartName}`). Preset sizing
(CPU/memory/storage) is validated against `valuesSchema`, a per-preset JSON Schema.
:::

## Related Resources

- [GitOps Setup](./gitops-setup.md)
- [Deployment Options](./deployment-options.md)
- [Update Management](./update-management.md)
- [Managed Application Platform Overview](./index.md)

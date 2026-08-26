---
paths:
  - "src/training/**"
---

# Training docs

## Exercise files are hosted on a self-hosted Soft Serve git server

Access to the exercise/demo-file repositories for Kubernetes trainings goes through a self-hosted
[Soft Serve](https://github.com/charmbracelet/soft-serve) git server:

- Connect over SSH: `ssh git.cloudpirates.io`. No pre-registered key needed; this is self-service
  and drops you into Soft Serve's interactive terminal UI.
- The TUI lets you browse available repositories, view file contents, and copy the `git clone`
  command for a given repo.
- The copied clone command uses `https`, not `ssh`, e.g. `git clone https://git.cloudpirates.io/kind-cluster.git`.
  Only the browsing step is over SSH; cloning itself is HTTPS.

Any reference to `gitlab.cloudpirates.io` in `src/**` is stale and should be updated to the
`git.cloudpirates.io` flow above. The `GitLab` mentions in `src/managed-application-plattform/`
are a different, correct use of the name: they're about customer-supplied GitOps repos.

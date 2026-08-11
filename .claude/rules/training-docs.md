---
paths:
  - "docs/training/**"
---

# Training docs

Confirmed 2026-08-05, source: direct statement from the user (Janis Hahn) during session, not
derivable from any current docs content.

## Git hosting moved from GitLab to a self-hosted Soft Serve server

The exercise/demo-file repositories for Kubernetes trainings used to live on a public GitLab
instance (`gitlab.cloudpirates.io`, with a public `/explore` browse page). That instance is gone;
"the GitHub/GitLab was privatized ages ago" per the user. Access now goes through a self-hosted
[Soft Serve](https://github.com/charmbracelet/soft-serve) git server:

- Connect over SSH: `ssh git.cloudpirates.io`. No pre-registered key needed; this is self-service
  and drops you into Soft Serve's interactive terminal UI.
- The TUI lets you browse available repositories, view file contents, and copy the `git clone`
  command for a given repo.
- The copied clone command uses `https`, not `ssh`, e.g. `git clone https://git.cloudpirates.io/kind-cluster.git`.
  Only the browsing step is over SSH; cloning itself is HTTPS.

If you find any other reference to `gitlab.cloudpirates.io` anywhere in `docs/**` (checked
2026-08-05: none outside `docs/training/**`; the `GitLab` mentions in
`docs/managed-application-plattform/` are about customer-supplied GitOps repos, an unrelated,
still-accurate use of the name), it's stale and should be updated to the `git.cloudpirates.io` Soft
Serve flow above.

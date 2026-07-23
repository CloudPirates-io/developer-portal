# CloudPirates Developer Portal

Source for the [CloudPirates Developer Portal](https://developer.cloudpirates.io): a
[VitePress](https://vitepress.dev/) static site under `docs/`, covering the CloudPirates API and
its domains (authentication, billing, workspaces, managed-observability,
managed-application-plattform, managed-services).

- `npm run dev` — local dev server with hot reload
- `npm run build` — build the static site to `dist/`
- `npm run serve` — serve a built `dist/` locally

Content lives entirely under `docs/**`, one directory per domain, plus `docs/index.md` as the
landing page and `docs/.vitepress/` for site config/theme.

## `.claude/rules/` — durable, path-scoped project knowledge

`.claude/rules/*.md` files carry knowledge that isn't derivable by just reading the current docs
content, e.g. audit findings from cross-checking doc claims against the actual backend source, or
non-obvious tooling quirks. Each file has a `paths:` frontmatter glob and is loaded automatically
when working on matching files. Current files:

- **`tone-and-style.md`** (`docs/**`): house style guide for the ongoing de-AI-speech rewrite of
  these docs (cut buzzwords/marketing filler, avoid em dashes, cut duplicate information, model the
  cloudpirates.io site's own voice).
- **`api-docs.md`** (`docs/api/**`): audit notes on the general API docs (pagination, error
  handling) cross-checked against ApiGateway's `handleApiCall`/`errorMiddleware` source.
- **`authentication-docs.md`** (`docs/authentication/**`): audit notes on the auth docs
  cross-checked against `authenticationservice`'s actual HTTP routes and handlers.
- **`billing-docs.md`** (`docs/billing/**`): audit notes on the billing docs cross-checked against
  the billing profile/invoice APIs and their command-payload contracts.
- **`workspaces-docs.md`** (`docs/workspaces/**`): audit notes on the workspace docs cross-checked
  against `WorkspaceApi` and the workspace command contracts.
- **`managed-observability-docs.md`** (`docs/managed-observability/**`): audit notes flagging this
  as the domain with the most drift between docs and the several backend services involved.
- **`managed-application-platform-docs.md`** (`docs/managed-application-plattform/**`): audit notes
  flagging severe drift, most described features are either missing or dead code behind a `501`.
- **`vitepress-rendering.md`** (`node_modules/vitepress/**`, `docs/.vitepress/**`): VitePress
  rendering quirks found by reading the installed package's source directly.

## Persist long-term-important findings into `.claude/rules/`, not just chat

If you learn something during a session that would still matter to a future agent working in this
repo, and it isn't something a future agent could just re-derive by reading the current code or
docs, write it into the relevant `.claude/rules/*.md` file (create a new one, scoped with a
`paths:` glob, if none of the existing files fit). Chat history and any single user's local memory
do not follow the repo. A rules file does, for every agent and every teammate.

This applies especially to:

- Discrepancies found between a docs page and the actual backend behavior (what's accurate, what's
  drifted, what's outright wrong).
- Non-obvious tooling/framework behavior discovered by reading source (see
  `vitepress-rendering.md` for the pattern).
- Style/wording conventions the user corrects you on more than once (see `tone-and-style.md` for
  the pattern).

Date each note you add and name the source you checked it against, so a future reader can judge
whether it's stale and needs re-verifying rather than trusting it blindly.

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
content: the shapes a domain's routes, fields and enums actually have, house style, and non-obvious
tooling quirks. Each file has a `paths:` frontmatter glob and is loaded automatically when working
on matching files.

Write them in plain present tense, describing how things are. No history ("used to be X"), no
dates, no availability caveats. Current files:

- **`tone-and-style.md`** (`docs/**`): house style guide for the ongoing de-AI-speech rewrite of
  these docs (cut buzzwords/marketing filler, avoid em dashes, cut duplicate information, model the
  cloudpirates.io site's own voice).
- **`api-reference-links.md`** (`docs/**`): convention that a page's `## API Reference` section
  should link to the matching tag on the live Swagger docs instead of embedding raw request/
  response examples, plus the full list of API tags/anchors from `openapi.yaml` to link to.
- **`api-docs.md`** (`docs/api/**`): the global pagination mechanism and the error response shapes
  for the general API docs.
- **`authentication-docs.md`** (`docs/authentication/**`): route and body shapes for the auth
  endpoints, which live on `authenticationservice`, not ApiGateway.
- **`billing-docs.md`** (`docs/billing/**`): billing profile and invoice field names and routes.
- **`workspaces-docs.md`** (`docs/workspaces/**`): workspace and member route shapes, the role
  enum, and the `workspaceMemberId` vs `identityId` distinction.
- **`managed-observability-docs.md`** (`docs/managed-observability/**`): cluster-scoped route
  shapes, the resource-type enum, metrics shape and config keys, Kyverno policy facts.
- **`managed-application-platform-docs.md`** (`docs/managed-application-plattform/**`): application
  lifecycle routes and the template/preset field shapes.
- **`vitepress-rendering.md`** (`node_modules/vitepress/**`, `docs/.vitepress/**`): VitePress
  default-theme rendering quirks that aren't documented upstream.
- **`training-docs.md`** (`docs/training/**`): the Soft Serve git server hosting training exercise
  files; `gitlab.cloudpirates.io` links are stale.

## Persist long-term-important findings into `.claude/rules/`, not just chat

If you learn something during a session that would still matter to a future agent working in this
repo, and it isn't something a future agent could just re-derive by reading the current code or
docs, write it into the relevant `.claude/rules/*.md` file (create a new one, scoped with a
`paths:` glob, if none of the existing files fit). Chat history and any single user's local memory
do not follow the repo. A rules file does, for every agent and every teammate.

This applies especially to:

- Route, field and enum shapes a docs page has to get exactly right, and that are easy to guess
  wrong.
- Non-obvious tooling/framework behavior discovered by reading source (see
  `vitepress-rendering.md` for the pattern).
- Style/wording conventions the user corrects you on more than once (see `tone-and-style.md` for
  the pattern).

Name the source file a shape comes from so a future reader can find it, but keep the note itself in
present tense: what the thing is, not what it was or when it was checked.

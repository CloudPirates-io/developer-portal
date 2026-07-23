---
paths:
  - 'docs/**'
---

# Tone & style for developer-portal docs

Written 2026-07-23. Context: most docs under `docs/` were originally drafted 1-2 years ago with
older LLMs and read as generic "AI-management-speech" — vague, superlative-heavy marketing copy
instead of direct technical writing. The ongoing effort (tracked as DEV-892 and follow-ups) is to
rewrite this content for human readability, aimed at developers, without losing accuracy.

Reference basis: `https://www.cloudpirates.io/` (marketing site, mostly German) and its sitemap,
fetched 2026-07-23 via WebFetch summaries (not full manual reads — re-check the live site if this
note is old). Looked at the managed-observability solutions page and a "101 series" technical blog
post (Kubernetes Probes) as the closest analogues to developer-facing technical writing.

## The core problem to fix

Existing text leans on corporate/AI buzzwords and vague superlatives instead of saying what a
thing actually does. Words/patterns to hunt down and remove or replace when editing docs:

- "comprehensive", "intelligent", "seamless(ly)", "streamline", "leverage", "empower(ing)",
  "unlock", "robust", "cutting-edge", "state-of-the-art", "ecosystem", "journey" (as in "Cloud
  Native journey"), "solution" used as filler, "navigate ... with confidence"
- Feature descriptions that describe a *feeling* ("gain essential visibility", "streamline
  lifecycle management") instead of a *capability* ("scans images for known CVEs", "restarts a
  container when its health check fails")
- Stacked adjective marketing openers ("Complete platform automation with our comprehensive REST
  API") — say what the API lets you do instead

## What the site's own voice actually does (model this instead)

Confirmed from the managed-observability page and the Kubernetes Probes blog post:

- **Concrete over aspirational.** The site says "20+ Best Practice Dashboards" and "30+ Alerting
  Regeln", not "comprehensive monitoring". Prefer real numbers, real tool names (Grafana,
  Prometheus, Loki, Tempo), real behavior over adjectives.
- **Plain, direct language.** No "seamless"/"empower" anywhere in the sampled pages. Technical
  terms are used but not padded with marketing modifiers.
- **Mixed sentence length on purpose** — short declarative sentences (6-8 words) next to longer
  explanatory ones (15+ words) for rhythm. Avoid uniform long marketing-paragraph sentences.
  Reference: "Diese Probe überwacht, ob eine Applikation gerade korrekt läuft. Sollte hierbei ein
  Fehler erkannt werden, so wird die Applikation neu gestartet." (short, then a bit longer.)
- **Direct address to the reader** ("you"/"euch"), not passive third-person "users can...".
- **Analogy or concrete scenario before the technical detail**, not after. The probes article
  grounds the concept in a real-world scenario before showing YAML/kubectl.
- **Examples do the explaining.** Config snippets and command output are used liberally instead of
  prose describing what a config *would* look like.

## Avoid em dashes ("—")

User feedback (2026-07-23): cut down on em dashes. Many readers now treat "—" as a tell-tale sign
of AI-generated text and discount the content on sight, regardless of whether a human wrote it.
Rewrite around it instead of using it as a default connector:

- Two independent clauses: split into two sentences, or use a comma if they're tightly linked.
- Aside/clarification (`X — meaning Y`): use parentheses, or a colon if Y explains X.
- List item "link — description" pattern: use a colon (`link: description`) instead.

Applied to `index.md` this session: `"...applications — all through one API"` became `"...
applications, all through one API"`; `"platform — workspaces, clusters, deployments — is
available"` became `"platform (workspaces, clusters, deployments) is available"`; Quick Links
entries changed from `[Text](url) — description` to `[Text](url): description`.

## Open question — nautical/pirate metaphors

The marketing site leans on nautical metaphors ("Stromschnellen sehen, bevor sie zum Problem
werden", "über die Planke") as brand voice. Working assumption for the developer portal: keep
metaphors minimal-to-none in technical docs (index page, API docs, guides) — developers reading
setup/reference docs want the direct capability, not brand flavor. If the user wants pirate flavor
carried into the dev portal too, that's a deliberate call to confirm with them first, not something
to infer from the marketing site.

## How to apply when rewriting a doc page

1. Read the current page in full first.
2. For every sentence, ask: "what does this actually let a developer do, concretely?" If the
   sentence doesn't survive that question, cut or rewrite it.
3. Replace buzzword-adjective openers with a direct statement of capability.
4. Keep sentences short-to-medium; vary length rather than defaulting to long marketing sentences.
5. Prefer "you" addressing the reader over passive/third-person phrasing.
6. Don't invent nautical metaphors unprompted (see open question above).
7. Don't use em dashes ("—"); rewrite the sentence instead (see section above).
8. Don't change factual/technical claims (endpoints, feature lists, links) without verifying them
   against source. This file is about wording, not content accuracy.

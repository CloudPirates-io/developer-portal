---
paths:
  - "src/**"
---

# Tone & style for developer-portal docs

House style for `docs/`: direct technical writing aimed at developers, not marketing copy. Applies
to new content and edits alike.

Reference basis: `https://www.cloudpirates.io/` (marketing site, mostly German) — specifically its
managed-observability solutions page and a "101 series" technical blog post (Kubernetes Probes) as
the closest analogues to developer-facing technical writing on that site.

## Avoid buzzwords and vague superlatives

Say what a thing actually does instead of describing it with corporate/AI-buzzword adjectives.
Watch for:

- "comprehensive", "intelligent", "seamless(ly)", "streamline", "leverage", "empower(ing)",
  "unlock", "robust", "cutting-edge", "state-of-the-art", "ecosystem", "journey" (as in "Cloud
  Native journey"), "solution" used as filler, "navigate ... with confidence", "user-friendly"
- Feature descriptions that describe a _feeling_ ("gain essential visibility", "streamline
  lifecycle management") instead of a _capability_ ("scans images for known CVEs", "restarts a
  container when its health check fails")
- Stacked adjective marketing openers ("Complete platform automation with our comprehensive REST
  API") — say what the API lets you do instead

## What the site's own voice actually does (model this instead)

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
  prose describing what a config _would_ look like.

## Avoid em dashes ("—")

Many readers treat "—" as a tell-tale sign of AI-generated text and discount the content on sight,
regardless of whether a human wrote it. Rewrite around it instead of using it as a default
connector:

- Two independent clauses: split into two sentences, or use a comma if they're tightly linked.
- Aside/clarification (`X — meaning Y`): use parentheses, or a colon if Y explains X.
- List item "link — description" pattern: use a colon (`link: description`) instead.

Examples: `"...applications — all through one API"` becomes `"...applications, all through one
API"`; `"platform — workspaces, clusters, deployments — is available"` becomes `"platform
(workspaces, clusters, deployments) is available"`; a Quick Links entry `[Text](url) —
description` becomes `[Text](url): description`.

## Cut duplicate information, not just buzzwords

Separate from the buzzword list above: actively hunt for facts restated somewhere they're already
established (a header, the example right below, an adjacent sentence). This reads as
padding/AI-verbosity even when none of the individual words are marketing-speak.

Patterns to watch for, with examples:

- A heading followed by prose that just restates the heading, e.g. `## 502 Bad Gateway` followed by
  "Our API gateway returns a 502 Bad Gateway status..." Rewrite the prose to not repeat the status
  the header already names ("Our API gateway returns this status when...").
- A sentence describing a shape immediately followed by an example showing that exact shape, e.g.
  "Requests... use a different, flatter shape (no `instancePath`/`schemaPath`/`keyword`)"
  immediately above a JSON example demonstrating it. Drop the parenthetical; let the example
  demonstrate it.
- Restating a word already implied by context, e.g. "Our internal backend system uses asynchronous
  handlers..." tightens to "Our system uses asynchronous handlers...".
- Naming a concept more times than needed per sentence, e.g. "authenticate your requests using an
  `API key` included in the Authorization header of your HTTP requests. Obtain an API key by
  signing up..." names the concept three times across two sentences. Tighten to "authenticate your
  requests using an `ApiKey` included in the `Authorization` header. Obtain one by signing up...":
  state the term once per sentence, use a pronoun ("one") on the repeat instead of respelling it,
  and match the actual casing the API expects.
- When two response shapes exist for what's conceptually the same error (e.g. 401/403 sometimes
  under `status`, sometimes under `code`, depending on which middleware rejects the request) and
  that's a real inconsistency rather than deliberate design, say so plainly instead of presenting
  it as intentional: "The response shape depends on which check rejected the request (this might
  be unified in the future)."

## "Header, then just a link" is a duplication smell too, not only prose

Watch for a section where every item is a bold mini-heading with a one-line description
immediately followed by "[Learn more →](...)" and nothing else, especially when the page's own
"Related Resources" section at the bottom links to the exact same pages. This reads as a header
pointing at a link, not actual content — it carries zero information a reader couldn't get from the
nav or the bottom list. Fix by turning it into a real numbered how-to (one instruction per step,
e.g. "Add your billing information at portal.cloudpirates.io/billing", with the doc link folded in
as a "see X for details" trailer), and consider deleting a "Related Resources" section that becomes
fully redundant with the list right above it.

The same "two sections describing the same thing" smell can also show up as duplicated _field
lists_ rather than duplicated links. If a page has both a "how to do X" procedure and a "what X's
parts mean" reference right next to each other, the procedure should point at the reference instead
of restating it, e.g. "3. Enter your billing information (see Billing Information below for what
each field means)" instead of re-listing every field inline.

When adding a second example to illustrate a mechanism (e.g. a second set of response headers),
prefer values tied to a concrete, stated scenario over repeating the same defaults already shown
elsewhere in the page — e.g. a response-headers example using `x-Limit: 5` / `x-Offset: 40` with
"these headers would be returned alongside items 40 through 44", instead of reusing the
`limit=20&offset=0` defaults already shown in the query-parameters example.

## Some duplicate information is intentional — don't strip it

Not all repetition is padding. Before deduping a repeated fact, check whether a reader could land
directly on the section/page repeating it (via an anchor link, a nav entry, or by opening one file
without the other) without ever seeing the "original" instance. If so, keep both copies so each
section/page stays self-contained.

Examples of intentional duplication, don't merge or remove these patterns:

- A warning box repeated verbatim across two sibling sections, e.g. an "Asynchronous Request
  Processing" warning box that appears in both `## 503 Service Unavailable` and `## 504 Gateway
Timeout` in `docs/api/error-handling.md`. A reader jumping straight to `#504-gateway-timeout` from
  a link elsewhere would otherwise miss it.
- The same explanation appearing in two different files at the two places a reader is likely to
  land, e.g. the eventually-consistent-read-models explanation in both `docs/api/index.md` (under
  `## Event Sourced Architecture`) and `docs/api/error-handling.md` (in the `## 404 Not Found`
  warning box) — a reader who opens `error-handling.md` directly, without having read `index.md`
  first, still needs the context for why a fresh `GET` can 404.
  - When two copies like this exist across files, keep their wording in sync. If you improve one,
    check the other and update it to match rather than letting them drift.

## Wrap long source lines (cosmetic only, doesn't change the rendered page)

Markdown collapses soft line breaks: two source lines with no blank line between them render as
one continuous paragraph, wrapped by the reader's viewport width. So breaking a long line into
several shorter ones in the `.md` source is a purely visual change to the source file. It does not
add a line break, paragraph break, or any other change in the rendered developer portal.

Do this anyway: long unbroken lines in the source force horizontal scrolling for anyone reading the
raw file in an editor or a narrow diff view. Wrap prose lines at roughly 100 characters (matching
the width already used across `.claude/rules/*.md` in this repo), never in the middle of an
inline-code span (`` `like this` ``) or a `[link](url)`.

Prefer breaking at a sentence boundary over a mid-sentence clause boundary, when the line stays
under the ~100-character target either way. It's not a hard rule (a clause break is fine when a
sentence is long enough that a sentence-boundary break would leave one line much longer than the
other, or when there's no earlier sentence break to use), just the better default when both options
fit. For example, prefer:

```
Our base URL for API requests is `https://api.cloudpirates.io/v1`.
Prepend it to every endpoint path below.
```

over:

```
Our base URL for API requests is `https://api.cloudpirates.io/v1`. Prepend it to every endpoint
path below.
```

Exceptions, don't wrap these:

- Markdown table rows: breaking mid-row breaks the table syntax. Long table cells are an accepted
  tradeoff of using a table at all.
- Fenced code blocks and raw URLs on their own line: these must stay intact.
- List item continuation lines: if you do wrap a bullet's text, indent the continuation to line up
  with the bullet's content (2 spaces past a `- ` marker) so it stays part of the same list item
  instead of starting a new paragraph or breaking out of the list.

## Headings and box titles use Title Case, including short verbs

Applies to `#`/`##`/`###` headings and VitePress container titles (`::: warning Some Title`). For
example, `## What is WebAuthn?` should be `## What Is WebAuthn?`.

The rule (standard Title Case, matches Chicago/APA conventions, not something specific to this
repo): capitalize every word except articles (`a`, `an`, `the`), coordinating conjunctions (`and`,
`but`, `or`, `nor`), and prepositions (`of`, `in`, `on`, `at`, `to`, `with`, `for`, `from`, `by`,
...), regardless of how short those are. Always capitalize the first and last word of the title.

The trap: short verbs look like the "small words" that get lowercased, but verbs are never in the
lowercase list, so they're capitalized regardless of length. "Is", "Be", "Do", "Am", "Are" stay
capitalized. Compare correctly-lowercased prepositions (`### Setup with QR Code`, `### Logout from
Session`, `::: warning ... Required for Session Management`) against the verb case: "is" is the
sentence's verb ("What [is] WebAuthn"), not a preposition, so it capitalizes.

## State what is, not what isn't

Drop the negative half of "this is X, not Y" constructions and just write "this is X". Same for
standalone absence statements ("there is no separate Category field", "disk usage is not collected
anywhere", "the API doesn't block this"). A reader gains nothing from a sentence whose content is
that a convenience they never asked about is missing; it reads as "here's a nice feature, which
doesn't exist, thanks for nothing".

Wrong: "Status is read off the pod manifest, not a separate monitoring feature." / "Severity is
`INFO`, `LOW`, `MEDIUM`, or `HIGH`, there is no `Critical` tier." / "Events aren't embedded in the
pod fetch, see the separate events endpoint."

Right: "Status is read off the pod manifest." / "Severity is `INFO`, `LOW`, `MEDIUM`, or `HIGH`." /
"Events come from the cluster-wide events endpoint."

Two things this doesn't cover. Warnings about real consequences stay, just phrased positively:
"Deleting your last authentication method locks you out" rather than "removing it is not blocked by
the API". And a contrast between two things that both exist is fine when it prevents a concrete
mistake, e.g. `workspaceMemberId` versus `identityId`.

## Every feature is documented in plain present tense

Every page describes what the platform does, in plain present tense, with no hedging about
availability. No "planned", "not yet implemented", "coming soon", "once this ships", "will be", or
"would" anywhere, and no disclaimer boxes carrying that signal. If a capability belongs in the
docs, it is written the same way as every other capability.

Wrong: "Paid features will be enabled immediately once this ships." /
`::: warning You'll Be Responsible for All Workspace Charges` / "Kubernetes event monitoring today;
CVE scanning and resource recommendations are on the roadmap."

Right: "Paid features are enabled immediately." /
`::: warning You Are Responsible for All Workspace Charges` / "Kubernetes event monitoring, CVE
scanning, and resource recommendations."

This holds for feature lists too: list capabilities plainly, without splitting them into
available-now and later groups.

## Open question — nautical/pirate metaphors

The marketing site leans on nautical metaphors ("Stromschnellen sehen, bevor sie zum Problem
werden", "über die Planke") as brand voice. Working assumption for the developer portal: keep
metaphors minimal-to-none in technical docs (index page, API docs, guides) — developers reading
setup/reference docs want the direct capability, not brand flavor. If the user wants pirate flavor
carried into the dev portal too, that's a deliberate call to confirm with them first, not something
to infer from the marketing site.

## Don't change facts while fixing wording

This file governs wording, not content accuracy. Don't change factual/technical claims (endpoints,
feature lists, links) as a side effect of a style pass, without verifying them against source
separately.

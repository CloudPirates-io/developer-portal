---
paths:
  - "docs/**"
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
  Native journey"), "solution" used as filler, "navigate ... with confidence", "user-friendly"
  (found in `docs/authentication/*.md`, 2026-07-23: "designed to be flexible, secure, and
  user-friendly", "user-friendly interface")
- Feature descriptions that describe a _feeling_ ("gain essential visibility", "streamline
  lifecycle management") instead of a _capability_ ("scans images for known CVEs", "restarts a
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
  prose describing what a config _would_ look like.

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

## Cut duplicate information, not just buzzwords

Separate from the buzzword list above: actively hunt for facts restated somewhere they're already
established (a header, the example right below, an adjacent sentence). This reads as
padding/AI-verbosity even when none of the individual words are marketing-speak.

Examples fixed in `docs/api/error-handling.md` and `docs/api/pagination.md` (2026-07-23):

- `## 502 Bad Gateway` followed by prose starting "Our API gateway returns a 502 Bad Gateway
  status..." restates the status the header already names. Rewrite the prose to not repeat it
  ("Our API gateway returns this status when...").
- "Requests... use a different, flatter shape (no `instancePath`/`schemaPath`/`keyword`)" was
  redundant once the very next block is a JSON example showing that exact shape. Drop the
  parenthetical; let the example demonstrate it.
- "Our internal backend system uses asynchronous handlers..." repeated "backend" information
  already obvious from context; tightened to "Our system uses asynchronous handlers...".
- When two response shapes exist for what's conceptually the same error (e.g. 401/403 sometimes
  under `status`, sometimes under `code`, depending on which middleware rejects the request) and
  that's a real inconsistency rather than deliberate design, say so plainly instead of presenting
  it as intentional: "The response shape depends on which check rejected the request (this might
  be unified in the future)."
- `docs/api/index.md`'s "authenticate your requests using an `API key` included in the
  Authorization header of your HTTP requests. Obtain an API key by signing up on..." named the
  concept three times ("your requests" twice, "API key" twice, plus "of your HTTP requests" adding
  nothing "your requests" hadn't already said) in two sentences. Fixed to "authenticate your
  requests using an `ApiKey` included in the `Authorization` header. Obtain one by signing up
  on...": state the term once per sentence, use a pronoun ("one") on the repeat instead of
  respelling it, and use the actual casing the API expects (`ApiKey`, matching the `Authorization:
ApiKey <API_KEY>` header example elsewhere on the same page) rather than a looser prose form.

When adding a second example to illustrate a mechanism (e.g. a second set of response headers),
prefer values tied to a concrete, stated scenario over repeating the same defaults already shown
elsewhere in the page. `docs/api/pagination.md`'s response-headers example uses `x-Limit: 5` /
`x-Offset: 40` with the sentence "these headers would be returned alongside items 40 through 44",
instead of reusing the `limit=20&offset=0` defaults already shown in the query-parameters example.

## Some duplicate information is intentional — don't strip it

Not all repetition is padding. Before deduping a repeated fact, check whether a reader could land
directly on the section/page repeating it (via an anchor link, a nav entry, or by opening one file
without the other) without ever seeing the "original" instance. If so, keep both copies so each
section/page stays self-contained.

Confirmed intentional duplicates as of 2026-07-23, don't merge or remove these:

- The "Asynchronous Request Processing" warning box is repeated verbatim in both `## 503 Service
Unavailable` and `## 504 Gateway Timeout` in `docs/api/error-handling.md`. A reader jumping
  straight to `#504-gateway-timeout` from a link elsewhere would otherwise miss it.
- The eventually-consistent-read-models explanation appears in both `docs/api/index.md` (under
  `## Event Sourced Architecture`) and `docs/api/error-handling.md` (in the `## 404 Not Found`
  warning box). Same reasoning: a reader who opens `error-handling.md` directly, without having
  read `index.md` first, still needs the context for why a fresh `GET` can 404.
  - These two copies should stay in sync in wording even though they live in different files. If
    you improve one, check the other and update it to match rather than letting them drift (they
    drifted out of sync once already this session and had to be re-synced).

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

Applies to `#`/`##`/`###` headings and VitePress container titles (`::: warning Some Title`).
Found and fixed 2026-07-23 in `docs/authentication/webauthn.md`: `## What is WebAuthn?` should be
`## What Is WebAuthn?`.

The rule (standard Title Case, matches Chicago/APA conventions, not something specific to this
repo): capitalize every word except articles (`a`, `an`, `the`), coordinating conjunctions (`and`,
`but`, `or`, `nor`), and prepositions (`of`, `in`, `on`, `at`, `to`, `with`, `for`, `from`, `by`,
...), regardless of how short those are. Always capitalize the first and last word of the title.

The trap: short verbs look like the "small words" that get lowercased, but verbs are never in the
lowercase list, so they're capitalized regardless of length. "Is", "Be", "Do", "Am", "Are" stay
capitalized. Compare the correctly-lowercased prepositions already in this codebase (`### Setup
with QR Code`, `### Logout from Session`, `::: warning ... Required for Session Management`, all
in `docs/authentication/`) against the verb case: "is" is the sentence's verb ("What [is] WebAuthn"),
not a preposition, so it capitalizes.

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
8. After the buzzword pass, do a second pass for duplicate information: does this sentence repeat
   something the header, the example right below, or an adjacent sentence already established? Cut
   it if so, unless it's a case where a reader could land on this section/page directly without
   seeing the other instance (see "Some duplicate information is intentional" above).
9. Don't change factual/technical claims (endpoints, feature lists, links) without verifying them
   against source. This file is about wording, not content accuracy.
10. Wrap long lines in the source at ~100 characters (see "Wrap long source lines" above). Purely
    cosmetic, do this on every page you touch regardless of whether you changed the wording.

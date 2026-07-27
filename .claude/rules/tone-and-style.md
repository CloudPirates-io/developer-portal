---
paths:
  - "docs/**"
---

# Tone & style for developer-portal docs

Most docs under `docs/` were originally drafted with older LLMs and read as generic
"AI-management-speech": vague, superlative-heavy marketing copy instead of direct technical
writing. The goal of this file is to rewrite this content for human readability, aimed at
developers, without losing accuracy.

Reference basis: `https://www.cloudpirates.io/` (marketing site, mostly German) — specifically its
managed-observability solutions page and a "101 series" technical blog post (Kubernetes Probes) as
the closest analogues to developer-facing technical writing on that site.

## The core problem to fix

Existing text leans on corporate/AI buzzwords and vague superlatives instead of saying what a
thing actually does. Words/patterns to hunt down and remove or replace when editing docs:

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

## Roadmap disclaimer boxes: title is always "Roadmap", body stays short

For pages (or sections of a page) that describe a planned/not-yet-implemented feature, the
disclaimer box has one fixed shape:

- **Title is always "Roadmap"**, verbatim, every time. Not "Planned Feature, Not Yet Available",
  not "Not Live Yet", not any other one-off phrasing per page. One consistent word means a reader
  recognizes it on sight regardless of which page they're on, the same way `::: warning`/`::: tip`
  box titles are consistent in shape elsewhere in this codebase.
- **Body is one or two short sentences, nothing more:** what's planned, then a link to how it works
  today (if a "today" state exists). Don't write a justification or contrast sentence like "It's
  actually Y, not X" or "Everything below describes the planned behavior, not something you can
  use today" — just state the fact and give the link.
- If a page needs the caveat in more than one place (e.g. a top-of-page box plus another right
  before a set of not-yet-live API examples further down), repeat the same short shape each time
  rather than writing a longer explanation once and a different, shorter one elsewhere. Consistency
  of shape matters more than not repeating the word "planned".
- Don't editorialize the exact technical failure mode inside the box (e.g. "these routes have no
  registered command handler, so a request hangs and times out with `503`/`504` instead of failing
  cleanly"). Keep it to the same short shape as every other Roadmap box on the page — the precise
  mechanism belongs in the relevant `.claude/rules/*.md` audit note, not in reader-facing prose,
  once the box's job (tell the reader not to rely on this) is already done by the word "Roadmap"
  plus one plain sentence.

Example, used at the top of a page:

```
::: danger Roadmap
Most of the features described here are not yet implemented.
:::
```

Optionally, can have a bit more information (but not too much):

```
::: danger Roadmap
Workspace-scoped billing is not implemented yet.
See [Billing Profiles](/billing/billing-profiles.md) for current usage.
:::
```

And again, right before that page's `## API Reference` examples, same shape:

```
::: danger Roadmap
These endpoints aren't live yet and may still change.
See [Billing Profiles](/billing/billing-profiles.md) for how billing works today.
:::
```

## Everything below a "Roadmap" box is written as if already shipped

Only the "Roadmap" box itself carries the "this isn't live yet" signal. Everything else on the
page, the numbered steps, the other tip/warning boxes, the API examples, is worded in plain present
tense as if the feature already exists, exactly like every other page in these docs. Don't hedge
the surrounding prose with "once this ships", "will be", "would", etc.

Wrong: "Paid features will be enabled immediately once this ships." /
`::: warning You'll Be Responsible for All Workspace Charges` / "Once this ships, you'll be
responsible for all charges the workspace incurs...".

Right: "Paid features are enabled immediately." /
`::: warning You Are Responsible for All Workspace Charges` / "You are responsible for all
charges the workspace incurs...".

Reasoning: the "Roadmap" box already told the reader this isn't live. Repeating that caveat in
every sentence below it is the same duplicate-information problem covered above, just spread across
a whole page instead of one paragraph, and it reads as hedging rather than documentation. State the
box once, then document the feature normally.

This holds across a whole page, not just directly below one box. If a page already has a Roadmap
box for a feature (even in an earlier or later section, or on a top-of-page box covering several
features at once), don't re-hedge that same feature with mixed real/planned phrasing somewhere
else on the page, e.g. don't write "Kubernetes event monitoring today; CVE scanning, AI-assisted
insights, and automated resource recommendations are on the roadmap" in a feature list. List the
capabilities plainly ("Kubernetes event monitoring, CVE scanning, AI-assisted insights, and
automated resource recommendations") and let the page's Roadmap box(es) carry the caveat, the same
way a single "planned" tag on a heading isn't repeated in the prose underneath it.

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

---
paths:
  - "node_modules/vitepress/**"
  - "docs/.vitepress/**"
---

# VitePress rendering quirks

Verified by reading the installed `vitepress` package source directly
(`node_modules/vitepress/dist/client/theme-default`), not just docs — re-check against the
installed version if it's been upgraded since these notes were written.

## `themeConfig.nav[].text` supports raw HTML (v-html) — but don't nest an `<a>` in it

`VPNavBarMenuLink.vue` renders each nav item as `<VPLink href="...">≪span v-html="item.text"≫`.
`VPLink` already wraps the item in its own `<a href>`. So `text` can contain arbitrary HTML
(e.g. an `<img>` badge) but must NOT contain another `<a>` — that produces nested anchors. Put only
the inner content (e.g. the `<img>`) in `text`, and use the item's own `link` field for the href.

## `themeConfig.socialLinks[].icon` does NOT support arbitrary badge images

`icon` is typed as `string | { svg: string }` (`VPSocialLink.vue`). A string resolves to a
simple-icons glyph (fetched from iconify at runtime if not bundled); an object provides a raw SVG
string. The surrounding CSS only sizes `:deep(svg)` and `:deep([class^="vpi-social-"])` to a fixed
36×36 (20×20 icon) slot — it does not size `<img>`. A shields.io-style badge dropped in here (e.g.
via the svg-string escape hatch) renders unstyled and breaks the icon row. For account/community
links here, use the built-in icon name (e.g. `"discord"`, `"github"`) for a monochrome icon
consistent with the rest of the row. If a live badge (e.g. member count) is wanted, put it in page
markdown instead (see below), not in `socialLinks`.

## Inline `<img>` in markdown prose needs an explicit `display` override

The default theme's `base.css` resets `img, svg, video, canvas, audio, iframe, embed, object` to
`display: block` globally. An `<img>` badge embedded inline in a markdown list item/sentence (e.g.
a shields.io badge) will drop to its own line despite `vertical-align: middle`, since
`vertical-align` has no effect on block-level elements. Fix: add an inline style that overrides
`display` back, e.g. `style="display:inline-block; vertical-align:middle"` — inline `style`
attributes win over the external stylesheet regardless of selector specificity.

Example:

```html
- 💬 Discord:
<a href="https://discord.gg/XUn9Kt5dsy"
  ><img
    src="https://img.shields.io/discord/1426189195285762150?logo=discord&label=CloudPirates"
    alt="CloudPirates Discord"
    style="display:inline-block; vertical-align:middle"
/></a>
```

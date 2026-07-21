# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

This is Samuel Stephenson's personal website/portfolio (`www.samstephenson.me`), deployed as a static site via GitHub Pages (see `CNAME`). It is plain HTML/CSS/JS — there is no build system, no package manager, no bundler, and no test suite. Pages are edited directly and published by pushing to the `main` branch, which GitHub Pages serves as-is.

## Commands

There is no build, lint, or test tooling in this repo. To preview changes locally, just open the HTML files directly in a browser or serve the directory with any static file server (e.g. `python3 -m http.server`).

## Architecture and conventions

**Page structure**: Each top-level `*.html` file (`index.html`, `about.html`, `cv.html`, `projects.html`, `resources.html`, `testimonials.html`, `work-with-me.html`, `contact.html`, `404.html`) is a fully self-contained page, but shares two files across all of them (see below): `shared.css` for common styling and `icons.svg` for icon markup. Anything left in a page's own inline `<style>` block is genuinely page-specific (layout, component styling for that page's unique cards/sections).

**Shared base styles (`shared.css`)**: Linked via `<link rel="stylesheet" href="shared.css">` in every top-level page's `<head>` (added before the page's own `<style>` block). It holds the CSS reset, the dark gradient body background, the `fadeInUp` keyframe, the `.gradient-text` utility class (the purple→teal gradient-clipped text effect used on page headings and key stats — apply via `class="gradient-text"` rather than repeating the `background`/`background-clip` declarations), and the default footer style. `404.html` intentionally overrides the footer (dimmer color, no top padding) since it sits in a different layout context — that override lives in its own `<style>` block and is expected to diverge from `shared.css`. When adding a new top-level page, link `shared.css` and lean on these shared rules instead of re-declaring them.

**Icon sprite (`icons.svg`)**: A single sprite file holding all site icons as `<symbol id="name" viewBox="0 0 24 24">`, hidden (`style="display:none"`) and referenced via `<svg ...><use href="icons.svg#name"></use></svg>` — the outer `<svg>` keeps its own `fill`/`stroke`/`stroke-width`/sizing attributes (these vary per usage context), only the inner path markup lives in the sprite. `contact.html`'s inline `<script>` also swaps icons at runtime by setting `innerHTML` to a `<use href=\"icons.svg#name\">` string (success/error/reset states) — keep the escaped-quote form there since it's inside a single-quoted JS string. When adding a new icon: check `icons.svg` first for an existing symbol before pasting new raw SVG path data, and give new symbols a short semantic `id` (e.g. `calendar`, `shield-check`).

**Shared navigation (`nav.js`)**: Every page includes `<div id="nav-placeholder"></div>` followed by `<script src="nav.js"></script>`. This script injects the nav bar's CSS and HTML at runtime (rather than duplicating markup per page), handles the mobile menu toggle, highlights the active nav link by matching the current filename against each link's `data-page` attribute, and updates any element with class `footer-year` to the current year. When adding a new top-level page, add a matching `<li><a href="..." data-page="...">` entry inside `nav.js`'s `NAV_HTML` and include the same placeholder/script include, or it won't get the site nav or footer year.

**SEO files**: `robots.txt` allows all crawlers and points to `sitemap.xml`; `sitemap.xml` lists the indexable top-level pages only (excludes `404.html`, which is already `noindex` via its own meta tag, and excludes the deliberately-unlinked `pmp-cram-7c3u9p/` microsite). When adding or removing a top-level page, update `sitemap.xml` to match.

**Contact form**: `contact.html` submits via `fetch` directly to a Formspree endpoint (`https://formspree.io/f/xnjlqdlb`) — there is no server-side code in this repo handling form submissions.

**Unlinked microsite**: `pmp-cram-7c3u9p/index.html` is a standalone tool page not linked from `nav.js` or any other page — it's reachable only via its direct (deliberately obscure) URL. Treat it as independent from the rest of the site's nav/footer conventions.

**Assets**: `images/` holds photos referenced by pages (e.g. `images/sam.jpg`); `documents/` is for downloadable files (currently just a placeholder PDF). `favicon.ico` at the repo root is referenced by every page's `<link rel="icon">`.

**GitHub Actions**: `.github/workflows/claude.yml` runs the Claude Code GitHub Action on PR open/sync and on issue comments, doing automated review with a $2.00 budget cap.

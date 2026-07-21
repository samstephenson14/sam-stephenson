# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

This is Samuel Stephenson's personal website/portfolio (`www.samstephenson.me`), deployed as a static site via GitHub Pages (see `CNAME`). It is plain HTML/CSS/JS — there is no build system, no package manager, no bundler, and no test suite. Pages are edited directly and published by pushing to the `main` branch, which GitHub Pages serves as-is.

## Commands

There is no build, lint, or test tooling in this repo. To preview changes locally, just open the HTML files directly in a browser or serve the directory with any static file server (e.g. `python3 -m http.server`).

## Architecture and conventions

**Page structure**: Each top-level `*.html` file (`index.html`, `about.html`, `cv.html`, `projects.html`, `blog.html`, `resources.html`, `testimonials.html`, `work-with-me.html`, `contact.html`, `404.html`) is a fully self-contained page. Styling for each page lives in a single inline `<style>` block in its own `<head>` — there is no shared stylesheet in active use. `styles.css` and `cv.css` at the repo root are legacy files not referenced by any current page; don't assume editing them affects the live site.

**Shared navigation (`nav.js`)**: Every page includes `<div id="nav-placeholder"></div>` followed by `<script src="nav.js"></script>`. This script injects the nav bar's CSS and HTML at runtime (rather than duplicating markup per page), handles the mobile menu toggle, highlights the active nav link by matching the current filename against each link's `data-page` attribute, and updates any element with class `footer-year` to the current year. When adding a new top-level page, add a matching `<li><a href="..." data-page="...">` entry inside `nav.js`'s `NAV_HTML` and include the same placeholder/script include, or it won't get the site nav or footer year.

**Contact form**: `contact.html` submits via `fetch` directly to a Formspree endpoint (`https://formspree.io/f/xnjlqdlb`) — there is no server-side code in this repo handling form submissions.

**Unlinked microsite**: `pmp-cram-7c3u9p/index.html` is a standalone tool page not linked from `nav.js` or any other page — it's reachable only via its direct (deliberately obscure) URL. Treat it as independent from the rest of the site's nav/footer conventions.

**Assets**: `images/` holds photos referenced by pages (e.g. `images/sam.jpg`); `documents/` is for downloadable files (currently just a placeholder PDF).

**GitHub Actions**: `.github/workflows/claude.yml` runs the Claude Code GitHub Action on PR open/sync and on issue comments, doing automated review with a $2.00 budget cap.

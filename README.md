# Apache ManifoldCF™ Website

Source repository for the official **Apache ManifoldCF™** website, built with [Astro](https://astro.build/).

- **GitHub Pages Preview:** `https://apache.github.io/manifoldcf-site/` (published automatically from `main` to `gh-pages`)
- **Production Website:** `https://manifoldcf.apache.org/` (published manually from `main` to `asf-site`)
- **Technical Documentation:** [Apache ManifoldCF GitHub Wiki](https://github.com/apache/manifoldcf/wiki)

## Local Development

Requires **Node.js 22+**.

```bash
npm install
npm run dev
```

Open `http://localhost:4321/` to preview changes live.

## Build Targets

The same Astro source builds for both GitHub Pages (under `/manifoldcf-site`) and ASF Production (at `/`):

```bash
# Type-check Astro templates & content collections
npm run check

# Build for GitHub Pages preview (https://apache.github.io/manifoldcf-site/)
npm run build:gh-pages

# Build for ASF production (https://manifoldcf.apache.org/)
npm run build:asf
```

## Writing Blog Posts

Add a new Markdown file under `src/content/blog/<slug>.md` with frontmatter:

```markdown
---
title: "Your Article Title"
description: "Short SEO summary for search engines and social previews."
pubDate: 2026-11-26
author: "Your Name"
tags: ["Release", "Architecture"]
summary: "Brief teaser displayed on the Blog index and Home page."
---

Article body in standard Markdown...
```

New posts are automatically listed on `/`, `/blog/`, and included in `/rss.xml` and the XML sitemap.

## Deployment Workflows

1. **GitHub Pages Preview (`.github/workflows/deploy-gh-pages.yml`):**
   - Runs automatically on every push to `main` (and validates builds on PRs).
   - Publishes `dist/` to the `gh-pages` branch, served via `.asf.yaml` (`ghp_branch: gh-pages`, `ghp_path: /`).
2. **Production ASF Publishing (`.github/workflows/publish-asf-site.yml`):**
   - Manual `workflow_dispatch` only (requires typing `PUBLISH`).
   - Builds with `SITE_BASE=/` and syncs into `asf-site`'s `content/` directory while **preserving `content/release/`** (historical release manuals and Javadocs).

## License

Licensed under the [Apache License, Version 2.0](LICENSE).

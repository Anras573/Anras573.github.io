# Application Review: Anras573.github.io

**Date:** June 22, 2026
**Project:** Personal Online CV/Resume Website
**Live URL:** https://anbora.dk
**Reviewed revision:** `master` @ Eleventy 3.1.6

---

## Executive Summary

This is a lean, well-architected personal CV/resume site built with **11ty (Eleventy)** and **Nunjucks**. Content is data-driven (fetched from an external JSON Resume document), styling is componentised and inlined/minified at build time, and deployment is fully automated to GitHub Pages. The codebase is small, readable, and does its one job well.

Since the previous review (Jan 2026), several recommendations have already been implemented — most notably **error handling with a fallback** in the data layer and the addition of a **LICENSE** file. The remaining issues are minor and mostly cosmetic, with two worth prompt attention: unintended publishing of internal Markdown docs, and an attribute typo on the contact link.

**Overall Rating: 8.5 / 10**

---

## Project Overview

| Aspect | Detail |
|--------|--------|
| Purpose | Personal online CV for Anders Bo Rasmussen (Senior Software Engineer) |
| Generator | 11ty (Eleventy) `v3.1.6` |
| Templating | Nunjucks (`.njk`) |
| Styling | Hand-written CSS with custom properties, minified via `clean-css` and inlined |
| PDF | Puppeteer `v25.1.0` (optional, manual `npm run generate-pdf`) |
| Data source | `resume.json` fetched from an external GitHub repo, cached 1 day via `@11ty/eleventy-fetch` |
| Hosting | GitHub Pages + custom domain (`anbora.dk`) via `peaceiris/actions-gh-pages` |
| Build time | ~0.5s, 4 files emitted |

### Architecture at a glance

```
index.njk ──> layouts/main.njk ──> components/*.njk (+ paired *.css)
                                   └─ bundle-css.njk  (concat → cssmin → inline <style>)
_data/resume.js ──> external JSON Resume (cached)
.eleventy.js    ──> filters (cssmin) + shortcodes (address, profile, daterange, keywords)
```

---

## Strengths

### Architecture & organisation
- **Clean separation of concerns.** Each section is a self-contained component with a paired `.njk` and `.css` file under `_includes/components/`, assembled by `bundle-css.njk` and `index.njk`. Easy to reason about and extend.
- **Data-driven content.** Resume copy lives in an external JSON Resume document, so updating the CV needs no code change. The `jsonresume.org` schema is a sensible, portable choice.
- **Maintainable build config.** `.eleventy.js` is concise and the custom shortcodes (`address`, `profile`, `daterange`, `keywords`) keep templates declarative.

### Resilience (improved since last review)
- `_data/resume.js` now wraps the fetch in `try/catch` and returns **minimal fallback `basics`** so a network/upstream failure degrades gracefully instead of breaking the build. This was a gap in the prior review and is now closed.
- External data is fetched over HTTPS and cached for 1 day, reducing build-time flakiness and upstream load.

### Performance
- CSS is concatenated, **minified, and inlined** — no render-blocking stylesheet requests.
- **Zero client-side JavaScript** and a small HTML payload.
- Static output with `preconnect` hints for the font origins, and the Google Fonts URL already uses `display=swap`.

### Build & deployment
- **Automated CI/CD**: push to `master` builds and deploys to GitHub Pages with the correct `CNAME`.
- `.nojekyll` correctly disables Jekyll processing.
- **Dependabot** keeps dependencies current (the recent history is almost entirely dependency bumps that merge cleanly).

### Print / PDF
- A dedicated `print.css` and `page-break` handling produce a clean A4 PDF via Puppeteer, and `print-d-none` hides the profile image from print output.

---

## Issues & Recommendations

### High priority

**1. Internal Markdown docs are published to the live site.**
Because `README.md` and `PROJECT_REVIEW.md` sit at the repo root, Eleventy treats them as content and emits them as pages:

```
_site/PROJECT_REVIEW/index.html
_site/README/index.html
```

So `https://anbora.dk/PROJECT_REVIEW/` and `/README/` are publicly reachable. For a personal CV this is mostly noise (and slightly unprofessional to leak an internal review), but it's almost certainly unintended. (Note: this review file would be published the same way.)

*Fix options:*
- Add `eleventyExcludeFromCollections` + `permalink: false` front matter to the docs, **or**
- Set `ignores` in `.eleventy.js` / add an `.eleventyignore` file listing `*.md` you don't want rendered, **or**
- Move docs into a `docs/` folder that is excluded from the input.

**2. Attribute typo on the website link.** `_includes/components/contact.njk:20`:

```html
<a href="{{ resume.basics.url }}" targer="_blank">{{ resume.basics.url }}</a>
```

`targer` should be `target`. The link therefore opens in the same tab rather than a new one.

### Medium priority

**3. `target="_blank"` links lack `rel="noopener noreferrer"`.** The profile links in `.eleventy.js` (`profile` shortcode) and the contact link open in a new tab without `rel`. Add `rel="noopener noreferrer"` for security (reverse-tabnabbing) and to drop the implicit `Referer` leak.

**4. Build-time dependency vulnerabilities.** `npm audit` reports **5 vulnerabilities (4 moderate, 1 high)**, all in transitive *build* dependencies (`gray-matter` → `js-yaml`, and `picomatch`). Runtime risk is effectively nil for a static site, but `npm audit fix` (or an Eleventy bump once upstream patches land) keeps the supply chain clean and CI quiet.

**5. Accessibility of icon-only links.**
- The GitHub/LinkedIn/email/website links are accompanied by decorative SVGs that should carry `aria-hidden="true"` and `focusable="false"`.
- Icon-only affordances should expose an accessible name via `aria-label` (e.g. `aria-label="GitHub profile"`).
- Consider a "skip to content" link and verifying visible focus indicators. Color contrast of the accent link color (`--b: #3fcef6`) on white should be checked against WCAG AA for body-size text.

### Low priority / polish

- **SVG duplication.** GitHub/LinkedIn icon markup is embedded inline in `.eleventy.js`. Fine at this scale, but an SVG `<symbol>` sprite or a small data file would DRY it up if more networks are added.
- **No automated checks.** A lightweight CI step — `html-validate` on `_site`, a link check, or `pa11y` for a11y — would catch regressions like the `targer` typo automatically. There are currently no tests.
- **No linter/formatter.** ESLint/Prettier + an `.editorconfig` would standardise the (currently mixed) indentation across `.njk`/`.css`/`.js`.
- **Magic values in CSS.** A few hardcoded sizes; mostly centralised in `variables.css` already, which is good.
- **Two overlapping CI workflows.** `nodejs.yml` (build on every push) and `eleventy-build.yml` (build + deploy on `master`) both run `npm ci && npm run build` on a `master` push. Harmless, but the build runs twice; you could let the deploy workflow be the single source of truth or gate `nodejs.yml` to PRs/non-`master` branches.
- **Schema trust.** Fetched JSON is rendered without validation. Low risk (you control the source), but a quick shape check would harden the build against a malformed upstream edit.

---

## Quick wins checklist

- [ ] Exclude `README.md` / `PROJECT_REVIEW.md` (and this file) from the published output
- [ ] Fix `targer` → `target` in `contact.njk`
- [ ] Add `rel="noopener noreferrer"` to all `target="_blank"` links
- [ ] `npm audit fix` (or bump Eleventy) to clear build-time advisories
- [ ] Add `aria-hidden="true"` to decorative SVGs and `aria-label` to icon links

---

## Scorecard

| Category | Rating | Notes |
|----------|:------:|-------|
| Architecture & code organisation | ★★★★★ | Clean, modular, easy to follow |
| Performance | ★★★★★ | Inlined/minified CSS, no JS, tiny payload |
| Build & deployment | ★★★★☆ | Solid CI/CD; minor workflow duplication |
| Resilience / error handling | ★★★★☆ | Fallback now in place; no schema validation |
| Accessibility | ★★★☆☆ | Good semantics; icon links need ARIA |
| Security | ★★★★☆ | Build-time advisories only; add `rel`, CSP optional |
| Testing & tooling | ★★☆☆☆ | No tests, linter, or formatter |
| Documentation | ★★★★☆ | Clear README; LICENSE present |

---

## Conclusion

A polished, purpose-built personal site that makes good engineering choices for what it is: data-driven content, componentised styling, a fast static build, and hands-off deployment. The team (i.e. the author) has already acted on the previous review's most important point by adding graceful data-fetch fallback.

What's left is small. The only items I'd treat as more than cosmetic are **stopping the internal Markdown docs from being published** and the **`targer` typo** on the contact link — both are quick fixes. Address those plus the `rel`/ARIA touch-ups and this comfortably sits at a **9/10**.

**Final verdict: 8.5 / 10** — a clean, professional codebase with only minor, easily-resolved gaps.

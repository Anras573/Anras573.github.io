# Project Review: Anras573.github.io

**Date:** January 20, 2026  
**Reviewer:** GitHub Copilot  
**Project:** Personal Online CV/Resume Website  
**Live URL:** https://anbora.dk

---

## Executive Summary

This is a well-structured personal CV/resume website built using modern static site generation with 11ty (Eleventy). The project demonstrates good practices in web development, including separation of concerns, data-driven content, and automated deployment. The site is clean, professional, and optimized for both screen and print output.

**Overall Rating: 8/10**

---

## Project Overview

### Purpose
A personal online CV/resume for Anders Bo Rasmussen, a Senior Software Engineer. The website fetches resume data from a JSON Resume repository and generates a static HTML page with PDF generation capabilities.

### Tech Stack
- **Static Site Generator:** 11ty (Eleventy) v3.1.2
- **Template Engine:** Nunjucks (.njk)
- **Styling:** CSS3 with custom properties (CSS variables)
- **PDF Generation:** Puppeteer v24.35.0
- **Hosting:** GitHub Pages with custom domain (anbora.dk)
- **Data Source:** JSON Resume format from external GitHub repository

---

## Strengths

### 1. **Architecture & Code Organization** ⭐⭐⭐⭐⭐
- **Excellent separation of concerns:** Components are well-organized in `_includes/components/` with paired `.njk` and `.css` files
- **Data-driven approach:** Resume content is fetched from an external JSON source, making it easy to update without touching code
- **Modular components:** Each section (header, experience, education, skills, etc.) is a separate reusable component
- **Clean configuration:** `.eleventy.js` provides custom filters and shortcodes in a maintainable way

### 2. **Modern Web Standards** ⭐⭐⭐⭐⭐
- **Responsive design:** Grid layout that adapts from desktop (960px) to mobile
- **Semantic HTML:** Proper use of HTML5 semantic elements (`<header>`, `<section>`, `<article>`, `<aside>`, `<main>`)
- **SEO optimized:** Comprehensive meta tags including Open Graph and Twitter Card support
- **Print-friendly:** Dedicated print styles with page-break controls for PDF generation
- **Web fonts:** Google Fonts integration for typography (Roboto, Open Sans)
- **Accessibility:** Alt text on images, semantic markup

### 3. **Build & Deployment Pipeline** ⭐⭐⭐⭐⭐
- **Automated CI/CD:** GitHub Actions workflow for automatic deployment on push to master
- **Fast builds:** 11ty builds in under 1 second (~0.90s)
- **Static output:** No runtime dependencies, excellent performance
- **Custom domain:** Proper CNAME configuration for anbora.dk
- **No Jekyll conflicts:** `.nojekyll` file prevents Jekyll processing on GitHub Pages

### 4. **Developer Experience** ⭐⭐⭐⭐
- **Clear README:** Good installation instructions and usage documentation
- **Simple commands:** `npm run dev` for development, `npm run build` for production
- **Hot reload:** Development server with live reloading
- **Version control:** Proper `.gitignore` for Node.js, IDEs, and build artifacts
- **Package management:** Clear dependency specification with engines requirement

### 5. **CSS Quality** ⭐⭐⭐⭐
- **CSS Variables:** Centralized color scheme and spacing in `variables.css`
- **CSS Minification:** Inline styles are minified using `clean-css`
- **No external CSS dependencies:** Lightweight, no bloated frameworks
- **Mobile-first approach:** Responsive breakpoints at 960px
- **Print optimization:** Dedicated print media queries

---

## Areas for Improvement

### 1. **Security Vulnerabilities** ⚠️ **Critical**
**Issue:** Moderate severity vulnerability in `js-yaml` dependency
```
js-yaml <3.14.2 || >=4.0.0 <4.1.1
Severity: moderate
Prototype pollution in merge (<<)
```

**Impact:** This vulnerability exists in a transitive dependency through `@11ty/eleventy`

**Recommendation:**
```bash
npm audit fix
```
This should update to a patched version. If it persists, consider updating Eleventy or waiting for upstream fixes.

**Priority:** Medium (Low actual risk since this is a build-time dependency, not runtime)

### 2. **Error Handling** ⭐⭐⭐
**Issues:**
- No error handling in `_data/resume.js` if the external API fails
- `generate-pdf.js` assumes localhost:8080 is running without checking
- No fallback if Google Fonts CDN fails to load

**Recommendations:**
```javascript
// In _data/resume.js
export default async function() {
    try {
        const url = "https://raw.githubusercontent.com/Anras573/json-resume/main/resume.json";
        const response = await eleventyFetch(url, {
            duration: "1d",
            type: "json"
        });
        return response;
    } catch (error) {
        console.error("Failed to fetch resume data:", error);
        // Return minimal fallback data
        return { basics: { name: "Anders Bo Rasmussen" } };
    }
}
```

### 3. **Testing** ⭐⭐
**Issues:**
- No automated tests for build process
- No validation of generated HTML
- No link checking
- No accessibility testing

**Recommendations:**
- Add HTML validation (e.g., using `html-validate`)
- Add link checker to ensure no broken links
- Add accessibility testing (e.g., using `pa11y`)
- Add basic smoke tests for the build process

**Example test structure:**
```json
"scripts": {
  "build": "npx @11ty/eleventy",
  "dev": "npx @11ty/eleventy --serve",
  "generate-pdf": "node ./generate-pdf.js",
  "test": "npm run test:build && npm run test:html",
  "test:build": "npm run build",
  "test:html": "html-validate _site/**/*.html"
}
```

### 4. **Documentation** ⭐⭐⭐
**Issues:**
- No contributing guidelines beyond basic fork/PR flow
- No explanation of the component structure
- Missing documentation about custom Eleventy filters and shortcodes
- No changelog or version history
- Missing license file (mentioned in README but not present)

**Recommendations:**
- Add `CONTRIBUTING.md` with detailed guidelines
- Add inline JSDoc comments in `.eleventy.js`
- Add `CHANGELOG.md` to track versions
- Add `LICENSE` file (MIT as specified in package.json)
- Document the JSON Resume schema expectations

### 5. **Browser Compatibility** ⭐⭐⭐
**Issues:**
- Uses modern CSS features (Grid, Custom Properties) without fallbacks
- No autoprefixer for CSS vendor prefixes
- No polyfills specified

**Recommendations:**
- Consider adding PostCSS with autoprefixer
- Add browserslist configuration
- Or explicitly document supported browsers (modern browsers only)

### 6. **Performance Optimization** ⭐⭐⭐⭐
**Current:** Good, but could be better

**Potential improvements:**
- Font loading strategy: Consider `font-display: swap` for better perceived performance
- SVG icons are inline (good) but repeated - could be sprites or symbols
- No image optimization pipeline
- Google Fonts loaded from CDN (adds external dependency)

**Recommendations:**
```html
<!-- Add font-display to Google Fonts URL -->
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
```

### 7. **Code Quality Tools** ⭐⭐
**Missing:**
- No linter (ESLint)
- No code formatter (Prettier)
- No pre-commit hooks
- No editor config

**Recommendations:**
```bash
npm install --save-dev eslint prettier husky lint-staged
```

Add `.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 100
}
```

### 8. **Dependency Management** ⭐⭐⭐
**Issues:**
- Puppeteer is heavy (downloads Chrome binary) but only used for optional PDF generation
- No lockfile verification in CI
- Dependabot configured but creates dependency PRs without automated testing

**Recommendations:**
- Move Puppeteer to `optionalDependencies` since it's not required for the main build
- Add `npm ci --ignore-scripts` option to skip Puppeteer downloads in CI
- Add automated tests that run on Dependabot PRs

---

## Code Quality Analysis

### Good Practices Observed
✅ Semantic HTML structure  
✅ Modular component architecture  
✅ CSS custom properties for theming  
✅ Responsive design with mobile considerations  
✅ Print stylesheet for PDF generation  
✅ ES6+ module syntax  
✅ Git ignore properly configured  
✅ Automated deployment pipeline  
✅ Custom shortcodes for reusable template logic  
✅ External data source separation  

### Code Smells Detected
⚠️ Inline SVG duplication (GitHub, LinkedIn icons repeated)  
⚠️ Magic numbers in CSS (e.g., `150px` for profile image)  
⚠️ Hardcoded URLs in multiple places  
⚠️ No TypeScript for type safety  
⚠️ Mixed indentation in some files (spaces vs tabs)  

---

## Accessibility Review

### ⭐⭐⭐⭐ (Good)

**Strengths:**
- Semantic HTML structure
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text on profile image
- Sufficient color contrast (needs verification)
- Responsive text sizing

**Improvements needed:**
- Add `lang` attribute to SVG icons (already has `lang="en"` on html)
- Consider ARIA labels for icon links
- Test with screen readers
- Add skip navigation link
- Ensure focus indicators are visible

---

## Security Review

### ⭐⭐⭐ (Fair)

**Findings:**

1. **Dependency Vulnerability** (Medium)
   - js-yaml prototype pollution vulnerability
   - Fix: Run `npm audit fix`

2. **External Data Fetching** (Low risk)
   - Fetches JSON from GitHub
   - Using HTTPS (good)
   - Cached for 1 day (good)
   - No validation of fetched data schema

3. **No Content Security Policy** (Informational)
   - Could add CSP headers via meta tag or hosting configuration
   - Would protect against XSS attacks

4. **Inline Styles** (Informational)
   - CSS is inline (good for performance)
   - No user-generated content (no XSS risk)

5. **External Dependencies** (Low risk)
   - Google Fonts loaded from CDN
   - Consider self-hosting fonts for privacy

**Recommendations:**
- Add CSP meta tag
- Validate JSON Resume schema
- Consider self-hosting fonts
- Add Subresource Integrity (SRI) for Google Fonts

---

## Performance Analysis

### ⭐⭐⭐⭐⭐ (Excellent)

**Build Performance:**
- Build time: ~0.90 seconds
- 3 pages generated
- Minimal dependencies

**Runtime Performance (estimated):**
- Static HTML: Excellent
- CSS inline: No render-blocking
- Single HTTP request for fonts: Good
- No JavaScript runtime: Excellent
- Small page size: ~25KB HTML

**Potential improvements:**
- Self-host fonts to reduce DNS lookups
- Add resource hints (preconnect already used)
- Consider service worker for offline capability

---

## Maintenance & Sustainability

### ⭐⭐⭐⭐ (Good)

**Strengths:**
- Simple architecture
- Minimal dependencies
- Automated deployment
- Clear separation of data and presentation
- Active dependency updates via Dependabot

**Risks:**
- Single external data source (GitHub raw content)
- No monitoring or error reporting
- Manual PDF generation process
- No backup strategy for resume data

**Recommendations:**
- Add health check endpoint or status page
- Set up error monitoring (e.g., Sentry)
- Automate PDF generation in CI
- Consider versioning resume.json

---

## Best Practices Compliance

| Practice | Status | Notes |
|----------|--------|-------|
| Version Control | ✅ | Git with proper .gitignore |
| README | ✅ | Clear and comprehensive |
| CI/CD | ✅ | GitHub Actions deployment |
| Dependency Management | ⚠️ | npm, but needs audit fix |
| Code Organization | ✅ | Well-structured components |
| Documentation | ⚠️ | README good, inline docs minimal |
| Testing | ❌ | No automated tests |
| Linting | ❌ | No linter configured |
| Security | ⚠️ | One vulnerability to fix |
| Accessibility | ✅ | Good semantic HTML |
| Performance | ✅ | Static site, inline CSS |
| Error Handling | ⚠️ | Minimal error handling |

---

## Recommendations Priority Matrix

### High Priority (Do First)
1. **Fix security vulnerability** - Run `npm audit fix`
2. **Add error handling** - Graceful degradation for data fetching
3. **Add LICENSE file** - MIT license as specified
4. **Add basic tests** - Build validation and HTML checking

### Medium Priority (Do Soon)
5. **Add ESLint and Prettier** - Code quality and consistency
6. **Improve documentation** - CONTRIBUTING.md, inline comments
7. **Add accessibility testing** - Automated a11y checks
8. **Move Puppeteer to optionalDependencies** - Reduce install size

### Low Priority (Nice to Have)
9. **Add CSP headers** - Extra security layer
10. **Self-host fonts** - Privacy and performance
11. **Add TypeScript** - Type safety
12. **Create component documentation** - Explain architecture
13. **Add changelog** - Track version history

---

## Comparison to Industry Standards

### JSON Resume Standard ✅
- Follows jsonresume.org format
- Proper schema usage
- External data source

### Static Site Best Practices ✅
- Fast build times
- Minimal dependencies
- Optimized output

### Modern Web Standards ✅
- Semantic HTML5
- Responsive design
- Accessibility considerations

### DevOps Best Practices ⚠️
- CI/CD: ✅ Yes
- Automated testing: ❌ No
- Monitoring: ❌ No
- Error reporting: ❌ No

---

## Conclusion

This is a **well-crafted personal CV website** that demonstrates solid understanding of modern web development practices. The use of 11ty for static site generation, the modular component architecture, and the automated deployment pipeline are all excellent choices.

### Key Strengths:
- Clean, maintainable codebase
- Fast build and runtime performance
- Professional design with print capability
- Automated deployment
- Data-driven approach

### Main Weaknesses:
- Lack of automated testing
- Missing error handling
- Security vulnerability to address
- No code quality tools (linting, formatting)

### Final Verdict:
**8/10** - A solid project that serves its purpose well. With the recommended improvements (especially testing, error handling, and security fixes), this could easily be a 9/10 project. The architecture is sound, the code is clean, and the deployment pipeline is professional.

---

## Action Items Summary

**Immediate Actions:**
```bash
# 1. Fix security vulnerability
npm audit fix

# 2. Add LICENSE file
# Create MIT LICENSE file

# 3. Install dev dependencies
npm install --save-dev eslint prettier html-validate

# 4. Add basic test script
# Update package.json scripts
```

**Next Steps:**
1. Review and implement error handling in data fetching
2. Set up ESLint and Prettier configurations
3. Add basic build and HTML validation tests
4. Improve inline code documentation
5. Create CONTRIBUTING.md and CHANGELOG.md

---

**Review Completed:** January 20, 2026  
**Reviewer:** GitHub Copilot Coding Agent

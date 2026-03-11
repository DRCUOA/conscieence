# Changelog

All notable changes to this project will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioned per [Semantic Versioning](https://semver.org/).

---

## [1.0.1] — 2026-03-11

### Security
- Replaced Tailwind Play CDN with pre-built CSS via Tailwind CLI (eliminates supply chain risk)
- Added Content-Security-Policy header — scripts, styles, and connections restricted to own origin + Formspree
- Added Strict-Transport-Security (HSTS) with 1-year max-age and preload
- Added Cross-Origin-Opener-Policy (same-origin)
- Added X-XSS-Protection header for legacy browsers
- Added honeypot field (`_gotcha`) for bot protection on signup form
- Added submission timing check (rejects form submissions < 3s after page load)
- Moved DEPLOY.md and build logs out of `public/` to prevent information disclosure
- Removed `novalidate` from form; added `required` attributes for native browser validation

### Changed
- Extracted inline JavaScript to external `public/app.js` (enables strict CSP)
- Moved inline `<style>` block to `src/input.css` (compiled into `styles.css`)
- Split cache rules: HTML revalidates on every request; CSS/JS immutable with 1-year cache
- Renamed `mock/` directory to `public/` (production-standard naming)
- Established production and development environments in `wrangler.toml`
- Tightened email regex to require minimum 2-character TLD
- Added copyright notice and build number to footer

### Added
- `tailwind.config.js` — Tailwind v3 configuration with custom theme
- `src/input.css` — Tailwind source CSS with custom styles
- `public/app.js` — extracted page JavaScript
- `wrangler.toml` — Cloudflare Workers config with production/development environments
- `package.json` — project dependencies and environment-specific npm scripts
- `.gitignore` — secrets, build artifacts, editor history, Wrangler dev files
- `_headers` — security and caching response headers
- `_redirects` — placeholder for path-based redirects

## [1.0.0] — 2026-03-11

### Added
- Initial landing page for myMind — private thought space concept
- Signup form with Formspree integration (email + interest capture)
- SEO meta tags, Open Graph, Twitter Card, JSON-LD structured data
- Responsive design with mobile navigation
- Deployed to Cloudflare Workers at walkinmymind.com

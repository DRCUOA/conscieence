# myMind — Deployment & Visibility Guide

## Architecture Overview

| Component | Service | Notes |
|-----------|---------|-------|
| Static site | Cloudflare Workers (static assets) | Served from `public/` via `wrangler.toml` |
| Form backend | [Formspree](https://formspree.io/) | Form ID `mykneoan` configured in `index.html` |
| DNS + SSL | Cloudflare | Auto-provisioned with custom domain |
| Domain | `walkinmymind.com` | Routed via `[env.production]` in `wrangler.toml` |

---

## Environments

| Environment | Name | Purpose | URL |
|-------------|------|---------|-----|
| **production** | `conscieence` | Live site at custom domain | `https://walkinmymind.com` |
| **development** | `conscieence-dev` | Staging / preview | `conscieence-dev.<subdomain>.workers.dev` |

### Scripts

```bash
npm run dev           # Local dev server (development environment)
npm run preview       # Local preview with Workers runtime
npm run deploy        # Deploy to production (walkinmymind.com)
npm run deploy:dev    # Deploy to development (workers.dev subdomain)
```

---

## Deploy via Cloudflare Dashboard (GitHub Integration)

### Dashboard Settings

| Field | Value |
|-------|-------|
| **Repository** | `DRCUOA/conscieence` |
| **Project name** | `conscieence` |
| **Build command** | `npm install` |
| **Deploy command** | `npx wrangler deploy --env production` |

### What happens on deploy

1. Cloudflare pulls the repo from GitHub
2. Runs `npm install` (installs wrangler from `package.json`)
3. Runs the deploy command (reads `wrangler.toml`, uploads `public/` as static assets)
4. Site goes live at the configured domain

---

## Custom Domain Setup (walkinmymind.com)

After the first successful deploy:

1. Go to **Workers & Pages** > **conscieence** > **Settings** > **Domains & Routes**
2. Click **Add** > **Custom domain**
3. Enter `walkinmymind.com`
4. If your domain's DNS is already on Cloudflare:
   - Cloudflare auto-creates the required DNS records
   - SSL is provisioned automatically (usually within minutes)
5. If your domain is with another registrar:
   - Transfer DNS to Cloudflare (free), **or**
   - Add a CNAME record pointing `walkinmymind.com` → `conscieence.<your-subdomain>.workers.dev`
6. Also add `www.walkinmymind.com` — the `_redirects` file handles the www→apex redirect

### Verify

- `https://walkinmymind.com` — loads the landing page
- `https://www.walkinmymind.com` — redirects to apex domain
- SSL padlock is present

---

## Form (Formspree)

The signup form submits to Formspree (`f/mykneoan`).

- **Dashboard**: [formspree.io/forms](https://formspree.io/forms) to view submissions
- **Fields**: `email`, `interest`
- **Free tier**: 50 submissions/month

After deploy, submit a test entry and confirm it appears in the Formspree dashboard.

---

## Post-Deployment: Get Indexed

### Search Engines

- **Google**: Submit sitemap at [Google Search Console](https://search.google.com/search-console)
  1. Add and verify your domain
  2. Sitemaps > submit `https://walkinmymind.com/sitemap.xml`
  3. URL Inspection > request indexing of the homepage
- **Bing**: Submit at [Bing Webmaster Tools](https://www.bing.com/webmasters)

### Social Sharing Verification

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### Amplification

- **Product Hunt** — [producthunt.com](https://www.producthunt.com/)
- **Indie Hackers** — [indiehackers.com](https://www.indiehackers.com/)
- **Hacker News** — [news.ycombinator.com](https://news.ycombinator.com/) (Show HN)
- **Reddit** — r/productivity, r/journaling, r/selfimprovement, r/simpleliving
- **alternativeto.net** — List as alternative to Notion, Day One, Obsidian

---

## File Reference

| File | Purpose |
|------|---------|
| `wrangler.toml` | Cloudflare Workers config with production/development environments |
| `package.json` | Dependencies and environment-specific npm scripts |
| `public/index.html` | Landing page — SEO, OG tags, JSON-LD, signup form |
| `public/og-image.png` | 1200x630 social sharing preview image |
| `public/robots.txt` | Crawler directives + sitemap reference |
| `public/sitemap.xml` | XML sitemap for search engine submission |
| `public/_headers` | Security + caching response headers |
| `public/_redirects` | www-to-apex redirect rule |
| `.gitignore` | Excludes secrets, build artifacts, editor history |

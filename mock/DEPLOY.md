# myMind — Deployment & Visibility Guide

## Before You Deploy: Replace Placeholders

Search-and-replace these placeholders across all files in `mock/`:

| Placeholder | Replace with | Files |
|---|---|---|
| `walkinmymind.com` | Your custom domain (e.g. `conscieence.com`) | `index.html`, `robots.txt`, `sitemap.xml`, `_redirects` |
| `YOUR_FORM_ID` | Your Formspree form ID (see Form Setup below) | `index.html` |

---

## Form Setup (Formspree)

1. Go to [formspree.io](https://formspree.io/) and create a free account
2. Create a new form — you'll get an ID like `xyzabcde`
3. In `index.html`, replace `YOUR_FORM_ID` with that ID
4. Free tier: 50 submissions/month. If you need more, consider upgrading or switching to a Google Sheet backend via Apps Script (unlimited, free)

---

## Deploy to Cloudflare Pages

1. Create a free account at [cloudflare.com](https://dash.cloudflare.com/sign-up)
2. Go to **Workers & Pages > Create > Pages > Upload assets**
3. Upload the contents of the `mock/` folder:
   - `index.html`
   - `og-image.png`
   - `robots.txt`
   - `sitemap.xml`
   - `_headers`
   - `_redirects`
4. Cloudflare will assign a `*.pages.dev` subdomain immediately
5. To add your custom domain:
   - Go to your Pages project > **Custom domains** > **Set up a custom domain**
   - Follow the DNS configuration steps (Cloudflare auto-provisions SSL)

---

## Post-Deployment: Get Indexed

### Search Engines

- **Google**: Submit your sitemap at [Google Search Console](https://search.google.com/search-console)
  1. Add and verify your domain
  2. Go to Sitemaps > submit `https://walkinmymind.com/sitemap.xml`
  3. Use URL Inspection to request indexing of the homepage
- **Bing**: Submit at [Bing Webmaster Tools](https://www.bing.com/webmasters)
  - Bing also powers DuckDuckGo, Yahoo, and Ecosia results

### Social Sharing Verification

Test that your OG tags render correctly before sharing widely:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### Free Amplification Channels

- **Product Hunt** — [producthunt.com](https://www.producthunt.com/) (launch as an upcoming product)
- **Indie Hackers** — [indiehackers.com](https://www.indiehackers.com/) (share in relevant groups)
- **Hacker News** — [news.ycombinator.com](https://news.ycombinator.com/) (Show HN post)
- **Reddit** — r/productivity, r/journaling, r/selfimprovement, r/simpleliving, r/digitalminimalism
- **alternativeto.net** — List as an alternative to Notion, Day One, Obsidian
- **saashub.com** — Free software directory listing
- Add the URL to your personal social media bios (Twitter/X, LinkedIn, GitHub)

---

## File Reference

| File | Purpose |
|---|---|
| `index.html` | Landing page with SEO meta tags, OG tags, JSON-LD structured data, Formspree form |
| `og-image.png` | 1200x630 social sharing preview image |
| `robots.txt` | Crawler directives + sitemap reference |
| `sitemap.xml` | XML sitemap for search engine submission |
| `_headers` | Cloudflare Pages security + caching headers |
| `_redirects` | www-to-apex redirect rule |

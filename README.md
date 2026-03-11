# conscieence

Landing page for **myMind** — a private software space for capturing, connecting, and exploring your thoughts, memories, ideas, and inner world.

Live at [walkinmymind.com](https://walkinmymind.com)

## Stack

| Layer | Technology |
|-------|-----------|
| Site | Static HTML + Tailwind CSS v3 |
| Form | [Formspree](https://formspree.io/) |
| Hosting | Cloudflare Workers (static assets) |
| Domain | walkinmymind.com (Cloudflare DNS) |

## Project structure

```
conscieence/
├── public/              # Static assets served by Cloudflare
│   ├── index.html       # Landing page
│   ├── app.js           # Page JavaScript
│   ├── og-image.png     # Social sharing image (1200×630)
│   ├── robots.txt       # Crawler directives
│   ├── sitemap.xml      # XML sitemap
│   ├── _headers         # Security + caching headers
│   └── _redirects       # Path-based redirect rules
├── src/
│   └── input.css        # Tailwind source CSS + custom styles
├── logs/                # Build logs (not deployed)
├── tailwind.config.js   # Tailwind theme configuration
├── wrangler.toml        # Cloudflare Workers environments
├── package.json         # Dependencies and scripts
├── CHANGELOG.md         # Version history
└── .gitignore
```

## Development

```bash
npm install              # Install dependencies
npm run dev              # Local dev server (builds CSS, starts wrangler)
npm run build            # Build CSS only
```

## Deployment

Deployed automatically via Cloudflare's GitHub integration on push to `main`.

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy --env production` |

Manual deploy:

```bash
npm run deploy           # Production (walkinmymind.com)
npm run deploy:dev       # Development (*.workers.dev)
```

## Environments

| Environment | Worker | URL |
|-------------|--------|-----|
| production | `conscieence` | walkinmymind.com |
| development | `conscieence-dev` | *.workers.dev |

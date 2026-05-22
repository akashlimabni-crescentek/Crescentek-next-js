# Crescentek Next.js

Marketing site and AI project planner for **Crescentek**, built with **Next.js** (App Router).

## Getting started

```bash
npm install
cp .env.example .env.local   # add BASE44_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Server-side integrations use **Base44** (HubSpot, LLM, email). See `.env.example`.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for SEO, `og:image`, and `/sitemap.xml` (e.g. `http://localhost:3000` or your deploy URL) |
| `BASE44_API_KEY` | Base44 service-role API key |

Share image: `public/og-image.png` (used as default Open Graph / Twitter image on all pages).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run production server locally

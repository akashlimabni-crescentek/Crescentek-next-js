# Crescentek Next.js

Marketing site and AI project planner for [Crescentek](https://crescentek.com), built with **Next.js** (App Router).

## Repository layout

| Path | Description |
|------|-------------|
| `crescentek nextJs/` | Next.js application (pages, API routes, components) |

## Getting started

```bash
cd "crescentek nextJs"
npm install
cp .env.example .env.local   # add BASE44_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Server-side integrations use **Base44** (HubSpot, LLM, email). See `crescentek nextJs/.env.example`.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run production server locally

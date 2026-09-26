# maxscopp.de

Personal site — built with [Astro](https://astro.build), deployed to GitHub Pages.

## Getting started

Requires Node 22+.

```sh
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # type-check (astro check) + static build into dist/
npm run preview   # serve the production build locally
```

## Where things live

| Path                   | What                                                   |
| ---------------------- | ------------------------------------------------------ |
| `src/data/site.ts`     | Content: links, projects, process steps, stats         |
| `src/components/`      | One component per section (Hero, Work, Process, …)     |
| `src/styles/global.css`| Design tokens, buttons, textures, scroll reveal        |
| `src/lib/ascii.ts`     | Build-time ASCII sparkle used in the hero              |
| `src/pages/`           | Routes (`index.astro`, `404.astro`)                    |
| `public/`              | Static files copied as-is (favicon)                    |

## Deployment

Every push to `master` builds the site and deploys it to GitHub Pages via
`.github/workflows/node.js.yml`.

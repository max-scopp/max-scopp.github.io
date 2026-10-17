# maxscopp.de

Personal home page and directory for Max Scopp — built with [Astro](https://astro.build), deployed to GitHub Pages.

- [Development portfolio](https://dev.maxscopp.de)
- [Mobile detailing](https://auto.maxscopp.de)
- [Open-source projects](https://github.com/max-scopp)

## Getting started

Requires Node 22+.

```sh
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # type-check (astro check) + static build into dist/
npm run preview   # serve the production build locally
```

## Where things live

| Path                    | What                                 |
| ----------------------- | ------------------------------------ |
| `src/pages/index.astro` | Root-domain intro and site cards     |
| `src/data/site.ts`      | Navigation and contact links         |
| `src/components/`       | Shared header and footer             |
| `src/styles/global.css` | Light/dark theme and shared styling  |
| `public/CNAME`          | GitHub Pages custom domain           |

## Deployment

Every push to `master` builds the site and deploys it to GitHub Pages at
`maxscopp.de` via
`.github/workflows/node.js.yml`.

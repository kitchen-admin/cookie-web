# Cookie Kitchen Website

Next.js website for Cookie Kitchen, with Tailwind CSS, shadcn/ui, and Magic UI components.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- shadcn/ui + [Magic UI](https://magicui.design)
- Motion for animations

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — run ESLint

## Project structure

- `src/app/` — pages and layout
- `src/components/` — shared components (e.g. navbar)
- `src/components/ui/` — shadcn and Magic UI components
- `src/config/site-images.ts` — image URLs (edit directly in the file)

## Deploy on Vercel

1. Push this repo to GitHub (`kitchen-admin/cookie-w`).
2. Import the project at [vercel.com/new](https://vercel.com/new) and connect the repo.

### Image URLs

Paste each image URL directly into `src/config/site-images.ts`. Use any public
HTTPS URL (Vercel Blob, a CDN, etc.). Leave a value as `""` to keep the
placeholder block.

| Key in `site-images.ts` | Image |
| ----------------------- | ----- |
| `fridge` | Hero fridge |
| `carrot` | Carrot card |
| `berry` | Berry card |
| `broccoli` | Broccoli card |
| `mushroom` | Mushroom card |
| `featurePantry` / `featureLunch` / `featureExpires` | Feature section (optional) |

### CLI (optional)

```bash
npx vercel login
npx vercel link
npm run vercel:deploy
```

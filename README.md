# Cardify — modern rebuild

A responsive, scalable rebuild of my SQI College of ICT level-one project (Cardify, app.cardify.co), originally written in plain HTML/CSS/Bootstrap and now rebuilt with React, TypeScript and Tailwind CSS.

**Pages:** Home · About · Contact · Sign in · Create account (4-step wizard) · 404

## Stack
- React 19 + TypeScript, built with Vite
- Tailwind CSS v4 (design tokens in `src/index.css`)
- React Router (pages are code-split with `lazy`)
- React Hook Form + Zod for validated forms
- Framer Motion for scroll/entrance animations (respects `prefers-reduced-motion`)
- lucide-react icons

## Run it
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview
```

## Project structure
```
src/
  components/
    layout/   Navbar, Footer, AnnouncementBar, MainLayout, AuthLayout, ScrollManager
    ui/       Button, Container, Field (Input/Select/Textarea), Logo, Reveal, SectionHeading
  data/site.ts   All copy, nav, products and links — edit content here
  lib/schemas.ts Zod schemas for every form
  hooks/         usePageMeta (per-page title/description)
  pages/         Home, About, Contact, SignIn, SignUp, NotFound
```

## Notes
- **Front-end only.** The sign-in, create-account and contact forms validate fully but simulate submission; nothing is sent or stored. Replace the `onSubmit` handlers to connect an API.
- **External links** (blog, YouTube, help centre, legal pages) currently point to `https://app.cardify.co` — update `SITE.external` in `src/data/site.ts`.
- Images were reused from the original project (logo, team photo, app mockups, store badges) and converted to WebP.

## Deploy to Vercel
1. Push to GitHub.
2. In Vercel: **Add New → Project**, import the repo. Framework preset **Vite** is auto-detected (build `npm run build`, output `dist`).
3. `vercel.json` already rewrites all routes to `index.html` so deep links like `/about` work on refresh.

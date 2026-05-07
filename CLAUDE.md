# CLAUDE.md — Portfolio Cyprien Métivier--Robcis

## Présentation du projet
Portfolio personnel bilingue (FR/EN), déployé sur GitHub Pages.
URL : www.cyprienmetivier--robcis.me

## Stack technique
- Next.js 14.2 (static export via `output: 'export'` dans next.config.mjs)
- TypeScript, Tailwind CSS, Framer Motion, Lenis (scroll)
- EmailJS pour le formulaire de contact
- Sharp + Exifr (présents, prévus pour future section photo)

## Architecture
- `src/app/page.tsx` — Portail d'entrée (choix du type de visiteur + langue)
- `src/app/home/page.tsx` — Page principale (héro, à propos, parcours, projets, contact)
- `src/app/readings/page.tsx` — Bibliothèque personnelle (books.json)
- `src/app/creative/[slug]/page.tsx` — Pages projet dynamiques
- `src/components/` — Navigation, ContactForm, CvModal, CustomCursor, SmoothScroll
- `src/data/` — creative-projects.ts, books.json
- `src/lib/` — store.ts (localStorage), translations.ts (EN/FR)

## Contenu statique
- `public/cv/` — CVs PDF (EN + FR)
- `public/creative/` — SVG, PNG et PDF des projets créatifs
  - `caribbean/` — Visualisations Caraïbes
  - `elljomi/` — Identité Elljomi (logos, guidelines PDF)
  - `finance-tracker/` — Visuel application
  - `maldives-mauritius/` — Visualisations Maldives/Maurice

## Commandes utiles
- `npm run dev` — Serveur de développement local
- `npm run build` — Build statique (output dans `out/`)
- `npm run lint` — ESLint

## Notes importantes
- Le build est en `static export` : pas d'API routes, pas de SSR
- Le déploiement GitHub Pages est géré par `.github/workflows/deploy.yml`
- La langue et le type de visiteur sont persistés dans localStorage
- Les traductions complètes sont dans `src/lib/translations.ts`

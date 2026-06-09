# Site Audit — Cyprien Métivier--Robcis Portfolio
*Reference document for full redesign: structure, content, UX, and accessibility.*

---

## 1. Project Overview

| Property | Value |
|---|---|
| URL | www.cyprienmetivier--robcis.me |
| Framework | Next.js 14.2 (static export) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Scroll | Lenis (smooth scroll, desktop only) |
| Contact | EmailJS |
| Deployment | GitHub Pages via `.github/workflows/deploy.yml` |
| Bilingual | EN / FR (localStorage-persisted) |

---

## 2. Pages & Routes

| Route | Purpose |
|---|---|
| `/` | Entry gate — visitor-type selector + language picker |
| `/home` | Main portfolio page |
| `/readings` | Personal book library |
| `/creative/[slug]` | Dynamic project detail |
| `/creative/caribbean-islands-comparison` | Dedicated data viz page |
| `/creative/maldives-mauritius-comparison` | Dedicated data viz page |

---

## 3. Site-wide Design System

### 3.1 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `cream` | `#F5F0E8` | Global background, light elements, nav text |
| `black` | `#0A0A0A` | Body text, dark elements |
| `red` | `#E63329` | Accent, hover, highlights, text selection bg |
| `orange` | `#E8732A` | Secondary accent, category badges, decorative |

**Opacity variants in use:** black at /10, /15, /20, /25, /30, /40, /50, /60, /70, /80 — orange at /25, /30, /60, /70 — red at /30, /60, /80 — white at /5, /10, /30, /50.

**Text selection:** red background + cream text (`::selection`).

### 3.2 Typography

**Fonts (Google Fonts):**
- Serif: **Playfair Display** (fallback: Georgia) → CSS var `--font-serif`
- Sans: **Inter** (fallback: system-ui) → CSS var `--font-sans`

**Font sizes (custom tokens):**

| Token | Size | Typical use |
|---|---|---|
| `micro` | 10px | Fine print |
| `label` | 11px | Section labels, form labels, buttons |
| `caption` | 13px | Secondary captions |
| *(base)* | 16px | Body text |
| `lg` | 18px | Large body |
| `2xl` | 24px | Sub-headings |
| `3xl` | 30px | Mid-level headings |
| `4xl` | 36px | Section titles |
| `5xl` | 48px | Page-level headings |
| `6xl` | 60px | Large display text |
| `7xl` | 72px | Very large display |
| `8xl` | 96px | Entry page heading |
| `hero` | 5.5rem (88px) | Main hero headline |

**Letter spacing (custom tokens):**

| Token | Value | Typical use |
|---|---|---|
| `ultra` | 0.2em | Buttons, all-caps labels |
| `super` | 0.25em | Category badges |
| `extreme` | 0.3em | Entry label "Before we begin" |
| `widest` | (Tailwind default ~0.1em) | Labels, nav items |

**Line heights (custom tokens):**

| Token | Value | Typical use |
|---|---|---|
| `heading` | 0.95 | Tight display headings |
| `title` | 1.05 | Section titles |
| `body` | 1.7 | Default body copy |
| `prose` | 1.75 | Long-form text |
| `reading` | 1.8 | Descriptive paragraphs |

**Font pairings by element:**
- Large headings, project numbers, logo: `font-serif`
- Labels, body, navigation, form, buttons: `font-sans`

### 3.3 Animation System

All animations use Framer Motion. A `useMobileMotion` hook normalizes behavior:
- On mobile (coarse pointer): durations capped at 0.3s, only opacity transitions
- On desktop: full transform animations (opacity + y/x/scale)

**Patterns:**

| Pattern | Trigger | Details |
|---|---|---|
| Entrance fade+lift | `whileInView` (5% threshold, once) | opacity 0→1, y +20–40→0 |
| Stagger lists | `delay` per index | 0.05–0.1s gap between items |
| Hover arrow | `whileHover` | Arrow translates +4px right |
| Hover underline | CSS `scaleX` via `motion.span` | Width 0→1 from left |
| Menu open/close | `AnimatePresence` + clip-path | Slides up from bottom |
| Modal enter/exit | `AnimatePresence` + scale+fade | Backdrop fades, modal scales |
| Scroll-triggered section reveals | `whileInView` | Each section independent |

### 3.4 Global Layout Rules

- Max content width: constrained per section (roughly `max-w-6xl` / `max-w-5xl`)
- Side padding: responsive (`px-6` mobile → `px-16` desktop)
- Horizontal overflow hidden on `html` and `body`
- Custom cursor (desktop only): 20px circle, expands to 44px on interactive elements
- Smooth scroll (desktop only): Lenis, 1.2s duration, exponential easing

---

## 4. Page: Entry Gate (`/`)

### Purpose
First screen the user sees. Collects visitor type and language preference before entering the main site. Both are persisted to localStorage.

### Layout
```
[Top-right corner]  Language toggle (FR / EN)

[Center of viewport]
  Small label        "Before we begin"   (tracking-extreme, label size, black/40)
  Main heading       "Who are you?"      (serif, 7xl–8xl, black)
  4 visitor buttons                      (vertical stack, full width or auto)
  Hint text          "This will personalize your experience."  (label size, black/30)

[Bottom-right corner, desktop only]  Decorative corner lines
[Left side, desktop only]            Vertical decorative line + dot
```

### Visitor Type Buttons
Each button:
- Numbered label (01 – 04) on the left
- Type name in the center/right
- Right-pointing arrow on hover (animated)
- On hover: red background + cream text
- On click: navigates to `/home` after 0.25s delay

| # | EN Label | FR Label |
|---|---|---|
| 01 | Recruiter | Recruteur |
| 02 | Collaborator | Collaborateur |
| 03 | Curious | Curieux |
| 04 | Just visiting | Juste passer |

### Interactions
- Language toggle: top-right, cycles EN ↔ FR
- Button click: sets `visitorType` + `locale` in localStorage, navigates to `/home`
- Page-level scroll is locked (`overflow: hidden`) on this page

### Accessibility Gaps (current)
- No `aria-label` on language toggle
- No `role="radiogroup"` on visitor options
- No keyboard-navigable focus ring visible on options

---

## 5. Page: Main Portfolio (`/home`)

### Overall Structure
Five sections with fixed navigation. Visitor type and locale control text variants.

```
[Fixed top bar]    Navigation (logo, language, menu)
  Section 01       Hero
  Section 02       About
  Section 03       Background
  Section 04       Projects
  Section 05       Contact
[Footer]           Copyright + "Change identity"
```

---

### 5.1 Navigation Component

**Collapsed state (always visible):**
```
[Left]   CMR   (serif, cream, links to /)
[Right]  EN/FR toggle   Menu
```

**Expanded menu (full-screen overlay):**
- Background: `bg-black`
- 5 links: About / Background / Projects / Readings / Contact
  - Font: serif, `text-4xl md:text-6xl`, cream/70 → cream on hover
- Footer line: "Cyprien Métivier--Robcis — Portfolio [year]"
- Close button top-right

Menu behavior:
- If on `/home`: scrolls to section (with 650ms delay for menu animation to complete)
- If on another page: navigates to `/home` first, then scrolls
- `/readings` navigates to separate page

---

### 5.2 Hero Section

**Content (varies by visitor type):**

| Visitor | Section label (EN) | Headline (EN) | Sub (EN) |
|---|---|---|---|
| Recruiter | "01 — Hire" | *recruiter-specific* | *recruiter sub* |
| Collaborator | "01 — Collaborate" | "Let's build something together." | *collab sub* |
| Curious | "01 — Explore" | *curious headline* | *curious sub* |
| Visitor | "01 — Portfolio" | *visitor headline* | *visitor sub* |

*(Exact copy lives in `src/lib/translations.ts`)*

**Layout:**
```
[Full viewport height]
  [Left side]
    Section number label  "01 — [type]"   (11px, tracking-widest, black/40)
    Main headline                          (serif, hero size 5.5rem, leading-heading 0.95)
    Sub line                               (sans, base–lg, black/60)
  [Right side, desktop only]   Decorative vertical line + dot
```

**Decorations:** Two thin horizontal lines (top + bottom of section), one vertical line (right), one accent dot.

---

### 5.3 About Section (`#about`)

**Content:**

- Section number: "02" (serif, large, black/[0.07] — decorative)
- Section title: "About" / "À propos" (sans, label, tracking-widest, black/30)
- Bio paragraph (varies by visitor type, see translations)
- Optional "extra" paragraph for collaborators (freelance availability)
- Callout box: "Currently seeking" / "Recherche active"
  - Border: `border-orange`, background: `bg-orange/30`
  - Seeking text (EN): *"Open to a 4-month internship in Private Equity, Corporate Finance, or Fintech — Paris, Montréal, or Zürich. Starting June 2026."*
  - LinkedIn link inside callout

**Layout:**
```
[Left column]
  Section label + number
  Bio text
  [Optional] Freelance availability note
  Seeking callout box

[Right side, desktop only]   Decorative vertical accent line
```

---

### 5.4 Background Section (`#background`)

**Content:**

- Section number: "03"
- Section title: "Background" / "Parcours"
- Experience timeline (3 entries):

| Company | Location | Year | Role |
|---|---|---|---|
| SIIMBA | *(location)* | 2024 | *(role)* |
| ESLSCA Business School | Paris | 2023–2026 | *(role)* |
| EF Education | *(location)* | 2022–2023 | *(role)* |

*(Exact roles and descriptions in `src/lib/translations.ts`)*

Each entry:
- Year (left column, small, black/30)
- Company name (serif or bold)
- Location (small, black/50)
- Role (black/70)
- Description paragraph

**Timeline visual:**
- Vertical line connecting entries
- Dot marker per entry (hover changes dot to red)
- 3 fading dots below last entry (hint of more)

**Buttons:**
- "Preview CV" → opens `CvModal`
- "Download CV" → direct PDF link (`/cv/Resume_Cyprien_EN_26.pdf` or FR equivalent)

**Layout:**
```
[Left]   Timeline visual (line + dots)
[Right]  Entry content (year → company → role → description)
[Below]  CV buttons (Preview + Download)
```

---

### 5.5 Projects Section (`#projects`)

**Content:**

- Section number: "04"
- Section title: "Projects" / "Projets"
- List of creative projects sorted by `sortDate` descending

Each project row:
- Large ordinal number (01–N, serif, black/[0.07] — decorative)
- Project title (serif, large)
- Category (sans, small, orange)
- Year
- Right-pointing arrow (desktop only, animates on hover)
- Full row is a link to `/creative/[slug]`

**Current projects (sorted):**

| # | Title | Category | Date |
|---|---|---|---|
| 01 | Olympe — SaaS for Wealth Advisors | Web Development | April 2026 |
| 02 | Elljomi — Logo Redesign | Branding | December 2024 |
| 03 | Finance Tracker App | Product Design & Development | October 2024 |
| 04 | Caribbean Islands — Data Comparison | Data Visualization | 2025 |
| 05 | Maldives & Mauritius — Data Comparison | Data Visualization | 2025 |

---

### 5.6 Contact Section (`#contact`)

**Content:**

- Section number: "05"
- Animated headline: "Let's talk." (word-by-word scroll animation, serif, large)
- Availability text (short paragraph)
- Contact form (see §7.2)
- Info block:
  - Location: "Paris, near Parc Monceau"
  - Email: metiviercyprien@yahoo.fr
  - LinkedIn link
  - Instagram link

**Layout (desktop):**
```
[Left column]   Heading + Availability text + Info block
[Right column]  Contact form
```

**Layout (mobile):** Stacked vertically.

---

### 5.7 Footer

```
Cyprien Métivier--Robcis © 2026          [Change identity]
```

- "Change identity": clears localStorage + navigates to `/` (re-shows entry gate)

---

## 6. Page: Readings (`/readings`)

### Purpose
A personal library — grid of books read or owned.

### Layout
```
[Navigation]
[Back button]   → /home

[Page heading]  "Readings" / "Lectures"   (serif)
[Subtitle]      "Books I've read or own." / "Livres que j'ai lus ou que je possède."

[Book grid]
  2 cols mobile → 3 cols sm → 4 cols lg → 5 cols xl
  Each card: aspect-square, border-black/10, hover state
    Title  (serif, small, centered)
    Author (sans, micro, black/40, centered)
```

### Book Data (13 books)

| Title | Author |
|---|---|
| How to Win Friends and Influence People | Dale Carnegie |
| Sapiens: A Brief History of Humankind | Yuval Noah Harari |
| The Hard Thing About Hard Things | Ben Horowitz |
| Never Eat Alone | Keith Ferrazzi |
| Surrounded by Idiots | Thomas Erikson |
| Win Every Argument | Mehdi Hasan |
| Ikigai | Héctor García & Francesc Miralles |
| What If? | Randall Munroe |
| Secrecy World | Jake Bernstein |
| Le Théorème du Parapluie | Mickaël Launay |
| Le Grand Roman des Maths | Mickaël Launay |
| Ne Coupez Jamais la Poire en Deux | Chris Voss |
| The Japanese Myths | Joshua Frydman |

### Accessibility Gaps (current)
- Book cards have no alt text (no cover images currently)
- No skip-to-content link
- No heading hierarchy below page title

---

## 7. Component Library

### 7.1 Navigation (`Navigation.tsx`)

*Covered in §5.1 above.*

Props:
```typescript
locale: "en" | "fr"
onLocaleChange: (locale: Locale) => void
```

---

### 7.2 ContactForm (`ContactForm.tsx`)

**Fields (with floating labels):**

| Field | Type | Required | Label EN | Label FR |
|---|---|---|---|---|
| Name | text | yes | "Name" | "Nom" |
| Email | email | yes | "Email" | "Email" |
| Company | text | no | "Company / Organization" | "Société / Organisation" |
| Role | text | no | "Role / Position" | "Rôle / Poste" |
| Message | textarea | yes | "Message" | "Message" |

**Submit button states:**
- Idle: "Send" / "Envoyer"
- Sending: "Sending…" / "Envoi…" (disabled)
- Sent: green dot + "Confirmed" (form resets)
- Error: red error message below button

**Floating label behavior:** Label moves up + shrinks on focus or when field has value.

**EmailJS fields sent:** `from_name`, `from_email`, `company`, `role`, `message`

**Accessibility Gaps (current):**
- Floating labels are `<label>` elements — association with input via `htmlFor` ✓
- No `aria-required` on required fields
- No `aria-describedby` for error states
- Error messages not announced to screen readers (no `role="alert"`)

---

### 7.3 CvModal (`CvModal.tsx`)

Opens on "Preview CV" button click.

**Desktop:**
- Dark backdrop (`bg-black/90`)
- Modal box with PDF iframe (`#view=FitH`)
- Top bar: Download link + Close (X) button

**Mobile:**
- Same backdrop
- Two links: "Open EN PDF" / "Open FR PDF" (in new tab)

**Dismiss:** click backdrop or press ESC.

**Files:**
- EN: `/cv/Resume_Cyprien_EN_26.pdf`
- FR: `/cv/Resume_Cyprien_FR_26.pdf`

Props:
```typescript
isOpen: boolean
onClose: () => void
pdfUrl: string
downloadLabel: string
```

---

### 7.4 CustomCursor (`CustomCursor.tsx`)

- Desktop only (no touch devices)
- 20×20px circle, `rgba(10,10,10,0.5)` background
- Expands to 44×44px + fades to `rgba(10,10,10,0.15)` on hover over: `a`, `button`, `[role='button']`, `label`, `.cursor-pointer`, `input[type='submit']`
- Smooth follow: lerp factor 0.12 (`requestAnimationFrame` loop)
- `pointer-events: none`, `mix-blend-mode` or `z-index` stacking

---

### 7.5 SmoothScroll (`SmoothScroll.tsx`)

- Initializes Lenis on desktop only (skips on touch)
- Duration: 1.2s, easing: exponential
- `smoothWheel: true`
- Passive, no visible output

---

## 8. Project Detail Pages

### 8.1 Generic Project Detail (`/creative/[slug]`)

Component: `CreativeDetailClient.tsx`

**Layout (top hero):**
```
[Hero image — full width, max-h ~70vh]
[Back button]   → /home#projects
[Date]          (serif, small, black/50)
[Title]         (serif, 4xl–7xl, leading-heading)
[Category badge] (sans, label, orange, tracking-super, uppercase, border-orange)
[Tags]          (row of bordered boxes, text-micro)
[Website link]  (favicon + domain, arrow on hover)
[Description]   (multi-paragraph, sans, leading-reading)
[Image grid]    (see below)
[Before/After]  (optional, 2-col desktop only)
[Detail text]   (optional extra paragraphs)
[Logo variations] (optional, 3-col grid)
[PDF embed]     (optional, iframe desktop / link mobile)
[Back button]   "All projects"
```

**Image grid logic:**
- 1 image: full width (12 cols)
- 2 images: first = 8 cols, second = 4 cols
- 3+ images: first two as above, rest = 6 cols centered

**Before/After:**
- Two images side-by-side with labels
- Desktop only (hidden on mobile)

**PDF embed:**
- Desktop: `<iframe>` with `#view=FitH`
- Mobile: "View PDF" link

---

### 8.2 Caribbean Islands Comparison (`/creative/caribbean-islands-comparison`)

**Sections:**

| # | ID | Content |
|---|---|---|
| 1 | `#overview` | Date, title, category, tags, intro text (link to professor), PDF embed |
| 2 | `#map` | Section heading + SVG map |
| 3 | `#gdp` | Section heading + SVG graph (GDP per capita) |
| 4 | `#inflation` | Section heading + SVG graph (inflation rate) |
| 5 | `#public-debt` | Section heading + SVG graph (public debt) |

**Assets:**
- `/creative/caribbean/map-caribbean.svg`
- `/creative/caribbean/graph-gdp.svg`
- `/creative/caribbean/graph-inflation.svg`
- `/creative/caribbean/graph-public-debt.svg`

**Navigation:** Sticky side nav (desktop), hidden on mobile. 5 section links, active state = red left border.

**Sticky nav behavior:** `IntersectionObserver` on each section → updates active link.

---

### 8.3 Maldives & Mauritius Comparison (`/creative/maldives-mauritius-comparison`)

**Sections:**

| # | ID | Content |
|---|---|---|
| 1 | `#overview` | Date, title, category, tags, intro, two SVG maps side-by-side |
| 2 | `#cost-of-living` | CPI graph SVG + housing price graph SVG + text callout |
| 3 | `#healthcare` | 2-column text grid (Maldives description / Mauritius description) |
| 4 | `#climate` | Subtitle, two climate chart SVGs side-by-side |
| 5 | `#visa-policies` | Mauritius Retired Non-Citizen Permit info (3-col grid desktop, stacked mobile) |
| 6 | `#economic-overview` | GDP graph SVG (1980–2024) |

**Visa policy callout content (EN):**
- Residency: *requirements text*
- Renewable: *renewal info*
- Fee: *"USD 1,500 monthly minimum income requirement"*

**Assets:** SVGs in `/creative/maldives-mauritius/`

**Navigation:** Same sticky side nav pattern, 6 section links.

---

## 9. Data Structures

### 9.1 Creative Project

```typescript
interface CreativeProject {
  slug: string;
  title: string;          // EN
  titleFR: string;        // FR
  tagline: string;        // EN
  taglineFR: string;      // FR
  category: string;       // Same EN/FR
  tags?: string[];
  date?: string;          // EN (e.g. "April 2026")
  dateFR?: string;        // FR (e.g. "Avril 2026")
  thumbnail: string;      // Path for project list
  heroImage?: string;     // Path for detail page top
  heroBg?: string;        // Optional background color
  description: string;    // EN, multi-paragraph (\n\n separated)
  descriptionFR: string;  // FR
  images: string[];       // Detail page gallery
  beforeAfter?: {
    before: string;
    after: string;
    labelBefore?: string;
    labelAfter?: string;
  };
  logoVariations?: {
    titleEN: string;
    titleFR: string;
    items: { src: string; label: string; labelFR?: string }[];
  };
  pdfEmbed?: {
    src: string;
    titleEN: string;
    titleFR: string;
  };
  detailText?: string;    // EN extra text
  detailTextFR?: string;  // FR extra text
  websiteUrl?: string;
  faviconUrl?: string;
  sortDate?: number;      // YYYYMM for sorting
  heroPosition?: 'top' | 'bottom';
}
```

### 9.2 Book

```typescript
interface Book {
  isbn: string;
  title: string;
  author: string;
}
```

### 9.3 Locale / Visitor Type

```typescript
type Locale = "en" | "fr";
type VisitorType = "recruiter" | "collaborator" | "curious" | "visitor";
```

**localStorage keys:**
- `"portfolio-visitor-type"` → VisitorType
- `"portfolio-locale"` → Locale (default: `"en"`)

---

## 10. Translations Structure (EN/FR)

All strings live in `src/lib/translations.ts` and are accessed via `t(locale)`.

```
translations
├── entry
│   ├── heading          "Before we begin"
│   ├── subheading       "Who are you?"
│   ├── options          { recruiter, collaborator, curious, visitor }
│   └── hint             "This will personalize your experience."
├── hero
│   ├── recruiter        { headline, sub }
│   ├── collaborator     { headline, sub }
│   ├── curious          { headline, sub }
│   └── visitor          { headline, sub }
├── nav
│   ├── about
│   ├── background
│   ├── projects
│   ├── readings
│   └── contact
├── about
│   ├── title
│   ├── recruiter        { bio }
│   ├── collaborator     { bio, extra }
│   ├── curious          { bio }
│   └── visitor          { bio }
└── sections
    ├── background
    │   ├── title
    │   ├── cvPreview
    │   ├── cvDownload
    │   ├── cvFile
    │   ├── seeking
    │   ├── seekingLabel
    │   ├── linkedin
    │   └── experience[]  { company, location, year, role, description }
    ├── projects
    │   └── title
    └── contact
        └── title
```

---

## 11. Assets Inventory

### CV PDFs
- `/public/cv/Resume_Cyprien_EN_26.pdf`
- `/public/cv/Resume_Cyprien_FR_26.pdf`

### Creative Project Assets
```
/public/creative/
├── olympe/
│   ├── olympe-logo.svg         (thumbnail)
│   ├── olympe-cover.jpg        (hero image)
│   └── olympe-favicon.ico
├── elljomi/
│   ├── elljomi-logo-after-white.png   (thumbnail)
│   ├── [before image]
│   ├── [after image]
│   ├── [3 logo variation images]
│   └── [brand guidelines PDF]
├── finance-tracker/
│   └── Visuals_Finance_Tracker_App.png  (thumbnail + hero)
├── caribbean/
│   ├── map-caribbean.svg
│   ├── graph-gdp.svg
│   ├── graph-inflation.svg
│   └── graph-public-debt.svg
└── maldives-mauritius/
    ├── map-maldives.svg         (thumbnail)
    ├── [map-mauritius.svg]
    ├── [graph-cpi.svg]
    ├── [graph-housing.svg]
    ├── [chart-climate-maldives.svg]
    ├── [chart-climate-mauritius.svg]
    └── [graph-gdp.svg]
```

---

## 12. Accessibility Audit

### What exists today
- Semantic HTML: `<nav>`, `<section>`, `<footer>`, `<main>` (partial)
- Scroll target IDs: `#about`, `#background`, `#projects`, `#contact`
- `alt` text on images (present but quality varies)
- `rel="noopener noreferrer"` on external links
- `<label>` elements with `htmlFor` on form fields
- Keyboard-accessible buttons and links (native elements used)
- Heading hierarchy: h1 on hero → h2 on section titles → h3 on sub-items (mostly)

### Gaps to address in rebuild

| Area | Issue | Fix |
|---|---|---|
| Entry gate | Visitor type buttons have no `role="radio"` / `aria-checked` | Use `role="radiogroup"` + `role="radio"` + `aria-checked` |
| Entry gate | Language toggle has no `aria-label` | Add `aria-label="Switch to French"` / `"Switch to English"` |
| Navigation | Menu toggle has no `aria-expanded` | Add `aria-expanded={menuOpen}` |
| Navigation | No focus trap in open menu | Trap focus within open menu overlay |
| Navigation | No skip-to-main link | Add `<a class="sr-only focus:not-sr-only" href="#main-content">Skip to content</a>` |
| Forms | Required fields lack `aria-required="true"` | Add on all required fields |
| Forms | Errors not announced | Add `role="alert"` or `aria-live="polite"` to error containers |
| Forms | Success state not announced | Add `aria-live="polite"` to success message area |
| CV Modal | Focus not trapped inside modal | Implement focus trap on open |
| CV Modal | ESC closes but no `aria-modal="true"` | Add `role="dialog"` + `aria-modal="true"` + `aria-labelledby` |
| Custom cursor | Cursor follows mouse but pointer-events disabled | OK — does not block interaction |
| Smooth scroll | Reduced motion preference ignored | Check `prefers-reduced-motion` and disable Lenis + Framer Motion animations |
| Images | Some alt texts may be empty or generic | Audit each `alt=""` (decorative) vs descriptive text |
| Color contrast | Red (#E63329) on cream (#F5F0E8) — check all sizes | Verify WCAG AA at small sizes |
| Data viz pages | SVG graphs have no text alternative | Add `<title>` + `<desc>` in each SVG, or provide a text summary |
| Readings page | Book grid cards are non-interactive divs | Make them buttons or links if they ever become interactive |
| Focus styles | Tailwind default focus ring may be hidden | Ensure `:focus-visible` ring is visible on all interactive elements |

---

## 13. UX Patterns to Preserve or Improve

| Pattern | Current behavior | Notes for rebuild |
|---|---|---|
| Visitor personalization | Entry gate → 4 types → hero/bio copy changes | Strong differentiator — preserve |
| Language toggle | Top-right everywhere, localStorage-persisted | Keep; add `aria-label` |
| Section numbering | 01–05 visual, large faded serif background number | Distinctive — preserve |
| Scroll-based reveal | Each section animates in on scroll | Respect `prefers-reduced-motion` |
| Floating form labels | Labels float above on focus | Good UX — preserve with accessibility fix |
| CV preview modal | Inline PDF on desktop | Works well; fix accessibility |
| Project list → detail | Number + title + category row | Simple and elegant |
| Sticky data viz nav | Side nav highlights active section | Valuable for long pages |
| "Change identity" footer | Resets visitor type, returns to gate | Nice touch — keep |
| No loading states | SPA-style instant transitions | Add page transitions if desired |

---

## 14. Technical Constraints for Rebuild

- **Static export only** — no server-side rendering, no API routes
- All data must come from local JSON/TS files or be fetched client-side
- Image optimization is disabled (`unoptimized: true`) — handle manually
- GitHub Pages deployment — paths must be correct for subpath or custom domain
- EmailJS is the contact backend — no server needed
- Lenis smooth scroll conflicts with some CSS `scroll-behavior` declarations
- `next/font` is used for font loading — no manual stylesheet links needed


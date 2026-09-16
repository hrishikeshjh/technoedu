<div align="center">

# Techno Wallah (technoedu)

### Open-Source Examination Resource Hub & Academic OER Aggregator

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Ready-black?logo=vercel&logoColor=white&style=for-the-badge)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white&style=for-the-badge)](https://reactrouter.com/)
[![OER](https://img.shields.io/badge/Open_Educational_Resources-CC_BY-emerald?style=for-the-badge)](https://creativecommons.org/)

**A unified, non-commercial public repository that maps world-class Open Educational Resources (OER), peer-reviewed textbooks, official government portals, and verified Previous Year Question (PYQ) banks onto structured roadmaps for major competitive examinations.**

[Overview](#overview) • [Features](#key-features) • [Exam Coverage](#indexed-examinations) • [Open Platforms](#indexed-open-platforms) • [Routing Map](#routing-map) • [Getting Started](#getting-started) • [Deployment](#deployment-on-vercel)

---

</div>

## Overview

**Techno Wallah** is an open-access digital learning ecosystem engineered to remove paywalls, expensive subscriptions, and fragmented preparation pipelines for competitive exams — in India and abroad.

The core problem this project solves:

| Pain Point | Techno Wallah Response |
| :--- | :--- |
| Commercial test-prep monopolies charge prohibitive fees | 100% free links to government, university, and non-profit open repositories — no subscriptions |
| Authentic syllabus material is scattered across dozens of portals | One unified directory that curates and maps resources per examination |
| Students rely on unverified, low-quality pirated PDFs | Every link points to a verified official or openly licensed source (NCERT, NPTEL, MIT OCW, OpenStax, ETS, UPSC, etc.) |
| Unclear which public course maps to which exam topic | Topic-wise roadmaps that pair every syllabus area with a specific open lecture series or textbook chapter |

All data is structured in typed, static source files — there is no backend or database. The app is a fast, client-side React SPA that renders instant, shareable, filterable directories.

---

## Key Features

### 1. Universal Live Search with Autocomplete
- A global search bar in the top navigation (desktop) and inside the mobile drawer (touch).
- Real-time, multi-category matching across examinations *and* open platforms as you type.
- Bifurcated dropdown results ("Examinations" / "Open Educational Platforms") with one-tap deep links to exam pages and platform portals.
- One-tap clear control (`X`) and results that degrade gracefully to nothing when the query is empty.

### 2. Target Examination Directory (`/exams`)
- **15 examinations** categorized across three pathways:
  - **Study Abroad (5):** GRE, GMAT, IELTS, TOEFL, Digital SAT
  - **Government & Civil Services (7):** UPSC CSE, WBCS, SSC CGL, Banking (IBPS/SBI/RBI), Railways (RRB), Defence (CDS/NDA/AFCAT), Teaching (CTET/WB TET/UGC-NET)
  - **Law & Entrance (3):** CLAT, CAT, CUET
- Instant text search (name, short code, description, popular topics, open platforms).
- Category dropdown + swipeable horizontal filter pills with live result counts.
- URL-synced filter state (`?category=`), so views are deep-linkable and shareable.

### 3. Topic-Wise Open Learning Roadmaps (`/exams/:id`)
- Dedicated detail page per examination with:
  - Exam header dossier (custom SVG emblem, short code, category, tag, official portal).
  - **Topic-wise open learning roadmap** — each core syllabus area mapped to a concrete public resource (NPTEL course, NCERT chapter, OpenStax book, official archive) with a direct link.
  - **Syllabus highlights** sidebar, recommended open textbooks, and official PYQ archive gateways.
  - **Open Educational Guarantee** badge — verifying that every outbound link is a legitimate open-access source.
- Friendly 404 state with navigation back to the directory.

### 4. Curated Open Study Material Library (`/library`)
- Curated catalog of open textbooks, official PYQ archives, formula sheets, handbooks, and language repositories across **7 material categories**.
- Three-dimensional filtering: keyword search, target examination selector, and resource category — all synced to the URL for shareable links.
- **Document dossier modal** on each card: license type, page count, file size, applicable exams, covered topics, and an "Open Resource" action.
- **Copy Share Link** with a toast notification (via the app's notification context) and clipboard fallback.

### 5. Global Open Platforms Directory (`/platforms`)
- Profiles for **9 flagship open learning systems** (NPTEL/SWAYAM, MIT OCW, NCERT e-Pathshala & DIKSHA, OpenStax, Khan Academy, e-GyanKosh, NDLI, PRS, Internet Archive/Open Library).
- Each profile shows the governing institution, discipline coverage tags, access/license model, and a one-tap "Launch Open Portal" link.
- Filterable by category dropdown and keyword search.

### 6. Landing Dashboard (`/`)
- Hero with campaign CTAs and trust markers, plus a KPI strip: **15+ examinations, 100% free, 500+ curated books (catalog target, seeded in data), 9+ global platforms**.
- Exam category grid with live aggregation, open-platforms showcase, and an open-knowledge-library spotlight.

### 7. Mobile-First Responsive Architecture
- **Fixed bottom app dock (`MobileNav`)** — glassmorphism thumb bar across Home, Exams, Library, and Platforms with active scaling.
- Slide-out mobile drawer with **embedded live search** and touch-sized targets.
- Horizontally scrollable filter chips (`category-scroll`) — edge-to-edge pill swiping on small screens.
- **Safe-area insets** (`env(safe-area-inset-bottom)`) for iOS and Android home indicators.
- `overflow-x: hidden` guard, 44px minimum touch targets, and `scroll-behavior: smooth`.

### 8. Custom SVG Exam Emblems
- Hand-drawn vector emblems rendered as React components — Indian State Emblem (Ashoka Lion Capital), International Globe, Scales of Justice, Management Crest, and Banking Emblem — auto-assigned per exam by a keyword/category dispatcher (`getExamEmblem`).

---

## Indexed Examinations

| # | Examination | Category | Official Portal |
| :--: | :--- | :--- | :--- |
| 1 | UPSC Civil Services Examination (CSE) | Government | [upsc.gov.in](https://upsc.gov.in) |
| 2 | West Bengal Civil Services (WBCS) | Government | [psc.wb.gov.in](https://psc.wb.gov.in) |
| 3 | SSC CGL & CHSL | Government | [ssc.gov.in](https://ssc.gov.in) |
| 4 | Banking PO & Clerk (IBPS / SBI / RBI) | Government | [ibps.in](https://www.ibps.in) |
| 5 | Railways RRB NTPC & Group D | Government | [rrbapply.gov.in](https://www.rrbapply.gov.in) |
| 6 | Defence Examinations (CDS / NDA / AFCAT) | Government | [upsc.gov.in](https://upsc.gov.in) |
| 7 | Teaching Exams (CTET / WB TET / UGC-NET) | Government | [ctet.nic.in](https://ctet.nic.in) |
| 8 | GRE General Test | Study Abroad | [ets.org/gre](https://www.ets.org/gre) |
| 9 | GMAT Focus Edition | Study Abroad | [mba.com](https://www.mba.com/exams/gmat-focus-edition) |
| 10 | IELTS Academic & General Training | Study Abroad | [ielts.idp.com](https://ielts.idp.com) |
| 11 | TOEFL iBT | Study Abroad | [ets.org/toefl](https://www.ets.org/toefl) |
| 12 | Digital SAT | Study Abroad | [satsuite.collegeboard.org](https://satsuite.collegeboard.org/digital) |
| 13 | CLAT (UG & PG) & Law Entrances | Law & Entrance | [consortiumofnlus.ac.in](https://consortiumofnlus.ac.in) |
| 14 | CAT & Management Entrances | Law & Entrance | [iimcat.ac.in](https://iimcat.ac.in) |
| 15 | CUET UG / PG | Law & Entrance | [cuet.nta.nic.in](https://cuet.nta.nic.in) |

Each examination record stores: syllabus highlights, popular topics, official portal + PYQ archive URLs, directly mapped open-source platforms, topic-wise open resources, and recommended open textbooks (see [Extending the Data](#extending-the-data)).

---

## Indexed Open Platforms

Techno Wallah points to verified public educational repositories:

| Platform | Governing Institution | Coverage Focus | Access Type |
| :--- | :--- | :--- | :--- |
| **NPTEL & SWAYAM** | Ministry of Education, Govt. of India / IITs & IISc | University video lectures & courses | 100% Free Open Access |
| **MIT OpenCourseWare** | MIT | Global undergraduate/graduate courseware | Creative Commons |
| **NCERT e-Pathshala & DIKSHA** | NCERT, Govt. of India | Foundational K-12 textbooks | Official Govt Repository |
| **OpenStax** | Rice University | Peer-reviewed open textbooks | CC BY 4.0 |
| **Khan Academy** | Non-profit | Mastery learning, SAT/GRE foundations | 100% Free Non-Profit |
| **e-GyanKosh** | IGNOU | Distance-learning repository (Public Admin, History, Sociology) | Open Distance Repository |
| **NDLI** | IIT Kharagpur / Ministry of Education | All-discipline digital library | National Open Portal |
| **PRS Legislative Research** | PRS India | Policy, bills, budgets, governance | Open Non-Profit |
| **Internet Archive / Open Library** | Internet Archive | Public-domain books & archives | Universal Open Access |

---

## Routing Map

| Route | Purpose |
| :--- | :--- |
| `/` | Landing dashboard (hero, KPI strip, exam grid, platforms, library spotlight) |
| `/exams` | Examination directory with search + category filters |
| `/exams/:id` | Examination detail: roadmap, repositories, syllabus, books (`:id` = data slug, e.g. `upsc`, `gre`, `clat`) |
| `/library` | Curated open study-material library with modal dossiers |
| `/platforms` | Open-source learning platforms directory |
| `/about` | Mission, principles, OER commitment |
| `/practice`, `/courses`, `/courses/:id`, `/test-series` | Legacy aliases — redirect to `/exams` |
| `/study-material` | Legacy alias — redirects to `/library` |
| `*` | Catch-all — redirects to `/` |

Notes:
- All list pages (`/exams`, `/library`, `/platforms`) read filter state from the URL query string, so filtered views are deep-linkable and shareable.
- The app auto-scrolls to the top on every route change.
- `vercel.json` rewrites every path to `index.html` so deep links survive refresh on the static host.

---

## Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 18](https://react.dev/) + [TypeScript 5.7](https://www.typescriptlang.org/) |
| **Build & Tooling** | [Vite 6](https://vitejs.dev/) (dev server on port `3000`, host: `true`) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) + PostCSS + Autoprefixer |
| **Routing** | [React Router v6](https://reactrouter.com/) with scroll restoration |
| **Icons** | [Lucide React](https://lucide.dev/) (+ lightweight inline SVG emblems) |
| **State** | React Context (notification/toast system) + URL-synced local state |
| **Data** | Typed static TS modules — zero backend, zero database |
| **Hosting** | [Vercel](https://vercel.com/) with SPA rewrite rules |

### Design System Highlights (`tailwind.config.js`)
- **Brand palette:** primary red `#dc2626` (with `darkred` / `deepred` shades), dark slate scale (`#07090e`–`#374151`), surface grays.
- **Typography:** Inter system-stack default; Gill Sans stack used across directory pages; Plus Jakarta Sans + Space Grotesk loaded in `index.html`.
- **Shadows:** layered `card`, `card-hover`, `elevated`, `soft`, `soft-lg`, and a red glow accent used on primary CTAs.
- **Motion:** `fade-in` keyframe and a subtle pulse for brand badges.

---

## Project Structure

```text
technoedu/
├── public/                          # Static assets
│   ├── hero-illustration.png        # Campus/OER hero imagery
│   ├── logo.png                     # Techno Wallah logo
│   └── ChatGPT Image ...png         # Source illustration asset
├── scripts/
│   └── generate_ppt.py              # Generates the executive PPTX (python-pptx)
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── ExamEmblems.tsx      # Hand-drawn SVG exam emblems + dispatcher
│   │   ├── home/
│   │   │   ├── HeroSection.tsx      # Hero + KPI strip
│   │   │   ├── ExamCategoryGrid.tsx # Category tabs + exam cards
│   │   │   └── OpenPlatformsSection.tsx
│   │   └── layout/
│   │       ├── Navbar.tsx           # Sticky nav, global live search, drawer
│   │       ├── MobileNav.tsx        # Fixed bottom app dock
│   │       └── Footer.tsx
│   ├── context/
│   │   └── NotificationContext.tsx  # Toast system (showToast/removeToast)
│   ├── data/                        # Single source of truth (typed static data)
│   │   ├── examsData.ts             # 15 examinations + roadmaps + platforms
│   │   ├── platformsData.ts         # 9 global open platforms
│   │   └── studyMaterialData.ts     # 10 curated library entries + categories
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── ExamExplorerPage.tsx
│   │   ├── ExamDetailPage.tsx
│   │   ├── StudyMaterialPage.tsx
│   │   ├── PlatformsDirectoryPage.tsx
│   │   └── AboutPage.tsx
│   ├── types/
│   │   └── index.ts                 # All TypeScript interfaces
│   ├── App.tsx                      # Layout + route table (+ legacy redirects)
│   ├── main.tsx                     # ReactDOM entry (BrowserRouter + Provider)
│   └── index.css                    # Tailwind layers, scrollbars, helpers
├── TechnoWallah_Executive_Presentation.pptx  # Generated deck for stakeholders
├── vercel.json                      # SPA rewrite (all paths -> index.html)
├── tailwind.config.js               # Brand tokens, shadows, keyframes
├── vite.config.ts                   # Vite + React plugin, port 3000
├── postcss.config.js                # Tailwind + Autoprefixer
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) **18+** (Vite 6 requirement)
- [npm](https://www.npmjs.com/) (or yarn / pnpm)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/hrishikeshjh/technoedu.git
cd technoedu

# 2. Install dependencies
npm install

# 3. Start the development server (Vite, port 3000)
npm run dev
# -> http://localhost:3000

# 4. Type-check + production build
npm run build

# 5. Preview the production bundle locally
npm run preview
```

> The `build` script runs `tsc` before `vite build`, so a failing type-check will fail the build — deploy safety is enforced locally and on Vercel.

---

## Deployment on Vercel

The repository is pre-configured for one-click deployment:

1. Go to [vercel.com/new](https://vercel.com/new) and import `hrishikeshjh/technoedu`.
2. Vercel auto-detects the stack:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. The included [`vercel.json`](./vercel.json) rewrites every path to `index.html`, ensuring SPA routes (`/exams/upsc`, `/library?exam=...`) never 404 on refresh or deep link.
4. Click **Deploy**.

---

## Extending the Data

All catalog content lives in typed static modules — no backend required. Add entries to the arrays and the UI updates automatically.

| To add... | Edit | Type (in `src/types/index.ts`) |
| :--- | :--- | :--- |
| An examination | `src/data/examsData.ts` | `ExamInfo` |
| An open platform | `src/data/platformsData.ts` | `LearningPlatformInfo` |
| A library document | `src/data/studyMaterialData.ts` | `StudyMaterialItem` |

Common patterns:
- **Exam slugs** (`id`) are lower-case kebab words (`upsc`, `wbcs`, `digital sat` codes match via short code too) — they form the URL at `/exams/:id`.
- **Topic resources** (`ExamTopicResource`) power the roadmap section; keep `isFreeOpenSource: true` only for genuinely free, license-verified sources.
- **Category strings** must match the exported category arrays:
  - `examCategories` = `['All', 'Study Abroad', 'Government', 'Law & Entrance']`
  - `materialCategories` = the 7 library categories (+ `'All'`).
- Every outbound `url` should point to an official or openly licensed archive (UPSC/NTA, NCERT, NPTEL/SWAYAM, MIT OCW, OpenStax, ETS, Khan Academy, etc.).

> Note: the `ExamCategoryType` union declares six possible categories, but the current catalog uses three (`Study Abroad`, `Government`, `Law & Entrance`). Extending coverage to Engineering, Medical, or Management only requires adding data + the category label.

---

## Tooling & Scripts

- **`scripts/generate_ppt.py`** — regenerates `TechnoWallah_Executive_Presentation.pptx` (the stakeholder/executive dossier). Requires Python and `python-pptx`:
  ```bash
  pip install python-pptx
  python scripts/generate_ppt.py
  ```
- The deck documents problem statement, input/output screens, access protocol, rollout milestones, and technical architecture — useful for institutional review/NAAC–NIRF evidence.

---

## Contributing

Contributions that expand exam mappings, verify question banks, fix links, or index new OERs are welcome.

1. Fork the project.
2. Create a feature branch: `git checkout -b feature/AddExamResource`.
3. Follow the existing data patterns (see [Extending the Data](#extending-the-data)).
4. Commit your changes: `git commit -m "Add open resources for GATE examinations"` and push.
5. Open a Pull Request.

**Review checklist for pull requests:**
- [ ] Links point to official/verified open sources only.
- [ ] License types are truthful (CC BY / public domain / government distribution).
- [ ] `npm run build` passes (TypeScript is strict-clean).
- [ ] Mobile layout verified (dock nav, drawer search, filter chips).

---

## Accessibility & Performance

- 44px minimum touch-target sizes with an explicit opt-out utility (`no-min-touch`) for decorative inline chips.
- Semantic landmarks and descriptive ARIA on navigation toggles; high-contrast brand palette.
- Emoji-free UI and documentation; system font stack avoids non-native font payloads.
- Zero third-party trackers, zero analytics, zero data capture — the entire catalog is static, so it loads fast and scales to zero requests on idle.

---

## License & Attribution

- **Source code:** This repository is currently a closed/unreleased institutional project. If/when published as open source, the code is intended to be released under the [MIT License](LICENSE).
- **Educational content & links:** All courseware, textbook links, and government question papers remain the property of their originating open platforms (NPTEL, MIT OCW, NCERT, OpenStax, ETS, UPSC, NTA, etc.), indexed under Open Educational Resources (OER) fair-educational-use guidelines. End users must respect each platform's individual terms (CC BY, CC BY-NC-SA, or public government distribution).

---

<div align="center">

**Non-commercial, open-access public knowledge repository.**

Built for students, lifelong learners, and competitive exam aspirants everywhere.

</div>
# Techno Wallah (technoedu) — Implementation Plan

> **Project Status**: Production-ready open-source educational platform for competitive exam preparation  
> **Last Updated**: 2026-09-28  
> **Branch**: `master` → `main` (target)

---

## 📋 Executive Summary

Techno Wallah is a **zero-backend, client-side React SPA** that aggregates verified Open Educational Resources (OER) for 15+ competitive examinations across Study Abroad, Government/Civil Services, and Law & Entrance pathways. The platform maps every syllabus topic to concrete open-access resources (NPTEL, NCERT, MIT OCW, OpenStax, ETS, UPSC, etc.) with topic-wise roadmaps, a curated study-material library, and a global platforms directory.

**Current State**: Feature-complete for MVP. All core routes, data models, and UI components are implemented and type-safe. The app builds cleanly (`npm run build` passes) and is deployed on Vercel.

---

## 🎯 Strategic Goals (Next 3–6 Months)

| Goal | Priority | Success Metric |
|------|----------|----------------|
| **Expand Exam Coverage** | P0 | Add 10+ new exams (Engineering, Medical, Management, State PSC) |
| **AI-Powered Study Assistant** | P1 | Integrate local LLM / API for personalized roadmap generation |
| **Offline-First PWA** | P1 | Service Worker + IndexedDB for full offline access to roadmaps & PDFs |
| **Community Contribution Pipeline** | P2 | GitHub-based PR workflow for crowdsourced link verification |
| **Analytics & Telemetry (Privacy-First)** | P2 | Opt-in, anonymized usage stats for resource popularity |
| **Internationalization (i18n)** | P3 | Hindi + Bengali UI + region-specific exam data |

---

## 🏗️ Phase 1: Data Expansion & Quality (Weeks 1–4)

### 1.1 New Examination Categories (P0)
**Target**: Add `Engineering & Tech`, `Medical`, `Management` categories per `ExamCategoryType` union.

| Exam | Category | Official Portal | Status |
|------|----------|-----------------|--------|
| GATE (all papers) | Engineering & Tech | gate.iitm.ac.in | 🔄 Planned |
| JEE Main / Advanced | Engineering & Tech | jeemain.nta.nic.in | 🔄 Planned |
| NEET UG | Medical | neet.nta.nic.in | 🔄 Planned |
| INI CET / AIIMS PG | Medical | aiimsexams.ac.in | 🔄 Planned |
| CAT (extended) | Management | iimcat.ac.in | ✅ Exists |
| XAT / SNAP / NMAT | Management | xatonline.in | 🔄 Planned |
| State PSC (Maharashtra, UP, Bihar, etc.) | Government | Various | 🔄 Planned |
| NDA / CDS (extended) | Government | upsc.gov.in | ✅ Exists |
| UGC-NET / JRF (83 Subjects & Paper 1) | Government | ugcnet.nta.ac.in | ✅ [planfornet.md](planfornet.md) |

**Implementation**:
- Edit `src/data/examsData.ts` — add `ExamInfo` entries following existing patterns
- Add custom SVG emblems in `src/components/common/ExamEmblems.tsx` (dispatcher: `getExamEmblem`)
- Verify every `resourceUrl` points to official/OER source (no pirated content)
- Run `npm run build` to validate TypeScript

### 1.2 Study Material Library Expansion (P0)
**Target**: 500+ curated documents (currently ~10 seeded)

| Category | Priority Sources |
|----------|------------------|
| NCERT & Open Textbooks | ncert.nic.in, e-pathshala.nic.in, openstax.org |
| Official PYQs | upsc.gov.in, ssc.gov.in, ibps.in, rrbapply.gov.in, ets.org |
| NPTEL Courseware | nptel.ac.in, swayam.gov.in (CSV export available) |
| Formula Sheets | Faculty-shared repos, GitHub gists (verified) |
| Vocabulary Repositories | wordnet, GRE/GMAT word lists (open license) |

**Implementation**:
- Extend `src/data/studyMaterialData.ts` with `StudyMaterialItem[]`
- Use `chapterPdfUrls` for granular chapter-level access where available
- Add `directPdfUrl` for one-click downloads from open portals
- Consider a build-time script to validate all URLs (HEAD requests)

### 1.3 Platform Directory Enhancement (P1)
- Add regional platforms: **SWAYAM PRABHA** (TV channels), **CEC** (UG courseware), **Virtual Labs** (IIT), **DIKSHA** (state-level)
- Add international: **Coursera Audit**, **edX Audit**, **FutureLearn Free**, **Saylor Academy**
- Ensure `accessType` accurately reflects licensing (CC BY, CC BY-NC-SA, Public Domain, Govt Distribution)

---

## 🤖 Phase 2: AI-Powered Features (Weeks 5–10)

### 2.1 Personalized Study Plan Generator (P1)
**Concept**: User selects exam + available hours/week + target date → AI generates week-by-week roadmap mapping to existing `topicResources`.

**Technical Approach**:
```
User Input → LLM Prompt (with examData as context) → Structured JSON Plan → React State → UI
```

**Data Required** (already in `examsData.ts`):
- `topicResources[]` with `topicName`, `resourceUrl`, `isFreeOpenSource`
- `syllabusHighlights`, `popularTopics`
- `recommendedTextbooks[]`

**Implementation Options**:
| Option | Pros | Cons |
|--------|------|------|
| **Client-side WebLLM** (WebGPU) | Fully offline, privacy-first | Large model download (~2–4 GB), requires WebGPU |
| **Serverless Function** (Vercel Edge + Groq/OpenRouter) | Fast, small bundle | API cost, requires network |
| **Local Ollama + Tauri** | Full control, desktop app | Not web-native |
| **Hybrid** (WebLLM for premium, API fallback) | Best of both | Complexity |

**Recommendation**: Start with **serverless function** (Vercel Edge Function calling Groq `llama-3.1-70b` or similar) for rapid iteration. Add WebLLM as progressive enhancement.

**New Files**:
```
src/
├── ai/
│   ├── generateStudyPlan.ts      # Prompt engineering + schema validation
│   ├── types.ts                  # StudyPlan, WeeklyPlan, DailyTask interfaces
│   └── prompts/
│       └── studyPlanPrompt.txt
├── components/ai/
│   ├── StudyPlanGenerator.tsx    # Form + results display
│   ├── PlanCalendar.tsx          # Week-by-week visual calendar
│   └── PlanExport.tsx            # PDF/ICS/Markdown export
├── pages/ai/
│   └── StudyPlannerPage.tsx      # Route: /ai/planner
└── hooks/
    └── useStudyPlan.ts           # State management + persistence
```

### 2.2 AI Tutor / Q&A Assistant (P2)
- Context-aware chat grounded in exam syllabus + open resources
- RAG over `examsData.ts` + `studyMaterialData.ts` (embed at build time)
- Cite sources with direct links to OER

### 2.3 Smart Revision Scheduler (P2)
- Spaced repetition algorithm over `topicResources`
- Integrate with browser notifications / PWA push
- Export to Google Calendar / ICS

---

## 📱 Phase 3: PWA & Offline-First (Weeks 11–14)

### 3.1 Service Worker & Caching Strategy
| Asset Type | Strategy | Rationale |
|------------|----------|-----------|
| Static JS/CSS | `CacheFirst` (workbox) | Immutable hashes, long-term cache |
| HTML (`index.html`) | `NetworkFirst` | Always fresh SPA shell |
| Data JSON (embedded) | `CacheFirst` | Bundled in JS, no separate request |
| PDF Resources | `StaleWhileRevalidate` + `CacheableResponsePlugin` | Large files, offline access |
| External OER Links | `NetworkOnly` | Always verify live URL |

**Tools**: `vite-plugin-pwa` (Workbox), `idb` for IndexedDB

### 3.2 Offline Data Layer
```typescript
// src/offline/db.ts
interface OfflineExam {
  id: string;
  name: string;
  topicResources: ExamTopicResource[];  // Full roadmap data
  studyMaterials: StudyMaterialItem[];   // Library entries for this exam
}
```
- Pre-cache all exam roadmaps + study materials on first visit
- Background sync when online
- "Available Offline" badge in UI

### 3.3 Install Prompt & App Manifest
- `manifest.json`: name, icons, theme_color, display: "standalone"
- Custom install button in Navbar (desktop) / MobileNav (mobile)
- Shortcuts: `/exams`, `/library`, `/ai/planner`

---

## 👥 Phase 4: Community & Contribution Pipeline (Weeks 15–18)

### 4.1 "Report Broken Link" Feature
- Floating button on each resource card / roadmap item
- Opens pre-filled GitHub Issue template with:
  - Exam ID, resource URL, user agent, timestamp
  - Auto-label: `broken-link`, `exam:<id>`
- Rate-limited via GitHub API (OAuth App or Fine-Grained PAT)

### 4.2 Crowdsourced Link Verification
- Monthly GitHub Action: `link-checker.yml` runs `lychee` or custom script on all URLs
- Results posted as PR comments / Issues
- Contributors earn "Verifier" badge in README contributors list

### 4.3 Data Contribution Guide
- `CONTRIBUTING.md` with exact JSON schemas + examples
- VS Code snippets for `ExamInfo`, `StudyMaterialItem`, `LearningPlatformInfo`
- Automated PR checks: `npm run build` + custom script validating:
  - All URLs return 2xx/3xx
  - `isFreeOpenSource: true` only for verified open licenses
  - Category enums match `types/index.ts`

---

## 📊 Phase 5: Privacy-First Analytics (Weeks 19–22)

### 5.1 Implementation Principles
- **No cookies, no localStorage tracking, no fingerprinting**
- **Opt-in only** (banner on first visit, dismissible forever)
- **Aggregated only** — no user IDs, no session replay
- **Self-hosted** (Umami / Plausible on Vercel) or **client-side only** (sendBeacon to `/api/analytics`)

### 5.2 Key Metrics
| Metric | Purpose |
|--------|---------|
| Page views per route | Popular exam pages, library usage |
| Resource click-throughs | Which OER links are most valuable |
| Search queries (anonymized) | Gaps in coverage, user intent |
| PWA install rate | Offline feature adoption |
| AI planner usage | Feature validation |

### 5.3 Technical Stack
- `vercel/analytics` (if opt-in) or custom `/api/analytics` Edge Function
- `navigator.sendBeacon` for non-blocking POST
- Data retention: 90 days auto-delete

---

## 🌐 Phase 6: Internationalization (Weeks 23–28)

### 6.1 Supported Locales
| Locale | Code | Priority | Exam Coverage |
|--------|------|----------|---------------|
| English (US) | `en-US` | ✅ Base | All |
| Hindi (India) | `hi-IN` | P3 | Government, Engineering, Medical |
| Bengali (India) | `bn-IN` | P3 | WBCS, WB TET, State exams |

### 6.2 Architecture
- **Library**: `react-i18next` + `i18next-browser-languagedetector`
- **Translation Files**: `public/locales/{en,hi,bn}/common.json`, `exams.json`, `ui.json`
- **Data Localization**: Extend `ExamInfo` with optional `name_hi`, `description_hi`, etc.
- **URL Strategy**: `/hi/exams/upsc`, `/bn/exams/wbcs` (prefix) OR accept-language header

### 6.3 Font Support
- Add Noto Sans Devanagari, Noto Sans Bengali to `index.html`
- Tailwind `font-sans` fallback chain per locale

---

## 🔧 Technical Debt & Refactoring (Ongoing)

| Area | Issue | Fix |
|------|-------|-----|
| **Bundle Size** | `lucide-react` + all icons bundled | Tree-shake: `import { Icon } from 'lucide-react'` (already done), audit with `vite-bundle-analyzer` |
| **Type Safety** | `any` in `harvester.mjs` | Migrate harvester to TypeScript + strict mode |
| **Testing** | Zero tests | Add Vitest + React Testing Library (unit), Playwright (e2e) |
| **Accessibility** | Manual audit only | Add `axe-core` in CI, `eslint-plugin-jsx-a11y` |
| **Performance** | No Lighthouse CI | Add GitHub Action: `lighthouse-ci` on PR |
| **SEO** | Basic meta tags only | Add structured data (JSON-LD), sitemap.xml generation at build |

---

## 📦 New Scripts & Tooling

| Script | Purpose | Location |
|--------|---------|----------|
| `npm run validate:links` | Check all URLs in data files return 2xx | `scripts/validate-links.ts` |
| `npm run generate:sitemap` | Generate `sitemap.xml` from routes + exam data | `scripts/generate-sitemap.ts` |
| `npm run validate:licenses` | Verify `licenseType` against SPDX list | `scripts/validate-licenses.ts` |
| `npm run typecheck` | `tsc --noEmit` (already in build) | — |
| `npm run lint` | ESLint + Prettier + a11y | — |
| `npm run test` | Vitest unit tests | — |
| `npm run test:e2e` | Playwright e2e tests | — |
| `npm run analyze` | Bundle analysis (`vite-bundle-analyzer`) | — |

---

## 🗺️ Route Map (Current + Planned)

| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ | Landing dashboard |
| `/exams` | ✅ | Directory with filters |
| `/exams/:id` | ✅ | Roadmap + resources |
| `/library` | ✅ | Study materials + modal |
| `/platforms` | ✅ | 9 global platforms |
| `/directory` | ✅ | Complete exam catalogue |
| `/about` | ✅ | Mission + principles |
| `/blogs` | ✅ | Blog listing |
| `/blogs/:slug` | ✅ | Blog detail |
| `/blogs/contribute` | ✅ | Contribution form |
| `/ai/planner` | 🔄 **Planned** | Personalized study plan generator |
| `/ai/tutor` | 🔄 **Planned** | Q&A assistant |
| `/ai/revision` | 🔄 **Planned** | Spaced repetition scheduler |
| `/contribute` | 🔄 **Planned** | Link verification dashboard |
| `/settings` | 🔄 **Planned** | Preferences, offline sync, locale |

---

## 🚀 Deployment & CI/CD

### Current (Vercel)
- Auto-deploy on push to `main`
- `vercel.json` handles SPA rewrites
- Build command: `npm run build` (includes `tsc`)
- Output: `dist/`

### Enhanced Pipeline (GitHub Actions)
```yaml
# .github/workflows/ci.yml
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps: [checkout, setup-node, npm ci, npm run lint]
  typecheck:
    runs-on: ubuntu-latest
    steps: [checkout, setup-node, npm ci, npm run typecheck]
  test:
    runs-on: ubuntu-latest
    steps: [checkout, setup-node, npm ci, npm run test]
  build:
    needs: [lint, typecheck, test]
    runs-on: ubuntu-latest
    steps: [checkout, setup-node, npm ci, npm run build]
  lighthouse:
    needs: build
    runs-on: ubuntu-latest
    steps: [checkout, setup-node, npm ci, npm run build, lhci autorun]
  link-check:
    schedule: ['0 3 * * 0']  # Weekly Sunday 3 AM
    runs-on: ubuntu-latest
    steps: [checkout, setup-node, npm ci, npm run validate:links]
```

---

## 📈 Success Metrics & KPIs

| Metric | Current | Target (6mo) | Measurement |
|--------|---------|--------------|-------------|
| Exams Covered | 15 | 25+ | `examsData.ts` length |
| Study Materials | ~10 | 500+ | `studyMaterialData.ts` length |
| Platforms Indexed | 9 | 15+ | `platformsData.ts` length |
| Build Time | ~30s | <45s | CI logs |
| Bundle Size (gz) | ~180 KB | <250 KB | `npm run analyze` |
| Lighthouse Perf | TBD | ≥90 | Lighthouse CI |
| Lighthouse A11y | TBD | ≥95 | Lighthouse CI |
| PWA Install Rate | 0% | >5% | Analytics (opt-in) |
| AI Planner Adoption | N/A | >10% of sessions | Analytics (opt-in) |
| Community PRs/mo | 0 | 5+ | GitHub Insights |

---

## 🔗 Related Files & References

- **Architecture Decision Records**: `docs/adr/` (to be created)
- **Design System**: `tailwind.config.js`, `src/index.css`
- **Data Schemas**: `src/types/index.ts`
- **Executive Presentation**: `TechnoWallah_Executive_Presentation.pptx` (regenerate via `python scripts/generate_ppt.py`)
- **Harvester Script**: `scripts/harvester.mjs` (data collection automation)
- **R2 Uploader**: `scripts/r2-uploader.mjs` (Cloudflare R2 for PDF hosting)

---

## 📝 Notes for Contributors

1. **Data First**: All features drive from typed data in `src/data/`. UI is a pure projection.
2. **Zero Backend**: No database, no auth, no server state. Keep it that way.
3. **Verify Sources**: Every `url` must be official/OER. No pirated PDFs, no paywalled content.
4. **Mobile First**: Test on real devices (iOS Safari, Chrome Android). Bottom nav, drawer, safe areas.
5. **Accessibility**: 44px touch targets, semantic HTML, ARIA labels, keyboard navigation.
6. **Performance**: No third-party scripts. Static assets only. Bundle budget: 250 KB gzipped.

---

*This plan is a living document. Update it as priorities shift and work completes.*
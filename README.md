<div align="center">

# 🎓 Techno Wallah (technoedu)
### Open-Source Examination Resource Hub & Academic OER Directory

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Ready-black?logo=vercel&style=for-the-badge)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)
[![License: Open Educational Resources](https://img.shields.io/badge/License-OER_Open_Access-emerald?style=for-the-badge)](https://creativecommons.org/)

<p align="center">
  <b>A unified, non-commercial public repository mapping world-class Open Educational Resources (OER), peer-reviewed textbooks, official government portals, and verified Previous Year Question (PYQ) banks to major competitive examination roadmaps.</b>
</p>

[Explore Examinations](#-key-features) • [Open Platforms](#-indexed-open-platforms) • [Getting Started](#-getting-started) • [Deployment](#-deployment-on-vercel)

---

</div>

## 📌 Overview

**Techno Wallah** is an open-access digital learning ecosystem engineered to eliminate paywalls, expensive subscription barriers, and fragmented preparation pipelines for competitive exams. 

Instead of locking knowledge behind commercial paywalls, Techno Wallah curates, aligns, and maps verified open educational content from prestigious institutions (such as **NPTEL, MIT OpenCourseWare, NCERT, OpenStax, and SWAYAM**) directly into structured syllabus roadmaps for competitive exams across India and abroad.

---

## ✨ Key Features

### 1. 🔍 Universal Live Search with Autocomplete
- Global real-time search across exams, subjects, platforms, and syllabus topics.
- Live autocomplete drawer with instant deep-linking to examination detail views and platform portals.

### 2. 🏛️ Comprehensive Target Examination Directory (`/exams`)
- Systematically categorized by:
  - **Study Abroad**: GRE, GMAT, IELTS, TOEFL, Digital SAT.
  - **Government & Civil Services**: UPSC CSE, WBCS (West Bengal PSC), SSC CGL, Banking (IBPS/SBI), Railways (RRB), Defence (NDA/CDS).
  - **Law & Professional Entrances**: CLAT, CUET, CAT & Management.
- Each exam includes official portal links, syllabus breakups, and mapped open repositories.

### 3. 🗺️ Topic-Wise Syllabus Roadmaps (`/exams/:id`)
- Granular breakdown of exam subjects with direct links to verified open-source video lecture series, textbook chapters, and reference materials.

### 4. 📚 Curated Open Study Material Library (`/library`)
- 500+ curated peer-reviewed open textbooks, NCERT foundational series, university lecture compendiums, and formula sheets.
- Multi-dimensional filtering by category, targeted examination, and search keywords.
- Responsive document preview modal displaying license details, page counts, and instant source access.

### 5. 🌐 Global Open Platforms Showcase (`/platforms`)
- Dedicated directory of world-class open learning systems with institutional details, license types, and covered disciplines.

### 6. 📱 Mobile-First Responsive Architecture
- **Thumb-Friendly App Dock (`MobileNav`)**: Fixed glassmorphism bottom navigation bar for seamless one-tap routing across phones.
- **Mobile Drawer with Live Search**: Full search capabilities built directly into the mobile hamburger menu.
- **Horizontal Scrollable Filter Chips**: Edge-to-edge category pill swiping on small screens.
- **Safe Area Insets**: Full compatibility with iOS and Android bottom home indicators.

---

## 🌐 Indexed Open Platforms

Techno Wallah integrates and points to verified public educational repositories:

| Platform | Founding Body / Institution | Coverage |
| :--- | :--- | :--- |
| **NPTEL & SWAYAM** | Ministry of Education, Govt. of India / IITs & IISc | Higher Engineering, Humanities & Sciences |
| **MIT OpenCourseWare** | Massachusetts Institute of Technology (MIT) | Global University Undergraduate & Graduate Syllabi |
| **NCERT e-Pathshala** | NCERT, Govt. of India | Foundational K-12 Textbooks & Core Competencies |
| **OpenStax** | Rice University | Free, Peer-Reviewed College Textbooks |
| **Khan Academy** | Non-Profit Educational Organization | Foundational Math, SAT Prep, and Sciences |
| **e-GyanKosh** | IGNOU | Comprehensive Higher Distance Learning Materials |
| **NDLI** | National Digital Library of India (IIT Kharagpur) | Multi-Disciplinary Scholarly Digital Archive |
| **PRS Legislative Research** | PRS India | Public Policy, Acts & Governance Reference |
| **Internet Archive / Open Library** | Internet Archive | Public Domain Historical & Reference Books |

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Framework** | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build & Tooling** | [Vite 6](https://vitejs.dev/) with Fast Refresh |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + PostCSS + Autoprefixer |
| **Routing** | [React Router v6](https://reactrouter.com/) (with automatic scroll-to-top) |
| **Iconography** | [Lucide React](https://lucide.dev/) |
| **UI Aesthetics** | Glassmorphism, tailored brand palette (`#dc2626`), layered soft drop-shadows |
| **Hosting & CI/CD** | [Vercel](https://vercel.com/) with SPA rewrite configuration |

---

## 📂 Project Structure

```text
technoedu/
├── public/                     # Static assets (campus image, logos, icons)
│   ├── hero-illustration.png   # Campus hero imagery
│   └── logo.png                # Techno Wallah emblem
├── src/
│   ├── components/
│   │   ├── common/             # Reusable UI elements (Exam Emblems, etc.)
│   │   ├── home/               # HeroSection, ExamCategoryGrid, OpenPlatformsSection
│   │   └── layout/             # Navbar, MobileNav, Footer
│   ├── context/                # Global contexts (NotificationContext)
│   ├── data/                   # Structured static databases
│   │   ├── examsData.ts        # Syllabus, exam tags, open platforms map
│   │   ├── platformsData.ts    # Learning platforms directory data
│   │   └── studyMaterialData.ts# Curated textbook & handbook records
│   ├── pages/                  # Page-level route views
│   │   ├── AboutPage.tsx
│   │   ├── ExamDetailPage.tsx
│   │   ├── ExamExplorerPage.tsx
│   │   ├── LandingPage.tsx
│   │   ├── PlatformsDirectoryPage.tsx
│   │   └── StudyMaterialPage.tsx
│   ├── types/                  # TypeScript interface definitions
│   ├── App.tsx                 # Root layout & route configuration
│   ├── index.css               # Base Tailwind layers & custom scrollbar styles
│   └── main.tsx                # React DOM entry point
├── vercel.json                 # Vercel SPA routing rewrite rules
├── tailwind.config.js          # Custom theme extensions (shadows, animations, brand colors)
├── vite.config.ts              # Vite server & build configurations
└── package.json                # Project dependencies and npm scripts
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Version **18.x** or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hrishikeshjh/technoedu.git
   cd technoedu
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at: `http://localhost:3000` (or `http://localhost:5173`).

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Locally preview the production bundle:**
   ```bash
   npm run preview
   ```

---

## ☁️ Deployment on Vercel

This repository is pre-configured for one-click deployment on [Vercel](https://vercel.com/):

1. Go to [vercel.com/new](https://vercel.com/new).
2. Connect your GitHub account and import **`hrishikeshjh/technoedu`**.
3. Vercel automatically detects the Vite configuration:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. The included [`vercel.json`](./vercel.json) automatically ensures all single-page application (SPA) client routes (`/exams`, `/library`, `/platforms`, etc.) resolve to `index.html` without 404 errors on page reload.
5. Click **Deploy**.

---

## 🤝 Contributing

Contributions to expand exam mappings, verify question banks, or index new Open Educational Resources are welcome!

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AddExamResource`).
3. Commit your Changes (`git commit -m "Add open resources for GATE CSE"`).
4. Push to the Branch (`git push origin feature/AddExamResource`).
5. Open a Pull Request.

---

## 📄 License & Attribution

- **Source Code**: Released under the [MIT License](LICENSE).
- **Educational Content & Links**: All courseware, textbook links, and government question papers are the property of their respective originating open platforms (NPTEL, MIT OCW, NCERT, OpenStax, etc.) and are indexed under **Open Educational Resources (OER)** fair educational usage guidelines.

<div align="center">
  <sub>Built with ❤️ for students, lifelong learners, and competitive exam aspirants everywhere.</sub>
</div>

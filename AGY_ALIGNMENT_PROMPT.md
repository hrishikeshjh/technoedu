Fix alignment and spacing issues across all pages in the TechnoEdu project.

Focus areas:
1. **Landing Page** - Check hero section alignment, feature cards grid, How It Works section, footer alignment
2. **Authentication Pages** (/login, /signup, /onboarding) - Form alignment, centering, spacing
3. **Dashboard Page** - Card grids, navigation alignment
4. **Protected Pages** - Consistent container widths, padding, responsive behavior
5. **Navbar** - Logo alignment, link spacing, mobile drawer alignment

Specific issues to check:
- Container max-width consistency (should be max-w-7xl / ~1440px centered)
- Horizontal padding consistency (px-4 sm:px-6 lg:px-8)
- Grid column alignment (features, cards, steps)
- Vertical rhythm/spacing between sections
- Card height consistency in grids
- Mobile hamburger menu alignment
- Footer link alignment
- Form input alignment on auth pages
- Button alignment in hero CTAs
- Mascot illustration centering on mobile

Use existing ScrollReveal, tailwind config, and design tokens. Do not introduce new dependencies.

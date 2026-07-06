# Project Context

## Project Name & Purpose

**Apotek Digital** — A public-facing pharmacy website for a physical pharmacy ("Apotek Digital") located in Padang, West Sumatra, Indonesia. The application digitalizes pharmacy operations by providing:
- A marketing landing page with hero, about, categories, and contact sections.
- Real-time medicine stock/availability checking (fetched from a Laravel backend API).
- Category-based medicine filtering.
- A contact form and WhatsApp integration.
- A link to an external admin/login system hosted on the Laravel backend (`localhost:8000/sistem/login`).

The project is **frontend-only**. The backend is a separate Laravel application exposing a REST API.

## React Stack

- **React**: v19.0.1
- **Build Tool**: Vite 6.2.3 (`@vitejs/plugin-react`)
- **Language**: TypeScript ~5.8.2 (strict `noEmit` mode, bundler module resolution)
- **Styling**: TailwindCSS v4.1.14 (via `@tailwindcss/vite` plugin). Custom theme in `src/index.css` using `@theme` directive with custom colors (`navy-dark`, `mint-green`, `teal-glow`, etc.) and fonts (Plus Jakarta Sans, Space Grotesk).
- **Animations**: GSAP 3.15 (with ScrollTrigger) + Motion 12.23 (`motion/react`).
- **Icons**: Lucide React 0.546.
- **Form Handling**: React Hook Form 7.79.
- **State Management**: Local component state only (`useState`). No Redux, Zustand, Context, or external state library.
- **Data Fetching**: Native `fetch` API wrapped in `src/services/api.ts`. Custom polling hook (`useMedicines`) with 30-second interval. No TanStack Query, SWR, or Axios.
- **UI Library**: None (custom components only).
- **Testing**: None. No test files, no test dependencies, no test config.
- **Linting**: TypeScript type-checking only (`tsc --noEmit` via `npm run lint`). No ESLint or Prettier config files present.

### Other Dependencies

- `@google/genai` v2.4.0 — Google Gemini AI SDK (present in dependencies but no usage found in source files).
- `dotenv` v17.2.3 — Environment variable loading.
- `express` v4.21.2 — Server-side capability for AI Studio deployment (not used in the Vite frontend dev flow).

## Authentication & Authorization

**No authentication is implemented in this frontend project.**

- There is no `AuthProvider`, `useAuth`, `ProtectedRoute`, or any auth context/hook.
- No JWT, cookie, or session-based auth.
- No role-based access control.
- No route protection or middleware.
- The Navbar contains a **"Login Sistem"** button that links externally to `http://localhost:8000/sistem/login` (the Laravel backend's login page). This is a plain `<a>` tag redirect, not a frontend auth flow.

## Project Structure

```
apotek-digital-fe/
├── .agents/                    # Agent customization (skills, rules)
├── .vscode/                    # VS Code settings (minimal)
├── assets/                     # Root-level assets (AI Studio config)
│   └── .aistudio/
├── public/                     # Static public assets
│   ├── favicon.svg
│   └── preview-fe.png
├── src/
│   ├── assets/                 # App assets (1 image: image.png)
│   ├── components/             # All page section components
│   │   ├── ui/                 # Reusable UI primitives
│   │   │   └── SectionReveal.tsx
│   │   ├── About.tsx
│   │   ├── BottleShowcase.tsx
│   │   ├── Categories.tsx
│   │   ├── ContactSection.tsx
│   │   ├── FloatingWhatsApp.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── LocationSection.tsx
│   │   ├── MedicineAvailability.tsx  # Largest component (27KB)
│   │   └── Navbar.tsx
│   ├── data/
│   │   └── mockData.ts         # TypeScript interfaces + static pharmacy profile + category icon mapping + buildCategories utility
│   ├── hooks/
│   │   └── useMedicines.ts     # Data fetching hook with polling
│   ├── services/
│   │   └── api.ts              # API client (fetchMedicines)
│   ├── App.tsx                 # Root component (single-page layout)
│   ├── main.tsx                # Entry point (React 19 createRoot)
│   ├── index.css               # Global styles + Tailwind + custom theme
│   └── vite-env.d.ts           # Image module declarations
├── index.html                  # HTML entry point
├── metadata.json               # AI Studio project metadata
├── package.json
├── tsconfig.json
└── vite.config.ts
```

**Architecture**: Flat, page-section-based. All components are top-level page sections rendered sequentially in `App.tsx`. No feature folders, no domain-driven structure, no atomic design. The `ui/` subfolder contains one reusable animation wrapper (`SectionReveal`).

**Folders that do NOT exist**: `pages/`, `routes/`, `features/`, `modules/`, `layouts/`, `lib/`, `utils/`, `api/`, `store/`, `contexts/`, `providers/`, `types/`, `styles/`, `interfaces/`, `models/`, `schemas/`.

## Routing Summary

**This is a single-page application with NO client-side routing.**

- No React Router, no file-based routing, no dynamic routes.
- All content is rendered in a single `App.tsx` as vertically stacked sections.
- Navigation uses anchor links (`#beranda`, `#tentang`, `#cek-ketersediaan`, `#kategori-obat`, `#lokasi`, `#kontak`) with smooth scrolling.
- No protected routes (no auth).
- No redirects, no 404 handling, no middleware.

### Navigation Sections (anchor-based)

| Anchor               | Component              | Description                          |
|-----------------------|------------------------|--------------------------------------|
| `#beranda`            | `Hero`                 | Landing hero section                 |
| (no anchor)           | `BottleShowcase`       | GSAP scroll-driven bottle animation  |
| `#tentang`            | `About`                | Pharmacy profile bento grid          |
| `#kategori-obat`      | `Categories`           | Interactive category filter grid     |
| `#cek-ketersediaan`   | `MedicineAvailability` | Real-time stock check panel          |
| `#lokasi`             | `LocationSection`      | Google Maps embed                    |
| `#kontak`             | `ContactSection`       | Contact form (React Hook Form)       |

## Data & API Summary

### API Client

- **File**: `src/services/api.ts`
- **Base URL**: `VITE_API_BASE_URL` env var (defaults to `http://localhost:8000`)
- **Single endpoint**: `GET /api/medicines` — fetches all medicines with eager-loaded category relations.
- **Uses**: Native `fetch` with `no-store` cache policy.
- **Error handling**: Custom `ApiError` class with HTTP status.
- **Response mapping**: Normalizes API response to `Medicine` interface (handles both array and `{ data: [...] }` envelope).

### Data Hook

- **File**: `src/hooks/useMedicines.ts`
- **Returns**: `{ medicines, isLoading, error, refetch }`
- **Polling**: Every 30 seconds by default (configurable via `enablePolling` param).
- **Cleanup**: Proper unmount guard via `useRef`.

### TypeScript Interfaces (in `src/data/mockData.ts`)

- `PharmacyProfile` — Static pharmacy info (name, address, hours, maps URLs).
- `Category` — `{ id, name, description }` — mirrors Laravel `categories` table.
- `Medicine` — `{ id, name, generic_name, category_id, category?, manufacturer, unit, price, stock, min_stock, expiry_date, requires_prescription, description, created_at, updated_at }` — mirrors Laravel `medicines` table with FK relation.
- `MedicineCategory` — UI-level category card model.

### Static Data

- `pharmacyProfile` — Hardcoded pharmacy details (address in Padang, WhatsApp number, Google Maps coordinates).
- `categoryIcons` — Maps category names to Lucide icon names.
- `buildCategories()` — Derives category list from medicine data (only categories with stock).

### Environment Variables

| Variable             | Purpose                                    |
|----------------------|--------------------------------------------|
| `GEMINI_API_KEY`     | Google Gemini AI API key (AI Studio)       |
| `APP_URL`            | Hosted app URL (AI Studio)                 |
| `VITE_API_BASE_URL`  | Laravel backend API base URL               |

### Backend Integration

- Backend is a **separate Laravel application** (not in this repo).
- Communicates via REST API at `VITE_API_BASE_URL`.
- Database schema is inferred from TypeScript interfaces only: `medicines` table with FK to `categories` table.
- No Prisma, Drizzle, Supabase, Firebase, or GraphQL.

## Core Features

1. **Hero Section** (`Hero.tsx`, 14KB) — Animated landing section with marquee, gradient backgrounds.
2. **Bottle Showcase** (`BottleShowcase.tsx`, 9KB) — GSAP ScrollTrigger-driven scroll animation with pinning and timeline.
3. **About Section** (`About.tsx`, 9KB) — Bento grid layout showing pharmacy profile, operating hours, and stats.
4. **Category Filter** (`Categories.tsx`, 7KB) — Interactive grid of medicine categories derived from live API data. Filters the stock check panel.
5. **Medicine Availability** (`MedicineAvailability.tsx`, 27KB) — The core feature. Real-time stock checking panel with search, category filtering, pagination, prescription badge indicators. Largest component.
6. **Location** (`LocationSection.tsx`, 6KB) — Embedded Google Maps with pharmacy coordinates.
7. **Contact Form** (`ContactSection.tsx`, 13KB) — Contact form using React Hook Form with client-side validation. Likely generates a WhatsApp message link (no backend POST endpoint visible).
8. **Floating WhatsApp** (`FloatingWhatsApp.tsx`, 3KB) — Timed floating WhatsApp CTA button with pulse animation.
9. **Navbar** (`Navbar.tsx`, 9KB) — Sticky capsule navbar with scroll-aware styling, mobile hamburger menu, smooth scroll navigation.
10. **Footer** (`Footer.tsx`, 7KB) — Site footer with navigation links.

### Reusable UI

- `SectionReveal` (`components/ui/SectionReveal.tsx`) — Motion-powered scroll reveal wrapper (fade-up on viewport entry).

## Testing Summary

**No tests exist.** There are no test files (`*.test.*`, `*.spec.*`), no test directories (`tests/`, `__tests__/`, `e2e/`, `cypress/`, `playwright/`), and no test dependencies or configuration (no Jest, Vitest, Cypress, Playwright, or React Testing Library).

## Build & Deployment

### Scripts

| Script    | Command                              | Purpose                        |
|-----------|--------------------------------------|--------------------------------|
| `dev`     | `vite --port=3000 --host=0.0.0.0`   | Dev server on port 3000        |
| `build`   | `vite build`                         | Production build to `dist/`    |
| `preview` | `vite preview`                       | Preview production build       |
| `clean`   | `rm -rf dist server.js`             | Clean build artifacts          |
| `lint`    | `tsc --noEmit`                       | TypeScript type checking       |

### Deployment

- **Primary target**: Google AI Studio (evidenced by `metadata.json` with `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`, `assets/.aistudio/`, and `DISABLE_HMR` env var handling in Vite config).
- `express` dependency suggests a server-side wrapper for AI Studio Cloud Run deployment.
- No Dockerfile, docker-compose, CI/CD workflows, `vercel.json`, `netlify.toml`, or `firebase.json` found.

### Vite Config Highlights

- Path alias: `@` maps to project root (not `src/`).
- HMR can be disabled via `DISABLE_HMR=true` env var (AI Studio optimization).
- File watching disabled when HMR is off.

## Anything Unusual or Worth Noting

- **`@google/genai` is installed but unused** — No imports of `@google/genai` found in any source file. This may be a leftover from a previous feature or intended for future use. Consider removing if not needed.
- **`express` in production dependencies** — Express is a production dependency despite this being a Vite SPA. It's likely used for AI Studio deployment wrapping but is not part of the frontend dev flow.
- **`dotenv` in production dependencies** — Same AI Studio deployment artifact.
- **Path alias `@` points to project root, not `src/`** — The alias `@` resolves to the project root directory (`.`), not `./src`. This is unusual and means imports like `@/src/components/...` would be needed rather than the more common `@/components/...`.
- **`mockData.ts` is misnamed** — The file contains TypeScript interfaces, static pharmacy profile data, and utility functions. It is not mock data in the testing sense. Consider renaming to `types.ts` + `constants.ts` or similar.
- **No ESLint or Prettier** — Only `tsc --noEmit` for linting. No code formatting enforcement.
- **No client-side routing** — The entire app is a single page. If the app grows to include admin features or multi-page flows, React Router would need to be added.
- **Login is external** — The "Login Sistem" button navigates to the Laravel backend's login page (`localhost:8000/sistem/login`). The frontend has zero auth awareness.
- **SPDX License headers** — Multiple files contain `@license SPDX-License-Identifier: Apache-2.0` comments, suggesting open-source intent or compliance.
- **Indonesian language** — All UI text, comments, and error messages are in Bahasa Indonesia.
- **Large component** — `MedicineAvailability.tsx` at 27KB is very large for a single component and may benefit from decomposition.
- **`clean` script uses Unix `rm -rf`** — Will not work on Windows cmd/PowerShell natively (works in Git Bash or WSL).
- **`vite` is in both dependencies and devDependencies** — Redundant. Should only be in `devDependencies`.

## Generated At

2026-06-29T20:17:49+07:00 — based on current project state at time of analysis.

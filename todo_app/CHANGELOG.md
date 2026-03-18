# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-03-15

### Added

#### Core Application
- Next.js 16 app with App Router
- TypeScript throughout
- TailwindCSS styling
- MongoDB integration

#### Pages (11 total)
- `/` - Home/Landing page with quick add
- `/auth` - Sign in/Sign up/Forgot password
- `/tasks` - Tasks list with CRUD operations
- `/task/[id]` - Task detail view
- `/projects` - Projects management
- `/calendar` - Calendar view (day/week)
- `/search` - Search and filters
- `/settings` - User settings
- `/onboarding` - Product tour
- `/research` - Research file viewer/editor
- `/admin/seeds` - Seed configuration UI

#### Seeded UI Faults (17 total)
- Home: ambiguous CTA, modal no close
- Auth: missing labels, cryptic errors
- Tasks: no confirm delete, small hit targets
- Task: confusing save affordance
- Projects: inconsistent icons, hidden controls
- Calendar: no spinner, ambiguous timepicker
- Search: filters reset, missing no-results help
- Settings: destructive toggle no warn, ambiguous labels
- Onboarding: skip too easy

#### Components
- SeededButton - Button with seeded faults
- SeededInput - Input with seeded faults
- SeededModal - Modal with seeded faults
- SeededToggle - Toggle with seeded faults
- Navigation - Main navigation component

#### API Endpoints
- `GET/POST /api/seed` - Seed management
- `GET/POST /api/research/*` - Research file I/O
- `POST /api/event` - Event logging
- `POST /api/run` - Playwright run registration

#### Database
- MongoDB connection with caching
- Collections: tasks, projects, seeds, events, notes, runs, users
- Helper functions: find, findOne, insertOne, updateOne, deleteOne

#### Testing
- Playwright test suite for all pages
- Smoke test script
- Artifact capture (screenshots, DOM, accessibility)

#### Documentation
- README.md - Main documentation
- research/README.md - Research overview
- research/DECISIONS.md - 10 architectural decisions
- research/ISSUES_LIBRARY.md - 17 seeded issues catalog
- research/DELIVERY_REPORT.md - Verification results
- .env.example - Environment template

### Technical Details
- Framework: Next.js 16.1.6
- React: 19.2.3
- TypeScript: 5.x
- TailwindCSS: 4.x
- MongoDB: 7.1.0
- Playwright: 1.58.2

### Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - ESLint
- `npm run typecheck` - TypeScript check
- `npm run test:playwright` - Playwright tests
- `npm run test:playwright:ui` - Playwright with UI
- `npm run smoke` - Smoke tests

---

**Initial Release** - Complete implementation of Todo App with Seeded Usability Issues for UX detection testing.

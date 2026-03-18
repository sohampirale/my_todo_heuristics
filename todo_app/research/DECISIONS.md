# Decisions Log

This document records architectural and design decisions made during the development of the Todo App with Seeded Usability Issues.

## Date: 2026-03-15

### Decision 1: Next.js App Router

**Context:** Next.js offers both Pages Router and App Router.

**Decision:** Use App Router (Next.js 14+).

**Rationale:**
- Modern React Server Components support
- Better for future extensibility
- Default in latest Next.js versions

**Consequences:**
- API routes use `src/app/api` structure
- Layouts use `layout.tsx` pattern

---

### Decision 2: MongoDB for All Data

**Context:** Could use SQLite, PostgreSQL, or file-based storage.

**Decision:** Use MongoDB for all collections (tasks, projects, seeds, events, notes, runs, users).

**Rationale:**
- Flexible schema for seed flags
- Easy to extend
- URI-based configuration via `.env`

**Consequences:**
- Requires MongoDB connection
- Connection string in `.env`

---

### Decision 3: Seed Persistence

**Context:** Seeds can be stored in `seed.json` or database.

**Decision:** Runtime seeds persist to MongoDB `seeds` collection; `seed.json` provides defaults.

**Rationale:**
- Admin UI changes persist across restarts
- `seed.json` remains the source of truth for initial state

**Consequences:**
- API endpoints read/write to DB
- App may need restart to reload `seed.json` defaults

---

### Decision 4: Playwright for Testing

**Context:** Could use Cypress, Selenium, or custom scripts.

**Decision:** Use Playwright.

**Rationale:**
- Fast, reliable
- Built-in accessibility snapshots
- Good TypeScript support
- Screenshot and DOM capture capabilities

**Consequences:**
- Tests in `/tests/playwright`
- Artifacts in `/captures`

---

### Decision 5: Seeded Wrapper Components

**Context:** Faults could be injected via CSS, JS conditionals, or wrapper components.

**Decision:** Create `SeededButton`, `SeededInput`, etc. that consult runtime seed flags.

**Rationale:**
- Localized fault injection
- Easy to remove later
- Clear separation of concerns

**Consequences:**
- Extra component files in `/src/components/seeded`
- All interactive elements use seeded wrappers

---

### Decision 6: Minimal Auth

**Context:** Full auth system vs. stub.

**Decision:** Minimal auth stub for admin protection (dev-only).

**Rationale:**
- Focus on UI faults, not auth
- Admin page protected by simple secret in dev

**Consequences:**
- `/admin/seeds` uses simple dev secret check
- No production auth implemented

---

### Decision 7: Semantic HTML + ARIA

**Context:** Accessibility requirements.

**Decision:** Use semantic HTML elements and ARIA attributes where needed.

**Rationale:**
- Required for accessibility snapshots
- Best practice for production apps

**Consequences:**
- All interactive elements have `data-testid`
- ARIA labels on key controls

---

### Decision 8: No AI/Analysis Features

**Context:** This repo is for testing detection systems.

**Decision:** Do not implement any AI or analysis features.

**Rationale:**
- Clean separation of concerns
- Future repos will consume artifacts

**Consequences:**
- No ML dependencies
- No analysis logic in codebase

---

### Decision 9: Deterministic Behavior

**Context:** Tests need reproducibility.

**Decision:** All seeded behaviors controlled by `seed.json` and DB.

**Rationale:**
- Reproducible test runs
- Easy to switch between lite/full modes

**Consequences:**
- No randomness in UI behavior
- Playwright config uses fixed viewport

---

### Decision 10: Modular Structure

**Context:** File organization.

**Decision:** Use `/src` with clear subdirectories.

**Rationale:**
- Easy to navigate
- Future-proof for extensions

**Consequences:**
- `/src/app` - Next.js pages
- `/src/components` - Reusable components
- `/src/lib` - DB, seeds, utils
- `/src/hooks` - React hooks
- `/src/types` - TypeScript types
- `/src/styles` - Global styles

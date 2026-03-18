# Quick Reference Guide

**For AI Agents:** Read this file first to understand the project in 5 minutes.

---

## One-Liner

Todo App with **17 intentional UX faults** that can be toggled via `/admin/seeds` for testing detection tools.

---

## Essential Commands

```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build
npm run lint         # ESLint check
npm run typecheck    # TypeScript check
npm run test:playwright  # Run Playwright tests
npm run smoke        # HTTP smoke tests
```

---

## Project Structure (Simplified)

```
todo_app/
├── src/app/              # All pages (/, /tasks, /auth, etc.)
├── src/components/seeded/ # Seeded fault wrappers
├── src/lib/              # MongoDB + seed utilities
├── seed.json             # Seed configuration (IMPORTANT!)
├── info/                 # Issue documentation
└── research/             # Research artifacts
```

---

## All Pages

| Route | Purpose |
|-------|---------|
| `/` | Home with gradient hero |
| `/auth` | Sign in/up forms |
| `/tasks` | Task CRUD + filters |
| `/task/[id]` | Task detail view |
| `/projects` | Project boards |
| `/calendar` | Day/week calendar |
| `/search` | Search + filters |
| `/settings` | User preferences |
| `/onboarding` | Product tour |
| `/research` | Markdown editor |
| `/admin/seeds` | **Toggle UX faults here** |

---

## All 17 Seeded Issues

### Home (`/`)
- `home.ambiguous_cta` - Button says "Do It" instead of "Create Task"
- `home.modal_no_close` - Modal has no X button

### Auth (`/auth`)
- `auth.missing_labels` - No labels on inputs
- `auth.cryptic_error` - Shows "ERR_AUTH_FAIL"

### Tasks (`/tasks`)
- `tasks.no_confirm_delete` - Delete has no confirmation
- `tasks.small_hit_target` - Delete icon is 12x12px

### Task Detail (`/task/[id]`)
- `task.save_affordance_confusing` - Save button looks disabled
- `task.nonstandard_date_format` - Shows "20260315" not "Mar 15, 2026"

### Projects (`/projects`)
- `projects.icons_inconsistent` - Mix of icons and text
- `projects.hidden_controls` - Drag handles only on hover

### Calendar (`/calendar`)
- `calendar.no_spinner` - No loading indicator
- `calendar.ambiguous_timepicker` - 24hr without AM/PM

### Search (`/search`)
- `search.filters_reset` - Filters clear when sorting
- `search.missing_no_results_help` - No suggestions on empty results

### Settings (`/settings`)
- `settings.destructive_toggle_no_warn` - No confirm on delete account
- `settings.ambiguous_toggle_labels` - Labels say "Toggle" / "Enable/Disable"

### Onboarding (`/onboarding`)
- `onboarding.skip_too_easy` - Skip button more prominent than Next

---

## Seed Modes

**lite** - Low/medium severity (~12 issues)  
**full** - All 17 issues

Change in `/admin/seeds` or edit `seed.json`

---

## API Endpoints

```bash
GET  /api/seed              # Get seeds
POST /api/seed              # Update seeds (dev-only)
GET  /api/research/list     # List files
GET  /api/research/read     # Read file
POST /api/research/write    # Write file (dev-only)
POST /api/event             # Log UI event
POST /api/run               # Register test run
```

---

## Database (MongoDB)

Collections: `tasks`, `projects`, `seeds`, `events`, `notes`, `runs`, `users`

Connection string in `.env` as `MONGODB_URI`

---

## Key Files

| File | What It Does |
|------|--------------|
| `seed.json` | Master seed config - **READ THIS FIRST** |
| `src/lib/seeds.ts` | Seed utility functions |
| `src/lib/mongo.ts` | Database connection |
| `src/components/seeded/*` | Components with faults |
| `info/SEEDED_ISSUES.md` | Detailed issue catalog |
| `docs/PROJECT_OVERVIEW.md` | Complete documentation |

---

## How Seeds Work

1. `seed.json` defines default states
2. Admin UI (`/admin/seeds`) toggles flags
3. Flags persist to MongoDB `seeds` collection
4. Components check `isSeedEnabled(page, flag)`
5. If enabled, component renders the fault

Example:
```tsx
const noConfirm = isSeedEnabled('tasks', 'no_confirm_delete');
if (!noConfirm && !confirm('Delete?')) return;
// Delete without confirmation if seed enabled
```

---

## Testing Artifacts

Playwright tests save to `/captures/`:
- `<page>-full.png` - Screenshot
- `<page>-dom.html` - DOM snapshot
- `<page>-ax.json` - Accessibility snapshot
- `<page>.log` - Console logs

---

## Nielsen Heuristics (Reference)

1. Visibility of system status
2. Match between system and real world
3. User control and freedom
4. Consistency and standards
5. Error prevention
6. Recognition rather than recall
7. Flexibility and efficiency of use
8. Aesthetic and minimalist design
9. Help users recognize, diagnose, recover from errors
10. Help and documentation

---

## Common Workflows

### Enable a Specific Issue
1. Go to `/admin/seeds`
2. Find the page
3. Toggle the flag
4. Click "Save Changes"
5. Refresh the page to see the issue

### Run All Tests
```bash
npm run dev &      # Start server in background
npm run test:playwright
```

### Check Build Health
```bash
npm run lint && npm run typecheck && npm run build
```

---

## Environment

```bash
MONGODB_URI=mongodb+srv://...  # Already configured
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development
```

---

## UI Design

- **Colors**: Indigo → Purple → Pink gradients
- **Cards**: White, rounded, shadow-lg
- **Buttons**: Gradient backgrounds
- **Animations**: Fade-in, hover-lift effects
- **Navigation**: Glassmorphism (frosted glass)

---

## What's NOT Implemented

- Real authentication (stub only)
- Production deployment config
- AI/analysis features (different repo)
- Heavy state management

---

## Next Steps for Analysis

1. Start dev server: `npm run dev`
2. Toggle seeds via `/admin/seeds`
3. Run Playwright tests to capture artifacts
4. Analyze:
   - Screenshots for visual issues
   - DOM for structure problems
   - Accessibility snapshots for ARIA violations
   - Console logs for errors

---

**Read Next:** `docs/PROJECT_OVERVIEW.md` for complete details

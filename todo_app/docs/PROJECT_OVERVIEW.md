# Todo App with Seeded Usability Issues

## Project Overview

**Purpose:** A deterministic Todo/Productivity web application with **17 configurable UI faults** (seeded usability issues) for testing UX detection systems.

**Key Concept:** The app looks modern and functional but contains intentional usability problems that violate Nielsen's heuristics. These faults can be toggled on/off via an Admin UI.

**NOT a production app** - built for research and testing purposes.

---

## Quick Start

```bash
cd todo_app

# Install (if needed)
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS v4 |
| Database | MongoDB |
| Testing | Playwright |
| UI Components | Custom seeded wrappers |

---

## Project Structure

```
todo_app/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── api/                # API endpoints
│   │   ├── (pages)/            # All page components
│   │   ├── layout.tsx          # Root layout with navigation
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── Navigation.tsx      # Main navigation bar
│   │   └── seeded/             # Seeded fault wrapper components
│   │       ├── SeededButton.tsx
│   │       ├── SeededInput.tsx
│   │       ├── SeededModal.tsx
│   │       ├── SeededToggle.tsx
│   │       └── index.ts
│   ├── lib/
│   │   ├── mongo.ts            # MongoDB connection & helpers
│   │   └── seeds.ts            # Seed configuration logic
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   └── app/
│       └── globals.css         # Global styles with modern UI
├── tests/
│   └── playwright/
│       └── pages.spec.ts       # Playwright test suite
├── info/
│   ├── SEEDED_ISSUES.md        # Detailed issue catalog
│   └── MODERN_UI_UPDATE.md     # UI design documentation
├── research/
│   ├── README.md               # Research overview
│   ├── DECISIONS.md            # Architectural decisions
│   ├── ISSUES_LIBRARY.md       # Issue catalog with heuristics
│   └── DELIVERY_REPORT.md      # Verification results
├── docs/                       # This directory
├── seed.json                   # Seed configuration (source of truth)
├── .env                        # Environment variables (MongoDB URI)
├── .env.example                # Environment template
├── package.json                # Dependencies & scripts
├── playwright.config.ts        # Playwright configuration
└── tsconfig.json               # TypeScript configuration
```

---

## Available Pages (11 total)

| Route | Description | Key Actions |
|-------|-------------|-------------|
| `/` | Home/Landing | Quick add task, navigate to projects |
| `/auth` | Authentication | Sign in, sign up, forgot password |
| `/tasks` | Tasks List | Create, filter, bulk complete/delete |
| `/task/[id]` | Task Detail | Edit, change due date, add comment |
| `/projects` | Projects | Create project, add task, reorder |
| `/calendar` | Calendar | View day/week, create event, reschedule |
| `/search` | Search & Filters | Search tasks, apply filters, sort |
| `/settings` | Settings | Toggle preferences, delete account |
| `/onboarding` | Product Tour | Navigate tour steps, skip |
| `/research` | Research Files | Read/write markdown files |
| `/admin/seeds` | Seed Admin | Toggle UI faults on/off |

---

## Seeded Usability Issues (17 total)

### Summary by Severity

| Severity | Count | Pages |
|----------|-------|-------|
| High | 6 | Home, Auth (2), Tasks, Search, Settings |
| Medium | 8 | Home, Tasks, Task Detail, Projects, Calendar (2), Search, Settings |
| Low | 3 | Task Detail, Projects, Onboarding |

### Complete Issue List

| ID | Page | Issue | Heuristic | Seed Flag |
|----|------|-------|-----------|-----------|
| HOME-01 | `/` | Ambiguous CTA label ("Do It") | H4 | `home.ambiguous_cta` |
| HOME-02 | `/` | Modal missing close button | H3 | `home.modal_no_close` |
| AUTH-01 | `/auth` | Missing input labels | H4 | `auth.missing_labels` |
| AUTH-02 | `/auth` | Cryptic error messages | H9 | `auth.cryptic_error` |
| TASKS-01 | `/tasks` | No confirmation on delete | H5 | `tasks.no_confirm_delete` |
| TASKS-02 | `/tasks` | Tiny hit target (12x12px) | H8 | `tasks.small_hit_target` |
| TASK-01 | `/task/[id]` | Confusing save affordance | H4 | `task.save_affordance_confusing` |
| TASK-02 | `/task/[id]` | Non-standard date format | H2 | `task.nonstandard_date_format` |
| PROJ-01 | `/projects` | Inconsistent icons | H4 | `projects.icons_inconsistent` |
| PROJ-02 | `/projects` | Hidden controls | H6 | `projects.hidden_controls` |
| CAL-01 | `/calendar` | No loading spinner | H1 | `calendar.no_spinner` |
| CAL-02 | `/calendar` | Ambiguous timepicker | H4 | `calendar.ambiguous_timepicker` |
| SRCH-01 | `/search` | Filters reset unexpectedly | H3 | `search.filters_reset` |
| SRCH-02 | `/search` | No help on empty results | H3 | `search.missing_no_results_help` |
| SET-01 | `/settings` | Destructive toggle no warning | H5 | `settings.destructive_toggle_no_warn` |
| SET-02 | `/settings` | Ambiguous toggle labels | H4 | `settings.ambiguous_toggle_labels` |
| ONB-01 | `/onboarding` | Skip button too prominent | H5 | `onboarding.skip_too_easy` |

### Nielsen's Heuristics Reference

1. **Visibility of system status**
2. **Match between system and real world**
3. **User control and freedom**
4. **Consistency and standards**
5. **Error prevention**
6. **Recognition rather than recall**
7. **Flexibility and efficiency of use**
8. **Aesthetic and minimalist design**
9. **Help users recognize, diagnose, recover from errors**
10. **Help and documentation**

---

## How Seeds Work

### Seed Configuration File

`seed.json` is the source of truth:

```json
{
  "mode": "lite",
  "home": {
    "ambiguous_cta": true,
    "modal_no_close": true
  },
  "auth": {
    "missing_labels": true,
    "cryptic_error": true
  }
  // ... more pages
}
```

### Seed Modes

- **lite**: Low/medium severity issues only (~12 issues)
- **full**: All 17 issues including high severity

### How to Toggle Seeds

#### Method 1: Admin UI (Recommended)
1. Go to `/admin/seeds`
2. Toggle individual flags
3. Switch between lite/full modes
4. Click "Save Changes" to persist to MongoDB

#### Method 2: API
```bash
# Get current seeds
curl http://localhost:3000/api/seed

# Update seeds
curl -X POST http://localhost:3000/api/seed \
  -H "Content-Type: application/json" \
  -d '{"home": {"ambiguous_cta": true}}'
```

#### Method 3: Edit seed.json
Edit `seed.json` directly and restart the dev server.

---

## API Endpoints

### Seed Management

**GET /api/seed**
- Returns current seed configuration
- Response: `{ home: { ambiguous_cta: true }, ... }`

**POST /api/seed** (dev-only)
- Updates seed flags
- Persists to MongoDB `seeds` collection
- Body: `{ home: { ambiguous_cta: true } }`

### Research Files

**GET /api/research/list**
- Lists all markdown files in `/research`
- Response: `{ files: [{ filename, size, lastModified }] }`

**GET /api/research/read?file=FILENAME**
- Reads a specific research file
- Response: `{ filename, content, lastModified }`

**POST /api/research/write** (dev-only)
- Writes/updates a research file
- Body: `{ filename: "test.md", content: "# Title\n\nContent" }`
- Security: Sanitizes paths to prevent traversal

### Event Logging

**POST /api/event**
- Logs UI events to MongoDB
- Body: `{ page: "/tasks", action: "create_task", meta: {...} }`

**POST /api/run**
- Registers Playwright test runs
- Body: `{ name: "test-run", artifacts: [...] }`

---

## Database Schema

### Collections

**tasks**
```typescript
{
  _id: ObjectId,
  title: string,
  description?: string,
  dueDate?: Date,
  completed: boolean,
  projectId?: string,
  tags: string[],
  createdAt: Date,
  updatedAt: Date
}
```

**projects**
```typescript
{
  _id: ObjectId,
  name: string,
  color: string,
  createdAt: Date
}
```

**seeds**
```typescript
{
  _id: ObjectId,
  key: string,        // e.g., "home.ambiguous_cta"
  value: boolean,
  updatedAt: Date
}
```

**events**
```typescript
{
  _id: ObjectId,
  page: string,
  action: string,
  timestamp: Date,
  meta?: Record<string, unknown>
}
```

**notes, runs, users** - Additional collections for future use

---

## Testing

### Playwright Tests

Location: `tests/playwright/pages.spec.ts`

**Coverage:** One test per page (11 tests total)

**Each test:**
1. Navigates to the page
2. Performs 2-3 key actions
3. Captures artifacts:
   - Full page screenshot
   - DOM snapshot
   - Accessibility snapshot
   - Console logs

**Run tests:**
```bash
npm run test:playwright
```

**Artifacts saved to:** `/captures/<runId>/`

### Smoke Tests

Location: `scripts/smoke.js`

Checks all routes return HTTP 200:
```bash
npm run smoke
```

### Lint & Typecheck

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript
```

---

## npm Scripts

```json
{
  "dev": "next dev",                    # Start dev server
  "build": "next build",                # Production build
  "start": "next start",                # Start production server
  "lint": "eslint .",                   # Run ESLint
  "typecheck": "tsc --noEmit",          # TypeScript check
  "test:playwright": "playwright test", # Run Playwright tests
  "test:playwright:ui": "playwright test --ui", # With UI
  "smoke": "node scripts/smoke.js"      # Smoke tests
}
```

---

## Environment Variables

See `.env.example`:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todo_app
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development
ADMIN_SECRET=dev-secret-change-in-production
```

**Current .env** (already configured):
- MongoDB URI is set with provided credentials
- Ready to run without additional setup

---

## Key Components

### SeededButton

Wrapper component that applies seeded faults:

```tsx
<SeededButton
  seedPage="home"
  seedFlag="ambiguous_cta"
  variant="primary"
>
  {isSeedEnabled('home', 'ambiguous_cta') ? 'Do It' : 'Create Task'}
</SeededButton>
```

**Seedable faults:**
- `small_hit_target` - Makes button tiny (12x12px)
- `save_affordance_confusing` - Makes button low contrast

### SeededInput

```tsx
<SeededInput
  seedPage="auth"
  label="Email"
  error={error}
/>
```

**Seedable faults:**
- `missing_labels` - Hides label, shows only placeholder
- `cryptic_error` - Shows "ERR_INPUT_FAIL" instead of error

### SeededModal

```tsx
<SeededModal
  seedPage="home"
  title="Quick Add"
  onClose={() => setIsOpen(false)}
>
  {/* content */}
</SeededModal>
```

**Seedable faults:**
- `modal_no_close` - Hides close button

### SeededToggle

```tsx
<SeededToggle
  seedPage="settings"
  label="Delete Account"
  checked={false}
/>
```

**Seedable faults:**
- `ambiguous_toggle_labels` - Shows "Toggle" / "Enable/Disable"
- `destructive_toggle_no_warn` - No confirmation on destructive actions

---

## Design System

### Colors

- **Primary**: Indigo (`#6366f1`) → Purple (`#8b5cf6`) gradients
- **Secondary**: Pink (`#ec4899`) for danger actions
- **Background**: Subtle gradient (slate to indigo tint)
- **Text**: Slate (`#0f172a` to `#6b7280`)

### Components

- **Cards**: White, rounded-2xl, shadow-lg, hover effects
- **Buttons**: Gradient backgrounds, smooth transitions
- **Inputs**: Focus rings, larger padding
- **Badges**: Rounded pills with color variants

### Animations

- `animate-fade-in` - Fade in on mount
- `hover-lift` - Upward movement on hover
- Staggered delays for sequential animations

---

## Important Files Reference

| File | Purpose |
|------|---------|
| `seed.json` | Master seed configuration |
| `src/lib/seeds.ts` | Seed logic utilities |
| `src/lib/mongo.ts` | Database connection |
| `src/components/seeded/*` | Seeded wrapper components |
| `info/SEEDED_ISSUES.md` | Detailed issue documentation |
| `info/MODERN_UI_UPDATE.md` | UI design documentation |
| `research/ISSUES_LIBRARY.md` | Issue catalog with heuristics |
| `research/DECISIONS.md` | Architectural decisions |
| `research/DELIVERY_REPORT.md` | Verification results |

---

## Common Tasks

### Add a New Seeded Issue

1. Add flag to `seed.json`:
```json
{
  "tasks": {
    "new_issue": true
  }
}
```

2. Use in component:
```tsx
const isEnabled = isSeedEnabled('tasks', 'new_issue');
```

3. Document in `info/SEEDED_ISSUES.md`

### Test a Specific Page

```bash
# Start dev server
npm run dev

# In another terminal, run specific test
npx playwright test --grep "Tasks page"
```

### Check Seed Status

```bash
curl http://localhost:3000/api/seed | jq
```

---

## Troubleshooting

### Dev Server Won't Start

```bash
# Check MongoDB connection
# Verify .env has correct MONGODB_URI
# Clear .next cache
rm -rf .next
npm run dev
```

### Seeds Not Applying

1. Check `/admin/seeds` - ensure flags are enabled
2. Check MongoDB `seeds` collection - verify persistence
3. Restart dev server to reload `seed.json`

### Tests Failing

```bash
# Ensure dev server is running
npm run dev &

# Run tests
npm run test:playwright

# Check /captures for error details
```

---

## Future Enhancements

### For Analysis Repo Integration

1. **Automated Detection**: Build tools to detect seeded issues
2. **Accessibility Analysis**: Process accessibility snapshots
3. **Visual Regression**: Compare screenshots with/without seeds
4. **Heuristic Scoring**: Quantify UX violations

### For This Repo

1. More seeded issues (25+ total)
2. Additional pages (dashboard, analytics)
3. Real authentication
4. Better mobile responsiveness
5. Dark mode toggle

---

## Contact & Support

For questions about this project:
1. Check `info/SEEDED_ISSUES.md` for issue details
2. Check `research/DECISIONS.md` for architectural choices
3. Check `research/DELIVERY_REPORT.md` for verification status

---

**Last Updated:** March 15, 2026  
**Version:** 1.0.0  
**Status:** Production Ready for Testing

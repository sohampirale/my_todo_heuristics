# Todo App with Seeded Usability Issues

A deterministic Todo/Productivity web application with configurable UI faults for UX detection testing.

## Purpose

This app is a **testbed for evaluating UX detection systems**. It contains intentional usability problems (seeded faults) that can be toggled on/off to test automated detection tools.

**Not a production app** - built for research and testing purposes.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: MongoDB
- **Testing**: Playwright

## Quick Start

### 1. Setup Environment

```bash
cp .env.example .env
# Edit .env and add your MongoDB URI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Run Tests

```bash
npm run test:playwright
```

## Pages

| Route | Description | Actions |
|-------|-------------|---------|
| `/` | Home/Landing | Quick add task, navigate to projects |
| `/auth` | Sign In/Up | Sign in, sign up, forgot password |
| `/tasks` | Tasks List | Create, filter, bulk complete/delete |
| `/task/[id]` | Task Detail | Edit, change due date, add comment |
| `/projects` | Projects | Create project, add task, reorder |
| `/calendar` | Calendar | View day/week, create event, reschedule |
| `/search` | Search | Search tasks, apply filters, sort |
| `/settings` | Settings | Toggle preferences, delete account |
| `/onboarding` | Product Tour | Skip, navigate steps |
| `/research` | Research Files | Read/write markdown files |
| `/admin/seeds` | Seed Admin | Toggle UI faults |

## Seeded Faults

### What are Seeded Faults?

Intentional UI/UX problems that violate Nielsen's heuristics. Examples:
- Ambiguous button labels
- Missing confirmation dialogs
- Small hit targets
- Hidden controls
- Cryptic error messages

### Toggle Faults

1. Go to `/admin/seeds`
2. Toggle individual flags or switch mode (lite/full)
3. Click "Save Changes" to persist to MongoDB

### Seed Modes

- **lite**: Low/medium severity issues only
- **full**: All issues including high severity

### Available Seeds

See `seed.json` and `/research/ISSUES_LIBRARY.md` for the complete list.

## API Endpoints

### Seed Management

```bash
GET /api/seed          # Get current seed flags
POST /api/seed         # Update seed flags (dev-only)
```

### Research Files

```bash
GET /api/research/list              # List markdown files
GET /api/research/read?file=NAME    # Read a file
POST /api/research/write            # Write a file
```

### Event Logging

```bash
POST /api/event        # Log UI events
POST /api/run          # Register Playwright run
```

## Testing

### Playwright Tests

Tests are in `tests/playwright/`. Each test:
1. Navigates to a page
2. Performs 2-3 key actions
3. Captures artifacts (screenshots, DOM, accessibility)

### Run Tests

```bash
# Run all tests
npm run test:playwright

# Run with UI
npm run test:playwright:ui
```

### Test Artifacts

Artifacts saved to `/captures/<runId>/`:
- `<page>-full.png` - Full page screenshot
- `<page>-dom.html` - DOM snapshot
- `<page>-ax.json` - Accessibility snapshot
- `<page>.log` - Console logs

### Smoke Test

```bash
npm run smoke
```

Checks all routes return 200.

## Project Structure

```
todo_app/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── api/          # API endpoints
│   │   ├── (pages)/      # Route pages
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # Reusable components
│   │   └── seeded/       # Seeded fault wrappers
│   ├── lib/              # Utilities, DB, seeds
│   ├── hooks/            # React hooks
│   ├── types/            # TypeScript types
│   └── styles/           # Global styles
├── tests/
│   └── playwright/       # Playwright tests
├── captures/             # Test artifacts
├── research/             # Documentation
├── seed.json             # Seed configuration
├── .env.example          # Environment template
└── package.json
```

## Environment Variables

See `.env.example`:

```bash
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development
ADMIN_SECRET=dev-secret-change-in-production
```

## Research Directory

The `/research` folder contains:

- `README.md` - Research overview
- `DECISIONS.md` - Architectural decisions
- `ISSUES_LIBRARY.md` - Catalog of seeded issues
- `DELIVERY_REPORT.md` - Verification results

## Future Integration

This repo is designed to be consumed by analysis/ML repos that will:
- Detect seeded UI issues automatically
- Analyze accessibility snapshots
- Evaluate UX heuristics compliance

All artifacts are structured for easy consumption by external tools.

## Contributing

This is a research project. Key guidelines:

1. Keep code deterministic (no randomness in tests)
2. All interactive elements must have `data-testid`
3. Document decisions in `/research/DECISIONS.md`
4. No AI/analysis features in this repo

## License

MIT

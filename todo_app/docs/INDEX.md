# Documentation Index

**Start Here** — Navigation for all Todo App documentation.

---

## 🚀 Getting Started (Read First)

1. **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** ⭐
   - 5-minute overview
   - Essential commands
   - All 17 issues at a glance
   - **START HERE IF YOU'RE NEW**

2. **[PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)**
   - Complete project documentation
   - Architecture explanation
   - All pages and features
   - Database schema
   - Environment setup

---

## 📚 Detailed Documentation

### API & Integration

3. **[API_REFERENCE.md](./API_REFERENCE.md)**
   - All API endpoints
   - Request/response examples
   - curl examples
   - Error handling
   - Implementation details

### Testing

4. **[TESTING_GUIDE.md](./TESTING_GUIDE.md)**
   - Playwright test setup
   - Running tests
   - Capturing artifacts
   - Debugging tests
   - CI/CD integration

---

## 📋 External Documentation

### In `/info` Directory

- **[SEEDED_ISSUES.md](../info/SEEDED_ISSUES.md)**
  - Page-by-page issue catalog
  - How to trigger each issue
  - Nielsen heuristic mappings
  - Severity levels

- **[MODERN_UI_UPDATE.md](../info/MODERN_UI_UPDATE.md)**
  - UI design system
  - Before/after comparisons
  - Visual improvements
  - Design decisions

### In `/research` Directory

- **[README.md](../research/README.md)**
  - Research overview
  - How to use seeds
  - API endpoints summary

- **[DECISIONS.md](../research/DECISIONS.md)**
  - 10 architectural decisions
  - Rationale for choices
  - Trade-offs documented

- **[ISSUES_LIBRARY.md](../research/ISSUES_LIBRARY.md)**
  - CSV-style issue table
  - Implementation hints
  - Heuristic mappings

- **[DELIVERY_REPORT.md](../research/DELIVERY_REPORT.md)**
  - Verification results
  - Acceptance criteria
  - Build status

---

## 🎯 Common Tasks

### I want to...

| Goal | Read This |
|------|-----------|
| Understand the project quickly | `QUICK_REFERENCE.md` |
| See all seeded issues | `../info/SEEDED_ISSUES.md` |
| Run tests | `TESTING_GUIDE.md` |
| Use the API | `API_REFERENCE.md` |
| Understand architecture | `PROJECT_OVERVIEW.md` |
| Toggle UX faults | `../info/SEEDED_ISSUES.md` → "How to Toggle" |
| Add a new issue | `PROJECT_OVERVIEW.md` → "Common Tasks" |
| Debug a test | `TESTING_GUIDE.md` → "Debugging Tests" |

---

## 📁 File Structure Reference

```
todo_app/
├── docs/                      # ← You are here
│   ├── INDEX.md              # This file
│   ├── QUICK_REFERENCE.md    # ⭐ Start here
│   ├── PROJECT_OVERVIEW.md   # Complete docs
│   ├── API_REFERENCE.md      # API details
│   └── TESTING_GUIDE.md      # Testing docs
├── info/
│   ├── SEEDED_ISSUES.md      # Issue catalog
│   └── MODERN_UI_UPDATE.md   # UI design
├── research/
│   ├── README.md             # Research overview
│   ├── DECISIONS.md          # Architecture decisions
│   ├── ISSUES_LIBRARY.md     # Issue library
│   └── DELIVERY_REPORT.md    # Verification
├── src/
│   ├── app/                  # Pages & API routes
│   ├── components/           # React components
│   ├── lib/                  # Utilities
│   └── types/                # TypeScript types
├── tests/
│   └── playwright/           # E2E tests
├── captures/                 # Test artifacts
├── seed.json                 # Seed configuration
└── package.json              # Dependencies
```

---

## 🔑 Key Concepts

### Seeded Usability Issues

The app contains **17 intentional UX faults** that violate Nielsen's heuristics. These can be toggled on/off to test detection tools.

**Example Issues:**
- Ambiguous button labels
- Missing confirmation dialogs
- Tiny click targets
- Hidden controls

### Seed Modes

- **lite**: ~12 low/medium severity issues
- **full**: All 17 issues including high severity

### How to Toggle

1. Go to `/admin/seeds`
2. Toggle flags on/off
3. Click "Save Changes"
4. Refresh page to see effect

---

## 🎓 For AI Agents

If you're an AI agent reading this for the first time:

1. **Read `QUICK_REFERENCE.md`** (5 min)
   - Understand the project purpose
   - Learn the 17 seeded issues
   - See all pages and routes

2. **Read `PROJECT_OVERVIEW.md`** (15 min)
   - Deep dive into architecture
   - Understand seed mechanism
   - Learn database schema

3. **Reference as needed:**
   - `API_REFERENCE.md` for API calls
   - `TESTING_GUIDE.md` for test execution
   - `../info/SEEDED_ISSUES.md` for issue details

**You should now understand:**
- What the app does
- How seeds work
- How to toggle issues
- How to run tests
- Where artifacts are stored

---

## 📞 Quick Help

### Command Not Working?

```bash
# Check if server is running
curl http://localhost:3000

# Check MongoDB connection
npm run dev 2>&1 | grep -i mongo

# Verify seeds
curl http://localhost:3000/api/seed
```

### Tests Failing?

```bash
# Ensure dev server is running
npm run dev &

# Wait for server
sleep 10

# Run tests
npm run test:playwright
```

### Build Errors?

```bash
# Clear cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

---

## 📊 Documentation Status

| Document | Status | Last Updated |
|----------|--------|--------------|
| QUICK_REFERENCE.md | ✅ Complete | 2026-03-15 |
| PROJECT_OVERVIEW.md | ✅ Complete | 2026-03-15 |
| API_REFERENCE.md | ✅ Complete | 2026-03-15 |
| TESTING_GUIDE.md | ✅ Complete | 2026-03-15 |
| INDEX.md | ✅ Complete | 2026-03-15 |

---

## 🔗 External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Playwright Documentation](https://playwright.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Nielsen's Heuristics](https://nngroup.com/articles/ten-usability-heuristics)

---

**Need more help?** Check `PROJECT_OVERVIEW.md` → "Troubleshooting" section

**Last Updated:** March 15, 2026  
**Version:** 1.0.0

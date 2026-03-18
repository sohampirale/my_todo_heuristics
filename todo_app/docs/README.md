# Todo App Documentation

**Comprehensive documentation for the Todo App with Seeded Usability Issues**

---

## 🚀 Quick Start

**For AI Agents or New Developers:** Read in this order:

1. **[INDEX.md](./INDEX.md)** - Start here for navigation
2. **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - 5-minute overview ⭐
3. **[PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)** - Complete documentation
4. **[API_REFERENCE.md](./API_REFERENCE.md)** - API details
5. **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Testing guide

---

## 📚 Available Documentation

### Core Documentation

| File | Purpose | Read Time |
|------|---------|-----------|
| [INDEX.md](./INDEX.md) | Documentation navigation | 2 min |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | Essential info at a glance | 5 min |
| [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) | Complete project guide | 15 min |
| [API_REFERENCE.md](./API_REFERENCE.md) | API endpoint reference | 10 min |
| [TESTING_GUIDE.md](./TESTING_GUIDE.md) | Testing & artifacts | 10 min |

### Additional Resources

| Location | Content |
|----------|---------|
| [`/info/SEEDED_ISSUES.md`](../info/SEEDED_ISSUES.md) | Detailed issue catalog |
| [`/info/MODERN_UI_UPDATE.md`](../info/MODERN_UI_UPDATE.md) | UI design documentation |
| [`/research/`](../research/) | Research artifacts & decisions |

---

## 🎯 What You'll Learn

After reading the documentation, you will understand:

- ✅ Project purpose and architecture
- ✅ All 17 seeded usability issues
- ✅ How to toggle issues via Admin UI
- ✅ All pages and their functionality
- ✅ API endpoints and usage
- ✅ How to run tests and capture artifacts
- ✅ Database schema and collections
- ✅ Design system and UI components

---

## 📖 Documentation Files

### 1. INDEX.md

**Purpose:** Documentation navigation and quick links

**Contains:**
- Reading order guide
- File structure reference
- Common tasks table
- Quick help commands

**Best for:** First-time visitors orienting themselves

---

### 2. QUICK_REFERENCE.md

**Purpose:** Essential information in 5 minutes

**Contains:**
- One-liner project description
- Essential commands
- All pages table
- All 17 issues with seed flags
- Seed modes explanation
- API endpoints summary
- Common workflows

**Best for:** Quick lookups and reminders

---

### 3. PROJECT_OVERVIEW.md

**Purpose:** Complete project documentation

**Contains:**
- Project overview and purpose
- Tech stack details
- Project structure
- All 11 pages explained
- All 17 seeded issues detailed
- How seeds work (3 methods)
- API endpoints with examples
- Database schema
- npm scripts
- Environment variables
- Key components explained
- Design system
- Troubleshooting guide

**Best for:** Deep understanding of the entire project

---

### 4. API_REFERENCE.md

**Purpose:** Complete API documentation

**Contains:**
- GET/POST /api/seed
- GET/POST /api/research/*
- POST /api/event
- POST /api/run
- Request/response examples
- curl examples
- JavaScript/TypeScript examples
- Error handling
- MongoDB collections used
- Implementation details

**Best for:** API integration and testing

---

### 5. TESTING_GUIDE.md

**Purpose:** Comprehensive testing guide

**Contains:**
- Playwright setup
- Running tests (full suite, specific, with UI)
- Test coverage table
- Artifact types and locations
- Manual artifact capture
- Test configuration
- Smoke tests
- Lint & typecheck
- Testing seeded issues
- CI/CD integration example
- Debugging techniques
- Common issues and solutions

**Best for:** Running and debugging tests

---

## 🔑 Key Concepts

### Seeded Usability Issues

**17 intentional UX faults** embedded in the app:

| Category | Count | Examples |
|----------|-------|----------|
| High Severity | 6 | No confirm delete, missing labels |
| Medium Severity | 8 | Tiny hit targets, ambiguous labels |
| Low Severity | 3 | Inconsistent icons, non-standard dates |

**Toggle via:** `/admin/seeds` or API

### Seed Modes

- **lite**: ~12 issues (low/medium severity)
- **full**: 17 issues (all severities)

### Pages

11 pages total, each with 2-3 user actions and seeded faults.

---

## 💡 Common Use Cases

### Use Case 1: Understand the Project

```
Read: INDEX.md → QUICK_REFERENCE.md → PROJECT_OVERVIEW.md
Time: 20 minutes
Result: Complete understanding of architecture and features
```

### Use Case 2: Test a Specific Issue

```
1. Read: info/SEEDED_ISSUES.md (find issue)
2. Go to: /admin/seeds (enable issue)
3. Navigate to: Specific page (observe issue)
Time: 2 minutes
```

### Use Case 3: Run All Tests

```
1. Read: TESTING_GUIDE.md → "Running Tests"
2. Run: npm run test:playwright
3. Check: /captures/ for artifacts
Time: 5 minutes
```

### Use Case 4: Use the API

```
1. Read: API_REFERENCE.md
2. Find: Specific endpoint
3. Copy: Example curl command
4. Modify: Parameters as needed
Time: 3 minutes
```

---

## 🎓 For AI Agents

**Optimal Reading Path:**

1. **QUICK_REFERENCE.md** (5 min)
   - Get project overview
   - See all issues at a glance
   - Learn essential commands

2. **PROJECT_OVERVIEW.md** (15 min)
   - Understand architecture
   - Learn seed mechanism
   - See database schema

3. **Reference as needed:**
   - API_REFERENCE.md for API calls
   - TESTING_GUIDE.md for tests
   - SEEDED_ISSUES.md for issue details

**Outcome:** Full project understanding in 20 minutes

---

## 📁 File Structure

```
todo_app/
├── docs/
│   ├── INDEX.md              ← Start here
│   ├── QUICK_REFERENCE.md    ← Essential info
│   ├── PROJECT_OVERVIEW.md   ← Complete guide
│   ├── API_REFERENCE.md      ← API docs
│   └── TESTING_GUIDE.md      ← Testing docs
├── info/
│   ├── SEEDED_ISSUES.md      ← Issue catalog
│   └── MODERN_UI_UPDATE.md   ← UI design
├── research/
│   ├── README.md             ← Research overview
│   ├── DECISIONS.md          ← Architecture decisions
│   ├── ISSUES_LIBRARY.md     ← Issue library
│   └── DELIVERY_REPORT.md    ← Verification
└── [source code]
```

---

## ✅ Documentation Checklist

Before considering documentation complete, verify:

- [x] Project purpose is clear
- [x] All 17 issues are documented
- [x] All pages are listed
- [x] API endpoints are explained
- [x] Testing process is covered
- [x] Seed mechanism is explained
- [x] Examples are provided
- [x] Common tasks are documented
- [x] Troubleshooting section exists
- [x] File structure is shown

---

## 🔄 Updating Documentation

When making changes:

1. **Code changes** → Update PROJECT_OVERVIEW.md
2. **New API endpoint** → Update API_REFERENCE.md
3. **New seeded issue** → Update:
   - QUICK_REFERENCE.md (issue list)
   - PROJECT_OVERVIEW.md (detailed)
   - info/SEEDED_ISSUES.md (catalog)
4. **Test changes** → Update TESTING_GUIDE.md

---

## 📞 Support

**Documentation Issues:**
- Missing information? → Check PROJECT_OVERVIEW.md
- Can't find something? → Use INDEX.md navigation
- Confused about seeds? → Read info/SEEDED_ISSUES.md
- API not working? → Check API_REFERENCE.md examples

---

**Last Updated:** March 15, 2026  
**Version:** 1.0.0  
**Status:** Complete ✅

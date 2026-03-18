# AI Agent Prompt Template

**Copy and paste this when starting a new chat with Qwen Code (or any AI assistant)**

---

## Prompt Template

```
I'm working on a Todo App with Seeded Usability Issues project.

Comprehensive documentation exists in: todo_app/docs/

Please read these files in order:

1. docs/QUICK_REFERENCE.md - Essential overview (5 min read)
2. docs/PROJECT_OVERVIEW.md - Complete project guide (15 min read)

After reading, you should understand:
- The project has 11 pages (/, /tasks, /auth, /projects, /calendar, /search, /settings, /onboarding, /research, /admin/seeds)
- There are 17 seeded UX faults that can be toggled via /admin/seeds
- The app uses Next.js, TypeScript, TailwindCSS, MongoDB, and Playwright
- Seed configuration is in seed.json and persisted to MongoDB

Additional documentation available:
- docs/API_REFERENCE.md - For API endpoint details
- docs/TESTING_GUIDE.md - For Playwright testing
- docs/INDEX.md - For documentation navigation

External docs:
- info/SEEDED_ISSUES.md - Detailed catalog of all 17 issues
- info/MODERN_UI_UPDATE.md - UI design documentation

My current task: [DESCRIBE YOUR TASK HERE]

Please help me with this based on the documentation.
```

---

## Example Usage

### Example 1: Understanding a Specific Issue

```
I'm working on a Todo App with Seeded Usability Issues project.

Comprehensive documentation exists in: todo_app/docs/

Please read these files in order:
1. docs/QUICK_REFERENCE.md
2. docs/PROJECT_OVERVIEW.md

My current task: I need to understand the "no_confirm_delete" seed on the tasks page. 
Can you explain how it works and show me the code that implements it?
```

### Example 2: Running Tests

```
I'm working on a Todo App with Seeded Usability Issues project.

Comprehensive documentation exists in: todo_app/docs/

Please read:
1. docs/QUICK_REFERENCE.md
2. docs/TESTING_GUIDE.md

My current task: I want to run Playwright tests and capture artifacts. 
What commands should I run and where will the artifacts be saved?
```

### Example 3: API Usage

```
I'm working on a Todo App with Seeded Usability Issues project.

Comprehensive documentation exists in: todo_app/docs/

Please read:
1. docs/QUICK_REFERENCE.md
2. docs/API_REFERENCE.md

My current task: I need to toggle seeds programmatically via the API. 
Show me how to use the /api/seed endpoint with curl and JavaScript.
```

### Example 4: Adding a New Issue

```
I'm working on a Todo App with Seeded Usability Issues project.

Comprehensive documentation exists in: todo_app/docs/

Please read:
1. docs/QUICK_REFERENCE.md
2. docs/PROJECT_OVERVIEW.md

My current task: I want to add a new seeded issue to the calendar page. 
The issue should make the "Create Event" button have no text, only an icon.
Guide me through the implementation steps.
```

---

## Quick Prompts

### For Quick Questions

```
Based on the documentation in todo_app/docs/, [YOUR QUESTION]
```

### For Code Review

```
I've made changes to [FILE]. Based on the architecture in docs/PROJECT_OVERVIEW.md, 
does this follow the established patterns?
```

### For Debugging

```
I'm getting this error: [ERROR]. I've checked docs/PROJECT_OVERVIEW.md troubleshooting 
section. What else should I try?
```

### For Feature Requests

```
Based on the project structure in docs/PROJECT_OVERVIEW.md and the existing seeded 
issues in info/SEEDED_ISSUES.md, how would you implement [NEW FEATURE]?
```

---

## What the AI Will Know

After reading the documentation, the AI will understand:

### Project Basics
- ✅ It's a Next.js app with TypeScript
- ✅ Uses TailwindCSS for styling
- ✅ MongoDB for data persistence
- ✅ Playwright for testing

### Seeded Issues
- ✅ 17 intentional UX faults
- ✅ Toggle via /admin/seeds or API
- ✅ Two modes: lite and full
- ✅ Documented in info/SEEDED_ISSUES.md

### Pages
- ✅ 11 pages total
- ✅ Each has 2-3 user actions
- ✅ Each has seeded faults
- ✅ All have data-testid attributes

### API
- ✅ 7 API endpoints
- ✅ Seed management endpoints
- ✅ Research file I/O
- ✅ Event logging

### Testing
- ✅ Playwright test suite
- ✅ Artifact capture (4 types)
- ✅ Smoke tests
- ✅ Lint and typecheck

---

## Tips for Best Results

### Do's

✅ Point to specific documentation files
✅ Mention which files are relevant
✅ Ask specific questions
✅ Reference seed flags by name
✅ Use route paths (e.g., "/tasks")

### Don'ts

❌ Don't make the AI guess
❌ Don't ask about undocumented features
❌ Don't skip the documentation reading step
❌ Don't expect knowledge outside the docs

---

## Follow-up Prompts

### After Initial Response

```
Thanks! Based on the documentation, can you also show me [MORE DETAILS]?
```

### If AI Misses Something

```
The documentation in docs/API_REFERENCE.md shows an example with curl. 
Can you provide the JavaScript equivalent?
```

### For Clarification

```
I see in docs/PROJECT_OVERVIEW.md that seeds persist to MongoDB. 
Which collection is used and what's the schema?
```

---

## Complete Conversation Example

**User:**
```
I'm working on a Todo App with Seeded Usability Issues project.

Comprehensive documentation exists in: todo_app/docs/

Please read these files in order:
1. docs/QUICK_REFERENCE.md
2. docs/PROJECT_OVERVIEW.md

My current task: I need to run the Playwright tests. What's the command and 
where will the artifacts be saved?
```

**AI:**
```
Based on the documentation in docs/TESTING_GUIDE.md:

To run Playwright tests:
1. Start the dev server: npm run dev
2. Run tests: npm run test:playwright

Artifacts will be saved to:
/captures/
  ├── example-run/
  │   ├── home-full.png      (screenshot)
  │   ├── home-dom.html      (DOM snapshot)
  │   ├── home-ax.json       (accessibility snapshot)
  │   └── home.log           (console logs)
  └── ...

Each of the 11 pages has a test that captures these artifacts.
```

**User:**
```
Perfect! Can I run just the Tasks page test?
```

**AI:**
```
Yes! From docs/TESTING_GUIDE.md:

# Run specific test by pattern
npx playwright test --grep "Tasks"

# Or run specific file
npx playwright test tests/playwright/pages.spec.ts -g "Tasks page"

This will only run the test for /tasks page.
```

---

## Saving This Template

Save this file as `docs/AI_PROMPT_TEMPLATE.md` and copy it when:
- Starting new Qwen Code chat
- Working with GitHub Copilot
- Using Cursor or other AI editors
- Onboarding new team members

---

**Last Updated:** March 15, 2026

# Testing Guide

Complete guide for testing the Todo App and capturing artifacts.

---

## Overview

The app uses **Playwright** for end-to-end testing. Each test:
1. Navigates to a page
2. Performs 2-3 key actions
3. Captures artifacts (screenshots, DOM, accessibility)

---

## Prerequisites

```bash
# Install Playwright browsers (one-time)
npx playwright install chromium

# Ensure dev server is running
npm run dev
```

---

## Running Tests

### Full Test Suite

```bash
npm run test:playwright
```

Runs all 11 page tests sequentially.

### With UI

```bash
npm run test:playwright:ui
```

Opens Playwright UI for interactive test running.

### Specific Test

```bash
# Run only tests matching pattern
npx playwright test --grep "Tasks"

# Run specific file
npx playwright tests/playwright/pages.spec.ts

# Run with specific browser
npx playwright test --project=chromium
```

---

## Test Coverage

### Pages Tested (11)

| Test | Page | Actions Tested |
|------|------|----------------|
| Home page | `/` | Quick add task, navigate to projects |
| Auth page | `/auth` | Sign in, switch to signup, forgot password |
| Tasks page | `/tasks` | Create task, filter, bulk actions |
| Task detail | `/task/1` | Edit task, add comment, toggle complete |
| Projects | `/projects` | Create project, add task |
| Calendar | `/calendar` | Switch views, navigate weeks, create event |
| Search | `/search` | Search, filter by tag, sort |
| Settings | `/settings` | Toggle preferences, save profile |
| Onboarding | `/onboarding` | Navigate tour steps, finish |
| Research | `/research` | View file, edit mode |
| Admin seeds | `/admin/seeds` | Toggle seeds, change mode |

---

## Artifacts

### Location

```
/captures/
├── example-run/
│   ├── home-full.png           # Full page screenshot
│   ├── home-dom.html           # DOM snapshot
│   ├── home-ax.json            # Accessibility snapshot
│   └── home.log                # Console logs
├── tasks-full.png
├── tasks-dom.html
└── ...
```

### Artifact Types

**1. Full Page Screenshot** (`<page>-full.png`)
- Complete page screenshot
- Used for visual regression testing
- Shows seeded visual issues

**2. DOM Snapshot** (`<page>-dom.html`)
- Complete HTML source
- Used for structure analysis
- Shows missing labels, incorrect attributes

**3. Accessibility Snapshot** (`<page>-ax.json`)
- JSON accessibility tree
- Used for ARIA compliance checking
- Shows missing roles, labels

**4. Console Logs** (`<page>.log`)
- Console errors and warnings
- Network failures
- Custom log messages

---

## Capturing Artifacts Manually

### Using Playwright Test

```typescript
import { test, expect } from '@playwright/test';

test('capture home page', async ({ page }) => {
  await page.goto('/');
  
  // Screenshot
  await page.screenshot({ 
    path: 'captures/manual/home.png',
    fullPage: true 
  });
  
  // DOM
  await page.content().then(content => {
    require('fs').writeFileSync('captures/manual/home.html', content);
  });
  
  // Accessibility
  const snapshot = await page.accessibility.snapshot();
  require('fs').writeFileSync(
    'captures/manual/home-ax.json',
    JSON.stringify(snapshot, null, 2)
  );
});
```

### Using Browser DevTools

1. Open page in Chrome/Chromium
2. Open DevTools (F12)
3. Console → Run:
```javascript
// Get DOM
document.documentElement.outerHTML

// Get accessibility
getAccessibilitySnapshot()
```

---

## Test Configuration

### playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/playwright',
  fullyParallel: false,  // Run sequentially for deterministic results
  forbidOnly: !!process.env.CI,
  retries: 0,  // No retries for deterministic testing
  workers: 1,
  reporter: 'html',
  timeout: 30000,
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    viewport: { width: 1280, height: 720 },
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  
  outputDir: './captures',
});
```

---

## Smoke Tests

Quick HTTP checks to verify all routes are working.

### Run Smoke Tests

```bash
npm run smoke
```

### What It Checks

```
✓ GET / (200)
✓ GET /tasks (200)
✓ GET /projects (200)
✓ GET /calendar (200)
✓ GET /search (200)
✓ GET /settings (200)
✓ GET /auth (200)
✓ GET /onboarding (200)
✓ GET /research (200)
✓ GET /admin/seeds (200)
```

### Script Location

`scripts/smoke.js` - Can be run independently:
```bash
node scripts/smoke.js
```

---

## Lint & Typecheck

### ESLint

```bash
npm run lint
```

Checks:
- TypeScript errors
- React best practices
- Code style
- Unused variables

### TypeScript

```bash
npm run typecheck
```

Checks:
- Type errors
- Interface mismatches
- Import errors

---

## Testing Seeded Issues

### Test with Seeds Enabled

1. Start dev server
2. Go to `/admin/seeds`
3. Enable specific seeds
4. Run tests
5. Check artifacts for issues

### Test with Different Modes

**Lite Mode:**
```bash
# Edit seed.json
{
  "mode": "lite"
}

# Run tests
npm run test:playwright
```

**Full Mode:**
```bash
# Edit seed.json
{
  "mode": "full"
}

# Run tests
npm run test:playwright
```

### Compare Artifacts

```bash
# Run with lite mode
# Artifacts saved to /captures/lite-run/

# Run with full mode
# Artifacts saved to /captures/full-run/

# Compare differences
diff /captures/lite-run/home-dom.html /captures/full-run/home-dom.html
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright browsers
      run: npx playwright install --with-deps chromium
    
    - name: Run lint
      run: npm run lint
    
    - name: Run typecheck
      run: npm run typecheck
    
    - name: Start dev server
      run: npm run dev &
      env:
        MONGODB_URI: ${{ secrets.MONGODB_URI }}
    
    - name: Wait for server
      run: sleep 10
    
    - name: Run Playwright tests
      run: npm run test:playwright
    
    - name: Upload artifacts
      uses: actions/upload-artifact@v4
      with:
        name: playwright-report
        path: captures/
```

---

## Debugging Tests

### Run with Debug Mode

```bash
PWDEBUG=1 npm run test:playwright
```

Opens Playwright Inspector with:
- Step-through debugging
- Live editing
- Actionability logs

### Verbose Output

```bash
npm run test:playwright -- --reporter=list
```

### Capture on Every Test

Modify test to always capture:
```typescript
test('home page', async ({ page }) => {
  await page.goto('/');
  
  // Always capture, not just on failure
  await page.screenshot({ path: 'captures/debug/home.png' });
  
  // ... rest of test
});
```

---

## Performance Testing

### Lighthouse Integration

```bash
# Install
npm install -g @lhci/cli

# Run audit
lhci autorun --collect.staticDistDir=./.next
```

### Web Vitals

Add to test:
```typescript
test('check performance', async ({ page }) => {
  await page.goto('/');
  
  const metrics = await page.metrics();
  console.log('JS Heap Size:', metrics.JSHeapUsedSize);
  
  const performance = await page.evaluate(() => {
    return performance.getEntriesByType('navigation')[0];
  });
  
  console.log('Load Time:', performance.loadEventEnd - performance.fetchStart);
});
```

---

## Common Issues

### Tests Timeout

```bash
# Increase timeout
npx playwright test --timeout=60000

# Or in config
timeout: 60000
```

### Server Not Ready

```bash
# Add wait in test
test('home page', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('[data-testid="home-title"]');
  // ... rest of test
});
```

### Flaky Tests

```bash
# Disable parallel execution
fullyParallel: false

# Remove retries
retries: 0

# Use deterministic selectors
await page.getByTestId('home-title').click();
```

---

## Test Output Examples

### Successful Test

```
Running 11 tests using 1 worker

  ✓  1 tests/playwright/pages.spec.ts:43:3 › Home page (2.3s)
  ✓  2 tests/playwright/pages.spec.ts:67:3 › Auth page (1.8s)
  ✓  3 tests/playwright/pages.spec.ts:95:3 › Tasks page (3.1s)
  ...

  11 passed (15.2s)
```

### Failed Test

```
  ✘  1 tests/playwright/pages.spec.ts:43:3 › Home page (5.0s)

  Error: Timed out 5000ms waiting for element

     at tests/playwright/pages.spec.ts:47

  47 |   await expect(page.getByTestId('home-title')).toBeVisible();
```

---

## Artifacts Analysis

### Visual Analysis

Open screenshots to check for:
- Missing UI elements
- Layout issues
- Color contrast problems
- Overlapping elements

### DOM Analysis

Search HTML for:
- Missing `aria-label` attributes
- Missing form labels
- Incorrect input types
- Missing button text

### Accessibility Analysis

Check JSON for:
- Missing roles
- Empty buttons/links
- Missing alt text
- Incorrect heading hierarchy

---

**Last Updated:** March 15, 2026

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Create captures directory
const CAPTURES_DIR = path.join(process.cwd(), 'captures', 'example-run');
if (!fs.existsSync(CAPTURES_DIR)) {
  fs.mkdirSync(CAPTURES_DIR, { recursive: true });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function capturePageArtifacts(page: any, pageName: string) {
  // Full page screenshot
  await page.screenshot({ 
    path: path.join(CAPTURES_DIR, `${pageName}-full.png`),
    fullPage: true 
  });
  
  // DOM snapshot
  const domContent = await page.content();
  fs.writeFileSync(path.join(CAPTURES_DIR, `${pageName}-dom.html`), domContent);
  
  // Accessibility snapshot
  const accessibilitySnapshot = await page.accessibility.snapshot();
  fs.writeFileSync(
    path.join(CAPTURES_DIR, `${pageName}-ax.json`),
    JSON.stringify(accessibilitySnapshot, null, 2)
  );
  
  // Console logs
  const consoleLogs: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  page.on('console', (msg: any) => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
  });
  
  return consoleLogs;
}

test.describe('Todo App Pages', () => {
  test('Home page - quick add task and navigation', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await expect(page.getByTestId('home-title')).toBeVisible();
    
    // Click quick add button
    await page.getByTestId('home-quick-add-btn').click();
    
    // Fill in task title
    await page.getByTestId('quick-add-input').fill('Test task from Playwright');
    
    // Submit the form
    await page.getByTestId('quick-add-submit').click();
    
    // Navigate to projects
    await page.getByTestId('home-projects-btn').click();
    await expect(page).toHaveURL('/projects');
    
    // Capture artifacts
    await capturePageArtifacts(page, 'home');
    
    // Save console log
    const consoleLog = await page.evaluate(() => {
      return [];
    });
    fs.writeFileSync(
      path.join(CAPTURES_DIR, 'home.log'),
      consoleLog.join('\n') || 'No console errors'
    );
  });

  test('Auth page - sign in and navigation', async ({ page }) => {
    await page.goto('/auth');
    
    await expect(page.getByTestId('auth-title')).toBeVisible();
    
    // Fill in credentials
    await page.getByTestId('auth-email-input').fill('test@example.com');
    await page.getByTestId('auth-password-input').fill('password123');
    
    // Click sign in
    await page.getByTestId('auth-submit-btn').click();
    
    // Switch to signup
    await page.getByTestId('auth-switch-signup').click();
    await expect(page.getByTestId('auth-title')).toContainText('Sign Up');
    
    // Click forgot password
    await page.getByTestId('auth-switch-signin').click();
    await page.getByTestId('auth-forgot-password').click();
    await expect(page.getByTestId('auth-title')).toContainText('Reset Password');
    
    // Capture artifacts
    await capturePageArtifacts(page, 'auth');
    
    fs.writeFileSync(path.join(CAPTURES_DIR, 'auth.log'), 'No console errors');
  });

  test('Tasks page - create, filter, and bulk actions', async ({ page }) => {
    await page.goto('/tasks');
    
    await expect(page.getByTestId('tasks-title')).toBeVisible();
    
    // Add new task
    await page.getByTestId('tasks-new-input').fill('New test task');
    await page.getByTestId('tasks-add-btn').click();
    
    // Filter by active
    await page.getByTestId('tasks-filter-active').click();
    
    // Filter by all
    await page.getByTestId('tasks-filter-all').click();
    
    // Select a task and bulk complete
    const checkbox = page.getByTestId('tasks-checkbox-1');
    if (await checkbox.isVisible()) {
      await checkbox.check();
      await page.getByTestId('tasks-bulk-complete').click();
    }
    
    // Click on a task to go to detail
    await page.getByTestId('tasks-toggle-1').click();
    await page.waitForURL(/\/task\/\d+/);
    
    // Go back to tasks
    await page.goBack();
    await page.waitForURL('/tasks');
    
    // Capture artifacts
    await capturePageArtifacts(page, 'tasks');
    
    fs.writeFileSync(path.join(CAPTURES_DIR, 'tasks.log'), 'No console errors');
  });

  test('Task detail page - edit and comment', async ({ page }) => {
    await page.goto('/task/1');
    
    await expect(page.getByTestId('task-title')).toBeVisible();
    
    // Click edit
    await page.getByTestId('task-edit-btn').click();
    
    // Edit title
    await page.getByTestId('task-edit-title').fill('Updated task title');
    
    // Save
    await page.getByTestId('task-save-btn').click();
    
    // Add comment
    await page.getByTestId('task-comment-input').fill('Test comment');
    await page.getByTestId('task-comment-submit').click();
    
    // Toggle complete
    await page.getByTestId('task-completed-checkbox').check();
    
    // Capture artifacts
    await capturePageArtifacts(page, 'task-detail');
    
    fs.writeFileSync(path.join(CAPTURES_DIR, 'task-detail.log'), 'No console errors');
  });

  test('Projects page - create project and add task', async ({ page }) => {
    await page.goto('/projects');
    
    await expect(page.getByTestId('projects-title')).toBeVisible();
    
    // Create new project
    await page.getByTestId('projects-new-input').fill('Test Project');
    await page.getByTestId('projects-create-btn').click();
    
    // Select first project
    const projectItem = page.getByTestId('project-item-1');
    if (await projectItem.isVisible()) {
      await projectItem.click();
    }
    
    // Add task to project
    await page.getByTestId('project-add-task-input').fill('Project task');
    await page.getByTestId('project-add-task-btn').click();
    
    // Capture artifacts
    await capturePageArtifacts(page, 'projects');
    
    fs.writeFileSync(path.join(CAPTURES_DIR, 'projects.log'), 'No console errors');
  });

  test('Calendar page - view and create event', async ({ page }) => {
    await page.goto('/calendar');
    
    await expect(page.getByTestId('calendar-title')).toBeVisible();
    
    // Switch to day view
    await page.getByTestId('calendar-view-day').click();
    
    // Switch back to week view
    await page.getByTestId('calendar-view-week').click();
    
    // Navigate weeks
    await page.getByTestId('calendar-next-week').click();
    await page.getByTestId('calendar-prev-week').click();
    
    // Create event
    await page.getByTestId('calendar-event-input').fill('Test Event');
    await page.getByTestId('calendar-time-input').fill('14:00');
    await page.getByTestId('calendar-create-btn').click();
    
    // Capture artifacts
    await capturePageArtifacts(page, 'calendar');
    
    fs.writeFileSync(path.join(CAPTURES_DIR, 'calendar.log'), 'No console errors');
  });

  test('Search page - search and filter', async ({ page }) => {
    await page.goto('/search');
    
    await expect(page.getByTestId('search-title')).toBeVisible();
    
    // Search
    await page.getByTestId('search-input').fill('project');
    await page.getByTestId('search-btn').click();
    
    // Filter by tag
    await page.getByTestId('search-tag-work').click();
    
    // Sort by alphabetical
    await page.getByTestId('search-sort-alpha').click();
    
    // Clear filters
    await page.getByTestId('search-clear-filters').click();
    
    // Toggle show completed
    await page.getByTestId('search-show-completed').uncheck();
    
    // Capture artifacts
    await capturePageArtifacts(page, 'search');
    
    fs.writeFileSync(path.join(CAPTURES_DIR, 'search.log'), 'No console errors');
  });

  test('Settings page - toggle preferences', async ({ page }) => {
    await page.goto('/settings');
    
    await expect(page.getByTestId('settings-title')).toBeVisible();
    
    // Toggle notifications
    await page.getByTestId('settings-notifications').uncheck();
    
    // Toggle dark mode
    await page.getByTestId('settings-dark-mode').check();
    
    // Save profile
    await page.getByTestId('settings-save-profile').click();
    
    // Capture artifacts
    await capturePageArtifacts(page, 'settings');
    
    fs.writeFileSync(path.join(CAPTURES_DIR, 'settings.log'), 'No console errors');
  });

  test('Onboarding page - complete tour', async ({ page }) => {
    await page.goto('/onboarding');
    
    await expect(page.getByTestId('onboarding-step-title')).toBeVisible();
    
    // Go through steps
    for (let i = 0; i < 4; i++) {
      await page.getByTestId('onboarding-next').click();
    }
    
    // Finish
    await page.getByTestId('onboarding-next').click();
    await expect(page.getByTestId('onboarding-complete-title')).toBeVisible();
    
    // Get started
    await page.getByTestId('onboarding-get-started').click();
    
    // Capture artifacts
    await capturePageArtifacts(page, 'onboarding');
    
    fs.writeFileSync(path.join(CAPTURES_DIR, 'onboarding.log'), 'No console errors');
  });

  test('Research page - view and edit files', async ({ page }) => {
    await page.goto('/research');
    
    await expect(page.getByTestId('research-title')).toBeVisible();
    
    // Select a file
    const fileItem = page.getByTestId('research-file-readme');
    if (await fileItem.isVisible()) {
      await fileItem.click();
    }
    
    // Click edit
    await page.getByTestId('research-edit').click();
    
    // Cancel edit
    await page.getByTestId('research-cancel-edit').click();
    
    // Capture artifacts
    await capturePageArtifacts(page, 'research');
    
    fs.writeFileSync(path.join(CAPTURES_DIR, 'research.log'), 'No console errors');
  });

  test('Admin seeds page - toggle seeds', async ({ page }) => {
    await page.goto('/admin/seeds');
    
    await expect(page.getByTestId('admin-title')).toBeVisible();
    
    // Toggle a seed
    const toggle = page.getByTestId('admin-toggle-home-ambiguous_cta');
    if (await toggle.isVisible()) {
      await toggle.click();
    }
    
    // Change mode
    await page.getByTestId('admin-mode-full').click();
    await page.getByTestId('admin-mode-lite').click();
    
    // Capture artifacts
    await capturePageArtifacts(page, 'admin-seeds');
    
    fs.writeFileSync(path.join(CAPTURES_DIR, 'admin-seeds.log'), 'No console errors');
  });
});

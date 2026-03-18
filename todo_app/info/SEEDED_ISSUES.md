# Seeded Usability Issues Reference

This document catalogs all **17 seeded UX faults** in the Todo App, organized by page. Use this as a reference for testing and detection analysis.

---

## Quick Reference Table

| ID | Page | Issue | Heuristic | Severity |
|----|------|-------|-----------|----------|
| HOME-01 | `/` | Ambiguous CTA label | H4 (Consistency) | Medium |
| HOME-02 | `/` | Modal missing close button | H3 (User Control) | High |
| AUTH-01 | `/auth` | Missing input labels | H4 (Consistency) | High |
| AUTH-02 | `/auth` | Cryptic error messages | H9 (Error Recovery) | High |
| TASKS-01 | `/tasks` | No confirmation on delete | H5 (Error Prevention) | High |
| TASKS-02 | `/tasks` | Tiny hit target (12x12px) | H8 (Minimal Design) | Medium |
| TASK-01 | `/task/[id]` | Confusing save affordance | H4 (Consistency) | Medium |
| TASK-02 | `/task/[id]` | Non-standard date format | H2 (Real World) | Low |
| PROJ-01 | `/projects` | Inconsistent icons | H4 (Consistency) | Low |
| PROJ-02 | `/projects` | Hidden controls | H6 (Recognition) | Medium |
| CAL-01 | `/calendar` | No loading spinner | H1 (System Status) | Medium |
| CAL-02 | `/calendar` | Ambiguous timepicker | H4 (Consistency) | Medium |
| SRCH-01 | `/search` | Filters reset unexpectedly | H3 (User Control) | High |
| SRCH-02 | `/search` | No help on empty results | H3 (User Control) | Medium |
| SET-01 | `/settings` | Destructive toggle no warning | H5 (Error Prevention) | High |
| SET-02 | `/settings` | Ambiguous toggle labels | H4 (Consistency) | Medium |
| ONB-01 | `/onboarding` | Skip too prominent | H5 (Error Prevention) | Low |

---

## Nielsen's 10 Heuristics Reference

1. **Visibility of system status** - Users should know what's happening
2. **Match between system and real world** - Use familiar language/concepts
3. **User control and freedom** - Easy to undo/exit actions
4. **Consistency and standards** - Follow platform conventions
5. **Error prevention** - Prevent problems before they occur
6. **Recognition rather than recall** - Make options visible, not memorized
7. **Flexibility and efficiency of use** - Support both novice and expert users
8. **Aesthetic and minimalist design** - No irrelevant information
9. **Help users recognize, diagnose, recover from errors** - Clear error messages
10. **Help and documentation** - Provide searchable, task-focused help

---

## Page-by-Page Breakdown

### 1. Home Page (`/`)

**Description:** Landing page with quick task creation and navigation

#### Issues (2)

**HOME-01: Ambiguous CTA Label**
- **Heuristic:** H4 (Consistency and Standards)
- **Severity:** Medium
- **Seed Flag:** `home.ambiguous_cta`
- **What Happens:** Button says "Do It" instead of "Create Task"
- **How to Observe:**
  1. Enable seed in `/admin/seeds`
  2. Go to home page
  3. CTA button shows vague text "Do It"
- **Why It's a Problem:** Users don't know what action will occur

**HOME-02: Modal Missing Close Button**
- **Heuristic:** H3 (User Control and Freedom)
- **Severity:** High
- **Seed Flag:** `home.modal_no_close`
- **What Happens:** Quick-add modal has no visible close button
- **How to Observe:**
  1. Enable seed in `/admin/seeds`
  2. Click "Create Task" button
  3. Modal opens with no X button to close
- **Why It's a Problem:** Users feel trapped with no escape route

---

### 2. Auth Page (`/auth`)

**Description:** Sign in, sign up, and password recovery forms

#### Issues (2)

**AUTH-01: Missing Input Labels**
- **Heuristic:** H4 (Consistency and Standards)
- **Severity:** High
- **Seed Flag:** `auth.missing_labels`
- **What Happens:** Form fields show only placeholders, no labels
- **How to Observe:**
  1. Enable seed in `/admin/seeds`
  2. Go to `/auth`
  3. Input fields have no visible labels
- **Why It's a Problem:** Users may forget what each field means after typing

**AUTH-02: Cryptic Error Messages**
- **Heuristic:** H9 (Help Users Recover from Errors)
- **Severity:** High
- **Seed Flag:** `auth.cryptic_error`
- **What Happens:** Errors show "ERR_AUTH_FAIL" instead of helpful text
- **How to Observe:**
  1. Enable seed in `/admin/seeds`
  2. Try to sign in with invalid credentials
  3. Error message shows technical code
- **Why It's a Problem:** Users don't know how to fix the problem

---

### 3. Tasks Page (`/tasks`)

**Description:** Task list with creation, filtering, and bulk actions

#### Issues (2)

**TASKS-01: No Confirmation on Delete**
- **Heuristic:** H5 (Error Prevention)
- **Severity:** High
- **Seed Flag:** `tasks.no_confirm_delete`
- **What Happens:** Delete action executes immediately without confirmation
- **How to Observe:**
  1. Enable seed in `/admin/seeds`
  2. Click delete icon on any task
  3. Task is deleted instantly with no "Are you sure?" dialog
- **Why It's a Problem:** Accidental deletions cause data loss

**TASKS-02: Tiny Hit Target**
- **Heuristic:** H8 (Aesthetic and Minimalist Design)
- **Severity:** Medium
- **Seed Flag:** `tasks.small_hit_target`
- **What Happens:** Delete icon is only 12x12 pixels
- **How to Observe:**
  1. Enable seed in `/admin/seeds`
  2. Try to click the delete icon
  3. Icon is extremely small, hard to click accurately
- **Why It's a Problem:** Difficult for users with motor impairments; causes frustration

---

### 4. Task Detail Page (`/task/[id]`)

**Description:** View and edit individual task details

#### Issues (2)

**TASK-01: Confusing Save Affordance**
- **Heuristic:** H4 (Consistency and Standards)
- **Severity:** Medium
- **Seed Flag:** `task.save_affordance_confusing`
- **What Happens:** Save button has low contrast, looks disabled
- **How to Observe:**
  1. Enable seed in `/admin/seeds`
  2. Click "Edit" on a task
  3. Save button appears grayed out (50% opacity)
- **Why It's a Problem:** Users don't realize the button is clickable

**TASK-02: Non-Standard Date Format**
- **Heuristic:** H2 (Match Between System and Real World)
- **Severity:** Low
- **Seed Flag:** `task.nonstandard_date_format`
- **What Happens:** Dates show as "20260315" instead of "Mar 15, 2026"
- **How to Observe:**
  1. Enable seed in `/admin/seeds`
  2. View task due date
  3. Date format is YYYYMMDD without separators
- **Why It's a Problem:** Unfamiliar format requires mental parsing

---

### 5. Projects Page (`/projects`)

**Description:** Project boards with task organization

#### Issues (2)

**PROJ-01: Inconsistent Icons**
- **Heuristic:** H4 (Consistency and Standards)
- **Severity:** Low
- **Seed Flag:** `projects.icons_inconsistent`
- **What Happens:** Some actions use icons, others use text labels
- **How to Observe:**
  1. Enable seed in `/admin/seeds`
  2. Look at project list actions
  3. Delete shows text "Delete" instead of trash icon
- **Why It's a Problem:** Inconsistency confuses users about available actions

**PROJ-02: Hidden Controls**
- **Heuristic:** H6 (Recognition Rather Than Recall)
- **Severity:** Medium
- **Seed Flag:** `projects.hidden_controls`
- **What Happens:** Drag handles only visible on hover
- **How to Observe:**
  1. Enable seed in `/admin/seeds`
  2. Look at task list in a project
  3. Drag handles disappear when not hovering
- **Why It's a Problem:** Users don't know tasks can be reordered

---

### 6. Calendar Page (`/calendar`)

**Description:** Day/week calendar view with event management

#### Issues (2)

**CAL-01: No Loading Spinner**
- **Heuristic:** H1 (Visibility of System Status)
- **Severity:** Medium
- **Seed Flag:** `calendar.no_spinner`
- **What Happens:** No loading indicator when navigating weeks
- **How to Observe:**
  1. Enable seed in `/admin/seeds`
  2. Click "Next Week" or "Previous Week"
  3. No visual feedback during the 500ms load
- **Why It's a Problem:** Users don't know if action registered

**CAL-02: Ambiguous Timepicker**
- **Heuristic:** H4 (Consistency and Standards)
- **Severity:** Medium
- **Seed Flag:** `calendar.ambiguous_timepicker`
- **What Happens:** Time shows "14:00" without AM/PM indicator
- **How to Observe:**
  1. Enable seed in `/admin/seeds`
  2. Create a new event
  3. Time input shows 24-hour format without clarification
- **Why It's a Problem:** Users may create events at wrong time

---

### 7. Search Page (`/search`)

**Description:** Search and filter tasks

#### Issues (2)

**SRCH-01: Filters Reset Unexpectedly**
- **Heuristic:** H3 (User Control and Freedom)
- **Severity:** High
- **Seed Flag:** `search.filters_reset`
- **What Happens:** Selected tags clear when changing sort order
- **How to Observe:**
  1. Enable seed in `/admin/seeds`
  2. Apply tag filters
  3. Change sort to "Alphabetical"
  4. All tag filters are cleared
- **Why It's a Problem:** Users lose their work unexpectedly

**SRCH-02: No Help on Empty Results**
- **Heuristic:** H3 (User Control and Freedom)
- **Severity:** Medium
- **Seed Flag:** `search.missing_no_results_help`
- **What Happens:** Empty search shows no suggestions
- **How to Observe:**
  1. Enable seed in `/admin/seeds`
  2. Search for something that doesn't exist
  3. Page shows "No tasks found" with no guidance
- **Why It's a Problem:** Users don't know how to get results

---

### 8. Settings Page (`/settings`)

**Description:** User preferences and account management

#### Issues (2)

**SET-01: Destructive Toggle No Warning**
- **Heuristic:** H5 (Error Prevention)
- **Severity:** High
- **Seed Flag:** `settings.destructive_toggle_no_warn`
- **What Happens:** "Delete Account" toggle has no confirmation
- **How to Observe:**
  1. Enable seed in `/admin/seeds`
  2. Go to Settings → Danger Zone
  3. Toggle "Delete Account" - no warning dialog appears
- **Why It's a Problem:** Accidental account deletion is catastrophic

**SET-02: Ambiguous Toggle Labels**
- **Heuristic:** H4 (Consistency and Standards)
- **Severity:** Medium
- **Seed Flag:** `settings.ambiguous_toggle_labels`
- **What Happens:** Toggles labeled "Toggle" with "Enable/Disable" description
- **How to Observe:**
  1. Enable seed in `/admin/seeds`
  2. Go to Settings → Preferences
  3. All toggles show generic labels
- **Why It's a Problem:** Users don't know what they're enabling

---

### 9. Onboarding Page (`/onboarding`)

**Description:** First-time user product tour

#### Issues (1)

**ONB-01: Skip Too Prominent**
- **Heuristic:** H5 (Error Prevention)
- **Severity:** Low
- **Seed Flag:** `onboarding.skip_too_easy`
- **What Happens:** Skip button is more prominent than Next button
- **How to Observe:**
  1. Enable seed in `/admin/seeds`
  2. Go to onboarding
  3. Skip button is primary style, Next is secondary
- **Why It's a Problem:** Users may skip important instructions accidentally

---

## Seed Modes

### Lite Mode
- **Purpose:** Minor usability issues for basic detection
- **Issues Active:** Low and Medium severity only
- **Count:** ~12 issues

### Full Mode
- **Purpose:** All issues including catastrophic ones
- **Issues Active:** All 17 issues
- **Count:** 17 issues

## How to Toggle Issues

### Via Admin UI
1. Start the app: `npm run dev`
2. Go to `/admin/seeds`
3. Toggle individual flags or switch mode
4. Click "Save Changes" to persist

### Via API
```bash
# Get current seeds
curl http://localhost:3000/api/seed

# Set specific seeds
curl -X POST http://localhost:3000/api/seed \
  -H "Content-Type: application/json" \
  -d '{"home": {"ambiguous_cta": true, "modal_no_close": true}}'
```

### Via seed.json
Edit `seed.json` in the project root:
```json
{
  "mode": "full",
  "home": {
    "ambiguous_cta": true,
    "modal_no_close": true
  }
}
```

---

## Testing Checklist

For each page:
- [ ] Navigate to page
- [ ] Enable seeds for that page via `/admin/seeds`
- [ ] Perform the actions listed in "How to Observe"
- [ ] Verify the issue is present
- [ ] Capture screenshot if needed for analysis
- [ ] Disable seed and verify issue is gone

---

## Summary

| Severity | Count | Pages Affected |
|----------|-------|----------------|
| High | 6 | Home, Auth (2), Tasks, Search, Settings |
| Medium | 8 | Home, Tasks, Task Detail, Projects, Calendar (2), Search, Settings |
| Low | 3 | Task Detail, Projects, Onboarding |
| **Total** | **17** | **9 pages** |

All issues are deterministic and can be toggled independently via the Admin UI or API.

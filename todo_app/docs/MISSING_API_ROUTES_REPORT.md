# Missing Backend API Routes Report

## Executive Summary

After analyzing all pages and actions in the Todo App, I identified **24 missing backend API endpoints** across 8 pages. The app currently only has APIs for: auth, seed management, event logging, research files, and run registration.

---

## Existing API Routes ✅

| Endpoint | Purpose |
|----------|---------|
| `POST /api/auth` | Signup/Signin |
| `GET/POST /api/seed` | Seed configuration |
| `POST /api/event` | UI event logging |
| `GET /api/research/list` | List research files |
| `GET /api/research/read` | Read research file |
| `POST /api/research/write` | Write research file |
| `POST /api/run` | Register test runs |

---

## Missing API Routes by Page

### 1. Home Page (`/`) ❌

**Actions without API:**

| Action | Current Behavior | Required API |
|--------|------------------|--------------|
| Quick Add Task | `console.log()` only | `POST /api/tasks` |
| Create Task (modal) | `console.log()` only | `POST /api/tasks` |

**Impact:** Tasks created on homepage are not persisted to database.

---

### 2. Tasks Page (`/tasks`) ❌

**Actions without API:**

| Action | Current Behavior | Required API |
|--------|------------------|--------------|
| Add new task | Client-side state only | `POST /api/tasks` |
| Toggle task complete | Client-side state only | `PATCH /api/tasks/:id` |
| Delete task | Client-side state only | `DELETE /api/tasks/:id` |
| Bulk complete | Client-side state only | `PATCH /api/tasks/bulk` |
| Bulk delete | Client-side state only | `DELETE /api/tasks/bulk` |
| Filter tasks | Client-side only | `GET /api/tasks?filter=active\|completed` |

**Impact:** All task operations are lost on page refresh.

---

### 3. Task Detail Page (`/task/[id]`) ❌

**Actions without API:**

| Action | Current Behavior | Required API |
|--------|------------------|--------------|
| Edit task title/description | Client-side state only | `PATCH /api/tasks/:id` |
| Update due date | Client-side state only | `PATCH /api/tasks/:id` |
| Mark as complete | Client-side state only | `PATCH /api/tasks/:id` |
| Add comment | Client-side state only | `POST /api/tasks/:id/comments` |
| Load task details | Hardcoded sample data | `GET /api/tasks/:id` |

**Impact:** Task edits and comments are not persisted.

---

### 4. Projects Page (`/projects`) ❌

**Actions without API:**

| Action | Current Behavior | Required API |
|--------|------------------|--------------|
| Create project | Client-side state only | `POST /api/projects` |
| Delete project | Client-side state only | `DELETE /api/projects/:id` |
| Add task to project | Client-side state only | `POST /api/projects/:id/tasks` |
| Load projects | Hardcoded sample data | `GET /api/projects` |
| Reorder tasks (drag handle) | No implementation | `PATCH /api/projects/:id/reorder` |

**Impact:** Projects and their tasks are not persisted.

---

### 5. Calendar Page (`/calendar`) ❌

**Actions without API:**

| Action | Current Behavior | Required API |
|--------|------------------|--------------|
| Create event | Client-side state only | `POST /api/calendar/events` |
| Navigate weeks | Client-side only | `GET /api/calendar/events?start=...&end=...` |
| View day/week events | Hardcoded sample data | `GET /api/calendar/events` |
| Delete event | No implementation | `DELETE /api/calendar/events/:id` |
| Edit event | No implementation | `PATCH /api/calendar/events/:id` |

**Impact:** Calendar events are not persisted.

---

### 6. Settings Page (`/settings`) ❌

**Actions without API:**

| Action | Current Behavior | Required API |
|--------|------------------|--------------|
| Save profile | `console.log()` only | `PATCH /api/users/:id` |
| Toggle notifications | Client-side state only | `PATCH /api/users/:id/preferences` |
| Toggle dark mode | Client-side state only | `PATCH /api/users/:id/preferences` |
| Toggle email updates | Client-side state only | `PATCH /api/users/:id/preferences` |
| Toggle 2FA | Client-side state only | `PATCH /api/users/:id/security` |
| Delete account | `console.log()` only | `DELETE /api/users/:id` |
| Load user settings | No implementation | `GET /api/users/:id` |

**Impact:** User preferences and profile changes are not saved.

---

### 7. Search Page (`/search`) ❌

**Actions without API:**

| Action | Current Behavior | Required API |
|--------|------------------|--------------|
| Search tasks | Client-side filter on hardcoded data | `GET /api/tasks/search?q=...` |
| Filter by tags | Client-side only | `GET /api/tasks?tags=...` |
| Sort tasks | Client-side only | `GET /api/tasks?sort=date\|alpha\|status` |
| Load tasks for search | Hardcoded sample data | `GET /api/tasks` |

**Note:** This page could reuse `GET /api/tasks` with query parameters.

---

### 8. Onboarding Page (`/onboarding`) ⚠️

**Actions without API:**

| Action | Current Behavior | Required API |
|--------|------------------|--------------|
| Complete onboarding | Redirects to /tasks | `PATCH /api/users/:id/onboarding` |
| Skip onboarding | Redirects to / | `PATCH /api/users/:id/onboarding` |

**Impact:** Onboarding status is not persisted; user sees onboarding every time.

---

## Summary by Priority

### Critical (Core Functionality) 🔴

| Priority | API Endpoint | Pages Affected |
|----------|--------------|----------------|
| P0 | `GET /api/tasks` | Tasks, Search, Home |
| P0 | `POST /api/tasks` | Tasks, Home |
| P0 | `PATCH /api/tasks/:id` | Tasks, Task Detail |
| P0 | `DELETE /api/tasks/:id` | Tasks |
| P0 | `GET /api/projects` | Projects, Home |
| P0 | `POST /api/projects` | Projects |
| P0 | `DELETE /api/projects/:id` | Projects |

### High (User Experience) 🟠

| Priority | API Endpoint | Pages Affected |
|----------|--------------|----------------|
| P1 | `GET /api/calendar/events` | Calendar, Home |
| P1 | `POST /api/calendar/events` | Calendar |
| P1 | `GET /api/users/:id` | Settings |
| P1 | `PATCH /api/users/:id` | Settings |
| P1 | `DELETE /api/users/:id` | Settings |

### Medium (Nice to Have) 🟡

| Priority | API Endpoint | Pages Affected |
|----------|--------------|----------------|
| P2 | `POST /api/tasks/:id/comments` | Task Detail |
| P2 | `PATCH /api/users/:id/preferences` | Settings |
| P2 | `PATCH /api/users/:id/onboarding` | Onboarding |
| P2 | `POST /api/projects/:id/tasks` | Projects |
| P2 | `DELETE /api/calendar/events/:id` | Calendar |

---

## Recommended Implementation Order

### Phase 1: Core Task Management
1. `POST /api/tasks` - Create tasks
2. `GET /api/tasks` - List/filter tasks
3. `PATCH /api/tasks/:id` - Update task
4. `DELETE /api/tasks/:id` - Delete task

### Phase 2: Projects
5. `POST /api/projects` - Create project
6. `GET /api/projects` - List projects
7. `DELETE /api/projects/:id` - Delete project
8. `POST /api/projects/:id/tasks` - Add task to project

### Phase 3: Calendar
9. `GET /api/calendar/events` - List events
10. `POST /api/calendar/events` - Create event
11. `PATCH /api/calendar/events/:id` - Update event
12. `DELETE /api/calendar/events/:id` - Delete event

### Phase 4: User Management
13. `GET /api/users/:id` - Get user profile
14. `PATCH /api/users/:id` - Update user
15. `DELETE /api/users/:id` - Delete account
16. `PATCH /api/users/:id/preferences` - Update preferences

### Phase 5: Additional Features
17. `POST /api/tasks/:id/comments` - Add comments
18. `PATCH /api/users/:id/onboarding` - Save onboarding status
19. `PATCH /api/projects/:id/reorder` - Reorder tasks

---

## Database Collections Needed

Currently existing:
- `tasks` ✅
- `projects` ✅
- `seeds` ✅
- `events` ✅
- `users` ✅ (created for auth)
- `notes` ✅
- `runs` ✅

New collections needed:
- `calendar_events` - For calendar events
- `comments` - For task comments (or embed in tasks)
- `user_preferences` - For user settings (or embed in users)

---

## Code Quality Issues Found

### Pages with `console.log()` instead of API calls:

1. **Home page** - Line 21: `console.log('Quick add task:', taskTitle)`
2. **Auth page** - (FIXED) Was logging signup credentials
3. **Settings page** - Line 20: `console.log('Account deleted')`
4. **Settings page** - Line 25: `console.log('Profile saved')`

### Pages with hardcoded data (no backend):

1. **Tasks page** - Lines 13-17: Hardcoded 3 sample tasks
2. **Task Detail page** - Lines 21-27: Hardcoded sample task
3. **Projects page** - Lines 13-17: Hardcoded 3 sample projects
4. **Calendar page** - Lines 13-17: Hardcoded 3 sample events
5. **Search page** - Lines 15-21: Hardcoded 5 sample tasks

---

## Security Considerations

### Authentication Required
All user-specific endpoints need authentication:
- Tasks CRUD
- Projects CRUD
- Calendar events CRUD
- User profile/settings
- Onboarding status

### Authorization Rules
- Users can only access their own tasks/projects/events
- Admin endpoints (seeds) need ADMIN_SECRET verification
- Delete operations need additional confirmation

### Input Validation Needed
- Task titles: max length, sanitize HTML
- Email format validation
- Date format validation
- Project color validation
- Tag sanitization

---

## Recommendations

### Immediate Actions
1. **Implement Phase 1 APIs** - Core task management is critical
2. **Add authentication middleware** - Protect user data
3. **Replace console.log with API calls** - Start with auth (DONE), then tasks
4. **Add loading states** - Show spinners during API calls
5. **Add error handling** - Display user-friendly error messages

### Future Enhancements
1. **Real-time updates** - WebSocket for collaborative editing
2. **Offline support** - Service worker + local storage sync
3. **File attachments** - Upload tasks/project attachments
4. **Email notifications** - Due date reminders
5. **Recurring tasks** - Support for repeating tasks
6. **Task assignments** - Multi-user collaboration

---

## Files Requiring Changes

### Frontend (8 files)
- `src/app/page.tsx` - Add API calls for quick add
- `src/app/tasks/page.tsx` - Replace all CRUD with API calls
- `src/app/task/[id]/page.tsx` - Load task from API, save edits
- `src/app/projects/page.tsx` - Replace all CRUD with API calls
- `src/app/calendar/page.tsx` - Replace all CRUD with API calls
- `src/app/settings/page.tsx` - Add API calls for all settings
- `src/app/search/page.tsx` - Fetch tasks from API
- `src/app/onboarding/page.tsx` - Save completion status

### Backend (new files to create)
- `src/app/api/tasks/route.ts` - GET, POST tasks
- `src/app/api/tasks/[id]/route.ts` - GET, PATCH, DELETE single task
- `src/app/api/tasks/[id]/comments/route.ts` - Comments CRUD
- `src/app/api/projects/route.ts` - GET, POST projects
- `src/app/api/projects/[id]/route.ts` - PATCH, DELETE project
- `src/app/api/projects/[id]/tasks/route.ts` - Add task to project
- `src/app/api/calendar/events/route.ts` - GET, POST events
- `src/app/api/calendar/events/[id]/route.ts` - PATCH, DELETE event
- `src/app/api/users/[id]/route.ts` - GET, PATCH, DELETE user
- `src/app/api/users/[id]/preferences/route.ts` - Update preferences
- `src/middleware.ts` - Authentication middleware

---

**Report Generated:** March 18, 2026
**Total Missing Endpoints:** 24
**Pages Affected:** 8 out of 11 (73%)
**Critical Priority:** 7 endpoints
**High Priority:** 5 endpoints
**Medium Priority:** 7 endpoints

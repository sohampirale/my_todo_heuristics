# Remaining API Endpoints to Implement

## Summary

**Total Missing APIs Identified:** 24  
**APIs Implemented:** 8  
**Remaining APIs:** 16

### Implemented APIs ✅
- `POST /api/auth` - Signup/Signin
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get single task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `DELETE /api/projects/:id` - Delete project

---

## Remaining API Endpoints by Priority

### P0 - Critical (Core Functionality) 🔴

#### 1. Task Detail Page - Load Task
**File:** `src/app/api/tasks/[id]/route.ts`  
**Status:** ✅ Already implemented (GET method exists)  
**Used by:** `/task/[id]` page

---

#### 2. Task Comments API
**File:** `src/app/api/tasks/[id]/comments/route.ts`  
**Status:** ❌ NOT IMPLEMENTED  
**Used by:** `/task/[id]` page - Add comment feature

**GET /api/tasks/:id/comments**
- Fetch all comments for a task
- Response: `{ comments: Comment[] }`

**POST /api/tasks/:id/comments**
- Add comment to task
- Body: `{ content: string }`
- Response: `{ success: true, comment: Comment }`

**Database Collection:** `comments`
```typescript
interface Comment {
  _id?: ObjectId;
  taskId: string;
  content: string;
  createdAt: Date;
}
```

**Frontend Location:** `src/app/task/[id]/page.tsx` line ~178
- Currently: `setComments([...comments, newComment])` (client-side only)

---

### P1 - High Priority (User Experience) 🟠

#### 3. Calendar Events - List
**File:** `src/app/api/calendar/events/route.ts`  
**Status:** ❌ NOT IMPLEMENTED  
**Used by:** `/calendar` page

**GET /api/calendar/events**
- Fetch events with optional date range
- Query: `?start=YYYY-MM-DD&end=YYYY-MM-DD`
- Response: `{ events: CalendarEvent[] }`

**Database Collection:** `calendar_events`
```typescript
interface CalendarEvent {
  _id?: ObjectId;
  title: string;
  date: Date;
  time?: string;
  createdAt: Date;
}
```

**Frontend Location:** `src/app/calendar/page.tsx` line ~13
- Currently: Hardcoded sample events

---

#### 4. Calendar Events - Create
**File:** `src/app/api/calendar/events/route.ts`  
**Status:** ❌ NOT IMPLEMENTED

**POST /api/calendar/events**
- Create new calendar event
- Body: `{ title: string, date: string, time?: string }`
- Response: `{ success: true, event: CalendarEvent }`

**Frontend Location:** `src/app/calendar/page.tsx` line ~68
- Currently: `setEvents([...events, newEvent])` (client-side only)

---

#### 5. Calendar Events - Update
**File:** `src/app/api/calendar/events/[id]/route.ts`  
**Status:** ❌ NOT IMPLEMENTED

**PATCH /api/calendar/events/:id**
- Update existing event
- Body: `{ title?, date?, time? }`
- Response: `{ success: true, event: CalendarEvent }`

---

#### 6. Calendar Events - Delete
**File:** `src/app/api/calendar/events/[id]/route.ts`  
**Status:** ❌ NOT IMPLEMENTED

**DELETE /api/calendar/events/:id**
- Delete event
- Response: `{ success: true }`

---

#### 7. User Profile - Get
**File:** `src/app/api/users/[id]/route.ts`  
**Status:** ❌ NOT IMPLEMENTED  
**Used by:** `/settings` page

**GET /api/users/:id**
- Fetch user profile
- Response: `{ user: User }`

**Frontend Location:** `src/app/settings/page.tsx`
- Currently: Hardcoded "John Doe" / "john@example.com"

---

#### 8. User Profile - Update
**File:** `src/app/api/users/[id]/route.ts`  
**Status:** ❌ NOT IMPLEMENTED

**PATCH /api/users/:id**
- Update user profile (name, email)
- Body: `{ name?, email? }`
- Response: `{ success: true, user: User }`

**Frontend Location:** `src/app/settings/page.tsx` line ~54
- Currently: `console.log('Profile saved')`

---

#### 9. User Preferences - Update
**File:** `src/app/api/users/[id]/preferences/route.ts`  
**Status:** ❌ NOT IMPLEMENTED

**PATCH /api/users/:id/preferences**
- Update user preferences
- Body: `{ notifications?, darkMode?, emailUpdates?, twoFactor? }`
- Response: `{ success: true, preferences: UserPreferences }`

**Frontend Location:** `src/app/settings/page.tsx` lines ~77-100
- Currently: Client-side state only

---

#### 10. Delete Account
**File:** `src/app/api/users/[id]/route.ts`  
**Status:** ❌ NOT IMPLEMENTED

**DELETE /api/users/:id**
- Delete user account
- Response: `{ success: true }`

**Frontend Location:** `src/app/settings/page.tsx` line ~18
- Currently: `console.log('Account deleted')`

---

### P2 - Medium Priority (Nice to Have) 🟡

#### 11. Onboarding Status - Save
**File:** `src/app/api/users/[id]/onboarding/route.ts`  
**Status:** ❌ NOT IMPLEMENTED

**PATCH /api/users/:id/onboarding**
- Mark onboarding as complete
- Body: `{ completed: boolean }`
- Response: `{ success: true }`

**Frontend Location:** `src/app/onboarding/page.tsx` lines ~43, ~50
- Currently: Just redirects, doesn't save status

---

#### 12. Search Tasks API
**File:** `src/app/api/tasks/search/route.ts` OR extend `GET /api/tasks`  
**Status:** ⚠️ PARTIALLY IMPLEMENTED (can use existing tasks API with query params)

**GET /api/tasks/search?q=query&tags=work,urgent&sort=date**
- Search tasks by text
- Filter by tags
- Sort results
- Response: `{ tasks: Task[] }`

**Frontend Location:** `src/app/search/page.tsx`
- Currently: Client-side filter on hardcoded data
- Can reuse existing `GET /api/tasks` with query parameters

---

#### 13. Projects - Add Task to Project
**File:** `src/app/api/projects/[id]/tasks/route.ts`  
**Status:** ❌ NOT IMPLEMENTED

**POST /api/projects/:id/tasks**
- Add task to project (creates task with projectId)
- Body: `{ title: string, description?: string, dueDate?: string }`
- Response: `{ success: true, task: Task }`

**Frontend Location:** `src/app/projects/page.tsx` line ~80
- Currently: Client-side only, adds to project.tasks array

---

#### 14. Projects - Get Single Project
**File:** `src/app/api/projects/[id]/route.ts`  
**Status:** ⚠️ PARTIALLY IMPLEMENTED (only DELETE exists)

**GET /api/projects/:id**
- Fetch single project with tasks
- Response: `{ project: Project & { tasks: Task[] } }`

---

#### 15. Projects - Update
**File:** `src/app/api/projects/[id]/route.ts`  
**Status:** ❌ NOT IMPLEMENTED

**PATCH /api/projects/:id**
- Update project (name, color)
- Body: `{ name?, color? }`
- Response: `{ success: true, project: Project }`

---

#### 16. Tasks - Bulk Operations
**File:** `src/app/api/tasks/bulk/route.ts`  
**Status:** ❌ NOT IMPLEMENTED (can use individual DELETE/PATCH)

**PATCH /api/tasks/bulk**
- Bulk update tasks
- Body: `{ ids: string[], updates: Partial<Task> }`
- Response: `{ success: true, count: number }`

**DELETE /api/tasks/bulk**
- Bulk delete tasks
- Body: `{ ids: string[] }`
- Response: `{ success: true, count: number }`

**Frontend Location:** `src/app/tasks/page.tsx` lines ~105, ~122
- Currently: Makes individual API calls (works but inefficient)

---

## Implementation Checklist

### Phase 1: Calendar (4 APIs)
- [ ] `GET /api/calendar/events`
- [ ] `POST /api/calendar/events`
- [ ] `PATCH /api/calendar/events/:id`
- [ ] `DELETE /api/calendar/events/:id`

### Phase 2: User Management (4 APIs)
- [ ] `GET /api/users/:id`
- [ ] `PATCH /api/users/:id`
- [ ] `PATCH /api/users/:id/preferences`
- [ ] `DELETE /api/users/:id`

### Phase 3: Task Enhancements (3 APIs)
- [ ] `POST /api/tasks/:id/comments` (GET if needed)
- [ ] `POST /api/projects/:id/tasks`
- [ ] `GET /api/tasks/search` (or extend existing)

### Phase 4: Project Enhancements (2 APIs)
- [ ] `GET /api/projects/:id`
- [ ] `PATCH /api/projects/:id`

### Phase 5: Optional Optimizations (3 APIs)
- [ ] `PATCH /api/users/:id/onboarding`
- [ ] `PATCH /api/tasks/bulk`
- [ ] `DELETE /api/tasks/bulk`

---

## Database Schema for New Collections

### calendar_events
```typescript
interface CalendarEvent {
  _id?: ObjectId;
  title: string;
  date: Date;
  time?: string; // "HH:MM" format
  createdAt: Date;
}
```

### comments
```typescript
interface Comment {
  _id?: ObjectId;
  taskId: ObjectId;
  content: string;
  createdAt: Date;
}
```

### users (extend existing)
```typescript
interface User {
  _id?: ObjectId;
  email: string;
  passwordHash?: string;
  name?: string;
  preferences?: {
    notifications: boolean;
    darkMode: boolean;
    emailUpdates: boolean;
    twoFactor: boolean;
  };
  onboardingCompleted: boolean;
  createdAt: Date;
}
```

---

## Testing Instructions for Each API

### 1. Create the API route file
Example: `src/app/api/calendar/events/route.ts`

### 2. Implement GET method
```typescript
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const start = searchParams.get('start');
    const end = searchParams.get('end');
    
    const events = await find<CalendarEvent>('calendar_events');
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calendar events' }, 
      { status: 500 }
    );
  }
}
```

### 3. Implement POST method
```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, date, time } = body;
    
    if (!title || !date) {
      return NextResponse.json(
        { error: 'Title and date are required' }, 
        { status: 400 }
      );
    }
    
    const event: CalendarEvent = {
      title,
      date: new Date(date),
      time,
      createdAt: new Date(),
    };
    
    const id = await insertOne('calendar_events', event);
    return NextResponse.json({ 
      success: true, 
      event: { ...event, _id: id } 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return NextResponse.json(
      { error: 'Failed to create calendar event' }, 
      { status: 500 }
    );
  }
}
```

### 4. Update frontend to use API
Replace client-side state with fetch calls in the respective page components.

### 5. Add loading states
Add `useState<boolean>` for loading and show spinner during API calls.

### 6. Test
- Start dev server: `npm run dev`
- Navigate to the page
- Perform the action
- Check MongoDB to verify persistence
- Refresh page to verify data loads

---

## Files Reference

### Existing API Patterns to Follow
- `src/app/api/tasks/route.ts` - List/Create pattern
- `src/app/api/tasks/[id]/route.ts` - Single resource CRUD
- `src/app/api/auth/route.ts` - Multi-action POST

### Frontend Patterns to Follow
- `src/app/tasks/page.tsx` - useEffect for loading, async handlers
- `src/app/auth/page.tsx` - Form submission with fetch

### Type Definitions
- `src/lib/mongo.ts` - Add new interfaces here
- `src/types/index.ts` - Frontend types if needed

---

## Quick Start for Coding Agent

1. **Pick one API from the list above**
2. **Create the route file** following existing patterns
3. **Add TypeScript interfaces** to `src/lib/mongo.ts`
4. **Update the frontend** page to call the API
5. **Run verification:**
   ```bash
   npm run typecheck
   npm run lint
   npm run dev
   ```
6. **Test in browser** and verify MongoDB persistence

---

**Created:** March 18, 2026  
**Remaining APIs:** 16  
**Priority Order:** Calendar → User Management → Task Enhancements → Project Enhancements → Optional

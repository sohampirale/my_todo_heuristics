# API Documentation

Complete reference for all API endpoints.

---

## Base URL

```
Development: http://localhost:3000
```

---

## Seed Management API

### GET /api/seed

Get current seed configuration.

**Request:**
```http
GET /api/seed
```

**Response (200 OK):**
```json
{
  "mode": "lite",
  "home": {
    "ambiguous_cta": true,
    "modal_no_close": true
  },
  "auth": {
    "missing_labels": true,
    "cryptic_error": false
  },
  "tasks": {
    "no_confirm_delete": true,
    "small_hit_target": true
  }
}
```

**Example:**
```bash
curl http://localhost:3000/api/seed | jq
```

---

### POST /api/seed

Update seed configuration (dev-only).

**Request:**
```http
POST /api/seed
Content-Type: application/json

{
  "home": {
    "ambiguous_cta": true,
    "modal_no_close": false
  },
  "tasks": {
    "no_confirm_delete": false
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "updated": {
    "home": {
      "ambiguous_cta": true,
      "modal_no_close": false
    },
    "tasks": {
      "no_confirm_delete": false
    }
  }
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/seed \
  -H "Content-Type: application/json" \
  -d '{"home": {"ambiguous_cta": true}}'
```

**Notes:**
- Only works in development mode (`NODE_ENV=development`)
- Persists to MongoDB `seeds` collection
- Changes take effect immediately on page refresh

---

## Research Files API

### GET /api/research/list

List all markdown files in `/research` directory.

**Request:**
```http
GET /api/research/list
```

**Response (200 OK):**
```json
{
  "files": [
    {
      "filename": "README.md",
      "size": 1234,
      "lastModified": "2026-03-15T10:30:00.000Z"
    },
    {
      "filename": "DECISIONS.md",
      "size": 5678,
      "lastModified": "2026-03-15T11:00:00.000Z"
    }
  ]
}
```

**Example:**
```bash
curl http://localhost:3000/api/research/list
```

---

### GET /api/research/read

Read content of a specific research file.

**Request:**
```http
GET /api/research/read?file=README.md
```

**Query Parameters:**
- `file` (required): Filename (sanitized to prevent path traversal)

**Response (200 OK):**
```json
{
  "filename": "README.md",
  "content": "# Research Directory\n\nThis directory contains...",
  "lastModified": "2026-03-15T10:30:00.000Z"
}
```

**Example:**
```bash
curl "http://localhost:3000/api/research/read?file=DECISIONS.md"
```

**Error Responses:**
```json
// 400 Bad Request
{ "error": "Missing file parameter" }

// 403 Forbidden
{ "error": "Invalid file path" }

// 404 Not Found
{ "error": "File not found" }
```

---

### POST /api/research/write

Create or update a research file (dev-only).

**Request:**
```http
POST /api/research/write
Content-Type: application/json

{
  "filename": "MY_NOTES.md",
  "content": "# My Notes\n\nTest content here..."
}
```

**Body Parameters:**
- `filename` (required): Name of file (`.md` added automatically if missing)
- `content` (required): Markdown content

**Response (201 Created):**
```json
{
  "success": true,
  "filename": "MY_NOTES.md",
  "path": "/home/user/todo_app/research/MY_NOTES.md"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/research/write \
  -H "Content-Type: application/json" \
  -d '{"filename": "test.md", "content": "# Test\n\nHello world"}'
```

**Security:**
- Only works in development mode
- Filename sanitized with `path.basename()`
- Path traversal attempts rejected
- Files only written to `/research` directory

---

## Event Logging API

### POST /api/event

Log a UI event to MongoDB.

**Request:**
```http
POST /api/event
Content-Type: application/json

{
  "page": "/tasks",
  "action": "create_task",
  "meta": {
    "taskTitle": "My Task",
    "duration": 1234
  }
}
```

**Body Parameters:**
- `page` (required): Page path where event occurred
- `action` (required): Action name
- `meta` (optional): Additional metadata

**Response (200 OK):**
```json
{
  "success": true,
  "eventId": "65f1234567890abcdef12345"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/event \
  -H "Content-Type: application/json" \
  -d '{
    "page": "/tasks",
    "action": "delete_task",
    "meta": { "taskId": "123", "confirmed": false }
  }'
```

**Use Cases:**
- Track user interactions for analysis
- Record seed usage patterns
- Log test execution events

---

## Run Registration API

### POST /api/run

Register a Playwright test run and its artifacts.

**Request:**
```http
POST /api/run
Content-Type: application/json

{
  "name": "playwright-run-2026-03-15",
  "artifacts": [
    "/captures/home-full.png",
    "/captures/home-dom.html",
    "/captures/home-ax.json"
  ]
}
```

**Body Parameters:**
- `name` (required): Run identifier
- `artifacts` (optional): Array of artifact paths

**Response (201 Created):**
```json
{
  "success": true,
  "runId": "65f1234567890abcdef12345",
  "run": {
    "_id": "65f1234567890abcdef12345",
    "name": "playwright-run-2026-03-15",
    "createdAt": "2026-03-15T12:00:00.000Z",
    "artifacts": [
      "/captures/home-full.png",
      "/captures/home-dom.html"
    ]
  }
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/run \
  -H "Content-Type: application/json" \
  -d '{
    "name": "test-run-1",
    "artifacts": ["/captures/example-run/"]
  }'
```

---

## Error Handling

All endpoints return consistent error format:

```json
{
  "error": "Error message here"
}
```

**HTTP Status Codes:**
- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid parameters
- `403 Forbidden` - Dev-only endpoint in production
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Rate Limiting

Currently **no rate limiting** is implemented. This is intentional for testing purposes.

---

## Authentication

Currently **no authentication** is required. The `ADMIN_SECRET` environment variable is reserved for future use.

**Dev-only protection:**
- `POST /api/seed` - Only works when `NODE_ENV=development`
- `POST /api/research/write` - Only works when `NODE_ENV=development`

---

## MongoDB Collections Used

| Endpoint | Collection | Operation |
|----------|------------|-----------|
| GET /api/seed | `seeds` | Find all |
| POST /api/seed | `seeds` | Update/Insert |
| POST /api/event | `events` | Insert |
| POST /api/run | `runs` | Insert |

---

## Testing API Endpoints

### Using curl

```bash
# Get seeds
curl http://localhost:3000/api/seed | jq

# Update seeds
curl -X POST http://localhost:3000/api/seed \
  -H "Content-Type: application/json" \
  -d '{"home": {"ambiguous_cta": false}}'

# List research files
curl http://localhost:3000/api/research/list | jq

# Read a file
curl "http://localhost:3000/api/research/read?file=README.md"

# Write a file
curl -X POST http://localhost:3000/api/research/write \
  -H "Content-Type: application/json" \
  -d '{"filename": "test.md", "content": "# Test"}'

# Log event
curl -X POST http://localhost:3000/api/event \
  -H "Content-Type: application/json" \
  -d '{"page": "/", "action": "view"}'
```

### Using JavaScript/TypeScript

```typescript
// Get seeds
const seeds = await fetch('/api/seed').then(r => r.json());

// Update seeds
await fetch('/api/seed', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ home: { ambiguous_cta: true } })
});

// Log event
await fetch('/api/event', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    page: '/tasks',
    action: 'create_task',
    meta: { taskId: '123' }
  })
});
```

---

## Implementation Details

### Location

All API routes are in `src/app/api/` using Next.js App Router conventions:

```
src/app/api/
├── seed/
│   └── route.ts
├── research/
│   ├── list/
│   │   └── route.ts
│   ├── read/
│   │   └── route.ts
│   └── write/
│       └── route.ts
├── event/
│   └── route.ts
└── run/
    └── route.ts
```

### Database Helpers

API routes use helpers from `src/lib/mongo.ts`:

```typescript
import { find, findOne, insertOne, updateOne } from '@/lib/mongo';

// Example usage
const seeds = await find<Seed>('seeds');
await insertOne('seeds', { key, value, updatedAt: new Date() });
```

---

**Last Updated:** March 15, 2026

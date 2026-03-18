# Research Directory

This directory contains documentation, decisions, and research artifacts for the Todo App with Seeded Usability Issues.

## Purpose

This Todo/Productivity app is a **deterministic playground** of UI interactions used to evaluate UX detection systems later. It contains configurable usability problems (seeded faults) that can be toggled via the Admin UI or `seed.json`.

## Contents

- `README.md` - This file
- `DECISIONS.md` - Architectural and design decisions
- `ISSUES_LIBRARY.md` - Catalog of all seedable UI issues with mappings to Nielsen heuristics
- `DELIVERY_REPORT.md` - Verification results and delivery checklist

## How to Use

### Toggling Seeds

1. Edit `seed.json` and set `mode` to `"lite"` or `"full"`
2. Or use the Admin UI at `/admin/seeds` to toggle individual flags
3. Changes persist to MongoDB `seeds` collection

### Running Tests

```bash
npm run test:playwright
```

Tests capture artifacts to `/captures/<runId>/`.

### API Endpoints

- `GET /api/seed` - Get current seed flags
- `POST /api/seed` - Update seed flags (dev-only)
- `GET /api/research/list` - List research files
- `GET /api/research/read?file=FILENAME` - Read a research file
- `POST /api/research/write` - Write a research file

## Future Integration

This repo is designed to be consumed by analysis/ML repos that will:
- Detect seeded UI issues automatically
- Analyze accessibility snapshots
- Evaluate UX heuristics compliance

All artifacts are structured for easy consumption by external tools.

# Feedback Widget — Implementation Plan

**Date:** 2026-03-12 | **Priority:** Medium | **Status:** Done

## Overview
Add a floating feedback button (bottom-right) that opens a modal form with name, star rating, and message fields. Data saved to Supabase via client-side JS SDK.

## Phases

| # | Phase | Status | File |
|---|-------|--------|------|
| 1 | Supabase setup + client | Done | [phase-01-supabase-setup.md](./phase-01-supabase-setup.md) |
| 2 | Feedback widget UI | Done | [phase-02-feedback-widget-ui.md](./phase-02-feedback-widget-ui.md) |

## Architecture
- `@supabase/supabase-js` client initialized with env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
- Floating button component renders a modal with form
- Direct insert to `feedback` table via Supabase client
- RLS policy: allow anonymous inserts only

## Supabase Table: `feedback`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | auto-generated |
| name | text | required |
| rating | int2 | 1-5 stars |
| message | text | required |
| created_at | timestamptz | default now() |

## Success Criteria
- Floating button visible on all viewports
- Modal opens/closes smoothly with animation
- Form validates required fields
- Data successfully saved to Supabase
- Matches existing design system (colors, fonts, glass effect)

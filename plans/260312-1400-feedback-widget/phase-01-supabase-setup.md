# Phase 01 — Supabase Setup + Client

**Status:** Pending | **Priority:** High

## Overview
Install Supabase JS client, create client utility, configure env vars.

## Implementation Steps
1. Install `@supabase/supabase-js`
2. Create `src/lib/supabase.ts` — initialize client with `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`
3. Create `.env.example` with placeholder values
4. User creates Supabase table + RLS policy (SQL provided in onboarding)

## Related Files
- `src/lib/supabase.ts` (new)
- `.env.example` (new)
- `package.json` (modified)

## SQL for Supabase Dashboard
```sql
create table feedback (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rating int2 not null check (rating between 1 and 5),
  message text not null,
  created_at timestamptz default now()
);

-- Allow anonymous inserts only
alter table feedback enable row level security;
create policy "Allow anonymous inserts" on feedback for insert with check (true);
```

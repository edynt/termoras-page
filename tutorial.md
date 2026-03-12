1. Create a Supabase project at https://supabase.com
  2. Run this SQL in the Supabase SQL Editor:
  create table feedback (
    id uuid primary key default gen_random_uuid(),
    name varchar(100) not null,
    rating int2 not null check (rating between 1 and 5),
    message text not null check (length(message) <= 1000),
    created_at timestamptz default now()
  );

  alter table feedback enable row level security;
  create policy "Allow anonymous inserts" on feedback for insert with check (true);
  3. Create .env.local with your Supabase credentials:
  VITE_SUPABASE_URL=https://your-project.supabase.co
  VITE_SUPABASE_ANON_KEY=your-anon-key-here
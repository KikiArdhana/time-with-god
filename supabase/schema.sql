-- Time With God — minimal Supabase schema (optional).
-- The app is fully functional on local device storage without Supabase. Run this
-- only if you want accounts and cross-device sync. Apply it in the Supabase SQL
-- editor. Row Level Security keeps every person's data private to them.

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  preferred_language text default 'en',
  preferred_music_language text default 'same',
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "profiles are self-service"
  on public.profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- sessions
-- ---------------------------------------------------------------------------
create table if not exists public.sessions (
  id uuid primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  date text not null,
  duration_minutes int not null,
  intention text not null,
  intentions jsonb default '[]'::jsonb,
  scripture_id text,
  steps jsonb default '[]'::jsonb,
  started_at timestamptz not null,
  completed_at timestamptz,
  note text default ''
);

alter table public.sessions enable row level security;

create policy "sessions are self-service"
  on public.sessions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists sessions_user_started_idx
  on public.sessions (user_id, started_at desc);

-- ---------------------------------------------------------------------------
-- journal_entries
-- ---------------------------------------------------------------------------
create table if not exists public.journal_entries (
  id uuid primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  session_id uuid references public.sessions (id) on delete cascade,
  type text not null,
  section text,
  content text not null,
  created_at timestamptz default now()
);

alter table public.journal_entries enable row level security;

create policy "journal entries are self-service"
  on public.journal_entries for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists journal_user_idx
  on public.journal_entries (user_id, created_at desc);

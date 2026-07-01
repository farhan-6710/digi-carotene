-- Migration 018 — Instagram Growth & Analytics Phase 1.
-- Drops legacy growth metric tables; adds instagram_profiles + past_posts_metrics.
-- Keeps growth_organic_accounts and growth_ad_accounts (empty manually before reconnect).
-- Run once in Supabase SQL Editor after 016/017.

drop table if exists public.growth_daily_metrics cascade;
drop table if exists public.growth_posts cascade;
drop table if exists public.growth_campaign_metrics cascade;
drop table if exists public.growth_reports cascade;

create table public.instagram_profiles (
  id uuid primary key default gen_random_uuid(),
  instagram_id text not null unique,
  username text not null,
  access_token text not null,
  followers_count integer not null default 0,
  organic_account_id uuid unique references public.growth_organic_accounts (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_instagram_profiles_updated_at
  before update on public.instagram_profiles
  for each row execute function public.handle_updated_at();

create table public.past_posts_metrics (
  id bigserial primary key,
  account_id uuid not null references public.instagram_profiles (id) on delete cascade,
  post_id text not null,
  caption text not null default '',
  media_type text not null check (media_type in ('REEL', 'IMAGE', 'CAROUSEL', 'VIDEO')),
  created_at timestamptz not null,
  reach integer not null default 0,
  impressions integer not null default 0,
  likes integer not null default 0,
  comments integer not null default 0,
  saves integer not null default 0,
  shares integer not null default 0,
  unique (account_id, post_id)
);

create index past_posts_metrics_account_created_idx
  on public.past_posts_metrics (account_id, created_at desc);

alter table public.instagram_profiles enable row level security;
alter table public.past_posts_metrics enable row level security;

create policy "instagram_profiles_all"
  on public.instagram_profiles for all to anon, authenticated
  using (true) with check (true);

create policy "past_posts_metrics_all"
  on public.past_posts_metrics for all to anon, authenticated
  using (true) with check (true);

-- Migration 019 — Add reposts to past_posts_metrics (Instagram media insights).
-- Run once in Supabase SQL Editor after 018.

alter table public.past_posts_metrics
  add column if not exists reposts integer not null default 0;

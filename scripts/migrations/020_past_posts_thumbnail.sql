-- Migration 020 — Post thumbnail URL for past_posts_metrics (IMAGE/CAROUSEL media_url from Meta).
-- Run once in Supabase SQL Editor after 019.

alter table public.past_posts_metrics
  add column if not exists post_thumbnail text;

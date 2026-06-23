-- Migration 012 — rename scheduled_date/time to to_be_posted_date/time; clear stale posted fields.

alter table public.posts
  rename column scheduled_date to to_be_posted_date;

alter table public.posts
  rename column scheduled_time to to_be_posted_time;

update public.posts
set posted_date = null,
    posted_time = null
where status <> 'Posted'
  and (posted_date is not null or posted_time is not null);

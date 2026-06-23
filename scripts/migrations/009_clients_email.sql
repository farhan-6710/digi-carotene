-- Migration 009 — add clients.email (portal user email; used by 011 auto-link triggers).

alter table public.clients
  add column if not exists email text;

create unique index if not exists clients_email_unique
  on public.clients (lower(trim(email)))
  where email is not null;

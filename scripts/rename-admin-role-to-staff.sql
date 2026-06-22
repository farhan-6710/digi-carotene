-- Run once in Supabase SQL Editor (existing databases only).
-- Renames profiles.role login type 'admin' → 'staff' so it no longer clashes
-- with team_members.admin_team_role value 'admin'.
-- Final profiles.role values: 'staff' | 'client' | 'user'.
--
-- Sequence matters: relax constraint → migrate rows → tighten constraint → RLS.

-- 1. Allow both old and new role values while rows are updated.
alter table public.profiles
  drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check
  check (role in ('admin', 'staff', 'client', 'user'));

-- 2. Migrate existing rows.
update public.profiles
  set role = 'staff'
  where role = 'admin';

-- 3. Tighten the constraint to the final value set.
alter table public.profiles
  drop constraint profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check
  check (role in ('staff', 'client', 'user'));

-- 4. Replace the RLS policy that gated profile writes on the old 'admin' value.
drop policy if exists "Admins update any profile" on public.profiles;
drop policy if exists "Staff update any profile" on public.profiles;

create policy "Staff update any profile"
  on public.profiles for update to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'staff'
    )
  );

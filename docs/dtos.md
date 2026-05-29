# Posts Management — Supabase Setup (minimal)

Everything you need **right now** for calendar CRUD + date selector month loading.

Skip profiles, reports, dashboard tables — add those later.

---

## What the app does

1. User picks a date (e.g. **May 29, 2026**) in `DateSelector`
2. App loads **all entries for May 2026** from Supabase
3. Table shows one cell per day; each cell can have multiple rows
4. User can **add**, **edit**, or **delete** a row (client name + time + status)

Each row on the calendar = one record in the database.

---

## One table is enough: `posts`

| Column | Type | Required | Example |
|--------|------|----------|-----------|
| `id` | uuid | yes | auto-generated |
| `client_name` | text | yes | `"Bloom Skincare"` |
| `scheduled_date` | date | yes | `2026-05-29` |
| `scheduled_time` | text | yes | `"9:00 am"` |
| `status` | text | yes | `Draft`, `Scheduled`, `Posted`, or `Missed` |
| `created_at` | timestamptz | yes | auto |

That matches your current UI (`SlotClient`: name, time, status on a date).

---

## SQL — run in Supabase → SQL Editor

```sql
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  scheduled_date date not null,
  scheduled_time text not null,
  status text not null check (status in ('Draft', 'Scheduled', 'Posted', 'Missed')),
  created_at timestamptz not null default now()
);

create index posts_scheduled_date_idx on public.posts (scheduled_date);

alter table public.posts enable row level security;

create policy "Logged-in users can read posts"
  on public.posts for select
  to authenticated
  using (true);

create policy "Logged-in users can insert posts"
  on public.posts for insert
  to authenticated
  with check (true);

create policy "Logged-in users can update posts"
  on public.posts for update
  to authenticated
  using (true);

create policy "Logged-in users can delete posts"
  on public.posts for delete
  to authenticated
  using (true);
```

---

## How month loading works

When `selectedDate` = May 29, 2026:

```
start = 2026-05-01
end   = 2026-05-31
```

**Supabase query:**

```ts
const start = new Date(year, month - 1, 1);       // May 1
const end = new Date(year, month, 0);             // May 31

await supabase
  .from("posts")
  .select("*")
  .gte("scheduled_date", format(start, "yyyy-MM-dd"))
  .lte("scheduled_date", format(end, "yyyy-MM-dd"))
  .order("scheduled_date")
  .order("scheduled_time");
```

Frontend groups results by `scheduled_date` to fill each calendar cell.

When user selects **June**, change the month → run the same query for June → table re-renders.

---

## CRUD operations

| Action | UI | Supabase |
|--------|-----|----------|
| **Add** | Click day → dialog → Save | `insert` into `posts` |
| **Edit** | Click row → dialog → Save | `update` by `id` |
| **Delete** | Edit dialog → Remove | `delete` by `id` |
| **Load month** | Date selector / month change | `select` where date in month |

**Insert example:**

```ts
await supabase.from("posts").insert({
  client_name: "Bloom Skincare",
  scheduled_date: "2026-05-29",
  scheduled_time: "9:00 am",
  status: "Scheduled",
});
```

**Update example:**

```ts
await supabase.from("posts").update({
  client_name, scheduled_time, status,
}).eq("id", postId);
```

**Delete example:**

```ts
await supabase.from("posts").delete().eq("id", postId);
```

---

## Implementation steps (in order)

### Step 1 — Database
- [ ] Run the SQL above in Supabase SQL Editor
- [ ] Confirm table appears under **Table Editor → posts**

### Step 2 — Types
- [ ] Add a `Post` type in the app (matches table columns)

```ts
type Post = {
  id: string;
  client_name: string;
  scheduled_date: string;
  scheduled_time: string;
  status: "Draft" | "Scheduled" | "Posted" | "Missed";
  created_at: string;
};
```

### Step 3 — Fetch hook
- [ ] In `usePostsManagement` (or new hook), fetch posts when `year` + `month` change
- [ ] Replace `initialSlots` mock data with Supabase `select`

### Step 4 — Wire CRUD
- [ ] `saveClient` → `insert` or `update`
- [ ] `deleteClient` → `delete`
- [ ] After each change, refetch the month (or update local state)

### Step 5 — Connect date selector
- [ ] Already have `selectedDate` → `year`, `month`, `calendarWeeks`
- [ ] Pass `year`, `month` into fetch hook → **May data loads when May is selected**

### Step 6 — Test
- [ ] Add a row on May 29
- [ ] Switch to June → May rows gone, June empty (or June rows if added)
- [ ] Switch back to May → May 29 row still there
- [ ] Edit and delete work

---

## Data shape in the app (after fetch)

Supabase returns a flat list. Group by date for the table:

```ts
// flat from API
[
  { id: "...", client_name: "Bloom", scheduled_date: "2026-05-29", ... },
  { id: "...", client_name: "Peak", scheduled_date: "2026-05-29", ... },
]

// grouped for a day cell (May 29)
getPostsForDay(posts, 2026, 5, 29) → array of entries for that cell
```

---

## Do you need a `clients` table?

**Not yet.**

Right now each calendar row stores `client_name` as text (same as your mock data). That is enough for add / edit / delete on dates.

Add a separate `clients` table later if you want:
- a dropdown of brand names
- one client linked to many posts without repeating the name

---

## Checklist summary

| Need | Solution |
|------|----------|
| Store name, time, status on a date | `posts` table |
| Load May when May is selected | Query by month range |
| Add / edit / delete | insert / update / delete on `posts` |
| Auth | Already done — use `authenticated` RLS |
| Profile, dashboard, reports | **Not needed for this feature** |

---

## Next file to change in the repo

1. `src/hooks/admin/usePostsManagement.ts` — swap local state for Supabase
2. `src/pages/admin/PostsManagementPage.tsx` — pass `year`, `month` from `usePostsCalendarSelection` into the hook

That's the full minimal path.

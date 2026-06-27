# Design — Digi Carotene

How the app is built. For product overview see [README.md](README.md); for change conventions see [AGENTS.md](AGENTS.md).

## Layers

Data flows in one direction. Each layer has one job.

```
page → hook → service → Supabase
  └ component (presentational)
```

- **Pages** (`features/*/pages`) — compose hooks + components. No business logic.
- **Components** (`features/*/components`) — presentational. Props in, UI out.
- **Hooks** (`features/*/hooks`) — state, effects, and actions for one concern.
- **Services** (`src/services`) — every Supabase call. The only place that imports the client.
- **Utils** (`features/*/utils`) — pure transforms, validation, formatters. No Supabase.

## Services (API layer)

All data access lives in `src/services/`. Keep functions plain async/await — no caching, dedupe, or realtime.

- `supabaseClient.ts` — the single Supabase client.
- `db.ts` — `DB` map of table names + select strings: `DB.POSTS.TABLE`, `DB.POSTS.SELECT`.
- One file per domain: `authService`, `profilesService`, `postsService`, `clientsService`, `teamMembersService`, `projectsService`, `projectTeamMembersService`, `postApprovalsService`, `reportsService`, `dashboardService`.

A service function does one job: build the query → run it → throw on error → map the row to a domain type.

```ts
export async function fetchClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from(DB.CLIENTS.TABLE)
    .select(DB.CLIENTS.SELECT)
    .order("client_name", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Client[];
}
```

## Data loading

Query hooks use the shared `useFetch(load, fallback)` helper (`src/shared/hooks/useFetch.ts`). It loads once on mount and returns `{ data, setData, isLoading, error, setError, reload }`. Wrap `load` in `useCallback`.

```ts
export function useClientsQuery() {
  const load = useCallback(() => fetchClients(), []);
  const { data: clients, isLoading, error, reload } = useFetch<Client[]>(load, []);
  return { clients, isLoading, error, reload };
}
```

## Auth & access

- `AuthProvider` loads the session once, then reacts to sign in / sign out. No realtime or focus-refresh.
- Profile linking is handled by **database triggers** (`link_profile_by_email`, migration 015). The app calls the same RPC as a fallback after creating a team member or client.
- A pending user signs in and **refreshes** to pick up newly granted access.
- Route guards (`TeamRoute`, `ClientRoute`, `UserRoute`) redirect by access; pages stay simple.

## Domain

`clients` (company) → `projects` (socials, manager, team) → `posts` (`project_id`). Project team: required `projects.manager_id` + extra members in `project_team_members` (active when `ended_at IS NULL`). Schema and RLS: [docs/README.md](docs/README.md).

## Conventions (summary)

- Domain types in `types/types.ts`; prop types in `types/components.ts`; constants in `constants/`.
- shadcn UI from `src/shared/ui/`. Toasts via `showToast(type, message)`.
- `@/` import alias. `import type` for types.
- Target ~120 lines per file; split when larger.

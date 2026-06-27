# Agent guidelines — Digi Carotene

Team + client portal for a digital marketing agency. Read [DESIGN.md](DESIGN.md) for architecture (layers, services, data flow). This file is the rulebook for making changes.

## Where code goes

```
src/
  app/         Router, App shell
  services/    API layer: Supabase client + all data calls
  features/<feature>/
    components/ Presentational UI
    constants/  Static data, enums, config, magic numbers
    hooks/      One concern per hook
    pages/      Route components (compose hooks + components)
    providers/  Context providers (+ a separate *Context.ts for the context/hook)
    types/      types.ts (domain) · components.ts (props)
    utils/      Pure helpers, validation, formatters (no Supabase)
  shared/       Cross-feature ui/, layouts/, utils/, hooks/
```

- Domain types → `types/types.ts`. Prop types (`*Props`) → `types/components.ts`. Constants → `constants/`.
- No types/constants/data calls inside `.tsx` files.

## Services (data layer)

- Every Supabase call lives in `src/services/`; nothing else imports `supabase`.
- Add tables to `db.ts` (`DB.X.TABLE`, `DB.X.SELECT`) — no inline table names.
- One function = one job: query → run → throw on error → map to a domain type. No caching/dedupe/realtime.
- Query hooks load data via `shared/hooks/useFetch`.

## Components & hooks

- Keep components presentational; move logic to hooks/utils.
- One concern per hook (`useClientsQuery` fetch, `useClientDialog` form+mutations, `useClientsManagement` composes).
- Target **~120 lines/file**; split when larger. Prefer named exports.
- Dialogs: pass a `values` object + `onFieldChange`; destructive actions use `ConfirmationModal`.

## UI & UX

- shadcn UI from `src/shared/ui/`. `PageHeader` for team page titles/actions.
- Toasts via `showToast(type, message)` (`success | error | info`) for create/update/delete and API success/failure.
- Keep spacing, sizing, and typography consistent. Tabbed views sync the active tab to URL params.

## Naming

- Pages: `Team*Page` / `*ManagementPage`, `Client*Page`; file name matches the export.
- Components: PascalCase; prefix client-portal mirrors with `Client`.
- Constants: `SCREAMING_SNAKE` (primitives), camelCase (objects). Types: PascalCase.

## Supabase & migrations

- New project → `scripts/migrations/001_initial_schema.sql`. Existing → only unapplied numbered files. **Never edit old migrations** — add a new one.
- Schema/RLS/DTOs live in `docs/` (start at [docs/README.md](docs/README.md)). Keep backend V1 simple.

## Don't

- Call `supabase` outside `src/services/`; add `models/` or `interfaces/` folders.
- Bury types/constants in `.tsx`; use default exports where a named export is expected.
- Do drive-by refactors or one-line wrapper components.

## Before finishing

1. Types in `types/`, constants in `constants/`, data calls in `services/`.
2. Router, nav, and imports updated for new routes.
3. Schema change → new `scripts/migrations/00N_*.sql`.
4. Important mutations show `showToast`.
5. `bun run lint` and `bun run build` pass.

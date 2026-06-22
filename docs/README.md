# Digi Carotene — Documentation

Reference docs for agents and developers. Source of truth for database schema, DTOs, and feature behavior.

## Database setup

| Doc | Purpose |
|-----|---------|
| [database.md](./database.md) | Full reset + setup, domain model, table overview |

**Scripts (Supabase SQL Editor, in order):**

1. `scripts/reset-database.sql` — wipe all tables + auth users
2. `scripts/setup-database.sql` — create schema, RLS, signup trigger

## Staff portal features

| Feature | Doc |
|---------|-----|
| Auth / profiles | [staff-portal/auth/profiles.md](./staff-portal/auth/profiles.md) |
| Clients | [staff-portal/clients-management/clients.md](./staff-portal/clients-management/clients.md) |
| Team members | [staff-portal/team-management/team-members.md](./staff-portal/team-management/team-members.md) |
| Projects | [staff-portal/projects-management/projects.md](./staff-portal/projects-management/projects.md) |
| Posts | [staff-portal/posts-management/posts.md](./staff-portal/posts-management/posts.md) |

## Domain hierarchy

```
clients (company)
  └── projects (social URLs, manager, team)
        └── posts (schedule, platform tags, post links)
team_members (internal staff)
profiles (auth roles + portal client_id)
```

TypeScript types live in `src/features/<feature>/types/types.ts`. Each doc below mirrors those types as DTOs.

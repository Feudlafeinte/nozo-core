# Architecture

## Executive Summary

Architecture Next.js (App Router) avec Server Actions natives pour la couche applicative, Supabase comme backend managé (Postgres + Auth + Storage) et Vercel pour le déploiement. Pas d’API REST/tRPC dédiée au MVP: les mutations passent par Server Actions, sécurisées par RLS côté base. PWA activée (next-pwa) avec stratégie de cache adaptée (stale-while-revalidate) pour le Dashboard.

## Project Initialization

Commandes d’initialisation (setup manuel, contrôle total):

```bash
# 1) Initialiser l’app Next.js (TypeScript, Tailwind, App Router)
npx create-next-app@latest nozobrain --typescript --tailwind --app
cd nozobrain

# 2) Dépendances
npm i @supabase/supabase-js @supabase/ssr
npm i next-pwa
# (Optionnel) Confort dev : zod pour validation, sonner/shadcn-ui pour UI
npm i zod
```

Outils MCP recommandés (initialisation automatisée):
- Supabase MCP: appliquer le schéma SQL initial (fichier `migration.sql`) et futures migrations
- Shadcn MCP: installer rapidement les composants UI (registry standard)
- Vercel MCP: provisionner/configurer le projet Vercel et variables d’environnement, préparer le pipeline de déploiement

Variables d’environnement (à définir dans Vercel et en local):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Configuration Next.js PWA (extrait `next.config.js`):

```js
/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: true,
});

module.exports = withPWA({
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
});
```

## Decision Summary

| Category | Decision | Version | Affects Epics | Rationale |
| -------- | -------- | ------- | ------------- | --------- |
| Framework | Next.js (App Router) | à vérifier | 1–8 | Intégration Vercel, Server Actions natives |
| API Pattern | Server Actions (pas de REST/tRPC) | n/a | 2–5 | Simplicité, moins de surcouche au MVP |
| Database | Supabase Postgres | gérée | 2–7 | Postgres managé + RLS |
| ORM | Aucun (client Supabase typé) | n/a | 2–7 | Réduire la lourdeur, générer types depuis schéma |
| Auth | Supabase Auth (RLS) | gérée | 6 | Auth native + politiques RLS |
| Storage | Supabase Storage (bucket documents) | gérée | 4,7 | PDFs devis/factures |
| Deployment | Vercel | n/a | 1 | Cible optimisée Next.js |
| PWA | next-pwa | à vérifier | 8, 5 | Expérience installable, SWR pour Dashboard |
| Search | Postgres FTS (phase 1) | n/a | 5 | Suffisant pour MVP |
| Logging/Audit | Tables d’audit Postgres | n/a | 4,6 | Traçabilité MONEY/WORK |

## Project Structure

```
nozobrain/
  app/
    (work)/
      projects/
      tasks/
    (money)/
      budgets/
      financial-items/
      invoices/
    (crm)/
      opportunities/
      clients/
      contacts/
    dashboard/
    actions/
      money/
      work/
      crm/
      common/
    layout.tsx
    page.tsx
  lib/
    supabase/
      server.ts    # createServerClient (SSR)
      client.ts    # createBrowserClient (CSR)
    auth/
      rls-context.ts
  components/
  public/
    icons/
    manifest.json
  supabase/
    migrations/   # SQL de référence (piloté via MCP Supabase futur)
  next.config.js
  env.example
  package.json
```

## Epic to Architecture Mapping

- Epic 2 (CRM) → `app/(crm)/*` + Server Actions dédiées
- Epic 3 (WORK) → `app/(work)/*`
- Epic 4 (MONEY) → `app/(money)/*`
- Epic 5 (Dashboard) → `app/dashboard/*` (SWR pour data)
- Epic 6 (RBAC & Sécurité) → RLS Postgres + guards UI
- Epic 7 (Documents) → Supabase Storage (bucket `documents`)
- Epic 8 (PWA) → `next-pwa` + manifeste et assets

## Technology Stack Details

### Core Technologies
- Next.js (App Router, Server Actions)
- Supabase: Postgres, Auth, Storage
- TypeScript, Tailwind (UI), shadcn/ui standard (registry) + Radix — assemblage manuel suivant le Design System (pas Studio)
- PWA via `next-pwa`

### Integration Points
- Server Actions → Supabase client (`@supabase/ssr`) pour requêtes typées
- Storage → bucket `documents` (devis/factures) via Supabase Storage
- Auth → Supabase Auth (RLS)

## Implementation Patterns

- Server Actions: toujours retourner `{ ok: boolean, data?: T, error?: string }`
- Validation d’entrée: `zod` côté Server Action
- Chargement UI: utilisez suspense/skeletons; erreurs affichées inline
- Dates: format `DD/MM/YYYY` côté UI
- Nommage: tables snake_case; colonnes snake_case; routes app dynamiques `[id]`
- Fichiers: composants en `components/`, logique data en `lib/supabase/*`

## Consistency Rules

### Naming Conventions
- Tables/colonnes Postgres: snake_case
- Endpoints Server Actions: fichiers explicites par domaine (`app/actions/money/*`)

### Code Organization
- Par domaine (crm, work, money, dashboard) dans `app/(domain)/*`
- Actions mutantes dans `app/actions/*`, lecture via `lib/supabase/server`

### Error Handling
- Retour standard `{ ok, error }`, journalisation côté DB (triggers/audit)

### Logging Strategy
- Tables d’audit pour événements critiques (budget, extras, factures, conversion)

## Data Architecture

Schéma minimal (SQL) — points critiques: `financial_items.status` et lien par `project_id`:

```sql
-- Types
create type financial_item_status as enum ('pending','invoiced','paid');

-- Clients & Contacts
create table clients (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('B2B','B2C')),
  name text not null,
  created_at timestamptz default now()
);

create table contacts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text,
  created_at timestamptz default now()
);

-- CRM
create table opportunities (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  title text not null,
  stage text not null, -- e.g., 'new','qualified','won','lost'
  quote_pdf_id uuid,   -- reference vers documents.id
  created_at timestamptz default now()
);

-- Projects (avec budget)
create table projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id),
  name text not null,
  signed_budget numeric(12,2) default 0,
  created_at timestamptz default now()
);

-- WORK (listes/tâches/sous-tâches) - structure simplifiée
create table task_lists (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  created_at timestamptz default now()
);

create table tasks (
  id uuid primary key default gen_random_uuid(),
  list_id uuid not null references task_lists(id) on delete cascade,
  title text not null,
  progress_status text not null check (progress_status in ('todo','doing','done')),
  created_at timestamptz default now()
);

create table subtasks (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references tasks(id) on delete cascade,
  title text not null,
  progress_status text not null check (progress_status in ('todo','doing','done')),
  created_at timestamptz default now()
);

-- MONEY
create table financial_items (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  amount numeric(12,2) not null check (amount >= 0),
  status financial_item_status not null default 'pending', -- CRITIQUE
  created_at timestamptz default now()
);

create table invoices (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  kind text not null check (kind in ('deposit','balance')),
  total numeric(12,2) not null check (total >= 0),
  issued_at date,
  pdf_document_id uuid, -- documents.id
  created_at timestamptz default now()
);

-- Documents (PDF devis/factures)
create table documents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete set null,
  opportunity_id uuid references opportunities(id) on delete set null,
  storage_path text not null, -- Supabase Storage path
  mime text not null,
  created_at timestamptz default now()
);
```

Calcul « Reste à facturer » (concept):
- `reste_a_facturer = projects.signed_budget + sum(financial_items.amount) - sum(invoices.total)`
- Blocage de clôture si existe `financial_items.status = 'pending'`

## API Contracts (Server Actions)

Principes:
- Server Actions par domaine: `app/actions/money/create-financial-item.ts`
- Signature type:

```ts
export async function createFinancialItem(input: {
  projectId: string;
  title: string;
  amount: number;
}): Promise<{ ok: boolean; data?: { id: string }; error?: string }>;
```

Validation: `zod`. Retour standard `{ ok, data?, error? }`.

## Security Architecture

Supabase Auth + RLS (Row Level Security). Deux rôles logiques côté produit:
- Admin: accès complet (lecture/écriture sur Finance et Work)
- Team: lecture seule sur Finance, écriture sur Work

Esquisse de politiques (exemples illustratifs; à affiner selon modèle d’utilisateur):

```sql
-- Exemple: visibilité des projects pour utilisateurs authentifiés de l’organisation
alter table projects enable row level security;
create policy "projects_read" on projects
for select using (auth.role() = 'authenticated');

-- Finance en lecture seule pour Team, écriture pour Admin
alter table financial_items enable row level security;
create policy "financial_items_read" on financial_items
for select using (auth.jwt() ->> 'role' in ('admin','team'));
create policy "financial_items_write" on financial_items
for insert with check (auth.jwt() ->> 'role' = 'admin');
create policy "financial_items_update" on financial_items
for update using (auth.jwt() ->> 'role' = 'admin');

alter table invoices enable row level security;
create policy "invoices_read" on invoices
for select using (auth.jwt() ->> 'role' in ('admin','team'));
create policy "invoices_write" on invoices
for insert with check (auth.jwt() ->> 'role' = 'admin');

-- Work: écriture autorisée pour Team et Admin
alter table tasks enable row level security;
create policy "tasks_rw" on tasks
for all using (auth.jwt() ->> 'role' in ('admin','team'))
with check (auth.jwt() ->> 'role' in ('admin','team'));
```

Profiles + JWT Role Injection (recommandé):

```sql
-- Rôles applicatifs
create type app_role as enum ('admin','team');

-- Profil utilisateur lié à auth.users
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role app_role not null default 'team',
  created_at timestamptz default now()
);

-- Helper: rôle courant (sans dépendre du JWT)
create or replace function app_user_role()
returns app_role
language sql
stable
security definer
set search_path = public
as $$
  select role from profiles where id = auth.uid();
$$;

-- Policies alternatives basées sur profiles (si JWT non injecté)
alter table financial_items enable row level security;
create policy "financial_items_read_profiles" on financial_items
for select using (app_user_role() in ('admin','team'));
create policy "financial_items_write_profiles" on financial_items
for insert with check (app_user_role() = 'admin');
create policy "financial_items_update_profiles" on financial_items
for update using (app_user_role() = 'admin');

-- Option JWT: si vous injectez `app_metadata.role` dans le token
-- via Supabase Admin API, vous pouvez utiliser:
create policy "financial_items_read_jwt" on financial_items
for select using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin','team'));
```

Notes d’implémentation:
- À la première connexion, créer/mettre à jour `profiles` (id = `auth.uid()`) avec le rôle voulu.
- Option avancée: injecter `app_metadata.role` dans le JWT pour évaluer les policies via `auth.jwt()`.

## Performance Considerations

- Dashboard: stratégie SWR (stale-while-revalidate) côté PWA pour données synthèse
- Pagination serveur et index sur clés de recherche (client, projet)
- Chargements progressifs (suspense/skeleton)

## Deployment Architecture

- Cible: Vercel (Preview/Production)
- Env vars gérées dans Vercel
- CDN & edge pour assets; Server Actions déployées côté Vercel functions
- MCP: serveur Vercel MCP connecté (déploiement, builds/logs, accès protégé aux previews)

## Development Environment

### Prérequis
- Node.js LTS
- Compte Supabase (projet, URL, ANON KEY)
- Vercel (env/projets)

Outils MCP recommandés (développement):
- Supabase MCP: appliquer les migrations et gérer les branches de dev
- Shadcn MCP: ajouter des composants UI depuis le registry standard
- Vercel MCP: déclencher déploiements, consulter logs/builds, gérer liens d’accès temporaires aux previews

### Setup Commands

```bash
# Dev
npm run dev

# Lint/Build
npm run lint
npm run build
```

## Architecture Decision Records (ADRs)

- API via Server Actions (pas de REST/tRPC au MVP)
- Auth via Supabase Auth + RLS
- Données via Supabase Postgres (sans ORM)
- Storage via Supabase Storage (bucket `documents`)
- Déploiement Vercel
- PWA via next-pwa (+ SWR Dashboard)

---

_Generated by BMAD Decision Architecture Workflow v1.0_  
_Date: {{date}}_  
_For: {{user_name}}_



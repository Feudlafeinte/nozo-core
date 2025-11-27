# Sprint 1 — Setup & Auth (Checklist technique stricte)

Objectif: fournir au Développeur une séquence exhaustive et exécutable pour initialiser le projet (Next.js + Supabase + PWA + shadcn/ui) et poser le squelette RBAC/RLS. Ne lancer le serveur qu’à votre convenance.

## 1) Prérequis machine
- Node.js LTS
- Compte Supabase (URL + anon key d’un projet)
- Compte Vercel (déploiement ultérieur)

## 2) Initialisation du projet
```bash
# Next.js (TypeScript, App Router, Tailwind)
npx create-next-app@latest nozocore --typescript --tailwind --app
cd nozocore
```

## 3) Dépendances
```bash
# Core
npm i @supabase/supabase-js @supabase/ssr zod

# PWA
npm i next-pwa

# UI (shadcn/ui - registry standard)
npx shadcn@latest init -y
npx shadcn@latest add button card input label dialog sheet
```

## 4) PWA
1. Config Next.js (`next.config.js`):
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
    serverActions: { bodySizeLimit: '2mb' },
  },
});
```

2. Manifeste (`public/manifest.json`) – adapter name/icons/couleurs:
```json
{
  "name": "NOZO",
  "short_name": "NOZO",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "theme_color": "#111827",
  "background_color": "#ffffff",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable any" }
  ]
}
```

3. Icônes:
- Placer les fichiers dans `public/icons/` (192, 512, variantes maskable si possible).
- Ajouter `<link rel="manifest" href="/manifest.json">` dans `app/layout.tsx` (section `<head>`).

4. Page hors-ligne minimale:
```tsx
// app/offline/page.tsx
export default function OfflinePage() {
  return <main>Hors ligne — réessayez quand la connexion revient.</main>;
}
```

## 5) Supabase (env + RBAC/RLS squelette)
1. Variables d’environnement (local + Vercel):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. Client Supabase (exemple de structure recommandée):
```ts
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

3. Migration SQL initiale (RBAC/Profils/RLS) — à exécuter via Supabase (SQL Editor) ou MCP:
```sql
-- Rôles applicatifs
create type app_role as enum ('admin','team');

-- Profil utilisateur
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role app_role not null default 'team',
  created_at timestamptz default now()
);

-- Helper: rôle courant
create or replace function app_user_role()
returns app_role
language sql stable security definer set search_path = public
as $$ select role from profiles where id = auth.uid(); $$;
```

4. Tables de base (MVP WORK/MONEY) — à appliquer quand prêt (voir `docs/architecture.md`):
```sql
-- Exemple (voir Architecture pour le schéma complet)
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid,
  name text not null,
  signed_budget numeric(12,2) default 0,
  created_at timestamptz default now()
);
```

5. RLS (activer et esquisser les policies quand les tables existent):
```sql
alter table projects enable row level security;
-- Lecture simple pour utilisateurs authentifiés (à ajuster ensuite)
create policy "projects_read" on projects
for select using (auth.role() = 'authenticated');
```

## 6) Structure de projet (cible)
```
nozocore/
  app/
    (work)/
    (money)/
    (crm)/
    dashboard/
    offline/
    layout.tsx
    page.tsx
  lib/
    supabase/
  components/
  public/
    icons/
    manifest.json
  next.config.js
  package.json
```

## 7) Contrôles finaux (cocher)
- [ ] Repo Next.js initialisé (TS + App Router + Tailwind)
- [ ] Dépendances installées: `@supabase/*`, `zod`, `next-pwa`, shadcn/ui
- [ ] PWA: `next.config.js` avec `withPWA`, `public/manifest.json`, icônes placées
- [ ] Page `/offline` créée
- [ ] Env Supabase (`NEXT_PUBLIC_*`) renseignées
- [ ] Migration SQL RBAC/profiles exécutée
- [ ] RLS activée (au minimum sur `projects`; élargir ensuite)
- [ ] Composants shadcn/ui de base ajoutés

Références: `docs/architecture.md`, `docs/sprint-artifacts/sprint-roadmap.yaml`, `docs/sprint-artifacts/sprint-status.yaml`.


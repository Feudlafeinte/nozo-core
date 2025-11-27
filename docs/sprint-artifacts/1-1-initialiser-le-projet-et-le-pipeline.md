# Story 1.1 — Initialiser le projet et le pipeline

**Statut** : ✅ DONE

## Contexte
Préparer un squelette Next.js (TypeScript, App Router), intégrer Supabase (Auth/DB/Storage) et outillage de base (lint/build). Objectif: démarrer rapidement les epics suivants en sécurité.

## Acceptance Criteria (BDD)
- ✅ Given un dépôt vierge, When j'exécute le setup, Then la structure standard est créée (app, lib, components, public).
- ✅ And lint/build sont configurés et passent en local.
- ✅ And variables d'environnement Supabase sont présentes.

## Portée Technique (extraits)
- ✅ Init Next.js, Tailwind, @supabase/supabase-js, @supabase/ssr
- ✅ Intégrer shadcn/ui (registry standard) pour composants de base
- ✅ Scripts npm: dev, build, lint
- ✅ PWA configuré (manifest.json, icônes, next-pwa)
- ✅ Design tokens NOZO Elegance appliqués (globals.css)

## Notes
- Voir `docs/architecture.md` (Project Initialization)
- Git remote configuré, 2 commits locaux poussés
- Migration SQL profiles exécutée sur Supabase



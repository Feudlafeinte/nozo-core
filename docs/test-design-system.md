# System-Level Test Design

## Testability Assessment

- Controllability: PASS
  - Données: Postgres managé (Supabase) avec possibilités de seed/fixtures via scripts et factories.
  - Isolation: schéma simple par domaine, tables nettoyables; seeds par projet pour scénarios reproductibles.
  - Dépendances externes: intégrations limitées au MVP (Storage/Auth Supabase), mockables via clients typés.
- Observability: CONCERNS
  - Logs/Audit: tables d’audit prévues côté DB (OK) mais télémétrie applicative (traces, métriques perf UX) à compléter.
  - Tracing front: pas d’outil spécifié (console, RUM, traces k6 → à définir).
  - Perf: cibles FCP/TTI définies, mais seuils et collecte continue non outillés.
- Reliability: PASS with notes
  - RLS/Policies posent des invariants explicites; Server Actions retournent `{ ok, error }` standard.
  - Risques de flakiness E2E faibles si stratégie “network-first” et waits déterministes appliquées.
  - Besoin d’environnements prévisibles (seed, données déterministes, identités connues).

## Architecturally Significant Requirements (ASRs)

- Performance (Web): FCP < 1.8s, TTI < 2.5s; CRUD perçu < 200ms; SWR pour Dashboard.
- Sécurité: RBAC applicatif + RLS Postgres; protection XSS/CSRF; journaux d’audit (budget/extras/factures).
- Scalabilité: listes/kanban volumineuses; indexes; pagination serveur; cible jusqu’à 10k lignes/projet.
- Fiabilité calculs MONEY: « Reste à facturer = budget signé + ∑extras − ∑factures » (invariants).
- PWA: installable, offline fallback dédié, cache minimal (stale‑while‑revalidate).
- Déploiement: Vercel (previews/production), variables env gérées; Supabase managé.

## Test Levels Strategy

- Répartition proposée (UI centrée, logique métier côté Server Actions):
  - Unit: 40%
  - API/Integration (Server Actions/DB): 35%
  - E2E: 25%
- Lignes directrices:
  - E2E: seulement parcours critiques (auth, conversion Opportunité→Projet, MONEY blocage clôture, Dashboard).
  - API: logique métier (création extras/factures, calculs, RLS happy/negative paths).
  - Unit: validations, helpers, mapping données, calculs locaux, garde‑fous d’erreurs.
  - Eviter les doublons de couverture entre niveaux.

## NFR Testing Approach

- Sécurité
  - Auth/RLS: tests d’accès par rôles (admin/team) sur MONEY/WORK; negative paths.
  - OWASP light: XSS/CSRF basiques; secrets; validations champs.
- Performance
  - k6: scénarios CRUD et Dashboard; objectifs FCP/TTI vérifiés par RUM/light lighthouse en CI.
  - Pagination/lazy-loading: tests de dégradation sur grands volumes.
- Fiabilité
  - Chemins d’erreurs, retries contrôlés; journaux d’audit vérifiés; cohérence MONEY vs WORK.
- Maintenabilité
  - Ciblage P0/P1 clair, pyramide de tests; seuils coverage critiques par domaine.

## Test Environment Requirements

- Environnements
  - Preview Vercel par PR (smoke + P0 subset).
  - Staging partagé (seed stable) pour E2E plus larges et perf k6 légère.
- Données
  - Factories/fixtures: clients, projets, extras (pending/invoiced/paid), factures (deposit/balance).
  - Snapshots de seeds reproductibles; nettoyage idempotent.
- Outils
  - Playwright (E2E/Component), k6 (perf), ESLint/TS pour qualité, scripts seed Supabase.

## Testability Concerns

- Observabilité applicative partielle (manque de traces front/RUM): à compléter.
- PWA offline: fallback à implémenter + cas de cohérence données à tester.
- DI limitée (Server Actions) → privilégier tests d’intégration/API bien découpés.
- Sécurité: policies RLS à formaliser et couvrir (happy/negative).

## Recommendations for Sprint 0

1. Mettre en place seeds/factories et nettoyage idempotent.
2. Initialiser Playwright (config garde‑fous, artifacts, “network‑first”).
3. Ajouter RUM léger + collecte perf CI (Lighthouse CI ou équivalent).
4. Écrire smoke P0 (auth, conversion, MONEY blocage, Dashboard chargement).
5. Configurer jobs CI: smoke PR, P0 sur main, perf hebdo.



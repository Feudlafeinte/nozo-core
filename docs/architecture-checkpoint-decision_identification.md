# Checkpoint — Identification des décisions architecturales

Objectif: lister et prioriser les décisions à prendre pour un setup manuel, en s’appuyant sur le PRD/Épics/UX et le catalogue de décisions.

Priorités:
1) CRITIQUES (bloquantes)
   - Data persistence: PostgreSQL (ou Supabase Postgres) + ORM (Prisma/Drizzle)
   - API pattern: REST (OpenAPI) ou tRPC; format de réponse et gestion d’erreurs
   - AuthN/AuthZ: stratégie d’auth (NextAuth/Auth0/Clerk) + RBAC (rôles PRD)
   - Déploiement: cible (Vercel vs autre) et runtime Node pris en charge
2) IMPORTANTES (structurantes)
   - File storage (PDF devis/factures): S3/compatible; sécurité liens/accès
   - Recherche: Postgres FTS (par défaut) vs Algolia/Typesense (si besoin)
   - Journalisation/Audit: événements critiques MONEY/WORK
   - PWA: manifest, offline fallback, icônes, display: standalone
3) OPTIONNELLES (déférables)
   - Jobs/queues: BullMQ/Temporal (selon besoins async)
   - Temps réel: non requis au MVP (à surveiller)

Propositions initiales (à valider):
- Base framework: Next.js (App Router), TypeScript, Tailwind, shadcn/ui
- Persistence: PostgreSQL + Prisma (fort écosystème, migrations, type‑safety)
- API: REST avec conventions strictes + contrat OpenAPI (ou tRPC si vous préférez type‑safety bout‑en‑bout)
- Auth: NextAuth (e‑mail/OAuth) et middleware RBAC (rôles PRD)
- Déploiement: Vercel (couvrant back‑office Next.js, PWA) — alternatives possibles (Railway/AWS)
- Stockage fichiers: S3 compatible (PDF), URLs signées, durées limitées
- Recherche: Postgres FTS (phase 1), extensible
- Logs/Audit: journaliser modifications MONEY (budget, extras, factures) et conversions CRM→Projet

Questions ciblées:
1) Préférence API: REST (+ OpenAPI) ou tRPC ?
2) ORM: Prisma vous convient‑il ? (alternatives: Drizzle)
3) Auth: NextAuth ok ? (ou contrainte vers Auth0/Clerk)
4) Déploiement: Vercel par défaut, autre préférence ?
5) Stockage PDF: S3 compatible acceptable ?

━━━━━━━━━━━━━━━━━━━━━━━
Options:
- [a] Advanced Elicitation (creuser contraintes ou alternatives)
- [c] Continuer avec ces propositions
- [p] Party‑Mode
- [y] YOLO



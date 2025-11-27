# Checkpoint — Compréhension du contexte projet

Projet: NOZO CORE

Résumé PRD:
- Objectif: Unifier Répertoire, CRM light, Projet Janus (WORK/MONEY) et Dashboard pour une visibilité continue de la rentabilité et zéro oubli de facturation.
- Différenciateurs clés:
  - Séparation stricte WORK (avancement) / MONEY (pilotage financier)
  - Alerte anti‑oubli bloquant la clôture si Extras « À facturer »
  - Règle maîtresse: Reste à facturer = (Budget signé + ∑Extras) − ∑Factures
- Type: web_app (greenfield), complexité faible; rôles: Admin/Manager, Chef de projet, Créatif

Couverture fonctionnelle (FRs):
- 40 exigences (FR1–FR40) couvrant: Répertoire, Opportunités→Projet, WORK (Listes/Tâches/Sous‑tâches, vues Liste/Kanban, double statut), MONEY (Budget/Extras/Factures + PDFs), Dashboard (synthèse/filtrage), RBAC de base, fichiers/documents, recherche/export, journalisation, API interne de synthèse.

Exigences non‑fonctionnelles (NFRs) clés:
- Performance: FCP < 1.8s, TTI < 2.5s; CRUD perçu < 200ms; pagination, lazy‑loading, cache données
- Sécurité: RBAC de base, TLS, validation stricte, journalisation d’événements critiques
- Scalabilité: indexation, dégradation gracieuse, partitionnement logique; tailles cibles réalistes
- Accessibilité: WCAG 2.1 AA, focus visible, navigation clavier complète
- Intégration: API interne JSON versionnée; webhooks internes; extensions futures

Vue Épics (synthèse et mapping FR):
- Epic 1: Foundation & Setup — support global
- Epic 2: CRM Opportunités & Conversion (FR2–FR6)
- Epic 3: WORK (FR7–FR11, FR36)
- Epic 4: MONEY (FR12–FR16, FR27–FR28, FR35)
- Epic 5: Dashboard & Synthèse (FR17–FR18, FR21, FR33–FR34, FR40)
- Epic 6: RBAC & Sécurité (FR19–FR20)
- Epic 7: Documents/Pièces jointes (FR22, FR26, FR35)
- Epic 8: PWA installable (support UX/Perf)

Implications UX (spécification UX):
- Direction « NOZO ELEGANCE » dark par défaut, Sidebar translucide (glassmorphism subtil), en‑têtes sticky, contenu principal opaque pour lisibilité.
- Bibliothèque: shadcn/ui + Radix; tokens CSS (accents Rouge/Rose/Bleu); composants custom clés: KanbanBoard (WORK), MoneySummaryWidget (MONEY).
- A11y et responsive détaillés; interactions critiques décrites (Opportunité→Projet, Ajout d’Extra).

Indicateurs de complexité:
- Temps réel non requis (au MVP), mais UI performante et réactive (optimisme contrôlé).
- Données financières et documents nécessitant intégrité, traçabilité et états explicites.

Points notables / risques:
- Invariants MONEY/WORK à garantir (indépendance des statuts).
- Cohérence calcul « Reste à facturer » et blocage de clôture (pas d’échappatoires).
- Gestion sûre des PDFs (accès/stockage).

Question de confirmation:
Cela correspond‑il à votre compréhension du projet ?

━━━━━━━━━━━━━━━━━━━━━━━

Options:
- [a] Advanced Elicitation (approfondir ou explorer des pistes innovantes)
- [c] Continuer
- [p] Party‑Mode (réunir d’autres agents)
- [y] YOLO (enchaîner sans pause)



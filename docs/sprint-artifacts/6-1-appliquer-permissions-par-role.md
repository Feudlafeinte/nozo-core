# Story 6.1 — Appliquer permissions par rôle

## Contexte
Appliquer concrètement les permissions (lecture/écriture) par domaine selon le rôle (admin/team). Connecter policies RLS, profils utilisateurs et contrôles UI.

## Acceptance Criteria (BDD)
- Given un utilisateur `team`, Then il peut écrire sur WORK mais uniquement lire MONEY.
- Given un utilisateur `admin`, Then il peut lire/écrire sur WORK et MONEY.
- And les vues UI reflètent les permissions (actions interdites masquées/désactivées).

## Portée Technique (extraits)
- Policies RLS effectives sur tables `tasks`, `financial_items`, `invoices`, `projects`
- Vérifications côté Server Actions (garde d’accès)
- Comportements UI conditionnels

## Notes
- Voir `docs/architecture.md` (Security Architecture)



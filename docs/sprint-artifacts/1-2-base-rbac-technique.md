# Story 1.2 — Base RBAC technique (squelette)

**Statut** : ✅ DONE

## Contexte
Mettre en place le squelette RBAC: structure des rôles, points d'accroche UI/Server Actions, et préparation RLS côté base (sans règles métier avancées).

## Acceptance Criteria (BDD)
- ✅ Given rôles Admin/Manager et Team, Then les points d'accroche d'autorisations existent dans l'app.
- ✅ And un mécanisme de rôle utilisateur est disponible (profil/JWT app_metadata).
- ✅ And les politiques RLS de base sont esquissées sur tables clés.

## Portée Technique (extraits)
- ✅ Table `profiles (id, role)` et type `app_role` (existent en DB)
- ✅ Helpers d'accès au rôle courant (`useUserRole()` hook)
- ✅ Middleware de protection des routes (`/dashboard`, `/projects`)
- ✅ Page `/login` avec authentification OTP Supabase
- ✅ Page `/dashboard` stub protégée affichant le rôle

## Notes
- Voir `docs/architecture.md` (Security Architecture)
- Middleware créé dans `src/middleware.ts`
- Hook `useUserRole()` dans `src/lib/auth/use-user-role.ts`
- Protection active sur `/dashboard/*` et `/projects/*`



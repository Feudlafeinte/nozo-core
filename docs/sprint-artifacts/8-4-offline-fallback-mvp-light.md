# Story 8.4 — Offline Fallback (MVP Light)

## Contexte
Fournir une page « Hors ligne » dédiée et un service worker minimal pour afficher un fallback propre en absence de réseau.

## Acceptance Criteria (BDD)
- Given le réseau est indisponible, When l’utilisateur navigue, Then une page hors-ligne lisible est servie.
- And le retour en ligne fonctionne sans cache incohérent.

## Portée Technique (extraits)
- `next-pwa` pour générer un SW de base (register/skipWaiting)
- Page offline dédiée (ex: `/offline`)
- Stratégie de cache minimal (assets statiques)

## Notes
- Référence: `docs/architecture.md` (PWA)



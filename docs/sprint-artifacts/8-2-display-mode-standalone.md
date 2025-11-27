# Story 8.2 — Display mode standalone

## Contexte
Assurer l’ouverture de l’application en mode standalone (sans chrome navigateur) une fois installée.

## Acceptance Criteria (BDD)
- Given l’app est installée, When elle est lancée depuis l’écran d’accueil, Then elle s’ouvre en plein écran (standalone).
- And la navigation back/intent fonctionne correctement.

## Portée Technique (extraits)
- `display: "standalone"` dans `manifest.json`
- Validation comportement via simulateur Lighthouse/Chrome DevTools

## Notes
- Référence: `docs/architecture.md` (PWA)



# Story 8.3 — Icons & Apple Touch

## Contexte
Fournir les packs d’icônes (favicon multi-tailles, Apple Touch Icon) pour un rendu correct sur mobile et lors de l’installation.

## Acceptance Criteria (BDD)
- Given l’app est visitée/ajoutée à l’écran d’accueil, Then l’icône NOZO s’affiche correctement selon le device.
- And les tailles exigées par les plateformes sont présentes.

## Portée Technique (extraits)
- `public/icons/*` (favicons, apple-touch-icon.png, maskable)
- Liens `<link rel="icon">`, `<link rel="apple-touch-icon">`
- Option maskable icons pour Android

## Notes
- Référence: `docs/architecture.md` (PWA)



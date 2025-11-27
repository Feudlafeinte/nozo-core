# Story 8.1 — Manifest & Install Prompt

## Contexte
Configurer `manifest.json` et l’installabilité (Add to Home Screen) afin de permettre l’installation de l’application sur mobile.

## Acceptance Criteria (BDD)
- Given un navigateur compatible PWA, When l’utilisateur visite l’app, Then un manifest valide est servi.
- And l’icône, le nom et les couleurs proviennent du manifest.
- And un install prompt est proposé (quand éligible) ou documenté si contrôlé manuellement.

## Portée Technique (extraits)
- Fichier `public/manifest.json` (name/short_name, start_url, scope, theme_color, background_color)
- Liens `<link rel="manifest">` servis par Next.js
- Vérification Lighthouse PWA (installabilité)

## Notes
- Référence: `docs/architecture.md` (PWA)



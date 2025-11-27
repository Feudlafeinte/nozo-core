# Story 1.3: UI Shell & Navigation

**Statut:** Approved

**Sprint:** 1

## Description

Mise en place du layout global (App Shell) respectant le Design System "NOZO Elegance".

## Acceptance Criteria

- [ ] Sidebar gauche (Desktop) / Drawer (Mobile) avec effet Glassmorphism.
- [ ] Header Sticky avec Breadcrumbs et Theme Toggle.
- [ ] Layout `(protected)` sécurisé englobant le Dashboard.
- [ ] Navigation fonctionnelle (Dashboard, Projets, Money).

## Portée Technique

- Composants layout : `app-sidebar.tsx`, `app-header.tsx`
- Route group `(protected)` pour pages authentifiées
- Integration `next-themes` pour toggle Dark/Light
- Composants shadcn : sheet, avatar, dropdown-menu, separator, sidebar

## Notes

- Respecter tokens NOZO Elegance (backdrop-blur-xl, bg-background/80)
- Sidebar fixe Desktop (w-64), Drawer Mobile
- Header avec breadcrumbs et actions contextuelles


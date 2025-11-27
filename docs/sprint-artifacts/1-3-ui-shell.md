# Story 1.3: UI Shell & Navigation

**Statut:** ✅ DONE

**Sprint:** 1

## Description

Mise en place du layout global (App Shell) respectant le Design System "NOZO Elegance".

## Acceptance Criteria

- ✅ Sidebar gauche (Desktop) / Drawer (Mobile) avec effet Glassmorphism.
- ✅ Header Sticky avec Breadcrumbs et Theme Toggle.
- ✅ Layout `(protected)` sécurisé englobant le Dashboard.
- ✅ Navigation fonctionnelle (Dashboard, Projets, Money).

## Portée Technique

- ✅ Composants layout : `app-sidebar.tsx`, `app-header.tsx`
- ✅ Route group `(protected)` pour pages authentifiées
- ✅ Integration `next-themes` pour toggle Dark/Light
- ✅ Composants shadcn : sheet, avatar, dropdown-menu, separator, sidebar, tooltip, skeleton
- ✅ ThemeProvider wrapper dans root layout
- ✅ Pages stubs : `/dashboard`, `/projects`, `/money`

## Notes

- Respecte tokens NOZO Elegance (backdrop-blur-xl, bg-sidebar/80)
- Sidebar fixe Desktop (w-64), Sheet Drawer Mobile
- Header avec breadcrumbs dynamiques et Theme Toggle (Sun/Moon)
- Logo "N" avec accent primary (#f3130c)


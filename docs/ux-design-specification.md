# NOZO CORE UX Design Specification

_Created on 2025-11-26 by Feud_
_Generated using BMad Method - Create UX Design Workflow v1.0_

---

## Executive Summary
NOZO CORE est une application web back‑office unifiant Répertoire, CRM light, Projet Janus (WORK/MONEY) et Dashboard de rentabilité. L’ambition est d’aligner l’exécution opérationnelle et la facturation, avec une séparation stricte entre travail (avancement) et pilotage financier (budget, extras, factures), et une règle métier clé « Reste à facturer = (Budget signé + ∑Extras) − ∑Factures ». La direction artistique « NOZO ELEGANCE » privilégie un dark mode profond, une Sidebar translucide en glassmorphism subtil, des en‑têtes sticky, et un contenu principal opaque pour une lisibilité parfaite. Les accents de marque sont Rouge (#f3130c), Rose (#c51172, MONEY) et Bleu (#089ccb, WORK).

---

## 1. Design System Foundation

### 1.1 Design System Choice

**Direction artistique: NOZO ELEGANCE (inspiration Apple)**  
Objectif: élégance fonctionnelle, sobriété, hiérarchie claire, lisibilité parfaite.

- **Design system**: shadcn/ui (Radix primitives) + tokens personnalisés NOZO
- **Philosophie visuelle**: épuré, focus contenu, micro-détails (rayon 0.5rem, ombres douces)
- **Glassmorphism (subtil et sémantique seulement)**:
  - Sidebar (translucide): `backdrop-blur-xl` + `bg-background/80`
  - En‑têtes fixes (sticky headers): flou léger + fond translucide
  - Modales: overlay/mask avec flou discret
- **Contenu principal**: fond OPAQUE (pas de blur) pour une lisibilité optimale
- **Typographie**: Inter (système sans serif propre et intemporel)
- **Thèmes**: Dark par défaut, Light en secondaire (switcher visible)

#### Decision Record — Choix final
- **Direction retenue**: NOZO ELEGANCE (Custom Direction)
- **Justification**: Alignée avec l’ADN de l’agence (Luxe & Tech). Le duo « Fond Opaque + Sidebar Glass » offre le meilleur compromis entre esthétique immersive et lisibilité opérationnelle pour un outil de gestion quotidien.
- **Palette validée**: Dark Mode `#0c0c0c` par défaut, accents Rouge `#f3130c`, Rose `#c51172` (MONEY), Bleu `#089ccb` (WORK).

---

## 2. Core User Experience

### 2.1 Defining Experience

Interface « Janus » séparant clairement WORK (opérationnel) et MONEY (pilotage financier), tout en restant cohérente au niveau Projet.

- Navigation: Sidebar latérale fixe à gauche (translucide avec `backdrop-blur-xl` et `bg-background/80`), inspirée des patterns shadcn Studio. Éléments: logo, commutateur de thème (Soleil/Lune), sections principales (Répertoire, Opportunités, Projets, Dashboard), et sous‑sections contextuelles.
- En‑têtes: barres sticky translucides par vue (fil d’Ariane, actions contextuelles).
- Contenu principal: surfaces opaques (`--surface`) pour cartes, listes, tableaux, formulaires, afin de garantir un contraste et une lisibilité AA.
- WORK: vues Liste/Kanban pour Listes → Tâches → Sous‑tâches; double statut d’avancement clair (À faire / En cours / Fait); aucune donnée financière affichée.
- MONEY: Budget signé, Extras (À facturer / Facturé / Non facturable), Factures (acompte/solde) + PDFs; calcul et affichage du « Reste à facturer »; blocage de clôture si Extras « À facturer ».
- Mobile/PWA: Sidebar → Drawer (menu burger) ou Bottom Bar si usage récurrent; mêmes principes (en‑tête sticky, contenu opaque).

### 2.2 Novel UX Patterns

{{novel_ux_patterns}}

---

## 3. Visual Foundation

### 3.1 Color System

Cette section définit les palettes Dark/Light, les tokens de marque, et les usages.

- **Mode par défaut**: Dark
- **Accents NOZO (constants dans les deux modes)**:
  - Rouge (actions primaires/alertes): `#f3130c`
  - Rose (univers MONEY): `#c51172`
  - Bleu (univers WORK): `#089ccb`

Tokens CSS (proposés) — variables racine et variantes par thème:

```css
:root {
  --radius: 0.5rem;
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

  /* Accents de marque */
  --nozo-red: #f3130c;   /* Actions primaires / alertes */
  --nozo-pink: #c51172;  /* Domaine MONEY */
  --nozo-blue: #089ccb;  /* Domaine WORK */
}

/* Dark (par défaut) */
:root[data-theme="dark"] {
  --bg: #0c0c0c;      /* Background */
  --surface: #1c1c1c; /* Cartes / surfaces */
  --border: rgba(255,255,255,0.10);
  --text: rgba(255,255,255,0.92);
  --text-muted: rgba(255,255,255,0.64);
}

/* Light (secondaire) */
:root[data-theme="light"] {
  --bg: #f9fafb;        /* Slate-50 (ou #ffffff) */
  --surface: #ffffff;   /* Surfaces avec ombres douces */
  --border: rgba(0,0,0,0.08);
  --text: #0f172a;      /* slate-900 */
  --text-muted: rgba(15,23,42,0.70);
}
```

Guidelines d’usage:
- Borders en Dark: lignes très fines `var(--border)`; en Light préférer `shadow-sm` aux bordures quand possible.
- Contraste texte: viser AA minimal; utiliser `--text` pour corps, `--text-muted` pour méta.
- Accents: Rouge (primaire/alerte), Rose (MONEY), Bleu (WORK); éviter d’utiliser plusieurs accents concurrents sur une même vue.

**Interactive Visualizations:**

- Color Theme Explorer: [ux-color-themes.html](./ux-color-themes.html)

---

## 4. Design Direction

### 4.1 Chosen Design Approach

**NOZO ELEGANCE**  
- Layout sobre, espaces respirants; informations denses seulement là où la tâche l’exige.  
- Sidebar translucide fixe; en‑têtes sticky translucides; modales avec overlay flou discret.  
- Contenu principal toujours sur surface opaque pour préserver la lisibilité et les contrastes.

Exemple structure de layout (concept Tailwind/shadcn):

```html
<body data-theme="dark" class="bg-[var(--bg)] text-[var(--text)]">
  <aside class="fixed inset-y-0 left-0 w-72 bg-[var(--bg)]/80 backdrop-blur-xl border-r border-[var(--border)]">
    <!-- Logo, nav items, Theme Switcher (soleil/lune) -->
  </aside>
  <header class="sticky top-0 ml-72 bg-[var(--bg)]/70 backdrop-blur-xl border-b border-[var(--border)]">
    <!-- Breadcrumbs / actions contextuelles -->
  </header>
  <main class="ml-72 p-6">
    <section class="bg-[var(--surface)] rounded-[var(--radius)] shadow-sm">
      <!-- Contenu principal (opaque), cartes, tableaux, formulaires -->
    </section>
  </main>
</body>
```

**Interactive Mockups:**

- Design Direction Showcase: [ux-design-directions.html](./ux-design-directions.html)

---

## 5. User Journey Flows

### 5.1 Critical User Paths

Parcours clé 1 — Conversion « Opportunité → Projet »:
- Objectif: transformer une opportunité « Gagnée » en Projet pré‑rempli (Client, Budget, Devis signé).
- Étapes:
  1. Opportunités (Kanban) → carte marquée « Gagnée »
  2. Action « Convertir en Projet »
  3. Modal de confirmation (glassmorphism discret) récapitulant Client, Budget final, Devis PDF
  4. Création du Projet avec pré‑remplissage
  5. Redirection vers la vue Projet (WORK par défaut)
- Feedback: toast succès, lien vers Projet créé
- Erreurs: données manquantes/incohérentes → message inline + blocage conversion
- Décision points: possibilité d’ajuster le Budget lors de la conversion (si autorisé)
- Succès: Projet créé et visible; traçabilité (journal d’événements)

Parcours clé 2 — Ajout d’un Extra financier:
- Objectif: ajouter un Extra côté MONEY pour refléter un ajout/achat non prévu initialement.
- Étapes:
  1. Projet → onglet MONEY
  2. Bouton « Nouvel Extra »
  3. Formulaire Extra (titre, montant, description, statut initial « À facturer »)
  4. Validation formulaire (contrôles de format et champs requis)
  5. Sauvegarde, affichage de l’Extra en liste MONEY
  6. Mise à jour du « Reste à facturer »
- Feedback: toast succès, mise à jour immédiate de la synthèse
- Erreurs: montant invalide, champs requis manquants → erreurs in‑line
- Décision points: marquer directement « Facturé » si facture associée disponible
- Succès: Extra enregistré; synthèse cohérente; possibilité de lier une facture plus tard

Diagramme (Mermaid):

```mermaid
flowchart TD
  A[Opportunité 'Gagnée'] --> B{Convertir en Projet ?}
  B -- Oui --> C[Modal confirmation (Client, Budget, Devis)]
  C --> D[Créer Projet pré‑rempli]
  D --> E[Vue Projet (WORK)]
  E --> F[Onglet MONEY]
  F --> G[Créer Extra (À facturer)]
  G --> H[Mettre à jour Reste à facturer]
  H --> I[Option: Lier Facture / marquer Facturé]
  B -- Non --> Z[Retour Opportunités]
```

---

## 6. Component Library

### 6.1 Component Strategy

Stratégie: utiliser strictement shadcn/ui + shadcn Studio (Radix primitives), stylés avec nos tokens NOZO pour garantir accessibilité, cohérence et vélocité.

- Composants shadcn/ui (exemples): Button, Input, Label, Select, Dialog, Drawer/Sheet, Card, Tabs, Toast, Table, Breadcrumb, Tooltip, Dropdown Menu, Switch.
- Tokens appliqués: couleurs (bg/surface/border/text, accents Rouge/Rose/Bleu), radius (0.5rem), typographie Inter, ombres (`shadow-sm` en Light).
- États & A11y par défaut: focus ring visible, ARIA intégrés (via Radix).
- Personnalisation: via CSS variables et classes utilitaires Tailwind (arbitrary values pour hex).

Composants custom (spécifiés):
- KanbanBoard (WORK)
  - But: gérer Tâches/Sous‑tâches par colonnes (À faire / En cours / Fait)
  - Contenu: cartes avec titre, étiquettes, responsable, actions rapides
  - Actions: drag‑and‑drop, changement de statut, ouverture détails
  - États: vide, loading (skeleton), erreur; focus & clavier (mouvements entre colonnes)
  - Variants: densité compacte/standard
  - A11y: réordonnancement accessible (clavier), libellés SR, annonces d’état
- MoneySummaryWidget (MONEY)
  - But: afficher Budget signé, Somme des Extras, Somme des Factures, « Reste à facturer »
  - États: normal, alerte (si Extras « À facturer » > 0), erreur de calcul
  - A11y: annonces aria‑live pour changements de valeurs

---

## 7. UX Pattern Decisions

### 7.1 Consistency Rules

- **Boutons (hiérarchie)**:
  - Primaire: fond `--nozo-red`, texte blanc; hover foncé; focus-ring visible AA
  - Secondaire: fond `--surface` (Light: `--surface` avec `shadow-sm`), bordure `--border`
  - Tertiaire: texte accent + fond transparent
  - Destructif: utiliser Rouge primaire avec label explicite
- **Feedback**:
  - Succès: toast non bloquant; Erreur: inline près du champ + toast selon gravité
  - Loading: skeleton sur cartes/listes; progress sur actions longues
- **Formulaires**:
  - Labels au‑dessus; validation onBlur + onSubmit; erreurs in‑line
  - Aides via tooltip ou texte d’aide compact
- **Modales (avec glassmorphism discret)**:
  - Overlay sombre + flou léger; taille responsive; escape/click‑outside configurables
  - Focus management strict; piégeage du focus
- **Navigation**:
  - Desktop: Sidebar gauche fixe (translucide), état actif clair
  - Mobile: Drawer via burger; si PWA orientée usage récurrent → Bottom Bar envisagée
- **Theme Switcher**:
  - Icône Soleil/Lune visible dans la Sidebar (desktop) et dans le Drawer (mobile)

- **Empty States**:
  - Illustration minimaliste (SVG ou icône lucide gris sombre), court texte d’encouragement, CTA clair
  - Exemple: « Aucun projet pour l’instant. Lancez‑vous ! »
- **Notifications**:
  - Usage exclusif de toasts (Shadcn Sonner), position bas‑droite
  - Pas de pop‑ups intrusives bloquantes
- **Search (Global Command Menu)**:
  - Barre globale type Command (Shadcn Command) accessible via `Cmd+K` dans le Header
  - Recherche cross‑sections (clients, opportunités, projets, actions)
- **Date/Time**:
  - Format européen `DD/MM/YYYY`
  - Composant: DatePicker (Shadcn)

---

## 8. Responsive Design & Accessibility

### 8.1 Responsive Strategy

Breakpoints recommandés:
- Mobile ≤ 480, Tablet 481–1024, Desktop ≥ 1025

Adaptations:
- Sidebar → Drawer (mobile); possibilité Bottom Bar pour PWA si plus efficace
- En‑têtes sticky conservés; modales plein écran sur petit viewport
- Grilles: multi‑colonnes → single‑column; tables → scroll horizontal ou cartes

Accessibilité (cible WCAG 2.1 AA):
- Contraste texte/surface AA minimum; focus visibles partout
- Navigation clavier complète (Sidebar, Header, Modales, Drawer)
- ARIA pour rôles, labels, et annonces d’état; tailles cibles tactiles ≥ 44px

### 8.2 Accessibility (A11y) — Détails

- Ratios de contraste visés (WCAG 2.1 AA):
  - Texte normal: ≥ 4.5:1
  - Grand texte (≥ 18pt ou 14pt bold): ≥ 3:1
  - Icônes/contrôles non textuels: contraste suffisant vs fond
- Focus:
  - Anneau de focus visible (≥ 2px), offset clair; jamais supprimé
  - Ordre de tabulation logique: Sidebar → Header → Main → Modales (piégeage focus)
- Navigation clavier:
  - Sidebar: montée/descente pour éléments, Home/End, Entrée/Space pour action
  - Drawer/Modal: `Esc` ferme (si non critique), focus initial au premier élément interactif
  - Skip links: lien « Aller au contenu » affiché au focus
- Lecteurs d’écran:
  - Rôles/ARIA: navigation, main, region, dialog; `aria-current="page"` pour l’élément actif
  - Labels explicites pour boutons d’action (ex: « Convertir en Projet »)
- Tests:
  - Automatisé: Lighthouse/Axe
  - Manuel: navigation clavier complète, revue SR (VoiceOver/NVDA)

---

## 9. Implementation Guidance

### 9.1 Completion Summary

Design System (shadcn/ui + tokens NOZO) sélectionné et appliqué; fondations visuelles (Dark/Light) définies avec variables CSS; direction « NOZO ELEGANCE » consolidée (Sidebar translucide, headers sticky, contenu opaque). Parcours clés décrits avec étapes, feedbacks, décisions et erreurs. Stratégie composants (librairie + custom) et règles UX consignées. Responsive et A11y (AA) détaillés pour implémentation.  
**Statut**: Design System prêt pour l’Architecte (handoff).

---

## Appendix

### Related Documents

- Product Requirements: `./prd.md`
- Product Brief: `./bmm-product-brief-NOZO-CORE-2025-11-26.md`
- Brainstorming: `./bmm-brainstorming-session-2025-11-26.md`

### Core Interactive Deliverables

This UX Design Specification was created through visual collaboration:

- **Color Theme Visualizer**: [ux-color-themes.html](./ux-color-themes.html)
  - Interactive HTML showing all color theme options explored
  - Live UI component examples in each theme
  - Side-by-side comparison and semantic color usage

- **Design Direction Mockups**: [ux-design-directions.html](./ux-design-directions.html)
  - Interactive HTML with 6-8 complete design approaches
  - Full-screen mockups of key screens
  - Design philosophy and rationale for each direction

### Optional Enhancement Deliverables

_This section will be populated if additional UX artifacts are generated through follow-up workflows._

<!-- Additional deliverables added here by other workflows -->

### Next Steps & Follow-Up Workflows

This UX Design Specification can serve as input to:

- **Wireframe Generation Workflow** - Create detailed wireframes from user flows
- **Figma Design Workflow** - Generate Figma files via MCP integration
- **Interactive Prototype Workflow** - Build clickable HTML prototypes
- **Component Showcase Workflow** - Create interactive component library
- **AI Frontend Prompt Workflow** - Generate prompts for v0, Lovable, Bolt, etc.
- **Solution Architecture Workflow** - Define technical architecture with UX context

### Version History

| Date     | Version | Changes                         | Author        |
| -------- | ------- | ------------------------------- | ------------- |
| 2025-11-26 | 1.0     | Initial UX Design Specification | Feud |

---

_This UX Design Specification was created through collaborative design facilitation, not template generation. All decisions were made with user input and are documented with rationale._


---

## Checkpoint — project_and_users_confirmed

**Project:** NOZO CORE unifie Répertoire, CRM light, Projet Janus WORK/MONEY et Dashboard pour aligner l’exécution opérationnelle et la facturation. Différenciateurs clés: séparation stricte WORK/MONEY, alerte anti‑oubli à la clôture, formule « Reste à facturer = (Budget signé + ∑Extras) − ∑Factures ».

**Target Users:** Admin/Manager, Chef de projet, Créatif.



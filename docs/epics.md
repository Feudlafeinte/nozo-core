# NOZO CORE - Epic Breakdown

**Author:** Feud  
**Date:** 2025-11-26

---

## Overview

Découpage des exigences du PRD en épopées (epics) et stories actionnables. Focus sur valeur utilisateur, séquencement logique, et couverture de toutes les FR.

---

## Functional Requirements Inventory

- FR1…FR40 (référence: `docs/prd.md`)

---

## Proposed Epics (Summary)

1. Foundation & Project Setup (Greenfield)
2. CRM Opportunités & Conversion Projet
3. Gestion WORK (Listes/Tâches/Sous‑tâches)
4. Gestion MONEY (Budget, Extras, Factures)
5. Dashboard Rentabilité & Reste à facturer
6. RBAC & Sécurité Opérationnelle
7. Documents & Pièces jointes (Devis/Factures)
8. PWA & Mobile Installable

---

## FR Coverage Map (High-Level)

- Epic 1: fondation pour toutes les FR (setup)
- Epic 2: FR2–FR6
- Epic 3: FR7–FR11, FR36
- Epic 4: FR12–FR16, FR27–FR28, FR35
- Epic 5: FR17–FR18, FR21, FR33–FR34, FR40
- Epic 6: FR19–FR20
- Epic 7: FR22, FR26, FR35
- Epic 8: aspects mobiles (PWA) supportant l’usage (perf/UX), sans nouveau FR dédié

---

## Epic 1: Foundation & Project Setup

But: Préparer l’environnement, structure de dépôt, outillage, base RBAC, et pipeline pour livrer rapidement les epics suivants.

### Story 1.1: Initialiser le projet et le pipeline
As an Admin, I want a ready-to-deploy project skeleton, So that we can start delivering features safely.
Acceptance:
- Given un dépôt vide, When je lance le setup, Then la structure standard est créée (app, api, docs)
- And build/test/lint configurés; déploiement basique activable
Prerequisites: none
Tech Notes: conventions de code, CI minimale, secrets hors repo

### Story 1.2: Base RBAC technique (squelette)
As an Architect, I want role scaffolding, So that feature permissions can be enforced consistently.
Acceptance:
- Given rôles Admin/Manager, Chef de projet, Créatif, Then contrôles d’accès sont branchables par module
Prerequisites: 1.1
Tech Notes: middlewares/guards; pas de règles métier ici (Epic 6)

---

## Epic 2: CRM Opportunités & Conversion Projet

But: Gérer le pipeline d’opportunités et convertir en Projet pré‑rempli.

### Story 2.1: Créer une Opportunité liée à un Client (FR2, FR3)
User Story + BDD AC couvrant création, kanban, validation champs requis.

### Story 2.2: Joindre un PDF de devis (FR4)
AC: upload, validation type/poids, métadonnées, lien à l’opportunité.

### Story 2.3: Marquer « Gagnée » et convertir en Projet (FR5, FR6)
AC: pré‑remplissage Client, Budget, Devis signé; traçabilité.

Prerequisites: 1.1
Tech Notes: stockage documents, états pipeline

---

## Epic 3: Gestion WORK (Listes/Tâches/Sous‑tâches)

But: Structurer le travail opérationnel et ses statuts indépendants de MONEY.

### Story 3.1: Créer Listes/Tâches/Sous‑tâches (FR7–FR9)
### Story 3.2: Gérer statuts d’avancement (FR10)
### Story 3.3: Vues Liste/Kanban (FR11)

Prerequisites: 1.1
Tech Notes: pagination, rendu virtuel, filtres persistés

---

## Epic 4: Gestion MONEY (Budget, Extras, Factures)

But: Piloter Budget/Extras/Factures et calcul « Reste à facturer » avec blocage de clôture.

### Story 4.1: Définir/MAJ Budget signé (FR12)
### Story 4.2: Créer un Extra avec statut financier (FR13, FR27)
### Story 4.3: Créer Factures (acompte/solde) + PDF (FR14, FR28, FR35)
### Story 4.4: Calcul « Reste à facturer » (FR15)
### Story 4.5: Bloquer clôture si Extras à facturer (FR16)

Prerequisites: 2.3, 1.2
Tech Notes: invariants de calcul, cohérence MONEY vs WORK

---

## Epic 5: Dashboard Rentabilité & Reste à facturer

But: Synthèse de pilotage et filtres pour décision.

### Story 5.1: Vue Dashboard (FR17)
### Story 5.2: Filtres par client/projet/états (FR18)
### Story 5.3: Recherche globale (FR21)
### Story 5.4: États d’erreur/incohérences (FR33–FR34)
### Story 5.5: API interne synthèse (FR40)

Prerequisites: 3.x, 4.x
Tech Notes: endpoints synthèse, perf et cache

---

## Epic 6: RBAC & Sécurité Opérationnelle

But: Appliquer les droits et sécuriser les opérations clés.

### Story 6.1: Appliquer permissions par rôle (FR19–FR20)
### Story 6.2: Journalisation/Audit des événements critiques (FR23)

Prerequisites: 1.2
Tech Notes: matrices permissions, logs inviolables

---

## Epic 7: Documents & Pièces jointes (Devis/Factures)

But: Gérer documents et accès direct aux PDFs liés.

### Story 7.1: Export documents depuis un Projet (FR22)
### Story 7.2: Import PDF de devis/facture et liaison correcte (FR26)
### Story 7.3: Téléchargement direct des PDFs liés (FR35)

Prerequisites: 2.2, 4.3
Tech Notes: sécurité des assets, durées de lien

---

## Epic 8: PWA & Mobile Installable

But: Assurer installabilité, standalone, icônes, et fallback hors‑ligne.

### Story 8.1: Manifest & Install Prompt
AC: manifest.json complet; prompt install sur navigateurs compatibles.

### Story 8.2: Display mode standalone
AC: ouverture sans chrome du navigateur; back/intent corrects.

### Story 8.3: Icons & Apple Touch
AC: packs favicon/touch; affichage logo NOZO sur mobile.

### Story 8.4: Offline Fallback (MVP Light)
AC: page « Hors ligne » dédiée; routing fallback propre.

Prerequisites: 1.1
Tech Notes: service worker scope, cache statique minimal

---

## FR Coverage Matrix

- FR2–FR6 → Epic 2
- FR7–FR11, FR36 → Epic 3
- FR12–FR16, FR27–FR28, FR35 → Epic 4
- FR17–FR18, FR21, FR33–FR34, FR40 → Epic 5
- FR19–FR20 → Epic 6
- FR22, FR26, FR35 → Epic 7
- Epic 1 (fondation) supporte l’ensemble

---

## Summary

Épique breakdown prêt pour Architecture/UX détaillés si nécessaires. Stories verticales, séquences logiques, couverture FR complète.



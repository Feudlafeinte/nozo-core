# Product Brief: NOZO CORE

**Date:** 2025-11-26  
**Author:** Feud  
**Context:** Greenfield (BMad Method)

---

## Executive Summary

NOZO CORE est une application web end-to-end pour piloter l’activité de l’agence NOZO Studio. Elle agit comme un ERP moderne et agile unifiant 4 piliers: (1) Répertoire (B2B/B2C) pour centraliser les clients et contacts; (2) Opportunités (CRM light) pour transformer un lead en projet signé; (3) Projet Janus “WORK/MONEY” combinant gestion opérationnelle (listes/tâches/sous-tâches) et pilotage financier (budget, extras, facturation); (4) Dashboard & règles métier avec alerte anti-oubli et formule “Reste à facturer”. Objectif clé: aligner exécution et facturation avec indépendance totale entre l’avancement des tâches et le pilotage financier.

---

## Core Vision

### Problem Statement

Déconnexion entre réalisation des tâches et facturation: difficile de savoir si une tâche terminée a bien été facturée. Besoin de granularité fine (Projet > Tâches > Sous‑tâches) et d’un double statut Avancement (À faire / En cours / Fait) et Financier (À facturer / Facturé / Non facturable), tout en préservant l’indépendance vis‑à‑vis de la facturation.

### Problem Impact

- Risque de perte de revenus (tâches non facturées, extras oubliés)  
- Opacité sur la rentabilité par projet et par élément  
- Allongement du cycle administratif, erreurs de facturation, tensions de trésorerie

### Proposed Solution

1) Répertoire (Base Contacts)  
- B2B: Fiche société (ex: “LVMH”) avec N contacts (ex: “Julie”, “Marc”).  
- B2C: Fiche simple.  
- Référentiel unique alimentant CRM et Projets.

2) Opportunités (CRM light)  
- Vue Kanban: Nouveau lead → Prise de contact → Devis envoyé → Négociation → Gagné/Perdu.  
- Lien obligatoire à un Client du Répertoire.  
- Gestion documentaire: joindre le PDF de devis.  
- Évènement pivot “GAGNÉ” → bouton “Convertir en Projet” (création Projet pré-rempli: Client, Budget final, Devis signé).

3) Projet Janus (WORK/MONEY)  
- Face WORK (opérationnel): Listes > Tâches > Sous‑tâches; vues Liste/Kanban; avancement To‑Do strictement déconnecté de toute valeur financière (aucun prix, aucun lien facture).  
- Face MONEY (pilotage): Budget signé (baseline) depuis Opportunité; Extras (achats/ajouts) avec statut “À facturer” / “Facturé”; Factures (acompte/solde) et PDFs liés. La facturation se base sur le budget global et les extras, pas sur les tâches unitaires.

4) Dashboard & Règles métier  
- Formule maîtresse: Reste à facturer = (Budget signé + ∑Extras) − ∑Factures émises.  
- Alerte anti‑oubli: blocage de clôture du projet si des Extras sont encore “À facturer”.

### Key Differentiators

- Vision “Janus” WORK/MONEY: séparation nette et contractuelle entre avancement opérationnel et pilotage financier, néanmoins cohérentes au niveau projet.  
- Indépendance totale des tâches vis‑à‑vis de la facturation (aucun couplage tâche ↔ devis/facture).  
- Règles métiers explicites: alerte anti‑oubli, formule de reste à facturer, conversion “opportunité → projet”.

---

## Données & Modèle (Structure cible)

### Entités principales

- Client (B2B/B2C), Contact  
- Opportunité, Devis/Contrat (PDF signé), BudgetProjet (baseline)  
- Projet, Liste, Tâche, Sous‑tâche  
- Extra (ajouts/achats), Facture (acompte/solde) + PDFs  
- Document (stockage de pièces jointes)

### Principes d’architecture de données

- Aucune relation directe entre `Sous‑tâche` et des éléments de devis/facturation.  
- Le pilotage financier se fait uniquement via `BudgetProjet` (issu de l’Opportunité) + `Extras` + `Factures`.  
- Le domaine WORK n’expose aucune valeur monétaire; le domaine MONEY n’impose pas d’ordre aux statuts d’avancement.  
- La conversion Opportunité → Projet transporte Client, Budget, Devis signé (sans créer de liens aux tâches).  
- Intégrité documentaire: liens vers PDFs pour Devis/Factures.

---

## Target Users

### Primary Users

- Chefs de projet (pilotage production et coordination)  
- Créatifs (exécution tâches/sous‑tâches, visibilité charge)  
- Admin/Manager (pilotage finances, facturation, conformité)

### User Journey (synthèse)

Répertoire → Opportunité (Kanban) → “Gagné” → Conversion en Projet → WORK (listes/tâches/sous‑tâches) + MONEY (budget, extras, factures) → Dashboard (rentabilité, alertes).

---

## Success Metrics

### Business Objectives

- Visibilité continue de la rentabilité par projet  
- Réduction des oublis de facturation (notamment extras)  
- Alignement opérationnel/financier et réduction du temps de cycle administratif

### Key Performance Indicators

- Montant “Reste à facturer” exact par projet (écart cible ≈ 0)  
- Taux de facturation des Extras (détectés vs facturés)  
- Taux de projets bloqués (alerte anti‑oubli) ramené vers 0

---

## MVP Scope

### Core Features

- Répertoire: B2B (société + N contacts), B2C (fiche simple).  
- Opportunités: Kanban, lien client obligatoire, PDF devis, “Convertir en Projet”.  
- Projet WORK: Listes > Tâches > Sous‑tâches; vues Liste/Kanban; double statut d’avancement.  
- Projet MONEY: Budget signé (baseline); gestion des Extras (+ statut “À facturer/Facturé”); gestion des Factures (acompte/solde) + PDFs.  
- Dashboard: calcul “Reste à facturer” avec affichage clair; alerte anti‑oubli bloquante à la clôture si extras non facturés.  
- Rôles de base: Admin/Manager, Chef de projet, Créatif (droits adaptés).

### Out of Scope for MVP

- Passerelles de paiement, multi-devises, analytique avancée/BI, automatisations complexes, intégrations externes (compta/CRM tiers).

### MVP Success Criteria

- Conversion Opportunité→Projet fonctionnelle et pré-remplie.  
- Calcul juste “Reste à facturer” sur projets actifs.  
- Alerte anti‑oubli efficace (empêche clôture si extras “À facturer”).

### Future Vision

- Intégrations (comptabilité, CRM, stockage), automatisations (rappels, règles), analytics rentabilité multi‑dimensions.

---

## Technical Preferences

Application web moderne; RBAC simple pour les rôles; stockage de documents (PDF devis/factures); conception de schéma centrée entités (Client/Contact, Opportunité, Projet, Liste/Tâche/Sous‑tâche, Extra, Facture).

## Risks and Assumptions

- Discipline d’usage (marquage “À facturer/Facturé”).  
- Contrôle qualité des documents (PDFs) et liens.  
- Hypothèse: pas de besoins multi-devises au MVP.

---

## Supporting Materials

- Brainstorm (session 2025‑11‑26), spécification fournie par l’utilisateur.

---

_This Product Brief captures the vision and requirements for NOZO CORE._  
_It was created through collaborative discovery and reflects the unique needs of this Greenfield project._



# NOZO CORE - Product Requirements Document

**Author:** Feud
**Date:** 2025-11-26
**Version:** 1.0

---

## Executive Summary

NOZO CORE unifie Répertoire, CRM light, Projet Janus WORK/MONEY et Dashboard pour aligner l’exécution opérationnelle et la facturation. Objectif : offrir une visibilité continue de la rentabilité par projet et éliminer les oublis de facturation.

### What Makes This Special

- Séparation stricte WORK/MONEY (aucun couplage tâches ↔ facturation)
- Alerte anti‑oubli bloquant la clôture
- Formule maîtresse « Reste à facturer » : (Budget signé + ∑Extras) − ∑Factures

---

## Project Classification

**Technical Type:** web_app
**Domain:** general
**Complexity:** low

Projet Greenfield, application web interne pour l’agence ; usages back‑office avec rôles Admin/Manager, Chef de projet, Créatif.

<!-- Domain Context: non applicable (general/low) -->

---

## Success Criteria

Succès = alignement opérationnel/financier visible et actionnable.

- Visibilité fiable du « Reste à facturer » par projet et global
- Zéro oubli de facturation sur les « Extras »
- Conversion Opportunité → Projet fluide et sans pertes d’information
- Adoption interne par tous les rôles (Admin/Manager, Chef de projet, Créatif)
- Données documentaires (devis/factures) accessibles et intègres

### Business Metrics

- Écart « Reste à facturer » cible ≈ 0 par projet
- Taux de facturation des Extras (détectés → facturés) en hausse tendancielle
- Taux de projets bloqués (alerte anti‑oubli) → proche de 0
- Taux d’adoption par rôle (sessions hebdo actives)

---

## Product Scope

### MVP - Minimum Viable Product

- Répertoire: B2B (société + N contacts), B2C (fiche simple)
- Opportunités (CRM light): Kanban, lien client obligatoire, PDF devis, « Convertir en Projet »
- Projet WORK: Listes > Tâches > Sous‑tâches; vues Liste/Kanban; double statut d’avancement
- Projet MONEY: Budget signé (baseline); gestion des Extras (À facturer/Facturé); gestion des Factures (acompte/solde) + PDFs
- Dashboard: calcul « Reste à facturer » avec affichage clair; alerte anti‑oubli bloquante à la clôture si Extras non facturés
- RBAC de base: Admin/Manager, Chef de projet, Créatif

### Growth Features (Post-MVP)

- Intégrations externes (comptabilité, CRM, stockage)
- Automatisations (rappels, règles métier avancées)
- Analytics de rentabilité élargis (tendances, comparatifs)

### Vision (Future)

- Analytics multi‑dimensions (client, équipe, projet, période)
- Écosystème d’intégrations (connecteurs officiels)
- Automatisation proactive (alertes intelligentes, suggestions)

---

<!-- Domain-Specific Requirements: non applicable -->

---

<!-- Innovation & Novel Patterns: non applicable -->

---

## Web App Specific Requirements

Application web back‑office focalisée sur rapidité d’entrée, lisibilité et fiabilité.

### Browser Support (browser_matrix)
- Desktop: Chrome (N, N‑1), Firefox (ESR, N), Safari (N, N‑1), Edge (N, N‑1)
- Mobile: iOS Safari ≥ 16, Chrome Android ≥ 12
- Progressive enhancement; tests e2e ciblés sur Chrome stable + fumées multi‑navigateurs

### Responsive Design (responsive_design)
- Grille fluide; points de rupture: xs <480, sm 480‑768, md 768‑1024, lg 1024‑1440, xl >1440
- Cibles tactiles ≥ 44px; densité d’infos ajustée par viewport; tableaux scrollables
- Composants critiques testés aux seuils (formulaires, tableaux, kanban)

### Mobile Strategy (PWA)
- Installabilité: l’app doit proposer l’ajout à l’écran d’accueil; `manifest.json` correctement configuré (name/short_name, start_url, scope, theme_color, background_color).
- Display Mode: `display: standalone` pour une ouverture sans chrome navigateur, en plein écran.
- App Icon: fournir les assets d’icônes (Apple Touch Icon, favicons multi-tailles) afin que l’icône affichée sur mobile soit celle de NOZO.
- Offline (MVP Light): fournir au minimum une page « Hors ligne » dédiée quand le réseau est indisponible (fallback UX propre au lieu de l’écran d’erreur navigateur).

### Performance Targets (performance_targets)
- Perceptible: FCP < 1.8s, TTI < 2.5s (poste de milieu de gamme, réseau moyen)
- Interaction: opérations CRUD < 200ms côté UI perçu (optimisme contrôlé)
- Assets: lazy‑loading listes/kanban, pagination serveur, cache niveau données

### SEO Strategy (seo_strategy)
- Produit interne back‑office: SEO public non requis
- Métadonnées, favicons, lisibilité liens partagés (quand authentifié)

### Accessibility Level (accessibility_level)
- Objectif WCAG 2.1 AA
- Focus visible, navigation clavier complète, contrastes conformes
- Libellés et aides à la saisie explicites (erreurs in‑line)

<!-- API/Platform/Device/Tenant/Permissions subsections: à détailler en Architecture/UX si nécessaires -->

---

## User Experience Principles
Back‑office productif, rapide, sans ambiguïté :
- Priorité à la saisie efficace et à la validation fiable
- Séparation mentale claire WORK/MONEY à tous les écrans
- Hiérarchie visuelle forte, états systèmes explicites (y compris financiers)

### Key Interactions
1) Conversion « Opportunité → Projet » (pré‑remplissage: Client, Budget, Devis signé)
2) Gestion WORK: Listes → Tâches → Sous‑tâches; vues Liste/Kanban; double statut d’avancement
3) Gestion MONEY: création d’Extras (À facturer/Facturé), factures (acompte/solde) + PDFs
4) Calcul et affichage « Reste à facturer »
5) Blocage de clôture si Extras « À facturer » existent
6) Dashboard: filtres par client/projet/état et synthèse rentabilité

---

## Functional Requirements
FR1: Un Admin/Manager peut créer/modifier des Clients (B2B/B2C) et Contacts associés.
FR2: Un utilisateur peut créer une Opportunité liée à un Client obligatoire.
FR3: Un utilisateur peut gérer le pipeline d’Opportunités en vue Kanban.
FR4: Un utilisateur peut joindre un PDF de devis à une Opportunité.
FR5: Un utilisateur peut marquer une Opportunité « Gagnée ».
FR6: Un utilisateur peut convertir une Opportunité « Gagnée » en Projet pré‑rempli (Client, Budget, Devis signé).
FR7: Un utilisateur peut créer des Listes dans un Projet.
FR8: Un utilisateur peut créer des Tâches dans une Liste.
FR9: Un utilisateur peut créer des Sous‑tâches dans une Tâche.
FR10: Un utilisateur peut changer le statut d’avancement (À faire / En cours / Fait) indépendamment de toute valeur financière.
FR11: Un utilisateur peut visualiser et manipuler les Tâches/Sous‑tâches en vues Liste et Kanban.
FR12: Un Admin/Manager peut définir/mettre à jour le Budget signé d’un Projet.
FR13: Un utilisateur peut créer un Extra rattaché au Projet avec statut financier (À facturer / Facturé / Non facturable).
FR14: Un utilisateur peut créer des Factures (acompte/solde) et lier le PDF correspondant.
FR15: Le système calcule « Reste à facturer = (Budget signé + ∑Extras) − ∑Factures » et l’affiche au niveau Projet.
FR16: Le système empêche la clôture d’un Projet s’il existe des Extras « À facturer ».
FR17: Un utilisateur peut consulter un Dashboard synthétisant rentabilité et statuts critiques.
FR18: Un utilisateur peut filtrer le Dashboard par client, projet, statut d’avancement et financier.
FR19: Un Admin/Manager peut gérer les rôles (Admin/Manager, Chef de projet, Créatif).
FR20: Les autorisations restreignent les actions selon le rôle (lecture/écriture par domaine).
FR21: Un utilisateur peut rechercher Clients, Projets, Tâches par mots‑clés.
FR22: Un utilisateur peut exporter des documents liés (devis/factures) depuis un Projet.
FR23: Le système journalise les changements critiques (budget, extras, factures) pour audit.
FR24: Un utilisateur peut visualiser l’historique d’un Projet (événements clés).
FR25: Les formulaires valident les champs obligatoires et formats (emails, montants).
FR26: Un utilisateur peut importer un PDF de devis/facture et le relier à l’entité correcte.
FR27: Un utilisateur peut marquer un Extra « Facturé » et renseigner la facture associée.
FR28: Un utilisateur peut marquer une facture comme « émise » et visible dans le calcul.
FR29: Le système gère la pagination et le tri pour listes volumineuses.
FR30: Les vues conservent les filtres et tris préférés par utilisateur.
FR31: Un utilisateur peut dupliquer un Projet (sans transporter l’historique financier).
FR32: Un utilisateur peut archiver un Projet (lecture seule, calculs gelés).
FR33: Le système expose des états explicites en cas d’erreur de calcul ou données manquantes.
FR34: Le système notifie en UI les incohérences (ex: Extra « Facturé » sans facture liée).
FR35: Un utilisateur peut télécharger les PDFs liés directement depuis les vues Projet et Facture.
FR36: Le système maintient l’indépendance totale entre statuts d’avancement et financiers.
FR37: Un utilisateur peut configurer la devise/profil fiscal au niveau Projet (MVP: simple).
FR38: Un Admin/Manager peut gérer des tags ou catégories de Projet pour reporting.
FR39: Un utilisateur peut attacher des documents additionnels à un Projet (autres pièces).
FR40: Le système fournit une API interne pour récupérer la synthèse « Reste à facturer » par Projet.

---

## Non-Functional Requirements
### Performance
 - FCP < 1.8s, TTI < 2.5s (poste milieu de gamme, réseau moyen)
 - Opérations CRUD: latence perçue < 200ms côté UI (optimisme contrôlé)
 - Listes/kanban: pagination serveur, lazy‑loading, rendu virtuel pour grands volumes
 - Mise en cache au niveau données (client + serveur) et invalidation ciblée

### Security
 - RBAC de base (Admin/Manager, Chef de projet, Créatif) appliqué partout
 - Données sensibles en transit via TLS; stockage de documents (PDF) sécurisé
 - Journalisation des événements critiques (budget, extras, factures) et traçabilité
 - Protection contre injections XSS/CSRF; validation stricte des entrées

### Scalability
 - Conception orientée entités avec indexes sur clés de recherche usuelles
 - Dégradation gracieuse sur pics de charge (file d’insertions non bloquante)
 - Partitionnement logique par Projet/Client pour rapports
 - Budgets et calculs « Reste à facturer » dimensionnés jusqu’à 10k lignes/Projet

### Accessibility
 - Conformité WCAG 2.1 AA visée; navigation clavier complète, focus visible
 - Contrastes conformes; alternatives textuelles pour icônes/états
 - Messages d’erreur in‑line clairs et rapprochés du champ concerné

### Integration
 - API interne pour synthèse « Reste à facturer » par Projet
 - Points d’extension prévus pour connecteurs (compta, CRM, stockage)
 - Format d’échange standardisé (JSON), versionnement de l’API
 - Webhooks internes pour événements clés (extra créé, facture émise)

---

## PRD Summary

- 40 exigences fonctionnelles (FR1–FR40)
- 5 catégories d’exigences non‑fonctionnelles (Performance, Sécurité, Scalabilité, Accessibilité, Intégration)
- MVP cadré, différenciateurs clarifiés, blocs critiques MONEY/WORK séparés

---

## References

- Product Brief: `./bmm-product-brief-NOZO-CORE-2025-11-26.md`

---

_This PRD captures the essence of NOZO CORE - Aligner exécution et facturation avec une visibilité actionnable du « Reste à facturer ». _

_Created through collaborative discovery between Feud and AI facilitator._



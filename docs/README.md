# 📚 Documentation Projet APD

> Association Patrimoine de Doazit - Dossier Projet Complet TP DWWM

**Version** : 1.0  
**Date** : 19 Novembre 2025  
**Auteur** : Philippe Barbosa  
**Formation** : TP Développeur Web et Web Mobile

---

## 📖 Vue d'ensemble

Ce dossier contient la **documentation complète** du projet de site web pour l'Association Patrimoine de Doazit (APD). Cette documentation a été réalisée dans le cadre du **Titre Professionnel Développeur Web et Web Mobile** et couvre tous les aspects du projet, de la conception au déploiement.

---

## 🎯 Objectif du projet

Créer un site web moderne et performant pour valoriser le patrimoine de l'église Saint-Jean Baptiste d'Aulès, faciliter la collecte de dons, et promouvoir l'association auprès du public et des partenaires.

**Technologies principales** :

- **Frontend** : Next.js 15, React 19, Tailwind CSS, GSAP
- **Backend** : Strapi v5, Node.js, TypeScript
- **Database** : PostgreSQL 14+
- **CDN** : Cloudinary

---

## 📂 Structure de la documentation

### 1. [MODELE_DONNEES.md](./MODELE_DONNEES.md) 📊

**Modèle de données et schéma de base**

Contient :

- Diagramme ERD (Mermaid) avec 8 entités
- Dictionnaire de données complet
- Structure des tables PostgreSQL
- Relations et contraintes
- Recommandations d'index

**Compétence CCP2** : Créer une base de données

---

### 2. [CAHIER_DES_CHARGES.md](./CAHIER_DES_CHARGES.md) 📋

**Spécifications fonctionnelles et techniques**

Contient :

- Contexte et objectifs du projet
- Périmètre fonctionnel (Frontend + Backend)
- Spécifications techniques (stack, architecture)
- Spécifications design (charte graphique, animations)
- Contraintes (techniques, sécurité, RGPD)
- Planning et budget

**Compétence CCP1/CCP2** : Maquetter une application, élaborer cahier des charges

---

### 3. [USER_STORIES.md](./USER_STORIES.md) 📖

**Récits utilisateurs (27 user stories)**

Contient :

- 7 Epics (Découverte, Navigation, Engagement, Administration, UX, SEO, Maintenance)
- User stories avec critères d'acceptation
- Priorités (P0, P1, P2)
- Estimations (XS, S, M, L, XL)
- Statuts (✅ Terminé, 🚧 En cours, 📋 À faire)
- Mapping CCP1/CCP2

**Compétence CCP1/CCP2** : Analyse fonctionnelle, gestion projet Agile

---

### 4. [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) 🔌

**Documentation API REST complète**

Contient :

- Endpoints Strapi (7 content-types)
- Endpoint email personnalisé
- Exemples de requêtes/réponses (JSON)
- Codes d'erreur HTTP
- Exemples d'utilisation (JavaScript, Next.js)
- Rate limiting et sécurité
- Variables d'environnement

**Compétence CCP2** : Développer la partie back-end d'une application web

---

### 5. [PLAN_TESTS.md](./PLAN_TESTS.md) ✅

**Plan de tests fonctionnels et techniques**

Contient :

- 99 cas de test (98 réussis)
- Tests fonctionnels frontend (42 tests)
- Tests API backend (18 tests)
- Tests de performance (Lighthouse)
- Tests d'accessibilité (WCAG AA)
- Tests de sécurité (XSS, SQL injection)
- Tests de compatibilité (navigateurs, devices)

**Compétence CCP1/CCP2** : Validation et tests, assurance qualité

---

### 6. [../scripts/database.sql](../scripts/database.sql) 🗄️

**Scripts SQL PostgreSQL**

Contient :

- Création de base de données
- Création de toutes les tables (8 tables)
- Tables de liaison (relations many-to-many)
- Données initiales (seed)
- Vues SQL (articles publiés, statistiques)
- Fonctions utilitaires (clean_old_drafts, generate_slug)
- Triggers (update_updated_at)
- Commandes backup/restore

**Compétence CCP2** : Créer une base de données, requêtes SQL

---

### 7. [ARCHITECTURE.md](./ARCHITECTURE.md) 🏛️

**Architecture technique et diagrammes**

Contient :

- Architecture système (Jamstack)
- Diagrammes Mermaid :
  - Diagramme de déploiement
  - Architecture applicative (Frontend/Backend)
  - Diagrammes de séquence (3)
  - Diagramme de composants
- Stack technique détaillée
- Flux de données (Read/Write/Email)
- Sécurité et stratégie de déploiement

**Compétence CCP1/CCP2** : Concevoir architecture, documenter solutions techniques

---

### 8. [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) 🎨

**Système de design et guidelines UI/UX**

Contient :

- Identité visuelle (concept, moodboard)
- Palette couleurs (primaires, secondaires, contraste WCAG)
- Typographie (Garamond, échelle modulaire)
- Espacements (système 4px)
- Composants UI (boutons, cards, modals, formulaires)
- Animations GSAP + CSS
- Responsive design (breakpoints Tailwind)
- Accessibilité (WCAG AA checklist)

**Compétence CCP1** : Maquetter une application, réaliser interface utilisateur

---

## 🎓 Mapping Compétences TP DWWM

### CCP1 - Développer la partie front-end d'une application web

| Compétence                                                                     | Fichiers                                     | Statut |
| ------------------------------------------------------------------------------ | -------------------------------------------- | ------ |
| **Maquetter une application**                                                  | DESIGN_SYSTEM.md, CAHIER_DES_CHARGES.md      | ✅     |
| **Réaliser une interface utilisateur web statique et adaptable**               | DESIGN_SYSTEM.md, PLAN_TESTS.md (responsive) | ✅     |
| **Développer une interface utilisateur web dynamique**                         | USER_STORIES.md, ARCHITECTURE.md             | ✅     |
| **Réaliser une interface utilisateur avec une solution de gestion de contenu** | API_DOCUMENTATION.md, MODELE_DONNEES.md      | ✅     |

### CCP2 - Développer la partie back-end d'une application web

| Compétence                                                                                | Fichiers                                             | Statut |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------ |
| **Créer une base de données**                                                             | MODELE_DONNEES.md, database.sql                      | ✅     |
| **Développer les composants d'accès aux données**                                         | database.sql (vues, fonctions), API_DOCUMENTATION.md | ✅     |
| **Développer la partie back-end d'une application web**                                   | API_DOCUMENTATION.md, ARCHITECTURE.md                | ✅     |
| **Élaborer et mettre en œuvre des composants dans une application de gestion de contenu** | MODELE_DONNEES.md, API_DOCUMENTATION.md              | ✅     |

---

## 📊 Statistiques du projet

### Développement

- **Durée** : 8 semaines
- **Lignes de code** : ~15 000 (frontend + backend)
- **Composants React** : 16
- **Endpoints API** : 8
- **Tables database** : 8 + 11 tables de liaison
- **Tests réalisés** : 99 (98 passants)

### Documentation

- **Fichiers documentation** : 8
- **Pages totales** : ~100 pages (estimation)
- **Diagrammes** : 12 diagrammes Mermaid
- **User stories** : 27
- **Cas de test** : 99

---

## 🚀 Utilisation de la documentation

### Pour le jury TP DWWM

Cette documentation démontre :

1. **Analyse fonctionnelle** : Cahier des charges, User stories
2. **Conception technique** : Modèle de données, Architecture
3. **Développement frontend** : Design System, User stories (US-001 à US-013)
4. **Développement backend** : API Documentation, Scripts SQL
5. **Tests et validation** : Plan de tests complet
6. **Documentation** : 8 fichiers structurés et complets

### Pour les développeurs

Chaque fichier peut être consulté indépendamment selon le besoin :

- **Backend dev** → MODELE_DONNEES.md, API_DOCUMENTATION.md, database.sql
- **Frontend dev** → DESIGN_SYSTEM.md, USER_STORIES.md, ARCHITECTURE.md
- **QA/Testeur** → PLAN_TESTS.md
- **Chef de projet** → CAHIER_DES_CHARGES.md, USER_STORIES.md

---

## 🔍 Comment naviguer dans cette documentation

### Par rôle

**Développeur Frontend** :

1. Lire [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) pour les guidelines UI
2. Consulter [USER_STORIES.md](./USER_STORIES.md) pour les fonctionnalités
3. Vérifier [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) pour les endpoints

**Développeur Backend** :

1. Lire [MODELE_DONNEES.md](./MODELE_DONNEES.md) pour le schéma database
2. Exécuter [database.sql](../scripts/database.sql) pour créer la base
3. Consulter [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) pour les routes

**Chef de Projet** :

1. Lire [CAHIER_DES_CHARGES.md](./CAHIER_DES_CHARGES.md) pour le scope
2. Suivre [USER_STORIES.md](./USER_STORIES.md) pour le backlog
3. Consulter [PLAN_TESTS.md](./PLAN_TESTS.md) pour l'état d'avancement

**Architecte** :

1. Lire [ARCHITECTURE.md](./ARCHITECTURE.md) pour la vision globale
2. Vérifier [MODELE_DONNEES.md](./MODELE_DONNEES.md) pour les relations
3. Consulter [CAHIER_DES_CHARGES.md](./CAHIER_DES_CHARGES.md) pour les contraintes

---

### Par phase de projet

**Phase 1 : Conception**

- CAHIER_DES_CHARGES.md
- USER_STORIES.md
- MODELE_DONNEES.md
- DESIGN_SYSTEM.md

**Phase 2 : Développement**

- API_DOCUMENTATION.md
- database.sql
- ARCHITECTURE.md

**Phase 3 : Tests et Validation**

- PLAN_TESTS.md

---

## 📦 Fichiers annexes

### Wireframes

- [WIREFRAMES.md](../WIREFRAMES.md) : Wireframes ASCII de toutes les pages

### Configuration

- `.env.example` : Variables d'environnement
- `package.json` : Dependencies
- `README.md` : Guide d'installation (racine du projet)

---

## 🛠️ Outils utilisés pour la documentation

| Outil          | Usage                                  |
| -------------- | -------------------------------------- |
| **Markdown**   | Rédaction de tous les documents        |
| **Mermaid**    | Diagrammes (ERD, séquence, composants) |
| **VS Code**    | Éditeur de texte                       |
| **GitHub**     | Versioning de la documentation         |
| **Lighthouse** | Tests performance                      |
| **Postman**    | Tests API                              |

---

## ✅ Checklist complétude documentation

### Obligatoire (TP DWWM)

- [x] **Cahier des charges** : Spécifications fonctionnelles et techniques
- [x] **Modèle de données** : Schéma de base de données
- [x] **User stories** : Récits utilisateurs avec critères d'acceptation
- [x] **Documentation technique** : Architecture, API, Design System
- [x] **Plan de tests** : Cas de test et résultats
- [x] **Scripts SQL** : Création base et seed data

### Optionnel (Bonus)

- [x] **Wireframes** : Maquettes ASCII
- [x] **Diagrammes UML** : Séquence, composants, déploiement
- [x] **Documentation API** : Endpoints avec exemples
- [x] **Design System** : Guidelines UI/UX complètes

---

## 📞 Contact

**Développeur** : Philippe Barbosa  
**Email** : philippe.barbosa@example.com  
**GitHub** : [github.com/philippe-barbosa](https://github.com)  
**LinkedIn** : [linkedin.com/in/philippe-barbosa](https://linkedin.com)

**Formation** : TP Développeur Web et Web Mobile  
**Organisme** : [Nom organisme]  
**Session** : 2025

---

## 📄 Licence

Ce projet est réalisé dans un cadre pédagogique pour le Titre Professionnel DWWM.  
**Client** : Association Patrimoine de Doazit (APD)

---

## 🔄 Mises à jour

| Date       | Version | Changements                                  |
| ---------- | ------- | -------------------------------------------- |
| 19/11/2025 | 1.0     | Création documentation complète (8 fichiers) |

---

**Dernière mise à jour** : 19 Novembre 2025  
**Statut** : ✅ Documentation complète et validée

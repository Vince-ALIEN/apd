---
title: "Projet APD - Site Web Association Patrimoine de Doazit"
author: "Philippe Barbosa"
date: "20 Novembre 2025"
subtitle: "TP Développeur Web et Web Mobile"
---

# Projet APD

## Site Web - Association Patrimoine de Doazit

**Présenté par** : Philippe Barbosa  
**Formation** : TP Développeur Web et Web Mobile  
**Date** : 20 Novembre 2025

---

# Sommaire

1. Contexte du projet
2. Objectifs et enjeux
3. Technologies utilisées
4. Architecture technique
5. Fonctionnalités développées
6. Démonstration
7. Résultats et perspectives
8. Compétences acquises

---

# 1. Contexte du Projet

---

## L'Association Patrimoine de Doazit

### Présentation

- Association locale créée pour **préserver le patrimoine religieux**
- Focus : Église Saint-Jean Baptiste d'Aulès (XIIe siècle)
- Objectif : Collecte de dons pour restauration

### Problématique initiale

- ❌ Pas de présence digitale
- ❌ Difficulté à toucher les donateurs
- ❌ Pas de vitrine pour les partenaires

---

## Solution apportée

### Création d'un site web moderne

- ✅ Présentation du patrimoine
- ✅ Facilitation des dons (bouton CTA)
- ✅ Espace blog et actualités
- ✅ Page partenaires avec formulaire contact

### Durée du projet

**8 semaines** (Octobre - Novembre 2025)

---

## Analyse des besoins

### Utilisateurs cibles

| Type            | Besoins                 | Fonctionnalités                    |
| --------------- | ----------------------- | ---------------------------------- |
| Visiteurs       | Découvrir le patrimoine | Galerie photos, articles, vidéos   |
| Donateurs       | Faire un don facilement | Bouton CTA visible, lien HelloAsso |
| Partenaires     | Proposer un partenariat | Formulaire de contact              |
| Administrateurs | Gérer le contenu        | Panel admin Strapi                 |

---

# 2. Objectifs et Enjeux

---

## Objectifs du projet

### Objectifs principaux

1. **Valoriser le patrimoine** : Présenter l'église et son histoire
2. **Faciliter les dons** : Bouton "Faire un don" visible et persistant
3. **Attirer des partenaires** : Page dédiée + formulaire de contact
4. **Créer une communauté** : Blog avec articles et actualités

### Objectifs techniques

- Performance : Lighthouse > 85
- Responsive : Mobile, Tablet, Desktop
- SEO optimisé : Meta tags, sitemap
- Accessibilité : WCAG AA

---

## Enjeux pour le TP DWWM

### CCP1 - Développement Frontend

- ✅ Maquetter une application
- ✅ Interface statique et adaptable (Responsive)
- ✅ Interface dynamique (React, animations)
- ✅ Intégration CMS (Strapi)

### CCP2 - Développement Backend

- ✅ Créer une base de données (PostgreSQL)
- ✅ Développer composants d'accès aux données
- ✅ Développer API REST (Strapi)
- ✅ Mettre en œuvre CMS

---

# 3. Technologies Utilisées

---

## Stack Technique

### Frontend

- **Next.js 15.5.3** - Framework React
- **React 19.1.0** - UI Library
- **Tailwind CSS 4** - Styling
- **GSAP 3.13.0** - Animations
- **Lucide React** - Icônes

### Backend

- **Strapi v5.30.0** - Headless CMS
- **Node.js 20.19.5** - Runtime
- **TypeScript 5.x** - Langage backend
- **PostgreSQL 14+** - Base de données
- **Nodemailer** - Envoi emails

---

## Hébergement et Services

### Hébergement

- **Vercel** - Frontend (gratuit)
- **Railway** - Backend ($5-20/mois)
- **Cloudinary** - CDN médias (gratuit)

### Outils de développement

- **Git/GitHub** - Versioning
- **VS Code** - Éditeur
- **Postman** - Tests API
- **Lighthouse** - Tests performance

---

## Architecture Jamstack

### Schéma simplifié

```
UTILISATEUR
    |
    | HTTPS
    |
    +---------+----------+
    |                    |
FRONTEND            BACKEND
Next.js             Strapi
(Vercel)          (Railway)
    |                    |
    |              PostgreSQL
    |
Cloudinary CDN
```

**Principe** : Découplage frontend/backend via API REST

---

# 4. Architecture Technique

---

## Structure du Projet

### Frontend (Next.js)

```
frontend/src/
├── app/
│   ├── page.jsx          # Page d'accueil
│   ├── blog/
│   │   ├── page.jsx      # Liste articles
│   │   └── [slug]/       # Article détaillé
│   ├── association/      # Page association
│   └── partners/         # Page partenaires
├── components/           # 16 composants
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Gallery.jsx
│   ├── ContactModal.jsx
│   └── ...
├── contexts/
└── hooks/
```

---

## Structure Backend

### Strapi

```
src/api/
├── eglise/              # Single Type
├── article/             # Collection
├── interview/           # Collection
├── partenaire/          # Collection
├── association/         # Single Type
├── parametres-site/     # Single Type
├── accueil/             # Single Type
└── email/               # Custom endpoint
```

**7 content-types** + 1 endpoint personnalisé (email)

---

## Modèle de Données

### 8 Entités principales

1. **EGLISE** (Single Type) - Informations église
2. **ARTICLE** (Collection) - Articles de blog
3. **INTERVIEW** (Collection) - Vidéos interviews
4. **PARTENAIRE** (Collection) - Logos partenaires
5. **ASSOCIATION** (Single Type) - Présentation
6. **ACCUEIL** (Single Type) - Données page accueil
7. **PARAMETRES_SITE** (Single Type) - Config globale
8. **LOCALISATION** (Component) - Adresses

**Base de données** : PostgreSQL avec 8 tables + 11 tables de liaison

---

## Relations principales

- EGLISE ↔ LOCALISATION (1-N)
- EGLISE ↔ FILES (images) (1-N)
- ARTICLE ↔ FILE (image) (1-1)
- INTERVIEW ↔ FILE (video) (1-1)
- PARTENAIRE ↔ FILES (logos) (1-N)
- PARAMETRES_SITE ↔ LOCALISATION (1-N)
- PARAMETRES_SITE ↔ FILES (logos) (1-N)

---

# 5. Fonctionnalités Développées

---

## Fonctionnalités Frontend - Page Accueil

### Sections développées

1. **Vidéo de fond** full-screen (autoplay, loop)
2. **Titre animé** avec "reveal box" (GSAP)
3. **Description église** avec image
4. **Galerie de 9 photos** avec scroll horizontal (desktop)
5. **Section architecture** avec plan zoomable
6. **Interview vidéo** avec player HTML5
7. **4 derniers articles** du blog
8. **Carousel partenaires** auto-scroll
9. **Bouton "Faire un don"** persistant après scroll

---

## Blog et Articles

### Page Blog (/blog)

- Liste de tous les articles publiés
- Tri par date décroissante
- Vignettes avec : image, titre, date, auteur, extrait
- Responsive (grille adaptative)

### Page Article (/blog/[slug])

- Image full-width en en-tête
- Contenu rich text (Blocks API Strapi)
- Lettrine sur premier paragraphe
- Metadata (auteur, date)
- SEO optimisé (generateMetadata)
- Bouton retour vers liste articles

---

## Pages Association et Partenaires

### Page Association (/association)

- Présentation de l'association
- Mission et objectifs (liste)
- 2 boutons CTA (Faire un don + Devenir partenaire)

### Page Partenaires (/partners)

- Texte incitatif
- Liste des partenaires avec logos cliquables
- **Formulaire de contact modal** :
  - Champs : Nom, Email, Téléphone, Sujet, Message
  - Validation côté client (regex email)
  - Envoi via API email (Nodemailer)
  - Messages succès/erreur

---

## Design et Animations

### Animations GSAP développées

1. **Galerie photos** : Apparition progressive au scroll (stagger 0.1s)
2. **Reveal box** : Animation width + position sur titre intro
3. **Plan architectural** : Zoom de scale(0.3) à scale(1)
4. **Carousel partenaires** : Auto-scroll fluide (requestAnimationFrame)

### Responsive Design

- **Mobile** (< 640px) : Menu hamburger, galerie grille 2 cols
- **Tablet** (640-1024px) : Navigation inline, galerie grille 3 cols
- **Desktop** (> 1024px) : Layout absolu galerie, scroll horizontal

---

## Composants développés

### 16 composants React

1. Header (navigation + menu mobile)
2. Footer (3 colonnes : logo, nav, contact)
3. VideoBackground
4. IntroSection (hero avec reveal box)
5. DescriptionSection
6. Gallery (9 images + fullscreen viewer)
7. Architecture (texte + plan)
8. Interview (player vidéo)
9. BlogSection (4 derniers articles)
10. PartnerSection (carousel)
11. ContactModal (formulaire)
12. DonationButton
13. ErrorMessage
14. ScrollIndicator
15. HeaderWrapper
16. AddressSection

---

## Fonctionnalités Backend

### Panel Admin Strapi

- Authentification JWT
- Gestion de contenu (7 content-types)
- Upload médias vers Cloudinary
- Éditeur rich text (Blocks API)
- Publication/Dépublication
- Génération automatique de slugs (articles)

### API REST

- **7 endpoints auto-générés** (CRUD)
- **1 endpoint custom** : `/api/email/send`
- CORS configuré (origines autorisées)
- Rate limiting (5 requêtes/heure sur email)
- Validation des données (Yup schemas)

---

# 6. Démonstration

---

## Page d'Accueil

### Sections visibles

- Vidéo de fond en autoplay
- Titre "Église Saint-Jean Baptiste d'Aulès" avec animation reveal
- Section description avec image de l'église
- Galerie de 9 photos (scroll horizontal desktop)
- Plan architectural avec zoom au scroll
- Interview vidéo
- 4 derniers articles
- Carousel partenaires
- Footer 3 colonnes

---

## Page Blog

### Fonctionnalités

- Grille d'articles responsive
- Chaque card contient :
  - Image optimisée (Next.js Image)
  - Titre de l'article
  - Date de publication
  - Nom de l'auteur
  - Extrait (premiers mots du contenu)
- Tri automatique par date décroissante
- Clic sur card → redirection vers article détaillé

---

## Page Article Détaillé

### Éléments affichés

- Image principale en full-width
- Titre H1
- Metadata : Date et auteur
- Contenu rich text avec :
  - Paragraphes
  - Titres H2, H3
  - Listes (ordonnées, non-ordonnées)
  - Images inline
  - Lettrine (première lettre agrandie)
- Bouton "Retour aux articles"

---

## Formulaire Contact

### Flux utilisateur

1. Clic sur "Devenir partenaire" (page Partners)
2. Ouverture modal
3. Remplissage du formulaire (5 champs)
4. Validation côté client (email valide, champs requis)
5. Submit → POST `/api/email/send`
6. Email envoyé via Nodemailer (SMTP Gmail)
7. Message de succès affiché
8. Fermeture automatique de la modal

### Gestion erreurs

- Champs vides → Message d'erreur
- Email invalide → "Email invalide"
- Erreur serveur → "Erreur lors de l'envoi"

---

## Panel Admin Strapi

### Actions possibles

- Login avec email + password (JWT)
- Créer un nouvel article :
  - Titre, contenu (rich text)
  - Upload image
  - Auteur, date de publication
  - Génération automatique du slug
- Modifier les paramètres du site :
  - Logos (header, footer)
  - Réseaux sociaux (JSON)
  - URL de don
  - Localisation
- Ajouter un partenaire (logo + URL)
- Uploader des images église (galerie)

---

# 7. Résultats et Perspectives

---

## Résultats Obtenus

### Performance Lighthouse

| Critère        | Desktop | Mobile | Objectif |
| -------------- | ------- | ------ | -------- |
| Performance    | 92      | 78     | > 85     |
| Accessibility  | 88-92   | 88-92  | > 85     |
| Best Practices | 100     | 100    | > 90     |
| SEO            | 100     | 100    | > 90     |

**Note** : Performance mobile à améliorer (compression vidéo)

---

## Tests Réalisés

### Statistiques

- **99 cas de test** réalisés
- **98 réussis** (99% de succès)
- **1 amélioration mineure** (compression vidéo mobile)

### Types de tests

- Tests fonctionnels frontend (42 tests)
- Tests API backend (18 tests)
- Tests de performance (8 tests)
- Tests d'accessibilité (9 tests)
- Tests de sécurité (6 tests)
- Tests de compatibilité (16 tests)

---

## Objectifs Atteints

### Fonctionnels

- ✅ Toutes les pages accessibles et fonctionnelles
- ✅ Formulaire de contact opérationnel (emails envoyés)
- ✅ Galerie responsive sur tous devices
- ✅ Animations fluides (60fps)
- ✅ SEO optimisé (meta tags, sitemap)

### Techniques

- ✅ Score Lighthouse > 85 (desktop)
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Compatible navigateurs modernes
- ✅ API sécurisée (CORS, JWT, validation)
- ✅ Base de données optimisée (index)

---

## Perspectives d'Évolution

### Court terme (1-3 mois)

- Compresser vidéo de fond (améliorer perf mobile)
- Ajouter monitoring (Sentry pour erreurs)
- Analytics (Plausible ou Google Analytics)
- Backups automatiques PostgreSQL

### Moyen terme (3-6 mois)

- Système de commentaires sur articles
- Newsletter (Mailchimp/Sendinblue)
- Événements à venir (nouveau content-type)
- Galerie filtrable par années

---

### Long terme (6-12 mois)

- Progressive Web App (PWA)
- Mode hors-ligne (Service Workers)
- Multilingue (i18n - Français/Anglais)
- Dashboard analytics pour admin

### Améliorations techniques

- Migration vers Bun.js (runtime plus rapide)
- Ajout cache Redis
- WebSockets pour notifications temps réel
- Tests E2E automatisés (Playwright)

---

# 8. Compétences Acquises

---

## Compétences Techniques - Frontend

### Frameworks et bibliothèques

- ✅ **Next.js 15** (App Router, SSR/SSG, Image optimization)
- ✅ **React 19** (Hooks, Context API, Server Components)
- ✅ **Tailwind CSS** (Utility-first, responsive design)
- ✅ **GSAP** (Timeline, ScrollTrigger, animations complexes)

### Bonnes pratiques

- ✅ Responsive Design (Mobile-first)
- ✅ Optimisation images (WebP, lazy load)
- ✅ Accessibilité (WCAG AA, contraste, alt text)
- ✅ SEO (meta tags, generateMetadata, sitemap)

---

## Compétences Techniques - Backend

### Technologies

- ✅ **Strapi v5** (Headless CMS, Content-Types, Blocks API)
- ✅ **TypeScript** (Type safety, interfaces, types)
- ✅ **PostgreSQL** (Relations, JSONB, index, vues)
- ✅ **API REST** (CRUD, endpoints personnalisés)
- ✅ **Nodemailer** (SMTP, envoi emails)

### Architecture

- ✅ MVC pattern (Controllers, Services, Models)
- ✅ ORM (Knex.js, requêtes optimisées)
- ✅ Sécurité (CORS, JWT, validation, sanitization)
- ✅ Upload médias (Cloudinary, CDN)

---

## Compétences DevOps

### Déploiement et outils

- ✅ **Git/GitHub** (Versioning, commits, branches)
- ✅ **Vercel** (Déploiement frontend automatique)
- ✅ **Railway** (Déploiement backend + PostgreSQL)
- ✅ **Cloudinary** (CDN, optimisation médias)

### Tests et qualité

- ✅ Tests manuels (99 cas de test)
- ✅ Lighthouse (Performance, SEO)
- ✅ Postman (Tests API)
- ✅ WAVE (Accessibilité)

---

## Compétences Méthodologiques

### Gestion de projet

- ✅ **Agile/Scrum** (User stories, sprints, backlog)
- ✅ **Priorisation** (P0, P1, P2)
- ✅ **Planification** (8 semaines, 5 phases)
- ✅ **Suivi** (Todo list, statuts)

### Documentation

- ✅ **8 fichiers** de documentation (100+ pages)
- ✅ Cahier des charges complet
- ✅ 27 User stories avec critères d'acceptation
- ✅ Diagrammes (ERD, séquence, architecture)
- ✅ Plan de tests détaillé
- ✅ Documentation API (endpoints, exemples)

---

## Soft Skills Développées

### Organisation et autonomie

- Gestion de projet sur 8 semaines en autonomie
- Respect des deadlines
- Priorisation des tâches critiques

### Communication

- Rédaction de documentation technique claire
- Présentation au client (association)
- Échanges avec formateurs

### Résolution de problèmes

- Debugging (React, Strapi, PostgreSQL)
- Optimisation performance (Lighthouse)
- Gestion des erreurs (try/catch, validation)
- Recherche de solutions (documentation, Stack Overflow)

---

# 9. Conclusion

---

## Bilan du Projet

### Réussites

- ✅ **100% des fonctionnalités critiques** développées
- ✅ **99% de tests réussis** (98/99)
- ✅ **Performance excellente** (Lighthouse > 85 desktop)
- ✅ **Documentation complète** (8 fichiers, 100 pages)
- ✅ **Compétences CCP1 + CCP2** validées

### Difficultés rencontrées et solutions

- ⚠️ Performance mobile (vidéo lourde) → Solution : compression en cours
- ⚠️ Strapi v5 (nouvelle version) → Documentation officielle + forums
- ⚠️ GSAP ScrollTrigger (courbe d'apprentissage) → Tutoriels online

---

## Apports personnels

### Sur le plan technique

- Maîtrise complète de Next.js 15 (App Router)
- Découverte de Strapi v5 (Headless CMS)
- Approfondissement PostgreSQL (relations complexes)
- Expertise animations GSAP (ScrollTrigger)

### Sur le plan professionnel

- Capacité à gérer un projet complet de A à Z
- Autonomie dans la recherche de solutions
- Documentation rigoureuse
- Vision globale (frontend + backend + déploiement)

---

## Remerciements

- **Association Patrimoine de Doazit** pour la confiance accordée
- **Formateurs TP DWWM** pour l'accompagnement et les conseils
- **Communauté open-source** (Next.js, Strapi, GSAP, Tailwind)
- **Ressources en ligne** (Documentation, Stack Overflow, YouTube)

---

# Questions ?

**Philippe Barbosa**  
Développeur Web et Web Mobile

📧 Email : philippe.barbosa@example.com  
🔗 GitHub : github.com/Vince-ALIEN/apd  
💼 LinkedIn : linkedin.com/in/philippe-barbosa

**Merci de votre attention !**

---

# Annexes

---

## Statistiques du Projet

### Code développé

- **Lignes de code** : ~15 000 (frontend + backend)
- **Composants React** : 16
- **Pages Next.js** : 5 principales
- **Endpoints API** : 8 (7 auto + 1 custom)

### Base de données

- **Tables** : 8 principales + 11 tables de liaison
- **Content-Types Strapi** : 7
- **Champs total** : ~60
- **Index** : 12 index optimisés

---

## Documentation Complète

### Fichiers créés (8 fichiers, ~100 pages)

1. **MODELE_DONNEES.md** - Schéma base de données + ERD
2. **CAHIER_DES_CHARGES.md** - Spécifications complètes
3. **USER_STORIES.md** - 27 user stories détaillées
4. **API_DOCUMENTATION.md** - Documentation API REST
5. **PLAN_TESTS.md** - 99 cas de test
6. **database.sql** - Scripts SQL (création + seed)
7. **ARCHITECTURE.md** - Diagrammes + flux
8. **DESIGN_SYSTEM.md** - Guidelines UI/UX

### Diagrammes

- 12 diagrammes Mermaid (ERD, séquence, composants)

---

## Technologies - Récapitulatif

### Frontend

- Next.js 15.5.3, React 19.1.0, Tailwind CSS 4
- GSAP 3.13.0, Lucide React

### Backend

- Strapi v5.30.0, Node.js 20.19.5, TypeScript 5.x
- PostgreSQL 14+, Nodemailer 7.0.9

### Services

- Vercel (frontend), Railway (backend)
- Cloudinary (CDN médias)
- Gmail SMTP (emails)

### Outils

- Git/GitHub, VS Code, Postman, Lighthouse

---

## Liens Utiles

### Documentation projet

- Cahier des charges
- User Stories
- Architecture
- Design System
- API Documentation
- Plan de tests

### Technologies

- Next.js : nextjs.org
- Strapi : strapi.io
- Tailwind CSS : tailwindcss.com
- GSAP : gsap.com

---

# Fin de la Présentation

**Projet APD - Association Patrimoine de Doazit**

Développé par **Philippe Barbosa**  
TP Développeur Web et Web Mobile - 2025

**Valorisons notre patrimoine ensemble**

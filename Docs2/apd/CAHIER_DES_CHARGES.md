# 📋 Cahier des Charges - Site Web APD

> Association Patrimoine de Doazit - Projet de valorisation du patrimoine religieux

**Version** : 1.0  
**Date** : 19 Novembre 2025  
**Auteur** : Philippe Barbosa  
**Client** : Association Patrimoine de Doazit

---

## 1. PRÉSENTATION DU PROJET

### 1.1 Contexte

L'Association Patrimoine de Doazit souhaite valoriser et préserver l'église Saint-Jean Baptiste d'Aulès, édifice historique remarquable du patrimoine local. Le projet vise à sensibiliser le public à l'importance de ce patrimoine et à faciliter la collecte de dons pour sa restauration.

### 1.2 Objectifs

**Objectifs principaux :**

- Présenter l'église et son patrimoine architectural
- Valoriser l'histoire locale à travers des articles et témoignages
- Faciliter les dons et le soutien à la restauration
- Créer une vitrine professionnelle pour l'association

**Objectifs secondaires :**

- Attirer de nouveaux partenaires
- Développer une communauté engagée
- Documenter les travaux de restauration

### 1.3 Cible

**Utilisateurs principaux :**

- Grand public intéressé par le patrimoine
- Donateurs potentiels (particuliers et entreprises)
- Touristes et visiteurs de la région
- Historiens et chercheurs

**Utilisateurs administrateurs :**

- Membres de l'association
- Gestionnaires de contenu

---

## 2. PÉRIMÈTRE FONCTIONNEL

### 2.1 Fonctionnalités Frontend (Visiteur)

#### 2.1.1 Page d'Accueil

- **Vidéo de fond** : Présentation immersive de l'église
- **Section Hero** : Titre animé avec effet "reveal box"
- **Description** : Présentation de l'église avec image et texte
- **Galerie photos** : 9 images avec animations au scroll (desktop)
- **Style architectural** : Texte + plan architectural
- **Interview vidéo** : Témoignages vidéo
- **Articles récents** : 4 derniers articles avec extraits
- **Partenaires** : Carousel automatique avec logos
- **CTA Don** : Bouton persistant pour faire un don

**Animations :**

- Scroll horizontal (desktop) avec pin GSAP
- Apparition progressive des éléments (GSAP ScrollTrigger)
- Reveal box sur titre principal
- Carousel auto-scroll avec pause au survol

#### 2.1.2 Page Articles (/blog)

- **Liste** : Affichage de tous les articles publiés
- **Filtres** : Tri par date (DESC)
- **Vignettes** : Image, titre, date, auteur, extrait
- **Pagination** : (si > 12 articles)

**Page Article détaillé (/blog/[slug]) :**

- Image principale full-width
- Contenu rich text avec lettrine
- Date et auteur
- Bouton "Retour aux articles"

#### 2.1.3 Page Association (/association)

- Présentation de l'association
- Mission et objectifs
- Équipe (si données disponibles)
- Boutons CTA (Don + Partenaire)

#### 2.1.4 Page Partenaires (/partners)

- Texte incitatif
- Formulaire de contact (modal)
- Liste des partenaires actuels

#### 2.1.5 Composants Globaux

- **Header** :
  - Logo
  - Navigation (Accueil, Association, Blog, Partenaires)
  - Bouton Don (visible après scroll)
  - Responsive avec menu hamburger mobile
- **Footer** :

  - Logo + description association
  - Navigation
  - Contact et localisation
  - Réseaux sociaux (icônes)
  - Copyright

- **Modal Contact** :
  - Formulaire : Nom, Email, Téléphone, Sujet, Message
  - Validation côté client
  - Envoi via API email

### 2.2 Fonctionnalités Backend (CMS Strapi)

#### 2.2.1 Gestion du Contenu

- **Église** (Single Type) :

  - Nom, description, histoire
  - Image principale + galerie
  - Style architectural + plan
  - Localisation (ville, région, pays)

- **Articles** (Collection) :

  - Titre, contenu (rich text), image
  - Auteur, date de publication
  - Slug auto-généré
  - Publication/Dépublication

- **Interviews** (Collection) :

  - Titre, description
  - Fichier vidéo

- **Partenaires** (Collection) :

  - Logo(s)
  - URL site web

- **Association** (Single Type) :

  - Titre, description, objectifs

- **Paramètres Site** (Single Type) :
  - Logos (header/footer)
  - Réseaux sociaux (JSON)
  - URL don
  - Mentions légales

#### 2.2.2 Gestion des Médias

- Upload vers Cloudinary (CDN)
- Génération automatique de formats (thumbnail, small, medium, large)
- Poids max : 10 Mo
- Formats acceptés : JPG, PNG, MP4, WEBP

#### 2.2.3 API REST

- Endpoints CRUD auto-générés
- Endpoint personnalisé : `/api/email/send`
- Authentification JWT pour l'admin
- CORS configuré pour Next.js

---

## 3. SPÉCIFICATIONS TECHNIQUES

### 3.1 Architecture

**Type** : Jamstack (Découplage frontend/backend)

```
Frontend (Next.js) ⟷ API REST ⟷ Backend (Strapi)
       ↓                              ↓
   Cloudinary                    PostgreSQL
```

### 3.2 Stack Technique

#### Backend

- **Runtime** : Node.js 20.19.5
- **Framework** : Strapi v5.30.0
- **Langage** : TypeScript 5.x
- **Base de données** : PostgreSQL 14+
- **CDN Médias** : Cloudinary
- **Email** : Nodemailer (SMTP Gmail) + Resend (backup)

#### Frontend

- **Framework** : Next.js 15.5.3 (App Router)
- **UI Library** : React 19.1.0
- **Langage** : JavaScript (JSX)
- **Styling** : Tailwind CSS 4
- **Animations** : GSAP 3.13.0 + ScrollTrigger
- **Icônes** : Lucide React
- **Cartes** : (si implémenté) Leaflet

### 3.3 Hébergement et Déploiement

**Recommandations :**

- **Frontend** : Vercel / Netlify / Cloudflare Pages
- **Backend** : Railway / Render / DigitalOcean
- **Base de données** : PostgreSQL managé (Railway, Supabase)
- **Médias** : Cloudinary (CDN intégré)

### 3.4 Performance

**Objectifs :**

- Lighthouse Score > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Images optimisées (Next.js Image, WebP)
- Lazy loading des composants

**Optimisations implémentées :**

- Dynamic imports (PartnerSection, BlogSection)
- Image formats adaptatifs (Cloudinary)
- Préchargement des polices
- Minification CSS/JS
- Cache API (stale-while-revalidate)

---

## 4. SPÉCIFICATIONS DESIGN

### 4.1 Charte Graphique

**Couleurs principales :**

- Rouge principal : `#ac1115`
- Pierre/Beige : `bg-pierre` (custom)
- Noir : `#000000`
- Blanc : `#FFFFFF`
- Gris : `#1a1a1a`, `#4a4a4a`

**Couleurs secondaires :**

- Marron cadre : `#8B7355`
- Marron foncé : `#5a4a3a`

### 4.2 Typographie

**Polices :**

- **Titres** : Garamond (serif, élégant)
- **Corps** : Système par défaut (sans-serif)

**Tailles (Mobile → Desktop) :**

- H1 : `text-2xl` → `text-6xl`
- H2 : `text-3xl` → `text-4xl`
- Body : `text-base` → `text-lg`

**Effets typographiques :**

- Lettrine (première lettre agrandie)
- Shadow underline (soulignement décoratif)

### 4.3 Responsive Design

**Breakpoints Tailwind :**

- Mobile : < 640px (sm)
- Tablet : 640-768px (md)
- Desktop : > 768px (lg, xl)

**Adaptations :**

- Navigation : Inline (desktop) / Hamburger (mobile)
- Gallery : 9 images (desktop) / 6 images grille (tablet) / 6 stack (mobile)
- Texte : text-justify (desktop) / text-left (mobile)
- Carousel : auto-scroll (desktop) / swipe (mobile)

### 4.4 Animations

**GSAP ScrollTrigger :**

- Gallery items : montée progressive (y: 400→0)
- Architecture plan : zoom (scale: 0.3→1)
- Partner logos : fade + scale (opacity: 0→1, scale: 0.5→1)

**Intro Section :**

- Reveal box : animation width + position
- Text color : transparent → white
- Bouton don : fade in/out

**Carousel Partenaires :**

- requestAnimationFrame pour scroll fluide
- Vitesse : 0.5px/frame
- Pause au hover

---

## 5. CONTRAINTES

### 5.1 Contraintes Techniques

- **Navigateurs supportés** : Chrome, Firefox, Safari, Edge (2 dernières versions)
- **Accessibilité** : WCAG 2.1 niveau AA
- **SEO** : Meta tags, sitemap, robots.txt
- **Performance** : Lighthouse score > 85

### 5.2 Contraintes de Sécurité

- **HTTPS** : Obligatoire en production
- **Variables d'environnement** : Secrets externalisés (.env)
- **Authentification** : JWT pour l'admin Strapi
- **CORS** : Restriction des origines autorisées
- **Validation** : Sanitization des inputs formulaires
- **Rate limiting** : Protection contre le spam (email)

### 5.3 Contraintes Réglementaires

- **RGPD** : Conformité (mentions légales, cookies)
- **Accessibilité** : RGAA 4.1 (référentiel français)
- **Copyright** : Attribution des médias

---

## 6. LIVRABLES

### 6.1 Code Source

- [x] Repository GitHub public/privé
- [x] README.md complet
- [x] Documentation technique
- [x] Fichiers de configuration (.env.example)

### 6.2 Documentation

- [x] Cahier des charges (ce document)
- [x] Wireframes
- [x] Modèle de données
- [x] User stories
- [ ] Guide d'installation
- [ ] Guide utilisateur admin

### 6.3 Déploiement

- [ ] Site en production (URL)
- [ ] Panel admin Strapi (URL)
- [ ] Guide de déploiement
- [ ] Procédure de backup

---

## 7. PLANNING

### Phase 1 : Conception (Complété)

- [x] Analyse des besoins
- [x] Maquettes / Wireframes
- [x] Modèle de données
- [x] Architecture technique

### Phase 2 : Développement Backend (Complété)

- [x] Setup Strapi + PostgreSQL
- [x] Création content-types
- [x] Configuration Cloudinary
- [x] API email (Nodemailer)
- [x] Tests API

### Phase 3 : Développement Frontend (Complété)

- [x] Setup Next.js + Tailwind
- [x] Composants UI (16 composants)
- [x] Pages (Accueil, Blog, Association, Partenaires)
- [x] Intégration API
- [x] Animations GSAP
- [x] Responsive design
- [x] Tests navigateurs

### Phase 4 : Déploiement (En cours)

- [ ] Configuration production
- [ ] Déploiement backend (Railway/Render)
- [ ] Déploiement frontend (Vercel)
- [ ] Configuration DNS
- [ ] Tests de charge

### Phase 5 : Maintenance

- [ ] Formation client (gestion contenu)
- [ ] Monitoring
- [ ] Corrections bugs
- [ ] Évolutions

**Durée totale estimée** : 8 semaines

---

## 8. BUDGET ESTIMATIF

### Développement

- Conception / Maquettes : 40h
- Backend Strapi : 60h
- Frontend Next.js : 100h
- Tests / Debug : 20h
- Documentation : 10h

**Total développement** : 230h

### Hébergement (annuel)

- Frontend (Vercel) : Gratuit (plan Hobby)
- Backend (Railway) : 5-20€/mois
- Base de données : Inclus Railway
- Cloudinary : Gratuit (plan Free, 25GB)
- Nom de domaine : 10-15€/an

**Total hébergement** : ~100-250€/an

---

## 9. MAINTENANCE ET ÉVOLUTION

### Maintenance corrective

- Correction de bugs
- Mises à jour de sécurité (dependencies)
- Compatibilité navigateurs

### Maintenance évolutive

- Nouvelles fonctionnalités :
  - Système de commentaires
  - Newsletter
  - Événements à venir
  - Suivi des dons
  - Galerie par années

### Support

- Formation initiale : 4h
- Support mensuel : 2h/mois

---

## 10. CRITÈRES D'ACCEPTATION

### Fonctionnels

- [x] Toutes les pages sont accessibles et fonctionnelles
- [x] Formulaire de contact envoie bien les emails
- [x] Galerie affiche correctement les images (tous devices)
- [x] Articles triés par date décroissante
- [x] Carousel partenaires défile automatiquement
- [x] Bouton don visible après scroll

### Techniques

- [x] Score Lighthouse > 85
- [x] Responsive sur mobile, tablet, desktop
- [ ] Accessible (WCAG AA)
- [x] SEO optimisé (meta tags)
- [ ] Compatible navigateurs modernes

### Design

- [x] Respecte la charte graphique
- [x] Animations fluides (60fps)
- [x] Typographie cohérente
- [x] Images optimisées (WebP, lazy load)

---

## 11. RISQUES ET MITIGATION

| Risque                          | Probabilité | Impact   | Mitigation                                       |
| ------------------------------- | ----------- | -------- | ------------------------------------------------ |
| Performance vidéo de fond       | Moyenne     | Fort     | Préchargement, formats optimisés, fallback image |
| Surcharge serveur (pics trafic) | Faible      | Moyen    | CDN Cloudinary, cache API                        |
| Perte de données                | Faible      | Critique | Backups quotidiens PostgreSQL                    |
| Spam formulaire contact         | Moyenne     | Faible   | Rate limiting, Captcha (si nécessaire)           |
| Breaking changes Strapi v5      | Moyenne     | Moyen    | Tests avant MAJ, versioning                      |

---

## 12. GLOSSAIRE

- **Jamstack** : Architecture JavaScript, APIs, Markup (découplage frontend/backend)
- **CMS Headless** : Système de gestion de contenu sans interface frontend intégrée
- **SSR** : Server-Side Rendering (rendu côté serveur)
- **SSG** : Static Site Generation (génération statique)
- **CDN** : Content Delivery Network (réseau de distribution de contenu)
- **CORS** : Cross-Origin Resource Sharing (partage de ressources entre origines)
- **JWT** : JSON Web Token (jeton d'authentification)

---

## ANNEXES

### Annexe A : Endpoints API

Voir documentation complète dans `docs/API_DOCUMENTATION.md`

### Annexe B : User Stories

Voir fichier `docs/USER_STORIES.md`

### Annexe C : Plan de Tests

Voir fichier `docs/PLAN_TESTS.md`

---

**Validation du cahier des charges :**

**Client** : ********\_\_\_\_********  
**Date** : ********\_\_\_\_********

**Chef de projet** : Philippe Barbosa  
**Date** : 19/11/2025

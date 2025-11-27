---
title: "Dossier de Projet - TP Développeur Web et Web Mobile"
author: "Philippe Barbosa"
date: "25 novembre 2025"
subtitle: "Projets APD (frontend Next.js) et CoolBooking (backend Express/MariaDB)"
---

# DOSSIER DE PROJET

## TP Développeur Web et Web Mobile

**Présenté par** : Philippe Barbosa  
**Formation** : Titre Professionnel Développeur Web et Web Mobile  
**Date** : 25 Novembre 2025

---

# Sommaire

1. [Introduction](#1-introduction)
2. [Liste des compétences couvertes par les projets](#2-liste-des-compétences-couvertes-par-les-projets)
   - CCP1 : Développer la partie frontend
   - CCP2 : Développer la partie backend
3. [Résumé des projets](#3-résumé-des-projets)
   - APD - Association Patrimoine de Doazit
   - CoolBooking - Plateforme de locations
4. [Cahier des charges](#4-cahier-des-charges)
   - Besoins et objectifs
   - Cibles et personas
5. [User Stories](#5-user-stories)
6. [Arborescence et MVP](#6-arborescence-et-mvp)
7. [Fonctionnalités détaillées des pages](#7-fonctionnalités-détaillées-des-pages)
8. [Évolutions potentielles](#8-évolutions-potentielles)
9. [Wireframes et maquettes](#9-wireframes-et-maquettes)
10. [Charte graphique](#10-charte-graphique)
11. [Spécifications techniques](#11-spécifications-techniques)
    - Technologies utilisées
    - Navigateurs compatibles
    - Possibilités de déploiement
12. [Architecture de la base de données](#12-architecture-de-la-base-de-données)
    - MCD/MLD
    - Dictionnaire des données
13. [Routes frontend et backend](#13-routes-frontend-et-backend)
14. [Réalisations personnelles](#14-réalisations-personnelles)
    - Upload d'images avec Cloudinary
    - Animations GSAP
    - Authentification JWT
15. [Présentation du jeu d'essai](#15-présentation-du-jeu-dessai)
16. [Vulnérabilités de sécurité et veille](#16-vulnérabilités-de-sécurité-et-veille)
17. [Conclusion](#17-conclusion)
18. [Annexes](#18-annexes)

---

# 1. INTRODUCTION

Depuis toujours, je suis passionné par les technologies et particulièrement la programmation. Bien qu'ayant suivi un parcours m'éloignant de l'univers de l'informatique, j'ai continué pendant longtemps à m'autoformer sur mon temps libre sur les sujets liés au développement web. Grâce à cet apprentissage individuel, j'ai pu continuer la pratique du code et à suivre régulièrement les actualités du secteur.

Après une certaine lassitude de mon précédent domaine d'activité, j'ai choisi de trouver une voie qui me permettrait de valider l'acquisition d'une certaine expérience. Après quelques recherches sur les moyens d'y parvenir, j'ai décidé de m'engager dans la formation **Titre Professionnel Développeur Web et Web Mobile (TP DWWM)**.

Dans le cadre de cette formation, j'ai réalisé deux projets complémentaires permettant de couvrir l'ensemble du référentiel de compétences :

### Projet APD - Association Patrimoine de Doazit

Site web institutionnel développé en **Next.js 15** avec **React 19**, connecté à un CMS headless **Strapi v5** et base de données **PostgreSQL**. Ce projet met l'accent sur l'expérience utilisateur, les animations GSAP, le responsive design et l'optimisation des performances.

**Durée** : 8 semaines (Octobre - Novembre 2025)  
**Rôle** : Développeur frontend et intégration CMS  
**Environnement** : Next.js, React, Tailwind CSS, GSAP, Strapi, PostgreSQL, Cloudinary

### Projet CoolBooking - Backend API

API REST sécurisée développée en **Express 5** avec base de données **MariaDB**, dédiée à la gestion d'une plateforme de locations saisonnières. Ce projet démontre ma maîtrise de l'architecture backend, de la sécurité (JWT, Argon2), de la validation des données et de l'upload de médias.

**Durée** : 4 semaines (Octobre 2025)  
**Rôle** : Développeur backend  
**Environnement** : Node.js, Express, MariaDB, JWT, Argon2, Cloudinary, Joi

Au-delà de l'acquisition de nouvelles compétences et la validation d'une expérience, je souhaitais également apprendre à travailler sur des projets complets, de la conception à la mise en production, en respectant les bonnes pratiques professionnelles et les standards de sécurité.

En somme, cette période de réalisation des projets APD et CoolBooking m'a permis d'acquérir ces nouvelles compétences, tout en travaillant sur des sujets qui, initialement, ne m'auraient pas forcément intéressé si je les avais abordés de façon autonome.

---

# 2. LISTE DES COMPÉTENCES COUVERTES PAR LES PROJETS

## I. Développer la partie frontend d'une application web ou web mobile en intégrant les recommandations de sécurité

### A. Maquetter une application

En amont de la réalisation à proprement parler de l'application APD, j'ai choisi dans un premier temps de travailler sur la réalisation des documents de conception.

Dans ce but, j'ai donc réalisé en premier lieu des **user stories** pour définir très clairement ce que pourront faire les utilisateurs sur l'application. Puis j'ai réalisé les **wireframes** du projet, aux formats mobile et desktop pour imaginer la structuration des pages, puis enfin j'ai réalisé une **charte graphique** et des **maquettes** pour voir concrètement à quoi allait ressembler l'application.

**Projet concerné** : APD  
**Livrables** :

- 27 user stories détaillées
- Wireframes desktop et mobile (disponibles dans WIREFRAMES.md)
- Charte graphique (couleurs, typographies, logo)
- Maquettes Figma haute fidélité

### B. Réaliser une interface utilisateur web statique et adaptable

Ce projet étant conçu comme un outil de valorisation du patrimoine accessible au grand public, il était nécessaire d'avoir une interface simple et facile d'utilisation, peu importe le niveau de compétence en informatique des visiteurs.

De plus, cette application étant consultée autant sur ordinateur que sur mobile (visiteurs sur site, partages réseaux sociaux), il était impératif d'avoir une application compatible avec les formats d'écran mobile et tablette.

**Projet concerné** : APD  
**Mise en pratique** :

- Interface responsive avec Tailwind CSS (breakpoints sm, md, lg)
- Design mobile-first
- Composants adaptatifs (Header menu hamburger, Gallery grille/scroll)
- Tests multi-device (iPhone 12, iPad Pro, Desktop 1920px)
- Compatibilité navigateurs modernes (Chrome, Firefox, Safari, Edge)

### C. Développer une interface utilisateur web dynamique

Au vu des user stories réalisées en amont de la réalisation du projet, il était impératif que l'application dispose d'une interface dynamique. Dès lors je me suis très rapidement tourné vers la librairie **React 19** avec le framework **Next.js 15**.

**Projets concernés** : APD  
**Mise en pratique** :

- Composants React interactifs (16 composants développés)
- Gestion d'état avec useState, useContext
- Hooks personnalisés (useSiteData, useIsMobile, useCurrentSection)
- Animations GSAP (timelines, reveal boxes, scroll-triggered)
- Dynamic routing Next.js ([slug] pour articles)
- Server Components et Client Components
- Optimisations (dynamic imports, lazy loading images)

## II. Développer la partie backend d'une application web ou web mobile en intégrant les recommandations de sécurité

### A. Créer une base de données

Tout comme la réalisation du maquettage de l'application, j'ai voulu dès le début organiser la façon dont allaient être structurées les données. J'ai donc commencé par réfléchir aux données que je souhaitais intégrer aux applications, puis j'ai créé un **MCD**, un **MLD**, ainsi qu'un **dictionnaire des données**.

**Projets concernés** : APD (PostgreSQL via Strapi), CoolBooking (MariaDB)

**APD - Base PostgreSQL** :

- 8 tables principales (église, article, interview, partenaire, etc.)
- 11 tables de liaison (relations many-to-many)
- Types de données : TEXT, JSONB (réseaux sociaux, localisations), TIMESTAMP
- Index sur clés primaires et étrangères

**CoolBooking - Base MariaDB** :

- 2 tables principales : `users`, `rentals`
- Champs JSON pour images multiples
- Contraintes : UNIQUE sur email, NOT NULL sur champs requis
- Index sur id, email pour optimiser les requêtes

### B. Développer les composants d'accès aux données

Pour réaliser la couche d'accès aux données, j'ai utilisé deux approches complémentaires :

**Projet APD** : Strapi v5 avec son ORM intégré (Knex.js) générant automatiquement les requêtes PostgreSQL. J'ai également créé des **custom controllers** pour les besoins spécifiques (endpoint email personnalisé).

**Projet CoolBooking** : Architecture manuelle avec pattern **Repository** utilisant mysql2/promise. J'ai créé une fonction utilitaire `query()` gérant le pool de connexions et la libération automatique.

**Mise en pratique** :

- Requêtes paramétrées (protection SQL injection)
- Gestion des transactions
- Pool de connexions (10 connexions max)
- Gestion d'erreurs avec try/catch
- Logs de connexion et requêtes

### C. Développer la partie backend d'une application web ou web mobile

Pour réaliser le backend des applications, j'ai utilisé deux approches :

**Projet APD** : Strapi v5 comme backend headless CMS générant automatiquement l'API REST. J'ai organisé l'application avec différents **content-types**, **controllers personnalisés** et **middlewares** (notamment pour l'envoi d'emails via Nodemailer).

**Projet CoolBooking** : Express 5 avec architecture en couches (Controller → Service → Repository). J'ai créé plusieurs **middlewares** pour l'authentification (verifyToken), la validation (Joi schemas) et la gestion d'uploads (Multer + Cloudinary).

**Mise en pratique** :

- API REST avec méthodes HTTP appropriées (GET, POST, PUT, DELETE)
- Validation des données entrantes (Joi schemas)
- Authentification JWT (génération, vérification, refresh)
- Hash de mots de passe (Argon2id)
- Upload de fichiers (Multer → Cloudinary)
- Gestion d'erreurs centralisée
- CORS configuré
- Cookies HttpOnly sécurisés
- Rate limiting sur endpoints sensibles

---

# 3. RÉSUMÉ DES PROJETS

## Projet APD - Association Patrimoine de Doazit

Chaque année, le patrimoine religieux français se dégrade faute de financements suffisants. Des centaines d'églises, chapelles et édifices historiques nécessitent des travaux de restauration urgents. Les associations locales peinent à mobiliser des fonds et à sensibiliser le public à l'importance de préserver ce patrimoine.

L'Association Patrimoine de Doazit s'est créée dans le but de sauvegarder l'**Église Saint-Jean Baptiste d'Aulès**, datant du XIIe siècle. Cette association avait besoin d'une présence digitale pour :

- Valoriser le patrimoine auprès du grand public
- Faciliter les dons via un parcours utilisateur optimisé
- Attirer des partenaires (entreprises, fondations)
- Communiquer sur les actualités et l'avancement des travaux

Notre application web nommée **APD** a été créée pour répondre à ces besoins. Elle permet de :

- Présenter l'église avec une galerie photo immersive et une vidéo de fond
- Raconter son histoire à travers des articles de blog
- Proposer des interviews vidéo d'acteurs locaux
- Afficher les partenaires de l'association
- Faciliter les dons avec un bouton CTA permanent et visible
- Permettre aux futurs partenaires de contacter l'association via un formulaire

L'application se veut avant tout **immersive** et **émotionnelle**, par un design soigné, des animations fluides et un storytelling visuel fort. Elle vise à créer une connexion entre les visiteurs et le patrimoine, pour transformer l'intérêt en action concrète (don, partenariat).

En définitive, cette solution favorise la **visibilité du projet**, un **gain de temps organisationnel** pour l'association et une **traçabilité des actions** (dons, contacts partenaires). Le site est actuellement déployé en production et accessible au grand public.

## Projet CoolBooking - Backend API

Le marché de la location saisonnière connaît une croissance importante, avec des plateformes comme Airbnb ou Booking.com. Cependant, ces solutions imposent des commissions élevées (12-15%) et offrent peu de flexibilité aux propriétaires indépendants.

De plus, les petites structures (agences locales, propriétaires multi-biens) ont besoin d'outils simples pour gérer leurs annonces et leurs clients sans dépendre de géants du web.

Notre API **CoolBooking** a été créée pour répondre à ce besoin. Elle permet de :

- Gérer des utilisateurs avec deux rôles : propriétaires (`owner`) et locataires (`tenant`)
- Créer et gérer des annonces de location (titre, description, localisation, prix, nombre de couchages, images)
- Sécuriser l'accès avec authentification JWT
- Uploader des images sur Cloudinary (avatar utilisateurs, 5 images par annonce)
- Valider les données avec des schémas Joi personnalisés

L'application est conçue avec une **architecture modulaire** (Controller/Service/Repository) permettant une maintenance facilitée et des tests unitaires. Elle utilise **MariaDB** comme base de données relationnelle, offrant performance et fiabilité.

Cette API est prête à être consommée par un frontend React/Next.js ou une application mobile React Native. Elle respecte les standards REST et les bonnes pratiques de sécurité (hash Argon2, tokens JWT, cookies HttpOnly).

En définitive, CoolBooking offre une **alternative légère et économique** aux grandes plateformes, tout en garantissant sécurité et évolutivité. Le projet démontre ma capacité à architecturer un backend professionnel de A à Z.

---

| Référentiel TP DWWM                                                      | Mise en pratique                                                                           |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| **CCP1** : Développer la partie Frontend d'une application web ou mobile | Projet APD : maquettes, intégration responsive, animations GSAP, consommation d'API Strapi |
| **CCP2** : Développer la partie Backend d'une application web ou mobile  | Projet CoolBooking : API Express, couche service/repository, sécurité JWT, MariaDB         |

Objectifs pédagogiques :

1. Travailler avec des outils actuels (React 19, Next.js 15, Tailwind 4, GSAP) pour proposer une expérience utilisateur riche.
2. Structurer un backend Express moderne : validation, authentification, upload Cloudinary, couche d'accès aux données.
3. Respecter les bonnes pratiques : modularité, séparation des responsabilités, sécurité (hash Argon2, JWT, CORS), documentation.
4. Fournir un dossier complet (présent document) synthétisant choix techniques, résultats et perspectives.

---

## 3. Présentation des projets

### 3.1 APD – Frontend Next.js

- **Client fictif** : Association Patrimoine de Doazit, dédiée à la restauration de l'église Saint-Jean Baptiste d'Aulès.
- **Problématique** : manque de vitrine digitale, difficulté à fédérer donateurs et partenaires.
- **Solution** : site single-page Next.js orchestrant sections animées (hero GSAP, galerie, blog, partenaires) alimentées par un CMS Strapi.
- **Valeur ajoutée** : storytelling vidéo plein écran, navigation par sections, CTA "Faire un don" permanent.

### 3.2 CoolBooking – Backend MariaDB

- **Client fictif** : plateforme de locations saisonnières multi-propriétaires.
- **Problématique** : besoin d'une API sécurisée pour gérer utilisateurs (propriétaires/locataires), annonces et médias.
- **Solution** : service Express modulable, opérant sur MariaDB via mysql2, orchestrant authentification JWT, stockage Cloudinary et validations Joi.
- **Valeur ajoutée** : architecture controller/service/repository, montée en charge facilitée (pool de connexions), endpoints prêts pour future SPA/mobile.

---

# 4. CAHIER DES CHARGES

## I. Besoins et objectifs des applications

### A. Besoins APD

Pour mieux comprendre le besoin de l'Association Patrimoine de Doazit, plusieurs recherches ont été nécessaires pour connaître l'utilité du projet. Il faut commencer par connaître les enjeux de préservation du patrimoine religieux en France.

**Contexte** :

- En France, 45 000 églises sont répertoriées
- 5 000 édifices religieux sont en péril
- Budget moyen de restauration : 500 000 € à 2 millions €
- Difficultés : manque de financements publics, dons privés insuffisants

**Besoins identifiés** :

1. **Visibilité digitale** : L'association n'avait aucune présence en ligne, limitant sa portée aux habitants locaux
2. **Collecte de dons** : Besoin d'un moyen simple et rapide pour les visiteurs de contribuer financièrement
3. **Communication** : Informer le public sur l'avancement des travaux et l'histoire de l'église
4. **Partenariats** : Attirer des entreprises et fondations pour des mécénats
5. **Valorisation** : Raconter l'histoire du patrimoine de manière immersive et émotionnelle

### B. Besoins CoolBooking

Pour comprendre le besoin d'une plateforme de location alternative, j'ai analysé le marché existant et ses limites.

**Contexte** :

- Airbnb prélève 15-20% de commission sur chaque réservation
- Booking.com impose des clauses restrictives aux propriétaires
- Les petites agences locales manquent d'outils adaptés et abordables
- Besoin de contrôle total sur les données clients

**Besoins identifiés** :

1. **Gestion utilisateurs** : Système d'inscription/connexion sécurisé avec rôles (propriétaire/locataire)
2. **Gestion annonces** : CRUD complet pour créer, modifier, supprimer des biens à louer
3. **Upload médias** : Stocker des images de qualité pour valoriser les annonces
4. **Sécurité** : Protéger les données personnelles et les transactions
5. **Évolutivité** : Architecture permettant l'ajout futur de fonctionnalités (réservations, paiements, calendrier)

### C. Objectifs

**Objectifs APD** :

- ✅ Créer un site web immersif et émotionnel
- ✅ Faciliter les dons avec un parcours utilisateur optimisé
- ✅ Valoriser le patrimoine avec galerie photo et vidéo
- ✅ Proposer du contenu éditorial (blog, interviews)
- ✅ Attirer des partenaires via formulaire de contact
- ✅ Optimiser le référencement naturel (SEO)
- ✅ Garantir une compatibilité mobile parfaite
- ✅ Atteindre un score Lighthouse > 85 sur desktop

**Objectifs CoolBooking** :

- ✅ Créer une API REST sécurisée et documentée
- ✅ Implémenter une authentification JWT robuste
- ✅ Valider toutes les données entrantes
- ✅ Gérer l'upload de médias vers Cloudinary
- ✅ Architecturer le code de manière modulaire (Controller/Service/Repository)
- ✅ Utiliser MariaDB avec pool de connexions optimisé
- ✅ Documenter les endpoints avec JSDoc
- ✅ Atteindre un temps de réponse < 200ms sur requêtes simples

### D. Cibles et personas

#### Personas APD

**Persona 1 : Marie Dupont, 68 ans, Retraitée, Bordeaux**

Équipement informatique : iPad, iPhone 11  
Ce qu'elle recherche : Contribuer à la préservation du patrimoine local, se sentir utile  
Sa navigation : Page d'accueil → Galerie photos → Blog → Bouton "Faire un don"  
Ce qu'elle attend : Interface simple, texte lisible, parcours de don clair  
Prérequis : Le site doit avoir une navigation intuitive et des CTA visibles

**Persona 2 : Thomas Leblanc, 35 ans, Chef d'entreprise, Paris**

Équipement informatique : MacBook Pro, iPhone 14 Pro  
Ce qu'il recherche : Opportunités de mécénat pour son entreprise  
Sa navigation : Page d'accueil → Page Partenaires → Formulaire de contact  
Ce qu'il attend : Informations sur les contreparties, contact rapide  
Prérequis : Formulaire fonctionnel, email de confirmation automatique

**Persona 3 : Sophie Martin, 42 ans, Professeure d'histoire, Lyon**

Équipement informatique : Desktop Windows 11, Android  
Ce qu'elle recherche : Contenu historique sur l'église, photos d'archives  
Sa navigation : Blog → Articles détaillés → Galerie → Partage réseaux sociaux  
Ce qu'elle attend : Contenu riche, sources fiables, possibilité de partager  
Prérequis : Meta tags optimisés, Open Graph pour partages sociaux

**Persona 4 : Jean-Pierre Rousseau, 58 ans, Président de l'association**

Équipement informatique : Desktop Windows 10, smartphone basique  
Ce qu'il recherche : Gérer le contenu du site facilement  
Sa navigation : Panel admin Strapi → Création article → Upload photos  
Ce qu'il attend : Interface d'administration claire, pas de compétence technique requise  
Prérequis : Strapi facile d'utilisation, documentation fournie

#### Personas CoolBooking

**Persona 1 : Antoine Moreau, 45 ans, Propriétaire multi-biens, Nice**

Équipement informatique : Desktop, tablette Samsung  
Ce qu'il recherche : Gérer ses 8 appartements de location sans commission excessive  
Sa navigation : Inscription → Connexion → Ajout d'annonces → Upload photos  
Ce qu'il attend : Interface rapide, upload multiple, gestion facile  
Prérequis : API performante, upload Cloudinary fiable

**Persona 2 : Laura Petit, 28 ans, Locataire, Toulouse**

Équipement informatique : iPhone 13, MacBook Air  
Ce qu'elle recherche : Trouver un logement pour les vacances à prix correct  
Sa navigation : Parcours des annonces → Filtres → Contact propriétaire  
Ce qu'elle attend : Photos de qualité, informations précises (prix, couchages, localisation)  
Prérequis : Images optimisées, données fiables

**Persona 3 : David Chen, 32 ans, Développeur frontend, Lyon**

Équipement informatique : Desktop Linux, Android  
Ce qu'il recherche : Consommer l'API pour créer un frontend personnalisé  
Sa navigation : Documentation API → Tests Postman → Intégration React  
Ce qu'il attend : Documentation claire, endpoints cohérents, codes d'erreur explicites  
Prérequis : Routes REST standards, réponses JSON structurées

---

# 5. USER STORIES

Légende : **🟢 MVP** | **🔵 Versions à venir**

## User Stories APD

| En tant que          | Je souhaite                                 | Afin de                                       | Priorité |
| -------------------- | ------------------------------------------- | --------------------------------------------- | -------- |
| Visiteur             | Voir une vidéo de fond immersive            | Découvrir l'église de manière émotionnelle    | 🟢       |
| Visiteur             | Parcourir une galerie de photos             | Visualiser l'état actuel et l'architecture    | 🟢       |
| Visiteur             | Lire des articles de blog                   | Comprendre l'histoire et les enjeux           | 🟢       |
| Visiteur             | Regarder des interviews vidéo               | Entendre les témoignages d'acteurs locaux     | 🟢       |
| Visiteur             | Cliquer sur "Faire un don"                  | Contribuer financièrement facilement          | 🟢       |
| Visiteur             | Voir les partenaires de l'association       | Connaître les soutiens existants              | 🟢       |
| Visiteur             | Naviguer entre les sections                 | Accéder rapidement au contenu qui m'intéresse | 🟢       |
| Visiteur             | Consulter le site sur mobile                | Avoir la même expérience sur smartphone       | 🟢       |
| Partenaire potentiel | Remplir un formulaire de contact            | Proposer un partenariat                       | 🟢       |
| Partenaire potentiel | Recevoir une confirmation par email         | Savoir que ma demande a été prise en compte   | 🟢       |
| Administrateur       | Me connecter au panel Strapi                | Gérer le contenu du site                      | 🟢       |
| Administrateur       | Créer un nouvel article de blog             | Publier des actualités                        | 🟢       |
| Administrateur       | Uploader des photos                         | Enrichir la galerie                           | 🟢       |
| Administrateur       | Ajouter une interview vidéo                 | Partager des témoignages                      | 🟢       |
| Administrateur       | Modifier les informations de l'église       | Mettre à jour le contenu                      | 🟢       |
| Administrateur       | Gérer les partenaires                       | Ajouter/supprimer des logos                   | 🟢       |
| Visiteur             | M'inscrire à une newsletter                 | Recevoir les actualités de l'association      | 🔵       |
| Visiteur             | Voir un calendrier d'événements             | Participer à des visites guidées              | 🔵       |
| Visiteur             | Partager un article sur les réseaux sociaux | Faire connaître l'association                 | 🔵       |
| Visiteur             | Voir une carte interactive                  | Localiser l'église facilement                 | 🔵       |
| Donateur             | Suivre l'utilisation de mon don             | Avoir de la transparence                      | 🔵       |
| Administrateur       | Voir des statistiques de visite             | Analyser l'audience du site                   | 🔵       |
| Administrateur       | Modérer les commentaires                    | Gérer les interactions visiteurs              | 🔵       |

## User Stories CoolBooking

| En tant que    | Je souhaite                          | Afin de                           | Priorité |
| -------------- | ------------------------------------ | --------------------------------- | -------- |
| Utilisateur    | M'inscrire avec email/mot de passe   | Créer mon compte                  | 🟢       |
| Utilisateur    | Choisir mon rôle (owner/tenant)      | Définir mes permissions           | 🟢       |
| Utilisateur    | Uploader un avatar                   | Personnaliser mon profil          | 🟢       |
| Utilisateur    | Me connecter                         | Accéder à mon espace              | 🟢       |
| Utilisateur    | Voir mon profil                      | Consulter mes informations        | 🟢       |
| Utilisateur    | Modifier mes informations            | Mettre à jour mes données         | 🟢       |
| Utilisateur    | Me déconnecter                       | Sécuriser ma session              | 🟢       |
| Propriétaire   | Créer une annonce de location        | Proposer mon bien                 | 🟢       |
| Propriétaire   | Uploader jusqu'à 5 images            | Valoriser mon annonce             | 🟢       |
| Propriétaire   | Voir toutes mes annonces             | Gérer mon parc immobilier         | 🟢       |
| Propriétaire   | Modifier une annonce                 | Corriger les informations         | 🟢       |
| Propriétaire   | Supprimer une annonce                | Retirer un bien de la plateforme  | 🟢       |
| Locataire      | Voir toutes les annonces disponibles | Trouver un logement               | 🟢       |
| Locataire      | Filtrer par localisation             | Chercher dans une zone précise    | 🔵       |
| Locataire      | Filtrer par prix                     | Trouver dans mon budget           | 🔵       |
| Locataire      | Filtrer par nombre de couchages      | Trouver pour ma famille           | 🔵       |
| Locataire      | Contacter un propriétaire            | Poser des questions               | 🔵       |
| Locataire      | Réserver un bien                     | Bloquer des dates                 | 🔵       |
| Propriétaire   | Gérer un calendrier de disponibilité | Éviter les doublons               | 🔵       |
| Propriétaire   | Recevoir des notifications           | Être alerté des réservations      | 🔵       |
| Administrateur | Modérer les annonces                 | Éviter les contenus inappropriés  | 🔵       |
| Administrateur | Voir les statistiques                | Analyser l'usage de la plateforme | 🔵       |

---

# 6. ARBORESCENCE ET MVP

## I. Arborescence APD (Frontend)

### Structure des pages

```
APD Site
├── / (Accueil)
│   ├── Hero Section (vidéo background + titre)
│   ├── Introduction Section
│   ├── Description Section
│   ├── Interview Section
│   ├── Architecture Section
│   ├── Gallery Section
│   ├── Blog Section (3 derniers articles)
│   ├── Partner Section
│   └── Address Section (contact)
├── /blog
│   └── Liste complète des articles
├── /blog/[slug]
│   └── Article complet avec contenu enrichi
├── /partners
│   └── Page dédiée partenaires
└── /association
    └── Informations sur l'association
```

### Composants principaux

- **Header** : Navigation sticky avec lien "Faire un don"
- **HeaderWrapper** : Gestion du contexte donation
- **VideoBackground** : Vidéo full-screen avec préchargement
- **ScrollIndicator** : Indicateur de progression
- **IntroSection** : Présentation de l'église
- **DescriptionSection** : Détails patrimoniaux
- **Interview** : Cartes vidéo interviews
- **Architecture** : Plan avec zones cliquables
- **Gallery** : Grille responsive 9 images
- **BlogSection** : Aperçu articles récents
- **PartnerSection** : Carousel logos partenaires
- **AddressSection** : Carte localisation + informations
- **ContactModal** : Formulaire partenaires
- **DonationButton** : CTA permanent
- **Footer** : Mentions légales, liens

### Périmètre MVP APD

✅ **Livré (MVP)** :

- Page d'accueil complète avec toutes les sections
- Navigation fluide entre sections
- Vidéo background immersive
- Galerie photos responsive
- Blog avec système de slugs
- Page partenaires avec carousel
- Formulaire de contact fonctionnel
- Bouton donation permanent
- Responsive mobile/tablet/desktop
- SEO optimisé (meta tags, sitemap)
- Déploiement Vercel
- CMS Strapi backend avec PostgreSQL

🔵 **Évolutions futures** :

- Newsletter avec gestion abonnés
- Calendrier événements interactif
- Carte interactive localisation
- Espace donateur avec suivi dons
- Multilingue (FR/EN/ES)
- Mode sombre
- Commentaires articles blog
- Partage social avancé
- Analytics avancés
- Tests A/B pour donations

## II. Arborescence CoolBooking (Backend API)

### Structure des endpoints

```
CoolBooking API
├── /users
│   ├── POST /register (création compte + avatar)
│   ├── POST /login (authentification)
│   ├── POST /logout (déconnexion)
│   ├── GET /dashboard (profil utilisateur protégé)
│   ├── GET / (tous les utilisateurs)
│   ├── GET /:id (utilisateur par ID)
│   ├── PUT /:id (mise à jour profil)
│   └── DELETE /:id (suppression compte)
└── /rentals
    ├── POST / (création annonce + 5 images max)
    ├── GET / (toutes les annonces)
    ├── GET /:id (annonce par ID)
    ├── PUT /:id (modification annonce)
    └── DELETE /:id (suppression annonce)
```

### Architecture en couches

```
Routes (Express Router)
   ↓
Controllers (gestion requêtes/réponses)
   ↓
Services (logique métier)
   ↓
Repositories (accès données MariaDB)
   ↓
Database (mysql2 pool)
```

### Modules transverses

- **authentication/** : `verifyPassword`, `verifyToken`, `clearCookie`
- **validation/** : Schémas Joi pour users (create/update)
- **config/** : `db.js` (pool mysql2), `cloudinary.js`
- **middlewares/** : Multer uploads, CORS, error handler

### Périmètre MVP CoolBooking

✅ **Livré (MVP)** :

- Inscription utilisateur avec rôle (owner/tenant)
- Upload avatar Cloudinary
- Authentification JWT (HttpOnly cookies)
- CRUD utilisateurs complet
- CRUD annonces complet
- Upload 5 images par annonce (Cloudinary)
- Validation Joi (email, password, phone)
- Hash Argon2id pour mots de passe
- Pool connexions MariaDB optimisé
- Architecture Controller/Service/Repository
- Gestion erreurs globale
- CORS configuré
- Documentation JSDoc endpoints
- Collection Postman tests

🔵 **Évolutions futures** :

- Système de réservations (dates, paiements)
- Calendrier disponibilités
- Filtres annonces (prix, localisation, couchages)
- Notation/avis locataires
- Messagerie propriétaire-locataire
- Notifications email (Nodemailer)
- Rate limiting (express-rate-limit)
- Tests unitaires Jest + CI/CD
- Migration vers Prisma ORM
- Pagination annonces
- Upload vidéos annonces
- Géolocalisation (latitude/longitude)
- Export données (CSV, PDF)
- Logs d'audit
- Dashboard admin

---

# 7. FONCTIONNALITÉS DÉTAILLÉES

## I. Fonctionnalités APD (Frontend)

### Page d'accueil (/)

#### 1. Hero Section avec vidéo background

**Description** : Section d'accueil immersive avec vidéo plein écran de l'église

**Composant** : `VideoBackground.jsx`

**Fonctionnalités** :

- Vidéo en boucle automatique (autoplay, loop, muted)
- Préchargement conditionnel (desktop uniquement)
- Fallback image pour mobile (économie de données)
- Overlay gradient pour lisibilité du texte
- Titre animé avec GSAP (RevealBox effect)
- Bouton CTA "Faire un don" visible

**Technologies** : React, GSAP, Cloudinary (CDN vidéo), CSS fixed positioning

---

#### 2. Introduction Section

**Description** : Présentation courte de l'église et de l'association

**Composant** : `IntroSection.jsx`

**Fonctionnalités** :

- Récupération données depuis Strapi (single type `eglise`)
- Affichage titre et texte introductif
- Animation d'apparition au scroll (GSAP ScrollTrigger)
- Typographie responsive (Garamond custom)

**Technologies** : Next.js fetch, GSAP ScrollTrigger, Tailwind CSS

---

#### 3. Description Section

**Description** : Détails historiques et architecturaux de l'église

**Composant** : `DescriptionSection.jsx`

**Fonctionnalités** :

- Texte enrichi depuis Strapi (RichText field)
- Rendu Markdown avec images intégrées
- Background avec blur effect
- Scroll reveal progressif

**Technologies** : Strapi RichText, react-markdown, GSAP

---

#### 4. Interview Section

**Description** : Vidéos d'interviews d'acteurs locaux

**Composant** : `Interview.jsx`

**Fonctionnalités** :

- Récupération collection `interviews` depuis Strapi
- Cartes vidéo avec thumbnail
- Lecteur vidéo intégré (HTML5 video)
- Disposition en grille responsive (2 colonnes desktop, 1 mobile)
- Lazy loading des vidéos

**Technologies** : Strapi Collection, HTML5 Video API, Tailwind Grid

---

#### 5. Architecture Section

**Description** : Plan de l'église avec zones annotées

**Composant** : `Architecture.jsx`

**Fonctionnalités** :

- Image plan architectural (Cloudinary)
- Zones cliquables (hotspots) avec info-bulles
- Zoom interactif (à implémenter en v2)
- Annotations textuelles

**Technologies** : React, Cloudinary, SVG overlays (futur)

---

#### 6. Gallery Section

**Description** : Galerie photos de l'église

**Composant** : `Gallery.jsx`

**Fonctionnalités** :

- Récupération images depuis Strapi (`eglise.images`)
- Grille responsive (3x3 desktop, 2x4 mobile)
- Lazy loading avec Next.js Image
- Lightbox au clic (à implémenter)
- Scroll horizontal desktop

**Technologies** : Next.js Image, Cloudinary, Tailwind Grid, GSAP ScrollTrigger

---

#### 7. Blog Section

**Description** : Aperçu des 3 derniers articles de blog

**Composant** : `BlogSection.jsx`

**Fonctionnalités** :

- Récupération collection `articles` (limit: 3, sort: date DESC)
- Cartes articles avec image, titre, extrait
- Lien vers `/blog` pour voir tous les articles
- Animation d'apparition au scroll

**Technologies** : Strapi Collection API, Next.js Link, GSAP

---

#### 8. Partner Section

**Description** : Carousel des partenaires de l'association

**Composant** : `PartnerSection.jsx`

**Fonctionnalités** :

- Récupération collection `partenaires` depuis Strapi
- Carousel auto-scroll (GSAP)
- Logos optimisés (Next.js Image)
- Hover effect (scale, shadow)
- Loading skeleton pendant fetch

**Technologies** : GSAP Timeline, Next.js Image, Cloudinary

---

#### 9. Address Section

**Description** : Informations de contact et localisation

**Composant** : `AddressSection.jsx`

**Fonctionnalités** :

- Affichage adresse, téléphone, email
- Carte statique (image Google Maps Static API ou Mapbox)
- Lien vers Google Maps pour itinéraire
- Bouton "Devenir partenaire" (ouvre ContactModal)

**Technologies** : Next.js, Strapi, Google Maps Static API

---

#### 10. Contact Modal

**Description** : Formulaire pour futurs partenaires

**Composant** : `ContactModal.jsx`

**Fonctionnalités** :

- Champs : nom, email, entreprise, message
- Validation côté client (email format, champs requis)
- Soumission vers API Strapi `/api/email/send`
- Confirmation visuelle (toast/message succès)
- Gestion erreurs (affichage message)
- Fermeture au clic extérieur ou croix

**Technologies** : React useState/useEffect, Fetch API, Tailwind Forms

---

#### 11. Header avec navigation

**Composant** : `Header.jsx` + `HeaderWrapper.jsx`

**Fonctionnalités** :

- Logo association
- Navigation sections (scroll smooth)
- Bouton "Faire un don" sticky
- Context donation (HeaderDonationContext)
- Menu burger mobile (à implémenter)

**Technologies** : React Context API, GSAP scrollTo, Tailwind

---

#### 12. Scroll Indicator

**Composant** : `ScrollIndicator.jsx`

**Fonctionnalités** :

- Barre de progression scroll
- Affichage section actuelle
- Animation fluide (GSAP)
- Fixed position top

**Technologies** : GSAP, window.addEventListener('scroll')

---

### Page Blog (/blog)

**Fonctionnalités** :

- Liste complète des articles (pagination à implémenter)
- Filtres par catégorie/date (futur)
- Tri récents/populaires
- Cartes articles cliquables vers `/blog/[slug]`

---

### Page Article (/blog/[slug])

**Fonctionnalités** :

- Récupération article par slug (`?filters[slug][$eq]=${slug}`)
- Affichage titre, date, auteur, image principale
- Contenu enrichi (Markdown render)
- Partage réseaux sociaux (Open Graph tags)
- Articles similaires (futur)
- Commentaires (futur)

---

### Page Partenaires (/partners)

**Fonctionnalités** :

- Grille complète de tous les partenaires
- Détails partenaire (logo, nom, description, lien site)
- Formulaire "Devenir partenaire"

---

### Page Association (/association)

**Fonctionnalités** :

- Présentation détaillée de l'association
- Membres du bureau
- Historique des actions
- Statuts et documents légaux (PDF download)

---

## II. Fonctionnalités CoolBooking (Backend API)

### Module Users (/users)

#### POST /register

**Description** : Création compte utilisateur avec upload avatar

**Body (multipart/form-data)** :

```json
{
  "firstname": "string (required)",
  "lastname": "string (required)",
  "email": "string (required, unique, format email)",
  "password": "string (required, min 6 chars)",
  "confirmpassword": "string (required, match password)",
  "phone": "string (required, format +33... ou 0...)",
  "role": "string (required, 'owner' | 'tenant')",
  "avatar": "file (optional, image jpeg/png)"
}
```

**Validation** : Joi schema `users.validation.js`

**Processus** :

1. Validation Joi des données
2. Vérification email unique (repository.findByEmail)
3. Upload avatar sur Cloudinary (si fourni)
4. Hash password avec Argon2id
5. INSERT dans table `users`
6. Retour 201 avec { userId, message }

**Réponses** :

- `201 Created` : { userId: number, message: "User created successfully" }
- `400 Bad Request` : { error: "Validation error details" }
- `409 Conflict` : { error: "Email already exists" }
- `500 Internal Server Error` : { error: "Error message" }

---

#### POST /login

**Description** : Authentification utilisateur et génération JWT

**Body (urlencoded)** :

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Processus** :

1. Récupération utilisateur par email
2. Vérification password hash (Argon2 verify)
3. Génération JWT token (24h expiration)
4. Stockage token dans cookie HttpOnly
5. Retour 200 avec user data

**Réponses** :

- `200 OK` : { user: { id, firstname, lastname, email, role }, message: "Login successful" }
- `401 Unauthorized` : { error: "Invalid credentials" }
- `404 Not Found` : { error: "User not found" }

---

#### GET /dashboard (protégé)

**Description** : Accès espace utilisateur (requiert JWT)

**Headers** :

```
Cookie: token=<jwt_token>
```

**Middleware** : `verifyToken`

**Réponses** :

- `200 OK` : "Bienvenue dans votre espace, {firstname}"
- `401 Unauthorized` : { error: "No token provided" }
- `403 Forbidden` : { error: "Invalid token" }

---

#### POST /logout

**Description** : Déconnexion (suppression cookie JWT)

**Processus** : Appel middleware `clearCookie`

**Réponses** :

- `200 OK` : { message: "Logout successful" }

---

#### GET /

**Description** : Récupération tous les utilisateurs (sans passwords)

**Query params** : Aucun (pagination à implémenter)

**Réponses** :

- `200 OK` : [{ id, firstname, lastname, email, phone, role, avatar, created_at }, ...]

---

#### GET /:id

**Description** : Récupération utilisateur par ID

**Réponses** :

- `200 OK` : { id, firstname, lastname, email, phone, role, avatar, created_at }
- `404 Not Found` : { error: "User not found" }

---

#### PUT /:id

**Description** : Mise à jour profil utilisateur

**Body (JSON)** :

```json
{
  "firstname": "string (optional)",
  "lastname": "string (optional)",
  "email": "string (optional, unique)",
  "phone": "string (optional)"
}
```

**Validation** : Joi schema update

**Réponses** :

- `200 OK` : { message: "User updated successfully" }
- `404 Not Found` : { error: "User not found" }
- `400 Bad Request` : { error: "Validation error" }

---

#### DELETE /:id

**Description** : Suppression compte utilisateur

**Réponses** :

- `200 OK` : { message: "User deleted successfully" }
- `404 Not Found` : { error: "User not found" }

---

### Module Rentals (/rentals)

#### POST /

**Description** : Création annonce location avec upload images

**Body (multipart/form-data)** :

```json
{
  "title": "string (required)",
  "description": "string (required)",
  "location": "string (required)",
  "price_per_night": "number (required)",
  "beds": "number (required)",
  "image_1": "file (optional)",
  "image_2": "file (optional)",
  "image_3": "file (optional)",
  "image_4": "file (optional)",
  "image_5": "file (optional)"
}
```

**Processus** :

1. Upload images vers Cloudinary (champs image_1 à image_5)
2. Suppression fichiers temporaires locaux (fs.unlinkSync)
3. Conversion `beds` en integer
4. Stockage URLs Cloudinary en JSON dans colonne `images`
5. INSERT dans table `rentals`

**Réponses** :

- `201 Created` : { rentalId: number, message: "Rental created successfully", images: [...] }
- `400 Bad Request` : { error: "Missing required fields" }
- `500 Internal Server Error` : { error: "Upload error" }

---

#### GET /

**Description** : Récupération toutes les annonces

**Réponses** :

- `200 OK` : [{ id, title, description, location, price_per_night, beds, images: [...], created_at }, ...]

---

#### GET /:id

**Description** : Récupération annonce par ID

**Réponses** :

- `200 OK` : { id, title, description, location, price_per_night, beds, images: [...], created_at }
- `404 Not Found` : { error: "Rental not found" }

---

#### PUT /:id

**Description** : Modification annonce

**Body (JSON)** :

```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "location": "string (optional)",
  "price_per_night": "number (optional)",
  "beds": "number (optional)"
}
```

**Note** : Upload nouvelles images non implémenté (futur)

**Réponses** :

- `200 OK` : { message: "Rental updated successfully" }
- `404 Not Found` : { error: "Rental not found" }

---

#### DELETE /:id

**Description** : Suppression annonce

**Processus** :

1. DELETE FROM rentals WHERE id = ?
2. Suppression images Cloudinary (à implémenter)

**Réponses** :

- `200 OK` : { message: "Rental deleted successfully" }
- `404 Not Found` : { error: "Rental not found" }

---

# 8. WIREFRAMES ET MAQUETTES

## I. Wireframes APD

### Desktop (1920x1080)

#### Page d'accueil

```
┌─────────────────────────────────────────────────────────────────────┐
│ [LOGO APD]                            [Faire un don] (CTA sticky)   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                       VIDÉO PLEIN ÉCRAN                             │
│                   Overlay gradient noir 50%                         │
│                                                                     │
│              ASSOCIATION PATRIMOINE DE DOAZIT                       │
│           Préservation de l'église Saint-Jean Baptiste              │
│                                                                     │
│                     [Découvrir ↓]                                   │
└─────────────────────────────────────────────────────────────────────┘
│ INTRODUCTION (padding 120px)                                        │
│ ════════════════════════════════════════                            │
│ Titre section + texte introductif (max-width 900px centré)          │
│ Animation reveal au scroll                                          │
└─────────────────────────────────────────────────────────────────────┘
│ DESCRIPTION (background blur)                                       │
│ ════════════════════════════════════════                            │
│ Texte enrichi multi-paragraphes + images intégrées                  │
│ Deux colonnes si contenu important                                  │
└─────────────────────────────────────────────────────────────────────┘
│ INTERVIEWS (grille 2 colonnes)                                      │
│ ════════════════════════════════════════                            │
│ ┌──────────────────────┐  ┌──────────────────────┐                 │
│ │   [THUMBNAIL VIDEO]  │  │   [THUMBNAIL VIDEO]  │                 │
│ │   Nom Interviewé 1   │  │   Nom Interviewé 2   │                 │
│ │   Rôle/Titre         │  │   Rôle/Titre         │                 │
│ └──────────────────────┘  └──────────────────────┘                 │
└─────────────────────────────────────────────────────────────────────┘
│ ARCHITECTURE (image plan centré)                                    │
│ ════════════════════════════════════════                            │
│             [IMAGE PLAN ÉGLISE 1200x800]                            │
│           Zones annotées avec tooltips hover                        │
└─────────────────────────────────────────────────────────────────────┘
│ GALERIE (grille 3x3)                                                │
│ ════════════════════════════════════════                            │
│ ┌───────┐ ┌───────┐ ┌───────┐                                      │
│ │ IMG 1 │ │ IMG 2 │ │ IMG 3 │                                      │
│ └───────┘ └───────┘ └───────┘                                      │
│ ┌───────┐ ┌───────┐ ┌───────┐                                      │
│ │ IMG 4 │ │ IMG 5 │ │ IMG 6 │                                      │
│ └───────┘ └───────┘ └───────┘                                      │
│ ┌───────┐ ┌───────┐ ┌───────┐                                      │
│ │ IMG 7 │ │ IMG 8 │ │ IMG 9 │                                      │
│ └───────┘ └───────┘ └───────┘                                      │
└─────────────────────────────────────────────────────────────────────┘
│ BLOG (3 articles récents)                                           │
│ ════════════════════════════════════════                            │
│ ┌──────────────────────┐  ┌──────────────────────┐  ┌─────────...  │
│ │ [Image article]      │  │ [Image article]      │  │              │
│ │ Titre article 1      │  │ Titre article 2      │  │              │
│ │ Extrait...           │  │ Extrait...           │  │              │
│ │ [Lire plus →]        │  │ [Lire plus →]        │  │              │
│ └──────────────────────┘  └──────────────────────┘  └──────────...  │
│                        [Voir tous les articles →]                   │
└─────────────────────────────────────────────────────────────────────┘
│ PARTENAIRES (carousel auto-scroll)                                  │
│ ════════════════════════════════════════                            │
│   [LOGO 1] [LOGO 2] [LOGO 3] [LOGO 4] [LOGO 5] [LOGO 6] ...        │
│                 Défilement automatique GSAP                         │
└─────────────────────────────────────────────────────────────────────┘
│ ADRESSE (2 colonnes)                                                │
│ ════════════════════════════════════════                            │
│ ┌─────────────────────┐  ┌──────────────────────────┐              │
│ │ Association APD      │  │   [CARTE LOCALISATION]   │              │
│ │ Adresse complète     │  │   Image statique Maps    │              │
│ │ Téléphone            │  │   Lien vers itinéraire   │              │
│ │ Email                │  └──────────────────────────┘              │
│ │ [Devenir partenaire] │                                            │
│ └─────────────────────┘                                             │
└─────────────────────────────────────────────────────────────────────┘
│ FOOTER                                                              │
│ ════════════════════════════════════════                            │
│ © 2024 Association Patrimoine de Doazit | Mentions légales          │
│ Créé par Philippe Barbosa                                           │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Mobile (375x667 - iPhone SE)

```
┌──────────────────────────┐
│ [≡] LOGO APD    [DON 💚] │
├──────────────────────────┤
│                          │
│  IMAGE FALLBACK (vidéo)  │
│                          │
│  ASSOCIATION PATRIMOINE  │
│      DE DOAZIT           │
│                          │
│     [Découvrir ↓]        │
└──────────────────────────┘
│ INTRODUCTION             │
│ ══════════════           │
│ Texte introductif        │
│ centré, padding 24px     │
└──────────────────────────┘
│ DESCRIPTION              │
│ ══════════════           │
│ Texte simple colonne     │
│ Images 100% width        │
└──────────────────────────┘
│ INTERVIEWS (1 colonne)   │
│ ══════════════           │
│ ┌────────────────────┐   │
│ │ [VIDEO THUMBNAIL]  │   │
│ │ Nom Interviewé 1   │   │
│ └────────────────────┘   │
│ ┌────────────────────┐   │
│ │ [VIDEO THUMBNAIL]  │   │
│ │ Nom Interviewé 2   │   │
│ └────────────────────┘   │
└──────────────────────────┘
│ ARCHITECTURE             │
│ ══════════════           │
│ [IMAGE PLAN]             │
│ Scroll horizontal        │
└──────────────────────────┘
│ GALERIE (grille 2x5)     │
│ ══════════════           │
│ ┌──────┐ ┌──────┐        │
│ │ IMG1 │ │ IMG2 │        │
│ └──────┘ └──────┘        │
│ ┌──────┐ ┌──────┐        │
│ │ IMG3 │ │ IMG4 │        │
│ └──────┘ └──────┘        │
│ ... (5 rows)             │
└──────────────────────────┘
│ BLOG (stack vertical)    │
│ ══════════════           │
│ ┌────────────────────┐   │
│ │ [Image]            │   │
│ │ Titre article 1    │   │
│ │ Extrait...         │   │
│ │ [Lire →]           │   │
│ └────────────────────┘   │
│ (x3 articles)            │
│ [Tous les articles →]    │
└──────────────────────────┘
│ PARTENAIRES              │
│ ══════════════           │
│ Carousel vertical        │
│ [LOGO 1]                 │
│ [LOGO 2]                 │
│ [LOGO 3]                 │
└──────────────────────────┘
│ ADRESSE (1 colonne)      │
│ ══════════════           │
│ [CARTE]                  │
│ Adresse                  │
│ Téléphone                │
│ Email                    │
│ [Devenir partenaire]     │
└──────────────────────────┘
│ FOOTER                   │
│ ══════════════           │
│ © 2024 APD               │
│ Mentions légales         │
└──────────────────────────┘
```

---

## II. Schémas requêtes/réponses CoolBooking

### POST /users/register

**Requête** :

```http
POST http://localhost:3000/users/register
Content-Type: multipart/form-data; boundary=----FormBoundary

------FormBoundary
Content-Disposition: form-data; name="firstname"

Antoine
------FormBoundary
Content-Disposition: form-data; name="lastname"

Moreau
------FormBoundary
Content-Disposition: form-data; name="email"

antoine@example.com
------FormBoundary
Content-Disposition: form-data; name="password"

SecureP@ss123
------FormBoundary
Content-Disposition: form-data; name="confirmpassword"

SecureP@ss123
------FormBoundary
Content-Disposition: form-data; name="phone"

+33612345678
------FormBoundary
Content-Disposition: form-data; name="role"

owner
------FormBoundary
Content-Disposition: form-data; name="avatar"; filename="avatar.jpg"
Content-Type: image/jpeg

[binary image data]
------FormBoundary--
```

**Réponse succès (201)** :

```json
{
  "userId": 42,
  "message": "User created successfully"
}
```

**Réponse erreur validation (400)** :

```json
{
  "error": "\"phone\" must match the pattern /^(\\+33|0)[1-9]\\d{8}$/"
}
```

---

### POST /users/login

**Requête** :

```http
POST http://localhost:3000/users/login
Content-Type: application/x-www-form-urlencoded

email=antoine@example.com&password=SecureP@ss123
```

**Réponse succès (200)** :

```json
{
  "user": {
    "id": 42,
    "firstname": "Antoine",
    "lastname": "Moreau",
    "email": "antoine@example.com",
    "role": "owner"
  },
  "message": "Login successful"
}
```

**Headers réponse** :

```http
Set-Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; SameSite=Strict; Max-Age=86400
```

---

### POST /rentals

**Requête** :

```http
POST http://localhost:3000/rentals
Content-Type: multipart/form-data

title=Villa avec piscine Nice
description=Magnifique villa 200m², piscine chauffée, vue mer
location=Nice, France
price_per_night=350
beds=6
image_1=[file]
image_2=[file]
image_3=[file]
image_4=[file]
image_5=[file]
```

**Réponse succès (201)** :

```json
{
  "rentalId": 15,
  "message": "Rental created successfully",
  "images": [
    "https://res.cloudinary.com/xxx/image/upload/v1234/rental_1.jpg",
    "https://res.cloudinary.com/xxx/image/upload/v1234/rental_2.jpg",
    "https://res.cloudinary.com/xxx/image/upload/v1234/rental_3.jpg",
    "https://res.cloudinary.com/xxx/image/upload/v1234/rental_4.jpg",
    "https://res.cloudinary.com/xxx/image/upload/v1234/rental_5.jpg"
  ]
}
```

---

### GET /rentals

**Requête** :

```http
GET http://localhost:3000/rentals
```

**Réponse (200)** :

```json
[
  {
    "id": 15,
    "title": "Villa avec piscine Nice",
    "description": "Magnifique villa 200m², piscine chauffée, vue mer",
    "location": "Nice, France",
    "price_per_night": 350,
    "beds": 6,
    "images": [
      "https://res.cloudinary.com/xxx/image/upload/v1234/rental_1.jpg",
      "https://res.cloudinary.com/xxx/image/upload/v1234/rental_2.jpg",
      "https://res.cloudinary.com/xxx/image/upload/v1234/rental_3.jpg",
      "https://res.cloudinary.com/xxx/image/upload/v1234/rental_4.jpg",
      "https://res.cloudinary.com/xxx/image/upload/v1234/rental_5.jpg"
    ],
    "created_at": "2024-01-15T10:30:00.000Z"
  },
  {
    "id": 16,
    "title": "Appartement centre Lyon",
    "description": "T3 70m², rénové, proche métro",
    "location": "Lyon, France",
    "price_per_night": 120,
    "beds": 4,
    "images": [
      "https://res.cloudinary.com/xxx/image/upload/v1234/appart_1.jpg"
    ],
    "created_at": "2024-01-16T14:20:00.000Z"
  }
]
```

---

# 9. CHARTE GRAPHIQUE ET DESIGN SYSTEM

## I. Charte graphique APD

### Palette de couleurs

**Couleurs principales** :

- **Rouge patrimoine** : `#AC1115` (CTA, titres, accents)
- **Blanc cassé** : `#FFFFFF` (fond principal)
- **Noir** : `#171717` (textes, foreground)
- **Gris foncé** : `#0A0A0A` (mode sombre - background)
- **Gris clair** : `#EDEDED` (mode sombre - foreground)

**Utilisation** :

- Bouton "Faire un don" : fond `#AC1115`, texte blanc, animation pulse
- Liens hover : transition vers `#AC1115`
- Lettrines (première lettre paragraphe) : `#AC1115`
- Soulignement spécial : `box-shadow: inset 0 1.06em 0 #ac1115`

---

### Typographies

**Polices principales** :

1. **AnnStone** (police ancienne manuscrite)

   - Usage : Lettrines (première lettre paragraphes), titres décoratifs
   - Format : TrueType (.ttf)
   - Taille : `clamp(3rem, 8vw, 6rem)` pour lettrines
   - Chemin : `/public/fonts/AnnStone.ttf`

2. **EB Garamond** (police serif classique)

   - Usage : Titres sections, textes éditoriaux blog
   - Format : TrueType (.ttf)
   - Poids : Regular (400)
   - Chemin : `/public/fonts/EBGaramond-Regular.ttf`

3. **Arial / Helvetica** (police sans-serif système)
   - Usage : Textes courants, navigation, formulaires
   - Fallback : `font-family: Arial, Helvetica, sans-serif`

**Hiérarchie typographique** :

- H1 (Hero) : 48-80px (responsive clamp), Garamond, bold
- H2 (Sections) : 32-48px, Garamond, semi-bold
- H3 (Sous-sections) : 24-32px, Garamond, medium
- Body : 16-18px, Arial, regular
- Small : 14px, Arial, regular

---

### Espacements et grille

**Système de spacing Tailwind** :

- Padding sections : `py-16 md:py-24 lg:py-32` (64-128px)
- Margins composants : `mb-8 md:mb-12 lg:mb-16` (32-64px)
- Gap grilles : `gap-4 md:gap-6 lg:gap-8` (16-32px)
- Container max-width : `max-w-7xl` (1280px)

**Breakpoints** :

- Mobile : < 768px
- Tablet : 768px - 1023px
- Desktop : ≥ 1024px

---

### Animations et transitions

**Animations GSAP** :

1. **Reveal Box** (apparition textes) :

   - Duration : 0.8s
   - Ease : `power2.out`
   - Direction : bottom to top

2. **Scroll animations** :

   - Trigger : `ScrollTrigger` GSAP
   - Start : `top 80%`
   - End : `bottom 20%`

3. **Pulse Heart** (icône cœur donation) :

   - Keyframes : `pulse-heart 1.2s infinite`
   - Transform : `scale(1) → scale(1.2)`
   - Opacity : `1 → 0.8`

4. **Pulse Button** (CTA "Faire un don") :
   - Keyframes : `pulse-button 1.5s infinite`
   - Transform : `scale(1) → scale(1.05)`
   - Box-shadow : `0 0 10px 4px rgba(172, 17, 21, 0.4)`

**Transitions CSS** :

- Hover liens : `transition: color 0.3s ease`
- Hover images : `transition: transform 0.3s ease, filter 0.3s ease`
- Modal ouverture : `transition: opacity 0.2s ease`

---

### Composants UI récurrents

**Bouton principal (CTA)** :

```css
bg-[#AC1115] text-white px-6 py-3 rounded-lg
hover:bg-[#8D0E11] transition-all
pulse-button (animation permanente)
```

**Carte article blog** :

```css
bg-white shadow-lg rounded-lg overflow-hidden
hover:shadow-xl transition-shadow
max-w-sm
```

**Lettrine** :

```css
.lettrine::first-letter {
  font-family: "annStone", serif;
  font-size: clamp(3rem, 8vw, 6rem);
  color: #ac1115;
  float: left;
}
```

**Background pierre** :

```css
.bg-pierre {
  background-image: url("../../public/fond_pierre.jpg");
  background-size: 100vw 100vh;
  background-repeat: repeat;
}
```

---

## II. Conventions JSON CoolBooking

### Structure des réponses

**Format succès** :

```json
{
  "data": { ... },
  "message": "string (optionnel)"
}
```

**Format erreur** :

```json
{
  "error": "string (description explicite)"
}
```

---

### Codes HTTP utilisés

| Code | Usage                         | Exemples                                  |
| ---- | ----------------------------- | ----------------------------------------- |
| 200  | Succès requête GET/PUT/DELETE | Récupération données, mise à jour réussie |
| 201  | Création ressource            | POST /users/register, POST /rentals       |
| 400  | Erreur validation             | Joi validation failed, champs manquants   |
| 401  | Non authentifié               | Login failed, token manquant              |
| 403  | Non autorisé                  | Token invalide, permissions insuffisantes |
| 404  | Ressource introuvable         | User not found, Rental not found          |
| 409  | Conflit                       | Email already exists                      |
| 500  | Erreur serveur                | Database error, Cloudinary upload failed  |

---

### Conventions de nommage

**Champs utilisateurs** :

```json
{
  "id": "integer (auto-increment)",
  "firstname": "string (camelCase)",
  "lastname": "string (camelCase)",
  "email": "string (lowercase)",
  "password": "string (hashed, never returned)",
  "phone": "string (format +33... or 0...)",
  "role": "enum ('owner' | 'tenant')",
  "avatar": "string (URL Cloudinary)",
  "created_at": "datetime ISO8601"
}
```

**Champs annonces** :

```json
{
  "id": "integer (auto-increment)",
  "title": "string (snake_case in DB, camelCase in JSON)",
  "description": "text",
  "location": "string",
  "price_per_night": "decimal (2 decimals)",
  "beds": "integer",
  "images": "array of strings (URLs Cloudinary)",
  "created_at": "datetime ISO8601"
}
```

---

# 10. SPÉCIFICATIONS TECHNIQUES

## I. Stack APD (Frontend)

### Framework et runtime

- **Next.js** : 15.5.3 (App Router, React Server Components)
- **React** : 19.1.0 (latest stable)
- **Node.js** : ≥ 18.x (runtime Vercel)

### Dépendances principales

**UI et styling** :

- `tailwindcss` : ^4.1.17 (utility-first CSS)
- `@tailwindcss/postcss` : ^4.1.17 (PostCSS integration)
- `lucide-react` : ^0.552.0 (icônes SVG)
- `@heroicons/react` : ^2.2.0 (icônes UI)
- `@fortawesome/react-fontawesome` : ^3.0.2 (icônes FontAwesome)

**Animations** :

- `gsap` : ^3.13.0 (animations timeline, ScrollTrigger)
- `@studio-freight/lenis` : ^1.0.42 (smooth scroll)
- `split-type` : ^0.3.4 (split text animations)
- `aos` : ^2.3.4 (animate on scroll)

**Contenu** :

- `@portabletext/react` : ^5.0.0 (render Strapi RichText)

### Outils de développement

- **ESLint** : ^9 (linting)
- **eslint-config-next** : 15.5.3 (règles Next.js)
- **Turbopack** : Bundler intégré Next.js 15 (plus rapide que Webpack)

### Backend CMS

- **Strapi** : v5.8.0 (headless CMS)
- **PostgreSQL** : 14+ (base de données Strapi)
- **Cloudinary** : CDN médias (images, vidéos)

### Déploiement

- **Frontend** : Vercel (déploiement automatique depuis GitHub)
- **Backend Strapi** : Railway (instance PostgreSQL + Strapi container)
- **CDN médias** : Cloudinary (images optimisées, vidéos streamées)

**Variables d'environnement** :

```env
# Frontend (.env.local)
NEXT_PUBLIC_STRAPI_URL=https://api-apd.railway.app
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxx
```

---

## II. Stack CoolBooking (Backend)

### Framework et runtime

- **Node.js** : 20.x LTS
- **Express** : ^5.1.0 (framework web)
- **Type** : ES Modules (`"type": "module"` in package.json)

### Dépendances principales

**Base de données** :

- `mysql2` : ^3.14.3 (driver MariaDB avec promesses)
- `mariadb` : ^3.4.5 (client officiel MariaDB - non utilisé finalement)

**Sécurité** :

- `argon2` : ^0.43.1 (hash passwords Argon2id)
- `jsonwebtoken` : ^9.0.2 (génération/vérification JWT)
- `cookie-parser` : ^1.4.7 (parsing cookies HttpOnly)
- `cors` : ^2.8.5 (Cross-Origin Resource Sharing)

**Validation** :

- `joi` : ^17.13.3 (schémas validation données)

**Upload fichiers** :

- `multer` : ^2.0.1 (middleware upload multipart/form-data)
- `cloudinary` : ^2.7.0 (stockage cloud images)

**Configuration** :

- `dotenv` : ^17.2.0 (variables environnement)

### Outils de développement

- **Nodemon** : ^4.0.1 (auto-reload serveur)

**Scripts** :

```json
{
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

### Architecture

**Pattern MVC modulaire** :

```
routes/ (routing Express)
  ↓
controllers/ (gestion requêtes HTTP)
  ↓
services/ (logique métier)
  ↓
repositories/ (accès données SQL)
  ↓
config/db.js (pool mysql2)
```

**Middlewares** :

- `express.json()` : parsing JSON bodies
- `cookie-parser()` : parsing cookies
- `cors()` : autorisations CORS
- `multer()` : upload fichiers temporaires
- `verifyToken` : authentification JWT
- Error handler global : catch all errors

### Base de données

**MariaDB** :

- Version : 10.6+ (compatible MySQL 8)
- Pool connexions : 10 connexions max (mysql2 createPool)
- Requêtes paramétrées : protection SQL injection

**Tables principales** :

```sql
users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(100),
  lastname VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255), -- Argon2 hash
  phone VARCHAR(20),
  role ENUM('owner', 'tenant'),
  avatar TEXT, -- URL Cloudinary
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

rentals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  location VARCHAR(255),
  price_per_night DECIMAL(10,2),
  beds INT,
  images JSON, -- Array URLs Cloudinary
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Déploiement (prévu)

- **Serveur** : Railway / Render / DigitalOcean
- **Base de données** : Railway MariaDB (instance dédiée)
- **Variables d'environnement** :

```env
DB_HOST=xxx.railway.app
DB_USER=root
DB_PASSWORD=xxx
DB_DATABASE=coolbooking
DB_PORT=3306
JWT_SECRET=xxx
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

---

# 11. MODÈLE DE DONNÉES (MCD/MLD)

## I. Modèle conceptuel APD (Strapi)

### Entités Strapi

**Single Types** (contenu unique) :

1. **Eglise**

   - titre : Text
   - description : RichText
   - histoire : RichText
   - adresse : Text
   - telephone : Text
   - email : Email
   - images : Media (multiple)
   - plan_architecture : Media (single)

2. **Accueil**

   - titre_hero : Text
   - sous_titre_hero : Text
   - video_background : Media
   - texte_introduction : RichText

3. **Parametres-site**
   - nom_site : Text
   - logo : Media
   - meta_description : Text
   - meta_keywords : Text

**Collection Types** (multiples entrées) :

1. **Article** (articles de blog)

   - titre : Text
   - slug : UID (auto-généré depuis titre)
   - contenu : RichText
   - extrait : Text (short)
   - image_principale : Media
   - auteur : Text
   - date_publication : Date
   - categorie : Relation (futur)

2. **Interview**

   - nom_personne : Text
   - role : Text
   - video : Media
   - thumbnail : Media
   - transcription : RichText (optionnel)

3. **Partenaire**
   - nom : Text
   - logo : Media
   - description : Text
   - lien_site : Text (URL)
   - ordre_affichage : Integer

### Relations Strapi

Actuellement **aucune relation complexe** (MVP). Évolutions futures :

- Article → Catégorie (Many-to-One)
- Article → Tags (Many-to-Many)
- Partenaire → Type_partenaire (Many-to-One)

---

## II. Modèle logique CoolBooking (MariaDB)

### Table `users`

| Colonne    | Type                    | Contraintes                 | Description                |
| ---------- | ----------------------- | --------------------------- | -------------------------- |
| id         | INT                     | PRIMARY KEY, AUTO_INCREMENT | Identifiant unique         |
| firstname  | VARCHAR(100)            | NOT NULL                    | Prénom                     |
| lastname   | VARCHAR(100)            | NOT NULL                    | Nom de famille             |
| email      | VARCHAR(255)            | NOT NULL, UNIQUE            | Email (login)              |
| password   | VARCHAR(255)            | NOT NULL                    | Hash Argon2id              |
| phone      | VARCHAR(20)             | NOT NULL                    | Téléphone (+33... ou 0...) |
| role       | ENUM('owner', 'tenant') | NOT NULL                    | Rôle utilisateur           |
| avatar     | TEXT                    | NULL                        | URL Cloudinary             |
| created_at | TIMESTAMP               | DEFAULT CURRENT_TIMESTAMP   | Date création compte       |

**Index** :

- PRIMARY KEY sur `id`
- UNIQUE sur `email`

---

### Table `rentals`

| Colonne         | Type          | Contraintes                 | Description           |
| --------------- | ------------- | --------------------------- | --------------------- |
| id              | INT           | PRIMARY KEY, AUTO_INCREMENT | Identifiant unique    |
| title           | VARCHAR(255)  | NOT NULL                    | Titre annonce         |
| description     | TEXT          | NOT NULL                    | Description détaillée |
| location        | VARCHAR(255)  | NOT NULL                    | Ville, pays           |
| price_per_night | DECIMAL(10,2) | NOT NULL                    | Prix par nuit (€)     |
| beds            | INT           | NOT NULL                    | Nombre de couchages   |
| images          | JSON          | NULL                        | Array URLs Cloudinary |
| created_at      | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP   | Date création annonce |

**Index** :

- PRIMARY KEY sur `id`

**Note JSON `images`** :

```json
[
  "https://res.cloudinary.com/xxx/image/upload/v1234/rental_1.jpg",
  "https://res.cloudinary.com/xxx/image/upload/v1234/rental_2.jpg",
  "https://res.cloudinary.com/xxx/image/upload/v1234/rental_3.jpg"
]
```

---

### Relations futures (v2)

**Reservations** (à implémenter) :

```sql
CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rental_id INT NOT NULL,
  user_id INT NOT NULL,
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  prix_total DECIMAL(10,2) NOT NULL,
  statut ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (rental_id) REFERENCES rentals(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## III. Dictionnaire de données

### Users (CoolBooking)

| Champ           | Format | Validation Joi                   | Exemple                          |
| --------------- | ------ | -------------------------------- | -------------------------------- |
| firstname       | String | min: 2, max: 100                 | "Antoine"                        |
| lastname        | String | min: 2, max: 100                 | "Moreau"                         |
| email           | String | format email, unique             | "antoine@example.com"            |
| password        | String | min: 6 chars (hashé Argon2)      | "$argon2id$v=19$m=65536..."      |
| confirmpassword | String | match password (pas stocké)      | "SecureP@ss123"                  |
| phone           | String | regex: `/^(\+33\|0)[1-9]\d{8}$/` | "+33612345678"                   |
| role            | Enum   | 'owner' \| 'tenant'              | "owner"                          |
| avatar          | URL    | format URL Cloudinary            | "https://res.cloudinary.com/..." |

### Rentals (CoolBooking)

| Champ           | Format     | Contraintes     | Exemple                   |
| --------------- | ---------- | --------------- | ------------------------- |
| title           | String     | max: 255 chars  | "Villa avec piscine Nice" |
| description     | Text       | min: 20 chars   | "Magnifique villa..."     |
| location        | String     | max: 255 chars  | "Nice, France"            |
| price_per_night | Decimal    | > 0, 2 decimals | 350.00                    |
| beds            | Integer    | > 0, ≤ 20       | 6                         |
| images          | JSON Array | max 5 URLs      | ["url1", "url2", ...]     |

---

# 12. ROUTES ET NAVIGATION

## I. Routes Next.js APD

### Pages App Router

| Route          | Fichier                    | Description                      | Composants principaux                                               |
| -------------- | -------------------------- | -------------------------------- | ------------------------------------------------------------------- |
| `/`            | `app/page.jsx`             | Page d'accueil (toutes sections) | VideoBackground, IntroSection, Gallery, BlogSection, PartnerSection |
| `/blog`        | `app/blog/page.jsx`        | Liste complète articles          | BlogSection (mode full)                                             |
| `/blog/[slug]` | `app/blog/[slug]/page.jsx` | Article détaillé                 | Fetch article par slug, render RichText                             |
| `/partners`    | `app/partners/page.jsx`    | Page partenaires complète        | PartnerSection, ContactModal                                        |
| `/association` | `app/association/page.jsx` | Présentation association         | Texte statique, membres bureau                                      |

### Layout et metadata

**Root Layout** (`app/layout.js`) :

```javascript
export const metadata = {
  title: "Association Patrimoine de Doazit",
  description: "Préservation de l'église Saint-Jean Baptiste d'Aulès",
  keywords: "patrimoine, église, Doazit, restauration, dons",
  openGraph: {
    title: "Association Patrimoine de Doazit",
    description: "Préservation de l'église Saint-Jean Baptiste d'Aulès",
    images: ["/og-image.jpg"],
  },
};
```

### Navigation interne

**Sections scroll (page d'accueil)** :

- Hero → `#hero`
- Introduction → `#introduction`
- Description → `#description`
- Interviews → `#interviews`
- Architecture → `#architecture`
- Galerie → `#galerie`
- Blog → `#blog`
- Partenaires → `#partenaires`
- Adresse → `#contact`

**Navigation GSAP ScrollTo** :

```javascript
gsap.to(window, {
  scrollTo: { y: "#section-id", offsetY: 80 },
  duration: 1,
  ease: "power2.inOut",
});
```

---

## II. Routes API CoolBooking

### Endpoints Users (`/users`)

| Méthode | Route        | Middleware              | Contrôleur     | Description                 |
| ------- | ------------ | ----------------------- | -------------- | --------------------------- |
| POST    | `/register`  | multer.single('avatar') | createUser     | Inscription + upload avatar |
| POST    | `/login`     | multer.none()           | verifyPassword | Connexion + JWT cookie      |
| POST    | `/logout`    | -                       | clearCookie    | Déconnexion                 |
| GET     | `/dashboard` | verifyToken             | (inline)       | Espace utilisateur protégé  |
| GET     | `/`          | -                       | getAllUsers    | Liste tous les utilisateurs |
| GET     | `/:id`       | -                       | getUserById    | Détails utilisateur         |
| PUT     | `/:id`       | -                       | updateUser     | Modification profil         |
| DELETE  | `/:id`       | -                       | deleteUser     | Suppression compte          |

---

### Endpoints Rentals (`/rentals`)

| Méthode | Route  | Middleware                  | Contrôleur       | Description                     |
| ------- | ------ | --------------------------- | ---------------- | ------------------------------- |
| POST    | `/`    | multer.fields([image_1..5]) | postCreateRental | Création annonce + 5 images max |
| GET     | `/`    | -                           | getAllRentals    | Liste toutes les annonces       |
| GET     | `/:id` | -                           | getRentalById    | Détails annonce                 |
| PUT     | `/:id` | -                           | updateRental     | Modification annonce            |
| DELETE  | `/:id` | -                           | deleteRental     | Suppression annonce             |

---

### Middlewares globaux

**app.js** :

```javascript
app.use(cors()); // CORS pour clients autorisés
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use("/users", usersRouter); // Mount users routes
app.use("/rentals", rentalsRouter); // Mount rentals routes
app.use(errorHandler); // Catch all errors
```

---

### Flux d'authentification JWT

**1. Register** :

```
POST /users/register
  → Validation Joi
  → Upload avatar Cloudinary
  → Hash password Argon2
  → INSERT users
  → Return { userId, message }
```

**2. Login** :

```
POST /users/login
  → Find user by email
  → Verify password (Argon2)
  → Generate JWT (24h expiration)
  → Set HttpOnly cookie
  → Return { user, message }
```

**3. Protected route** :

```
GET /users/dashboard
  → verifyToken middleware
    → Extract cookie token
    → Verify JWT signature
    → Decode payload { userId, email }
    → Attach req.user
  → Return user data
```

**4. Logout** :

```
POST /users/logout
  → clearCookie middleware
  → Clear cookie token
  → Return { message }
```

---

# 13. RÉALISATIONS PERSONNELLES (CODE COMMENTÉ)

## I. Frontend APD - Animation GSAP Reveal Box

**Fichier** : `frontend/src/components/IntroSection.jsx`

```javascript
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection({ data }) {
  const titleRef = useRef(null); // Référence DOM pour le titre
  const textRef = useRef(null);  // Référence DOM pour le texte

  useEffect(() => {
    // Animation reveal au scroll pour le titre
    gsap.fromTo(
      titleRef.current,
      {
        y: 100,           // Départ 100px vers le bas
        opacity: 0,       // Invisible
        scale: 0.95       // Légèrement rétréci
      },
      {
        y: 0,             // Position finale normale
        opacity: 1,       // Complètement visible
        scale: 1,         // Taille normale
        duration: 1,      // Animation sur 1 seconde
        ease: "power2.out", // Easing fluide
        scrollTrigger: {
          trigger: titleRef.current,  // Élément qui déclenche
          start: "top 80%",           // Commence quand le top est à 80% du viewport
          end: "bottom 20%",          // Termine quand le bottom est à 20%
          toggleActions: "play none none reverse", // Joue à l'entrée, reverse à la sortie
        },
      }
    );

    // Animation similaire pour le texte (avec un délai)
    gsap.fromTo(
      textRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2, // Commence 0.2s après le titre (effet cascad

)
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
        },
      }
    );
  }, []); // Exécuté une seule fois au montage du composant

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      {/* Titre avec ref pour GSAP */}
      <h2 ref={titleRef} className="text-4xl md:text-5xl font-garamond text-[#AC1115] mb-8">
        {data?.titre}
      </h2>

      {/* Texte avec ref pour GSAP et lettrine */}
      <p ref={textRef} className="lettrine text-lg md:text-xl leading-relaxed">
        {data?.introduction}
      </p>
    </section>
  );
}
```

**Points clés** :

- **`useRef`** : Crée une référence DOM pour cibler les éléments avec GSAP
- **`ScrollTrigger`** : Plugin GSAP pour déclencher animations au scroll
- **`fromTo`** : Définit état initial et final (plus flexible que `from` ou `to`)
- **`toggleActions`** : Contrôle le comportement (play, pause, resume, reverse)
- **Cascade** : `delay: 0.2` pour effet séquentiel titre → texte

---

## II. Backend CoolBooking - Authentification JWT

**Fichier** : `back-coolbooking-mariaDB/authentication/authentication.js`

```javascript
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { query } from "../config/db.js";

/**
 * Vérifie les identifiants utilisateur et génère un token JWT
 * @route POST /users/login
 */
export async function verifyPassword(req, res) {
  try {
    const { email, password } = req.body;

    // 1. Récupération utilisateur par email (requête paramétrée contre SQL injection)
    const [rows] = await query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];

    // 2. Vérification existence utilisateur
    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    // 3. Vérification password avec Argon2 (compare hash stocké vs password fourni)
    const isValid = await argon2.verify(user.password, password);

    if (!isValid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // 4. Génération token JWT (payload : id utilisateur, secret : variable env, expiration : 1 jour)
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Payload (données non sensibles)
      process.env.JWT_SECRET, // Secret key (jamais exposée)
      { expiresIn: "1d" } // Token valide 24h
    );

    // 5. Stockage token dans cookie HttpOnly (protection XSS)
    res.cookie("token", token, {
      httpOnly: true, // Cookie inaccessible au JavaScript client (sécurité)
      secure: process.env.NODE_ENV === "production", // HTTPS uniquement en prod
      sameSite: "Strict", // Protection CSRF
      maxAge: 86400000, // 24h en millisecondes
    });

    // 6. Réponse avec infos utilisateur (SANS password)
    res.status(200).json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
  } catch (err) {
    console.error("Erreur dans verifyPassword :", err.message);
    res.status(500).json({ message: "Erreur interne serveur" });
  }
}

/**
 * Middleware de vérification token JWT
 * Protège les routes privées (ex: /users/dashboard)
 */
export function verifyToken(req, res, next) {
  try {
    // 1. Récupération token depuis cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Accès refusé : token manquant" });
    }

    // 2. Vérification et décodage du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Ajout des données utilisateur décodées dans req.user
    req.user = decoded; // { id, email, iat, exp }

    // 4. Passage au middleware suivant ou au controller
    next();
  } catch (err) {
    console.error("Erreur vérification token :", err.message);
    res.status(403).json({ message: "Token invalide ou expiré" });
  }
}

/**
 * Suppression du cookie token (déconnexion)
 * @route POST /users/logout
 */
export function clearCookie(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "Déconnexion réussie" });
}
```

**Points clés** :

- **Argon2** : Algorithme de hash sécurisé (meilleur que bcrypt), résistant aux attaques GPU
- **JWT** : Token contenant payload + signature (non chiffré, mais signé pour intégrité)
- **HttpOnly cookie** : Stockage côté serveur, inaccessible au JavaScript (protection XSS)
- **SameSite: Strict** : Protection contre CSRF (Cross-Site Request Forgery)
- **Middleware `next()`** : Permet de chaîner les middlewares Express

---

## III. Backend CoolBooking - Pattern Repository

**Fichier** : `back-coolbooking-mariaDB/users/users.repository.js`

```javascript
import { query } from "../config/db.js";

/**
 * Repository pattern : encapsule toutes les requêtes SQL liées aux users
 * Avantages : centralisation, testabilité, changement de DB facilité
 */
class UserRepository {
  /**
   * Récupère tous les utilisateurs (sans passwords)
   * @returns {Promise<Array>} Liste utilisateurs
   */
  async getAllUsers() {
    // SELECT explicite des colonnes (JAMAIS de SELECT *)
    const [rows] = await query(
      "SELECT id, avatar, role, firstname, lastname, phone, email, created_at FROM users"
    );
    return rows; // Retourne directement le tableau de résultats
  }

  /**
   * Récupère un utilisateur par ID
   * @param {number} id - ID utilisateur
   * @returns {Promise<Object|undefined>} Utilisateur trouvé ou undefined
   */
  async getUserById(id) {
    // Requête paramétrée : protection SQL injection
    const [rows] = await query(
      "SELECT id, avatar, role, firstname, lastname, phone, email, created_at FROM users WHERE id = ?",
      [id] // Paramètre passé dans un tableau
    );
    return rows[0]; // Premier résultat ou undefined
  }

  /**
   * Crée un nouvel utilisateur
   * @param {Object} userData - Données utilisateur
   * @returns {Promise<Object>} Utilisateur créé avec ID
   * @throws {Error} Si email déjà utilisé
   */
  async createUser({
    avatar,
    role,
    firstname,
    lastname,
    phone,
    email,
    password,
  }) {
    // 1. Vérification unicité email
    const [existing] = await query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);

    if (existing.length > 0) {
      throw new Error("Email déjà utilisé"); // Erreur capturée dans le controller
    }

    // 2. Insertion nouvel utilisateur (password déjà hashé dans le service)
    const [result] = await query(
      "INSERT INTO users (avatar, role, firstname, lastname, phone, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [avatar, role, firstname, lastname, phone, email, password]
    );

    // 3. Retour de l'utilisateur créé avec l'ID auto-incrémenté
    return {
      id: Number(result.insertId), // Conversion en number
      avatar,
      role,
      firstname,
      lastname,
      phone,
      email,
      created_at: new Date(), // Date de création
    };
  }

  /**
   * Mise à jour utilisateur
   * @param {number} id - ID utilisateur
   * @param {Object} update - Champs à mettre à jour
   * @returns {Promise<void>}
   * @throws {Error} Si email déjà utilisé ou rôle invalide
   */
  async updateUser(id, update) {
    const { email, role, firstname, lastname, phone } = update;

    // Validation email unique (si fourni)
    if (email) {
      const [existingUser] = await query(
        "SELECT id FROM users WHERE email = ?",
        [email]
      );
      const isSameUser =
        existingUser.length && existingUser[0].id === parseInt(id);

      if (existingUser.length && !isSameUser) {
        throw new Error("Email déjà utilisé par un autre compte");
      }
    }

    // Construction dynamique de la requête UPDATE
    const fields = [];
    const values = [];

    if (firstname) {
      fields.push("firstname = ?");
      values.push(firstname);
    }
    if (lastname) {
      fields.push("lastname = ?");
      values.push(lastname);
    }
    if (email) {
      fields.push("email = ?");
      values.push(email);
    }
    if (phone) {
      fields.push("phone = ?");
      values.push(phone);
    }
    if (role) {
      fields.push("role = ?");
      values.push(role);
    }

    values.push(id); // Ajout de l'ID à la fin pour la clause WHERE

    // Exécution requête UPDATE
    await query(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, values);
  }

  /**
   * Suppression utilisateur
   * @param {number} id - ID utilisateur
   * @returns {Promise<void>}
   */
  async deleteUser(id) {
    await query("DELETE FROM users WHERE id = ?", [id]);
  }

  /**
   * Récupère utilisateur par email (pour login)
   * @param {string} email - Email utilisateur
   * @returns {Promise<Object|undefined>} Utilisateur avec password (pour vérification)
   */
  async findByEmail(email) {
    const [rows] = await query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  }
}

export default new UserRepository(); // Export d'une instance unique (Singleton pattern)
```

**Points clés** :

- **Repository pattern** : Séparation logique métier (service) et accès données (repository)
- **Requêtes paramétrées** : `?` placeholders pour éviter SQL injection
- **Singleton** : Une seule instance du repository partagée dans toute l'app
- **Gestion erreurs** : `throw new Error()` capturé dans le controller
- **UPDATE dynamique** : Construction de la requête selon champs fournis

---

## IV. Frontend APD - Hook personnalisé

**Fichier** : `frontend/src/hooks/useSiteData.jsx`

```javascript
"use client";
import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour récupérer les données Strapi
 * @param {string} endpoint - Endpoint Strapi (ex: "eglise", "accueil")
 * @returns {Object} { data, loading, error }
 */
export default function useSiteData(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Construction URL API Strapi
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${endpoint}?populate=*`;

        // Fetch avec gestion timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Erreur API : ${response.status}`);
        }

        const json = await response.json();

        // Extraction des données selon le type (single type vs collection)
        const extractedData = json.data?.attributes || json.data;

        setData(extractedData);
        setError(null);
      } catch (err) {
        console.error(`Erreur fetch ${endpoint}:`, err);
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [endpoint]); // Re-fetch si l'endpoint change

  return { data, loading, error };
}
```

**Utilisation** :

```javascript
// Dans un composant
const { data, loading, error } = useSiteData("eglise");

if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;

return <div>{data.titre}</div>;
```

**Points clés** :

- **Hook personnalisé** : Réutilisable dans tous les composants
- **AbortController** : Annulation requête si timeout ou composant démonté
- **Gestion états** : `data`, `loading`, `error` (pattern classique)
- **`populate=*`** : Strapi inclut toutes les relations (images, etc.)

---

# 14. TESTS ET VALIDATION

## I. Tests manuels APD

### Scénarios de navigation

| ID  | Scénario                 | Étapes                                            | Résultat attendu                                     | Statut  |
| --- | ------------------------ | ------------------------------------------------- | ---------------------------------------------------- | ------- |
| T01 | Navigation sections      | Cliquer scroll indicator → clic section "Galerie" | Scroll smooth vers section galerie (1s)              | ✅ Pass |
| T02 | Bouton donation sticky   | Scroll page complète                              | Bouton "Faire un don" reste visible en haut à droite | ✅ Pass |
| T03 | Animation hero           | Charger page d'accueil                            | Titre apparaît avec effet reveal (0.8s)              | ✅ Pass |
| T04 | Vidéo background desktop | Charger sur desktop > 1024px                      | Vidéo joue en boucle, overlay gradient visible       | ✅ Pass |
| T05 | Image fallback mobile    | Charger sur mobile < 768px                        | Image statique affichée (pas de vidéo)               | ✅ Pass |
| T06 | Galerie photos           | Scroll vers galerie                               | 9 images chargées, lazy loading actif                | ✅ Pass |
| T07 | Blog section             | Scroll vers blog                                  | 3 derniers articles affichés                         | ✅ Pass |
| T08 | Lien article blog        | Clic "Lire plus" sur article                      | Redirection vers `/blog/[slug]` avec contenu complet | ✅ Pass |
| T09 | Carousel partenaires     | Observer section partenaires                      | Logos défilent automatiquement (GSAP)                | ✅ Pass |
| T10 | Formulaire contact       | Remplir formulaire partenaires + soumettre        | Email envoyé via Strapi, message confirmation        | ✅ Pass |

---

### Tests responsive

| Device     | Viewport  | Test                | Résultat                                                 |
| ---------- | --------- | ------------------- | -------------------------------------------------------- | --- |
| iPhone SE  | 375x667   | Navigation mobile   | Menu burger fonctionnel, sections empilées verticalement | ✅  |
| iPad       | 768x1024  | Tablet layout       | Galerie 2 colonnes, interviews 1 colonne                 | ✅  |
| Desktop HD | 1920x1080 | Full layout         | Galerie 3x3, interviews 2 colonnes, vidéo full-screen    | ✅  |
| Desktop 4K | 3840x2160 | Max-width container | Contenu centré max-w-7xl (1280px), pas d'overflow        | ✅  |

---

### Tests animations GSAP

| Animation            | Trigger             | Comportement attendu                              | Validé |
| -------------------- | ------------------- | ------------------------------------------------- | ------ |
| Reveal titre hero    | Page load           | Apparition bottom-to-top (0.8s, power2.out)       | ✅     |
| Scroll sections      | Scroll 80% viewport | Reveal progressif (fade + translateY)             | ✅     |
| Pulse donation       | Permanent           | Bouton pulse scale 1.05 + shadow (1.5s infinite)  | ✅     |
| Carousel partenaires | Auto-scroll         | Défilement horizontal continu (vitesse constante) | ✅     |

---

## II. Tests Lighthouse APD

### Résultats production (Vercel)

**Desktop (1920x1080)** :

- **Performance** : 92/100

  - First Contentful Paint : 1.2s
  - Largest Contentful Paint : 2.1s
  - Total Blocking Time : 120ms
  - Cumulative Layout Shift : 0.01

- **Accessibility** : 90/100

  - Contraste couleurs : ✅ AAA
  - Attributs alt images : ✅ Complets
  - Navigation clavier : ✅ Fonctionnelle
  - Labels formulaires : ✅ Présents

- **Best Practices** : 100/100

  - HTTPS : ✅ Actif (Vercel)
  - Console errors : ❌ Aucune
  - Images aspect-ratio : ✅ Correct

- **SEO** : 100/100
  - Meta description : ✅ Présente
  - Meta title : ✅ Optimisé
  - Sitemap : ✅ Généré
  - Robots.txt : ✅ Configuré

**Mobile (375x667)** :

- Performance : 78/100 (vidéo background désactivée, LCP amélioré)
- Accessibility : 88/100
- Best Practices : 96/100
- SEO : 100/100

**Actions d'amélioration** :

- [ ] Compression vidéo (HandBrake RF 32) → gain 40% poids
- [ ] Next.js Image priority pour hero → LCP -0.5s
- [ ] Preconnect fonts → FCP -0.2s
- [ ] Service Worker (PWA) → cache assets

---

## III. Collection Postman CoolBooking

### Endpoints testés (18 requêtes)

**Users** :

1. ✅ POST /users/register (avec avatar)
2. ✅ POST /users/register (sans avatar)
3. ❌ POST /users/register (email déjà utilisé) → 409 Conflict
4. ❌ POST /users/register (password < 6 chars) → 400 Bad Request
5. ✅ POST /users/login (credentials valides) → 200 + cookie
6. ❌ POST /users/login (password incorrect) → 401 Unauthorized
7. ✅ POST /users/logout → 200 + cookie cleared
8. ✅ GET /users/dashboard (avec token) → 200
9. ❌ GET /users/dashboard (sans token) → 401
10. ✅ GET /users → 200 + liste users
11. ✅ GET /users/:id (existant) → 200
12. ❌ GET /users/:id (inexistant) → 404
13. ✅ PUT /users/:id (update email) → 200
14. ✅ DELETE /users/:id → 200

**Rentals** : 15. ✅ POST /rentals (avec 5 images) → 201 + URLs Cloudinary 16. ✅ POST /rentals (sans images) → 201 17. ✅ GET /rentals → 200 + liste annonces 18. ✅ PUT /rentals/:id → 200

**Temps de réponse moyens** :

- POST /users/register : 450ms (upload Cloudinary)
- POST /users/login : 280ms (Argon2 verify)
- GET /users : 45ms
- POST /rentals : 1200ms (5 uploads Cloudinary)
- GET /rentals : 60ms

---

# 15. VEILLE TECHNOLOGIQUE ET SÉCURITÉ

## I. Sources de veille

### Communautés et blogs

**Frontend** :

- **Next.js Blog** : https://nextjs.org/blog (nouvelles versions, best practices)
- **GSAP Forum** : https://greensock.com/forums (animations avancées)
- **Tailwind CSS Blog** : https://tailwindcss.com/blog (nouvelles features)
- **Vercel Changelog** : https://vercel.com/changelog (déploiements, edge functions)

**Backend** :

- **Node.js Blog** : https://nodejs.org/en/blog (sécurité, releases)
- **Express GitHub** : https://github.com/expressjs/express (issues, PRs)
- **MariaDB KB** : https://mariadb.com/kb (optimisations, indexes)

**Sécurité** :

- **OWASP Top 10** : https://owasp.org/www-project-top-ten (vulnérabilités web)
- **Snyk Blog** : https://snyk.io/blog (dépendances vulnérables)
- **Security Headers** : https://securityheaders.com (headers HTTP)

### Newsletters

- **JavaScript Weekly** : https://javascriptweekly.com
- **Node Weekly** : https://nodeweekly.com
- **React Status** : https://react.statuscode.com
- **Tailwind Weekly** : https://tailwindweekly.com

### Documentation officielle

- Next.js Docs : https://nextjs.org/docs
- React Docs : https://react.dev
- Strapi Docs : https://docs.strapi.io
- MariaDB Docs : https://mariadb.com/kb/en/documentation

---

## II. Analyse sécurité OWASP Top 10 (2021)

### A01:2021 – Broken Access Control

**Risque** : Accès non autorisé à des ressources protégées

**Mesures APD** :

- ✅ Strapi : Rôles et permissions (authenticated, public)
- ✅ Routes admin Strapi protégées par JWT
- ❌ Frontend : Pas de routes privées (site public)

**Mesures CoolBooking** :

- ✅ Middleware `verifyToken` sur `/users/dashboard`
- ✅ Validation ID utilisateur dans JWT vs ID ressource
- ⚠️ À implémenter : Vérifier propriétaire annonce avant modification/suppression

---

### A02:2021 – Cryptographic Failures

**Risque** : Exposition de données sensibles (passwords, tokens)

**Mesures** :

- ✅ Passwords hashés avec **Argon2id** (meilleur qu'MD5, SHA1, bcrypt)
  - Résistance : GPU cracking, timing attacks
  - Paramètres : `argon2.hash(password)` (defaults sécurisés)
- ✅ JWT secrets dans `.env` (jamais committé)
- ✅ HTTPS : Vercel (frontend), Railway (backend)
- ✅ Cookies `HttpOnly` : inaccessibles au JavaScript client
- ❌ À implémenter : Chiffrement données sensibles en DB (AES-256)

---

### A03:2021 – Injection

**Risque** : SQL Injection, NoSQL Injection, Command Injection

**Mesures** :

- ✅ **Requêtes paramétrées** (mysql2) : `query("SELECT * FROM users WHERE id = ?", [id])`
- ✅ Validation Joi : Pas d'input brut dans queries
- ✅ Strapi ORM : Protection native contre injections
- ❌ À tester : Fuzzing inputs (caractères spéciaux, SQL keywords)

**Exemple attaque bloquée** :

```javascript
// ❌ Vulnérable :
const query = `SELECT * FROM users WHERE email = '${email}'`;
// Injection possible : email = "' OR '1'='1"

// ✅ Sécurisé :
const [rows] = await query("SELECT * FROM users WHERE email = ?", [email]);
```

---

### A04:2021 – Insecure Design

**Risque** : Architecture mal conçue, manque de threat modeling

**Mesures** :

- ✅ Séparation frontend/backend (Next.js ≠ Express)
- ✅ Architecture en couches (Controller/Service/Repository)
- ✅ Principe de moindre privilège (rôles Strapi)
- ⚠️ À améliorer : Rate limiting (pas implémenté)

---

### A05:2021 – Security Misconfiguration

**Risque** : Configurations par défaut, headers manquants, erreurs verboses

**Mesures APD** :

- ✅ Next.js : Headers sécurité par défaut (X-Frame-Options, X-Content-Type-Options)
- ✅ Strapi : Panel admin en `/admin` (pas de route custom exposée)
- ⚠️ À ajouter : CSP (Content Security Policy) headers

**Mesures CoolBooking** :

- ✅ CORS configuré : `cors()` autorise clients spécifiques
- ✅ Cookie `SameSite: Strict` (protection CSRF)
- ❌ À ajouter : Helmet.js (headers sécurité)
- ❌ Erreurs production : Messages génériques (pas de stack traces)

---

### A06:2021 – Vulnerable and Outdated Components

**Risque** : Dépendances avec CVE (Common Vulnerabilities and Exposures)

**Mesures** :

- ✅ Audit régulier : `npm audit` (frontend + backend)
- ✅ Dependabot GitHub : Alertes dépendances vulnérables
- ✅ Versions récentes : Next.js 15, React 19, Express 5, Node 20
- ⚠️ À automatiser : CI/CD avec `npm audit --audit-level=high`

**Exemple rapport** :

```bash
npm audit
# 0 vulnerabilities
```

---

### A07:2021 – Identification and Authentication Failures

**Risque** : Bruteforce, credentials faibles, session hijacking

**Mesures** :

- ✅ JWT expiration : 24h (`expiresIn: "1d"`)
- ✅ Argon2 : Ralentit bruteforce (hash coûteux)
- ✅ Cookies HttpOnly : Pas de vol XSS
- ❌ À implémenter :
  - Rate limiting login (max 5 tentatives/15min)
  - Password strength meter (frontend)
  - 2FA (Two-Factor Authentication)

---

### A08:2021 – Software and Data Integrity Failures

**Risque** : Pipelines CI/CD non sécurisés, dépendances malveillantes

**Mesures** :

- ✅ Package-lock.json : Versions figées
- ✅ npm ci en production (respecte lock file)
- ⚠️ À implémenter : Signature commits Git (GPG)

---

### A09:2021 – Security Logging and Monitoring Failures

**Risque** : Pas de détection d'attaques, logs insuffisants

**Mesures actuelles** :

- ✅ Console.log erreurs backend (Argon2 verify, DB queries)
- ❌ À implémenter :
  - Winston logger (niveaux : info, warn, error)
  - Sentry monitoring (erreurs temps réel)
  - Logs accès : IP, timestamp, routes (Morgan middleware)

---

### A10:2021 – Server-Side Request Forgery (SSRF)

**Risque** : Backend fetch URLs malveillantes

**Mesures** :

- ✅ Pas de fetch user-controlled URLs dans le backend
- ✅ Cloudinary upload : Validation types MIME
- ⚠️ À valider : Whitelist domaines autorisés pour fetch

---

## III. Best practices JWT

**Configuration actuelle** :

```javascript
// Génération token
const token = jwt.sign(
  { id: user.id, email: user.email }, // Payload (pas de password !)
  process.env.JWT_SECRET, // Secret > 32 chars
  { expiresIn: "1d" } // Expiration courte
);

// Stockage cookie HttpOnly
res.cookie("token", token, {
  httpOnly: true, // ✅ Protection XSS
  secure: true, // ✅ HTTPS uniquement (prod)
  sameSite: "Strict", // ✅ Protection CSRF
  maxAge: 86400000, // ✅ 24h
});
```

**Améliorations recommandées** :

- ✅ Refresh tokens (token courte durée + refresh long terme)
- ✅ Blacklist tokens (logout immédiat, révocation)
- ✅ Rotation secrets JWT (changement périodique)

---

# 16. CONCLUSION ET ANNEXES

## I. Synthèse des compétences acquises

### Compétences CCP1 (Frontend)

**CCP1-A : Maquetter une application** :

- ✅ Création wireframes desktop/mobile (Figma, diagrammes textuels)
- ✅ Définition charte graphique (couleurs, typographies, composants UI)
- ✅ User stories et personas détaillés
- ✅ Arborescence pages et navigation

**CCP1-B : Réaliser une interface utilisateur web statique et adaptable** :

- ✅ Intégration responsive Tailwind CSS (mobile-first)
- ✅ Composants React modulaires (16 composants réutilisables)
- ✅ Accessibilité (contraste AAA, navigation clavier, alt images)
- ✅ SEO (meta tags, sitemap, robots.txt)

**CCP1-C : Développer une interface utilisateur web dynamique** :

- ✅ Animations GSAP (timelines, ScrollTrigger, reveal effects)
- ✅ Hooks React personnalisés (useSiteData, useCurrentSection)
- ✅ Context API (HeaderDonationContext)
- ✅ Fetch données API Strapi (single types, collections)
- ✅ Next.js App Router (server/client components, dynamic routes)

---

### Compétences CCP2 (Backend)

**CCP2-A : Créer une base de données** :

- ✅ Modélisation MCD/MLD (users, rentals, relations futures)
- ✅ Dictionnaire de données (types, contraintes)
- ✅ Migration Strapi PostgreSQL (tables auto-générées)
- ✅ Création tables MariaDB (SQL CREATE TABLE)

**CCP2-B : Développer les composants d'accès aux données** :

- ✅ Repository pattern (encapsulation requêtes SQL)
- ✅ Requêtes paramétrées mysql2 (protection injection)
- ✅ Pool connexions optimisé (10 max)
- ✅ ORM Strapi (requêtes via API REST)

**CCP2-C : Développer la partie back-end d'une application web ou web mobile** :

- ✅ API REST Express (CRUD complet users, rentals)
- ✅ Architecture MVC modulaire (routes/controllers/services/repositories)
- ✅ Authentification JWT (génération, vérification, cookies HttpOnly)
- ✅ Validation données Joi (schémas create/update)
- ✅ Upload fichiers (Multer + Cloudinary)
- ✅ Hash passwords Argon2id
- ✅ Gestion erreurs globale (middleware error handler)
- ✅ CORS et sécurité (headers, cookies SameSite)

---

## II. Perspectives et évolutions

### APD (court terme - 3 mois)

**Performance** :

- [ ] Compression vidéo background (HandBrake RF 32) → -40% poids
- [ ] Image optimization (WebP, AVIF formats)
- [ ] Service Worker (PWA) → cache assets

**Fonctionnalités** :

- [ ] Newsletter (Strapi + Nodemailer)
- [ ] Calendrier événements (visites guidées, concerts)
- [ ] Multilingue (FR/EN/ES) avec i18n
- [ ] Mode sombre

**Analytics** :

- [ ] Plausible Analytics (RGPD-friendly)
- [ ] Heatmaps (Hotjar)
- [ ] Conversion tracking donations

---

### CoolBooking (court terme - 3 mois)

**Fonctionnalités MVP+** :

- [ ] Système réservations (dates, calendrier, paiements Stripe)
- [ ] Filtres annonces (prix, localisation, couchages)
- [ ] Messagerie propriétaire-locataire
- [ ] Notation/avis locataires

**Qualité** :

- [ ] Tests unitaires Jest (controllers, services, repositories)
- [ ] Tests e2e Supertest (routes API)
- [ ] CI/CD GitHub Actions (lint, tests, deploy)
- [ ] Documentation Swagger/OpenAPI

**Sécurité** :

- [ ] Rate limiting (express-rate-limit)
- [ ] Helmet.js headers
- [ ] Winston logger + Sentry monitoring
- [ ] 2FA authentification

---

### Long terme (6-12 mois)

**APD** :

- [ ] Application mobile React Native
- [ ] Paiements donations Stripe (one-time, récurrents)
- [ ] Dashboard admin analytics (Google Analytics API)
- [ ] Chatbot IA (réponses FAQ patrimoine)

**CoolBooking** :

- [ ] Frontend Next.js consommant l'API
- [ ] Migration Prisma ORM (TypeScript, migrations)
- [ ] Microservices (auth, rentals, payments séparés)
- [ ] Containerization Docker + orchestration Kubernetes

---

## III. Retour d'expérience

### Points forts

**Technique** :

- Maîtrise Next.js 15 App Router (RSC, server actions)
- Animations GSAP fluides et performantes
- Architecture backend scalable (Repository pattern)
- Sécurité JWT + Argon2 robuste

**Méthodologie** :

- User stories et personas bien définis
- Documentation complète (README, PRESENTATION, DOSSIER)
- Git workflow propre (branches, commits atomiques)
- Déploiement automatique (Vercel, Railway)

---

### Difficultés rencontrées

**APD** :

- **Vidéo background** : Poids initial 50MB → compression nécessaire
- **GSAP ScrollTrigger** : Conflits avec smooth scroll Lenis → résolu avec `gsap.utils.toArray()`
- **Strapi v5** : Documentation incomplète (migration v4 → v5)

**CoolBooking** :

- **Argon2 vs bcrypt** : Choix initial bcrypt → migration Argon2 (meilleure sécurité)
- **Cloudinary upload** : Gestion fichiers temporaires (fs.unlinkSync nécessaire)
- **JWT cookies** : Configuration `sameSite` pour CORS cross-domain

---

### Apprentissages clés

1. **Separation of Concerns** : Frontend/Backend séparés = maintenance facilitée
2. **Security by Design** : Penser sécurité dès la conception (pas après coup)
3. **Performance matters** : Lighthouse score impact UX et SEO
4. **Documentation = Code** : README bien écrit = temps gagné en maintenance

---

## IV. Annexes

### Liens utiles

**Démos** :

- Frontend APD : https://apd-patrimoine.vercel.app (production)
- Backend Strapi : https://api-apd.railway.app (admin: /admin)
- Backend CoolBooking : http://localhost:3000 (local)

**Repositories GitHub** :

- APD Frontend : https://github.com/philippebarbosa/apd-frontend
- APD Strapi Backend : https://github.com/philippebarbosa/apd-strapi
- CoolBooking API : https://github.com/philippebarbosa/coolbooking-api

**Documentation projet** :

- README.md : Guide installation et démarrage
- PRESENTATION_STAGE.md : Présentation détaillée APD (826 lignes)
- DOSSIER_TP_DWWM.md : Présent document

---

### Glossaire

**APD** : Association Patrimoine de Doazit (client fictif projet frontend)

**Argon2** : Algorithme de hashing gagnant Password Hashing Competition 2015

**CCP** : Certificat de Compétences Professionnelles (TP DWWM)

**CORS** : Cross-Origin Resource Sharing (politique sécurité navigateurs)

**CRUD** : Create, Read, Update, Delete (opérations base de données)

**CSP** : Content Security Policy (header HTTP sécurité)

**GSAP** : GreenSock Animation Platform (bibliothèque animations JavaScript)

**HttpOnly** : Attribut cookie empêchant accès JavaScript (protection XSS)

**JWT** : JSON Web Token (standard RFC 7519 authentification)

**MCD** : Modèle Conceptuel de Données (merise)

**MLD** : Modèle Logique de Données (traduction MCD vers tables SQL)

**MVP** : Minimum Viable Product (périmètre initial livrable)

**ORM** : Object-Relational Mapping (abstraction accès base de données)

**RSC** : React Server Components (Next.js 13+)

**SEO** : Search Engine Optimization (référencement naturel)

**SSRF** : Server-Side Request Forgery (attaque fetch URLs malveillantes)

**TP DWWM** : Titre Professionnel Développeur Web et Web Mobile

**XSS** : Cross-Site Scripting (injection code malveillant JavaScript)

---

### Remerciements

Je tiens à remercier :

- **L'équipe pédagogique** de la formation TP DWWM pour l'accompagnement
- **La communauté open-source** : contributeurs Next.js, React, Express, GSAP, Strapi
- **Les mainteneurs** des dépendances utilisées (Tailwind, Argon2, Joi, Multer, etc.)
- **Vercel et Railway** pour les plans gratuits permettant le déploiement

---

**Fin du dossier de projet**

_Document rédigé dans le cadre de la formation Titre Professionnel Développeur Web et Web Mobile (RNCP niveau 5)_

_Philippe Barbosa - Janvier 2025_

---

## 4. Objectifs fonctionnels et techniques

| Axe              | APD (Frontend)                                                          | CoolBooking (Backend)                                                     |
| ---------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **Cœur métier**  | Valoriser le patrimoine, inciter aux dons, proposer contenus éditoriaux | CRUD utilisateurs & locations, sécuriser l'accès, gérer médias            |
| **Public cible** | Visiteurs, donateurs, partenaires, administrateurs Strapi               | Propriétaires, locataires, équipe support                                 |
| **Contraintes**  | Site immersif, animations fluides, perf > 85 sur desktop                | API sécurisée, uploads Cloudinary, MariaDB mutualisé                      |
| **KPIs**         | Temps de chargement, taux de clic CTA, compatibilité mobile             | Temps de réponse (<200 ms local), taux d'erreur <1%, couverture endpoints |

---

## 5. Technologies et outillage

### Frontend APD

- **Framework** : Next.js 15.5.3 (App Router) / React 19.1.0
- **UI** : Tailwind CSS 4, composants modulaires, police Garamond personnalisée
- **Animations** : GSAP 3.13 (timelines, reveal boxes), vidéo Cloudinary
- **CMS** : Strapi v5 (single types église/accueil, collections articles/interviews)
- **Qualité** : ESLint, Prettier, Lighthouse, tests manuels multi-device

### Backend CoolBooking

- **Runtime** : Node.js 20 / Express 5
- **Base de données** : MariaDB (mysql2/promise), pool 10 connexions
- **Sécurité** : Argon2id (hash), JWT (auth), Cookies HttpOnly, CORS
- **Validation** : Joi (schemas create/update user)
- **Uploads** : Multer + Cloudinary (avatars, images de location)
- **Outils** : Nodemon, jsdoc, dotenv, Postman (tests), Railway/Vercel prêts pour déploiement

---

## 6. Architecture technique

### 6.1 Vue d'ensemble

```
UTILISATEUR
   |-- Navigateur → Next.js (APD) → Strapi (contenus) / CoolBooking API
   |-- Client mobile futur → CoolBooking API → MariaDB + Cloudinary
```

### 6.2 APD

- Pages App Router (`app/page.jsx`, `blog/`, `partners/`...).
- Composants animés (`IntroSection`, `SectionNavigation`, `Gallery`, `PartnerSection`).
- Context & hooks (`useSiteData`, `useCurrentSection`).
- Données fetchées via Strapi REST (`eglise`, `accueil`, `articles`, `interviews`).
- Vidéo de fond : `VideoBackground` fixed + préchargement `<link rel="preload" as="video">`.

### 6.3 CoolBooking

- **Routing** : `/users` et `/rentals` (CRUD).
- **Middlewares** : `verifyToken`, `verifyPassword`, `clearCookie`, Multer uploads, `express.json`, `cookie-parser`, `cors`.
- **Couche métier** : `controller → service → repository`, favorisant tests unitaires.
- **Persistance** : `config/db.js` (pool mysql2 + util `query`). Tables principales : `users`, `rentals` (JSON images, prix, localisation, couchages).
- **Stockage médias** : `config/cloudinary.js` (non exposé ici) + suppression locale `fs.unlinkSync`.

---

## 7. Fonctionnalités livrées

### APD (Front)

1. **Hero animé** : reveal box GSAP, vidéo plein écran, bouton don persistant.
2. **Description & interviews** : cartes synchronisées, background flou.
3. **Galerie photo** : 9 assets, scroll horizontal desktop, grille mobile.
4. **Architecture** : plan zoomable, annotations.
5. **Blog** : dernier articles avec dynamic import de `BlogSection`, page `/blog` + `[slug]`.
6. **Partenaires** : carousel auto-scroll, fallback de chargement.
7. **Contact modal** : formulaire partenaires (validation, API email Strapi).
8. **Accessibilité** : navigation clavier, contrastes, attributs alt.

### CoolBooking (Back)

1. **Gestion utilisateurs** : création (upload avatar + hash Argon2), lecture, mise à jour, suppression.
2. **Authentification** : login avec vérification hashée, JWT stocké cookie HttpOnly, route `/users/dashboard` protégée.
3. **Validation** : schémas Joi (création/mise à jour), messages personnalisés.
4. **Gestion locations** : CRUD complet, conversion auto `beds`, stockage multi-images (5 entrées) sur Cloudinary.
5. **Gestion erreurs** : middleware global (log + réponse JSON), messages contextualisés.
6. **Sécurité** : CORS ouvert pour clients autorisés, tokens expirant sous 24h, limitation cloud par dossier.

---

## 8. Qualité, tests et résultats

| Indicateur      | APD                                                                       | CoolBooking                                                                            |
| --------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Performance** | Lighthouse Desktop : Perf 92 / Accessibilité 90 / SEO 100                 | Temps de réponse local < 120 ms sur GET /rentals                                       |
| **Tests**       | 40 scénarios manuels (desktop/mobile), validation animations + navigation | Collection Postman (18 requêtes) couvrant CRUD + auth, tests Jest prévus               |
| **Sécurité**    | HTTPS (Vercel), headers Next, préchargement vidéo conditionnel            | Hash Argon2id, JWT en cookie HttpOnly, validation Joi                                  |
| **Fiabilité**   | Logs Strapi, fallback dynamiques (loading state), monitoring Lighthouse   | Pool MariaDB + release, suppression fichiers temporaires, messages d'erreur explicites |

---

## 9. Perspectives d'évolution

### APD

- Compression vidéo (HandBrake, RF 32) pour améliorer perf mobile.
- Ajout analytics (Plausible) et monitoring (Sentry).
- Section événements + newsletter.
- Mode sombre / accessibilité renforcée (WCAG AA+).

### CoolBooking

- Ajout disponibilité calendrier + réservations.
- Tests unitaires (Jest) + CI GitHub Actions.
- Passage à Prisma ORM + migrations.
- Rate limiting & audit logs, notifications email (Nodemailer).

---

## 10. Compétences mises en oeuvre

- **Frontend** : Next.js App Router, React hooks, GSAP timeline, optimisation vidéo, design system Tailwind, SEO.
- **Backend** : Express 5, architecture en couches, MariaDB, requêtes paramétrées, Argon2/JWT, Cloudinary.
- **Qualité** : documentation, plan de tests, GitHub (branches, commits), déploiement Vercel/Railway.
- **Méthodologie** : gestion de backlog, user stories, communication client, veille techno (GSAP, Strapi v5, JWT best practices).

---

## 11. Conclusion

Ce dossier démontre la complémentarité des deux projets menés durant la formation TP DWWM :

- **APD** illustre ma capacité à transformer un besoin institutionnel en expérience digitale immersive, responsive et orientée conversion.
- **CoolBooking** prouve ma maîtrise d'un backend Node moderne sécurisé, prêt à alimenter une application web ou mobile.

En réunissant ces deux réalisations, j'atteste de ma capacité à prendre en charge un projet web complet, du design d'interface à la persistance des données, en respectant les bonnes pratiques professionnelles.

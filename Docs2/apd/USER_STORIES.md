# 📖 User Stories - Projet APD

> Association Patrimoine de Doazit - Récits utilisateurs

**Version** : 1.0  
**Date** : 19 Novembre 2025  
**Format** : Epic → User Stories → Critères d'acceptation

---

## Légende

**Priorités :**

- 🔴 **P0** : Critique (MVP)
- 🟠 **P1** : Importante (Post-MVP)
- 🟡 **P2** : Souhaitable (V2)

**Statut :**

- ✅ Terminé
- 🚧 En cours
- 📋 À faire

**Estimation :**

- XS = 1-2h
- S = 2-4h
- M = 1-2 jours
- L = 3-5 jours
- XL = 1-2 semaines

---

## EPIC 1 : Découverte du Patrimoine

### US-001 : Visionner la vidéo de présentation

**En tant que** visiteur  
**Je veux** visionner une vidéo de l'église en arrière-plan de la page d'accueil  
**Afin de** découvrir visuellement le patrimoine avant de naviguer

**Priorité** : 🔴 P0  
**Estimation** : S  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [ ] La vidéo se lance automatiquement au chargement (autoplay)
- [ ] La vidéo est en boucle (loop) et sans son (muted)
- [ ] La vidéo couvre tout l'écran (object-fit: cover)
- [ ] Un titre animé apparaît au-dessus de la vidéo
- [ ] La vidéo est responsive (mobile, tablet, desktop)
- [ ] Fallback image si la vidéo ne charge pas

**Tâches techniques :**

- [x] Créer composant `VideoBackground.jsx`
- [x] Optimiser vidéo (format MP4, compression)
- [x] Implémenter autoplay, loop, muted, playsInline
- [x] Tester sur Safari iOS (restrictions autoplay)

---

### US-002 : Découvrir l'histoire de l'église

**En tant que** visiteur  
**Je veux** lire une description détaillée de l'église avec une image  
**Afin de** comprendre son importance historique

**Priorité** : 🔴 P0  
**Estimation** : S  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Section avec titre "L'Église Saint-Jean Baptiste d'Aulès"
- [x] Image principale de l'église (responsive)
- [x] Texte riche (description, histoire)
- [x] Mise en page harmonieuse (image + texte côte à côte desktop)
- [x] Lettrine sur première lettre du paragraphe

**Données Strapi :**

- Content-Type : `eglise` (Single Type)
- Champs : `nom`, `description`, `histoire`, `image_principale`

---

### US-003 : Explorer la galerie photos

**En tant que** visiteur  
**Je veux** parcourir une galerie de 9 photos de l'église  
**Afin de** découvrir les détails architecturaux

**Priorité** : 🔴 P0  
**Estimation** : L  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Galerie de 9 images positionnées de manière artistique
- [x] Animations au scroll (apparition progressive)
- [x] Clic sur une image = fullscreen viewer
- [x] Navigation dans le fullscreen (prev/next)
- [x] Fermeture du fullscreen (bouton X ou ESC)
- [x] Responsive : grille sur mobile/tablet, layout absolu sur desktop
- [x] Espace pour titre au-dessus de la galerie (25% top)

**Tâches techniques :**

- [x] Créer composant `Gallery.jsx`
- [x] GSAP ScrollTrigger pour animations
- [x] Portail React pour fullscreen modal
- [x] layoutStyles array avec positions absolues (desktop)
- [x] Grille CSS pour mobile/tablet

**Animations :**

- GSAP ScrollTrigger : `y: 400`, `opacity: 0` → `y: 0`, `opacity: 1`
- Stagger : 0.1s entre chaque image

---

### US-004 : Comprendre le style architectural

**En tant que** visiteur intéressé par l'architecture  
**Je veux** lire une description du style et voir un plan architectural  
**Afin de** mieux comprendre la structure de l'édifice

**Priorité** : 🟠 P1  
**Estimation** : M  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Section "Architecture" avec texte descriptif
- [x] Image du plan architectural (si disponible)
- [x] Animation zoom sur le plan au scroll
- [x] Texte justifié (desktop), left-aligned (mobile)

**Données Strapi :**

- Champs : `style_architectural` (RichText), `plan` (Media)

**Animation :**

- GSAP : `scale: 0.3 → 1`, `opacity: 0 → 1`

---

### US-005 : Regarder une interview vidéo

**En tant que** visiteur  
**Je veux** visionner une interview (témoignage)  
**Afin de** entendre des récits humains liés à l'église

**Priorité** : 🟠 P1  
**Estimation** : S  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Section Interview avec titre
- [x] Player vidéo HTML5 (controls)
- [x] Responsive (ratio 16:9)
- [x] Lazy loading de la vidéo

**Données Strapi :**

- Content-Type : `interview` (Collection)
- Champs : `titre`, `description`, `video` (Media)

**Tâches techniques :**

- [x] Composant `Interview.jsx`
- [x] Video player avec controls, preload="metadata"
- [x] Styling avec Tailwind (aspect-video)

---

## EPIC 2 : Navigation et Contenu

### US-006 : Naviguer entre les pages

**En tant que** visiteur  
**Je veux** un menu de navigation clair et accessible  
**Afin de** explorer facilement les différentes sections du site

**Priorité** : 🔴 P0  
**Estimation** : M  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Header fixe en haut de page
- [x] Logo cliquable (retour à l'accueil)
- [x] Liens : Accueil, Association, Blog, Partenaires
- [x] Bouton "Faire un don" visible après scroll
- [x] Menu hamburger sur mobile (< 768px)
- [x] Active state sur la page courante
- [x] Smooth scroll (si ancres internes)

**Tâches techniques :**

- [x] Composant `Header.jsx` avec useState pour mobile menu
- [x] `HeaderWrapper.jsx` pour détection scroll
- [x] Context `HeaderDonationContext` pour state bouton don
- [x] Next.js Link pour navigation
- [x] Tailwind classes pour responsive

---

### US-007 : Consulter les articles de blog

**En tant que** visiteur  
**Je veux** lire les derniers articles sur le patrimoine  
**Afin de** me tenir informé des actualités et recherches

**Priorité** : 🔴 P0  
**Estimation** : M  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Page `/blog` avec liste de tous les articles
- [x] Affichage : image, titre, date, auteur, extrait
- [x] Tri par date décroissante
- [x] Clic sur un article → page détaillée
- [x] Responsive (grille adaptative)

**Données Strapi :**

- Content-Type : `article` (Collection)
- Champs : `titre`, `contenu`, `image`, `auteur`, `date_publication`, `slug`

**Tâches techniques :**

- [x] Page `blog/page.jsx` avec fetch API
- [x] Fonction `extractTextFromBlocks` pour extrait
- [x] Next.js Image pour optimisation

---

### US-008 : Lire un article complet

**En tant que** lecteur  
**Je veux** accéder au contenu intégral d'un article  
**Afin de** approfondir un sujet

**Priorité** : 🔴 P0  
**Estimation** : M  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Page `/blog/[slug]` dynamique
- [x] Image full-width en en-tête
- [x] Titre H1
- [x] Metadata : Date et auteur
- [x] Contenu rich text avec lettrine
- [x] Bouton "Retour aux articles"
- [x] SEO : generateMetadata (title, description)

**Tâches techniques :**

- [x] Dynamic route `[slug]/page.jsx`
- [x] Fetch article par slug
- [x] Rendu Blocks API (paragraphes, headings, images, listes)
- [x] generateMetadata pour SEO

---

### US-009 : Voir la section Articles sur l'accueil

**En tant que** visiteur de la page d'accueil  
**Je veux** voir les 4 derniers articles  
**Afin de** découvrir le contenu sans quitter la page principale

**Priorité** : 🔴 P0  
**Estimation** : S  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Section "Actualités" sur l'accueil
- [x] 4 derniers articles (image, titre, date, extrait court)
- [x] Lien "Voir tous les articles" → `/blog`
- [x] Responsive (grille 2x2 desktop, stack mobile)

**Tâches techniques :**

- [x] Composant `BlogSection.jsx`
- [x] Dynamic import dans `page.jsx` (lazy loading)
- [x] Fetch avec `pagination[limit]=4&sort[0]=date_publication:desc`

---

## EPIC 3 : Engagement et Partenariat

### US-010 : Faire un don

**En tant que** visiteur sensibilisé  
**Je veux** cliquer sur un bouton "Faire un don" bien visible  
**Afin de** contribuer financièrement à la restauration

**Priorité** : 🔴 P0  
**Estimation** : XS  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Bouton "Faire un don" dans le header (après scroll)
- [x] Redirection vers URL de don (Helloasso, autre plateforme)
- [x] URL configurable dans Strapi (`parametres_site.url_don`)
- [x] Bouton avec style distinctif (rouge, gras)

**Données Strapi :**

- Content-Type : `parametres_site` (Single Type)
- Champ : `url_don` (Text)

**Tâches techniques :**

- [x] Composant `DonationButton.jsx`
- [x] Context `HeaderDonationContext` pour visibilité scroll
- [x] `target="_blank"` et `rel="noopener noreferrer"`

---

### US-011 : Découvrir les partenaires

**En tant que** visiteur ou entreprise  
**Je veux** voir les logos des partenaires actuels  
**Afin de** connaître les soutiens de l'association

**Priorité** : 🟠 P1  
**Estimation** : M  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Page `/partners` avec texte incitatif
- [x] Liste des partenaires avec logos
- [x] Clic sur logo → site du partenaire (nouvel onglet)
- [x] Carousel automatique sur la page d'accueil

**Données Strapi :**

- Content-Type : `partenaire` (Collection)
- Champs : `logo` (Media array), `url` (Text)

**Tâches techniques :**

- [x] Page `partners/page.jsx`
- [x] Composant `PartnerSection.jsx` (carousel auto-scroll)
- [x] requestAnimationFrame pour animation fluide
- [x] Pause au hover

---

### US-012 : Contacter l'association pour devenir partenaire

**En tant qu'** entreprise intéressée  
**Je veux** remplir un formulaire de contact  
**Afin de** proposer un partenariat

**Priorité** : 🟠 P1  
**Estimation** : M  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Bouton "Devenir partenaire" sur page `/partners`
- [x] Ouverture modal avec formulaire
- [x] Champs : Nom, Email, Téléphone, Sujet, Message
- [x] Validation côté client (email valide, champs requis)
- [x] Envoi via API `/api/email/send`
- [x] Message de succès/erreur
- [x] Fermeture de la modal après envoi

**Tâches techniques :**

- [x] Composant `ContactModal.jsx`
- [x] State management (useState pour formulaire)
- [x] Fetch POST vers `/api/email/send`
- [x] Validation regex email
- [x] ErrorMessage component pour affichage erreurs

**API Backend :**

- [x] Controller `src/api/email/controllers/email.ts`
- [x] Nodemailer avec SMTP Gmail
- [x] Rate limiting (protection spam)

---

### US-013 : Découvrir l'association

**En tant que** visiteur curieux  
**Je veux** lire la présentation de l'association  
**Afin de** comprendre sa mission et ses objectifs

**Priorité** : 🔴 P0  
**Estimation** : S  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Page `/association`
- [x] Titre et description de l'association
- [x] Objectifs et mission
- [x] CTA : Boutons "Faire un don" et "Devenir partenaire"

**Données Strapi :**

- Content-Type : `association` (Single Type)
- Champs : `titre`, `description`, `objectifs` (RichText)

**Tâches techniques :**

- [x] Page `association/page.jsx`
- [x] Fetch API Strapi
- [x] Rendu Blocks API

---

## EPIC 4 : Administration (Back-office)

### US-014 : Se connecter au panel admin

**En tant qu'** administrateur  
**Je veux** accéder à un panel d'administration sécurisé  
**Afin de** gérer le contenu du site

**Priorité** : 🔴 P0  
**Estimation** : XS  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] URL `/admin` (Strapi)
- [x] Formulaire login (email + password)
- [x] Authentification JWT
- [x] Session persistante (cookies)
- [x] Redirection vers dashboard après login

**Tâches techniques :**

- [x] Strapi admin panel par défaut
- [x] Configuration `config/admin.ts`
- [x] JWT secret dans `.env`

---

### US-015 : Créer et publier un article

**En tant qu'** administrateur  
**Je veux** créer un nouvel article de blog  
**Afin de** partager du contenu avec les visiteurs

**Priorité** : 🔴 P0  
**Estimation** : S  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Accès à "Content Manager > Article"
- [x] Bouton "Create new entry"
- [x] Champs : Titre, Contenu (RichText), Image, Auteur, Date
- [x] Génération automatique du slug (from titre)
- [x] Prévisualisation avant publication
- [x] Publication/Dépublication
- [x] Sauvegarde en brouillon

**Tâches techniques :**

- [x] Content-Type `article` avec Blocks API
- [x] Plugin UID pour slug auto
- [x] Cloudinary upload pour images

---

### US-016 : Gérer la galerie photos de l'église

**En tant qu'** administrateur  
**Je veux** ajouter/supprimer des photos de l'église  
**Afin de** maintenir la galerie à jour

**Priorité** : 🟠 P1  
**Estimation** : S  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Accès à "Content Manager > Eglise"
- [x] Champ "Images" (multiple media)
- [x] Upload par drag & drop
- [x] Réorganisation de l'ordre (drag & drop)
- [x] Suppression d'images
- [x] Limite : 10 images max recommandées

**Tâches techniques :**

- [x] Champ `images` avec `allowedTypes: ['images']`, `multiple: true`
- [x] Cloudinary upload provider

---

### US-017 : Ajouter un nouveau partenaire

**En tant qu'** administrateur  
**Je veux** ajouter un partenaire avec son logo et URL  
**Afin de** valoriser nos soutiens

**Priorité** : 🟠 P1  
**Estimation** : XS  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Accès à "Content Manager > Partenaire"
- [x] Bouton "Create new entry"
- [x] Champs : Logo (multiple), URL
- [x] Validation URL (format http/https)
- [x] Publication immédiate

**Tâches techniques :**

- [x] Content-Type `partenaire`
- [x] Validation regex pour URL

---

### US-018 : Modifier les paramètres du site

**En tant qu'** administrateur  
**Je veux** modifier les paramètres globaux (logos, réseaux sociaux, URL don)  
**Afin de** contrôler les éléments constants du site

**Priorité** : 🔴 P0  
**Estimation** : S  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Accès à "Content Manager > Parametres Site"
- [x] Champs : Logo header, Logo footer, Réseaux sociaux (JSON), URL don, Localisation
- [x] Sauvegarde avec propagation immédiate au frontend

**Données Strapi :**

- Content-Type : `parametres_site` (Single Type)
- Champs : `logo_header`, `logo_footer`, `reseaux_sociaux`, `url_don`, `localisation` (component)

**Tâches techniques :**

- [x] Component `localisation` réutilisable (ville, region, pays, code_postal)
- [x] JSON editor pour réseaux sociaux

---

## EPIC 5 : Expérience Utilisateur

### US-019 : Bénéficier d'une navigation responsive

**En tant qu'** utilisateur mobile  
**Je veux** une interface adaptée à mon écran  
**Afin de** naviguer confortablement depuis mon smartphone

**Priorité** : 🔴 P0  
**Estimation** : M  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Menu hamburger sur mobile (< 768px)
- [x] Images responsive (Next.js Image)
- [x] Texte lisible (taille min 16px)
- [x] Boutons tactiles (min 44x44px)
- [x] Galerie adaptée (grille au lieu de scroll horizontal)
- [x] Footer stacked verticalement

**Tests :**

- [x] iPhone SE (375px)
- [x] iPad (768px)
- [x] Desktop (1920px)

---

### US-020 : Profiter d'animations fluides

**En tant que** visiteur  
**Je veux** des animations visuelles attrayantes mais non invasives  
**Afin de** vivre une expérience immersive

**Priorité** : 🟠 P1  
**Estimation** : L  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Galerie : apparition progressive au scroll (GSAP)
- [x] Reveal box sur titre intro (animation width)
- [x] Plan architectural : zoom au scroll
- [x] Partenaires : carousel auto-scroll fluide (60fps)
- [x] Préférence utilisateur `prefers-reduced-motion` respectée

**Animations GSAP :**

- [x] ScrollTrigger sur Gallery (y: 400→0, stagger: 0.1)
- [x] Timeline sur IntroSection (reveal-box width)
- [x] Scale sur Architecture (0.3→1)

---

### US-021 : Charger rapidement les pages

**En tant que** visiteur  
**Je veux** un temps de chargement inférieur à 3 secondes  
**Afin de** ne pas abandonner le site

**Priorité** : 🔴 P0  
**Estimation** : M  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Lighthouse Performance > 85
- [x] First Contentful Paint < 1.5s
- [x] Largest Contentful Paint < 2.5s
- [x] Images optimisées (WebP, lazy load)
- [x] Dynamic imports pour composants lourds
- [x] Cache API (stale-while-revalidate)

**Optimisations :**

- [x] Next.js Image avec formats adaptatifs
- [x] Cloudinary CDN
- [x] Lazy load : `loading="lazy"` sur images
- [x] Dynamic import : `BlogSection`, `PartnerSection`

---

### US-022 : Accéder au site de manière inclusive

**En tant qu'** utilisateur en situation de handicap  
**Je veux** un site accessible  
**Afin de** pouvoir consulter le contenu sans barrière

**Priorité** : 🟠 P1  
**Estimation** : M  
**Statut** : 🚧 En cours

**Critères d'acceptation :**

- [ ] Alt text sur toutes les images
- [ ] Contraste minimum 4.5:1 (WCAG AA)
- [ ] Navigation clavier (Tab, Enter, Esc)
- [ ] ARIA labels sur éléments interactifs
- [ ] Lecteur d'écran compatible
- [ ] Vidéos avec sous-titres (si dialogues)

**Tests :**

- [ ] WAVE (Web Accessibility Evaluation Tool)
- [ ] Lighthouse Accessibility > 90
- [ ] Test navigation clavier

**Actions :**

- [ ] Ajouter alt text sur toutes les images Strapi
- [ ] Vérifier contraste texte/background
- [ ] Ajouter aria-label sur boutons icônes
- [ ] Tester avec NVDA/JAWS

---

## EPIC 6 : SEO et Référencement

### US-023 : Être bien référencé sur Google

**En tant que** gestionnaire du site  
**Je veux** un bon référencement naturel  
**Afin d'** attirer plus de visiteurs

**Priorité** : 🟠 P1  
**Estimation** : S  
**Statut** : 🚧 En cours

**Critères d'acceptation :**

- [x] Meta tags (title, description) sur toutes les pages
- [x] Open Graph pour partage réseaux sociaux
- [ ] Sitemap.xml
- [ ] Robots.txt
- [x] URLs sémantiques (slugs lisibles)
- [ ] Schema.org markup (LocalBusiness, Article)
- [x] Performance (Lighthouse > 85)

**Tâches techniques :**

- [x] generateMetadata dans chaque page
- [x] Slugs uniques pour articles
- [ ] Générer sitemap.xml (next-sitemap)
- [ ] Ajouter robots.txt
- [ ] JSON-LD pour structured data

---

### US-024 : Partager du contenu sur les réseaux sociaux

**En tant que** visiteur  
**Je veux** partager un article avec une belle preview  
**Afin de** promouvoir le patrimoine auprès de mes amis

**Priorité** : 🟡 P2  
**Estimation** : S  
**Statut** : 📋 À faire

**Critères d'acceptation :**

- [ ] Open Graph tags (og:title, og:image, og:description)
- [ ] Twitter Card tags
- [ ] Image de preview 1200x630px
- [ ] Test avec Facebook Debugger / Twitter Card Validator

**Tâches techniques :**

- [ ] Ajouter OG tags dans generateMetadata
- [ ] Générer images preview (si manquantes)

---

## EPIC 7 : Maintenance et Évolution

### US-025 : Recevoir les emails de contact

**En tant qu'** administrateur  
**Je veux** recevoir les emails du formulaire de contact  
**Afin de** répondre aux demandes de partenariat

**Priorité** : 🔴 P0  
**Estimation** : M  
**Statut** : ✅ Terminé

**Critères d'acceptation :**

- [x] Email envoyé à l'adresse configurée (SMTP)
- [x] Objet : "[APD Contact] Sujet du formulaire"
- [x] Corps : Nom, Email, Téléphone, Message
- [x] Réponse automatique à l'expéditeur (optionnel)
- [x] Gestion des erreurs SMTP

**Tâches techniques :**

- [x] Controller `email.ts` avec Nodemailer
- [x] Configuration SMTP dans `.env`
- [x] Service email avec fonction `sendContactEmail`

---

### US-026 : Sauvegarder les données régulièrement

**En tant qu'** administrateur technique  
**Je veux** des backups automatiques de la base de données  
**Afin de** prévenir toute perte de données

**Priorité** : 🟠 P1  
**Estimation** : M  
**Statut** : 📋 À faire

**Critères d'acceptation :**

- [ ] Backup quotidien PostgreSQL (pg_dump)
- [ ] Rétention 30 jours minimum
- [ ] Stockage externe (AWS S3, Backblaze)
- [ ] Test de restauration mensuel
- [ ] Alerte si backup échoue

**Solutions :**

- [ ] Cron job avec pg_dump
- [ ] Railway snapshots (si hébergement Railway)
- [ ] Script bash pour automation

---

### US-027 : Suivre les statistiques de trafic

**En tant que** gestionnaire du site  
**Je veux** connaître le nombre de visiteurs et pages vues  
**Afin d'** évaluer l'impact du site

**Priorité** : 🟡 P2  
**Estimation** : S  
**Statut** : 📋 À faire

**Critères d'acceptation :**

- [ ] Outil d'analytics installé (Google Analytics / Plausible)
- [ ] Tracking des pages vues
- [ ] Origine du trafic (direct, réseaux sociaux, search)
- [ ] Respect RGPD (consentement cookies si GA)

**Solutions :**

- [ ] Google Analytics 4 (gratuit, complet)
- [ ] Plausible (privacy-friendly, payant)
- [ ] Umami (self-hosted, gratuit)

---

## RÉCAPITULATIF

### Par Statut

- ✅ **Terminé** : 23 user stories
- 🚧 **En cours** : 2 user stories
- 📋 **À faire** : 2 user stories

### Par Priorité

- 🔴 **P0 (Critique)** : 15 user stories → 13 terminées
- 🟠 **P1 (Importante)** : 9 user stories → 8 terminées
- 🟡 **P2 (Souhaitable)** : 3 user stories → 0 terminées

### Par Epic

1. **Découverte du Patrimoine** : 5/5 terminées
2. **Navigation et Contenu** : 4/4 terminées
3. **Engagement et Partenariat** : 4/4 terminées
4. **Administration** : 5/5 terminées
5. **Expérience Utilisateur** : 3/4 terminées
6. **SEO et Référencement** : 1/2 terminées
7. **Maintenance et Évolution** : 1/3 terminées

---

## MAPPING CCP (TP DWWM)

### CCP1 - Développer la partie front-end d'une application web

- US-001, 002, 003, 004, 005 : Composants React réutilisables
- US-006, 007, 008, 009 : Routing Next.js, navigation
- US-019, 020, 021 : Responsive design, animations, performance
- US-022, 023 : Accessibilité, SEO

**Compétences démontrées :**

- ✅ Maquetter une application (wireframes)
- ✅ Réaliser une interface utilisateur web statique et adaptable
- ✅ Développer une interface utilisateur web dynamique (React, GSAP)
- ✅ Réaliser une interface utilisateur avec une solution de gestion de contenu

### CCP2 - Développer la partie back-end d'une application web

- US-012, 025 : API REST, envoi emails
- US-014, 015, 016, 017, 018 : CMS Strapi, CRUD
- US-026 : Backups, gestion base de données

**Compétences démontrées :**

- ✅ Créer une base de données (PostgreSQL, 8 tables)
- ✅ Développer les composants d'accès aux données (Strapi ORM)
- ✅ Développer la partie back-end d'une application web (API REST)
- ✅ Élaborer et mettre en œuvre des composants dans une application de gestion de contenu

---

**Document édité par** : Philippe Barbosa  
**Dernière mise à jour** : 19/11/2025

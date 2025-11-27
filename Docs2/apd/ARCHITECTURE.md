# 🏛️ Architecture Technique - Projet APD

> Association Patrimoine de Doazit - Documentation d'Architecture

**Version** : 1.0  
**Date** : 19 Novembre 2025  
**Architecte** : Philippe Barbosa

---

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture système](#architecture-système)
3. [Architecture applicative](#architecture-applicative)
4. [Diagrammes UML](#diagrammes-uml)
5. [Stack technique](#stack-technique)
6. [Flux de données](#flux-de-données)
7. [Déploiement](#déploiement)
8. [Sécurité](#sécurité)

---

## Vue d'ensemble

### Type d'architecture

**Jamstack** (JavaScript, APIs, Markup)

```
┌─────────────────────────────────────────────────────────────┐
│                         UTILISATEURS                         │
│          (Visiteurs, Administrateurs, Partenaires)          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTPS
                         │
        ┌────────────────┴────────────────┐
        │                                  │
        │                                  │
┌───────▼────────┐                ┌───────▼────────┐
│   FRONTEND     │                │   BACKEND      │
│   (Next.js)    │◄──────────────►│   (Strapi)     │
│                │   REST API     │                │
│  - React 19    │                │ - PostgreSQL   │
│  - Tailwind    │                │ - Cloudinary   │
│  - GSAP        │                │ - Nodemailer   │
└────────────────┘                └────────────────┘
        │                                  │
        │                                  │
        │                          ┌───────▼────────┐
        │                          │   DATABASE     │
        │                          │   PostgreSQL   │
        │                          └────────────────┘
        │
        │                          ┌───────────────┐
        └─────────────────────────►│   CDN         │
                                   │   Cloudinary  │
                                   └───────────────┘
```

### Principes architecturaux

1. **Séparation des préoccupations** : Frontend et backend découplés
2. **Scalabilité** : Composants indépendants, faciles à scaler
3. **Performance** : CDN, cache, SSR/SSG
4. **Sécurité** : JWT, CORS, validation des données
5. **Maintenabilité** : Code modulaire, TypeScript backend

---

## Architecture Système

### Diagramme de déploiement (Mermaid)

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Browser - Navigateur Web]
        Mobile[Mobile - iOS/Android]
    end

    subgraph "CDN Layer"
        CloudinaryCDN[Cloudinary CDN<br/>Images & Vidéos]
    end

    subgraph "Application Layer"
        Vercel[Vercel<br/>Next.js Frontend]
        Railway[Railway<br/>Strapi Backend]
    end

    subgraph "Data Layer"
        PostgreSQL[(PostgreSQL<br/>Database)]
        CloudinaryStorage[(Cloudinary<br/>Storage)]
    end

    subgraph "Services"
        Gmail[Gmail SMTP<br/>Email Service]
    end

    Browser -->|HTTPS| Vercel
    Mobile -->|HTTPS| Vercel
    Vercel -->|REST API| Railway
    Vercel -->|Images| CloudinaryCDN
    Railway -->|Upload| CloudinaryStorage
    Railway -->|SQL| PostgreSQL
    Railway -->|SMTP| Gmail
    CloudinaryCDN -->|Optimize| CloudinaryStorage

    style Vercel fill:#00C7B7
    style Railway fill:#7E3AF2
    style PostgreSQL fill:#336791
    style CloudinaryCDN fill:#3448C5
```

---

## Architecture Applicative

### Architecture Frontend (Next.js)

```mermaid
graph LR
    subgraph "Next.js App Router"
        Pages[Pages<br/>app/]
        Components[Components<br/>components/]
        Contexts[Contexts<br/>contexts/]
        Hooks[Hooks<br/>hooks/]
        Utils[Utils/Services]
    end

    subgraph "External APIs"
        StrapiAPI[Strapi API<br/>:1337/api]
        Cloudinary[Cloudinary CDN]
    end

    Pages --> Components
    Pages --> Hooks
    Components --> Contexts
    Hooks --> StrapiAPI
    Hooks --> Cloudinary
    Components --> Utils

    style Pages fill:#61DAFB
    style Components fill:#61DAFB
    style StrapiAPI fill:#7E3AF2
```

### Structure Frontend

```
frontend/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── page.jsx           # Page d'accueil
│   │   ├── layout.js          # Layout global
│   │   ├── globals.css        # Styles globaux
│   │   ├── blog/
│   │   │   ├── page.jsx       # Liste articles
│   │   │   └── [slug]/
│   │   │       └── page.jsx   # Article détaillé
│   │   ├── association/
│   │   │   └── page.jsx       # Page association
│   │   └── partners/
│   │       └── page.jsx       # Page partenaires
│   ├── components/            # Composants React
│   │   ├── Header.jsx         # Header + navigation
│   │   ├── Footer.jsx         # Footer
│   │   ├── VideoBackground.jsx
│   │   ├── IntroSection.jsx   # Hero section
│   │   ├── Gallery.jsx        # Galerie photos
│   │   ├── BlogSection.jsx    # Section blog (accueil)
│   │   ├── PartnerSection.jsx # Carousel partenaires
│   │   ├── ContactModal.jsx   # Modal formulaire
│   │   └── ...
│   ├── contexts/              # Contexts React
│   │   └── HeaderDonationContext.jsx
│   ├── hooks/                 # Hooks personnalisés
│   │   ├── useIsMobile.jsx
│   │   └── useSiteData.jsx
│   └── utils/                 # Utilitaires
└── public/                    # Assets statiques
    ├── fonts/
    └── robots.txt
```

**Patterns utilisés :**

- **Server Components** : Fetch data côté serveur (par défaut)
- **Client Components** : Interactivité (`"use client"`)
- **Dynamic Imports** : Code splitting (`next/dynamic`)
- **Context API** : State global (donation button)
- **Custom Hooks** : Logique réutilisable

---

### Architecture Backend (Strapi)

```mermaid
graph TB
    subgraph "Strapi Core"
        API[REST API Layer]
        Controllers[Controllers]
        Services[Services]
        ContentTypes[Content-Types<br/>Schemas]
    end

    subgraph "Database Layer"
        ORM[Knex.js ORM]
        DB[(PostgreSQL)]
    end

    subgraph "Plugins"
        Upload[Upload Plugin<br/>Cloudinary]
        UsersPermissions[Users-Permissions]
    end

    API --> Controllers
    Controllers --> Services
    Services --> ContentTypes
    ContentTypes --> ORM
    ORM --> DB
    Controllers --> Upload
    API --> UsersPermissions

    style API fill:#7E3AF2
    style DB fill:#336791
```

### Structure Backend

```
src/
├── api/                       # Custom API endpoints
│   ├── eglise/
│   │   ├── content-types/
│   │   │   └── eglise/
│   │   │       └── schema.json
│   │   ├── controllers/
│   │   │   └── eglise.ts
│   │   ├── routes/
│   │   │   └── eglise.ts
│   │   └── services/
│   │       └── eglise.ts
│   ├── article/               # Idem structure
│   ├── interview/
│   ├── partenaire/
│   ├── association/
│   ├── parametres-site/
│   ├── accueil/
│   └── email/                 # Custom email endpoint
│       ├── controllers/
│       │   └── email.ts
│       └── routes/
│           └── email.ts
├── components/                # Components réutilisables
│   └── eglise/
│       └── adresse.json       # Component localisation
├── extensions/                # Extensions plugins
│   └── upload/
│       └── content-types/     # Override Upload plugin
├── services/                  # Services globaux
│   └── email.ts               # Service Nodemailer
└── index.ts                   # Entry point
config/
├── admin.ts                   # Config admin panel
├── api.ts                     # Config API
├── database.ts                # Config PostgreSQL
├── middlewares.ts             # CORS, sécurité
├── plugins.ts                 # Cloudinary, email
└── server.ts                  # Config serveur
```

**Patterns utilisés :**

- **MVC** : Controllers → Services → Models (Content-Types)
- **Plugin Architecture** : Extensions modulaires
- **Dependency Injection** : Services injectés
- **ORM Pattern** : Knex.js pour requêtes SQL

---

## Diagrammes UML

### Diagramme de classes (Simplifié)

```mermaid
classDiagram
    class Eglise {
        +String documentId
        +String nom
        +JSON description
        +JSON histoire
        +JSON style_architectural
        +Media[] images
        +Media plan
        +Localisation[] localisations
    }

    class Article {
        +String documentId
        +String titre
        +JSON contenu
        +String auteur
        +Date date_publication
        +String slug
        +Media image
    }

    class Interview {
        +String documentId
        +String titre
        +JSON description
        +Media video
    }

    class Partenaire {
        +String documentId
        +String url
        +Media[] logos
    }

    class Localisation {
        +String ville
        +String region
        +String pays
        +String code_postal
    }

    class ParametresSite {
        +String documentId
        +JSON reseaux_sociaux
        +String url_don
        +String email_contact
        +Media logo_header
        +Media logo_footer
        +Localisation[] localisations
    }

    Eglise "1" --> "*" Localisation : a
    ParametresSite "1" --> "*" Localisation : a
```

---

### Diagramme de séquence - Envoi formulaire contact

```mermaid
sequenceDiagram
    actor User as Utilisateur
    participant Modal as ContactModal
    participant API as Strapi API
    participant EmailService as EmailService
    participant SMTP as Gmail SMTP

    User->>Modal: Clic "Devenir partenaire"
    Modal->>Modal: Ouvrir modal
    User->>Modal: Remplir formulaire
    User->>Modal: Submit
    Modal->>Modal: Validation côté client
    Modal->>API: POST /api/email/send
    API->>API: Validation backend
    API->>EmailService: sendContactEmail(data)
    EmailService->>SMTP: Envoyer email
    SMTP-->>EmailService: 250 OK
    EmailService-->>API: Success
    API-->>Modal: 200 {success: true}
    Modal->>Modal: Afficher message succès
    Modal->>Modal: Fermer modal
    Modal-->>User: Confirmation visuelle
```

---

### Diagramme de séquence - Chargement page article

```mermaid
sequenceDiagram
    actor User as Utilisateur
    participant Browser as Navigateur
    participant NextJS as Next.js Server
    participant Strapi as Strapi API
    participant DB as PostgreSQL

    User->>Browser: Visite /blog/mon-article
    Browser->>NextJS: GET /blog/mon-article
    NextJS->>Strapi: GET /api/articles?filters[slug]=mon-article
    Strapi->>DB: SELECT * FROM articles WHERE slug=?
    DB-->>Strapi: Article data
    Strapi-->>NextJS: 200 JSON
    NextJS->>NextJS: Render Server Component
    NextJS-->>Browser: HTML + React Components
    Browser->>Browser: Hydration React
    Browser-->>User: Page affichée
```

---

### Diagramme de composants

```mermaid
graph TB
    subgraph "Frontend - Next.js"
        PageAccueil[Page Accueil]
        PageBlog[Page Blog]
        PageArticle[Page Article [slug]]
        PageAssociation[Page Association]
        PagePartners[Page Partners]

        Header[Header Component]
        Footer[Footer Component]
        Gallery[Gallery Component]
        BlogSection[BlogSection Component]
        ContactModal[ContactModal Component]

        useSiteData[useSiteData Hook]
        HeaderContext[HeaderDonationContext]
    end

    subgraph "Backend - Strapi"
        APIEglise[API Eglise]
        APIArticles[API Articles]
        APIPartenaires[API Partenaires]
        APIEmail[API Email Custom]

        CloudinaryPlugin[Cloudinary Plugin]
        EmailService[Email Service]
    end

    PageAccueil --> Header
    PageAccueil --> Gallery
    PageAccueil --> BlogSection
    PageAccueil --> Footer

    PageBlog --> Header
    PageBlog --> Footer

    PageArticle --> Header
    PageArticle --> Footer

    PagePartners --> ContactModal

    Header --> HeaderContext
    Footer --> useSiteData

    useSiteData --> APIEglise
    useSiteData --> APIPartenaires

    BlogSection --> APIArticles
    ContactModal --> APIEmail
    APIEmail --> EmailService

    APIEglise --> CloudinaryPlugin
    APIArticles --> CloudinaryPlugin

    style PageAccueil fill:#61DAFB
    style APIEglise fill:#7E3AF2
```

---

## Stack Technique

### Frontend

| Technologie      | Version | Rôle            | Justification                             |
| ---------------- | ------- | --------------- | ----------------------------------------- |
| **Next.js**      | 15.5.3  | Framework React | SSR/SSG, App Router, Optimisations images |
| **React**        | 19.1.0  | UI Library      | Composants réutilisables, Hooks           |
| **Tailwind CSS** | 4.0     | Styling         | Utility-first, Responsive rapide          |
| **GSAP**         | 3.13.0  | Animations      | Scroll animations performantes            |
| **Lucide React** | 0.469.0 | Icônes          | Icons modernes, tree-shakeable            |

### Backend

| Technologie    | Version | Rôle            | Justification                         |
| -------------- | ------- | --------------- | ------------------------------------- |
| **Strapi**     | 5.30.0  | Headless CMS    | API REST auto, Admin panel            |
| **Node.js**    | 20.19.5 | Runtime         | Performance, npm ecosystem            |
| **TypeScript** | 5.x     | Langage backend | Type safety, meilleure maintenabilité |
| **PostgreSQL** | 14+     | Database        | ACID, JSONB, relations                |
| **Knex.js**    | Inclus  | ORM             | Query builder, migrations             |

### Services Externes

| Service        | Usage                | Plan                 |
| -------------- | -------------------- | -------------------- |
| **Cloudinary** | CDN images/vidéos    | Free (25 GB)         |
| **Gmail SMTP** | Envoi emails         | Free (500/jour)      |
| **Vercel**     | Hébergement frontend | Hobby (gratuit)      |
| **Railway**    | Hébergement backend  | Starter ($5-20/mois) |

---

## Flux de Données

### Flux de récupération des données (Read)

```mermaid
graph LR
    User[Utilisateur] -->|1. Requête HTTP| NextJS[Next.js Server]
    NextJS -->|2. Fetch API| Strapi[Strapi API]
    Strapi -->|3. SQL Query| PostgreSQL[(PostgreSQL)]
    PostgreSQL -->|4. Data| Strapi
    Strapi -->|5. Populate relations| Cloudinary[Cloudinary URLs]
    Strapi -->|6. JSON Response| NextJS
    NextJS -->|7. Render HTML| User

    style NextJS fill:#61DAFB
    style Strapi fill:#7E3AF2
    style PostgreSQL fill:#336791
```

---

### Flux de création de contenu (Write)

```mermaid
graph TB
    Admin[Administrateur] -->|1. Login| StrapiAdmin[Strapi Admin Panel]
    StrapiAdmin -->|2. Authenticate| JWT[JWT Token]
    Admin -->|3. Upload Image| UploadPlugin[Upload Plugin]
    UploadPlugin -->|4. Send to CDN| Cloudinary[Cloudinary]
    Cloudinary -->|5. Return URL| UploadPlugin
    Admin -->|6. Create Article| Controller[Article Controller]
    Controller -->|7. Validate| Service[Article Service]
    Service -->|8. INSERT| PostgreSQL[(PostgreSQL)]
    PostgreSQL -->|9. Confirm| Service
    Service -->|10. Success| Admin

    style StrapiAdmin fill:#7E3AF2
    style Cloudinary fill:#3448C5
```

---

### Flux d'envoi email

```mermaid
graph LR
    User[Visiteur] -->|1. Submit Form| Modal[ContactModal]
    Modal -->|2. POST /api/email/send| EmailController[Email Controller]
    EmailController -->|3. Validate Data| Validator[Validation Layer]
    Validator -->|4. Call Service| EmailService[Email Service]
    EmailService -->|5. Create Mail| Nodemailer[Nodemailer]
    Nodemailer -->|6. SMTP| Gmail[Gmail SMTP]
    Gmail -->|7. Send| Recipient[Destinataire]
    Gmail -->|8. 250 OK| Nodemailer
    Nodemailer -->|9. Success| EmailService
    EmailService -->|10. 200 Response| Modal
    Modal -->|11. Show Success| User

    style Modal fill:#61DAFB
    style EmailService fill:#7E3AF2
```

---

## Déploiement

### Environnements

```mermaid
graph LR
    subgraph "Development"
        DevFrontend[Next.js<br/>localhost:3000]
        DevBackend[Strapi<br/>localhost:1337]
        DevDB[(PostgreSQL<br/>local)]
    end

    subgraph "Staging - À configurer"
        StagingFrontend[Next.js<br/>staging.vercel.app]
        StagingBackend[Strapi<br/>staging.railway.app]
        StagingDB[(PostgreSQL<br/>Railway)]
    end

    subgraph "Production"
        ProdFrontend[Next.js<br/>www.patrimoine-doazit.fr]
        ProdBackend[Strapi<br/>api.patrimoine-doazit.fr]
        ProdDB[(PostgreSQL<br/>Railway)]
    end

    DevFrontend -.->|Deploy| StagingFrontend
    StagingFrontend -.->|Deploy| ProdFrontend
    DevBackend -.->|Deploy| StagingBackend
    StagingBackend -.->|Deploy| ProdBackend

    style ProdFrontend fill:#00C7B7
    style ProdBackend fill:#7E3AF2
```

---

### Pipeline CI/CD (GitHub Actions)

```mermaid
graph LR
    Developer[Developer] -->|1. Git Push| GitHub[GitHub Repository]
    GitHub -->|2. Trigger| GHActions[GitHub Actions]

    GHActions -->|3a. Build Frontend| VercelBuild[Vercel Build]
    GHActions -->|3b. Build Backend| RailwayBuild[Railway Build]

    VercelBuild -->|4a. Deploy| Vercel[Vercel Production]
    RailwayBuild -->|4b. Deploy| Railway[Railway Production]

    Railway -->|5. Migrate DB| PostgreSQL[(PostgreSQL)]

    style GitHub fill:#181717
    style Vercel fill:#00C7B7
    style Railway fill:#7E3AF2
```

**Étapes déploiement** :

1. Developer push code sur branche `main`
2. GitHub Actions déclenché
3. Tests automatiques (si configurés)
4. Build frontend (Next.js)
5. Build backend (Strapi TypeScript)
6. Deploy Vercel (frontend)
7. Deploy Railway (backend)
8. Migrations database (auto)
9. Invalidation cache Cloudinary (si nécessaire)

---

### Configuration Infrastructure as Code

**Vercel (vercel.json)** :

```json
{
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/.next",
  "framework": "nextjs",
  "env": {
    "NEXT_PUBLIC_API_URL": "https://api.patrimoine-doazit.fr/api"
  }
}
```

**Railway (railway.toml)** :

```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm run start"
healthcheckPath = "/_health"
healthcheckTimeout = 100
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

[[services]]
name = "strapi"
port = 1337
```

---

## Sécurité

### Modèle de menaces

```mermaid
graph TB
    subgraph "Menaces"
        SQLInjection[SQL Injection]
        XSS[Cross-Site Scripting]
        CSRF[CSRF Attacks]
        DataBreach[Data Breach]
        DDoS[DDoS Attack]
    end

    subgraph "Protections"
        ORM[ORM - Prepared Statements]
        Sanitization[Input Sanitization]
        CORS[CORS Policy]
        JWT[JWT Authentication]
        RateLimit[Rate Limiting]
        HTTPS[HTTPS/SSL]
        Backups[Daily Backups]
    end

    SQLInjection -.->|Mitigé par| ORM
    XSS -.->|Mitigé par| Sanitization
    CSRF -.->|Mitigé par| CORS
    DataBreach -.->|Mitigé par| JWT
    DataBreach -.->|Mitigé par| Backups
    DDoS -.->|Mitigé par| RateLimit
    DataBreach -.->|Mitigé par| HTTPS

    style SQLInjection fill:#FF4444
    style ORM fill:#44FF44
```

---

### Stratégie de sécurité

| Couche               | Mesure           | Implémentation                              |
| -------------------- | ---------------- | ------------------------------------------- |
| **Transport**        | HTTPS            | Certificat SSL Let's Encrypt                |
| **Authentification** | JWT              | Strapi Users-Permissions                    |
| **Autorisation**     | RBAC             | Roles (Public, Authenticated, Admin)        |
| **Données**          | Validation       | Yup schemas (Strapi)                        |
| **Données**          | Sanitization     | Strapi auto-sanitize                        |
| **API**              | CORS             | Origins whitelist (`config/middlewares.ts`) |
| **API**              | Rate Limiting    | 5 req/h sur `/api/email/send`               |
| **Database**         | Backup           | Daily pg_dump (Railway snapshots)           |
| **Secrets**          | Environment Vars | `.env` (non versionné)                      |

---

### Checklist Sécurité Production

- [x] HTTPS activé (SSL/TLS)
- [x] CORS configuré (origines autorisées uniquement)
- [x] JWT secrets complexes (32+ caractères)
- [x] Variables d'environnement sécurisées
- [ ] Rate limiting activé (API endpoints)
- [x] Validation des inputs (côté client + serveur)
- [x] Sanitization automatique (Strapi)
- [ ] CSP headers (Content Security Policy)
- [ ] Backups automatiques quotidiens
- [ ] Monitoring erreurs (Sentry/autre)
- [ ] Logs sécurisés (pas de secrets loggés)

---

## Performances

### Optimisations appliquées

**Frontend** :

- ✅ **SSR/SSG** : Server-Side Rendering pour SEO
- ✅ **Code Splitting** : Dynamic imports (`next/dynamic`)
- ✅ **Image Optimization** : Next.js Image (WebP, lazy load)
- ✅ **Font Optimization** : Préchargement polices
- ✅ **CSS Minification** : Tailwind purge

**Backend** :

- ✅ **Database Indexing** : Index sur `slug`, `date_publication`, `published_at`
- ✅ **CDN** : Cloudinary pour médias
- ✅ **Query Optimization** : Populate sélectif (éviter N+1)
- ✅ **Caching** : Cache API (stale-while-revalidate)

**Résultats Lighthouse** :

- Performance : 92 (desktop), 78 (mobile - vidéo lourde)
- SEO : 100
- Best Practices : 100
- Accessibility : 88-92

---

## Évolutions futures

### Roadmap technique

**Phase 1 - Court terme (1-3 mois)** :

- [ ] Implémenter système de cache Redis
- [ ] Ajouter monitoring (Sentry pour erreurs)
- [ ] Mettre en place analytics (Plausible/GA4)
- [ ] Optimiser vidéo de fond (compression)

**Phase 2 - Moyen terme (3-6 mois)** :

- [ ] Système de commentaires (articles)
- [ ] Newsletter (intégration Mailchimp/Sendinblue)
- [ ] Événements à venir (nouveau content-type)
- [ ] Galerie par années (filtres)

**Phase 3 - Long terme (6-12 mois)** :

- [ ] Progressive Web App (PWA)
- [ ] Mode hors-ligne (Service Workers)
- [ ] Multilingue (i18n)
- [ ] Dashboard analytics admin

---

**Document édité par** : Philippe Barbosa  
**Contact** : philippe.barbosa@example.com  
**Dernière mise à jour** : 19/11/2025

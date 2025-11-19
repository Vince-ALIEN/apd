# ���️ Site Web - Association Patrimoine de Doazit (apd)

> Projet de site web vitrine avec système de gestion de contenu (CMS) développé dans le cadre du Titre Professionnel Développeur Web et Web Mobile.

## ��� Table des matières

- [Présentation](#-présentation)
- [Architecture](#-architecture)
- [Technologies](#-technologies)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)
- [API Endpoints](#-api-endpoints)
- [Déploiement](#️-déploiement)
- [Documentation](#-documentation)
- [Contribution](#-contribution)
- [Licence](#-licence)

## ��� Présentation

Site web vitrine moderne pour la valorisation du patrimoine religieux et historique, permettant :

- ��� Présentation d'édifices historiques (architecture, histoire, galeries photos)
- ��� Publication d'articles de blog et témoignages
- ��� Intégration de vidéos et interviews
- ��� Affichage des partenaires
- ��� Formulaire de contact et système de dons
- ���️ Carte interactive avec localisation
- ��� Interface responsive (mobile, tablette, desktop)

**Architecture :** Jamstack (JavaScript, APIs, Markup) avec découplage frontend/backend

## ���️ Architecture

```
┌─────────────────┐      REST API      ┌──────────────────┐
│                 │ ◄──────────────────► │                  │
│   Frontend      │                     │    Backend       │
│   Next.js 15    │                     │   Strapi v5      │
│   React 19      │                     │   PostgreSQL     │
│                 │                     │                  │
└─────────────────┘                     └──────────────────┘
        │                                        │
        │                                        │
        ▼                                        ▼
┌─────────────────┐                     ┌──────────────────┐
│   Cloudinary    │                     │   Nodemailer     │
│   (CDN Media)   │                     │   Resend (Email) │
└─────────────────┘                     └──────────────────┘
```

## ���️ Technologies

### Backend (CMS Strapi)

| Technologie | Version | Description                    |
| ----------- | ------- | ------------------------------ |
| Node.js     | 20.19.5 | Runtime JavaScript             |
| TypeScript  | 5.x     | Langage typé                   |
| Strapi      | 5.30.0  | Headless CMS                   |
| PostgreSQL  | 8.16+   | Base de données relationnelle  |
| Cloudinary  | Latest  | Upload et CDN pour médias      |
| Nodemailer  | 7.0.9   | Envoi d'emails transactionnels |
| Resend      | 6.1.3   | Service email de secours       |

### Frontend (Next.js)

| Technologie   | Version | Description                  |
| ------------- | ------- | ---------------------------- |
| Next.js       | 15.5.3  | Framework React avec SSR/SSG |
| React         | 19.1.0  | Bibliothèque UI              |
| Tailwind CSS  | 4.x     | Framework CSS utility-first  |
| GSAP          | 3.13.0  | Animations avancées          |
| Framer Motion | Latest  | Animations React             |
| Lenis         | 1.0.42  | Smooth scroll                |
| Leaflet       | 1.9.4   | Cartes interactives          |
| FontAwesome   | 7.0.1   | Bibliothèque d'icônes        |

### Outils de développement

- **Git/GitHub** - Contrôle de version
- **npm** - Gestionnaire de paquets
- **VS Code** - Éditeur de code
- **nvm** - Gestionnaire de versions Node.js
- **ESLint** - Linter JavaScript/TypeScript
- **Postman** - Tests API

## ��� Prérequis

- **Node.js** : v20.x (recommandé : 20.19.5)
- **npm** : v10.x
- **PostgreSQL** : v14+
- **Git** : v2.x
- **nvm** (optionnel) : pour gérer les versions Node.js

### Vérifier les versions installées

```bash
node -v    # Doit afficher v20.x.x
npm -v     # Doit afficher 10.x.x
psql --version  # PostgreSQL 14+
git --version
```

### Installer Node.js 20 avec nvm (si nécessaire)

```bash
# Windows (nvm-windows)
nvm install 20.19.5
nvm use 20.19.5

# Linux/macOS
nvm install 20
nvm use 20
```

## ��� Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/Vince-ALIEN/apd.git
cd apd
```

### 2. Configuration Backend (Strapi)

```bash
# Installer les dépendances
npm ci

# Créer le fichier .env
cp .env.example .env
```

**Configurer les variables d'environnement (`.env`) :**

```bash
# Serveur Strapi
HOST=0.0.0.0
PORT=1337
APP_KEYS="random_key_1,random_key_2,random_key_3,random_key_4"
API_TOKEN_SALT=random_salt_here
ADMIN_JWT_SECRET=admin_jwt_secret_here
TRANSFER_TOKEN_SALT=transfer_salt_here
JWT_SECRET=jwt_secret_here

# Base de données PostgreSQL
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=votre_base_de_donnees
DATABASE_USERNAME=votre_utilisateur
DATABASE_PASSWORD=votre_mot_de_passe
DATABASE_SSL=false

# Cloudinary (Upload médias)
CLOUDINARY_NAME=votre_cloud_name
CLOUDINARY_KEY=votre_api_key
CLOUDINARY_SECRET=votre_api_secret

# Email (Nodemailer)
SMTP_HOST=smtp.exemple.com
SMTP_PORT=587
SMTP_USER=votre@email.com
SMTP_PASS=votre_mot_de_passe
DEFAULT_FROM=noreply@votre-domaine.com

# Resend (Service email backup)
RESEND_API_KEY=votre_resend_api_key
```

**Créer la base de données PostgreSQL :**

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE nom_base_de_donnees;

# Créer un utilisateur (optionnel)
CREATE USER nom_utilisateur WITH PASSWORD 'mot_de_passe';
GRANT ALL PRIVILEGES ON DATABASE nom_base_de_donnees TO nom_utilisateur;

# Quitter psql
\q
```

### 3. Configuration Frontend (Next.js)

```bash
cd frontend

# Installer les dépendances
npm ci

# Créer le fichier .env.local
cp .env.example .env.local
```

**Configurer les variables d'environnement frontend (`.env.local`) :**

```bash
# URL de l'API Strapi
NEXT_PUBLIC_API_URL=http://localhost:1337

# URL publique du site (pour SSG)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## ��� Utilisation

### Développement

**Terminal 1 - Backend (Strapi) :**

```bash
# Depuis la racine du projet
npm run dev
```

Le backend Strapi sera accessible sur : http://localhost:1337/admin

**Terminal 2 - Frontend (Next.js) :**

```bash
cd frontend
npm run dev
```

Le frontend Next.js sera accessible sur : http://localhost:3000

### Première utilisation de Strapi

1. Ouvrir http://localhost:1337/admin
2. Créer un compte administrateur
3. Configurer les content-types (déjà créés) :
   - Accueil
   - Église
   - Article
   - Interview
   - Partenaire
   - Association
   - Paramètres du site

### Build production

**Backend :**

```bash
npm run build
npm start
```

**Frontend :**

```bash
cd frontend
npm run build
npm start
```

## ��� Structure du projet

```
apd/
├── config/                 # Configuration Strapi
│   ├── admin.ts           # Config panel admin
│   ├── api.ts             # Config API
│   ├── database.ts        # Config PostgreSQL
│   ├── middlewares.ts     # Middlewares
│   ├── plugins.ts         # Plugins (upload, email)
│   └── server.ts          # Config serveur
│
├── database/
│   └── migrations/        # Migrations SQL
│
├── frontend/              # Application Next.js
│   ├── public/           # Assets statiques
│   │   ├── fonts/        # Polices personnalisées
│   │   └── *.png         # Images et cadres décoratifs
│   │
│   ├── src/
│   │   ├── app/          # Pages (App Router Next.js 15)
│   │   │   ├── page.jsx              # Page d'accueil
│   │   │   ├── layout.js             # Layout racine
│   │   │   ├── globals.css           # Styles globaux
│   │   │   ├── association/page.jsx  # Page association
│   │   │   ├── blog/
│   │   │   │   ├── page.jsx          # Liste des articles
│   │   │   │   └── [slug]/page.jsx   # Article dynamique
│   │   │   └── partners/page.jsx     # Page partenaires
│   │   │
│   │   ├── components/   # Composants React (16)
│   │   │   ├── VideoBackground.jsx
│   │   │   ├── IntroSection.jsx
│   │   │   ├── DescriptionSection.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Architecture.jsx
│   │   │   ├── Interview.jsx
│   │   │   ├── BlogSection.jsx
│   │   │   ├── PartnerSection.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── HeaderWrapper.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ContactModal.jsx
│   │   │   ├── DonationButton.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── ScrollIndicator.jsx
│   │   │   └── AddressSection.jsx
│   │   │
│   │   ├── contexts/     # Contextes React
│   │   │   └── HeaderDonationContext.jsx
│   │   │
│   │   └── hooks/        # Hooks personnalisés
│   │       ├── useSiteData.jsx
│   │       └── useIsMobile.jsx
│   │
│   ├── .env.local        # Variables environnement (non versionné)
│   ├── eslint.config.mjs # Config ESLint
│   ├── next.config.js    # Config Next.js
│   ├── tailwind.config.js # Config Tailwind CSS
│   └── package.json      # Dépendances frontend
│
├── src/                   # Code backend Strapi
│   ├── api/              # Content-Types (7)
│   │   ├── accueil/
│   │   │   ├── content-types/accueil/schema.json
│   │   │   ├── controllers/accueil.ts
│   │   │   ├── routes/accueil.ts
│   │   │   └── services/accueil.ts
│   │   ├── article/
│   │   ├── association/
│   │   ├── eglise/
│   │   ├── email/
│   │   ├── interview/
│   │   ├── parametres-site/
│   │   └── partenaire/
│   │
│   ├── components/       # Composants Strapi réutilisables
│   │   └── eglise/adresse.json
│   │
│   ├── extensions/       # Extensions Strapi
│   │   └── upload/
│   │       └── content-types/file/lifecycles.js
│   │
│   ├── services/         # Services métier personnalisés
│   │   └── email.ts
│   │
│   └── index.ts          # Point d'entrée Strapi
│
├── types/                # Types TypeScript générés
│   └── generated/
│       ├── components.d.ts
│       └── contentTypes.d.ts
│
├── .env                  # Variables environnement backend (non versionné)
├── .env.example          # Template variables environnement
├── .gitignore           # Fichiers ignorés par Git
├── package.json         # Dépendances backend
├── tsconfig.json        # Configuration TypeScript
├── README.md            # Ce fichier
└── LIVRET_SUIVI_STAGE.md # Documentation de stage
```

## ��� API Endpoints

### Endpoints principaux (auto-générés par Strapi)

**Collection Types :**

```bash
# Accueil
GET    /api/accueil

# Églises
GET    /api/eglises
GET    /api/eglises/:id

# Articles
GET    /api/articles
GET    /api/articles/:id

# Interviews
GET    /api/interviews
GET    /api/interviews/:id

# Partenaires
GET    /api/partenaires
GET    /api/partenaires/:id

# Association
GET    /api/associations

# Paramètres du site
GET    /api/parametres-site
```

**Authentification :**

```bash
POST   /api/auth/local            # Login
POST   /api/auth/local/register   # Register
GET    /api/users/me               # Current user
```

### Endpoints personnalisés

```bash
POST   /api/email/send   # Envoi d'email via formulaire contact
```

**Exemple de requête :**

```bash
# Récupérer toutes les églises avec leurs images
curl http://localhost:1337/api/eglises?populate=*

# Récupérer un article par slug
curl http://localhost:1337/api/articles?filters[slug][$eq]=mon-article&populate=*
```

## Déploiement

### Backend (Strapi)

**Options recommandées :**

- **Strapi Cloud** (hosting officiel)
- **Railway** / **Render** (PostgreSQL inclus)
- **DigitalOcean** / **AWS** / **Azure**

**Variables d'environnement en production :**

```bash
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_SSL=true
```

### Frontend (Next.js)

**Options recommandées :**

- **Vercel** (hosting officiel Next.js)
- **Netlify**
- **Cloudflare Pages**

**Configuration Vercel :**

```bash
# Build command
npm run build

# Output directory
.next

# Environment variables
NEXT_PUBLIC_API_URL=https://votre-api.com
```

### Guide de déploiement complet

Consulter la [documentation Strapi](https://docs.strapi.io/dev-docs/deployment) pour plus de détails.

## ��� Documentation

### Documentation officielle

- [Strapi v5 Documentation](https://docs.strapi.io/)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GSAP Documentation](https://gsap.com/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### Scripts disponibles

**Backend (racine) :**

```bash
npm run dev           # Développement avec hot-reload
npm run build         # Build production
npm start             # Démarrage production
npm run upgrade       # Mise à jour Strapi
npm run upgrade:dry   # Simulation upgrade
```

**Frontend (`/frontend`) :**

```bash
npm run dev      # Développement (port 3000)
npm run build    # Build production
npm start        # Démarrage production
npm run lint     # Linter ESLint
```

## ��� Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** les changements (`git commit -m 'feat: Add AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

### Convention de commits

Utiliser [Conventional Commits](https://www.conventionalcommits.org/) :

```bash
feat: nouvelle fonctionnalité
fix: correction de bug
docs: documentation
style: formatage, lint
refactor: refactorisation de code
test: ajout de tests
chore: tâches de maintenance
```

## ��� Licence

Ce projet a été développé dans le cadre du **Titre Professionnel Développeur Web et Web Mobile**.

## ��� Auteur

**Philippe Barbosa**

- GitHub: [@Vince-ALIEN](https://github.com/Vince-ALIEN)

## ��� Remerciements

- Équipe [Strapi](https://strapi.io/)
- Équipe [Next.js](https://nextjs.org/)
- Communauté open-source

---

**Note :** Ce projet utilise Strapi v5 (dernière version stable). Assurez-vous d'utiliser Node.js v20 pour une compatibilité optimale.

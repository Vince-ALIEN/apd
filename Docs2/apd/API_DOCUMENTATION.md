# 🔌 Documentation API - Projet APD

> Association Patrimoine de Doazit - API REST Backend

**Version** : 1.0  
**Date** : 19 Novembre 2025  
**Base URL** : `http://localhost:1337/api` (développement)  
**Production** : `https://votre-domaine.com/api`

---

## Table des matières

1. [Authentification](#authentification)
2. [Endpoints Content-Types](#endpoints-content-types)
3. [Endpoint Email](#endpoint-email)
4. [Codes d'erreur](#codes-derreur)
5. [Exemples d'utilisation](#exemples-dutilisation)

---

## Authentification

### Admin Panel

L'accès aux endpoints d'administration nécessite une authentification JWT.

**Login Admin**

```http
POST /api/auth/local
Content-Type: application/json

{
  "identifier": "admin@example.com",
  "password": "votre_mot_de_passe"
}
```

**Réponse**

```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

**Utilisation du token**

```http
GET /api/articles
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Endpoints Content-Types

### 1. Église (Single Type)

#### GET /api/eglise

Récupère les informations de l'église (single type).

**Paramètres de requête**
| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `populate` | string | Relations à peupler | `populate=*` |

**Requête**

```http
GET /api/eglise?populate=*
```

**Réponse 200 OK**

```json
{
  "data": {
    "id": 1,
    "documentId": "abc123def456",
    "nom": "Église Saint-Jean Baptiste d'Aulès",
    "description": [
      {
        "type": "paragraph",
        "children": [
          { "type": "text", "text": "Édifice historique du XIIe siècle..." }
        ]
      }
    ],
    "histoire": [
      {
        "type": "paragraph",
        "children": [
          { "type": "text", "text": "Construite en 1150, cette église..." }
        ]
      }
    ],
    "style_architectural": [
      {
        "type": "paragraph",
        "children": [
          {
            "type": "text",
            "text": "Architecture romane avec influences gothiques..."
          }
        ]
      }
    ],
    "image_principale": {
      "id": 1,
      "url": "/uploads/eglise_principale_123.jpg",
      "alternativeText": "Façade de l'église",
      "width": 1920,
      "height": 1080,
      "formats": {
        "thumbnail": { "url": "/uploads/thumbnail_eglise_123.jpg" },
        "medium": { "url": "/uploads/medium_eglise_123.jpg" },
        "large": { "url": "/uploads/large_eglise_123.jpg" }
      }
    },
    "images": [
      {
        "id": 2,
        "url": "/uploads/interieur_eglise_456.jpg",
        "alternativeText": "Intérieur de l'église"
      }
      // ... 8 autres images
    ],
    "plan": {
      "id": 10,
      "url": "/uploads/plan_architectural_789.jpg",
      "alternativeText": "Plan architectural"
    },
    "localisation": [
      {
        "id": 1,
        "ville": "Doazit",
        "region": "Nouvelle-Aquitaine",
        "pays": "France",
        "code_postal": "40700"
      }
    ],
    "createdAt": "2025-01-10T10:00:00.000Z",
    "updatedAt": "2025-01-15T14:30:00.000Z"
  }
}
```

---

### 2. Articles (Collection Type)

#### GET /api/articles

Récupère la liste de tous les articles.

**Paramètres de requête**
| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `populate` | string | Relations à peupler | `populate=*` |
| `sort` | string | Tri | `sort[0]=date_publication:desc` |
| `pagination[page]` | number | Numéro de page | `pagination[page]=1` |
| `pagination[pageSize]` | number | Éléments par page | `pagination[pageSize]=10` |
| `pagination[limit]` | number | Limite d'éléments | `pagination[limit]=4` |
| `filters` | object | Filtres | `filters[slug][$eq]=mon-article` |

**Requête**

```http
GET /api/articles?populate=*&sort[0]=date_publication:desc&pagination[limit]=4
```

**Réponse 200 OK**

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "art123",
      "titre": "Restauration du clocher : les travaux avancent",
      "contenu": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "text": "Les travaux de restauration du clocher..."
            }
          ]
        },
        {
          "type": "heading",
          "level": 2,
          "children": [{ "type": "text", "text": "Avancement des travaux" }]
        }
      ],
      "image": {
        "id": 15,
        "url": "/uploads/clocher_restauration_123.jpg",
        "alternativeText": "Clocher en cours de restauration",
        "formats": {
          "thumbnail": { "url": "/uploads/thumbnail_clocher_123.jpg" },
          "medium": { "url": "/uploads/medium_clocher_123.jpg" }
        }
      },
      "auteur": "Marie Dupont",
      "date_publication": "2025-01-15",
      "slug": "restauration-clocher-2025",
      "createdAt": "2025-01-10T09:00:00.000Z",
      "updatedAt": "2025-01-15T11:00:00.000Z",
      "publishedAt": "2025-01-15T12:00:00.000Z"
    }
    // ... 3 autres articles
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 4,
      "pageCount": 3,
      "total": 12
    }
  }
}
```

#### GET /api/articles/:documentId

Récupère un article par son documentId.

**Requête**

```http
GET /api/articles/art123?populate=*
```

**Réponse 200 OK**

```json
{
  "data": {
    "id": 1,
    "documentId": "art123",
    "titre": "Restauration du clocher : les travaux avancent",
    "contenu": [
      {
        "type": "paragraph",
        "children": [
          { "type": "text", "text": "Les travaux de restauration..." }
        ]
      }
    ],
    "image": {
      /* ... */
    },
    "auteur": "Marie Dupont",
    "date_publication": "2025-01-15",
    "slug": "restauration-clocher-2025"
  }
}
```

#### Recherche d'article par slug

```http
GET /api/articles?filters[slug][$eq]=restauration-clocher-2025&populate=*
```

**Réponse 200 OK**

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "art123",
      "slug": "restauration-clocher-2025"
      /* ... autres champs ... */
    }
  ]
}
```

---

### 3. Interviews (Collection Type)

#### GET /api/interviews

Récupère la liste des interviews.

**Requête**

```http
GET /api/interviews?populate=*
```

**Réponse 200 OK**

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "int123",
      "titre": "Témoignage de l'ancien maire",
      "description": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "text": "Monsieur Dupuis raconte l'histoire de l'église..."
            }
          ]
        }
      ],
      "video": {
        "id": 20,
        "url": "/uploads/interview_maire_456.mp4",
        "mime": "video/mp4",
        "size": 52000000,
        "alternativeText": "Interview de l'ancien maire"
      },
      "createdAt": "2025-01-05T10:00:00.000Z",
      "updatedAt": "2025-01-05T10:00:00.000Z",
      "publishedAt": "2025-01-05T10:00:00.000Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

---

### 4. Partenaires (Collection Type)

#### GET /api/partenaires

Récupère la liste des partenaires.

**Requête**

```http
GET /api/partenaires?populate=*
```

**Réponse 200 OK**

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "part123",
      "logo": [
        {
          "id": 25,
          "url": "/uploads/logo_partenaire1_789.png",
          "alternativeText": "Logo Entreprise ABC",
          "width": 400,
          "height": 200
        }
      ],
      "url": "https://www.entreprise-abc.com",
      "createdAt": "2025-01-01T10:00:00.000Z",
      "publishedAt": "2025-01-01T10:00:00.000Z"
    }
    // ... autres partenaires
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 5
    }
  }
}
```

---

### 5. Association (Single Type)

#### GET /api/association

Récupère les informations de l'association.

**Requête**

```http
GET /api/association?populate=*
```

**Réponse 200 OK**

```json
{
  "data": {
    "id": 1,
    "documentId": "assoc123",
    "titre": "Association Patrimoine de Doazit",
    "description": [
      {
        "type": "paragraph",
        "children": [
          { "type": "text", "text": "Notre association a pour mission..." }
        ]
      }
    ],
    "objectifs": [
      {
        "type": "list",
        "format": "unordered",
        "children": [
          {
            "type": "list-item",
            "children": [
              { "type": "text", "text": "Préserver le patrimoine religieux" }
            ]
          },
          {
            "type": "list-item",
            "children": [
              {
                "type": "text",
                "text": "Sensibiliser le public à l'histoire locale"
              }
            ]
          }
        ]
      }
    ],
    "createdAt": "2024-12-15T10:00:00.000Z",
    "updatedAt": "2025-01-10T14:00:00.000Z"
  }
}
```

---

### 6. Accueil (Single Type)

#### GET /api/accueil

Récupère les données de la page d'accueil.

**Requête**

```http
GET /api/accueil?populate=*
```

**Réponse 200 OK**

```json
{
  "data": {
    "id": 1,
    "documentId": "acc123",
    "titre_intro": "Église Saint-Jean Baptiste d'Aulès",
    "sous_titre_intro": "Patrimoine Historique de Doazit",
    "video_fond": {
      "id": 30,
      "url": "/uploads/video_eglise_fond.mp4",
      "mime": "video/mp4",
      "size": 150000000
    },
    "createdAt": "2024-12-20T10:00:00.000Z",
    "updatedAt": "2025-01-05T16:00:00.000Z"
  }
}
```

---

### 7. Paramètres Site (Single Type)

#### GET /api/parametres-site

Récupère les paramètres globaux du site.

**Requête**

```http
GET /api/parametres-site?populate=*
```

**Réponse 200 OK**

```json
{
  "data": {
    "id": 1,
    "documentId": "param123",
    "logo_header": {
      "id": 35,
      "url": "/uploads/logo_header.svg",
      "alternativeText": "Logo APD"
    },
    "logo_footer": {
      "id": 36,
      "url": "/uploads/logo_footer.svg",
      "alternativeText": "Logo APD Footer"
    },
    "reseaux_sociaux": {
      "facebook": "https://www.facebook.com/apd-doazit",
      "instagram": "https://www.instagram.com/apd_doazit",
      "youtube": "https://www.youtube.com/@apd-doazit"
    },
    "url_don": "https://www.helloasso.com/associations/apd-doazit",
    "localisation": [
      {
        "id": 2,
        "ville": "Doazit",
        "region": "Nouvelle-Aquitaine",
        "pays": "France",
        "code_postal": "40700"
      }
    ],
    "email_contact": "contact@patrimoine-doazit.fr",
    "createdAt": "2024-12-10T10:00:00.000Z",
    "updatedAt": "2025-01-18T09:00:00.000Z"
  }
}
```

---

## Endpoint Email

### POST /api/email/send

Envoie un email de contact.

**Headers**

```http
Content-Type: application/json
```

**Body**

```json
{
  "name": "Jean Dupont",
  "email": "jean.dupont@example.com",
  "phone": "06 12 34 56 78",
  "subject": "Demande de partenariat",
  "message": "Bonjour, notre entreprise souhaiterait devenir partenaire de votre association..."
}
```

**Validation**

- `name` : requis, string, min 2 caractères
- `email` : requis, format email valide
- `phone` : optionnel, string
- `subject` : requis, string
- `message` : requis, string, min 10 caractères

**Réponse 200 OK**

```json
{
  "success": true,
  "message": "Email envoyé avec succès"
}
```

**Réponse 400 Bad Request**

```json
{
  "success": false,
  "message": "Tous les champs obligatoires doivent être remplis"
}
```

**Réponse 500 Internal Server Error**

```json
{
  "success": false,
  "message": "Erreur lors de l'envoi de l'email",
  "error": "SMTP connection failed"
}
```

**Configuration SMTP**
Variables d'environnement requises :

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-mot-de-passe-application
EMAIL_FROM=contact@patrimoine-doazit.fr
```

---

## Codes d'erreur

### Codes HTTP

| Code | Signification         | Description                              |
| ---- | --------------------- | ---------------------------------------- |
| 200  | OK                    | Requête réussie                          |
| 201  | Created               | Ressource créée avec succès              |
| 400  | Bad Request           | Paramètres invalides ou manquants        |
| 401  | Unauthorized          | Authentification requise                 |
| 403  | Forbidden             | Accès refusé (permissions insuffisantes) |
| 404  | Not Found             | Ressource introuvable                    |
| 500  | Internal Server Error | Erreur serveur                           |

### Erreurs Strapi

**404 Not Found**

```json
{
  "data": null,
  "error": {
    "status": 404,
    "name": "NotFoundError",
    "message": "Not Found",
    "details": {}
  }
}
```

**401 Unauthorized**

```json
{
  "data": null,
  "error": {
    "status": 401,
    "name": "UnauthorizedError",
    "message": "Missing or invalid credentials",
    "details": {}
  }
}
```

**400 Validation Error**

```json
{
  "data": null,
  "error": {
    "status": 400,
    "name": "ValidationError",
    "message": "Invalid input",
    "details": {
      "errors": [
        {
          "path": ["email"],
          "message": "Email must be a valid email",
          "name": "ValidationError"
        }
      ]
    }
  }
}
```

---

## Exemples d'utilisation

### JavaScript (Fetch API)

**Récupérer tous les articles**

```javascript
async function getArticles() {
  const response = await fetch(
    "http://localhost:1337/api/articles?populate=*&sort[0]=date_publication:desc"
  );
  const data = await response.json();
  return data.data;
}

getArticles().then((articles) => {
  console.log(articles);
});
```

**Envoyer un email de contact**

```javascript
async function sendContactEmail(formData) {
  const response = await fetch("http://localhost:1337/api/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'envoi");
  }

  const result = await response.json();
  return result;
}

// Utilisation
sendContactEmail({
  name: "Jean Dupont",
  email: "jean@example.com",
  phone: "0612345678",
  subject: "Partenariat",
  message: "Bonjour, je souhaite...",
})
  .then((result) => console.log("Email envoyé:", result))
  .catch((error) => console.error("Erreur:", error));
```

### Next.js (App Router)

**Page Server Component**

```javascript
// app/blog/page.jsx
export default async function BlogPage() {
  const res = await fetch(
    "http://localhost:1337/api/articles?populate=*&sort[0]=date_publication:desc",
    {
      next: { revalidate: 60 }, // Cache 60 secondes
    }
  );

  const { data: articles } = await res.json();

  return (
    <div>
      {articles.map((article) => (
        <div key={article.documentId}>
          <h2>{article.titre}</h2>
          <p>
            {article.auteur} - {article.date_publication}
          </p>
        </div>
      ))}
    </div>
  );
}
```

**Dynamic Route avec Slug**

```javascript
// app/blog/[slug]/page.jsx
export async function generateMetadata({ params }) {
  const res = await fetch(
    `http://localhost:1337/api/articles?filters[slug][$eq]=${params.slug}&populate=*`
  );
  const { data } = await res.json();
  const article = data[0];

  return {
    title: article.titre,
    description: article.contenu[0]?.children[0]?.text || "",
  };
}

export default async function ArticlePage({ params }) {
  const res = await fetch(
    `http://localhost:1337/api/articles?filters[slug][$eq]=${params.slug}&populate=*`
  );
  const { data } = await res.json();
  const article = data[0];

  if (!article) {
    return <div>Article non trouvé</div>;
  }

  return (
    <article>
      <h1>{article.titre}</h1>
      <p>
        {article.auteur} - {article.date_publication}
      </p>
      {/* Rendu du contenu */}
    </article>
  );
}
```

### React Hook personnalisé

```javascript
// hooks/useSiteData.jsx
import { useState, useEffect } from "react";

export function useSiteData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [parametres, eglise] = await Promise.all([
          fetch("http://localhost:1337/api/parametres-site?populate=*").then(
            (r) => r.json()
          ),
          fetch("http://localhost:1337/api/eglise?populate=*").then((r) =>
            r.json()
          ),
        ]);

        setData({
          parametres_site: parametres.data,
          eglise: eglise.data,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

// Utilisation
function Footer() {
  const { data, loading, error } = useSiteData();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  const { parametres_site } = data;

  return (
    <footer>
      <img src={parametres_site.logo_footer.url} alt="Logo" />
      <p>{parametres_site.localisation[0].ville}</p>
    </footer>
  );
}
```

---

## Rate Limiting

Pour protéger l'API contre le spam, un rate limiting est appliqué sur `/api/email/send` :

- **Limite** : 5 requêtes par IP par heure
- **Implémentation** : Middleware custom dans Strapi

```javascript
// Middleware rate limiting (exemple)
const emailLimiter = {};

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = emailLimiter[ip] || [];

  // Filtrer les requêtes de la dernière heure
  const recentRequests = userRequests.filter(
    (timestamp) => now - timestamp < 3600000 // 1 heure
  );

  if (recentRequests.length >= 5) {
    return false; // Trop de requêtes
  }

  // Ajouter nouvelle requête
  emailLimiter[ip] = [...recentRequests, now];
  return true;
}
```

**Réponse 429 Too Many Requests**

```json
{
  "success": false,
  "message": "Trop de requêtes. Veuillez réessayer dans 1 heure."
}
```

---

## Variables d'environnement

### Backend (.env)

```env
# Server
HOST=0.0.0.0
PORT=1337

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=apd_db
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=votremotdepasse
DATABASE_SSL=false

# Admin
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=randomSalt
ADMIN_JWT_SECRET=jwtSecret
TRANSFER_TOKEN_SALT=transferSalt
JWT_SECRET=jwtSecret

# Cloudinary
CLOUDINARY_NAME=votre-cloud-name
CLOUDINARY_KEY=votre-api-key
CLOUDINARY_SECRET=votre-api-secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-mot-de-passe-application
EMAIL_FROM=contact@patrimoine-doazit.fr

# CORS
CLIENT_URL=http://localhost:3000
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:1337/api
```

---

## Sécurité

### CORS

Configuration dans `config/middlewares.ts` :

```typescript
export default [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
          "media-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      origin: ["http://localhost:3000", "https://votre-domaine.com"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
    },
  },
  // ... autres middlewares
];
```

### Validation des données

- **Sanitization** : Strapi sanitize les inputs automatiquement
- **Validation schemas** : Yup schemas pour validation
- **CSRF Protection** : Token CSRF sur formulaires admin

---

## Changelog API

### Version 1.0 (19/11/2025)

- ✅ Création de 7 content-types (eglise, article, interview, partenaire, association, accueil, parametres-site)
- ✅ Endpoint email personnalisé `/api/email/send`
- ✅ Authentification JWT
- ✅ Upload Cloudinary
- ✅ CORS configuré
- ✅ Rate limiting sur email

### Prochaines versions

- 🔜 Pagination avancée avec cursors
- 🔜 Système de commentaires
- 🔜 Newsletter endpoints
- 🔜 Gestion d'événements

---

**Documentation générée par** : Philippe Barbosa  
**Contact** : philippe.barbosa@example.com  
**Dernière mise à jour** : 19/11/2025

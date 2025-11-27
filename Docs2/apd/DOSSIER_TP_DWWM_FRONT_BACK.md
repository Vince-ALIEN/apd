---
marp: true
paginate: true
header: "APD — Frontend d'abord, puis Backend"
footer: "Philippe Barbosa — TP DWWM"
---

# Dossier de Projet — APD / CoolBooking

- Auteur: Philippe Barbosa
- Contexte: TP DWWM — Présentation structurée Frontend → Backend
- Objectif: Donner une vue complète avec extraits de code réels et une pagination professionnelle (exportable PDF / PPTX)

---

## Sommaire

1. Partie A — Frontend (Next.js)
   - A.1 Stack & Architecture
   - A.2 Structure des pages (App Router)
   - A.3 Récupération des données (Hook)
   - A.4 Composants clés (Vidéo, Blog, Partenaires)
   - A.5 Accessibilité & Performance
   - A.6 Variables d'environnement & Lancement
2. Partie B — Backend (Strapi v5)
   - B.1 Stack & Config
   - B.2 Modélisation & Content-types
   - B.3 Routes & Contrôleurs
   - B.4 Service Email (Nodemailer)
   - B.5 Bonnes pratiques & Sécurité
   - B.6 Environnements & Lancement
3. Formats de Restitution Professionnels

---

# Partie A — Frontend (Next.js)

## A.1 Stack & Architecture

- Framework: Next.js (App Router)
- UI: React 19, TailwindCSS
- Animations: GSAP (ScrollTrigger), Lenis (smooth scroll)
- Images/Media: Cloudinary via URLs Strapi
- Données: Strapi REST API (`NEXT_PUBLIC_API_URL`)

---

## A.2 Structure des pages (App Router)

Chemins principaux (extraits réels):

- `frontend/src/app/page.jsx` (accueil)
- `frontend/src/app/blog/page.jsx` (liste d'articles)
- `frontend/src/app/blog/[slug]/page.jsx` (article)
- `frontend/src/app/partners/page.jsx` (partenaires)
- `frontend/src/app/association/page.jsx` (association)

Extrait `frontend/src/app/page.jsx`:

```jsx
"use client";

import { useSiteData } from "@hooks/useSiteData";
import dynamic from "next/dynamic";

import VideoBackground from "@components/VideoBackground";
import IntroSection from "@components/IntroSection";
import DescriptionSection from "@components/DescriptionSection";
import SectionNavigation from "@components/SectionNavigation";
import ErrorMessage from "@components/ErrorMessage";

const PartnerSection = dynamic(() => import("@components/PartnerSection"), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] flex items-center justify-center text-white font-garamond text-xl">
      Chargement des partenaires…
    </div>
  ),
});

const BlogSection = dynamic(() => import("@components/BlogSection"), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] flex items-center justify-center text-white font-garamond text-xl">
      Chargement des récits…
    </div>
  ),
});

export default function Home() {
  const { eglise, accueil, interviews, partenaires, articles, error } =
    useSiteData();

  const firstInterview = Array.isArray(interviews) ? interviews[0] : null;

  const videoUrl = accueil?.video?.url?.startsWith("http")
    ? accueil.video.url
    : accueil?.video?.url
      ? `${process.env.NEXT_PUBLIC_API_URL}${accueil.video.url}`
      : null;

  if (error) {
    return (
      <main className="relative w-full min-h-screen flex items-center justify-center bg-black text-white">
        <ErrorMessage type="error" message={`Erreur : ${error}`} />
      </main>
    );
  }

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden bg-black text-white">
      {videoUrl && (
        <link rel="preload" as="video" href={videoUrl} type="video/mp4" />
      )}
      {videoUrl && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <VideoBackground videoUrl={videoUrl} />
        </div>
      )}
      <SectionNavigation />
      <div className="relative z-10">
        <section id="intro">
          <IntroSection eglise={eglise} />
        </section>
        {eglise && firstInterview && (
          <section id="description">
            <DescriptionSection
              eglise={eglise}
              interviewBlock={firstInterview}
            />
          </section>
        )}
        <section id="partners">
          <PartnerSection partners={partenaires} />
        </section>
        <section id="blog">
          <BlogSection limit={3} />
        </section>
      </div>
    </main>
  );
}
```

---

## A.3 Récupération des données (Hook)

Extrait `frontend/src/hooks/useSiteData.jsx`:

```jsx
import { use, useEffect, useState } from "react";

export function useSiteData() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState({
    eglise: null,
    accueil: null,
    parametres_site: null,
    articles: [],
    interviews: null,
    partenaires: null,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!API_URL) {
      setError("API_URL est undefined");
      setIsLoading(false);
      return;
    }

    const fetchJson = async (url, label) => {
      const res = await fetch(url);
      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        throw new Error(`Réponse non JSON pour ${label}`);
      }
      return res.json();
    };

    const fetchData = async () => {
      try {
        const accueilJson = await fetchJson(
          `${API_URL}/api/accueil?populate=*`,
          "accueil"
        );
        setData((prev) => ({ ...prev, accueil: accueilJson?.data ?? null }));
        const endpoints = [
          ["eglise", "/api/eglise?populate=*"],
          ["parametres_site", "/api/parametres-site?populate=*"],
          ["articles", "/api/articles?populate=image"],
          ["interviews", "/api/interviews?populate=*"],
          ["partenaires", "/api/partenaires?populate=*"],
        ];
        const results = await Promise.all(
          endpoints.map(([label, path]) =>
            fetchJson(`${API_URL}${path}`, label)
          )
        );
        const [
          egliseJson,
          siteJson,
          articlesJson,
          interviewsJson,
          partenairesJson,
        ] = results;
        const sortedArticles = (articlesJson?.data ?? [])
          .filter((a) => a?.publishedAt)
          .sort(
            (a, b) =>
              new Date(b.date_publication) - new Date(a.date_publication)
          );
        setData({
          eglise: egliseJson?.data ?? null,
          accueil: accueilJson?.data ?? null,
          parametres_site: siteJson?.data ?? null,
          articles: sortedArticles,
          interviews: interviewsJson?.data ?? null,
          partenaires: partenairesJson?.data ?? null,
        });
      } catch (err) {
        setError(`Erreur : ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  return { ...data, error, isLoading };
}
```

Points clés:

- Priorité au chargement d'`accueil` (vidéo) pour améliorer LCP
- Parallélisation ensuite des autres endpoints
- Tri des articles par date de publication

---

## A.4 Composants clés

### Vidéo de fond — `frontend/src/components/VideoBackground.jsx`

```jsx
"use client";
import { useState } from "react";
export default function VideoBackground({ videoUrl }) {
  const [isLoaded, setIsLoaded] = useState(false);
  if (!videoUrl) return null;
  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none bg-black">
      <video
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setIsLoaded(true)}
        onCanPlayThrough={() => setIsLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
```

### Section blog — `frontend/src/components/BlogSection.jsx`

```jsx
"use client";
import { useSiteData } from "@hooks/useSiteData";
import Link from "next/link";
import Image from "next/image";
import ErrorMessage from "@components/ErrorMessage";
export default function BlogSection({ limit = 4 }) {
  const { articles, error } = useSiteData();
  const isLoading = !articles && !error;
  if (isLoading)
    return (
      <ErrorMessage
        type="loading"
        message="Chargement des récits en cours..."
      />
    );
  if (error)
    return (
      <ErrorMessage
        type="error"
        message={`Erreur lors du chargement des articles : ${error}`}
      />
    );
  if (!articles?.length)
    return <ErrorMessage type="empty" message="Chargement des articles ..." />;
  const displayedArticles = articles.slice(0, limit);
  return (
    <section className="relative w-full min-h-screen bg-pierre px-6 md:px-32 py-20 text-black overflow-hidden">
      <div className="relative min-h-screenz-10 max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-garamond text-black leading-snug">
            Nos derniers{" "}
            <span className="text-white shadow-underline">articles</span>
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {displayedArticles.map((article) => {
            /* ... */
          })}
        </div>
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-block mt-6 px-6 py-2 rounded-sm bg-[#ac1115] text-white font-semibold shadow-md hover:bg-[#8c0e12] transition-all duration-300"
          >
            Voir tous les articles
          </Link>
        </div>
      </div>
    </section>
  );
}
```

### Page article — `frontend/src/app/blog/[slug]/page.jsx`

```jsx
"use client";
// ...
async function getArticle(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=image`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  return data.data?.[0] ?? null;
}
```

---

## A.5 Accessibilité & Performance

- Préchargement vidéo (`<link rel="preload" as="video" ... />`)
- Lazy components (BlogSection, PartnerSection) via `next/dynamic`
- `next/image` (taille responsive + `sizes` + `fill`)
- Contrastes élevés (fond sombre + textes blancs)
- Structure sémantique et navigation par sections

## A.6 Variables d'environnement & Lancement

- `NEXT_PUBLIC_API_URL=https://<host-strapi>`
- Lancer en dev: `cd frontend && npm run dev`

---

# Partie B — Backend (Strapi v5)

## B.1 Stack & Config

- Strapi v5 (TypeScript), REST API
- DB: PostgreSQL (via `DATABASE_URL`)
- Mail: Nodemailer (service Gmail) pour formulaire de contact

`config/server.ts`:

```ts
export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: { keys: env.array("APP_KEYS") },
});
```

`config/database.ts`:

```ts
export default ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      connectionString: env("DATABASE_URL"),
      ssl: env.bool("DATABASE_SSL", false)
        ? { rejectUnauthorized: false }
        : false,
    },
  },
});
```

`config/api.ts`:

```ts
export default { rest: { defaultLimit: 25, maxLimit: 100, withCount: true } };
```

---

## B.2 Modélisation & Content-types (exemples)

- `article`, `interview`, `eglise`, `partenaire`, `accueil`, `parametres-site`
- Relations et `populate=*` côté frontend pour récupérer médias/relations

---

## B.3 Routes & Contrôleurs

Route custom email — `src/api/email/routes/email.ts`:

```ts
export default {
  routes: [
    {
      method: "POST",
      path: "/email",
      handler: "email.send",
      config: { auth: false, policies: [], middlewares: [] },
    },
  ],
};
```

Contrôleurs core — `src/api/article/controllers/article.ts`:

```ts
import { factories } from "@strapi/strapi";
export default factories.createCoreController("api::article.article");
```

Contrôleur email — `src/api/email/controllers/email.ts`:

```ts
import { send } from "../../../services/email";
export default {
  async send(ctx) {
    const { name, email, phone, subject, message } = ctx.request.body;
    if (!name || !email || !message) {
      return ctx.badRequest("Champs requis manquants.");
    }
    try {
      await send({
        to: process.env.CONTACT_RECEIVER || process.env.SMTP_USERNAME,
        subject: subject || `Message de ${name}`,
        html: `...`,
      });
      strapi.log.info(
        `Email envoyé à ${process.env.CONTACT_RECEIVER} depuis ${name} <${email}>`
      );
      ctx.send({ success: true });
    } catch (err) {
      strapi.log.error("Erreur Gmail:", err);
      ctx.internalServerError("Échec de l’envoi du message.");
    }
  },
};
```

---

## B.4 Service Email (Nodemailer)

`src/services/email.ts`:

```ts
import nodemailer from "nodemailer";
export async function send({ to, subject, html }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.SMTP_USERNAME, pass: process.env.SMTP_PASSWORD },
  });
  const info = await transporter.sendMail({
    from: process.env.SMTP_USERNAME,
    to,
    subject,
    html,
  });
  return info;
}
```

Variables nécessaires:

- `SMTP_USERNAME`, `SMTP_PASSWORD` (Gmail / App Password recommandé)
- `CONTACT_RECEIVER` (destinataire des formulaires)

---

## B.5 Bonnes pratiques & Sécurité

- Validation Strapi (schemas) + contrôleur email avec champs requis
- Auth désactivée volontairement sur POST `/email` mais surveillée côté frontend (rate limit à prévoir)
- CORS Strapi à restreindre à l'origin frontend
- Secrets via variables d'environnement (`APP_KEYS`, `JWT_SECRET`, SMTP)

## B.6 Environnements & Lancement

- `DATABASE_URL=postgres://...`
- `DATABASE_SSL=true|false`
- Démarrer: `npm run develop` (ou `yarn develop`) à la racine Strapi

---

# Formats de Restitution Professionnels

- Markdown long-form (ce fichier): lisible en repo, facile à versionner
- Marp (ce fichier est prêt): export PDF, PPTX, HTML avec pagination pro
  - PDF paginé propre: en-têtes/pieds de page, numérotation (via `paginate: true`)
  - PPTX moderne: sections → diapositives (automatique via Marp)
- Option: Slide deck Marp dédié (si besoin d’un format plus visuel)

Export (je peux le faire pour vous):

- PDF: `Marp: Export to PDF` → `DOSSIER_TP_DWWM_FRONT_BACK.pdf`
- PPTX: `Marp: Export to PowerPoint` → `DOSSIER_TP_DWWM_FRONT_BACK.pptx`

Si vous préférez, je peux générer immédiatement le PDF et/ou le PPTX.

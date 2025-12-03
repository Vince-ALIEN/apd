const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Récupère toutes les données du site depuis Strapi
 * Utilisé côté serveur (Server Components)
 * @returns {Promise<Object>} Données du site (eglise, accueil, articles, etc.)
 */
export async function getSiteData() {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL n'est pas définie");
  }

  const endpoints = [
    ["eglise", "/api/eglise?populate=*"],
    ["accueil", "/api/accueil?populate=*"],
    ["parametres_site", "/api/parametres-site?populate=*"],
    ["articles", "/api/articles?populate=image"],
    ["interviews", "/api/interviews?populate=*"],
    ["partenaires", "/api/partenaires?populate=*"],
  ];

  try {
    const results = await Promise.all(
      endpoints.map(([_, path]) =>
        fetch(`${API_URL}${path}`, {
          next: { revalidate: 3600 }, // Cache 1 heure
        }).then((res) => {
          if (!res.ok) {
            throw new Error(`Erreur ${res.status} pour ${path}`);
          }
          return res.json();
        })
      )
    );

    const [
      egliseJson,
      accueilJson,
      siteJson,
      articlesJson,
      interviewsJson,
      partenairesJson,
    ] = results;

    // Trier les articles par date de publication
    const sortedArticles = (articlesJson?.data ?? [])
      .filter((a) => a?.publishedAt)
      .sort(
        (a, b) => new Date(b.date_publication) - new Date(a.date_publication)
      );

    return {
      eglise: egliseJson?.data ?? null,
      accueil: accueilJson?.data ?? null,
      parametres_site: siteJson?.data ?? null,
      articles: sortedArticles,
      interviews: interviewsJson?.data ?? null,
      partenaires: partenairesJson?.data ?? null,
    };
  } catch (error) {
    console.error("Erreur lors du fetch des données Strapi:", error);
    throw error;
  }
}

/**
 * Récupère un article par son slug
 * @param {string} slug - Le slug de l'article
 * @returns {Promise<Object>} Données de l'article
 */
export async function getArticle(slug) {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL n'est pas définie");
  }

  const res = await fetch(
    `${API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=image`,
    { next: { revalidate: 60 } } // Revalidation toutes les 60 secondes
  );

  if (!res.ok) {
    throw new Error(`Erreur ${res.status} lors du fetch de l'article`);
  }

  const data = await res.json();
  return data.data?.[0] ?? null;
}

/**
 * Récupère tous les articles (pour generateStaticParams)
 * @returns {Promise<Array>} Liste des articles
 */
export async function getAllArticles() {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL n'est pas définie");
  }

  const res = await fetch(`${API_URL}/api/articles?populate=image`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Erreur ${res.status} lors du fetch des articles`);
  }

  const data = await res.json();
  return data.data ?? [];
}

/**
 * Génère l'URL complète d'une image Strapi
 * @param {string|Object} image - URL ou objet image Strapi
 * @returns {string|null} URL complète de l'image
 */
export function getImageUrl(image) {
  if (!image) return null;

  const url = image?.url || image?.data?.attributes?.url;
  if (!url) return null;

  if (url.startsWith("http")) return url;
  return `${API_URL}${url}`;
}

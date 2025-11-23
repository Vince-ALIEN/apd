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
        // Charger en priorité accueil pour avoir la vidéo rapidement
        const accueilJson = await fetchJson(
          `${API_URL}/api/accueil?populate=*`,
          "accueil"
        );

        // Mettre à jour avec accueil immédiatement
        setData((prev) => ({
          ...prev,
          accueil: accueilJson?.data ?? null,
        }));

        // Charger le reste en parallèle
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

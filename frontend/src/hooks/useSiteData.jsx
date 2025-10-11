import { useEffect, useState } from "react";

export function useSiteData(API_URL) {
  const [eglise, setEglise] = useState(null);
  const [accueil, setAccueil] = useState(null);
  const [parametres_site, setParametres_site] = useState(null);
  const [articles, setArticles] = useState(null);
  const [interviews, setInterviews] = useState(null);
  const [partenaires, setPartenaires] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          egliseRes,
          accueilRes,
          siteRes,
          articlesRes,
          interviewsRes,
          partenairesRes,
        ] = await Promise.all([
          fetch(`${API_URL}/api/eglise?populate=*`),
          fetch(`${API_URL}/api/accueil?populate=*`),
          fetch(`${API_URL}/api/parametres-site?populate=*`),
          fetch(`${API_URL}/api/articles?populate=*`),
          fetch(`${API_URL}/api/interviews?populate=*`),
          fetch(`${API_URL}/api/partenaires?populate=*`),
        ]);

        const [
          egliseJson,
          accueilJson,
          siteJson,
          articlesJson,
          interviewsJson,
          partenairesJson,
        ] = await Promise.all([
          egliseRes.json(),
          accueilRes.json(),
          siteRes.json(),
          articlesRes.json(),
          interviewsRes.json(),
          partenairesRes.json(),
        ]);

        setEglise(egliseJson?.data ?? null);
        setAccueil(accueilJson?.data ?? null);
        setParametres_site(siteJson?.data ?? null);
        setArticles(articlesJson?.data ?? null);
        setInterviews(interviewsJson?.data ?? null);
        setPartenaires(partenairesJson?.data ?? null);
      } catch (err) {
        setError(`Erreur détaillée: ${err.message}`);
        console.error("Erreur de chargement :", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  return {
    eglise,
    accueil,
    parametres_site,
    articles,
    interviews,
    partenaires,
    error,
    isLoading,
  };
}

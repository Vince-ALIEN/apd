import { useEffect, useState } from "react";

export function useSiteData(API_URL) {
  const [eglise, setEglise] = useState(null);
  const [accueil, setAccueil] = useState(null);
  const [parametres_site, setParametres_site] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [egliseRes, accueilRes, siteRes] = await Promise.all([
          fetch(`${API_URL}/api/eglise?populate=*`),
          fetch(`${API_URL}/api/accueil?populate=*`),
          fetch(`${API_URL}/api/parametres-site?populate=*`),
        ]);
        const [egliseJson, accueilJson, siteJson] = await Promise.all([
          egliseRes.json(),
          accueilRes.json(),
          siteRes.json(),
        ]);
        setEglise(egliseJson.data ?? null);
        setAccueil(accueilJson?.data ?? null);
        setParametres_site(siteJson?.data ?? null);
      } catch (err) {
        setError(`Erreur détaillée: ${err.message}`);
        console.error("Erreur de chargement :", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  return { eglise, accueil, parametres_site, error, isLoading };
}

import { getSiteData } from "../../lib/strapi";
import BlogSection from "@components/BlogSection";

// Métadonnées SEO
export const metadata = {
  title: "Blog | Art et Patrimoine de Doazit",
  description:
    "Actualités, événements et articles sur la restauration de l'église Saint-Jean-Baptiste d'Aulès et les actions de l'association APD.",
  keywords: [
    "blog",
    "actualités",
    "patrimoine",
    "Doazit",
    "événements",
    "restauration",
  ],
  openGraph: {
    title: "Blog APD - Actualités et événements",
    description: "Suivez nos actualités et découvrez nos actions",
    type: "website",
  },
};

export default async function BlogIndexPage() {
  try {
    const { articles } = await getSiteData();

    if (!articles?.length) {
      return (
        <main className="min-h-screen flex items-center justify-center bg-white text-black font-garamond">
          <p className="text-sm md:text-base leading-relaxed drop-shadow-sm">
            Aucun article disponible.
          </p>
        </main>
      );
    }

    return (
      <main className="relative z-10">
        <BlogSection articles={articles} limit={9} />
      </main>
    );
  } catch (e) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white text-red-600 font-garamond">
        <p className="text-sm md:text-base leading-relaxed drop-shadow-sm">
          Erreur : {e.message}
        </p>
      </main>
    );
  }
}

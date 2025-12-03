import Image from "next/image";
import { getArticle, getAllArticles, getImageUrl } from "../../../lib/strapi";

// ISR : Revalidation toutes les 60 secondes
export const revalidate = 60;

// SSG : Générer les pages statiques au build
export async function generateStaticParams() {
  try {
    const articles = await getAllArticles();
    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error("Erreur generateStaticParams:", error);
    return [];
  }
}

// Métadonnées SEO dynamiques
export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const article = await getArticle(slug);

    if (!article) {
      return {
        title: "Article introuvable | APD Blog",
        description: "Cet article n'existe pas ou a été supprimé.",
      };
    }

    const { titre, contenu, image } = article;
    const imageUrl = getImageUrl(image);
    const description =
      contenu?.[0]?.children?.[0]?.text?.substring(0, 160) ||
      "Découvrez cet article sur Art et Patrimoine de Doazit";

    return {
      title: `${titre} | APD Blog`,
      description,
      openGraph: {
        title: titre,
        description,
        images: imageUrl ? [imageUrl] : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: titre,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch (error) {
    console.error("Erreur generateMetadata:", error);
    return {
      title: "Erreur | APD Blog",
      description: "Une erreur est survenue",
    };
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = params;

  try {
    const article = await getArticle(slug);

    if (!article) {
      return (
        <main className="min-h-screen pt-[150px] pb-20 px-6 bg-pierre flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-garamond font-bold text-gray-900 mb-4">
              Article introuvable
            </h1>
            <p className="text-gray-600">
              Cet article n'existe pas ou a été supprimé.
            </p>
          </div>
        </main>
      );
    }

    const { titre, date_publication, contenu, image, auteur } = article;
    const imageUrl = getImageUrl(image);

    return (
      <main className="min-h-screen pt-[150px] pb-20 px-6 bg-pierre">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-garamond font-bold drop-shadow-lg leading-snug text-gray-900 text-center mb-6">
            {titre}
          </h1>

          <p className="text-sm md:text-base font-normal drop-shadow-sm leading-relaxed text-gray-500 text-center mb-2">
            {date_publication
              ? new Date(date_publication).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Date inconnue"}
          </p>

          <p className="text-sm md:text-base font-normal drop-shadow-sm leading-relaxed text-gray-600 text-center italic mb-8">
            {auteur ?? "Auteur inconnu"}
          </p>

          {imageUrl && (
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg relative w-full h-80">
              <Image
                src={imageUrl}
                alt={titre}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 700px"
                priority
              />
            </div>
          )}

          <div className="space-y-4 text-sm md:text-base font-normal drop-shadow-sm leading-relaxed text-gray-800">
            {contenu?.map((block, i) => {
              const text = block.children?.[0]?.text?.trim();
              return text ? (
                <p key={`block-${i}-${text.substring(0, 20)}`}>{text}</p>
              ) : null;
            })}
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Erreur lors du rendu de l'article:", error);
    return (
      <main className="min-h-screen pt-[150px] pb-20 px-6 bg-pierre flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-garamond font-bold text-gray-900 mb-4">
            Erreur
          </h1>
          <p className="text-gray-600">
            Une erreur est survenue lors du chargement de l'article.
          </p>
        </div>
      </main>
    );
  }
}

import Link from "next/link";
import Image from "next/image";

// Server Component: reçoit déjà les articles préfetchés côté serveur
export default function BlogSection({ articles = [], limit = 4 }) {
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
            const {
              id,
              titre,
              slug,
              image,
              date_publication,
              contenu,
              auteur,
            } = article;

            const imageUrl = image?.formats?.medium?.url ?? image?.url ?? null;

            const extrait =
              contenu?.[0]?.children?.[0]?.text?.slice(0, 180) ?? "";

            return (
              <Link
                key={id}
                href={`/blog/${slug}`}
                className="group block w-full max-w-[320px]"
              >
                <div className="flex flex-col justify-between h-full min-h-[500px] p-6 bg-white bg-opacity-90 backdrop-blur-sm rounded shadow-md hover:shadow-lg transition-shadow duration-300">
                  {imageUrl && (
                    <div className="relative w-full h-48 mb-4 rounded overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={titre}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="flex-grow space-y-2">
                    <h3 className="text-xl font-semibold font-garamond group-hover:text-[#ac1115]">
                      {titre}
                    </h3>
                    <p className="text-sm text-gray-600 italic">
                      Publié le{" "}
                      {new Date(date_publication).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      par {auteur ?? "Auteur inconnu"}
                    </p>
                    <p className="text-sm text-justify text-gray-800">
                      {extrait}...
                    </p>
                  </div>
                  <span className="inline-block mt-4 text-[#ac1115] font-semibold">
                    Lire l’article →
                  </span>
                </div>
              </Link>
            );
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

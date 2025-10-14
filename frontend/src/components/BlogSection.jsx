"use client";

import Link from "next/link";
import Image from "next/image";
import { useSiteData } from "../hooks/useSiteData";

export default function BlogSection({ API_URL, limit = null }) {
  const { articles, isLoading, error } = useSiteData(API_URL);

  if (isLoading) {
    return (
      <section className="py-20 px-6 md:px-12 text-center">
        <p className="text-gray-500">Chargement des articles...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-6 md:px-12 text-center">
        <p className="text-red-500">Erreur : {error}</p>
      </section>
    );
  }

  const displayed = Array.isArray(articles)
    ? limit
      ? articles.slice(0, limit)
      : articles
    : [];

  if (displayed.length === 0) {
    return (
      <section className="py-20 px-6 md:px-12 text-center">
        <p className="text-gray-500">
          Aucun article disponible pour le moment.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-gray-800 text-center">
          {limit ? "Les derniers articles" : "Tous les articles"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10 justify-center">
          {displayed.map((article) => {
            const {
              id,
              titre,
              slug,
              auteur,
              date_publication,
              contenu,
              image,
            } = article;

            const extrait =
              contenu?.[0]?.children?.[0]?.text?.slice(0, 140) + "..." || "";

            const imageUrl =
              image?.formats?.medium?.url || image?.url || "/placeholder.jpg";

            return (
              <Link
                key={id}
                href={`/blog/${slug}`}
                className="group block bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={imageUrl}
                    alt={titre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-red-700 transition">
                    {titre}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">
                    {new Date(date_publication).toLocaleDateString("fr-FR")} ·{" "}
                    {auteur}
                  </p>
                  <p className="text-sm text-gray-700 italic">{extrait}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {limit && (
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition"
            >
              Voir tous les articles
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

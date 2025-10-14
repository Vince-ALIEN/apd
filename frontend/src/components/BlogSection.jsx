"use client";

import Link from "next/link";

export default function BlogSection({ API_URL }) {
  const articles = [
    {
      id: 2,
      titre:
        "Quand les pierres parlent — les inscriptions oubliées de l’église d’Aulès",
      slug: "eglise-aules",
      auteur: "Philippe",
      date_publication: "2025-09-26",
      extrait:
        "Une équipe de bénévoles découvre, sous une couche de plâtre, une série d’inscriptions gravées dans la nef de l’église...",
    },
    {
      id: 5,
      titre: "Les vitraux de Doazit : entre lumière divine et art populaire",
      slug: "eglise-vitraux",
      auteur: "Philippe",
      date_publication: "2025-09-26",
      extrait:
        "Zoom sur les vitraux de l’église Saint-Jean-Baptiste, restaurés en 1983. L’article explore leur iconographie...",
    },
  ];

  return (
    <section className="bg-white min-h-screen py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-gray-800 text-center">
          Derniers articles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group block bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-lg transition p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-red-700 transition">
                {article.titre}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                {new Date(article.date_publication).toLocaleDateString("fr-FR")}{" "}
                · {article.auteur}
              </p>
              <p className="text-sm text-gray-700 italic">{article.extrait}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

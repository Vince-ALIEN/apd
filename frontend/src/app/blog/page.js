import React from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";

async function getArticles() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=image`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  return Array.isArray(data.data) ? data.data : [];
}

async function getSiteData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/parametres-site?populate[logo][populate]=*&populate[logo_footer][populate]=*`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  return data.data ?? null;
}

export default async function BlogIndexPage() {
  const [articles, site] = await Promise.all([getArticles(), getSiteData()]);

  return (
    <>
      <Header site={site} API_URL={process.env.NEXT_PUBLIC_API_URL} />

      <main className="min-h-screen pt-[150px] pb-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Nos articles
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.length > 0 ? (
              articles.map((article) => {
                const { id, titre, slug, date_publication, image } = article;
                const imageUrl = image?.url;

                return (
                  <a key={id} href={`/blog/${slug}`} className="block group">
                    {imageUrl && (
                      <div className="overflow-hidden rounded-xl shadow-lg">
                        <img
                          src={imageUrl}
                          alt={titre}
                          className="w-full h-60 object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                    <h2 className="mt-4 text-xl font-semibold text-gray-900">
                      {titre}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {date_publication
                        ? new Date(date_publication).toLocaleDateString("fr-FR")
                        : "Date inconnue"}
                    </p>
                  </a>
                );
              })
            ) : (
              <p className="text-gray-500 text-center">
                Aucun article disponible pour le moment.
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer site={site} API_URL={process.env.NEXT_PUBLIC_API_URL} />
    </>
  );
}

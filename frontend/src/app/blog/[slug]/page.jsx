import React from "react";
import Image from "next/image";
import FloatingHeader from "@components/FloatingHeader";
import Footer from "@components/Footer";

async function getArticle(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=image`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  return data.data?.[0] ?? null;
}

async function getSiteData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/parametres-site?populate[logo][populate]=*&populate[logo_footer][populate]=*`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  return data.data ?? null;
}

export default async function ArticlePage({ params }) {
  const { slug } = params;
  const [article, site] = await Promise.all([getArticle(slug), getSiteData()]);

  if (!article) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white text-gray-700 pt-[100px]">
        <p>Article introuvable pour le slug : {slug}</p>
      </main>
    );
  }

  const { titre, date_publication, contenu, image, auteur } = article;
  const imageUrl = image?.url || image?.data?.attributes?.url;

  return (
    <>
      <FloatingHeader site={site} API_URL={process.env.NEXT_PUBLIC_API_URL} />

      <main className="min-h-screen pt-[150px] pb-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-6 text-gray-900 text-center">
            {titre}
          </h1>

          <p className="text-sm text-gray-500 text-center mb-2">
            {date_publication
              ? new Date(date_publication).toLocaleDateString("fr-FR")
              : "Date inconnue"}
          </p>

          <p className="text-sm text-gray-600 text-center italic mb-8">
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
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-800">
            {contenu?.map((block, i) => (
              <p key={i}>{block.children?.[0]?.text}</p>
            ))}
          </div>
        </div>
      </main>

      <Footer site={site} API_URL={process.env.NEXT_PUBLIC_API_URL} />
    </>
  );
}

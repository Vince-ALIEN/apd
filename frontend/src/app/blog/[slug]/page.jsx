"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import FloatingHeader from "@components/FloatingHeader";
import Footer from "@components/Footer";
import { useSiteData } from "@hooks/useSiteData";
import ContactModal from "@components/ContactModal";

async function getArticle(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=image`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  return data.data?.[0] ?? null;
}

export default function ArticlePage({ params }) {
  const { slug } = params;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { parametres_site, isLoading, error } = useSiteData(API_URL);
  const [showContactModal, setShowContactModal] = useState(false);
  const [article, setArticle] = useState(null);
  const [loadingArticle, setLoadingArticle] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const result = await getArticle(slug);
      setArticle(result);
      setLoadingArticle(false);
    };
    fetchArticle();
  }, [slug]);

  if (isLoading || loadingArticle) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white text-gray-700">
        <p className="text-sm md:text-base font-normal drop-shadow-sm leading-relaxed">
          Chargement en cours…
        </p>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white text-gray-700">
        <p className="text-sm md:text-base font-normal drop-shadow-sm leading-relaxed">
          Article introuvable pour le slug : {slug}
        </p>
      </main>
    );
  }

  const { titre, date_publication, contenu, image, auteur } = article;
  const imageUrl = image?.url || image?.data?.attributes?.url;

  return (
    <>
      <FloatingHeader
        site={parametres_site}
        API_URL={API_URL}
        onContactClick={() => setShowContactModal(true)}
      />

      <main className="min-h-screen pt-[150px] pb-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold drop-shadow-lg leading-snug text-gray-900 text-center mb-6">
            {titre}
          </h1>

          <p className="text-sm md:text-base font-normal drop-shadow-sm leading-relaxed text-gray-500 text-center mb-2">
            {date_publication
              ? new Date(date_publication).toLocaleDateString("fr-FR")
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
              />
            </div>
          )}

          <div className="space-y-4 text-sm md:text-base font-normal drop-shadow-sm leading-relaxed text-gray-800">
            {contenu?.map((block, i) => {
              const text = block.children?.[0]?.text?.trim();
              return text ? <p key={i}>{text}</p> : null;
            })}
          </div>
        </div>
      </main>

      <Footer site={parametres_site} API_URL={API_URL} />
      {/* 📬 Modale contact */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </>
  );
}

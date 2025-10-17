"use client";

import React, { useState } from "react";
import { useSiteData } from "@hooks/useSiteData";
import FloatingHeader from "@components/FloatingHeader";
import Footer from "@components/Footer";
import BlogSection from "@components/BlogSection";
import GallerySection from "@components/GallerySection";
import ContactModal from "@components/ContactModal";

export default function BlogIndexPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { eglise, parametres_site, isLoading, error } = useSiteData(API_URL);
  const [showContactModal, setShowContactModal] = useState(false);

  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen bg-white items-center justify-center">
        <p className="text-gray-500 text-lg">Chargement en cours…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col min-h-screen bg-white items-center justify-center">
        <p className="text-red-600 text-lg">Erreur : {error}</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <FloatingHeader
        site={parametres_site}
        API_URL={API_URL}
        onContactClick={() => setShowContactModal(true)}
      />

      {/* Marge pour éviter que le logo coupe le contenu */}
      <div className="flex-grow min-h-screen mt-16 bg-white">
        <BlogSection API_URL={API_URL} />
      </div>

      <div className="min-h-screen bg-white">
        <GallerySection eglise={eglise?.attributes} />
      </div>

      <Footer site={parametres_site} API_URL={API_URL} />
      {/* 📬 Modale contact */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </main>
  );
}

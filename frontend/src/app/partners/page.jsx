"use client";

import { useState } from "react";
import { useSiteData } from "@hooks/useSiteData";
import FloatingHeader from "@components/FloatingHeader";
import Footer from "@components/Footer";
import PartnerSection from "@components/PartnerSection";
import ContactModal from "@components/ContactModal";

export default function PartnersPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [showContactModal, setShowContactModal] = useState(false);
  const { partenaires, parametres_site, isLoading, error } =
    useSiteData(API_URL);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white text-gray-700">
        <p className="text-sm md:text-base font-normal drop-shadow-sm leading-relaxed">
          Chargement des partenaires…
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white text-red-600">
        <p className="text-sm md:text-base font-normal drop-shadow-sm leading-relaxed">
          Erreur : {error}
        </p>
      </main>
    );
  }

  return (
    <>
      <FloatingHeader
        site={parametres_site}
        API_URL={API_URL}
        onContactClick={() => setShowContactModal(true)}
      />

      <main className="min-h-screen bg-white pt-[150px] pb-20 px-6">
        {/* ✅ Section incitative */}
        <section className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-2xl md:text-3xl font-bold drop-shadow-lg leading-snug text-gray-900 mb-6">
            Devenez partenaire de notre projet
          </h1>
          <p className="text-sm md:text-base font-normal drop-shadow-sm leading-relaxed text-gray-700">
            En soutenant la restauration de l’église Saint-Jean Baptiste
            d’Aulès, vous participez à la préservation d’un patrimoine vivant et
            à la transmission d’une histoire locale forte. Votre engagement sera
            valorisé auprès du public et des institutions.
          </p>
          <div className="mt-8">
            <button
              onClick={() => setShowContactModal(true)}
              className="inline-block px-6 py-3 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition"
            >
              Je souhaite devenir partenaire
            </button>
          </div>
        </section>

        {/* ✅ Réutilisation du composant fonctionnel */}
        <PartnerSection partners={partenaires} />
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

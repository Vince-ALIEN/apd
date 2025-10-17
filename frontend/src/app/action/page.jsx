"use client";
import { useState } from "react";
import FloatingHeader from "@components/FloatingHeader";
import Footer from "@components/Footer";
import { useSiteData } from "@hooks/useSiteData";
import ContactModal from "@components/ContactModal";

export default function ActionPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { parametres_site, isLoading, error } = useSiteData(API_URL);

  const [showContactModal, setShowContactModal] = useState(false);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white text-gray-700">
        <p className="text-sm md:text-base font-normal drop-shadow-sm leading-relaxed">
          Chargement…
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
        onContactClick={() => setShowContactModal(true)}
      />

      <main className="min-h-screen bg-white pt-[150px] pb-20 px-6">
        {/* Intro */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-2xl md:text-3xl font-bold drop-shadow-lg leading-snug text-gray-900 mb-6">
            Notre action pour Saint-Jean-Baptiste d’Aulès
          </h1>
          <p className="text-sm md:text-base font-normal drop-shadow-sm leading-relaxed text-gray-700">
            L’église Saint-Jean-Baptiste d’Aulès, située à Doazit, fut le siège
            de l’archiprêtré de Chalosse jusqu’au XIXe siècle. Classée aux
            Monuments historiques depuis 2004, cette église romane du XIIe
            siècle témoigne de huit siècles d’histoire et de transformations
            architecturales.
          </p>
        </section>

        {/* Description */}
        <section className="max-w-5xl mx-auto mb-16 space-y-6 text-gray-800">
          <p className="text-sm md:text-base font-normal drop-shadow-sm leading-relaxed">
            Fermée depuis une trentaine d’années, l’église présente une
            apparence saine malgré son âge. Toutefois, des travaux urgents sont
            nécessaires pour préserver sa structure : consolidation du toit
            d’une chapelle latérale, restauration de la tour-clocher, traitement
            des fissures dues à l’humidité, et remise en état des finitions
            intérieures.
          </p>

          <p className="text-sm md:text-base font-normal drop-shadow-sm leading-relaxed">
            L’association{" "}
            <strong>des Compagnons de l’Art et du Patrimoine de Doazit</strong>{" "}
            s’engage activement dans ce projet de sauvegarde. En collaboration
            avec la mairie et les collectivités territoriales, elle œuvre pour
            la restauration de ce monument emblématique.
          </p>

          <p className="text-sm md:text-base font-normal drop-shadow-sm leading-relaxed">
            Au-delà des travaux, notre mission est aussi de faire vivre ce
            patrimoine : nous organisons des{" "}
            <strong>animations culturelles, conférences, expositions</strong> et
            actions de sensibilisation pour faire découvrir l’histoire de
            l’église et mobiliser les habitants.
          </p>
        </section>

        {/* Appel à l'action */}
        <section className="max-w-4xl mx-auto text-center mt-16">
          <h2 className="text-2xl md:text-3xl font-bold drop-shadow-lg leading-snug text-gray-900 mb-4">
            Vous pouvez nous aider
          </h2>
          <p className="text-sm md:text-base font-normal drop-shadow-sm leading-relaxed text-gray-700 mb-6">
            Chaque soutien compte. Que vous soyez mécène, bénévole, ou
            simplement curieux, votre engagement contribue à faire revivre ce
            lieu chargé d’histoire.
          </p>
          <button
            onClick={() => setShowContactModal(true)}
            className="inline-block px-6 py-3 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition"
          >
            Rejoindre notre action
          </button>
        </section>
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

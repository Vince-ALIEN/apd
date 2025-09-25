"use client";
import { useEffect, useState } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import AccueilSection from "@components/AccueilSection";
import DescriptionSection from "@components/DescriptionSection";
import LocalisationSection from "@components/LocalisationSection";
import ContactSection from "@components/ContactSection";
import PartenairesSection from "@components/PartenairesSection";
import InterviewSection from "@components/InterviewSection";

export default function Home() {
  const [eglise, setEglise] = useState(null);
  const [site, setSite] = useState(null);
  const [error, setError] = useState(null);
  const [showHeader, setShowHeader] = useState(false);
  const [videoStopped, setVideoStopped] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Chargement des données depuis Strapi
  useEffect(() => {
    async function fetchData() {
      try {
        const [egliseRes, siteRes] = await Promise.all([
          fetch(`${API_URL}/api/eglise?populate=*`),
          fetch(`${API_URL}/api/parametres-site?populate=*`),
        ]);

        const egliseJson = await egliseRes.json();
        const siteJson = await siteRes.json();

        const egliseData = egliseJson.data ?? null;
        const siteData = siteJson.data ?? null;

        if (!egliseData || !siteData) {
          throw new Error("Les données sont vides ou mal formatées.");
        }

        setEglise(egliseData);
        setSite(siteData);
      } catch (err) {
        setError(`Erreur détaillée: ${err.message}`);
        console.error("Erreur de chargement :", err);
      }
    }

    fetchData();
  }, [API_URL]);

  // Scroll automatique vers l’ancre si présente dans l’URL
  useEffect(() => {
    const hash = window.location.hash?.substring(1);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500); // délai augmenté pour laisser le DOM se charger
    }
  }, []);

  // Affiche ou masque le header selon le scroll
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (videoStopped || y > 50) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [videoStopped]);

  // Affiche le header immédiatement si la vidéo est stoppée
  useEffect(() => {
    if (videoStopped) {
      setShowHeader(true);
    }
  }, [videoStopped]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-black text-white">
        <p className="mb-4 text-lg">Une erreur est survenue :</p>
        <pre className="text-red-400 text-sm">{error}</pre>
      </div>
    );
  }

  if (!eglise || !site) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Header site={site} API_URL={API_URL} visible={showHeader} />

      <section
        id="accueil"
        className="relative h-screen overflow-hidden scroll-mt-[120px]"
      >
        <AccueilSection
          API_URL={API_URL}
          onVideoEnd={() => setVideoStopped(true)}
        />
      </section>

      <section
        id="description"
        className="scroll-mt-[100px] py-10 px-6 bg-gray-50"
      >
        <DescriptionSection eglise={eglise} API_URL={API_URL} />
      </section>

      <section
        id="localisation"
        className="scroll-mt-[100px] py-10 px-6 bg-white"
      >
        <LocalisationSection eglise={eglise} />
      </section>

      <section
        id="interview"
        className="scroll-mt-[100px] relative min-h-screen py-10 px-6 text-black"
      >
        {/* Fond pierre en arrière-plan */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url("https://appetizing-balance-03c58ad391.media.strapiapp.com/chaud_calcaire_texture_a6787039c7.jpg")`,
            opacity: 0.6,
          }}
        ></div>

        {/* Contenu interview au-dessus du fond */}
        <div className="relative z-10">
          <InterviewSection videoUrl="https://appetizing-balance-03c58ad391.media.strapiapp.com/Interview_498b4a158a.mp4" />
        </div>
      </section>

      <section
        id="partenaires"
        className="scroll-mt-[100px] py-10 px-6 bg-gray-100"
      >
        <PartenairesSection API_URL={API_URL} />
      </section>

      <section
        id="contact"
        className="scroll-mt-[100px] relative py-10 px-6 text-black"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("https://appetizing-balance-03c58ad391.media.strapiapp.com/chaud_calcaire_texture_a6787039c7.jpg")`,
            opacity: 0.6,
          }}
        ></div>

        <div className="relative z-10 max-w-3xl mx-auto bg-white/80 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Contactez-nous</h2>
          <ContactSection />
        </div>
      </section>

      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url("https://appetizing-balance-03c58ad391.media.strapiapp.com/chaud_calcaire_texture_a6787039c7.jpg")`,
            opacity: 0.6,
          }}
        ></div>

        <Footer site={site} API_URL={API_URL} />
      </div>
    </div>
  );
}

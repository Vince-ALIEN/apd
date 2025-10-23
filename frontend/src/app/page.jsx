"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSiteData } from "@hooks/useSiteData";

import VideoBackground from "@components/VideoBackground";
import HomeSection from "@components/HomeSection";
import IntroOverlay from "@components/IntroOverlay";
import FloatingHeader from "@components/FloatingHeader";
import DescriptionSection from "@components/DescriptionSection";
import InterviewSection from "@components/InterviewSection";
import PartnerSection from "@components/PartnerSection";
import ContactModal from "@components/ContactModal";
import Footer from "@components/Footer";
import BlogSection from "@components/BlogSection";
import GallerySection from "@components/GallerySection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { eglise, accueil, interviews, parametres_site, partenaires } =
    useSiteData(API_URL);

  const videoUrl = accueil?.video?.url ?? null;
  const interviewBlock = interviews?.[0];

  const [showHeader, setShowHeader] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showFond, setShowFond] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const introRef = useRef(null);
  const descriptionRef = useRef(null);
  const galleryRef = useRef(null);

  // ✅ Rafraîchit ScrollTrigger après le rendu du contenu
  useEffect(() => {
    if (showContent) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [showContent]);

  // ✅ Déclenche le fond après la fin du pin de DescriptionSection
  useEffect(() => {
    if (!descriptionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: descriptionRef.current,
        start: "top top",
        end: "bottom 80%",
        onLeave: () => {
          console.log("🎯 Fond déclenché après DescriptionSection");
          setShowFond(true);
        },
        onEnterBack: () => {
          console.log("🔙 Fond retiré en scroll inverse");
          setShowFond(false);
        },
      });
    }, descriptionRef);

    return () => ctx.revert();
  }, [showContent]);

  return (
    <main className="relative overflow-x-hidden">
      {/* 🎥 Vidéo de fond */}
      {videoUrl && <VideoBackground videoUrl={videoUrl} />}

      {/* 🧭 Header flottant */}
      {showHeader && (
        <FloatingHeader
          site={parametres_site}
          onContactClick={() => setShowContactModal(true)}
        />
      )}

      {/* 🟥 Fond fixe déclenché après DescriptionSection */}
      {showFond && (
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "url('/fond_eglise.png')",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#fff",
          }}
        />
      )}

      {/* 🎬 Intro vidéo avec bouton "Passer" */}
      {!showContent && (
        <HomeSection
          videoUrl={videoUrl}
          onSkip={() => {
            introRef.current?.scrollIntoView({ behavior: "smooth" });
            setShowHeader(true);
            setShowContent(true);
          }}
        />
      )}

      {/* 📦 Contenu principal */}
      {showContent && (
        <div className="relative z-10">
          <IntroOverlay ref={introRef} />

          {eglise && (
            <>
              <DescriptionSection ref={descriptionRef} eglise={eglise} />
              <GallerySection ref={galleryRef} eglise={eglise} />
              {interviewBlock && <InterviewSection block={interviewBlock} />}
            </>
          )}

          <div className="flex-grow">
            <BlogSection API_URL={API_URL} limit={4} />
          </div>

          {partenaires?.length > 0 && <PartnerSection partners={partenaires} />}

          <Footer site={parametres_site} />
        </div>
      )}

      {/* 📬 Modal contact */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </main>
  );
}

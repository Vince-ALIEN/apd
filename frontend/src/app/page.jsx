"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import Header from "@components/Header";
import Footer from "@components/Footer";
import AccueilSection from "@components/AccueilSection";
import SceneBlocks from "@components/SceneBlocks";
import ScrollIndicator from "@components/ScrollIndicator";

import { useSceneTimeline } from "../animations/useSceneTimeline";
import { useClipTransition } from "../animations/useClipTransition";
import { useSiteData } from "../hooks/useSiteData";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const [showHeader, setShowHeader] = useState(false);
  const [timelineReady, setTimelineReady] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  const sceneRef = useRef(null);
  const maskRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const clipTransition = useClipTransition(maskRef);

  const sceneClasses = [
    "description-block",
    "localisation-block",
    "interview-block",
    "blog-block",
    "partenaires-block",
    "contact-block",
  ];

  const { eglise, accueil, parametres_site, error, isLoading } =
    useSiteData(API_URL);

  const { addScene } = useSceneTimeline({
    sceneClasses,
    onSceneStart: (label) => {
      if (label === "interview") {
        const video = document.querySelector(".interview-block video");
        if (video) {
          video.muted = true;
          video.play();
        }
      }
    },
  });

  const scrollToSection = (label) => {
    clipTransition(label);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 5);
      setHasScrolled(window.scrollY > 5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleCurtainScroll = () => {
      const curtainElements = document.querySelectorAll(
        ".curtain-content > *, .header-logo"
      );
      curtainElements.forEach((el) => {
        gsap.to(el, {
          opacity: 0,
          y: -50,
          duration: 0.6,
          ease: "power2.inOut",
        });
      });
    };

    window.addEventListener("scroll", handleCurtainScroll, { once: true });

    return () => window.removeEventListener("scroll", handleCurtainScroll);
  }, []);

  const videoUrl = accueil?.video?.url ?? null;

  const animateCurtainText = () => {
    const tl = gsap.timeline();

    tl.to(maskRef.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.2,
      ease: "power2.out",
    });

    tl.fromTo(
      titleRef.current,
      { x: "-100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 1.2, ease: "power3.out" },
      "+=0.2"
    );

    tl.fromTo(
      descRef.current,
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 1.2, ease: "power3.out" },
      "-=0.8"
    );
  };

  return (
    <div className="relative">
      {showScrollIndicator && !hasScrolled && <ScrollIndicator />}

      {/* 🧼 Rideau blanc */}
      <div
        ref={maskRef}
        className="fixed inset-0 z-0 bg-white transition-all duration-500"
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
      />

      {/* ✨ Texte + bouton sur le rideau */}
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none curtain-content">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-extrabold text-black leading-tight opacity-0"
        >
          <span className="text-red-600">A</span>idez-nous à préserver
          <br />
          ce trésor du patrimoine
        </h1>

        <p
          ref={descRef}
          className="mt-6 text-2xl md:text-3xl font-medium text-black max-w-3xl opacity-0"
        >
          Chaque don contribue à restaurer l’église
          <br />
          <span className="font-bold text-red-600">
            Saint-Jean Baptiste d’Aulès
          </span>
          <br />
          et à transmettre son histoire aux générations futures.
        </p>

        {parametres_site?.url_don && (
          <a
            href={parametres_site.url_don}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 px-6 py-3 rounded-full bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition-all duration-300 animate-pulse"
          >
            Soutenez-nous
          </a>
        )}
      </div>

      {/* 🧭 Header */}
      <Header
        site={parametres_site}
        API_URL={API_URL}
        visible={showHeader}
        scrollToSection={scrollToSection}
      />

      {/* ⚠️ Erreur */}
      {error && (
        <div className="flex flex-col items-center justify-center py-20 bg-black text-white relative z-10">
          <p className="mb-4 text-lg">Une erreur est survenue :</p>
          <pre className="text-red-400 text-sm">{error}</pre>
        </div>
      )}

      {/* ⏳ Chargement */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen bg-black relative z-10">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* 🎬 Accueil vidéo */}
          {!timelineReady && (
            <AccueilSection
              videoUrl={videoUrl}
              onSkip={() => {
                clipTransition("description", {
                  onReveal: () => {
                    animateCurtainText();
                    setTimelineReady(true);
                    setShowHeader(true);
                    setShowScrollIndicator(true);
                  },
                });
              }}
            />
          )}

          {/* 🎞️ Scènes */}
          {timelineReady && (
            <>
              <div
                ref={sceneRef}
                className="scene fixed top-0 left-0 w-full h-screen overflow-hidden z-10 pointer-events-auto"
              />
              <SceneBlocks
                eglise={eglise}
                API_URL={API_URL}
                site={parametres_site}
                scrollToSection={scrollToSection}
                addScene={addScene}
              />
              <div className="scroll-wrapper relative z-0">
                {sceneClasses.map((id) => (
                  <div
                    key={id}
                    id={id}
                    className="h-screen w-full flex items-center justify-center"
                  />
                ))}
              </div>
              <Footer site={parametres_site} />
            </>
          )}
        </>
      )}
    </div>
  );
}

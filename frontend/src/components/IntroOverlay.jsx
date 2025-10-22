"use client";

import { forwardRef, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollIndicator from "./ScrollIndicator";

const IntroOverlay = forwardRef((props, ref) => {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // ✨ Animation d’entrée au montage
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // 🧭 Titre entre par la gauche
    tl.fromTo(
      titleRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1 },
      0
    );

    // 🧭 Sous-titre entre par la droite
    tl.fromTo(
      descRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1 },
      "-=0.6"
    );
  }, []);

  // 🧭 ScrollIndicator réversible selon la position
  useEffect(() => {
    const handleScroll = () => {
      const isAtTop = window.scrollY < 10;
      setShowScrollIndicator(isAtTop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="intro-overlay relative min-h-screen flex items-center justify-center text-white"
    >
      {/* 🧊 Fond semi-transparent derrière le texte */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      {/* 📝 Contenu centré */}
      <div className="intro-content relative z-10 text-center px-6 max-w-4xl w-full">
        <h1
          ref={titleRef}
          className="text-3xl md:text-6xl font-extrabold leading-tight opacity-0 drop-shadow-xl"
        >
          Aidez-nous à préserver
          <br />
          ce trésor du patrimoine
        </h1>
        <p
          ref={descRef}
          className="mt-8 text-lg md:text-2xl font-medium opacity-0 drop-shadow-lg"
        >
          Chaque don contribue à restaurer l’église
          <br />
          <span className="font-bold text-red-500">
            Saint-Jean Baptiste d’Aulès
          </span>
          <br />
          et à transmettre son histoire aux générations futures.
        </p>
      </div>

      {/* 🧭 ScrollIndicator avec transition fluide */}
      <div
        ref={scrollIndicatorRef}
        className={`absolute bottom-10 z-40 pointer-events-none transition-opacity duration-500 ${
          showScrollIndicator ? "opacity-100" : "opacity-0"
        }`}
      >
        <ScrollIndicator />
      </div>
    </section>
  );
});

export default IntroOverlay;

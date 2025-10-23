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
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { opacity: 1, xPercent: -200 },
      { opacity: 1, xPercent: 0, duration: 1.2 },
      0
    );

    tl.fromTo(
      descRef.current,
      { opacity: 1, xPercent: 200 },
      { opacity: 1, xPercent: 0, duration: 1.2 },
      "-=0.8"
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
      className="intro-overlay relative min-h-screen flex items-center justify-center text-white px-4 sm:px-6"
    >
      {/* 🧊 Fond semi-transparent derrière le texte */}
      <div className="absolute inset-0  z-0 pointer-events-none" />

      {/* 📝 Contenu centré */}
      <div className="intro-content relative z-10  text-center w-full max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="font-extrabold leading-tight drop-shadow-xl opacity-0"
          style={{
            fontSize: "clamp(2rem, 6vw, 4rem)",
            lineHeight: "1.2",
          }}
        >
          Aidez-nous à préserver
          <br />
          ce trésor du patrimoine
        </h1>
        <p
          ref={descRef}
          className="mt-6 font-medium drop-shadow-lg opacity-0"
          style={{
            fontSize: "clamp(1rem, 3vw, 1.5rem)",
            lineHeight: "1.6",
          }}
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
        className={`absolute bottom-6 sm:bottom-10 z-40 pointer-events-none transition-opacity duration-500 ${
          showScrollIndicator ? "opacity-100" : "opacity-0"
        }`}
      >
        <ScrollIndicator />
      </div>
    </section>
  );
});

export default IntroOverlay;

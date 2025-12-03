"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SectionNavigation() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const arrowRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      // Afficher le bouton "scroll to top" après 50% de scroll
      setShowScrollTop(scrollTop > windowHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (arrowRef.current && !showScrollTop) {
      gsap.to(arrowRef.current, {
        y: 10,
        duration: 1.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  }, [showScrollTop]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToNext = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <>
      {/* Flèche DOWN - visible au début */}
      {!showScrollTop && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div
            ref={arrowRef}
            className="flex flex-col items-center gap-2 cursor-pointer hover:scale-110 transition-transform"
            onClick={scrollToNext}
          >
            <span className="text-white text-xs font-light tracking-wider uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Suivant
            </span>
            <ChevronDown
              className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              size={40}
              strokeWidth={2}
            />
          </div>
        </div>
      )}

      {/* Bouton scroll to top - visible en bas de page */}
      {showScrollTop && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#ac1115] text-white shadow-lg hover:bg-[#8c0e12] transition-all duration-300 hover:scale-110"
            aria-label="Retour en haut"
          >
            <ChevronUp size={24} strokeWidth={2} />
          </button>
        </div>
      )}
    </>
  );
}

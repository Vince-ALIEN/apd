"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function SectionNavigation() {
  const [currentSection, setCurrentSection] = useState("intro");
  const arrowRefs = useRef({});

  // Configuration des sections avec leurs types de navigation
  const sectionsConfig = {
    intro: {
      next: "description",
      showArrows: ["down"],
    },
    description: {
      prev: "intro",
      next: "partners",
      showArrows: ["up", "down"],
    },
    partners: {
      prev: "description",
      next: "blog",
      showArrows: ["up", "down"],
    },
    blog: {
      prev: "partners",
      showArrows: ["up"],
    },
  };

  useEffect(() => {
    let observer = null;
    let mutationObserver = null;

    const setupObserver = () => {
      const sections = document.querySelectorAll("section[id]");

      if (observer) {
        observer.disconnect();
      }

      const observerOptions = {
        threshold: [0.1, 0.5, 0.9],
        rootMargin: "0px",
      };

      observer = new IntersectionObserver((entries) => {
        let mostVisible = null;
        let maxRatio = 0;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisible = entry.target;
          }
        });

        if (mostVisible && maxRatio > 0.1) {
          setCurrentSection(mostVisible.id);
        }
      }, observerOptions);

      sections.forEach((section) => observer.observe(section));
    };

    // Observer initial
    setupObserver();

    // Observer les changements du DOM pour détecter les nouvelles sections
    mutationObserver = new MutationObserver(() => {
      setupObserver();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (observer) observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    // Animer les flèches
    Object.entries(arrowRefs.current).forEach(([key, ref]) => {
      if (ref) {
        const isUp = key === "up";
        const isDown = key === "down";

        if (isUp || isDown) {
          gsap.to(ref, {
            y: isUp ? -10 : 10,
            duration: 1.5,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
          });
        }
      }
    });
  }, [currentSection]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const config = sectionsConfig[currentSection];

  if (!config) return null;

  return (
    <>
      {/* Flèche vers le haut */}
      {config.showArrows?.includes("up") && config.prev && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
          <div
            ref={(el) => (arrowRefs.current.up = el)}
            className="flex flex-col items-center gap-2 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => scrollToSection(config.prev)}
          >
            <ChevronUp
              className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              size={40}
              strokeWidth={2}
            />
            <span className="text-white text-xs font-light tracking-wider uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Précédent
            </span>
          </div>
        </div>
      )}

      {/* Flèche vers le bas */}
      {config.showArrows?.includes("down") && config.next && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div
            ref={(el) => (arrowRefs.current.down = el)}
            className="flex flex-col items-center gap-2 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => scrollToSection(config.next)}
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
    </>
  );
}

"use client";

import { useState, useEffect } from "react";

export function useCurrentSection() {
  const [currentSection, setCurrentSection] = useState(0);
  const [totalSections, setTotalSections] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    setTotalSections(sections.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = Array.from(sections).indexOf(entry.target);
            if (sectionIndex !== -1) {
              setCurrentSection(sectionIndex);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-50px 0px -50px 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return { currentSection, totalSections };
}

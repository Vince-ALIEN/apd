"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function InterviewSection({ block }) {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);
  const curtainRef = useRef(null);

  const titre = block?.titre;
  const description = block?.description?.[0]?.children?.[0]?.text;
  const videoUrl = block?.video?.url;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    const content = contentRef.current;
    const curtain = curtainRef.current;

    if (!section || !pinWrapper || !content || !curtain) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: pinWrapper,
        anticipatePin: 1,
      },
    });

    // 🟤 Rideau monte depuis le bas
    tl.fromTo(
      curtain,
      { y: "100%" },
      { y: "0%", duration: 1.2, ease: "power2.out" }
    );

    // ⚪️ Entrée du contenu
    tl.fromTo(
      content,
      { x: "300%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 2, ease: "power4.out" }
    );

    // ⏱️ Maintien
    tl.to(content, {
      x: "0%",
      opacity: 1,
      duration: 10,
    });

    // 🎭 Sortie du contenu
    tl.to(content, {
      x: "-300%",
      opacity: 0,
      duration: 2,
      ease: "power2.inOut",
    });

    // 🟤 Rideau se baisse et disparaît
    tl.to(curtain, {
      y: "100%",
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut",
    });

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[150vh]">
      <div
        ref={pinWrapperRef}
        className="sticky top-0 h-screen flex items-center justify-center text-white px-6 py-24 relative overflow-hidden"
      >
        {/* 🟤 Rideau noir en arrière-plan */}
        <div
          ref={curtainRef}
          className="absolute inset-0 bg-black z-10 pointer-events-none"
          style={{ transform: "translateY(100%)" }}
        />

        {/* ⚪️ Contenu animé au-dessus */}
        <div
          ref={contentRef}
          className="text-center flex flex-col items-center justify-center w-full max-w-4xl z-20 relative"
        >
          {titre && (
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 drop-shadow-lg">
              {titre}
            </h2>
          )}

          {videoUrl && (
            <div className="w-full aspect-video mb-8 rounded-xl overflow-hidden shadow-xl">
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {description && (
            <p className="text-lg md:text-xl font-medium max-w-3xl drop-shadow-sm">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

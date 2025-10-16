"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

import ScrollIndicator from "./ScrollIndicator";
import VideoBackground from "@components/VideoBackground";

export default function IntroOverlay({
  urlDon,
  videoUrl,
  onComplete,
  start,
  exit,
  onHeaderReady,
}) {
  const maskRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonWrapperRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    if (!start) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // ✅ Entrée : lever de rideau (du bas vers le haut)
    tl.to(maskRef.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.2,
      onStart: () => {
        document.body.style.overflow = "hidden";
      },
      onComplete: () => {
        setTimeout(() => {
          if (onHeaderReady) onHeaderReady();
        }, 800);
      },
    });

    tl.fromTo(
      videoWrapperRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.2 },
      "+=0.2"
    );

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.6"
    );

    tl.fromTo(
      descRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.8"
    );

    tl.fromTo(
      buttonWrapperRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" },
      "-=0.6"
    );

    tl.call(() => {
      setShowScrollIndicator(true);
      document.body.style.overflow = "auto";
    });
  }, [start]);

  useEffect(() => {
    if (!exit) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.to(".intro-content", { opacity: 0, y: -50, duration: 1 });
    tl.to(
      videoWrapperRef.current,
      { opacity: 0, y: -50, duration: 1 },
      "-=0.8"
    );
    tl.to(
      scrollIndicatorRef.current,
      { opacity: 0, y: -30, duration: 0.6 },
      "-=0.8"
    );

    // ✅ Sortie : glissement latéral (gauche → droite)
    gsap.set(maskRef.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      x: 0,
    });

    tl.to(maskRef.current, {
      x: window.innerWidth,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        if (maskRef.current) maskRef.current.style.display = "none";
        if (onComplete) onComplete();
      },
    });
  }, [exit]);

  return (
    <>
      {/* 🟤 Rideau avec fond blanc */}
      <div
        ref={maskRef}
        className="fixed bg-white inset-0 z-0"
        style={{
          clipPath: "inset(100% 0% 0% 0%)", // ✅ rideau fermé au départ
        }}
      />

      {/* 🎥 Vidéo + contenu animé */}
      <section className="relative z-10 w-full flex flex-col items-center justify-start mt-10 pt-24 px-6">
        {/* Vidéo centrée */}
        <div
          ref={videoWrapperRef}
          className="w-full max-w-5xl h-[30vh] rounded-xl overflow-hidden shadow-2xl bg-black"
        >
          <VideoBackground videoUrl={videoUrl} isMuted={true} />
        </div>

        {/* ✨ Contenu animé */}
        <div className="intro-content mt-10 text-center max-w-3xl">
          <h1
            ref={titleRef}
            className="text-2xl md:text-4xl font-extrabold text-black leading-tight opacity-0"
          >
            <span className="text-red-600">A</span>idez-nous à préserver
            <br />
            ce trésor du patrimoine
          </h1>

          <p
            ref={descRef}
            className="mt-6 text-base md:text-xl font-medium text-gray-800 opacity-0"
          >
            Chaque don contribue à restaurer l’église
            <br />
            <span className="font-bold text-red-600">
              Saint-Jean Baptiste d’Aulès
            </span>
            <br />
            et à transmettre son histoire aux générations futures.
          </p>
        </div>

        {/* 🧭 Scroll Indicator */}
        {showScrollIndicator && (
          <div
            ref={scrollIndicatorRef}
            className="mt-50 z-40 pointer-events-none"
          >
            <ScrollIndicator />
          </div>
        )}
      </section>
    </>
  );
}

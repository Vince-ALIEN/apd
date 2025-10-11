"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import DonationButton from "@components/DonationButton";
import ScrollIndicator from "./ScrollIndicator";

export default function IntroOverlay({
  urlDon,
  onComplete,
  start,
  exit,
  onHeaderReady,
}) {
  const maskRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonWrapperRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    if (!start) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(maskRef.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.2,
      onStart: () => {
        document.body.style.overflow = "hidden";
        const animatedWord = document.querySelector(".animated-word");
        if (animatedWord) {
          gsap.to(animatedWord, {
            opacity: 0,
            scale: 0.5,
            duration: 0.6,
            ease: "power2.inOut",
          });
        }
      },
      onComplete: () => {
        setTimeout(() => {
          if (onHeaderReady) onHeaderReady();
        }, 800);
      },
    });

    tl.fromTo(
      titleRef.current,
      { x: "-100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 1.2 },
      "+=0.4"
    );

    tl.fromTo(
      descRef.current,
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 1.2 },
      "-=0.8"
    );

    if (buttonWrapperRef.current) {
      tl.fromTo(
        buttonWrapperRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(2)",
        },
        "-=0.3"
      );
    }

    tl.call(
      () => {
        setShowScrollIndicator(true);
      },
      null,
      "+=0.2"
    );

    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.2"
    );

    tl.call(() => {
      document.body.style.overflow = "auto";
    });
  }, [start]);

  useEffect(() => {
    if (!exit) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.to(".curtain-content", {
      opacity: 0,
      y: -100,
      duration: 1,
    });

    tl.to(
      ".header-logo",
      {
        opacity: 0,
        y: -50,
        duration: 0.8,
      },
      "-=0.8"
    );

    tl.to(
      scrollIndicatorRef.current,
      {
        opacity: 0,
        y: -50,
        duration: 0.6,
      },
      "-=0.8"
    );

    gsap.set(maskRef.current, { x: 0 });

    tl.to(maskRef.current, {
      x: window.innerWidth,
      opacity: 1,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });
  }, [exit]);

  return (
    <>
      {/* Rideau blanc */}
      <div
        ref={maskRef}
        className="fixed inset-0 z-0 bg-white"
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
      />

      {/* Contenu */}
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center text-center px-6 curtain-content">
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

        {urlDon && (
          <div
            ref={buttonWrapperRef}
            className="mt-8 opacity-0 pointer-events-auto"
          >
            <DonationButton href={urlDon} />
          </div>
        )}

        {/* ScrollIndicator fixé en bas */}
        {showScrollIndicator && (
          <div
            ref={scrollIndicatorRef}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
          >
            <ScrollIndicator />
          </div>
        )}
      </div>
    </>
  );
}

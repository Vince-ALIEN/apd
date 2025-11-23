"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { Volume2, VolumeX } from "lucide-react";
import useIsMobile from "@hooks/useIsMobile";

export default function IntroSection({ eglise }) {
  const sectionRef = useRef(null);
  const welcomeRef = useRef(null);
  const premierMotRef = useRef(null);
  const resteNomRef = useRef(null);
  const dernierMotRef = useRef(null);
  const gsapScope = useRef(null);

  const [isMuted, setIsMuted] = useState(true);

  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !welcomeRef.current ||
      !premierMotRef.current ||
      !resteNomRef.current ||
      !dernierMotRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // Configuration initiale : texte invisible, légèrement en dessous et réduit
      gsap.set(welcomeRef.current, {
        opacity: 0,
        scale: 0.6,
        y: 20,
      });

      gsap.set(dernierMotRef.current.querySelector(".reveal-text"), {
        scale: 0.6,
        y: 20,
      });

      const tl = gsap.timeline({
        delay: 3,
      });

      // Animation du titre principal : apparition fluide avec mouvement vertical
      tl.to(welcomeRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: "power3.out",
        duration: 1.6,
      });

      // Pavé reveal sur premierMot : aller-retour de la bande
      tl.fromTo(
        premierMotRef.current.querySelector(".reveal-box"),
        {
          xPercent: -300,
          opacity: 1,
          width: "100vw",
        },
        {
          xPercent: -100,
          opacity: 1,
          width: "100vw",
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.9" // Commence légèrement avant la fin de l'animation précédente
      )
        // Retour de la bande vers la gauche (effet miroir)
        .to(premierMotRef.current.querySelector(".reveal-box"), {
          xPercent: -300,
          opacity: 1,
          width: "100vw",
          duration: 1,
          ease: "power2.inOut",
        })
        // Révélation du texte avec légère mise à l'échelle
        .to(
          premierMotRef.current.querySelector(".reveal-text"),
          {
            color: "white",
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "back.out(2)",
          },
          "-=1"
        );

      // Pavé reveal sur dernierMot avec bande qui reste
      tl.fromTo(
        dernierMotRef.current.querySelector(".reveal-box"),
        {
          xPercent: -300,
          width: "100vw",
          opacity: 1,
        },
        {
          xPercent: -100,
          width: "100vw",
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.6"
      )
        // Réduction de la bande sur le dernier mot
        .to(dernierMotRef.current.querySelector(".reveal-box"), {
          xPercent: -100,
          width: "100%",
          duration: 1,
          ease: "power3.out",
        })
        // Révélation du texte resteNom
        .to(
          resteNomRef.current.querySelector(".reveal-text"),
          {
            color: "white",
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.8"
        )

        // Révélation du texte dernierMot
        .to(
          dernierMotRef.current.querySelector(".reveal-text"),
          {
            duration: 1,
            ease: "power2.out",
            zIndex: 30,
            color: "white",
            scale: 1,
            y: 0,
          },
          "-=0.5"
        );
    }, gsapScope);

    return () => ctx.revert();
  }, [isMobile]);

  const toggleMute = () => {
    const video = document.querySelector("video");
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const nom = eglise?.nom?.trim() || "";
  const motsNom = nom.split(" ");
  const premierMot = motsNom[0];
  const dernierMot = motsNom[motsNom.length - 1];
  const resteNom = motsNom.slice(1, -1).join(" ");

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        gsapScope.current = el;
      }}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center text-center"
    >
      <div
        ref={welcomeRef}
        className="absolute top-[17vh] sm:top-[30vh] md:top-[12vh] lg:top-[15vh] left-0 right-0 flex flex-col items-center px-4 z-30"
      >
        <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-relaxed tracking-tight drop-shadow-xl text-white text-center">
          Aidez-nous à préserver
          <br />
          ce trésor du patrimoine
        </h1>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center  z-20">
        <p
          ref={premierMotRef}
          className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-garamond leading-relaxed text-center relative overflow-visible max-w-[90vw]"
        >
          <span className="reveal-text text-transparent relative z-10">
            {premierMot}
          </span>
          <span className="reveal-box absolute bottom-[0.7rem] h-[2rem] sm:h-[2.5rem] md:h-[3.5rem] lg:h-[4.5rem] bg-[#ac1115] z-20"></span>
        </p>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <p
            ref={resteNomRef}
            className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-garamond leading-relaxed text-center relative overflow-visible"
          >
            <span className="reveal-text text-transparent relative z-10">
              {resteNom}
            </span>
            <span className="reveal-box absolute bottom-[0.7rem] h-[2rem] sm:h-[2.5rem] md:h-[3.5rem] lg:h-[4.5rem] bg-[#ac1115] z-20"></span>
          </p>

          <p
            ref={dernierMotRef}
            className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-garamond leading-relaxed text-center relative overflow-visible"
          >
            <span className="reveal-text text-transparent relative z-10">
              &nbsp;&nbsp;{dernierMot}
            </span>
            <span className="reveal-box absolute bottom-[0.7rem] h-[2rem] sm:h-[2.5rem] md:h-[3.5rem] lg:h-[4.5rem] bg-[#ac1115] z-20"></span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-50">
        <button
          onClick={toggleMute}
          className="w-12 h-12 rounded-full bg-white/10 text-white backdrop-blur-md shadow-md hover:bg-white/20 transition flex items-center justify-center"
          aria-label="Activer/Désactiver le son"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
    </section>
  );
}

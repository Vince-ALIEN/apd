"use client";

import { useRef, useLayoutEffect, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeX } from "lucide-react";
import ScrollIndicator from "./ScrollIndicator";
import DonationButton from "@components/DonationButton";
import useIsMobile from "@hooks/useIsMobile";
import { useHeaderDonation } from "@contexts/HeaderDonationContext";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection({ eglise }) {
  const sectionRef = useRef(null);
  const welcomeRef = useRef(null);
  const buttonRef = useRef(null);
  const premierMotRef = useRef(null);
  const resteNomRef = useRef(null);
  const gsapScope = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const isMobile = useIsMobile();
  const { setShowDonationButton } = useHeaderDonation();

  useEffect(() => {
    setShowDonationButton(false);
  }, [setShowDonationButton]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 100;
      setShowScrollIndicator(isTop);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !welcomeRef.current ||
      !buttonRef.current ||
      !premierMotRef.current ||
      !resteNomRef.current
    )
      return;

    const ctx = gsap.context(() => {
      gsap.set([welcomeRef.current, buttonRef.current], {
        opacity: 0,
        scale: 0.5,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "=+300% top",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          markers: false,
        },
      });

      tl.to(welcomeRef.current, {
        opacity: 1,
        scale: 1,
        ease: "none",
        duration: 10,
      });

      // Pavé reveal sur premierMot
      tl.to(premierMotRef.current.querySelector(".reveal-box"), {
        width: "100%",
        duration: 4,
        ease: "power2.out",
      })
        .to(premierMotRef.current.querySelector(".reveal-box"), {
          width: "100%",
          left: "100%",
          duration: 4,
          ease: "power2.in",
        })
        .to(
          premierMotRef.current.querySelector(".reveal-text"),
          {
            color: "white",
            duration: 2,
            ease: "none",
          },
          "-=2"
        );

      // Pavé reveal sur resteNom
      tl.to(resteNomRef.current.querySelector(".reveal-box"), {
        width: "100%",
        duration: 4,
        ease: "power2.out",
      })
        .to(resteNomRef.current.querySelector(".reveal-box"), {
          width: "100%",
          left: "72%",
          duration: 4,
          ease: "power2.in",
        })
        .to(
          resteNomRef.current.querySelector(".reveal-text"),
          {
            color: "white",
            duration: 2,
            ease: "none",
          },
          "-=1.5"
        );

      // Animation du bouton
      tl.to(
        buttonRef.current,
        {
          opacity: 1,
          scale: 1,
          ease: "none",
          duration: 10,
        },
        "+=1.5"
      ).to(
        buttonRef.current,
        {
          opacity: 0,
          scale: 0.5,
          delay: 10,
          ease: "none",
          duration: 10,
        },
        "+=1.5"
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top",
        end: "+=10%",
        markers: false,
        onEnter: () => setShowDonationButton(true),
        onLeaveBack: () => setShowDonationButton(false),
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top",
        end: "+=100%",
        scrub: true,
        onLeave: () => {
          const video = document.querySelector("video");
          if (video) {
            video.muted = true;
            setIsMuted(true);
          }
        },
      });
    }, gsapScope);

    return () => ctx.revert();
  }, [isMobile, setShowDonationButton]);

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
  const resteNom = motsNom.slice(1).join(" ");

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
        className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20"
      >
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-xl text-white text-center">
          Aidez-nous à préserver
          <br />
          ce trésor du patrimoine
        </h1>

        <p
          ref={premierMotRef}
          className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-garamond leading-relaxed text-center relative overflow-hidden max-w-[90vw]"
        >
          <span className="reveal-text text-transparent relative z-10">
            {premierMot}
          </span>
          <span className="reveal-box absolute bottom-2  md:bottom-6 left-0 h-[2rem] sm:h-[2.5rem] md:h-[3.5rem] lg:h-[4.5rem] w-0 bg-[#ac1115] z-20"></span>
        </p>

        <p
          ref={resteNomRef}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-garamond leading-relaxed text-center relative overflow-hidden max-w-[90vw]"
        >
          <span className="reveal-text text-transparent relative z-10">
            {resteNom}
          </span>
          <span className="reveal-box absolute bottom-2  md:bottom-6 left-0 h-[2rem] sm:h-[2.5rem] md:h-[3.5rem] lg:h-[4.5rem] w-0 bg-[#ac1115] z-0"></span>
        </p>

        <div ref={buttonRef} className="mt-8">
          <DonationButton variant="intro" />
        </div>
      </div>

      <div
        className={`absolute bottom-6 z-40 pointer-events-none transition-opacity duration-500 ${
          showScrollIndicator ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <ScrollIndicator />
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

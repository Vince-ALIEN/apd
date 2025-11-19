"use client";

import { useLayoutEffect, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ErrorMessage from "@components/ErrorMessage";
import useIsMobile from "@hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

export default function PartnerSection({ partners, error, isLoading }) {
  const scopeRef = useRef(null);
  const textBlockRef = useRef(null);
  const logoBlockRef = useRef(null);
  const imagesRef = useRef([]);
  const scrollContainerRef = useRef(null);

  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    if (!partners || partners.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoBlockRef.current,
        { opacity: 0, scale: 0.5 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scopeRef.current,
            start: isMobile ? "top top" : "+370% top",
            end: isMobile ? "bottom top" : "+=390% top",
            toggleActions: "play none none reverse",
            markers: false,
          },
        }
      );

      imagesRef.current.forEach((img) => {
        if (!img) return;
        const enter = () =>
          gsap.to(img, {
            scale: 1.05,
            rotation: 10,
            duration: 0.3,
            ease: "power2.out",
          });
        const leave = () =>
          gsap.to(img, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          });

        img.addEventListener("mouseenter", enter);
        img.addEventListener("mouseleave", leave);
        img._gsapCleanup = () => {
          img.removeEventListener("mouseenter", enter);
          img.removeEventListener("mouseleave", leave);
        };
      });
    }, scopeRef);

    return () => {
      imagesRef.current.forEach((img) => img?._gsapCleanup?.());
      ctx.revert();
    };
  }, [partners, isMobile]);

  useEffect(() => {
    if (!scrollContainerRef.current || !partners || partners.length === 0)
      return;

    const container = scrollContainerRef.current;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    if (scrollWidth <= clientWidth) return;

    let animationId;
    let currentScroll = 0;
    const speed = 0.5;

    const animate = () => {
      currentScroll += speed;

      if (currentScroll >= scrollWidth / 2) {
        currentScroll = 0;
      }

      container.scrollLeft = currentScroll;
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [partners]);

  if (isLoading) {
    return (
      <ErrorMessage
        type="loading"
        message="Chargement des partenaires en cours..."
      />
    );
  }

  if (error) {
    return (
      <ErrorMessage
        type="error"
        message={`Erreur lors du chargement des partenaires : ${error}`}
      />
    );
  }

  if (!partners || partners.length === 0) {
    return (
      <ErrorMessage
        type="empty"
        message="Aucun partenaire à afficher pour le moment."
      />
    );
  }

  return (
    <section
      ref={scopeRef}
      className="relative z-10 w-full min-h-screen bg-[#ac1115] flex items-center justify-center py-20"
    >
      <div className="relative max-w-6xl w-full mx-auto flex flex-col items-center gap-12">
        {/* Bloc texte */}
        <div ref={textBlockRef} className="space-y-4 px-6 max-w-3xl w-full">
          <h2 className="text-3xl sm:text-4xl font-garamond leading-snug drop-shadow-xl text-white">
            Nos <span className="shadow-underline text-white">partenaires</span>
          </h2>
          <div className="text-base sm:text-lg space-y-2 leading-relaxed text-justify font-garamond text-white/90">
            <p className="lettrine_w">
              Ils accompagnent notre démarche patrimoniale et soutiennent la
              transmission des mémoires locales. Leur engagement contribue à
              faire rayonner les lieux, les récits et les savoir-faire qui
              composent l'identité vivante de notre territoire.
            </p>
          </div>
          <a
            href="/partners"
            className="inline-block px-6 py-2 rounded-sm bg-white text-[#ac1115] font-semibold shadow-md hover:bg-[#f9f5ef] transition-all duration-300 w-fit"
          >
            Devenez partenaire
          </a>
        </div>

        {/* Bloc logos avec défilement automatique */}
        <div
          ref={scrollContainerRef}
          className="w-full max-w-3xl overflow-x-hidden relative"
        >
          <div ref={logoBlockRef} className="flex gap-6 px-6">
            {[...partners, ...partners].map((partner, index) => {
              const logo = partner.logo?.[0];
              const imageUrl =
                logo?.formats?.medium?.url ??
                logo?.formats?.small?.url ??
                logo?.formats?.thumbnail?.url ??
                logo?.url;

              return (
                <a
                  key={`${partner.id}-${index}`}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform flex-shrink-0 w-[200px]"
                >
                  <div className="flex items-center justify-center bg-[#f9f5ef] rounded-lg shadow-md aspect-[4/3] overflow-hidden">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={logo?.name || "Logo partenaire"}
                        width={200}
                        height={150}
                        className="object-contain max-h-full max-w-full p-2"
                        ref={(el) => {
                          if (index < partners.length) {
                            imagesRef.current[index] = el;
                          }
                        }}
                      />
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PartnerSection({
  partners,
  titleClass = "text-white",
}) {
  const sectionRef = useRef(null);
  const logosRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      logosRef.current.forEach((el, i) => {
        if (!el) return;

        gsap.set(el, { x: -200, y: 30, opacity: 0, scale: 0.9 });

        gsap.to(el, {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "bounce.out",
          duration: 1,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!partners || partners.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="py-16 px-6 md:px-32 flex items-center justify-center"
    >
      <div className="max-w-6xl w-full mx-auto text-center">
        <h2
          className={`text-2xl md:text-3xl font-bold drop-shadow-lg leading-snug mb-12 ${titleClass}`}
        >
          Nos partenaires
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-center">
          {partners.map((partner, index) => {
            const logo = partner.logo?.[0];
            const imageUrl =
              logo?.formats?.medium?.url ??
              logo?.formats?.small?.url ??
              logo?.formats?.thumbnail?.url ??
              logo?.url;

            return (
              <a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-transform hover:scale-105"
                ref={(el) => (logosRef.current[index] = el)}
              >
                <div className="flex items-center justify-center bg-gray-100 rounded-lg shadow-md aspect-[4/3] overflow-hidden">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={logo?.name || "Logo partenaire"}
                      width={200}
                      height={150}
                      className="object-contain max-h-full max-w-full p-4"
                    />
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

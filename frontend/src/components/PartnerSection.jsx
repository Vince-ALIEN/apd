"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PartnerSection({ partners }) {
  const sectionRef = useRef(null);
  const logosRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      logosRef.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!partners || partners.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="py-16 px-6 md:px-12 bg-white flex items-center justify-center"
    >
      <div className="max-w-6xl w-full mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-gray-800">
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

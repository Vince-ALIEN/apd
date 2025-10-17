"use client";

import { useState, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function DescriptionSection({ eglise }) {
  const [selectedImage, setSelectedImage] = useState(
    eglise?.image_principale ?? null
  );
  const sectionRef = useRef(null);

  const getImageUrl = (img) =>
    img?.formats?.large?.url ?? img?.formats?.medium?.url ?? img?.url;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section,
      { scale: 0.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  if (!eglise?.nom && !eglise?.description?.length && !selectedImage)
    return null;

  return (
    <section
      ref={sectionRef}
      className="relative mt-0 w-full bg-white overflow-hidden px-6 md:px-32 py-12"
    >
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Texte à gauche */}
        <div className="md:w-1/2 w-full">
          <div className="text-gray-800 space-y-4">
            {eglise?.nom && (
              <h2 className="text-2xl md:text-3xl font-bold drop-shadow-lg leading-snug">
                {eglise.nom}
              </h2>
            )}
            {eglise?.description?.length > 0 && (
              <div className="text-sm md:text-base font-normal space-y-2 drop-shadow-sm leading-relaxed">
                {eglise.description.map((para, index) => {
                  const text = para?.children?.[0]?.text?.trim();
                  return text ? <p key={index}>{text}</p> : null;
                })}
              </div>
            )}
          </div>
        </div>

        {/* Image principale à droite */}
        {selectedImage && (
          <div className="md:w-1/2 w-full flex justify-center">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <Image
                src={getImageUrl(selectedImage)}
                alt={selectedImage.name || "Image principale"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

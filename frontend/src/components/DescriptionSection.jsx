"use client";

import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GallerySection from "./GallerySection";

gsap.registerPlugin(ScrollTrigger);

const DescriptionSection = forwardRef(({ eglise }, ref) => {
  const sectionRef = useRef(null); // local ref pour animation
  const curtainRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const galleryRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(
    eglise?.image_principale ?? null
  );

  const getImageUrl = (img) =>
    img?.formats?.large?.url ?? img?.formats?.medium?.url ?? img?.url;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 🧵 Rideau blanc qui entre par la gauche
      tl.fromTo(
        curtainRef.current,
        { xPercent: -100 },
        { xPercent: 0, duration: 0.6, ease: "power2.out" },
        0
      );

      // ✨ Texte à gauche
      tl.fromTo(
        textRef.current,
        { xPercent: -200, opacity: 1 },
        { xPercent: 0, opacity: 1, duration: 1 },
        "+=0.2"
      );

      // 🖼️ Image à droite
      tl.fromTo(
        imageRef.current,
        { xPercent: 200, opacity: 1 },
        { xPercent: 0, opacity: 1, duration: 1 },
        "-=0.8"
      );

      // 🎞️ Galerie animée en bas
      gsap
        .timeline({
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
        .fromTo(
          galleryRef.current,
          { xPercent: 100, opacity: 1 },
          { xPercent: 0, opacity: 1, duration: 1, ease: "power2.out" },
          "+=0.5" // ⏱️ décale le début de l'animation dans le scroll
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!eglise?.nom && !eglise?.description?.length && !selectedImage)
    return null;

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
      className="relative w-full min-h-screen bg-black/40 px-6 md:px-32 overflow-hidden flex flex-col justify-center"
    >
      {/* 🧵 Rideau blanc */}
      <div
        ref={curtainRef}
        className="absolute top-0 left-0 w-full h-full bg-white z-0 pointer-events-none"
      />

      {/* 🎬 Contenu principal */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 pt-35">
        {/* Texte à gauche */}
        <div ref={textRef} className="md:w-1/2 w-full">
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

        {/* Image à droite */}
        {selectedImage && (
          <div ref={imageRef} className="md:w-1/2 w-full flex justify-center">
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

      {/* 🎨 Galerie animée en bas */}
      <div ref={galleryRef}>
        <GallerySection eglise={eglise} />
      </div>
    </section>
  );
});

export default DescriptionSection;

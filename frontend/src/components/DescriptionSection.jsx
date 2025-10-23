"use client";

import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DescriptionSection = forwardRef(({ eglise }, ref) => {
  const sectionRef = useRef(null);
  const curtainRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(
    eglise?.image_principale ?? null
  );

  const getImageUrl = (img) =>
    img?.formats?.large?.url ?? img?.formats?.medium?.url ?? img?.url;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const curtain = curtainRef.current;
      const text = textRef.current;
      const image = imageRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 0.5,
        },
      });

      // 🧵 Rideau en arrière-plan
      tl.fromTo(
        curtain,
        { xPercent: -100 },
        { xPercent: 0, ease: "power3.out", duration: 0.6 }
      );

      // ✨ Contenu glisse et apparaît
      tl.fromTo(
        text,
        { xPercent: -200, opacity: 0 },
        { xPercent: 0, opacity: 1, ease: "power3.out", duration: 0.6 },
        "+=0.2"
      );

      tl.fromTo(
        image,
        { xPercent: 200, opacity: 0 },
        { xPercent: 0, opacity: 1, ease: "power3.out", duration: 0.6 },
        "-=0.6"
      );

      // 🧵 Rideau sort
      tl.to(
        curtain,
        { xPercent: -100, ease: "power3.inOut", duration: 0.6 },
        "+=0.3"
      );

      // 🎨 Texte devient blanc
      tl.to(
        text,
        { color: "#ffffff", ease: "power2.out", duration: 0.4 },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!eglise?.nom && !eglise?.description?.length && !selectedImage)
    return null;

  return (
    <section
      ref={(el) => {
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
        sectionRef.current = el;
      }}
      className="relative w-screen h-screen px-6 md:px-32 overflow-hidden flex flex-col justify-center"
    >
      {/* 🧵 Rideau blanc en arrière-plan */}
      <div
        ref={curtainRef}
        className="absolute top-0 left-0 w-full h-full bg-white z-[-1] pointer-events-none"
      />

      {/* 🎬 Contenu principal */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 py-20">
        {/* Texte à gauche */}
        <div ref={textRef} className="md:w-1/2 w-full text-gray-800">
          <div className="space-y-4">
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
    </section>
  );
});

export default DescriptionSection;

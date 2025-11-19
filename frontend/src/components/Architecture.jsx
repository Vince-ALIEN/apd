"use client";

import { forwardRef, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Architecture = forwardRef(({ styleArchitectural, plan }, ref) => {
  const scopeRef = useRef(null);
  const imageContainerRef = useRef(null);

  if (!styleArchitectural || styleArchitectural.length === 0) return null;

  const planUrl =
    plan?.formats?.medium?.url ??
    plan?.formats?.small?.url ??
    plan?.url ??
    null;

  useLayoutEffect(() => {
    if (!imageContainerRef.current || !scopeRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      gsap.set(imageContainerRef.current, { scale: 0.3, opacity: 0 });

      gsap.to(imageContainerRef.current, {
        scale: 1,
        opacity: 1,
        duration: isMobile ? 1 : 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: isMobile ? "top center" : "+=290%",
          end: isMobile ? "bottom center" : "+=50%",
          toggleActions: "play none none reverse",
          scrub: 0.5,
          markers: false,
        },
      });
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={scopeRef}
      className="relative w-full min-h-screen flex items-center justify-center"
    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-10 items-center text-black pt-15">
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="text-3xl md:text-4xl font-garamond leading-snug break-words">
            Le style{" "}
            <span className="text-white shadow-underline">architectural</span>
          </h2>
          <div className="text-sm md:text-base space-y-2 leading-tight text-justify">
            {styleArchitectural?.map((para, index) => {
              const text = para?.children?.[0]?.text?.trim();
              return text ? (
                <p key={index} className={index === 0 ? "lettrine" : ""}>
                  {text}
                </p>
              ) : null;
            })}
          </div>
        </div>

        {planUrl && (
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div
              ref={imageContainerRef}
              className="relative max-w-[25rem] w-full aspect-[3/4]"
            >
              <Image
                src={planUrl}
                alt="Plan architectural de l’église"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default Architecture;

"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function InterviewSection({ block }) {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const animatedWrapperRef = useRef(null);

  const titre = block?.titre;
  const description = block?.description?.[0]?.children?.[0]?.text;
  const videoUrl = block?.video?.url;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    const animatedWrapper = animatedWrapperRef.current;

    if (!section || !pinWrapper || !animatedWrapper) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=100%",
        scrub: 1.2,
        pin: pinWrapper,
        anticipatePin: 1,
        markers: false,
      },
    });

    tl.fromTo(
      animatedWrapper,
      { x: "200%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 0.6, ease: "expo.out" }
    );

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  const hasContent = titre || videoUrl || description;
  if (!hasContent) return null;

  return (
    <section ref={sectionRef} className="relative pb-12">
      <div
        ref={pinWrapperRef}
        className="sticky top-0 flex items-start justify-center px-6 pt-24 relative overflow-hidden"
      >
        {/* 🟤 Bloc animé */}
        <div
          ref={animatedWrapperRef}
          className="mt-0 bg-black/50 text-center flex flex-col items-center justify-center w-full max-w-4xl z-10 relative space-y-8 px-6 py-12 rounded-xl shadow-2xl"
        >
          {titre && (
            <h2 className="text-2xl md:text-3xl font-bold drop-shadow-lg leading-snug text-white">
              {titre}
            </h2>
          )}

          {videoUrl && (
            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-xl">
              <video
                src={videoUrl}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                onClick={(e) => {
                  const videoElement = e.currentTarget;
                  if (videoElement.requestFullscreen) {
                    videoElement.requestFullscreen();
                  } else if (videoElement.webkitRequestFullscreen) {
                    videoElement.webkitRequestFullscreen();
                  } else if (videoElement.msRequestFullscreen) {
                    videoElement.msRequestFullscreen();
                  }
                }}
              />
            </div>
          )}

          {description && (
            <p className="text-sm md:text-base font-normal drop-shadow-sm leading-relaxed text-white max-w-3xl">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* ⏳ Spacer */}
      <div className="h-[0vh]" />
    </section>
  );
}

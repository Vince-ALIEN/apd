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
        end: "bottom bottom",
        scrub: 1.5,
        pin: pinWrapper,
        anticipatePin: 1,
        markers: false,
      },
    });

    tl.fromTo(
      animatedWrapper,
      { x: "300%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 10, ease: "power4.out" }
    );

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  const hasContent = titre || videoUrl || description;
  if (!hasContent) return null;

  return (
    <section ref={sectionRef} className="relative">
      <div
        ref={pinWrapperRef}
        className="sticky top-0 min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden"
      >
        {/* 🟤 Bloc animé avec fond noir */}
        <div
          ref={animatedWrapperRef}
          className="text-white bg-black text-center flex flex-col items-center justify-center w-full max-w-4xl z-10 relative space-y-8 px-6 py-12 rounded-xl shadow-2xl"
        >
          {titre && (
            <h2 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg">
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
                    videoElement.webkitRequestFullscreen(); // Safari
                  } else if (videoElement.msRequestFullscreen) {
                    videoElement.msRequestFullscreen(); // IE11
                  }
                }}
              />
            </div>
          )}

          {description && (
            <p className="text-lg md:text-xl font-medium max-w-3xl drop-shadow-sm">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

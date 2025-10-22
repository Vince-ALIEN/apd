"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AddressSection from "@components/AddressSection";
import { useSiteData } from "@hooks/useSiteData";

gsap.registerPlugin(ScrollTrigger);

export default function InterviewSection({ block }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { eglise } = useSiteData(API_URL);

  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const addressWrapperRef = useRef(null);
  const interviewWrapperRef = useRef(null);

  const titre = block?.titre;
  const description = block?.description?.[0]?.children?.[0]?.text;
  const videoUrl = block?.video?.url;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    const addressWrapper = addressWrapperRef.current;
    const interviewWrapper = interviewWrapperRef.current;

    if (!section || !pinWrapper || !addressWrapper || !interviewWrapper) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=150%",
        scrub: true,
        pin: section,
        anticipatePin: 1,
        markers: false,
      },
    });

    // 🏛️ AddressSection entre
    tl.fromTo(
      addressWrapper,
      { xPercent: 100, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.6"
    );

    // 🏛️ AddressSection sort
    tl.to(
      addressWrapper,
      { xPercent: -100, opacity: 0, duration: 0.6, ease: "power2.in" },
      "+=0.6"
    );

    // 🎤 InterviewSection entre
    tl.fromTo(
      interviewWrapper,
      { xPercent: 100, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "+=0.2"
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
        className="relative h-screen w-full overflow-hidden"
      >
        {/* 🏛️ AddressSection animé */}
        <div
          ref={addressWrapperRef}
          className="absolute inset-0 flex items-center justify-center mt-20"
        >
          <div className="w-full max-w-4xl px-6 py-8 rounded-xl ">
            <AddressSection eglise={eglise} />
          </div>
        </div>

        {/* 🎤 Interview content animé */}
        <div
          ref={interviewWrapperRef}
          className="absolute inset-0 flex items-center justify-center mt-20"
        >
          <div className="w-full max-w-6xl px-6 py-12 rounded-xl ">
            {videoUrl && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl group">
                <video
                  src={videoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover cursor-pointer"
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
          </div>
        </div>
      </div>

      {/* ⏳ Spacer */}
      <div className="h-[0vh]" />
    </section>
  );
}

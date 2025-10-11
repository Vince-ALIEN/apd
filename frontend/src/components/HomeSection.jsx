"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export default function HomeSection({ onSkip }) {
  const uiRef = useRef(null);
  const wordRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" }, delay: 2 });

    const words = ["Nous", "avons", "besoin", "de vous"];
    words.forEach((word) => {
      tl.to(wordRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        onComplete: () => {
          if (wordRef.current) {
            wordRef.current.innerHTML = `<span class="text-red-600">${word.charAt(0)}</span>${word.slice(1)}`;
          }
        },
      });
      tl.to(
        wordRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
        },
        "+=0.1"
      );
    });

    tl.to(wordRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 1,
      delay: 1,
    });
  }, []);

  const toggleMute = () => {
    const video = document.querySelector("video");
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const skipVideo = () => {
    if (onSkip) onSkip();
    if (uiRef.current) {
      uiRef.current.style.display = "none";
    }
  };

  return (
    <div
      ref={uiRef}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center text-center px-6"
    >
      <div className="pointer-events-none flex items-center justify-center">
        <div
          ref={wordRef}
          className="text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold opacity-0 scale-50 leading-tight text-center w-full max-w-[90vw] px-4"
        >
          <span className="text-red-600">N</span>ous
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-50">
        <button
          onClick={toggleMute}
          className="group relative flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-white text-sm font-normal backdrop-blur-md shadow-md transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5L6 9H2v6h4l5 4V5z"
            />
          </svg>
          {isMuted ? "activer" : "couper"}
        </button>

        <button
          onClick={skipVideo}
          className="group relative flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-white text-sm font-normal backdrop-blur-md shadow-md transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 5l7 7-7 7M5 5h2v14H5z"
            />
          </svg>
          passer
        </button>
      </div>
    </div>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export default function HomeSection({ onSkip }) {
  const uiRef = useRef(null);
  const wordRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" }, delay: 1 });

    const words = ["Nous", "avons", "besoin", "de vous"];
    if (wordRef.current) {
      wordRef.current.textContent = ""; // nettoyage initial
    }

    words.forEach((word) => {
      tl.to(wordRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        onComplete: () => {
          if (wordRef.current) {
            wordRef.current.textContent = word; // mot brut, sans HTML
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
    const video = document.querySelector("video");
    if (video) {
      video.muted = true; // 🔇 coupe le son
    }

    if (uiRef.current) uiRef.current.style.display = "none";
    if (onSkip) onSkip(); // déclenche la montée du rideau
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
          className="px-5 py-2 rounded-full bg-white/10 text-white text-sm backdrop-blur-md shadow-md hover:bg-white/20 transition flex items-center gap-2"
        >
          {isMuted ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5v14l-5-5H4a1 1 0 01-1-1V9a1 1 0 011-1h1l5-5zM19 9l-2 2m0 0l-2 2m2-2l2 2m-2-2l-2-2"
                />
              </svg>
              désactivé
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5v14l-5-5H4a1 1 0 01-1-1V9a1 1 0 011-1h1l5-5zM15 9a3 3 0 010 6"
                />
              </svg>
              activé
            </>
          )}
        </button>

        <button
          onClick={skipVideo}
          className="px-5 py-2 rounded-full bg-white/10 text-white text-sm backdrop-blur-md shadow-md hover:bg-white/20 transition flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5v14"
            />
          </svg>
          Passer
        </button>
      </div>
    </div>
  );
}

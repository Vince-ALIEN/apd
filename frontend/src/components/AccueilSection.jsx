"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export default function AccueilSection({ videoUrl, onSkip }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const wordRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const animatedWords = ["Nous", "avons", "besoin", "de", "vous"];

  useEffect(() => {
    const video = videoRef.current;
    if (video && videoUrl) {
      video.muted = isMuted;
      video.play().catch((err) => {
        console.warn("Lecture vidéo bloquée :", err);
        setVideoError(true);
      });
    }
  }, [isMuted, videoUrl]);

  useEffect(() => {
    const delay = 2; // secondes avant le début
    const timeline = gsap.timeline({ delay });

    animatedWords.forEach((word, i) => {
      const isLast = i === animatedWords.length - 1;

      timeline.to(wordRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: "power3.in",
        onComplete: () => {
          if (wordRef.current) {
            wordRef.current.innerHTML = `<span class="text-red-600">${word.charAt(0)}</span>${word.slice(1)}`;
            wordRef.current.className = `font-extrabold leading-tight text-center text-white ${
              isLast ? "text-[8vw]" : "text-[4vw]"
            } opacity-0 scale-50`;
          }
        },
      });

      timeline.to(wordRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      });

      // Si c’est le dernier mot, on le fait disparaître après un délai
      if (isLast) {
        timeline.to(wordRef.current, {
          opacity: 0,
          scale: 0.5,
          duration: 1,
          ease: "power3.inOut",
          delay: 2,
        });
      }
    });
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const skipVideo = () => {
    if (onSkip) onSkip();
    setTimeout(() => {
      const accueil = containerRef.current;
      if (accueil) {
        accueil.style.transition = "opacity 0.5s ease";
        accueil.style.opacity = 0;
        setTimeout(() => {
          accueil.style.display = "none";
        }, 500);
      }
    }, 800);
  };

  return (
    <section
      ref={containerRef}
      className="accueil-block fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* 🎥 Vidéo d’accueil */}
      {videoUrl && !videoError ? (
        <video
          ref={videoRef}
          src={videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          playsInline
          autoPlay
          muted={isMuted}
          onError={() => setVideoError(true)}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center text-white text-lg">
          Vidéo d’accueil indisponible
        </div>
      )}

      {/* ✨ Texte animé mot par mot */}
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <div
          ref={wordRef}
          className="text-white text-[4vw] font-extrabold opacity-0 scale-50 leading-tight text-center"
        >
          <span className="text-red-600">{animatedWords[0].charAt(0)}</span>
          {animatedWords[0].slice(1)}
        </div>
      </div>

      {/* 🔘 Boutons en bas */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6 z-50">
        {/* 🔊 Bouton Son */}
        <button
          onClick={toggleMute}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full backdrop-blur-md shadow-lg transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
          {isMuted ? "Activer le son" : "Couper le son"}
        </button>

        {/* ⏭️ Bouton Passer */}
        <button
          onClick={skipVideo}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full backdrop-blur-md shadow-lg transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
          Passer
        </button>
      </div>
    </section>
  );
}

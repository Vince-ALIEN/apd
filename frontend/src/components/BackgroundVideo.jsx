"use client";
import { useEffect } from "react";

export default function BackgroundVideo({ videoUrl, videoRef }) {
  if (!videoUrl) return null;

  useEffect(() => {
    const video = videoRef?.current;
    if (video) {
      video.muted = true;
      video.play().catch((err) => {
        console.warn("Lecture vidéo bloquée :", err);
      });
    }
  }, [videoUrl, videoRef]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={videoUrl} type="video/mp4" />
        Votre navigateur ne supporte pas la lecture vidéo.
      </video>
    </div>
  );
}

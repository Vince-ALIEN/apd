"use client";

export default function VideoBackground({ videoUrl, isMuted = true }) {
  if (!videoUrl) return null;

  return (
    <video
      src={videoUrl}
      className="fixed inset-0 w-full h-full object-cover z-[-1]"
      autoPlay
      loop
      muted={isMuted}
      playsInline
    />
  );
}

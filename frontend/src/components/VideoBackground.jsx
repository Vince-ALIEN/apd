"use client";

import { useState } from "react";

export default function VideoBackground({ videoUrl }) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!videoUrl) return null;

  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none bg-black">
      <video
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setIsLoaded(true)}
        onCanPlayThrough={() => setIsLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

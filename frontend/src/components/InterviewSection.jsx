"use client";
import React, { useRef, useState } from "react";

export default function InterviewSection({ videoUrl }) {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section className="relative z-10 w-full min-h-screen flex items-center justify-center pt-[100px] px-6">
      <div className="w-full max-w-4xl">
        <h2 className="text-4xl font-bold mb-6 text-white drop-shadow-lg text-center">
          Vos dons sont précieux
        </h2>

        {videoUrl ? (
          <VideoBlock
            videoUrl={videoUrl}
            videoRef={videoRef}
            videoReady={videoReady}
            setVideoReady={setVideoReady}
          />
        ) : (
          <MessageBlock message="La vidéo n’est pas disponible pour le moment." />
        )}

        <DonationButton videoRef={videoRef} />
      </div>
    </section>
  );
}

function VideoBlock({ videoUrl, videoRef, videoReady, setVideoReady }) {
  return (
    <div className="relative w-full mb-8 rounded-lg shadow-lg bg-black">
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        muted
        playsInline
        preload="metadata"
        onCanPlay={() => setVideoReady(true)}
        className="w-full max-h-[80vh] block"
        style={{
          opacity: videoReady ? 1 : 0.99,
          transition: "opacity 0.5s ease-in-out",
        }}
      />
    </div>
  );
}

function MessageBlock({ message }) {
  return <p className="text-red-400 mb-8 text-center drop-shadow">{message}</p>;
}

function DonationButton({ videoRef }) {
  const [hasStartedWithSound, setHasStartedWithSound] = useState(false);

  const handleStartWithSound = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.play();
      setHasStartedWithSound(true);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      {!hasStartedWithSound && (
        <button
          onClick={handleStartWithSound}
          className="group px-5 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 border border-white/30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white group-hover:scale-110 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l-5 5h-2v4h2l5 5V5zM15 10a3 3 0 010 4m2-6a6 6 0 010 8"
            />
          </svg>
          <span className="group-hover:tracking-wide transition-all">
            Lancer avec le son
          </span>
        </button>
      )}

      <a
        href="https://www.helloasso.com/associations/les-compagnons-de-l-art-et-du-patrimoine-de-doazit/formulaires/1"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-red-500 text-white font-bold rounded-full shadow hover:bg-red-600 transition animate-pulse-cta"
      >
        Faire un don
      </a>
    </div>
  );
}

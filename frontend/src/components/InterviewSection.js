"use client";
import React, { useRef, useState, useEffect } from "react";

export default function InterviewSection({ videoUrl }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <section
      className="relative py-20 px-6 text-center text-black"
      style={{
        backgroundImage:
          'url("https://appetizing-balance-03c58ad391.media.strapiapp.com/chaud_calcaire_texture_a6787039c7.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">Votre aide est précieuse</h2>

        {videoUrl ? (
          <div className="relative w-full h-[300px] md:h-[500px] rounded-lg overflow-hidden shadow-lg mb-8">
            <video
              ref={videoRef}
              className={`w-full h-full object-cover ${videoReady ? "" : "opacity-0"}`}
              src={videoUrl}
              controls
              muted
              playsInline
              onCanPlay={() => setVideoReady(true)}
            />
            <button
              onClick={handleToggleMute}
              className="absolute bottom-4 right-4 px-4 py-2 bg-white/80 text-black font-semibold rounded-full shadow hover:bg-white transition"
            >
              {isMuted ? "Activer le son" : "Couper le son"}
            </button>
          </div>
        ) : (
          <p className="text-red-600 mb-8">
            La vidéo n’est pas disponible pour le moment.
          </p>
        )}

        <div className="prose prose-lg text-left mx-auto text-black mb-10">
          <p>
            “L’église Saint-Jean-Baptiste d’Aulès est un témoin précieux de
            notre histoire locale. Elle a traversé les siècles, accueillant les
            générations dans les moments forts de leur vie. Aujourd’hui, sa
            structure est fragilisée, ses fresques s’effacent, et son clocher
            menace de s’effondrer. Il est urgent d’agir pour préserver ce
            patrimoine classé, afin qu’il continue de transmettre son âme aux
            générations futures.”
          </p>
        </div>

        <a
          href="https://www.helloasso.com/associations/les-compagnons-de-l-art-et-du-patrimoine-de-doazit/formulaires/1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-red-400 text-black font-bold rounded-full shadow hover:bg-red-500 transition"
        >
          Faire un don
        </a>
      </div>
    </section>
  );
}

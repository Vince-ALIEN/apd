"use client";
import React, { useRef, useState, useEffect } from "react";

export default function InterviewSection({ videoUrl }) {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
  }, []);

  return (
    <section className="relative min-h-screen py-10 px-6 text-center text-black">
      {/* Contenu au-dessus du fond */}
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
          </div>
        ) : (
          <p className="text-red-600 mb-8">
            La vidéo n’est pas disponible pour le moment.
          </p>
        )}

        {/* Bloc texte avec fond clair */}
        <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md mb-10">
          <div className="prose prose-lg text-left mx-auto text-black">
            <p>
              “L’église Saint-Jean-Baptiste d’Aulès est un témoin précieux de
              notre histoire locale. Elle a traversé les siècles, accueillant
              les générations dans les moments forts de leur vie. Aujourd’hui,
              sa structure est fragilisée, ses fresques s’effacent, et son
              clocher menace de s’effondrer. Il est urgent d’agir pour préserver
              ce patrimoine classé, afin qu’il continue de transmettre son âme
              aux générations futures.”
            </p>
          </div>
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

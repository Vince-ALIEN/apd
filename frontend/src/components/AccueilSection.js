"use client";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

export default function AccueilSection({ accueil }) {
  const [isMuted, setIsMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [showDonationText, setShowDonationText] = useState(false);
  const [showDonationButton, setShowDonationButton] = useState(false);
  const videoRef = useRef(null);

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

  useEffect(() => {
    const textTimer = setTimeout(() => setShowDonationText(true), 3000);
    const buttonTimer = setTimeout(() => setShowDonationButton(true), 4200);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const videoUrl = accueil?.video?.url || null;

  return (
    <section
      id="accueil"
      className="relative h-screen overflow-hidden bg-black"
    >
      {showDonationText && (
        <div className="absolute top-1/4 w-full text-center z-10 pointer-events-none px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg animate-title">
            Aidez-nous à préserver ce trésor du patrimoine
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 animate-paragraph">
            Chaque don contribue à restaurer l’église Saint-Jean-Baptiste
            d’Aulès et à transmettre son histoire aux générations futures.
          </p>
          {showDonationButton && (
            <div className="mt-6 pointer-events-auto animate-button flex justify-center gap-4 flex-wrap">
              <button
                onClick={() =>
                  document
                    .getElementById("interview")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 bg-white text-black font-semibold rounded-full shadow hover:bg-gray-200 transition"
              >
                Votre aide est précieuse
              </button>

              <a
                href="https://www.helloasso.com/associations/les-compagnons-de-l-art-et-du-patrimoine-de-doazit/formulaires/1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-red-400 text-black font-bold rounded-full shadow hover:bg-red-500 transition"
              >
                Faire un don
              </a>
            </div>
          )}
        </div>
      )}

      <div className={`absolute inset-0 z-0 ${videoReady ? "" : "opacity-0"}`}>
        {videoUrl && (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVideoReady(true)}
          >
            <source src={videoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
        )}
      </div>

      <button
        onClick={handleToggleMute}
        className="absolute bottom-4 left-4 z-10 bg-white/80 text-black text-xl p-3 rounded-full shadow hover:bg-white transition"
        aria-label="Son"
      >
        <FontAwesomeIcon
          icon={isMuted ? faVolumeMute : faVolumeUp}
          className="text-black text-2xl"
        />
      </button>
    </section>
  );
}

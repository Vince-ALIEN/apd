"use client";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faVolumeMute,
  faCircleStop,
} from "@fortawesome/free-solid-svg-icons";

export default function AccueilSection({ accueil, onVideoEnd }) {
  const [videoEnded, setVideoEnded] = useState(false);
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

  const handleSkipVideo = () => {
    setVideoEnded(true);
    onVideoEnd?.();
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (!videoEnded) {
      const textTimer = setTimeout(() => setShowDonationText(true), 3000);
      const buttonTimer = setTimeout(() => setShowDonationButton(true), 4200);
      return () => {
        clearTimeout(textTimer);
        clearTimeout(buttonTimer);
      };
    }
  }, [videoEnded]);

  const videoUrl = accueil?.video?.url || null;
  const backgroundUrl = accueil?.background?.url || "/fallback.jpg";

  return (
    <section
      id="accueil"
      className="relative h-screen overflow-hidden bg-black"
    >
      {!videoEnded && showDonationText && (
        <div className="absolute top-1/4 w-full text-center z-10 pointer-events-none px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg animate-title">
            Aidez-nous à préserver ce trésor du patrimoine
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 animate-paragraph">
            Chaque don contribue à restaurer l’église Saint-Jean-Baptiste
            d’Aulès et à transmettre son histoire aux générations futures.
          </p>
          {showDonationButton && (
            <div className="mt-6 pointer-events-auto animate-button">
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
        {!videoEnded && videoUrl ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVideoReady(true)}
            onEnded={handleSkipVideo}
            onError={handleSkipVideo}
          >
            <source src={videoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
        ) : (
          <div className="w-full h-full relative transition-opacity duration-700 ease-in-out">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url("${backgroundUrl}")` }}
            ></div>

            <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6 z-10">
              <div className="max-w-4xl">
                <div className="bg-black/25 p-6 rounded-xl max-w-3xl mx-auto text-center">
                  <h2 className="text-white text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
                    Bienvenue
                  </h2>
                  <p className="text-white text-xl md:text-2xl drop-shadow-2xl">
                    Découvrez le patrimoine exceptionnel de l'église
                    <br />
                    Saint-Jean-Baptiste d'Aulès
                  </p>
                </div>
                <button
                  onClick={() =>
                    document
                      .getElementById("interview")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="mt-8 px-8 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300"
                >
                  Découvrir →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {!videoEnded && (
        <>
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

          <button
            onClick={handleSkipVideo}
            className="absolute bottom-4 right-4 z-10 bg-black text-white text-xl p-3 rounded-full shadow hover:bg-gray-800 transition"
            aria-label="Stop"
          >
            <FontAwesomeIcon
              icon={faCircleStop}
              className="text-white text-2xl"
            />
          </button>
        </>
      )}
    </section>
  );
}

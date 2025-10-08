"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function PartenairesSection({ API_URL }) {
  const [partenaires, setPartenaires] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  useEffect(() => {
    const fetchPartenaires = async () => {
      try {
        const res = await fetch(`${API_URL}/api/partenaires?populate=*`);
        const json = await res.json();
        const logos = Array.isArray(json?.data) ? json.data : [];
        setPartenaires(logos);
      } catch {
        setError("Impossible de charger les partenaires.");
      } finally {
        setLoading(false);
      }
    };
    fetchPartenaires();
  }, [API_URL]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateScrollButtons = () => {
      setCanScrollUp(el.scrollTop > 0);
      setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight);
    };

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  const scrollByAmount = (amount) => {
    scrollRef.current?.scrollBy({ top: amount, behavior: "smooth" });
  };

  const renderMessage = () => {
    if (loading) return "Chargement des partenaires…";
    if (error) return error;
    if (partenaires.length === 0)
      return "Aucun partenaire n’est disponible pour le moment.";
    return null;
  };

  const gridCols =
    partenaires.length === 1
      ? "grid-cols-1"
      : partenaires.length === 2
        ? "grid-cols-2"
        : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="max-w-6xl mx-auto bg-black/20 backdrop-blur-sm p-8 rounded-xl shadow-xl text-center overflow-y-auto max-h-[80vh]"
      >
        <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">
          Nos partenaires
        </h2>

        {renderMessage() && (
          <p
            className={`mb-6 drop-shadow ${error ? "text-red-400" : "text-white/80"}`}
          >
            {renderMessage()}
          </p>
        )}

        <div className={`grid gap-8 justify-center ${gridCols}`}>
          {partenaires.map((item, index) => {
            const logoUrl = item.attributes?.logo?.data?.attributes?.url;
            const lien = item.attributes?.url;
            if (!logoUrl || !lien) return null;

            return (
              <a
                key={index}
                href={lien}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visiter le site du partenaire ${index + 1}`}
                className="block w-full max-w-[200px] mx-auto hover:scale-105 transition-transform"
              >
                <div className="relative w-full h-[150px] bg-white/30 backdrop-blur-sm rounded-lg shadow-md">
                  <Image
                    src={logoUrl}
                    alt={`Logo partenaire ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {(canScrollUp || canScrollDown) && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex gap-4">
          {canScrollUp && (
            <ScrollButton direction="up" onClick={() => scrollByAmount(-300)} />
          )}
          {canScrollDown && (
            <ScrollButton
              direction="down"
              onClick={() => scrollByAmount(300)}
            />
          )}
        </div>
      )}
    </div>
  );
}

function ScrollButton({ direction, onClick }) {
  const icon =
    direction === "up" ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    );

  return (
    <button
      onClick={onClick}
      className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-md shadow-md"
      aria-label={`Scroll ${direction}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        {icon}
      </svg>
    </button>
  );
}

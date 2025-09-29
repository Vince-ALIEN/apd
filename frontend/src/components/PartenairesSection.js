"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PartenairesSection({ API_URL }) {
  const [partenaires, setPartenaires] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPartenaires() {
      try {
        const res = await fetch(`${API_URL}/api/partenaires?populate=*`);
        const json = await res.json();

        const logos = json?.data ?? [];
        setPartenaires(logos);
      } catch (err) {
        console.error("Erreur API partenaires :", err);
      }
    }

    fetchPartenaires();
  }, [API_URL]);

  return (
    <section className="py-16 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold mb-6 text-black">Nos partenaires</h2>

      {error && <p className="text-red-600 mb-6">{error}</p>}

      <div
        className={`grid gap-8 justify-center ${
          partenaires.length === 1
            ? "grid-cols-1"
            : partenaires.length === 2
              ? "grid-cols-2"
              : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        }`}
      >
        {partenaires.map((item, index) => {
          const logoUrl = item.logo?.data?.attributes?.url;
          const lien = item.url;

          if (!logoUrl || !lien) return null;

          return (
            <a
              key={index}
              href={lien}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full max-w-[200px] mx-auto hover:scale-105 transition-transform"
            >
              <div className="relative w-full h-[150px]">
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
    </section>
  );
}

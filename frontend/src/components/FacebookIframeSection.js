"use client";
import { useEffect, useState } from "react";

export default function FacebookIframeSection({ API_URL }) {
  const [embeds, setEmbeds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEmbeds() {
      try {
        const res = await fetch(`${API_URL}/api/facebook-embeds`);
        const json = await res.json();
        setEmbeds(json.data ?? []);
      } catch (err) {
        setError("Erreur de chargement des publications Facebook.");
        console.error(err);
      }
    }

    fetchEmbeds();
  }, [API_URL]);

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  if (!embeds.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        Aucune publication Facebook disponible pour le moment.
      </div>
    );
  }

  return (
    <section id="facebook-posts" className="scroll-mt-[100px] py-10 bg-white">
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-black drop-shadow">
          Actualités
        </h2>
      </div>

      <div className="w-full overflow-x-auto px-2">
        <div
          className={`flex gap-4 pb-4 ${
            embeds.length > 1 ? "" : "justify-center"
          }`}
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {embeds.map((item) => {
            const html = item?.iframe;
            if (!html) return null;

            return (
              <div
                key={item.id}
                className="min-w-[320px] flex-shrink-0 scroll-snap-align-start"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

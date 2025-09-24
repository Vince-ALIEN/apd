"use client";
import React from "react";

export default function LocalisationSection({ eglise }) {
  const location = eglise.localisation?.[0];

  return (
    <section id="localisation" className="py-5 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Localisation
        </h2>

        {location ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Colonne gauche : Adresse */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                Adresse
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                {location.code_postal} {location.ville}
                <br />
                {location.region}, {location.pays}
              </p>
              <p className="text-lg text-gray-700">
                Coordonnées GPS :
                <br />
                {location.latitude}, {location.longitude}
              </p>
            </div>

            {/* Colonne droite : Carte Google Maps */}
            <div className="rounded-2xl overflow-hidden shadow-md">
              <iframe
                title="Carte Google Maps"
                width="100%"
                height="100%"
                className="min-h-[300px] md:min-h-[400px]"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&hl=fr&z=15&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <p className="text-lg text-gray-700">
              Informations de localisation à venir
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

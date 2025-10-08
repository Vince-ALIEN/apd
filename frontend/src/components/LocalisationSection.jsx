"use client";
import React from "react";

export default function LocalisationSection({ eglise }) {
  const location = eglise.localisation?.[0];

  const hasLocation = Boolean(location?.latitude && location?.longitude);

  return (
    <section className="py-5 px-6 scroll-mt-[100px] relative z-10">
      <div className="max-w-6xl mx-auto bg-black/20 backdrop-blur-sm p-8 rounded-xl shadow-xl">
        <h2 className="text-4xl font-bold text-white text-center mb-12 drop-shadow-lg">
          Localisation
        </h2>

        {hasLocation ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <AdresseBlock location={location} />
            <CarteBlock location={location} />
          </div>
        ) : (
          <MessageBlock />
        )}
      </div>
    </section>
  );
}

function AdresseBlock({ location }) {
  return (
    <div className="bg-black/10 backdrop-blur-sm rounded-2xl p-8 shadow-md">
      <h3 className="text-2xl font-semibold mb-4 text-white drop-shadow">
        Adresse
      </h3>
      <p className="text-lg text-white/90 mb-4 drop-shadow">
        {location.code_postal} {location.ville}
        <br />
        {location.region}, {location.pays}
      </p>
      <p className="text-lg text-white/90 drop-shadow">
        Coordonnées GPS :
        <br />
        {location.latitude}, {location.longitude}
      </p>
    </div>
  );
}

function CarteBlock({ location }) {
  const { latitude, longitude } = location;
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&hl=fr&z=15&output=embed`;

  return (
    <div className="rounded-2xl overflow-hidden shadow-md">
      <iframe
        title="Carte Google Maps"
        width="100%"
        height="100%"
        className="min-h-[300px] md:min-h-[400px]"
        frameBorder="0"
        style={{ border: 0 }}
        src={mapUrl}
        allowFullScreen
      />
    </div>
  );
}

function MessageBlock() {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center shadow-md">
      <p className="text-lg text-white/80 drop-shadow">
        Informations de localisation à venir
      </p>
    </div>
  );
}

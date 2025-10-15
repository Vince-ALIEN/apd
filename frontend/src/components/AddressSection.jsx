"use client";

export default function AddressSection({ eglise }) {
  const localisation = eglise?.localisation?.[0];
  const adresse = localisation
    ? `${localisation.ville}, ${localisation.region}, ${localisation.pays}`
    : null;

  if (!adresse) return null;

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(adresse)}&output=embed`;

  return (
    <section className="py-12 px-6 md:px-32 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Localisation</h2>
        <p className="text-lg text-gray-600 mb-6">{adresse}</p>
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
          <iframe
            title="Carte Google"
            src={mapUrl}
            style={{ border: "none", width: "100%", height: "100%" }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

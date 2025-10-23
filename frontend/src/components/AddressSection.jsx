"use client";

export default function AddressSection({ eglise }) {
  const localisation = eglise?.localisation?.[0];
  const adresse = localisation
    ? `${localisation.ville}, ${localisation.region}, ${localisation.pays}`
    : null;

  if (!adresse) return null;

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(adresse)}&output=embed`;

  return (
    <section className="w-full py-16 px-6 md:px-0 ">
      <div className="w-full flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
          Localisation
        </h2>
        <p className="text-lg text-white mb-8 drop-shadow-sm">{adresse}</p>
        <div className="w-full max-w-[1600px] px-6 md:px-0">
          <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <iframe
              title="Carte Google"
              src={mapUrl}
              style={{ border: "none", width: "100%", height: "100%" }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer({ site, API_URL }) {
  return (
    <footer className="relative z-10 bg-black text-white py-12 px-6 rounded-t-3xl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Colonne gauche : Logo + Copyright */}
        <div className="flex flex-col items-start">
          {site?.logo_footer?.url && (
            <Image
              src={site.logo_footer.url}
              alt="Logo footer"
              width={350}
              height={60}
              className="mb-6"
            />
          )}
          <p className="text-sm text-gray-400 mt-auto">
            &copy; 2025 Ufo Agency. Tous droits réservés.
          </p>
        </div>

        {/* Colonne droite : Réseaux sociaux */}
        <div className="flex flex-col items-end text-right">
          <h3 className="text-xl font-semibold mb-6">Suivez-nous</h3>
          <div className="space-y-3">
            {site?.reseaux_sociaux?.length > 0 ? (
              site.reseaux_sociaux.map((reseau, index) => (
                <a
                  key={index}
                  href={reseau.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-300 hover:text-white transition-colors text-lg"
                >
                  {reseau.nom} →
                </a>
              ))
            ) : (
              <p className="text-gray-400">Aucun réseau social configuré</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

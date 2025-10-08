"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer({ site }) {
  const logoUrl = site?.logo_footer?.url;
  const reseaux = site?.reseaux_sociaux ?? [];

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4">
      <LogoBlock logoUrl={logoUrl} />
      <SocialBlock reseaux={reseaux} />
    </div>
  );
}

function LogoBlock({ logoUrl }) {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      {logoUrl && (
        <Image
          src={logoUrl}
          alt="Logo footer"
          width={200}
          height={40}
          className="mb-4"
        />
      )}
      <p className="text-sm text-gray-400">
        &copy; 2025 Ufo Agency. Tous droits réservés.
      </p>
    </div>
  );
}

function SocialBlock({ reseaux }) {
  return (
    <div className="flex flex-col items-center md:items-end text-center md:text-right">
      <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
      <div className="space-y-2">
        {reseaux.length > 0 ? (
          reseaux.map((reseau, index) => (
            <a
              key={index}
              href={reseau.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors text-base"
            >
              {reseau.nom} →
            </a>
          ))
        ) : (
          <p className="text-gray-400">Aucun réseau social configuré</p>
        )}
      </div>
    </div>
  );
}

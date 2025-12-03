import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail, MapPin } from "lucide-react";

// Footer sans interactivité lourde -> Server Component acceptable
export default function Footer({ siteData }) {
  const parametres_site = siteData?.parametres_site;
  const eglise = siteData?.eglise;

  const logoUrl =
    parametres_site?.logo_footer?.url || parametres_site?.logo?.url;
  const reseaux = parametres_site?.reseaux_sociaux ?? [];
  const urlDon = parametres_site?.url_don || "/";
  const localisation = eglise?.localisation?.[0];

  return (
    <footer className="relative z-10 bg-gradient-to-b from-black to-[#1a1a1a] text-gray-100 px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <LogoBlock logoUrl={logoUrl} />
          <NavigationBlock urlDon={urlDon} />
          <ContactBlock reseaux={reseaux} localisation={localisation} />
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Association Patrimoine de
              Doazit. Tous droits réservés.
            </p>
            <p className="flex items-center gap-2">
              Développé avec ❤️ par{" "}
              <span className="text-white font-semibold">Ufo Agency</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LogoBlock({ logoUrl }) {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt="Logo Association Patrimoine de Doazit"
          width={200}
          height={80}
          className="object-contain"
        />
      ) : (
        <div className="text-2xl font-garamond font-bold text-white">
          Association Patrimoine de Doazit
        </div>
      )}
      <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
        Préserver et valoriser le patrimoine religieux et historique de notre
        territoire pour les générations futures.
      </p>
    </div>
  );
}

function NavigationBlock({ urlDon }) {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
      <h3 className="text-lg font-semibold text-white tracking-wide">
        Navigation
      </h3>
      <nav className="flex flex-col space-y-2">
        <Link
          href="/"
          className="text-gray-400 hover:text-white transition-colors"
        >
          Accueil
        </Link>
        <Link
          href="/association"
          className="text-gray-400 hover:text-white transition-colors"
        >
          L'association
        </Link>
        <Link
          href="/blog"
          className="text-gray-400 hover:text-white transition-colors"
        >
          Articles
        </Link>
        <Link
          href="/partners"
          className="text-gray-400 hover:text-white transition-colors"
        >
          Nos partenaires
        </Link>
        <a
          href={urlDon}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#ac1115] hover:text-[#8c0e12] font-semibold transition-colors"
        >
          Faire un don →
        </a>
      </nav>
    </div>
  );
}

function ContactBlock({ reseaux, localisation }) {
  const getSocialIcon = (nom) => {
    const nomLower = nom?.toLowerCase() || "";
    if (nomLower.includes("facebook")) return <Facebook size={20} />;
    if (nomLower.includes("instagram")) return <Instagram size={20} />;
    if (nomLower.includes("youtube")) return <Youtube size={20} />;
    return <Mail size={20} />;
  };

  return (
    <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-4">
      <h3 className="text-lg font-semibold text-white tracking-wide">
        Contact
      </h3>

      {localisation && (
        <div className="flex items-center gap-2 text-gray-400">
          <MapPin size={18} />
          <p className="text-sm">
            {localisation.ville}, {localisation.region}
          </p>
        </div>
      )}

      {reseaux && reseaux.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-gray-400">Suivez-nous</p>
          <div className="flex gap-4 justify-center md:justify-end">
            {reseaux.map((reseau, index) => (
              <a
                key={index}
                href={reseau.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#ac1115] flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label={reseau.nom}
              >
                {getSocialIcon(reseau.nom)}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

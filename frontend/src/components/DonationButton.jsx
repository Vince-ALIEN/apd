"use client";

import { useSiteData } from "@hooks/useSiteData";

export default function DonationButton({
  className = "",
  variant = "header", // "header" ou "intro"
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { parametres_site } = useSiteData(API_URL);

  // Valeurs par défaut si les données ne sont pas encore chargées
  const href = encodeURI(
    parametres_site?.url_don ??
      "https://www.helloasso.com/associations/les-compagnons-de-l-art-et-du-patrimoine-de-doazit/formulaires/1"
  );
  const label = parametres_site?.bouton_don?.label ?? "Soutenez-nous !";

  const baseClasses =
    " flex items-center justify-center rounded-sm bg-[#ac1115] text-white shadow-md hover:brightness-120 transition-all duration-300 w-fit ";

  return (
    <>
      {variant === "header" && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses}
            px-4 py-1.5 text-sm font-medium mr-4 md:mx-0
            md:px-6 md:py-2 md:text-base md:font-semibold
            ${className}`}
        >
          {label}
        </a>
      )}

      {variant === "intro" && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} text-l px-4 py-2.5 md:text-xl md:px-8 md:py-4 font-semibold ${className}`}
        >
          {label}
        </a>
      )}
    </>
  );
}

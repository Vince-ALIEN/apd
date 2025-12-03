// Server Component version: reçoit href & label en props (pas de hook)
export default function DonationButton({
  className = "",
  variant = "header",
  href = "https://www.helloasso.com/associations/les-compagnons-de-l-art-et-du-patrimoine-de-doazit/formulaires/1",
  label = "Soutenez-nous !",
}) {
  const baseClasses =
    " flex items-center justify-center rounded-sm bg-[#ac1115] text-white shadow-md hover:brightness-120 transition-all duration-300 w-fit ";

  if (variant === "intro") {
    return (
      <a
        href={encodeURI(href)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} text-l px-4 py-2.5 md:text-xl md:px-8 md:py-4 font-semibold ${className}`}
      >
        {label}
      </a>
    );
  }

  if (variant === "menu") {
    return (
      <a
        href={encodeURI(href)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} px-6 py-3 text-base font-semibold mx-auto ${className}`}
      >
        {label}
      </a>
    );
  }

  // header variant
  return (
    <a
      href={encodeURI(href)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} px-4 py-1.5 text-sm font-medium mr-4 md:mx-0 md:px-6 md:py-2 md:text-base md:font-semibold ${className}`}
    >
      {label}
    </a>
  );
}

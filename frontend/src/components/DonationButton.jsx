"use client";

export default function DonationButton({
  href,
  label = "Soutenez-nous",
  className = "",
}) {
  if (!href) return null;

  return (
    <>
      {/* 🟥 Texte par défaut (mobile + desktop sauf 768px) */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center px-6 py-2 rounded-full bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition-all duration-300 animate-pulse-cta w-fit not-768 ${className}`}
      >
        {label}
      </a>

      {/* ❤️ Icône cœur uniquement à 768px */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`hidden items-center justify-center text-red-600 hover:text-red-700 transition p-2 rounded-full only-768 ${className}`}
        aria-label="Faire un don"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-5 h-5"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </a>
    </>
  );
}

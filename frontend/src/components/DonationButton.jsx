"use client";

export default function DonationButton({
  href,
  label = "Soutenez-nous",
  className = "",
}) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`px-6 py-2 rounded-full bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition-all duration-300 animate-pulse-cta w-fit ${className}`}
    >
      {label}
    </a>
  );
}

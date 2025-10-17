"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import DonationButton from "@components/DonationButton";

export default function FloatingHeader({ site, onContactClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const logoUrl =
    site?.logo?.url ??
    site?.logo?.data?.attributes?.url ??
    "/fallback-logo.png";

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Notre action", href: "/action" },
    { label: "Devenez partenaire", href: "/partners" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", action: onContactClick },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <>
      {/* 🧭 Header desktop */}
      <header className="fixed top-3 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md shadow-xl rounded-full px-4 sm:px-6 lg:px-8 py-1 flex items-center justify-between w-full max-w-screen-lg mx-4 overflow-hidden min-h-[64px] hidden md:flex">
          <Image
            src={logoUrl}
            alt="Logo"
            width={100}
            height={40}
            className="rounded-md flex-shrink-0 p-1"
            priority
          />
          <nav className="flex items-center gap-4 sm:gap-6 lg:gap-8 text-gray-800 font-medium flex-wrap justify-end w-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  className={`transition hover:text-red-600 ${
                    isActive ? "text-red-600 font-semibold" : ""
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="transition hover:text-red-600 text-gray-800 font-medium"
                >
                  {link.label}
                </button>
              );
            })}
            <DonationButton href={site?.url_don} className="ml-2" />
          </nav>
        </div>
      </header>

      {/* 🧭 Floating header mobile */}
      <header className="fixed top-3 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 bg-white/90 backdrop-blur-md shadow-md rounded-full md:hidden">
        <Image
          src={logoUrl}
          alt="Logo"
          width={80}
          height={32}
          className="rounded-md flex-shrink-0"
          priority
        />
        <div className="flex items-center gap-3">
          <a
            href={site?.url_don}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-red-600 hover:text-red-700 transition"
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
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-full bg-white shadow-md text-black"
            aria-label="Menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* 🕶️ Overlay menu mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[59] bg-black/50"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* 📱 Menu mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-full z-[60] transform transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="absolute inset-0 bg-white/95 backdrop-blur-md shadow-xl rounded-l-3xl px-8 py-12 flex flex-col items-center gap-6 text-gray-800 font-semibold">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md"
            aria-label="Fermer"
          >
            <XMarkIcon className="h-6 w-6 text-black" />
          </button>

          <Image
            src={logoUrl}
            alt="Logo"
            width={100}
            height={50}
            className="rounded-md mb-6"
            priority
          />

          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return link.href ? (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-lg transition hover:text-red-600 ${
                  isActive ? "text-red-600 font-semibold" : ""
                }`}
              >
                {link.label}
              </a>
            ) : (
              <button
                key={link.label}
                onClick={() => {
                  setMenuOpen(false);
                  link.action?.();
                }}
                className="text-lg transition hover:text-red-600 text-gray-800 font-medium"
              >
                {link.label}
              </button>
            );
          })}

          <DonationButton href={site?.url_don} className="mt-6" />
        </div>
      </div>
    </>
  );
}

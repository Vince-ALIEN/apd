"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import DonationButton from "@components/DonationButton";

export default function FloatingHeader({ site }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const logoUrl =
    site?.logo?.url ??
    site?.logo?.data?.attributes?.url ??
    "/fallback-logo.png";

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Notre action", href: "/action" },
    { label: "Devenez partenaire", href: "/partenaire" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <>
      {/* 🧭 Header flottant desktop */}
      <header className="fixed top-3 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md shadow-xl rounded-full px-8 py-2 flex items-center gap-6 max-w-fit mx-6 hidden md:flex">
          <Image
            src={logoUrl}
            alt="Logo"
            width={120}
            height={60}
            className="rounded-md flex-shrink-0 mr-40 p-1"
            priority
          />
          <nav className="flex items-center gap-12 text-gray-800 font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`transition hover:text-red-600 ${
                    isActive ? "text-red-600 font-semibold" : ""
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <DonationButton href={site?.url_don} className="ml-4" />
          </nav>
        </div>
      </header>

      {/* 🍔 Burger button mobile */}
      <button
        onClick={() => setMenuOpen(true)}
        className="md:hidden fixed top-3 right-4 z-[60] p-3 rounded-full bg-white/90 backdrop-blur-md shadow-md text-black"
        aria-label="Menu"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

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
            return (
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
            );
          })}

          <DonationButton href={site?.url_don} className="mt-6" />
        </div>
      </div>
    </>
  );
}

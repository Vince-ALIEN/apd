"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import DonationButton from "../components/DonationButton";
import gsap from "gsap";

export default function Header({ site, scrollToSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const logoUrl =
    site?.logo?.url ??
    site?.logo?.data?.attributes?.url ??
    "/fallback-logo.png";

  const backgroundUrl =
    site?.background?.url ?? site?.background?.data?.attributes?.url ?? null;

  const navLinks = [
    { label: "Accueil", id: "accueil" },
    { label: "L'église", id: "eglise" },
    { label: "Vos dons", id: "interview" },
    { label: "Blog", id: "blog" },
    { label: "Partenaires", id: "partenaires" },
    { label: "Contact", id: "contact" },
  ];

  const handleNavigation = (label) => {
    const isOnHome = window.location.pathname === "/";
    if (isOnHome) {
      scrollToSection(label);
    } else {
      sessionStorage.setItem("scrollFromNavigation", "true");
      router.push(`/#${label}`);
    }
    setMenuOpen(false);
  };

  // ✨ Animation d’entrée du menu avec mouvement vertical amplifié
  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        ".menu-first-letter, .donation-button",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.12,
          delay: 0.2,
        }
      );
    }
  }, [menuOpen]);

  return (
    <>
      {/* Barre transparente */}
      <header className="fixed top-15 left-15 right-15 z-50 px-4 md:px-6 flex items-center justify-between h-[60px] bg-transparent">
        {/* Logo à gauche */}
        <Image
          src={logoUrl}
          alt="Logo"
          width={140}
          height={80}
          style={{ height: "auto" }}
          priority
          className="rounded-md header-logo"
        />

        {/* Burger à droite */}
        <button
          className="p-3 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-300 text-black"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Menu"
        >
          {menuOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>
      </header>

      {/* Overlay sombre sur tout le fond */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-500"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Volet latéral responsive */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-1/2 z-[60] transform transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Image de fond */}
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: backgroundUrl
              ? `url(${backgroundUrl})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Voile blanc semi-transparent */}
        <div className="absolute inset-0 bg-white/40 z-10 pointer-events-none" />

        {/* Contenu du menu */}
        <nav className="relative z-20 flex flex-col items-start justify-center h-full px-8 md:px-20 gap-6 text-black font-bold text-left">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavigation(link.id)}
              className="menu-first-letter text-2xl md:text-3xl px-2 py-1 hover:bg-white/30 transition w-full text-left"
            >
              {link.label}
            </button>
          ))}
          <DonationButton
            href={site?.url_don}
            className="mt-4 donation-button"
          />
        </nav>
      </div>
    </>
  );
}

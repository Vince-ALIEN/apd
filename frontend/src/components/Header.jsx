"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ App Router compatible
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import DonationButton from "../components/DonationButton";
import gsap from "gsap";

export default function Header({
  site,
  scrollToSection,
  hideLogo,
  hideBurger,
  onContactClick,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const logoUrl =
    site?.logo?.url ??
    site?.logo?.data?.attributes?.url ??
    "/fallback-logo.png";

  const navLinks = [
    { label: "Accueil", id: "accueil" },
    { label: "L'église", id: "eglise" },
    { label: "Vos dons", id: "interview" },
    { label: "Blog", id: "blog" },
    { label: "Partenaires", id: "partenaires" },
    { label: "Contact", id: "contact" },
  ];

  const handleNavigation = (label) => {
    if (label === "blog") {
      router.push("/blog"); // ✅ redirection vers la page blog
    } else {
      const isOnHome = window.location.pathname === "/";
      if (isOnHome) {
        scrollToSection?.(label);
      } else {
        sessionStorage.setItem("scrollFromNavigation", "true");
        router.push(`/#${label}`);
      }
    }
    setMenuOpen(false);
  };

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

  useEffect(() => {
    if (!hideLogo) {
      gsap.fromTo(
        ".header-logo",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }
  }, [hideLogo]);

  useEffect(() => {
    if (!hideBurger) {
      gsap.fromTo(
        ".burger-button",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }
  }, [hideBurger]);

  return (
    <>
      {/* Barre transparente */}
      <header className="fixed top-8 md:top-12 left-4 right-4 md:left-16 md:right-16 z-50 px-4 md:px-6 flex items-center justify-between h-[60px] bg-transparent">
        {/* Logo à gauche */}
        <div
          className={`transition-all duration-500 ${
            hideLogo
              ? "opacity-0 scale-90 pointer-events-none"
              : "opacity-100 scale-100"
          }`}
        >
          <Image
            src={logoUrl}
            alt="Logo"
            width={140}
            height={80}
            priority
            className="rounded-md header-logo"
          />
        </div>
      </header>

      {/* Bouton burger */}
      {!hideBurger && (
        <button
          className="burger-button fixed top-8 right-4 md:top-12 md:right-16 z-[70] p-3 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-300 text-black"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Menu"
        >
          {menuOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>
      )}

      {/* Overlay sombre */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-500"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Volet latéral */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-1/2 z-[60] transform transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="absolute bg-red-600 inset-0 w-full h-full z-0" />
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

        <nav className="relative z-20 flex flex-col items-center md:items-start justify-center h-full px-8 md:px-20 gap-6 text-white font-bold text-center md:text-left">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                if (link.id === "contact") {
                  onContactClick?.();
                } else {
                  handleNavigation(link.id);
                }
                setMenuOpen(false);
              }}
              className="menu-first-letter text-2xl md:text-3xl px-2 py-1 hover:bg-white/30 transition w-full md:w-auto"
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

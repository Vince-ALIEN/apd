"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import DonationButton from "@components/DonationButton";
import ContactModal from "@components/ContactModal";
import "hamburgers/dist/hamburgers.min.css";

export default function Header({ siteData }) {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(isHomePage);
  const contactModalRef = useRef(null);

  const parametres_site = siteData?.parametres_site;
  const site = parametres_site ?? {
    bouton_don: { url: "/don", label: "Faire un don" },
    logo: { url: "/logo.png" },
    url_don: "/don",
    reseaux_sociaux: [],
  };

  const logoUrl =
    site?.logo?.url ?? site?.logo?.data?.attributes?.url ?? "/logo.png";

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "L'association", href: "/association" },
    { label: "Devenez partenaire", href: "/partners" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", action: () => contactModalRef.current?.open() },
  ];

  // Gestion du scroll pour masquer/afficher le header sur la page d'accueil
  useEffect(() => {
    if (!isHomePage) {
      setHideHeader(false);
      return;
    }
    const handleScroll = () => {
      setHideHeader(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Gestion du scroll du body pour le menu mobile
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <>
      <ContactModal ref={contactModalRef} triggerButton={false} />

      {/* Desktop Header */}
      <header
        className={`fixed top-3 left-0 right-0 z-50 flex justify-center transition-opacity duration-500 hidden md:flex ${
          !hideHeader
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white/60 backdrop-blur-md shadow-xl rounded-sm pl-2 sm:px-4 lg:px-5 py-0 flex items-center justify-between w-full max-w-screen-lg mx-4 min-h-[40px]">
          <a href="/" className="flex-shrink-2 p-1 rounded-md">
            <Image
              src={logoUrl}
              alt="Logo"
              width={100}
              height={120}
              style={{ width: "auto", height: "auto" }}
              className="rounded-md"
              priority
            />
          </a>

          <nav className="flex items-center gap-3 sm:gap-4 lg:gap-6 text-black flex-nowrap justify-end w-full text-xs md:text-sm lg:text-base">
            {navLinks.map((link) =>
              link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  className={`transition hover:text-red-700 ${
                    pathname === link.href ? "text-[#ac1115] font-semibold" : ""
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="transition hover:text-red-700 text-black cursor-pointer"
                >
                  {link.label}
                </button>
              )
            )}
            <DonationButton className="ml-2 px-3 py-1 text-xs md:px-4 md:py-1.5 md:text-sm" />
          </nav>
        </div>
      </header>

      {/* Mobile Header */}
      <header
        className={`fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-2 py-2 bg-white/60 backdrop-blur-md shadow-md rounded-sm md:hidden transition-opacity duration-500 ${
          !hideHeader
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <a href="/" className="flex-shrink-0 rounded-md">
          <Image
            src={logoUrl}
            alt="Logo"
            width={60}
            height={24}
            className="rounded-md"
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </a>
        <div className="flex items-center gap-4">
          <DonationButton variant="header" />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md transition duration-300 focus:outline-none"
            aria-label="Menu"
          >
            <span
              className={`hamburger hamburger--collapse ${
                menuOpen ? "is-active" : ""
              }`}
              style={{
                position: "absolute",
                top: "55%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(0.45)",
              }}
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen z-40 flex items-center justify-center transform transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="w-full h-full bg-[#ac1115] backdrop-blur-md shadow-xl px-8 py-12 flex flex-col items-center justify-center gap-6 text-white">
          {navLinks.map((link) =>
            link.href ? (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-lg transition ${
                  pathname.startsWith(link.href) ? "text-white " : ""
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
                className="text-lg transition text-white "
              >
                {link.label}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
}

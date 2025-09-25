"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header({ site, API_URL, visible = true }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      role="banner"
      aria-hidden={!visible}
      className={`fixed top-0 left-0 right-0 w-full h-[100px] bg-white/40 backdrop-blur-sm shadow-md z-50 transition-all duration-500 ease-in-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-10 pointer-events-none"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-full">
        {/* Logo */}
        <div className="flex items-center gap-4">
          {site?.logo?.url && (
            <Image
              src={site.logo.url}
              alt="Logo"
              width={120}
              height={80}
              priority
            />
          )}
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex bg-black text-white rounded-full px-6 py-2 gap-10 items-center shadow-lg">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Accueil
          </Link>
          <Link
            href="/#description"
            className="hover:text-gray-300 transition-colors"
          >
            Notre église
          </Link>
          <Link href="/blog" className="hover:text-gray-300 transition-colors">
            Actualités
          </Link>
          <Link
            href="/#partenaires"
            className="hover:text-gray-300 transition-colors"
          >
            Partenaires
          </Link>

          <Link
            href="/#contact"
            className="hover:text-gray-300 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="https://www.helloasso.com/associations/les-compagnons-de-l-art-et-du-patrimoine-de-doazit/formulaires/1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-400 text-black font-bold px-4 py-2 rounded-full shadow-lg hover:bg-red-500 transition-all duration-300"
          >
            Soutenez-nous !
          </Link>
        </nav>

        {/* Mobile burger icon */}
        <button
          className="md:hidden text-black bg-white/70 p-2 rounded-full shadow"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Menu"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-[100px] left-0 right-0 bg-white/90 backdrop-blur-sm shadow-md z-40 md:hidden">
          <nav className="flex flex-col items-center py-4 gap-4 text-black font-semibold">
            <a href="#accueil" onClick={() => setMenuOpen(false)}>
              Accueil
            </a>
            <a href="#description" onClick={() => setMenuOpen(false)}>
              Notre église
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
            <Link href="/blog" onClick={() => setMenuOpen(false)}>
              Blog
            </Link>
            <Link
              href="/don"
              onClick={() => setMenuOpen(false)}
              className="bg-red-400 text-black font-bold px-4 py-2 rounded-full shadow hover:bg-red-500 transition"
            >
              Soutenez-nous !
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

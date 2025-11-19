"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import ContactModal from "./ContactModal";
import { useSiteData } from "@hooks/useSiteData";
import { useHeaderDonation } from "@contexts/HeaderDonationContext";

export default function HeaderWrapper({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { parametres_site } = useSiteData(API_URL);

  const [hideHeader, setHideHeader] = useState(isHomePage);
  const [showContactModal, setShowContactModal] = useState(false);
  const { showDonationButton, setShowDonationButton } = useHeaderDonation();

  useEffect(() => {
    if (!isHomePage) {
      setHideHeader(false);
      setShowDonationButton(true);
      return;
    }

    const handleScroll = () => {
      const shouldHide = window.scrollY < 100;
      setHideHeader(shouldHide);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, setShowDonationButton]);

  const fallbackSite = parametres_site ?? {
    bouton_don: { url: "/don", label: "Faire un don" },
    logo: { url: "/logo.png" },
    url_don: "/don",
  };

  return (
    <>
      {/* 🧭 Header */}
      <Header
        site={fallbackSite}
        isVisible={!hideHeader}
        showDonationButton={showDonationButton}
        onContactClick={() => setShowContactModal(true)}
      />

      {/* 📩 Modale contact */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />

      {/* 🧩 Contenu de la page */}
      {children}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSiteData } from "@hooks/useSiteData";

import VideoBackground from "@components/VideoBackground";
import HomeSection from "@components/HomeSection";
import IntroOverlay from "@components/IntroOverlay";
import FloatingHeader from "@components/FloatingHeader";
import DescriptionSection from "@components/DescriptionSection";
import InterviewSection from "@components/InterviewSection";
import DonationButton from "@components/DonationButton";
import PartnerSection from "@components/PartnerSection";
import ContactModal from "@components/ContactModal";
import Footer from "@components/Footer";
import BlogSection from "@components/BlogSection";
import AddressSection from "@components/AddressSection";
import GallerySection from "@components/GallerySection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { eglise, accueil, interviews, parametres_site, partenaires } =
    useSiteData(API_URL);

  const videoUrl = accueil?.video?.url ?? null;
  const interviewBlock = interviews?.[0];

  const [showHomeSection, setShowHomeSection] = useState(true);
  const [startIntro, setStartIntro] = useState(false);
  const [showIntroExit, setShowIntroExit] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    if (!startIntro) return;

    const handleScroll = () => {
      setShowIntroExit(true);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleScroll);
    };

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchstart", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleScroll);
    };
  }, [startIntro]);

  useEffect(() => {
    if (showContent) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [showContent]);

  return (
    <main className="relative overflow-x-hidden">
      {videoUrl && <VideoBackground videoUrl={videoUrl} />}

      {showHeader && <FloatingHeader site={parametres_site} />}

      {showHomeSection && (
        <HomeSection
          videoUrl={videoUrl}
          onSkip={() => {
            setStartIntro(true);
            setShowHomeSection(false);
          }}
        />
      )}

      {startIntro && !showContent && (
        <IntroOverlay
          urlDon={parametres_site?.url_don}
          videoUrl={videoUrl}
          start={startIntro}
          exit={showIntroExit}
          onHeaderReady={() => setShowHeader(true)}
          onComplete={() => {
            setShowContent(true);
            setStartIntro(false);
          }}
        />
      )}

      {showContent && (
        <>
          {eglise && (
            <>
              <DescriptionSection eglise={eglise} />
              <GallerySection eglise={eglise} />
              <AddressSection eglise={eglise} />
            </>
          )}

          {interviewBlock && <InterviewSection block={interviewBlock} />}
          {partenaires?.length > 0 && <PartnerSection partners={partenaires} />}

          <div className="flex-grow">
            <BlogSection API_URL={API_URL} limit={4} />
          </div>

          <Footer site={parametres_site} />
        </>
      )}

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </main>
  );
}

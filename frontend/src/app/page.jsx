"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "@components/Header";
import VideoBackground from "@components/VideoBackground";
import HomeSection from "@components/HomeSection";
import IntroOverlay from "@components/IntroOverlay";
import DescriptionSection from "@components/DescriptionSection";
import InterviewSection from "@components/InterviewSection";
import DonationButton from "@components/DonationButton";
import { useSiteData } from "@hooks/useSiteData";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { eglise, accueil, interviews, parametres_site } = useSiteData(API_URL);

  const videoUrl = accueil?.video?.url ?? null;
  const interviewBlock = interviews?.[0];

  const [startIntro, setStartIntro] = useState(false);
  const [showIntroExit, setShowIntroExit] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

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
      }, 50);
    }
  }, [showContent]);

  return (
    <div className="relative overflow-x-hidden">
      {videoUrl && <VideoBackground videoUrl={videoUrl} />}

      <Header
        site={parametres_site}
        scrollToSection={() => {}}
        hideLogo={!showHeader || showIntroExit}
        hideBurger={!showHeader}
      />

      {!startIntro && (
        <HomeSection videoUrl={videoUrl} onSkip={() => setStartIntro(true)} />
      )}

      {startIntro && !showContent && (
        <IntroOverlay
          urlDon={parametres_site?.url_don}
          start={startIntro}
          exit={showIntroExit}
          onHeaderReady={() => setShowHeader(true)}
          onComplete={() => setShowContent(true)}
        />
      )}

      {showContent && (
        <>
          {eglise && <DescriptionSection eglise={eglise} />}

          {interviewBlock && <InterviewSection block={interviewBlock} />}
          {parametres_site?.url_don && (
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50  pointer-events-auto">
              <DonationButton href={parametres_site.url_don} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

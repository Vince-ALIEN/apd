"use client";
import { useRef, useState, useEffect } from "react";
import AccueilSection from "@components/AccueilSection";
import DescriptionSection from "@components/DescriptionSection";
import LocalisationSection from "@components/LocalisationSection";
import InterviewSection from "@components/InterviewSection";
import PartenairesSection from "@components/PartenairesSection";
import BlogSection from "@components/BlogSection";
import ContactSection from "@components/ContactSection";
import Footer from "@components/Footer";
import { useSceneTimeline } from "@animations/useSceneTimeline.js";

export default function SceneBlocks({ eglise, API_URL, site, videoUrl }) {
  const [timelineReady, setTimelineReady] = useState(false);
  const accueilRef = useRef(null);

  const sceneClasses = [
    "description-block",
    "localisation-block",
    "interview-block",
    "blog-block",
    "partenaires-block",
    "contact-block",
  ];

  useEffect(() => {
    if (!timelineReady) return;

    const { addScene } = useSceneTimeline({
      sceneClasses,
      onSceneStart: (label) => {
        if (label === "interview") {
          const video = document.querySelector(".interview-block video");
          if (video) {
            video.muted = true;
            video.play();
          }
        }
      },
    });

    addScene(
      "eglise",
      ".description-block",
      { opacity: 0, x: "-100vw" },
      { opacity: 1, x: "0vw", duration: 5 },
      { opacity: 0, x: "100vw", duration: 10 }
    );

    addScene(
      "localisation",
      ".localisation-block",
      { opacity: 0, x: "100vw" },
      { opacity: 1, x: "0vw", duration: 5 },
      { opacity: 0, x: "-100vw", duration: 10 }
    );

    addScene(
      "interview",
      ".interview-block",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 5 },
      { opacity: 0, x: "100vw", duration: 5 }
    );

    addScene(
      "blog",
      ".blog-block",
      { opacity: 0, y: "100vh" },
      { opacity: 1, y: "0vh", duration: 10 },
      { opacity: 0, y: "-100vh", duration: 10 }
    );

    addScene(
      "partenaires",
      ".partenaires-block",
      { opacity: 0, x: "100vw" },
      { opacity: 1, x: "0vw", duration: 10 },
      { opacity: 0, x: "-100vw", duration: 10 }
    );

    addScene(
      "contact",
      ".contact-block",
      { opacity: 0, y: "100vh" },
      { opacity: 1, y: "0vh", duration: 10 },
      { opacity: 1, scale: 1, duration: 10 }
    );
  }, [timelineReady]);

  return (
    <>
      {/* 🎬 Accueil autonome */}
      {!timelineReady && videoUrl && (
        <div className="accueil-block fixed inset-0 z-50">
          <AccueilSection
            videoUrl={videoUrl}
            onSkip={() => setTimelineReady(true)}
            ref={accueilRef}
          />
        </div>
      )}

      {/* 🕍 Église */}
      <div className="description-block scene-block absolute inset-0 flex items-center justify-center z-10">
        <div className="w-full h-screen bg-black/60 backdrop-blur-md pointer-events-auto">
          <DescriptionSection eglise={eglise} API_URL={API_URL} />
        </div>
      </div>

      {/* 📍 Localisation */}
      <div className="localisation-block scene-block absolute inset-0 flex items-center justify-center z-10">
        <div className="w-full h-screen backdrop-blur-md p-8 overflow-y-auto pointer-events-auto flex items-center justify-center">
          <LocalisationSection eglise={eglise} />
        </div>
      </div>

      {/* 🎤 Interview */}
      <div className="interview-block scene-block absolute inset-0 flex items-center justify-center z-10">
        <div className="w-full h-screen backdrop-blur-md p-8 overflow-y-auto pointer-events-auto flex items-center justify-center">
          <InterviewSection videoUrl="https://appetizing-balance-03c58ad391.media.strapiapp.com/Interview_498b4a158a.mp4" />
        </div>
      </div>

      {/* 📝 Blog */}
      <div className="blog-block scene-block absolute inset-0 flex items-center justify-center z-10">
        <div className="w-full h-screen backdrop-blur-md p-8 overflow-y-auto pointer-events-auto">
          <BlogSection API_URL={API_URL} />
        </div>
      </div>

      {/* 🤝 Partenaires */}
      <div className="partenaires-block scene-block absolute inset-0 flex items-center justify-center z-10">
        <div className="w-full h-screen backdrop-blur-md p-8 overflow-y-auto pointer-events-auto flex items-center justify-center">
          <PartenairesSection API_URL={API_URL} />
        </div>
      </div>

      {/* 📬 Contact */}
      <div className="contact-block scene-block absolute inset-0 flex flex-col justify-between z-10">
        <div className="flex-grow flex items-center justify-center pt-[100px] px-6">
          <ContactSection site={site} />
        </div>
        <footer className="w-full bg-black text-white py-6 px-6 border-t border-white/10">
          <Footer site={site} />
        </footer>
      </div>
    </>
  );
}

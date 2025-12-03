"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Gallery from "@components/Gallery";
import Interview from "@components/Interview";
import Architecture from "@components/Architecture";
import ErrorMessage from "@components/ErrorMessage";
import useIsMobile from "@hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

export default function DescriptionSection({
  eglise,
  interviewBlock,
  onEnter,
  onLeave,
  isLoading,
  error,
}) {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const descriptionRef = useRef(null);
  const galleryRef = useRef(null);
  const architectureRef = useRef(null);
  const interviewRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRevealRef = useRef(null);

  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <ErrorMessage
        type="loading"
        message="Chargement de la section en cours..."
      />
    );
  }

  if (error) {
    return <ErrorMessage type="error" message={`Erreur : ${error}`} />;
  }

  const nom = eglise?.nom?.trim() || "";
  const mots = nom.split(" ");
  const premier = mots[0];
  const reste = mots.slice(1, -1).join(" ");
  const dernier = mots.slice(-1)[0];

  const getImageUrl = (img) =>
    img?.formats?.large?.url ?? img?.formats?.medium?.url ?? img?.url;

  const titreInterview = interviewBlock?.titre;
  const descriptionInterview = interviewBlock?.description ?? [];
  const videoUrl = interviewBlock?.video?.url;

  const hasInterviewContent =
    titreInterview || descriptionInterview || videoUrl;

  if (!eglise && !hasInterviewContent) return null;

  // Animation du slider horizontal
  useLayoutEffect(() => {
    if (!sectionRef.current || isMobile) return;

    const ctx = gsap.context(() => {
      // Slides dynamiques : description, galerie, architecture, interview (si présent)
      const slides = [
        descriptionRef.current,
        galleryRef.current,
        architectureRef.current,
      ];
      if (hasInterviewContent) slides.push(interviewRef.current);

      const slideCount = slides.length;

      gsap.set(sliderRef.current, {
        width: `${slideCount * 100}vw`,
        display: "flex",
      });

      gsap.set(slides, {
        width: "100vw",
        flexShrink: 0,
        minHeight: "100vh",
      });

      // Scroll horizontal : ignorer la largeur du premier slide pour centrer le dernier
      const scrollDistance = (slideCount - 1) * window.innerWidth;
      gsap.to(sliderRef.current, {
        x: () => `-${scrollDistance}px`,
        ease: "power3.InOut",
        scrollTrigger: {
          id: "sliderScroll",
          trigger: sectionRef.current,
          start: "top",
          end: () => `+=${scrollDistance}`,
          scrub: 0.5,
          pin: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, hasInterviewContent, onEnter, onLeave]);

  // Animation mobile : fade-in du conteneur
  useLayoutEffect(() => {
    if (!isMobile || !imageContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(imageContainerRef.current, { opacity: 0, y: 50 });
      gsap.to(imageContainerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 80%",
          end: "bottom center",
          scrub: true,
        },
      });
    }, imageContainerRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Animation mobile : dévoilement du voile + flou
  useLayoutEffect(() => {
    if (!isMobile || !imageRevealRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(imageRevealRef.current, {
        opacity: 0,
        backdropFilter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRevealRef.current,
          start: "top 90%",
          end: "bottom center",
          toggleActions: "play none none reverse",
          scrub: true,
        },
      });
    }, imageRevealRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="description-anchor"
      className="relative w-full min-h-screen overflow-hidden bg-pierre z-10"
    >
      <div
        ref={sliderRef}
        className={`w-screen ${isMobile ? "flex flex-col" : "h-full flex"}`}
      >
        {/* Bloc description */}
        <div
          ref={descriptionRef}
          className="relative w-screen min-h-screen px-6 pt-12 flex items-center justify-center"
        >
          <div className="max-w-4xl w-full flex flex-col md:flex-row gap-10 items-center text-black">
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-3xl md:text-4xl font-garamond leading-snug break-words">
                {premier}
                <br />
                {reste}{" "}
                <span className="text-white shadow-underline">{dernier}</span>
              </h2>
              {Array.isArray(eglise?.description) && (
                <div className="text-sm md:text-base lettrine space-y-2 leading-relaxed text-justify">
                  {eglise.description.map((para, index) => {
                    const text = para?.children?.[0]?.text?.trim();
                    return text ? (
                      <p key={index} className={index === 0 ? "lettrine" : ""}>
                        {text}
                      </p>
                    ) : null;
                  })}
                </div>
              )}
            </div>

            {eglise?.image_principale && (
              <div
                ref={imageContainerRef}
                className="md:w-1/2 w-full relative flex justify-center items-center"
              >
                <div className="relative w-[17em] md:w-[20em] h-[25em] md:h-[32em] aspect-[9/16] rounded-t-full overflow-hidden shadow-xl border-white gallery-item mobile z-10 group">
                  {/* Voile + flou */}
                  <div
                    ref={imageRevealRef}
                    className="absolute inset-0 z-20 pointer-events-none transition-all duration-500 backdrop-blur-sm bg-black/60 group-hover:opacity-0 group-hover:backdrop-blur-0"
                  />

                  {/* Image */}
                  <Image
                    src={getImageUrl(eglise.image_principale)}
                    alt="Image principale"
                    fill
                    className="object-cover object-[45%_top] transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Cadre décoratif */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div className="relative w-full h-full">
                    <Image
                      src="/cadre_description.png"
                      alt="Cadre décoratif"
                      fill
                      className="object-contain w-full h-full scale-x-[1.3] md:scale-x-[1.3]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Galerie */}
        <div ref={galleryRef} className="relative w-screen min-h-screen">
          <Gallery images={eglise?.images ?? []} />
        </div>

        {/* Architecture */}
        <div
          ref={architectureRef}
          className="relative w-screen min-h-screen px-6"
        >
          <Architecture
            styleArchitectural={eglise?.style_architectural}
            plan={eglise?.plan}
          />
        </div>

        {/* Interview */}
        {hasInterviewContent && (
          <div ref={interviewRef} className="relative w-screen min-h-screen">
            <div className="max-w-4xl w-full">
              <Interview
                titre={titreInterview}
                description={descriptionInterview}
                videoUrl={videoUrl}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

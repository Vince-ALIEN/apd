"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DescriptionSection({ eglise }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const galleryRef = useRef(null);
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);
  const scrollBtnWrapperRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(
    eglise?.images?.[0] ?? null
  );

  const scrollText = (direction) => {
    const el = contentRef.current;
    if (!el) return;
    el.scrollBy({
      top: direction === "up" ? -100 : 100,
      behavior: "smooth",
    });
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const gallery = galleryRef.current;
    const leftBtn = leftBtnRef.current;
    const rightBtn = rightBtnRef.current;
    const scrollBtnWrapper = scrollBtnWrapperRef.current;

    if (
      !section ||
      !content ||
      !image ||
      !gallery ||
      !leftBtn ||
      !rightBtn ||
      !scrollBtnWrapper
    )
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "100% top",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.fromTo(
      [content, scrollBtnWrapper],
      { x: 100, opacity: 1 },
      { x: 0, opacity: 1, duration: 2 }
    );

    tl.fromTo(
      [image, gallery, rightBtn, leftBtn],
      { x: -100, opacity: 1 },
      { x: 0, opacity: 1, duration: 2 },
      "-=0.2"
    );

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  const getImageUrl = (img) =>
    img?.formats?.large?.url ?? img?.formats?.medium?.url ?? img?.url;

  const galleryImages = eglise?.images ?? [];

  const scrollGallery = (direction) => {
    const container = galleryRef.current;
    if (!container) return;
    container.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section ref={sectionRef} className="relative h-[120vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center px-6 md:px-32">
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Texte à gauche */}
          <div className="md:w-1/2 relative flex flex-col items-center">
            <div
              ref={contentRef}
              className="bg-black/60 backdrop-blur-md text-white rounded-xl p-6 md:p-8 shadow-xl space-y-6 max-h-[600px] overflow-y-auto w-full"
            >
              {eglise?.nom && (
                <h2 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg">
                  {eglise.nom}
                </h2>
              )}
              {eglise?.description?.length > 0 && (
                <div className="text-base md:text-lg font-medium space-y-4 drop-shadow-sm">
                  {eglise.description.map((para, index) => (
                    <p key={index}>{para.children?.[0]?.text}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Boutons de scroll animés en dessous */}
            <div
              ref={scrollBtnWrapperRef}
              className="flex gap-4 mt-4 opacity-0"
            >
              <button
                onClick={() => scrollText("up")}
                className="p-2 bg-white/80 hover:bg-white rounded-full shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-black"
                >
                  <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                </svg>
              </button>
              <button
                onClick={() => scrollText("down")}
                className="p-2 bg-white/80 hover:bg-white rounded-full shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-black"
                >
                  <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Image principale + galerie */}
          <div className="md:w-1/3 w-full flex flex-col items-center gap-6">
            {selectedImage && (
              <div
                ref={imageRef}
                className="w-full h-[200px] md:h-[360px] rounded-lg overflow-hidden shadow-xl relative bg-black"
              >
                <Image
                  src={getImageUrl(selectedImage)}
                  alt={selectedImage.name || "Image principale"}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {galleryImages.length > 1 && (
              <div className="w-full flex items-center gap-2">
                <button
                  ref={leftBtnRef}
                  onClick={() => scrollGallery("left")}
                  className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-black"
                  >
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                  </svg>
                </button>

                <div
                  ref={galleryRef}
                  className="overflow-x-auto whitespace-nowrap no-scrollbar scroll-touch w-full"
                >
                  <div className="inline-flex gap-4 px-2 py-2">
                    {galleryImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        className="w-[80px] h-[60px] md:w-[120px] md:h-[100px] rounded-md overflow-hidden shadow-md flex-shrink-0 relative focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <Image
                          src={getImageUrl(img)}
                          alt={img.name || `Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  ref={rightBtnRef}
                  onClick={() => scrollGallery("right")}
                  className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-black"
                  >
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsMobile from "@hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery({ images }) {
  const galleryRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const isMobile = useIsMobile();

  const getImageUrl = (img) =>
    img?.formats?.large?.url ?? img?.formats?.medium?.url ?? img?.url;

  useLayoutEffect(() => {
    if (!galleryRef.current || !images || images.length === 0) return;

    const ctx = gsap.context(() => {
      const desktopItems = galleryRef.current.querySelectorAll(
        ".gallery-item.desktop"
      );
      const tabletItems = galleryRef.current.querySelectorAll(
        ".gallery-item.tablet"
      );
      const mobileItems = galleryRef.current.querySelectorAll(
        ".gallery-item.mobile"
      );

      if (desktopItems.length > 0) {
        gsap.set(desktopItems, { opacity: 0, y: 400 });
        gsap.to(desktopItems, {
          opacity: 1,
          y: 0,
          stagger: 0.6,
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "+=15%",
            end: "+=30%",
            scrub: true,
            markers: false,
          },
        });
      }

      if (tabletItems.length > 0) {
        gsap.set(tabletItems, { opacity: 0, y: 100 });
        gsap.to(tabletItems, {
          opacity: 1,
          y: 0,
          stagger: 0.4,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top center",
            end: "+=40%",
            toggleActions: "play none none reverse",
            scrub: false,
            markers: false,
          },
        });
      }

      if (mobileItems.length > 0) {
        gsap.set(mobileItems, { opacity: 0, y: 50 });
        gsap.to(mobileItems, {
          opacity: 1,
          y: 0,
          stagger: 0.6,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top center",
            end: "+=40%",
            toggleActions: "play none none reverse",
            scrub: false,
            markers: false,
          },
        });
      }
    }, galleryRef.current);

    return () => ctx.revert();
  }, [images, isMobile]);

  useEffect(() => {
    let previousOverflow;
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };

    if (selectedImage) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      globalThis.addEventListener("keydown", onKey);
    }

    return () => {
      document.body.style.overflow = previousOverflow || "";
      globalThis.removeEventListener("keydown", onKey);
    };
  }, [selectedImage]);

  const layoutStyles = [
    { top: "25%", left: "10%", width: "18%", height: "26%", order: 0 },
    { top: "25%", left: "30%", width: "15%", height: "38%", order: 1 },
    { top: "25%", left: "47%", width: "17%", height: "22%", order: 2 },
    { top: "25%", left: "66%", width: "14%", height: "28%", order: 3 },
    { top: "49%", left: "47%", width: "17%", height: "22%", order: 4 },
    { top: "55%", left: "66%", width: "14%", height: "16%", order: 5 },
    { top: "53%", left: "10%", width: "18%", height: "42%", order: 6 },
    { top: "73%", left: "47%", width: "33%", height: "22%", order: 7 },
    { top: "65%", left: "30%", width: "15%", height: "30%", order: 8 },
  ];

  return (
    <div
      ref={galleryRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center py-16 md:py-24"
    >
      {/* Desktop */}
      <div className="hidden md:block relative w-[100vw] max-w-7xl h-[75vh] min-h-[600px]">
        {images.slice(0, 9).map((img, index) => {
          const style = layoutStyles[index] || {
            top: "0%",
            left: "0%",
            width: "20%",
            height: "33%",
          };
          return (
            <button
              key={img.id || index}
              onClick={() => setSelectedImage(img)}
              className="gallery-item desktop absolute overflow-hidden rounded-sm shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-[6px] border-[#8B7355] bg-[#5a4a3a] hover:scale-105 hover:z-20"
              data-order={style.order}
              style={{
                top: style.top,
                left: style.left,
                width: style.width,
                height: style.height,
              }}
            >
              <div className="relative w-full h-full group overflow-hidden">
                <Image
                  src={getImageUrl(img)}
                  alt={img.name || `Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Intermédiaire (tablettes) */}
      <div className="hidden sm:grid md:hidden w-full max-w-4xl mx-auto px-6 py-12 grid-cols-2 gap-6">
        {images.slice(0, 6).map((img, index) => (
          <button
            key={img.id || index}
            onClick={() => setSelectedImage(img)}
            className="gallery-item tablet relative h-[280px] overflow-hidden rounded-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-[5px] border-[#8B7355] bg-[#5a4a3a]"
          >
            <div className="relative w-full h-full group overflow-hidden">
              <Image
                src={getImageUrl(img)}
                alt={img.name || `Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          </button>
        ))}
      </div>

      {/* Mobile */}
      <div className="sm:hidden w-full min-h-screen flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md grid grid-cols-1 gap-5">
          {images.slice(0, 6).map((img, index) => (
            <button
              key={img.id || index}
              onClick={() => setSelectedImage(img)}
              className="gallery-item mobile relative h-[240px] overflow-hidden rounded-sm shadow-xl active:scale-95 transition-all duration-300 border-[4px] border-[#8B7355] bg-[#5a4a3a]"
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={getImageUrl(img)}
                  alt={img.name || `Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen viewer */}
      {typeof document !== "undefined" && selectedImage
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              tabIndex={-1}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 cursor-pointer"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative w-full max-w-6xl max-h-[90vh] flex items-center justify-center">
                <Image
                  src={getImageUrl(selectedImage)}
                  alt={selectedImage.name || "Image agrandie"}
                  width={1200}
                  height={800}
                  className="object-contain max-w-full max-h-[90vh]"
                />
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}

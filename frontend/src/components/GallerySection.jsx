"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function GallerySection({ eglise }) {
  const images = eglise?.images ?? [];
  const galleryRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const getImageUrl = (img) =>
    img?.formats?.large?.url ?? img?.formats?.medium?.url ?? img?.url;

  // Auto-scroll
  useEffect(() => {
    const container = galleryRef.current;
    if (!container || images.length <= 1) return;

    let scrollAmount = 0;
    const maxScroll = container.scrollWidth - container.clientWidth;

    const interval = setInterval(() => {
      scrollAmount += 1;
      if (scrollAmount >= maxScroll) scrollAmount = 0;
      container.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }, 30);

    return () => clearInterval(interval);
  }, [images]);

  // Escape key to close modal
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (images.length === 0) return null;

  return (
    <section className="bg-gray-100 py-20 px-6 md:px-32">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-12 text-center">
          Galerie
        </h2>

        <div
          ref={galleryRef}
          className="overflow-x-auto whitespace-nowrap no-scrollbar scroll-smooth"
        >
          <div className="inline-flex gap-6 px-2 py-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className="relative w-[160px] h-[120px] md:w-[240px] md:h-[180px] rounded-lg overflow-hidden shadow-md flex-shrink-0 group focus:outline-none"
              >
                <Image
                  src={getImageUrl(img)}
                  alt={img.name || `Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 🖼️ Lightbox modale */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl aspect-[4/3]">
            <Image
              src={getImageUrl(selectedImage)}
              alt={selectedImage.name || "Image en grand"}
              fill
              className="object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}

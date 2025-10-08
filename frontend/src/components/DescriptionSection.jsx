"use client";
import { useState, useEffect, useRef, forwardRef } from "react";
import Image from "next/image";

const DescriptionSection = forwardRef(({ eglise }, ref) => {
  const images = eglise?.images ?? [];
  const [selectedImage, setSelectedImage] = useState(images[0]?.url || null);
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateScrollButtons = () => {
      setCanScrollUp(el.scrollTop > 0);
      setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight);
    };

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  const scrollByAmount = (amount) => {
    scrollRef.current?.scrollBy({ top: amount, behavior: "smooth" });
  };

  return (
    <div className="scrollable-content h-full relative" ref={containerRef}>
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto pt-[140px] px-4 md:px-8"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pb-20">
          <TextBlock eglise={eglise} />
          <GalleryBlock
            images={images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </div>
      </div>

      {(canScrollUp || canScrollDown) && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[99999] flex gap-4">
          {canScrollUp && (
            <ScrollButton direction="up" onClick={() => scrollByAmount(-300)} />
          )}
          {canScrollDown && (
            <ScrollButton
              direction="down"
              onClick={() => scrollByAmount(300)}
            />
          )}
        </div>
      )}
    </div>
  );
});

export default DescriptionSection;

function TextBlock({ eglise }) {
  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-bold text-white drop-shadow-lg mb-8">
        {eglise?.nom}
      </h2>

      <div className="text-lg leading-relaxed text-white/90 space-y-4 drop-shadow">
        {eglise?.description?.map((block, index) => (
          <p key={index}>
            {block.children?.map((child) => child.text).join("")}
          </p>
        ))}
      </div>

      {eglise?.style_architectural?.length > 0 && (
        <div className="pt-4 space-y-4">
          <h3 className="text-lg text-white font-semibold drop-shadow">
            Style architectural :
          </h3>
          <div className="text-lg leading-relaxed text-white/90 drop-shadow space-y-2">
            {eglise.style_architectural.map((block, index) => (
              <p key={index}>
                {block.children?.map((child) => child.text).join("")}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GalleryBlock({ images, selectedImage, setSelectedImage }) {
  return (
    <div className="space-y-6">
      {selectedImage ? (
        <div className="rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-white/30 backdrop-blur-sm">
          <Image
            src={selectedImage}
            alt="Image principale"
            width={600}
            height={400}
            className="max-w-full max-h-[500px] object-contain"
          />
        </div>
      ) : (
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl h-[500px] flex items-center justify-center">
          <p className="text-white/80">Image à venir</p>
        </div>
      )}

      {images.length > 1 && (
        <div className="overflow-x-auto">
          <div className="flex gap-4 flex-nowrap pb-2 scroll-smooth w-max">
            {images.map((img, index) => {
              const thumb = img.formats?.thumbnail?.url || img.url;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img.url)}
                  className={`border-2 rounded-xl overflow-hidden ${
                    selectedImage === img.url
                      ? "border-blue-400"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={thumb}
                    alt={img.alternativeText || `Image ${index + 1}`}
                    width={100}
                    height={80}
                    className="object-cover w-[100px] h-[80px]"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ScrollButton({ direction, onClick }) {
  const icon =
    direction === "up" ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    );

  return (
    <button
      onClick={onClick}
      className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-md shadow-md"
      aria-label={`Scroll ${direction}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        {icon}
      </svg>
    </button>
  );
}

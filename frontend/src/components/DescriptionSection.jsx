"use client";

import { useState } from "react";
import Image from "next/image";

export default function DescriptionSection({ eglise }) {
  const [selectedImage, setSelectedImage] = useState(
    eglise?.image_principale ?? null
  );

  const getImageUrl = (img) =>
    img?.formats?.large?.url ?? img?.formats?.medium?.url ?? img?.url;

  if (!eglise?.nom && !eglise?.description?.length && !selectedImage)
    return null;

  return (
    <section className="relative w-full overflow-hidden px-6 md:px-32 py-24">
      <div className="relative z-10 max-w-6xl mt-10 mx-auto flex flex-col md:flex-row items-center justify-center gap-12 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl px-6 py-12">
        {/* Texte à gauche */}
        <div className="md:w-1/2 w-full">
          <div className="text-gray-800 space-y-6">
            {eglise?.nom && (
              <h2 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg">
                {eglise.nom}
              </h2>
            )}
            {eglise?.description?.length > 0 && (
              <div className="text-base md:text-lg font-medium space-y-4 drop-shadow-sm">
                {eglise.description.map((para, index) => {
                  const text = para?.children?.[0]?.text?.trim();
                  return text ? <p key={index}>{text}</p> : null;
                })}
              </div>
            )}
          </div>
        </div>

        {/* Image principale à droite */}
        {selectedImage && (
          <div className="md:w-1/2 w-full flex justify-center">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl bg-black">
              <Image
                src={getImageUrl(selectedImage)}
                alt={selectedImage.name || "Image principale"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

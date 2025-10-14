"use client";

import { useState } from "react";
import Image from "next/image";

export default function DescriptionSection({ eglise }) {
  const [selectedImage, setSelectedImage] = useState(
    eglise?.images?.[0] ?? null
  );

  const getImageUrl = (img) =>
    img?.formats?.large?.url ?? img?.formats?.medium?.url ?? img?.url;

  return (
    <section className="bg-white py-20 px-6 md:px-32">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Texte à gauche */}
        <div className="md:w-1/2 w-full">
          <div className="bg-black/60 backdrop-blur-md text-white rounded-xl p-6 md:p-8 shadow-xl space-y-6">
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
        </div>

        {/* Image principale à droite */}
        <div className="md:w-1/2 w-full flex justify-center">
          {selectedImage && (
            <div className="w-full h-[240px] md:h-[400px] rounded-lg overflow-hidden shadow-xl relative bg-black">
              <Image
                src={getImageUrl(selectedImage)}
                alt={selectedImage.name || "Image principale"}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

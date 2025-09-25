"use client";
import { useState } from "react";
import Image from "next/image";

export default function DescriptionSection({ eglise, API_URL }) {
  const [selectedImage, setSelectedImage] = useState(
    eglise.images?.[0]?.url || null
  );

  return (
    <section id="description" className="py-10 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Texte */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 bg-red-400 mt-8 mb-0 ml-6 mr-0 px-4 py-2 rounded">
              {eglise.nom}
            </h2>
            <div className="text-lg leading-relaxed text-gray-700 space-y-4">
              {eglise.description?.map((block, index) => (
                <p key={index}>
                  {block.children?.map((child) => child.text).join("")}
                </p>
              ))}
            </div>

            <div className="pt-4">
              <p className="text-lg">
                <strong className="text-gray-900">Style architectural :</strong>
                <span className="text-gray-700 ml-2">
                  {eglise.style_architectural}
                </span>
              </p>
            </div>
          </div>

          {/* Galerie */}
          <div className="space-y-6">
            {/* Image principale */}
            {selectedImage ? (
              <div className="rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-white">
                <Image
                  src={selectedImage}
                  alt="Image principale"
                  width={600}
                  height={400}
                  className="max-w-full max-h-[500px] object-contain"
                />
              </div>
            ) : (
              <div className="bg-gray-200 rounded-2xl h-[500px] flex items-center justify-center">
                <p className="text-gray-500">Image à venir</p>
              </div>
            )}

            {/* Carrousel de miniatures */}
            {eglise.images?.length > 1 && (
              <div className="overflow-x-auto max-w-full">
                <div className="flex gap-4 flex-nowrap pb-2 scroll-smooth w-max">
                  {eglise.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img.url)}
                      className={`border-2 rounded-xl overflow-hidden ${
                        selectedImage === img.url
                          ? "border-blue-600"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={img.formats?.thumbnail?.url || img.url}
                        alt={img.alternativeText || `Image ${index + 1}`}
                        width={100}
                        height={80}
                        className="object-cover w-[100px] h-[80px]"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

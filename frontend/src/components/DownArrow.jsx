"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";

export default function DownArrow({ direction = "down", text = "Continuer" }) {
  const arrowRef = useRef(null);

  const icons = {
    down: ChevronDown,
    right: ChevronRight,
    left: ChevronLeft,
    "left-right": null, // Double flèche
  };

  const Icon = icons[direction];

  useEffect(() => {
    const arrow = arrowRef.current;
    if (!arrow) return;

    // Animation selon la direction
    const animProps = {
      down: { y: 10 },
      right: { x: 10 },
      left: { x: -10 },
      "left-right": { x: 10 },
    };

    gsap.to(arrow, {
      ...animProps[direction],
      duration: 1.5,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, [direction]);

  const handleClick = () => {
    if (direction === "down") {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={arrowRef}
      className={`flex ${direction === "down" ? "flex-col" : "flex-row"} items-center gap-2 cursor-pointer hover:scale-110 transition-transform`}
      onClick={handleClick}
    >
      {direction === "left" && Icon && <Icon className="text-white" size={32} strokeWidth={1.5} />}
      
      {text && (
        <span className="text-white text-sm font-light tracking-wider uppercase">
          {text}
        </span>
      )}
      
      {direction === "down" && Icon && <Icon className="text-white" size={32} strokeWidth={1.5} />}
      {direction === "right" && Icon && <Icon className="text-white" size={32} strokeWidth={1.5} />}
      
      {direction === "left-right" && (
        <>
          <ChevronLeft className="text-white" size={32} strokeWidth={1.5} />
          <ChevronRight className="text-white" size={32} strokeWidth={1.5} />
        </>
      )}
    </div>
  );
}

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useClipTransition(maskRef) {
  return function clipTransition(label, { onReveal } = {}) {
    const mask = maskRef.current;
    if (!mask) return;

    const tl = gsap.timeline();

    // 🟩 Rideau blanc fermé (masqué par le bas)
    tl.set(mask, {
      opacity: 1,
      pointerEvents: "auto",
      backgroundColor: "#ffffff",
      clipPath: "inset(100% 0% 0% 0%)",
    });

    // 🟨 Rideau qui se lève
    tl.to(mask, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        if (onReveal) onReveal();
      },
    });

    // 🟥 Le rideau reste en place (pas de retrait)
  };
}

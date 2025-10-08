import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSceneTimeline({ sceneClasses, onSceneStart }) {
  const SCENE_DURATION = { enter: 5, pause: 15, exit: 5 };

  const tl = gsap.timeline({
    scrollTrigger: {
      id: "mainScroll",
      trigger: ".scroll-wrapper",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      markers: false, // mets à true pour debug
    },
    defaults: { ease: "power2.inOut" },
  });

  const addScene = (
    label,
    selector,
    fromProps,
    toProps,
    exitProps,
    onStart = null
  ) => {
    // ✅ Marque le début de la scène
    tl.add(label);

    // ✅ Animation d’entrée
    tl.fromTo(selector, fromProps, {
      ...toProps,
      pointerEvents: "auto",
      onStart: () => {
        sceneClasses.forEach((cls) => {
          if (cls !== selector.replace(".", "")) {
            gsap.set(`.${cls}`, { opacity: 0, pointerEvents: "none" });
          }
        });
        if (onStart) onStart();
        if (onSceneStart) onSceneStart(label);
      },
    });

    // ✅ Pause après entrée
    tl.to({}, { duration: SCENE_DURATION.pause });

    // ✅ Animation de sortie
    tl.to(selector, { ...exitProps, pointerEvents: "none" });

    // ✅ Pause après sortie (optionnelle)
    tl.to({}, { duration: SCENE_DURATION.pause });
  };

  return { addScene, timeline: tl };
}

import { getSiteData } from "../lib/strapi";
import VideoBackground from "@components/VideoBackground";
import BlogSection from "@components/BlogSection"; // server component direct import
import dynamic from "next/dynamic";
import IntroSection from "@components/IntroSection";
import DescriptionSection from "@components/DescriptionSection";
import SectionNavigation from "@components/SectionNavigation";

// Chargement dynamique de PartnerSection (client component interne gérée par son propre fichier)
const PartnerSection = dynamic(() => import("@components/PartnerSection"), {
  loading: () => (
    <div className="h-[60vh] flex items-center justify-center text-white font-garamond text-xl">
      Chargement des partenaires…
    </div>
  ),
});

// BlogSection désormais Server Component - suppression dynamic

// ISR : Revalidation toutes les heures
export const revalidate = 3600;

// Métadonnées SEO
export const metadata = {
  title:
    "Art et Patrimoine de Doazit | Sauvegarde de l'église Saint-Jean-Baptiste d'Aulès",
  description:
    "Association pour la restauration et la valorisation de l'église Saint-Jean-Baptiste d'Aulès à Doazit. Découvrez notre patrimoine roman du XIIe siècle classé aux Monuments historiques.",
  keywords: [
    "patrimoine",
    "Doazit",
    "église",
    "Saint-Jean-Baptiste",
    "Aulès",
    "Chalosse",
    "Monuments historiques",
    "restauration",
  ],
  openGraph: {
    title: "APD - Art et Patrimoine de Doazit",
    description:
      "Sauvegardons ensemble l'église Saint-Jean-Baptiste d'Aulès, joyau du patrimoine roman classé aux Monuments historiques.",
    type: "website",
    locale: "fr_FR",
    siteName: "Art et Patrimoine de Doazit",
  },
  twitter: {
    card: "summary_large_image",
    title: "APD - Art et Patrimoine de Doazit",
    description: "Sauvegardons ensemble notre patrimoine",
  },
};

function getVideoUrl(accueil) {
  if (!accueil || !accueil.video?.url) return null;
  const url = accueil.video.url;
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_API_URL}${url}`;
}

export default async function Home() {
  const { eglise, accueil, interviews, partenaires, articles } =
    await getSiteData();

  const firstInterview = Array.isArray(interviews) ? interviews[0] : null;
  const videoUrl = getVideoUrl(accueil);

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden bg-black text-white">
      {/* 🎥 Fond vidéo permanent - s'affiche dès que disponible */}
      {videoUrl && <VideoBackground videoUrl={videoUrl} />}

      {/* Navigation entre sections */}
      <SectionNavigation />

      {/* Contenu principal */}
      <div className="relative z-10">
        <section id="intro">
          <IntroSection eglise={eglise} />
        </section>

        {eglise && firstInterview && (
          <section id="description">
            <DescriptionSection
              eglise={eglise}
              interviewBlock={firstInterview}
            />
          </section>
        )}

        <section id="partners">
          <PartnerSection partners={partenaires} />
        </section>

        <section id="blog">
          <BlogSection articles={articles} limit={3} />
        </section>
      </div>
    </main>
  );
}

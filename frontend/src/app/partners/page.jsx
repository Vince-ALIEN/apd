import { getSiteData } from "../../lib/strapi";
import ContactModal from "@components/ContactModal";

// Métadonnées SEO
export const metadata = {
  title: "Nos Partenaires | Art et Patrimoine de Doazit",
  description:
    "Découvrez les partenaires qui soutiennent l'association Art et Patrimoine de Doazit dans ses actions de restauration et de valorisation du patrimoine.",
  openGraph: {
    title: "Nos Partenaires - APD",
    description: "Merci à nos partenaires pour leur soutien",
    type: "website",
  },
};

export default async function PartnersPage() {
  let error = null;
  try {
    await getSiteData();
  } catch (e) {
    error = e.message;
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white text-red-600 font-garamond">
        <p className="text-sm md:text-base leading-relaxed drop-shadow-sm">
          Erreur : {error}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full pt-[150px] pb-20 px-6 bg-pierre ">
      <section className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-3xl md:text-4xl drop-shadow-lg leading-snug text-black mb-6 font-garamond">
          Devenez partenaire de notre{" "}
          <span className="shadow-underline text-white">projet</span>
        </h1>
        <p className="text-sm md:text-base font-normal drop-shadow-sm leading-relaxed text-black">
          En soutenant la restauration de l’église Saint-Jean Baptiste d’Aulès,
          vous participez à la préservation d’un patrimoine vivant et à la
          transmission d’une histoire locale forte. Votre engagement sera
          valorisé auprès du public et des institutions.
        </p>
        <ContactModal buttonText="Devenir partenaire" />
      </section>
    </main>
  );
}

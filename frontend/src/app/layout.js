import "./globals.css";
import Footer from "../components/Footer";
import Header from "@components/Header";
import { getSiteData } from "../lib/strapi";

export const metadata = {
  title: "Église Saint-Jean-Baptiste d'Aulès",
  description: "Site officiel de restauration et de soutien",
  icons: {
    icon: "/logo.png",
  },
};

export const revalidate = 3600; // rafraîchit les données site toutes les heures

export default async function RootLayout({ children }) {
  let siteData = null;
  try {
    const { parametres_site, eglise } = await getSiteData();
    siteData = { parametres_site, eglise };
  } catch (e) {
    // En cas d'erreur on fournit des valeurs par défaut minimales
    siteData = {
      parametres_site: {
        bouton_don: { url: "/don", label: "Faire un don" },
        logo: { url: "/logo.png" },
        url_don: "/don",
        reseaux_sociaux: [],
      },
      eglise: null,
    };
  }

  return (
    <html lang="fr" className="scroll-smooth">
      <body className="overflow-x-hidden antialiased bg-white text-gray-900">
        <Header siteData={siteData} />
        <main className="relative z-10">{children}</main>
        <Footer siteData={siteData} />
      </body>
    </html>
  );
}

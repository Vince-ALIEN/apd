import Header from "@components/Header";
import Footer from "@components/Footer";
import BlogSection from "@components/BlogSection";
import GallerySection from "@components/GallerySection";

async function getSiteData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/parametres-site?populate[logo][populate]=*&populate[logo_footer][populate]=*`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  return data.data ?? null;
}

async function getEgliseData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/eglise?populate=images`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  return data.data?.attributes ?? null;
}

export default async function BlogIndexPage() {
  const site = await getSiteData();

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Header site={site} API_URL={process.env.NEXT_PUBLIC_API_URL} />

      {/* Marge pour éviter que le logo coupe le contenu */}
      <div className="flex-grow min-h-screen bg-white pt-10">
        <BlogSection API_URL={process.env.NEXT_PUBLIC_API_URL} />
      </div>

      <Footer site={site} API_URL={process.env.NEXT_PUBLIC_API_URL} />
    </main>
  );
}

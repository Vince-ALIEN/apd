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
  const eglise = await getEgliseData();

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Header site={site} API_URL={process.env.NEXT_PUBLIC_API_URL} />

      <div className="flex-grow min-h-screen bg-white">
        <BlogSection API_URL={process.env.NEXT_PUBLIC_API_URL} />
      </div>

      <div className="min-h-screen bg-white">
        <GallerySection eglise={eglise} />
      </div>

      <Footer site={site} API_URL={process.env.NEXT_PUBLIC_API_URL} />
    </main>
  );
}

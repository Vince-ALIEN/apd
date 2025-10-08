import Header from "@components/Header";
import Footer from "@components/Footer";
import BlogSection from "@components/BlogSection";

async function getSiteData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/parametres-site?populate[logo][populate]=*&populate[logo_footer][populate]=*`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  return data.data ?? null;
}

export default async function BlogIndexPage() {
  const site = await getSiteData();

  return (
    <>
      <Header site={site} API_URL={process.env.NEXT_PUBLIC_API_URL} />
      <BlogSection API_URL={process.env.NEXT_PUBLIC_API_URL} />
      <Footer site={site} API_URL={process.env.NEXT_PUBLIC_API_URL} />
    </>
  );
}

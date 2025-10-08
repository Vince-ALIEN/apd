"use client";
import { useState, useEffect } from "react";
import gsap from "gsap";

export default function BlogSection({ API_URL }) {
  const [articles, setArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(null);
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      const res = await fetch(`${API_URL}/api/articles?populate=image`);
      const data = await res.json();
      setArticles(Array.isArray(data.data) ? data.data : []);
    }
    fetchArticles();
  }, [API_URL]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#blog-")) {
        const slugValue = hash.replace("#blog-", "");
        setSlug(slugValue || null);
      } else {
        setSlug(null);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (slug && articles.length > 0) {
      const found = articles.find((a) => a.slug === slug);
      if (found) setActiveArticle(found);
    } else {
      setActiveArticle(null);
    }
  }, [slug, articles]);

  useEffect(() => {
    const el = document.querySelector(".blog-section-wrapper");
    if (el) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, [activeArticle]);

  return (
    <div className="flex items-center justify-center h-full">
      <section
        className="blog-section-wrapper max-w-6xl w-full bg-black/20 backdrop-blur-sm p-8 rounded-xl shadow-xl text-center overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 100px)" }} // compensation du header
      >
        {activeArticle ? (
          <ArticleDetail article={activeArticle} />
        ) : (
          <>
            <h2 className="text-3xl font-bold text-white mb-8 drop-shadow-lg">
              Nos articles
            </h2>
            <div className="grid gap-8 justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onClick={() => {
                    window.location.hash = `blog-${article.slug}`;
                    sessionStorage.setItem("scrollFromNavigation", "true");
                  }}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function ArticleCard({ article, onClick }) {
  const { titre, date_publication, image } = article;
  const imageUrl = image?.url;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer group block w-full max-w-[250px] mx-auto hover:scale-105 transition-transform"
    >
      <div className="relative w-full h-[180px] bg-black/30 backdrop-blur-sm rounded-lg shadow-md overflow-hidden">
        <img
          src={imageUrl}
          alt={titre}
          className="object-cover w-full h-full"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{titre}</h3>
      <p className="text-sm text-white/70">
        {date_publication
          ? new Date(date_publication).toLocaleDateString("fr-FR")
          : "Date inconnue"}
      </p>
    </div>
  );
}

function ArticleDetail({ article }) {
  const { titre, date_publication, contenu, image, auteur } = article;
  const imageUrl = image?.url;

  return (
    <div className="max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-4 text-center">{titre}</h1>
      <p className="text-sm text-white/70 mb-2 text-center">
        {date_publication
          ? new Date(date_publication).toLocaleDateString("fr-FR")
          : "Date inconnue"}
      </p>
      <p className="text-sm italic mb-6 text-center">
        {auteur ?? "Auteur inconnu"}
      </p>
      {imageUrl && (
        <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
          <img
            src={imageUrl}
            alt={titre}
            className="w-full h-80 object-cover"
          />
        </div>
      )}
      <div className="prose prose-invert max-w-none text-left">
        {contenu?.map((block, i) => (
          <p key={i}>{block.children?.[0]?.text}</p>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={() => {
            window.location.hash = "blog";
            sessionStorage.setItem("scrollFromNavigation", "true");
          }}
          className="mt-8 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200"
        >
          ← Retour aux articles
        </button>
      </div>
    </div>
  );
}

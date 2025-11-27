from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

# Format A4 vertical
prs = Presentation()
prs.slide_width = Inches(8.27)
prs.slide_height = Inches(11.69)

# Couleurs du design (clair)
COLOR_BG = RGBColor(255, 255, 255)
COLOR_LIGHT = RGBColor(245, 245, 245)
COLOR_TEXT = RGBColor(45, 45, 45)
COLOR_MUTED = RGBColor(120, 120, 120)
COLOR_ACCENT = RGBColor(234, 67, 53)

# Couleurs projet
COLOR_APD = RGBColor(0xAC, 0x11, 0x15)      # #ac1115 (Art et Patrimoine de Doazit)
COLOR_COOL = RGBColor(0xA4, 0x77, 0x64)      # #a47764 (CoolBooking)

# Helpers (thème clair)

def add_title_slide(title, subtitle=""):
        slide = prs.slides.add_slide(prs.slide_layouts[6])

        # Fond blanc
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(8.27), Inches(11.69))
        bg.fill.solid()
        bg.fill.fore_color.rgb = COLOR_BG
        bg.line.fill.background()

        # Bande bicolore fine (code couleur)
        band_apd = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0.9), Inches(8.27/2), Inches(0.08))
        band_apd.fill.solid(); band_apd.fill.fore_color.rgb = COLOR_APD; band_apd.line.fill.background()
        band_cool = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(8.27/2), Inches(0.9), Inches(8.27/2), Inches(0.08))
        band_cool.fill.solid(); band_cool.fill.fore_color.rgb = COLOR_COOL; band_cool.line.fill.background()

        tb = slide.shapes.add_textbox(Inches(0.6), Inches(2.0), Inches(7.07), Inches(2.5))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.name = 'Segoe UI Semibold'
        p.font.size = Pt(34)
        p.font.color.rgb = COLOR_TEXT
        p.alignment = PP_ALIGN.CENTER

        if subtitle:
                sb = slide.shapes.add_textbox(Inches(0.8), Inches(5.1), Inches(6.67), Inches(1.6))
                sf = sb.text_frame
                sf.word_wrap = True
                sp = sf.paragraphs[0]
                sp.text = subtitle
                sp.font.name = 'Segoe UI'
                sp.font.size = Pt(16)
                sp.font.color.rgb = COLOR_MUTED
                sp.alignment = PP_ALIGN.CENTER

        return slide


def add_section_divider(title, number, color):
        slide = prs.slides.add_slide(prs.slide_layouts[6])
        # Fond blanc
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(8.27), Inches(11.69))
        bg.fill.solid(); bg.fill.fore_color.rgb = COLOR_BG; bg.line.fill.background()

        # Bande colorée
        band = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(4.8), Inches(8.27), Inches(1))
        band.fill.solid(); band.fill.fore_color.rgb = color; band.line.fill.background()

        # Numéro (gris clair)
        nb = slide.shapes.add_textbox(Inches(0.5), Inches(2.8), Inches(7.27), Inches(1.5))
        nf = nb.text_frame
        pn = nf.paragraphs[0]
        pn.text = f"0{number}"
        pn.font.name = 'Segoe UI Light'
        pn.font.size = Pt(110)
        pn.font.color.rgb = RGBColor(230, 230, 230)
        pn.alignment = PP_ALIGN.CENTER

        # Titre
        tb = slide.shapes.add_textbox(Inches(0.5), Inches(5.0), Inches(7.27), Inches(0.9))
        tf = tb.text_frame
        tf.vertical_anchor = 1
        p = tf.paragraphs[0]
        p.text = title
        p.font.name = 'Segoe UI Semibold'
        p.font.size = Pt(30)
        p.font.color.rgb = COLOR_BG
        p.alignment = PP_ALIGN.CENTER

        return slide


def add_content_slide(title, items, color):
        slide = prs.slides.add_slide(prs.slide_layouts[6])

        header = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(8.27), Inches(0.9))
        header.fill.solid(); header.fill.fore_color.rgb = color; header.line.fill.background()

        tb = slide.shapes.add_textbox(Inches(0.5), Inches(0.18), Inches(7.27), Inches(0.55))
        tf = tb.text_frame
        tf.vertical_anchor = 1
        p = tf.paragraphs[0]
        p.text = title
        p.font.name = 'Segoe UI Semibold'
        p.font.size = Pt(24)
        p.font.color.rgb = RGBColor(255, 255, 255)

        cb = slide.shapes.add_textbox(Inches(0.6), Inches(1.15), Inches(7.07), Inches(10))
        cf = cb.text_frame
        cf.word_wrap = True

        for i, item in enumerate(items):
                par = cf.add_paragraph() if i > 0 else cf.paragraphs[0]
                if isinstance(item, dict):
                        par.text = item.get('text', '')
                        par.level = item.get('level', 0)
                        par.font.name = 'Consolas' if item.get('code', False) else 'Segoe UI'
                        par.font.size = Pt(item.get('size', 13))
                        par.font.color.rgb = item.get('color', COLOR_TEXT)
                        if item.get('bold', False):
                                par.font.bold = True
                else:
                        par.text = item
                        par.font.name = 'Segoe UI'
                        par.font.size = Pt(13)
                        par.font.color.rgb = COLOR_TEXT
                        par.level = 0
                par.space_after = Pt(8)

        return slide


def add_code_slide(title, code, description, color):
        slide = prs.slides.add_slide(prs.slide_layouts[6])

        header = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(8.27), Inches(0.9))
        header.fill.solid(); header.fill.fore_color.rgb = color; header.line.fill.background()

        tb = slide.shapes.add_textbox(Inches(0.5), Inches(0.18), Inches(7.27), Inches(0.55))
        tf = tb.text_frame
        tf.vertical_anchor = 1
        p = tf.paragraphs[0]
        p.text = title
        p.font.name = 'Segoe UI Semibold'
        p.font.size = Pt(22)
        p.font.color.rgb = RGBColor(255, 255, 255)

        y = 1.1
        if description:
                db = slide.shapes.add_textbox(Inches(0.6), Inches(y), Inches(7.07), Inches(0.9))
                df = db.text_frame
                dp = df.paragraphs[0]
                dp.text = description
                dp.font.name = 'Segoe UI'
                dp.font.size = Pt(12)
                dp.font.color.rgb = COLOR_MUTED
                dp.font.italic = True
                y += 0.85

        code_bg = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(y), Inches(7.07), Inches(11.69 - y - 0.5))
        code_bg.fill.solid(); code_bg.fill.fore_color.rgb = COLOR_LIGHT
        code_bg.line.color.rgb = color
        code_bg.line.width = Pt(1)

        tb_code = slide.shapes.add_textbox(Inches(0.75), Inches(y + 0.15), Inches(6.77), Inches(11.69 - y - 0.8))
        tf_code = tb_code.text_frame
        tf_code.word_wrap = True
        pc = tf_code.paragraphs[0]
        pc.text = code
        pc.font.name = 'Consolas'
        pc.font.size = Pt(9.5)
        pc.font.color.rgb = COLOR_TEXT
        pc.line_spacing = 1.15

        return slide

# =================== Slides ===================

# Page de garde
add_title_slide(
        "DOSSIER PROJET\nTITRE PROFESSIONNEL DWWM",
        "Fusion APD (Art et Patrimoine de Doazit) + CoolBooking\nNovembre 2025 — Philippe BARBOSA"
)

# =================== APD (22 slides) ===================
add_section_divider("PARTIE APD — Frontend & CMS", 1, COLOR_APD)

# Présentation (reprise du dossier frontend)
add_content_slide(
        "Présentation",
        [
                {'text': '👤 PHILIPPE BARBOSA', 'size': 18, 'bold': True, 'color': COLOR_APD},
                {'text': '54 ans, en reconversion professionnelle', 'size': 14},
                '',
                {'text': '🎯 Parcours de formation', 'size': 16, 'bold': True},
                {'text': "Titre Professionnel Développeur Web et Web Mobile", 'size': 13},
                {'text': "Stage professionnel : UFO Agency (agence web)", 'size': 13},
                '',
                {'text': '💡 Motivation', 'size': 16, 'bold': True},
                {'text': "Passionné depuis longtemps par le développement web, j'ai décidé de me reconvertir dans ce secteur qui m'anime. Cette formation me permet de concrétiser cette ambition et d'acquérir les compétences techniques nécessaires pour exercer ce métier avec professionnalisme.", 'size': 13},
                '',
                {'text': '📁 Projets présentés dans ce dossier', 'size': 16, 'bold': True},
                {'text': "Frontend : Projet APD (stage UFO Agency)", 'size': 13, 'bold': True},
                {'text': "Maquettage : Projet CoolBooking (fil-rouge personnel)", 'size': 13, 'bold': True},
                {'text': "Backend : Projet CoolBooking MariaDB (fil-rouge personnel)", 'size': 13, 'bold': True},
        ],
        COLOR_APD
)

add_content_slide(
        "Projet APD - Association Pour la Dignité",
        [
                {'text': '📋 Contexte du projet', 'size': 16, 'bold': True, 'color': COLOR_APD},
                {'text': "Projet réalisé lors de mon stage chez UFO Agency", 'size': 13},
                {'text': "Site vitrine pour une association humanitaire internationale", 'size': 13},
                {'text': "Maquette graphique déjà conçue en amont par l'équipe design", 'size': 13},
                '',
                {'text': '🎯 Objectifs fonctionnels', 'size': 16, 'bold': True, 'color': COLOR_APD},
                {'text': "✓ Présenter l'association, sa mission et ses actions", 'size': 13},
                {'text': "✓ Publier et gérer des articles d'actualité", 'size': 13},
                {'text': "✓ Diffuser des interviews vidéo", 'size': 13},
                {'text': "✓ Mettre en avant les partenaires", 'size': 13},
                {'text': "✓ Formulaire de contact fonctionnel", 'size': 13},
                '',
                {'text': '⚙️ Contraintes techniques imposées', 'size': 16, 'bold': True, 'color': COLOR_APD},
                {'text': "Utilisation obligatoire de Strapi CMS (choix de l'agence)", 'size': 13},
                {'text': "Respect strict du maquettage fourni", 'size': 13},
                {'text': "Performances élevées (Lighthouse score > 90)", 'size': 13},
                {'text': "Responsive design mobile-first", 'size': 13},
                {'text': "Accessibilité WCAG 2.1 niveau AA", 'size': 13},
        ],
        COLOR_APD
)

add_content_slide(
        "Stack Technique Frontend - APD",
        [
                {'text': '🛠️ Technologies et outils utilisés', 'size': 17, 'bold': True},
                '',
                {'text': 'Next.js 15 (App Router)', 'size': 15, 'bold': True, 'color': COLOR_APD},
                {'text': "Framework React avec système de routing intégré", 'size': 12},
                {'text': "Server Components et Client Components", 'size': 12},
                {'text': "Rendu côté serveur (SSR) et génération statique (SSG)", 'size': 12},
                {'text': "Incremental Static Regeneration (ISR)", 'size': 12},
                '',
                {'text': 'React 19', 'size': 15, 'bold': True, 'color': COLOR_APD},
                {'text': "Bibliothèque JavaScript pour interfaces utilisateur réactives", 'size': 12},
                {'text': "Composants fonctionnels avec hooks modernes", 'size': 12},
                '',
                {'text': 'TailwindCSS', 'size': 15, 'bold': True, 'color': COLOR_APD},
                {'text': "Framework CSS utility-first pour un développement rapide", 'size': 12},
                {'text': "Design system cohérent et maintenable", 'size': 12},
                '',
                {'text': 'GSAP & Lenis', 'size': 15, 'bold': True, 'color': COLOR_APD},
                {'text': "Bibliothèque d'animations performantes (GSAP)", 'size': 12},
                {'text': "Smooth scroll pour une navigation fluide (Lenis)", 'size': 12},
                '',
                {'text': 'Cloudinary CDN', 'size': 15, 'bold': True, 'color': COLOR_APD},
                {'text': "Optimisation et diffusion des médias (images/vidéos)", 'size': 12},
        ],
        COLOR_APD
)

add_content_slide(
        "Architecture Next.js App Router",
        [
                {'text': "📁 Organisation du projet frontend", 'size': 16, 'bold': True},
                {'text': "J'ai structuré le projet selon les conventions Next.js 15 App Router :", 'size': 13},
                '',
                {'text': 'frontend/src/app/', 'size': 13, 'bold': True, 'code': True},
                {'text': '├── page.jsx         → Page d\'accueil principale', 'size': 11, 'code': True, 'level': 1},
                {'text': '├── layout.js        → Layout global de l\'application', 'size': 11, 'code': True, 'level': 1},
                {'text': '├── globals.css      → Styles globaux et variables CSS', 'size': 11, 'code': True, 'level': 1},
                {'text': '├── blog/', 'size': 11, 'code': True, 'level': 1},
                {'text': '│   ├── page.jsx     → Liste complète des articles', 'size': 11, 'code': True, 'level': 2},
                {'text': '│   └── [slug]/      → Routing dynamique', 'size': 11, 'code': True, 'level': 2},
                {'text': '│       └── page.jsx → Article individuel par slug', 'size': 11, 'code': True, 'level': 3},
                {'text': '├── association/page.jsx', 'size': 11, 'code': True, 'level': 1},
                {'text': '└── partners/page.jsx', 'size': 11, 'code': True, 'level': 1},
                '',
                {'text': 'frontend/src/components/', 'size': 13, 'bold': True, 'code': True},
                {'text': '├── Header.jsx', 'size': 11, 'code': True, 'level': 1},
                {'text': '├── Footer.jsx', 'size': 11, 'code': True, 'level': 1},
                {'text': '├── VideoBackground.jsx', 'size': 11, 'code': True, 'level': 1},
                {'text': '├── BlogSection.jsx', 'size': 11, 'code': True, 'level': 1},
                {'text': '├── PartnerSection.jsx', 'size': 11, 'code': True, 'level': 1},
                {'text': '└── ContactModal.jsx', 'size': 11, 'code': True, 'level': 1},
                '',
                {'text': 'frontend/src/hooks/', 'size': 13, 'bold': True, 'code': True},
                {'text': '├── useSiteData.jsx  → Hook personnalisé pour API', 'size': 11, 'code': True, 'level': 1},
                {'text': '└── useIsMobile.jsx  → Détection responsive', 'size': 11, 'code': True, 'level': 1},
        ],
        COLOR_APD
)

add_code_slide(
        "Page d'accueil - page.jsx",
        """// frontend/src/app/page.jsx
import VideoBackground from "@/components/VideoBackground";
import dynamic from "next/dynamic";
import useSiteData from "@/hooks/useSiteData";

// Import dynamique pour optimiser le chargement
const PartnerSection = dynamic(
    () => import("@/components/PartnerSection"),
    { ssr: false }
);

const BlogSection = dynamic(
    () => import("@/components/BlogSection"),
    { ssr: false }
);

export default function Home() {
    const { data, loading, error } = useSiteData();

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <main>
            <VideoBackground videoUrl={data.accueil?.video} />
            <IntroSection />
            <DescriptionSection />
            <PartnerSection partners={data.partenaires} />
            <BlogSection articles={data.articles} limit={3} />
        </main>
    );
}""",
        "J'ai structuré la page d'accueil avec des imports dynamiques pour optimiser les performances. Le composant VideoBackground charge en priorité la vidéo d'arrière-plan.",
        COLOR_APD
)

add_code_slide(
        "Composant VideoBackground",
        """// frontend/src/components/VideoBackground.jsx
'use client';
import { useState } from 'react';

export default function VideoBackground({ videoUrl }) {
    const [opacity, setOpacity] = useState(0);

    const handleVideoReady = () => {
        setOpacity(1); // Transition douce quand la vidéo est prête
    };

    return (
        <div className="video-container">
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onLoadedData={handleVideoReady}
                onCanPlayThrough={handleVideoReady}
                style={{ opacity, transition: 'opacity 0.5s ease-in' }}
            >
                <source src={videoUrl} type="video/mp4" />
            </video>
        </div>
    );
}""",
        "J'ai créé un composant qui gère l'affichage progressif de la vidéo avec une transition d'opacité pour améliorer l'expérience utilisateur.",
        COLOR_APD
)

add_code_slide(
        "Hook personnalisé - useSiteData",
        """// frontend/src/hooks/useSiteData.jsx
'use client';
import { useState, useEffect } from 'react';

export default function useSiteData() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // Chargement prioritaire de l'accueil (vidéo)
                const accueilRes = await fetch(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/accueil?populate=*`
                );
                const accueilData = await accueilRes.json();
        
                // Chargement parallèle des autres endpoints
                const [articlesRes, partenairesRes, interviewsRes] = 
                    await Promise.all([
                        fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?populate=*`),
                        fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/partenaires?populate=*`),
                        fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/interviews?populate=*`)
                    ]);

                const articles = await articlesRes.json();
        
                setData({
                    accueil: accueilData.data,
                    articles: articles.data.sort((a,b) => 
                        new Date(b.attributes.date) - new Date(a.attributes.date)
                    ),
                    partenaires: partenaires.data,
                    interviews: interviews.data,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return { data, loading, error };
}""",
        "Hook personnalisé pour centraliser les appels API. J'ai implémenté un chargement prioritaire pour la vidéo et parallélisé les autres requêtes.",
        COLOR_APD
)

add_code_slide(
        "Routing Dynamique - Article",
        """// frontend/src/app/blog/[slug]/page.jsx
export const revalidate = 60; // Revalidation toutes les 60s

export async function generateMetadata({ params }) {
    const { slug } = params;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?` +
        `filters[slug][$eq]=${slug}&populate=*`
    );
    const data = await res.json();
    const article = data.data[0];
  
    return {
        title: article.attributes.titre,
        description: article.attributes.extrait,
    };
}

export default async function ArticlePage({ params }) {
    const { slug } = params;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?` +
        `filters[slug][$eq]=${slug}&populate=*`,
        { next: { revalidate: 60 } }
    );
  
    const data = await res.json();
    const article = data.data[0]?.attributes;

    if (!article) return <div>Article non trouvé</div>;

    return (
        <article>
            <h1>{article.titre}</h1>
            <time>{new Date(article.date).toLocaleDateString('fr-FR')}</time>
            <p>Par {article.auteur}</p>
            <div dangerouslySetInnerHTML={{ __html: article.contenu }} />
        </article>
    );
}""",
        "Page dynamique pour afficher un article à partir de son slug. J'utilise generateMetadata pour le SEO et la revalidation incrémentale (ISR).",
        COLOR_APD
)

add_content_slide(
        "Strapi CMS - Pourquoi ?",
        [
                {'text': "🎯 Contexte de choix", 'size': 15, 'bold': True},
                {'text': "L'agence UFO Agency a choisi Strapi pour ce projet afin de fournir une interface simple de gestion de contenu à l'association.", 'size': 13},
                '',
                {'text': '✅ Avantages de Strapi', 'size': 15, 'bold': True},
                {'text': "Interface d'administration clé en main", 'size': 13},
                {'text': "→ L'association peut gérer articles, interviews et partenaires sans compétences techniques", 'size': 12, 'level': 1},
                '',
                {'text': "API REST générée automatiquement", 'size': 13},
                {'text': "→ Gain de temps sur le développement backend", 'size': 12, 'level': 1},
                '',
                {'text': "Gestion des médias intégrée", 'size': 13},
                {'text': "→ Upload d'images et vidéos directement dans l'interface", 'size': 12, 'level': 1},
                '',
                {'text': "Extensible avec des routes personnalisées", 'size': 13},
                {'text': "→ J'ai pu ajouter une route d'envoi d'email pour le formulaire de contact", 'size': 12, 'level': 1},
                '',
                {'text': "Open source et bien documenté", 'size': 13},
                {'text': "→ Large communauté et ressources disponibles", 'size': 12, 'level': 1},
        ],
        COLOR_APD
)

add_content_slide(
        "Optimisations Performance - APD",
        [
                {'text': "⚡ Stratégies d'optimisation mises en place", 'size': 15, 'bold': True},
                '',
                {'text': '1. Images optimisées avec next/image', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "Redimensionnement automatique et lazy loading", 'size': 12},
                {'text': "Format WebP pour réduire la taille des fichiers", 'size': 12},
                {'text': "CDN Cloudinary pour un chargement rapide", 'size': 12},
                '',
                {'text': '2. Code splitting avec dynamic imports', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "Chargement différé des composants non critiques", 'size': 12},
                {'text': "Réduction du bundle JavaScript initial", 'size': 12},
                '',
                {'text': '3. Chargement prioritaire', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "Vidéo d'accueil chargée en priorité avec preload=\"auto\"", 'size': 12},
                {'text': "Hook useSiteData qui charge l'accueil en premier", 'size': 12},
                '',
                {'text': '4. Server-Side Rendering (SSR)', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "Pages générées côté serveur pour un meilleur SEO", 'size': 12},
                {'text': "Incremental Static Regeneration (revalidate: 60s)", 'size': 12},
        ],
        COLOR_APD
)

add_content_slide(
        "Responsive Design & Accessibilité",
        [
                {'text': '📱 Approche Mobile-First', 'size': 15, 'bold': True},
                {'text': "J'ai développé le site en commençant par la version mobile, puis adapté progressivement pour les écrans plus larges.", 'size': 13},
                '',
                {'text': 'TailwindCSS - Breakpoints utilisés :', 'size': 14, 'bold': True},
                {'text': 'sm: (640px)  → Petits écrans', 'size': 12, 'code': True, 'level': 1},
                {'text': 'md: (768px)  → Tablettes', 'size': 12, 'code': True, 'level': 1},
                {'text': 'lg: (1024px) → Desktop', 'size': 12, 'code': True, 'level': 1},
                {'text': 'xl: (1280px) → Large desktop', 'size': 12, 'code': True, 'level': 1},
                '',
                {'text': '♿ Accessibilité (WCAG)', 'size': 15, 'bold': True},
                {'text': "Balises sémantiques HTML5 (header, nav, main, article, section)", 'size': 12},
                {'text': "Attributs alt sur toutes les images", 'size': 12},
                {'text': "Contraste de couleurs conforme aux normes AA", 'size': 12},
                {'text': "Navigation au clavier fonctionnelle", 'size': 12},
                {'text': "Attributs ARIA pour les éléments interactifs", 'size': 12},
        ],
        COLOR_APD
)

add_content_slide(
        "Compétences Frontend Démontrées - APD",
        [
                {'text': '✅ Attendus TP DWWM - Frontend (Projet APD)', 'size': 17, 'bold': True},
                '',
                {'text': '2. Réaliser une interface utilisateur web statique et adaptable', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "✓ HTML5 sémantique avec Next.js/React", 'size': 12},
                {'text': "✓ CSS moderne avec TailwindCSS", 'size': 12},
                {'text': "✓ Design responsive mobile-first", 'size': 12},
                {'text': "✓ Accessibilité WCAG 2.1 niveau AA", 'size': 12},
                '',
                {'text': '3. Développer une interface utilisateur web dynamique', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "✓ React 19 avec composants fonctionnels et hooks", 'size': 12},
                {'text': "✓ Gestion d'état avec useState/useEffect", 'size': 12},
                {'text': "✓ Hooks personnalisés réutilisables", 'size': 12},
                {'text': "✓ Animations et interactions fluides (GSAP, Lenis)", 'size': 12},
                '',
                {'text': '4. Réaliser une interface avec solution de gestion de contenu', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "✓ Intégration complète avec Strapi CMS headless", 'size': 12},
                {'text': "✓ Consommation API REST avec fetch", 'size': 12},
                {'text': "✓ Optimisation cache et revalidation Next.js", 'size': 12},
        ],
        COLOR_APD
)

add_section_divider("MAQUETTAGE - PROJET COOLBOOKING (Front)", 2, COLOR_APD)

add_content_slide(
        "Projet CoolBooking - Contexte",
        [
                {'text': '📋 Présentation du projet fil-rouge', 'size': 16, 'bold': True, 'color': COLOR_APD},
                {'text': "CoolBooking est mon projet personnel (fil-rouge) développé parallèlement au stage.", 'size': 13},
                {'text': "Plateforme de mise en relation entre propriétaires et locataires de biens immobiliers.", 'size': 13},
                '',
                {'text': '🎯 Objectif pédagogique', 'size': 16, 'bold': True, 'color': COLOR_APD},
                {'text': "Ce projet me permet d'expérimenter des technologies complémentaires à celles utilisées en stage :", 'size': 13},
                {'text': "→ Base de données relationnelle MariaDB (vs PostgreSQL de Strapi)", 'size': 12, 'level': 1},
                {'text': "→ Backend Express custom (vs Strapi auto-généré)", 'size': 12, 'level': 1},
                {'text': "→ Authentification JWT personnalisée", 'size': 12, 'level': 1},
                {'text': "→ Architecture complète de A à Z", 'size': 12, 'level': 1},
                '',
                {'text': '💡 Pourquoi deux projets ?', 'size': 16, 'bold': True, 'color': COLOR_APD},
                {'text': "Le projet APD (stage) utilise Strapi imposé par l'agence. Pour démontrer ma maîtrise complète d'une base de données relationnelle et d'un backend custom, j'ai choisi de présenter CoolBooking pour la partie backend du dossier.", 'size': 13},
                '',
                {'text': "J'ai également expérimenté MongoDB sur ce projet, démontrant ma polyvalence entre bases relationnelles et NoSQL.", 'size': 13, 'bold': True},
        ],
        COLOR_APD
)

add_content_slide(
        "CoolBooking - Cahier des Charges",
        [
                {'text': '📝 Fonctionnalités principales', 'size': 16, 'bold': True},
                '',
                {'text': 'Pour les propriétaires :', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "✓ Inscription et création de profil", 'size': 12},
                {'text': "✓ Publication d'annonces de location avec photos", 'size': 12},
                {'text': "✓ Gestion de leurs annonces (CRUD complet)", 'size': 12},
                {'text': "✓ Messagerie pour échanger avec les locataires", 'size': 12},
                {'text': "✓ Consulter les biens disponibles en tant que locataire", 'size': 12},
                '',
                {'text': 'Pour les locataires :', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "✓ Inscription et profil", 'size': 12},
                {'text': "✓ Recherche et consultation des annonces", 'size': 12},
                {'text': "✓ Mise en favoris des annonces", 'size': 12},
                {'text': "✓ Messagerie avec les propriétaires", 'size': 12},
                '',
                {'text': 'Fonctionnalités transverses :', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "✓ Authentification sécurisée (JWT + cookies HttpOnly)", 'size': 12},
                {'text': "✓ Upload et stockage d'images (Cloudinary)", 'size': 12},
                {'text': "✓ Gestion de compte (modification profil, avatar)", 'size': 12},
                {'text': "✓ Responsive design mobile-first", 'size': 12},
        ],
        COLOR_APD
)

add_content_slide(
        "Maquettage Figma - Démarche",
        [
                {'text': '🎨 Processus de maquettage', 'size': 16, 'bold': True},
                '',
                {'text': "Pour CoolBooking, j'ai réalisé l'ensemble du maquettage sur Figma avant de développer l'application.", 'size': 13},
                '',
                {'text': '1. Analyse des besoins utilisateurs', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "Identification des parcours utilisateurs (propriétaire vs locataire)", 'size': 12},
                {'text': "Définition des fonctionnalités essentielles (MVP)", 'size': 12},
                '',
                {'text': '2. Wireframes basse fidélité', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "Esquisse de la structure des pages principales", 'size': 12},
                {'text': "Organisation de l'information et hiérarchie visuelle", 'size': 12},
                '',
                {'text': '3. Maquettes haute fidélité', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "Design des écrans desktop et mobile", 'size': 12},
                {'text': "Choix de la charte graphique (couleurs, typographie)", 'size': 12},
                {'text': "Création des composants réutilisables", 'size': 12},
                '',
                {'text': '4. Prototypage interactif', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "Liens entre les pages pour simuler la navigation", 'size': 12},
                {'text': "Test du parcours utilisateur", 'size': 12},
                '',
                {'text': '🔗 Lien Figma :', 'size': 14, 'bold': True},
                {'text': "https://www.figma.com/design/zY3c9cuy1BIWtWpgnjX2Sd/", 'size': 10, 'code': True},
        ],
        COLOR_APD
)

add_content_slide(
        "Charte Graphique CoolBooking",
        [
                {'text': '🎨 Identité visuelle', 'size': 16, 'bold': True},
                '',
                {'text': 'Palette de couleurs :', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "• Couleur principale : Bleu (#2563EB) - Confiance et professionnalisme", 'size': 12},
                {'text': "• Couleur secondaire : Orange (#F97316) - Chaleur et convivialité", 'size': 12},
                {'text': "• Couleur accent : Vert (#10B981) - Validation et succès", 'size': 12},
                {'text': "• Tons neutres : Gris (#64748B) - Équilibre et sobriété", 'size': 12},
                '',
                {'text': 'Typographie :', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "• Titres : Jockey One (caractère distinctif, mémorabilité)", 'size': 12},
                {'text': "• Corps de texte : Quicksand (lisibilité, modernité)", 'size': 12},
                {'text': "• Hiérarchie claire : H1 (32px), H2 (24px), Body (16px)", 'size': 12},
                '',
                {'text': 'Principes de design :', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "• Espacements généreux pour une lecture confortable", 'size': 12},
                {'text': "• Coins arrondis pour une apparence moderne et douce", 'size': 12},
                {'text': "• Ombres subtiles pour la profondeur et la hiérarchie", 'size': 12},
                {'text': "• Boutons CTA bien visibles avec hover effects", 'size': 12},
                {'text': "• Images en pleine largeur pour valoriser les biens", 'size': 12},
        ],
        COLOR_APD
)

add_content_slide(
        "Maquettes Figma - Pages d'Authentification",
        [
                {'text': "🔐 Écrans d'inscription et connexion", 'size': 16, 'bold': True},
                '',
                {'text': 'Page Inscription :', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "• Formulaire en deux colonnes : infos personnelles + photo profil", 'size': 12},
                {'text': "• Choix du rôle (propriétaire/locataire) avec explications", 'size': 12},
                {'text': "• Upload d'avatar avec prévisualisation en temps réel", 'size': 12},
                {'text': "• Validation côté client avec messages d'erreur clairs", 'size': 12},
                {'text': "• Design épuré pour faciliter la conversion", 'size': 12},
                '',
                {'text': 'Page Connexion :', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "• Formulaire minimaliste (email + mot de passe)", 'size': 12},
                {'text': "• Bouton CTA bien visible", 'size': 12},
                {'text': "• Lien vers inscription pour les nouveaux utilisateurs", 'size': 12},
                '',
                {'text': '💡 Choix UX :', 'size': 14, 'bold': True},
                {'text': "J'ai opté pour un processus d'inscription en une seule étape pour limiter la friction. Le choix du rôle déclenche une modal explicative pour guider l'utilisateur.", 'size': 12},
        ],
        COLOR_APD
)

add_content_slide(
        "Compétences Maquettage Démontrées",
        [
                {'text': '✅ Attendus TP DWWM - Maquettage (Projet CoolBooking)', 'size': 16, 'bold': True},
                '',
                {'text': '1. Maquetter une application', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "✓ Utilisation professionnelle de Figma", 'size': 12},
                {'text': "✓ Création de wireframes et maquettes haute fidélité", 'size': 12},
                {'text': "✓ Prototypage interactif avec navigation", 'size': 12},
                {'text': "✓ Design system avec composants réutilisables", 'size': 12},
                '',
                {'text': '2. Conception centrée utilisateur', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "✓ Analyse des besoins et personas (propriétaire/locataire)", 'size': 12},
                {'text': "✓ Définition des parcours utilisateurs (user flows)", 'size': 12},
                {'text': "✓ Hiérarchie de l'information claire et intuitive", 'size': 12},
                {'text': "✓ Accessibilité et utilisabilité au cœur du design", 'size': 12},
                '',
                {'text': '3. Responsive design', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "✓ Maquettes desktop (1920px) et mobile (375px)", 'size': 12},
                {'text': "✓ Adaptation des layouts et composants", 'size': 12},
                {'text': "✓ Interactions tactiles optimisées", 'size': 12},
                '',
                {'text': '4. Charte graphique cohérente', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "✓ Palette de couleurs réfléchie et harmonieuse", 'size': 12},
                {'text': "✓ Typographie lisible et hiérarchisée", 'size': 12},
                {'text': "✓ Cohérence visuelle sur toutes les pages", 'size': 12},
        ],
        COLOR_APD
)

add_content_slide(
        "Bilan - Partie Frontend & Maquettage",
        [
                {'text': '🎯 Objectifs atteints', 'size': 17, 'bold': True},
                '',
                {'text': 'Projet APD (Stage UFO Agency) :', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "✓ Site vitrine moderne et performant pour l'association", 'size': 12},
                {'text': "✓ Interface d'administration Strapi opérationnelle", 'size': 12},
                {'text': "✓ Optimisations performance (images, code splitting, SSR)", 'size': 12},
                {'text': "✓ Design responsive et accessible", 'size': 12},
                '',
                {'text': 'Projet CoolBooking (Fil-rouge) :', 'size': 14, 'bold': True, 'color': COLOR_APD},
                {'text': "✓ Maquettage complet sur Figma (desktop + mobile)", 'size': 12},
                {'text': "✓ Design system avec composants réutilisables", 'size': 12},
                {'text': "✓ Parcours utilisateurs optimisés", 'size': 12},
                '',
                {'text': '💪 Points forts démontrés', 'size': 17, 'bold': True},
                {'text': "• Maîtrise de Next.js 15 (App Router, SSR, ISR)", 'size': 12},
                {'text': "• Utilisation avancée des hooks React", 'size': 12},
                {'text': "• Compétences en maquettage Figma professionnel", 'size': 12},
                {'text': "• Approche UX réfléchie et centrée utilisateur", 'size': 12},
                {'text': "• Code propre, maintenable et documenté", 'size': 12},
                '',
                {'text': '📚 Apprentissages clés', 'size': 17, 'bold': True},
                {'text': "• Architecture headless CMS avec Strapi", 'size': 12},
                {'text': "• Optimisations performance web", 'size': 12},
                {'text': "• Design thinking et méthodologie de maquettage", 'size': 12},
                {'text': "• Gestion de projet en contexte professionnel", 'size': 12},
        ],
        COLOR_APD
)

# =================== COOLBOOKING Backend (22 slides) ===================
add_section_divider("PARTIE COOLBOOKING — Backend", 3, COLOR_COOL)

add_content_slide(
        "Développement Backend - CoolBooking",
        [
                {'text': '🎯 Contexte du projet backend', 'size': 16, 'bold': True, 'color': COLOR_COOL},
                {'text': "Pour la partie backend de ce dossier, j'utilise le projet CoolBooking avec une base de données relationnelle MariaDB.", 'size': 13},
                '',
                {'text': '💡 Pourquoi CoolBooking pour le backend ?', 'size': 16, 'bold': True, 'color': COLOR_COOL},
                {'text': "Le projet APD (stage) utilise Strapi qui génère automatiquement l'API REST. Pour démontrer ma capacité à développer un backend complet de A à Z, j'ai choisi de présenter CoolBooking où j'ai implémenté :", 'size': 13},
                {'text': "→ Architecture backend Express personnalisée", 'size': 12, 'level': 1},
                {'text': "→ Base de données relationnelle MariaDB avec modélisation", 'size': 12, 'level': 1},
                {'text': "→ Système d'authentification JWT complet", 'size': 12, 'level': 1},
                {'text': "→ Repository pattern pour l'abstraction des données", 'size': 12, 'level': 1},
                {'text': "→ Validation des données avec Joi", 'size': 12, 'level': 1},
                {'text': "→ Upload de fichiers avec Cloudinary", 'size': 12, 'level': 1},
                '',
                {'text': '📋 Rappel du projet', 'size': 16, 'bold': True, 'color': COLOR_COOL},
                {'text': "Plateforme de location immobilière mettant en relation propriétaires et locataires.", 'size': 13},
                {'text': "Fonctionnalités : Authentification, Gestion annonces, Upload images, Messagerie, Favoris.", 'size': 13},
        ],
        COLOR_COOL
)

add_content_slide(
        "Stack Technique Backend",
        [
                {'text': '🛠️ Technologies et outils utilisés', 'size': 17, 'bold': True},
                '',
                {'text': 'Express.js 5', 'size': 15, 'bold': True, 'color': COLOR_COOL},
                {'text': "Framework Node.js minimaliste et flexible", 'size': 12},
                {'text': "Gestion des routes, middlewares et controllers", 'size': 12},
                '',
                {'text': 'MariaDB', 'size': 15, 'bold': True, 'color': COLOR_COOL},
                {'text': "Base de données relationnelle (fork de MySQL)", 'size': 12},
                {'text': "Pilote mysql2 pour Node.js avec Promises", 'size': 12},
                {'text': "Connection pooling pour les performances", 'size': 12},
                '',
                {'text': 'JWT (JSON Web Tokens)', 'size': 15, 'bold': True, 'color': COLOR_COOL},
                {'text': "Authentification stateless avec tokens", 'size': 12},
                {'text': "Stockage sécurisé dans cookies HttpOnly", 'size': 12},
                '',
                {'text': 'Argon2', 'size': 15, 'bold': True, 'color': COLOR_COOL},
                {'text': "Algorithme de hachage moderne pour les mots de passe", 'size': 12},
                {'text': "Plus sécurisé que bcrypt (vainqueur Password Hashing Competition)", 'size': 12},
                '',
                {'text': 'Joi', 'size': 15, 'bold': True, 'color': COLOR_COOL},
                {'text': "Validation des données côté serveur", 'size': 12},
                {'text': "Schemas de validation réutilisables", 'size': 12},
                '',
                {'text': 'Cloudinary + Multer', 'size': 15, 'bold': True, 'color': COLOR_COOL},
                {'text': "Upload et stockage d'images dans le cloud", 'size': 12},
                {'text': "Multer pour la gestion multipart/form-data", 'size': 12},
        ],
        COLOR_COOL
)

add_content_slide(
        "Architecture Backend - Organisation",
        [
                {'text': "📁 Structure du projet backend", 'size': 16, 'bold': True},
                {'text': "J'ai organisé le backend selon le pattern MVC + Repository :", 'size': 13},
                '',
                {'text': 'back-coolbooking-mariaDB/', 'size': 13, 'bold': True, 'code': True},
                {'text': '├── app.js                    → Point d\'entrée', 'size': 11, 'code': True, 'level': 1},
                {'text': '├── routes/', 'size': 11, 'code': True, 'level': 1},
                {'text': '│   ├── users.router.js       → Routes utilisateurs', 'size': 11, 'code': True, 'level': 2},
                {'text': '│   └── rentals.router.js     → Routes annonces', 'size': 11, 'code': True, 'level': 2},
                {'text': '├── users/', 'size': 11, 'code': True, 'level': 1},
                {'text': '│   ├── users.controller.js   → Logique métier', 'size': 11, 'code': True, 'level': 2},
                {'text': '│   ├── users.service.js      → Services métier', 'size': 11, 'code': True, 'level': 2},
                {'text': '│   └── users.repository.js   → Accès base de données', 'size': 11, 'code': True, 'level': 2},
                {'text': '├── rentals/', 'size': 11, 'code': True, 'level': 1},
                {'text': '│   ├── rentals.controller.js', 'size': 11, 'code': True, 'level': 2},
                {'text': '│   ├── rentals.service.js', 'size': 11, 'code': True, 'level': 2},
                {'text': '│   └── rentals.repository.js', 'size': 11, 'code': True, 'level': 2},
                {'text': '├── authentication/', 'size': 11, 'code': True, 'level': 1},
                {'text': '│   └── authentication.js     → JWT & Argon2', 'size': 11, 'code': True, 'level': 2},
                {'text': '├── validation/', 'size': 11, 'code': True, 'level': 1},
                {'text': '│   └── users.validation.js   → Schemas Joi', 'size': 11, 'code': True, 'level': 2},
                {'text': '└── config/', 'size': 11, 'code': True, 'level': 1},
                {'text': '    ├── db.js                 → Connexion MariaDB', 'size': 11, 'code': True, 'level': 2},
                {'text': '    └── cloudinary.js         → Config Cloudinary', 'size': 11, 'code': True, 'level': 2},
        ],
        COLOR_COOL
)

add_code_slide(
        "Point d'Entrée - app.js",
        """// app.js
import dotenv from "dotenv";
import express from "express";
import users_router from "./routes/users.router.js";
import rentals_router from "./routes/rentals.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000;

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/users", users_router);
app.use("/rentals", rentals_router);

// Middleware de gestion d'erreurs global
app.use((err, req, res, next) => {
    console.error("Erreur attrapée :", err.message);
    res.status(400).json({ message: err.message });
});

app.listen(port, () => {
    console.log("localhost connected");
});""",
        "Serveur Express structuré avec middlewares globaux, routes modulaires et gestion d'erreurs centralisée.",
        COLOR_COOL
)

add_section_divider("BASE DE DONNÉES MARIADB", 4, COLOR_COOL)

add_code_slide(
        "Configuration Base de Données",
        """// config/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// Connection pool pour optimiser les performances
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10,
});

// Fonction utilitaire pour toutes les requêtes SQL
export async function query(sql, params = []) {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log("Connexion à la base établie avec succès");

        const [rows] = await conn.query(sql, params);
        return [rows];
    } catch (err) {
        console.error(
            "Erreur lors de la connexion ou de la requête :",
            err.message
        );
        throw err;
    } finally {
        if (conn) conn.release();
    }
}""",
        "Pool de connexions et fonction query() réutilisable pour toutes les opérations SQL.",
        COLOR_COOL
)

add_content_slide(
        "Modélisation Base de Données",
        [
                {'text': '📊 Schéma de la base de données', 'size': 16, 'bold': True},
                '',
                {'text': 'Table users :', 'size': 14, 'bold': True, 'color': COLOR_COOL},
                {'text': 'id (INT, AUTO_INCREMENT, PRIMARY KEY)', 'size': 11, 'code': True, 'level': 1},
                {'text': 'avatar (VARCHAR) - URL Cloudinary', 'size': 11, 'code': True, 'level': 1},
                {'text': 'role (ENUM: owner, tenant)', 'size': 11, 'code': True, 'level': 1},
                {'text': 'name (VARCHAR)', 'size': 11, 'code': True, 'level': 1},
                {'text': 'firstname (VARCHAR)', 'size': 11, 'code': True, 'level': 1},
                {'text': 'phone (VARCHAR)', 'size': 11, 'code': True, 'level': 1},
                {'text': 'email (VARCHAR, UNIQUE)', 'size': 11, 'code': True, 'level': 1},
                {'text': 'password (VARCHAR) - Hash Argon2', 'size': 11, 'code': True, 'level': 1},
                {'text': 'created_at (TIMESTAMP)', 'size': 11, 'code': True, 'level': 1},
                {'text': 'updated_at (TIMESTAMP)', 'size': 11, 'code': True, 'level': 1},
                '',
                {'text': 'Table rentals :', 'size': 14, 'bold': True, 'color': COLOR_COOL},
                {'text': 'id (INT, AUTO_INCREMENT, PRIMARY KEY)', 'size': 11, 'code': True, 'level': 1},
                {'text': 'owner_id (INT, FOREIGN KEY → users.id)', 'size': 11, 'code': True, 'level': 1},
                {'text': 'title (VARCHAR)', 'size': 11, 'code': True, 'level': 1},
                {'text': 'description (TEXT)', 'size': 11, 'code': True, 'level': 1},
                {'text': 'address, city, zip_code (VARCHAR)', 'size': 11, 'code': True, 'level': 1},
                {'text': 'price (DECIMAL)', 'size': 11, 'code': True, 'level': 1},
                {'text': 'beds (INT)', 'size': 11, 'code': True, 'level': 1},
                {'text': 'images (JSON) - URLs Cloudinary', 'size': 11, 'code': True, 'level': 1},
                {'text': 'created_at, updated_at (TIMESTAMP)', 'size': 11, 'code': True, 'level': 1},
        ],
        COLOR_COOL
)

add_content_slide(
        "Repository Pattern - Principe",
        [
                {'text': '🏗️ Architecture en couches', 'size': 16, 'bold': True},
                '',
                {'text': "J'ai implémenté le Repository Pattern pour séparer la logique métier de l'accès aux données :", 'size': 13},
                '',
                {'text': '1. Controller (users.controller.js)', 'size': 14, 'bold': True, 'color': COLOR_COOL},
                {'text': "→ Gère les requêtes HTTP et les réponses", 'size': 12, 'level': 1},
                {'text': "→ Valide les données avec Joi", 'size': 12, 'level': 1},
                {'text': "→ Appelle les services métier", 'size': 12, 'level': 1},
                '',
                {'text': '2. Service (users.service.js)', 'size': 14, 'bold': True, 'color': COLOR_COOL},
                {'text': "→ Contient la logique métier", 'size': 12, 'level': 1},
                {'text': "→ Appelle le repository pour les données", 'size': 12, 'level': 1},
                {'text': "→ Transforme/enrichit les données", 'size': 12, 'level': 1},
                '',
                {'text': '3. Repository (users.repository.js)', 'size': 14, 'bold': True, 'color': COLOR_COOL},
                {'text': "→ Abstraction de l'accès aux données", 'size': 12, 'level': 1},
                {'text': "→ Exécute les requêtes SQL", 'size': 12, 'level': 1},
                {'text': "→ Retourne des objets JavaScript", 'size': 12, 'level': 1},
                '',
                {'text': '✅ Avantages :', 'size': 14, 'bold': True},
                {'text': "• Séparation des responsabilités (Single Responsibility Principle)", 'size': 12},
                {'text': "• Testabilité accrue (mock des repositories)", 'size': 12},
                {'text': "• Maintenance facilitée (changement de BDD plus simple)", 'size': 12},
        ],
        COLOR_COOL
)

add_code_slide(
        "Repository Pattern - users.repository.js",
        """// users/users.repository.js
import { query } from "../config/db.js";

const validRoles = ["owner", "tenant"];

class UserRepository {
    async getAllUsers() {
        const [rows] = await query(
            "SELECT id, avatar, role, name, firstname, phone, email FROM users"
        );
        return rows;
    }

    async getUserById(id) {
        const [rows] = await query(
            "SELECT id, avatar, role, name, firstname, phone, email FROM users WHERE id = ?",
            [id]
        );
        return rows[0];
    }

    async createUser({ avatar, role, name, firstname, phone, email, password }) {
        // Vérification email unique
        const [existing] = await query("SELECT id FROM users WHERE email = ?", [email]);
        if (existing.length) throw new Error("Email déjà utilisé");

        const [result] = await query(
            "INSERT INTO users (avatar, role, name, firstname, phone, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [avatar, role, name, firstname, phone, email, password]
        );

        return {
            id: Number(result.insertId),
            avatar, role, name, firstname, phone, email,
            created_at: new Date(),
            updated_at: new Date(),
        };
    }

    async updateUser(id, update) {
        const fields = [];
        const values = [];

        for (const key in update) {
            fields.push(`${key} = ?`);
            values.push(update[key]);
        }
        values.push(id);

        const [result] = await query(
            `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
            values
        );

        return result.affectedRows ? await this.getUserById(id) : null;
    }

    async deleteUser(id) {
        const [result] = await query("DELETE FROM users WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
}

export default new UserRepository();""",
        "Le repository encapsule toutes les opérations SQL liées aux utilisateurs. Il utilise des requêtes paramétrées pour éviter les injections SQL.",
        COLOR_COOL
)

add_section_divider("AUTHENTIFICATION & SÉCURITÉ", 5, COLOR_COOL)

add_code_slide(
        "Authentification JWT - Connexion",
        """// authentication/authentication.js
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { query } from "../config/db.js";

// Vérifie les identifiants et renvoie un token + infos utilisateur
export async function verifyPassword(req, res) {
    try {
        const { email, password } = req.body;

        const [rows] = await query("SELECT * FROM users WHERE email = ?", [email]);
        const user = rows[0];

        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé" });
        }

        // Vérification du mot de passe avec Argon2
        const isValid = await argon2.verify(user.password, password);

        if (!isValid) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        // Génération du token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        // Envoi du token dans un cookie HttpOnly (protection XSS)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        // Réponse avec les infos utilisateur (sans mot de passe)
        res.status(200).json({
            id: user.id,
            firstname: user.firstname,
            role: user.role,
            avatar: user.avatar,
        });
    } catch (err) {
        console.error("Erreur dans verifyPassword :", err.message);
        res.status(500).json({ message: "Erreur interne" });
    }
}""",
        "Authentification avec JWT stocké en cookie HttpOnly et vérification Argon2.",
        COLOR_COOL
)

add_code_slide(
        "Middleware de Protection - verifyToken",
        """// authentication/authentication.js (suite)

// Vérifie le token JWT dans les cookies
export async function verifyToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("Accès interdit, token manquant.");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const [rows] = await query("SELECT firstname FROM users WHERE id = ?", [
            decoded.id,
        ]);
        const user = rows[0];

        if (!user) {
            return res.status(401).send("Utilisateur non trouvé ou supprimé.");
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Erreur lors de la vérification du token :", err.message);
        return res.status(403).send("Token invalide ou expiré.");
    }
}

// Déconnecte l'utilisateur en supprimant le cookie
export async function clearCookie(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
    });
    res.status(200).send("Utilisateur déconnecté");
}""",
        "Le middleware verifyToken protège les routes privées et expose l'utilisateur sur req.user.",
        COLOR_COOL
)

add_code_slide(
        "Validation des Données - Joi",
        """// validation/users.validation.js
import Joi from "joi";

const validRoles = ["owner", "tenant"];

export const createUserSchema = Joi.object({
    avatar: Joi.string().uri().optional().messages({
        "string.uri": "L'URL de l'avatar n'est pas valide",
    }),

    role: Joi.string()
        .valid(...validRoles)
        .required()
        .messages({
            "any.required": "Le rôle est requis",
            "any.only": `Le rôle doit être soit : ${validRoles.join(" ou ")}`,
        }),

    name: Joi.string().min(2).max(30).required().messages({
        "string.min": "Le nom doit contenir au moins 2 caractères",
        "any.required": "Le nom est requis",
    }),

    email: Joi.string().email().required().messages({
        "string.email": "L'adresse e-mail doit être valide",
        "any.required": "L'e-mail est requis",
    }),

    password: Joi.string().min(6).required().messages({
        "string.min": "Le mot de passe doit contenir au moins 6 caractères",
        "any.required": "Le mot de passe est requis",
    }),

    confirmpassword: Joi.string().valid(Joi.ref("password")).messages({
        "any.only": "Les mots de passe doivent correspondre",
    }),
});""",
        "Schemas Joi réutilisables et messages d'erreur explicites.",
        COLOR_COOL
)

add_code_slide(
        "Controller - users.controller.js",
        """// users/users.controller.js
import userService from "./users.service.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import { createUserSchema, updateUserSchema } from "../validation/users.validation.js";

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    createUser = async (req, res, next) => {
        try {
            // Validation Joi
            const { error } = createUserSchema.validate(req.body);
            if (error) throw new Error("Validation échouée : " + error.details[0].message);

            let avatarUrl;

            // Upload avatar sur Cloudinary si présent
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "avatars",
                    transformation: [{ width: 300, height: 300, crop: "fill" }],
                });
                avatarUrl = result.secure_url;
                fs.unlinkSync(req.file.path); // Supprimer fichier temporaire
            } else {
                avatarUrl = "https://res.cloudinary.com/.../default.png";
            }

            const userData = {
                ...req.body,
                avatar: avatarUrl,
            };

            const newUser = await this.userService.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    };

    // Autres méthodes: getAllUsers, getUserById, updateUser, deleteUser...
}

export default new UserController(userService);""",
        "Le controller orchestre validation, upload et délègue au service.",
        COLOR_COOL
)

add_code_slide(
        "Routes - users.router.js",
        """// routes/users.router.js
import express from "express";
import multer from "multer";
import userController from "../users/users.controller.js";
import {
    verifyToken,
    verifyPassword,
    clearCookie,
} from "../authentication/authentication.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // stockage temporaire

// Route protégée - nécessite authentification
router.get("/dashboard", verifyToken, (req, res) => {
    res.send(`Bienvenue dans votre espace, ${req.user.firstname}`);
});

// Routes publiques
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/register", upload.single("avatar"), userController.createUser);
router.post("/login", upload.none(), verifyPassword);
router.post("/logout", clearCookie);

// Routes protégées
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;""",
        "Routes avec middlewares (multer, verifyToken) et endpoints auth.",
        COLOR_COOL
)

add_content_slide(
        "Upload de Fichiers - Cloudinary",
        [
                {'text': "☁️ Gestion des images", 'size': 16, 'bold': True},
                '',
                {'text': "Architecture de l'upload :", 'size': 14, 'bold': True, 'color': COLOR_COOL},
                {'text': "1. Multer reçoit le fichier (multipart/form-data)", 'size': 12},
                {'text': "2. Stockage temporaire dans /uploads/", 'size': 12},
                {'text': "3. Upload vers Cloudinary avec transformations", 'size': 12},
                {'text': "4. Suppression du fichier temporaire", 'size': 12},
                {'text': "5. Stockage de l'URL Cloudinary en base de données", 'size': 12},
                '',
                {'text': 'Avantages Cloudinary :', 'size': 14, 'bold': True, 'color': COLOR_COOL},
                {'text': "✓ CDN mondial pour chargement rapide", 'size': 12},
                {'text': "✓ Transformations automatiques (resize, crop, format)", 'size': 12},
                {'text': "✓ Optimisation automatique des images (compression, WebP)", 'size': 12},
                {'text': "✓ Pas de stockage sur le serveur", 'size': 12},
                {'text': "✓ URL HTTPS sécurisées", 'size': 12},
                '',
                {'text': "Exemple d'URL", 'size': 14, 'bold': True},
                {'text': 'https://res.cloudinary.com/dwkyezu2u/image/upload/v1745506223/avatars/user_123.jpg', 'size': 10, 'code': True},
        ],
        COLOR_COOL
)

add_content_slide(
        "Sécurité Backend - Bonnes Pratiques",
        [
                {'text': '🔒 Mesures implémentées', 'size': 16, 'bold': True},
                '',
                {'text': '1. Protection des mots de passe', 'size': 14, 'bold': True, 'color': COLOR_COOL},
                {'text': "✓ Hachage Argon2 — jamais de clair en base", 'size': 12},
                {'text': "✓ Jamais renvoyés dans les réponses API", 'size': 12},
                '',
                {'text': '2. Authentification JWT', 'size': 14, 'bold': True, 'color': COLOR_COOL},
                {'text': "✓ Cookies HttpOnly (XSS)", 'size': 12},
                {'text': "✓ SameSite: Strict (CSRF)", 'size': 12},
                {'text': "✓ Expiration 1 jour", 'size': 12},
                '',
                {'text': '3. Injection SQL', 'size': 14, 'bold': True, 'color': COLOR_COOL},
                {'text': "✓ Requêtes paramétrées", 'size': 12},
                '',
                {'text': '4. Validation des données', 'size': 14, 'bold': True, 'color': COLOR_COOL},
                {'text': "✓ Joi côté serveur", 'size': 12},
                '',
                {'text': "5. Variables d'environnement", 'size': 14, 'bold': True, 'color': COLOR_COOL},
                {'text': "✓ Secrets dans .env (JWT_SECRET, DB_*)", 'size': 12},
        ],
        COLOR_COOL
)

add_content_slide(
        "Compétences Backend Démontrées",
        [
                {'text': '✅ Attendus TP DWWM - Backend (Projet CoolBooking)', 'size': 17, 'bold': True},
                '',
                {'text': '1. Créer une base de données', 'size': 14, 'bold': True, 'color': COLOR_COOL},
                {'text': "✓ Modélisation relationnelle (users, rentals)", 'size': 12},
                {'text': "✓ Types appropriés + contraintes", 'size': 12},
                '',
                {'text': "2. Développer les composants d'accès aux données", 'size': 14, 'bold': True, 'color': COLOR_COOL},
                {'text': "✓ Repository pattern", 'size': 12},
                {'text': "✓ Requêtes paramétrées", 'size': 12},
                '',
                {'text': '3. Développer une interface API', 'size': 14, 'bold': True, 'color': COLOR_COOL},
                {'text': "✓ Express + middlewares (auth, validation, upload)", 'size': 12},
                '',
                {'text': '4. Mettre en œuvre la sécurité', 'size': 14, 'bold': True, 'color': COLOR_COOL},
                {'text': "✓ JWT HttpOnly, Argon2, Joi, CORS", 'size': 12},
        ],
        COLOR_COOL
)

add_content_slide(
        "Bilan - Partie Backend",
        [
                {'text': '🎯 Objectifs atteints', 'size': 17, 'bold': True},
                '',
                {'text': 'Backend CoolBooking (MariaDB) :', 'size': 14, 'bold': True, 'color': COLOR_COOL},
                {'text': "✓ API REST complète et fonctionnelle", 'size': 12},
                {'text': "✓ Base de données relationnelle bien modélisée", 'size': 12},
                {'text': "✓ Authentification JWT sécurisée", 'size': 12},
                {'text': "✓ Architecture propre et maintenable (Repository pattern)", 'size': 12},
                {'text': "✓ Upload d'images avec Cloudinary", 'size': 12},
                '',
                {'text': '💪 Points forts démontrés', 'size': 17, 'bold': True},
                {'text': "• Node.js/Express", 'size': 12},
                {'text': "• SQL et bases relationnelles", 'size': 12},
                {'text': "• Sécurité (JWT, Argon2, validation)", 'size': 12},
                {'text': "• Architecture logicielle (SoC)", 'size': 12},
                {'text': "• Code propre et documenté", 'size': 12},
        ],
        COLOR_COOL
)

# =================== Conclusion ===================
add_section_divider("CONCLUSION", 6, COLOR_APD)

add_content_slide(
        "Synthèse & Code Couleur",
        [
                {'text': 'APD (rouge #ac1115) — Frontend + Strapi', 'size': 13, 'bold': True, 'color': COLOR_APD},
                {'text': 'CoolBooking (brun #a47764) — Backend MariaDB', 'size': 13, 'bold': True, 'color': COLOR_COOL},
                {'text': 'Design clair : Segoe UI, en-têtes colorés, blocs code lisibles.', 'size': 13},
                {'text': 'Contenu intégral des deux dossiers conservé et unifié.', 'size': 13},
        ],
        COLOR_APD
)

# Sauvegarde
prs.save('DOSSIER_TP_DWWM_COMPLET_CLAIR.pptx')
print("✅ Dossier complet (clair) généré : DOSSIER_TP_DWWM_COMPLET_CLAIR.pptx")
print(f"📊 Nombre de slides : {len(prs.slides)}")
print("📐 Format : A4 vertical")
print("🎨 Code couleur: APD=#ac1115, CoolBooking=#a47764 (fond clair)")

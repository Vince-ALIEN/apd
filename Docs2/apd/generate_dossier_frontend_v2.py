from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

# Créer présentation A4 vertical (210x297mm = 8.27x11.69 inches)
prs = Presentation()
prs.slide_width = Inches(8.27)
prs.slide_height = Inches(11.69)

# Couleurs modernes
COLOR_PRIMARY = RGBColor(26, 115, 232)  # Bleu moderne
COLOR_SECONDARY = RGBColor(52, 168, 83)  # Vert
COLOR_ACCENT = RGBColor(234, 67, 53)  # Rouge accent
COLOR_DARK = RGBColor(32, 33, 36)  # Gris foncé
COLOR_LIGHT = RGBColor(248, 249, 250)  # Gris clair
COLOR_TEXT = RGBColor(60, 64, 67)  # Gris texte

def add_title_slide(title, subtitle=""):
    """Crée une slide de titre moderne"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    
    # Fond dégradé simulé avec formes
    bg1 = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE,
        Inches(0), Inches(0),
        Inches(8.27), Inches(5.85)
    )
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = COLOR_PRIMARY
    bg1.line.fill.background()
    
    bg2 = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE,
        Inches(0), Inches(5.85),
        Inches(8.27), Inches(5.84)
    )
    bg2.fill.solid()
    bg2.fill.fore_color.rgb = COLOR_DARK
    bg2.line.fill.background()
    
    # Accent décoratif
    accent = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE,
        Inches(0.5), Inches(4.5),
        Inches(1), Inches(0.15)
    )
    accent.fill.solid()
    accent.fill.fore_color.rgb = COLOR_ACCENT
    accent.line.fill.background()
    
    # Titre
    title_box = slide.shapes.add_textbox(
        Inches(0.5), Inches(2.5),
        Inches(7.27), Inches(2.5)
    )
    title_frame = title_box.text_frame
    title_frame.word_wrap = True
    title_frame.vertical_anchor = 1  # Middle
    p = title_frame.paragraphs[0]
    p.text = title
    p.font.name = 'Segoe UI'
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = RGBColor(255, 255, 255)
    p.alignment = PP_ALIGN.CENTER
    p.line_spacing = 1.2
    
    # Sous-titre
    if subtitle:
        subtitle_box = slide.shapes.add_textbox(
            Inches(0.8), Inches(7),
            Inches(6.67), Inches(2)
        )
        subtitle_frame = subtitle_box.text_frame
        subtitle_frame.word_wrap = True
        for i, line in enumerate(subtitle.split('\n')):
            if i > 0:
                p = subtitle_frame.add_paragraph()
            else:
                p = subtitle_frame.paragraphs[0]
            p.text = line
            p.font.name = 'Segoe UI Light'
            p.font.size = Pt(16)
            p.font.color.rgb = RGBColor(255, 255, 255)
            p.alignment = PP_ALIGN.CENTER
            p.space_after = Pt(8)
    
    return slide

def add_content_slide(title, content_items, color=None):
    """Crée une slide avec titre et contenu moderne"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    
    if color is None:
        color = COLOR_PRIMARY
    
    # Barre de titre avec ombre
    title_shape = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE,
        Inches(0), Inches(0),
        Inches(8.27), Inches(1)
    )
    title_shape.fill.solid()
    title_shape.fill.fore_color.rgb = color
    title_shape.line.fill.background()
    
    # Petit accent décoratif
    accent = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE,
        Inches(0), Inches(0.95),
        Inches(8.27), Inches(0.05)
    )
    accent.fill.solid()
    accent.fill.fore_color.rgb = COLOR_ACCENT
    accent.line.fill.background()
    
    title_box = slide.shapes.add_textbox(
        Inches(0.5), Inches(0.2),
        Inches(7.27), Inches(0.6)
    )
    title_frame = title_box.text_frame
    title_frame.vertical_anchor = 1
    p = title_frame.paragraphs[0]
    p.text = title
    p.font.name = 'Segoe UI Semibold'
    p.font.size = Pt(26)
    p.font.bold = True
    p.font.color.rgb = RGBColor(255, 255, 255)
    
    # Contenu
    content_box = slide.shapes.add_textbox(
        Inches(0.6), Inches(1.3),
        Inches(7.07), Inches(10)
    )
    text_frame = content_box.text_frame
    text_frame.word_wrap = True
    
    for i, item in enumerate(content_items):
        if i > 0:
            p = text_frame.add_paragraph()
        else:
            p = text_frame.paragraphs[0]
        
        if isinstance(item, dict):
            p.text = item.get('text', '')
            p.level = item.get('level', 0)
            p.font.name = 'Courier New' if item.get('code', False) else 'Segoe UI'
            p.font.size = Pt(item.get('size', 13))
            p.font.color.rgb = item.get('color', COLOR_TEXT)
            if item.get('bold', False):
                p.font.bold = True
        else:
            p.text = item
            p.font.name = 'Segoe UI'
            p.font.size = Pt(13)
            p.font.color.rgb = COLOR_TEXT
            p.level = 0
        
        p.space_after = Pt(8)
    
    return slide

def add_code_slide(title, code_text, description=""):
    """Crée une slide avec du code - style moderne"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    
    # Barre de titre
    title_shape = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE,
        Inches(0), Inches(0),
        Inches(8.27), Inches(1)
    )
    title_shape.fill.solid()
    title_shape.fill.fore_color.rgb = COLOR_DARK
    title_shape.line.fill.background()
    
    # Accent
    accent = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE,
        Inches(0), Inches(0.95),
        Inches(8.27), Inches(0.05)
    )
    accent.fill.solid()
    accent.fill.fore_color.rgb = COLOR_SECONDARY
    accent.line.fill.background()
    
    title_box = slide.shapes.add_textbox(
        Inches(0.5), Inches(0.2),
        Inches(7.27), Inches(0.6)
    )
    title_frame = title_box.text_frame
    title_frame.vertical_anchor = 1
    p = title_frame.paragraphs[0]
    p.text = title
    p.font.name = 'Segoe UI Semibold'
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = RGBColor(255, 255, 255)
    
    # Description
    y_pos = 1.2
    if description:
        desc_box = slide.shapes.add_textbox(
            Inches(0.6), Inches(y_pos),
            Inches(7.07), Inches(1)
        )
        desc_frame = desc_box.text_frame
        desc_frame.word_wrap = True
        p = desc_frame.paragraphs[0]
        p.text = description
        p.font.name = 'Segoe UI'
        p.font.size = Pt(12)
        p.font.color.rgb = COLOR_TEXT
        p.font.italic = True
        y_pos += 0.9
    
    # Bloc de code style VS Code
    code_box = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE,
        Inches(0.6), Inches(y_pos),
        Inches(7.07), Inches(11.69 - y_pos - 0.5)
    )
    code_box.fill.solid()
    code_box.fill.fore_color.rgb = RGBColor(30, 30, 30)  # Fond sombre
    code_box.line.color.rgb = RGBColor(60, 60, 60)
    code_box.line.width = Pt(1)
    
    code_text_box = slide.shapes.add_textbox(
        Inches(0.75), Inches(y_pos + 0.15),
        Inches(6.77), Inches(11.69 - y_pos - 0.8)
    )
    code_frame = code_text_box.text_frame
    code_frame.word_wrap = True
    p = code_frame.paragraphs[0]
    p.text = code_text
    p.font.name = 'Consolas'
    p.font.size = Pt(9)
    p.font.color.rgb = RGBColor(212, 212, 212)  # Texte clair
    p.line_spacing = 1.1
    
    return slide

def add_section_divider(section_title, section_number):
    """Crée une slide de séparation de section"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    
    # Fond dégradé
    bg = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE,
        Inches(0), Inches(0),
        Inches(8.27), Inches(11.69)
    )
    bg.fill.solid()
    bg.fill.fore_color.rgb = COLOR_DARK
    bg.line.fill.background()
    
    # Bande de couleur
    band = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE,
        Inches(0), Inches(5),
        Inches(8.27), Inches(1.69)
    )
    band.fill.solid()
    band.fill.fore_color.rgb = COLOR_PRIMARY
    band.line.fill.background()
    
    # Numéro de section
    number_box = slide.shapes.add_textbox(
        Inches(0.5), Inches(3),
        Inches(7.27), Inches(1.5)
    )
    number_frame = number_box.text_frame
    p = number_frame.paragraphs[0]
    p.text = f"0{section_number}"
    p.font.name = 'Segoe UI Light'
    p.font.size = Pt(120)
    p.font.color.rgb = RGBColor(80, 80, 80)
    p.alignment = PP_ALIGN.CENTER
    
    # Titre de section
    title_box = slide.shapes.add_textbox(
        Inches(0.5), Inches(5.3),
        Inches(7.27), Inches(1)
    )
    title_frame = title_box.text_frame
    title_frame.vertical_anchor = 1
    p = title_frame.paragraphs[0]
    p.text = section_title
    p.font.name = 'Segoe UI'
    p.font.size = Pt(40)
    p.font.bold = True
    p.font.color.rgb = RGBColor(255, 255, 255)
    p.alignment = PP_ALIGN.CENTER
    
    return slide

# ============= SLIDES =============

# Slide 1: Page de garde
add_title_slide(
    "DOSSIER PROJET\nTITRE PROFESSIONNEL\nDÉVELOPPEUR WEB ET WEB MOBILE",
    "PARTIE 1 : DÉVELOPPEMENT FRONTEND\n\nPhilippe BARBOSA\nNovembre 2025"
)

# Slide 2: Présentation personnelle
add_content_slide(
    "Présentation",
    [
        {'text': '👤 PHILIPPE BARBOSA', 'size': 18, 'bold': True, 'color': COLOR_PRIMARY},
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
    ]
)

# Slide 3: Séparateur section APD
add_section_divider("PROJET APD", 1)

# Slide 4: Introduction projet APD
add_content_slide(
    "Projet APD - Association Pour la Dignité",
    [
        {'text': '📋 Contexte du projet', 'size': 16, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "Projet réalisé lors de mon stage chez UFO Agency", 'size': 13},
        {'text': "Site vitrine pour une association humanitaire internationale", 'size': 13},
        {'text': "Maquette graphique déjà conçue en amont par l'équipe design", 'size': 13},
        '',
        {'text': '🎯 Objectifs fonctionnels', 'size': 16, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "✓ Présenter l'association, sa mission et ses actions", 'size': 13},
        {'text': "✓ Publier et gérer des articles d'actualité", 'size': 13},
        {'text': "✓ Diffuser des interviews vidéo", 'size': 13},
        {'text': "✓ Mettre en avant les partenaires", 'size': 13},
        {'text': "✓ Formulaire de contact fonctionnel", 'size': 13},
        '',
        {'text': '⚙️ Contraintes techniques imposées', 'size': 16, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "Utilisation obligatoire de Strapi CMS (choix de l'agence)", 'size': 13},
        {'text': "Respect strict du maquettage fourni", 'size': 13},
        {'text': "Performances élevées (Lighthouse score > 90)", 'size': 13},
        {'text': "Responsive design mobile-first", 'size': 13},
        {'text': "Accessibilité WCAG 2.1 niveau AA", 'size': 13},
    ]
)

# Slide 5: Stack technique frontend
add_content_slide(
    "Stack Technique Frontend - APD",
    [
        {'text': '🛠️ Technologies et outils utilisés', 'size': 17, 'bold': True},
        '',
        {'text': 'Next.js 15 (App Router)', 'size': 15, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "Framework React avec système de routing intégré", 'size': 12},
        {'text': "Server Components et Client Components", 'size': 12},
        {'text': "Rendu côté serveur (SSR) et génération statique (SSG)", 'size': 12},
        {'text': "Incremental Static Regeneration (ISR)", 'size': 12},
        '',
        {'text': 'React 19', 'size': 15, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "Bibliothèque JavaScript pour interfaces utilisateur réactives", 'size': 12},
        {'text': "Composants fonctionnels avec hooks modernes", 'size': 12},
        '',
        {'text': 'TailwindCSS', 'size': 15, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "Framework CSS utility-first pour un développement rapide", 'size': 12},
        {'text': "Design system cohérent et maintenable", 'size': 12},
        '',
        {'text': 'GSAP & Lenis', 'size': 15, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "Bibliothèque d'animations performantes (GSAP)", 'size': 12},
        {'text': "Smooth scroll pour une navigation fluide (Lenis)", 'size': 12},
        '',
        {'text': 'Cloudinary CDN', 'size': 15, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "Optimisation et diffusion des médias (images/vidéos)", 'size': 12},
    ],
    COLOR_DARK
)

# Slide 6: Architecture Next.js
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
    ]
)

# Slide 7: Page principale (code)
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
    "J'ai structuré la page d'accueil avec des imports dynamiques pour optimiser les performances. Le composant VideoBackground charge en priorité la vidéo d'arrière-plan."
)

# Slide 8: Composant VideoBackground
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
    "J'ai créé un composant qui gère l'affichage progressif de la vidéo avec une transition d'opacité pour améliorer l'expérience utilisateur."
)

# Slide 9: Hook personnalisé useSiteData
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
    "Hook personnalisé pour centraliser les appels API. J'ai implémenté un chargement prioritaire pour la vidéo et parallélisé les autres requêtes."
)

# Slide 10: Routing dynamique
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
    "Page dynamique pour afficher un article à partir de son slug. J'utilise generateMetadata pour le SEO et la revalidation incrémentale (ISR)."
)

# Slide 11: Strapi - Introduction
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
    ]
)

# Slide 12: Performance
add_content_slide(
    "Optimisations Performance - APD",
    [
        {'text': "⚡ Stratégies d'optimisation mises en place", 'size': 15, 'bold': True},
        '',
        {'text': '1. Images optimisées avec next/image', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "Redimensionnement automatique et lazy loading", 'size': 12},
        {'text': "Format WebP pour réduire la taille des fichiers", 'size': 12},
        {'text': "CDN Cloudinary pour un chargement rapide", 'size': 12},
        '',
        {'text': '2. Code splitting avec dynamic imports', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "Chargement différé des composants non critiques", 'size': 12},
        {'text': "Réduction du bundle JavaScript initial", 'size': 12},
        '',
        {'text': '3. Chargement prioritaire', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "Vidéo d'accueil chargée en priorité avec preload=\"auto\"", 'size': 12},
        {'text': "Hook useSiteData qui charge l'accueil en premier", 'size': 12},
        '',
        {'text': '4. Server-Side Rendering (SSR)', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "Pages générées côté serveur pour un meilleur SEO", 'size': 12},
        {'text': "Incremental Static Regeneration (revalidate: 60s)", 'size': 12},
    ]
)

# Slide 13: Responsive Design
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
    ]
)

# Slide 14: Compétences APD
add_content_slide(
    "Compétences Frontend Démontrées - APD",
    [
        {'text': '✅ Attendus TP DWWM - Frontend (Projet APD)', 'size': 17, 'bold': True},
        '',
        {'text': '2. Réaliser une interface utilisateur web statique et adaptable', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "✓ HTML5 sémantique avec Next.js/React", 'size': 12},
        {'text': "✓ CSS moderne avec TailwindCSS", 'size': 12},
        {'text': "✓ Design responsive mobile-first", 'size': 12},
        {'text': "✓ Accessibilité WCAG 2.1 niveau AA", 'size': 12},
        '',
        {'text': '3. Développer une interface utilisateur web dynamique', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "✓ React 19 avec composants fonctionnels et hooks", 'size': 12},
        {'text': "✓ Gestion d'état avec useState/useEffect", 'size': 12},
        {'text': "✓ Hooks personnalisés réutilisables", 'size': 12},
        {'text': "✓ Animations et interactions fluides (GSAP, Lenis)", 'size': 12},
        '',
        {'text': '4. Réaliser une interface avec solution de gestion de contenu', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "✓ Intégration complète avec Strapi CMS headless", 'size': 12},
        {'text': "✓ Consommation API REST avec fetch", 'size': 12},
        {'text': "✓ Optimisation cache et revalidation Next.js", 'size': 12},
    ]
)

# Slide 15: Séparateur section Maquettage
add_section_divider("MAQUETTAGE - PROJET COOLBOOKING", 2)

# Slide 16: Introduction CoolBooking
add_content_slide(
    "Projet CoolBooking - Contexte",
    [
        {'text': '📋 Présentation du projet fil-rouge', 'size': 16, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "CoolBooking est mon projet personnel (fil-rouge) développé parallèlement au stage.", 'size': 13},
        {'text': "Plateforme de mise en relation entre propriétaires et locataires de biens immobiliers.", 'size': 13},
        '',
        {'text': '🎯 Objectif pédagogique', 'size': 16, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "Ce projet me permet d'expérimenter des technologies complémentaires à celles utilisées en stage :", 'size': 13},
        {'text': "→ Base de données relationnelle MariaDB (vs PostgreSQL de Strapi)", 'size': 12, 'level': 1},
        {'text': "→ Backend Express custom (vs Strapi auto-généré)", 'size': 12, 'level': 1},
        {'text': "→ Authentification JWT personnalisée", 'size': 12, 'level': 1},
        {'text': "→ Architecture complète de A à Z", 'size': 12, 'level': 1},
        '',
        {'text': '💡 Pourquoi deux projets ?', 'size': 16, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "Le projet APD (stage) utilise Strapi imposé par l'agence. Pour démontrer ma maîtrise complète d'une base de données relationnelle et d'un backend custom, j'ai choisi de présenter CoolBooking pour la partie backend du dossier.", 'size': 13},
        '',
        {'text': "J'ai également expérimenté MongoDB sur ce projet, démontrant ma polyvalence entre bases relationnelles et NoSQL.", 'size': 13, 'bold': True},
    ]
)

# Slide 17: Cahier des charges CoolBooking
add_content_slide(
    "CoolBooking - Cahier des Charges",
    [
        {'text': '📝 Fonctionnalités principales', 'size': 16, 'bold': True},
        '',
        {'text': 'Pour les propriétaires :', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "✓ Inscription et création de profil", 'size': 12},
        {'text': "✓ Publication d'annonces de location avec photos", 'size': 12},
        {'text': "✓ Gestion de leurs annonces (CRUD complet)", 'size': 12},
        {'text': "✓ Messagerie pour échanger avec les locataires", 'size': 12},
        {'text': "✓ Consulter les biens disponibles en tant que locataire", 'size': 12},
        '',
        {'text': 'Pour les locataires :', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "✓ Inscription et profil", 'size': 12},
        {'text': "✓ Recherche et consultation des annonces", 'size': 12},
        {'text': "✓ Mise en favoris des annonces", 'size': 12},
        {'text': "✓ Messagerie avec les propriétaires", 'size': 12},
        '',
        {'text': 'Fonctionnalités transverses :', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "✓ Authentification sécurisée (JWT + cookies HttpOnly)", 'size': 12},
        {'text': "✓ Upload et stockage d'images (Cloudinary)", 'size': 12},
        {'text': "✓ Gestion de compte (modification profil, avatar)", 'size': 12},
        {'text': "✓ Responsive design mobile-first", 'size': 12},
    ]
)

# Slide 18: Maquettage Figma - Introduction
add_content_slide(
    "Maquettage Figma - Démarche",
    [
        {'text': '🎨 Processus de maquettage', 'size': 16, 'bold': True},
        '',
        {'text': "Pour CoolBooking, j'ai réalisé l'ensemble du maquettage sur Figma avant de développer l'application.", 'size': 13},
        '',
        {'text': '1. Analyse des besoins utilisateurs', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "Identification des parcours utilisateurs (propriétaire vs locataire)", 'size': 12},
        {'text': "Définition des fonctionnalités essentielles (MVP)", 'size': 12},
        '',
        {'text': '2. Wireframes basse fidélité', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "Esquisse de la structure des pages principales", 'size': 12},
        {'text': "Organisation de l'information et hiérarchie visuelle", 'size': 12},
        '',
        {'text': '3. Maquettes haute fidélité', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "Design des écrans desktop et mobile", 'size': 12},
        {'text': "Choix de la charte graphique (couleurs, typographie)", 'size': 12},
        {'text': "Création des composants réutilisables", 'size': 12},
        '',
        {'text': '4. Prototypage interactif', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "Liens entre les pages pour simuler la navigation", 'size': 12},
        {'text': "Test du parcours utilisateur", 'size': 12},
        '',
        {'text': '🔗 Lien Figma :', 'size': 14, 'bold': True},
        {'text': "https://www.figma.com/design/zY3c9cuy1BIWtWpgnjX2Sd/", 'size': 10, 'code': True},
    ]
)

# Slide 19: Charte graphique
add_content_slide(
    "Charte Graphique CoolBooking",
    [
        {'text': '🎨 Identité visuelle', 'size': 16, 'bold': True},
        '',
        {'text': 'Palette de couleurs :', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "• Couleur principale : Bleu (#2563EB) - Confiance et professionnalisme", 'size': 12},
        {'text': "• Couleur secondaire : Orange (#F97316) - Chaleur et convivialité", 'size': 12},
        {'text': "• Couleur accent : Vert (#10B981) - Validation et succès", 'size': 12},
        {'text': "• Tons neutres : Gris (#64748B) - Équilibre et sobriété", 'size': 12},
        '',
        {'text': 'Typographie :', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "• Titres : Jockey One (caractère distinctif, mémorabilité)", 'size': 12},
        {'text': "• Corps de texte : Quicksand (lisibilité, modernité)", 'size': 12},
        {'text': "• Hiérarchie claire : H1 (32px), H2 (24px), Body (16px)", 'size': 12},
        '',
        {'text': 'Principes de design :', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "• Espacements généreux pour une lecture confortable", 'size': 12},
        {'text': "• Coins arrondis pour une apparence moderne et douce", 'size': 12},
        {'text': "• Ombres subtiles pour la profondeur et la hiérarchie", 'size': 12},
        {'text': "• Boutons CTA bien visibles avec hover effects", 'size': 12},
        {'text': "• Images en pleine largeur pour valoriser les biens", 'size': 12},
    ]
)

# Slide 20: Maquettes principales (1/3)
add_content_slide(
    "Maquettes Figma - Pages d'Authentification",
    [
        {'text': '🔐 Écrans d\'inscription et connexion', 'size': 16, 'bold': True},
        '',
        {'text': 'Page Inscription :', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "• Formulaire en deux colonnes : infos personnelles + photo profil", 'size': 12},
        {'text': "• Choix du rôle (propriétaire/locataire) avec explications", 'size': 12},
        {'text': "• Upload d'avatar avec prévisualisation en temps réel", 'size': 12},
        {'text': "• Validation côté client avec messages d'erreur clairs", 'size': 12},
        {'text': "• Design épuré pour faciliter la conversion", 'size': 12},
        '',
        {'text': 'Page Connexion :', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "• Formulaire minimaliste (email + mot de passe)", 'size': 12},
        {'text': "• Bouton CTA bien visible", 'size': 12},
        {'text': "• Lien vers inscription pour les nouveaux utilisateurs", 'size': 12},
        '',
        {'text': '💡 Choix UX :', 'size': 14, 'bold': True},
        {'text': "J'ai opté pour un processus d'inscription en une seule étape pour limiter la friction. Le choix du rôle déclenche une modal explicative pour guider l'utilisateur.", 'size': 12},
    ]
)

# Slide 21: Compétences maquettage
add_content_slide(
    "Compétences Maquettage Démontrées",
    [
        {'text': '✅ Attendus TP DWWM - Maquettage (Projet CoolBooking)', 'size': 16, 'bold': True},
        '',
        {'text': '1. Maquetter une application', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "✓ Utilisation professionnelle de Figma", 'size': 12},
        {'text': "✓ Création de wireframes et maquettes haute fidélité", 'size': 12},
        {'text': "✓ Prototypage interactif avec navigation", 'size': 12},
        {'text': "✓ Design system avec composants réutilisables", 'size': 12},
        '',
        {'text': '2. Conception centrée utilisateur', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "✓ Analyse des besoins et personas (propriétaire/locataire)", 'size': 12},
        {'text': "✓ Définition des parcours utilisateurs (user flows)", 'size': 12},
        {'text': "✓ Hiérarchie de l'information claire et intuitive", 'size': 12},
        {'text': "✓ Accessibilité et utilisabilité au cœur du design", 'size': 12},
        '',
        {'text': '3. Responsive design', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "✓ Maquettes desktop (1920px) et mobile (375px)", 'size': 12},
        {'text': "✓ Adaptation des layouts et composants", 'size': 12},
        {'text': "✓ Interactions tactiles optimisées", 'size': 12},
        '',
        {'text': '4. Charte graphique cohérente', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "✓ Palette de couleurs réfléchie et harmonieuse", 'size': 12},
        {'text': "✓ Typographie lisible et hiérarchisée", 'size': 12},
        {'text': "✓ Cohérence visuelle sur toutes les pages", 'size': 12},
    ]
)

# Slide 22: Bilan Frontend complet
add_content_slide(
    "Bilan - Partie Frontend & Maquettage",
    [
        {'text': '🎯 Objectifs atteints', 'size': 17, 'bold': True},
        '',
        {'text': 'Projet APD (Stage UFO Agency) :', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "✓ Site vitrine moderne et performant pour l'association", 'size': 12},
        {'text': "✓ Interface d'administration Strapi opérationnelle", 'size': 12},
        {'text': "✓ Optimisations performance (images, code splitting, SSR)", 'size': 12},
        {'text': "✓ Design responsive et accessible", 'size': 12},
        '',
        {'text': 'Projet CoolBooking (Fil-rouge) :', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
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
    ]
)

# Sauvegarde
prs.save('DOSSIER_TP_DWWM_FRONTEND_AMELIORE.pptx')
print("✅ Dossier Frontend + Maquettage généré : DOSSIER_TP_DWWM_FRONTEND_AMELIORE.pptx")
print(f"📊 Nombre de slides : {len(prs.slides)}")
print("📐 Format : A4 vertical (210x297mm)")
print("🎨 Design moderne avec police Segoe UI")

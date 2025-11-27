"""
Présentation complète professionnelle ~30 slides
Inspirée de la structure et qualité de presentation.pdf
"""
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor

# Couleurs charte APD
ROUGE = RGBColor(172, 17, 21)
NOIR = RGBColor(23, 23, 23)
BLANC = RGBColor(255, 255, 255)
GRIS = RGBColor(237, 237, 237)
GRIS_FONCE = RGBColor(100, 100, 100)

prs = Presentation()
prs.slide_width = Inches(10)
prs.slide_height = Inches(7.5)

def add_blank():
    return prs.slides.add_slide(prs.slide_layouts[6])

def title_bar(slide, text):
    shape = slide.shapes.add_shape(1, Inches(0), Inches(0), Inches(10), Inches(1.1))
    shape.fill.solid()
    shape.fill.fore_color.rgb = ROUGE
    shape.line.color.rgb = ROUGE
    tf = shape.text_frame
    tf.text = text
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    p = tf.paragraphs[0]
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = BLANC
    p.alignment = PP_ALIGN.CENTER

def add_section_title(slide, text, y):
    box = slide.shapes.add_textbox(Inches(0.7), y, Inches(8.6), Inches(0.6))
    tf = box.text_frame
    tf.text = text
    p = tf.paragraphs[0]
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = ROUGE

def add_bullets(slide, items, x, y, w, h, size=16, color=NOIR):
    box = slide.shapes.add_textbox(x, y, w, h)
    tf = box.text_frame
    tf.word_wrap = True
    for i, item in enumerate(items):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = item
        p.font.size = Pt(size)
        p.font.color.rgb = color
        p.space_before = Pt(4)
        p.space_after = Pt(2)

def add_code(slide, code, x, y, w, h, size=14):
    box = slide.shapes.add_textbox(x, y, w, h)
    tf = box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = code
    p.font.size = Pt(size)
    p.font.name = "Courier New"
    p.font.color.rgb = NOIR

# ========== SLIDE 1: PAGE DE TITRE ==========
slide = add_blank()
bg = slide.background.fill
bg.solid()
bg.fore_color.rgb = ROUGE

title_box = slide.shapes.add_textbox(Inches(1), Inches(2.2), Inches(8), Inches(1.4))
tf = title_box.text_frame
tf.text = "DOSSIER DE PROJET"
p = tf.paragraphs[0]
p.font.size = Pt(54)
p.font.bold = True
p.font.color.rgb = BLANC
p.alignment = PP_ALIGN.CENTER

subtitle = slide.shapes.add_textbox(Inches(1), Inches(3.8), Inches(8), Inches(0.5))
tf = subtitle.text_frame
tf.text = "Titre Professionnel Développeur Web et Web Mobile"
p = tf.paragraphs[0]
p.font.size = Pt(20)
p.font.color.rgb = GRIS
p.alignment = PP_ALIGN.CENTER

projects = slide.shapes.add_textbox(Inches(1), Inches(4.6), Inches(8), Inches(0.9))
tf = projects.text_frame
tf.text = "APD (Frontend Next.js) • CoolBooking (Backend Express)"
p = tf.paragraphs[0]
p.font.size = Pt(26)
p.font.bold = True
p.font.color.rgb = BLANC
p.alignment = PP_ALIGN.CENTER

author = slide.shapes.add_textbox(Inches(1), Inches(5.8), Inches(8), Inches(0.5))
tf = author.text_frame
tf.text = "Philippe Barbosa – Janvier 2025"
p = tf.paragraphs[0]
p.font.size = Pt(22)
p.font.color.rgb = GRIS
p.alignment = PP_ALIGN.CENTER

# ========== SLIDE 2: SOMMAIRE ==========
slide = add_blank()
title_bar(slide, "SOMMAIRE")
add_bullets(slide, [
    "1. Qui suis-je ?",
    "2. L'équipe",
    "3. Genèse des projets",
    "4. Public cible",
    "5. Organisation & Méthodologie",
    "6. Roadmap des Sprints",
    "7. User Stories",
    "8. Arborescence & MVP",
    "9. Wireframes & Maquettes",
    "10. Charte Graphique",
    "11. Modèle Conceptuel (MCD)",
    "12. Modèle Logique (MLD)",
    "13. Dictionnaire des Données",
    "14. Stack Technique",
    "15. Gitflow",
    "16. Architecture Globale",
    "17. Flux Back-End",
    "18. Structure Front-End",
    "19. Sécurité Implémentée",
    "20. Sécurité À Renforcer",
    "21. Réalisations Frontend",
    "22. Réalisations Backend",
    "23. Tests & Performance",
    "24. Veille Technologique",
    "25. Difficultés Rencontrées",
    "26. Solutions Apportées",
    "27. Perspectives Court Terme",
    "28. Perspectives Long Terme",
    "29. Conclusion",
    "30. Questions & Réponses"
], Inches(0.7), Inches(1.3), Inches(4.3), Inches(5.8), size=14)

add_bullets(slide, [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
], Inches(5.2), Inches(1.3), Inches(4.3), Inches(5.8), size=14)

# ========== SLIDE 3: QUI SUIS-JE ? ==========
slide = add_blank()
title_bar(slide, "QUI SUIS-JE ?")
add_section_title(slide, "Parcours & Motivation", Inches(1.4))
add_bullets(slide, [
    "Reconversion professionnelle vers le développement web",
    "Passion de longue date pour les technologies et l'innovation",
    "Intérêt marqué pour la conception produit, la performance et la sécurité",
    "Objectif : démontrer une maîtrise bout-en-bout (UX → API → Base de données)"
], Inches(0.9), Inches(2.1), Inches(8.2), Inches(1.8))

add_section_title(slide, "Approche d'Apprentissage", Inches(4.2))
add_bullets(slide, [
    "Priorité à la documentation officielle et aux bonnes pratiques",
    "Prototypage rapide puis durcissement progressif",
    "Veille technologique structurée hebdomadaire (Next.js, React, OWASP, Node.js)",
    "Mise en pratique immédiate des concepts appris"
], Inches(0.9), Inches(4.9), Inches(8.2), Inches(2.0))

# ========== SLIDE 4: L'ÉQUIPE ==========
slide = add_blank()
title_bar(slide, "L'ÉQUIPE")
add_section_title(slide, "Composition & Rôles", Inches(1.4))
add_bullets(slide, [
    "Product Owner / Scrum Master : Vision produit, priorisation backlog",
    "Développeur Frontend : Intégration UI/UX, performance, accessibilité",
    "Développeur Backend : Endpoints API, sécurité, persistance données",
    "Git Master : Qualité des intégrations, revue des Pull Requests",
    "Support QA : Scénarios de tests, validation du MVP"
], Inches(0.9), Inches(2.1), Inches(8.2), Inches(2.2))

add_section_title(slide, "Mode de Collaboration", Inches(4.6))
add_bullets(slide, [
    "Sprints hebdomadaires avec objectifs clairs",
    "Daily meetings pour points d'avancement et blocages",
    "Rétrospectives de fin de sprint pour amélioration continue",
    "Communication asynchrone via Discord pour efficacité"
], Inches(0.9), Inches(5.3), Inches(8.2), Inches(1.8))

# ========== SLIDE 5: GENÈSE DES PROJETS ==========
slide = add_blank()
title_bar(slide, "GENÈSE DES PROJETS")
add_section_title(slide, "APD - Association pour le Patrimoine Diocésain", Inches(1.4))
add_bullets(slide, [
    "Constat : Absence de vitrine digitale pour valoriser le patrimoine",
    "Problématique : Difficulté à mobiliser donateurs et partenaires",
    "Contexte : Patrimoine religieux en tension (besoins de financement)",
    "Solution : Site vitrine immersif avec galerie, blog et appels aux dons"
], Inches(0.9), Inches(2.1), Inches(8.2), Inches(2.0))

add_section_title(slide, "CoolBooking - Plateforme de Location", Inches(4.4))
add_bullets(slide, [
    "Constat : Plateformes généralistes prennent des commissions élevées",
    "Problématique : Propriétaires veulent garder le contrôle de leurs données",
    "Besoin : Outil léger, modulable et personnalisable",
    "Solution : Backend API pour gestion locations avec uploads images"
], Inches(0.9), Inches(5.1), Inches(8.2), Inches(2.0))

# ========== SLIDE 6: PUBLIC CIBLE ==========
slide = add_blank()
title_bar(slide, "PUBLIC CIBLE")
add_section_title(slide, "APD - Audiences Principales", Inches(1.4))
add_bullets(slide, [
    "Visiteurs : Découvrir le patrimoine diocésain et son histoire",
    "Donateurs : Contribuer financièrement à la restauration",
    "Partenaires : Établir des partenariats institutionnels ou mécénat",
    "Administrateurs : Gérer contenus (articles, interviews, galerie)"
], Inches(0.9), Inches(2.1), Inches(4.0), Inches(2.0))

add_section_title(slide, "CoolBooking - Profils Utilisateurs", Inches(1.4))
add_bullets(slide, [
    "Propriétaires (Owners) : Publier et gérer leurs annonces",
    "Locataires (Tenants) : Rechercher et réserver (fonctionnalité future)",
    "Administrateurs : Supervision et modération des contenus",
    "Développeurs : Intégration via API REST pour extensions"
], Inches(5.1), Inches(2.1), Inches(4.0), Inches(2.0))

add_section_title(slide, "Besoins Communs", Inches(4.4))
add_bullets(slide, [
    "Interface intuitive et responsive (desktop, tablette, mobile)",
    "Performance optimale (temps de chargement < 3s)",
    "Sécurité des données personnelles (RGPD)",
    "Accessibilité pour tous publics (WCAG 2.1)"
], Inches(0.9), Inches(5.1), Inches(8.2), Inches(1.8))

# ========== SLIDE 7: ORGANISATION & MÉTHODOLOGIE ==========
slide = add_blank()
title_bar(slide, "ORGANISATION & MÉTHODOLOGIE")
add_section_title(slide, "Cadence de Travail", Inches(1.4))
add_bullets(slide, [
    "Sprints hebdomadaires avec planning poker pour estimation",
    "Daily meetings (15min) : avancement, blocages, aide",
    "Rétrospective en fin de sprint pour amélioration continue",
    "Démos intermédiaires pour validation avec parties prenantes"
], Inches(0.9), Inches(2.1), Inches(4.0), Inches(2.0))

add_section_title(slide, "Outils Utilisés", Inches(1.4))
add_bullets(slide, [
    "Trello : Kanban pour visualisation des tâches (To Do → Doing → Done)",
    "Discord : Communication rapide et partage d'écran",
    "GitHub : Gestion du code, PR reviews, CI/CD",
    "Postman : Tests et documentation des endpoints API"
], Inches(5.1), Inches(2.1), Inches(4.0), Inches(2.0))

add_section_title(slide, "Principes Agile Appliqués", Inches(4.4))
add_bullets(slide, [
    "User Stories centrées sur la valeur métier",
    "MVP (Minimum Viable Product) avant extensions",
    "Documentation vivante mise à jour en continu",
    "Itérations courtes pour feedback rapide"
], Inches(0.9), Inches(5.1), Inches(8.2), Inches(1.8))

# ========== SLIDE 8: ROADMAP DES SPRINTS ==========
slide = add_blank()
title_bar(slide, "ROADMAP DES SPRINTS")
add_code(slide, """Sprint 0 (Setup) :
 • Initialisation des repositories Git
 • Configuration environnements de développement
 • Définition du MVP et backlog haut niveau

Sprint 1 (Fondations) :
 • Wireframes desktop et mobile
 • Charte graphique et design system
 • Setup Strapi CMS pour APD
 • Base Next.js + composants scaffolding

Sprint 2 (Développement Core) :
 • Intégration sections principales APD
 • API Users pour CoolBooking (register, login)
 • Authentification JWT sécurisée
 • Galerie photos et prévisualisation blog

Sprint 3 (Enrichissement) :
 • Optimisations performance (Lighthouse > 90)
 • Accessibilité WCAG 2.1 niveau AA
 • Upload multiple d'images pour annonces
 • Durcissement sécurité (validation, sanitization)

Sprint Fix (Finalisation) :
 • Corrections bugs identifiés en QA
 • Documentation technique complète
 • Packaging et préparation déploiement
 • Tests end-to-end""", Inches(0.9), Inches(1.4), Inches(8.2), Inches(5.5), size=13)

# ========== SLIDE 9: USER STORIES ==========
slide = add_blank()
title_bar(slide, "USER STORIES")
add_section_title(slide, "APD - Exemples Prioritaires", Inches(1.4))
add_bullets(slide, [
    "En tant que visiteur, je veux voir la galerie pour apprécier le patrimoine",
    "En tant que donateur, je veux faire un don sécurisé pour soutenir la restauration",
    "En tant que partenaire, je veux envoyer une demande de mécénat",
    "En tant qu'admin, je veux publier un article pour informer l'avancement travaux"
], Inches(0.9), Inches(2.1), Inches(8.2), Inches(1.8))

add_section_title(slide, "CoolBooking - Fonctionnalités Essentielles", Inches(4.2))
add_bullets(slide, [
    "En tant que propriétaire, je veux créer une annonce avec photos pour louer mon bien",
    "En tant que propriétaire, je veux modifier mes annonces pour mettre à jour les infos",
    "En tant que locataire (futur), je veux filtrer les annonces pour trouver un logement",
    "En tant qu'admin, je veux modérer les contenus pour garantir la qualité"
], Inches(0.9), Inches(4.9), Inches(8.2), Inches(2.0))

# ========== SLIDE 10: ARBORESCENCE & MVP ==========
slide = add_blank()
title_bar(slide, "ARBORESCENCE & MVP")
add_section_title(slide, "APD - Structure du Site", Inches(1.4))
add_code(slide, """/ (page d'accueil)
  ├─ hero video
  ├─ introduction
  ├─ description diocèse
  ├─ interviews
  ├─ architecture patrimoine
  ├─ galerie photos
  ├─ aperçu blog
  └─ partenaires

/blog
  └─ liste articles

/blog/[slug]
  └─ article détaillé

/partners
  └─ liste partenaires

/association
  └─ présentation APD""", Inches(0.9), Inches(2.1), Inches(4.0), Inches(4.5), size=12)

add_section_title(slide, "CoolBooking - Endpoints API", Inches(1.4))
add_code(slide, """/users
  POST /register
  POST /login
  POST /logout
  GET  /dashboard
  PUT  /update/:id
  DELETE /:id

/rentals
  POST / (+ upload images)
  GET  /
  GET  /:id
  PUT  /:id
  DELETE /:id

/auth (middleware)
  verifyToken
  clearCookie""", Inches(5.1), Inches(2.1), Inches(4.0), Inches(4.5), size=12)

# ========== SLIDE 11: WIREFRAMES & MAQUETTES ==========
slide = add_blank()
title_bar(slide, "WIREFRAMES & MAQUETTES")
add_section_title(slide, "Desktop - Structure Visuelle", Inches(1.4))
add_code(slide, """┌─────────────────────────────────┐
│        [HEADER FIXE]            │
├─────────────────────────────────┤
│    [VIDEO HERO PLEIN ÉCRAN]     │
├─────────────────────────────────┤
│  [SECTION INTRO - 2 COLONNES]   │
├─────────────────────────────────┤
│  [DESCRIPTION + VISUEL]         │
├─────────────────────────────────┤
│  [INTERVIEWS CAROUSEL]          │
├─────────────────────────────────┤
│  [GALERIE GRID 3×3]             │
├─────────────────────────────────┤
│  [BLOG PREVIEW CARDS]           │
├─────────────────────────────────┤
│  [PARTENAIRES LOGOS]            │
└─────────────────────────────────┘
│        [FOOTER]                 │
└─────────────────────────────────┘""", Inches(0.9), Inches(2.1), Inches(4.0), Inches(4.5), size=11)

add_section_title(slide, "Mobile - Simplification", Inches(1.4))
add_code(slide, """┌─────────────┐
│  [BURGER]   │
├─────────────┤
│ [HERO IMG]  │
├─────────────┤
│  [INTRO]    │
│ 1 colonne   │
├─────────────┤
│[DESCRIPTION]│
├─────────────┤
│ [CAROUSEL]  │
│  swipeable  │
├─────────────┤
│  [GALERIE]  │
│  grid 2×N   │
├─────────────┤
│ [BLOG 1×N]  │
├─────────────┤
│[PARTENAIRES]│
├─────────────┤
│  [FOOTER]   │
├─────────────┤
│[CTA DON FIX]│
└─────────────┘""", Inches(5.1), Inches(2.1), Inches(4.0), Inches(4.5), size=11)

# ========== SLIDE 12: CHARTE GRAPHIQUE ==========
slide = add_blank()
title_bar(slide, "CHARTE GRAPHIQUE")
add_section_title(slide, "Palette de Couleurs", Inches(1.4))
add_bullets(slide, [
    "Rouge Principal : #AC1115 (identité forte, patrimoine)",
    "Noir Profond : #171717 (textes, contraste)",
    "Blanc Cassé : #EDEDED (fonds clairs, respirations)",
    "Or Subtil : accents décoratifs (lettrines, ornements)"
], Inches(0.9), Inches(2.1), Inches(4.0), Inches(1.8))

add_section_title(slide, "Typographie", Inches(1.4))
add_bullets(slide, [
    "Titres : AnnStone (élégance, caractère patrimonial)",
    "Textes : EB Garamond (lisibilité, classicisme)",
    "Lettrines décoratives pour citations et introductions",
    "Hiérarchie claire : H1 48px, H2 32px, Body 18px"
], Inches(5.1), Inches(2.1), Inches(4.0), Inches(1.8))

add_section_title(slide, "Principes UI/UX", Inches(4.2))
add_bullets(slide, [
    "Contraste élevé pour accessibilité (ratio > 4.5:1)",
    "Animations progressives au scroll (reveal, fade-in)",
    "Espaces généreux pour respiration visuelle",
    "Mobile-first : adaptation fluide de 320px à 1920px",
    "Call-to-action visibles : boutons rouge avec hover subtil"
], Inches(0.9), Inches(4.9), Inches(8.2), Inches(2.2))

# ========== SLIDE 13: MODÈLE CONCEPTUEL (MCD) ==========
slide = add_blank()
title_bar(slide, "MODÈLE CONCEPTUEL DE DONNÉES (MCD)")
add_section_title(slide, "APD - Strapi CMS", Inches(1.4))
add_code(slide, """┌─────────┐              ┌──────────┐
│ EGLISE  │──────1:N────│ ARTICLES │
└─────────┘              └──────────┘
     │
     │ 1:N
     │
┌──────────┐
│INTERVIEWS│
└──────────┘

┌────────────┐
│ PARTENAIRES│ (collection indépendante)
└────────────┘

┌────────────┐
│ PARAMETRES │ (singleton : contact, réseaux)
└────────────┘""", Inches(0.9), Inches(2.1), Inches(4.0), Inches(4.5), size=12)

add_section_title(slide, "CoolBooking - MySQL", Inches(1.4))
add_code(slide, """┌───────┐             ┌─────────┐
│ USERS │─────1:N────│ RENTALS │
└───────┘             └─────────┘
    │
    │ (future)
    │
┌──────────────┐
│ RESERVATIONS │
└──────────────┘

Relations futures :
• RENTALS ──N:M── TAGS
• RENTALS ──N:1── CATEGORIES
• USERS   ──1:N── FAVORITES""", Inches(5.1), Inches(2.1), Inches(4.0), Inches(4.5), size=12)

# ========== SLIDE 14: MODÈLE LOGIQUE (MLD) ==========
slide = add_blank()
title_bar(slide, "MODÈLE LOGIQUE DE DONNÉES (MLD)")
add_code(slide, """users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password CHAR(97) NOT NULL,  -- Argon2id hash
  phone VARCHAR(20),
  role ENUM('owner', 'tenant') DEFAULT 'tenant',
  avatar VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

rentals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  location VARCHAR(200) NOT NULL,
  price_per_night DECIMAL(10, 2) NOT NULL,
  beds INT NOT NULL,
  images JSON,  -- Array URLs Cloudinary (max 5)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)

INDEX idx_location ON rentals(location);
INDEX idx_price ON rentals(price_per_night);
INDEX idx_user ON rentals(user_id);""", Inches(0.9), Inches(1.4), Inches(8.2), Inches(5.7), size=12)

# ========== SLIDE 15: DICTIONNAIRE DES DONNÉES ==========
slide = add_blank()
title_bar(slide, "DICTIONNAIRE DES DONNÉES")
add_code(slide, """┌──────────────────┬──────────────┬─────────────────────────────────┐
│ Champ            │ Type         │ Description                     │
├──────────────────┼──────────────┼─────────────────────────────────┤
│ users.email      │ VARCHAR(255) │ Login unique, validation regex  │
│ users.password   │ CHAR(97)     │ Hash Argon2id (sécurité max)    │
│ users.role       │ ENUM         │ Autorisations (owner/tenant)    │
│ users.avatar     │ VARCHAR(500) │ URL Cloudinary (optionnel)      │
├──────────────────┼──────────────┼─────────────────────────────────┤
│ rentals.images   │ JSON         │ Array URLs (max 5 images)       │
│ rentals.price_*  │ DECIMAL(10,2)│ Prix nuitée en euros            │
│ rentals.beds     │ INT          │ Nombre couchages (1-20)         │
│ rentals.location │ VARCHAR(200) │ Ville/région (index pour perf)  │
└──────────────────┴──────────────┴─────────────────────────────────┘

Contraintes de Qualité :
• Email : validation Joi + unicité en base
• Password : longueur min 8 caractères, hash avant insertion
• Images : format JPEG/PNG, taille max 5MB par image
• Price : valeur positive, 2 décimales max
• Beds : entier positif entre 1 et 20

Indexation :
• Colonnes fréquemment filtrées (location, price) indexées
• Clés étrangères indexées automatiquement (user_id)""", Inches(0.9), Inches(1.4), Inches(8.2), Inches(5.7), size=11)

# ========== SLIDE 16: STACK TECHNIQUE ==========
slide = add_blank()
title_bar(slide, "STACK TECHNIQUE")
add_section_title(slide, "Frontend APD", Inches(1.4))
add_bullets(slide, [
    "Next.js 15 : App Router, React Server Components, SSR",
    "React 19 : Hooks, Context API, optimisations Concurrent",
    "Tailwind CSS 4 : Utility-first, configuration personnalisée",
    "GSAP 3.13 : Animations performantes (ScrollTrigger, Timeline)",
    "Lenis : Smooth scroll natif amélioré",
    "Strapi v5 : Headless CMS, API REST auto-générée"
], Inches(0.9), Inches(2.1), Inches(4.0), Inches(2.4))

add_section_title(slide, "Backend CoolBooking", Inches(1.4))
add_bullets(slide, [
    "Node.js 20 LTS : Runtime performant et stable",
    "Express 5 : Framework minimaliste, middleware",
    "MariaDB 10.11 : Base relationnelle (mysql2 driver)",
    "Argon2 : Hashing mots de passe (résistant GPU)",
    "JWT : Authentification stateless, cookies HttpOnly",
    "Multer : Upload fichiers temporaires → Cloudinary"
], Inches(5.1), Inches(2.1), Inches(4.0), Inches(2.4))

add_section_title(slide, "Outils Transverses", Inches(4.8))
add_bullets(slide, [
    "Cloudinary : CDN images, transformations à la volée",
    "Joi : Validation schémas (entrées utilisateurs)",
    "ESLint + Prettier : Qualité code, formatage uniforme",
    "Postman : Tests API, collection partagée équipe"
], Inches(0.9), Inches(5.5), Inches(8.2), Inches(1.6))

# ========== SLIDE 17: GITFLOW ==========
slide = add_blank()
title_bar(slide, "GITFLOW & GESTION DU CODE")
add_section_title(slide, "Stratégie de Branches", Inches(1.4))
add_code(slide, """main (production)
  │
  └── staging (pré-production, tests finaux)
        │
        ├── feature/apd-gallery
        ├── feature/apd-blog
        ├── feature/coolbooking-auth
        ├── feature/coolbooking-uploads
        └── fix/performance-video

Règles :
• Jamais de commit direct sur main
• PR obligatoire avec review (≥1 approbation)
• Tests passent avant merge
• Commits atomiques avec messages conventionnels""", Inches(0.9), Inches(2.1), Inches(4.0), Inches(4.5), size=12)

add_section_title(slide, "Convention de Commits", Inches(1.4))
add_code(slide, """feat: ajout carousel interviews
fix: correction responsive mobile galerie
refactor: extraction hook useSiteData
perf: lazy loading composant blog
docs: mise à jour README API
test: tests unitaires auth JWT
chore: configuration ESLint

Format : <type>: <description>
Scope optionnel : feat(api): endpoint rentals""", Inches(5.1), Inches(2.1), Inches(4.0), Inches(4.5), size=12)

# ========== SLIDE 18: ARCHITECTURE GLOBALE ==========
slide = add_blank()
title_bar(slide, "ARCHITECTURE GLOBALE")
add_code(slide, """┌─────────────────────────────────────────────────────────┐
│              CLIENTS (Browser / Mobile)                 │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼────────┐       ┌───────▼────────┐
│  Next.js App   │       │  Express API   │
│  (APD Frontend)│       │ (CoolBooking)  │
│                │       │                │
│ • SSR/RSC      │       │ • REST routes  │
│ • fetch() API  │       │ • Middleware   │
│ • Components   │       │ • Controllers  │
└───────┬────────┘       └───────┬────────┘
        │                        │
        │                        │
┌───────▼────────┐       ┌───────▼────────┐
│  Strapi CMS    │       │    MariaDB     │
│  (PostgreSQL)  │       │  (mysql2)      │
└────────────────┘       └────────────────┘
        │                        │
        └───────────┬────────────┘
                    │
            ┌───────▼────────┐
            │   Cloudinary   │
            │  (CDN images)  │
            └────────────────┘

Objectifs Architecture :
✓ Séparation claire des responsabilités
✓ Évolutivité : ajout modules futurs facilité
✓ Performance : SSR + CDN pour assets lourds
✓ Testabilité : composants isolés, API REST
✓ Maintenance : code modulaire, documentation""", Inches(0.9), Inches(1.4), Inches(8.2), Inches(5.7), size=11)

# ========== SLIDE 19: FLUX BACK-END ==========
slide = add_blank()
title_bar(slide, "FLUX BACK-END DÉTAILLÉ")
add_code(slide, """┌────────────────────────────────────────────────────────────┐
│                     CLIENT REQUEST                         │
└──────────────────────────┬─────────────────────────────────┘
                           │
                   ┌───────▼────────┐
                   │     ROUTER     │ (routes/users.js)
                   └───────┬────────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
    ┌───────▼────┐  ┌─────▼─────┐  ┌────▼─────┐
    │verifyToken │  │  upload   │  │ validate │
    │(JWT auth)  │  │ (Multer)  │  │  (Joi)   │
    └───────┬────┘  └─────┬─────┘  └────┬─────┘
            └──────────────┼──────────────┘
                           │
                   ┌───────▼────────┐
                   │  CONTROLLER    │ (controllers/users.js)
                   │ • Logique métier
                   │ • Validation
                   │ • Erreurs HTTP
                   └───────┬────────┘
                           │
                   ┌───────▼────────┐
                   │    SERVICE     │ (services/users.js)
                   │ • Orchestration
                   │ • Business logic
                   └───────┬────────┘
                           │
                   ┌───────▼────────┐
                   │  REPOSITORY    │ (repositories/users.js)
                   │ • Requêtes SQL
                   │ • Paramétrisées
                   └───────┬────────┘
                           │
                   ┌───────▼────────┐
                   │    DATABASE    │ (MariaDB)
                   └────────────────┘

Exemple Auth :
POST /login → verifyPassword() → jwt.sign() → cookie HttpOnly
GET /dashboard → verifyToken() → attach req.user → render data""", Inches(0.9), Inches(1.4), Inches(8.2), Inches(5.7), size=10)

# ========== SLIDE 20: STRUCTURE FRONT-END ==========
slide = add_blank()
title_bar(slide, "STRUCTURE FRONT-END")
add_code(slide, """frontend/
├── src/
│   ├── app/
│   │   ├── layout.js              (Layout racine, metadata)
│   │   ├── page.jsx               (Page accueil avec sections)
│   │   ├── globals.css            (Styles Tailwind)
│   │   ├── blog/
│   │   │   ├── page.jsx           (Liste articles)
│   │   │   └── [slug]/
│   │   │       └── page.jsx       (Article détaillé)
│   │   ├── partners/
│   │   │   └── page.jsx
│   │   └── association/
│   │       └── page.jsx
│   │
│   ├── components/
│   │   ├── VideoBackground.jsx    (Hero vidéo autoplay)
│   │   ├── IntroSection.jsx       (Animations GSAP)
│   │   ├── Gallery.jsx            (Grid responsive)
│   │   ├── BlogSection.jsx        (Preview 3 articles)
│   │   ├── PartnerSection.jsx     (Logos partenaires)
│   │   ├── Header.jsx             (Navigation)
│   │   ├── Footer.jsx
│   │   ├── DonationButton.jsx     (CTA fixe mobile)
│   │   └── ContactModal.jsx
│   │
│   ├── hooks/
│   │   ├── useSiteData.jsx        (Fetch Strapi + timeout)
│   │   └── useIsMobile.jsx        (Media queries)
│   │
│   └── contexts/
│       └── HeaderDonationContext.jsx  (État global CTA)
│
├── public/
│   └── fonts/                     (AnnStone, Garamond)
│
└── next.config.js                 (Images, Turbopack)""", Inches(0.9), Inches(1.4), Inches(8.2), Inches(5.7), size=11)

# ========== SLIDE 21: SÉCURITÉ IMPLÉMENTÉE ==========
slide = add_blank()
title_bar(slide, "SÉCURITÉ IMPLÉMENTÉE")
add_section_title(slide, "Authentification & Autorisation", Inches(1.4))
add_bullets(slide, [
    "Argon2id : Hashing mots de passe (résistant attaques GPU/ASIC)",
    "JWT : Tokens signés, expiration 24h, stockage HttpOnly cookies",
    "SameSite=Strict : Protection CSRF",
    "Middleware verifyToken : Validation signature + expiration"
], Inches(0.9), Inches(2.1), Inches(8.2), Inches(1.8))

add_section_title(slide, "Protection des Données", Inches(4.2))
add_bullets(slide, [
    "Requêtes paramétrées : Prévention injection SQL (mysql2)",
    "Validation Joi : Schémas stricts pour inputs utilisateurs",
    "Sanitization : Nettoyage données avant insertion DB",
    "CORS configuré : Origine autorisée uniquement"
], Inches(0.9), Inches(4.9), Inches(8.2), Inches(1.8))

# ========== SLIDE 22: SÉCURITÉ À RENFORCER ==========
slide = add_blank()
title_bar(slide, "SÉCURITÉ À RENFORCER")
add_section_title(slide, "Court Terme (Sprint suivant)", Inches(1.4))
add_bullets(slide, [
    "Rate Limiting : express-rate-limit (100 req/15min/IP)",
    "Helmet : Headers sécurité (CSP, HSTS, X-Frame-Options)",
    "Logging : Winston pour traçabilité actions critiques",
    "Refresh Tokens : Renouvellement JWT sans re-login"
], Inches(0.9), Inches(2.1), Inches(4.0), Inches(1.8))

add_section_title(slide, "Moyen Terme", Inches(1.4))
add_bullets(slide, [
    "2FA : Authentification deux facteurs (TOTP)",
    "Audit Logs : Traçabilité complète actions admin",
    "Chiffrement DB : Colonnes sensibles (TDE MySQL)",
    "Sécurité uploads : Scan antivirus fichiers"
], Inches(5.1), Inches(2.1), Inches(4.0), Inches(1.8))

add_section_title(slide, "Mapping OWASP Top 10", Inches(4.2))
add_bullets(slide, [
    "A01 Broken Access Control : Middleware rôles",
    "A02 Cryptographic Failures : Argon2id + HTTPS",
    "A03 Injection : Requêtes paramétrées + validation",
    "A05 Security Misconfiguration : Helmet + env vars",
    "A07 Identification/Auth : JWT + refresh tokens futur"
], Inches(0.9), Inches(4.9), Inches(8.2), Inches(2.0))

# ========== SLIDE 23: RÉALISATIONS FRONTEND ==========
slide = add_blank()
title_bar(slide, "RÉALISATIONS FRONTEND")
add_section_title(slide, "Animations GSAP", Inches(1.4))
add_bullets(slide, [
    "Reveal progressif textes : cascade avec delay incrémental",
    "ScrollTrigger sections : fade-in + translateY au scroll",
    "Pulse CTA donation : animation continue pour attirer l'œil",
    "Timeline interviews : séquence fluide carousel automatique"
], Inches(0.9), Inches(2.1), Inches(4.0), Inches(1.8))

add_section_title(slide, "Hooks Personnalisés", Inches(1.4))
add_bullets(slide, [
    "useSiteData : Fetch Strapi + timeout 8s + fallback",
    "useIsMobile : Media query listener (< 768px)",
    "Context donation : État global CTA visible/caché"
], Inches(5.1), Inches(2.1), Inches(4.0), Inches(1.8))

add_section_title(slide, "Optimisations Performance", Inches(4.2))
add_bullets(slide, [
    "Lazy loading : BlogSection chargée uniquement si visible",
    "Priority assets : Hero vidéo + fonts preload",
    "Responsive images : Cloudinary transformations (w, h, q, f_auto)",
    "Code splitting : Routes automatiques Next.js App Router",
    "Turbopack : Build ultra-rapide (dev mode)"
], Inches(0.9), Inches(4.9), Inches(8.2), Inches(2.0))

# ========== SLIDE 24: RÉALISATIONS BACKEND ==========
slide = add_blank()
title_bar(slide, "RÉALISATIONS BACKEND")
add_section_title(slide, "Authentification JWT", Inches(1.4))
add_code(slide, """// verifyPassword (services/auth.js)
export async function verifyPassword(email, password) {
  const user = await usersRepository.findByEmail(email);
  if (!user) throw new Error('Invalid credentials');
  
  const valid = await argon2.verify(user.password, password);
  if (!valid) throw new Error('Invalid credentials');
  
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  return { user, token };
}

// verifyToken (middleware)
export function verifyToken(req, res, next) {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
}""", Inches(0.9), Inches(2.1), Inches(8.2), Inches(4.5), size=10)

# ========== SLIDE 25: TESTS & PERFORMANCE ==========
slide = add_blank()
title_bar(slide, "TESTS & PERFORMANCE")
add_section_title(slide, "Métriques APD (Lighthouse)", Inches(1.4))
add_bullets(slide, [
    "Performance : 92/100 (Desktop), 78/100 (Mobile)",
    "Accessibilité : 90/100 (WCAG 2.1 AA partiel)",
    "SEO : 100/100 (meta tags, sitemap, robots.txt)",
    "Best Practices : 95/100 (HTTPS, console errors)",
    "Animations fluides : <16ms par frame (60 FPS)"
], Inches(0.9), Inches(2.1), Inches(4.0), Inches(2.2))

add_section_title(slide, "Tests API CoolBooking", Inches(1.4))
add_bullets(slide, [
    "Collection Postman : 18 requêtes (CRUD users + rentals)",
    "GET /rentals : Réponse moyenne <60ms (local)",
    "POST /rentals (upload) : ~1.2s (Cloudinary latency)",
    "Gestion erreurs : JSON uniforme avec status codes"
], Inches(5.1), Inches(2.1), Inches(4.0), Inches(2.2))

add_section_title(slide, "Axes d'Amélioration", Inches(4.6))
add_bullets(slide, [
    "Compression vidéo hero : Objectif -40% poids (H.265, VP9)",
    "Tests automatisés : Jest pour logique métier + endpoints",
    "CI/CD : GitHub Actions pour tests + deploy auto",
    "Monitoring : Sentry pour tracking erreurs production",
    "Cache : Redis pour requêtes fréquentes (GET /rentals)"
], Inches(0.9), Inches(5.3), Inches(8.2), Inches(1.8))

# ========== SLIDE 26: VEILLE TECHNOLOGIQUE ==========
slide = add_blank()
title_bar(slide, "VEILLE TECHNOLOGIQUE")
add_section_title(slide, "Sources Consultées", Inches(1.4))
add_bullets(slide, [
    "Next.js Blog : Nouveautés App Router, React Server Components",
    "React Docs Beta : Hooks avancés, optimisations Concurrent Mode",
    "OWASP : Top 10 Web Application Security Risks",
    "Snyk Advisor : Vulnérabilités packages npm",
    "MariaDB Knowledge Base : Optimisations requêtes, index",
    "GSAP Forums : Patterns animations performantes"
], Inches(0.9), Inches(2.1), Inches(4.0), Inches(2.4))

add_section_title(slide, "Méthodologie de Veille", Inches(1.4))
add_bullets(slide, [
    "Priorité documentation officielle (source fiable)",
    "Validation date publication (éviter info obsolète)",
    "Tests proof-of-concept rapides avant intégration",
    "Partage avec équipe (Discord channels dédiés)",
    "Veille hebdomadaire : 2h/semaine dédiées"
], Inches(5.1), Inches(2.1), Inches(4.0), Inches(2.4))

add_section_title(slide, "Décisions Éclairées", Inches(4.8))
add_bullets(slide, [
    "Argon2id préféré à bcrypt (résistance GPU)",
    "Tailwind CSS vs CSS-in-JS (performance, DX)",
    "Strapi v5 vs Sanity (gratuit, flexible)",
    "Cloudinary vs S3 (transformations intégrées)"
], Inches(0.9), Inches(5.5), Inches(8.2), Inches(1.6))

# ========== SLIDE 27: DIFFICULTÉS RENCONTRÉES ==========
slide = add_blank()
title_bar(slide, "DIFFICULTÉS RENCONTRÉES")
add_bullets(slide, [
    "1. Poids vidéo hero (120 MB) → Temps chargement initial >8s mobile",
    "",
    "2. Conflits Lenis smooth scroll + GSAP ScrollTrigger → Offsets incorrects",
    "",
    "3. Email duplicates utilisateurs → Erreur MySQL non gérée proprement",
    "",
    "4. Upload multiple images → Gestion asynchrone Cloudinary complexe",
    "",
    "5. Performance mobile APD → Galerie lourde (images non optimisées)",
    "",
    "6. CORS errors en dev → Configuration Express/Next.js incohérente",
    "",
    "7. JWT refresh → Expiration 24h trop courte pour UX, pas de refresh token",
    "",
    "8. Accessibilité galerie → Navigation clavier absente initialement"
], Inches(0.9), Inches(1.5), Inches(8.2), Inches(5.5), size=16)

# ========== SLIDE 28: SOLUTIONS APPORTÉES ==========
slide = add_blank()
title_bar(slide, "SOLUTIONS APPORTÉES")
add_bullets(slide, [
    "1. Vidéo hero : Compression FFmpeg H.264 + qualité CRF 28 → -40% poids",
    "",
    "2. Smooth scroll : Configuration manuelle offsets GSAP + Lenis.scrollTo()",
    "",
    "3. Email duplicates : Vérification repository avant insert + erreur 409",
    "",
    "4. Upload images : Boucle Promise.all() + cleanup fichiers locaux après",
    "",
    "5. Perf mobile : Lazy loading images + Cloudinary resize (w_800, q_auto)",
    "",
    "6. CORS : Middleware Express avec origin dynamique selon NODE_ENV",
    "",
    "7. JWT : Extension expiration à 7j + roadmap refresh tokens (Sprint 4)",
    "",
    "8. Accessibilité : Ajout tabindex + aria-labels + focus visible CSS"
], Inches(0.9), Inches(1.5), Inches(8.2), Inches(5.5), size=16)

# ========== SLIDE 29: PERSPECTIVES COURT TERME ==========
slide = add_blank()
title_bar(slide, "PERSPECTIVES COURT TERME (3 mois)")
add_section_title(slide, "APD", Inches(1.4))
add_bullets(slide, [
    "Newsletter : Inscription + envoi automatique nouveaux articles",
    "Événements : Section agenda avec inscriptions en ligne",
    "Multilingue : i18n français/anglais (next-intl)",
    "Mode sombre : Thème alternatif avec switch persistant",
    "Analytics : Suivi conversions (dons, contacts) avec GA4",
    "PWA : Service worker + manifest pour offline-first"
], Inches(0.9), Inches(2.1), Inches(4.0), Inches(2.4))

add_section_title(slide, "CoolBooking", Inches(1.4))
add_bullets(slide, [
    "Réservations : Calendrier disponibilités + paiement Stripe",
    "Filtres avancés : Prix, localisation, équipements, dates",
    "Recherche full-text : Elasticsearch pour descriptions",
    "Messagerie : Chat interne propriétaire ↔ locataire",
    "Notifications : Email + push pour nouvelles réservations",
    "Documentation : Swagger/OpenAPI pour endpoints"
], Inches(5.1), Inches(2.1), Inches(4.0), Inches(2.4))

add_section_title(slide, "Qualité & DevOps", Inches(4.8))
add_bullets(slide, [
    "Tests Jest : Couverture >80% logique métier",
    "CI/CD : GitHub Actions (lint, test, deploy auto)",
    "Monitoring : Sentry pour erreurs + Uptime Robot",
    "Performance : Budget performance Lighthouse (seuils)"
], Inches(0.9), Inches(5.5), Inches(8.2), Inches(1.6))

# ========== SLIDE 30: PERSPECTIVES LONG TERME ==========
slide = add_blank()
title_bar(slide, "PERSPECTIVES LONG TERME (6-12 mois)")
add_section_title(slide, "Évolution Produit", Inches(1.4))
add_bullets(slide, [
    "Mobile natif : React Native pour app iOS/Android",
    "Marketplace : Extension CoolBooking multi-propriétaires",
    "IA recommandations : Suggestions annonces basées historique",
    "Blockchain : Traçabilité dons APD (transparence donateurs)"
], Inches(0.9), Inches(2.1), Inches(4.0), Inches(1.8))

add_section_title(slide, "Architecture & Scale", Inches(1.4))
add_bullets(slide, [
    "Microservices : Découplage auth, paiements, notifications",
    "GraphQL : API unifiée pour clients multiples (web, mobile)",
    "Kubernetes : Orchestration conteneurs pour scalabilité",
    "Observabilité : Prometheus + Grafana dashboards métriques"
], Inches(5.1), Inches(2.1), Inches(4.0), Inches(1.8))

add_section_title(slide, "Optimisations Avancées", Inches(4.2))
add_bullets(slide, [
    "Edge computing : Cloudflare Workers pour latence minimale",
    "Image optimization : WebP/AVIF + lazy loading natif",
    "Cache distribué : Redis Cluster pour haute disponibilité",
    "CDN multi-régions : Géolocalisation utilisateurs",
    "Green hosting : Migration hébergeur éco-responsable"
], Inches(0.9), Inches(4.9), Inches(8.2), Inches(2.0))

# ========== SLIDE 31: CONCLUSION ==========
slide = add_blank()
title_bar(slide, "CONCLUSION")
add_section_title(slide, "Compétences Démontrées", Inches(1.4))
add_bullets(slide, [
    "Maîtrise cycle complet : Idéation → Design → Développement → Déploiement",
    "Frontend moderne : React 19, Next.js 15, animations performantes",
    "Backend robuste : Express, API REST, authentification sécurisée",
    "Base de données : Modélisation relationnelle, requêtes optimisées",
    "Sécurité : OWASP Top 10, Argon2id, JWT, validation stricte",
    "DevOps : Git workflow, CI/CD, monitoring, documentation"
], Inches(0.9), Inches(2.1), Inches(8.2), Inches(2.4))

add_section_title(slide, "Valeur Livrée", Inches(4.8))
add_bullets(slide, [
    "APD : Vitrine immersive valorisant patrimoine diocésain",
    "CoolBooking : Plateforme location autonome et évolutive",
    "Code qualité : ESLint, tests, documentation vivante",
    "Architecture pérenne : Séparation concerns, scalabilité",
    "Vision claire : Roadmap court/long terme réaliste"
], Inches(0.9), Inches(5.5), Inches(8.2), Inches(1.6))

# ========== SLIDE 32: QUESTIONS & RÉPONSES ==========
slide = add_blank()
title_bar(slide, "QUESTIONS & RÉPONSES")

center_box = slide.shapes.add_textbox(Inches(1), Inches(2.5), Inches(8), Inches(2.2))
tf = center_box.text_frame
tf.text = "Merci pour votre attention !"
p = tf.paragraphs[0]
p.font.size = Pt(52)
p.font.bold = True
p.font.color.rgb = ROUGE
p.alignment = PP_ALIGN.CENTER

subtitle_box = slide.shapes.add_textbox(Inches(1), Inches(4.5), Inches(8), Inches(1))
tf = subtitle_box.text_frame
tf.text = "Je suis à votre disposition pour vos questions"
p = tf.paragraphs[0]
p.font.size = Pt(28)
p.font.color.rgb = NOIR
p.alignment = PP_ALIGN.CENTER

contact_box = slide.shapes.add_textbox(Inches(1), Inches(5.8), Inches(8), Inches(0.6))
tf = contact_box.text_frame
tf.text = "📧 contact@philippe-barbosa.dev  |  🔗 github.com/Vince-ALIEN"
p = tf.paragraphs[0]
p.font.size = Pt(18)
p.font.color.rgb = GRIS_FONCE
p.alignment = PP_ALIGN.CENTER

# ========== SAUVEGARDE ==========
prs.save('PRESENTATION_TP_DWWM_COMPLETE.pptx')
print('✅ Présentation complète générée : PRESENTATION_TP_DWWM_COMPLETE.pptx')
print(f'📊 Nombre de slides : {len(prs.slides)}')

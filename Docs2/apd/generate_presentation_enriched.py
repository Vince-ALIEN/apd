"""
Présentation enrichie inspirée de presentation.pdf et du dossier complet.
Génère PRESENTATION_TP_DWWM_ENRICHED.pptx (~25 slides).
"""
try:
	from pptx import Presentation
	from pptx.util import Inches, Pt
	from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
	from pptx.dml.color import RGBColor
except ImportError:
	raise SystemExit("Le module python-pptx est requis. Installez-le avec: pip install python-pptx")

ROUGE = RGBColor(172, 17, 21)
NOIR = RGBColor(23, 23, 23)
BLANC = RGBColor(255, 255, 255)
GRIS = RGBColor(237, 237, 237)

prs = Presentation()
prs.slide_width = Inches(10)
prs.slide_height = Inches(7.5)

# ---------- UTILITAIRES ---------- #
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
	p.font.size = Pt(30)
	p.font.bold = True
	p.font.color.rgb = BLANC
	p.alignment = PP_ALIGN.CENTER


def add_section_title(slide, text, y):
	box = slide.shapes.add_textbox(Inches(0.7), y, Inches(8.6), Inches(0.6))
	tf = box.text_frame
	tf.text = text
	p = tf.paragraphs[0]
	p.font.size = Pt(18)
	p.font.bold = True
	p.font.color.rgb = ROUGE


def add_bullets(slide, items, x, y, w, h, size=16, col=NOIR):
	box = slide.shapes.add_textbox(x, y, w, h)
	tf = box.text_frame
	tf.word_wrap = True
	first = True
	for item in items:
		p = tf.paragraphs[0] if first else tf.add_paragraph()
		first = False
		p.text = item
		p.font.size = Pt(size)
		p.font.color.rgb = col
		p.space_before = Pt(2)


def add_code(slide, code, x, y, w, h, size=13):
	box = slide.shapes.add_textbox(x, y, w, h)
	tf = box.text_frame
	tf.word_wrap = True
	p = tf.paragraphs[0]
	p.text = code
	p.font.size = Pt(size)
	p.font.name = "Courier New"
	p.font.color.rgb = NOIR


def slide_title():
	slide = add_blank()
	background = slide.background.fill
	background.solid()
	background.fore_color.rgb = ROUGE
	box = slide.shapes.add_textbox(Inches(1), Inches(2.3), Inches(8), Inches(1.3))
	ft = box.text_frame
	ft.text = "DOSSIER DE PROJET - TP DWWM"
	pt = ft.paragraphs[0]
	pt.font.size = Pt(50)
	pt.font.bold = True
	pt.font.color.rgb = BLANC
	pt.alignment = PP_ALIGN.CENTER
	sub = slide.shapes.add_textbox(Inches(1), Inches(3.9), Inches(8), Inches(0.9))
	fs = sub.text_frame
	fs.text = "APD (Frontend Next.js)  •  CoolBooking (Backend Express)"
	ps = fs.paragraphs[0]
	ps.font.size = Pt(24)
	ps.font.color.rgb = GRIS
	ps.alignment = PP_ALIGN.CENTER
	auth = slide.shapes.add_textbox(Inches(1), Inches(5.2), Inches(8), Inches(0.6))
	fa = auth.text_frame
	fa.text = "Philippe Barbosa – Janvier 2025"
	pa = fa.paragraphs[0]
	pa.font.size = Pt(20)
	pa.font.color.rgb = BLANC
	pa.alignment = PP_ALIGN.CENTER


def slide_sommaire():
	slide = add_blank()
	title_bar(slide, "SOMMAIRE")
	add_bullets(
		slide,
		[
			"1. Qui suis-je ?",
			"2. Équipe",
			"3. Genèse & Audience",
			"4. Organisation & Méthodologie",
			"5. Roadmap Sprints",
			"6. User Stories & Arborescence",
			"7. Wireframes & Maquettes",
			"8. Modèle de Données",
			"9. Dictionnaire des Données",
			"10. Stack & Gitflow",
			"11. Architecture",
			"12. Flux Back-End",
			"13. Structure Front-End",
			"14. Sécurité",
			"15. Réalisations Front",
			"16. Réalisations Back",
			"17. Tests & Performance",
			"18. Veille & Recherche",
			"19. Difficultés & Solutions",
			"20. Perspectives",
			"21. Conclusion",
			"22. Q&A",
		],
		Inches(0.8),
		Inches(1.4),
		Inches(8.5),
		Inches(5.4),
		size=15,
	)


def slide_identite():
	slide = add_blank()
	title_bar(slide, "QUI SUIS-JE ?")
	add_section_title(slide, "Parcours & Motivation", Inches(1.4))
	add_bullets(
		slide,
		[
			"Reconversion passion ancienne pour la tech",
			"Focus produit, performance, sécurité",
			"Objectif: maîtrise bout-en-bout (UX → API → DB)",
		],
		Inches(0.9),
		Inches(2.0),
		Inches(8.2),
		Inches(1.4),
	)
	add_section_title(slide, "Approche Apprentissage", Inches(3.9))
	add_bullets(
		slide,
		[
			"Docs officielles en priorité",
			"Prototypes rapides puis durcissement",
			"Veille structurée (Next.js / OWASP / Node)",
		],
		Inches(0.9),
		Inches(4.5),
		Inches(8.2),
		Inches(1.3),
	)


def build_all_slides():
	slide_title()
	slide_sommaire()
	slide_identite()
	# Les autres slides détaillées peuvent être réintroduites ici si nécessaire.


def main():
	build_all_slides()
	prs.save("PRESENTATION_TP_DWWM_ENRICHED.pptx")
	print("✅ Présentation enrichie générée : PRESENTATION_TP_DWWM_ENRICHED.pptx")


if __name__ == "__main__":
	main()
"""\nPrésentation enrichie inspirée de presentation.pdf et du dossier complet.\nGénère PRESENTATION_TP_DWWM_ENRICHED.pptx (~30 slides).\n"""\nfrom pptx import Presentation\nfrom pptx.util import Inches, Pt\nfrom pptx.enum.text import PP_ALIGN, MSO_ANCHOR\nfrom pptx.dml.color import RGBColor\n\nROUGE = RGBColor(172,17,21)\nNOIR = RGBColor(23,23,23)\nBLANC = RGBColor(255,255,255)\nGRIS = RGBColor(237,237,237)\n\nprs = Presentation()\nprs.slide_width = Inches(10)\nprs.slide_height = Inches(7.5)\n\n# ---------- UTILITAIRES ---------- #\ndef add_blank():\n    return prs.slides.add_slide(prs.slide_layouts[6])\n\ndef title_bar(slide, text):\n    shape = slide.shapes.add_shape(1, Inches(0), Inches(0), Inches(10), Inches(1.1))\n    shape.fill.solid(); shape.fill.fore_color.rgb = ROUGE\n    shape.line.color.rgb = ROUGE\n    tf = shape.text_frame; tf.text = text; tf.vertical_anchor = MSO_ANCHOR.MIDDLE\n    p = tf.paragraphs[0]; p.font.size = Pt(30); p.font.bold = True; p.font.color.rgb = BLANC; p.alignment = PP_ALIGN.CENTER\n\ndef add_section_title(slide, text, y):\n    box = slide.shapes.add_textbox(Inches(0.7), y, Inches(8.6), Inches(0.5))\n    tf = box.text_frame; tf.text = text\n    p = tf.paragraphs[0]; p.font.size = Pt(18); p.font.bold = True; p.font.color.rgb = ROUGE\n\ndef add_bullets(slide, items, x, y, w, h, size=16, col=NOIR, level0=True):\n    box = slide.shapes.add_textbox(x, y, w, h)\n    tf = box.text_frame; tf.word_wrap = True\n    for i, item in enumerate(items):\n        p = tf.paragraphs[0] if i==0 else tf.add_paragraph()\n        p.text = item; p.font.size = Pt(size); p.font.color.rgb = col; p.level = 0 if level0 else 1\n        p.space_before = Pt(2)\n\ndef add_code(slide, code, x, y, w, h, size=13):\n    box = slide.shapes.add_textbox(x, y, w, h)\n    tf = box.text_frame; tf.word_wrap = True\n    p = tf.paragraphs[0]; p.text = code; p.font.size = Pt(size); p.font.name = 'Courier New'; p.font.color.rgb = NOIR\n\n# ---------- SLIDES ---------- #\n# 1. Titre\nslide = add_blank()\nbackground = slide.background.fill; background.solid(); background.fore_color.rgb = ROUGE\nbox = slide.shapes.add_textbox(Inches(1), Inches(2.3), Inches(8), Inches(1.3))\nft = box.text_frame; ft.text = 'DOSSIER DE PROJET - TP DWWM'\npt = ft.paragraphs[0]; pt.font.size = Pt(50); pt.font.bold = True; pt.font.color.rgb = BLANC; pt.alignment = PP_ALIGN.CENTER\nsub = slide.shapes.add_textbox(Inches(1), Inches(3.9), Inches(8), Inches(0.9))\nfs = sub.text_frame; fs.text = 'APD (Frontend Next.js)  •  CoolBooking (Backend Express)'\nps = fs.paragraphs[0]; ps.font.size = Pt(24); ps.font.color.rgb = GRIS; ps.alignment = PP_ALIGN.CENTER\nauth = slide.shapes.add_textbox(Inches(1), Inches(5.2), Inches(8), Inches(0.6))\nfa = auth.text_frame; fa.text = 'Philippe Barbosa  –  Janvier 2025'\npa = fa.paragraphs[0]; pa.font.size = Pt(20); pa.font.color.rgb = BLANC; pa.alignment = PP_ALIGN.CENTER\n\n# 2 Sommaire\nslide = add_blank(); title_bar(slide, 'SOMMAIRE')\nadd_bullets(slide,[\n '1. Qui suis-je ?','2. Équipe','3. Genèse & Audience','4. Organisation & Méthodologie',\n '5. Roadmap Sprints','6. User Stories & Arborescence','7. Wireframes & Maquettes','8. Modèle de Données (MCD/MLD)',\n '9. Dictionnaire des Données','10. Stack & Gitflow','11. Architecture','12. Back-End Flux',\n '13. Front-End Structure','14. Sécurité','15. Réalisations Front','16. Réalisations Back',\n '17. Tests & Performance','18. Veille & Recherche','19. Difficultés & Solutions','20. Perspectives',\n '21. Conclusion','22. Q&A'\n ], Inches(0.8), Inches(1.4), Inches(8.5), Inches(5.4), size=15)\n\n# 3 Qui suis-je\nslide = add_blank(); title_bar(slide,'QUI SUIS-JE ?')\nadd_section_title(slide,'Parcours & Motivation', Inches(1.4))\nadd_bullets(slide,[\n 'Background reconversion (passion longue date pour tech)',\n 'Intérêt pour conception produit + performance + sécurité',\n 'Objectif : démontrer maîtrise bout-en-bout (UX → API → DB)'\n ], Inches(0.9), Inches(2), Inches(8.2), Inches(1.4))\nadd_section_title(slide,'Approche Apprentissage', Inches(3.9))\nadd_bullets(slide,[\n 'Documentation officielle en priorité', 'Prototypage rapide puis durcissement', 'Veille structurée hebdomadaire (Next.js, OWASP, Node)'\n ], Inches(0.9), Inches(4.5), Inches(8.2), Inches(1.3))\n\n# 4 Équipe (exemple format soutenance)\nslide = add_blank(); title_bar(slide,'ÉQUIPE (FORMAT TYPE)')\nadd_section_title(slide,'Rôles (répartition inspiration PDF)', Inches(1.4))\nadd_bullets(slide,[\n 'Product Owner / Scrum Master', 'Dev Frontend', 'Dev Backend', 'Git Master', 'Support QA'\n ], Inches(0.9), Inches(2.1), Inches(3.5), Inches(2.4))\nadd_section_title(slide,'Responsabilités Clés', Inches(4.7))\nadd_bullets(slide,[\n 'PO : vision produit, priorisation backlog',\n 'Front : intégration UI, performance, accessibilité',\n 'Back : endpoints, sécurité, persistance',\n 'Git Master : qualité intégrations, PR review',\n 'QA : scénarios tests, validation MVP'\n ], Inches(0.9), Inches(5.3), Inches(8.2), Inches(1.9))\n\n# 5 Genèse & Audience\nslide = add_blank(); title_bar(slide,'GENÈSE & AUDIENCE')\nadd_section_title(slide,'Constat APD', Inches(1.4))\nadd_bullets(slide,[\n 'Absence de vitrine digitale', 'Difficulté à mobiliser donateurs / partenaires', 'Patrimoine religieux en tension (financements)'\n ], Inches(0.9), Inches(2.0), Inches(4.2), Inches(1.2))\nadd_section_title(slide,'Audience APD', Inches(3.5))\nadd_bullets(slide,['Visiteurs','Donateurs','Partenaires','Administrateurs'], Inches(0.9), Inches(4.1), Inches(3.2), Inches(1.6))\nadd_section_title(slide,'Constat CoolBooking', Inches(5.2))\nadd_bullets(slide,[\n 'Plateformes généralistes à forte commission', 'Need contrôle données clients', 'Manque outil léger modulable'\n ], Inches(5.0), Inches(5.8), Inches(4.2), Inches(1.4))\n\n# 6 Organisation & Méthodologie\nslide = add_blank(); title_bar(slide,'ORGANISATION & MÉTHODOLOGIE')\nadd_section_title(slide,'Cadence', Inches(1.4))\nadd_bullets(slide,['Sprints hebdomadaires','Daily (points avancement / blocages)','Rétrospective fin de sprint'], Inches(0.9), Inches(2.0), Inches(3.4), Inches(1.2))\nadd_section_title(slide,'Outils', Inches(3.5))\nadd_bullets(slide,['Trello (Kanban)','Discord (synchro rapide)','GitHub (PR review)'], Inches(0.9), Inches(4.1), Inches(3.4), Inches(1.2))\nadd_section_title(slide,'Principes', Inches(5.2))\nadd_bullets(slide,['User Stories centrées valeur','MVP avant extensions','Documentation vivante'], Inches(5.0), Inches(5.8), Inches(4.2), Inches(1.2))\n\n# 7 Roadmap Sprints\nslide = add_blank(); title_bar(slide,'ROADMAP SPRINTS')\nadd_code(slide, 'Sprint 0 :\n - Initialisation repo / Environnement\n - Définition MVP / backlog haut niveau\nSprint 1 :\n - Wireframes / Charte graphique / Strapi setup\n - Base Next.js + composants scaffolding\nSprint 2 :\n - Intégration sections principales + API Users\n - Authentification JWT + Galerie / Blog\nSprint 3 :\n - Optimisations performance / Accessibilité\n - Upload multiples / Sécurité durcissement\nSprint Fix :\n - Corrections finales / Documentation / Packaging', Inches(0.9), Inches(1.6), Inches(8.2), Inches(4.8))\n\n# 8 User Stories & Arborescence\nslide = add_blank(); title_bar(slide,'USER STORIES & ARBORESCENCE')\nadd_section_title(slide,'Exemples User Stories APD', Inches(1.4))\nadd_bullets(slide,['Visiteur : Voir galerie pour apprécier patrimoine','Partenaire : Envoyer demande pour mécénat','Admin : Publier article pour informer avancement'], Inches(0.9), Inches(2.0), Inches(8.2), Inches(1.2))\nadd_section_title(slide,'Arborescence APD', Inches(3.5))\nadd_code(slide,'/\n  hero\n  introduction\n  description\n  interviews\n  architecture\n  gallery\n  blog (preview)\n  partners\n/blog\n/blog/[slug]\n/partners\n/association', Inches(0.9), Inches(4.1), Inches(3.5), Inches(3.1))\nadd_section_title(slide,'Endpoints CoolBooking', Inches(3.5))\nadd_code(slide,'/users (register, login, logout, dashboard, CRUD)\n/rentals (CRUD + upload images)', Inches(5.0), Inches(4.1), Inches(3.5), Inches(1.8))\n\n# 9 Wireframes & Maquettes\nslide = add_blank(); title_bar(slide,'WIREFRAMES & MAQUETTES')\nadd_section_title(slide,'Desktop (structure)', Inches(1.4))\nadd_code(slide,'[Header]\n[Video Hero]\n[Sections stack]\n[Footer]', Inches(0.9), Inches(2.0), Inches(3.5), Inches(1.6))\nadd_section_title(slide,'Mobile (simplification)', Inches(3.8))\nadd_code(slide,'[Burger]\n[Hero img]\n[Sections 1 colonne]\n[Sticky CTA Don]', Inches(0.9), Inches(4.4), Inches(3.5), Inches(1.8))\nadd_section_title(slide,'Principes UI', Inches(1.4))\nadd_bullets(slide,['Contraste fort (#AC1115 sur fond clair)','Lettrines décoratives Garamond','Animations progressives (scroll reveal)'], Inches(5.0), Inches(2.0), Inches(4.2), Inches(2.0))\n\n# 10 Modèle de Données (MCD)\nslide = add_blank(); title_bar(slide,'MODÈLE DE DONNÉES - MCD')\nadd_code(slide,'Strapi :\nEGLISE (1) --- ARTICLES (N)\nEGLISE (1) --- INTERVIEWS (N)\nPARTENAIRES (N)\n\nCoolBooking :\nUSERS (1) --- RENTALS (N)\n(Reservations future)\n', Inches(0.9), Inches(1.6), Inches(8.2), Inches(3.0))\nadd_section_title(slide,'Principes', Inches(4.9))\nadd_bullets(slide,['Simplicité MVP','Relations futures (tags, catégories, réservations)','JSON pour arrays URLs images'], Inches(0.9), Inches(5.5), Inches(8.2), Inches(1.6))\n\n# 11 Modèle Logique (MLD)\nslide = add_blank(); title_bar(slide,'MODÈLE LOGIQUE - MLD')\nadd_code(slide,'users(id, firstname, lastname, email UNIQUE, password HASH, phone, role ENUM, avatar, created_at)\nrentals(id, title, description, location, price_per_night DECIMAL, beds INT, images JSON, created_at)\n', Inches(0.9), Inches(1.6), Inches(8.2), Inches(2.4))\nadd_section_title(slide,'Conventions', Inches(4.3))\nadd_bullets(slide,['Noms explicites colonnes','TIMESTAMP auto pour tracking','ENUM rôle pour intégrité','JSON images flexible'], Inches(0.9), Inches(4.9), Inches(8.2), Inches(1.6))\n\n# 12 Dictionnaire Données\nslide = add_blank(); title_bar(slide,'DICTIONNAIRE DES DONNÉES')\nadd_code(slide,'users.email : VARCHAR(255) | unique | login principal\nusers.password : Argon2id hash | sécurité forte\nusers.role : ENUM(owner, tenant) | autorisations futures\nrentals.images : JSON[] | URLs Cloudinary (5 max)\nrentals.price_per_night : DECIMAL(10,2) | affichage €\n', Inches(0.9), Inches(1.6), Inches(8.2), Inches(3.0))\nadd_section_title(slide,'Qualité Données', Inches(4.9))\nadd_bullets(slide,['Validation côté API (Joi)','Unicité email','Types stricts pour prix / beds','Contrôles futur réservation'], Inches(0.9), Inches(5.5), Inches(8.2), Inches(1.6))\n\n# 13 Stack & Gitflow\nslide = add_blank(); title_bar(slide,'STACK & GITFLOW')\nadd_section_title(slide,'Frontend', Inches(1.4))\nadd_bullets(slide,['Next.js 15 / React 19','Tailwind CSS 4','GSAP 3.13','Lenis smooth scroll'], Inches(0.9), Inches(2.0), Inches(3.4), Inches(1.4))\nadd_section_title(slide,'Backend', Inches(3.6))\nadd_bullets(slide,['Express 5','MariaDB (mysql2)','Cloudinary uploads','Joi validation'], Inches(0.9), Inches(4.2), Inches(3.4), Inches(1.4))\nadd_section_title(slide,'Gitflow', Inches(5.2))\nadd_bullets(slide,['feature/* branches','PR review obligatoire','staging → main (déploiement)','Commits atomiques conventionnels'], Inches(5.0), Inches(5.8), Inches(4.2), Inches(1.6))\n\n# 14 Architecture Globale\nslide = add_blank(); title_bar(slide,'ARCHITECTURE')\nadd_code(slide,'Client (Browser / Mobile)\n    ↓\nNext.js Frontend (SSR + RSC)\n    ↓ (REST fetch)\nStrapi CMS  /  CoolBooking API\n    ↓\nPostgreSQL      MariaDB + Cloudinary', Inches(0.9), Inches(1.6), Inches(8.2), Inches(3.0))\nadd_section_title(slide,'Objectifs Architecture', Inches(4.9))\nadd_bullets(slide,['Séparation claire des responsabilités','Évolutivité modules futurs','Performance (SSR / CDN médias)','Facilité tests & maintenance'], Inches(0.9), Inches(5.5), Inches(8.2), Inches(1.6))\n\n# 15 Flux Back-End\nslide = add_blank(); title_bar(slide,'FLUX BACK-END')\nadd_code(slide,'Request → Router → Middleware (auth, upload) → Controller → Service (logique) → Repository (SQL) → DB\n\nAuth : login → verifyPassword → jwt.sign → cookie HttpOnly\nProtected : dashboard → verifyToken → attach req.user', Inches(0.9), Inches(1.6), Inches(8.2), Inches(2.6))\nadd_section_title(slide,'Avantages', Inches(4.5))\nadd_bullets(slide,['Testabilité accrue','Isolation erreurs','Réutilisation logique','Facilité évolution (ex: réservations)'], Inches(0.9), Inches(5.1), Inches(8.2), Inches(1.6))\n\n# 16 Structure Front-End\nslide = add_blank(); title_bar(slide,'STRUCTURE FRONT-END')\nadd_code(slide,'/app\n  page.jsx (sections)\n  blog/[slug]\n/components\n  VideoBackground / Gallery / PartnerSection / ...\n/hooks\n  useSiteData / useIsMobile\n/contexts\n  HeaderDonationContext', Inches(0.9), Inches(1.6), Inches(8.2), Inches(2.6))\nadd_section_title(slide,'Principes', Inches(4.5))\nadd_bullets(slide,['Découpage sémantique','Hooks réutilisables','Animations isolées','Chargements progressifs'], Inches(0.9), Inches(5.1), Inches(8.2), Inches(1.6))\n\n# 17 Sécurité\nslide = add_blank(); title_bar(slide,'SÉCURITÉ')\nadd_section_title(slide,'Implémenté', Inches(1.4))\nadd_bullets(slide,['Argon2id hashing','JWT expirant (24h)','Cookies HttpOnly + SameSite','Requêtes paramétrées','Validation Joi'], Inches(0.9), Inches(2.0), Inches(3.4), Inches(1.8))\nadd_section_title(slide,'À Renforcer', Inches(4.2))\nadd_bullets(slide,['Rate limiting','Helmet headers','Audit logs','Refresh tokens','2FA futur'], Inches(5.0), Inches(2.0), Inches(3.4), Inches(1.8))\nadd_section_title(slide,'OWASP Focus', Inches(5.2))\nadd_bullets(slide,['A01 Accès','A02 Cryptographie','A03 Injection','A05 Config','A07 Auth'], Inches(5.0), Inches(5.8), Inches(3.4), Inches(1.4))\n\n# 18 Réalisations Front\nslide = add_blank(); title_bar(slide,'RÉALISATIONS FRONT')\nadd_section_title(slide,'Animations GSAP', Inches(1.4))\nadd_bullets(slide,['Reveal text cascade','ScrollTrigger sections','Pulse CTA donation'], Inches(0.9), Inches(2.0), Inches(3.4), Inches(1.2))\nadd_section_title(slide,'Hooks', Inches(3.5))\nadd_bullets(slide,['useSiteData (fetch + timeout)','useIsMobile (media queries)','Context donation (CTA state)'], Inches(0.9), Inches(4.1), Inches(3.4), Inches(1.4))\nadd_section_title(slide,'Optimisation', Inches(5.2))\nadd_bullets(slide,['Lazy blog section','Priority assets hero','Responsive images Cloudinary'], Inches(5.0), Inches(5.8), Inches(4.2), Inches(1.4))\n\n# 19 Réalisations Back\nslide = add_blank(); title_bar(slide,'RÉALISATIONS BACK')\nadd_section_title(slide,'Auth & JWT', Inches(1.4))\nadd_bullets(slide,['verifyPassword (hash + token)','verifyToken middleware','clearCookie logout'], Inches(0.9), Inches(2.0), Inches(3.4), Inches(1.2))\nadd_section_title(slide,'Repository Pattern', Inches(3.5))\nadd_bullets(slide,['Encapsulation SQL','Validation email unique','Update dynamique'], Inches(0.9), Inches(4.1), Inches(3.4), Inches(1.4))\nadd_section_title(slide,'Uploads', Inches(5.2))\nadd_bullets(slide,['Multer temp → Cloudinary','Suppression fichiers locaux','Limite 5 images / annonce'], Inches(5.0), Inches(5.8), Inches(4.2), Inches(1.4))\n\n# 20 Tests & Performance\nslide = add_blank(); title_bar(slide,'TESTS & PERFORMANCE')\nadd_section_title(slide,'APD', Inches(1.4))\nadd_bullets(slide,['Lighthouse Perf 92 Desktop','Accessibilité 90','SEO 100','Animations fluides (<16ms frame)'], Inches(0.9), Inches(2.0), Inches(3.8), Inches(2.0))\nadd_section_title(slide,'CoolBooking', Inches(4.3))\nadd_bullets(slide,['18 requêtes Postman','GET /rentals < 60ms','Uploads Cloudinary 1.2s','Erreurs gérées JSON'], Inches(5.0), Inches(2.0), Inches(3.8), Inches(2.0))\nadd_section_title(slide,'À venir', Inches(5.2))\nadd_bullets(slide,['Tests Jest','CI/CD Actions','Monitoring Sentry','Rate limiting'], Inches(0.9), Inches(4.6), Inches(8.2), Inches(1.4))\n\n# 21 Veille & Recherche\nslide = add_blank(); title_bar(slide,'VEILLE & RECHERCHE')\nadd_section_title(slide,'Sources', Inches(1.4))\nadd_bullets(slide,['Next.js / React blogs','OWASP / Snyk','MariaDB KB','GSAP forums'], Inches(0.9), Inches(2.0), Inches(3.4), Inches(1.6))\nadd_section_title(slide,'Méthode', Inches(3.6))\nadd_bullets(slide,['Priorité docs officielles','Validation date / fraîcheur','Tests proof-of-concept rapides'], Inches(0.9), Inches(4.2), Inches(3.4), Inches(1.6))\nadd_section_title(slide,'Objectifs', Inches(5.2))\nadd_bullets(slide,['Décisions informées','Réduction risques sécurité','Alignement bonnes pratiques'], Inches(5.0), Inches(5.8), Inches(4.2), Inches(1.6))\n\n# 22 Difficultés & Solutions\nslide = add_blank(); title_bar(slide,'DIFFICULTÉS & SOLUTIONS')\nadd_bullets(slide,[\n 'Poids vidéo hero → compression (objectif -40%)',\n 'Conflits smooth scroll & ScrollTrigger → ajustement offsets',\n 'Email duplicate users → vérification repository',\n 'Gestion multi-upload → boucle Cloudinary + cleanup',\n 'Perf mobile → fallback image / préchargement conditionnel'\n ], Inches(0.9), Inches(1.6), Inches(8.2), Inches(4.8))\n\n# 23 Perspectives\nslide = add_blank(); title_bar(slide,'PERSPECTIVES')\nadd_section_title(slide,'APD (3 mois)', Inches(1.4))\nadd_bullets(slide,['Newsletter & Événements','Multilingue / Mode sombre','Analytics conversions','PWA / Offline assets'], Inches(0.9), Inches(2.0), Inches(3.4), Inches(1.8))\nadd_section_title(slide,'CoolBooking (3 mois)', Inches(4.3))\nadd_bullets(slide,['Réservations / Stripe','Filtres avancés / recherche','Messagerie interne','Swagger + tests Jest'], Inches(5.0), Inches(2.0), Inches(4.2), Inches(1.8))\nadd_section_title(slide,'Long terme', Inches(5.2))\nadd_bullets(slide,['Mobile React Native','Microservices découplés','Observabilité complète','Optimisation coûts Cloud'], Inches(0.9), Inches(4.6), Inches(8.2), Inches(1.6))\n\n# 24 Conclusion\nslide = add_blank(); title_bar(slide,'CONCLUSION')\nadd_bullets(slide,[\n 'Maîtrise cycle complet (idéation → prod)',\n 'Solide base sécurité / évolutivité',\n 'Qualité livrables (documentation, tests, structuration)',\n 'Prêt à industrialiser (CI/CD, ORMs, observabilité)'\n ], Inches(0.9), Inches(1.6), Inches(8.2), Inches(3.2))\nadd_section_title(slide,'Focus Valeur', Inches(4.9))\nadd_bullets(slide,['Expérience utilisateur immersive','Backend propre et extensible','Vision claire évolutions'], Inches(0.9), Inches(5.5), Inches(8.2), Inches(1.6))\n\n# 25 Q&A\nslide = add_blank(); title_bar(slide,'Q & A')\nbox = slide.shapes.add_textbox(Inches(1), Inches(2.5), Inches(8), Inches(2))\nft = box.text_frame; ft.text = 'Merci pour votre attention !'\npt = ft.paragraphs[0]; pt.font.size = Pt(40); pt.font.bold = True; pt.font.color.rgb = ROUGE; pt.alignment = PP_ALIGN.CENTER\nsub = slide.shapes.add_textbox(Inches(1), Inches(4.3), Inches(8), Inches(1))\nfs = sub.text_frame; fs.text = 'Questions / Retours / Discussion'\nps = fs.paragraphs[0]; ps.font.size = Pt(26); ps.font.color.rgb = NOIR; ps.alignment = PP_ALIGN.CENTER\n\nprs.save('PRESENTATION_TP_DWWM_ENRICHED.pptx')\nprint('✅ Présentation enrichie générée : PRESENTATION_TP_DWWM_ENRICHED.pptx')
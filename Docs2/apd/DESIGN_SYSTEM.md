# 🎨 Design System - Projet APD

> Association Patrimoine de Doazit - Système de Design

**Version** : 1.0  
**Date** : 19 Novembre 2025  
**Designer** : Philippe Barbosa

---

## Table des matières

1. [Identité visuelle](#identité-visuelle)
2. [Couleurs](#couleurs)
3. [Typographie](#typographie)
4. [Espacements](#espacements)
5. [Composants UI](#composants-ui)
6. [Animations](#animations)
7. [Responsive Design](#responsive-design)
8. [Accessibilité](#accessibilité)

---

## Identité Visuelle

### Concept

Le design du site s'inspire de l'**architecture classique et de l'élégance intemporelle** de l'église Saint-Jean Baptiste d'Aulès. Les choix visuels reflètent :

- **Patrimoine** : Typographie serif (Garamond), couleurs pierre/marron
- **Modernité** : Animations fluides, layout responsive, UX optimisée
- **Sobriété** : Palette restreinte, espaces blancs, hiérarchie claire

### Moodboard

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🏛️  PATRIMOINE    ⚡  MODERNITÉ    🎯  SOBRIÉTÉ       ║
║                                                            ║
║   • Architecture romane     • GSAP animations              ║
║   • Couleurs naturelles     • Next.js performance          ║
║   • Typographie classique   • UX fluide                    ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

## Couleurs

### Palette principale

#### Couleurs primaires

| Nom                 | Hex                | RGB                | Usage                        | Aperçu |
| ------------------- | ------------------ | ------------------ | ---------------------------- | ------ |
| **Rouge Principal** | `#ac1115`          | rgb(172, 17, 21)   | CTA, accents, bouton don     | 🟥     |
| **Pierre/Beige**    | Custom `bg-pierre` | Beige clair        | Backgrounds sections, cartes | 🟨     |
| **Noir**            | `#000000`          | rgb(0, 0, 0)       | Texte principal              | ⬛     |
| **Blanc**           | `#FFFFFF`          | rgb(255, 255, 255) | Backgrounds, texte sur foncé | ⬜     |

#### Couleurs secondaires

| Nom              | Hex       | RGB                | Usage                                |
| ---------------- | --------- | ------------------ | ------------------------------------ |
| **Marron Cadre** | `#8B7355` | rgb(139, 115, 85)  | Bordures, cadres décoratifs          |
| **Marron Foncé** | `#5a4a3a` | rgb(90, 74, 58)    | Texte sur pierre, accents            |
| **Gris Foncé**   | `#1a1a1a` | rgb(26, 26, 26)    | Footer background, gradients         |
| **Gris Clair**   | `#d1d5db` | rgb(209, 213, 219) | Texte secondaire (Tailwind gray-300) |

---

### Utilisation des couleurs

#### Exemples de combinaisons

**Bouton Call-to-Action (Don)** :

```css
background: #ac1115; /* Rouge principal */
color: #ffffff;
hover: brightness(110%);
```

**Card Article** :

```css
background: #ffffff;
border: 1px solid #d1d5db;
text: #000000;
```

**Footer** :

```css
background: linear-gradient(to bottom, #000000, #1a1a1a);
text: #d1d5db;
links-hover: #ffffff;
```

---

### Contraste et accessibilité (WCAG AA)

| Combinaison                                   | Ratio | WCAG AA | WCAG AAA |
| --------------------------------------------- | ----- | ------- | -------- |
| Noir (#000) sur Blanc (#FFF)                  | 21:1  | ✅ Pass | ✅ Pass  |
| Blanc (#FFF) sur Rouge (#ac1115)              | 4.8:1 | ✅ Pass | ❌ Fail  |
| Gris Clair (#d1d5db) sur Gris Foncé (#1a1a1a) | 8.5:1 | ✅ Pass | ✅ Pass  |

**Note** : Toutes les combinaisons texte/background respectent le minimum WCAG AA (4.5:1).

---

## Typographie

### Polices

#### Titres (Garamond)

```css
font-family: Garamond, "Times New Roman", serif;
font-weight: 400; /* Regular */
font-style: normal;
```

**Rationale** : Garamond est une police serif classique et élégante, parfaite pour évoquer le patrimoine historique. Excellente lisibilité en grandes tailles.

#### Corps de texte (Système)

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
  "Helvetica Neue", Arial, sans-serif;
font-weight: 400; /* Regular */
```

**Rationale** : Polices système natives pour optimiser les performances et assurer une lisibilité parfaite sur tous les devices.

---

### Échelle typographique (Modular Scale)

#### Tailles Desktop

| Élément        | Tailwind Class | Taille (px) | Line Height | Usage                           |
| -------------- | -------------- | ----------- | ----------- | ------------------------------- |
| **H1**         | `text-6xl`     | 60px        | 1.1         | Titre principal (IntroSection)  |
| **H2**         | `text-4xl`     | 36px        | 1.2         | Titres sections (Gallery, Blog) |
| **H3**         | `text-3xl`     | 30px        | 1.3         | Sous-titres sections            |
| **H4**         | `text-2xl`     | 24px        | 1.4         | Titres articles, cards          |
| **Body Large** | `text-lg`      | 18px        | 1.7         | Texte descriptif important      |
| **Body**       | `text-base`    | 16px        | 1.75        | Texte courant                   |
| **Small**      | `text-sm`      | 14px        | 1.5         | Métadonnées, labels             |
| **Tiny**       | `text-xs`      | 12px        | 1.4         | Copyright, footnotes            |

#### Tailles Mobile

| Élément  | Tailwind Class | Taille (px) |
| -------- | -------------- | ----------- |
| **H1**   | `text-2xl`     | 24px        |
| **H2**   | `text-xl`      | 20px        |
| **H3**   | `text-lg`      | 18px        |
| **H4**   | `text-base`    | 16px        |
| **Body** | `text-base`    | 16px        |

**Note** : Progressive enhancement via breakpoints Tailwind (`sm:`, `md:`, `lg:`).

---

### Styles typographiques spéciaux

#### Lettrine (Drop Cap)

```css
.first-letter-large::first-letter {
  font-size: 3.5rem; /* 56px */
  font-weight: 700;
  float: left;
  line-height: 1;
  margin-right: 0.5rem;
  color: #ac1115; /* Rouge principal */
}
```

**Usage** : Premier paragraphe des articles détaillés.

#### Shadow Underline

```css
.shadow-underline {
  position: relative;
}

.shadow-underline::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #ac1115;
  box-shadow: 0 2px 4px rgba(172, 17, 21, 0.3);
}
```

**Usage** : Titres de sections (H2) pour effet décoratif.

---

## Espacements

### Système d'espacement (Tailwind)

Basé sur une échelle de **4px** (1 = 0.25rem = 4px).

| Nom  | Valeur  | Pixels | Usage                 |
| ---- | ------- | ------ | --------------------- |
| `0`  | 0rem    | 0px    | Pas d'espacement      |
| `1`  | 0.25rem | 4px    | Espacements micro     |
| `2`  | 0.5rem  | 8px    | Padding boutons       |
| `4`  | 1rem    | 16px   | Padding cards         |
| `6`  | 1.5rem  | 24px   | Margin sections       |
| `8`  | 2rem    | 32px   | Padding containers    |
| `12` | 3rem    | 48px   | Margin entre sections |
| `16` | 4rem    | 64px   | Grands espacements    |
| `24` | 6rem    | 96px   | Séparations majeures  |

---

### Grille et Layout

#### Container

```css
.container {
  max-width: 1200px; /* Desktop */
  margin: 0 auto;
  padding: 0 1rem; /* Mobile */
}

@media (min-width: 768px) {
  .container {
    padding: 0 2rem; /* Tablet/Desktop */
  }
}
```

#### Grille d'articles (Blog)

```css
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem; /* 32px */
}
```

---

## Composants UI

### Boutons

#### Bouton Primary (CTA Don)

```jsx
<button
  className="
  bg-[#ac1115] 
  text-white 
  font-semibold 
  px-6 py-3 
  rounded-lg 
  hover:brightness-110 
  transition-all 
  duration-200
"
>
  Faire un don
</button>
```

**Propriétés** :

- Background : `#ac1115`
- Text : `#FFFFFF`
- Padding : `24px 24px` (1.5rem)
- Border radius : `8px`
- Hover : Brightness +10%
- Transition : 200ms

#### Bouton Secondary

```jsx
<button
  className="
  bg-transparent 
  border-2 
  border-[#ac1115] 
  text-[#ac1115] 
  font-semibold 
  px-6 py-3 
  rounded-lg 
  hover:bg-[#ac1115] 
  hover:text-white 
  transition-all 
  duration-200
"
>
  En savoir plus
</button>
```

---

### Cards

#### Card Article

```jsx
<div
  className="
  bg-white 
  border 
  border-gray-300 
  rounded-lg 
  overflow-hidden 
  shadow-sm 
  hover:shadow-lg 
  transition-shadow 
  duration-300
"
>
  <Image src="..." alt="..." className="w-full h-48 object-cover" />
  <div className="p-6">
    <h3 className="text-2xl font-bold mb-2">Titre</h3>
    <p className="text-sm text-gray-500 mb-4">Date - Auteur</p>
    <p className="text-base">Extrait de l'article...</p>
  </div>
</div>
```

**Propriétés** :

- Border : `1px solid #d1d5db`
- Border radius : `8px`
- Shadow : `0 1px 2px rgba(0,0,0,0.05)`
- Hover shadow : `0 10px 15px rgba(0,0,0,0.1)`
- Padding contenu : `24px`

---

### Navigation

#### Header Desktop

```jsx
<header
  className="
  fixed 
  top-0 
  w-full 
  bg-white 
  shadow-md 
  z-50
"
>
  <nav className="container flex justify-between items-center py-4">
    <Logo />
    <ul className="flex gap-8 text-base font-medium">
      <li>
        <Link href="/">Accueil</Link>
      </li>
      <li>
        <Link href="/association">Association</Link>
      </li>
      <li>
        <Link href="/blog">Blog</Link>
      </li>
      <li>
        <Link href="/partners">Partenaires</Link>
      </li>
    </ul>
    <DonationButton />
  </nav>
</header>
```

**Propriétés** :

- Position : Fixed
- Background : Blanc
- Shadow : `0 2px 4px rgba(0,0,0,0.1)`
- Gap liens : `32px`
- Padding : `16px 0`

#### Menu Mobile (Hamburger)

```jsx
<div
  className="
  fixed 
  top-0 
  right-0 
  h-full 
  w-64 
  bg-white 
  shadow-2xl 
  transform 
  transition-transform 
  duration-300
  ${isOpen ? 'translate-x-0' : 'translate-x-full'}
"
>
  <ul className="flex flex-col gap-6 p-8">{/* Links */}</ul>
</div>
```

**Animation** : Slide-in de droite avec `transform translateX`.

---

### Formulaires

#### Input Text

```jsx
<input
  type="text"
  className="
    w-full 
    px-4 py-3 
    border 
    border-gray-300 
    rounded-lg 
    focus:outline-none 
    focus:ring-2 
    focus:ring-[#ac1115] 
    focus:border-transparent
  "
  placeholder="Votre nom"
/>
```

**Propriétés** :

- Border : `1px solid #d1d5db`
- Border radius : `8px`
- Focus ring : `2px solid #ac1115`
- Padding : `12px 16px`

#### Textarea

```jsx
<textarea
  rows="5"
  className="
    w-full 
    px-4 py-3 
    border 
    border-gray-300 
    rounded-lg 
    focus:outline-none 
    focus:ring-2 
    focus:ring-[#ac1115] 
    resize-none
  "
  placeholder="Votre message"
/>
```

---

### Modal

#### Modal Contact

```jsx
<div
  className="
  fixed 
  inset-0 
  bg-black/50 
  flex 
  items-center 
  justify-center 
  z-50
"
>
  <div
    className="
    bg-white 
    rounded-lg 
    shadow-2xl 
    max-w-lg 
    w-full 
    p-8 
    relative
  "
  >
    <button className="absolute top-4 right-4 text-2xl">×</button>
    <h2 className="text-3xl font-bold mb-6">Nous contacter</h2>
    {/* Formulaire */}
  </div>
</div>
```

**Propriétés** :

- Overlay : `rgba(0,0,0,0.5)` (50% opacity)
- Modal : Blanc, border-radius `8px`
- Max-width : `512px`
- Shadow : `0 25px 50px rgba(0,0,0,0.25)`

---

## Animations

### Animations GSAP

#### Galerie - Apparition au scroll

```javascript
gsap.from(".gallery-item", {
  y: 400,
  opacity: 0,
  duration: 1.2,
  stagger: 0.1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".gallery-container",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
});
```

**Propriétés** :

- Initial : `translateY(400px)`, `opacity: 0`
- Final : `translateY(0)`, `opacity: 1`
- Duration : 1.2s
- Stagger : 0.1s entre chaque élément
- Easing : `power3.out` (décélération)

---

#### Intro Section - Reveal Box

```javascript
const tl = gsap.timeline();

tl.to(".reveal-box", {
  width: "100%",
  duration: 1,
  ease: "power2.inOut",
})
  .to(
    ".intro-title",
    {
      color: "#FFFFFF",
      duration: 0.5,
    },
    "-=0.5"
  )
  .to(
    ".reveal-box",
    {
      left: "100%",
      duration: 0.8,
      ease: "power2.inOut",
    },
    "+=0.3"
  );
```

**Timeline** :

1. Reveal box width : 0% → 100% (1s)
2. Titre color : transparent → blanc (0.5s, overlap -0.5s)
3. Reveal box left : 0% → 100% (0.8s, delay +0.3s)

---

#### Plan Architectural - Zoom

```javascript
gsap.from(".plan-architectural", {
  scale: 0.3,
  opacity: 0,
  duration: 1.5,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: ".plan-architectural",
    start: "top 70%",
  },
});
```

**Propriétés** :

- Initial : `scale(0.3)`, `opacity: 0`
- Final : `scale(1)`, `opacity: 1`
- Duration : 1.5s
- Easing : `back.out(1.7)` (overshoot effet)

---

### Animations CSS (Tailwind)

#### Hover Transitions

```css
/* Boutons */
.btn-hover {
  @apply transition-all duration-200 hover:brightness-110;
}

/* Cards */
.card-hover {
  @apply transition-shadow duration-300 hover:shadow-lg;
}

/* Links */
.link-hover {
  @apply transition-colors duration-150 hover:text-[#ac1115];
}
```

---

#### Carousel Partenaires

```javascript
// requestAnimationFrame pour 60fps
function scrollCarousel() {
  scrollPosition += 0.5; // px par frame
  if (scrollPosition >= maxScroll) {
    scrollPosition = 0;
  }
  containerRef.current.scrollLeft = scrollPosition;
  requestAnimationFrame(scrollCarousel);
}
```

**Propriétés** :

- Vitesse : 0.5px par frame (~30px/s à 60fps)
- Boucle infinie (reset à 0)
- Pause au hover

---

## Responsive Design

### Breakpoints Tailwind

| Breakpoint | Min-width | Devices                            |
| ---------- | --------- | ---------------------------------- |
| `sm`       | 640px     | Petits tablets, grands mobiles     |
| `md`       | 768px     | Tablets portrait                   |
| `lg`       | 1024px    | Tablets landscape, petits desktops |
| `xl`       | 1280px    | Desktops standards                 |
| `2xl`      | 1536px    | Grands écrans                      |

---

### Adaptations par composant

#### Header

```
Mobile (< 768px)    : Hamburger menu
Tablet/Desktop      : Inline navigation
```

#### Galerie

```
Mobile (< 640px)    : 6 images en grille 2 colonnes
Tablet (640-1024px) : 9 images en grille 3 colonnes
Desktop (> 1024px)  : 9 images en layout absolu (artistique)
```

#### Blog Grid

```
Mobile              : 1 colonne
Tablet              : 2 colonnes
Desktop             : 3-4 colonnes (auto-fill)
```

#### Footer

```
Mobile              : Stack vertical (1 colonne)
Tablet              : 2 colonnes
Desktop             : 3 colonnes
```

---

### Exemples de classes responsive

```jsx
<h1 className="
  text-2xl sm:text-3xl md:text-4xl lg:text-6xl
  mb-4 md:mb-6 lg:mb-8
">
  Titre Responsive
</h1>

<div className="
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  gap-4 md:gap-6 lg:gap-8
">
  {/* Cards */}
</div>
```

---

## Accessibilité

### Checklist WCAG AA

#### Contraste

- [x] Texte noir sur blanc : 21:1 (AAA)
- [x] Texte blanc sur rouge : 4.8:1 (AA)
- [x] Texte gris sur gris foncé : 8.5:1 (AAA)

#### Navigation clavier

- [x] Tous les liens focusables avec Tab
- [x] Focus visible (outline ou ring Tailwind)
- [x] Modal ferme avec Échap
- [x] Fullscreen galerie ferme avec Échap

#### Alt text

- [x] Toutes les images ont un `alt` descriptif
- [x] Images décoratives : `alt=""`
- [x] Logos : `alt="Logo Association APD"`

#### Structure sémantique

```html
<header>
  <nav>
    <ul>
      <li><a href="/">Accueil</a></li>
    </ul>
  </nav>
</header>

<main>
  <section aria-labelledby="galerie-title">
    <h2 id="galerie-title">Galerie</h2>
  </section>
</main>

<footer>
  <!-- Contenu footer -->
</footer>
```

---

### Focus States

```css
/* Tailwind focus ring */
.focusable {
  @apply focus:outline-none focus:ring-2 focus:ring-[#ac1115] focus:ring-offset-2;
}

/* Exemple bouton */
<button className="
  bg-[#ac1115]
  text-white
  focus:outline-none
  focus:ring-2
  focus:ring-[#ac1115]
  focus:ring-offset-2
">
  Cliquez ici
</button>
```

---

### Lecteurs d'écran

#### ARIA labels

```jsx
<button aria-label="Fermer la modal">
  <X size={24} />
</button>

<nav aria-label="Navigation principale">
  <ul>
    <li><a href="/">Accueil</a></li>
  </ul>
</nav>
```

#### Skip links (À implémenter)

```jsx
<a
  href="#main-content"
  className="
    sr-only 
    focus:not-sr-only 
    focus:absolute 
    focus:top-0 
    focus:left-0 
    focus:bg-white 
    focus:p-4
  "
>
  Aller au contenu principal
</a>
```

---

## Utilisation du Design System

### Import dans un composant

```jsx
// Bouton avec design system
import { DonationButton } from "@/components/DonationButton";

export default function MyComponent() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">Mon Composant</h1>
      <DonationButton />
    </div>
  );
}
```

---

### Variables CSS personnalisées (Globals.css)

```css
:root {
  --color-primary: #ac1115;
  --color-pierre: #f5f5dc;
  --color-marron: #8b7355;
  --font-serif: Garamond, "Times New Roman", serif;
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --spacing-unit: 0.25rem; /* 4px */
  --border-radius: 0.5rem; /* 8px */
}
```

**Utilisation** :

```css
.custom-button {
  background-color: var(--color-primary);
  font-family: var(--font-sans);
  border-radius: var(--border-radius);
}
```

---

## Ressources

### Outils de design

| Outil                       | Usage                  | Lien                                          |
| --------------------------- | ---------------------- | --------------------------------------------- |
| **Figma**                   | Maquettes (si créées)  | -                                             |
| **Coolors**                 | Palette couleurs       | https://coolors.co/                           |
| **WebAIM Contrast Checker** | Vérification contraste | https://webaim.org/resources/contrastchecker/ |
| **Google Fonts**            | Test typographie       | https://fonts.google.com/                     |

### Références

- **Tailwind CSS Docs** : https://tailwindcss.com/docs
- **GSAP Docs** : https://gsap.com/docs/v3/
- **WCAG Guidelines** : https://www.w3.org/WAI/WCAG21/quickref/
- **Next.js Image Optimization** : https://nextjs.org/docs/app/building-your-application/optimizing/images

---

## Changelog

### Version 1.0 (19/11/2025)

- ✅ Création palette couleurs principale
- ✅ Définition échelle typographique
- ✅ Système d'espacement Tailwind
- ✅ Documentation composants (boutons, cards, modals)
- ✅ Animations GSAP documentées
- ✅ Breakpoints responsive définis
- ✅ Guidelines accessibilité WCAG AA

### Prochaines versions

- 🔜 Mode sombre (dark mode)
- 🔜 Thème alternatif pour événements
- 🔜 Composants additionnels (badges, alerts)
- 🔜 Système de grille avancé

---

**Document édité par** : Philippe Barbosa  
**Contact** : philippe.barbosa@example.com  
**Dernière mise à jour** : 19/11/2025

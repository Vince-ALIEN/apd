# 📐 Wireframes - Association Patrimoine de Doazit

> Documentation des wireframes et structure des pages pour le projet APD

---

## 📱 Breakpoints Responsive

- **Mobile** : < 640px (sm)
- **Tablet** : 640px - 768px (md)
- **Desktop** : > 768px (lg, xl)

---

## 🏠 PAGE ACCUEIL (/)

### Section 1 : Hero / Introduction (IntroSection)

#### Desktop (> 768px)

```
┌────────────────────────────────────────────────────────────────┐
│                         [HEADER]                               │
│  [Logo]              [Nav Links]           [Bouton Don]        │
└────────────────────────────────────────────────────────────────┘
│                                                                │
│                    [VIDEO BACKGROUND]                          │
│                    (Vidéo plein écran)                         │
│                                                                │
│                  ╔════════════════════╗                        │
│                  ║   "Aidez-nous à    ║                        │
│                  ║    préserver ce    ║                        │
│                  ║ trésor du patrimoine"║                      │
│                  ╚════════════════════╝                        │
│                                                                │
│              ┌──────────────────────────┐                      │
│              │  [Révélation animée]     │                      │
│              │   ÉGLISE                 │  (effet reveal box)  │
│              │   SAINT-JEAN BAPTISTE    │                      │
│              │   D'AULÈS                │                      │
│              └──────────────────────────┘                      │
│                                                                │
│                  [BOUTON "FAIRE UN DON"]                       │
│                                                                │
│                        ↓                                       │
│                  [Scroll Indicator]                            │
│                                                                │
│                  [🔊 Bouton Mute]  (coin bas droite)          │
└────────────────────────────────────────────────────────────────┘
```

#### Mobile (< 640px)

```
┌──────────────────────┐
│     [HEADER]         │
│  [☰]         [Don]   │
├──────────────────────┤
│   [VIDEO BG]         │
│                      │
│  "Aidez-nous à       │
│   préserver"         │
│                      │
│   ÉGLISE             │
│   SAINT-JEAN         │
│   BAPTISTE           │
│   D'AULÈS            │
│                      │
│  [FAIRE UN DON]      │
│        ↓             │
│                      │
│  [🔊]                │
└──────────────────────┘
```

---

### Section 2 : Description de l'Église (DescriptionSection)

#### Desktop - Slider Horizontal

```
┌────────────────────────────────────────────────────────────────┐
│                     [BG PIERRE]                                │
│                                                                │
│  SLIDE 1 (Description)          SLIDE 2 (Galerie)              │
│  ┌─────────────────┐            ┌──────────────────┐          │
│  │  Texte          │            │  [9 images]      │          │
│  │  ──────         │            │  ┌──┐ ┌──┐ ┌──┐ │          │
│  │  Église         │            │  │  │ │  │ │  │ │          │
│  │  Saint-Jean     │            │  └──┘ └──┘ └──┘ │          │
│  │  Baptiste       │            │  ┌──┐ ┌──┐ ┌──┐ │          │
│  │  d'Aulès        │            │  │  │ │  │ │  │ │          │
│  │                 │            │  └──┘ └──┘ └──┘ │          │
│  │  [Description]  │            │  ┌──┐ ┌──┐ ┌──┐ │          │
│  │                 │            │  │  │ │  │ │  │ │          │
│  └─────────────────┘            │  └──┘ └──┘ └──┘ │          │
│                                 └──────────────────┘          │
│  SLIDE 3 (Architecture)         SLIDE 4 (Interview)           │
│  ┌─────────────────┐            ┌──────────────────┐          │
│  │  Texte  │ Plan  │            │  Titre Interview │          │
│  │  ────── │ ┌───┐ │            │  ──────────────  │          │
│  │  Style  │ │   │ │            │  [Description]   │          │
│  │  Archi  │ │   │ │            │                  │          │
│  │         │ │   │ │            │  [VIDEO PLAYER]  │          │
│  │         │ └───┘ │            │  ┌────────────┐  │          │
│  │         │       │            │  │ ▶️         │  │          │
│  └─────────────────┘            │  └────────────┘  │          │
│                                 └──────────────────┘          │
│        ← Scroll horizontal (pin + scrub) →                    │
└────────────────────────────────────────────────────────────────┘
```

#### Mobile - Scroll Vertical

```
┌──────────────────────┐
│   [Description]      │
│  ──────────────      │
│   Texte gauche       │
│   [Description...]   │
│                      │
│   [Image Église]     │
│   avec cadre         │
│                      │
├──────────────────────┤
│   [Galerie]          │
│  ──────────          │
│   ┌────────────┐     │
│   │   Image 1  │     │
│   └────────────┘     │
│   ┌────────────┐     │
│   │   Image 2  │     │
│   └────────────┘     │
│   (6 images)         │
│                      │
├──────────────────────┤
│  [Architecture]      │
│  ──────────────      │
│   Texte style        │
│   [Plan archi]       │
│                      │
├──────────────────────┤
│  [Interview]         │
│  ──────────────      │
│   Titre              │
│   Description        │
│   [VIDEO]            │
└──────────────────────┘
```

---

### Section 3 : Articles de Blog (BlogSection)

#### Desktop

```
┌────────────────────────────────────────────────────────────────┐
│                     [BG PIERRE]                                │
│                                                                │
│                  Nos derniers articles                         │
│                  ─────────────────────                         │
│                                                                │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  │
│  │ [Image]   │  │ [Image]   │  │ [Image]   │  │ [Image]   │  │
│  │           │  │           │  │           │  │           │  │
│  ├───────────┤  ├───────────┤  ├───────────┤  ├───────────┤  │
│  │ Titre Art │  │ Titre Art │  │ Titre Art │  │ Titre Art │  │
│  │ Date      │  │ Date      │  │ Date      │  │ Date      │  │
│  │ Extrait.. │  │ Extrait.. │  │ Extrait.. │  │ Extrait.. │  │
│  │ Lire → │  │ Lire → │  │ Lire → │  │ Lire → │  │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘  │
│                                                                │
│                  [Voir tous les articles]                      │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

#### Mobile

```
┌──────────────────────┐
│  Nos derniers        │
│  articles            │
│  ─────────           │
│                      │
│  ┌────────────────┐  │
│  │ [Image]        │  │
│  ├────────────────┤  │
│  │ Titre          │  │
│  │ Date           │  │
│  │ Extrait...     │  │
│  │ Lire →         │  │
│  └────────────────┘  │
│                      │
│  (4 articles)        │
│                      │
│  [Voir tous]         │
└──────────────────────┘
```

---

### Section 4 : Partenaires (PartnerSection)

#### Desktop

```
┌────────────────────────────────────────────────────────────────┐
│                     [BG ROUGE #ac1115]                         │
│                                                                │
│              Nos partenaires                                   │
│              ────────────────                                  │
│                                                                │
│  ┌────────────────────────────────────────────────┐            │
│  │  Texte descriptif avec lettrine                │            │
│  │  Ils accompagnent notre démarche...             │            │
│  │                                                 │            │
│  │  [Devenez partenaire]                          │            │
│  └────────────────────────────────────────────────┘            │
│                                                                │
│  ┌────────────────────────────────────────────────┐            │
│  │  ←  [Logo1] [Logo2] [Logo3] [Logo4] [Logo5]  → │  Scroll   │
│  │      Défilement automatique (hover = pause)     │            │
│  └────────────────────────────────────────────────┘            │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

#### Mobile

```
┌──────────────────────┐
│   [BG ROUGE]         │
│                      │
│  Nos partenaires     │
│  ────────────        │
│                      │
│  Texte avec          │
│  lettrine...         │
│                      │
│  [Devenez            │
│   partenaire]        │
│                      │
│  ┌────────────────┐  │
│  │ Logo 1         │  │
│  ├────────────────┤  │
│  │ Logo 2         │  │
│  └────────────────┘  │
│  (grille 2x2)        │
└──────────────────────┘
```

---

### Section 5 : Footer

#### Desktop

```
┌────────────────────────────────────────────────────────────────┐
│                  [BG GRADIENT BLACK]                           │
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ [Logo]       │  │ Navigation   │  │ Contact      │        │
│  │              │  │ ────────     │  │ ────────     │        │
│  │ Description  │  │ • Accueil    │  │ 📍 Doazit    │        │
│  │ association  │  │ • Association│  │              │        │
│  │              │  │ • Blog       │  │ Suivez-nous  │        │
│  │              │  │ • Partenaires│  │ ○ ○ ○        │        │
│  │              │  │ • [Faire don]│  │ (icônes)     │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                │
│  ──────────────────────────────────────────────────────        │
│                                                                │
│  © 2025 APD                    Développé par Ufo Agency        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

#### Mobile

```
┌──────────────────────┐
│  [Logo]              │
│  Description         │
│                      │
│  Navigation          │
│  • Accueil           │
│  • Association       │
│  • Blog              │
│  • Partenaires       │
│  • [Don]             │
│                      │
│  Contact             │
│  📍 Doazit           │
│  ○ ○ ○ (réseaux)    │
│                      │
│  ──────────          │
│  © 2025 APD          │
│  Ufo Agency          │
└──────────────────────┘
```

---

## 📰 PAGE BLOG (/blog)

### Liste des Articles

#### Desktop

```
┌────────────────────────────────────────────────────────────────┐
│  [HEADER]                                                      │
├────────────────────────────────────────────────────────────────┤
│                     [BG PIERRE]                                │
│                                                                │
│                     Articles & Récits                          │
│                     ─────────────────                          │
│                                                                │
│  ┌─────────────────┐  ┌─────────────────┐                     │
│  │ [Image]         │  │ [Image]         │                     │
│  │                 │  │                 │                     │
│  ├─────────────────┤  ├─────────────────┤                     │
│  │ Titre           │  │ Titre           │                     │
│  │ Date | Auteur   │  │ Date | Auteur   │                     │
│  │ Extrait...      │  │ Extrait...      │                     │
│  │ [Lire l'article]│  │ [Lire l'article]│                     │
│  └─────────────────┘  └─────────────────┘                     │
│                                                                │
│  (Tous les articles en grille 2 colonnes)                     │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  [FOOTER]                                                      │
└────────────────────────────────────────────────────────────────┘
```

### Article Détaillé (/blog/[slug])

#### Desktop

```
┌────────────────────────────────────────────────────────────────┐
│  [HEADER]                                                      │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                [IMAGE PRINCIPALE FULL WIDTH]                   │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                     [BG PIERRE]                                │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   TITRE DE L'ARTICLE                     │  │
│  │                                                          │  │
│  │  Date publication | Auteur                               │  │
│  │  ────────────────────────────────                        │  │
│  │                                                          │  │
│  │  Contenu de l'article avec lettrine sur premier         │  │
│  │  paragraphe. Lorem ipsum dolor sit amet...              │  │
│  │                                                          │  │
│  │  [Images intercalées dans le contenu si présentes]      │  │
│  │                                                          │  │
│  │  Texte justifié, espacements confortables               │  │
│  │  pour la lecture...                                      │  │
│  │                                                          │  │
│  │                                                          │  │
│  │  [← Retour aux articles]                                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  [FOOTER]                                                      │
└────────────────────────────────────────────────────────────────┘
```

---

## 🏛️ PAGE ASSOCIATION (/association)

#### Desktop

```
┌────────────────────────────────────────────────────────────────┐
│  [HEADER]                                                      │
├────────────────────────────────────────────────────────────────┤
│                     [BG PIERRE]                                │
│                                                                │
│                  L'Association                                 │
│                  ──────────────                                │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                                          │  │
│  │  Notre mission                                           │  │
│  │  ─────────────                                           │  │
│  │                                                          │  │
│  │  Texte avec description de l'association                │  │
│  │  Lettrine sur premier paragraphe                        │  │
│  │                                                          │  │
│  │  ┌─────────────┐        ┌─────────────┐                │  │
│  │  │ [Image/Icon]│        │ [Image/Icon]│                │  │
│  │  │ Objectif 1  │        │ Objectif 2  │                │  │
│  │  │ Description │        │ Description │                │  │
│  │  └─────────────┘        └─────────────┘                │  │
│  │                                                          │  │
│  │  Notre équipe                                            │  │
│  │  ────────────                                            │  │
│  │                                                          │  │
│  │  [Membres de l'association si données disponibles]      │  │
│  │                                                          │  │
│  │  Nous soutenir                                           │  │
│  │  ─────────────                                           │  │
│  │                                                          │  │
│  │  [BOUTON FAIRE UN DON]                                  │  │
│  │  [BOUTON DEVENIR PARTENAIRE]                            │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  [FOOTER]                                                      │
└────────────────────────────────────────────────────────────────┘
```

---

## 🤝 PAGE PARTENAIRES (/partners)

#### Desktop

```
┌────────────────────────────────────────────────────────────────┐
│  [HEADER]                                                      │
├────────────────────────────────────────────────────────────────┤
│                     [BG PIERRE]                                │
│                                                                │
│              Devenez partenaire de notre projet                │
│              ───────────────────────────────                   │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                                          │  │
│  │  En soutenant la restauration de l'église               │  │
│  │  Saint-Jean Baptiste d'Aulès, vous participez           │  │
│  │  à la préservation d'un patrimoine vivant...            │  │
│  │                                                          │  │
│  │  Votre engagement sera valorisé auprès du public        │  │
│  │  et des institutions.                                    │  │
│  │                                                          │  │
│  │              [Je souhaite devenir partenaire]            │  │
│  │              (ouvre ContactModal)                        │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  [FOOTER]                                                      │
└────────────────────────────────────────────────────────────────┘
```

---

## 💬 COMPOSANTS MODAUX

### ContactModal

```
┌────────────────────────────────────────────────────────────────┐
│                  [BACKDROP BLUR]                               │
│                                                                │
│    ┌──────────────────────────────────────────────────┐        │
│    │  Contactez-nous                            [X]   │        │
│    │  ──────────────                                  │        │
│    │                                                  │        │
│    │  ┌────────────────────────────────────────────┐  │        │
│    │  │ Nom *                                      │  │        │
│    │  └────────────────────────────────────────────┘  │        │
│    │                                                  │        │
│    │  ┌────────────────────────────────────────────┐  │        │
│    │  │ Email *                                    │  │        │
│    │  └────────────────────────────────────────────┘  │        │
│    │                                                  │        │
│    │  ┌────────────────────────────────────────────┐  │        │
│    │  │ Téléphone                                  │  │        │
│    │  └────────────────────────────────────────────┘  │        │
│    │                                                  │        │
│    │  ┌────────────────────────────────────────────┐  │        │
│    │  │ Sujet                                      │  │        │
│    │  └────────────────────────────────────────────┘  │        │
│    │                                                  │        │
│    │  ┌────────────────────────────────────────────┐  │        │
│    │  │ Message *                                  │  │        │
│    │  │                                            │  │        │
│    │  │                                            │  │        │
│    │  └────────────────────────────────────────────┘  │        │
│    │                                                  │        │
│    │            [Annuler]    [Envoyer]               │        │
│    │                                                  │        │
│    └──────────────────────────────────────────────────┘        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Gallery Fullscreen

```
┌────────────────────────────────────────────────────────────────┐
│                  [BG BLACK/90 BLUR]                            │
│                                                                │
│                                                                │
│                  ┌───────────────────────┐                     │
│                  │                       │                     │
│                  │   [IMAGE AGRANDIE]    │                     │
│                  │   (click to close)    │                     │
│                  │                       │                     │
│                  └───────────────────────┘                     │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 🎨 DESIGN SYSTEM

### Couleurs

- **Principal** : `#ac1115` (Rouge)
- **Fond Pierre** : `bg-pierre` (Beige clair)
- **Texte** : Noir / Blanc selon fond
- **Borders** : `#8B7355` (Marron bois)
- **BG Borders** : `#5a4a3a` (Marron foncé)

### Typographie

- **Titres** : `font-garamond`
- **Corps** : Système par défaut
- **Sizes** :
  - Mobile: `text-2xl` (titres)
  - Desktop: `text-4xl` à `text-6xl`

### Espacements

- **Sections** : `py-16` à `py-20`
- **Padding** : `px-6` (mobile), `px-32` (desktop)
- **Gaps** : `gap-4` à `gap-12`

### Effets

- **Shadow underline** : Classe custom pour soulignement
- **Lettrine** : Première lettre agrandie
- **Hover** : `hover:scale-105`, `hover:shadow-2xl`
- **Transitions** : `transition-all duration-300`

---

## 📐 Grilles & Layouts

### Gallery Desktop

- 9 images positionnées en absolute
- Positions en % (top, left, width, height)
- Marges uniformes de 10%

### Articles Grid

- Desktop: 2-4 colonnes
- Tablet: 2 colonnes
- Mobile: 1 colonne

### Partenaires Carousel

- Scroll horizontal automatique
- Pause au hover
- Loop infini

---

## 🔄 Animations

### GSAP ScrollTrigger

- Gallery items: `y: 400 → 0` avec stagger
- Architecture plan: `scale: 0.3 → 1`
- Partner logos: `opacity: 0 → 1, scale: 0.5 → 1`

### Intro Section

- Reveal box animation (width + left movement)
- Text color transition (transparent → white)
- Button fade in/out

### Carousel

- requestAnimationFrame pour scroll fluide
- Speed: 0.5px/frame
- Reset position au milieu

---

## 📱 Responsive Behavior

### Navigation

- Desktop: Links inline avec bouton don
- Mobile: Menu hamburger (à implémenter si besoin)

### Images

- Desktop: Custom layouts, cadres CSS
- Tablet: Grid 2 colonnes
- Mobile: Stack vertical

### Sections

- Desktop: Horizontal scroll (DescriptionSection)
- Mobile: Vertical scroll classique

---

**Ce document sert de référence complète pour recréer les maquettes dans Figma ou tout autre outil de design.**

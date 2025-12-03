Frontend Next.js – Association Patrimoine de Doazit

Application Next.js 15 (React 19, TailwindCSS) pour le site vitrine de l’association.

## Structure principale

```
frontend/
├── public/
│   ├── fonts/           # Polices personnalisées (Garamond, AnnStone)
│   └── ...images
├── src/
│   ├── app/             # Pages principales (App Router)
│   ├── components/      # Composants React réutilisables
│   ├── contexts/        # Contextes React (HeaderDonationContext)
│   └── hooks/           # Hooks personnalisés
├── ...config, package.json, etc.
```

## Scripts disponibles

```bash
npm run dev      # Démarrage en développement (localhost:3000)
npm run build    # Build production
npm start        # Démarrage production
npm run lint     # Linter ESLint
```

## Polices utilisées

- Garamond (Bold, Italic, Regular, SemiBold)
- AnnStone

## Composants principaux

- Header (responsive, fusionné mobile/desktop)
- Footer
- Modal de contact
- DonationButton
- BlogSection, PartnerSection, Interview, Gallery, Architecture, etc.

## Points clés

- Responsive design (mobile, tablette, desktop)
- Navigation et bouton de don sur une seule ligne
- Clarté typographique (Garamond, AnnStone)
- Animation (GSAP, Framer Motion, Lenis)
- Carte interactive (Leaflet)

## Démarrage rapide

```bash
cd frontend
npm ci
npm run dev
```

Accès : [http://localhost:3000](http://localhost:3000)

## Contribution

1. Fork du projet
2. Création de branche feature (`git checkout -b feature/NouvelleFonctionnalite`)
3. Commit (`git commit -m 'feat: Nouvelle fonctionnalité'`)
4. Push (`git push origin feature/NouvelleFonctionnalite`)
5. Pull Request

Convention de commit : [Conventional Commits](https://www.conventionalcommits.org/)

## Déploiement

Déploiement recommandé sur [Vercel](https://vercel.com/) ou [Netlify](https://www.netlify.com/).

## Documentation

- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Auteur

Philippe Barbosa – [@Vince-ALIEN](https://github.com/Vince-ALIEN)

# Guide Investissement 2026–2055

Site Astro/TypeScript éducatif pour construire progressivement un patrimoine à partir de 50 € par mois.

## Commandes locales

Installer les dépendances :

```bash
npm install
```

Lancer le serveur de développement :

```bash
npm run dev
```

Générer le site statique dans `dist/` :

```bash
npm run build
```

Prévisualiser le build localement :

```bash
npm run preview
```

Le build Astro génère le site statique dans `dist/`. Il ne faut pas créer manuellement de `index.html` à la racine du dépôt.


## Données locales et confidentialité

Le site est statique : les outils interactifs ne transmettent aucune donnée à un serveur. Les données personnelles restent dans le navigateur de l’utilisateur via `localStorage`.

Clés utilisées :

- `guide-investissement-portfolio-journal` : lignes du journal d’investissement, exportables en CSV ou JSON et importables depuis un fichier JSON validé côté navigateur.
- `guide-investissement-personal-dashboard` : paramètres du tableau de bord personnel, exportables/importables en JSON validé côté navigateur.

Les imports JSON sont normalisés avant sauvegarde pour éviter les formats inattendus, les champs trop longs et les valeurs numériques invalides.

## Données d’allocation centralisées

Les allocations mensuelles pédagogiques sont centralisées dans `src/data/allocations.ts`. Les pages et composants doivent réutiliser ces données dès que possible afin d’éviter les incohérences entre l’accueil, le plan d’action, l’assistant, les simulations, la FAQ et le portefeuille Steve.

## Déploiement GitHub Pages

Le site est configuré pour GitHub Pages avec :

- `site: "https://steve57000.github.io"`
- `base: "/guide-investissement"`

Le workflow `.github/workflows/deploy.yml` se déclenche à chaque push sur `main`, active GitHub Pages pour un déploiement via GitHub Actions, installe Node.js 24, installe les dépendances avec `npm ci` si `package-lock.json` existe ou `npm install` sinon, exécute `npm run build`, puis publie le dossier `dist` généré par Astro sur GitHub Pages.

URL finale attendue : https://steve57000.github.io/guide-investissement/

> Le contenu est éducatif et ne constitue pas un conseil financier personnalisé. Les pages prévoient des zones de sources officielles avant ajout de données chiffrées.

## Contrôles qualité

Le projet contient des scripts de vérification pour limiter les incohérences lorsque le guide s’enrichit :

```bash
npm run verify:wizard
```

Vérifie la cohérence de l’assistant guidé et de ses données.

```bash
npm run verify:site
```

Vérifie globalement le site : navigation, pages référencées, sources, allocations, liens internes incompatibles avec le `base` GitHub Pages et workflow de déploiement.

```bash
npm run test
```

Lance les contrôles qualité automatisés (`verify:wizard` puis `verify:site`).

```bash
npm run build
```

Génère le site statique Astro et permet de valider que les pages se compilent correctement avant déploiement.

## Images et métadonnées

Les images du site restent dans `public/` afin qu’Astro les copie telles quelles dans le build statique et que les chemins GitHub Pages restent prévisibles avec `base: "/guide-investissement"`.

- `public/favicon.ico` : favicon générique utilisé par les navigateurs historiques.
- `public/favicon-16x16.png` : favicon PNG compact pour les onglets et petits contextes.
- `public/favicon-32x32.png` : favicon PNG standard pour les navigateurs modernes.
- `public/apple-touch-icon.png` : icône d’ajout à l’écran d’accueil iOS.
- `public/android-chrome-192x192.png` : icône Android/PWA 192 × 192 déclarée dans le manifeste.
- `public/android-chrome-512x512.png` : icône Android/PWA 512 × 512 déclarée dans le manifeste.
- `public/og-image.png` : image principale Open Graph et Twitter/X Card, exposée en URL absolue pour les partages sociaux.
- `public/social-square.png` : image sociale carrée déclarée comme image Open Graph complémentaire lorsque les plateformes préfèrent un format carré.
- `public/splash-screen.png` : visuel de splash screen conservé dans `public/` pour un usage mobile ou PWA ultérieur.
- `public/site.webmanifest` : manifeste web app avec le nom du guide, les couleurs mobiles, le périmètre GitHub Pages et les icônes Android.

Les balises globales de favicon, manifeste, couleur de thème, Open Graph et Twitter/X Card sont centralisées dans `src/layouts/BaseLayout.astro` pour s’appliquer à toutes les pages.

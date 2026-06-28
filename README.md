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

## Déploiement GitHub Pages

Le site est configuré pour GitHub Pages avec :

- `site: "https://steve57000.github.io"`
- `base: "/guide-investissement"`

Le workflow `.github/workflows/deploy.yml` se déclenche à chaque push sur `main`, active GitHub Pages pour un déploiement via GitHub Actions, installe Node.js 24, installe les dépendances avec `npm ci` si `package-lock.json` existe ou `npm install` sinon, exécute `npm run build`, puis publie le dossier `dist` généré par Astro sur GitHub Pages.

URL finale attendue : https://steve57000.github.io/guide-investissement/

> Le contenu est éducatif et ne constitue pas un conseil financier personnalisé. Les pages prévoient des zones de sources officielles avant ajout de données chiffrées.

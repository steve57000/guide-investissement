export type NavLink = [href: string, label: string];

export type NavSection = {
  title: string;
  links: NavLink[];
};

export const mainNav: NavLink[] = [
  ['', 'Accueil'],
  ['commencer-50', 'Commencer'],
  ['plan-action', 'Plan d’action'],
  ['assistant', 'Assistant'],
  ['tableau-de-bord', 'Tableau de bord'],
  ['simulations', 'Simulations'],
  ['plateformes', 'Plateformes'],
  ['recherche', 'Recherche'],
];

export const understandSections: NavSection[] = [
  { title: 'Bases', links: [['faq', 'FAQ'], ['placements', 'Placements'], ['etf', 'ETF'], ['crypto', 'Crypto'], ['methodologie', 'Méthodologie']] },
  { title: 'Méthode', links: [['reequilibrage', 'Rééquilibrage'], ['scenarios-crise', 'Crises'], ['strategie-sortie', 'Quand vendre'], ['objectifs', 'Objectifs']] },
  { title: 'Suivi', links: [['suivi-portefeuille', 'Suivi portefeuille'], ['journal-investissement', 'Journal'], ['sauvegarde-donnees', 'Sauvegarde']] },
  { title: 'Fiscalité', links: [['fiscalite', 'Fiscalité'], ['declaration-documents', 'Déclaration'], ['frais', 'Frais'], ['sources', 'Sources']] },
  { title: 'Personnel', links: [['portefeuille-steve', 'Portefeuille Steve'], ['export-pdf', 'Export PDF'], ['plan-du-site', 'Plan du site']] },
];

export const footerLinks: NavLink[] = [
  ['recherche', 'Recherche'],
  ['plan-du-site', 'Plan du site'],
  ['sources', 'Sources'],
  ['export-pdf', 'Export PDF'],
];

export type SitePageCategory = 'Principal' | 'Bases' | 'Méthode' | 'Suivi' | 'Fiscalité' | 'Personnel';

export type SitePage = {
  title: string;
  href: string;
  category: SitePageCategory;
  description: string;
  keywords: string[];
};

export const siteCategories: SitePageCategory[] = ['Principal', 'Bases', 'Méthode', 'Suivi', 'Fiscalité', 'Personnel'];

export const sitePages: SitePage[] = [
  { title: 'Accueil', href: '', category: 'Principal', description: 'Point d’entrée du guide, avec les raccourcis vers la méthode, les simulations et les pages clés.', keywords: ['home', 'guide', 'investissement', 'débuter'] },
  { title: 'Commencer', href: 'commencer-50', category: 'Principal', description: 'Premiers pas pour investir avec un montant simple et durable, sans fragiliser le budget.', keywords: ['débutant', '50 euros', 'premier versement', 'budget'] },
  { title: 'Plan d’action', href: 'plan-action', category: 'Principal', description: 'Feuille de route concrète pour organiser les actions prioritaires et le rythme de suivi.', keywords: ['plan', 'actions', 'priorités', 'méthode'] },
  { title: 'Assistant', href: 'assistant', category: 'Principal', description: 'Assistant guidé pour orienter Steve selon son profil, son horizon et sa tolérance au risque.', keywords: ['assistant', 'profil', 'allocation', 'questionnaire'] },
  { title: 'Tableau de bord', href: 'tableau-de-bord', category: 'Principal', description: 'Vue personnelle pour suivre l’épargne, la sécurité et les grands indicateurs du portefeuille.', keywords: ['dashboard', 'suivi', 'indicateurs', 'épargne'] },
  { title: 'Simulations', href: 'simulations', category: 'Principal', description: 'Simulateur pédagogique pour tester versements, horizon, rendement et scénarios long terme.', keywords: ['simulation', 'rendement', 'versements', 'projection'] },
  { title: 'Plateformes', href: 'plateformes', category: 'Principal', description: 'Repères pour comparer les plateformes, courtiers et enveloppes disponibles.', keywords: ['plateforme', 'courtier', 'PEA', 'CTO'] },
  { title: 'FAQ', href: 'faq', category: 'Bases', description: 'Réponses courtes aux questions fréquentes avant de commencer à investir.', keywords: ['questions', 'réponses', 'débutant', 'FAQ'] },
  { title: 'Placements', href: 'placements', category: 'Bases', description: 'Vue d’ensemble des grandes familles de placements et de leurs rôles possibles.', keywords: ['placements', 'livret', 'actions', 'obligations'] },
  { title: 'ETF', href: 'etf', category: 'Bases', description: 'Comprendre les ETF, leur diversification, leurs frais et leur place dans une stratégie simple.', keywords: ['ETF', 'trackers', 'monde', 'diversification'] },
  { title: 'Crypto', href: 'crypto', category: 'Bases', description: 'Cadre prudent pour traiter la crypto comme poche satellite volatile et limitée.', keywords: ['crypto', 'bitcoin', 'volatilité', 'satellite'] },
  { title: 'Rééquilibrage', href: 'reequilibrage', category: 'Méthode', description: 'Méthode pour remettre le portefeuille sur sa cible sans réagir à chaud.', keywords: ['rééquilibrage', 'allocation', 'discipline', 'annuel'] },
  { title: 'Crises', href: 'scenarios-crise', category: 'Méthode', description: 'Scénarios de baisse et règles de réaction pour éviter les décisions impulsives.', keywords: ['crise', 'baisse', 'panique', 'marché'] },
  { title: 'Quand vendre', href: 'strategie-sortie', category: 'Méthode', description: 'Critères rationnels pour vendre, sécuriser ou arbitrer sans céder à l’émotion.', keywords: ['vendre', 'sortie', 'sécuriser', 'arbitrage'] },
  { title: 'Objectifs', href: 'objectifs', category: 'Méthode', description: 'Objectifs 2026–2055 et jalons pour piloter la progression dans le temps.', keywords: ['objectifs', 'jalons', 'horizon', 'patrimoine'] },
  { title: 'Suivi portefeuille', href: 'suivi-portefeuille', category: 'Suivi', description: 'Organisation du suivi mensuel, trimestriel et annuel du portefeuille.', keywords: ['suivi', 'portefeuille', 'revue', 'mensuel'] },
  { title: 'Journal', href: 'journal-investissement', category: 'Suivi', description: 'Journal local pour tracer les versements, décisions, frais et commentaires.', keywords: ['journal', 'historique', 'décisions', 'versements'] },
  { title: 'Sauvegarde', href: 'sauvegarde-donnees', category: 'Suivi', description: 'Procédure pour sauvegarder et restaurer les données locales du navigateur.', keywords: ['sauvegarde', 'export', 'import', 'données'] },
  { title: 'Fiscalité', href: 'fiscalite', category: 'Fiscalité', description: 'Repères pédagogiques sur fiscalité, enveloppes et points de vigilance.', keywords: ['fiscalité', 'impôts', 'PEA', 'CTO'] },
  { title: 'Déclaration', href: 'declaration-documents', category: 'Fiscalité', description: 'Documents et justificatifs à conserver pour préparer la déclaration.', keywords: ['déclaration', 'documents', 'IFU', 'justificatifs'] },
  { title: 'Frais', href: 'frais', category: 'Fiscalité', description: 'Comprendre l’impact des frais de courtage, de gestion et de change.', keywords: ['frais', 'courtage', 'TER', 'change'] },
  { title: 'Sources', href: 'sources', category: 'Fiscalité', description: 'Sources et documents officiels à vérifier avant toute décision importante.', keywords: ['sources', 'officiel', 'références', 'AMF'] },
  { title: 'Portefeuille Steve', href: 'portefeuille-steve', category: 'Personnel', description: 'Synthèse personnalisée du portefeuille cible et des règles de Steve.', keywords: ['Steve', 'portefeuille', 'personnel', 'allocation'] },
  { title: 'Export PDF', href: 'export-pdf', category: 'Personnel', description: 'Page de préparation pour imprimer ou exporter le guide au format PDF.', keywords: ['PDF', 'export', 'impression', 'guide'] },
  { title: 'Plan du site', href: 'plan-du-site', category: 'Personnel', description: 'Carte complète des pages du guide, classées par grandes catégories.', keywords: ['plan', 'site', 'navigation', 'sitemap'] },
  { title: 'Recherche', href: 'recherche', category: 'Personnel', description: 'Recherche interne côté navigateur par titre, catégorie, description et mots-clés.', keywords: ['recherche', 'navigation', 'moteur', 'interne'] },
];

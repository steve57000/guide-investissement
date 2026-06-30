export type PlatformType = 'banque' | 'courtier' | 'app investissement' | 'plateforme avancée';
export type Availability = 'oui' | 'non' | 'à vérifier';

export interface PlatformSource {
  label: string;
  url: string;
}

export interface InvestmentPlatform {
  name: string;
  type: PlatformType;
  pea: Availability;
  cto: Availability;
  etf: Availability;
  crypto: Availability;
  scheduledInvestment: Availability;
  taxHelp: Availability;
  simplicity: string;
  beginnerQuality: string;
  longTermInterest: string;
  mainLimits: string;
  recommendedProfile: string;
  beginnerScore: number;
  longTermScore: number;
  frenchTaxScore: number;
  simplicityScore: number;
  officialSources: PlatformSource[];
  verifiedAt: string;
  recommendation: string;
}

export const platforms: InvestmentPlatform[] = [
  {
    name: 'N26',
    type: 'banque',
    pea: 'à vérifier',
    cto: 'oui',
    etf: 'oui',
    crypto: 'oui',
    scheduledInvestment: 'oui',
    taxHelp: 'à vérifier',
    simplicity: 'Très simple si Steve utilise déjà N26, avec banque et investissement dans la même application.',
    beginnerQuality: 'Bonne porte d’entrée mobile, à condition de vérifier l’éligibilité personnelle au PEA et la qualité des documents fiscaux.',
    longTermInterest: 'À réévaluer sérieusement depuis l’annonce du PEA, mais à comparer avec les courtiers français avant d’en faire le cœur long terme.',
    mainLimits: 'Offre dépendante de l’éligibilité, de l’entité et des conditions Upvest ; ne pas supposer des frais ou un IFU français sans document officiel.',
    recommendedProfile: 'Débutant déjà client N26 qui veut démarrer simplement, puis contrôler les justificatifs fiscaux.',
    beginnerScore: 4,
    longTermScore: 3,
    frenchTaxScore: 2,
    simplicityScore: 5,
    officialSources: [
      { label: 'Investissements N26', url: 'https://n26.com/fr-fr/investissements' },
      { label: 'PEA N26', url: 'https://n26.com/fr-fr/pea' },
      { label: 'Actions et ETF N26', url: 'https://n26.com/fr-fr/actions-et-etfs' },
    ],
    verifiedAt: '2026-06-29',
    recommendation: 'À tester comme solution simple, mais seulement après vérification de l’éligibilité PEA, des ETF et des documents fiscaux.',
  },
  {
    name: 'Revolut',
    type: 'app investissement',
    pea: 'à vérifier',
    cto: 'oui',
    etf: 'oui',
    crypto: 'oui',
    scheduledInvestment: 'à vérifier',
    taxHelp: 'à vérifier',
    simplicity: 'Application très accessible pour découvrir actions, ETF et crypto avec de petits montants.',
    beginnerQuality: 'Bonne pour apprendre, moins convaincante comme plateforme principale fiscale en France.',
    longTermInterest: 'Intérêt surtout satellite : découverte, petite poche, multi-devises, pas cœur PEA.',
    mainLimits: 'Fiscalité et comptes étrangers à contrôler ; absence de PEA France officielle à vérifier dans l’offre disponible.',
    recommendedProfile: 'Débutant qui veut découvrir avec de petits montants sans en faire son socle patrimonial.',
    beginnerScore: 4,
    longTermScore: 2,
    frenchTaxScore: 2,
    simplicityScore: 5,
    officialSources: [
      { label: 'ETF Revolut', url: 'https://www.revolut.com/fr-FR/etfs/' },
      { label: 'Déclaration des comptes Revolut', url: 'https://help.revolut.com/fr-FR/help/profile-and-plan/more-help-with-my-account/tax-declaration/fr-how-to-declare-my-revolut-accounts/' },
      { label: 'Déclarer produits Revolut', url: 'https://help.revolut.com/fr-FR/help/profile-and-plan/more-help-with-my-account/tax-declaration/fr-how-do-i-declare-earnings-or-losses-from-my-revolut-products/' },
    ],
    verifiedAt: '2026-06-29',
    recommendation: 'À garder comme poche de découverte ou satellite, pas comme cœur long terme si l’objectif est un PEA clair.',
  },
  {
    name: 'Trade Republic', type: 'courtier', pea: 'oui', cto: 'oui', etf: 'oui', crypto: 'oui', scheduledInvestment: 'oui', taxHelp: 'à vérifier', simplicity: 'Interface simple et forte logique d’automatisation.', beginnerQuality: 'Très lisible pour investir régulièrement, avec vigilance sur les documents fiscaux français.', longTermInterest: 'Candidat sérieux pour un PEA automatisé si les ETF visés et les justificatifs conviennent.', mainLimits: 'Offre PEA récente : univers, fiscalité, frais et conditions à vérifier dans les documents officiels.', recommendedProfile: 'Steve s’il veut automatiser un ETF long terme sans multiplier les opérations.', beginnerScore: 4, longTermScore: 4, frenchTaxScore: 3, simplicityScore: 4, officialSources: [{ label: 'PEA Trade Republic', url: 'https://traderepublic.com/fr-fr/pea' }], verifiedAt: '2026-06-29', recommendation: 'À comparer sérieusement pour le PEA, surtout pour l’investissement programmé.' },
  {
    name: 'BoursoBank', type: 'banque', pea: 'oui', cto: 'oui', etf: 'oui', crypto: 'non', scheduledInvestment: 'à vérifier', taxHelp: 'oui', simplicity: 'Banque française complète, plus institutionnelle qu’une application pure mobile.', beginnerQuality: 'Bonne si Steve veut centraliser banque, PEA et documents dans un cadre français.', longTermInterest: 'Solide pour un cœur PEA/CTO durable si l’ETF choisi est disponible.', mainLimits: 'Ergonomie, frais et univers ETF à comparer avant ouverture.', recommendedProfile: 'Investisseur long terme qui veut un acteur bancaire français et des documents fiscaux lisibles.', beginnerScore: 4, longTermScore: 4, frenchTaxScore: 5, simplicityScore: 4, officialSources: [{ label: 'Aide BoursoBank', url: 'https://www.boursobank.com/aide-en-ligne' }], verifiedAt: '2026-06-29', recommendation: 'Option très sérieuse pour un PEA principal orienté simplicité fiscale France.' },
  {
    name: 'Fortuneo', type: 'banque', pea: 'oui', cto: 'oui', etf: 'oui', crypto: 'non', scheduledInvestment: 'à vérifier', taxHelp: 'oui', simplicity: 'Interface bancaire/courtier classique, plutôt claire pour un investisseur patient.', beginnerQuality: 'Bonne si Steve accepte une interface moins ludique mais structurée.', longTermInterest: 'Très bon candidat pour PEA long terme et documents fiscaux français.', mainLimits: 'Frais, places de marché et ETF précis à vérifier selon l’usage.', recommendedProfile: 'Investisseur long terme qui veut une banque/courtier français avec PEA et IFU.', beginnerScore: 4, longTermScore: 5, frenchTaxScore: 5, simplicityScore: 4, officialSources: [{ label: 'FAQ Bourse Fortuneo', url: 'https://www.fortuneo.fr/faq/bourse' }], verifiedAt: '2026-06-29', recommendation: 'À mettre dans la short-list PEA de Steve pour le long terme.' },
  {
    name: 'Bourse Direct', type: 'courtier', pea: 'oui', cto: 'oui', etf: 'oui', crypto: 'non', scheduledInvestment: 'à vérifier', taxHelp: 'oui', simplicity: 'Plus courtier spécialisé que banque mobile : efficace mais moins débutant.', beginnerQuality: 'Correct si Steve est accompagné ou accepte une courbe d’apprentissage.', longTermInterest: 'Très pertinent pour optimiser le PEA si l’ergonomie convient.', mainLimits: 'Expérience utilisateur plus technique ; vérifier investissement programmé, ETF et support.', recommendedProfile: 'Investisseur qui priorise le PEA et accepte une interface de courtier.', beginnerScore: 3, longTermScore: 5, frenchTaxScore: 5, simplicityScore: 3, officialSources: [{ label: 'Formulaires Bourse Direct', url: 'https://www.boursedirect.fr/fr/formulaires-en-ligne' }], verifiedAt: '2026-06-29', recommendation: 'Excellent candidat PEA, moins confortable pour un tout premier usage sans accompagnement.' },
  {
    name: 'XTB', type: 'courtier', pea: 'oui', cto: 'oui', etf: 'oui', crypto: 'à vérifier', scheduledInvestment: 'à vérifier', taxHelp: 'à vérifier', simplicity: 'Plateforme moderne mais plus large que nécessaire pour un simple ETF long terme.', beginnerQuality: 'Utilisable, avec discipline stricte pour éviter produits complexes et levier.', longTermInterest: 'Candidat à comparer pour PEA/actions/ETF, surtout pour utilisateur autonome.', mainLimits: 'Bien distinguer ETF/actions long terme des CFD, produits dérivés ou expositions crypto.', recommendedProfile: 'Investisseur autonome qui sait rester sur les produits simples.', beginnerScore: 3, longTermScore: 4, frenchTaxScore: 3, simplicityScore: 3, officialSources: [{ label: 'PEA XTB', url: 'https://www.xtb.com/fr/pea' }], verifiedAt: '2026-06-29', recommendation: 'À comparer, mais Steve doit éviter le levier et les produits non nécessaires.' },
  {
    name: 'Interactive Brokers', type: 'plateforme avancée', pea: 'oui', cto: 'oui', etf: 'oui', crypto: 'à vérifier', scheduledInvestment: 'à vérifier', taxHelp: 'à vérifier', simplicity: 'Très puissant mais nettement plus complexe qu’une banque française ou une application simple.', beginnerQuality: 'Peu adapté à un débutant qui veut surtout automatiser un PEA ETF.', longTermInterest: 'Très fort pour investisseur avancé, accès mondial et outils professionnels.', mainLimits: 'Complexité, fiscalité française plus exigeante, paramétrage et rapports à maîtriser.', recommendedProfile: 'Investisseur autonome avancé, pas Steve au démarrage.', beginnerScore: 2, longTermScore: 4, frenchTaxScore: 2, simplicityScore: 2, officialSources: [{ label: 'PEA Interactive Brokers Ireland', url: 'https://www.interactivebrokers.ie/fr/accounts/plan-depargne-en-action-accounts.php' }], verifiedAt: '2026-06-29', recommendation: 'Puissant, mais à garder pour plus tard si Steve devient autonome et rigoureux.' },
];

export type VerificationStatus = 'à vérifier' | 'à vérifier dans la documentation officielle';

export type EtfProfile = {
  id: string;
  name: string;
  issuer: string;
  indexTracked: string;
  wrapper: string;
  peaEligibleStatus: VerificationStatus;
  accumulationOrDistribution: string;
  replication: string;
  currency: string;
  officialPageUrl: string;
  kidUrl: string;
  checkedAt: string;
  notes: string;
  category: 'Monde' | 'S&P 500' | 'Nasdaq 100' | 'Emerging Markets';
  ongoingCharges: string;
  suggestedUse: string;
  vigilancePoint: string;
  badges: string[];
};

export const etfs: EtfProfile[] = [
  {
    id: 'etf-monde-pea-a-verifier',
    name: 'ETF Monde éligible PEA',
    issuer: 'à vérifier',
    indexTracked: 'MSCI World ou indice monde équivalent — à vérifier',
    wrapper: 'PEA — à vérifier avant achat',
    peaEligibleStatus: 'à vérifier dans la documentation officielle',
    accumulationOrDistribution: 'Capitalisant ou distribuant — à vérifier',
    replication: 'Souvent synthétique en PEA pour les indices non européens — à vérifier',
    currency: 'Devise de cotation et devises sous-jacentes — à vérifier',
    officialPageUrl: 'https://www.amundietf.fr/fr/particuliers',
    kidUrl: 'https://www.amf-france.org/fr/espace-epargnants/actualites-mises-en-garde/le-document-dinformations-cles-dic-est-desormais-generalise-tous-les-placements-collectifs',
    checkedAt: '2026-07-01',
    notes: 'Profil générique volontairement prudent : choisir le fonds exact chez l’émetteur, puis contrôler le DIC/KID, le prospectus et l’affichage du courtier.',
    category: 'Monde',
    ongoingCharges: 'à vérifier dans le DIC/KID officiel',
    suggestedUse: 'Cœur de portefeuille débutant, si l’horizon est long et le risque actions accepté.',
    vigilancePoint: 'Peut rester très exposé aux États-Unis et au dollar malgré le libellé “Monde”.',
    badges: ['Monde', 'PEA', 'Débutant', 'À vérifier'],
  },
  {
    id: 'etf-sp500-pea-a-verifier',
    name: 'ETF S&P 500 éligible PEA',
    issuer: 'à vérifier',
    indexTracked: 'S&P 500 ou variante — à vérifier',
    wrapper: 'PEA — à vérifier avant achat',
    peaEligibleStatus: 'à vérifier dans la documentation officielle',
    accumulationOrDistribution: 'Capitalisant ou distribuant — à vérifier',
    replication: 'à vérifier',
    currency: 'Devise de cotation et exposition USD — à vérifier',
    officialPageUrl: 'https://www.amundietf.fr/fr/particuliers',
    kidUrl: 'https://www.spglobal.com/spdji/en/indices/equity/sp-500/',
    checkedAt: '2026-07-01',
    notes: 'Exposition aux grandes capitalisations américaines : ne remplace pas une diversification mondiale.',
    category: 'S&P 500',
    ongoingCharges: 'à vérifier dans le DIC/KID officiel',
    suggestedUse: 'Satellite éventuel si l’investisseur accepte une concentration volontaire sur les États-Unis.',
    vigilancePoint: 'Risque pays, devise dollar et chevauchement avec un ETF Monde.',
    badges: ['PEA', 'À vérifier'],
  },
  {
    id: 'etf-nasdaq100-pea-a-verifier',
    name: 'ETF Nasdaq 100 éligible PEA',
    issuer: 'à vérifier',
    indexTracked: 'Nasdaq-100 — à vérifier',
    wrapper: 'PEA — à vérifier avant achat',
    peaEligibleStatus: 'à vérifier dans la documentation officielle',
    accumulationOrDistribution: 'Capitalisant ou distribuant — à vérifier',
    replication: 'à vérifier',
    currency: 'Devise de cotation et exposition USD — à vérifier',
    officialPageUrl: 'https://www.amundietf.fr/fr/particuliers',
    kidUrl: 'https://www.nasdaq.com/nasdaq-100',
    checkedAt: '2026-07-01',
    notes: 'Indice plus concentré et souvent plus volatil ; à éviter comme unique brique de départ.',
    category: 'Nasdaq 100',
    ongoingCharges: 'à vérifier dans le DIC/KID officiel',
    suggestedUse: 'Satellite avancé, pas le socle d’un portefeuille débutant.',
    vigilancePoint: 'Forte concentration sectorielle et chevauchement fréquent avec Monde/S&P 500.',
    badges: ['PEA', 'À vérifier'],
  },
  {
    id: 'etf-emerging-markets-pea-a-verifier',
    name: 'ETF Emerging Markets éligible PEA',
    issuer: 'à vérifier',
    indexTracked: 'MSCI Emerging Markets ou variante — à vérifier',
    wrapper: 'PEA — à vérifier avant achat',
    peaEligibleStatus: 'à vérifier dans la documentation officielle',
    accumulationOrDistribution: 'Capitalisant ou distribuant — à vérifier',
    replication: 'à vérifier',
    currency: 'Devises émergentes et devise de cotation — à vérifier',
    officialPageUrl: 'https://www.amundietf.fr/fr/particuliers',
    kidUrl: 'https://www.msci.com/indexes',
    checkedAt: '2026-07-01',
    notes: 'Diversification possible, mais risques politiques, devise, liquidité et gouvernance plus marqués.',
    category: 'Emerging Markets',
    ongoingCharges: 'à vérifier dans le DIC/KID officiel',
    suggestedUse: 'Complément progressif après maîtrise du socle Monde.',
    vigilancePoint: 'Volatilité élevée et poids réel déjà partiellement présent selon l’indice Monde choisi.',
    badges: ['PEA', 'À vérifier'],
  },
];

export type CryptoAsset = {
  id: string;
  name: string;
  category: string;
  roleInPortfolio: string;
  riskLevel: string;
  maximumSuggestedAllocation: string;
  keyRisks: string[];
  sourceUrl: string;
  checkedAt: string;
  notes: string;
  avoidIf: string;
};

export const cryptoAssets: CryptoAsset[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    category: 'Crypto-actif historique',
    roleInPortfolio: 'Éventuelle poche satellite très limitée, distincte du cœur ETF / épargne de sécurité.',
    riskLevel: 'Très élevé',
    maximumSuggestedAllocation: '0 % si refusé ; sinon petite poche strictement limitée dans le plan global.',
    keyRisks: ['Volatilité extrême', 'Réglementation', 'Liquidité variable', 'Erreur de conservation ou de transfert'],
    sourceUrl: 'https://www.amf-france.org/fr/espace-epargnants/proteger-son-epargne/crypto-actifs-bitcoin-etc',
    checkedAt: '2026-07-01',
    notes: 'Actif plus installé que les petites altcoins, mais sans garantie de capital ni rendement futur.',
    avoidIf: 'Vous avez besoin de l’argent à court terme, vous refusez la crypto ou une baisse de 50 % à 90 % vous ferait vendre en panique.',
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    category: 'Blockchain programmable',
    roleInPortfolio: 'Éventuelle exposition satellite à une infrastructure blockchain, jamais un cœur défensif.',
    riskLevel: 'Très élevé',
    maximumSuggestedAllocation: '0 % si refusé ; sinon inférieur ou égal à la poche crypto maximale décidée.',
    keyRisks: ['Risque technologique', 'Concurrence', 'Bugs ou failles', 'Évolution du protocole', 'Volatilité'],
    sourceUrl: 'https://www.amf-france.org/fr/espace-epargnants/lexique-simulateurs-et-outils-pratiques/faq-epargnants/crypto-actifs',
    checkedAt: '2026-07-01',
    notes: 'Différent de Bitcoin par son usage programmable ; cela n’en fait pas un placement sûr.',
    avoidIf: 'Vous ne comprenez pas les smart contracts, les frais réseau, les risques techniques ou la fiscalité applicable.',
  },
  {
    id: 'stablecoins',
    name: 'Stablecoins',
    category: 'Jetons visant une valeur stable',
    roleInPortfolio: 'Outil technique possible dans l’écosystème crypto, pas une épargne de sécurité par défaut.',
    riskLevel: 'Élevé',
    maximumSuggestedAllocation: 'Aucune allocation long terme automatique ; usage seulement compris et documenté.',
    keyRisks: ['Risque émetteur', 'Perte de parité', 'Réglementation', 'Plateforme', 'Liquidité'],
    sourceUrl: 'https://www.amf-france.org/fr/espace-epargnants/proteger-son-epargne/crypto-actifs-bitcoin-etc/investir-en-crypto-actifs-les-precautions-pratiques',
    checkedAt: '2026-07-01',
    notes: 'Le mot “stable” ne signifie pas garanti comme un dépôt bancaire réglementé.',
    avoidIf: 'Vous cherchez un livret sécurisé, une garantie publique ou une réserve de précaution immédiatement disponible.',
  },
  {
    id: 'altcoins-speculatives',
    name: 'Altcoins spéculatives',
    category: 'Crypto-actifs hors Bitcoin / Ethereum',
    roleInPortfolio: 'À traiter comme spéculation très risquée ; aucune altcoin précise n’est recommandée ici.',
    riskLevel: 'Extrême',
    maximumSuggestedAllocation: '0 % pour débuter ; uniquement argent dont la perte totale est acceptable.',
    keyRisks: ['Perte totale', 'Fraude', 'Illiquidité', 'Manipulation de marché', 'Abandon du projet', 'Erreur technique'],
    sourceUrl: 'https://www.amf-france.org/fr/espace-epargnants/proteger-son-epargne/listes-noires-et-mises-en-garde',
    checkedAt: '2026-07-01',
    notes: 'Ne pas confondre narration marketing, communauté active et robustesse économique.',
    avoidIf: 'Vous débutez, vous suivez une recommandation d’influenceur, ou vous ne pouvez pas analyser le projet et la liquidité.',
  },
];

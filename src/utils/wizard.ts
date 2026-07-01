import type { Allocation } from '../data/allocations';
import { allocations } from '../data/allocations';

export type CryptoAnswer = 'Non' | 'Oui, petite poche BTC/ETH' | 'Oui, mais je débute';
export type HorizonAnswer = 'moins de 5 ans' | '5 à 10 ans' | '10 à 20 ans' | '20 ans et plus';
export type SecurityAnswer = 'Oui' | 'En cours' | 'Non';
export type RiskAnswer = 'prudente' | 'équilibrée' | 'dynamique';
export type PlatformAnswer = 'N26' | 'Revolut' | 'Les deux' | 'Aucune' | 'Autre';

export type AssistantAllocation = {
  etfMonde: number;
  bitcoin: number;
  ethereum: number;
  etfPercentage: number;
  bitcoinPercentage: number;
  ethereumPercentage: number;
  explanation: string;
  warnings: string[];
  priority: string;
  objective?: string;
  recommendedHorizon?: string;
};

export type WizardAnswers = {
  amount: number;
  crypto: CryptoAnswer;
  horizon: HorizonAnswer;
  security: SecurityAnswer;
  risk: RiskAnswer;
  platform: PlatformAnswer;
};

export type WizardRecommendation = AssistantAllocation & {
  platformRecommendation: string;
  nextActions: string[];
};

const percent = (part: number, total: number) => (total > 0 ? Math.round((part / total) * 1000) / 10 : 0);
const centralizedAllocation = (amount: number): Allocation | undefined => allocations.find((item) => item.total === amount);

export const getPriorityMessage = (security: SecurityAnswer, horizon: HorizonAnswer): string => {
  if (security !== 'Oui') return 'Priorité : constituer l’épargne de sécurité avant d’augmenter les achats risqués.';
  if (horizon === 'moins de 5 ans') return 'Priorité : sécuriser l’argent nécessaire à court terme avant toute allocation volatile.';
  return 'Priorité : construire progressivement le cœur long terme avec PEA, ETF Monde et règles simples.';
};

export const getPlatformRecommendation = (platform: PlatformAnswer): string => {
  if (['N26', 'Revolut', 'Les deux'].includes(platform)) {
    return 'N26/Revolut : comparer sans supposer que c’est optimal, puis vérifier frais, IFU ou aide fiscale, compte étranger éventuel et exports.';
  }
  if (platform === 'Aucune') return 'Comparer d’abord une solution PEA lisible, les frais, les ETF disponibles et les documents fiscaux.';
  return 'Comparer la plateforme actuelle avec une solution PEA/ETF Monde, puis retenir ce qui simplifie le suivi et la fiscalité.';
};

export const buildAssistantAllocation = (
  amount: number,
  crypto: CryptoAnswer,
  horizon: HorizonAnswer,
  security: SecurityAnswer,
  risk: RiskAnswer,
): AssistantAllocation => {
  const warnings = ['Contenu éducatif uniquement : ce n’est pas un conseil financier personnalisé ni une recommandation réglementée.'];
  const priority = getPriorityMessage(security, horizon);
  const base = centralizedAllocation(amount);

  if (security !== 'Oui') warnings.push('Épargne de sécurité incomplète : préparer le PEA peut être utile, mais il ne faut pas accélérer les achats risqués.');
  if (horizon === 'moins de 5 ans') warnings.push('Horizon inférieur à 5 ans : ETF actions et crypto peuvent être trop volatils ; sécuriser l’argent nécessaire à court terme.');
  if (risk === 'prudente') warnings.push('Profil prudent : crypto optionnelle, pas prioritaire.');

  if (crypto === 'Non') {
    return {
      etfMonde: amount,
      bitcoin: 0,
      ethereum: 0,
      etfPercentage: 100,
      bitcoinPercentage: 0,
      ethereumPercentage: 0,
      explanation: 'Crypto exclue selon ta réponse. Tu as choisi d’exclure la crypto : le plan reste centré sur ETF Monde / PEA.',
      warnings,
      priority,
      objective: 'Garder un plan long terme simple, sans Bitcoin ni Ethereum.',
      recommendedHorizon: base?.recommendedHorizon,
    };
  }

  const shouldAvoidRiskyAssets = security !== 'Oui' || horizon === 'moins de 5 ans';

  if (shouldAvoidRiskyAssets) {
    return {
      etfMonde: amount,
      bitcoin: 0,
      ethereum: 0,
      etfPercentage: 100,
      bitcoinPercentage: 0,
      ethereumPercentage: 0,
      explanation:
        security !== 'Oui'
          ? 'Priorité sécurité : préparer le PEA, mais ne pas accélérer tant que la sécurité n’est pas prête. La crypto est mise à 0 dans ce plan.'
          : 'Horizon court : ETF actions et crypto sont volatils. La crypto est mise à 0 et la sécurisation court terme passe avant l’allocation risquée.',
      warnings,
      priority,
      objective: security !== 'Oui' ? 'Finaliser la réserve de sécurité avant d’augmenter les actifs risqués.' : 'Sécuriser l’argent nécessaire à moins de 5 ans.',
      recommendedHorizon: base?.recommendedHorizon,
    };
  }

  if (risk === 'prudente') {
    warnings.push('Profil prudent : même si la crypto est acceptée, le plan pédagogique met Bitcoin et Ethereum à 0.');
    return {
      etfMonde: amount,
      bitcoin: 0,
      ethereum: 0,
      etfPercentage: 100,
      bitcoinPercentage: 0,
      ethereumPercentage: 0,
      explanation: 'Profil prudent : la crypto reste optionnelle et n’est pas retenue dans ce plan. Le portefeuille reste centré sur ETF Monde / PEA.',
      warnings,
      priority,
      objective: 'Construire un plan simple hors crypto, compatible avec une tolérance au risque limitée.',
      recommendedHorizon: base?.recommendedHorizon,
    };
  }

  if (crypto === 'Oui, petite poche BTC/ETH' && base) {
    return {
      etfMonde: base.etfMonde,
      bitcoin: base.bitcoin,
      ethereum: base.ethereum,
      etfPercentage: base.etfPercentage,
      bitcoinPercentage: base.bitcoinPercentage,
      ethereumPercentage: base.ethereumPercentage,
      explanation: 'Petite poche BTC/ETH : allocation centralisée du guide, à garder limitée et sans levier.',
      warnings,
      priority,
      objective: base.objective,
      recommendedHorizon: base.recommendedHorizon,
    };
  }

  const bitcoin = Math.floor(amount * 0.06 / 5) * 5;
  const ethereum = Math.floor(amount * 0.03 / 5) * 5;
  const etfMonde = amount - bitcoin - ethereum;
  warnings.push('Crypto débutant : la poche peut rester à 0 tant que la stratégie principale ETF Monde / PEA n’est pas maîtrisée.');

  return {
    etfMonde,
    bitcoin,
    ethereum,
    etfPercentage: percent(etfMonde, amount),
    bitcoinPercentage: percent(bitcoin, amount),
    ethereumPercentage: percent(ethereum, amount),
    explanation: 'Version prudente pour débuter : ETF Monde majoritaire, Bitcoin et Ethereum très limités.',
    warnings,
    priority,
    objective: 'Maîtriser le socle ETF Monde / PEA avant toute complexité crypto.',
    recommendedHorizon: base?.recommendedHorizon,
  };
};

export const buildWizardRecommendation = (answers: WizardAnswers): WizardRecommendation => {
  const allocation = buildAssistantAllocation(answers.amount, answers.crypto, answers.horizon, answers.security, answers.risk);
  const hasCryptoAllocation = allocation.bitcoin > 0 || allocation.ethereum > 0;
  return {
    ...allocation,
    platformRecommendation: getPlatformRecommendation(answers.platform),
    nextActions: [
      answers.security !== 'Oui' ? 'Définir le montant cible de l’épargne de sécurité et l’automatiser.' : 'Valider un versement mensuel soutenable sans toucher à la réserve de sécurité.',
      answers.horizon === 'moins de 5 ans' ? 'Isoler l’argent nécessaire à court terme sur des supports moins volatils.' : 'Préparer le PEA et la règle de versement ETF Monde.',
      hasCryptoAllocation ? 'Écrire une règle crypto : petite poche, pas de levier, aucun achat sous émotion.' : 'Noter explicitement : pas de Bitcoin ni Ethereum dans ce plan.',
      'Comparer les frais, documents fiscaux, exports et contraintes avant de choisir une plateforme.',
    ],
  };
};

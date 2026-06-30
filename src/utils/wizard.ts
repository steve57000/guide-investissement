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

  const allowTinyCrypto = risk !== 'prudente' && security === 'Oui' && horizon !== 'moins de 5 ans';
  const bitcoin = allowTinyCrypto ? Math.floor(amount * 0.06 / 5) * 5 : 0;
  const ethereum = allowTinyCrypto ? Math.floor(amount * 0.03 / 5) * 5 : 0;
  const etfMonde = amount - bitcoin - ethereum;
  warnings.push('Crypto débutant : la poche peut rester à 0 tant que la stratégie principale ETF Monde / PEA n’est pas maîtrisée.');

  return {
    etfMonde,
    bitcoin,
    ethereum,
    etfPercentage: percent(etfMonde, amount),
    bitcoinPercentage: percent(bitcoin, amount),
    ethereumPercentage: percent(ethereum, amount),
    explanation: allowTinyCrypto
      ? 'Version prudente pour débuter : ETF Monde majoritaire, Bitcoin et Ethereum très limités.'
      : 'Version prudente : crypto mise à 0 car la sécurité, l’horizon ou le profil prudent ne justifient pas de la prioriser.',
    warnings,
    priority,
    objective: 'Maîtriser le socle ETF Monde / PEA avant toute complexité crypto.',
    recommendedHorizon: base?.recommendedHorizon,
  };
};

export const buildWizardRecommendation = (answers: WizardAnswers): WizardRecommendation => {
  const allocation = buildAssistantAllocation(answers.amount, answers.crypto, answers.horizon, answers.security, answers.risk);
  return {
    ...allocation,
    platformRecommendation: getPlatformRecommendation(answers.platform),
    nextActions: [
      answers.security !== 'Oui' ? 'Définir le montant cible de l’épargne de sécurité et l’automatiser.' : 'Valider un versement mensuel soutenable sans toucher à la réserve de sécurité.',
      answers.horizon === 'moins de 5 ans' ? 'Isoler l’argent nécessaire à court terme sur des supports moins volatils.' : 'Préparer le PEA et la règle de versement ETF Monde.',
      answers.crypto === 'Non' ? 'Noter explicitement : pas de Bitcoin ni Ethereum dans ce plan.' : 'Écrire une règle crypto : petite poche, pas de levier, aucun achat sous émotion.',
      'Comparer les frais, documents fiscaux, exports et contraintes avant de choisir une plateforme.',
    ],
  };
};

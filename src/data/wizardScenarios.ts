import type { CryptoAnswer, HorizonAnswer, RiskAnswer, SecurityAnswer } from '../utils/wizard';

export type WizardScenario = {
  label: string;
  amount: number;
  crypto: CryptoAnswer;
  security: SecurityAnswer;
  horizon: HorizonAnswer;
  risk: RiskAnswer;
  expected: string;
};

export const wizardScenarios: WizardScenario[] = [
  { label: '50 €/mois sans crypto', amount: 50, crypto: 'Non', security: 'Oui', horizon: '10 à 20 ans', risk: 'équilibrée', expected: '50 ETF Monde, 0 BTC, 0 ETH' },
  { label: '100 €/mois sans crypto', amount: 100, crypto: 'Non', security: 'Oui', horizon: '10 à 20 ans', risk: 'équilibrée', expected: '100 ETF Monde, 0 BTC, 0 ETH' },
  { label: '50 €/mois avec petite poche', amount: 50, crypto: 'Oui, petite poche BTC/ETH', security: 'Oui', horizon: '10 à 20 ans', risk: 'équilibrée', expected: '35 ETF Monde, 10 BTC, 5 ETH' },
  { label: 'Épargne de sécurité absente', amount: 100, crypto: 'Oui, petite poche BTC/ETH', security: 'Non', horizon: '10 à 20 ans', risk: 'équilibrée', expected: 'priorité sécurité' },
  { label: 'Horizon court', amount: 100, crypto: 'Oui, petite poche BTC/ETH', security: 'Oui', horizon: 'moins de 5 ans', risk: 'équilibrée', expected: 'avertissement volatilité' },
  { label: 'Profil prudent et crypto débutant', amount: 100, crypto: 'Oui, mais je débute', security: 'Oui', horizon: '10 à 20 ans', risk: 'prudente', expected: 'crypto fortement déconseillée ou mise à 0' },
];

export type Allocation = {
  total: number;
  etfMonde: number;
  bitcoin: number;
  ethereum: number;
  etfPercentage: number;
  bitcoinPercentage: number;
  ethereumPercentage: number;
  riskLevel: string;
  objective: string;
  recommendedHorizon: string;
};

const horizon = '10 ans minimum, idéalement 15–30 ans';

const rawAllocations = [
  { total: 50, etfMonde: 35, bitcoin: 10, ethereum: 5, riskLevel: 'Modéré à dynamique', objective: "Installer l'habitude sans complexité." },
  { total: 75, etfMonde: 55, bitcoin: 15, ethereum: 5, riskLevel: 'Modéré à dynamique', objective: 'Consolider la régularité et créer une base diversifiée.' },
  { total: 100, etfMonde: 75, bitcoin: 15, ethereum: 10, riskLevel: 'Modéré à dynamique', objective: 'Construire un socle plus solide et visible.' },
  { total: 150, etfMonde: 115, bitcoin: 20, ethereum: 15, riskLevel: 'Dynamique maîtrisé', objective: 'Accélérer la boule de neige patrimoniale.' },
  { total: 200, etfMonde: 155, bitcoin: 30, ethereum: 15, riskLevel: 'Dynamique maîtrisé', objective: 'Accélérer sans surpondérer la crypto.' },
  { total: 300, etfMonde: 235, bitcoin: 45, ethereum: 20, riskLevel: 'Dynamique', objective: 'Renforcer le PEA avec une crypto toujours contrôlée.' },
  { total: 500, etfMonde: 400, bitcoin: 70, ethereum: 30, riskLevel: 'Dynamique', objective: 'Construire un patrimoine financier structuré.' },
  { total: 1000, etfMonde: 800, bitcoin: 150, ethereum: 50, riskLevel: 'Dynamique avec pilotage', objective: 'Piloter une stratégie patrimoniale complète et documentée.' },
] as const;

const percent = (part: number, total: number) => Math.round((part / total) * 1000) / 10;

export const allocations: Allocation[] = rawAllocations.map((allocation) => ({
  ...allocation,
  etfPercentage: percent(allocation.etfMonde, allocation.total),
  bitcoinPercentage: percent(allocation.bitcoin, allocation.total),
  ethereumPercentage: percent(allocation.ethereum, allocation.total),
  recommendedHorizon: horizon,
}));

export const featuredAllocations = allocations.filter(({ total }) => [50, 100, 200].includes(total));
export const steveAllocations = allocations.filter(({ total }) => [50, 100, 200, 300].includes(total));

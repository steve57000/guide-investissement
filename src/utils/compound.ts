export type CompoundProjectionInput = {
  monthly: number;
  years: number;
  annualRate: number;
  initial?: number;
  annualFees?: number;
  annualInflation?: number;
};

export type CompoundProjection = {
  invested: number;
  nominalCapital: number;
  inflationAdjustedCapital: number;
  theoreticalGains: number;
};

export function calculateCompoundProjection({
  monthly,
  years,
  annualRate,
  initial = 0,
  annualFees = 0,
  annualInflation = 0,
}: CompoundProjectionInput): CompoundProjection {
  const months = Math.max(0, Math.round(years * 12));
  const netAnnualRate = annualRate - annualFees;
  const monthlyRate = netAnnualRate / 12;
  let capital = initial;

  for (let month = 1; month <= months; month += 1) {
    capital = capital * (1 + monthlyRate) + monthly;
  }

  const invested = initial + monthly * months;
  const inflationAdjustedCapital = capital / Math.pow(1 + annualInflation, years || 0);

  return {
    invested,
    nominalCapital: capital,
    inflationAdjustedCapital,
    theoreticalGains: capital - invested,
  };
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function buildScenarioTable(monthlyAmounts: number[], years: number[]) {
  return years.map((horizon) => ({
    horizon,
    rows: monthlyAmounts.map((monthly) => {
      const prudent = calculateCompoundProjection({ monthly, years: horizon, annualRate: 0.04 });
      const balanced = calculateCompoundProjection({ monthly, years: horizon, annualRate: 0.06 });
      const dynamic = calculateCompoundProjection({ monthly, years: horizon, annualRate: 0.08 });
      return {
        monthly,
        invested: balanced.invested,
        prudent: prudent.nominalCapital,
        balanced: balanced.nominalCapital,
        dynamic: dynamic.nominalCapital,
        theoreticalGains: balanced.theoreticalGains,
      };
    }),
  }));
}

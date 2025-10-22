import type { MonthlyEvolution } from '../types';

/**
 * @utility formatMonthlyEvolution
 * @summary Formats monthly evolution data for display
 * @domain investment
 * @type utility-function
 * @category formatting
 */
export const formatMonthlyEvolution = (evolution: MonthlyEvolution[]): MonthlyEvolution[] => {
  return evolution.map((item) => ({
    ...item,
    aporteRealizado: Math.round(item.aporteRealizado * 100) / 100,
    jurosMes: Math.round(item.jurosMes * 100) / 100,
    montanteAcumulado: Math.round(item.montanteAcumulado * 100) / 100,
  }));
};

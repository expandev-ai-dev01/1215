import type {
  InvestmentSimulationParams,
  InvestmentProjectionResult,
  MonthlyEvolutionItem,
} from './investmentSimulationTypes';

/**
 * @summary
 * Calculates investment projection using compound interest formula with monthly contributions
 *
 * @function calculateInvestmentProjection
 * @module investmentSimulation
 *
 * @param {InvestmentSimulationParams} params - Investment simulation parameters
 * @param {number} params.valorInicial - Initial investment amount
 * @param {number} params.aporteMensal - Monthly contribution amount
 * @param {number} params.taxaJuros - Monthly interest rate in percentage
 * @param {number} params.prazo - Investment period in months
 *
 * @returns {InvestmentProjectionResult} Calculated projection results
 *
 * @throws {Error} When calculation fails
 *
 * @example
 * const result = calculateInvestmentProjection({
 *   valorInicial: 10000,
 *   aporteMensal: 500,
 *   taxaJuros: 1,
 *   prazo: 12
 * });
 */
export function calculateInvestmentProjection(
  params: InvestmentSimulationParams
): InvestmentProjectionResult {
  const { valorInicial, aporteMensal, taxaJuros, prazo } = params;

  /**
   * @rule {be-business-rule-001} Convert percentage to decimal
   */
  const taxaDecimal = taxaJuros / 100;

  /**
   * @rule {be-business-rule-002} Calculate final amount using compound interest formula
   * Formula: M = P(1+i)^n + PMT[((1+i)^n - 1)/i]
   * Where: M = final amount, P = initial value, i = monthly rate, n = period, PMT = monthly contribution
   */
  const fatorJuros = Math.pow(1 + taxaDecimal, prazo);
  const montanteInicial = valorInicial * fatorJuros;
  const montanteAportes = aporteMensal * ((fatorJuros - 1) / taxaDecimal);
  const montanteFinal = parseFloat((montanteInicial + montanteAportes).toFixed(2));

  /**
   * @rule {be-business-rule-003} Calculate total invested
   * Total invested = initial value + (monthly contribution * period)
   */
  const valorTotalInvestido = parseFloat((valorInicial + aporteMensal * prazo).toFixed(2));

  /**
   * @rule {be-business-rule-004} Calculate accumulated interest
   * Accumulated interest = final amount - total invested
   */
  const jurosAcumulados = parseFloat((montanteFinal - valorTotalInvestido).toFixed(2));

  return {
    montanteFinal,
    valorTotalInvestido,
    jurosAcumulados,
  };
}

/**
 * @summary
 * Calculates month-by-month evolution of the investment
 *
 * @function calculateMonthlyEvolution
 * @module investmentSimulation
 *
 * @param {InvestmentSimulationParams} params - Investment simulation parameters
 * @param {number} params.valorInicial - Initial investment amount
 * @param {number} params.aporteMensal - Monthly contribution amount
 * @param {number} params.taxaJuros - Monthly interest rate in percentage
 * @param {number} params.prazo - Investment period in months
 *
 * @returns {MonthlyEvolutionItem[]} Array with monthly evolution data
 *
 * @throws {Error} When calculation fails
 *
 * @example
 * const evolution = calculateMonthlyEvolution({
 *   valorInicial: 10000,
 *   aporteMensal: 500,
 *   taxaJuros: 1,
 *   prazo: 12
 * });
 */
export function calculateMonthlyEvolution(
  params: InvestmentSimulationParams
): MonthlyEvolutionItem[] {
  const { valorInicial, aporteMensal, taxaJuros, prazo } = params;

  /**
   * @rule {be-business-rule-005} Convert percentage to decimal
   */
  const taxaDecimal = taxaJuros / 100;

  const evolution: MonthlyEvolutionItem[] = [];
  let montanteAnterior = valorInicial;

  for (let mes = 1; mes <= prazo; mes++) {
    /**
     * @rule {be-business-rule-006} First month: only initial value + interest (no contribution)
     * @rule {be-business-rule-007} Subsequent months: previous amount + contribution + interest
     */
    const aporteRealizado = mes === 1 ? 0 : aporteMensal;
    const baseCalculo = montanteAnterior + aporteRealizado;
    const jurosDoMes = parseFloat((baseCalculo * taxaDecimal).toFixed(2));
    const montanteAcumulado = parseFloat((baseCalculo + jurosDoMes).toFixed(2));

    evolution.push({
      mes,
      aporteRealizado: parseFloat(aporteRealizado.toFixed(2)),
      jurosDoMes,
      montanteAcumulado,
    });

    montanteAnterior = montanteAcumulado;
  }

  return evolution;
}

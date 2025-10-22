/**
 * @interface InvestmentSimulationParams
 * @description Parameters for investment simulation calculation
 *
 * @property {number} valorInicial - Initial investment amount
 * @property {number} aporteMensal - Monthly contribution amount
 * @property {number} taxaJuros - Monthly interest rate in percentage
 * @property {number} prazo - Investment period in months
 */
export interface InvestmentSimulationParams {
  valorInicial: number;
  aporteMensal: number;
  taxaJuros: number;
  prazo: number;
}

/**
 * @interface InvestmentProjectionResult
 * @description Result of investment projection calculation
 *
 * @property {number} montanteFinal - Final projected amount
 * @property {number} valorTotalInvestido - Total amount invested
 * @property {number} jurosAcumulados - Accumulated interest
 */
export interface InvestmentProjectionResult {
  montanteFinal: number;
  valorTotalInvestido: number;
  jurosAcumulados: number;
}

/**
 * @interface MonthlyEvolutionItem
 * @description Monthly evolution data for investment
 *
 * @property {number} mes - Month number
 * @property {number} aporteRealizado - Contribution made in the month
 * @property {number} jurosDoMes - Interest earned in the month
 * @property {number} montanteAcumulado - Accumulated amount at month end
 */
export interface MonthlyEvolutionItem {
  mes: number;
  aporteRealizado: number;
  jurosDoMes: number;
  montanteAcumulado: number;
}

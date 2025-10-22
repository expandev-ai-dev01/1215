/**
 * @type SimulationParams
 * @summary Parameters for investment simulation
 */
export interface SimulationParams {
  valorInicial: number;
  aporteMensal: number;
  taxaJuros: number;
  prazo: number;
}

/**
 * @type SimulationResult
 * @summary Result of investment simulation calculation
 */
export interface SimulationResult {
  montanteFinal: number;
  valorTotalInvestido: number;
  jurosAcumulados: number;
  evolucaoMensal: MonthlyEvolution[];
}

/**
 * @type MonthlyEvolution
 * @summary Monthly evolution data point
 */
export interface MonthlyEvolution {
  mes: number;
  aporteRealizado: number;
  jurosMes: number;
  montanteAcumulado: number;
}

/**
 * @type SimulationFormData
 * @summary Form data structure for simulation input
 */
export interface SimulationFormData {
  valorInicial: string;
  aporteMensal: string;
  taxaJuros: string;
  prazo: string;
}

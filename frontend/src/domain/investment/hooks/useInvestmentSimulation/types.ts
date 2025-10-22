import type { SimulationParams, SimulationResult } from '../../types';

export interface UseInvestmentSimulationOptions {
  onSuccess?: (data: SimulationResult) => void;
  onError?: (error: Error) => void;
}

export interface UseInvestmentSimulationReturn {
  simulate: (params: SimulationParams) => void;
  result: SimulationResult | undefined;
  isLoading: boolean;
  error: Error | null;
  reset: () => void;
}

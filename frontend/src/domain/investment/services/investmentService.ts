import { publicClient } from '@/core/lib/api';
import type { SimulationParams, SimulationResult } from '../types';

/**
 * @service investmentService
 * @summary Investment simulation service for public endpoints
 * @domain investment
 * @type rest-service
 * @apiContext external
 *
 * @description
 * All methods in this service use publicClient which targets:
 * /api/v1/external/investment-simulation
 */
export const investmentService = {
  /**
   * @endpoint POST /api/v1/external/investment-simulation
   * @summary Calculates investment projection with compound interest
   */
  async simulate(params: SimulationParams): Promise<SimulationResult> {
    const response = await publicClient.post('/investment-simulation', params);
    return response.data.data;
  },
};

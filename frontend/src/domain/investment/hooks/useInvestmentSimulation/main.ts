import { useMutation } from '@tanstack/react-query';
import { investmentService } from '../../services/investmentService';
import type { UseInvestmentSimulationOptions, UseInvestmentSimulationReturn } from './types';

/**
 * @hook useInvestmentSimulation
 * @summary Hook for managing investment simulation with server-side calculation
 * @domain investment
 * @type domain-hook
 * @category data
 *
 * @parameters
 * @param {Object} options - Hook options
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 *
 * @returns {Object} Hook return object
 * @returns {Function} returns.simulate - Function to trigger simulation
 * @returns {Object} returns.result - Simulation result data
 * @returns {boolean} returns.isLoading - Loading state
 * @returns {Error} returns.error - Error object if any
 * @returns {Function} returns.reset - Function to reset state
 */
export const useInvestmentSimulation = (
  options: UseInvestmentSimulationOptions = {}
): UseInvestmentSimulationReturn => {
  const { onSuccess, onError } = options;

  const mutation = useMutation({
    mutationFn: investmentService.simulate,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error: any) => {
      onError?.(error);
    },
  });

  return {
    simulate: mutation.mutate,
    result: mutation.data,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
};

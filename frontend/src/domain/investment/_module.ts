/**
 * @module investment
 * @summary Investment simulation domain with calculation logic and UI components
 * @domain functional
 * @dependencies Core components, React Hook Form, Zod, TanStack Query
 * @version 1.0.0
 * @author Development Team
 * @lastModified 2024-01-15
 */

// Domain public exports - Components
export * from './components/SimulationForm';
export * from './components/SimulationResults';
export * from './components/MonthlyEvolutionTable';

// Domain public exports - Hooks
export * from './hooks/useInvestmentSimulation';

// Domain public exports - Services
export * from './services/investmentService';

// Domain public exports - Types
export * from './types';

// Domain public exports - Utils
export * from './utils/calculations';

// Module metadata
export const moduleMetadata = {
  name: 'investment',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['SimulationForm', 'SimulationResults', 'MonthlyEvolutionTable'],
  publicHooks: ['useInvestmentSimulation'],
  publicServices: ['investmentService'],
  dependencies: {
    internal: ['@/core/components', '@/core/lib', '@/core/utils'],
    external: ['react', 'react-hook-form', 'zod', '@tanstack/react-query'],
    domains: [],
  },
  exports: {
    components: ['SimulationForm', 'SimulationResults', 'MonthlyEvolutionTable'],
    hooks: ['useInvestmentSimulation'],
    services: ['investmentService'],
    types: ['SimulationParams', 'SimulationResult', 'MonthlyEvolution'],
    utils: ['formatMonthlyEvolution'],
  },
} as const;

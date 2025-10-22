import { useState } from 'react';
import { Card } from '@/core/components/Card';
import { Button } from '@/core/components/Button';
import {
  SimulationForm,
  SimulationResults,
  MonthlyEvolutionTable,
  useInvestmentSimulation,
} from '@/domain/investment/_module';
import type { SimulationParams } from '@/domain/investment/types';

/**
 * @page HomePage
 * @summary Home page with investment simulator
 * @domain investment
 * @type page-component
 * @category investment-simulation
 *
 * @routing
 * - Path: /
 * - Params: none
 * - Query: none
 * - Guards: none
 *
 * @layout
 * - Layout: RootLayout
 * - Sections: Header, Form, Results, Evolution Table
 *
 * @data
 * - Sources: Investment simulation API
 * - Loading: Form disabled during calculation
 * - Caching: No caching (fresh calculation each time)
 *
 * @userFlows
 * - Primary: Fill form → Submit → View results
 * - Secondary: View results → New simulation
 * - Error: Invalid input → Show validation errors
 */
export const HomePage = () => {
  const [showResults, setShowResults] = useState(false);
  const [lastParams, setLastParams] = useState<SimulationParams | null>(null);

  const { simulate, result, isLoading, error, reset } = useInvestmentSimulation({
    onSuccess: () => {
      setShowResults(true);
    },
    onError: (err: Error) => {
      console.error('Simulation error:', err);
      alert('Erro ao calcular simulação. Por favor, tente novamente.');
    },
  });

  const handleSubmit = (params: SimulationParams) => {
    setLastParams(params);
    simulate(params);
  };

  const handleNewSimulation = () => {
    const keepValues = window.confirm('Deseja manter os valores da simulação anterior?');

    if (!keepValues) {
      setLastParams(null);
    }

    setShowResults(false);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Simulador de Investimento</h1>
            <p className="text-lg text-gray-600">
              Calcule suas projeções de investimento com juros compostos
            </p>
          </header>

          <Card variant="elevated" padding="lg">
            <SimulationForm onSubmit={handleSubmit} isLoading={isLoading} />
          </Card>

          {error && (
            <Card variant="outlined" padding="md">
              <div className="text-center text-red-600">
                <p className="font-semibold">Erro ao processar simulação</p>
                <p className="text-sm mt-1">
                  {error instanceof Error ? error.message : 'Erro desconhecido'}
                </p>
              </div>
            </Card>
          )}

          {showResults && result && (
            <div className="space-y-8">
              <SimulationResults result={result} />

              <MonthlyEvolutionTable data={result.evolucaoMensal} />

              <div className="flex justify-center">
                <Button variant="primary" size="lg" onClick={handleNewSimulation}>
                  Nova Simulação
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import { Card } from '@/core/components/Card';
import { formatCurrency } from '@/core/utils/format';
import type { SimulationResultsProps } from './types';

/**
 * @component SimulationResults
 * @summary Displays investment simulation results summary
 * @domain investment
 * @type domain-component
 * @category display
 *
 * @props
 * @param {SimulationResult} props.result - Simulation result data
 *
 * @styling
 * - Responsive: Grid layout adapts to screen size
 * - Variants: Highlighted cards for key metrics
 */
export const SimulationResults = ({ result }: SimulationResultsProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Resultados da Simulação</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="elevated" padding="lg">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Montante Final</p>
            <p className="text-3xl font-bold text-green-600">
              {formatCurrency(result.montanteFinal)}
            </p>
          </div>
        </Card>

        <Card variant="elevated" padding="lg">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Total Investido</p>
            <p className="text-3xl font-bold text-blue-600">
              {formatCurrency(result.valorTotalInvestido)}
            </p>
          </div>
        </Card>

        <Card variant="elevated" padding="lg">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Juros Acumulados</p>
            <p className="text-3xl font-bold text-purple-600">
              {formatCurrency(result.jurosAcumulados)}
            </p>
          </div>
        </Card>
      </div>

      <Card variant="outlined" padding="md">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Rentabilidade:</span>
            <span className="font-semibold text-gray-900">
              {((result.jurosAcumulados / result.valorTotalInvestido) * 100).toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Crescimento:</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(result.montanteFinal - result.valorTotalInvestido)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

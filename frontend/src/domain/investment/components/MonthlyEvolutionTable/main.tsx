import { useState } from 'react';
import { Card } from '@/core/components/Card';
import { Button } from '@/core/components/Button';
import { formatCurrency } from '@/core/utils/format';
import type { MonthlyEvolutionTableProps } from './types';

/**
 * @component MonthlyEvolutionTable
 * @summary Displays monthly evolution of investment with pagination
 * @domain investment
 * @type domain-component
 * @category display
 *
 * @props
 * @param {MonthlyEvolution[]} props.data - Monthly evolution data
 *
 * @state
 * - currentPage: Current page number for pagination
 * - itemsPerPage: Number of items per page (12)
 *
 * @accessibility
 * - ARIA: Table with proper headers and data cells
 * - Keyboard: Pagination buttons keyboard accessible
 */
export const MonthlyEvolutionTable = ({ data }: MonthlyEvolutionTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Card variant="outlined" padding="md">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Evolução Mensal</h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mês
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aporte
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Juros do Mês
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montante Acumulado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((item) => (
                <tr key={item.mes} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.mes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">
                    {formatCurrency(item.aporteRealizado)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600">
                    {formatCurrency(item.jurosMes)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900">
                    {formatCurrency(item.montanteAcumulado)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-sm text-gray-700">
              Página {currentPage} de {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Próxima
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

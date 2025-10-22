import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/core/components/Input';
import { Button } from '@/core/components/Button';
import { simulationSchema } from './validation';
import type { SimulationFormProps } from './types';
import type { SimulationFormData } from '../../types';

/**
 * @component SimulationForm
 * @summary Form for investment simulation parameters input
 * @domain investment
 * @type domain-component
 * @category form
 *
 * @props
 * @param {Function} props.onSubmit - Callback when form is submitted with valid data
 * @param {boolean} props.isLoading - Loading state to disable form during submission
 *
 * @state
 * - Form state managed by react-hook-form
 * - Validation errors displayed inline
 *
 * @accessibility
 * - ARIA: Form labels and error messages properly associated
 * - Keyboard: Full keyboard navigation support
 * - Screen Reader: Error messages announced
 */
export const SimulationForm = ({ onSubmit, isLoading = false }: SimulationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SimulationFormData>({
    resolver: zodResolver(simulationSchema),
    mode: 'onBlur',
  });

  const handleFormSubmit = (data: SimulationFormData) => {
    const params = {
      valorInicial: parseFloat(data.valorInicial),
      aporteMensal: parseFloat(data.aporteMensal),
      taxaJuros: parseFloat(data.taxaJuros),
      prazo: parseInt(data.prazo, 10),
    };
    onSubmit(params);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Valor Inicial"
          type="number"
          step="0.01"
          placeholder="0,00"
          error={errors.valorInicial?.message}
          disabled={isLoading}
          required
          fullWidth
          {...register('valorInicial')}
        />

        <Input
          label="Aporte Mensal"
          type="number"
          step="0.01"
          placeholder="0,00"
          error={errors.aporteMensal?.message}
          disabled={isLoading}
          required
          fullWidth
          {...register('aporteMensal')}
        />

        <Input
          label="Taxa de Juros (% ao mês)"
          type="number"
          step="0.01"
          placeholder="0,00"
          error={errors.taxaJuros?.message}
          helperText="Entre 0,1% e 20% ao mês"
          disabled={isLoading}
          required
          fullWidth
          {...register('taxaJuros')}
        />

        <Input
          label="Prazo (meses)"
          type="number"
          placeholder="12"
          error={errors.prazo?.message}
          helperText="Máximo 600 meses (50 anos)"
          disabled={isLoading}
          required
          fullWidth
          {...register('prazo')}
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading} fullWidth>
          {isLoading ? 'Calculando...' : 'Simular'}
        </Button>
        <Button type="button" variant="secondary" onClick={() => reset()} disabled={isLoading}>
          Limpar
        </Button>
      </div>
    </form>
  );
};

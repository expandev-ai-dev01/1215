import type { SimulationParams } from '../../types';

export interface SimulationFormProps {
  onSubmit: (params: SimulationParams) => void;
  isLoading?: boolean;
}

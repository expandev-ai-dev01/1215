import { z } from 'zod';

/**
 * @validation simulationSchema
 * @summary Zod schema for investment simulation form validation
 * @domain investment
 */
export const simulationSchema = z.object({
  valorInicial: z
    .string()
    .min(1, 'Este campo é obrigatório')
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0;
      },
      { message: 'O valor inicial deve ser maior ou igual a zero' }
    )
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num <= 999999999.99;
      },
      { message: 'O valor inicial não pode exceder R$ 999.999.999,99' }
    ),
  aporteMensal: z
    .string()
    .min(1, 'Este campo é obrigatório')
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0;
      },
      { message: 'O valor do aporte mensal deve ser maior ou igual a zero' }
    )
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num <= 999999999.99;
      },
      { message: 'O aporte mensal não pode exceder R$ 999.999.999,99' }
    ),
  taxaJuros: z
    .string()
    .min(1, 'Este campo é obrigatório')
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0.1 && num <= 20;
      },
      { message: 'A taxa de juros deve estar entre 0,1% e 20% ao mês' }
    ),
  prazo: z
    .string()
    .min(1, 'Este campo é obrigatório')
    .refine(
      (val) => {
        const num = parseInt(val, 10);
        return !isNaN(num) && num > 0 && Number.isInteger(num);
      },
      { message: 'O prazo deve ser maior que zero e expresso em meses' }
    )
    .refine(
      (val) => {
        const num = parseInt(val, 10);
        return !isNaN(num) && num <= 600;
      },
      { message: 'O prazo não pode exceder 600 meses (50 anos)' }
    ),
});

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { HTTP_STATUS } from '@/constants/http';
import {
  calculateInvestmentProjection,
  calculateMonthlyEvolution,
} from '@/services/investmentSimulation';

/**
 * @api {post} /external/investment-simulation Simulate Investment
 * @apiName SimulateInvestment
 * @apiGroup InvestmentSimulation
 * @apiVersion 1.0.0
 *
 * @apiDescription Calculates investment projection with compound interest
 *
 * @apiParam {Number} valorInicial Initial investment amount (>= 0, max 999999999.99)
 * @apiParam {Number} aporteMensal Monthly contribution amount (>= 0, max 999999999.99)
 * @apiParam {Number} taxaJuros Monthly interest rate in percentage (0.1 to 20)
 * @apiParam {Number} prazo Investment period in months (1 to 600)
 *
 * @apiSuccess {Object} data Calculation results
 * @apiSuccess {Number} data.montanteFinal Final projected amount
 * @apiSuccess {Number} data.valorTotalInvestido Total amount invested
 * @apiSuccess {Number} data.jurosAcumulados Accumulated interest
 * @apiSuccess {Array} data.evolucaoMensal Monthly evolution array
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} ServerError Internal server error
 */

const simulationSchema = z.object({
  valorInicial: z
    .number({
      required_error: 'O valor inicial é obrigatório',
      invalid_type_error: 'Por favor, insira um valor numérico válido',
    })
    .min(0, 'O valor inicial deve ser maior ou igual a zero')
    .max(999999999.99, 'O valor inicial não pode exceder R$ 999.999.999,99')
    .refine((val) => Number.isFinite(val) && /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: 'O valor inicial deve ter no máximo duas casas decimais',
    }),
  aporteMensal: z
    .number({
      required_error: 'O aporte mensal é obrigatório',
      invalid_type_error: 'Por favor, insira um valor numérico válido',
    })
    .min(0, 'O valor do aporte mensal deve ser maior ou igual a zero')
    .max(999999999.99, 'O aporte mensal não pode exceder R$ 999.999.999,99')
    .refine((val) => Number.isFinite(val) && /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: 'O aporte mensal deve ter no máximo duas casas decimais',
    }),
  taxaJuros: z
    .number({
      required_error: 'A taxa de juros é obrigatória',
      invalid_type_error: 'Por favor, insira um valor numérico válido',
    })
    .min(0.1, 'A taxa de juros deve estar entre 0,1% e 20% ao mês')
    .max(20, 'A taxa de juros deve estar entre 0,1% e 20% ao mês')
    .refine((val) => Number.isFinite(val) && /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: 'A taxa de juros deve ter no máximo duas casas decimais',
    }),
  prazo: z
    .number({
      required_error: 'O prazo é obrigatório',
      invalid_type_error: 'Por favor, insira um valor numérico válido',
    })
    .int('O prazo deve ser um número inteiro')
    .min(1, 'O prazo deve ser maior que zero e expresso em meses')
    .max(600, 'O prazo não pode exceder 600 meses (50 anos)'),
});

export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = simulationSchema.parse(req.body);

    const projection = calculateInvestmentProjection(validated);
    const monthlyEvolution = calculateMonthlyEvolution(validated);

    const result = {
      montanteFinal: projection.montanteFinal,
      valorTotalInvestido: projection.valorTotalInvestido,
      jurosAcumulados: projection.jurosAcumulados,
      evolucaoMensal: monthlyEvolution,
    };

    res.json(successResponse(result));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res
        .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
        .json(
          errorResponse(
            error.errors[0]?.message || 'Validation failed',
            'VALIDATION_ERROR',
            error.errors
          )
        );
    } else {
      next(error);
    }
  }
}

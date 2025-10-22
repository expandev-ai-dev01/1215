import { z } from 'zod';

export const zString = z.string().min(1, 'Campo obrigatório');

export const zNullableString = z.string().nullable();

export const zName = z.string().min(1, 'Nome obrigatório').max(100, 'Nome muito longo');

export const zNullableDescription = z.string().max(500, 'Descrição muito longa').nullable();

export const zFK = z.number().int().positive('ID inválido');

export const zNullableFK = z.number().int().positive('ID inválido').nullable();

export const zBit = z.number().int().min(0).max(1);

export const zDateString = z.string().datetime();

export const zEmail = z.string().email('Email inválido');

export const zPositiveNumber = z.number().positive('Valor deve ser positivo');

export const zNonNegativeNumber = z.number().min(0, 'Valor não pode ser negativo');

export const zPercentage = z
  .number()
  .min(0, 'Percentual não pode ser negativo')
  .max(100, 'Percentual não pode exceder 100');

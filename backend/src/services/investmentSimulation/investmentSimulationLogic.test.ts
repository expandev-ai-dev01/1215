import {
  calculateInvestmentProjection,
  calculateMonthlyEvolution,
} from './investmentSimulationLogic';
import type { InvestmentSimulationParams } from './investmentSimulationTypes';

describe('calculateInvestmentProjection', () => {
  it('should calculate projection correctly with valid parameters', () => {
    const params: InvestmentSimulationParams = {
      valorInicial: 10000,
      aporteMensal: 500,
      taxaJuros: 1,
      prazo: 12,
    };

    const result = calculateInvestmentProjection(params);

    expect(result).toHaveProperty('montanteFinal');
    expect(result).toHaveProperty('valorTotalInvestido');
    expect(result).toHaveProperty('jurosAcumulados');
    expect(result.montanteFinal).toBeGreaterThan(result.valorTotalInvestido);
    expect(result.jurosAcumulados).toBeGreaterThan(0);
  });

  it('should calculate correctly with zero initial value', () => {
    const params: InvestmentSimulationParams = {
      valorInicial: 0,
      aporteMensal: 1000,
      taxaJuros: 1,
      prazo: 12,
    };

    const result = calculateInvestmentProjection(params);

    expect(result.montanteFinal).toBeGreaterThan(0);
    expect(result.valorTotalInvestido).toBe(12000);
  });

  it('should calculate correctly with zero monthly contribution', () => {
    const params: InvestmentSimulationParams = {
      valorInicial: 10000,
      aporteMensal: 0,
      taxaJuros: 1,
      prazo: 12,
    };

    const result = calculateInvestmentProjection(params);

    expect(result.montanteFinal).toBeGreaterThan(result.valorTotalInvestido);
    expect(result.valorTotalInvestido).toBe(10000);
  });

  it('should round values to two decimal places', () => {
    const params: InvestmentSimulationParams = {
      valorInicial: 10000.123,
      aporteMensal: 500.456,
      taxaJuros: 1.234,
      prazo: 12,
    };

    const result = calculateInvestmentProjection(params);

    expect(result.montanteFinal.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
    expect(result.valorTotalInvestido.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
    expect(result.jurosAcumulados.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
  });

  it('should handle long investment periods correctly', () => {
    const params: InvestmentSimulationParams = {
      valorInicial: 10000,
      aporteMensal: 500,
      taxaJuros: 1,
      prazo: 600,
    };

    const result = calculateInvestmentProjection(params);

    expect(result.montanteFinal).toBeGreaterThan(0);
    expect(result.montanteFinal).toBeGreaterThan(result.valorTotalInvestido);
    expect(Number.isFinite(result.montanteFinal)).toBe(true);
  });
});

describe('calculateMonthlyEvolution', () => {
  it('should generate monthly evolution array with correct length', () => {
    const params: InvestmentSimulationParams = {
      valorInicial: 10000,
      aporteMensal: 500,
      taxaJuros: 1,
      prazo: 12,
    };

    const evolution = calculateMonthlyEvolution(params);

    expect(evolution).toHaveLength(12);
  });

  it('should have zero contribution in first month', () => {
    const params: InvestmentSimulationParams = {
      valorInicial: 10000,
      aporteMensal: 500,
      taxaJuros: 1,
      prazo: 12,
    };

    const evolution = calculateMonthlyEvolution(params);

    expect(evolution[0].mes).toBe(1);
    expect(evolution[0].aporteRealizado).toBe(0);
    expect(evolution[0].jurosDoMes).toBeGreaterThan(0);
    expect(evolution[0].montanteAcumulado).toBeGreaterThan(params.valorInicial);
  });

  it('should have contributions from second month onwards', () => {
    const params: InvestmentSimulationParams = {
      valorInicial: 10000,
      aporteMensal: 500,
      taxaJuros: 1,
      prazo: 12,
    };

    const evolution = calculateMonthlyEvolution(params);

    for (let i = 1; i < evolution.length; i++) {
      expect(evolution[i].aporteRealizado).toBe(500);
    }
  });

  it('should have increasing accumulated amounts', () => {
    const params: InvestmentSimulationParams = {
      valorInicial: 10000,
      aporteMensal: 500,
      taxaJuros: 1,
      prazo: 12,
    };

    const evolution = calculateMonthlyEvolution(params);

    for (let i = 1; i < evolution.length; i++) {
      expect(evolution[i].montanteAcumulado).toBeGreaterThan(evolution[i - 1].montanteAcumulado);
    }
  });

  it('should round all values to two decimal places', () => {
    const params: InvestmentSimulationParams = {
      valorInicial: 10000.123,
      aporteMensal: 500.456,
      taxaJuros: 1.234,
      prazo: 12,
    };

    const evolution = calculateMonthlyEvolution(params);

    evolution.forEach((item) => {
      expect(item.aporteRealizado.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
      expect(item.jurosDoMes.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
      expect(item.montanteAcumulado.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
    });
  });

  it('should handle long periods efficiently', () => {
    const params: InvestmentSimulationParams = {
      valorInicial: 10000,
      aporteMensal: 500,
      taxaJuros: 1,
      prazo: 600,
    };

    const startTime = Date.now();
    const evolution = calculateMonthlyEvolution(params);
    const endTime = Date.now();

    expect(evolution).toHaveLength(600);
    expect(endTime - startTime).toBeLessThan(2000);
  });
});

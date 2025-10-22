/**
 * @utility formatCurrency
 * @summary Formats a number as Brazilian currency (BRL)
 * @domain core
 * @type utility-function
 * @category formatting
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * @utility parseCurrency
 * @summary Parses a Brazilian currency string to number
 * @domain core
 * @type utility-function
 * @category formatting
 */
export const parseCurrency = (value: string): number => {
  const cleanValue = value.replace(/[^0-9,-]/g, '').replace(',', '.');
  return parseFloat(cleanValue) || 0;
};

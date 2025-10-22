/**
 * @utility formatNumber
 * @summary Formats a number with Brazilian locale
 * @domain core
 * @type utility-function
 * @category formatting
 */
export const formatNumber = (value: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

/**
 * @utility formatPercentage
 * @summary Formats a number as percentage
 * @domain core
 * @type utility-function
 * @category formatting
 */
export const formatPercentage = (value: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
};

/**
 * @utility isPositiveNumber
 * @summary Validates if a value is a positive number
 * @domain core
 * @type utility-function
 * @category validation
 */
export const isPositiveNumber = (value: number): boolean => {
  return typeof value === 'number' && !isNaN(value) && value > 0;
};

/**
 * @utility isNonNegativeNumber
 * @summary Validates if a value is a non-negative number
 * @domain core
 * @type utility-function
 * @category validation
 */
export const isNonNegativeNumber = (value: number): boolean => {
  return typeof value === 'number' && !isNaN(value) && value >= 0;
};

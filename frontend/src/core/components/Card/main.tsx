import { getCardClassName } from './variants';
import type { CardProps } from './types';

/**
 * @component Card
 * @summary Card container component for content grouping
 * @domain core
 * @type ui-component
 * @category display
 */
export const Card = ({ children, variant = 'default', padding = 'md', className }: CardProps) => {
  return <div className={getCardClassName({ variant, padding, className })}>{children}</div>;
};

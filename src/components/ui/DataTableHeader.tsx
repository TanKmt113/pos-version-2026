/**
 * DataTableHeader Component
 * Generic page header cho DataTable pages
 */

import { ReactNode } from 'react';

export interface DataTableHeaderProps {
  /** Page title */
  title: string;
  /** Page description */
  description?: string;
  /** Action buttons */
  actions?: ReactNode;
  /** Custom className */
  className?: string;
}

/**
 * Generic DataTable Header Component
 */
export function DataTableHeader({
  title,
  description,
  actions,
  className = '',
}: DataTableHeaderProps) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className}`}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}

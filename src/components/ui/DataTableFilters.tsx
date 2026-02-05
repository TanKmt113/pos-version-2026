/**
 * DataTableFilters Component
 * Generic filters component cho DataTable
 */

import { ReactNode } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Search } from 'lucide-react';

export interface DataTableFilterConfig {
  /** Placeholder cho search input */
  searchPlaceholder?: string;
  /** Custom filters (Select, DatePicker, etc.) */
  customFilters?: ReactNode;
  /** Actions buttons (Import, Export, Create, etc.) */
  actions?: ReactNode;
}

export interface DataTableFiltersProps {
  /** Search value */
  searchValue?: string;
  /** On search change */
  onSearchChange?: (value: string) => void;
  /** Filter configuration */
  config?: DataTableFilterConfig;
  /** Custom className */
  className?: string;
}

/**
 * Generic DataTable Filters Component
 */
export function DataTableFilters({
  searchValue = '',
  onSearchChange,
  config = {},
  className = '',
}: DataTableFiltersProps) {
  const {
    searchPlaceholder = 'Tìm kiếm...',
    customFilters,
    actions,
  } = config;

  return (
    <div className={`flex flex-col gap-4 rounded-lg border bg-card p-4 sm:flex-row sm:items-center ${className}`}>
      {/* Search Input */}
      {onSearchChange && (
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-9"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      )}

      {/* Custom Filters */}
      {customFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {customFilters}
        </div>
      )}

      {/* Actions */}
      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}

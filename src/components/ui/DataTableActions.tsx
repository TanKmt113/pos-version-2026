/**
 * DataTableActions Component
 * Generic actions dropdown cho DataTable rows
 */

import { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu';
import { MoreHorizontal, Pencil, Trash, Eye } from 'lucide-react';

export interface DataTableAction<T> {
  /** Label hiển thị */
  label: string;
  /** Icon (optional) */
  icon?: ReactNode;
  /** Click handler */
  onClick: (row: T) => void;
  /** Variant style */
  variant?: 'default' | 'destructive';
  /** Show separator sau action này */
  separator?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

export interface DataTableActionsProps<T> {
  /** Row data */
  row: T;
  /** Array of actions */
  actions: DataTableAction<T>[];
  /** Custom trigger button */
  trigger?: ReactNode;
}

/**
 * Generic DataTable Actions Dropdown
 */
export function DataTableActions<T>({
  row,
  actions,
  trigger,
}: DataTableActionsProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, index) => (
          <div key={index}>
            <DropdownMenuItem
              onClick={() => action.onClick(row)}
              className={action.variant === 'destructive' ? 'text-destructive' : ''}
              disabled={action.disabled}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </DropdownMenuItem>
            {action.separator && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Helper function để tạo default actions (View, Edit, Delete)
 */
export function createDefaultActions<T>({
  onView,
  onEdit,
  onDelete,
  showView = false,
  showEdit = true,
  showDelete = true,
}: {
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
}): DataTableAction<T>[] {
  const actions: DataTableAction<T>[] = [];

  if (showView && onView) {
    actions.push({
      label: 'Xem chi tiết',
      icon: <Eye className="h-4 w-4" />,
      onClick: onView,
    });
  }

  if (showEdit && onEdit) {
    actions.push({
      label: 'Chỉnh sửa',
      icon: <Pencil className="h-4 w-4" />,
      onClick: onEdit,
    });
  }

  if (showDelete && onDelete) {
    actions.push({
      label: 'Xóa',
      icon: <Trash className="h-4 w-4" />,
      onClick: onDelete,
      variant: 'destructive',
      separator: actions.length > 0,
    });
  }

  return actions;
}

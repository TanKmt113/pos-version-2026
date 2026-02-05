/**
 * Generic DataTable Component
 * Component bảng dữ liệu có thể tái sử dụng cho mọi màn hình
 * 
 * Features:
 * - Generic types
 * - Column configuration
 * - Selection (checkbox)
 * - Pagination
 * - Loading state
 * - Empty state
 * - Custom actions
 */

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { DataTableProps } from '@/shared/types/dataTable';

/**
 * Generic DataTable Component
 */
export function DataTable<T>({
  data,
  columns,
  loading = false,
  emptyMessage = 'Không có dữ liệu',
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  getRowKey,
  renderActions,
  pagination,
  className = '',
  onRowClick,
}: DataTableProps<T>) {
  const [selectAll, setSelectAll] = useState(false);

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (onSelectionChange) {
      onSelectionChange(checked ? data : []);
    }
  };

  // Handle select row
  const handleSelectRow = (row: T, checked: boolean) => {
    if (!onSelectionChange) return;

    if (checked) {
      onSelectionChange([...selectedRows, row]);
    } else {
      onSelectionChange(selectedRows.filter(r => getRowKey(r) !== getRowKey(row)));
    }
  };

  // Check if row is selected
  const isRowSelected = (row: T) => {
    return selectedRows.some(r => getRowKey(r) === getRowKey(row));
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Table */}
      <div className={`rounded-md border transition-opacity duration-200 ${loading ? 'opacity-60' : 'opacity-100'}`}>
        <Table>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectAll}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={column.width}
                  style={{ textAlign: column.align || 'left' }}
                >
                  {column.header}
                </TableHead>
              ))}
              {renderActions && (
                <TableHead className="w-[100px] text-right">
                  Thao tác
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // Skeleton loading state
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {selectable && (
                    <TableCell>
                      <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      <div className="h-4 bg-muted animate-pulse rounded" />
                    </TableCell>
                  ))}
                  {renderActions && (
                    <TableCell>
                      <div className="h-8 w-8 bg-muted animate-pulse rounded ml-auto" />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0) + (renderActions ? 1 : 0)}
                  className="text-center py-8 text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow
                  key={getRowKey(row)}
                  className={onRowClick ? 'cursor-pointer hover:bg-muted/50' : ''}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && (
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={isRowSelected(row)}
                        onCheckedChange={(checked) => handleSelectRow(row, checked as boolean)}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      style={{ textAlign: column.align || 'left' }}
                    >
                      {column.render
                        ? column.render(row, index)
                        : column.accessor
                        ? column.accessor(row)
                        : null}
                    </TableCell>
                  ))}
                  {renderActions && (
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      {renderActions(row, index)}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Hiển thị {(pagination.pageIndex - 1) * pagination.pageSize + 1} -{' '}
            {Math.min(pagination.pageIndex * pagination.pageSize, pagination.totalCount)} trong tổng số{' '}
            {pagination.totalCount} bản ghi
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.pageIndex - 1)}
              disabled={!pagination.hasPreviousPage}
            >
              <ChevronLeft className="h-4 w-4" />
              Trước
            </Button>
            <div className="text-sm">
              Trang {pagination.pageIndex} / {pagination.totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.pageIndex + 1)}
              disabled={!pagination.hasNextPage}
            >
              Sau
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

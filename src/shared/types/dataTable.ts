/**
 * DataTable Types
 * Shared types cho DataTable component
 */

/**
 * Column definition cho DataTable
 */
export interface DataTableColumn<T> {
  /** Unique key cho column */
  key: string;
  /** Header text */
  header: string;
  /** Width của column (optional) */
  width?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Custom render function */
  render?: (row: T, index: number) => React.ReactNode;
  /** Accessor function để lấy giá trị từ row */
  accessor?: (row: T) => any;
  /** Có sortable không */
  sortable?: boolean;
}

/**
 * Pagination props
 */
export interface DataTablePagination {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
}

/**
 * DataTable Props
 */
export interface DataTableProps<T> {
  /** Array data để hiển thị */
  data: T[];
  /** Column definitions */
  columns: DataTableColumn<T>[];
  /** Loading state */
  loading?: boolean;
  /** Empty message */
  emptyMessage?: string;
  /** Enable selection (checkbox) */
  selectable?: boolean;
  /** Selected rows */
  selectedRows?: T[];
  /** On selection change */
  onSelectionChange?: (rows: T[]) => void;
  /** Row key extractor */
  getRowKey: (row: T) => string | number;
  /** Custom actions render */
  renderActions?: (row: T, index: number) => React.ReactNode;
  /** Pagination */
  pagination?: DataTablePagination;
  /** Custom className */
  className?: string;
  /** On row click */
  onRowClick?: (row: T) => void;
}

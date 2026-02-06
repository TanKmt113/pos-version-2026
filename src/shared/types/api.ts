// Cấu trúc chung cho mọi Response từ API
export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

/**
 * Cấu trúc Paged Result từ API
 * Dùng cho các endpoint có phân trang
 */
export interface PagedResult<T> {
  items: T[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
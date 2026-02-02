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
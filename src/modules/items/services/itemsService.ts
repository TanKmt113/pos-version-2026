import { BaseService } from '@/shared/base/baseService';
import { IProduct, ItemDetail, ItemDetailResponse } from "../types";
import { QueryOptionsBuilder } from '@/shared/utils/queryOptionsBuilder';
import { PagedResult } from '@/shared/types/api';
import { ApiError } from '@/infrastructure/api-clients/httpClient';
class ItemService extends BaseService {
  private readonly baseUrl = '/Items';
  async getAll(
    pageIndex: number = 1,
    pageSize: number = 20,
    filters?: {
      searchTerm?: string;
      isActive?: boolean | string;
    }
  ): Promise<PagedResult<IProduct>> {
    try {
      const queryBuilder = QueryOptionsBuilder.create()
        .paginate(pageIndex, pageSize)
        .orderBy('createdAt', 'desc');

      // Apply filters
      if (filters) {
        queryBuilder.filter(f => {
          let filterBuilder = f;
          let hasCondition = false;

          // Status filter
          if (filters.isActive !== undefined && filters.isActive !== 'all') {
            if (hasCondition) filterBuilder = filterBuilder.and();
            const isActiveValue = filters.isActive === 'active' || filters.isActive === true;
            filterBuilder = filterBuilder.equals('isActive', isActiveValue);
          }

          return filterBuilder;
        });
      }

      const queryString = queryBuilder.buildQueryString();
      const url = queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;

      const response = await this.http.get<PagedResult<IProduct>>(url);
      return response.data;
    } catch (error) {
      if (this.isApiError(error)) {
        if (error.status >= 500) {
          throw new ApiError(
            error.status,
            'Không thể tải danh sách đơn vị tính. Vui lòng thử lại sau.',
            error.errors,
            'SERVER_ERROR'
          );
        }
      }
      this.logError(error, 'UomService.getAll');
      throw error;
    }
  }

  async getById(id: string): Promise<ItemDetail> {
    try {
      const url = `${this.baseUrl}/${id}`;
      const response = await this.http.get<ItemDetail>(url);
      return response.data;
    } catch (error) {
      this.logError(error, 'ItemService.getById');
      throw error;
    }
  }

  async create(data: Partial<IProduct>): Promise<void> {
    try {
      await this.http.post(this.baseUrl, data);
    } catch (error) {
      this.logError(error, 'ItemService.create');
      throw error;
    }
  }

  async update(id: string, data: Partial<IProduct>): Promise<void> {
    try {
      await this.http.put(`${this.baseUrl}/${id}`, data);
    } catch (error) {
      this.logError(error, 'ItemService.update');
      throw error;
    }
  }
}

export const itemService = new ItemService();
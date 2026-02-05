/**
 * Unit of Measure Service
 * Xử lý business logic cho đơn vị tính
 */
import { BaseService } from '@/shared/base/baseService';
import { UnitOfMeasures, CreateUnitOfMeasureDto, UpdateUnitOfMeasureDto } from '../types';
import { ApiError } from '@/infrastructure/api-clients/httpClient';
import { PagedResult } from '@/shared/types/api';

class UomService extends BaseService {
  private readonly baseUrl = '/UnitOfMeasures';

  /**
   * Lấy danh sách đơn vị tính với phân trang
   */
  async getAll(pageIndex: number = 1, pageSize: number = 20): Promise<PagedResult<UnitOfMeasures>> {
    try {
      const response = await this.http.get<PagedResult<UnitOfMeasures>>(
        `${this.baseUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      return response.data; // Trả về full PagedResult với items + thông tin phân trang
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

  /**
   * Lấy tất cả items (không phân trang) - dùng cho dropdown/select
   */
  async getAllItems(): Promise<UnitOfMeasures[]> {
    try {
      const response = await this.http.get<PagedResult<UnitOfMeasures>>(
        `${this.baseUrl}?pageSize=1000` // Lấy max items
      );
      return response.data.items;
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
      this.logError(error, 'UomService.getAllItems');
      throw error;
    }
  }

  /**
   * Lấy đơn vị tính theo ID
   */
  async getById(id: string): Promise<UnitOfMeasures> {
    try {
      const response = await this.http.get<UnitOfMeasures>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      if (this.isApiError(error)) {
        if (error.status === 404) {
          throw new ApiError(
            404,
            'Đơn vị tính không tồn tại.',
            error.errors,
            'NOT_FOUND'
          );
        }
      }
      this.logError(error, 'UomService.getById');
      throw error;
    }
  }

  /**
   * Tạo đơn vị tính mới
   */
  async create(data: CreateUnitOfMeasureDto): Promise<UnitOfMeasures> {
    try {
      const response = await this.http.post<UnitOfMeasures>(this.baseUrl, data);
      this.logActivity(`Đã tạo đơn vị tính: ${response.data.uomName}`);
      return response.data;
    } catch (error) {
      if (this.isApiError(error)) {
        if (error.status === 400) {
          throw new ApiError(
            400,
            'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.',
            error.errors,
            'VALIDATION_ERROR'
          );
        }
        if (error.status === 409) {
          throw new ApiError(
            409,
            'Đơn vị tính đã tồn tại.',
            error.errors,
            'DUPLICATE_ERROR'
          );
        }
      }
      this.logError(error, 'UomService.create');
      throw error;
    }
  }

  /**
   * Cập nhật đơn vị tính
   */
  async update(id: string, data: UpdateUnitOfMeasureDto): Promise<UnitOfMeasures> {
    try {
      const response = await this.http.put<UnitOfMeasures>(`${this.baseUrl}/${id}`, data);
      this.logActivity(`Đã cập nhật đơn vị tính: ${id}`);
      return response.data;
    } catch (error) {
      if (this.isApiError(error)) {
        if (error.status === 404) {
          throw new ApiError(
            404,
            'Không tìm thấy đơn vị tính.',
            error.errors,
            'NOT_FOUND'
          );
        }
        if (error.status === 400) {
          throw new ApiError(
            400,
            'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.',
            error.errors,
            'VALIDATION_ERROR'
          );
        }
      }
      this.logError(error, 'UomService.update');
      throw error;
    }
  }

  /**
   * Xóa đơn vị tính
   */
  async delete(id: string): Promise<void> {
    try {
      await this.http.delete(`${this.baseUrl}/${id}`);
      this.logActivity(`Đã xóa đơn vị tính: ${id}`);
    } catch (error) {
      if (this.isApiError(error)) {
        if (error.status === 404) {
          throw new ApiError(
            404,
            'Không tìm thấy đơn vị tính.',
            error.errors,
            'NOT_FOUND'
          );
        }
        if (error.status === 409) {
          throw new ApiError(
            409,
            'Không thể xóa đơn vị tính đang được sử dụng.',
            error.errors,
            'CONFLICT_ERROR'
          );
        }
      }
      this.logError(error, 'UomService.delete');
      throw error;
    }
  }
}

export const uomService = new UomService();
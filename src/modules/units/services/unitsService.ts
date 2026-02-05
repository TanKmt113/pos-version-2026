// Unit of Measure services
import { BaseService } from '@/shared/base/baseService';
import { uomApi } from '../api';
import { UnitOfMeasures } from '../types';

class UomService extends BaseService {
  async getAll(): Promise<UnitOfMeasures[]> {
    try {
      this.logActivity('Đang tải danh sách đơn vị tính...');
      const { data } = await uomApi.get();
      return data;
    } catch (error: any) {
      if (error.status === 500) {
        error.message = 'Không thể tải danh sách đơn vị tính, vui lòng thử lại sau.';
      }

      throw error;
    }
  }
}

export const uomService = new UomService();
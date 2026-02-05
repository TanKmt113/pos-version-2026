import { BaseService } from '@/shared/base/baseService';
import { IItemRequest } from "../types";
import { itemApi } from '../api';
class ItemService extends BaseService {
  async items(params: IItemRequest) {
    try {
      this.logActivity('Người dùng đang gọi api items...');
      const { data } = await itemApi.getItems(params); 
      return data;
    } catch (error: any) {
      error.message = 'Hệ thống đang xảy ra sự cố. Vui lòng thử lại sau.';
      throw error;
    }
  }
}

export const itemService = new ItemService();
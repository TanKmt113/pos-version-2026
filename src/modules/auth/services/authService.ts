import { BaseService } from '@/shared/base/baseService';
import { authApi } from '../api';
import { ILoginRequest } from '../types';
import { BusinessError } from '@/shared/utils/errors';
import { authStorage } from '@/infrastructure/storage/authStorage';

class AuthService extends BaseService {
  async login(credentials: ILoginRequest) {
    try {
      this.logActivity('Người dùng đang đăng nhập...');
      const { data } = await authApi.login(credentials);

      if (data.accessToken) {
        authStorage.saveToken(
          data.accessToken,
          data.refreshToken
        );
      }
      return data;
    } catch (error: any) {
      // --- ĐỊNH NGHĨA LỖI TẦNG 2 Ở ĐÂY ---

      // Ví dụ 1: Map lại message cho thân thiện hơn dựa trên code từ Server
      if (error.code === 'INVALID_CREDENTIALS') {
        error.message = 'Email hoặc mật khẩu không chính xác, vui lòng kiểm tra lại.';
      }

      // Ví dụ 2: Xử lý lỗi kết nối mạng (Level 1 báo lên) thành thông điệp nghiệp vụ
      if (error.status === 500) {
        error.message = 'Hệ thống đăng nhập đang bảo trì, bạn vui lòng quay lại sau 5 phút.';
      }

      // Cuối cùng luôn throw lỗi đã được "làm sạch" để UI (Level 3) sử dụng
      throw error;
    }
  }
}

export const authService = new AuthService();
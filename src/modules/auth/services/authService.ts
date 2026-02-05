import { BaseService } from '@/shared/base/baseService';
import { ILoginRequest, ILoginResponse, IUserProfile } from '../types';
import { authStorage } from '@/infrastructure/storage/authStorage';
import { ApiError } from '@/infrastructure/api-clients/httpClient';

/**
 * Auth Service - Xử lý business logic cho authentication
 * Gọi trực tiếp httpClient (this.http) thay vì qua API layer
 */
class AuthService extends BaseService {
  private readonly baseUrl = '/auth';

  /**
   * Đăng nhập
   */
  async login(credentials: ILoginRequest): Promise<ILoginResponse> {
    try {
      this.logActivity('Người dùng đang đăng nhập...');
      
      // Gọi trực tiếp httpClient (đã unwrap từ ApiResponse.value)
      const response = await this.http.post<ILoginResponse>(
        `${this.baseUrl}/login`,
        credentials
      );
      const data = response.data;

      // Lưu tokens vào storage
      if (data.accessToken) {
        authStorage.saveToken(data.accessToken, data.refreshToken);
        this.logActivity(`Đăng nhập thành công: ${data.user.email}`);
      }

      return data;
    } catch (error) {
      // Xử lý lỗi và map thành message thân thiện hơn
      if (this.isApiError(error)) {
        // Map error codes thành messages cụ thể
        if (error.status === 401) {
          throw new ApiError(
            401,
            'Email hoặc mật khẩu không chính xác',
            error.errors,
            'INVALID_CREDENTIALS'
          );
        }

        if (error.status === 429) {
          throw new ApiError(
            429,
            'Bạn đã thử đăng nhập quá nhiều lần. Vui lòng thử lại sau 5 phút.',
            error.errors,
            'TOO_MANY_ATTEMPTS'
          );
        }

        if (error.status >= 500) {
          throw new ApiError(
            error.status,
            'Hệ thống đăng nhập đang bảo trì. Vui lòng thử lại sau.',
            error.errors,
            'SERVER_ERROR'
          );
        }
      }

      this.logError(error, 'AuthService.login');
      throw error;
    }
  }

  /**
   * Đăng xuất
   */
  async logout(): Promise<void> {
    try {
      await this.http.post(`${this.baseUrl}/logout`);
      authStorage.clearToken();
      this.logActivity('Người dùng đã đăng xuất');
    } catch (error) {
      // Vẫn clear token local dù API fail
      authStorage.clearToken();
      this.logError(error, 'AuthService.logout');
    }
  }

  /**
   * Lấy thông tin profile
   */
  async getProfile(): Promise<IUserProfile | null> {
    return this.handleApiCall(
      async () => {
        const response = await this.http.get<IUserProfile>(`${this.baseUrl}/profile`);
        return response.data;
      },
      {
        defaultValue: null,
        logError: true,
      }
    ) as Promise<IUserProfile | null>;
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<boolean> {
    try {
      const currentRefreshToken = authStorage.getRefreshToken();
      if (!currentRefreshToken) {
        return false;
      }

      const response = await this.http.post<{ accessToken: string; refreshToken: string }>(
        `${this.baseUrl}/refresh`,
        { refreshToken: currentRefreshToken }
      );
      const tokens = response.data;

      authStorage.saveToken(tokens.accessToken, tokens.refreshToken);
      this.logActivity('Token đã được refresh');
      return true;
    } catch (error) {
      this.logError(error, 'AuthService.refreshToken');
      authStorage.clearToken();
      return false;
    }
  }

  /**
   * Đổi mật khẩu
   */
  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    try {
      await this.http.post(`${this.baseUrl}/change-password`, {
        oldPassword,
        newPassword
      });
      this.logActivity('Mật khẩu đã được thay đổi');
    } catch (error) {
      if (this.isApiError(error)) {
        if (error.status === 401) {
          throw new ApiError(
            401,
            'Mật khẩu cũ không chính xác',
            error.errors,
            'INVALID_OLD_PASSWORD'
          );
        }
      }
      this.logError(error, 'AuthService.changePassword');
      throw error;
    }
  }

  /**
   * Kiểm tra user đã đăng nhập chưa
   */
  isAuthenticated(): boolean {
    return authStorage.hasToken();
  }

  /**
   * Lấy access token hiện tại
   */
  getAccessToken(): string | null {
    return authStorage.getAccessToken();
  }
}

export const authService = new AuthService();
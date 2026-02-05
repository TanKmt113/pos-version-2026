import { useState } from 'react';
import { authService } from '../services/authService';
import { toast } from 'sonner';
import { getErrorMessage } from '@/infrastructure/api-clients/apiHelpers';

interface UseLogoutReturn {
  logout: () => Promise<void>;
  isLoading: boolean;
}

/**
 * Hook để xử lý đăng xuất
 */
export const useLogout = (): UseLogoutReturn => {
  const [isLoading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      toast.success('Đã đăng xuất thành công');
      
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return { logout, isLoading };
};

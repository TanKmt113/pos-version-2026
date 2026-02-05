import { useState } from 'react';
import { authService } from '../services/authService';
import { toast } from 'sonner';
import { getErrorMessage, getAllErrorMessages } from '@/infrastructure/api-clients/apiHelpers';
import { ApiError } from '@/infrastructure/api-clients/httpClient';

interface UseChangePasswordReturn {
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook để đổi mật khẩu
 */
export const useChangePassword = (): UseChangePasswordReturn => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changePassword = async (
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await authService.changePassword(oldPassword, newPassword);
      toast.success('Đổi mật khẩu thành công');
      return true;
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);

      // Hiển thị error toast
      if (err instanceof ApiError) {
        toast.error(err.error);
        
        // Hiển thị validation errors nếu có
        if (err.errors && err.errors.length > 0) {
          err.errors.forEach(errMsg => {
            toast.error(errMsg);
          });
        }
      } else {
        toast.error(errorMessage);
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, isLoading, error };
};

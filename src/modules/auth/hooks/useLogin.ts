import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/authService';
import { ILoginRequest } from '../types';
import { toast } from 'sonner';

export const useLogin = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (data: ILoginRequest) => {
    setLoading(true);
    try {
      const response = await authService.login(data);
      toast.success('Chào mừng bạn quay trở lại!');
      // Xử lý thành công
      router.push('/dashboard');
      return response;
    } catch (error: any) {
      // TẦNG 3 TIÊU THỤ LỖI TẠI ĐÂY
      toast.error(error.message); // Hiển thị lỗi từ Level 2
      return { error: error.errors };
    } finally {
      setLoading(false);
    }
  };

  return { login, isLoading };
};
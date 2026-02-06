import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * Hook để kiểm tra trạng thái authentication
 */
export const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setLoading(false);
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isLoading };
};

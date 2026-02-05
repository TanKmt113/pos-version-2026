import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { IUserProfile } from '../types';
import { getErrorMessage } from '@/infrastructure/api-clients/apiHelpers';

interface UseProfileReturn {
  profile: IUserProfile | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * Hook để lấy thông tin profile user hiện tại
 */
export const useProfile = (): UseProfileReturn => {
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await authService.getProfile();
      setProfile(data);
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authService.isAuthenticated()) {
      loadProfile();
    } else {
      setLoading(false);
    }
  }, []);

  return {
    profile,
    isLoading,
    error,
    refresh: loadProfile,
  };
};

/**
 * useDeleteUnit Hook
 * Hook xóa unit
 * Level 3 Error Handling - UI State Management
 */

import { useState } from 'react';
import { uomService } from '../services/unitsService';

export interface UseDeleteUnitReturn {
  deleteUnit: (id: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useDeleteUnit(): UseDeleteUnitReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUnit = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      await uomService.delete(id);
      return true;
    } catch (err: any) {
      const errorMessage = err?.error || err?.message || 'Không thể xóa đơn vị tính';
      setError(errorMessage);
      console.error('useDeleteUnit error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    deleteUnit,
    loading,
    error,
    clearError,
  };
}

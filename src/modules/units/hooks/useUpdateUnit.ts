/**
 * useUpdateUnit Hook
 * Hook cập nhật unit
 * Level 3 Error Handling - UI State Management
 */

import { useState } from 'react';
import { uomService } from '../services/unitsService';
import { UpdateUnitOfMeasureDto, UnitOfMeasures } from '../types';

export interface UseUpdateUnitReturn {
  update: (id: string, data: UpdateUnitOfMeasureDto) => Promise<UnitOfMeasures | null>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useUpdateUnit(): UseUpdateUnitReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (
    id: string,
    data: UpdateUnitOfMeasureDto
  ): Promise<UnitOfMeasures | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await uomService.update(id, data);
      return result;
    } catch (err: any) {
      const errorMessage = err?.error || err?.message || 'Không thể cập nhật đơn vị tính';
      setError(errorMessage);
      console.error('useUpdateUnit error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    update,
    loading,
    error,
    clearError,
  };
}

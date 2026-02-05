/**
 * useCreateUnit Hook
 * Hook tạo mới unit
 * Level 3 Error Handling - UI State Management
 */

import { useState } from 'react';
import { uomService } from '../services/unitsService';
import { CreateUnitOfMeasureDto, UnitOfMeasures } from '../types';

export interface UseCreateUnitReturn {
  create: (data: CreateUnitOfMeasureDto) => Promise<UnitOfMeasures | null>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useCreateUnit(): UseCreateUnitReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: CreateUnitOfMeasureDto): Promise<UnitOfMeasures | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await uomService.create(data);
      return result;
    } catch (err: any) {
      const errorMessage = err?.error || err?.message || 'Không thể tạo đơn vị tính';
      setError(errorMessage);
      console.error('useCreateUnit error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    create,
    loading,
    error,
    clearError,
  };
}

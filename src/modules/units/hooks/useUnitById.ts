/**
 * useUnitById Hook
 * Hook lấy thông tin chi tiết một unit theo ID
 * Level 3 Error Handling - UI State Management
 */

import { useState, useEffect } from 'react';
import { uomService } from '../services/unitsService';
import { UnitOfMeasures } from '../types';

export interface UseUnitByIdReturn {
  data: UnitOfMeasures | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useUnitById(id: string | null): UseUnitByIdReturn {
  const [data, setData] = useState<UnitOfMeasures | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await uomService.getById(id);
      setData(result);
    } catch (err: any) {
      const errorMessage = err?.error || err?.message || 'Không thể tải thông tin đơn vị tính';
      setError(errorMessage);
      console.error('useUnitById error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

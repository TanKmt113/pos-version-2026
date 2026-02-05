/**
 * useUnits Hook
 * Hook quản lý danh sách units với pagination và filters
 * Level 3 Error Handling - UI State Management
 */

import { useState, useEffect } from 'react';
import { uomService } from '../services/unitsService';
import { UnitOfMeasures } from '../types';
import { PagedResult } from '@/shared/types/api';

export interface UseUnitsParams {
  pageIndex?: number;
  pageSize?: number;
  searchTerm?: string;
  isActive?: boolean | string;
  autoLoad?: boolean;
}

export interface UseUnitsReturn {
  data: PagedResult<UnitOfMeasures> | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  setPage: (page: number) => void;
  currentPage: number;
}

export function useUnits({
  pageIndex = 1,
  pageSize = 20,
  searchTerm = '',
  isActive,
  autoLoad = true,
}: UseUnitsParams = {}): UseUnitsReturn {
  const [data, setData] = useState<PagedResult<UnitOfMeasures> | null>(null);
  const [loading, setLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(pageIndex);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await uomService.getAll(currentPage, pageSize, {
        searchTerm,
        isActive,
      });
      setData(result);
    } catch (err: any) {
      const errorMessage = err?.error || err?.message || 'Không thể tải danh sách đơn vị tính';
      setError(errorMessage);
      console.error('useUnits error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoLoad) {
      fetchData();
    }
  }, [currentPage, searchTerm, isActive]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    setPage: setCurrentPage,
    currentPage,
  };
}

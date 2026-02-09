import { useState, useEffect } from 'react';
import { itemService } from '../services/itemsService';
import { IItemRequest, IProduct } from '../types';
import { toast } from 'sonner';
import { PagedResult } from '@/shared/types/api';
export interface UseItemsParams {
  pageIndex?: number;
  pageSize?: number;
  searchTerm?: string;
  isActive?: boolean | string;
  autoLoad?: boolean;
}

export interface UseItemsReturn {
  data: PagedResult<IProduct> | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  setPage: (page: number) => void;
  currentPage: number;
}

export function useItems({
  pageIndex = 1,
  pageSize = 20,
  searchTerm = '',
  isActive,
  autoLoad = true,
}: UseItemsParams = {}): UseItemsReturn { 
  const [data, setData] = useState<PagedResult<IProduct> | null>(null);
  const [loading, setLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(pageIndex);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {

      const result = await itemService.getAll(currentPage, pageSize, {
        searchTerm,
        isActive,
      });
      setData(result);
    } catch (err: any) {
      const errorMessage = err?.error || err?.message || 'Không thể tải danh sách sản phẩm';
      setError(errorMessage);
      console.error('useItems error:', err);
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
};
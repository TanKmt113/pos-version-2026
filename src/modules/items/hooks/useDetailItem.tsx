/**
 * useUnitById Hook
 * Hook lấy thông tin chi tiết một unit theo ID
 * Level 3 Error Handling - UI State Management
 */

import { useState, useEffect } from 'react';
import { itemService } from '../services/itemsService';
import { ItemDetail } from '../types';

export interface UseItemByIdReturn {
  data: ItemDetail | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useItemById(id: string | null): UseItemByIdReturn {
  const [data, setData] = useState<ItemDetail | null>(null);
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
      const result = await itemService.getById(id);
      setData(result);
    } catch (err: any) {
      const errorMessage = err?.error || err?.message || 'Không thể tải thông tin mặt hàng';
      setError(errorMessage);
      console.error('useItemById error:', err);
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

/**
 * useCreateUnit Hook
 * Hook tạo mới unit
 * Level 3 Error Handling - UI State Management
 */

import { useState } from "react";
import { itemService } from "../services/itemsService";
import { IItemFormData } from "../types";

export interface UseCreateItemReturn {
  create: (data: IItemFormData) => Promise<IItemFormData | null>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useCreateItem(): UseCreateItemReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: IItemFormData): Promise<IItemFormData | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await itemService.create(data);
      return result;
    } catch (err: any) {
      const errorMessage =
        err?.error || err?.message || "Không thể tạo sản phẩm";
      setError(errorMessage);
      console.error("useCreateItem error:", err);
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

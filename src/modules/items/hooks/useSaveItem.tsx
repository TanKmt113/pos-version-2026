/**
 * useSaveItem Hook
 * Hook xử lý việc tạo mới hoặc cập nhật sản phẩm
 */

import { useState } from "react";
import { itemService } from "../services/itemsService";
import { IItemFormData } from "../types"; // Using IItemFormData as a placeholder, will be stricter later

export interface UseSaveItemReturn {
  save: (
    id: string | null,
    data: IItemFormData,
  ) => Promise<IItemFormData | null>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useSaveItem(): UseSaveItemReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async (
    id: string | null,
    data: IItemFormData,
  ): Promise<IItemFormData | null> => {
    setLoading(true);
    setError(null);

    try {
      if (id) {
        await itemService.update(id, data as any); // Cast to any due to IItemFormData not fully matching ItemDetail
      } else {
        await itemService.create(data as any); // Cast to any
      }
      return data; // Return the saved data (or a confirmation)
    } catch (err: any) {
      const errorMessage =
        err?.error || err?.message || "Không thể lưu sản phẩm";
      setError(errorMessage);
      console.error("useSaveItem error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    save,
    loading,
    error,
    clearError,
  };
}
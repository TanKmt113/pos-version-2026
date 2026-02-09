import { useEffect, useState } from "react";

export interface useUnitsGroupParams {
  pageIndex?: number;
  pageSize?: number;
  searchTerm?: string;
  isActive?: boolean | string;
  autoLoad?: boolean;
}
export interface useUnitsGroupReturn {
  data: [] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  setPage: (page: number) => void;
  currentPage: number
}
export  function useUnitsGroup({ pageIndex = 1, pageSize = 20, searchTerm = '', isActive, autoLoad = true }: useUnitsGroupParams): useUnitsGroupReturn {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(pageIndex)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
  }
  try {
    // api
  } catch (err: any) {
    const errorMessage = err?.error || err?.message || 'Không thể tải danh sách đơn vị tính';
      setError(errorMessage);
      console.error('useUnits error:', err);
  } finally {
    setLoading(false)
  }
  useEffect(() => {
    if (autoLoad) {
      fetchData()
    }
  }, [currentPage, searchTerm, isActive])
  return {
    data, loading, error, refetch: fetchData, setPage: setCurrentPage, currentPage
  }
}
import { useState } from 'react';
import { toast } from 'sonner';
import { UnitOfMeasures } from '../types';
import { uomService } from '../services/unitsService';

export const useUom = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<UnitOfMeasures[]>([]);

  const getAll = async () => {
    setLoading(true);
    try {
      const response = await uomService.getAll();
      setData(response);
      return response;
    } catch (error: any) {
      toast.error(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { getAll, data, isLoading };
};
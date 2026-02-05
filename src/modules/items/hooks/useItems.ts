import { useState } from 'react'; 
import { itemService } from '../services/authItems';
import { IItemRequest } from '../types';
import { toast } from 'sonner';

export const useItems = () => {
  const [isLoading, setLoading] = useState(false);
  const getItems = async (data:IItemRequest) => {
    setLoading(true);
    try {
      const response = await itemService.items(data);
      toast.success('Gọi api thành công!');
      return response;
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { getItems, isLoading };
};
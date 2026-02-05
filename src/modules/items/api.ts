import httpClient from '@/infrastructure/api-clients/httpClient';
import { IItemRequest } from './types';

export const itemApi = {
   getItems: (params: IItemRequest) => httpClient.get('/api/pos-golden/v1/Items', { params }),
};
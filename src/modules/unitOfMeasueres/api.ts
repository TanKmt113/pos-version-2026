import httpClient from '@/infrastructure/api-clients/httpClient';
import { IUnitOfMeasuresApiRequest } from './types';

// Ví dụ sử dụng:
// const params: IUnitOfMeasuresApiRequest = {
//     $filter: "isActive eq true",
//     $orderby: "createdAt desc",
//     $select: "id,uomCode,uomName",
//     $skip: 0,
//     $top: 20,
// };
export const unitOfMeasuresApi = {
    getUnitOfMeasures: (data: IUnitOfMeasuresApiRequest) =>
        httpClient.get('/unit-of-measures', { params: data }),
};
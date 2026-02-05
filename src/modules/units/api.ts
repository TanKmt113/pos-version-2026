import httpClient from '@/infrastructure/api-clients/httpClient';
const BASE_URL = `UnitOfMeasures`
export const uomApi = {
  get: () =>
    httpClient.get(`${BASE_URL}`),
};
import httpClient from '@/infrastructure/api-clients/httpClient';
const BASE_URL = `UnitOfMeasures`
export const uomApi = {
  get: () =>
    httpClient.get(`${BASE_URL}`),
  create: () =>
    httpClient.post(`${BASE_URL}`),
  update: (id: string) =>
    httpClient.put(`${BASE_URL}/${id}`),
  delete: (id: string) =>
    httpClient.delete(`${BASE_URL}/${id}`)
};
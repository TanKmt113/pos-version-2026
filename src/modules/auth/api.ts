import httpClient from '@/infrastructure/api-clients/httpClient';
import { ILoginRequest, ILoginResponse } from './types';

export const authApi = {
  login: (data: ILoginRequest) => 
    httpClient.post<ILoginResponse>('/auth/login', data),
    
  getProfile: () => 
    httpClient.get('/auth/profile'),
};
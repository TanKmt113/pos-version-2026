import httpClient from '@/infrastructure/api-clients/httpClient';

export abstract class BaseService {
  protected http = httpClient;


  protected logActivity(message: string) {
    console.log(`[Activity Log]: ${message}`);
  }
}
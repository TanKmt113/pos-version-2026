import httpClient, { ApiResponse, ApiError } from '@/infrastructure/api-clients/httpClient';
import { 
  handleApiCall, 
  getErrorMessage, 
  getAllErrorMessages,
  isApiError 
} from '@/infrastructure/api-clients/apiHelpers';

/**
 * Base Service class cho tất cả các API services
 * Cung cấp các phương thức tiện ích để làm việc với API
 */
export abstract class BaseService {
  protected http = httpClient;

  /**
   * Log activity
   */
  protected logActivity(message: string) {
    console.log(`[Activity Log]: ${message}`);
  }

  /**
   * Handle API call với error handling
   */
  protected async handleApiCall<T>(
    apiCall: () => Promise<T>,
    options?: {
      defaultValue?: T;
      logError?: boolean;
      onError?: (error: ApiError) => void;
    }
  ): Promise<T | undefined> {
    return handleApiCall(apiCall, options);
  }

  /**
   * Get error message từ error
   */
  protected getErrorMessage(error: any): string {
    return getErrorMessage(error);
  }

  /**
   * Get tất cả error messages
   */
  protected getAllErrorMessages(error: any): string[] {
    return getAllErrorMessages(error);
  }

  /**
   * Check if error is ApiError
   */
  protected isApiError(error: any): error is ApiError {
    return isApiError(error);
  }

  /**
   * Log error
   */
  protected logError(error: any, context?: string) {
    const contextStr = context ? `[${context}]` : '';
    
    if (isApiError(error)) {
      console.error(`${contextStr} API Error:`, {
        status: error.status,
        error: error.error,
        errors: error.errors,
        code: error.code
      });
    } else {
      console.error(`${contextStr} Error:`, error);
    }
  }
}
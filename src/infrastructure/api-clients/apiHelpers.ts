/**
 * API Helper utilities
 * Các hàm tiện ích để làm việc với API Response
 */

import { ApiResponse, ApiError } from './httpClient';

/**
 * Type guard để kiểm tra response có phải là ApiResponse không
 */
export function isApiResponse<T>(data: any): data is ApiResponse<T> {
    return (
        data !== null &&
        typeof data === 'object' &&
        'isSuccess' in data &&
        'error' in data &&
        'errors' in data &&
        'value' in data
    );
}

/**
 * Unwrap value từ ApiResponse
 * Sử dụng khi bạn nhận raw response chưa qua interceptor
 */
export function unwrapApiResponse<T>(response: ApiResponse<T>): T {
    if (!response.isSuccess) {
        throw new ApiError(
            400,
            response.error || 'API Error',
            response.errors,
            'API_ERROR'
        );
    }

    if (response.value === null) {
        throw new ApiError(
            500,
            'API trả về success nhưng value là null',
            null,
            'NULL_VALUE'
        );
    }

    return response.value;
}

/**
 * Tạo ApiResponse thành công
 */
export function createSuccessResponse<T>(value: T): ApiResponse<T> {
    return {
        isSuccess: true,
        error: null,
        errors: null,
        value
    };
}

/**
 * Tạo ApiResponse lỗi
 */
export function createErrorResponse(
    error: string,
    errors: string[] | null = null
): ApiResponse<null> {
    return {
        isSuccess: false,
        error,
        errors,
        value: null
    };
}

/**
 * Handle API call với try-catch pattern
 * 
 * @example
 * ```ts
 * const result = await handleApiCall(
 *   () => apiService.getItems(),
 *   { defaultValue: [], logError: true }
 * );
 * ```
 */
export async function handleApiCall<T>(
    apiCall: () => Promise<T>,
    options?: {
        defaultValue?: T;
        logError?: boolean;
        onError?: (error: ApiError) => void;
    }
): Promise<T | undefined> {
    try {
        return await apiCall();
    } catch (error) {
        if (error instanceof ApiError) {
            if (options?.logError !== false) {
                console.error('API Error:', {
                    status: error.status,
                    error: error.error,
                    errors: error.errors
                });
            }

            if (options?.onError) {
                options.onError(error);
            }

            if (options?.defaultValue !== undefined) {
                return options.defaultValue;
            }
        } else {
            console.error('Unexpected error:', error);
        }

        return undefined;
    }
}

/**
 * Kiểm tra xem error có phải là ApiError không
 */
export function isApiError(error: any): error is ApiError {
    return error instanceof ApiError;
}

/**
 * Lấy error message từ error
 */
export function getErrorMessage(error: any): string {
    if (isApiError(error)) {
        return error.error;
    }

    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === 'string') {
        return error;
    }

    return 'Đã có lỗi xảy ra';
}

/**
 * Lấy tất cả error messages (bao gồm cả errors array)
 */
export function getAllErrorMessages(error: any): string[] {
    if (isApiError(error)) {
        const messages = [error.error];
        if (error.errors && error.errors.length > 0) {
            messages.push(...error.errors);
        }
        return messages;
    }

    return [getErrorMessage(error)];
}

/**
 * Format error messages thành string để hiển thị
 */
export function formatErrorMessages(error: any, separator: string = '\n'): string {
    return getAllErrorMessages(error).join(separator);
}

/**
 * Retry API call với số lần thử lại
 * 
 * @example
 * ```ts
 * const data = await retryApiCall(
 *   () => apiService.getItems(),
 *   { maxRetries: 3, delay: 1000 }
 * );
 * ```
 */
export async function retryApiCall<T>(
    apiCall: () => Promise<T>,
    options?: {
        maxRetries?: number;
        delay?: number;
        onRetry?: (attemptNumber: number, error: ApiError) => void;
    }
): Promise<T> {
    const maxRetries = options?.maxRetries || 3;
    const delay = options?.delay || 1000;
    let lastError: ApiError | undefined;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await apiCall();
        } catch (error) {
            if (isApiError(error)) {
                lastError = error;

                // Không retry cho các lỗi 4xx (client errors)
                if (error.status >= 400 && error.status < 500) {
                    throw error;
                }

                if (attempt < maxRetries) {
                    if (options?.onRetry) {
                        options.onRetry(attempt, error);
                    }

                    // Wait before retry
                    await new Promise(resolve => setTimeout(resolve, delay * attempt));
                } else {
                    throw error;
                }
            } else {
                throw error;
            }
        }
    }

    throw lastError || new Error('Retry failed');
}

/**
 * Batch API calls và trả về results
 * 
 * @example
 * ```ts
 * const results = await batchApiCalls([
 *   () => apiService.getItem(1),
 *   () => apiService.getItem(2),
 *   () => apiService.getItem(3)
 * ]);
 * ```
 */
export async function batchApiCalls<T>(
    calls: (() => Promise<T>)[],
    options?: {
        continueOnError?: boolean;
        onError?: (error: ApiError, index: number) => void;
    }
): Promise<(T | null)[]> {
    const results: (T | null)[] = [];

    for (let i = 0; i < calls.length; i++) {
        try {
            const result = await calls[i]();
            results.push(result);
        } catch (error) {
            if (isApiError(error)) {
                if (options?.onError) {
                    options.onError(error, i);
                }

                if (options?.continueOnError) {
                    results.push(null);
                } else {
                    throw error;
                }
            } else {
                throw error;
            }
        }
    }

    return results;
}

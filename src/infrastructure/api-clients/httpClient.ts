import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

/**
 * Cấu trúc chuẩn của API Response
 */
export interface ApiResponse<T = any> {
    isSuccess: boolean;
    error: string | null;
    errors: string[] | null;
    value: T | null;
}

/**
 * Định nghĩa format lỗi từ Backend để Typescript hiểu
 * @deprecated Sử dụng ApiResponse thay thế
 */
export interface ApiErrorResponse {
    message: string;
    code?: string;
    errors?: Record<string, string[]>; 
}

/**
 * Custom error class cho API errors
 */
export class ApiError extends Error {
    constructor(
        public status: number,
        public error: string,
        public errors: string[] | null = null,
        public code: string = 'API_ERROR'
    ) {
        super(error);
        this.name = 'ApiError';
    }
}

const httpClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    timeout: 30000, // 30 seconds
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

// 1. Interceptor cho Request: Gắn token
httpClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 2. Interceptor cho Response: Xử lý ApiResponse format
httpClient.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        const data = response.data;

        // Kiểm tra cấu trúc ApiResponse
        if (typeof data === 'object' && data !== null && 'isSuccess' in data) {
            // Nếu API trả về isSuccess = false, throw error
            if (!data.isSuccess) {
                const error = new ApiError(
                    response.status,
                    data.error || 'Đã có lỗi xảy ra',
                    data.errors,
                    'API_ERROR'
                );
                return Promise.reject(error);
            }

            // Nếu thành công, trả về value
            // Axios response sẽ chứa data.value thay vì data
            return {
                ...response,
                data: data.value // Unwrap value từ ApiResponse
            } as AxiosResponse;
        }

        // Trường hợp API không theo chuẩn ApiResponse (backward compatibility)
        return response;
    },
    (error: AxiosError<ApiResponse>) => {
        const status = error.response?.status || 500;
        const responseData = error.response?.data;

        // Xử lý response theo cấu trúc ApiResponse
        if (responseData && typeof responseData === 'object' && 'isSuccess' in responseData) {
            const apiError = new ApiError(
                status,
                responseData.error || 'Đã có lỗi xảy ra',
                responseData.errors,
                'API_ERROR'
            );

            // Handle các lỗi hệ thống phổ biến
            if (status === 401) {
                console.error('Hết hạn phiên đăng nhập');
                // Redirect to login hoặc refresh token
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('access_token');
                    window.location.href = '/login';
                }
            } else if (status === 403) {
                console.error('Bạn không có quyền truy cập');
            } else if (status === 404) {
                console.error('Không tìm thấy tài nguyên');
            } else if (status >= 500) {
                console.error('Lỗi máy chủ:', apiError.error);
            }

            return Promise.reject(apiError);
        }

        // Fallback cho các lỗi không theo chuẩn ApiResponse
        const fallbackError = new ApiError(
            status,
            error.message || 'Đã có lỗi xảy ra ngoài dự kiến',
            null,
            'UNKNOWN_ERROR'
        );

        return Promise.reject(fallbackError);
    }
);

export default httpClient;
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Định nghĩa format lỗi từ Backend để Typescript hiểu
export interface ApiErrorResponse {
    message: string;
    code?: string;
    errors?: Record<string, string[]>; 
}

const httpClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

// 1. Interceptor cho Request: Gắn token
httpClient.interceptors.request.use((config: any) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 2. Interceptor cho Response: Handle lỗi tập trung
httpClient.interceptors.response.use(
    (response: AxiosResponse) => response, 
    (error: AxiosError<ApiErrorResponse>) => {
        const status = error.response?.status;
        const data = error.response?.data;

        // Cấu trúc lại object lỗi để các lớp sau dùng đồng nhất
        const standardizedError = {
            status,
            message: data?.message || 'Đã có lỗi xảy ra ngoài dự kiến',
            code: data?.code || 'UNKNOWN_ERROR',
            raw: data // Giữ lại data gốc nếu cần xử lý đặc biệt ở module
        };

        // Handle các lỗi hệ thống phổ biến
        if (status === 401) {
            console.error('Hết hạn phiên đăng nhập');
            // Logic logout hoặc refresh token ở đây
        }
        if (status === 403) { console.error("Bạn không có quyền truy cập"); }

        return Promise.reject(standardizedError);
    }
);

export default httpClient;
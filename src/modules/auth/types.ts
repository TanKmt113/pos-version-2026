// Định nghĩa dữ liệu đầu vào (Request)
export interface ILoginRequest {
  username: string;
  password: string;
}

// Định nghĩa dữ liệu trả về từ API (Response)
// Lưu ý: Thường bọc trong IApiResponse đã định nghĩa ở shared
export interface ILoginResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

// Bạn cũng có thể định nghĩa thêm các type khác cho module này
export interface IUserProfile {
  id: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
}
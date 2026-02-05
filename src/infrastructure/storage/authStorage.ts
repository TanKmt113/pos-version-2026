import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const authStorage = {
  /**
   * Lưu access token và refresh token
   */
  saveToken: (accessToken: string, refreshToken?: string) => {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
      expires: 1, // 1 day
      secure: true,
      sameSite: "strict",
    });

    if (refreshToken) {
      Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
        expires: 7, // 7 days
        secure: true,
        sameSite: "strict",
      });
    }
  },

  /**
   * Lấy access token
   * @deprecated Sử dụng getAccessToken() thay thế
   */
  getToken: () => {
    return Cookies.get(ACCESS_TOKEN_KEY) || null;
  },

  /**
   * Lấy access token
   */
  getAccessToken: () => {
    return Cookies.get(ACCESS_TOKEN_KEY) || null;
  },

  /**
   * Lấy refresh token
   */
  getRefreshToken: () => {
    return Cookies.get(REFRESH_TOKEN_KEY) || null;
  },

  /**
   * Kiểm tra có token không
   */
  hasToken: () => {
    return !!Cookies.get(ACCESS_TOKEN_KEY);
  },

  /**
   * Xóa tất cả tokens
   */
  clearToken: () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
  },
};

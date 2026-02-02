import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const authStorage = {
  saveToken: (accessToken: string, refreshToken?: string) => {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
      expires: 1,
      secure: true,
      sameSite: "strict",
    });

    if (refreshToken) {
      Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
    }
  },

  getToken: () => {

    return Cookies.get(ACCESS_TOKEN_KEY) || null;
  },

  clearToken: () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
  },
};

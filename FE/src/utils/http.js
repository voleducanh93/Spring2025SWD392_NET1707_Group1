import axios from "axios";
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setRefreshTokenToLS,
} from "./auth";
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN } from "../api/auth.api";
import {
  isAxiosExpiredTokenError,
  isAxiosUnauthorizedError,
} from "../utils/utils";
import config from "../constants/config";
import HttpStatusCode from "../constants/httpStatusCode.enum";

class Http {
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.refreshToken = getRefreshTokenFromLS();
    this.refreshTokenRequest = null;

    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;

        if (url === URL_LOGIN) {
          const data = response.data;
          this.accessToken = data.token;
          this.refreshToken = data.refeshToken;

          setAccessTokenToLS(this.accessToken);
          setRefreshTokenToLS(this.refreshToken);
        }

        if (url === URL_LOGOUT) {
          this.accessToken = "";
          this.refreshToken = "";
          clearLS();
        }

        return response;
      },
      async (error) => {
        const { response } = error;

        if (!response) {
          console.error("Lỗi mạng hoặc server không phản hồi!");
          return Promise.reject(new Error("Lỗi mạng, vui lòng thử lại!"));
        }

        if (
          ![
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.Unauthorized,
          ].includes(response.status)
        ) {
          console.error(
            "Lỗi API:",
            response.data?.message || "Lỗi không xác định"
          );
          return Promise.reject(error);
        }

        if (isAxiosUnauthorizedError(error)) {
          const config = error.response?.config || { headers: {}, url: "" };
          const { url } = config;

          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            if (!this.refreshTokenRequest) {
              this.refreshTokenRequest = this.handleRefreshToken()
                .then((access_token) => {
                  return access_token;
                })
                .finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null;
                  }, 5000);
                });
            }

            return this.refreshTokenRequest.then((access_token) => {
              return this.instance({
                ...config,
                headers: {
                  ...config.headers,
                  Authorization: `Bearer ${access_token}`,
                },
              });
            });
          }

          clearLS();
          this.accessToken = "";
          this.refreshToken = "";
        }

        return Promise.reject(error);
      }
    );
  }

  async handleRefreshToken() {
    try {
      const response = await this.instance.post(URL_REFRESH_TOKEN, {
        refreshToken: this.refreshToken,
      });

      if (response.data && response.data.data) {
        const { access_token } = response.data.data;
        setAccessTokenToLS(access_token);
        this.accessToken = access_token;
        return access_token;
      }

      throw new Error("Lỗi refresh token!");
    } catch (error) {
      console.error("Lỗi khi refresh token:", error);
      clearLS();
      this.accessToken = "";
      this.refreshToken = "";
      throw error;
    }
  }
}

// ✅ Export Axios Instance
const http = new Http().instance;
export default http;

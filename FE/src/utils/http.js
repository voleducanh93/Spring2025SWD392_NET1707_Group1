import axios from "axios";
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setRefreshTokenToLS,
  setUserIdLS,
} from "./auth";
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN } from "../api/auth.api";
import {
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
          const data = response.data.result;         
          this.accessToken = data.token;
          this.refreshToken = data.refeshToken;
          this.userId = data.userId;
          setAccessTokenToLS(this.accessToken);
          setRefreshTokenToLS(this.refreshToken);
          setUserIdLS(this.userId);
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
          
          return Promise.reject(error);
        }

        if (isAxiosUnauthorizedError(error)) {
          const originalRequest = error.config; 
          if (error.response?.status === 401 && originalRequest.url !== URL_REFRESH_TOKEN) {
            if (!this.refreshTokenRequest) {
             
        
              // Gọi API refresh token
              this.refreshTokenRequest = this.handleRefreshToken()
                .then((newAccessToken) => {
                 
                  return newAccessToken;
                })
                .finally(() => {
                  this.refreshTokenRequest = null; 
                });
            }
        
            
            return this.refreshTokenRequest.then((newAccessToken) => {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; 
              return this.instance(originalRequest); 
            });
          }
        
         
        }
        

        return Promise.reject(error);
      }
    );
  }

  async handleRefreshToken() {
    try {
      if (!this.refreshToken) throw new Error("❌ Không tìm thấy refresh token!");
  
     
      const response = await this.instance.post(URL_REFRESH_TOKEN, {
        refreshToken: this.refreshToken,
      });
  
     
      if (response.data && response.data.result) {
        console.log("🔄 Refresh token thành công!");
  
       
        const { token, refeshToken } = response.data.result;
  
       
        setAccessTokenToLS(token);
        setRefreshTokenToLS(refeshToken);
  
        this.accessToken = token;
        this.refreshToken = refeshToken;
  
        return token; 
      }
  
      throw new Error("❌ Không nhận được token mới từ API!");
    } catch (error) {
     
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

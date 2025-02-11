import axios from 'axios';
import { getTokens, clearTokens } from '../../src/utils/storage'; // Utility để quản lý token
import handleRefreshToken from './authApi'; // Hàm xử lý refresh token

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api', // URL API
  timeout: 10000, // Timeout mặc định
});

// Interceptor trước mỗi request
axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = getTokens(); // Lấy accessToken từ localStorage
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Trả về response nếu không có lỗi
  },
  async (error) => {
    const { config, response } = error;
    if (response?.status === 401 && response?.data?.message === 'jwt expired') {
      
      try {
        const refreshedData = await handleRefreshToken(config);
        return refreshedData; 
      } catch (refreshError) {
        clearTokens(); 
        window.location.href = '/login'; 
        return Promise.reject(refreshError);
      }
    }

    if (response?.status === 401) {
      clearTokens();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

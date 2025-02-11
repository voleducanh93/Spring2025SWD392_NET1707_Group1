import axiosInstance from './axiosInstance'; 
import { getTokens, setTokens } from '../utils/storage'; 


export const refreshTokenApi = async (refreshToken) => {
  const response = await axiosInstance.post('/auth/refresh-token', { refreshToken });
  return response.data; 
};


export default async function handleRefreshToken(config) {
  const { refreshToken } = getTokens(); 

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const data = await refreshTokenApi(refreshToken);

  if (data.errors) {
    throw new Error('Failed to refresh token');
  }


  setTokens(data.data); 

 
  const { accessToken } = getTokens();
  return axiosInstance.request({
    ...config, 
    headers: {
      Authorization: `Bearer ${accessToken}`, 
    },
  });
}

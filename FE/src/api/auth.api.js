import http from '../utils/http';

export const URL_LOGIN = 'Auth/login';
export const URL_REGISTER = 'Auth/register';
export const URL_LOGOUT = 'logout';
export const URL_REFRESH_TOKEN = 'refresh-access-token';

const authApi = {
  async registerAccount(body) {
    try {
      const response = await http.post(URL_REGISTER, body);
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },
  
  
  async login(body) {
    try {
      const response = await http.post(URL_LOGIN, body);
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },

  
  async logout() {
    try {
      const response = await http.post(URL_LOGOUT);
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
};

export default authApi;

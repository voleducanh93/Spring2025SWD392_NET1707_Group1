import http from '../utils/http';

export const URL_LOGIN = 'Auth/login';
export const URL_REGISTER = 'Auth/register';
export const URL_LOGOUT = 'logout';
export const URL_REFRESH_TOKEN = 'refresh-access-token';
export const URL_FORGOT_PASSWORD = 'Auth/forget-password';
const authApi = {
  async registerAccount(body) {  
      const response = await http.post(URL_REGISTER, body);
      return response.data; 
  },
  
  
  async login(body) {   
      const response = await http.post(URL_LOGIN, body);
      return response.data;    
  },

  
  async logout() {    
      const response = await http.post(URL_LOGOUT);
      return response.data; 
  },
  async forgotPassword(body) {    
    const response = await http.post(URL_FORGOT_PASSWORD, body);
    return response.data; 
}
};

export default authApi;

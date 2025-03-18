import http from '../utils/http';

export const URL_PROFILE = 'user/profile';
export const URL_CHANGE_PASSWORD = "user/change-password";
const userApi = { 
    async getUserProfile() {
        const response = await http.get(URL_PROFILE);
        return response.data.result; 
    },
    async updateProfile(data) {
        const response = await http.put(URL_PROFILE, data);
    console.log(response.data);   
    return response.data.result; 
    },
    async changePassword(data) {
        const response = await http.post(URL_CHANGE_PASSWORD, data);
        return response.data;
      }
}

export default userApi;

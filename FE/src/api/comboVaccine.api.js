import http from "../utils/http";


const BASE_URL = "/comboVaccine";
export const getComboVaccines = async () => {
  const response = await http.get(BASE_URL);
  return response.data.result;
};


export const getComboById = async (id) => {
  const response = await http.get(`${BASE_URL}/${id}`);
  return response.data.result; 
};


export const createCombo = async (data) => {
  const response = await http.post(BASE_URL, data);
  return response.data; 
};


export const updateCombo = async (id, data) => {
  const response = await http.put(`${BASE_URL}/${id}`, data);
  return response.data; 
};


export const deleteCombo = async (id) => {
  const response = await http.delete(`${BASE_URL}/${id}`);
  return response.data; 
};

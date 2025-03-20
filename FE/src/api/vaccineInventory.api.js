import http from "../utils/http";

const BASE_URL = "/VaccineInventory"; 

export const getInventory = async () => {
  const response = await http.get(`${BASE_URL}/stock`);
  
  return response.data.result;
};

export const getInventoryByVaccineId = async (id) => {
  const response = await http.get(`${BASE_URL}/stockByVaccineId/${id}`);
  return response.data.result;
};

export const createInventory = async (inventoryData) => {
  const response = await http.post(`${BASE_URL}/add`, inventoryData);
  return response.data;
};


export const updateInventory = async (id, inventoryData) => {
  const response = await http.put(`${BASE_URL}/update/${id}`, inventoryData);
  return response.data;
};

export const deleteInventory = async (id) => {
  const response = await http.delete(`${BASE_URL}/delete/${id}`); 
  return response.data;
};

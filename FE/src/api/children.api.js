import http from "../utils/http";

const BASE_URL = "/Children";
export const getChildren = async () => {
  const response = await http.get(BASE_URL);
  return response.data;
};


export const createChildren = async (childrenData) => {
  const response = await http.post(BASE_URL, childrenData);
  return response.data; 
};


export const updateChildren = async (id, childrenData) => {
  const response = await http.put(`${BASE_URL}/${id}`, childrenData);
  return response.data; 
};


export const deleteChildren = async (id) => {
  const response = await http.delete(`${BASE_URL}/${id}`);
  return response.data; 
};
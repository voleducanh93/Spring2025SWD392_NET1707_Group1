import http from "../utils/http";

const BASE_URL = "/Vaccine";
export const getVaccines = async () => {
  const response = await http.get(BASE_URL);
  return response.data.result;
};

export const getVaccineById = async (id) => {
  const response = await http.get(`${BASE_URL}/${id}`);
  return response.data.result;
};
export const createVaccine = async (vaccineData) => {
  const response = await http.post(BASE_URL, vaccineData);
  return response.data; 
};


export const updateVaccine = async (id, vaccineData) => {
  const response = await http.put(`${BASE_URL}/${id}`, vaccineData);
  return response.data; 
};


export const deleteVaccine = async (id) => {
  const response = await http.delete(`${BASE_URL}/${id}`);
  return response.data; 
};
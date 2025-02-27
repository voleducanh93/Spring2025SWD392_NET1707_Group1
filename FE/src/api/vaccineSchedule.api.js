import http from "../utils/http";

const BASE_URL = "/VaccinationSchedule";


export const getVaccines = async () => {
  const response = await http.get(BASE_URL);
  console.log(response);
  
  return response.data.result;
};


export const createVaccine = async (data) => {
  const response = await http.post(BASE_URL, data);
  return response.data;
};


export const updateVaccine = async (id, data) => {
  const response = await http.put(`${BASE_URL}/${id}`, data);
  return response.data;
};


export const deleteVaccine = async (id) => {
  const response = await http.delete(`${BASE_URL}/${id}`);
  return response.data;
};

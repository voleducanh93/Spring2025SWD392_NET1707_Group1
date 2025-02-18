import http from "../utils/http";

const BASE_URL = "/Vaccine";
export const getVaccines = async () => {
  const response = await http.get(BASE_URL);
  return response.data.result;
};

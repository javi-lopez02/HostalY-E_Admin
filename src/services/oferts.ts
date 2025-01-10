import axios from "./axios";

export const getOfertsRequest = () => {
  return axios.get(`/oferts`);
};

interface Ofert {
  price: number;
  description: string;
}

export const createOfertRequest = (ofert: Ofert) => {
  return axios.post(`/oferts`, ofert);
};

export const editOfertRequest = (id: string, ofert: Ofert) => {
  return axios.put(`/oferts/${id}`, ofert);
};

export const deleteOfertRequest = (id: string) => {
  return axios.delete(`/oferts/${id}`);
};
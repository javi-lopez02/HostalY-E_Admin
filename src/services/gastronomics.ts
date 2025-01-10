import axios from "./axios";

export const getGastronomicsRequest = () => {
  return axios.get(`/gastronomics`);
};

interface Gastronomic {
  price: number;
  description: string;
  imagen: string;
}

export const createGastronomicRequest = (gastronomic: Gastronomic) => {
  return axios.post(`/gastronomics`, gastronomic);
};

export const editGastronomicRequest = (id: string, gastronomic: Gastronomic) => {
  return axios.put(`/gastronomics/${id}`, gastronomic);
};

export const deleteGastronomicRequest = (id: string) => {
  return axios.delete(`/gastronomics/${id}`);
};
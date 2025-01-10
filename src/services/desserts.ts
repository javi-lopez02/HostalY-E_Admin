import axios from "./axios";



export const getDessertsRequest = () => {
  return axios.get(`/desserts`);
};

interface Dessert {
  price: number;
  name: string;
  imagen: string;
}

export const createDessertRequest = (dessert: Dessert) => {
  return axios.post(`/desserts`, dessert);
};

export const editDessertRequest = (id: string, dessert: Dessert) => {
  return axios.put(`/desserts/${id}`, dessert);
};

export const deleteDessertRequest = (id: string) => {
  return axios.delete(`/desserts/${id}`);
};


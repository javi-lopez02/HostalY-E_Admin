import axios from "./axios";

export const getSnacksRequest = () => {
  return axios.get(`/snacks`);
};

interface Snack {
  price: number;
  name: string;
  imagen: string;
}

export const createSnackRequest = (snack: Snack) => {
  return axios.post(`/snacks`, snack);
};

export const editSnackRequest = (id: string, snack: Snack) => {
  return axios.put(`/snacks/${id}`, snack);
};

export const deleteSnackRequest = (id: string) => {
  return axios.delete(`/snacks/${id}`);
};
import axios from "./axios";

export const getDrinksRequest = () => {
  return axios.get(`/drinks`);
};

interface Drink {
  price: number;
  name: string;
  imagen: string;
}

export const createDrinkRequest = (drink: Drink) => {
  return axios.post(`/drinks`, drink);
};

export const editDrinkRequest = (id: string, drink: Drink) => {
  return axios.put(`/drinks/${id}`, drink);
};

export const deleteDrinkRequest = (id: string) => {
  return axios.delete(`/drinks/${id}`);
};
import axios from "./axios";

export const getEventsRequest = () => {
  return axios.get(`/events`);
};

interface Events {
  description: string;
  imagen: string;
}

export const createEventsRequest = (events: Events) => {
  return axios.post(`/events`, events);
};

export const editEventsRequest = (id: string, events: Events) => {
  return axios.put(`/events/${id}`, events);
};

export const deleteEventsRequest = (id: string) => {
  return axios.delete(`/events/${id}`);
};

import axios from "./axios";

export const getGalleryRequest = () => {
  return axios.get(`/gallery`);
};

interface Gallery {
  description: string;
  imagen: string;
}

export const createGalleryRequest = (gallery: Gallery) => {
  return axios.post(`/gallery`, gallery);
};

export const editGalleryRequest = (id: string, gallery: Gallery) => {
  return axios.put(`/gallery/${id}`, gallery);
};

export const deleteGalleryRequest = (id: string) => {
  return axios.delete(`/gallery/${id}`);
};
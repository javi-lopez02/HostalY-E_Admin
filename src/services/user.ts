import axios from "./axios";

export const getUsersRequest = () => {
  return axios.get(`/users`);
};

interface UserRequest {
  username: string;
  password: string;
  image: string;
  role?: "USER" | "ADMIN";
}

export const createUsersRequest = (user: UserRequest) => {
  return axios.post(`/user`, user);
};

export const editUsersRequest = (id: string, user: UserRequest) => {
  return axios.put(`/user/${id}`, user);
};

export const deleteUsersRequest = (id: string) => {
  return axios.delete(`/user/${id}`);
};

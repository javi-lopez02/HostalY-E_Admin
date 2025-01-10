import { UserLogin } from '../type'
import axios from './axios'

export const loginRequest = (user: UserLogin)=>{
  return axios.post("/auth/admin/login", user)
}

export const LogoutRequest = () => {
  return axios.post(`/auth/logout`)
}

export const verifyTokenRequest = async () => axios.get(`/auth/admin/verify`);
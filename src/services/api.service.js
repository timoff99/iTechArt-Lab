import axios from "axios";
import Cookies from "js-cookie";

export const API_URL = "http://localhost:5000/auth";

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
  return config;
});

export default api;

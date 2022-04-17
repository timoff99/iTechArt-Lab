import axios from "axios";
import Cookies from "js-cookie";

export const API_URL = (process.env.REACT_APP_API_URI || "http://localhost:5000") + "/api";

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.data.message === "User not authorized") {
      return (window.location = "/login");
    }
    return error;
  }
);

export default api;

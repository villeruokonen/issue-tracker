import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

export default apiClient;

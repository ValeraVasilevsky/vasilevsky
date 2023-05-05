import axios, { AxiosError, AxiosResponse } from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

http.interceptors.response.use(
  (respone: AxiosResponse) => respone,
  (error: AxiosError) => {
    Promise.reject(error.message);
  }
);

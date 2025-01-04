import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiResponse } from "../types/responseTypes";

axios.defaults.baseURL = "http://localhost:5000";

axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("jwt") || "";
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

export interface ApiResponseError extends AxiosError {
  response: AxiosResponse<ApiResponse>;
}

export default axios;

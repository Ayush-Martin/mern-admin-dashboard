import axios, { AxiosError } from "axios";

axios.defaults.baseURL = "http://localhost:5000";

axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("jwt") || "";
    console.log(1);
    config.headers.Authorization = `Bearer ${token}`;
    console.log(2);
    return config;
  },
  (err) => Promise.reject(err)
);

export { AxiosError };
export default axios;

import axios, { AxiosError } from "axios";
import store from "../redux/store";
import { refreshTokenApi } from "../features/user/userApi";

axios.defaults.baseURL = "http://localhost:5000";

// axios.interceptors.request.use(
//   (config) => {
//     const token = store.getState().user.accessToken;
//     console.log("1");
//     if (!token) {
//       store.dispatch(refreshTokenApi());
//     }

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (err) => Promise.reject(err)
// );

export { AxiosError };
export default axios;

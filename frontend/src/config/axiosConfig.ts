import axios, { AxiosError } from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export { AxiosError };
export default axios;

import axios, { InternalAxiosRequestConfig } from "axios";
import { getAccessToken, removeAccessToken } from "../utils/local-storage";

const LOCAL_HOST: string = "http://localhost:8000";

axios.defaults.baseURL = LOCAL_HOST;

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);
// axios.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response.status === 401) {
//         if (getAccessToken()) {
//           removeAccessToken();
//           window.location.href = "/login";
//         }
//       }
//       return Promise.reject(error);
//     }
//   )
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      if (getAccessToken()) {
        removeAccessToken();
        window.location.href = "/login";
      }
    }
      return Promise.reject(error);
  }
);

export default axios;

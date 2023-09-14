import axios from "axios";
import { BASE_URL } from "./common/constanst";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Read the JWT token from the cookie
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    // Add the token to the Authorization header if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const token = localStorage.getItem("token"); // Get the token from local storage

if (token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axiosInstance;

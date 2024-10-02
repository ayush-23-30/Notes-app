import axios from 'axios';
import { BASE_URL } from './constants';

axios.defaults.withCredentials = true;
const axiosIntance = axios.create({
  baseURL: BASE_URL,  // Base URL for all requests
  timeout: 5000,      // Timeout for requests (5 seconds)
  headers: {
    "Content-Type": "application/json", // Default content type for requests
  },
});

// Request interceptor to attach the Authorization token if available
axiosIntance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Attach token
    }
    return config; // Return the modified config
  }, 
  (error) => {
    return Promise.reject(error); // Handle request error
  }
);

export default axiosIntance;


// create its note 
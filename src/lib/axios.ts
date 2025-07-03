import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // e.g. http://localhost:8000/api/
  withCredentials: true, // if using cookie-based auth
});

export default axiosInstance;
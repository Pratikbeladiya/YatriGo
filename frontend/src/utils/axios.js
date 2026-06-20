import axios from 'axios';
import { getItemFromLocalStorage } from './index.js';

const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000';

if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
  if (!import.meta.env.VITE_BASE_URL || import.meta.env.VITE_BASE_URL.includes('localhost')) {
    console.warn(
      "=========================================================================\n" +
      "⚠️ YATRIGODEBUG WARNING: The client is running on production, but VITE_BASE_URL " +
      "is missing or pointing to localhost! Please configure VITE_BASE_URL in your Vercel " +
      "environment variables to point to your Render backend URL (e.g., https://your-app.onrender.com).\n" +
      "========================================================================="
    );
  }
}

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getItemFromLocalStorage('token');
    if (token) {
      // Remove quotes if the token was stored with JSON.stringify
      const parsedToken = token.startsWith('"') ? JSON.parse(token) : token;
      config.headers['Authorization'] = `Bearer ${parsedToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

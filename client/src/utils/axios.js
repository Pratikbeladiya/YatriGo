import axios from 'axios';

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

export default axiosInstance;

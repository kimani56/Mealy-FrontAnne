// src/helpers/axiosConfig.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('authToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default axiosInstance;

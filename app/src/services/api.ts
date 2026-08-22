import axios from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
